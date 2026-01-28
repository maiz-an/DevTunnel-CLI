#!/usr/bin/env node

// Universal Node.js Launcher - Works on ALL platforms!
import { spawn } from "child_process";
import { platform } from "os";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Clear screen before starting
process.stdout.write('\x1B[2J\x1B[0f');
console.clear();

// Start the main app
// start.js is in the same directory as RUN.js (src/core/)
const startPath = join(__dirname, "start.js");
const child = spawn("node", [startPath], {
  stdio: "inherit",
  shell: false
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
