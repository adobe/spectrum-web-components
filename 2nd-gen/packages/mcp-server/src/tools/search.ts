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
import { z } from 'zod';

import { type ComponentInfo, loadComponents } from '../data/cem.js';

const SearchInputSchema = z
  .object({
    query: z
      .string()
      .min(1)
      .describe(
        'Search query — matched against tag names, descriptions, attribute names, and event names',
      ),
    limit: z
      .number()
      .int()
      .min(1)
      .max(50)
      .default(10)
      .describe('Maximum number of results to return (default: 10, max: 50)'),
    offset: z
      .number()
      .int()
      .min(0)
      .default(0)
      .describe('Number of results to skip for pagination (default: 0)'),
  })
  .strict();

type SearchInput = z.infer<typeof SearchInputSchema>;

/**
 * Score a component against a query string.
 * Higher score = better match. Returns 0 if no match.
 */
function scoreComponent(component: ComponentInfo, query: string): number {
  const q = query.toLowerCase();
  let total = 0;

  if (component.tagName.toLowerCase().includes(q)) {
    total += 10;
  }
  if (component.className.toLowerCase().includes(q)) {
    total += 8;
  }
  if (component.description.toLowerCase().includes(q)) {
    total += 5;
  }

  for (const attr of component.attributes) {
    if (attr.name.toLowerCase().includes(q)) {
      total += 4;
    }
    if (attr.description.toLowerCase().includes(q)) {
      total += 2;
    }
    if (attr.type.toLowerCase().includes(q)) {
      total += 1;
    }
  }

  for (const slot of component.slots) {
    if (slot.description.toLowerCase().includes(q)) {
      total += 2;
    }
  }

  for (const event of component.events) {
    if (event.name.toLowerCase().includes(q)) {
      total += 3;
    }
    if (event.description.toLowerCase().includes(q)) {
      total += 1;
    }
  }

  for (const method of component.methods) {
    if (method.name.toLowerCase().includes(q)) {
      total += 3;
    }
  }

  return total;
}

function firstLine(text: string): string {
  return text.split('\n')[0]?.trim() ?? '';
}

export function registerTools(server: McpServer): void {
  server.registerTool(
    'swc_search_components',
    {
      title: 'Search SWC Components',
      description: `Search Spectrum Web Components (2nd-gen) by name, description, attribute name, or event name. Returns ranked results with pagination support.

Args:
  - query (string): Search term matched against tag names, class names, descriptions, attribute names, attribute types, slot descriptions, and event names
  - limit (number): Maximum results to return, 1–50 (default: 10)
  - offset (number): Results to skip for pagination (default: 0)

Returns:
  {
    "total": number,       // Total number of matching components
    "count": number,       // Number of results in this page
    "offset": number,      // Current pagination offset
    "has_more": boolean,   // Whether more results are available
    "results": [
      {
        "tagName": string,       // e.g. "swc-badge"
        "description": string,   // First line of component description
        "status": string,        // "preview" | "stable" | "internal"
        "attributes": string[],  // Attribute names
        "slots": string[],       // Slot names ("(default)" for unnamed slot)
        "events": string[]       // Event names
      }
    ]
  }

Examples:
  - "Which components have a size attribute?" → query="size"
  - "Find badge-related components" → query="badge"
  - "What components emit events?" → query="event"

Note: Use swc://component/{tagName} resource for full attribute/slot/event details on a specific component.`,
      inputSchema: SearchInputSchema,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
      },
    },
    async (params: SearchInput) => {
      const components = loadComponents();
      const allMatches = Array.from(components.values())
        .map((c) => ({ component: c, score: scoreComponent(c, params.query) }))
        .filter((r) => r.score > 0)
        .sort((a, b) => b.score - a.score);

      const total = allMatches.length;

      if (total === 0) {
        return {
          content: [
            {
              type: 'text' as const,
              text: `No components found matching "${params.query}". Use swc://components to browse all available components.`,
            },
          ],
        };
      }

      const page = allMatches.slice(
        params.offset,
        params.offset + params.limit,
      );

      const results = page.map((r) => ({
        tagName: r.component.tagName,
        description: firstLine(r.component.description),
        status: r.component.status,
        attributes: r.component.attributes.map((a) => a.name),
        slots: r.component.slots.map((s) => s.name || '(default)'),
        events: r.component.events.map((event) => event.name),
      }));

      const output = {
        total,
        count: results.length,
        offset: params.offset,
        has_more: params.offset + results.length < total,
        results,
      };

      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(output, null, 2),
          },
        ],
        structuredContent: output,
      };
    },
  );
}
