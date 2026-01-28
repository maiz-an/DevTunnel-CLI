import { spawn } from "child_process";
import { existsSync } from "fs";
import { join, dirname, basename } from "path";
import { fileURLToPath } from "url";
import prompts from "prompts";
import { selectFolder } from "../utils/folder-picker.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get project root directory dynamically (two levels up from src/core/)
const PROJECT_ROOT = dirname(dirname(__dirname));

// Helper to run command
function runCommand(command, args = [], cwd = process.cwd()) {
  return new Promise((resolve) => {
    const proc = spawn(command, args, { 
      shell: true, 
      stdio: "pipe",
      cwd: cwd
    });
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
  console.log("\n╔════════════════════════════════════════════╗");
  console.log("║                                            ║");
  console.log("║           🚀 DevTunnel v3.0               ║");
  console.log("║                                            ║");
  console.log("║      Share local servers worldwide         ║");
  console.log("║                                            ║");
  console.log("╚════════════════════════════════════════════╝\n");

  // Step 1: Check Node.js
  console.log("[1/4] Checking Node.js...");
  if (!await commandExists("node")) {
    console.log("❌ ERROR: Node.js not found!");
    console.log("Install from: https://nodejs.org/");
    process.exit(1);
  }
  console.log("✅ SUCCESS: Node.js installed\n");

  // Step 2: Check Cloudflare (bundled or system-installed)
  console.log("[2/4] Checking Cloudflare...");
  
  // Import bundled cloudflared helpers
  const { setupCloudflared, hasBundledCloudflared } = await import("./setup-cloudflared.js");
  
  let cloudflareAvailable = false;
  
  if (hasBundledCloudflared()) {
    console.log("✅ SUCCESS: Using bundled Cloudflare (no install needed)");
    cloudflareAvailable = true;
  } else if (await commandExists("cloudflared")) {
    console.log("✅ SUCCESS: Cloudflare installed on system");
    cloudflareAvailable = true;
  } else {
    console.log("📦 First time setup - Downloading Cloudflare...");
    console.log("💡 This only happens once (~40MB, 10-30 seconds)\n");
    
    try {
      const bundledPath = await setupCloudflared();
      
      if (bundledPath) {
        console.log("✅ SUCCESS: Cloudflare ready to use");
        cloudflareAvailable = true;
      } else {
        console.log("⚠️  Could not download Cloudflare");
        console.log("🔄 Will use alternative tunnel services\n");
      }
    } catch (err) {
      console.log(`⚠️  Setup error: ${err.message}`);
      console.log("🔄 Will use alternative tunnel services\n");
    }
  }
  
  // Show what's available
  if (!cloudflareAvailable) {
    console.log("💡 DevTunnel has multi-service fallback:");
    console.log("   → Cloudflare (fastest, no password)");
    console.log("   → Ngrok (fast alternative)");
    console.log("   → LocalTunnel (backup option)");
    console.log("");
  }

  // Step 3: Check dependencies
  console.log("[3/4] Checking dependencies...");
  const nodeModulesPath = join(PROJECT_ROOT, "node_modules");
  if (!existsSync(nodeModulesPath)) {
    console.log("📦 Installing dependencies...\n");
    // Run npm install in the project root directory
    const result = await runCommand("npm", ["install"], PROJECT_ROOT);
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

  console.log("\n╔════════════════════════════════════════════╗");
  console.log("║           🔧 Configuration                ║");
  console.log("╠════════════════════════════════════════════╣");
  console.log(`║  📦 Project: ${projectName.padEnd(28)} ║`);
  console.log(`║  🎯 Dev Server: localhost:${devPort.toString().padEnd(17)} ║`);
  console.log(`║  🔌 Proxy Port: ${proxyPort.toString().padEnd(28)} ║`);
  console.log("╚════════════════════════════════════════════╝\n");

  // Start proxy server
  console.log("⚡ Starting services...\n");
  const proxyPath = join(__dirname, "proxy-server.js");
  const proxyProcess = spawn("node", [proxyPath, devPort.toString(), proxyPort.toString(), projectName], {
    stdio: "inherit",
    shell: false
  });

  // Wait for proxy to start
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Run main tunnel app (connects to proxy port)
  // Use shell: false to properly handle paths with spaces
  const indexPath = join(__dirname, "index.js");
  const tunnelProcess = spawn("node", [indexPath, proxyPort.toString(), projectName, projectPath], {
    stdio: "inherit",
    shell: false
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
