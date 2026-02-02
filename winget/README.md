# WinGet manifests for DevTunnel-CLI

These manifests can be submitted to the [Windows Package Manager Community Repository](https://github.com/microsoft/winget-pkgs). The **Moniker** is set to `devtunnel-cli`, so users install with:

```powershell
winget install devtunnel-cli
```

## Submitting to winget-pkgs

1. When creating a new release, a portable zip is built and uploaded to GitHub Releases.
2. Compute the SHA256 of `devtunnel-cli-<version>-portable.zip` from the release.
3. Copy the three YAML files into `manifests/d/DevTunnel/DevTunnelCLI/<version>/` in the [winget-pkgs](https://github.com/microsoft/winget-pkgs) repo.
4. In the installer manifest, replace `PLACEHOLDER_REPLACE_WITH_ACTUAL_SHA256_WHEN_SUBMITTING` with the actual SHA256.
5. Open a PR to winget-pkgs.

Alternatively, use [wingetcreate](https://github.com/microsoft/winget-create) to generate and submit manifests.

## Note

The portable zip is a **standalone binary** — Node.js is not required. Users install with `winget install devtunnel-cli` and run immediately.
