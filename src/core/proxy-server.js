import http from "http";
import httpProxy from "http-proxy";

// Get ports from command line
const TARGET_PORT = parseInt(process.argv[2]); // Your dev server port
const PROXY_PORT = parseInt(process.argv[3]);  // Port for tunnel to connect to
const PROJECT_NAME = process.argv[4] || "Project";

if (!TARGET_PORT || !PROXY_PORT) {
  console.error("Usage: node proxy-server.js <target-port> <proxy-port> [project-name]");
  process.exit(1);
}

// Create proxy
const proxy = httpProxy.createProxyServer({
  target: `http://localhost:${TARGET_PORT}`,
  changeOrigin: true,
  ws: true, // Enable WebSocket proxying (for HMR)
  xfwd: true
});

// Handle proxy errors
proxy.on("error", (err, req, res) => {
  console.error("❌ Proxy error:", err.message);
  if (res.writeHead) {
    res.writeHead(502, { "Content-Type": "text/plain" });
    res.end("Bad Gateway: Could not connect to your dev server.\nMake sure it's running on port " + TARGET_PORT);
  }
});

// Create HTTP server
const server = http.createServer((req, res) => {
  // Add CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");
  
  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }
  
  // Proxy the request
  proxy.web(req, res);
});

// Handle WebSocket upgrade (for Vite HMR)
server.on("upgrade", (req, socket, head) => {
  proxy.ws(req, socket, head);
});

// Start server
server.listen(PROXY_PORT, () => {
  console.log("╔══════════════════════════════════════════════════════════╗");
  console.log("║          🔗 DevTunnel Proxy Server                      ║");
  console.log("╠══════════════════════════════════════════════════════════╣");
  console.log(`║  📦 Project: ${PROJECT_NAME.padEnd(42)} ║`);
  console.log(`║  🎯 Dev Server: http://localhost:${TARGET_PORT.toString().padEnd(17)} ║`);
  console.log(`║  🔌 Proxy Port: ${PROXY_PORT.toString().padEnd(42)} ║`);
  console.log("╠══════════════════════════════════════════════════════════╣");
  console.log("║  ✅ Ready! Tunnel will connect to proxy                 ║");
  console.log("║  💡 No config changes needed in your project            ║");
  console.log("╚══════════════════════════════════════════════════════════╝\n");
});

// Handle shutdown
process.on("SIGINT", () => {
  console.log("\n\n🛑 Shutting down proxy...");
  server.close();
  process.exit(0);
});
