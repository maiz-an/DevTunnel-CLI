# DevTunnel Website

## 🌐 Static Website for DevTunnel

This is a standalone static website for DevTunnel that can be hosted anywhere.

## 📁 Files

- `index.html` - Main landing page
- `styles.css` - All styling (modern dark theme)
- `script.js` - Interactive features and animations
- `README.md` - This file

## 🚀 How to Host

### Option 1: GitHub Pages (Simplest)

1. **Create a new repository** called `devtunnel-website`

2. **Push these files:**
   ```bash
   git init
   git add .
   git commit -m "Initial website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/devtunnel-website.git
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: Deploy from branch `main`
   - Folder: `/ (root)`
   - Save

4. **Your site will be live at:**
   ```
   https://YOUR_USERNAME.github.io/devtunnel-website
   ```

### Option 2: Netlify (Drag & Drop)

1. Go to [netlify.com](https://netlify.com)
2. Sign up (free)
3. Drag the `pages` folder to Netlify
4. Done! You get a live URL instantly

### Option 3: Vercel (Free)

1. Go to [vercel.com](https://vercel.com)
2. Sign up (free)
3. Import the `pages` folder
4. Deploy!

### Option 4: Any Static Host

These files work on:
- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages
- AWS S3 + CloudFront
- Firebase Hosting
- Any web server (Apache, Nginx, etc.)

Just upload the files and you're done!

## 🎨 Features

- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Modern dark theme with gradients
- ✅ Smooth animations and transitions
- ✅ Interactive terminal demo
- ✅ Copy-to-clipboard functionality
- ✅ Smooth scroll navigation
- ✅ Fast loading (pure HTML/CSS/JS)
- ✅ No build step required
- ✅ SEO-friendly

## 🔧 Customization

### Change Colors

Edit `styles.css`:
```css
:root {
    --primary: #3b82f6;     /* Main blue */
    --secondary: #8b5cf6;   /* Purple accent */
    --accent: #06b6d4;      /* Cyan accent */
}
```

### Update Content

Edit `index.html` directly - all content is plain HTML.

### Modify Animations

Edit `script.js` for interactive features.

## 📝 Testing Locally

Simply open `index.html` in your browser!

Or use a local server:
```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve

# PHP
php -S localhost:8000
```

Then visit: http://localhost:8000

## 🌐 Live Demo

Once hosted, your website will showcase:
- Hero section with animated terminal
- Feature highlights
- Step-by-step guide
- Use cases
- Download/installation options
- Footer with links

---

**Perfect for sharing DevTunnel with the world!** 🚀
