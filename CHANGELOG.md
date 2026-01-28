# Changelog

All notable changes to DevTunnel will be documented in this file.

## [3.0.6] - 2026-01-28

### Changed
- **Updated ASCII Logo** - Replaced with exact logo design using █ and ▒ characters
- **Improved UI Spacing** - Added proper spacing around lines and sections for better readability
- **Better Visual Hierarchy** - Cleaner output with consistent spacing throughout

## [3.0.5] - 2026-01-28

### Changed
- **Updated ASCII Logo** - Replaced with exact stylized "DevTunnel" logo design (box-drawing characters)

## [3.0.4] - 2026-01-28

### Changed
- **Updated ASCII Logo** - Replaced with exact stylized "DevTunnel" logo design

## [3.0.3] - 2026-01-28

### Added
- **ASCII Logo** - Professional ASCII art logo displayed at startup
- **Improved Screen Clearing** - Better terminal clearing for fresh start on all platforms
- **Fullscreen Support** - Clears screen and positions cursor at top for clean display

## [3.0.2] - 2026-01-28

### Changed
- **Clean UI Design** - Removed box UI, replaced with simple lines for professional look
- **Reduced Font Size** - Standard font size throughout (no oversized text)
- **App & Developer Info** - Added header with app details and developer information at startup
- **Simplified Output** - Clean, minimal output like real-world CLI tools
- **Removed Emojis** - Professional text-only output

## [3.0.1] - 2026-01-28

### Fixed
- **npm Install Path Issue** - Fixed module resolution error when installed via `npm install -g devtunnel-cli`
- Path resolution now works correctly for both npm install and repo run methods

## [3.0.0] - 2026-01-28

### 🎉 Major Release

#### Added
- **npm Package** - Published as `devtunnel-cli` on npm for easy global installation
- **Bundled Cloudflare** - Automatically downloads on first run, no installation needed
- **Enterprise Error Handling** - Retry logic, multiple sources, comprehensive error messages
- **Smart Proxy Server** - Bypasses Vite/React host restrictions without config changes
- **Cross-Platform Native Dialogs** - Modern folder picker for Windows, macOS, Linux
- **Professional UI** - Clean, consistent output design
- **Multi-Service Fallback** - Cloudflare → Ngrok → LocalTunnel for 99.9% uptime
- **Improved UI** - Consistent, professional box designs across all platforms
- **Dynamic Path Detection** - Works with any folder name, handles paths with spaces
- **Security Policy** - Added SECURITY.md and CODE_OF_CONDUCT.md
- **Website** - Professional landing page at devtunnel.vercel.app

#### Changed
- Refactored to ES modules for better compatibility
- Improved folder structure (organized into core, utils, config)
- Enhanced documentation (15+ docs in `/docs` folder)
- Better error messages with troubleshooting steps
- Faster startup time with optimized checks

#### Fixed
- Cloudflare certificate errors (auto-fix prompt)
- Vite "Blocked request" issues (proxy solution)
- LocalTunnel password page (fallback prioritization)
- Inconsistent UI across different terminals
- Permission issues on Unix systems
- Path handling with spaces (Windows compatibility)
- Dynamic project root detection (works with any folder name)

### Technical Details
- **Node.js:** 16+ required
- **Cloudflare:** Auto-bundled (~40MB download on first run)
- **Platform Support:** Windows, macOS, Linux
- **Framework Support:** All (Vite, React, Next.js, Express, NestJS, etc.)

---

## [2.x] - Previous Versions

Legacy versions before major refactor. See git history for details.

---

## Contributing

See [CONTRIBUTING.md](docs/CONTRIBUTING.md) for how to contribute to DevTunnel.

## License

MIT License - see [LICENSE](docs/LICENSE)
