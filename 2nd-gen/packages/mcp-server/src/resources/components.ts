/**
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';

import { loadComponents } from '../data/cem.js';

function firstLine(text: string): string {
  return text.split('\n')[0]?.trim() ?? '';
}

export function registerResources(server: McpServer): void {
  // ---- swc://components — full component list ----------------------------
  server.registerResource(
    'components',
    'swc://components',
    {
      description:
        'List all Spectrum Web Components 2nd-gen components with status, tag name, and counts of attributes/slots/events.',
      mimeType: 'application/json',
    },
    async (uri) => {
      const components = loadComponents();
      const list = Array.from(components.values()).map((c) => ({
        tagName: c.tagName,
        description: firstLine(c.description),
        status: c.status,
        since: c.since,
        attributeCount: c.attributes.length,
        slotCount: c.slots.length,
        eventCount: c.events.length,
      }));

      return {
        contents: [
          {
            uri: uri.href,
            mimeType: 'application/json',
            text: JSON.stringify(list, null, 2),
          },
        ],
      };
    },
  );

  // ---- swc://component/{tagName} — single component detail ---------------
  server.registerResource(
    'component',
    new ResourceTemplate('swc://component/{tagName}', { list: undefined }),
    {
      description:
        'Full metadata for a specific Spectrum Web Component: attributes, slots, events, and public methods.',
      mimeType: 'application/json',
    },
    async (uri, { tagName }) => {
      const components = loadComponents();
      const component = components.get(tagName as string);

      if (!component) {
        return {
          contents: [
            {
              uri: uri.href,
              mimeType: 'application/json',
              text: JSON.stringify({
                error: `Component "${tagName}" not found. Use swc://components to list available components.`,
              }),
            },
          ],
        };
      }

      return {
        contents: [
          {
            uri: uri.href,
            mimeType: 'application/json',
            text: JSON.stringify(component, null, 2),
          },
        ],
      };
    },
  );
}
