# 🌐 Deploy DevTunnel Website to Vercel

## 🚀 Quick Deploy

### Option 1: One-Click Deploy (Easiest)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/maiz-an/DevTunnel&project-name=devtunnel&repository-name=devtunnel&root-directory=website)

### Option 2: Manual Deploy

1. **Go to Vercel:** https://vercel.com

2. **Import Project:**
   - Click "Add New..." → "Project"
   - Import your GitHub repository: `maiz-an/DevTunnel`

3. **Configure:**
   - **Framework Preset:** Next.js
   - **Root Directory:** `website`
   - **Build Command:** (leave default) `npm run build`
   - **Output Directory:** (leave default) `.next`
   - **Install Command:** (leave default) `npm install`

4. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your site is live! 🎉

---

## 🎯 Your Website URL

After deployment, Vercel will give you a URL like:
```
https://devtunnel.vercel.app
```

Or

```
https://devtunnel-your username.vercel.app
```

---

## 🔧 Local Development

Want to test the website locally?

```bash
# Switch to website branch
git checkout website

# Navigate to website folder
cd website

# Install dependencies
npm install

# Run development server
npm run dev
```

Open: http://localhost:3000

---

## 📝 Updating the Website

1. Switch to website branch:
   ```bash
   git checkout website
   ```

2. Make your changes in `website/app/page.tsx`

3. Commit and push:
   ```bash
   git add .
   git commit -m "Update website"
   git push
   ```

4. Vercel will automatically redeploy! ✨

---

## 🎨 Website Features

The landing page includes:
- ✅ Modern, responsive design
- ✅ Dark mode by default
- ✅ Animated terminal demo
- ✅ Features showcase
- ✅ Step-by-step guide
- ✅ Quick start instructions
- ✅ Call-to-action buttons
- ✅ Mobile-friendly

---

## 🔗 After Deployment

### Update Main README

Add this to your main README.md:

```markdown
## 🌐 Website

Visit our landing page: **https://your-site.vercel.app**
```

### Update GitHub About

1. Go to: https://github.com/maiz-an/DevTunnel
2. Click ⚙️ next to "About"
3. Add website URL
4. Save!

---

## 💡 Custom Domain (Optional)

Want a custom domain like `devtunnel.com`?

1. Buy domain from Namecheap, GoDaddy, etc.
2. In Vercel dashboard → Settings → Domains
3. Add your custom domain
4. Update DNS records (Vercel will guide you)
5. Done! 🎉

---

## 🐛 Troubleshooting

**Build failed?**
- Make sure root directory is set to `website`
- Check that website branch exists
- Verify package.json exists in website folder

**Website not updating?**
- Check Vercel dashboard for deployment status
- Push changes to correct branch (`website`)
- Trigger manual redeploy in Vercel if needed

---

**Your DevTunnel website is ready to go live!** 🚀

Deploy URL: https://vercel.com/new/clone?repository-url=https://github.com/maiz-an/DevTunnel&root-directory=website
