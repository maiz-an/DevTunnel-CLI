@echo off
echo === 1. DevTunnelPages ===
cd /d "G:\GitHubRep\DevTunnelPages"
git add -A
git commit -m "chore: v3.0.35, maizan.me/devtunnel-cli, proxy devtunnel-cli.vercel.app"
git push origin main

echo.
echo === 2. Portfolio ===
cd /d "G:\GitHubRep\Maizan - mzieO's"
git add -A
git commit -m "chore: proxy /devtunnel-cli to devtunnel-cli.vercel.app"
git push origin main

echo.
echo === 3. CLI Repo ===
cd /d "g:\GitHubRep\Dev Tunnel"
git add -A
git commit -m "chore: v3.0.35, maizan.me/devtunnel-cli, all refs updated"
git push origin main

echo.
echo === 4. npm publish ===
npm publish

echo.
echo === Done ===
pause
