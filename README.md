# Thread Master

Welcome to **Thread Master**, a relaxing yet challenging thread-weaving and pattern-creation game. 
You are the legendary **Thread Master**, an artisan who weaves intricate, magical patterns using glowing cosmic threads. 

Connect nodes, create beautiful geometric and organic designs, and bring harmony to the floating tapestry realm!

## Project Overview
Thread Master is a visually breathtaking, mobile-first web game where players act as Thread Masters orchestrating cosmic threads. The game features interactive canvas physics, advanced glowing aesthetics, and deep blockchain integration through ERC-8021 and ERC-8004.

**URLs:**
- Live Application: https://thread-masterr.vercel.app/
- Agent Integration: https://thread-masterr.vercel.app/.well-known/agent-card.json

## Tech Stack
- **Frontend**: React, Next.js (App Router format provided), Tailwind CSS, Framer Motion
- **Web3 Engine**: Wagmi, Viem
- **State Management**: Zustand
- **Canvas Rendering**: HTML5 Canvas with custom particle and thread physics

## MCP Connection Guide
This project supports the **Model Context Protocol (MCP)** for active command execution and agent AI integrations. 

- **MCP Endpoint**: `https://thread-masterr.vercel.app/api/mcp`
- **Method**: The endpoint accepts JSON-RPC 2.0 POST requests according to standard MCP specifications.
- **Available MCP Tools**:
  - `weave_thread`: Connect two nodes with a specific thread type
  - `get_resonance`: Calculate current harmony resonance score
  - `record_tapestry`: Submit the current tapestry to the blockchain
  - `say_gm`: Execute a generic 'Say GM' on-chain action
  - `analyze_pattern`: Analyze the current node connections for special patterns

## Agent Card Details
An ERC-8004 compatible agent card is exposed at `/.well-known/agent-card.json`.
**Capabilities**:
- thread-mastery
- conversation-architecture
- multi-thread-control
- narrative-mastery
- advanced-weaving
- engagement-orchestration
- mcp-command-execution

**Skills**:
- **Thread Weaving**: Mastery of cosmic threads to create patterns.
- **Pattern Recognition**: Ability to identify symmetry and resonance in tapestries.
- **Narrative Orchestration**: Guiding the user's journey through the tapestry.

## Local Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Start Production Server**
   ```bash
   npm start
   ```
