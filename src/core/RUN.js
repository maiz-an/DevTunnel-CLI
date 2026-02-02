#!/usr/bin/env node

// Universal Node.js Launcher - Works on ALL platforms!
import { spawn } from "child_process";
import { readFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Version flags: devtunnel-cli --version, -v, or --v
const args = process.argv.slice(2);
const showVersion = args.some((a) => a === "--version" || a === "-v" || a === "--v");
if (showVersion) {
  try {
    const pkgPath = join(dirname(dirname(__dirname)), "package.json");
    const version = existsSync(pkgPath)
      ? JSON.parse(readFileSync(pkgPath, "utf8")).version
      : "?.?.?";
    console.log(version);
  } catch (err) {
    console.log("?.?.?");
  }
  process.exit(0);
}

const originalEmitWarning = process.emitWarning;
process.emitWarning = function(warning, ...args) {
  if (typeof warning === 'string' && warning.includes('util._extend')) {
    return;
  }
  return originalEmitWarning.call(this, warning, ...args);
};

process.stdout.write('\x1B[2J\x1B[0f');
console.clear();

const startPath = join(__dirname, "start.js");
// Use same Node binary as current process (works when "node" is not in PATH)
const nodeBin = process.execPath;
const child = spawn(nodeBin, [startPath], {
  stdio: "inherit",
  shell: false
});

child.on("error", (err) => {
  if (err.code === "ENOENT") {
    console.error("❌ Node.js is required but could not be found.");
    console.error("   Install from: https://nodejs.org");
  } else {
    console.error("❌ Error starting app:", err.message);
  }
  process.exit(1);
});

child.on("close", (code) => {
  if (code !== 0) {
    console.log(`\n⚠️  Process exited with code ${code}`);
  }
  process.exit(code || 0);
});

// Handle Ctrl+C
process.on("SIGINT", () => {
  child.kill("SIGINT");
});

process.on("SIGTERM", () => {
  child.kill("SIGTERM");
});
