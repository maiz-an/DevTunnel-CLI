# 📝 Quick Start Instructions

## 🚀 How to Use DevTunnel

### Step 1: Install DevTunnel (one-time)
```bash
npm install -g devtunnel-cli
```

### Step 2: Go to Your Project Directory
```bash
cd your-project
```

### Step 3: Start Your Dev Server (Terminal 1 - keep running)
```bash
npm start
# OR
npm run dev
# OR whatever command your project uses
```

### Step 4: Run DevTunnel (Terminal 2 - same directory!)
```bash
cd your-project  # Same directory where you run npm start
devtunnel        # Auto-detects project and port!
```

**Important:** Run `devtunnel` from the same directory where you run `npm start` or `npm run dev`!

### Step 5: Auto-Detection (if running from project directory)

If you run `devtunnel` from your project directory, it will automatically:
- ✅ Detect your project
- ✅ Detect your running dev server port
- ✅ No manual input needed!

### Step 6: Manual Selection (if needed)

If auto-detection doesn't work, a modern folder picker will open. Navigate to and select your project folder, then enter the port:
- Vite: Usually `5173`
- Create React App: Usually `3000`
- Next.js: Usually `3000`
- Express/NestJS: Usually `3000` or `4000`

### Step 5: Get Your Public URL!

DevTunnel will display:
```
╔═══════════════════════════════════════════════════╗
║ ✅ PUBLIC URL                                    ║
╠═══════════════════════════════════════════════════╣
║ https://your-app-xyz.trycloudflare.com          ║
╠═══════════════════════════════════════════════════╣
║ 💡 Share this URL with anyone!                  ║
╚═══════════════════════════════════════════════════╝
```

**Share this URL with anyone worldwide!**

---

## 🎯 What Happens Behind the Scenes

1. **Auto-Check:**
   - Checks Node.js ✅
   - Checks/downloads Cloudflare (first run only) ✅
   - Installs dependencies ✅

2. **Smart Proxy:**
   - Creates proxy server on port 4000
   - Forwards requests to your dev server
   - Handles all host restrictions
   - No config changes needed!

3. **Tunnel Creation:**
   - Tries Cloudflare (fastest, no password)
   - Falls back to Ngrok if needed
   - Falls back to LocalTunnel if needed
   - Always works!

---

## 💡 Tips

- **First Run:** Takes 15-30 seconds (downloads Cloudflare)
- **Subsequent Runs:** Instant start!
- **Multiple Projects:** Run for each project separately
- **Stop Tunnel:** Press `Ctrl+C` in the terminal
- **Different Port:** Just enter new port when prompted

---

## 🔄 Sharing with Friends

1. Tell them to install: `npm install -g devtunnel-cli`
2. They run `devtunnel` from their project directory
3. Auto-detection selects their project
4. They get instant public URL
5. **No login needed for anyone!**

---

## 🆘 Troubleshooting

**Problem:** "Blocked request" error  
**Solution:** Already handled by proxy! Should work automatically.

**Problem:** Cloudflare download fails  
**Solution:** Will automatically use Ngrok or LocalTunnel.

**Problem:** Folder picker doesn't open  
**Solution:** Make sure you're running `devtunnel` from the correct directory.

See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for more help.

---

**That's it! DevTunnel is designed to just work!** 🚀
