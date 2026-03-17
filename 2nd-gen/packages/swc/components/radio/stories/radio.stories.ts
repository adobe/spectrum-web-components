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

import { Radio } from '@adobe/spectrum-wc/radio';

import '@adobe/spectrum-wc/radio';

// ────────────────
//    METADATA
// ────────────────

const { events, args, argTypes, template } = getStorybookHelpers('swc-radio');

argTypes.size = {
  ...argTypes.size,
  control: { type: 'select' },
  options: Radio.VALID_SIZES,
  table: {
    category: 'attributes',
    defaultValue: { summary: 'm' },
  },
};

/**
 * A radio button represents a single option in a group of mutually exclusive choices.
 * Use with a radio group (or native name grouping) so only one option can be selected at a time.
 */
const meta: Meta = {
  title: 'Radio',
  component: 'swc-radio',
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
      subtitle: `Single option in a mutually exclusive group`,
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
    value: 'option-1',
    size: 'm',
    'default-slot': 'Radio option',
  },
  tags: ['autodocs', 'dev'],
};

// ──────────────────────────
//    OVERVIEW STORY
// ──────────────────────────

export const Overview: Story = {
  render: (args) => html`
    <div>
      ${template({ ...args, value: '1', 'default-slot': 'Option 1' })}
      ${template({ ...args, value: '2', 'default-slot': 'Option 2', checked: true })}
      ${template({ ...args, value: '3', 'default-slot': 'Option 3' })}
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
 * Default (unemphasized) radio. When checked, the circle shows a neutral selection indicator.
 */
export const Default: Story = {
  render: (args) => html`
    ${template({ ...args, value: 'opt', 'default-slot': 'Radio', checked: true })}
  `,
  args: {
    value: 'opt',
    'default-slot': 'Radio',
    checked: true,
  },
  parameters: {
    'section-order': 1,
  },
  tags: ['options'],
};

/**
 * Emphasized radios use the accent color when checked for higher emphasis.
 */
export const Emphasized: Story = {
  render: (args) => html`
    ${template({
      ...args,
      value: 'opt',
      'default-slot': 'Emphasized radio',
      checked: true,
      emphasized: true,
    })}
  `,
  args: {
    value: 'opt',
    'default-slot': 'Emphasized radio',
    checked: true,
    emphasized: true,
  },
  parameters: {
    'section-order': 2,
  },
  tags: ['options'],
};

/**
 * Use the `invalid` attribute to indicate an error state (e.g. when used with form validation).
 */
export const Invalid: Story = {
  render: (args) => html`
    ${template({ ...args, value: 'opt', 'default-slot': 'Invalid radio', invalid: true })}
  `,
  args: {
    value: 'opt',
    'default-slot': 'Invalid radio',
    invalid: true,
  },
  parameters: {
    'section-order': 3,
  },
  tags: ['options'],
};

/**
 * A disabled radio cannot be focused or selected.
 */
export const Disabled: Story = {
  render: (args) => html`
    ${template({ ...args, value: 'opt', 'default-slot': 'Disabled radio', disabled: true })}
  `,
  args: {
    value: 'opt',
    'default-slot': 'Disabled radio',
    disabled: true,
  },
  parameters: {
    'section-order': 4,
  },
  tags: ['options'],
};

/**
 * Read-only radios hide the control and show only the label (e.g. for displaying a selection without allowing change).
 */
export const Readonly: Story = {
  render: (args) => html`
    ${template({
      ...args,
      value: 'opt',
      'default-slot': 'Readonly selected',
      checked: true,
      readonly: true,
    })}
  `,
  args: {
    value: 'opt',
    'default-slot': 'Readonly selected',
    checked: true,
    readonly: true,
  },
  parameters: {
    'section-order': 5,
  },
  tags: ['options'],
};

/**
 * Radio buttons come in four sizes: s, m (default), l, and xl.
 */
export const Sizes: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      ${(['s', 'm', 'l', 'xl'] as const).map(
        (size) => html`
          <div>
            ${template({
              ...args,
              value: size,
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
    'section-order': 6,
  },
  tags: ['options'],
};

/**
 * Group example: use multiple swc-radio elements with the same name (or inside a future swc-radio-group) for mutually exclusive selection.
 */
export const GroupExample: Story = {
  render: (args) => html`
    <div role="radiogroup" aria-label="Choose one">
      ${template({ ...args, value: '1', 'default-slot': 'Option 1' })}
      ${template({ ...args, value: '2', 'default-slot': 'Option 2', checked: true })}
      ${template({ ...args, value: '3', 'default-slot': 'Option 3' })}
      ${template({ ...args, value: '4', 'default-slot': 'Option 4' })}
    </div>
  `,
  parameters: {
    flexLayout: 'column-stretch',
  },
  tags: ['options'],
};
GroupExample.storyName = 'Group example';

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

/**
 * ### Features
 *
 * - The radio has `role="radio"` and `aria-checked` synced to the checked state.
 * - `aria-invalid` is set when the component is invalid; `aria-disabled` when disabled.
 * - Keyboard: Space activates the radio; tab order follows the document (or roving tabindex when inside a group).
 *
 * ### Best practices
 *
 * - Always use radios inside a group (radiogroup or shared name) so only one can be selected.
 * - Provide a visible label (default slot) for each option.
 * - Use `invalid` with form validation and pair with help text for screen readers.
 */
export const Accessibility: Story = {
  render: (args) => html`
    <div role="radiogroup" aria-label="Accessibility example">
      ${template({ ...args, value: 'a', 'default-slot': 'Option A' })}
      ${template({ ...args, value: 'b', 'default-slot': 'Option B', checked: true })}
    </div>
  `,
  parameters: {
    flexLayout: 'column-stretch',
  },
  tags: ['a11y'],
};
