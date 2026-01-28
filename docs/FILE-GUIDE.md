# 📄 Complete File Guide

## Root Files (What You See First)

### 🚀 Installation
Install via npm: `npm install -g devtunnel`

### 📖 Documentation
| File | Purpose |
|------|---------|
| `README.md` | Main guide - Start here! |
| `CHANGELOG.md` | Version history & updates |
| `CONTRIBUTING.md` | How to contribute |
| `LICENSE` | MIT License terms |

### ⚙️ Configuration
| File | Purpose |
|------|---------|
| `package.json` | npm dependencies & scripts |
| `package-lock.json` | Locked dependency versions |
| `.gitignore` | Git ignore rules |
| `.npmignore` | npm ignore rules |
| `.editorconfig` | Editor settings |

---

## Folders

### 💻 `src/`
All source code

```
src/
├── core/           # Main application logic
│   ├── start.js           # Entry point & setup
│   ├── index.js           # Tunnel manager
│   ├── proxy-server.js    # Smart proxy
│   └── RUN.js             # Universal launcher
│
├── utils/          # Helper functions
│   ├── folder-picker.js   # Cross-platform folder selection
│   └── tunnel-helpers.js  # LocalTunnel integration
│
└── config/         # Reserved for future config
```

### 📚 `docs/`
Complete documentation

```
docs/
├── README.md               # Complete guide
├── QUICK-START.md          # Fast start instructions
├── FEATURES.md             # All features explained
├── TROUBLESHOOTING.md      # Fix common issues
├── LAUNCH-INSTRUCTIONS.md  # How to launch
├── INSTRUCTIONS.md         # Customization guide
├── STRUCTURE.md            # Project organization
├── PROJECT-INFO.txt        # Visual ASCII guide
└── FILE-GUIDE.md           # This file
```

### 📊 `logs/`
Application logs (created automatically)

```
logs/
├── .gitkeep               # Keeps folder in git
└── *.log                  # Log files (auto-generated)
```

---

## File Purposes Explained

### Installation

Install via npm: `npm install -g devtunnel`

Then run: `devtunnel` from your project directory

### Source Files

**src/core/start.js**
- Main entry point
- Checks Node.js, Cloudflare, dependencies
- Opens folder picker
- Gets port number
- Starts proxy and tunnel

**src/core/index.js**
- Manages tunnel services
- Multi-service fallback logic
- URL extraction and display
- Professional output formatting

**src/core/proxy-server.js**
- HTTP/WebSocket proxy
- Forwards requests to dev server
- Handles CORS
- No config changes needed!

**src/core/RUN.js**
- Universal Node.js launcher
- Works on all platforms
- Used by `npm start`

**src/utils/folder-picker.js**
- Cross-platform folder selection
- Windows: OpenFileDialog
- Mac: osascript
- Linux: zenity/kdialog

**src/utils/tunnel-helpers.js**
- LocalTunnel integration
- Fallback tunnel service
- Process management

**src/config/config.js**
- User settings
- YOUR_NAME for branding
- Easy to customize

### Config Files

**.gitignore**
- Tells git what to ignore
- node_modules, logs, etc.

**.npmignore**
- Tells npm what to exclude
- Source files, docs, etc.

**.editorconfig**
- Editor settings
- Consistent code formatting

**package.json**
- npm dependencies
- Scripts (npm start, etc.)
- Project metadata

---

## Which Files Can You Edit?

### ✅ Safe to Edit
- `src/config/` - Reserved for future config
- All files in `docs/` - Improve docs
- `CONTRIBUTING.md` - Add guidelines
- `README.md` - Update main guide

### ⚠️ Edit Carefully
- `src/core/*.js` - Core logic
- `src/utils/*.js` - Utilities
- `package.json` - Dependencies
- Launchers - Platform-specific

### ❌ Don't Edit
- `package-lock.json` - Auto-generated
- `node_modules/` - Dependencies
- `.gitignore` - Unless you know what you're doing

---

## Which Files Are Created Automatically?

- `logs/*.log` - Application logs
- `node_modules/` - npm packages
- `*.backup` - Vite config backups

---

## File Count Summary

| Category | Count | Location |
|----------|-------|----------|
| Root Launchers | 3 | ROOT |
| Root Docs | 4 | ROOT |
| Root Config | 5 | ROOT |
| Core Logic | 4 | src/core/ |
| Utilities | 2 | src/utils/ |
| Configuration | 1 | src/config/ |
| Documentation | 9 | docs/ |

**Total: 28 organized files** (excluding node_modules)

---

## Need More Info?

- **Using the app:** `README.md`
- **All features:** `docs/FEATURES.md`
- **Having issues:** `docs/TROUBLESHOOTING.md`
- **Want to contribute:** `CONTRIBUTING.md`
- **Project structure:** `docs/STRUCTURE.md`

---

**Everything is organized and documented! 🎉**
