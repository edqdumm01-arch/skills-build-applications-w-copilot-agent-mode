# OctoFit Tracker Frontend

This Vite React app powers the OctoFit Tracker presentation tier.

## Environment configuration

Define VITE_CODESPACE_NAME in a local environment file before running the app in GitHub Codespaces.

Example:

```bash
cat > .env.local <<'EOF'
VITE_CODESPACE_NAME=your-codespace-name
EOF
```

If VITE_CODESPACE_NAME is unset, the app falls back to localhost for the API base URL.
