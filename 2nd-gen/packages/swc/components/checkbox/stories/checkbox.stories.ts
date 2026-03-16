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
  CHECKBOX_VALID_SIZES,
  type CheckboxSize,
} from '@spectrum-web-components/core/components/checkbox';

import '@adobe/spectrum-wc/checkbox';

// ────────────────
//    METADATA
// ────────────────

const { events, args, argTypes, template } =
  getStorybookHelpers('swc-checkbox');

// Size comes from SizedMixin and is not in CEM; set default so controls work.
args.size = args.size ?? 'm';
args['default-slot'] = args['default-slot'] ?? 'Label';

argTypes.size = {
  ...argTypes.size,
  control: { type: 'select' },
  options: CHECKBOX_VALID_SIZES,
};

/**
 * Renders a single checkbox with all args bound so Controls (including size from the mixin) update the component.
 * The storybook helper template only applies CEM-listed attributes; size is from SizedMixin so we bind it explicitly.
 */
function checkboxWithArgs(args: Record<string, unknown>) {
  const size = (args.size as CheckboxSize) ?? 'm';
  const name = typeof args.name === 'string' ? args.name : undefined;
  return html`
    <swc-checkbox
      size=${size}
      .checked=${Boolean(args.checked)}
      ?disabled=${Boolean(args.disabled)}
      ?indeterminate=${Boolean(args.indeterminate)}
      ?invalid=${Boolean(args.invalid)}
      ?emphasized=${Boolean(args.emphasized)}
      ?readonly=${Boolean(args.readonly)}
      name=${ifDefined(name)}
    >
      ${String(args['default-slot'] ?? '')}
    </swc-checkbox>
  `;
}

/**
 * Checkbox allows users to select one or more options from a list, or to toggle a single option on or off.
 * Checkboxes should typically be used within a [field group](/docs/components-field-group--readme).
 */
const meta: Meta = {
  title: 'Checkbox',
  component: 'swc-checkbox',
  args,
  argTypes,
  render: (args) => checkboxWithArgs(args),
  parameters: {
    actions: {
      handles: events,
    },
    docs: {
      subtitle: `Select one or more options from a list, or toggle a single option`,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Desktop?node-id=13642-334',
    },
    flexLayout: 'row-wrap',
  },
  tags: ['migrated'],
};

export default meta;

// ────────────────────
//    AUTODOCS STORY
// ────────────────────

export const Playground: Story = {
  tags: ['autodocs', 'dev'],
  args: {
    size: 'm',
    'default-slot': 'Label',
  },
};

// ──────────────────────────
//    OVERVIEW STORY
// ──────────────────────────

export const Overview: Story = {
  render: (args) => html`
    ${template({ ...args, 'default-slot': 'Unchecked' })}
    ${template({ ...args, checked: true, 'default-slot': 'Checked' })}
    ${template({
      ...args,
      indeterminate: true,
      'default-slot': 'Indeterminate',
    })}
  `,
  tags: ['overview'],
  args: {
    size: 'm',
  },
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

/**
 * A checkbox consists of:
 *
 * 1. **Box** - The control that can be checked, unchecked, or indeterminate
 * 2. **Label** - Text describing the option (default slot)
 */
export const Anatomy: Story = {
  render: (args) => html`
    ${template({ ...args, 'default-slot': 'Option label' })}
  `,
  tags: ['anatomy'],
  args: {
    size: 'm',
  },
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

/**
 * Checkboxes come in four sizes:
 *
 * - **Small (`s`)** - Compact contexts
 * - **Medium (`m`)** - Default for most use
 * - **Large (`l`)** - Increased emphasis
 * - **Extra-large (`xl`)** - Maximum visibility
 */
export const Sizes: Story = {
  render: (args) => html`
    ${CHECKBOX_VALID_SIZES.map((size) =>
      checkboxWithArgs({
        ...args,
        size,
        'default-slot': size.toUpperCase(),
      })
    )}
  `,
  parameters: { 'section-order': 1 },
  tags: ['options'],
};

/**
 * Emphasized checkboxes use a more prominent style (e.g. blue) for forms or lists
 * where the control needs to stand out.
 */
export const Emphasized: Story = {
  render: (args) => html`
    ${template({ ...args, emphasized: true, 'default-slot': 'Unchecked' })}
    ${template({
      ...args,
      emphasized: true,
      checked: true,
      'default-slot': 'Checked',
    })}
    ${template({
      ...args,
      emphasized: true,
      indeterminate: true,
      'default-slot': 'Indeterminate',
    })}
  `,
  parameters: { 'section-order': 2 },
  tags: ['options'],
  args: { size: 'm' },
};

/**
 * Use the `invalid` attribute for validation errors. Pair with help text in a field group.
 */
export const Invalid: Story = {
  render: (args) => html`
    ${template({ ...args, invalid: true, 'default-slot': 'Unchecked' })}
    ${template({
      ...args,
      invalid: true,
      checked: true,
      'default-slot': 'Checked',
    })}
    ${template({
      ...args,
      invalid: true,
      indeterminate: true,
      'default-slot': 'Indeterminate',
    })}
  `,
  parameters: { 'section-order': 3 },
  tags: ['options'],
  args: { size: 'm' },
};

/**
 * Disabled checkboxes cannot receive focus or be changed.
 */
export const Disabled: Story = {
  render: (args) => html`
    ${template({ ...args, disabled: true, 'default-slot': 'Unchecked' })}
    ${template({
      ...args,
      disabled: true,
      checked: true,
      'default-slot': 'Checked',
    })}
    ${template({
      ...args,
      disabled: true,
      indeterminate: true,
      'default-slot': 'Indeterminate',
    })}
  `,
  parameters: { 'section-order': 4 },
  tags: ['options'],
  args: { size: 'm' },
};

/**
 * Read-only checkboxes show the value but do not allow changes; useful when the label
 * should remain in focus order for context.
 */
export const ReadOnly: Story = {
  render: (args) => html`
    ${template({ ...args, readonly: true, 'default-slot': 'Unchecked' })}
    ${template({
      ...args,
      readonly: true,
      checked: true,
      'default-slot': 'Checked',
    })}
  `,
  parameters: { 'section-order': 5 },
  tags: ['options'],
  args: { size: 'm' },
};
ReadOnly.storyName = 'Read-only';

// ────────────────────────────────
//    BEHAVIORS STORIES
// ────────────────────────────────

/**
 * Long labels wrap to multiple lines when constrained by the container.
 * Wrapping is determined by the container; use `max-inline-size` on a wrapper to constrain width.
 */
export const TextWrapping: Story = {
  render: (args) => html`
    <div style="max-inline-size: 200px;">
      ${template({
        ...args,
        'default-slot':
          "Checkbox with an extraordinarily long label. Please don't do this but if you did, it should wrap text when it gets longer than the container that houses the checkbox.",
      })}
    </div>
  `,
  tags: ['behaviors'],
  args: {
    size: 'm',
  },
};

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

/**
 * ### Features
 *
 * The `<swc-checkbox>` element implements several accessibility features:
 *
 * #### Keyboard
 *
 * - Focusable via Tab; state toggled with Space
 * - Focus ring follows design system focus indicator tokens
 *
 * #### Screen readers
 *
 * - Uses native `<input type="checkbox">` with appropriate ARIA where needed
 * - Label is associated via default slot; use a visible label or `aria-label` for icon-only contexts
 * - Checked and indeterminate states are announced
 *
 * #### High contrast
 *
 * - Forced-colors mode is supported with outline-based focus and semantic colors
 *
 * ### Best practices
 *
 * - Always provide a visible label (default slot) or `aria-label` so purpose is clear
 * - Use checkboxes for multiple selection; use radio or switch for single selection or on/off
 * - Use `invalid` with help text in a field group to describe the error
 * - Use `readonly` when the value is fixed but focus order should include the control
 */
export const Accessibility: Story = {
  render: (args) => html`
    ${template({ ...args, 'default-slot': 'Unchecked' })}
    ${template({ ...args, checked: true, 'default-slot': 'Checked' })}
    ${template({
      ...args,
      indeterminate: true,
      'default-slot': 'Indeterminate',
    })}
    ${template({ ...args, disabled: true, 'default-slot': 'Disabled' })}
  `,
  tags: ['a11y'],
  args: {
    size: 'm',
  },
};

// ────────────────────────────────
//    VRT / HIDDEN
// ────────────────────────────────

/** VRT only: forced colors / high contrast mode. */
export const WithForcedColors: Story = {
  ...Overview,
  parameters: {
    chromatic: {
      forcedColors: 'active',
      modes: { disableDefaultModes: true },
    },
  },
  tags: ['!autodocs', '!dev'],
};
WithForcedColors.storyName = 'With forced colors';
