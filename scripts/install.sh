#!/usr/bin/env sh
# DevTunnel-CLI Linux install — one command, same style as Windows (winget) and macOS (brew).
# Usage: curl -fsSL https://raw.githubusercontent.com/maiz-an/DevTunnel-CLI/main/scripts/install.sh | sudo sh
# This is the only install method for Linux: run it once; it installs everything (Debian/Ubuntu: APT repo + install; other: binary).

set -e

REPO="maiz-an/DevTunnel-CLI"
APT_REPO="https://maiz-an.github.io/DevTunnel-CLI"
INSTALL_DIR="${INSTALL_DIR:-/usr/local/bin}"
VERSION="${1:-latest}"

# Debian/Ubuntu: add our APT repo and install (same as winget install / brew install)
if command -v apt-get >/dev/null 2>&1 && [ -f /etc/debian_version ] 2>/dev/null; then
  echo "Adding DevTunnel-CLI APT repo..."
  echo "deb [trusted=yes] ${APT_REPO} debian/" | tee /etc/apt/sources.list.d/devtunnel-cli.list >/dev/null
  if apt-get update -qq 2>/dev/null && apt-get install -y devtunnel-cli 2>/dev/null; then
    echo "Done. Run: devtunnel-cli"
    exit 0
  fi
  echo "APT repo not ready yet, installing from release..."
fi

# Other Linux: install from release tarball
if [ "$VERSION" = "latest" ]; then
  VERSION=$(curl -sSf "https://api.github.com/repos/${REPO}/releases/latest" | sed -n 's/.*"tag_name": "v\([^"]*\)".*/\1/p')
fi
TARBALL="devtunnel-cli-${VERSION}-linux-x64.tar.gz"
URL="https://github.com/${REPO}/releases/download/v${VERSION}/${TARBALL}"

echo "Installing devtunnel-cli ${VERSION} (standalone, no Node required)..."
mkdir -p "$INSTALL_DIR"
curl -sSfL "$URL" | tar xz -C "$INSTALL_DIR"
chmod +x "$INSTALL_DIR"/devtunnel-cli "$INSTALL_DIR"/devtunnel-cli-* 2>/dev/null || true
echo "Done. Run: devtunnel-cli"
