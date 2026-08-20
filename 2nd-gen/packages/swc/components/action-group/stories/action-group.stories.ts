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

import type { TemplateResult } from 'lit';
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
 * An action group clusters related actions together with consistent
 * spacing, sizing, and orientation.
 *
 * Unlike [button group](../?path=/docs/components-button-group--docs), where
 * each button is reachable independently via the keyboard, action group
 * treats the whole strip as a single stop, with arrow keys moving between
 * its children. See [Keyboard navigation](#keyboard-navigation) for the
 * full key list.
 */
const meta: Meta = {
  title: 'Action group',
  component: 'swc-action-group',
  args,
  argTypes,
  render: (renderArgs) => html`
    <swc-action-group
      accessible-label="Image adjustments"
      orientation=${renderArgs.orientation ?? 'horizontal'}
      ?disabled=${renderArgs.disabled}
      ?compact=${renderArgs.compact}
      ?quiet=${renderArgs.quiet}
      ?justified=${renderArgs.justified}
      size=${ifDefined(renderArgs.size || undefined)}
      static-color=${ifDefined(renderArgs['static-color'] || undefined)}
    >
      <swc-action-button>Crop</swc-action-button>
      <swc-action-button>Rotate</swc-action-button>
      <swc-action-button>Flip</swc-action-button>
    </swc-action-group>
  `,
  parameters: {
    docs: {
      subtitle: 'Clusters related actions with composite keyboard navigation',
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

// Pairs a rendered cluster with a small caption identifying what it shows.
function captioned(caption: string, content: TemplateResult): TemplateResult {
  return html`
    <div
      style="display: flex; flex-direction: column; gap: var(--swc-spacing-100);"
    >
      <div class="swc-Detail swc-Detail--sizeS">${caption}</div>
      ${content}
    </div>
  `;
}

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story = {
  tags: ['dev'],
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
    <swc-action-group accessible-label="Image adjustments">
      <swc-action-button>Crop</swc-action-button>
      <swc-action-button>Rotate</swc-action-button>
      <swc-action-button>Flip</swc-action-button>
      <swc-action-button accessible-label="Edit">
        <svg
          slot="icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 36 36"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M33.567 8.2 27.8 2.432a1.215 1.215 0 0 0-.866-.353H26.9a1.371 1.371 0 0 0-.927.406L5.084 23.372a.99.99 0 0 0-.251.422L2.055 33.1c-.114.377.459.851.783.851a.251.251 0 0 0 .062-.007c.276-.063 7.866-2.344 9.311-2.778a.972.972 0 0 0 .414-.249l20.888-20.889a1.372 1.372 0 0 0 .4-.883 1.221 1.221 0 0 0-.346-.945ZM11.4 29.316c-2.161.649-4.862 1.465-6.729 2.022l2.009-6.73Z"
          />
        </svg>
      </swc-action-button>
    </swc-action-group>
  `,
  tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

export const Sizes: Story = {
  render: (args) => html`
    <div style="display: flex; flex-wrap: wrap; gap: var(--swc-spacing-600);">
      ${ACTION_GROUP_VALID_SIZES.map(
        (size) => html`
          ${captioned(
            size,
            html`
              <swc-action-group
                accessible-label=${'Image adjustments, ' +
                sizeLabels[size].toLowerCase()}
                orientation=${args.orientation ?? 'horizontal'}
                ?disabled=${args.disabled}
                ?compact=${args.compact}
                ?quiet=${args.quiet}
                ?justified=${args.justified}
                static-color=${ifDefined(args['static-color'] || undefined)}
                size=${size}
              >
                <swc-action-button>Crop</swc-action-button>
                <swc-action-button>Rotate</swc-action-button>
              </swc-action-group>
            `
          )}
        `
      )}
    </div>
  `,
  tags: ['options'],
};

export const Orientations: Story = {
  render: (args) => html`
    <div style="display: flex; flex-wrap: wrap; gap: var(--swc-spacing-600);">
      ${ACTION_GROUP_ORIENTATIONS.map(
        (orientation) => html`
          ${captioned(
            orientation,
            html`
              <swc-action-group
                accessible-label=${'Image adjustments, ' + orientation}
                orientation=${orientation}
                ?disabled=${args.disabled}
                ?compact=${args.compact}
                ?quiet=${args.quiet}
                ?justified=${args.justified}
                size=${ifDefined(args.size || undefined)}
                static-color=${ifDefined(args['static-color'] || undefined)}
              >
                <swc-action-button>Crop</swc-action-button>
                <swc-action-button>Rotate</swc-action-button>
              </swc-action-group>
            `
          )}
        `
      )}
    </div>
  `,
  tags: ['options'],
};

export const Quiet: Story = {
  render: (args) => html`
    <swc-action-group
      accessible-label="Image adjustments"
      orientation=${args.orientation ?? 'horizontal'}
      ?disabled=${args.disabled}
      ?justified=${args.justified}
      size=${ifDefined(args.size || undefined)}
      static-color=${ifDefined(args['static-color'] || undefined)}
      quiet
    >
      <swc-action-button>Crop</swc-action-button>
      <swc-action-button>Rotate</swc-action-button>
      <swc-action-button>Flip</swc-action-button>
    </swc-action-group>
  `,
  tags: ['options'],
};

export const Compact: Story = {
  render: (args) => html`
    <div style="display: flex; flex-wrap: wrap; gap: var(--swc-spacing-600);">
      ${captioned(
        'Compact',
        html`
          <swc-action-group
            accessible-label="Image adjustments"
            ?disabled=${args.disabled}
            ?quiet=${args.quiet}
            ?justified=${args.justified}
            size=${ifDefined(args.size || undefined)}
            static-color=${ifDefined(args['static-color'] || undefined)}
            compact
          >
            <swc-action-button>Crop</swc-action-button>
            <swc-action-button>Rotate</swc-action-button>
            <swc-action-button>Flip</swc-action-button>
          </swc-action-group>
        `
      )}
      ${captioned(
        'Compact, vertical',
        html`
          <swc-action-group
            accessible-label="Image adjustments"
            orientation="vertical"
            ?disabled=${args.disabled}
            ?quiet=${args.quiet}
            ?justified=${args.justified}
            size=${ifDefined(args.size || undefined)}
            static-color=${ifDefined(args['static-color'] || undefined)}
            compact
          >
            <swc-action-button>Crop</swc-action-button>
            <swc-action-button>Rotate</swc-action-button>
            <swc-action-button>Flip</swc-action-button>
          </swc-action-group>
        `
      )}
    </div>
  `,
  tags: ['options'],
};

export const Justified: Story = {
  render: (args) => html`
    <swc-action-group
      accessible-label="Image adjustments"
      orientation=${args.orientation ?? 'horizontal'}
      ?disabled=${args.disabled}
      ?compact=${args.compact}
      ?quiet=${args.quiet}
      size=${ifDefined(args.size || undefined)}
      static-color=${ifDefined(args['static-color'] || undefined)}
      justified
      style="inline-size: 300px;"
    >
      <swc-action-button>Crop</swc-action-button>
      <swc-action-button>Rotate</swc-action-button>
      <swc-action-button>Generate</swc-action-button>
    </swc-action-group>
  `,
  tags: ['options'],
};

export const StaticColors: Story = {
  render: (args) => html`
    ${ACTION_GROUP_STATIC_COLORS.map(
      (staticColor) => html`
        ${captioned(
          staticColor,
          html`
            <swc-action-group
              accessible-label=${'Image adjustments, static-color ' +
              staticColor}
              orientation=${args.orientation ?? 'horizontal'}
              ?disabled=${args.disabled}
              ?compact=${args.compact}
              ?quiet=${args.quiet}
              ?justified=${args.justified}
              size=${ifDefined(args.size || undefined)}
              static-color=${staticColor}
            >
              <swc-action-button>Crop</swc-action-button>
              <swc-action-button>Rotate</swc-action-button>
            </swc-action-group>
          `
        )}
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
      accessible-label="Image adjustments"
      orientation=${args.orientation ?? 'horizontal'}
      ?compact=${args.compact}
      ?quiet=${args.quiet}
      ?justified=${args.justified}
      size=${ifDefined(args.size || undefined)}
      static-color=${ifDefined(args['static-color'] || undefined)}
      disabled
    >
      <swc-action-button>Crop</swc-action-button>
      <swc-action-button>Rotate</swc-action-button>
      <swc-action-button>Flip</swc-action-button>
    </swc-action-group>
  `,
  tags: ['states'],
};

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = {
  render: (args) => html`
    <div style="display: flex; flex-wrap: wrap; gap: var(--swc-spacing-600);">
      ${captioned(
        'Standalone group, no toolbar wrapper',
        html`
          <swc-action-group
            accessible-label="Image adjustments"
            orientation=${args.orientation ?? 'horizontal'}
            ?compact=${args.compact}
            ?quiet=${args.quiet}
            ?justified=${args.justified}
            size=${ifDefined(args.size || undefined)}
            static-color=${ifDefined(args['static-color'] || undefined)}
          >
            <swc-action-button>Crop</swc-action-button>
            <swc-action-button>Rotate</swc-action-button>
            <swc-action-button>Flip</swc-action-button>
          </swc-action-group>
        `
      )}
      ${captioned(
        'Toolbar wrapper, horizontal',
        html`
          <div
            role="toolbar"
            aria-label="Document actions"
            style="display: flex; gap: var(--swc-spacing-400);"
          >
            <swc-action-group
              accessible-label="Edit actions"
              ?compact=${args.compact}
              ?quiet=${args.quiet}
              size=${ifDefined(args.size || undefined)}
              static-color=${ifDefined(args['static-color'] || undefined)}
            >
              <swc-action-button>Cut</swc-action-button>
              <swc-action-button>Copy</swc-action-button>
              <swc-action-button>Paste</swc-action-button>
            </swc-action-group>
            <swc-action-group
              accessible-label="View actions"
              ?compact=${args.compact}
              ?quiet=${args.quiet}
              size=${ifDefined(args.size || undefined)}
              static-color=${ifDefined(args['static-color'] || undefined)}
            >
              <swc-action-button>Zoom in</swc-action-button>
              <swc-action-button>Zoom out</swc-action-button>
            </swc-action-group>
          </div>
        `
      )}
      ${captioned(
        'Toolbar wrapper, vertical',
        html`
          <div
            role="toolbar"
            aria-label="Document actions, vertical"
            aria-orientation="vertical"
            style="display: flex; flex-direction: column; gap: var(--swc-spacing-400); inline-size: fit-content;"
          >
            <swc-action-group
              accessible-label="Edit actions"
              orientation="vertical"
              ?compact=${args.compact}
              ?quiet=${args.quiet}
              size=${ifDefined(args.size || undefined)}
              static-color=${ifDefined(args['static-color'] || undefined)}
            >
              <swc-action-button>Cut</swc-action-button>
              <swc-action-button>Copy</swc-action-button>
              <swc-action-button>Paste</swc-action-button>
            </swc-action-group>
            <swc-action-group
              accessible-label="View actions"
              orientation="vertical"
              ?compact=${args.compact}
              ?quiet=${args.quiet}
              size=${ifDefined(args.size || undefined)}
              static-color=${ifDefined(args['static-color'] || undefined)}
            >
              <swc-action-button>Zoom in</swc-action-button>
              <swc-action-button>Zoom out</swc-action-button>
            </swc-action-group>
          </div>
        `
      )}
    </div>
  `,
  tags: ['a11y'],
  parameters: { flexLayout: 'row-wrap' },
};

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
  tags: ['!dev'],
};
ToolbarComposition.storyName = 'Toolbar wrapper composition';
