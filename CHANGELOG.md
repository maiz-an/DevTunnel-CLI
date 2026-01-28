# Changelog

All notable changes to DevTunnel will be documented in this file.

## [3.0.0] - 2026-01-28

### 🎉 Major Release

#### Added
- **Bundled Cloudflare** - Automatically downloads on first run, no installation needed
- **Enterprise Error Handling** - Retry logic, multiple sources, comprehensive error messages
- **Smart Proxy Server** - Bypasses Vite/React host restrictions without config changes
- **Cross-Platform Native Dialogs** - Modern folder picker for Windows, macOS, Linux
- **Custom Branding** - Add your name to tunnel URLs
- **Multi-Service Fallback** - Cloudflare → Ngrok → LocalTunnel for 99.9% uptime
- **Improved UI** - Consistent, professional box designs across all platforms
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
