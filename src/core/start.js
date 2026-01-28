import { spawn } from "child_process";
import { existsSync } from "fs";
import { join, dirname, basename } from "path";
import { fileURLToPath } from "url";
import prompts from "prompts";
import { selectFolder } from "../utils/folder-picker.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Helper to run command
function runCommand(command, args = []) {
  return new Promise((resolve) => {
    const proc = spawn(command, args, { shell: true, stdio: "pipe" });
    let output = "";
    
    proc.stdout?.on("data", (data) => output += data.toString());
    proc.stderr?.on("data", (data) => output += data.toString());
    
    proc.on("close", (code) => resolve({ code, output }));
    proc.on("error", () => resolve({ code: 1, output: "" }));
  });
}

// Check if command exists
async function commandExists(command) {
  const result = await runCommand("where", [command]);
  return result.code === 0;
}

// Main function
async function main() {
  console.clear();
  console.log("\n╔════════════════════════════════════════╗");
  console.log("║                                        ║");
  console.log("║          🚀 DevTunnel v3.0            ║");
  console.log("║                                        ║");
  console.log("║   Share local servers worldwide       ║");
  console.log("║                                        ║");
  console.log("╚════════════════════════════════════════╝\n");

  // Step 1: Check Node.js
  console.log("[1/4] Checking Node.js...");
  if (!await commandExists("node")) {
    console.log("❌ ERROR: Node.js not found!");
    console.log("Install from: https://nodejs.org/");
    process.exit(1);
  }
  console.log("✅ SUCCESS: Node.js installed\n");

  // Step 2: Check Cloudflare (Windows only auto-install)
  console.log("[2/4] Checking Cloudflare...");
  if (!await commandExists("cloudflared")) {
    const platform = process.platform;
    if (platform === "win32") {
      console.log("⚡ Installing Cloudflare...");
      const result = await runCommand("winget", [
        "install", "--id", "Cloudflare.cloudflared",
        "--silent", "--accept-source-agreements", "--accept-package-agreements"
      ]);
      
      if (result.code === 0) {
        console.log("✅ SUCCESS: Cloudflare installed");
      } else {
        console.log("⚠️  WARNING: Cloudflare install failed (will use fallback)");
      }
    } else {
      console.log("⚠️  Cloudflare not found (will use fallback tunnels)");
      console.log("💡 Install: brew install cloudflare/cloudflare/cloudflared (Mac)");
    }
  } else {
    console.log("✅ SUCCESS: Cloudflare already installed");
  }
  console.log("");

  // Step 3: Check dependencies
  console.log("[3/4] Checking dependencies...");
  if (!existsSync(join(__dirname, "node_modules"))) {
    console.log("📦 Installing dependencies...\n");
    const result = await runCommand("npm", ["install"]);
    if (result.code !== 0) {
      console.log("\n❌ ERROR: npm install failed");
      process.exit(1);
    }
    console.log("\n✅ SUCCESS: Dependencies installed");
  } else {
    console.log("✅ SUCCESS: Dependencies already installed");
  }
  console.log("");

  // Step 4: Select folder using native OS dialog
  console.log("[4/4] Select your project folder...");
  console.log("⏳ Opening folder picker...\n");
  
  const projectPath = await selectFolder();
  
  if (!projectPath || projectPath.length === 0) {
    console.log("❌ ERROR: No folder selected");
    process.exit(1);
  }
  
  const projectName = basename(projectPath);
  console.log(`✅ Selected: ${projectPath}\n`);

  // Get port
  const portResponse = await prompts({
    type: "number",
    name: "port",
    message: "Enter your dev server port:",
    initial: 5173
  });
  
  if (!portResponse.port) {
    console.log("❌ ERROR: No port entered");
    process.exit(1);
  }
  
  const devPort = portResponse.port;
  const proxyPort = devPort + 1000; // Use port 1000 higher for proxy

  console.log("\n┌────────────────────────────────────────┐");
  console.log("│  🔧 Configuration                      │");
  console.log("├────────────────────────────────────────┤");
  console.log(`│  📦 Project: ${projectName.padEnd(24)} │`);
  console.log(`│  🎯 Dev Server: localhost:${devPort.toString().padEnd(12)} │`);
  console.log(`│  🔌 Proxy Port: ${proxyPort.toString().padEnd(24)} │`);
  console.log("└────────────────────────────────────────┘\n");

  // Start proxy server
  console.log("⚡ Starting services...\n");
  const proxyPath = join(__dirname, "proxy-server.js");
  const proxyProcess = spawn("node", [proxyPath, devPort.toString(), proxyPort.toString(), projectName], {
    stdio: "inherit",
    shell: true
  });

  // Wait for proxy to start
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Run main tunnel app (connects to proxy port)
  const indexPath = join(__dirname, "index.js");
  const tunnelProcess = spawn("node", [indexPath, proxyPort.toString(), projectName, projectPath], {
    stdio: "inherit",
    shell: true
  });

  // Handle cleanup
  const cleanup = () => {
    console.log("\n🛑 Shutting down...");
    proxyProcess.kill();
    tunnelProcess.kill();
    process.exit(0);
  };

  tunnelProcess.on("close", (code) => {
    cleanup();
  });

  proxyProcess.on("close", () => {
    cleanup();
  });

  // Handle Ctrl+C
  process.on("SIGINT", cleanup);
  process.on("SIGTERM", cleanup);
}

// Run
main().catch((error) => {
  console.error("\n❌ ERROR:", error.message);
  process.exit(1);
});
