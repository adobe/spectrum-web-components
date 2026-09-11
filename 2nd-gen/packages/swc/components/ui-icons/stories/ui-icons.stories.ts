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
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import {
  ICON_VALID_SIZES,
  type IconSize,
} from '@adobe/spectrum-wc-core/components/icon';

import '@adobe/spectrum-wc/components/ui-icons/swc-ui-icon.js';

import { UI_ICONS, type UiIconName } from '../icon-set/index.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-ui-icon');

const ICON_NAMES = Object.keys(UI_ICONS).sort() as UiIconName[];

argTypes.icon = {
  ...argTypes.icon,
  control: { type: 'select' },
  options: ICON_NAMES,
};

argTypes.size = {
  ...argTypes.size,
  control: { type: 'select' },
  options: ICON_VALID_SIZES,
};

/**
 * UI icons are the small, functional glyphs Spectrum controls use (chevrons,
 * checkmarks, arrows, and the like). Spectrum's own components render them for
 * you, and the set also ships in `@adobe/spectrum-wc` as the `<swc-ui-icon>`
 * element so you can use the same optically-tuned art in your own layouts. Pick
 * an icon by name with `icon` and a t-shirt `size`. For a custom, non-Spectrum
 * drawing, use the [Icon](../?path=/docs/components-icon--docs) frame instead.
 */
const meta: Meta = {
  title: 'Icons/UI icons',
  component: 'swc-ui-icon',
  args,
  argTypes,
  render: (args) => template(args),
  parameters: {
    docs: {
      subtitle: `The Spectrum UI icon set, rendered by the swc-ui-icon element.`,
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
  padding: '12px',
} as const;

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story = {
  tags: ['dev'],
  args: {
    icon: 'chevron',
    size: 'm',
    'accessible-label': 'Chevron',
  },
};

// ──────────────────────────
//    OVERVIEW STORY
// ──────────────────────────

export const Overview: Story = {
  tags: ['overview'],
  args: {
    icon: 'chevron',
    size: 'm',
    'accessible-label': 'Chevron',
  },
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

export const AvailableIcons: Story = {
  render: (args) => html`
    ${ICON_NAMES.map(
      (name) => html`
        <div style=${styleMap(cardStyles)}>
          ${template({
            ...args,
            icon: name,
            size: 'm',
            'accessible-label': name,
          })}
          <code>${name}</code>
        </div>
      `
    )}
  `,
  tags: ['options'],
  parameters: { flexLayout: 'row-wrap' },
};
AvailableIcons.storyName = 'Available icons';

export const OpticalSizes: Story = {
  render: (args) => html`
    ${ICON_VALID_SIZES.map(
      (size) => html`
        <div style=${styleMap(cardStyles)}>
          ${template({
            ...args,
            icon: 'chevron',
            size,
            'accessible-label': `Chevron ${sizeLabels[size]}`,
          })}
          <code>${size}</code>
        </div>
      `
    )}
  `,
  tags: ['options'],
  parameters: { flexLayout: 'row-wrap' },
};
OpticalSizes.storyName = 'Optical sizes';

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = {
  render: (args) =>
    template({
      ...args,
      icon: 'checkmark',
      size: 'm',
      'accessible-label': 'Selected',
    }),
  tags: ['a11y'],
};
