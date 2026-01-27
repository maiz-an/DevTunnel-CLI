# 🔧 Troubleshooting Guide

## Common Issues and Solutions

### ❌ "Can't connect to dev server"

**Solution:**
Make sure your dev server is running BEFORE running DevTunnel:
```bash
npm run dev
```

Then run DevTunnel in a separate terminal.

---

### ❌ "Blocked request" error with Vite/React

**This is automatically fixed!**

DevTunnel uses a smart proxy that bypasses Vite's host restrictions.
No config changes needed!

If you still see this error:
1. Make sure you entered the correct port (where your dev server runs)
2. Restart your dev server
3. Run DevTunnel again

---

### ❌ Password page appears (LocalTunnel)

**Why it happens:**
You're using LocalTunnel as fallback (Cloudflare not installed)

**Solution:**
Install Cloudflare for better experience:

**Windows:**
```bash
winget install Cloudflare.cloudflared
```

**Mac:**
```bash
brew install cloudflared
```

**Linux:**
```bash
# Ubuntu/Debian
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared-linux-amd64.deb

# Or check: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/
```

---

### ❌ Port already in use

**Error:**
```
Port 4000 already in use
```

**Solution:**
The proxy port (your dev port + 1000) is occupied.

Either:
1. Stop the process using that port
2. Or use a different dev server port

---

### ❌ "No tunnel services available"

**Solution:**
Install Cloudflare (best option):

**Windows:**
```bash
winget install Cloudflare.cloudflared
```

**Mac:**
```bash
brew install cloudflared
```

**Linux:**
Follow installation guide for your distro

---

### ❌ Permission denied (Mac/Linux)

**Error:**
```
Permission denied: ./bin/mac/forward-dev.sh
```

**Solution:**
```bash
chmod +x bin/mac/forward-dev.sh
chmod +x bin/linux/forward-dev.sh
```

---

### ⚠️ Deprecation warnings

**Message:**
```
DeprecationWarning: The `util._extend` API is deprecated
```

**This is harmless!**
- Not an error
- Everything works fine
- Can be safely ignored
- From `http-proxy` library

---

### ❌ Node.js not found

**Solution:**
Install Node.js from: https://nodejs.org/

Or:

**Windows:**
```bash
winget install OpenJS.NodeJS
```

**Mac:**
```bash
brew install node
```

**Linux:**
```bash
# Ubuntu/Debian
sudo apt install nodejs npm

# Or use nvm: https://github.com/nvm-sh/nvm
```

---

### 🔍 Enable Debug Mode

Set environment variable for detailed logs:
```bash
# Windows
set DEBUG=forward-dev:*

# Mac/Linux
export DEBUG=forward-dev:*
```

Then run the app normally.

---

### 📝 Check Logs

Logs are saved in: `logs/` folder

Check the latest log file for detailed error information.

---

### 🆘 Still Having Issues?

1. Check logs in `logs/` folder
2. Make sure your dev server is running
3. Try restarting everything
4. Check your internet connection
5. Try a different port

---

**Need more help? Check the full docs or create an issue!**
