# DevTunnel-CLI 🚀

**Share your local dev servers worldwide - Zero config tunnel for any framework**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey)](https://github.com/maiz-an/DevTunnel-CLI)
[![npm version](https://img.shields.io/npm/v/devtunnel-cli)](https://www.npmjs.com/package/devtunnel-cli)

🌐 **Website:** [maizan.me/devtunnel-cli](https://maizan.me/devtunnel-cli) | 📦 **npm:** [devtunnel-cli](https://www.npmjs.com/package/devtunnel-cli) | 💻 **GitHub:** [maiz-an/DevTunnel-CLI](https://github.com/maiz-an/DevTunnel-CLI)

---

## 🎯 Purpose & Scope

DevTunnel-CLI is designed for **DEVELOPMENT**, **TESTING**, **DEMOS**, and **WEBHOOK DEBUGGING**. It provides fast, frictionless access to your local dev servers from anywhere.

**This tool is NOT intended for:**
- Production environments
- Long-lived public services
- Hosting production traffic

DevTunnel-CLI is built for developers who need instant, temporary public URLs to share work-in-progress, test on mobile devices, demo features to clients, or debug webhooks from third-party services.

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

## 🔒 Security & Access Model

DevTunnel-CLI intentionally **does NOT use authentication or access control**. This is a deliberate design choice to ensure fast, frictionless development workflows.

**How Access Works:**
- Anyone with the generated temporary URL can access the tunnel until it is stopped
- No login, password, or identity verification required
- Access is limited by **possession of the URL only**

**Why This Design?**
- **Speed**: Get public URLs instantly without authentication setup
- **Simplicity**: Zero configuration — just run and share
- **Friction-free collaboration**: Share with teammates without managing accounts or permissions

**Temporary URL Behavior:**
- URLs are **short-lived** and **unlisted**
- URLs are **destroyed** when the tunnel stops
- New random URLs are generated each time you run DevTunnel-CLI
- URLs are not indexed by search engines

**Best Practices:**
- Only share URLs with trusted collaborators
- Stop the tunnel when not in use
- Never expose sensitive data or production databases through DevTunnel-CLI
- Use for development and testing only

---

## ⚠️ Limitations

DevTunnel-CLI has intentional limitations that make it ideal for development but unsuitable for other use cases:

### No Authentication or Access Control
- **By design**: No identity-based access control
- **By design**: No user-level permission management
- **By design**: No password protection or login system
- Anyone with the URL can access your tunnel

### Not Suitable For
- ❌ Production environments
- ❌ Long-lived public services
- ❌ Hosting production traffic
- ❌ Sensitive data exposure
- ❌ Public-facing applications

### Perfect For
- ✅ Development and testing
- ✅ Team collaboration and code reviews
- ✅ Mobile device testing
- ✅ Client demos and work-in-progress sharing
- ✅ Webhook debugging with third-party services
- ✅ Temporary public access to localhost

### File Size & Streaming Limits
- ✅ Small files (<10MB): Works perfectly
- ✅ Medium files (10-50MB): Works well, may have slight delays
- ⚠️ Large files (>50MB): May timeout depending on connection speed
- ⚠️ Very large files (>100MB): Not recommended for Cloudflare free tier

---

## 🆚 Comparison: DevTunnel-CLI vs. Enterprise Tunnels

DevTunnel-CLI is optimized for **speed and simplicity** rather than governance and authentication.

| Feature | DevTunnel-CLI | Enterprise Tunnels (e.g., Microsoft Dev Tunnels) |
|---------|---------------|--------------------------------------------------|
| **Setup Time** | Instant (0 config) | Requires account, authentication setup |
| **Authentication** | None (by design) | User-based auth, SSO, identity management |
| **Access Control** | URL possession only | Fine-grained permissions, user/group policies |
| **Use Case** | Development, testing, demos | Enterprise dev, governed access, compliance |
| **Speed** | Instant sharing | May require approval workflows |
| **Ideal For** | Solo devs, small teams, fast iteration | Large orgs, regulated industries, prod-like envs |

**Choose DevTunnel-CLI when:**
- You need instant, frictionless sharing
- You're working on non-sensitive development projects
- Speed and simplicity are priorities

**Choose enterprise tunnels when:**
- You need identity-based access control
- You're in a regulated or compliance-heavy environment
- You need audit logs and governance

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

**Latest on [npm](https://www.npmjs.com/package/devtunnel-cli)** | Made with ❤︎ for developers worldwide

---

## 🔍 Search keywords

Find this project as: **DevTunnel**, **devtunnel**, **dev-tunnel**, **Dev-Tunnel**, **DevTunnel-CLI**, **devtunnel-cli**, **dev-tunnel-cli**, **Dev-Tunnel-CLI**. npm (install here): [devtunnel-cli](https://www.npmjs.com/package/devtunnel-cli) · Docs: [maizan.me/devtunnel-cli](https://maizan.me/devtunnel-cli) · GitHub: [maiz-an/DevTunnel-CLI](https://github.com/maiz-an/DevTunnel-CLI).

---

## 📦 Links

- **Website**: [maizan.me/devtunnel-cli](https://maizan.me/devtunnel-cli)
- **npm**: [devtunnel-cli](https://www.npmjs.com/package/devtunnel-cli)
- **GitHub**: [maiz-an/DevTunnel-CLI](https://github.com/maiz-an/DevTunnel-CLI)
- **Issues**: [GitHub Issues](https://github.com/maiz-an/DevTunnel-CLI/issues)
