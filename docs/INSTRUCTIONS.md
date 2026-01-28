# 📝 Quick Start Instructions

## 🚀 How to Use DevTunnel

### Step 1: Start Your Dev Server
```bash
npm start
# OR
npm run dev
# OR whatever command your project uses
```

### Step 2: Run DevTunnel

**Windows:**
```
Double-click: START.bat
```

**macOS:**
```
Double-click: START.command
```

**Linux:**
```bash
chmod +x START.sh
./START.sh
```

**Or use npm:**
```bash
npm start
```

### Step 3: Select Your Project

A modern folder picker will open. Navigate to and select your project folder.

### Step 4: Enter Port Number

Enter the port your dev server is running on:
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

1. Share the DevTunnel folder (ZIP or GitHub clone)
2. Friends run START.bat/START.command/START.sh
3. They select their project
4. They get instant public URL
5. **No login needed for anyone!**

---

## 🆘 Troubleshooting

**Problem:** "Blocked request" error  
**Solution:** Already handled by proxy! Should work automatically.

**Problem:** Cloudflare download fails  
**Solution:** Will automatically use Ngrok or LocalTunnel.

**Problem:** Folder picker doesn't open  
**Solution:** Run with `npm start` instead.

See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for more help.

---

**That's it! DevTunnel is designed to just work!** 🚀
