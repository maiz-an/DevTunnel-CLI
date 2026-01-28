import { spawn } from "child_process";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { homedir } from "os";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// Get current directory (needed for ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get port and project path from command line arguments
const PORT = parseInt(process.argv[2]);
const PROJECT_NAME = process.argv[3] || `Project (Port ${PORT})`;
const PROJECT_PATH = process.argv[4] || process.cwd();

// Load custom name from config
let customPrefix = "";
try {
  const configModule = await import("../config/config.js");
  if (configModule.YOUR_NAME && configModule.YOUR_NAME.trim()) {
    customPrefix = configModule.YOUR_NAME.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
    console.log(`🎨 Using custom prefix: "${customPrefix}"\n`);
    console.log(`💡 URLs will look like: ${customPrefix}-xyz.trycloudflare.com\n`);
  }
} catch (error) {
  // Config not found or invalid, use random
}

if (!PORT || isNaN(PORT) || PORT < 1 || PORT > 65535) {
  console.error("❌ Invalid port number!");
  console.error("Usage: node index.js <port> [projectName]");
  console.error("Example: node index.js 5173");
  process.exit(1);
}

let tunnelProcess;
let currentTunnelType = null;

console.log("╔════════════════════════════════════════╗");
console.log("║          🌐 DevTunnel v3.0            ║");
console.log("╠════════════════════════════════════════╣");
console.log(`║  📦 ${PROJECT_NAME.padEnd(34)} ║`);
console.log(`║  🔌 Port: ${PORT.toString().padEnd(30)} ║`);
console.log("╚════════════════════════════════════════╝\n");
console.log("💡 Ensure dev server is running on port " + PORT + "\n");

// Check if project is Vite and auto-fix config for Cloudflare
async function fixViteConfigForCloudflare() {
  const viteConfigPath = join(PROJECT_PATH, "vite.config.js");
  const viteConfigTsPath = join(PROJECT_PATH, "vite.config.ts");
  
  let configPath = null;
  if (existsSync(viteConfigPath)) configPath = viteConfigPath;
  else if (existsSync(viteConfigTsPath)) configPath = viteConfigTsPath;
  
  if (!configPath) return false;
  
  try {
    let config = readFileSync(configPath, "utf-8");
    
    // Check if already configured for external access
    if (config.includes("host: true") || config.includes("host:true") || 
        config.includes("host: '0.0.0.0'") || config.includes('host: "0.0.0.0"') ||
        config.includes('host:"0.0.0.0"') || config.includes("host:'0.0.0.0'")) {
      console.log("✅ Vite config already allows external access\n");
      return true;
    }
    
    console.log("📝 Auto-fixing Vite config for tunnel access...");
    
    let newConfig = config;
    
    // Case 1: Has existing server config
    if (config.includes("server:") || config.includes("server :")) {
      // Add host inside existing server block
      newConfig = config.replace(
        /(server\s*:\s*\{)/,
        `$1\n    host: true, // Allow tunnel access`
      );
    }
    // Case 2: No server config, add it after defineConfig({
    else if (config.includes("defineConfig")) {
      newConfig = config.replace(
        /defineConfig\(\s*\{/,
        `defineConfig({\n  server: {\n    host: true, // Allow tunnel access\n  },`
      );
    }
    // Case 3: Simple export default object
    else if (config.includes("export default {")) {
      newConfig = config.replace(
        /export\s+default\s+\{/,
        `export default {\n  server: {\n    host: true, // Allow tunnel access\n  },`
      );
    }
    
    if (newConfig !== config) {
      // Backup original
      writeFileSync(configPath + ".backup", config);
      writeFileSync(configPath, newConfig);
      console.log("\n" + "=".repeat(60));
      console.log("✅ VITE CONFIG UPDATED!");
      console.log("=".repeat(60));
      console.log("⚠️  IMPORTANT: You MUST restart your dev server now!");
      console.log("   1. Stop your dev server (Ctrl+C)");
      console.log("   2. Run: npm run dev");
      console.log("   3. Then run this tool again");
      console.log("\nBackup saved: " + configPath + ".backup");
      console.log("=".repeat(60) + "\n");
      
      // Wait for user to acknowledge
      console.log("Press Ctrl+C to exit and restart your dev server...\n");
      await new Promise(resolve => setTimeout(resolve, 60000)); // Wait 60 seconds
      return true;
    }
    
    console.log("⚠️  Could not auto-fix config. You may need to manually add:\n");
    console.log("   server: { host: true }\n");
    return false;
  } catch (error) {
    console.log("⚠️  Could not read Vite config:", error.message);
    return false;
  }
}

// Tunnel services to try in order (Cloudflare first - no password, fast)
const TUNNEL_SERVICES = [
  {
    name: "Cloudflare",
    command: "cloudflared",
    args: ["tunnel", "--url", `http://localhost:${PORT}`],
    available: async () => {
      try {
        const result = spawn("cloudflared", ["--version"], { shell: true, stdio: "pipe" });
        return new Promise((resolve) => {
          result.on("close", (code) => resolve(code === 0));
          result.on("error", () => resolve(false));
        });
      } catch {
        return false;
      }
    },
    needsViteFix: true
  },
  {
    name: "Ngrok",
    command: "ngrok",
    args: ["http", PORT.toString()],
    available: async () => {
      try {
        const result = spawn("ngrok", ["--version"], { shell: true, stdio: "pipe" });
        return new Promise((resolve) => {
          result.on("close", (code) => resolve(code === 0));
          result.on("error", () => resolve(false));
        });
      } catch {
        return false;
      }
    },
    needsViteFix: true
  },
  {
    name: "LocalTunnel",
    command: "node",
    args: [join(__dirname, "tunnel-helpers.js"), "localtunnel", PORT.toString()],
    available: async () => {
      try {
        await import("localtunnel");
        return true;
      } catch {
        return false;
      }
    },
    needsViteFix: false,
    warning: "⚠️  Note: LocalTunnel shows a password page on first visit (uses your public IP)"
  }
];

// Try each tunnel service
async function tryTunnelServices() {
  console.log("🔍 Checking available tunnel services...\n");

  let hasCloudflare = false;
  
  // Check if Cloudflare is available
  for (const service of TUNNEL_SERVICES) {
    if (service.name === "Cloudflare" && await service.available()) {
      hasCloudflare = true;
      break;
    }
  }
  
  // Show tip if Cloudflare not installed
  if (!hasCloudflare) {
    console.log("💡 TIP: Install Cloudflare for best experience (no password, fastest)");
    console.log("   → winget install Cloudflare.cloudflared\n");
  }

  for (const service of TUNNEL_SERVICES) {
    const available = await service.available();
    
    if (available) {
      console.log(`✅ ${service.name} is available`);
      
      // Show warning if exists
      if (service.warning) {
        console.log(service.warning);
      }
      
      // Skip Vite auto-fix - using proxy server instead
      
      console.log(`🌐 Starting ${service.name} tunnel...\n`);
      
      currentTunnelType = service.name;
      tunnelProcess = spawn(service.command, service.args, {
        shell: true,
        stdio: "pipe"
      });

      setupTunnelHandlers(service.name);
      
      // Wait a bit to see if tunnel starts successfully
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Check if process is still running
      if (tunnelProcess && !tunnelProcess.killed) {
        console.log(`\n✅ Successfully connected via ${service.name}!`);
        if (service.name === "LocalTunnel") {
          console.log("💡 First-time visitors need to enter tunnel password (your public IP)");
          console.log("💡 Get password at: https://loca.lt/mytunnelpassword\n");
        }
        console.log("Press Ctrl+C to stop the tunnel\n");
        return true;
      }
    } else {
      console.log(`⚠️  ${service.name} not available`);
    }
  }

  console.log("\n❌ No tunnel services available!");
  console.log("\n💡 Recommended: Install Cloudflare (fastest, no password):");
  console.log("   winget install Cloudflare.cloudflared");
  console.log("\n💡 Or install Ngrok:");
  console.log("   Download from: https://ngrok.com/download");
  console.log("\n💡 LocalTunnel is already installed but may require restart");
  process.exit(1);
}

function setupTunnelHandlers(serviceName) {
  if (!tunnelProcess) return;

  tunnelProcess.stdout.on("data", (data) => {
    const output = data.toString();
    const lines = output.split("\n");
    
    lines.forEach(line => {
      const trimmed = line.trim();
      if (!trimmed) return;

      // Extract URLs from different services
      if (serviceName === "Cloudflare") {
        // Look for trycloudflare.com URL
        if (trimmed.includes("trycloudflare.com")) {
          // Extract just the URL
          const urlMatch = trimmed.match(/(https?:\/\/[^\s]+trycloudflare\.com[^\s]*)/);
          if (urlMatch) {
            const url = urlMatch[1];
            const boxWidth = Math.max(60, url.length + 4);
            const urlPadding = boxWidth - 4 - url.length;
            
            console.log("\n╔" + "═".repeat(boxWidth) + "╗");
            if (customPrefix) {
              const headerText = `✅ PUBLIC URL (Created by: ${customPrefix})`;
              const headerPadding = boxWidth - 2 - headerText.length;
              console.log("║  " + headerText + " ".repeat(Math.max(0, headerPadding)) + "║");
            } else {
              const headerText = "✅ PUBLIC URL";
              const headerPadding = boxWidth - 2 - headerText.length;
              console.log("║  " + headerText + " ".repeat(Math.max(0, headerPadding)) + "║");
            }
            console.log("╠" + "═".repeat(boxWidth) + "╣");
            console.log("║  " + url + " ".repeat(Math.max(0, urlPadding)) + "║");
            if (customPrefix) {
              console.log("╠" + "─".repeat(boxWidth) + "╣");
              const creatorText = `👤 Creator: ${customPrefix}`;
              const creatorPadding = boxWidth - 2 - creatorText.length;
              console.log("║  " + creatorText + " ".repeat(Math.max(0, creatorPadding)) + "║");
              const shareText = "💡 Share this URL with your team!";
              const sharePadding = boxWidth - 2 - shareText.length;
              console.log("║  " + shareText + " ".repeat(Math.max(0, sharePadding)) + "║");
            }
            console.log("╚" + "═".repeat(boxWidth) + "╝\n");
          }
        }
        // Show other important messages (but filter out most INF/WRN logs)
        else if (!trimmed.includes("INF") && !trimmed.includes("WRN") && !trimmed.includes("+---")) {
          // Don't show these lines
        }
      } else if (serviceName === "Ngrok") {
        if (trimmed.includes("https://") || trimmed.includes("http://")) {
          const url = trimmed;
          const boxWidth = Math.max(60, url.length + 4);
          const urlPadding = boxWidth - 4 - url.length;
          
          console.log("\n╔" + "═".repeat(boxWidth) + "╗");
          const headerText = "✅ PUBLIC URL";
          const headerPadding = boxWidth - 2 - headerText.length;
          console.log("║  " + headerText + " ".repeat(Math.max(0, headerPadding)) + "║");
          console.log("╠" + "═".repeat(boxWidth) + "╣");
          console.log("║  " + url + " ".repeat(Math.max(0, urlPadding)) + "║");
          console.log("╚" + "═".repeat(boxWidth) + "╝\n");
        }
      } else {
        // LocalTunnel or other services
        if (trimmed.includes("your url is:")) {
          const urlMatch = trimmed.match(/https?:\/\/[^\s]+/);
          if (urlMatch) {
            const url = urlMatch[0];
            const boxWidth = Math.max(60, url.length + 4);
            const urlPadding = boxWidth - 4 - url.length;
            
            console.log("\n╔" + "═".repeat(boxWidth) + "╗");
            const headerText = "✅ PUBLIC URL";
            const headerPadding = boxWidth - 2 - headerText.length;
            console.log("║  " + headerText + " ".repeat(Math.max(0, headerPadding)) + "║");
            console.log("╠" + "═".repeat(boxWidth) + "╣");
            console.log("║  " + url + " ".repeat(Math.max(0, urlPadding)) + "║");
            console.log("╚" + "═".repeat(boxWidth) + "╝\n");
          }
        }
      }
    });
  });

  tunnelProcess.stderr.on("data", (data) => {
    const output = data.toString();
    
    // For Cloudflare, check if URL is in stderr (sometimes it is)
    if (serviceName === "Cloudflare" && output.includes("trycloudflare.com")) {
      const urlMatch = output.match(/(https?:\/\/[^\s]+trycloudflare\.com[^\s]*)/);
      if (urlMatch) {
        console.log("\n" + "=".repeat(50));
        console.log("✅ PUBLIC URL:");
        console.log(`   ${urlMatch[1]}`);
        console.log("=".repeat(50) + "\n");
      }
    }
    
    // Only show errors, not info messages
    if (!output.includes("INF") && !output.includes("WRN")) {
      const trimmed = output.trim();
      if (trimmed && !trimmed.includes("originCertPath")) {
        console.error(`⚠️  ${trimmed}`);
      }
    }
  });

  tunnelProcess.on("error", (error) => {
    console.error(`\n❌ ${serviceName} error:`, error.message);
  });

  tunnelProcess.on("exit", (code) => {
    if (code !== 0 && code !== null) {
      console.error(`\n⚠️  ${serviceName} exited with code ${code}`);
    }
  });
}

// Handle cleanup on exit
function cleanup() {
  console.log("\n\n🛑 Shutting down tunnel...");
  try {
    if (tunnelProcess) {
      tunnelProcess.kill();
    }
  } catch (e) {
    // Ignore errors during cleanup
  }
  setTimeout(() => {
    process.exit(0);
  }, 500);
}

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);

// Start trying tunnel services
tryTunnelServices().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
