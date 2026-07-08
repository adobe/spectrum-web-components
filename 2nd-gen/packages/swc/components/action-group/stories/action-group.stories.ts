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
import { ifDefined } from 'lit/directives/if-defined.js';
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import {
  ACTION_GROUP_ORIENTATIONS,
  ACTION_GROUP_STATIC_COLORS,
  ACTION_GROUP_VALID_SIZES,
} from '@spectrum-web-components/core/components/action-group';

import '@adobe/spectrum-wc/components/action-group/swc-action-group.js';
import '@adobe/spectrum-wc/components/action-button/swc-action-button.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes } = getStorybookHelpers('swc-action-group');

argTypes.size = {
  ...argTypes.size,
  control: { type: 'select' },
  options: [...ACTION_GROUP_VALID_SIZES],
  table: {
    category: 'attributes',
    defaultValue: { summary: 'none' },
  },
};

argTypes.orientation = {
  ...argTypes.orientation,
  control: { type: 'select' },
  options: [...ACTION_GROUP_ORIENTATIONS],
  table: {
    category: 'attributes',
    defaultValue: { summary: 'horizontal' },
  },
};

argTypes.disabled = {
  ...argTypes.disabled,
  table: {
    category: 'attributes',
    defaultValue: { summary: 'false' },
  },
};

argTypes.compact = {
  table: {
    category: 'attributes',
    defaultValue: { summary: 'false' },
  },
};

argTypes.quiet = {
  table: {
    category: 'attributes',
    defaultValue: { summary: 'false' },
  },
};

argTypes.justified = {
  table: {
    category: 'attributes',
    defaultValue: { summary: 'false' },
  },
};

/**
 * An action group clusters related action buttons together with composite
 * keyboard navigation: one Tab stop into the strip, arrow keys move among
 * `swc-action-button` and `swc-action-menu` children.
 *
 * Unlike [Button Group](../?path=/docs/button-group--overview), which lets
 * Tab reach each button independently, action group owns composite navigation
 * (one Tab stop; arrow keys move among items).
 */
const meta: Meta = {
  title: 'Action Group',
  component: 'swc-action-group',
  args,
  argTypes,
  render: (renderArgs) => html`
    <swc-action-group
      accessible-label="Text formatting"
      orientation=${renderArgs.orientation ?? 'horizontal'}
      ?disabled=${renderArgs.disabled}
      ?compact=${renderArgs.compact}
      ?quiet=${renderArgs.quiet}
      ?justified=${renderArgs.justified}
      size=${ifDefined(renderArgs.size)}
      static-color=${ifDefined(renderArgs['static-color'])}
    >
      <swc-action-button>Bold</swc-action-button>
      <swc-action-button>Italic</swc-action-button>
      <swc-action-button>Underline</swc-action-button>
    </swc-action-group>
  `,
  parameters: {
    docs: {
      subtitle:
        'Clusters related action buttons with composite keyboard navigation',
    },
    flexLayout: 'row-wrap',
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
} as const satisfies Record<(typeof ACTION_GROUP_VALID_SIZES)[number], string>;

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story = {
  tags: ['autodocs', 'dev'],
  args: {
    orientation: 'horizontal',
    disabled: false,
  },
};

// ──────────────────────────
//    OVERVIEW STORY
// ──────────────────────────

export const Overview: Story = {
  tags: ['overview'],
  args: {
    orientation: 'horizontal',
  },
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

export const Anatomy: Story = {
  render: () => html`
    <swc-action-group accessible-label="Text formatting">
      <swc-action-button>Bold</swc-action-button>
      <swc-action-button>Italic</swc-action-button>
      <swc-action-button>Underline</swc-action-button>
    </swc-action-group>
  `,
  tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

export const Sizes: Story = {
  render: () => html`
    ${ACTION_GROUP_VALID_SIZES.map(
      (size) => html`
        <swc-action-group accessible-label=${sizeLabels[size]} size=${size}>
          <swc-action-button>${sizeLabels[size]}</swc-action-button>
          <swc-action-button>Action</swc-action-button>
        </swc-action-group>
      `
    )}
  `,
  tags: ['options'],
  parameters: { 'section-order': 1 },
};

export const Orientations: Story = {
  render: () => html`
    ${ACTION_GROUP_ORIENTATIONS.map(
      (orientation) => html`
        <swc-action-group
          accessible-label=${orientation}
          orientation=${orientation}
        >
          <swc-action-button>${orientation} 1</swc-action-button>
          <swc-action-button>${orientation} 2</swc-action-button>
        </swc-action-group>
      `
    )}
  `,
  tags: ['options'],
  parameters: { 'section-order': 2 },
};

export const StaticColors: Story = {
  render: () => html`
    ${ACTION_GROUP_STATIC_COLORS.map(
      (staticColor) => html`
        <swc-action-group
          accessible-label=${staticColor}
          static-color=${staticColor}
        >
          <swc-action-button>${staticColor}</swc-action-button>
          <swc-action-button>Action</swc-action-button>
        </swc-action-group>
      `
    )}
  `,
  tags: ['options', '!test'],
  parameters: { staticColorsDemo: true, 'section-order': 3 },
};
StaticColors.storyName = 'Static colors';

// ──────────────────────────
//    STATES STORIES
// ──────────────────────────

export const Disabled: Story = {
  render: () => html`
    <swc-action-group accessible-label="Text formatting" disabled>
      <swc-action-button>Bold</swc-action-button>
      <swc-action-button>Italic</swc-action-button>
      <swc-action-button>Underline</swc-action-button>
    </swc-action-group>
  `,
  tags: ['states'],
};

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

export const Compact: Story = {
  render: () => html`
    <swc-action-group accessible-label="Text formatting" compact>
      <swc-action-button>Bold</swc-action-button>
      <swc-action-button>Italic</swc-action-button>
      <swc-action-button>Underline</swc-action-button>
    </swc-action-group>
    <swc-action-group
      accessible-label="Text formatting, vertical and compact"
      orientation="vertical"
      compact
    >
      <swc-action-button>Bold</swc-action-button>
      <swc-action-button>Italic</swc-action-button>
      <swc-action-button>Underline</swc-action-button>
    </swc-action-group>
  `,
  tags: ['behaviors'],
};

export const Quiet: Story = {
  render: () => html`
    <swc-action-group accessible-label="Text formatting" quiet>
      <swc-action-button>Bold</swc-action-button>
      <swc-action-button>Italic</swc-action-button>
      <swc-action-button>Underline</swc-action-button>
    </swc-action-group>
    <swc-action-group
      accessible-label="Text formatting, compact and quiet"
      quiet
      compact
    >
      <swc-action-button>Bold</swc-action-button>
      <swc-action-button>Italic</swc-action-button>
      <swc-action-button>Underline</swc-action-button>
    </swc-action-group>
  `,
  tags: ['behaviors'],
};
Quiet.storyName = 'Quiet (compact join disabled)';

export const Justified: Story = {
  render: () => html`
    <swc-action-group
      accessible-label="Text formatting"
      justified
      style="inline-size: 300px;"
    >
      <swc-action-button>Bold</swc-action-button>
      <swc-action-button>Italic</swc-action-button>
      <swc-action-button>Underline</swc-action-button>
    </swc-action-group>
  `,
  tags: ['behaviors'],
};

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

// TODO: will complete in separate documentation pass of phase 7
