# MCP Server Deployment

A Model Context Protocol (MCP) server that provides arithmetic tools for AI assistants like Claude.

## Features

- **Add Tool**: Add two numbers together with structured input/output

## Installation

### Prerequisites

- Node.js 18 or higher
- npm, yarn, or pnpm

### From Git Repository

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/mcp-server-deployment.git
cd mcp-server-deployment

# Install dependencies
pnpm install
# or
npm install

# Build the project
pnpm build
# or
npm run build
```

## Usage with Claude Desktop

To use this MCP server with Claude Desktop, you need to add it to your Claude configuration file.

### Configuration Steps

1. **Locate your Claude Desktop config file:**
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
   - Linux: `~/.config/Claude/claude_desktop_config.json`

2. **Add the server configuration:**

#### Option 1: Using the built package (recommended)

After building the project, add this to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "mcp-server-deployment": {
      "command": "node",
      "args": [
        "/absolute/path/to/mcp-server-deployment/dist/mcpserver/index.js"
      ]
    }
  }
}
```

#### Option 2: Using npx (if published to npm)

```json
{
  "mcpServers": {
    "mcp-server-deployment": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-server-deployment"
      ]
    }
  }
}
```

#### Option 3: Development mode with tsx

```json
{
  "mcpServers": {
    "mcp-server-deployment": {
      "command": "npx",
      "args": [
        "-y",
        "tsx",
        "/absolute/path/to/mcp-server-deployment/src/mcpserver/index.ts"
      ]
    }
  }
}
```

3. **Restart Claude Desktop** to load the new configuration.

### Verifying the Installation

Once configured and Claude Desktop is restarted:

1. Open a new conversation in Claude
2. Look for the 🔌 icon or hammer icon indicating MCP tools are available
3. Try using the add tool by asking Claude to "add 5 and 3"

## Development

### Project Structure

```
mcp-server-deployment/
├── src/
│   └── mcpserver/
│       └── index.ts          # Main MCP server implementation
├── dist/                     # Compiled JavaScript (generated)
├── package.json
├── tsconfig.json
└── README.md
```

### Available Scripts

```bash
# Build the project
pnpm build

# Run in development mode
pnpm dev

# Run in development mode with auto-reload
pnpm dev:watch

# Run with debugger
pnpm debug

# Clean build artifacts
pnpm clean
```

### Testing with MCP Inspector

You can test the server using the MCP Inspector:

```bash
npx @modelcontextprotocol/inspector tsx src/mcpserver/index.ts
```

This will open a web interface where you can interact with your MCP server and test tools.

## Adding New Tools

To add new tools to your MCP server, edit `src/mcpserver/index.ts`:

```typescript
server.registerTool(
  "tool-name",
  {
    title: "Tool Title",
    description: "What the tool does",
    inputSchema: {
      param1: z.string().describe("Description of param1"),
      // Add more parameters
    },
    outputSchema: { result: z.string() },
  },
  async ({ param1 }) => {
    // Tool implementation
    return {
      content: [{ type: "text", text: "result" }],
      structuredContent: { result: "result" },
    };
  }
);
```

## Publishing to Git

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: MCP server deployment"

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/mcp-server-deployment.git

# Push to GitHub
git push -u origin main
```

## Publishing to npm (Optional)

If you want to publish to npm for easier installation:

1. Update the `repository` URL in `package.json`
2. Ensure you have an npm account and are logged in (`npm login`)
3. Run:

```bash
npm publish
```

Then users can install with:

```bash
npm install -g mcp-server-deployment
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
