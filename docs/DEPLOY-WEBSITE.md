# 🌐 DevTunnel Website Hosting Guide

## 📍 Website Location

The standalone website is located at:
```
src/utils/pages/
```

## 🚀 Quick Preview

**Windows:**
```
Double-click: src/utils/pages/PREVIEW.bat
```

**Mac/Linux:**
```bash
cd src/utils/pages
open index.html
```

---

## 🌐 Hosting Options

### Option 1: GitHub Pages (Simplest)

1. **Create new repository** `devtunnel-website`

2. **Copy files:**
   ```bash
   cp -r src/utils/pages/* /path/to/devtunnel-website/
   cd /path/to/devtunnel-website
   ```

3. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/devtunnel-website.git
   git push -u origin main
   ```

4. **Enable GitHub Pages:**
   - Settings → Pages
   - Source: `main` branch
   - Folder: `/ (root)`

5. **Live at:**
   ```
   https://YOUR_USERNAME.github.io/devtunnel-website
   ```

---

### Option 2: Netlify Drop (Easiest)

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag `src/utils/pages` folder
3. Get instant live URL!

---

### Option 3: Vercel

1. Go to [vercel.com](https://vercel.com)
2. Import `src/utils/pages` folder
3. Deploy!

---

### Option 4: Cloudflare Pages

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Upload `src/utils/pages` folder
3. Done!

---

## 📁 Website Files

- `index.html` - Main landing page
- `styles.css` - Modern dark theme styling
- `script.js` - Interactive features
- `README.md` - Hosting instructions
- `PREVIEW.bat` - Windows preview launcher

---

## ✨ Features

- ✅ Pure HTML/CSS/JS (no build step)
- ✅ Fully responsive
- ✅ Modern dark theme
- ✅ Interactive terminal demo
- ✅ Smooth animations
- ✅ Fast loading
- ✅ SEO-friendly

---

## 🎨 Customization

**Colors:** Edit `styles.css`
```css
:root {
    --primary: #3b82f6;
    --secondary: #8b5cf6;
}
```

**Content:** Edit `index.html` directly

---

## 🔧 Local Testing

```bash
cd src/utils/pages

# Python
python -m http.server 8000

# Node.js
npx serve

# PHP
php -S localhost:8000
```

Then visit: http://localhost:8000

---

**See `src/utils/pages/README.md` for full details!** 🚀
