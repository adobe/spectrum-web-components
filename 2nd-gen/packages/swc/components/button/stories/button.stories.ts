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

import '@adobe/spectrum-wc/button';

import {
  BUTTON_FILL_STYLES,
  BUTTON_STATIC_COLORS,
  BUTTON_VALID_SIZES,
  BUTTON_VARIANTS,
  type ButtonFillStyle,
  type ButtonSize,
  type ButtonStaticColor,
  type ButtonVariant,
} from '../../../../core/components/button/Button.types.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-button');

argTypes.variant = {
  ...argTypes.variant,
  control: { type: 'select' },
  options: BUTTON_VARIANTS,
};

argTypes['fill-style'] = {
  ...argTypes['fill-style'],
  control: { type: 'select' },
  options: BUTTON_FILL_STYLES,
};

argTypes.size = {
  ...argTypes.size,
  control: { type: 'select' },
  options: BUTTON_VALID_SIZES,
};

argTypes['static-color'] = {
  ...argTypes['static-color'],
  control: { type: 'select' },
  options: BUTTON_STATIC_COLORS,
};

args['default-slot'] = 'Button';
args.variant = 'primary';
args['fill-style'] = 'fill';
args.size = 'm';

/**
 * Buttons trigger actions when activated. Use a button when users need to take an
 * action like submitting a form, saving changes, or triggering a workflow step.
 *
 * For navigation, use a link instead. For icon-only actions, always provide an
 * `accessible-label` attribute to ensure the action is announced to screen reader users.
 */
export const meta: Meta = {
  title: 'Button',
  component: 'swc-button',
  parameters: {
    docs: {
      subtitle: `Buttons trigger actions when activated.`,
    },
  },
  args,
  argTypes,
  render: (args) => template(args),
  tags: ['migrated'],
};

export default {
  ...meta,
  title: 'Button',
  excludeStories: ['meta'],
} as Meta;

// ────────────────────
//    HELPERS
// ────────────────────

const sizeLabels = {
  s: 'Small',
  m: 'Medium',
  l: 'Large',
  xl: 'Extra-large',
} as const satisfies Record<ButtonSize, string>;

const variantLabels = {
  primary: 'Primary',
  secondary: 'Secondary',
  accent: 'Accent',
  negative: 'Negative',
} as const satisfies Record<ButtonVariant, string>;

const fillStyleLabels = {
  fill: 'Fill',
  outline: 'Outline',
} as const satisfies Record<ButtonFillStyle, string>;

const staticColorLabels = {
  white: 'Static white',
  black: 'Static black',
} as const satisfies Record<ButtonStaticColor, string>;

const addIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" aria-hidden="true" focusable="false"><path d="M31.5 17H19V4.5a1 1 0 0 0-2 0V17H4.5a1 1 0 0 0 0 2H17v12.5a1 1 0 0 0 2 0V19h12.5a1 1 0 0 0 0-2z"/></svg>`;

// ────────────────────
//    AUTODOCS STORY
// ────────────────────

export const Playground: Story = {
  tags: ['autodocs', 'dev'],
  args: {
    variant: 'primary',
    'fill-style': 'fill',
    size: 'm',
    'default-slot': 'Button',
  },
};

// ──────────────────────────────
//    OVERVIEW STORIES
// ──────────────────────────────

export const Overview: Story = {
  tags: ['overview'],
  args: {
    variant: 'primary',
    'fill-style': 'fill',
    size: 'm',
    'default-slot': 'Save',
  },
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

/**
 * A button consists of:
 *
 * - **Default slot**: Visible text label
 * - **icon slot**: Optional leading icon
 *
 * When only an icon is provided (no label), the button renders as a circular
 * icon-only button. Icon-only buttons must include an `accessible-label` attribute
 * so the action is announced to screen reader users.
 */
export const Anatomy: Story = {
  render: (args) => html`
    ${template({ ...args, 'default-slot': 'Label only' })}
    ${template({
      ...args,
      'default-slot': 'Icon and label',
      'icon-slot': addIconSvg,
    })}
    <swc-button
      variant=${args.variant}
      size=${args.size}
      accessible-label="Add"
    >
      <svg
        slot="icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 36 36"
        height="18"
        width="18"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M31.5 17H19V4.5a1 1 0 0 0-2 0V17H4.5a1 1 0 0 0 0 2H17v12.5a1 1 0 0 0 2 0V19h12.5a1 1 0 0 0 0-2z"
        />
      </svg>
    </swc-button>
  `,
  tags: ['anatomy'],
  parameters: { flexLayout: true },
  args: {
    variant: 'primary',
    size: 'm',
  },
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

export const Sizes: Story = {
  render: (args) => html`
    ${BUTTON_VALID_SIZES.map((size) =>
      template({ ...args, size, 'default-slot': sizeLabels[size] })
    )}
  `,
  parameters: { flexLayout: 'row-wrap', 'section-order': 1 },
  tags: ['options'],
};

export const Variants: Story = {
  render: (args) => html`
    ${BUTTON_VARIANTS.map((variant: ButtonVariant) =>
      template({ ...args, variant, 'default-slot': variantLabels[variant] })
    )}
  `,
  parameters: { flexLayout: 'row-wrap', 'section-order': 2 },
  tags: ['options'],
};

export const Outline: Story = {
  render: (args) => html`
    ${['primary', 'secondary'].map((variant) =>
      template({
        ...args,
        variant,
        'fill-style': 'outline',
        'default-slot': `${fillStyleLabels['outline']} ${variantLabels[variant as ButtonVariant]}`,
      })
    )}
  `,
  parameters: { flexLayout: 'row-wrap', 'section-order': 3 },
  tags: ['options'],
};

export const StaticColors: Story = {
  render: (args) => html`
    ${BUTTON_STATIC_COLORS.map((color) =>
      template({
        ...args,
        'static-color': color,
        'default-slot': staticColorLabels[color],
      })
    )}
  `,
  parameters: {
    flexLayout: 'row-wrap',
    staticColorsDemo: true,
    'section-order': 4,
  },
  tags: ['options', '!test'],
};
StaticColors.storyName = 'Static colors';

// ──────────────────────────
//    STATES STORIES
// ──────────────────────────

export const States: Story = {
  render: (args) => html`
    ${template({ ...args, 'default-slot': 'Default' })}
    ${template({ ...args, disabled: true, 'default-slot': 'Disabled' })}
    ${template({ ...args, pending: true, 'default-slot': 'Pending' })}
  `,
  parameters: { flexLayout: 'row-wrap' },
  tags: ['states'],
};

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

export const TextWrapping: Story = {
  render: (args) => html`
    ${template({
      ...args,
      'default-slot': 'Submit and notify all stakeholders',
      style: 'max-inline-size: 180px',
    })}
    ${template({
      ...args,
      'default-slot': 'Submit and notify all stakeholders',
      'icon-slot': addIconSvg,
      style: 'max-inline-size: 180px',
    })}
  `,
  tags: ['behaviors'],
  parameters: { flexLayout: 'row-wrap' },
};
TextWrapping.storyName = 'Text wrapping';

export const Truncate: Story = {
  render: (args) =>
    template({
      ...args,
      truncate: true,
      'default-slot': 'This is a very long button label that will be truncated',
      style: 'max-inline-size: 200px',
    }),
  tags: ['behaviors'],
};

/* TODO: in docs phase, caveat that the container also has to allow the button to stretch.
For example, using `justify-content: center` with grid display may force the button to it's max-content size or smaller. */
export const Justified: Story = {
  render: (args) => html`
    <div style="inline-size: min(40ch, 100%); margin-inline: auto;">
      ${template({
        ...args,
        justified: true,
        'default-slot': 'This button can fill the container',
      })}
    </div>
  `,
  parameters: { layout: 'padded' },
  tags: ['behaviors'],
};

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

// TODO: will complete in separate accessibility phase
