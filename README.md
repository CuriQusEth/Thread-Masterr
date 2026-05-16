# Thread Master

Welcome to **Thread Master**, a relaxing yet challenging thread-weaving and pattern-creation game. 
You are the legendary **Thread Master**, an artisan who weaves intricate, magical patterns using glowing cosmic threads. 

Connect nodes, create beautiful geometric and organic designs, and bring harmony to the floating tapestry realm!

## Features
- **Intuitive Web3 Integration:** Submit your tapestries and on-chain records via Base Mainnet.
- **ERC-8021:** Asset Attribution Standard implementation.
- **ERC-8004:** Trustless Agents Integration capable.
- **Beautiful Canvas Engine:** Realistic thread physics, glowing connections, and cosmic atmosphere.
- **Particle Effects:** Gorgeous resonance and cascade reactions when creating patterns.
- **Multi-Agent Architecture:** Fully compliant with MCP and A2A communication.

## Architecture & API
This project utilizes a Full-Stack architecture (Vite + React frontend and an Express Backend).

It exposes explicit endpoints to interact with the Thread Master Orchestrator:
- `GET /api/agent`: Exposes the main agent control API.
- `GET /api/mcp`: Identifies the capabilities of the MCP endpoint.
- `POST /api/mcp`: Listens to incoming Model Context Protocol commands (status, get_info, execute, etc).
- `/.well-known/agent-card.json`: Follows the [ERC-8004 Agent Registration Standard](https://eips.ethereum.org/EIPS/eip-8004#registration-v1).

## Development
- Local Dev: `npm run dev`
- Build & Export: `npm run build`
- Production Run: `npm run start`

Developed with React, Vite, Express, TypeScript, Canvas, and Tailwind CSS.
