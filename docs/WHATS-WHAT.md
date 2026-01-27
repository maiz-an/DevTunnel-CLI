# 📋 What's What - Quick Reference

## Root Folder (What You See First)

### 🚀 To RUN the app:
```
START.bat          ← Windows users: Double-click this
START.command      ← Mac users: Double-click this
START.sh           ← Linux users: Run this
```

### 📖 To READ about it:
```
README.md          ← Start here! Main guide
CHANGELOG.md       ← What's new in each version
CONTRIBUTING.md    ← Want to help? Read this
LICENSE            ← MIT License (free to use)
```

### ⚙️ Config files (don't touch unless you know what you're doing):
```
package.json       ← npm dependencies
.gitignore         ← Git settings
.npmignore         ← npm settings
.editorconfig      ← Editor settings
```

---

## Folders

### 📂 `src/` - The Code
```
src/config/config.js    ← EDIT THIS to add your name!
src/core/start.js       ← Main entry point
src/core/index.js       ← Tunnel manager
src/core/proxy-server.js ← Smart proxy
src/utils/*             ← Helper functions
```

**What to edit:** Only `src/config/config.js` to add your name

### 📂 `docs/` - All Documentation
```
docs/README.md              ← Complete guide
docs/QUICK-START.md         ← Fast start
docs/FEATURES.md            ← All features
docs/TROUBLESHOOTING.md     ← Fix problems
docs/LAUNCH-INSTRUCTIONS.md ← How to launch
docs/FILE-GUIDE.md          ← Detailed file info
docs/STRUCTURE.md           ← Project organization
docs/INSTRUCTIONS.md        ← Customization
docs/PROJECT-INFO.txt       ← Visual guide
docs/WHATS-WHAT.md          ← This file
```

**Which to read:**
- First time? → `docs/QUICK-START.md`
- Having issues? → `docs/TROUBLESHOOTING.md`
- Want details? → `docs/README.md`

### 📂 `logs/` - Application Logs
```
logs/*.log    ← Created automatically when you run the app
```

**Don't edit these** - They're auto-generated for debugging

---

## Quick Answers

### "How do I run it?"
- **Windows:** Double-click `START.bat`
- **Mac:** Double-click `START.command`
- **Linux:** Run `./START.sh`

### "How do I add my name?"
Edit `src/config/config.js`:
```javascript
export const YOUR_NAME = "Your Name";
```

### "Where's the documentation?"
All in `docs/` folder. Start with `docs/README.md`

### "Can I delete anything?"
**NO, don't delete:**
- Launcher files (START.*)
- src/ folder
- package.json
- README.md

**YES, you can delete:**
- logs/*.log (they'll be recreated)
- docs/ folder (if you don't need docs)

### "What if something breaks?"
1. Check `docs/TROUBLESHOOTING.md`
2. Check `logs/` for error messages
3. Try running `npm install` again

---

## File Count

| What | How Many | Where |
|------|----------|-------|
| Launchers | 3 | Root folder |
| Docs | 4 | Root folder |
| Config files | 5 | Root folder |
| Source code | 7 | src/ |
| Documentation | 10 | docs/ |
| **TOTAL** | **29 files** | Organized! |

---

## Most Important Files

**If you do nothing else, know these 3:**

1. **START.bat** / **START.command** / **START.sh**
   - This runs the app!

2. **README.md**
   - This tells you what it does!

3. **src/config/config.js**
   - This is where you add your name!

---

**That's it! Everything else is organized and documented! 🎉**
