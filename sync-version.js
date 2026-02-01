#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Read CLI package.json
const cliPackage = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const version = cliPackage.version;

console.log(`📦 Syncing version ${version} across all files...`);

// 1. Update start.js
const startPath = './src/core/start.js';
let startContent = fs.readFileSync(startPath, 'utf8');
startContent = startContent.replace(
  /return pkg\.version \|\| "[\d.]+";/,
  `return pkg.version || "${version}";`
);
startContent = startContent.replace(
  /return "[\d.]+";/,
  `return "${version}";`
);
fs.writeFileSync(startPath, startContent);
console.log(`✅ Updated ${startPath}`);

// 2. Update index.html
const htmlPath = './src/utils/pages/index.html';
let htmlContent = fs.readFileSync(htmlPath, 'utf8');
htmlContent = htmlContent.replace(
  /Version [\d.]+ \|/,
  `Version ${version} |`
);
fs.writeFileSync(htmlPath, htmlContent);
console.log(`✅ Updated ${htmlPath}`);

// 3. Update website files (if paths exist)
const websitePath = path.resolve('../DevTunnelPages');
if (fs.existsSync(websitePath)) {
  // Update page.tsx
  const pagePath = path.join(websitePath, 'app/page.tsx');
  if (fs.existsSync(pagePath)) {
    let pageContent = fs.readFileSync(pagePath, 'utf8');
    pageContent = pageContent.replace(
      /"softwareVersion": "[\d.]+"/,
      `"softwareVersion": "${version}"`
    );
    pageContent = pageContent.replace(
      /v[\d.]+ • Free & Open Source • CLI Tool/g,
      `v${version} • Free & Open Source • CLI Tool`
    );
    pageContent = pageContent.replace(
      /DevTunnel-CLI v[\d.]+/g,
      `DevTunnel-CLI v${version}`
    );
    pageContent = pageContent.replace(
      /Version [\d.]+ • Free & Open Source/g,
      `Version ${version} • Free & Open Source`
    );
    fs.writeFileSync(pagePath, pageContent);
    console.log(`✅ Updated ${pagePath}`);
  }
}

console.log(`\n🎉 Version ${version} synced successfully!`);
console.log(`\n📝 Next steps:`);
console.log(`   1. Review changes: git diff`);
console.log(`   2. Commit: git add . && git commit -m "v${version}"`);
console.log(`   3. Publish: npm publish`);
