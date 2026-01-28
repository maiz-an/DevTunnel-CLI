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

// Create proxy with streaming support
const proxy = httpProxy.createProxyServer({
  target: `http://localhost:${TARGET_PORT}`,
  changeOrigin: true,
  ws: true, // Enable WebSocket proxying (for HMR)
  xfwd: true,
  timeout: 300000, // 5 minutes timeout for large files
  proxyTimeout: 300000, // 5 minutes proxy timeout
  followRedirects: true
});

// Handle proxy errors
proxy.on("error", (err, req, res) => {
  console.error("Proxy error:", err.message);
  if (res.writeHead) {
    res.writeHead(502, { "Content-Type": "text/plain" });
    res.end("Bad Gateway: Could not connect to your dev server.\nMake sure it's running on port " + TARGET_PORT);
  }
});

// Create HTTP server with timeout handling
const server = http.createServer((req, res) => {
  // Set longer timeout for large file transfers
  req.setTimeout(300000); // 5 minutes
  res.setTimeout(300000); // 5 minutes
  
  // Add CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");
  
  // Handle timeout
  req.on('timeout', () => {
    if (!res.headersSent) {
      res.writeHead(408, { "Content-Type": "text/plain" });
      res.end("Request timeout");
    }
  });
  
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
  console.log("");
  console.log("DevTunnel Proxy Server");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`Project: ${PROJECT_NAME}`);
  console.log(`Dev Server: http://localhost:${TARGET_PORT}`);
  console.log(`Proxy Port: ${PROXY_PORT}`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("Ready! Tunnel will connect to proxy");
  console.log("No config changes needed");
  console.log("");
});

// Handle shutdown
process.on("SIGINT", () => {
  console.log("\nShutting down proxy...");
  server.close();
  process.exit(0);
});
