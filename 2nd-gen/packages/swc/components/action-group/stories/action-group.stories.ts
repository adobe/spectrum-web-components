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
} from '@adobe/spectrum-wc-core/components/action-group';

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
  ...argTypes.justified,
  description:
    'Whether slotted children should expand equally to fill the available ' +
    'inline width of the group. Has no visible effect unless the host has ' +
    'more available width than its content needs, e.g., an explicit ' +
    '`inline-size` set on the host, or a container that stretches it.',
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
      size=${ifDefined(renderArgs.size || undefined)}
      static-color=${ifDefined(renderArgs['static-color'] || undefined)}
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
  render: (args) => html`
    ${ACTION_GROUP_VALID_SIZES.map(
      (size) => html`
        <swc-action-group
          accessible-label=${sizeLabels[size]}
          orientation=${args.orientation ?? 'horizontal'}
          ?disabled=${args.disabled}
          ?compact=${args.compact}
          ?quiet=${args.quiet}
          ?justified=${args.justified}
          static-color=${ifDefined(args['static-color'] || undefined)}
          size=${size}
        >
          <swc-action-button>${sizeLabels[size]}</swc-action-button>
          <swc-action-button>Action</swc-action-button>
        </swc-action-group>
      `
    )}
  `,
  tags: ['options'],
};

export const Orientations: Story = {
  render: (args) => html`
    ${ACTION_GROUP_ORIENTATIONS.map(
      (orientation) => html`
        <swc-action-group
          accessible-label=${orientation}
          orientation=${orientation}
          ?disabled=${args.disabled}
          ?compact=${args.compact}
          ?quiet=${args.quiet}
          ?justified=${args.justified}
          size=${ifDefined(args.size || undefined)}
          static-color=${ifDefined(args['static-color'] || undefined)}
        >
          <swc-action-button>${orientation} 1</swc-action-button>
          <swc-action-button>${orientation} 2</swc-action-button>
        </swc-action-group>
      `
    )}
  `,
  tags: ['options'],
};

export const StaticColors: Story = {
  render: (args) => html`
    ${ACTION_GROUP_STATIC_COLORS.map(
      (staticColor) => html`
        <swc-action-group
          accessible-label=${staticColor}
          orientation=${args.orientation ?? 'horizontal'}
          ?disabled=${args.disabled}
          ?compact=${args.compact}
          ?quiet=${args.quiet}
          ?justified=${args.justified}
          size=${ifDefined(args.size || undefined)}
          static-color=${staticColor}
        >
          <swc-action-button>${staticColor}</swc-action-button>
          <swc-action-button>Action</swc-action-button>
        </swc-action-group>
      `
    )}
  `,
  tags: ['options', '!test'],
  parameters: { staticColorsDemo: true },
};
StaticColors.storyName = 'Static colors';

// ──────────────────────────
//    STATES STORIES
// ──────────────────────────

export const Disabled: Story = {
  render: (args) => html`
    <swc-action-group
      accessible-label="Text formatting"
      orientation=${args.orientation ?? 'horizontal'}
      ?compact=${args.compact}
      ?quiet=${args.quiet}
      ?justified=${args.justified}
      size=${ifDefined(args.size || undefined)}
      static-color=${ifDefined(args['static-color'] || undefined)}
      disabled
    >
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
  render: (args) => html`
    <swc-action-group
      accessible-label="Text formatting"
      ?disabled=${args.disabled}
      ?quiet=${args.quiet}
      ?justified=${args.justified}
      size=${ifDefined(args.size || undefined)}
      static-color=${ifDefined(args['static-color'] || undefined)}
      compact
    >
      <swc-action-button>Bold</swc-action-button>
      <swc-action-button>Italic</swc-action-button>
      <swc-action-button>Underline</swc-action-button>
    </swc-action-group>
    <swc-action-group
      accessible-label="Text formatting, vertical and compact"
      orientation="vertical"
      ?disabled=${args.disabled}
      ?quiet=${args.quiet}
      ?justified=${args.justified}
      size=${ifDefined(args.size || undefined)}
      static-color=${ifDefined(args['static-color'] || undefined)}
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
  render: (args) => html`
    <swc-action-group
      accessible-label="Text formatting"
      orientation=${args.orientation ?? 'horizontal'}
      ?disabled=${args.disabled}
      ?justified=${args.justified}
      size=${ifDefined(args.size || undefined)}
      static-color=${ifDefined(args['static-color'] || undefined)}
      quiet
    >
      <swc-action-button>Bold</swc-action-button>
      <swc-action-button>Italic</swc-action-button>
      <swc-action-button>Underline</swc-action-button>
    </swc-action-group>
    <swc-action-group
      accessible-label="Text formatting, compact and quiet"
      orientation=${args.orientation ?? 'horizontal'}
      ?disabled=${args.disabled}
      ?justified=${args.justified}
      size=${ifDefined(args.size || undefined)}
      static-color=${ifDefined(args['static-color'] || undefined)}
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
  render: (args) => html`
    <swc-action-group
      accessible-label="Text formatting"
      orientation=${args.orientation ?? 'horizontal'}
      ?disabled=${args.disabled}
      ?compact=${args.compact}
      ?quiet=${args.quiet}
      size=${ifDefined(args.size || undefined)}
      static-color=${ifDefined(args['static-color'] || undefined)}
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

// Outer `role="toolbar"` landmark wrapping two named `role="group"` clusters,
// per the APG toolbar example and the migration plan's accessibility
// section. `swc-action-group` never sets `role="toolbar"` itself; that role
// belongs on this wrapper only, since the host role is fixed to `"group"`
// and not author-overridable. Backs the `ToolbarComposition` ARIA-snapshot
// assertion in `action-group.a11y.spec.ts`.
export const ToolbarComposition: Story = {
  render: () => html`
    <div
      role="toolbar"
      aria-label="Document actions"
      style="display: flex; gap: var(--swc-spacing-400);"
    >
      <swc-action-group accessible-label="Edit actions">
        <swc-action-button>Cut</swc-action-button>
        <swc-action-button>Copy</swc-action-button>
        <swc-action-button>Paste</swc-action-button>
      </swc-action-group>
      <swc-action-group accessible-label="View actions">
        <swc-action-button>Zoom in</swc-action-button>
        <swc-action-button>Zoom out</swc-action-button>
      </swc-action-group>
    </div>
  `,
  tags: ['a11y'],
};
ToolbarComposition.storyName = 'Toolbar wrapper composition';

// TODO: will complete in separate documentation pass of phase 7
