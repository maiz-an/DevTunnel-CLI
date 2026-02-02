#!/usr/bin/env node
/**
 * Build .deb package and minimal APT repo structure for gh-pages.
 * Run after build-standalone.js. Expects dist/*-linux-x64 binaries and package.json version.
 */
import { createHash } from "crypto";
import { readFileSync, mkdirSync, copyFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const dist = join(root, "dist");
const version = JSON.parse(readFileSync( join(root, "package.json"), "utf8")).version;
const debName = `devtunnel-cli_${version}_amd64.deb`;

const bins = [
  "devtunnel-cli",
  "devtunnel-cli-static-server",
  "devtunnel-cli-proxy",
  "devtunnel-cli-tunnel",
];

// 1. Build .deb
const buildDir = join(root, "deb-build");
mkdirSync(join(buildDir, "DEBIAN"), { recursive: true });
mkdirSync(join(buildDir, "usr", "bin"), { recursive: true });

const control = `Package: devtunnel-cli
Version: ${version}
Section: web
Priority: optional
Architecture: amd64
Maintainer: DevTunnel <https://github.com/maiz-an/DevTunnel-CLI>
Description: Share your local dev servers worldwide - Zero config tunnel
 DevTunnel-CLI: fast, zero-config tool to share local servers for development,
 testing, demos, and webhook debugging. Standalone binary, no Node required.
Homepage: https://devtunnel-cli.vercel.app
`;
writeFileSync(join(buildDir, "DEBIAN", "control"), control);

for (const b of bins) {
  const src = join(dist, `${b}-linux-x64`);
  const dest = join(buildDir, "usr", "bin", b);
  copyFileSync(src, dest);
  execSync(`chmod 755 "${dest}"`, { stdio: "inherit" });
}

execSync(`dpkg-deb -b "${buildDir}" "${join(root, debName)}"`, { stdio: "inherit", cwd: root });

// 2. APT repo layout: apt/pool/main/, apt/dists/debian/binary-amd64/
const aptRoot = join(root, "apt");
const poolMain = join(aptRoot, "pool", "main");
const distsAmd64 = join(aptRoot, "dists", "debian", "binary-amd64");
mkdirSync(poolMain, { recursive: true });
mkdirSync(distsAmd64, { recursive: true });

copyFileSync(join(root, debName), join(poolMain, debName));

const debPath = join(poolMain, debName);
const debBuf = readFileSync(debPath);
const size = debBuf.length;
const sha256 = createHash("sha256").update(debBuf).digest("hex");

const packages = `Package: devtunnel-cli
Version: ${version}
Architecture: amd64
Maintainer: DevTunnel
Filename: pool/main/${debName}
Size: ${size}
SHA256: ${sha256}
Description: Share your local dev servers worldwide - Zero config tunnel
 Homepage: https://devtunnel-cli.vercel.app
`;
writeFileSync(join(distsAmd64, "Packages"), packages);
execSync(`gzip -9 -k -f "${join(distsAmd64, "Packages")}"`, { stdio: "inherit" });

const release = `Origin: DevTunnel-CLI
Label: devtunnel-cli
Suite: debian
Codename: debian
Architectures: amd64
Components: binary-amd64
Description: DevTunnel-CLI APT repo
`;
writeFileSync(join(aptRoot, "dists", "debian", "Release"), release);

console.log(`Built ${debName} and apt repo in apt/`);
console.log(`Upload apt/ to gh-pages for apt install devtunnel-cli.`);