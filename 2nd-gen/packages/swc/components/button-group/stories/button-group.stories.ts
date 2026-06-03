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
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import {
  BUTTON_GROUP_ALIGNMENTS,
  BUTTON_GROUP_ORIENTATIONS,
  BUTTON_GROUP_SIZES,
} from '@spectrum-web-components/core/components/button-group';

import '@adobe/spectrum-wc/components/button-group/swc-button-group.js';
import '@adobe/spectrum-wc/components/button/swc-button.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes } = getStorybookHelpers('swc-button-group');

argTypes.size = {
  ...argTypes.size,
  control: { type: 'select' },
  options: [...BUTTON_GROUP_SIZES],
  table: {
    category: 'attributes',
    defaultValue: { summary: 'm' },
  },
};

argTypes.orientation = {
  ...argTypes.orientation,
  control: { type: 'select' },
  options: [...BUTTON_GROUP_ORIENTATIONS],
  table: {
    category: 'attributes',
    defaultValue: { summary: 'horizontal' },
  },
};

argTypes.align = {
  ...argTypes.align,
  control: { type: 'select' },
  options: [...BUTTON_GROUP_ALIGNMENTS],
  table: {
    category: 'attributes',
    defaultValue: { summary: 'start' },
  },
};

argTypes.disabled = {
  ...argTypes.disabled,
  table: {
    category: 'attributes',
    defaultValue: { summary: 'false' },
  },
};

/**
 * A button group clusters related actions together, providing consistent spacing,
 * sizing, and orientation. It propagates `size` and `disabled` state to its slotted
 * [Button](../?path=/docs/button--overview) children and exposes `role="group"` for
 * accessibility.
 *
 * Use button group when you have two or more related button actions that belong
 * together visually and semantically (for example dialog or form footers, toolbars,
 * or contextual action sets).
 *
 * ### Usage note — breaking changes from 1st-gen
 *
 * This component replaces `<sp-button-group>` from 1st-gen. Key differences:
 *
 * - **Tag name**: `sp-button-group` → `swc-button-group`
 * - **Orientation API**: The `vertical` boolean attribute is replaced by
 *   `orientation="horizontal|vertical"` (default: `horizontal`)
 * - **ARIA role**: 2nd-gen adds `role="group"` automatically (was missing in 1st-gen)
 * - **New `align` property**: Controls main-axis alignment (`start`, `center`, `end`)
 * - **New `disabled` property**: Group-level disable that propagates to all children
 * - **CSS custom properties**: `--mod-buttongroup-*` → `--swc-button-group-*`
 *
 * See the [migration guide](../?path=/docs/button-group-migration-guide--docs)
 * for full details.
 */
const meta: Meta = {
  title: 'Button Group',
  component: 'swc-button-group',
  args,
  argTypes,
  render: (renderArgs) => html`
    <swc-button-group
      orientation=${renderArgs.orientation ?? 'horizontal'}
      size=${renderArgs.size ?? 'm'}
      align=${renderArgs.align ?? 'start'}
      ?disabled=${renderArgs.disabled}
    >
      <swc-button>Save</swc-button>
      <swc-button>Cancel</swc-button>
      <swc-button>Reset</swc-button>
    </swc-button-group>
  `,
  parameters: {
    docs: {
      subtitle:
        'Clusters related button actions with consistent spacing and sizing',
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=13663-6530',
    },
    stackblitz: {
      url: 'https://stackblitz.com/edit/swc-button-group?file=src%2Fmy-element.ts',
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
  s: 'Small',
  m: 'Medium',
  l: 'Large',
  xl: 'Extra-large',
} as const satisfies Record<(typeof BUTTON_GROUP_SIZES)[number], string>;

// ────────────────────
//    AUTODOCS STORY
// ────────────────────

export const Playground: Story = {
  tags: ['autodocs', 'dev'],
  args: {
    size: 'm',
    orientation: 'horizontal',
    disabled: false,
    align: 'start',
  },
};

// ──────────────────────────
//    OVERVIEW STORY
// ──────────────────────────

export const Overview: Story = {
  args: {
    size: 'm',
    orientation: 'horizontal',
    disabled: false,
    align: 'start',
  },
  tags: ['overview'],
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

/**
 * A button group consists of:
 *
 * - **Default slot**: One or more `<swc-button>` elements that form the action set
 *
 * The group propagates its `size` and `disabled` state to all slotted button children
 * automatically, ensuring visual and behavioral consistency without requiring per-button
 * configuration.
 */
export const Anatomy: Story = {
  render: () => html`
    <swc-button-group>
      <swc-button>Primary action</swc-button>
      <swc-button>Secondary action</swc-button>
      <swc-button>Tertiary action</swc-button>
    </swc-button-group>
  `,
  tags: ['anatomy'],
};

// ──────────────────────────
//    UPCOMING FEATURES
// ──────────────────────────

/**
 * The following features are planned for future releases but are not yet available
 * in this MVP. They are documented in the migration analysis as additive changes.
 *
 * | Feature | Description |
 * |---------|-------------|
 * | Overflow behavior | Buttons that exceed available space collapse into a menu or wrap to a second row |
 * | Toolbar composition | Documentation and patterns for using button-group within `role="toolbar"` with `FocusgroupNavigationController` for arrow-key navigation |
 * | Form-associated actions | Group-level `submit` / `reset` coordination with form elements |
 */
export const UpcomingFeatures: Story = {
  render: () => html`
    <swc-button-group aria-label="Planned features preview">
      <swc-button>Overflow (planned)</swc-button>
      <swc-button>Toolbar (planned)</swc-button>
    </swc-button-group>
  `,
  tags: ['upcoming'],
};
UpcomingFeatures.storyName = 'Upcoming features';

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

/**
 * Button groups come in four sizes that propagate to all child buttons:
 *
 * - **Small (`s`)**: For compact interfaces with limited space
 * - **Medium (`m`)**: Default size for most contexts
 * - **Large (`l`)**: For prominent actions needing more visual weight
 * - **Extra-large (`xl`)**: For hero sections or primary call-to-action areas
 */
export const Sizes: Story = {
  render: () => html`
    ${BUTTON_GROUP_SIZES.map(
      (size) => html`
        <swc-button-group size=${size}>
          <swc-button>${sizeLabels[size]} Save</swc-button>
          <swc-button>${sizeLabels[size]} Cancel</swc-button>
        </swc-button-group>
      `
    )}
  `,
  tags: ['options'],
  parameters: { 'section-order': 1 },
};

/**
 * Button groups support two orientations:
 *
 * - **Horizontal** (default): Buttons flow left-to-right (or inline-start to inline-end)
 * - **Vertical**: Buttons stack top-to-bottom, useful when horizontal space is limited
 *
 * The `orientation` attribute reflects on the host for CSS styling hooks.
 */
export const Orientations: Story = {
  render: () => html`
    ${BUTTON_GROUP_ORIENTATIONS.map(
      (orientation) => html`
        <swc-button-group orientation=${orientation}>
          <swc-button>${orientation} 1</swc-button>
          <swc-button>${orientation} 2</swc-button>
        </swc-button-group>
      `
    )}
  `,
  tags: ['options'],
  parameters: { 'section-order': 2 },
};

/**
 * The `align` property controls the alignment of buttons within the group along
 * the main axis:
 *
 * - **start** (default): Buttons align to the inline start
 * - **center**: Buttons center within the available space
 * - **end**: Buttons align to the inline end (useful for dialog footers)
 */
export const Alignment: Story = {
  render: () => html`
    ${BUTTON_GROUP_ALIGNMENTS.map(
      (align) => html`
        <swc-button-group align=${align} style="inline-size: 400px;">
          <swc-button>${align}</swc-button>
          <swc-button>Action</swc-button>
        </swc-button-group>
      `
    )}
  `,
  tags: ['options'],
  parameters: { 'section-order': 3 },
};

// ──────────────────────────
//    STATES STORIES
// ──────────────────────────

/**
 * Setting `disabled` on the group propagates the disabled state to all child
 * buttons, preventing interaction. This is a convenience API — individual buttons
 * can also be disabled independently when the group is not disabled.
 */
export const Disabled: Story = {
  render: () => html`
    <swc-button-group disabled>
      <swc-button>Save</swc-button>
      <swc-button>Cancel</swc-button>
      <swc-button>Reset</swc-button>
    </swc-button-group>
  `,
  tags: ['states'],
};

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

/**
 * When `size` is changed on the group, all slotted buttons update to the new size
 * automatically. Similarly, dynamically added buttons receive the current group size
 * and disabled state via the `slotchange` handler.
 */
export const SizePropagation: Story = {
  render: () => html`
    ${(['s', 'm', 'l', 'xl'] as const).map(
      (size) => html`
        <swc-button-group size=${size}>
          <swc-button>Propagated ${size.toUpperCase()}</swc-button>
          <swc-button>Propagated ${size.toUpperCase()}</swc-button>
        </swc-button-group>
      `
    )}
  `,
  tags: ['behaviors'],
};
SizePropagation.storyName = 'Size propagation';

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

/**
 * ### Features
 *
 * The `<swc-button-group>` element implements several accessibility features:
 *
 * #### ARIA implementation
 *
 * 1. **ARIA role**: Automatically sets `role="group"` on the host element
 * 2. **Orientation**: Reflects the `orientation` attribute on the host for CSS styling
 * 3. **Group naming**: Supports `aria-label` or `aria-labelledby` for screen readers.
 *    Provide a name when the group's purpose is not obvious from context.
 *
 * #### Keyboard navigation
 *
 * - <kbd>Tab</kbd> / <kbd>Shift+Tab</kbd>: Moves focus between buttons in DOM order
 * - <kbd>Enter</kbd> / <kbd>Space</kbd>: Activates the focused button
 * - Each button is a **separate Tab stop** — the group does NOT use roving tabindex
 * - The group host is **NOT focusable**
 *
 * #### What button-group is NOT
 *
 * - **Not a radio group**: Do not use for exclusive selection —
 *   use [Segmented Control](../?path=/docs/segmented-control--overview) instead
 * - **Not a toggle group**: Do not use for pressed/toggle states —
 *   use Toggle Group instead
 * - **Not a toolbar**: Does not implement arrow-key navigation.
 *   For toolbar semantics, use `role="toolbar"` on a parent composite with
 *   `FocusgroupNavigationController`
 *
 * ### Best practices
 *
 * - Provide an `aria-label` when the group's purpose is not clear from surrounding
 *   content (for example, when used inside a dialog footer)
 * - Keep slotted children as `<swc-button>` elements for proper semantic delegation
 * - Do not apply `role="radiogroup"` or `role="toolbar"` to this component
 */
export const Accessibility: Story = {
  render: () => html`
    <swc-button-group aria-label="Document actions">
      <swc-button>Save</swc-button>
      <swc-button>Discard</swc-button>
      <swc-button>Export</swc-button>
    </swc-button-group>
  `,
  tags: ['a11y'],
};

// ────────────────────────────────
//    LOCAL-ONLY STORIES
// ────────────────────────────────

/**
 * Combination of all orientations at all sizes — useful for visual regression testing
 * during local development. Not included in production documentation.
 */
export const AllCombinations: Story = {
  render: () => html`
    ${BUTTON_GROUP_ORIENTATIONS.map(
      (orientation) => html`
        ${BUTTON_GROUP_SIZES.map(
          (size) => html`
            <swc-button-group orientation=${orientation} size=${size}>
              <swc-button>${orientation} ${size.toUpperCase()}</swc-button>
              <swc-button>Action</swc-button>
            </swc-button-group>
          `
        )}
      `
    )}
  `,
  tags: ['!dev'],
};
AllCombinations.storyName = 'All combinations';

/**
 * Tests vertical orientation with alignment variations. Used for local visual
 * verification that vertical layout respects alignment in all directions.
 */
export const VerticalAlignment: Story = {
  render: () => html`
    ${BUTTON_GROUP_ALIGNMENTS.map(
      (align) => html`
        <swc-button-group
          orientation="vertical"
          align=${align}
          style="inline-size: 300px;"
        >
          <swc-button>Vertical ${align}</swc-button>
          <swc-button>Action</swc-button>
        </swc-button-group>
      `
    )}
  `,
  tags: ['!dev'],
};
VerticalAlignment.storyName = 'Vertical alignment';
