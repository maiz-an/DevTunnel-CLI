# DevTunnel 🚀

**Share your local dev servers worldwide - Zero config tunnel for any framework**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey)](https://github.com/maiz-an/DevTunnel)
[![npm version](https://img.shields.io/npm/v/devtunnel-cli)](https://www.npmjs.com/package/devtunnel-cli)
[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-blue)](https://maiz-an.github.io/DevTunnel/)

🌐 **Website:** [devtunnel.vercel.app](https://devtunnel.vercel.app) | 📦 **npm:** [devtunnel-cli](https://www.npmjs.com/package/devtunnel-cli) | 💻 **GitHub Pages:** [maiz-an.github.io/DevTunnel](https://maiz-an.github.io/DevTunnel/)

---

## ⚡ Quick Start

### Step-by-Step Guide

**1. Install DevTunnel (one-time setup):**
```bash
npm install -g devtunnel-cli
```

**2. Navigate to your project directory:**
```bash
cd your-project
```

**3. Start your dev server (in one terminal):**
```bash
npm start
# OR
npm run dev
```

**4. Run DevTunnel (in another terminal, same directory):**
```bash
cd your-project  # Same directory where you run npm start
devtunnel        # Auto-detects project and port!
```

**That's it!** DevTunnel will automatically detect your project and running dev server port.

### Option 2: Download from GitHub

**Windows:**
Double-click `START.bat`

**macOS:**
Double-click `START.command`

**Linux:**
```bash
chmod +x START.sh
./START.sh
```

**Or use npm:**
```bash
npm start
```

---

## ✨ Features

- 🤖 **Fully Automatic** - Cloudflare bundled, no installation needed
- 🎯 **Zero Config** - No project changes needed
- 🔗 **Smart Proxy** - Bypasses Vite/React restrictions
- 🌍 **Cross-Platform** - Windows, macOS, Linux
- 🚀 **Any Framework** - Works with all
- 🔄 **Multi-Service** - Cloudflare, Ngrok, LocalTunnel fallback
- 📹 **Streaming Support** - Handles video/audio files (with limitations for large files)

---

## 💡 How to Use

**Important:** Run `devtunnel` from the same directory where you run `npm start` or `npm run dev`!

1. **Install DevTunnel** (one-time): `npm install -g devtunnel-cli`
2. **Go to your project**: `cd your-project`
3. **Start your dev server**: `npm start` or `npm run dev` (keep this running)
4. **Open a new terminal** in the same project directory
5. **Run DevTunnel**: `devtunnel` (auto-detects everything!)
6. **Get your public URL** and share it! 🌍

**Example:**
```bash
# Terminal 1 - Your dev server
cd my-react-app
npm run dev

# Terminal 2 - DevTunnel (same directory!)
cd my-react-app
devtunnel
```

**Works with any command:** Vite, Create React App, Next.js, Express, NestJS, etc.

---

## 📖 Documentation

Complete docs in `/docs` folder:
- [Complete Guide](docs/README.md)
- [Features](docs/FEATURES.md)
- [Troubleshooting](docs/TROUBLESHOOTING.md)
- [GitHub Pages Website](docs/DEPLOY-WEBSITE.md)

---

## 🛠️ Requirements

- Node.js 16+ (download from [nodejs.org](https://nodejs.org))
- Internet connection
- Your dev server running

**No other installations needed!** Cloudflare is automatically bundled on first run.

---

## 📄 License

MIT License - see [LICENSE](docs/LICENSE)

---

**Version 3.0.10** | Made with ❤️ for developers worldwide

---

## 🔍 Search Keywords

**DevTunnel** | **dev tunnel** | **localhost tunnel** | **cloudflare tunnel** | **ngrok alternative** | **port forwarding** | **local development** | **vite tunnel** | **react dev server** | **nextjs tunnel** | **npm devtunnel** | **devtunnel-cli** | **share localhost** | **development tools** | **zero config tunnel**

---

## 📦 Installation & Links

- **npm Package**: [devtunnel-cli](https://www.npmjs.com/package/devtunnel-cli)
- **GitHub Repository**: [maiz-an/DevTunnel](https://github.com/maiz-an/DevTunnel)
- **GitHub Pages**: [maiz-an.github.io/DevTunnel](https://maiz-an.github.io/DevTunnel/)
- **Official Website**: [devtunnel.vercel.app](https://devtunnel.vercel.app)
- **Documentation**: [docs/README.md](docs/README.md)
- **Issues**: [GitHub Issues](https://github.com/maiz-an/DevTunnel/issues)
