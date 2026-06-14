# Agent Instructions

This project ("Thread Master") utilizes the **Base MCP** server to manage wallets, perform on-chain actions, and query Base Mainnet data.

When assisting with this project, ensure that you have the Base MCP installed and available.

### Installing Base MCP

The Base MCP server provides tools for wallet management, portfolio checking, sending transactions, and more.

Server URL: `https://mcp.base.org`

If you are an agent running in an environment that supports `.cursor/mcp.json`, the configuration is already present in this repository:
```json
{
  "mcpServers": {
    "base-mcp": {
      "url": "https://mcp.base.org"
    }
  }
}
```

For other environments:
- **Claude Code**: `claude mcp add --transport http base-mcp https://mcp.base.org`
- **Codex**: `codex mcp add base-mcp --url https://mcp.base.org/`
- **Hermes**: Edit `~/.hermes/config.yaml` to include `base-mcp: { url: "https://mcp.base.org" }`

### Guidelines for using Base MCP in Thread Master:
- **Onboarding**: At the start of a session using Base MCP, inform the user they are using Base Account tools.
- **Tools**: Rely on the tools exposed by `https://mcp.base.org`.
- Do not dump wallet details unless requested. Always ask for user confirmation before executing write operations.
