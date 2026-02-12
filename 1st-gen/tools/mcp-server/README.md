# Spectrum Web Components MCP server

Thin MCP server that exposes Spectrum Web Components via the Custom Elements Manifest: list components, get component doc, and get installation snippet. No CEM CLI dependency; reads the manifest produced by `yarn docs:analyze`.

**New to this MCP?** See **[GETTING-STARTED.md](./GETTING-STARTED.md)** for a step-by-step guide for colleagues and customers (setup, configuration, example prompts, troubleshooting).

## Prerequisites

- The Custom Elements Manifest must exist. From the **1st-gen** directory run:
    ```bash
    yarn docs:analyze
    ```
    This writes `projects/documentation/custom-elements.json`. The MCP server resolves this path automatically when run from the repo (see **Manifest path** below).

## Install

From the repository root:

```bash
yarn install
```

Then build and run the server from the **1st-gen** directory:

```bash
cd 1st-gen
yarn workspace @spectrum-web-components/mcp-server build
yarn workspace @spectrum-web-components/mcp-server start
```

Or run the binary after build:

```bash
node 1st-gen/tools/mcp-server/dist/index.js
```

## Cursor / Claude Desktop

Add the server to your MCP config so the AI can list components and get component docs.

**This repo** includes a project-level config at `.cursor/mcp.json`, so when you open the spectrum-web-components workspace in Cursor, the AI in chat should get the `list_components`, `get_component_doc`, and `get_installation` tools. Ensure the server is built (`yarn workspace @spectrum-web-components/mcp-server build` from 1st-gen) and the manifest exists (`yarn docs:analyze` from 1st-gen). Reload the Cursor window or restart Cursor if the tools don’t appear.

**Cursor** (user config e.g. `~/.cursor/mcp.json` or project `.cursor/mcp.json`):

```json
{
    "mcpServers": {
        "spectrum-web-components": {
            "command": "node",
            "args": [
                "/absolute/path/to/spectrum-web-components/1st-gen/tools/mcp-server/dist/index.js"
            ]
        }
    }
}
```

**Claude Desktop** (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

```json
{
    "mcpServers": {
        "spectrum-web-components": {
            "command": "node",
            "args": [
                "/absolute/path/to/spectrum-web-components/1st-gen/tools/mcp-server/dist/index.js"
            ]
        }
    }
}
```

Use the full path to `dist/index.js`. Ensure `yarn docs:analyze` has been run from `1st-gen` so the manifest exists, or set `SWC_CEM_PATH` (see below).

## Manifest path

The server looks for `custom-elements.json` in this order:

1. **`SWC_CEM_PATH`** – if set, use this path (absolute or relative to cwd).
2. **Relative to the built server** – `../../projects/documentation/custom-elements.json` from `1st-gen/tools/mcp-server/dist/` (i.e. `1st-gen/projects/documentation/custom-elements.json`).
3. **Relative to cwd** – `projects/documentation/custom-elements.json` when the current working directory is `1st-gen`.

Example with env:

```bash
SWC_CEM_PATH=/path/to/custom-elements.json node 1st-gen/tools/mcp-server/dist/index.js
```

## Tools

| Tool                  | Description                                                                                                                       |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **list_components**   | List all custom elements from the manifest. Optional: `tag_prefix` (e.g. `sp-`), `package_path` (e.g. `packages/button`).         |
| **get_component_doc** | Get docs for one component by tag name (e.g. `sp-button`). Returns description, attributes, events, slots, CSS custom properties. |
| **get_installation**  | Return installation and basic usage snippet for Spectrum Web Components.                                                          |

## Output and debugging

- When you run the server, it prints one line to **stderr**: `[swc-mcp] Spectrum Web Components MCP server running (stdio). Waiting for requests.` So you see that it started; **stdout** is used for the MCP protocol, so the server does not print tool results to the terminal.
- In Cursor (or another client), tool results are shown in the AI reply or in the tool-call UI, not in the terminal where the server runs.
- To log each tool call to stderr, run with **debug** enabled:
    ```bash
    SWC_MCP_DEBUG=1 node 1st-gen/tools/mcp-server/dist/index.js
    ```
- If the manifest is missing, tools return an error message that tells you to run `yarn docs:analyze` from 1st-gen or set `SWC_CEM_PATH`.

## Development

- **Build**: `yarn build` (from this package or `yarn workspace @spectrum-web-components/mcp-server build` from 1st-gen).
- **Run**: `yarn start` or `node dist/index.js`.
- Dependencies: `@modelcontextprotocol/sdk`, `zod` (see `package.json`).

If the MCP SDK API differs from what this server expects (e.g. request handler method names), adjust the imports and handler registration in `src/index.ts` to match your SDK version.
