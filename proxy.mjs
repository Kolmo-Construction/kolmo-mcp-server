/**
 * Kolmo Construction MCP Proxy
 *
 * Listens as an MCP server over stdio and forwards all requests
 * to the live Streamable HTTP server at https://www.kolmo.io/mcp
 *
 * Used by Glama to inspect server capabilities, tools, and schemas.
 */
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
  ListPromptsRequestSchema,
  ListResourcesRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

const MCP_URL = 'https://www.kolmo.io/mcp';

async function main() {
  // Connect to the upstream live server
  const upstream = new Client({ name: 'kolmo-proxy', version: '1.0.0' });
  await upstream.connect(new StreamableHTTPClientTransport(new URL(MCP_URL)));

  // Fetch the tools list up front so we can report capabilities accurately
  const { tools } = await upstream.listTools();

  // Create the stdio proxy server
  const server = new Server(
    { name: 'Kolmo Construction', version: '1.0.0' },
    { capabilities: { tools: {} } }
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools }));

  server.setRequestHandler(CallToolRequestSchema, async (req) => {
    return await upstream.callTool({
      name: req.params.name,
      arguments: req.params.arguments ?? {},
    });
  });

  server.setRequestHandler(ListPromptsRequestSchema, async () => ({ prompts: [] }));
  server.setRequestHandler(ListResourcesRequestSchema, async () => ({ resources: [] }));

  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error('Proxy error:', err);
  process.exit(1);
});
