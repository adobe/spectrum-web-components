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
} from '@adobe/spectrum-wc-core/components/button-group';

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
 */
const meta: Meta = {
  title: 'Button group',
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
    stackblitz: {
      url: 'https://stackblitz.com/edit/vitejs-vite-d8gbozzx?file=package.json',
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
 * - **Default slot**: one or more `<swc-button>` elements that form the action set
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
//    OPTIONS STORIES
// ──────────────────────────

/**
 * Button groups come in four sizes that propagate to all child buttons:
 *
 * - **Small (`s`)**: for compact interfaces with limited space
 * - **Medium (`m`)**: default size for most contexts
 * - **Large (`l`)**: for prominent actions needing more visual weight
 * - **Extra-large (`xl`)**: for hero sections or primary call-to-action areas
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
};

/**
 * Button groups support two orientations:
 *
 * - **Horizontal** (default): buttons that flow left-to-right (or inline-start to inline-end)
 * - **Vertical**: buttons stacked top-to-bottom; useful when horizontal space is limited
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
};

/**
 * The `align` property controls the alignment of buttons within the group along
 * the main axis:
 *
 * - **`start`** (default): buttons aligned to the inline start
 * - **`center`**: buttons centered within the available space
 * - **`end`**: buttons aligned to the inline end (useful for dialog footers)
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
 * 1. **ARIA role**: automatically sets `role="group"` on the host element
 * 2. **Group naming**: supports `aria-label` or `aria-labelledby` for screen readers;
 *    provide a name when the group's purpose is not obvious from context
 *
 * #### Keyboard navigation
 *
 * - <kbd>Tab</kbd> / <kbd>Shift+Tab</kbd>: moves focus between buttons in DOM order
 * - <kbd>Enter</kbd> / <kbd>Space</kbd>: activates the focused button
 * - Each button is a **separate tab stop**. The group does NOT use roving `tabindex`
 * - The group host is **NOT focusable**
 *
 * #### Why `aria-orientation` is not set
 *
 * The `orientation` property controls only the visual layout direction. Because
 * button-group does not use roving tabindex or arrow-key navigation,
 * `aria-orientation` is not applicable (it is only valid for roles that manage
 * directional key navigation, such as `toolbar` or `listbox`).
 *
 * If your use case has many buttons and would benefit from arrow-key navigation,
 * consider using a
 * [FocusgroupNavigationController](../?path=/docs/focusgroup-navigation-controller--overview)
 * on a parent composite with `role="toolbar"` instead.
 *
 * #### What button-group is NOT
 *
 * - **Not a radio group**: Do not use for exclusive selection.
 *   Use [Segmented Control](../?path=/docs/segmented-control--overview) instead.
 * - **Not a toggle group**: Do not use for pressed/toggle states.
 *   Use Toggle Group instead.
 * - **Not a toolbar**: Does not implement arrow-key navigation.
 *   For toolbar semantics, use `role="toolbar"` on a parent composite with
 *   `FocusgroupNavigationController`.
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
