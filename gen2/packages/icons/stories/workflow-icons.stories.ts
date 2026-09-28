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
import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { html as staticHtml, unsafeStatic } from 'lit/static-html.js';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import {
  ICON_VALID_SIZES,
  type IconSize,
} from '@adobe/spectrum-wc-core/components/icon';

// Register only the icons the compact stories render. The full set is loaded lazily by
// Gallery's loader, so the light story/test pages don't define all ~413 elements — which
// is memory-heavy per shadow root, WebKit especially.
import '../src/swc-icon-alert-triangle.js';
import '../src/swc-icon-delete.js';
import '../src/swc-icon-folder.js';
import '../src/swc-icon-heart.js';
import '../src/swc-icon-search.js';
import '../src/swc-icon-settings.js';
import '../src/swc-icon-star.js';

import { WORKFLOW_ICONS } from '../src/manifest.js';

// ────────────────
//    METADATA
// ────────────────

type IconArgs = {
  size: IconSize;
  'accessible-label': string;
};

/**
 * Workflow icons are the public Spectrum 2 icons consumers pick from: stars, folders,
 * arrows, and the like. Each ships as both a per-icon custom element (`<swc-icon-star>`)
 * and a framework-agnostic SVG-string function (`Icon_Star()`), so it works in any
 * framework and in plain HTML without Lit. For a custom, non-Spectrum SVG, use the
 * [Icon](../?path=/docs/components-icon--docs) frame instead.
 */
const meta: Meta<IconArgs> = {
  title: 'Workflow icons',
  args: {
    size: 'm',
    'accessible-label': 'Favorite',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: [...ICON_VALID_SIZES],
    },
    'accessible-label': {
      control: { type: 'text' },
    },
  },
  parameters: {
    docs: {
      subtitle:
        'Public Spectrum 2 icons as custom elements and SVG-string functions.',
    },
  },
  tags: ['migrated'],
};

export default meta;

// ────────────────────
//    HELPERS
// ────────────────────

const sizeLabels = {
  xs: 'Extra-small',
  s: 'Small',
  m: 'Medium',
  l: 'Large',
  xl: 'Extra-large',
} as const satisfies Record<IconSize, string>;

const cardStyles = {
  display: 'inline-flex',
  'flex-direction': 'column',
  'align-items': 'center',
  gap: '8px',
  'min-inline-size': '112px',
  'max-inline-size': '112px',
  padding: '12px',
  'text-align': 'center',
} as const;

const codeStyles = {
  'font-size': '11px',
  'word-break': 'break-all',
  color: 'var(--swc-neutral-content-color-default, currentColor)',
} as const;

/** Render one workflow icon element by tag, with the given size and label. */
const renderIcon = (
  tag: string,
  size: IconSize = 'm',
  label = ''
): ReturnType<typeof staticHtml> => {
  const el = unsafeStatic(tag);
  return staticHtml`<${el} size=${size} accessible-label=${label}></${el}>`;
};

// A handful of recognizable icons for the compact stories.
const FEATURED = [
  'swc-icon-star',
  'swc-icon-folder',
  'swc-icon-heart',
  'swc-icon-settings',
  'swc-icon-search',
  'swc-icon-delete',
] as const;

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story = {
  render: (args) =>
    renderIcon('swc-icon-star', args.size, args['accessible-label']),
  tags: ['dev'],
};

// ──────────────────────────
//    OVERVIEW STORY
// ──────────────────────────

export const Overview: Story = {
  render: (args) => html`
    ${FEATURED.map((tag) =>
      renderIcon(tag, args.size, tag.replace('swc-icon-', ''))
    )}
  `,
  parameters: { flexLayout: 'row-wrap' },
  tags: ['overview'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

export const Sizes: Story = {
  render: () => html`
    ${ICON_VALID_SIZES.map(
      (size) => html`
        <div style=${styleMap(cardStyles)}>
          ${renderIcon('swc-icon-star', size, `Star ${sizeLabels[size]}`)}
          <code style=${styleMap(codeStyles)}>${size}</code>
        </div>
      `
    )}
  `,
  parameters: { flexLayout: 'row-wrap' },
  tags: ['options'],
};

export const Color: Story = {
  render: () => html`
    ${[
      { color: 'inherit', label: 'CSS color (inherited)' },
      { color: 'var(--swc-red-900, #d7373f)', label: '--swc-icon-color' },
      { color: 'var(--swc-blue-900, #1473e6)', label: '--swc-icon-color' },
    ].map(
      ({ color, label }) => html`
        <div
          style=${styleMap({
            ...cardStyles,
            color: color === 'inherit' ? 'currentColor' : '',
            '--swc-icon-color': color === 'inherit' ? '' : color,
          })}
        >
          ${renderIcon('swc-icon-heart', 'l', 'Favorite')}
          <code style=${styleMap(codeStyles)}>${label}</code>
        </div>
      `
    )}
  `,
  parameters: { flexLayout: 'row-wrap' },
  tags: ['options'],
};

// The full-set gallery renders all 413 elements. It is excluded from the automated
// runners (`!test`) because rendering the whole set through axe and vitest on every
// run is disproportionately slow with no behavioral coverage beyond the lighter
// stories; the dedicated VRT story snapshots the grid instead.
export const Gallery: Story = {
  // Register the full set only when the gallery actually renders (docs/Chromatic),
  // rather than on module load.
  loaders: [
    async () => {
      await import('../src/elements.js');
      return {};
    },
  ],
  render: (args) => html`
    ${WORKFLOW_ICONS.map(
      ({ name, tag }) => html`
        <div style=${styleMap(cardStyles)}>
          ${renderIcon(tag, args.size, name)}
          <code style=${styleMap(codeStyles)}>${tag}</code>
        </div>
      `
    )}
  `,
  parameters: { flexLayout: 'row-wrap' },
  tags: ['options', '!test'],
};

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = {
  render: () => html`
    <div style=${styleMap(cardStyles)}>
      ${renderIcon('swc-icon-alert-triangle', 'l', 'Warning')}
      <code style=${styleMap(codeStyles)}>labeled (role="img")</code>
    </div>
    <div style=${styleMap(cardStyles)}>
      ${renderIcon('swc-icon-alert-triangle', 'l', '')}
      <code style=${styleMap(codeStyles)}>decorative (aria-hidden)</code>
    </div>
  `,
  parameters: { flexLayout: 'row-wrap' },
  tags: ['a11y'],
};
