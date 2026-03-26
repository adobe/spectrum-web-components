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

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { beforeAll, describe, expect, it } from 'vitest';

import { parseCEM } from '../src/cem-parser.js';
import { validateHTML } from '../src/html-validator.js';
import { parseReadmeExamples } from '../src/readme-parser.js';
import { ComponentRegistry } from '../src/registry.js';
import type { MigrationInfo, MigrationStep } from '../src/types.js';
import badgeCEM from './fixtures/badge-cem.json';
import buttonCEM from './fixtures/button-cem.json';

let registry: ComponentRegistry;
let migrationData: Map<string, MigrationInfo>;

beforeAll(() => {
  // 1. Create registry
  registry = new ComponentRegistry();

  // 2. Load button from fixture via parseCEM, add to registry
  const buttonComponents = parseCEM(
    buttonCEM,
    '@spectrum-web-components/button',
    'gen-1'
  );
  for (const comp of buttonComponents) {
    registry.add(comp);
  }

  // 3. Load badge from fixture via parseCEM, add to registry
  const badgeComponents = parseCEM(
    badgeCEM,
    '@spectrum-web-components/badge',
    'gen-1'
  );
  for (const comp of badgeComponents) {
    registry.add(comp);
  }

  // 4. Load README examples and add to registry for sp-button
  const readmePath = resolve(__dirname, 'fixtures/sample-readme.md');
  const readmeContent = readFileSync(readmePath, 'utf-8');
  const examples = parseReadmeExamples(readmeContent);
  registry.addExamples('sp-button', examples);

  // 5. Create migration data Map with sp-badge entry
  const allSteps: MigrationStep[] = [
    'analyze',
    'factor-component',
    'move-to-core',
    'add-data-model',
    'add-2nd-gen',
    'render-and-style',
    'add-stories',
  ];

  migrationData = new Map<string, MigrationInfo>();
  migrationData.set('sp-badge', {
    gen1TagName: 'sp-badge',
    gen2Package: '@adobe/spectrum-wc/badge',
    migrationStatus: 'complete',
    steps: allSteps,
    completedSteps: allSteps,
    breakingChanges: [
      {
        type: 'property-removed',
        name: 'quiet',
        description: "The 'quiet' property is removed in gen-2.",
      },
    ],
    apiDiff: {
      addedProperties: [],
      removedProperties: ['quiet'],
      changedTypes: [],
    },
  });

  // 6. Mark gen-2 equivalent on badge
  registry.markGen2Equivalent('sp-badge', '@adobe/spectrum-wc/badge');
});

describe('list_components flow', () => {
  it('returns all components (length 2)', () => {
    const list = registry.list();
    expect(list).toHaveLength(2);
  });

  it('badge shows hasGen2Equivalent=true', () => {
    const list = registry.list();
    const badge = list.find((c) => c.tagName === 'sp-badge');
    expect(badge).toBeDefined();
    expect(badge!.hasGen2Equivalent).toBe(true);
  });
});

describe('get_component_api flow', () => {
  it('returns full API with all sections', () => {
    const api = registry.get('sp-button');
    expect(api).toBeDefined();
    expect(api!.properties.length).toBeGreaterThan(0);
    expect(api!.slots.length).toBeGreaterThan(0);
    expect(api!.events.length).toBeGreaterThan(0);
  });
});

describe('get_component_examples flow', () => {
  it('returns parsed README examples', () => {
    const examples = registry.getExamples('sp-button');
    expect(examples.length).toBeGreaterThan(0);
    expect(examples[0].source).toBe('readme');
  });
});

describe('search_components flow', () => {
  it('finds components with "variant" property', () => {
    const results = registry.search('variant', ['properties']);
    expect(results.length).toBeGreaterThanOrEqual(2);
  });
});

describe('validate_usage flow', () => {
  it('catches invalid attribute and suggests correct one', () => {
    const result = validateHTML(
      '<sp-button varian="red" quiet>Click</sp-button>',
      registry
    );
    expect(result.valid).toBe(false);
    expect(result.diagnostics.length).toBeGreaterThanOrEqual(2);

    // Error for unknown "varian" attribute suggesting "variant"
    const typoError = result.diagnostics.find(
      (d) => d.severity === 'error' && d.message.includes('varian')
    );
    expect(typoError).toBeDefined();
    expect(typoError!.message).toContain('variant');

    // Warning for deprecated "quiet" attribute
    const quietWarning = result.diagnostics.find(
      (d) => d.severity === 'warning' && d.message.includes('quiet')
    );
    expect(quietWarning).toBeDefined();
    expect(quietWarning!.message).toContain('deprecated');
  });
});

describe('get_migration_info flow', () => {
  it('returns full migration info for sp-badge', () => {
    const info = migrationData.get('sp-badge');
    expect(info).toBeDefined();
    expect(info!.migrationStatus).toBe('complete');
    expect(info!.gen2Package).toBe('@adobe/spectrum-wc/badge');
    expect(info!.breakingChanges).toHaveLength(1);
  });

  it('returns undefined for non-migrated component', () => {
    const info = migrationData.get('sp-button');
    expect(info).toBeUndefined();
  });
});
