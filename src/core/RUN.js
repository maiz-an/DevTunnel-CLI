#!/usr/bin/env node

// Universal Node.js Launcher - Works on ALL platforms!
import { spawn } from "child_process";
import { platform } from "os";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("\n🚀 DevTunnel - Universal Launcher\n");
console.log(`📍 Platform detected: ${platform()}\n`);

// Start the main app
const startPath = join(__dirname, "src", "core", "start.js");
const child = spawn("node", [startPath], {
  stdio: "inherit",
  shell: true
});

child.on("error", (error) => {
  console.error("❌ Error starting app:", error.message);
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
