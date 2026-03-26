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

import { beforeEach, describe, expect, it } from 'vitest';

import { ComponentRegistry } from '../src/registry.js';
import type { ComponentAPI, ComponentExample } from '../src/types.js';

const buttonComponent: ComponentAPI = {
  tagName: 'sp-button',
  className: 'Button',
  package: '@spectrum-web-components/button',
  generation: 'gen-1',
  description: 'A button component with multiple variants.',
  hasGen2Equivalent: false,
  migrationStatus: 'not-started',
  superclass: 'SizedMixin(ButtonBase)',
  mixins: ['SizedMixin'],
  properties: [
    {
      name: 'variant',
      type: 'string',
      reflects: true,
      description: 'The visual variant.',
      deprecated: false,
    },
    {
      name: 'disabled',
      type: 'boolean',
      reflects: true,
      description: 'Disable this control.',
      inherited: true,
      inheritedFrom: 'Focusable',
      deprecated: false,
    },
    {
      name: 'pending',
      type: 'boolean',
      default: 'false',
      reflects: true,
      description: 'Sets pending state.',
      deprecated: false,
    },
  ],
  attributes: [{ name: 'variant', fieldName: 'variant' }],
  events: [{ name: 'click', description: 'Click event.' }],
  slots: [
    { name: '', description: 'Default slot.' },
    { name: 'icon', description: 'Icon slot.' },
  ],
  cssCustomProperties: [{ name: '--spectrum-button-bg' }],
  cssParts: [],
  methods: [],
};

const badgeComponent: ComponentAPI = {
  tagName: 'sp-badge',
  className: 'Badge',
  package: '@spectrum-web-components/badge',
  generation: 'gen-1',
  description: 'A badge component.',
  hasGen2Equivalent: false,
  migrationStatus: 'not-started',
  superclass: 'SizedMixin(BadgeBase)',
  mixins: [],
  properties: [
    {
      name: 'variant',
      type: 'string',
      reflects: true,
      description: 'Badge variant.',
      deprecated: false,
    },
    {
      name: 'size',
      type: 'string',
      reflects: true,
      description: 'Badge size.',
      deprecated: false,
    },
  ],
  attributes: [{ name: 'variant', fieldName: 'variant' }],
  events: [],
  slots: [
    { name: '', description: 'Badge text.' },
    { name: 'icon', description: 'Badge icon.' },
  ],
  cssCustomProperties: [],
  cssParts: [],
  methods: [],
};

describe('ComponentRegistry', () => {
  let registry: ComponentRegistry;

  beforeEach(() => {
    registry = new ComponentRegistry();
    registry.add(buttonComponent);
    registry.add(badgeComponent);
  });

  it('lists all components', () => {
    const all = registry.list();
    expect(all).toHaveLength(2);
    expect(all.map((c) => c.tagName)).toContain('sp-button');
    expect(all.map((c) => c.tagName)).toContain('sp-badge');
    // Summary should not include full API details like properties
    for (const summary of all) {
      expect(summary).not.toHaveProperty('properties');
      expect(summary).not.toHaveProperty('events');
    }
  });

  it('filters by generation', () => {
    const gen1 = registry.list({ generation: 'gen-1' });
    expect(gen1).toHaveLength(2);

    const gen2 = registry.list({ generation: 'gen-2' });
    expect(gen2).toHaveLength(0);
  });

  it('gets component by tagName', () => {
    const button = registry.get('sp-button');
    expect(button).toBeDefined();
    expect(button!.tagName).toBe('sp-button');
    expect(button!.properties).toHaveLength(3);
  });

  it('returns undefined for unknown tag', () => {
    const result = registry.get('sp-nonexistent');
    expect(result).toBeUndefined();
  });

  it('searches by property name', () => {
    const results = registry.search('variant');
    // Both button and badge have a "variant" property
    const tagNames = results.map((r) => r.tagName);
    expect(tagNames).toContain('sp-button');
    expect(tagNames).toContain('sp-badge');
    // Exact name matches should have highest relevance
    const exactMatches = results.filter(
      (r) => r.matchType === 'property' && r.relevanceScore === 1.0
    );
    expect(exactMatches.length).toBeGreaterThanOrEqual(2);
  });

  it('searches by description text', () => {
    const results = registry.search('pending');
    const tagNames = results.map((r) => r.tagName);
    expect(tagNames).toContain('sp-button');
    // Badge does not mention "pending"
    expect(results.filter((r) => r.tagName === 'sp-badge')).toHaveLength(0);
  });

  it('searches scoped to specific sections', () => {
    const slotResults = registry.search('icon', ['slots']);
    // Both button and badge have an "icon" slot
    expect(slotResults.length).toBeGreaterThanOrEqual(2);
    for (const result of slotResults) {
      expect(result.matchType).toBe('slot');
    }
  });

  it('adds and retrieves examples', () => {
    const examples: ComponentExample[] = [
      {
        title: 'Primary button',
        html: '<sp-button variant="primary">Click</sp-button>',
        source: 'readme',
      },
      {
        title: 'Disabled button',
        html: '<sp-button disabled>Disabled</sp-button>',
        source: 'storybook',
      },
    ];

    registry.addExamples('sp-button', examples);
    const retrieved = registry.getExamples('sp-button');
    expect(retrieved).toHaveLength(2);

    // Unknown tag returns empty
    expect(registry.getExamples('sp-nonexistent')).toHaveLength(0);
  });

  it('marks gen-2 equivalents', () => {
    expect(registry.get('sp-button')!.hasGen2Equivalent).toBe(false);

    registry.markGen2Equivalent(
      'sp-button',
      '@spectrum-web-components/button-next'
    );

    expect(registry.get('sp-button')!.hasGen2Equivalent).toBe(true);
  });
});
