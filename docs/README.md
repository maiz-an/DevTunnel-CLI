# DevTunnel 🚀

**Share local dev servers worldwide - instantly!**

Fully automatic. Zero config. Just works.

---

## ⚡ Quick Start (Just 2 Steps!)

### Step 1: Start your dev server
```bash
npm run dev
```

### Step 2: Run the app

**Option A: Double-click**
```
RunApp.bat
```

**Option B: Terminal**
```bash
npm start
```

---

## 🎨 Show Your Name as Creator (Optional!)

Want to let your team know whose backend they're connecting to?

**Edit `config.js` file:**
```javascript
export const YOUR_NAME = "John";  // Your name!
```

**Now when they run it, they see:**
```
✅ PUBLIC URL (Created by: John):
   https://random-xyz.trycloudflare.com

   👤 Creator: John
   💡 Share this URL with your team!
```

**Benefits:**
- ✅ Team knows whose backend it is
- ✅ Professional and clear
- ✅ NO login needed for anyone!

**No login needed!** Just edit the file once and share!

**Features:**
- ✅ **NO config changes needed** - Works with ANY Vite/React project!
- ✅ Auto-installs Cloudflare (if needed)
- ✅ Auto-installs dependencies (if needed)
- ✅ **Modern folder picker** (Windows 11 style)
- ✅ **Built-in proxy** - Bypasses Vite host restrictions
- ✅ Get public URL instantly! ⚡

**Works with:** Vite, React, Next.js, Express, NestJS, ANY framework!  
**Platforms:** Windows, macOS, Linux

---

## ✨ Features

- 🤖 **Fully Automatic** - Installs everything, zero manual steps
- 🎯 **NO Config Changes** - Leaves your Vite/React projects untouched!
- 🎨 **Custom URLs** - Use your own URL prefix (optional!)
- 🖥️ **Modern Folder Picker** - Windows 11 style dialog
- 🔗 **Smart Proxy** - Bypasses Vite host restrictions automatically
- 🚀 **Smart Fallback** - Cloudflare → Ngrok → LocalTunnel
- 🌍 **Cross-Platform** - Works on Windows, macOS, Linux

---

## 📤 Share with Friends

1. Share this folder (ZIP or GitHub)
2. Friends run: `RunApp.bat`
3. **Done!** Everything installs automatically

**Only requirement:**
- Windows 10/11 (that's it!)

**Everything else is automatic:**
- ✅ Auto-installs Node.js (if needed)
- ✅ Auto-installs Cloudflare (if needed)
- ✅ Auto-installs dependencies
- ✅ Auto-configures everything
- ✅ No manual setup, ever!

---

## 🔧 How It Works

Automatically tries tunnel services in this order:

1. **Cloudflare** (if installed) - ⭐ **BEST** - Fast, no password, reliable
2. **Ngrok** (if installed) - Fast and popular
3. **LocalTunnel** (built-in) - ⚠️ Shows password page on first visit

**Smart Features:**
- 🔧 **Auto-fixes Vite config** - Automatically enables external access for Vite/React
- 💾 **Backup created** - Original config saved as `.backup` before changes
- 🎯 **Works with any framework** - Vite, React, Next.js, Express, NestJS, etc.
- 🚫 **No passwords with Cloudflare** - Perfect for sharing worldwide!

---

## 📝 Example Output

```
==========================================
  DevTunnel
==========================================

[1/4] Checking Node.js...
✅ SUCCESS: Node.js installed

[2/4] Checking Cloudflare...
✅ SUCCESS: Cloudflare already installed

[3/4] Checking dependencies...
✅ SUCCESS: Dependencies already installed

[4/4] Select your project folder...
⏳ Opening folder picker...

[Modern Windows 11 file picker opens]

✅ Selected: G:\MyProject

? Enter your dev server port: › 3000

==========================================
  Starting Proxy & Tunnel
==========================================
Project: MyProject
Dev Server: 3000
Proxy Port: 4000
==========================================

🔗 Starting proxy server...

============================================================
🔗 Proxy Server Started
============================================================
📦 Project: MyProject
🎯 Your dev server: http://localhost:3000
🔌 Proxy server: http://localhost:4000
============================================================
✅ Ready! The tunnel will connect to the proxy.

💡 This proxy forwards all requests to your dev server
   without needing ANY config changes!

🔍 Checking available tunnel services...
✅ Cloudflare is available
🌐 Starting Cloudflare tunnel...

==================================================
✅ PUBLIC URL:
   https://random-name.trycloudflare.com
==================================================

✅ Successfully connected via Cloudflare!
Press Ctrl+C to stop the tunnel
```

---

## ❓ Troubleshooting

### "Can't connect to dev server"?
→ Make sure your dev server is running BEFORE running this tool:
```bash
npm run dev
```

### Password page appears?
→ Using LocalTunnel fallback. Install Cloudflare for better experience:
```bash
winget install Cloudflare.cloudflared
```

### Port in use?
→ The tool uses port+1000 for the proxy (e.g., if your dev is on 3000, proxy uses 4000)

### Any other errors?
→ Run `RunApp.bat` again - auto-fixes most issues!

---

---

## 🎯 Use Case: Share Backend API Worldwide

Perfect for teams where:
- **Backend dev** runs their server locally (Express, NestJS, Vite, etc.)
- Runs `RunApp.bat` → Gets public URL instantly
- **Frontend dev** uses that URL as backend base URL
- **NO config changes** - Your project stays untouched!
- **Everyone** works seamlessly worldwide!

### How it works:
1. You: `npm run dev` (port 3000)
2. Run: `RunApp.bat`
3. Tool creates proxy on port 4000
4. Tunnel connects to proxy
5. Proxy forwards to your dev server
6. **Result:** Public URL works, your config unchanged! ✨

### Add YOUR name to URLs:
Edit `config.js` to add your name:
```javascript
export const YOUR_NAME = "john";
```

Now URLs look like:
```
https://john-abc-xyz.trycloudflare.com  ← Your name!
```

**Benefits:**
- ✅ Friends know it's YOUR backend
- ✅ Professional looking
- ✅ NO login needed for anyone!

---

**Made with 🤖 for zero-configuration dev sharing**

MIT License - Free to use and share worldwide!
