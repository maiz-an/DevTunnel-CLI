# DevTunnel 🚀

**Share your local dev servers worldwide - instantly!**

Zero Config | Cross-Platform | Works with Any Framework

---

## ⚡ Quick Start

### 🪟 Windows
**Double-click:** `START.bat`

### 🍎 Mac
**Double-click:** `START.command`  
*(First time: `chmod +x START.command`)*

### 🐧 Linux
```bash
chmod +x START.sh
./START.sh
```

### 📦 Or use npm (all platforms):
```bash
npm start
```

---

## 💡 Before You Start

**Make sure your dev server is running!**

```bash
# In another terminal:
npm run dev
```

Then run DevTunnel.

---

## ✨ Features

- 🤖 **Fully Automatic** - Installs everything automatically
- 🎯 **Zero Config** - No changes to your projects
- 🔗 **Smart Proxy** - Bypasses Vite/React host restrictions
- 🌍 **Cross-Platform** - Windows, macOS, Linux
- 📝 **Custom Branding** - Add your name as creator
- 🚀 **Multi-Framework** - Works with ANY framework

---

## 🎨 Add Your Name (Optional)

Edit `src/config/config.js`:

```javascript
export const YOUR_NAME = "Your Name";
```

Now everyone sees:
```
✅ PUBLIC URL (Created by: Your Name)
```

---

## 📖 Documentation

All documentation in `docs/` folder:

- 📚 **Complete Guide** - `docs/README.md`
- 🚀 **Quick Start** - `docs/QUICK-START.md`
- ✨ **Features** - `docs/FEATURES.md`
- 🔧 **Troubleshooting** - `docs/TROUBLESHOOTING.md`
- 📋 **Version History** - `docs/CHANGELOG.md`
- 🤝 **Contributing** - `docs/CONTRIBUTING.md`
- 📄 **License** - `docs/LICENSE`
- 📁 **Structure** - `docs/STRUCTURE.md`
- ⚙️ **Config** - `docs/INSTRUCTIONS.md`
- 🎯 **Quick Reference** - `docs/WHATS-WHAT.md`

---

## 🌍 Use Cases

### Share Backend APIs
```javascript
// Your backend runs locally on port 3000
npm run dev

// Run DevTunnel
npm start

// Get public URL: https://abc-xyz.trycloudflare.com

// Share with team - they can access from anywhere!
```

### Perfect for:
- ✅ Backend API sharing
- ✅ Frontend + Backend collaboration
- ✅ Client demos
- ✅ Team development
- ✅ Remote testing

---

## 🛠️ Requirements

- **Node.js** 16+ (auto-installed on Windows)
- **Internet connection**
- **Your dev server running**

---

## 📁 Project Structure

```
DevTunnel/
├── START.bat           # 🪟 Windows launcher
├── START.command       # 🍎 Mac launcher
├── START.sh            # 🐧 Linux launcher
├── README.md           # Main guide (you are here)
├── package.json        # npm config
├── src/                # Source code
│   ├── core/          # Main logic
│   ├── utils/         # Helpers
│   └── config/        # Your settings (edit config.js!)
├── docs/               # All documentation
└── logs/               # Auto-generated logs
```

---

## 🤝 Share with Friends

1. Edit `src/config/config.js` with your name
2. Share this folder (ZIP or Git)
3. Friends double-click `START.bat` / `START.command` / `START.sh`
4. They see your name automatically!
5. **NO login needed for anyone!**

---

---

**Version 3.0.0** | **License:** MIT (`docs/LICENSE`) | **DevTunnel - Share local servers worldwide**
