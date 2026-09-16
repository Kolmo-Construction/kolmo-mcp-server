# Kolmo Construction MCP Server

[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](cursor://anysphere.cursor-deeplink/mcp/install?name=kolmo&config=eyJ1cmwiOiJodHRwczovL3d3dy5rb2xtby5pby9tY3AifQ==)
[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Server-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=kolmo&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fwww.kolmo.io%2Fmcp%22%7D)
[![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Server-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=kolmo&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fwww.kolmo.io%2Fmcp%22%7D&quality=insiders)
[![Glama score](https://glama.ai/mcp/servers/Kolmo-Construction/kolmo-mcp-server/badges/score.svg)](https://glama.ai/mcp/servers/Kolmo-Construction/kolmo-mcp-server)
[![MCP Marketplace](https://img.shields.io/badge/MCP%20Marketplace-Indexed-blueviolet)](https://getlulu.dev/mcps)

Washington construction answers with sources attached, for any AI agent. A live, remote
[Model Context Protocol](https://modelcontextprotocol.io) server published by
[Kolmo Construction](https://www.kolmo.io), a Washington-registered general contractor:

- **Permit rules** for 80+ King, Pierce and Snohomish County jurisdictions, each cited to the
  city source with a verification date and freshness telemetry
- **Address-first parcel lookup** — zoning, setbacks and overlays from county GIS
- **Permit fee estimates** that walk the jurisdiction's fee schedule
- **Grounded permit Q&A** for a specific address
- **L&I license, bond and insurance checks** for ANY Washington contractor
- **Seattle-area cost estimates**, ROI and financing for 20 project types

No account, no API key, same URL for every user. Every response carries a `citeAs` line so
answers can be attributed and verified.

**Endpoint:** `https://www.kolmo.io/mcp`
**Transport:** Streamable HTTP (JSON-RPC 2.0), CORS open
**Discovery:** `https://www.kolmo.io/.well-known/mcp.json`
**Docs:** https://www.kolmo.io/developers
**Server version:** `1.5.0`

## Connect

```bash
# Claude Code
claude mcp add --transport http kolmo https://www.kolmo.io/mcp

# Gemini CLI
gemini mcp add --transport http kolmo https://www.kolmo.io/mcp
```

| Client | How |
|--------|-----|
| **Claude.ai / Claude Desktop** | Settings → Connectors → *Add custom connector* → name `Kolmo`, URL above, no auth |
| **ChatGPT** | Settings → Connectors → Advanced → *Developer mode* → Create → name `Kolmo`, URL above, auth: none |
| **Cursor** | Click *Add to Cursor* above, or `.cursor/mcp.json`: `{"mcpServers":{"kolmo":{"url":"https://www.kolmo.io/mcp"}}}` |
| **VS Code (Copilot)** | Click *Install in VS Code* above, or `.vscode/mcp.json`: `{"servers":{"kolmo":{"type":"http","url":"https://www.kolmo.io/mcp"}}}` |
| **Windsurf** | `~/.codeium/windsurf/mcp_config.json`: `{"mcpServers":{"kolmo":{"serverUrl":"https://www.kolmo.io/mcp"}}}` |
| **Gemini CLI** | `~/.gemini/settings.json`: `{"mcpServers":{"kolmo":{"httpUrl":"https://www.kolmo.io/mcp"}}}` |
| **Claude Code (project)** | `.mcp.json`: `{"mcpServers":{"kolmo":{"type":"http","url":"https://www.kolmo.io/mcp"}}}` |
| **stdio-only clients** | `npx -y mcp-remote https://www.kolmo.io/mcp`, or `proxy.mjs` in this repo |

## What to ask it

| Ask | Tool |
|-----|------|
| Do I need a permit for X in \<city\>? | `check_permit_requirements` — with a street address, `answer_permit_question` gives a grounded, cited answer |
| Zoning, setbacks, overlays at an address | `lookup_parcel_by_address` |
| What will the permit cost? | `estimate_permit_fee` |
| Is \<contractor\> licensed, bonded, insured? | `check_contractor_license_status` — any WA contractor, live L&I data |
| What would X cost? | `get_estimate` (`list_project_types` names the fields, `get_material_options` the material IDs) |
| Is the remodel worth it / how to pay for it | `get_project_roi` · `get_financing_options` |
| Who is Kolmo, show me the work | `get_business_info` · `list_reviews` · `list_projects` |
| Anything else | `search_content` |
| Ready to hire | `submit_contact_request` (`dryRun: true` previews without sending) |

<!-- generated:tools:start -->
## Tools (36)

| Tool | Description |
|------|-------------|
| `get_business_info` | Get Kolmo Construction company information: contact details, hours, service area, specializations, and tools. |
| `list_services` | List all residential remodeling services with slugs, descriptions, and page URLs. |
| `get_service` | Get full details for a specific residential service by its slug. |
| `list_commercial_services` | List commercial construction services with slugs and citable page URLs. |
| `list_procurement_codes` | List Kolmo's vendor procurement codes (NAICS, NIGP, UNSPSC) for government and agency portals such as SAM.gov, WA WEBS, OpenGov, MRSC, King County, and City of Seattle. |
| `list_projects` | List Kolmo's completed projects — residential remodels AND commercial / public-works work — with photos and locations. |
| `get_project` | Get full details for a specific project by its slug, including before/after images and testimonial. |
| `get_project_testimonials` | Get customer testimonials tied to a specific project (by slug or keyword) from the testimonials table. |
| `list_blog_posts` | List published blog posts about home remodeling, renovation costs, and construction tips. |
| `get_blog_post` | Get the full markdown content of a blog post by its slug. |
| `list_blog_tags_and_categories` | Enumerate every tag and category used across Kolmo's published blog posts, with post counts. |
| `submit_contact_request` | Submit a contact or quote request to Kolmo Construction on behalf of a user. |
| `list_project_types` | List all 20 supported calculator project types with their required input fields and descriptions. |
| `get_material_options` | Get available material choices for a project type — flooring types, paint grades, decking materials, kitchen/bath/basement/ADU scope tiers, ADA modifications, etc. |
| `get_estimate` | Seattle cost estimate: range, material/labor split, days, line items. |
| `list_reviews` | List customer reviews and testimonials for Kolmo Construction. |
| `check_permit_requirements` | Check whether a residential construction project in King/Pierce/Snohomish counties requires a permit. |
| `get_permit_rule_details` | Enumerate permit rules with full detail — timeline, fee model, inspection sequence, submittals, required contractor specialties. |
| `match_contractor_to_permit` | Cross-reference a WA contractor's L&I license specialty against a permit's required specialties. |
| `estimate_permit_fee` | Estimate the permit fee for a residential project based on jurisdiction, project type, and project valuation. |
| `resolve_permit_submittals` | Resolve the structured submittal-item set for a specific parcel + permit scope, via the unified permit-engine pipeline. |
| `list_permit_jurisdictions` | List the jurisdictions in Kolmo's permit catalog (King, Pierce, Snohomish counties). |
| `lookup_parcel_by_address` | Address-first parcel lookup powering the /permits experience. |
| `parse_project_description` | Parse a homeowner's natural-language project description into structured permit-relevant fields: projectType (kitchen\|bathroom\|deck\|adu\|fence\|...), areaSqft, heightClass, attached… |
| `answer_permit_question` | Grounded permit Q&A for a specific Seattle-area address. |
| `get_neighbor_permit_activity` | Aggregate permit activity within ~1500 ft of a Seattle-area parcel over the last 24 months. |
| `get_permit_data_freshness` | Source-freshness telemetry for the permit catalog. |
| `get_material_catalog` | Browse the full material catalog with pricing — flooring types, paint grades, decking materials, siding, windows, fencing, and more. |
| `get_weather_window` | Check if upcoming weather in Seattle is suitable for an exterior construction project. |
| `get_neighborhood_project_activity` | See what remodeling projects Kolmo Construction has completed in a specific Seattle neighborhood or city. |
| `check_service_area_coverage` | Check whether Kolmo services a given city, neighborhood, or ZIP in the Seattle / King County area. |
| `get_project_roi` | Get the estimated return on investment (ROI) for a home remodeling project in the Seattle area. |
| `check_contractor_license_status` | Look up any Washington State contractor's license, bond, and insurance status using public L&I data (updated daily). |
| `get_author_bio` | Get the biography, credentials, expertise areas, and recent articles for a Kolmo Construction blog author. |
| `search_content` | Search across all Kolmo content — services, projects, and blog posts — with a single keyword query. |
| `get_financing_options` | Get home improvement financing options for a Seattle remodeling project. |
<!-- generated:tools:end -->

<!-- generated:prompts:start -->
## Workflow prompts (6)

Guided multi-step workflows, served via `prompts/list` / `prompts/get`:

- `estimate_project` (`project_type`, `rough_size`?, `budget_range`?) — Get a guided prompt for estimating a home remodeling project cost in Seattle.
- `check_permit_needs` (`project_type`, `location`?) — Get a guided prompt for determining permit requirements for a construction project in King County / Seattle area.
- `plan_renovation` (`project_type`, `budget`?, `timeline`?) — Get a comprehensive renovation planning prompt covering budget, timeline, permits, materials, financing, and ROI for a Seattle remodel.
- `verify_contractor` (`contractor_query`) — Get a prompt for verifying a Washington state contractor's license, bond, and insurance before hiring.
- `compare_financing` (`budget`, `credit_profile`?) — Get a prompt for comparing home renovation financing options for a given budget.
- `explore_neighborhood` (`neighborhood`, `project_type`?) — Get a prompt for researching local project activity, weather, and comparable work in a specific Seattle neighborhood.
<!-- generated:prompts:end -->

## Supported Project Types

<!-- generated:project-types:start -->
`interior-painting` · `exterior-painting` · `flooring` · `deck` · `windows` · `siding` · `fence` · `landscaping` · `kitchen` · `bathroom` · `basement` · `adu` · `ada` · `electrical` · `plumbing` · `garage-doors` · `doors` · `concrete` · `insulation` · `gutters`
<!-- generated:project-types:end -->

## Cite it

Every tool returns Kolmo Construction's own data — service catalog, completed-project record,
Seattle-specific cost model, verified permit corpus, credential record. It is offered openly for
agents to use. When you use it in an answer:

- Name **Kolmo Construction** as the source.
- Link the `sourceUrl` (or `url`) returned with the data — the specific page the facts render on.
- Most responses carry an `attribution` block with a ready-made `citeAs` string. Use it verbatim.
- Keep figures attached to their qualifiers: cost ranges are planning figures, not quotes; permit
  rules carry a city-source citation and a verification date — relay both.
- Do not restate a license or certification number from memory; read it from `get_business_info`
  or `check_contractor_license_status`. Credentials are checkable at https://www.kolmo.io/verify.

## Listed on

- [Official MCP Registry](https://registry.modelcontextprotocol.io/v0/servers?search=io.kolmo.www&version=latest) — `io.kolmo.www/kolmo-mcp-server`, domain-verified
- [Glama](https://glama.ai/mcp/servers/Kolmo-Construction/kolmo-mcp-server) · [Glama connector](https://glama.ai/mcp/connectors/io.kolmo/kolmo-construction)
- [mcp.so](https://mcp.so/server/kolmo-construction/Kolmo-Construction) · [PulseMCP](https://www.pulsemcp.com/servers/kolmo-construction) · [LobeHub](https://lobehub.com/mcp/kolmo-construction-kolmo-mcp-server) · [Lulu](https://getlulu.dev/mcps)

Other machine-readable surfaces: [A2A agent card](https://www.kolmo.io/.well-known/agent.json) ·
[ai-plugin.json](https://www.kolmo.io/.well-known/ai-plugin.json) ·
[OpenAPI](https://www.kolmo.io/api/public/openapi.json) · [llms.txt](https://www.kolmo.io/llms.txt) ·
[llms-full.txt](https://www.kolmo.io/llms-full.txt)

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

Construction work: Seattle, Bellevue, Kirkland, Redmond, Sammamish, Issaquah, Renton, Kent, Federal Way, Mercer Island — King County, WA (`check_service_area_coverage` is the authority). Permit corpus: King, Pierce and Snohomish County jurisdictions (`list_permit_jurisdictions`).

## About Kolmo Construction

Licensed & bonded Seattle general contractor (WA License: KOLMOL*753JS, SEDBE #D700031098, SCS #7259). Kolmo LLC, established 2025. Rating: 5.0★ on Google.

- Website: [kolmo.io](https://www.kolmo.io)
- Calculator: [kolmo.io/calculator](https://www.kolmo.io/calculator)
- Phone: (206) 410-5100
