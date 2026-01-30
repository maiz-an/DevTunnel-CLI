# Changelog

All notable changes to DevTunnel will be documented in this file.

## [3.0.26] - 2026-01-30

### Added
- **PHP/XAMPP detection** - Auto-detect projects with `index.php` (port 80)
- **XAMPP subfolder support** - Base path for `htdocs/ProjectName` so `http://localhost/PeopleQ/` works via tunnel
- **Port 80 in common ports** - Detects running Apache/XAMPP

### Changed
- Proxy accepts optional base path for path rewriting (XAMPP subfolders)

## [3.0.25] - 2026-01-30

### Added
- **Port override prompt** - When using detected project, can keep default port or type another (e.g. HTML default 5500)

### Changed
- Manual folder pick suggests 5500 for HTML, 80 for PHP

## [3.0.24] - 2026-01-30

### Changed
- **HTML default port 5500** - Matches VS Code Live Server; built-in static server uses 5500
- **Port scan order** - 5500 before 8080 so Live Server is preferred
- **Static server path fix** - Forward-slash paths on Windows so CSS/JS in subfolders load correctly

## [3.0.23] - 2026-01-30

### Fixed
- **HTML tunnel CSS/JS** - Strip query string from asset paths; rewrite absolute localhost URLs in HTML so styles/scripts work through tunnel

## [3.0.22] - 2026-01-30

### Added
- **Version command** - `devtunnel-cli --version`, `-v`, or `--v` prints version and exits

## [3.0.21] - 2026-01-30

### Fixed
- **npm page** - Explicit `files` in package.json; version from package.json in CLI; README install command and links use devtunnel-cli

## [3.0.20] - 2026-01-30

### Changed
- README: install command `devtunnel-cli`, remove hardcoded version, fix npm package links

## [3.0.19] - 2026-01-30

### Added
- **HTML built-in static server** - When HTML project and no server running, start static server and wait until ready before tunnel
- **waitForServerReady()** - Poll port until server responds (HTML flow)

### Fixed
- Suppress `util._extend` deprecation in proxy (dynamic import of http-proxy)

## [3.0.18] - 2026-01-30

### Fixed
- **Version display** - Read version from package.json so CLI banner shows correct version

## [3.0.17] - 2026-01-30

### Added
- **HTML project detection** - `index.html` in root → default port 8080 (then 5500)
- **Laravel/PHP detection** - `composer.json` + `artisan` → default port 8000 (`php artisan serve`)
- **detectLaravelProject(), detectHtmlProject()** - Project-type helpers
- **Common ports** - 5500 (Live Server), 8000 (Laravel) in port scan

### Changed
- **Auto-detect order** - Laravel first, then Node (package.json), then HTML
- Manual folder pick suggests 8000 for Laravel, 8080 for HTML

## [3.0.16] - 2026-01-30

### Changed
- (Version bump; features in 3.0.17)

## [3.0.15] - 2026-01-28

### Changed
- **Command Name** - Changed command from `devtunnel` to `devtunnel-cli` for consistency with package name
- **Consistency** - Package name and command are now both `devtunnel-cli`

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
- **Automatic Project Detection** - Auto-detects project in current directory when running `devtunnel-cli`
- **Automatic Port Detection** - Detects port from package.json scripts or running dev servers
- **Smart Port Selection** - Automatically uses running dev server port if detected
- **Multiple Project Support** - Easy selection when multiple projects are running
- **Intelligent Fallback** - Falls back to folder picker if no project detected

### Changed
- **Improved Workflow** - No need to manually select folder and port if project is detected
- **Better UX** - Confirms auto-detected project before proceeding
- **Cross-Platform** - Works seamlessly on Windows, macOS, and Linux

### How It Works
1. If you run `devtunnel-cli` in a project directory with a running dev server, it auto-detects everything
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
- **npm Package** - Published as `devtunnel` on npm for easy global installation
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
