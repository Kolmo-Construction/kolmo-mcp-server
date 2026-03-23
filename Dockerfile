# Kolmo Construction MCP Server — Glama verification image
#
# The Kolmo MCP server is hosted at https://www.kolmo.io/mcp (Streamable HTTP).
# This image runs a lightweight health-check proxy that verifies the live server
# is reachable and responding to MCP requests.

FROM node:20-alpine

WORKDIR /app

# Install the MCP SDK for connection verification
COPY package.json ./
RUN npm install @modelcontextprotocol/sdk

# Health-check script: connects to the live MCP server and calls get_business_info
COPY check.mjs ./

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node check.mjs || exit 1

CMD ["node", "check.mjs", "--serve"]
