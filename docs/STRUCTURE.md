# 📁 Project Structure

## Overview

```
DevTunnel/
├── 📂 src/                     # Source code
│   ├── 📂 core/               # Core application logic
│   │   ├── start.js           # Main entry point & setup
│   │   ├── index.js           # Tunnel manager
│   │   └── proxy-server.js    # Smart proxy server
│   │
│   ├── 📂 utils/              # Utility functions
│   │   ├── folder-picker.js   # Cross-platform folder selection
│   │   └── tunnel-helpers.js  # LocalTunnel integration
│   │
│   └── 📂 config/             # Reserved for future config
│
├── 📂 docs/                    # Documentation
│   ├── README.md              # Full documentation (moved from docs/)
│   ├── INSTRUCTIONS.md        # Setup guide
│   ├── TROUBLESHOOTING.md     # Common issues & solutions
│   ├── FEATURES.md            # Feature documentation
│   └── STRUCTURE.md           # This file
│
├── 📂 logs/                    # Application logs
│   └── .gitkeep               # Keeps folder in git
│
├── 📄 package.json             # Dependencies & scripts
├── 📄 package-lock.json        # Dependency lock file
├── 📄 .gitignore              # Git ignore rules
└── 📄 README.md               # Quick start guide
```

---

## File Descriptions

### Installation

Install via npm: `npm install -g devtunnel-cli`

### Core (`src/core/`)

**start.js**
- Main entry point
- Checks Node.js, Cloudflare, dependencies
- Opens folder picker
- Starts proxy and tunnel

**index.js**
- Tunnel management
- Multi-service fallback (Cloudflare → Ngrok → LocalTunnel)
- URL extraction and display
- Professional output formatting

**proxy-server.js**
- HTTP/WebSocket proxy
- Forwards requests from tunnel to dev server
- Handles CORS
- No config changes needed!

### Utils (`src/utils/`)

**folder-picker.js**
- Cross-platform folder selection
- Windows: Modern OpenFileDialog
- macOS: osascript dialog
- Linux: zenity/kdialog

**tunnel-helpers.js**
- LocalTunnel integration
- Fallback tunnel service
- Process management

### Config (`src/config/`)

**config/ (Reserved)**
- Reserved for future user configuration
- Currently not used
- Simple and clean

### Docs (`docs/`)

- **README.md** - Complete documentation
- **INSTRUCTIONS.md** - Setup and customization
- **TROUBLESHOOTING.md** - Common problems
- **FEATURES.md** - Feature list and details
- **STRUCTURE.md** - Project organization (this file)

---

## Data Flow

```
User runs: devtunnel
    ↓
RUN.js (Universal launcher)
    ↓
start.js (Entry point)
    ↓
Checks: Node.js → Cloudflare → Dependencies
    ↓
Opens folder picker → Get project path & port
    ↓
Starts proxy-server.js (Port + 1000)
    ↓
Starts index.js (Tunnel manager)
    ↓
Tries: Cloudflare → Ngrok → LocalTunnel
    ↓
URL displayed → Tunnel active
    ↓
Requests: Internet → Tunnel → Proxy → Dev Server
```

---

## Key Design Decisions

### Why Proxy?
- Bypasses Vite/React host restrictions
- No user config changes needed
- Transparent request forwarding
- WebSocket support for HMR

### Why Multi-Service Fallback?
- Cloudflare might not be installed
- Provides backup options
- LocalTunnel always available (built-in)
- Ensures tool always works

### Why Separate Folders?
- Clean organization
- Easy to navigate
- Professional structure
- Scalable for future features

### Why Cross-Platform Launchers?
- Not everyone uses Windows
- Easy one-click/command start
- No need to remember commands
- Better user experience

---

## Adding New Features

### Add a new tunnel service:

1. Edit `src/core/index.js`
2. Add to `TUNNEL_SERVICES` array
3. Implement `available()` and args
4. Test on all platforms

### Add a new utility:

1. Create file in `src/utils/`
2. Export functions
3. Import in core files
4. Document in `docs/FEATURES.md`

### Add configuration:

1. Add file to appropriate folder
2. Export your functionality
3. Import where needed
4. Document in `docs/INSTRUCTIONS.md`

---

**Well-organized and scalable! 🚀**
