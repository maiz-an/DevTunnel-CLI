@echo off
REM Release: commit, push, push tags. Run from repo root.
REM 1. Set version in package.json (e.g. 3.1.0) and run: node sync-version.js
REM 2. Run: scripts\release.cmd
REM Or use: npm version patch & node sync-version.js & scripts\release.cmd

cd /d "%~dp0\.."
for /f "delims=" %%v in ('node -p "require('./package.json').version"') do set V=%%v
git add .
git commit -m "Release v%V%"
git push
git push --tags
