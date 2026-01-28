import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BIN_DIR = path.join(__dirname, '../../bin');
const CLOUDFLARED_VERSION = '2024.8.2'; // Latest stable version

// Binary URLs for each platform
const DOWNLOAD_URLS = {
  win32: `https://github.com/cloudflare/cloudflared/releases/download/${CLOUDFLARED_VERSION}/cloudflared-windows-amd64.exe`,
  darwin: `https://github.com/cloudflare/cloudflared/releases/download/${CLOUDFLARED_VERSION}/cloudflared-darwin-amd64`,
  linux: `https://github.com/cloudflare/cloudflared/releases/download/${CLOUDFLARED_VERSION}/cloudflared-linux-amd64`
};

export function getBinaryPath() {
  const platform = process.platform;
  const binName = platform === 'win32' ? 'cloudflared.exe' : 'cloudflared';
  return path.join(BIN_DIR, platform, binName);
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const file = fs.createWriteStream(dest);
    
    https.get(url, { headers: { 'User-Agent': 'DevTunnel' } }, (response) => {
      // Follow redirects
      if (response.statusCode === 302 || response.statusCode === 301) {
        downloadFile(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }

      const totalSize = parseInt(response.headers['content-length'], 10);
      let downloaded = 0;

      response.on('data', (chunk) => {
        downloaded += chunk.length;
        const percent = Math.round((downloaded / totalSize) * 100);
        process.stdout.write(`\r⏳ Downloading Cloudflare: ${percent}%`);
      });

      response.pipe(file);

      file.on('finish', () => {
        file.close();
        console.log('\n✅ Download complete');
        
        // Make executable on Unix-like systems
        if (process.platform !== 'win32') {
          fs.chmodSync(dest, 0o755);
        }
        
        resolve();
      });
    }).on('error', (err) => {
      fs.unlinkSync(dest);
      reject(err);
    });

    file.on('error', (err) => {
      fs.unlinkSync(dest);
      reject(err);
    });
  });
}

export async function setupCloudflared() {
  const platform = process.platform;
  const binaryPath = getBinaryPath();
  
  // Check if binary already exists
  if (fs.existsSync(binaryPath)) {
    console.log('✅ Cloudflare already bundled');
    return binaryPath;
  }

  const url = DOWNLOAD_URLS[platform];
  if (!url) {
    throw new Error(`Unsupported platform: ${platform}`);
  }

  console.log('📦 Setting up bundled Cloudflare...');
  console.log(`   Platform: ${platform}`);
  
  try {
    await downloadFile(url, binaryPath);
    console.log('✅ Cloudflare bundled successfully');
    return binaryPath;
  } catch (err) {
    console.error('❌ Failed to download Cloudflare:', err.message);
    return null;
  }
}

// Check if bundled cloudflared exists and is working
export function hasBundledCloudflared() {
  const binaryPath = getBinaryPath();
  return fs.existsSync(binaryPath);
}
