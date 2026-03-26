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

import { validateHTML } from './html-validator.js';
import type { ComponentRegistry } from './registry.js';
import type { ComponentAPI, MigrationInfo } from './types.js';

interface ServerDeps {
  registry: ComponentRegistry;
  migrationData: Map<string, MigrationInfo>;
}

/** Section name mapping from user-facing names to ComponentAPI keys. */
const SECTION_MAP: Record<string, keyof ComponentAPI> = {
  properties: 'properties',
  attributes: 'attributes',
  events: 'events',
  slots: 'slots',
  'css-properties': 'cssCustomProperties',
  'css-parts': 'cssParts',
  methods: 'methods',
};

export function createMCPServer(deps: ServerDeps): McpServer {
  const { registry, migrationData } = deps;

  const server = new McpServer({
    name: 'spectrum-web-components',
    version: '0.1.0',
  });

  // ── list_components ──────────────────────────────────────────────
  server.tool(
    'list_components',
    'List available Spectrum Web Components, optionally filtered by generation or category.',
    {
      generation: z
        .enum(['gen-1', 'gen-2', 'all'])
        .default('all')
        .describe('Filter by component generation (gen-1, gen-2, or all)'),
      category: z.string().optional().describe('Filter by component category'),
    },
    async ({ generation, category }) => {
      const filter: {
        generation?: 'gen-1' | 'gen-2';
        category?: string;
      } = {};
      if (generation !== 'all') {
        filter.generation = generation;
      }
      if (category) {
        filter.category = category;
      }
      const result = registry.list(
        Object.keys(filter).length > 0 ? filter : undefined
      );
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    }
  );

  // ── get_component_api ────────────────────────────────────────────
  server.tool(
    'get_component_api',
    'Get the full API surface for a specific component by its tag name.',
    {
      tagName: z
        .string()
        .describe('The custom element tag name, e.g. "sp-button"'),
      sections: z
        .array(
          z.enum([
            'properties',
            'attributes',
            'events',
            'slots',
            'css-properties',
            'css-parts',
            'methods',
          ])
        )
        .optional()
        .describe(
          'Optional list of API sections to include (properties, attributes, events, slots, css-properties, css-parts, methods)'
        ),
    },
    async ({ tagName, sections }) => {
      const component = registry.get(tagName);
      if (!component) {
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify(
                {
                  error: `Component "${tagName}" not found in registry.`,
                },
                null,
                2
              ),
            },
          ],
          isError: true,
        };
      }

      let result: Record<string, unknown>;
      if (sections && sections.length > 0) {
        result = {
          tagName: component.tagName,
          className: component.className,
          package: component.package,
          generation: component.generation,
          description: component.description,
        };
        for (const section of sections) {
          const key = SECTION_MAP[section];
          if (key) {
            result[section] = component[key];
          }
        }
      } else {
        result = component as unknown as Record<string, unknown>;
      }

      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    }
  );

  // ── get_component_examples ───────────────────────────────────────
  server.tool(
    'get_component_examples',
    'Get HTML usage examples for a component.',
    {
      tagName: z
        .string()
        .describe('The custom element tag name, e.g. "sp-button"'),
      variant: z
        .string()
        .optional()
        .describe(
          'Optional variant name to filter examples (e.g. "accent", "quiet")'
        ),
    },
    async ({ tagName, variant }) => {
      const examples = registry.getExamples(tagName, variant);
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(examples, null, 2),
          },
        ],
      };
    }
  );

  // ── search_components ────────────────────────────────────────────
  server.tool(
    'search_components',
    'Search across component APIs by keyword.',
    {
      query: z.string().describe('The search query string'),
      searchIn: z
        .array(
          z.enum([
            'properties',
            'events',
            'slots',
            'description',
            'css-properties',
          ])
        )
        .optional()
        .describe(
          'Optional list of sections to search in (properties, events, slots, description, css-properties)'
        ),
    },
    async ({ query, searchIn }) => {
      const results = registry.search(query, searchIn);
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(results, null, 2),
          },
        ],
      };
    }
  );

  // ── validate_usage ───────────────────────────────────────────────
  server.tool(
    'validate_usage',
    'Validate HTML that uses Spectrum Web Components.',
    {
      html: z.string().describe('The HTML string to validate'),
    },
    async ({ html }) => {
      const result = validateHTML(html, registry);
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    }
  );

  // ── get_migration_info ───────────────────────────────────────────
  server.tool(
    'get_migration_info',
    'Get migration information for a gen-1 component moving to gen-2.',
    {
      tagName: z
        .string()
        .describe('The gen-1 custom element tag name, e.g. "sp-button"'),
    },
    async ({ tagName }) => {
      const info = migrationData.get(tagName);
      if (!info) {
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify(
                {
                  message: `No migration info found for "${tagName}".`,
                },
                null,
                2
              ),
            },
          ],
        };
      }
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(info, null, 2),
          },
        ],
      };
    }
  );

  return server;
}
