import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/mcp", (req, res) => {
    res.json({ status: "MCP Server Active. Use POST for JSON-RPC." });
  });

  app.post("/api/mcp", (req, res) => {
    try {
      const body = req.body || {};

      if (body.jsonrpc !== "2.0") {
        return res.status(400).json({
          jsonrpc: "2.0",
          error: { code: -32600, message: "Invalid Request" },
          id: body.id || null
        });
      }

      let result;

      switch (body.method) {
        case "initialize":
          result = {
            protocolVersion: "2024-11-05",
            capabilities: { tools: {} },
            serverInfo: {
              name: "Thread Master Orchestrator",
              version: "1.0.0"
            }
          };
          break;

        case "tools/list":
          result = {
            tools: [
              {
                name: "weave_thread",
                description: "Connect two nodes with a specific thread type",
                inputSchema: {
                  type: "object",
                  properties: {
                    startNode: { type: "string" },
                    endNode: { type: "string" },
                    threadType: { type: "string" },
                  },
                  required: ["startNode", "endNode", "threadType"],
                },
              },
              {
                name: "get_resonance",
                description: "Calculate current harmony resonance score",
                inputSchema: {
                  type: "object",
                  properties: {},
                  required: [],
                },
              },
              {
                name: "record_tapestry",
                description: "Submit the current tapestry to the blockchain",
                inputSchema: {
                  type: "object",
                  properties: {
                    score: { type: "number" },
                    signature: { type: "string" },
                  },
                  required: ["score"],
                },
              },
              {
                name: "say_gm",
                description: "Execute a generic 'Say GM' on-chain action",
                inputSchema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                  },
                  required: [],
                },
              },
              {
                name: "analyze_pattern",
                description: "Analyze the current node connections for special patterns",
                inputSchema: {
                  type: "object",
                  properties: {
                    depth: { type: "number" },
                  },
                  required: [],
                },
              },
            ],
          };
          break;

        case "tools/call":
          result = {
            content: [
              {
                type: "text",
                text: `Successfully executed tool: ${body.params?.name} with arguments ${JSON.stringify(
                  body.params?.arguments || {}
                )}`,
              },
            ],
          };
          break;

        case "prompts/list":
          result = { prompts: [] };
          break;

        case "resources/list":
          result = { resources: [] };
          break;

        default:
          return res.status(404).json({
            jsonrpc: "2.0",
            error: { code: -32601, message: "Method not found" },
            id: body.id,
          });
      }

      return res.status(200).json({
        jsonrpc: "2.0",
        result,
        id: body.id,
      });
    } catch (error) {
      return res.status(500).json({
        jsonrpc: "2.0",
        error: { code: -32700, message: "Parse error" },
        id: null
      });
    }
  });

  app.get("/api/agent", (req, res) => {
    res.json({
      name: "Thread Master Orchestrator",
      status: "active",
      wallet: "0xe157F1F5e12adB38Ba013683E9Ce24efe21e5bA6",
      platform: "Thread Master",
      version: "1.0.0"
    });
  });

  app.post("/api/agent", (req, res) => {
    res.json({
      success: true,
      received: req.body,
      agent: "Thread Master Orchestrator"
    });
  });

  // Serve .well-known from public statically natively
  app.use(express.static(path.join(process.cwd(), 'public')));

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
