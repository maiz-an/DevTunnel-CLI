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

// Binary URLs with multiple mirrors for reliability
const DOWNLOAD_URLS = {
  win32: [
    `https://github.com/cloudflare/cloudflared/releases/download/${CLOUDFLARED_VERSION}/cloudflared-windows-amd64.exe`,
    `https://cloudflared-releases.pages.dev/${CLOUDFLARED_VERSION}/cloudflared-windows-amd64.exe`
  ],
  darwin: [
    `https://github.com/cloudflare/cloudflared/releases/download/${CLOUDFLARED_VERSION}/cloudflared-darwin-amd64`,
    `https://cloudflared-releases.pages.dev/${CLOUDFLARED_VERSION}/cloudflared-darwin-amd64`
  ],
  linux: [
    `https://github.com/cloudflare/cloudflared/releases/download/${CLOUDFLARED_VERSION}/cloudflared-linux-amd64`,
    `https://cloudflared-releases.pages.dev/${CLOUDFLARED_VERSION}/cloudflared-linux-amd64`
  ]
};

// Get platform display name
function getPlatformName() {
  const platform = process.platform;
  return platform === 'win32' ? 'Windows' : platform === 'darwin' ? 'macOS' : 'Linux';
}

export function getBinaryPath() {
  const platform = process.platform;
  const binName = platform === 'win32' ? 'cloudflared.exe' : 'cloudflared';
  return path.join(BIN_DIR, platform, binName);
}

// Check available disk space (basic check)
function hasEnoughDiskSpace() {
  try {
    const stats = fs.statfsSync ? fs.statfsSync(BIN_DIR) : null;
    if (stats) {
      const availableSpace = stats.bavail * stats.bsize;
      const requiredSpace = 50 * 1024 * 1024; // 50MB
      return availableSpace > requiredSpace;
    }
    return true; // Assume OK if we can't check
  } catch {
    return true; // Assume OK if check fails
  }
}

function downloadFile(url, dest, retryCount = 0) {
  return new Promise((resolve, reject) => {
    // Create directory if needed
    const dir = path.dirname(dest);
    try {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    } catch (err) {
      reject(new Error(`Cannot create directory: ${err.message}`));
      return;
    }

    // Create temp file first
    const tempDest = dest + '.download';
    const file = fs.createWriteStream(tempDest);
    
    const request = https.get(url, { 
      headers: { 
        'User-Agent': 'DevTunnel/3.0',
        'Accept': '*/*'
      },
      timeout: 30000 // 30 second timeout
    }, (response) => {
      // Follow redirects
      if (response.statusCode === 302 || response.statusCode === 301) {
        file.close();
        fs.unlinkSync(tempDest);
        downloadFile(response.headers.location, dest, retryCount)
          .then(resolve)
          .catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(tempDest);
        reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
        return;
      }

      const totalSize = parseInt(response.headers['content-length'], 10);
      let downloaded = 0;
      let lastPercent = 0;

      response.on('data', (chunk) => {
        downloaded += chunk.length;
        if (totalSize) {
          const percent = Math.round((downloaded / totalSize) * 100);
          if (percent !== lastPercent && percent % 5 === 0) {
            const mb = (downloaded / 1024 / 1024).toFixed(1);
            const totalMb = (totalSize / 1024 / 1024).toFixed(1);
            process.stdout.write(`\r⏳ Downloading: ${percent}% (${mb}/${totalMb} MB)`);
            lastPercent = percent;
          }
        }
      });

      response.pipe(file);

      file.on('finish', () => {
        file.close(() => {
          // Move temp file to final destination
          try {
            if (fs.existsSync(dest)) {
              fs.unlinkSync(dest);
            }
            fs.renameSync(tempDest, dest);
            
            console.log('\n✅ Download complete');
            
            // Make executable on Unix-like systems
            if (process.platform !== 'win32') {
              try {
                fs.chmodSync(dest, 0o755);
                console.log('✅ Permissions set (executable)');
              } catch (err) {
                console.log('⚠️  Warning: Could not set executable permissions');
                console.log('   Run: chmod +x ' + dest);
              }
            }
            
            // Verify file size
            const stats = fs.statSync(dest);
            if (stats.size < 1000000) { // Less than 1MB is suspicious
              fs.unlinkSync(dest);
              reject(new Error('Downloaded file is too small (corrupted)'));
              return;
            }
            
            resolve();
          } catch (err) {
            reject(new Error(`Cannot finalize download: ${err.message}`));
          }
        });
      });
    });

    request.on('timeout', () => {
      request.destroy();
      file.close();
      if (fs.existsSync(tempDest)) fs.unlinkSync(tempDest);
      reject(new Error('Download timeout (30 seconds)'));
    });

    request.on('error', (err) => {
      file.close();
      if (fs.existsSync(tempDest)) fs.unlinkSync(tempDest);
      reject(err);
    });

    file.on('error', (err) => {
      file.close();
      if (fs.existsSync(tempDest)) fs.unlinkSync(tempDest);
      reject(new Error(`File write error: ${err.message}`));
    });
  });
}

// Try downloading from multiple URLs with retries
async function downloadWithRetry(urls, dest, maxRetries = 3) {
  for (let urlIndex = 0; urlIndex < urls.length; urlIndex++) {
    const url = urls[urlIndex];
    console.log(`📥 Source: ${urlIndex === 0 ? 'GitHub' : 'Mirror'} (${urlIndex + 1}/${urls.length})`);
    
    for (let retry = 0; retry < maxRetries; retry++) {
      try {
        if (retry > 0) {
          console.log(`🔄 Retry ${retry}/${maxRetries - 1}...`);
          await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2s before retry
        }
        
        await downloadFile(url, dest, retry);
        return true; // Success!
        
      } catch (err) {
        const isLastRetry = retry === maxRetries - 1;
        const isLastUrl = urlIndex === urls.length - 1;
        
        if (err.message.includes('ENOTFOUND') || err.message.includes('ECONNREFUSED')) {
          console.log(`\n❌ Network error: ${err.message}`);
        } else if (err.message.includes('timeout')) {
          console.log(`\n❌ Download timeout`);
        } else {
          console.log(`\n❌ Error: ${err.message}`);
        }
        
        if (isLastRetry && isLastUrl) {
          throw new Error(`All download attempts failed: ${err.message}`);
        }
        
        if (isLastRetry) {
          console.log('💡 Trying alternative source...\n');
          break; // Try next URL
        }
      }
    }
  }
  
  throw new Error('All download sources failed');
}

export async function setupCloudflared() {
  const platform = process.platform;
  const binaryPath = getBinaryPath();
  
  console.log('\n╔════════════════════════════════════════╗');
  console.log('║   📦 Cloudflare Setup (First Run)    ║');
  console.log('╚════════════════════════════════════════╝\n');
  
  // Check if binary already exists
  if (fs.existsSync(binaryPath)) {
    try {
      // Verify it works
      const testProc = spawn(binaryPath, ['--version'], { shell: true, stdio: 'pipe' });
      const works = await new Promise((resolve) => {
        testProc.on('close', (code) => resolve(code === 0));
        testProc.on('error', () => resolve(false));
        setTimeout(() => resolve(false), 5000);
      });
      
      if (works) {
        console.log('✅ Cloudflare already installed and working\n');
        return binaryPath;
      } else {
        console.log('⚠️  Existing binary not working, re-downloading...\n');
        fs.unlinkSync(binaryPath);
      }
    } catch {
      console.log('⚠️  Existing binary corrupted, re-downloading...\n');
      try {
        fs.unlinkSync(binaryPath);
      } catch {}
    }
  }

  const urls = DOWNLOAD_URLS[platform];
  if (!urls) {
    console.error(`❌ ERROR: Platform "${platform}" not supported`);
    console.error('   Supported: Windows, macOS, Linux\n');
    return null;
  }

  console.log(`🖥️  Platform: ${getPlatformName()}`);
  console.log(`📍 Install to: ${binaryPath}`);
  console.log(`📊 Size: ~40 MB\n`);
  
  // Check disk space
  if (!hasEnoughDiskSpace()) {
    console.error('❌ ERROR: Not enough disk space (need 50+ MB)\n');
    return null;
  }
  
  // Check write permissions
  try {
    const dir = path.dirname(binaryPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const testFile = path.join(dir, '.write-test');
    fs.writeFileSync(testFile, 'test');
    fs.unlinkSync(testFile);
  } catch (err) {
    console.error('❌ ERROR: Cannot write to installation directory');
    console.error(`   Location: ${path.dirname(binaryPath)}`);
    console.error(`   Reason: ${err.message}\n`);
    return null;
  }
  
  console.log('📥 Starting download...\n');
  
  try {
    await downloadWithRetry(urls, binaryPath);
    
    // Final verification
    console.log('\n🔍 Verifying installation...');
    const testProc = spawn(binaryPath, ['--version'], { shell: true, stdio: 'pipe' });
    const works = await new Promise((resolve) => {
      testProc.on('close', (code) => resolve(code === 0));
      testProc.on('error', () => resolve(false));
      setTimeout(() => resolve(false), 5000);
    });
    
    if (works) {
      console.log('✅ Verification successful!');
      console.log('✅ Cloudflare ready to use\n');
      return binaryPath;
    } else {
      console.error('❌ Downloaded binary not working properly');
      try {
        fs.unlinkSync(binaryPath);
      } catch {}
      return null;
    }
    
  } catch (err) {
    console.error('\n╔════════════════════════════════════════╗');
    console.error('║   ❌ Installation Failed              ║');
    console.error('╚════════════════════════════════════════╝\n');
    console.error(`Reason: ${err.message}\n`);
    
    console.log('💡 Troubleshooting:');
    console.log('   1. Check internet connection');
    console.log('   2. Check firewall/antivirus settings');
    console.log('   3. Try again later');
    console.log('   4. Install manually: https://github.com/cloudflare/cloudflared/releases\n');
    
    console.log('🔄 DevTunnel will use fallback tunnels (Ngrok/LocalTunnel)\n');
    
    return null;
  }
}

// Check if bundled cloudflared exists and is working
export function hasBundledCloudflared() {
  const binaryPath = getBinaryPath();
  return fs.existsSync(binaryPath);
}
