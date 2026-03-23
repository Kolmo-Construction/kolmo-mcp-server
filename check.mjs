/**
 * Kolmo MCP server health-check / Glama verification script.
 * Connects to the live server at https://www.kolmo.io/mcp and
 * calls get_business_info to confirm the server is reachable.
 */
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import http from 'http';

const MCP_URL = 'https://www.kolmo.io/mcp';
const serve = process.argv.includes('--serve');

async function checkServer() {
  const client = new Client({ name: 'glama-check', version: '1.0.0' });
  const transport = new StreamableHTTPClientTransport(new URL(MCP_URL));

  await client.connect(transport);

  const tools = await client.listTools();
  console.log(`Connected. Tools available: ${tools.tools.map(t => t.name).join(', ')}`);

  const result = await client.callTool({ name: 'get_business_info', arguments: {} });
  console.log('get_business_info:', JSON.stringify(result.content?.[0], null, 2));

  await client.close();
  console.log('OK');
}

if (serve) {
  // Keep-alive HTTP server so Docker considers the container healthy
  const server = http.createServer(async (req, res) => {
    if (req.url === '/health') {
      try {
        await checkServer();
        res.writeHead(200).end('OK');
      } catch (err) {
        res.writeHead(500).end(err.message);
      }
    } else {
      res.writeHead(200).end(`Kolmo MCP proxy — endpoint: ${MCP_URL}`);
    }
  });
  server.listen(3000, () => console.log(`Listening on :3000 — MCP at ${MCP_URL}`));
  // Run initial check on startup
  checkServer().catch(console.error);
} else {
  checkServer().catch(err => { console.error(err); process.exit(1); });
}
