#!/usr/bin/env node
/**
 * Build standalone binaries with @yao-pkg/pkg (no Node required at runtime).
 * Produces: devtunnel-cli, devtunnel-cli-static-server, devtunnel-cli-proxy, devtunnel-cli-tunnel
 * for Windows (x64), macOS (x64, arm64), Linux (x64).
 */
import { spawnSync } from "child_process";
import { mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const dist = join(root, "dist");
const targets = "node18-win-x64,node18-macos-x64,node18-macos-arm64,node18-linux-x64";

if (!existsSync(dist)) mkdirSync(dist, { recursive: true });

const entries = [
  { src: "src/core/start.js", out: "devtunnel-cli" },
  { src: "src/core/static-server.js", out: "devtunnel-cli-static-server" },
  { src: "src/core/proxy-server.js", out: "devtunnel-cli-proxy" },
  { src: "src/core/index.js", out: "devtunnel-cli-tunnel" },
];

for (const { src, out } of entries) {
  const r = spawnSync(
    "npx",
    ["pkg", join(root, src), "--targets", targets, "--output", join(dist, out)],
    { cwd: root, stdio: "inherit", shell: true }
  );
  if (r.status !== 0) process.exit(r.status || 1);
}

console.log("Standalone binaries built in dist/");
