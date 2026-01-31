# DevTunnel-CLI 🚀

**Share your local dev servers worldwide - Zero config tunnel for any framework**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey)](https://github.com/maiz-an/DevTunnel-CLI)
[![npm version](https://img.shields.io/npm/v/devtunnel-cli)](https://www.npmjs.com/package/devtunnel-cli)

🌐 **Website:** [devtunnel-cli.mzieos.com](https://devtunnel-cli.mzieos.com) | 📦 **npm:** [devtunnel-cli](https://www.npmjs.com/package/devtunnel-cli) | 💻 **GitHub:** [maiz-an/DevTunnel-CLI](https://github.com/maiz-an/DevTunnel-CLI)

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

**3. Have your app running (in one terminal):**
```bash
npm run dev
# OR  php artisan serve   (Laravel)
# OR  XAMPP / Live Server (PHP/HTML)
# HTML: optional — DevTunnel can start a built-in server
```

**4. Run DevTunnel (in another terminal, same directory):**
```bash
cd your-project  # Same directory as your project
devtunnel-cli    # Auto-detects project type and port!
```

**That's it!** DevTunnel auto-detects Node, Laravel, HTML, and PHP/XAMPP projects.

---

## ✨ Features

- 🤖 **Fully Automatic** - Cloudflare bundled, no installation needed
- 🎯 **Zero Config** - No project changes needed
- 🔗 **Smart Proxy** - Bypasses Vite/React restrictions
- 🌍 **Cross-Platform** - Windows, macOS, Linux
- 🚀 **Any Framework** - Node, React, Laravel, plain HTML, PHP/XAMPP
- 📄 **HTML** - Default port 5500; built-in static server if none running
- 🐘 **PHP/XAMPP** - Port 80; supports htdocs subfolders (e.g. http://localhost/YourProject/)
- 🔄 **Multi-Service** - Cloudflare, Ngrok, LocalTunnel fallback
- 🔌 **Multiple Ports** - DevTunnel-CLI supports multiple ports; auto-detects or lets you choose
- 📹 **Streaming Support** - Handles video/audio files (with limitations for large files)

---

## 💡 How to Use

**Important:** Run `devtunnel-cli` from the same directory as your project!

1. **Install DevTunnel** (one-time): `npm install -g devtunnel-cli`
2. **Go to your project**: `cd your-project` (Node, Laravel, HTML, or XAMPP folder)
3. **Have your app running**: `npm run dev`, `php artisan serve`, or XAMPP. For HTML, optional — DevTunnel can serve it.
4. **Open a new terminal** in the same project directory
5. **Run DevTunnel**: `devtunnel-cli` (auto-detects project type and port!)
6. **Get your public URL** and share it! 🌍

**Example (Node):**
```bash
# Terminal 1
cd my-react-app
npm run dev

# Terminal 2 - same directory
cd my-react-app
devtunnel-cli
```

**Works with:** Vite, React, Next.js, Express, NestJS, Laravel, plain HTML, PHP/XAMPP, and any HTTP/HTTPS server.

---

## 📖 Documentation

- [Features](docs/FEATURES.md)
- [Troubleshooting](docs/TROUBLESHOOTING.md)
- [Contributing](docs/CONTRIBUTING.md)
- [License](docs/LICENSE)

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

**Latest on [npm](https://www.npmjs.com/package/devtunnel-cli)** | Made with ❤️ for developers worldwide

---

## 🔍 Search keywords

Find this project as: **DevTunnel**, **devtunnel**, **dev-tunnel**, **Dev-Tunnel**, **DevTunnel-CLI**, **devtunnel-cli**, **dev-tunnel-cli**, **Dev-Tunnel-CLI**. Official site: [devtunnel-cli.mzieos.com](https://devtunnel-cli.mzieos.com) · GitHub: [maiz-an/DevTunnel-CLI](https://github.com/maiz-an/DevTunnel-CLI) · npm: [devtunnel-cli](https://www.npmjs.com/package/devtunnel-cli).

---

## 📦 Links

- **Website**: [devtunnel-cli.mzieos.com](https://devtunnel-cli.mzieos.com)
- **npm**: [devtunnel-cli](https://www.npmjs.com/package/devtunnel-cli)
- **GitHub**: [maiz-an/DevTunnel-CLI](https://github.com/maiz-an/DevTunnel-CLI)
- **Issues**: [GitHub Issues](https://github.com/maiz-an/DevTunnel-CLI/issues)
