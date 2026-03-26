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
import type { CEMManifest } from '../src/types.js';
import badgeCEM from './fixtures/badge-cem.json';
import buttonCEM from './fixtures/button-cem.json';

describe('parseCEM', () => {
  const buttonResult = parseCEM(
    buttonCEM as CEMManifest,
    '@spectrum-web-components/button',
    'gen-1'
  );
  const button = buttonResult[0];

  it('extracts component API from button CEM', () => {
    expect(button.tagName).toBe('sp-button');
    expect(button.className).toBe('Button');
    expect(button.generation).toBe('gen-1');
    expect(button.package).toBe('@spectrum-web-components/button');
    expect(button.description).toBe(
      'An sp-button represents an action a user can take.'
    );
  });

  it('extracts properties and filters out private members', () => {
    const propNames = button.properties.map((p) => p.name);
    expect(propNames).toContain('variant');
    expect(propNames).toContain('treatment');
    expect(propNames).toContain('quiet');
    expect(propNames).toContain('disabled');
    expect(propNames).toContain('pending');
    expect(propNames).not.toContain('_isActive');
  });

  it('preserves inherited property annotations', () => {
    const disabled = button.properties.find((p) => p.name === 'disabled');
    expect(disabled).toBeDefined();
    expect(disabled!.inherited).toBe(true);
    expect(disabled!.inheritedFrom).toBe('Focusable');
  });

  it('parses deprecated properties', () => {
    const quiet = button.properties.find((p) => p.name === 'quiet');
    expect(quiet).toBeDefined();
    expect(quiet!.deprecated).toEqual({
      reason: "Use treatment='outline' instead.",
    });
  });

  it('extracts slots, events, cssProperties, cssParts, methods', () => {
    expect(button.slots).toHaveLength(2);
    expect(button.slots.map((s) => s.name)).toContain('');
    expect(button.slots.map((s) => s.name)).toContain('icon');

    expect(button.events).toHaveLength(1);
    expect(button.events[0].name).toBe('click');

    expect(button.cssCustomProperties).toHaveLength(2);
    expect(button.cssCustomProperties[0].name).toBe(
      '--spectrum-button-border-radius'
    );

    expect(button.cssParts).toHaveLength(1);
    expect(button.cssParts[0].name).toBe('button');

    expect(button.methods).toHaveLength(1);
    expect(button.methods[0].name).toBe('focus');
    expect(button.methods[0].parameters).toHaveLength(1);
    expect(button.methods[0].parameters![0].name).toBe('options');
  });

  it('extracts attributes with fieldName mapping', () => {
    expect(button.attributes.length).toBeGreaterThanOrEqual(5);
    const variantAttr = button.attributes.find((a) => a.name === 'variant');
    expect(variantAttr).toBeDefined();
    expect(variantAttr!.fieldName).toBe('variant');

    const disabledAttr = button.attributes.find((a) => a.name === 'disabled');
    expect(disabledAttr).toBeDefined();
    expect(disabledAttr!.fieldName).toBe('disabled');
  });

  it('extracts superclass and mixins', () => {
    expect(button.superclass).toBe('SizedMixin(ButtonBase)');
    expect(button.mixins).toEqual(['SizedMixin', 'ObserveSlotText']);
  });

  it('handles badge CEM with no events or CSS properties', () => {
    const badgeResult = parseCEM(
      badgeCEM as CEMManifest,
      '@spectrum-web-components/badge',
      'gen-1'
    );
    const badge = badgeResult[0];

    expect(badge.tagName).toBe('sp-badge');
    expect(badge.className).toBe('Badge');
    expect(badge.properties).toHaveLength(2);
    expect(badge.events).toHaveLength(0);
    expect(badge.cssCustomProperties).toHaveLength(0);
    expect(badge.cssParts).toHaveLength(0);
    expect(badge.hasGen2Equivalent).toBe(false);
    expect(badge.migrationStatus).toBe('not-started');
  });
});
