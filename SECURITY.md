# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 3.0.x   | :white_check_mark: |
| < 3.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability in DevTunnel, please report it by:

1. **DO NOT** open a public issue
2. Email: [Create a private security advisory](https://github.com/maiz-an/DevTunnel-CLI/security/advisories/new)
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

We will respond within 48 hours and work to fix the issue promptly.

## Security Considerations

### What DevTunnel Does:
- Downloads Cloudflare binary from official GitHub releases
- Creates tunnels to localhost only
- No data collection or tracking
- Open source - all code is auditable

### What DevTunnel Does NOT Do:
- Does not access files outside project folder
- Does not modify system settings
- Does not require admin/root privileges
- Does not send data to third parties
- Does not store credentials

### Safe Usage:
✅ Only share tunnel URLs with trusted people
✅ Stop tunnel when done (Ctrl+C)
✅ Your local server security is your responsibility
✅ Use firewall if exposing sensitive services

### Binary Downloads:
- Source: GitHub official releases only
- Protocol: HTTPS only
- Verification: File size and execution test
- Storage: Local project folder only

## Best Practices

1. **Keep Updated:** Use latest DevTunnel version
2. **Secure Your Server:** Tunnel only exposes what's already on localhost
3. **Use Authentication:** Add auth to your dev server if needed
4. **Monitor Access:** Be aware of who has your tunnel URL
5. **Close Tunnels:** Stop tunnel when not in use

## Questions?

For security questions, open a discussion at:
https://github.com/maiz-an/DevTunnel-CLI/discussions
