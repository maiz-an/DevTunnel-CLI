# 🚀 How to Launch DevTunnel

## ⚡ Install via npm (Recommended)

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

---

## 🎯 What DevTunnel Does:

1. Checks Node.js
2. Checks/downloads Cloudflare (if needed)
3. Checks dependencies
4. Auto-detects your project and port
5. Creates proxy server
6. Starts tunnel
7. Gives you public URL!

---

## 📝 Recommended for Sharing:

When sharing with friends, tell them:

**"Install: `npm install -g devtunnel-cli`, then run `devtunnel` from your project directory"**

Simple and works for everyone!

---

**Choose your favorite method and go! 🚀**
