# Kolmo Construction MCP Server

A live [Model Context Protocol](https://modelcontextprotocol.io) server for Kolmo Construction — Seattle residential & commercial contractor. No authentication required.

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

## Tools (22)

| Tool | Description |
|------|-------------|
| `get_business_info` | Company info: contact, hours, service area, license, SEDBE & SCS certifications |
| `get_author_bio` | Biography, credentials, and recent articles for a Kolmo blog author |
| `search_content` | Search across services, projects, and blog posts with a single keyword query |
| `list_services` | Residential remodeling services — keyword `search` and pagination |
| `get_service` | Full details for a service by slug |
| `list_commercial_services` | Commercial & public works services (office, retail, industrial, hospitality, public). Public category covers government contracts — WA SEDBE #D700031098, SCS #7259, prevailing wage compliant, MRSC Small Works Roster eligible |
| `list_projects` | Completed projects with before/after photos — `search`, `category` filter, pagination |
| `get_project` | Full project details including images and testimonial |
| `list_blog_posts` | Published blog posts — filterable by `tag` and `author` |
| `get_blog_post` | Full markdown content of a blog post by slug |
| `submit_contact_request` | Submit a quote request; `dryRun: true` to preview without submitting |
| `list_project_types` | All 8 supported calculator project types with required input fields |
| `get_material_options` | Valid material IDs for flooring, paint, decking, etc. |
| `get_estimate` | Itemized cost estimate with labor, materials, and timeline |
| `list_reviews` | Customer reviews from Google and on-site sources — filterable by rating |
| `check_permit_requirements` | Permit requirements for construction projects in the Seattle area |
| `get_material_catalog` | Full material catalog with pricing across all project types |
| `get_weather_window` | Seattle weather suitability for exterior construction over the next 1–14 days |
| `get_neighborhood_project_activity` | Completed Kolmo projects in a specific Seattle neighborhood |
| `get_project_roi` | Estimated ROI for remodeling projects based on Cost vs. Value data |
| `check_contractor_license_status` | Look up any WA contractor's license, bond, and insurance via L&I public data |
| `get_financing_options` | Financing options with estimated monthly payments for a given budget |

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

Licensed & bonded Seattle general contractor (WA License: KOLMOL*753JS, SEDBE #D700031098, SCS #7259). Kolmo LLC formed in 2025 by a team with 15+ years of Seattle trades experience since 2010. Rating: 5.0★ on Google.

- Website: [kolmo.io](https://www.kolmo.io)
- Calculator: [kolmo.io/calculator](https://www.kolmo.io/calculator)
- Phone: (206) 410-5100
