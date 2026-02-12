# Getting started with the Spectrum Web Components MCP

This guide helps colleagues and customers set up and use the **Spectrum Web Components MCP (Model Context Protocol) server** so that AI assistants (e.g. in Cursor or Claude Desktop) can list components, look up component docs, and get installation snippets—all from the Custom Elements Manifest.

## What is this MCP?

The MCP server exposes three tools to the AI:

| Tool                  | What it does                                                                                                        |
| --------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **list_components**   | Lists all Spectrum Web Components (e.g. `sp-button`, `sp-textfield`). You can filter by tag prefix or package path. |
| **get_component_doc** | Returns documentation for one component: description, attributes, events, slots, and CSS custom properties.         |
| **get_installation**  | Returns installation and basic usage instructions for Spectrum Web Components.                                      |

When the MCP is configured, you can ask the AI things like _“What Spectrum Web Components are available?”_, _“How do I use sp-button?”_, or _“Show me the API for sp-textfield”_ and it will use these tools to answer with accurate, up-to-date information from the project’s manifest.

## Prerequisites

1. **Node.js** – Required to run the MCP server (Node 18+ recommended).
2. **Custom Elements Manifest** – The server reads `custom-elements.json`. If you are in the **spectrum-web-components** repo, generate it once from the **1st-gen** directory:
    ```bash
    cd 1st-gen
    yarn docs:analyze
    ```
    This writes `1st-gen/projects/documentation/custom-elements.json`. If you use the server outside the repo, see [Manifest path](#manifest-path) below.

## One-time setup

### Step 1: Install and build

From the **repository root**:

```bash
yarn install
```

From the **1st-gen** directory, build the MCP server:

```bash
cd 1st-gen
yarn workspace @spectrum-web-components/mcp-server build
```

The built server is at `1st-gen/tools/mcp-server/dist/index.js`.

### Step 2: Configure your AI client

Add the Spectrum Web Components MCP server to your MCP config so your AI assistant can call its tools.

#### Option A: Cursor (this repo)

This repository includes a project-level config at **`.cursor/mcp.json`**. When you open the spectrum-web-components workspace in Cursor, the AI can use the MCP tools as long as:

- The server is built (Step 1).
- The manifest exists (run `yarn docs:analyze` from 1st-gen if needed).

If the tools don’t appear, reload the Cursor window (or restart Cursor). The project config uses a path relative to the workspace; for a **standalone** Cursor config (e.g. your user config), use an absolute path as in Option B.

#### Option B: Cursor (user config) or Claude Desktop

Use the **absolute path** to the built server.

**Cursor** – e.g. `~/.cursor/mcp.json`:

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

**Claude Desktop** – e.g. `~/Library/Application Support/Claude/claude_desktop_config.json` on macOS:

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

Replace `/absolute/path/to/spectrum-web-components` with your actual path. Restart Cursor or Claude Desktop after changing the config.

### Step 3: Verify

In a new chat, try a prompt such as:

- _“List Spectrum Web Components”_
- _“What attributes does sp-button have?”_
- _“How do I install Spectrum Web Components?”_

If the AI responds with component lists, attribute tables, or installation snippets, the MCP is working.

## How to use it

You don’t call the tools yourself; the AI does when your question is about Spectrum Web Components. Use natural language, for example:

- **Discovery**: _“What Spectrum Web Components are there?”_, _“Show me all sp- components”_, _“Which components are in the button package?”_
- **API and usage**: _“How do I use sp-button?”_, _“What are the props and events for sp-textfield?”_, _“Documentation for sp-dialog”_
- **Installation**: _“How do I install Spectrum Web Components?”_, _“Give me the install and usage snippet for SWC”_

The AI will invoke `list_components`, `get_component_doc`, or `get_installation` as needed and use the results in its answer.

## Manifest path

The server looks for `custom-elements.json` in this order:

1. **`SWC_CEM_PATH`** – If set, that path is used (absolute or relative to the process cwd).
2. **Relative to the built server** – When run from the repo, it resolves to `1st-gen/projects/documentation/custom-elements.json`.
3. **Relative to cwd** – If the current working directory is `1st-gen`, it looks for `projects/documentation/custom-elements.json`.

If you use the server outside the repo (e.g. a customer with only the built server and a manifest), set the path explicitly:

```bash
SWC_CEM_PATH=/path/to/custom-elements.json node /path/to/1st-gen/tools/mcp-server/dist/index.js
```

In Cursor or Claude Desktop you typically don’t set this; ensure `yarn docs:analyze` has been run from 1st-gen so the manifest exists at the expected location.

## Troubleshooting

| Issue                                         | What to do                                                                                                                                           |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| AI doesn’t have Spectrum Web Components tools | Confirm the MCP server is in your client’s config (see Step 2). Use the **absolute** path to `dist/index.js` in user/global config. Restart the app. |
| “Cannot load Custom Elements Manifest”        | Run `yarn docs:analyze` from the **1st-gen** directory. If the manifest is elsewhere, set `SWC_CEM_PATH` to its path.                                |
| “Component X not found”                       | Ask the AI to _“List Spectrum Web Components”_ and use an exact tag name from that list (e.g. `sp-button`, not `SpButton`).                          |
| Want to see what the server is doing          | Run the server manually with debug on: `SWC_MCP_DEBUG=1 node 1st-gen/tools/mcp-server/dist/index.js`. Tool calls will be logged to stderr.           |

For build and development details (e.g. rebuilding after code changes), see the main [README](./README.md).

## Summary

1. Run `yarn docs:analyze` from **1st-gen** (so the manifest exists).
2. Run `yarn workspace @spectrum-web-components/mcp-server build` from **1st-gen**.
3. Add the server to your Cursor or Claude Desktop MCP config with the path to `1st-gen/tools/mcp-server/dist/index.js`.
4. In chat, ask naturally about listing components, component docs, or installation; the AI will use the MCP tools to answer.

For more on the tools and the manifest, see the [README](./README.md).
