import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create an MCP server
const server = new McpServer({
  name: "demo-server",
  version: "1.0.0",
});

server.registerTool(
  "add",
  {
    title: "addition tool",
    description: "Add two numbers.",
    inputSchema: {
      a: z.number().describe("The first number to add."),
      b: z.number().describe("The second number to add."),
    },
    outputSchema: { result: z.number() },
  },
  async ({ a, b }: { a: number; b: number }) => {
    const output = { result: a + b };

    return {
      content: [{ type: "text", text: JSON.stringify(output) }],
      structuredContent: output,
    };
  }
);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);
