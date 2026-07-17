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
import { html, type TemplateResult } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import {
  ICON_VALID_SIZES,
  type IconSize,
} from '@adobe/spectrum-wc-core/components/icon';

import '@adobe/spectrum-wc/components/icon/swc-icon.js';

import { Chevron100Icon } from '../elements/index.js';
import * as iconElements from '../elements/index.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-icon');

argTypes.size = {
  ...argTypes.size,
  control: { type: 'select' },
  options: ICON_VALID_SIZES,
};

/**
 * **Internal-only component.**
 *
 * The `<swc-icon>` element renders icons from shared inline SVG templates.
 * Use shared templates from `../elements/index.js` for consistent rendering and avoid duplicating SVG markup in each component.
 */
const meta: Meta = {
  title: 'Icon',
  component: 'swc-icon',
  args,
  argTypes,
  render: (args) => template(args),
  parameters: {
    docs: {
      subtitle: `Internal icon renderer for shared SVG templates.`,
    },
  },
  tags: ['migrated'],
};

export default meta;

// ────────────────────
//    HELPERS
// ────────────────────

const iconSvg = Chevron100Icon();

const sizeLabels = {
  xs: 'Extra-small',
  s: 'Small',
  m: 'Medium',
  l: 'Large',
  xl: 'Extra-large',
} as const satisfies Record<IconSize, string>;

const iconCardStyles = {
  display: 'inline-flex',
  'flex-direction': 'column',
  'align-items': 'center',
  gap: '8px',
  'min-inline-size': '120px',
  padding: '8px',
} as const;

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story = {
  tags: ['dev'],
  render: (args) => template(args, iconSvg),
  args: {
    label: 'Search',
    size: 'm',
  },
};

// ────────────────────
//    OVERVIEW STORY
// ────────────────────

export const Overview: Story = {
  tags: ['overview'],
  render: (args) => template(args, iconSvg),
  args: {
    label: 'Search',
    size: 'm',
  },
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

export const Anatomy: Story = {
  render: (args) =>
    template({ ...args, label: args.label || 'Chevron icon' }, iconSvg),
  tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

export const Sizes: Story = {
  render: (args) => html`
    ${ICON_VALID_SIZES.map((size) =>
      template(
        { ...args, label: args.label || sizeLabels[size], size },
        iconSvg
      )
    )}
  `,
  tags: ['options'],
  parameters: {
    flexLayout: 'row-wrap',
  },
};

export const Sources: Story = {
  render: (args) =>
    template({ ...args, label: args.label || 'Chevron icon' }, iconSvg),
  tags: ['options'],
};

export const SharedTemplates: Story = {
  render: (args) =>
    template({ ...args, label: args.label || 'Chevron' }, Chevron100Icon()),
  tags: ['options'],
};
SharedTemplates.storyName = 'Shared templates';

export const AvailableIcons: Story = {
  render: (args) => {
    const catalog = Object.entries(iconElements)
      .filter(
        ([name, iconFactory]) =>
          name.endsWith('Icon') && typeof iconFactory === 'function'
      )
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([name, iconFactory]) => ({
        name,
        icon: (iconFactory as () => TemplateResult)(),
      }));
    return html`
      ${catalog.map(
        (entry) => html`
          <div style=${styleMap(iconCardStyles)}>
            ${template(
              { ...args, label: args.label || entry.name },
              entry.icon
            )}
            <code>${entry.name}</code>
          </div>
        `
      )}
    `;
  },
  tags: ['options'],
  parameters: {
    docs: {
      canvas: {
        sourceState: 'none',
      },
    },
    flexLayout: 'row-wrap',
  },
};
AvailableIcons.storyName = 'Available icons';

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = {
  render: (args) => template(args, iconSvg),
  tags: ['a11y'],
};
