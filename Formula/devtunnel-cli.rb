# Homebrew formula for DevTunnel-CLI (standalone, no Node required)
# Tap: brew tap maiz-an/DevTunnel-CLI https://github.com/maiz-an/DevTunnel-CLI
# Install: brew install devtunnel-cli

class DevtunnelCli < Formula
  desc "Share your local dev servers worldwide - Zero config tunnel"
  homepage "https://devtunnel-cli.vercel.app"
  version = "3.1.0"
  arch = Hardware::CPU.arm? ? "arm64" : "x64"
  url "https://github.com/maiz-an/DevTunnel-CLI/releases/download/v#{version}/devtunnel-cli-#{version}-darwin-#{arch}.tar.gz"
  sha256 :no_check
  license "MIT"
  head "https://github.com/maiz-an/DevTunnel-CLI.git", branch: "main"

  def install
    bin.install "devtunnel-cli", "devtunnel-cli-static-server", "devtunnel-cli-proxy", "devtunnel-cli-tunnel"
  end

  test do
    assert_match "devtunnel-cli", shell_output("#{bin}/devtunnel-cli --help 2>&1", 1)
  end
end
