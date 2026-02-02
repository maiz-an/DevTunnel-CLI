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

function getPackageVersion() {
  try {
    const pkgPath = join(PROJECT_ROOT, "package.json");
    if (existsSync(pkgPath)) {
      const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
      return pkg.version || "3.1.1";
    }
  } catch (err) { }
  return "3.1.1";
}

// Helper to run command (cross-platform)
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

    proc.on("close", (code, signal) => resolve({ code: code ?? (signal ? 1 : 0), output }));
    proc.on("error", (err) => resolve({ code: 1, output: "", error: err }));
  });
}

// Check if command exists (Windows: where, macOS/Linux: which)
async function commandExists(command) {
  const isWin = process.platform === "win32";
  const result = await runCommand(isWin ? "where" : "which", [command]);
  return result.code === 0 && (result.output || "").trim().length > 0;
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

// Poll until server at port responds (for HTML built-in static server)
async function waitForServerReady(port, timeoutMs = 10000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const code = await new Promise((resolve) => {
        const req = http.get(`http://127.0.0.1:${port}`, { timeout: 2000 }, (res) => resolve(res.statusCode));
        req.on("error", () => resolve(null));
      });
      if (code !== null && code >= 200 && code < 500) return true;
    } catch (err) { }
    await new Promise((r) => setTimeout(r, 300));
  }
  return false;
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

// Detect Laravel/PHP project (composer.json + artisan)
function detectLaravelProject(currentDir) {
  const composerPath = join(currentDir, "composer.json");
  const artisanPath = join(currentDir, "artisan");
  if (!existsSync(composerPath) || !existsSync(artisanPath)) return null;
  try {
    const composerJson = JSON.parse(readFileSync(composerPath, "utf8"));
    const projectName = (composerJson.name && composerJson.name.replace(/^laravel\//i, "")) || basename(currentDir);
    return { name: projectName, defaultPort: 8000 }; // php artisan serve
  } catch (err) {
    return null;
  }
}

// Detect plain HTML project (index.html in root)
function detectHtmlProject(currentDir) {
  const indexPath = join(currentDir, "index.html");
  if (!existsSync(indexPath)) return null;
  return { name: basename(currentDir), defaultPort: 5500 }; // Live Server default; matches VS Code
}

// Detect PHP/XAMPP project (index.php in root, not Laravel)
function detectPhpProject(currentDir) {
  if (detectLaravelProject(currentDir)) return null; // Laravel has its own flow
  const indexPhp = join(currentDir, "index.php");
  if (!existsSync(indexPhp)) return null;
  return { name: basename(currentDir), defaultPort: 80 }; // XAMPP/Apache default
}

// Check common ports for running dev servers (includes Laravel 8000, XAMPP/Live Server 8080/5500)
async function detectRunningDevServer() {
  const commonPorts = [3000, 5173, 5500, 8080, 8000, 80, 5000, 4000, 3001, 5174]; // 80 for XAMPP
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

// Auto-detect project in current directory (Laravel/PHP first, then Node/npm, then HTML)
async function autoDetectProject() {
  const currentDir = process.cwd();
  const packagePath = join(currentDir, "package.json");
  const runningPorts = await detectRunningDevServer();

  // 1) Laravel/PHP (composer.json + artisan) — default port 8000 (php artisan serve)
  const laravel = detectLaravelProject(currentDir);
  if (laravel) {
    const detectedPort = runningPorts.length > 0 ? runningPorts[0] : laravel.defaultPort;
    return {
      path: currentDir,
      name: laravel.name,
      port: detectedPort,
      projectType: "laravel"
    };
  }

  // 2) Node/npm (package.json)
  if (existsSync(packagePath)) {
    try {
      const packageJson = JSON.parse(readFileSync(packagePath, "utf8"));
      const projectName = packageJson.name || basename(currentDir);
      const detectedPort =
        runningPorts.length > 0 ? runningPorts[0] : detectPortFromPackage(packagePath);
      return {
        path: currentDir,
        name: projectName,
        port: detectedPort,
        projectType: "node"
      };
    } catch (err) {
      // fall through to HTML check
    }
  }

  // 3) Plain HTML (index.html) — default port 5500 (Live Server), else built-in static server
  const html = detectHtmlProject(currentDir);
  if (html) {
    const detectedPort = runningPorts.length > 0 ? runningPorts[0] : html.defaultPort;
    return {
      path: currentDir,
      name: html.name,
      port: detectedPort,
      projectType: "html"
    };
  }

  // 4) PHP/XAMPP (index.php) — default port 80 (Apache), e.g. http://localhost/PeopleQ/
  const php = detectPhpProject(currentDir);
  if (php) {
    const detectedPort = runningPorts.length > 0 ? runningPorts[0] : php.defaultPort;
    return {
      path: currentDir,
      name: php.name,
      port: detectedPort,
      projectType: "php"
    };
  }

  return null;
}

// ASCII Logo - Compatible with all OS and terminals
function showLogo() {
  console.log("");
  console.log("                                                                                                             ");
  console.log("                                                                                                             ");
  console.log("8888888b.                88888888888                                  888         .d8888b.  888      8888888 ");
  console.log('888  "Y88b                   888                                      888        d88P  Y88b 888        888   ');
  console.log("888    888                   888                                      888        888    888 888        888   ");
  console.log("888    888  .d88b.  888  888 888  888  888 88888b.  88888b.   .d88b.  888        888        888        888   ");
  console.log('888    888 d8P  Y8b 888  888 888  888  888 888 "88b 888 "88b d8P  Y8b 888        888        888        888   ');
  console.log("888    888 88888888 Y88  88P 888  888  888 888  888 888  888 88888888 888 888888 888    888 888        888   ");
  console.log("888  .d88P Y8b.      Y8bd8P  888  Y88b 888 888  888 888  888 Y8b.     888        Y88b  d88P 888        888   ");
  console.log('8888888P"   "Y8888    Y88P   888   "Y88888 888  888 888  888  "Y8888  888         "Y8888P"  88888888 8888888 ');
  console.log("                                                                                                             ");
  console.log("                                                                                                             ");
  console.log("");
}

async function main() {
  // Clear screen - works on Windows, macOS, Linux
  // ANSI escape codes for clear screen + cursor to top
  process.stdout.write('\x1B[2J\x1B[0f');
  console.clear(); // Fallback for terminals that don't support ANSI

  // Show ASCII logo
  showLogo();

  console.log(`DevTunnel v${getPackageVersion()}`);
  console.log("Share your local dev servers worldwide");
  console.log("");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("");
  console.log("Repository: https://github.com/maiz-an/DevTunnel-CLI");
  console.log("npm Package: https://www.npmjs.com/package/devtunnel-cli");
  console.log("Website: https://devtunnel-cli.vercel.app");
  console.log("");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("");

  // Step 1: Check Node.js (version and availability)
  console.log("[1/4] Checking Node.js...");
  const minNodeMajor = 16;
  const currentMajor = parseInt(process.version.slice(1).split(".")[0], 10);
  if (isNaN(currentMajor) || currentMajor < minNodeMajor) {
    console.log("ERROR: Node.js " + minNodeMajor + "+ required. Current:", process.version);
    console.log("Install from: https://nodejs.org/");
    process.exit(1);
  }
  if (!await commandExists("node")) {
    console.log("ERROR: Node.js not found in PATH.");
    console.log("Install from: https://nodejs.org/");
    process.exit(1);
  }
  console.log("SUCCESS: Node.js " + process.version + " installed");
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
    const hasNpm = await commandExists("npm");
    if (!hasNpm) {
      console.log("ERROR: npm not found. Node.js/npm is required.");
      console.log("Install from: https://nodejs.org/");
      process.exit(1);
    }
    console.log("Installing dependencies...");
    console.log("");
    // Run npm install in the project root directory
    const result = await runCommand("npm", ["install"], PROJECT_ROOT);
    if (result.code !== 0) {
      console.log("");
      console.log("ERROR: npm install failed" + (result.error ? ": " + result.error.message : ""));
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
      const portSource =
        autoDetected.projectType === "laravel"
          ? "Laravel (php artisan serve)"
          : autoDetected.projectType === "html"
            ? "HTML project"
            : autoDetected.projectType === "php"
              ? "PHP/XAMPP"
              : "package.json";
      console.log(`Detected port ${autoDetected.port} (${portSource}), but no server running on that port`);
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

      // Try to detect port for selected project (Laravel → 8000, HTML → 5500, Node from package.json)
      const selectedPackagePath = join(selectedPath, "package.json");
      const laravelSelected = detectLaravelProject(selectedPath);
      const htmlSelected = detectHtmlProject(selectedPath);
      const detectedPort = laravelSelected
        ? laravelSelected.defaultPort
        : htmlSelected
          ? htmlSelected.defaultPort
          : detectPortFromPackage(selectedPackagePath);

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
    } else {
      // User confirmed – let them keep default port or type another (e.g. HTML default 5500, can change)
      const portPrompt = await prompts({
        type: "number",
        name: "port",
        message: "Dev server port (press Enter for default):",
        initial: devPort
      });
      if (portPrompt.port != null && portPrompt.port > 0) {
        devPort = portPrompt.port;
      }
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

    // Try to detect port for selected project (Laravel → 8000, HTML → 5500, PHP → 80, Node from package.json)
    const selectedPackagePath = join(projectPath, "package.json");
    const laravelSelected = detectLaravelProject(projectPath);
    const htmlSelected = detectHtmlProject(projectPath);
    const phpSelected = detectPhpProject(projectPath);
    let detectedPort = laravelSelected
      ? laravelSelected.defaultPort
      : htmlSelected
        ? htmlSelected.defaultPort  // 5500
        : phpSelected
          ? phpSelected.defaultPort  // 80
          : detectPortFromPackage(selectedPackagePath);

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

  // XAMPP subfolder (e.g. htdocs/PeopleQ → http://localhost/PeopleQ/) — proxy rewrites path
  const isPhpXamppSubfolder =
    devPort === 80 &&
    (projectPath.toLowerCase().includes("htdocs") || projectPath.toLowerCase().includes("www"));
  const basePath = isPhpXamppSubfolder ? "/" + basename(projectPath) : "";

  console.log("");
  console.log("Configuration:");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`Project: ${projectName}`);
  console.log(`Dev Server: localhost:${devPort}${basePath || ""}`);
  console.log(`Proxy Port: ${proxyPort}`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("");

  // For HTML projects with no server running: start built-in static server and confirm it works
  let staticServerProcess = null;
  const isHtmlProject = !!detectHtmlProject(projectPath);
  const portInUseNow = await checkPortInUse(devPort);
  if (isHtmlProject && !portInUseNow) {
    console.log("Starting built-in static server for HTML project...");
    const staticServerPath = join(__dirname, "static-server.js");
    const nodeBin = process.execPath;
    staticServerProcess = spawn(nodeBin, [staticServerPath, projectPath, devPort.toString()], {
      stdio: "pipe",
      shell: false
    });
    staticServerProcess.on("error", (err) => {
      console.error("ERROR: Could not start static server:", err.code === "ENOENT" ? "Node not found" : err.message);
    });
    const ready = await waitForServerReady(devPort, 10000);
    if (!ready) {
      if (staticServerProcess) staticServerProcess.kill();
      console.log("");
      console.log("ERROR: Built-in static server did not start in time. Check that port " + devPort + " is free.");
      process.exit(1);
    }
    console.log("Static server ready at http://localhost:" + devPort);
    console.log("");
  }

  // Start proxy server
  console.log("Starting services...");
  console.log("");
  const nodeBin = process.execPath;
  const proxyPath = join(__dirname, "proxy-server.js");
  const proxyArgs = [proxyPath, devPort.toString(), proxyPort.toString(), projectName];
  if (basePath) proxyArgs.push(basePath);
  const proxyProcess = spawn(nodeBin, proxyArgs, {
    stdio: "inherit",
    shell: false
  });

  const onChildError = (name, err) => {
    console.error("\nERROR: " + name + " failed to start:", err.code === "ENOENT" ? "Node not found. Install from https://nodejs.org" : err.message);
    process.exit(1);
  };
  proxyProcess.on("error", (err) => onChildError("Proxy server", err));

  // Wait for proxy to start
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Run main tunnel app (connects to proxy port)
  const indexPath = join(__dirname, "index.js");
  const tunnelProcess = spawn(nodeBin, [indexPath, proxyPort.toString(), projectName, projectPath], {
    stdio: "inherit",
    shell: false
  });
  tunnelProcess.on("error", (err) => onChildError("Tunnel service", err));

  // Handle cleanup
  const cleanup = () => {
    console.log("\nShutting down...");
    if (staticServerProcess) try { staticServerProcess.kill(); } catch (_) {}
    try { proxyProcess.kill(); } catch (_) {}
    try { tunnelProcess.kill(); } catch (_) {}
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
  const msg = error && error.message ? error.message : String(error);
  console.error("\nERROR:", msg);
  if (error && error.code === "ENOENT") {
    console.error("   A required command or file was not found. Check that Node.js is installed: https://nodejs.org");
  }
  process.exit(1);
});
