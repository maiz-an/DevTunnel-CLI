# ✨ Features Guide

## Core Features

### 🤖 Fully Automatic Setup

- Auto-installs Cloudflare (if not present)
- Auto-installs npm dependencies
- Auto-detects dev server
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
- `.bat` launchers
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

### 📝 Custom Branding

Show your name as creator:

```javascript
// src/config/config.js
export const YOUR_NAME = "John";
```

Output:
```
✅ PUBLIC URL (Created by: John):
   https://abc-xyz.trycloudflare.com
   
   👤 Creator: John
```

**Benefits:**
- Team knows whose backend
- Professional appearance
- No login required for anyone

### 📊 Organized Logging

- Logs saved to `logs/` folder
- Timestamped log files
- Easy to debug issues
- Clean console output

### 🎯 Framework Agnostic

Works with ANY framework:
- ✅ Vite
- ✅ React
- ✅ Next.js
- ✅ NestJS
- ✅ Express
- ✅ FastAPI (Python)
- ✅ Flask (Python)
- ✅ Django (Python)
- ✅ Any HTTP server!

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

**Enjoy all these features! 🚀**
