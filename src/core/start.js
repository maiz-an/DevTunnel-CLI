import { spawn } from "child_process";
import { existsSync, readFileSync } from "fs";
import { join, dirname, basename } from "path";
import { fileURLToPath } from "url";
import http from "http";
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

// Check if a port is in use (dev server running)
function checkPortInUse(port) {
  return new Promise((resolve) => {
    const server = http.createServer();
    
    server.once('error', (err) => {
      // Port is in use
      if (err.code === 'EADDRINUSE') {
        resolve(true);
      } else {
        resolve(false);
      }
    });
    
    server.listen(port, () => {
      // Port is available (not in use)
      server.once('close', () => resolve(false));
      server.close();
    });
  });
}

// Detect port from package.json
function detectPortFromPackage(packagePath) {
  try {
    if (!existsSync(packagePath)) return null;
    const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'));
    const scripts = packageJson.scripts || {};
    
    // Check for common dev commands
    const devScript = scripts.dev || scripts.start || scripts.serve;
    if (!devScript) return null;
    
    // Try to extract port from script
    const portMatch = devScript.match(/--port\s+(\d+)|:(\d+)|port[=:](\d+)/i);
    if (portMatch) {
      return parseInt(portMatch[1] || portMatch[2] || portMatch[3]);
    }
    
    // Default ports based on framework
    if (devScript.includes('vite')) return 5173;
    if (devScript.includes('next')) return 3000;
    if (devScript.includes('react-scripts')) return 3000;
    if (devScript.includes('webpack')) return 8080;
    if (devScript.includes('express')) return 3000;
    
    return null;
  } catch (err) {
    return null;
  }
}

// Check common ports for running dev servers
async function detectRunningDevServer() {
  const commonPorts = [3000, 5173, 8080, 5000, 4000, 8000, 3001, 5174];
  const detected = [];
  
  for (const port of commonPorts) {
    const inUse = await checkPortInUse(port);
    if (inUse) {
      // Try to verify it's actually a dev server by making a request
      try {
        const response = await new Promise((resolve) => {
          const req = http.get(`http://localhost:${port}`, { timeout: 2000 }, (res) => {
            resolve(res.statusCode);
          });
          req.on('error', () => resolve(null));
          req.on('timeout', () => {
            req.destroy();
            resolve(null);
          });
        });
        // If we get any HTTP response, it's likely a dev server
        if (response !== null) {
          detected.push(port);
        }
      } catch (err) {
        // Port is in use, add it anyway (might be a dev server)
        detected.push(port);
      }
    }
  }
  
  return detected;
}

// Auto-detect project in current directory
async function autoDetectProject() {
  const currentDir = process.cwd();
  const packagePath = join(currentDir, 'package.json');
  
  // Check if package.json exists
  if (!existsSync(packagePath)) {
    return null;
  }
  
  try {
    const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'));
    const projectName = packageJson.name || basename(currentDir);
    
    // FIRST: Check for running dev servers (priority)
    const runningPorts = await detectRunningDevServer();
    let detectedPort = null;
    
    if (runningPorts.length > 0) {
      // Use running server port (most accurate)
      detectedPort = runningPorts[0];
    } else {
      // Fallback: Try to detect port from package.json
      detectedPort = detectPortFromPackage(packagePath);
    }
    
    return {
      path: currentDir,
      name: projectName,
      port: detectedPort
    };
  } catch (err) {
    return null;
  }
}

// ASCII Logo - Compatible with all OS and terminals
function showLogo() {
  console.log("");
  console.log(" ██████████                        ███████████                                           ████ ");
  console.log("▒▒███▒▒▒▒███                      ▒█▒▒▒███▒▒▒█                                          ▒▒███ ");
  console.log(" ▒███   ▒▒███  ██████  █████ █████▒   ▒███  ▒  █████ ████ ████████   ████████    ██████  ▒███ ");
  console.log(" ▒███    ▒███ ███▒▒███▒▒███ ▒▒███     ▒███    ▒▒███ ▒███ ▒▒███▒▒███ ▒▒███▒▒███  ███▒▒███ ▒███ ");
  console.log(" ▒███    ▒███▒███████  ▒███  ▒███     ▒███     ▒███ ▒███  ▒███ ▒███  ▒███ ▒███ ▒███████  ▒███ ");
  console.log(" ▒███    ███ ▒███▒▒▒   ▒▒███ ███      ▒███     ▒███ ▒███  ▒███ ▒███  ▒███ ▒███ ▒███▒▒▒   ▒███ ");
  console.log(" ██████████  ▒▒██████   ▒▒█████       █████    ▒▒████████ ████ █████ ████ █████▒▒██████  █████");
  console.log("▒▒▒▒▒▒▒▒▒▒    ▒▒▒▒▒▒     ▒▒▒▒▒       ▒▒▒▒▒      ▒▒▒▒▒▒▒▒ ▒▒▒▒ ▒▒▒▒▒ ▒▒▒▒ ▒▒▒▒▒  ▒▒▒▒▒▒  ▒▒▒▒▒ ");
  console.log("                                                                                              ");
  console.log("                                                                                              ");
  console.log("");
}

async function main() {
  // Clear screen - works on Windows, macOS, Linux
  // ANSI escape codes for clear screen + cursor to top
  process.stdout.write('\x1B[2J\x1B[0f');
  console.clear(); // Fallback for terminals that don't support ANSI
  
  // Show ASCII logo
  showLogo();
  
  console.log("DevTunnel v3.0.11");
  console.log("Share your local dev servers worldwide");
  console.log("");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("Repository: https://github.com/maiz-an/DevTunnel");
  console.log("npm Package: https://www.npmjs.com/package/devtunnel-cli");
  console.log("Website: https://devtunnel.vercel.app");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("");

  // Step 1: Check Node.js
  console.log("[1/4] Checking Node.js...");
  if (!await commandExists("node")) {
    console.log("ERROR: Node.js not found!");
    console.log("Install from: https://nodejs.org/");
    process.exit(1);
  }
  console.log("SUCCESS: Node.js installed");
  console.log("");

  // Step 2: Check Cloudflare (bundled or system-installed)
  console.log("[2/4] Checking Cloudflare...");
  
  // Import bundled cloudflared helpers
  const { setupCloudflared, hasBundledCloudflared } = await import("./setup-cloudflared.js");
  
  let cloudflareAvailable = false;
  
  if (hasBundledCloudflared()) {
    console.log("SUCCESS: Using bundled Cloudflare (no install needed)");
    cloudflareAvailable = true;
  } else if (await commandExists("cloudflared")) {
    console.log("SUCCESS: Cloudflare installed on system");
    cloudflareAvailable = true;
  } else {
    console.log("First time setup - Downloading Cloudflare...");
    console.log("This only happens once (~40MB, 10-30 seconds)");
    console.log("");
    
    try {
      const bundledPath = await setupCloudflared();
      
      if (bundledPath) {
        console.log("SUCCESS: Cloudflare ready to use");
        cloudflareAvailable = true;
      } else {
        console.log("Could not download Cloudflare");
        console.log("Will use alternative tunnel services");
        console.log("");
      }
    } catch (err) {
      console.log(`Setup error: ${err.message}`);
      console.log("Will use alternative tunnel services");
      console.log("");
    }
  }
  
  // Show what's available
  if (!cloudflareAvailable) {
    console.log("DevTunnel has multi-service fallback:");
    console.log("   Cloudflare (fastest, no password)");
    console.log("   Ngrok (fast alternative)");
    console.log("   LocalTunnel (backup option)");
    console.log("");
  }

  // Step 3: Check dependencies
  console.log("[3/4] Checking dependencies...");
  const nodeModulesPath = join(PROJECT_ROOT, "node_modules");
  if (!existsSync(nodeModulesPath)) {
    console.log("Installing dependencies...");
    console.log("");
    // Run npm install in the project root directory
    const result = await runCommand("npm", ["install"], PROJECT_ROOT);
    if (result.code !== 0) {
      console.log("");
      console.log("ERROR: npm install failed");
      process.exit(1);
    }
    console.log("");
    console.log("SUCCESS: Dependencies installed");
  } else {
    console.log("SUCCESS: Dependencies already installed");
  }
  console.log("");

  // Step 4: Auto-detect or select project
  console.log("[4/4] Detecting project...");
  
  let projectPath, projectName, devPort;
  
  // Try to auto-detect project in current directory
  const autoDetected = await autoDetectProject();
  
  if (autoDetected && autoDetected.port) {
    // Auto-detected project with port
    projectPath = autoDetected.path;
    projectName = autoDetected.name;
    
    // Double-check: verify the port is actually in use
    const portInUse = await checkPortInUse(autoDetected.port);
    
    if (!portInUse) {
      // Detected port is not actually running, check for other running servers
      console.log(`Detected port ${autoDetected.port} from package.json, but no server running on that port`);
      console.log("Checking for running dev servers...");
      
      const runningPorts = await detectRunningDevServer();
      if (runningPorts.length > 0) {
        if (runningPorts.length === 1) {
          devPort = runningPorts[0];
          console.log(`Found running dev server on port: ${devPort}`);
        } else {
          console.log(`Found ${runningPorts.length} running dev server(s) on port(s): ${runningPorts.join(', ')}`);
          const portResponse = await prompts({
            type: "select",
            name: "port",
            message: "Select port:",
            choices: runningPorts.map(p => ({ title: `Port ${p}`, value: p }))
          });
          
          if (!portResponse.port) {
            console.log("ERROR: No port selected");
            process.exit(1);
          }
          
          devPort = portResponse.port;
        }
      } else {
        // No running servers, use detected port (user might start it later)
        devPort = autoDetected.port;
        console.log(`Using detected port: ${devPort} (make sure dev server is running)`);
      }
    } else {
      // Port is in use, use it
      devPort = autoDetected.port;
    }
    
    console.log(`Detected project: ${projectName}`);
    console.log(`Using port: ${devPort}`);
    console.log(`Using current directory: ${projectPath}`);
    console.log("");
    
    // Confirm with user
    const confirm = await prompts({
      type: "confirm",
      name: "value",
      message: "Use detected project?",
      initial: true
    });
    
    if (!confirm.value) {
      // User wants to select manually
      console.log("");
      console.log("Selecting project manually...");
      console.log("");
      
      const selectedPath = await selectFolder();
      if (!selectedPath || selectedPath.length === 0) {
        console.log("ERROR: No folder selected");
        process.exit(1);
      }
      
      projectPath = selectedPath;
      projectName = basename(selectedPath);
      
      // Try to detect port for selected project
      const selectedPackagePath = join(selectedPath, 'package.json');
      const detectedPort = detectPortFromPackage(selectedPackagePath);
      
      const portResponse = await prompts({
        type: "number",
        name: "port",
        message: "Enter your dev server port:",
        initial: detectedPort || 5173
      });
      
      if (!portResponse.port) {
        console.log("ERROR: No port entered");
        process.exit(1);
      }
      
      devPort = portResponse.port;
    }
  } else if (autoDetected && !autoDetected.port) {
    // Project detected but no port
    projectPath = autoDetected.path;
    projectName = autoDetected.name;
    
    console.log(`Detected project: ${projectName}`);
    console.log(`Using current directory: ${projectPath}`);
    console.log("Checking for running dev servers...");
    
    const runningPorts = await detectRunningDevServer();
    
    if (runningPorts.length > 0) {
      console.log(`Found ${runningPorts.length} running dev server(s) on port(s): ${runningPorts.join(', ')}`);
      
      if (runningPorts.length === 1) {
        devPort = runningPorts[0];
        console.log(`Using port: ${devPort}`);
      } else {
        // Multiple ports detected, let user choose
        const portResponse = await prompts({
          type: "select",
          name: "port",
          message: "Select port:",
          choices: runningPorts.map(p => ({ title: `Port ${p}`, value: p }))
        });
        
        if (!portResponse.port) {
          console.log("ERROR: No port selected");
          process.exit(1);
        }
        
        devPort = portResponse.port;
      }
    } else {
      // No running server, ask for port
      const portResponse = await prompts({
        type: "number",
        name: "port",
        message: "Enter your dev server port:",
        initial: 5173
      });
      
      if (!portResponse.port) {
        console.log("ERROR: No port entered");
        process.exit(1);
      }
      
      devPort = portResponse.port;
    }
    
    console.log("");
  } else {
    // No auto-detection, use folder picker
    console.log("No project detected in current directory");
    console.log("Opening folder picker...");
    console.log("");
    
    projectPath = await selectFolder();
    
    if (!projectPath || projectPath.length === 0) {
      console.log("ERROR: No folder selected");
      process.exit(1);
    }
    
    projectName = basename(projectPath);
    console.log(`Selected: ${projectPath}`);
    console.log("");
    
    // Try to detect port for selected project
    const selectedPackagePath = join(projectPath, 'package.json');
    const detectedPort = detectPortFromPackage(selectedPackagePath);
    
    // Check for running servers
    const runningPorts = await detectRunningDevServer();
    
    let initialPort = detectedPort || 5173;
    if (runningPorts.length > 0 && !detectedPort) {
      initialPort = runningPorts[0];
    }
    
    const portResponse = await prompts({
      type: "number",
      name: "port",
      message: "Enter your dev server port:",
      initial: initialPort
    });
    
    if (!portResponse.port) {
      console.log("ERROR: No port entered");
      process.exit(1);
    }
    
    devPort = portResponse.port;
  }
  
  console.log("");
  const proxyPort = devPort + 1000; // Use port 1000 higher for proxy

  console.log("");
  console.log("Configuration:");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`Project: ${projectName}`);
  console.log(`Dev Server: localhost:${devPort}`);
  console.log(`Proxy Port: ${proxyPort}`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("");

  // Start proxy server
  console.log("Starting services...");
  console.log("");
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
    console.log("\nShutting down...");
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
  console.error("\nERROR:", error.message);
  process.exit(1);
});
