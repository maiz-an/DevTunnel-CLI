# Contributing to DevTunnel

Thank you for your interest in contributing! 🎉

## How to Contribute

### Reporting Bugs
1. Check if the bug is already reported in Issues
2. Create a new issue with:
   - Clear title
   - Detailed description
   - Steps to reproduce
   - Expected vs actual behavior
   - Your environment (OS, Node version, etc.)

### Suggesting Features
1. Check if the feature is already requested
2. Create a new issue with:
   - Clear description of the feature
   - Why it would be useful
   - How it should work

### Code Contributions

#### Setup
```bash
# Clone the repo
git clone https://github.com/yourusername/devtunnel.git
cd devtunnel

# Install dependencies
npm install

# Run the app
npm start
```

#### Making Changes
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Test thoroughly on your platform
5. Commit with clear messages
6. Push to your fork
7. Create a Pull Request

#### Code Style
- Use 2 spaces for indentation
- Follow existing code patterns
- Add comments for complex logic
- Keep functions small and focused

#### Testing
Test on all platforms if possible:
- Windows 10/11
- macOS (latest)
- Linux (Ubuntu/Debian)

#### Pull Request Process
1. Update README.md if needed
2. Update CHANGELOG.md
3. Ensure code works on multiple platforms
4. Wait for review and address feedback

## Project Structure

```
src/
├── core/        # Main application logic
├── utils/       # Helper functions
└── config/      # Configuration
```

## Adding Features

### New Tunnel Service
Edit `src/core/index.js` and add to `TUNNEL_SERVICES` array.

### New Utility
Create in `src/utils/` and import where needed.

### Documentation
Update relevant files in `docs/` folder.

## Questions?

Feel free to open an issue for any questions!

## Code of Conduct

Be respectful, helpful, and constructive. We're all here to make this tool better!

---

**Thank you for contributing!** 🚀
