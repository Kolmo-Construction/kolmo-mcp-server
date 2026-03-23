# Kolmo Construction MCP Server

A live [Model Context Protocol](https://modelcontextprotocol.io) server for Seattle-area home remodeling cost estimation. No authentication required.

**Endpoint:** `https://www.kolmo.io/mcp`
**Transport:** Streamable HTTP
**Discovery:** `https://www.kolmo.io/.well-known/mcp.json`

## Connect

```bash
# Claude Code
claude mcp add --transport http kolmo https://www.kolmo.io/mcp
```

```json
// Claude Desktop — claude_desktop_config.json
{
  "mcpServers": {
    "kolmo": {
      "type": "http",
      "url": "https://www.kolmo.io/mcp"
    }
  }
}
```

## Tools

| Tool | Description |
|------|-------------|
| `get_business_info` | Company info: contact, hours, service area, license |
| `list_services` | Residential remodeling services — supports keyword `search` and pagination |
| `get_service` | Full details for a service by slug; suggests similar slugs if not found |
| `list_commercial_services` | Commercial construction services (office, retail, industrial, hospitality) |
| `list_projects` | Completed projects with before/after photos — supports keyword `search`, `category` filter, and pagination |
| `get_project` | Full project details including images and testimonial; suggests similar slugs if not found |
| `list_blog_posts` | Published blog posts — filterable by `tag` and `author`, with pagination |
| `get_blog_post` | Full markdown content of a blog post by slug |
| `submit_contact_request` | Submit a quote request on behalf of a user; supports `dryRun: true` to preview without submitting |
| `list_project_types` | All 8 supported calculator project types with required input fields |
| `get_material_options` | Valid material IDs for flooring, paint, decking, etc. |
| `get_estimate` | Calculate itemized cost estimate with labor, materials, and timeline |

## Supported Project Types

`interior-painting` · `exterior-painting` · `flooring` · `deck` · `windows` · `siding` · `fence` · `landscaping`

## Example Usage

```
1. Call list_project_types to see required fields
2. Call get_material_options for valid material IDs
3. Call get_estimate with your project details
```

**Sample estimate — 400 sqft LVP flooring:**
```json
{
  "projectType": "flooring",
  "project": {
    "rooms": [{ "id": "1", "name": "Living Room", "length": 20, "width": 20 }],
    "flooringMaterial": "vinyl-plank-lvp",
    "includesUnderlayment": true,
    "includesRemoval": true,
    "removalType": "carpet",
    "includesBaseboard": false,
    "includesSubfloorPrep": false,
    "transitionCount": 2
  }
}
```

Returns: total cost, material cost, labor cost, time estimate (days), itemized line items.

## Service Area

Seattle, Bellevue, Kirkland, Redmond, Sammamish, Issaquah, Renton, Kent, Federal Way, Mercer Island — King County, WA.

## About Kolmo Construction

Licensed & bonded Seattle general contractor (WA License: KOLMOC*792KL). Founded 2010. Rating: 4.9★ / 127 reviews.

- Website: [kolmo.io](https://www.kolmo.io)
- Calculator: [kolmo.io/calculator](https://www.kolmo.io/calculator)
- Phone: (206) 410-5100
