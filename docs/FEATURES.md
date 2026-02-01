# ✨ Features Guide

## 🎯 Purpose & Scope

DevTunnel-CLI is a development tool designed for:
- **Development & Testing**: Share local work with teammates
- **Mobile Testing**: Test apps on real devices without deployment
- **Client Demos**: Show work-in-progress features instantly
- **Webhook Debugging**: Test third-party webhooks on localhost

**This tool is intentionally NOT designed for:**
- Production environments
- Long-lived public services
- Hosting production traffic
- Applications requiring authentication

---

## Core Features

### 🤖 Fully Automatic Setup

- Auto-installs Cloudflare (if not present)
- Auto-installs npm dependencies
- Auto-detects dev server and port
- **Supports multiple ports** — auto-detects or choose (3000, 8000, 5500, 80, etc.)
- Zero manual configuration

### 🔗 Smart Proxy System

**Problem:** Vite/React blocks requests from unknown hosts

**Solution:** DevTunnel creates a proxy server that:
- Sits between tunnel and your dev server
- Forwards all requests transparently
- Handles WebSocket for HMR (Hot Module Reload)
- Enables CORS automatically
- **No config changes needed!**

**How it works:**
```
Internet → Cloudflare Tunnel → Proxy → Your Dev Server
          (Port 4000)          (Port 3000)
```

### 🌍 Cross-Platform Support

**Windows:**
- Modern folder picker (Windows 11 style)
- `winget` auto-installation

**macOS:**
- Native folder dialog
- Shell script launchers
- Homebrew compatible

**Linux:**
- Zenity/KDialog dialogs
- Shell script launchers
- Works on all major distros

### 🚀 Multi-Tunnel Fallback

Automatically tries services in order:

1. **Cloudflare** (Best)
   - Fastest
   - Most reliable
   - No password page
   - ⭐ **Recommended**

2. **Ngrok** (Good)
   - Fast and popular
   - Requires account for persistent URLs

3. **LocalTunnel** (Fallback)
   - Always available (built-in)
   - Shows password page on first visit
   - Uses your public IP as password

### ⚡ Instant Public URLs

Get shareable URLs instantly:

Output:
```
╔═══════════════════════════════════════════════════╗
║ ✅ PUBLIC URL                                    ║
╠═══════════════════════════════════════════════════╣
║ https://your-app.serviceprovider.com           ║
╠═══════════════════════════════════════════════════╣
║ 💡 Share this URL with anyone!                  ║
╚═══════════════════════════════════════════════════╝
```

**Benefits:**
- No configuration needed
- Works immediately
- Share with anyone
- No login required

### 📊 Organized Logging

- Logs saved to `logs/` folder
- Timestamped log files
- Easy to debug issues
- Clean console output

### 🎯 Framework Agnostic

Works with ANY framework and backend:
- ✅ **Frontend:** Vite, React, Vue, Next.js, Angular, Svelte
- ✅ **Backend:** Express, NestJS, Fastify, Koa, Hapi
- ✅ **Python:** FastAPI, Flask, Django, Tornado
- ✅ **Java:** Spring Boot, Tomcat, Jetty
- ✅ **PHP:** Laravel, Symfony, WordPress
- ✅ **Go:** Gin, Echo, Fiber
- ✅ **Ruby:** Rails, Sinatra
- ✅ **Rust:** Actix, Rocket
- ✅ **Any HTTP/HTTPS server on any port!**
- ✅ **REST APIs, GraphQL APIs, WebSocket servers**
- ✅ **Microservices, monoliths, serverless functions**

---

## Advanced Features

### Multiple Projects

Run multiple instances simultaneously:

**Terminal 1:**
```bash
npm start
# Select Backend (Port 3000)
```

**Terminal 2:**
```bash
npm start
# Select Frontend (Port 5173)
```

Each gets its own public URL!

### Port Auto-Detection

- You enter your dev server port (e.g., 3000)
- Proxy automatically uses port + 1000 (e.g., 4000)
- No conflicts!

### WebSocket Support

Full WebSocket proxying for:
- Vite HMR (Hot Module Reload)
- Socket.io
- Real-time features
- Live updates

### File Streaming Support

DevTunnel supports streaming large files:
- ✅ Video files (MP4, WebM, etc.)
- ✅ Audio files
- ✅ Large downloads
- ✅ Progressive loading
- ⚠️ **Note**: Cloudflare free tier has limitations for very large files (>100MB)
- ⚠️ **Note**: Streaming may timeout for files >50MB depending on connection speed

### CORS Handling

Automatic CORS headers:
```javascript
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: *
Access-Control-Allow-Headers: *
```

Works with any frontend!

### Error Recovery

- Graceful error handling
- Clear error messages
- Auto-retry logic
- Fallback mechanisms

---

## Coming Soon 🚧

- [ ] Persistent custom URLs (named tunnels)
- [ ] Dashboard UI
- [ ] Traffic analytics
- [ ] Request logging
- [ ] Multiple tunnels management
- [ ] Webhook support
- [ ] API for programmatic use

---

## Performance

**Benchmarks:**

| Metric | Value |
|--------|-------|
| Startup time | ~3 seconds |
| Request latency | +50-100ms (tunnel overhead) |
| Throughput | ~100 req/sec |
| Max connections | Limited by Cloudflare |

**Tips for best performance:**
1. Use Cloudflare (fastest tunnel)
2. Keep dev server and tunnel on same machine
3. Use wired connection over WiFi
4. Close unnecessary apps

---

## 🔒 Security & Access Model

**Intentional Design Choices:**

### No Authentication (By Design)
- DevTunnel-CLI intentionally does NOT use authentication or access control
- This is a deliberate choice to ensure fast, frictionless development workflows
- Access is granted by **URL possession only** — anyone with the URL can access the tunnel

### Temporary URL Behavior
- URLs are **short-lived** and **unlisted**
- New random URLs generated each session
- URLs are **destroyed** when the tunnel stops
- Not indexed by search engines

### Why This Design?
- **Instant sharing**: No account setup, no login flows
- **Zero friction**: Run one command and share immediately
- **Maximum speed**: Perfect for rapid development and testing

### Best Practices
- ✅ Only share URLs with trusted collaborators
- ✅ Stop tunnels when not in use
- ✅ Never expose sensitive data or production databases
- ✅ Use only for development and testing

---

## ⚠️ Limitations & Design Constraints

DevTunnel-CLI has intentional limitations that optimize it for development speed:

### Intentional Limitations
- **No identity-based access control** — Anyone with the URL can access
- **No user-level permission management** — All or nothing access model
- **Not suitable for production** — Designed for temporary development use only
- **Temporary URLs only** — URLs do not persist across sessions

### What DevTunnel-CLI IS
- ✅ A rapid development tool
- ✅ Perfect for testing and demos
- ✅ Ideal for webhook debugging
- ✅ Great for team collaboration

### What DevTunnel-CLI IS NOT
- ❌ A production hosting solution
- ❌ An authentication/authorization system
- ❌ A permanent URL service
- ❌ An enterprise-grade tunnel with governance

---

## 🆚 DevTunnel-CLI vs. Enterprise Tunnels

**DevTunnel-CLI** is optimized for **speed and simplicity**.
**Enterprise tunnels** (e.g., Microsoft Dev Tunnels) are optimized for **governance and security**.

| Aspect | DevTunnel-CLI | Enterprise Tunnels |
|--------|---------------|-------------------|
| **Authentication** | None (by design) | Required (SSO, OAuth, identity) |
| **Access Control** | URL possession only | User/group-based permissions |
| **Setup Time** | Instant (0 config) | Requires account & auth setup |
| **Use Case** | Dev, testing, demos | Enterprise dev, compliance |
| **Ideal For** | Speed & simplicity | Governance & audit trails |

**Use DevTunnel-CLI when:**
- You need instant, frictionless sharing
- You're working on non-sensitive projects
- Speed is more important than governance

**Use enterprise tunnels when:**
- You need identity-based access control
- Your org requires audit logs and compliance
- You're in a regulated industry

---

## Limitations & Notes

### File Size & Streaming

- ✅ **Small files (<10MB)**: Works perfectly
- ✅ **Medium files (10-50MB)**: Works well, may have slight delays
- ⚠️ **Large files (>50MB)**: May timeout depending on connection speed
- ⚠️ **Very large files (>100MB)**: Not recommended for Cloudflare free tier

### Streaming Video/Audio

- ✅ **Short videos (<5 minutes)**: Works great
- ⚠️ **Long videos (>10 minutes)**: May experience interruptions
- 💡 **Tip**: For large media files, consider using a CDN or cloud storage instead

### Cloudflare Free Tier Limits

- Request timeout: ~100 seconds
- Connection limits apply
- Best for development/testing, not production

### Best Practices

1. **For development**: DevTunnel is perfect! ✅
2. **For production**: Use proper hosting/CDN
3. **For large files**: Use cloud storage (S3, Cloudflare R2, etc.)
4. **For video streaming**: Use dedicated video hosting (Vimeo, YouTube, etc.)

---

**Enjoy all these features! 🚀**
