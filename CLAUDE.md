# Spectrum Web Components

## MCP Server

A `spectrum-wc` MCP server is available with tools and resources for querying 2nd-gen component metadata. **Always use it before searching source files for component API questions.**

- `search_components` tool — find components by name, attribute, event, or description
- `swc://components` resource — list all 2nd-gen components with status
- `swc://component/{tagName}` resource — full API for a specific component (attributes, slots, events, methods)

Examples of when to use the MCP server instead of grep/file search:

- "Which components have a `size` attribute?" → `search_components({ query: "size" })`
- "What are swc-badge's attributes?" → read `swc://component/swc-badge`
- "List all preview-status components" → read `swc://components`
