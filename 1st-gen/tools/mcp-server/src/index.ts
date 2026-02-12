/* eslint-disable @spectrum-web-components/prevent-argument-names */
/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {
    formatComponentDoc,
    getComponentDoc,
    getManifestPath,
    listComponents,
    loadManifest,
} from './cem.js';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const debug =
    process.env.SWC_MCP_DEBUG === '1' || process.env.SWC_MCP_DEBUG === 'true';
function log(message: string) {
    console.error(`[swc-mcp] ${message}`);
}

const server = new McpServer(
    {
        name: 'spectrum-web-components',
        version: '0.1.0',
    },
    {
        capabilities: {
            tools: {},
        },
    }
);

function getManifest(): ReturnType<typeof loadManifest> | null {
    try {
        return loadManifest();
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        log(`manifest error: ${message}`);
        return null;
    }
}

server.tool(
    'list_components',
    'List Spectrum Web Components from the Custom Elements Manifest. Optionally filter by tag prefix (e.g. "sp-") or package path fragment.',
    {
        tag_prefix: z
            .string()
            .optional()
            .describe(
                'Optional. Filter to tags starting with this prefix (e.g. "sp-").'
            ),
        package_path: z
            .string()
            .optional()
            .describe(
                'Optional. Filter to components whose module path contains this string (e.g. "packages/button").'
            ),
    },
    async ({ tag_prefix: tagPrefix, package_path: packagePath }) => {
        if (debug)
            log(
                `list_components(tag_prefix=${tagPrefix ?? ''}, package_path=${packagePath ?? ''})`
            );
        const manifest = getManifest();
        if (!manifest) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Cannot load Custom Elements Manifest. Run \`yarn docs:analyze\` from 1st-gen, or set SWC_CEM_PATH to the path to custom-elements.json. Expected path: ${getManifestPath()}`,
                    },
                ],
                isError: true,
            };
        }
        const components = listComponents(manifest, { tagPrefix, packagePath });
        const text =
            components.length === 0
                ? 'No components found.'
                : components
                      .map(
                          (c) =>
                              `- **${c.tagName}**${c.description ? ` – ${c.description}` : ''}`
                      )
                      .join('\n');
        if (debug) log(`list_components → ${components.length} components`);
        return {
            content: [
                {
                    type: 'text',
                    text: `## Spectrum Web Components (${components.length})\n\n${text}`,
                },
            ],
        };
    }
);

server.tool(
    'get_component_doc',
    'Get documentation for a Spectrum Web Component by tag name (e.g. sp-button). Returns description, attributes, events, slots, and CSS custom properties from the Custom Elements Manifest.',
    {
        tag_name: z
            .string()
            .describe(
                'The custom element tag name (e.g. "sp-button", "sp-textfield").'
            ),
    },
    async ({ tag_name: tagName }) => {
        if (debug) log(`get_component_doc(tag_name=${tagName})`);
        const manifest = getManifest();
        if (!manifest) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Cannot load Custom Elements Manifest. Run \`yarn docs:analyze\` from 1st-gen, or set SWC_CEM_PATH.`,
                    },
                ],
                isError: true,
            };
        }
        const entry = getComponentDoc(manifest, tagName);
        if (!entry) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Component "${tagName}" not found in the manifest. Use list_components to see available tags.`,
                    },
                ],
                isError: true,
            };
        }
        const doc = formatComponentDoc(entry);
        if (debug) log(`get_component_doc → ${doc.length} chars`);
        return {
            content: [{ type: 'text', text: doc }],
        };
    }
);

server.tool(
    'get_installation',
    'Get installation and usage snippet for Spectrum Web Components (npm install, import, and basic usage).',
    {},
    async () => {
        if (debug) log('get_installation()');
        const text = `# Spectrum Web Components – installation

## Install

\`\`\`bash
npm install @spectrum-web-components/button @spectrum-web-components/base
# or install the full set; see https://opensource.adobe.com/spectrum-web-components/
\`\`\`

## Use

\`\`\`html
<script type="module" src="node_modules/@spectrum-web-components/button/sp-button.js"></script>
<sp-button variant="cta">Click me</sp-button>
\`\`\`

Or with a bundler:

\`\`\`js
import '@spectrum-web-components/button/sp-button.js';
\`\`\`

Documentation: https://opensource.adobe.com/spectrum-web-components/
CEM (Custom Elements Manifest): https://bennypowers.dev/cem/docs/installation/
`;
        return {
            content: [{ type: 'text', text }],
        };
    }
);

const transport = new StdioServerTransport();
log(
    'Spectrum Web Components MCP server running (stdio). Waiting for requests.'
);
await server.connect(transport as Parameters<McpServer['connect']>[0]);
