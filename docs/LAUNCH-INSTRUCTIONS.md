# 🚀 How to Launch DevTunnel

## Choose Your Method:

---

## ⚡ Method 1: Universal Launchers (Root Folder) - EASIEST!

### 🪟 Windows Users:
**Double-click:**
```
START.bat
```

### 🍎 Mac Users:
**Double-click:**
```
START.command
```

**Or in Terminal:**
```bash
chmod +x START.sh
./START.sh
```

### 🐧 Linux Users:
**In Terminal:**
```bash
chmod +x START.sh
./START.sh
```

---

## 📦 Method 2: Install via npm (Recommended)

**Step-by-Step:**

1. **Install DevTunnel (one-time):**
```bash
npm install -g devtunnel-cli
```

2. **Go to your project directory:**
```bash
cd your-project
```

3. **Start your dev server (Terminal 1):**
```bash
npm start
# OR
npm run dev
```

4. **Run DevTunnel (Terminal 2 - same directory!):**
```bash
cd your-project  # Same directory where you run npm start
devtunnel        # Auto-detects project and port!
```

**Important:** Run `devtunnel` from the same directory where you run `npm start` or `npm run dev`!

## 📦 Method 3: Universal Node Launcher (if downloaded)

**Works on ALL platforms:**
```bash
npm start
```

**Or:**
```bash
node src/core/RUN.js
```

---

## 🎯 Which Method Should I Use?

| Method | Best For | Pros |
|--------|----------|------|
| **Universal Launchers** (Root) | Everyone | ✅ Easy to find<br>✅ One-click launch<br>✅ No need to navigate |
| **Node RUN.js** | Developers | ✅ Works everywhere<br>✅ Terminal-friendly<br>✅ npm integration |

---

## 💡 First Time Setup:

### Mac Users (for .command and .sh files):
```bash
# Make executable
chmod +x START.command
chmod +x START.sh
chmod +x RUN.js
chmod +x bin/mac/forward-dev.sh
```

### Linux Users (for .sh files):
```bash
# Make executable
chmod +x START.sh
chmod +x RUN.js
chmod +x bin/linux/forward-dev.sh
```

### Windows Users:
- No setup needed! Just double-click `.bat` files

---

## 🎨 Which Launcher Does What?

**All launchers do the SAME thing:**
1. Check Node.js
2. Check Cloudflare
3. Check dependencies
4. Open folder picker
5. Get port number
6. Start proxy
7. Start tunnel
8. Give you public URL!

**They just provide different ways to start based on your preference!**

---

## 📝 Recommended for Sharing:

When sharing with friends, tell them:

**"Just double-click START.bat (Windows) or START.command (Mac)"**

Simple and works for everyone!

---

**Choose your favorite method and go! 🚀**
