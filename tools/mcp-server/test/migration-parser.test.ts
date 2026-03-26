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

import { readFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { describe, expect, it } from 'vitest';

import {
  componentNameToGen2Package,
  componentNameToTagName,
  parseMigrationStatus,
} from '../src/migration-parser.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const fixtureContent = readFileSync(
  resolve(__dirname, 'fixtures/migration-status.md'),
  'utf-8'
);

describe('parseMigrationStatus', () => {
  const entries = parseMigrationStatus(fixtureContent);

  it('parses fully migrated components', () => {
    const badge = entries.find((entry) => entry.component === 'Badge');
    expect(badge).toBeDefined();
    expect(badge!.status).toBe('complete');
    expect(badge!.completedSteps).toHaveLength(7);
    expect(badge!.completedSteps).toEqual([
      'analyze',
      'factor-component',
      'move-to-core',
      'add-data-model',
      'add-2nd-gen',
      'render-and-style',
      'add-stories',
    ]);
  });

  it('parses analyzed-only components', () => {
    const button = entries.find((entry) => entry.component === 'Button');
    expect(button).toBeDefined();
    expect(button!.status).toBe('analyzed');
    expect(button!.completedSteps).toEqual(['analyze']);
  });

  it('parses partially migrated components', () => {
    const alertBanner = entries.find(
      (entry) => entry.component === 'Alert Banner'
    );
    expect(alertBanner).toBeDefined();
    expect(alertBanner!.status).toBe('in-progress');
    expect(alertBanner!.completedSteps).toEqual([
      'analyze',
      'factor-component',
    ]);
  });

  it('returns correct total count', () => {
    expect(entries).toHaveLength(7);
  });
});

describe('componentNameToTagName', () => {
  it('converts simple names', () => {
    expect(componentNameToTagName('Badge')).toBe('sp-badge');
  });

  it('converts multi-word names', () => {
    expect(componentNameToTagName('Progress Circle')).toBe(
      'sp-progress-circle'
    );
  });
});

describe('componentNameToGen2Package', () => {
  it('converts simple names', () => {
    expect(componentNameToGen2Package('Badge')).toBe(
      '@adobe/spectrum-wc/badge'
    );
  });

  it('converts multi-word names', () => {
    expect(componentNameToGen2Package('Progress Circle')).toBe(
      '@adobe/spectrum-wc/progress-circle'
    );
  });
});
