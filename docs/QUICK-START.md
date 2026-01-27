# 🚀 Quick Start Guide

## ⚡ EASIEST WAY - Just Double-Click in Root Folder!

### 🪟 Windows
**Double-click:**
```
START.bat
```

### 🍎 macOS
**Double-click:**
```
START.command
```
(First time: `chmod +x START.command`)

### 🐧 Linux
**Run:**
```bash
chmod +x START.sh
./START.sh
```

---

## 📦 Alternative - Use npm (all platforms):
```bash
npm start
```


---

## What Happens:

1. ✅ Checks Node.js (installs if missing on Windows)
2. ✅ Checks Cloudflare (installs if missing on Windows)
3. ✅ Checks dependencies (installs if missing)
4. ✅ Opens folder picker → Select your project
5. ✅ Enter port number (where your dev server runs)
6. ✅ Creates proxy server
7. ✅ Starts tunnel
8. ✅ **Get public URL!** 🎉

---

## Before You Start:

**Make sure your dev server is running!**

```bash
# In another terminal:
npm run dev
# or
npm start
# or however you start your dev server
```

Then run DevTunnel.

---

## First Time Setup:

### Windows
- Everything installs automatically!
- Just run `bin/windows/ForwardDev.bat`

### macOS
You might need to install Cloudflare manually:
```bash
brew install cloudflared
```

### Linux  
Install Cloudflare for your distro:
```bash
# Ubuntu/Debian
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared-linux-amd64.deb
```

---

## Customize (Optional):

Edit `src/config/config.js`:
```javascript
export const YOUR_NAME = "YourName";
```

Now URLs show:
```
✅ PUBLIC URL (Created by: YourName)
```

---

## Full Documentation:

- 📖 Full Docs: `docs/README.md`
- 🎨 Features: `docs/FEATURES.md`
- 🔧 Troubleshooting: `docs/TROUBLESHOOTING.md`
- 📁 Structure: `docs/STRUCTURE.md`
- ⚙️ Config: `docs/INSTRUCTIONS.md`

---

**That's it! Start sharing your backend! 🌍**
