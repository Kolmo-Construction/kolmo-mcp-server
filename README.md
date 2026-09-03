# Kolmo Construction MCP Server

A live [Model Context Protocol](https://modelcontextprotocol.io) server for Kolmo Construction — Seattle residential & commercial contractor. No authentication required.

**Endpoint:** `https://www.kolmo.io/mcp`
**Transport:** Streamable HTTP
**Discovery:** `https://www.kolmo.io/.well-known/mcp.json`
**Server version:** `1.4.0`

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

<!-- generated:tools:start -->
## Tools (36)

| Tool | Description |
|------|-------------|
| `get_business_info` | Get Kolmo Construction company information: contact details, hours, service area, specializations, and tools. |
| `list_services` | List all residential remodeling services with slugs, descriptions, and page URLs. |
| `get_service` | Get full details for a specific residential service by its slug. |
| `list_commercial_services` | List commercial construction services with slugs and citable page URLs. |
| `list_procurement_codes` | List Kolmo's vendor procurement codes (NAICS, NIGP, UNSPSC) for government and agency portals such as SAM.gov, WA WEBS, OpenGov, MRSC, King County, and City of Seattle. |
| `list_projects` | List completed remodeling projects with before/after photos and locations. |
| `get_project` | Get full details for a specific project by its slug, including before/after images and testimonial. |
| `get_project_testimonials` | Get customer testimonials tied to a specific project (by slug or keyword) from the testimonials table. |
| `list_blog_posts` | List published blog posts about home remodeling, renovation costs, and construction tips. |
| `get_blog_post` | Get the full markdown content of a blog post by its slug. |
| `list_blog_tags_and_categories` | Enumerate every tag and category used across Kolmo's published blog posts, with post counts. |
| `submit_contact_request` | Submit a contact or quote request to Kolmo Construction on behalf of a user. |
| `list_project_types` | List all 11 supported calculator project types with their required input fields and descriptions. |
| `get_material_options` | Get available material choices for a project type — flooring types, paint grades, decking materials, kitchen/bath scope tiers, ADA modifications, etc. |
| `get_estimate` | Calculate a Seattle-area cost estimate. |
| `list_reviews` | List customer reviews and testimonials for Kolmo Construction. |
| `check_permit_requirements` | Check whether a residential construction project in King/Pierce/Snohomish counties requires a permit. |
| `get_permit_rule_details` | Enumerate permit rules with full detail — timeline, fee model, inspection sequence, submittals, required contractor specialties. |
| `match_contractor_to_permit` | Cross-reference a WA contractor's L&I license specialty against a permit's required specialties. |
| `estimate_permit_fee` | Estimate the permit fee for a residential project based on jurisdiction, project type, and project valuation. |
| `resolve_permit_submittals` | Resolve the structured submittal-item set for a specific parcel + permit scope, via the unified permit-engine pipeline (documentation/permit-engine-unification-plan.md). |
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
`interior-painting` · `deck` · `exterior-painting` · `flooring` · `windows` · `siding` · `fence` · `landscaping` · `kitchen` · `bathroom` · `ada`
<!-- generated:project-types:end -->

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

Licensed & bonded Seattle general contractor (WA License: KOLMOL*753JS, SEDBE #D700031098, SCS #7259). Kolmo LLC, established 2025. Rating: 5.0★ on Google.

- Website: [kolmo.io](https://www.kolmo.io)
- Calculator: [kolmo.io/calculator](https://www.kolmo.io/calculator)
- Phone: (206) 410-5100
