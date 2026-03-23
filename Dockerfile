# Kolmo Construction MCP Server — Glama inspection image
#
# The Kolmo MCP server is hosted at https://www.kolmo.io/mcp (Streamable HTTP).
# This image runs a stdio MCP proxy so tools like Glama can inspect server
# capabilities, tools, and schemas by running this container directly.

FROM node:20-alpine

WORKDIR /app

# Install the MCP SDK
COPY package.json ./
RUN npm install @modelcontextprotocol/sdk

# proxy.mjs — stdio MCP proxy forwarding to live server (used by Glama for inspection)
# check.mjs — HTTP health-check verifying the live server is reachable
COPY proxy.mjs check.mjs ./

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node check.mjs || exit 1

# Default: run as stdio MCP proxy so Glama can inspect tools and capabilities
CMD ["node", "proxy.mjs"]
