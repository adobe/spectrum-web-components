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

import { Checkbox } from '@adobe/spectrum-wc/checkbox';

import '@adobe/spectrum-wc/checkbox';

// ────────────────
//    METADATA
// ────────────────

const { events, args, argTypes, template } = getStorybookHelpers('swc-checkbox');

argTypes.size = {
  ...argTypes.size,
  control: { type: 'select' },
  options: Checkbox.VALID_SIZES,
  table: {
    category: 'attributes',
    defaultValue: { summary: 'm' },
  },
};

/**
 * A checkbox allows the user to toggle a single option on or off, or to indicate an indeterminate state (e.g. "select all").
 */
const meta: Meta = {
  title: 'Checkbox',
  component: 'swc-checkbox',
  args: {
    ...args,
    size: 'm',
  },
  argTypes,
  render: (args) => html`
    ${template({ ...args })}
  `,
  parameters: {
    actions: {
      handles: events,
    },
    docs: {
      subtitle: `Toggle a single option on or off`,
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
  args: {
    size: 'm',
    'default-slot': 'Checkbox',
  },
  tags: ['autodocs', 'dev'],
};

// ──────────────────────────
//    OVERVIEW STORY
// ──────────────────────────

export const Overview: Story = {
  render: (args) => html`
    <div>
      ${template({ ...args, 'default-slot': 'Option 1' })}
      ${template({ ...args, 'default-slot': 'Option 2', checked: true })}
      ${template({ ...args, 'default-slot': 'Option 3', indeterminate: true })}
    </div>
  `,
  parameters: {
    flexLayout: 'column-stretch',
  },
  tags: ['overview'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

/**
 * Default (unchecked) checkbox.
 */
export const Default: Story = {
  render: (args) => html`
    ${template({ ...args, 'default-slot': 'Checkbox' })}
  `,
  args: {
    'default-slot': 'Checkbox',
  },
  parameters: {
    'section-order': 1,
  },
  tags: ['options'],
};

/**
 * Checked state.
 */
export const Checked: Story = {
  render: (args) => html`
    ${template({ ...args, 'default-slot': 'Checkbox', checked: true })}
  `,
  args: {
    'default-slot': 'Checkbox',
    checked: true,
  },
  parameters: {
    'section-order': 2,
  },
  tags: ['options'],
};

/**
 * Indeterminate state (e.g. "select all" when some items are selected).
 */
export const Indeterminate: Story = {
  render: (args) => html`
    ${template({ ...args, 'default-slot': 'Indeterminate', indeterminate: true })}
  `,
  args: {
    'default-slot': 'Indeterminate',
    indeterminate: true,
  },
  parameters: {
    'section-order': 3,
  },
  tags: ['options'],
};

/**
 * Emphasized checkboxes use the accent color when checked.
 */
export const Emphasized: Story = {
  render: (args) => html`
    ${template({
      ...args,
      'default-slot': 'Emphasized checkbox',
      checked: true,
      emphasized: true,
    })}
  `,
  args: {
    'default-slot': 'Emphasized checkbox',
    checked: true,
    emphasized: true,
  },
  parameters: {
    'section-order': 4,
  },
  tags: ['options'],
};

/**
 * Use the `invalid` attribute to indicate an error state (e.g. form validation).
 */
export const Invalid: Story = {
  render: (args) => html`
    ${template({ ...args, 'default-slot': 'Invalid checkbox', invalid: true })}
  `,
  args: {
    'default-slot': 'Invalid checkbox',
    invalid: true,
  },
  parameters: {
    'section-order': 5,
  },
  tags: ['options'],
};

/**
 * A disabled checkbox cannot be focused or toggled.
 */
export const Disabled: Story = {
  render: (args) => html`
    ${template({ ...args, 'default-slot': 'Disabled checkbox', disabled: true })}
  `,
  args: {
    'default-slot': 'Disabled checkbox',
    disabled: true,
  },
  parameters: {
    'section-order': 6,
  },
  tags: ['options'],
};

/**
 * Read-only checkboxes show the current state without allowing change.
 */
export const Readonly: Story = {
  render: (args) => html`
    ${template({
      ...args,
      'default-slot': 'Readonly selected',
      checked: true,
      readonly: true,
    })}
  `,
  args: {
    'default-slot': 'Readonly selected',
    checked: true,
    readonly: true,
  },
  parameters: {
    'section-order': 7,
  },
  tags: ['options'],
};

/**
 * Checkboxes come in four sizes: s, m (default), l, and xl.
 */
export const Sizes: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      ${(['s', 'm', 'l', 'xl'] as const).map(
        (size) => html`
          <div>
            ${template({
              ...args,
              size,
              'default-slot': `Size ${size}`,
              checked: size === 'm',
            })}
          </div>
        `
      )}
    </div>
  `,
  parameters: {
    'section-order': 8,
  },
  tags: ['options'],
};

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

/**
 * ### Features
 *
 * - The native input provides role="checkbox", aria-checked, and aria-invalid when invalid.
 * - Keyboard: Space toggles; tab order follows the document.
 * - Focus is delegated to the input for consistent behavior.
 *
 * ### Best practices
 *
 * - Always provide a visible label (default slot).
 * - Use `invalid` with form validation and pair with help text for screen readers.
 */
export const Accessibility: Story = {
  render: (args) => html`
    <div>
      ${template({ ...args, 'default-slot': 'Accept terms', checked: true })}
      ${template({ ...args, 'default-slot': 'Subscribe to newsletter' })}
    </div>
  `,
  parameters: {
    flexLayout: 'column-stretch',
  },
  tags: ['a11y'],
};
