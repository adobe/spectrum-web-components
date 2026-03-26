#!/usr/bin/env node

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

import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

import { parseCEM } from './cem-parser.js';
import {
  componentNameToGen2Package,
  componentNameToTagName,
  parseMigrationStatus,
} from './migration-parser.js';
import { parseReadmeExamples } from './readme-parser.js';
import { ComponentRegistry } from './registry.js';
import { createMCPServer } from './server.js';
import type { CEMManifest, MigrationInfo, MigrationStep } from './types.js';

// ── Helpers ──────────────────────────────────────────────────────────

/** Walk up from `start` looking for a directory containing both 1st-gen/ and 2nd-gen/. */
function findMonorepoRoot(start: string): string | null {
  let dir = start;

  while (true) {
    if (existsSync(join(dir, '1st-gen')) && existsSync(join(dir, '2nd-gen'))) {
      return dir;
    }
    const parent = dirname(dir);
    if (parent === dir) {
      return null;
    }
    dir = parent;
  }
}

function getMonorepoRoot(): string {
  // Check --root= CLI arg first
  const rootArg = process.argv.find((a) => a.startsWith('--root='));
  if (rootArg) {
    const rootPath = rootArg.split('=')[1];
    if (existsSync(rootPath)) {
      return rootPath;
    }
    console.error(
      `[swc-mcp] Warning: --root path "${rootPath}" does not exist, falling back to discovery.`
    );
  }

  const found = findMonorepoRoot(process.cwd());
  if (!found) {
    console.error(
      '[swc-mcp] Error: could not locate monorepo root (expected 1st-gen/ and 2nd-gen/ subdirs).'
    );
    process.exit(1);
  }
  return found;
}

// ── Main ─────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const root = getMonorepoRoot();
  console.error(`[swc-mcp] Monorepo root: ${root}`);

  const registry = new ComponentRegistry();

  // 1. Load gen-1 components from CEM files
  const gen1PackagesDir = join(root, '1st-gen', 'packages');
  if (existsSync(gen1PackagesDir)) {
    const packageDirs = readdirSync(gen1PackagesDir, {
      withFileTypes: true,
    }).filter((d) => d.isDirectory());

    let componentCount = 0;
    for (const dir of packageDirs) {
      const cemPath = join(gen1PackagesDir, dir.name, 'custom-elements.json');
      if (!existsSync(cemPath)) {
        continue;
      }

      try {
        const raw = readFileSync(cemPath, 'utf-8');
        const manifest: CEMManifest = JSON.parse(raw);
        const packageName = `@spectrum-web-components/${dir.name}`;
        const components = parseCEM(manifest, packageName, 'gen-1');

        for (const component of components) {
          registry.add(component);
          componentCount++;
        }

        // Load README examples
        const readmePath = join(gen1PackagesDir, dir.name, 'README.md');
        if (existsSync(readmePath)) {
          const readmeContent = readFileSync(readmePath, 'utf-8');
          const examples = parseReadmeExamples(readmeContent);
          if (examples.length > 0) {
            // Associate examples with each component from this package
            for (const component of components) {
              registry.addExamples(component.tagName, examples);
            }
          }
        }
      } catch (err) {
        console.error(
          `[swc-mcp] Warning: failed to parse CEM for ${dir.name}: ${err}`
        );
      }
    }
    console.error(
      `[swc-mcp] Loaded ${componentCount} gen-1 components from ${gen1PackagesDir}`
    );
  } else {
    console.error(
      `[swc-mcp] Warning: gen-1 packages directory not found at ${gen1PackagesDir}`
    );
  }

  // 2. Load migration data
  const migrationData = new Map<string, MigrationInfo>();
  const migrationPath = join(
    root,
    'CONTRIBUTOR-DOCS',
    '03_project-planning',
    '02_workstreams',
    '02_2nd-gen-component-migration',
    '01_status.md'
  );

  if (existsSync(migrationPath)) {
    try {
      const migrationContent = readFileSync(migrationPath, 'utf-8');
      const entries = parseMigrationStatus(migrationContent);

      const allSteps: MigrationStep[] = [
        'analyze',
        'factor-component',
        'move-to-core',
        'add-data-model',
        'add-2nd-gen',
        'render-and-style',
        'add-stories',
      ];

      for (const entry of entries) {
        const tagName = componentNameToTagName(entry.component);
        const gen2Package = componentNameToGen2Package(entry.component);

        const info: MigrationInfo = {
          gen1TagName: tagName,
          gen2Package: entry.status !== 'not-started' ? gen2Package : null,
          migrationStatus: entry.status,
          steps: allSteps,
          completedSteps: entry.completedSteps,
          breakingChanges: [],
          apiDiff: {
            addedProperties: [],
            removedProperties: [],
            changedTypes: [],
          },
        };

        migrationData.set(tagName, info);

        // Mark gen-2 equivalents in registry
        if (entry.status === 'in-progress' || entry.status === 'complete') {
          registry.markGen2Equivalent(tagName, gen2Package);
        }
      }

      console.error(
        `[swc-mcp] Loaded migration data for ${migrationData.size} components`
      );
    } catch (err) {
      console.error(
        `[swc-mcp] Warning: failed to parse migration status: ${err}`
      );
    }
  } else {
    console.error(
      `[swc-mcp] Warning: migration status file not found at ${migrationPath}`
    );
  }

  // 3. Create and start the MCP server
  const server = createMCPServer({ registry, migrationData });
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('[swc-mcp] Server started on stdio transport.');
}

main().catch((error) => {
  console.error('[swc-mcp] Fatal error:', error);
  process.exit(1);
});
