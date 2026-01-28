# Changelog

All notable changes to DevTunnel will be documented in this file.

## [3.0.14] - 2026-01-28

### Fixed
- **Privilege Elevation** - Fixed automatic admin privilege request implementation

## [3.0.13] - 2026-01-28

### Added
- **Automatic Privilege Elevation** - DevTunnel now automatically requests administrator privileges on Windows when permission errors occur
- **Smart Permission Handling** - Detects permission errors and prompts for elevation instead of failing

### Changed
- **Better UX** - No need to manually run as administrator; DevTunnel handles it automatically

## [3.0.12] - 2026-01-28

### Fixed
- **Permission Errors** - Improved error handling for EPERM/EACCES errors when downloading Cloudflare binary
- **File Cleanup** - Safe file deletion that handles locked files gracefully
- **Error Messages** - Clear, actionable error messages for permission issues with solutions

### Changed
- **Code Quality** - Cleaned up comments and improved code readability
- **Error Recovery** - Better handling of file write errors with specific guidance

## [3.0.11] - 2026-01-28

### Removed
- **Manual Launchers** - Removed START.bat, START.command, and START.sh files
- **Legacy Installation Methods** - npm install is now the only supported installation method

### Fixed
- **Deprecation Warning** - Suppressed harmless `util._extend` warning from dependencies
- **Cleaner Output** - No more deprecation warnings cluttering the console

### Changed
- **Installation Method** - DevTunnel now exclusively uses npm for installation (`npm install -g devtunnel-cli`)
- **Documentation** - Updated all docs to reflect npm-only installation
- **Documentation** - Added comprehensive list of supported frameworks and backends
- **Clarified Support** - Explicitly states DevTunnel works with ALL APIs and backends
- **Simplified Workflow** - Removed confusion about multiple installation methods

## [3.0.10] - 2026-01-28

### Fixed
- **Port Detection Priority** - Now prioritizes running dev servers over package.json defaults
- **Port Verification** - Verifies detected port is actually in use before using it
- **Better Detection** - Checks for running servers first, then falls back to package.json

### Changed
- **Detection Logic** - Running servers are checked first, ensuring accurate port detection
- **User Feedback** - Better messages when port detection finds mismatches

## [3.0.9] - 2026-01-28

### Added
- **Automatic Project Detection** - Auto-detects project in current directory when running `devtunnel`
- **Automatic Port Detection** - Detects port from package.json scripts or running dev servers
- **Smart Port Selection** - Automatically uses running dev server port if detected
- **Multiple Project Support** - Easy selection when multiple projects are running
- **Intelligent Fallback** - Falls back to folder picker if no project detected

### Changed
- **Improved Workflow** - No need to manually select folder and port if project is detected
- **Better UX** - Confirms auto-detected project before proceeding
- **Cross-Platform** - Works seamlessly on Windows, macOS, and Linux

### How It Works
1. If you run `devtunnel` in a project directory with a running dev server, it auto-detects everything
2. If multiple projects are running, you can select which port to use
3. If no project detected, falls back to folder picker (existing behavior)

## [3.0.8] - 2026-01-28

### Changed
- **Startup Display** - Removed developer name, added npm package link
- **Info Header** - Now shows Repository, npm Package, and Website links

## [3.0.7] - 2026-01-28

### Added
- **Streaming Support** - Enhanced proxy server with better support for video/audio file streaming
- **Timeout Handling** - Increased timeout to 5 minutes for large file transfers
- **File Streaming Documentation** - Added comprehensive documentation about file size limitations

### Changed
- **Proxy Server** - Improved timeout handling and streaming support for large files
- **Features Documentation** - Added limitations section explaining Cloudflare free tier constraints
- **README** - Added streaming support to features list

### Fixed
- **Large File Streaming** - Better handling of video/audio files with proper timeout configuration
- **Stream Cancellation Errors** - Improved error handling for interrupted streams

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
