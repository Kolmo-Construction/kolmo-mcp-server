/**
 * Kolmo Construction MCP Proxy
 *
 * Listens as an MCP server over stdio and forwards every request to the live
 * Streamable HTTP server at https://www.kolmo.io/mcp.
 *
 * This is the inspection image Glama (and any directory that runs the
 * Dockerfile) sees. It has to be a faithful mirror: for five months it declared
 * `capabilities: { tools }` only and answered prompts/list with `[]`, so the six
 * workflow prompts — the most "guided" thing on the server — were invisible on
 * every directory that crawled it. Name, version and instructions now come
 * from the upstream handshake rather than being restated here.
 */
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
  ListResourcesRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

const MCP_URL = 'https://www.kolmo.io/mcp';

async function main() {
  // Connect to the upstream live server. The client name is how the upstream
  // scoreboard tells proxy traffic from a real third-party agent.
  const upstream = new Client({ name: 'kolmo-proxy', version: '1.0.0' });
  await upstream.connect(new StreamableHTTPClientTransport(new URL(MCP_URL)));

  const info = upstream.getServerVersion() ?? { name: 'kolmo-construction', version: '0.0.0' };
  const instructions = upstream.getInstructions();

  const server = new Server(
    { name: info.name, version: info.version },
    { capabilities: { tools: {}, prompts: {} }, ...(instructions ? { instructions } : {}) },
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: (await upstream.listTools()).tools }));

  server.setRequestHandler(CallToolRequestSchema, async (req) => {
    return await upstream.callTool({
      name: req.params.name,
      arguments: req.params.arguments ?? {},
    });
  });

  server.setRequestHandler(ListPromptsRequestSchema, async () => ({ prompts: (await upstream.listPrompts()).prompts }));
  server.setRequestHandler(GetPromptRequestSchema, async (req) => {
    return await upstream.getPrompt({ name: req.params.name, arguments: req.params.arguments ?? {} });
  });

  // The live server declares no resources; answer the probe rather than error.
  server.setRequestHandler(ListResourcesRequestSchema, async () => ({ resources: [] }));

  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error('Proxy error:', err);
  process.exit(1);
});
