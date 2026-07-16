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
  ACTION_BUTTON_STATIC_COLORS,
  ACTION_BUTTON_VALID_SIZES,
  type ActionButtonSize,
} from '@adobe/spectrum-wc-core/components/action-button';

import '@adobe/spectrum-wc/components/action-button/swc-action-button.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-action-button');

argTypes.size = {
  ...argTypes.size,
  control: { type: 'select' },
  options: ACTION_BUTTON_VALID_SIZES,
};

argTypes['static-color'] = {
  ...argTypes['static-color'],
  control: { type: 'select' },
  options: ACTION_BUTTON_STATIC_COLORS,
};

// These are programmatic attributes set by parent components (action-group,
// action-menu) — not user-facing controls.
argTypes['aria-disabled'] = { table: { disable: true } };
argTypes['aria-haspopup'] = { table: { disable: true } };
argTypes['aria-expanded'] = { table: { disable: true } };

/**
 * A compact action button for toolbars, action groups, and icon-first chrome.
 * Supports sizes `xs`–`xl`; `xs` is an action-button-specific addition not
 * available on `swc-button`. For navigation, [use a link with global action
 * button styles](/docs/guides-customization-global-element-styling--docs) instead.
 */
const meta: Meta = {
  title: 'Action Button',
  component: 'swc-action-button',
  args,
  argTypes,
  render: (args) => template(args),
  parameters: {
    docs: {
      subtitle: 'Compact button for toolbars and action groups',
    },
    stackblitz: {
      url: 'https://stackblitz.com/edit/vitejs-vite-8m9urm6b?file=src%2Fmy-element.ts',
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
} as const satisfies Record<ActionButtonSize, string>;

const editIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" aria-hidden="true" focusable="false"><path d="M33.567 8.2 27.8 2.432a1.215 1.215 0 0 0-.866-.353H26.9a1.371 1.371 0 0 0-.927.406L5.084 23.372a.99.99 0 0 0-.251.422L2.055 33.1c-.114.377.459.851.783.851a.251.251 0 0 0 .062-.007c.276-.063 7.866-2.344 9.311-2.778a.972.972 0 0 0 .414-.249l20.888-20.889a1.372 1.372 0 0 0 .4-.883 1.221 1.221 0 0 0-.346-.945ZM11.4 29.316c-2.161.649-4.862 1.465-6.729 2.022l2.009-6.73Z"/></svg>`;

// ──────────────────────────
//    PLAYGROUND STORY
// ──────────────────────────

export const Playground: Story = {
  args: {
    'default-slot': 'Edit',
  },
  tags: ['dev'],
};

// ──────────────────────────
//    OVERVIEW STORY
// ──────────────────────────

export const Overview: Story = {
  args: {
    'default-slot': 'Edit',
  },
  tags: ['overview'],
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

export const Anatomy: Story = {
  render: (args) => html`
    ${template({ ...args, 'default-slot': 'Label only' })}
    ${template({
      ...args,
      'default-slot': 'Icon and label',
      'icon-slot': editIconSvg,
    })}
    <swc-action-button size=${args.size} accessible-label="Edit">
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
  `,
  tags: ['anatomy'],
  parameters: { flexLayout: 'row-wrap' },
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

export const Sizes: Story = {
  render: (args) => html`
    ${ACTION_BUTTON_VALID_SIZES.map((size) =>
      template({
        ...args,
        size,
        'default-slot': sizeLabels[size],
        'icon-slot': editIconSvg,
      })
    )}
  `,
  tags: ['options'],
  parameters: { flexLayout: 'row-wrap' },
};

export const Quiet: Story = {
  render: (args) => html`
    ${template({
      ...args,
      quiet: false,
      'default-slot': 'Default',
      'icon-slot': editIconSvg,
    })}
    ${template({
      ...args,
      quiet: true,
      'default-slot': 'Quiet',
      'icon-slot': editIconSvg,
    })}
  `,
  tags: ['options'],
  parameters: { flexLayout: 'row-wrap' },
};

export const StaticColors: Story = {
  render: (args) => html`
    <div style="display: flex; gap: 16px; flex-wrap: wrap;">
      ${template({
        ...args,
        'static-color': 'white',
        'default-slot': 'Default',
        'icon-slot': editIconSvg,
      })}
      ${template({
        ...args,
        'static-color': 'white',
        quiet: true,
        'default-slot': 'Quiet',
        'icon-slot': editIconSvg,
      })}
    </div>
    <div style="display: flex; gap: 16px; flex-wrap: wrap;">
      ${template({
        ...args,
        'static-color': 'black',
        'default-slot': 'Default',
        'icon-slot': editIconSvg,
      })}
      ${template({
        ...args,
        'static-color': 'black',
        quiet: true,
        'default-slot': 'Quiet',
        'icon-slot': editIconSvg,
      })}
    </div>
  `,
  tags: ['options', '!test'],
  parameters: {
    staticColorsDemo: true,
  },
};
StaticColors.storyName = 'Static colors';

// ──────────────────────────
//    STATES STORIES
// ──────────────────────────

export const States: Story = {
  render: (args) => html`
    ${template({
      ...args,
      'default-slot': 'Default',
      'icon-slot': editIconSvg,
    })}
    ${template({
      ...args,
      disabled: true,
      'default-slot': 'Disabled',
      'icon-slot': editIconSvg,
    })}
    ${template({
      ...args,
      pending: true,
      'default-slot': 'Pending',
      'icon-slot': editIconSvg,
    })}
  `,
  tags: ['states'],
  parameters: { flexLayout: 'row-wrap' },
};

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

export const IconOnly: Story = {
  render: (args) => html`
    <swc-action-button size=${args.size} accessible-label="Edit">
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
  `,
  tags: ['behaviors'],
};
IconOnly.storyName = 'Icon only';

export const Pending: Story = {
  render: (args) => {
    let pending = false;

    function handleTogglePending(event: Event) {
      pending = (event.target as HTMLInputElement).checked;
      const host = (event.target as HTMLElement).closest('div')!;
      host.querySelectorAll('swc-action-button').forEach((btn) => {
        btn.toggleAttribute('pending', pending);
      });
    }

    return html`
      <div
        style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;"
      >
        <label
          style="display: flex; gap: 8px; align-items: center; cursor: pointer;"
        >
          <input type="checkbox" @change=${handleTogglePending} />
          Toggle pending
        </label>
        <div
          style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;"
        >
          ${template({
            ...args,
            'default-slot': 'Upload',
            'icon-slot': editIconSvg,
          })}
          ${template({
            ...args,
            quiet: true,
            'default-slot': 'Edit',
            'pending-label': 'Edit in-progress',
            'icon-slot': editIconSvg,
          })}
        </div>
      </div>
    `;
  },
  tags: ['behaviors', '!test'],
};

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = {
  render: (args) => html`
    ${template({ ...args, 'default-slot': 'Format' })}
    <swc-action-button size=${args.size} accessible-label="Edit">
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
    ${template({
      ...args,
      'default-slot': 'Upload',
      pending: true,
      'pending-label': 'Upload in-progress',
    })}
  `,
  tags: ['a11y'],
  parameters: { flexLayout: 'row-wrap' },
};
