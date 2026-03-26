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

import { describe, expect, it } from 'vitest';

import { parseCEM } from '../src/cem-parser.js';
import { validateHTML } from '../src/html-validator.js';
import { ComponentRegistry } from '../src/registry.js';
import type { CEMManifest } from '../src/types.js';
import buttonCEM from './fixtures/button-cem.json';

describe('validateHTML', () => {
  const registry = new ComponentRegistry();
  const components = parseCEM(
    buttonCEM as CEMManifest,
    '@spectrum-web-components/button',
    'gen-1'
  );
  for (const component of components) {
    registry.add(component);
  }

  it('validates correct usage with no diagnostics', () => {
    const result = validateHTML(
      '<sp-button variant="accent">Click</sp-button>',
      registry
    );
    expect(result.valid).toBe(true);
    expect(result.diagnostics).toHaveLength(0);
  });

  it('flags unknown attributes', () => {
    const result = validateHTML(
      '<sp-button color="red">Click</sp-button>',
      registry
    );
    expect(result.valid).toBe(false);
    expect(result.diagnostics).toHaveLength(1);
    expect(result.diagnostics[0].severity).toBe('error');
    expect(result.diagnostics[0].message).toContain('color');
  });

  it('warns about deprecated attributes', () => {
    const result = validateHTML('<sp-button quiet>Click</sp-button>', registry);
    expect(result.diagnostics.length).toBeGreaterThanOrEqual(1);
    const warning = result.diagnostics.find((d) => d.severity === 'warning');
    expect(warning).toBeDefined();
    expect(warning!.message).toContain('deprecated');
  });

  it('ignores non-SWC elements', () => {
    const result = validateHTML(
      '<div class="wrapper"><p>hello</p></div>',
      registry
    );
    expect(result.valid).toBe(true);
    expect(result.diagnostics).toHaveLength(0);
  });

  it('validates multiple SWC elements', () => {
    const result = validateHTML(
      '<sp-button variant="accent">OK</sp-button><sp-button color="blue">Bad</sp-button>',
      registry
    );
    expect(result.diagnostics).toHaveLength(1);
    expect(result.diagnostics[0].message).toContain('color');
  });

  it('allows standard HTML attributes', () => {
    const result = validateHTML(
      '<sp-button variant="accent" id="my-btn" class="primary" style="margin: 4px">Click</sp-button>',
      registry
    );
    expect(result.valid).toBe(true);
    expect(result.diagnostics).toHaveLength(0);
  });

  it('suggests similar attribute names for typos', () => {
    const result = validateHTML(
      '<sp-button varient="accent">Click</sp-button>',
      registry
    );
    expect(result.valid).toBe(false);
    expect(result.diagnostics).toHaveLength(1);
    expect(result.diagnostics[0].severity).toBe('error');
    expect(result.diagnostics[0].message).toContain('variant');
  });
});
