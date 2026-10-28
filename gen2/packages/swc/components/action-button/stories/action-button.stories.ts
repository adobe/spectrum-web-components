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
} from '@adobe/spectrum-wc-core/components/action-button';

import '@adobe/spectrum-wc/components/action-button/swc-action-button.js';
import '@adobe/spectrum-wc-icons/swc-icon-edit.js';
import '@adobe/spectrum-wc-icons/swc-icon-settings.js';
import '@adobe/spectrum-wc-icons/swc-icon-upload.js';

import { SIZE_LABELS } from '../../../.storybook/helpers/index.js';

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
  title: 'Action button',
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

const editIcon = `<swc-icon-edit></swc-icon-edit>`;
const settingsIcon = `<swc-icon-settings></swc-icon-settings>`;
const uploadIcon = `<swc-icon-upload></swc-icon-upload>`;

// ──────────────────────────
//    PLAYGROUND STORY
// ──────────────────────────

export const Playground: Story = {
  args: {
    'default-slot': 'Settings',
    'icon-slot': settingsIcon,
  },
  tags: ['dev'],
};

// ──────────────────────────
//    OVERVIEW STORY
// ──────────────────────────

export const Overview: Story = {
  args: {
    'default-slot': 'Settings',
    'icon-slot': settingsIcon,
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
      'icon-slot': editIcon,
    })}
    <swc-action-button size=${args.size} accessible-label="Edit">
      <swc-icon-edit slot="icon"></swc-icon-edit>
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
        'default-slot': SIZE_LABELS[size],
        'icon-slot': editIcon,
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
      'icon-slot': editIcon,
    })}
    ${template({
      ...args,
      quiet: true,
      'default-slot': 'Quiet',
      'icon-slot': editIcon,
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
        'icon-slot': editIcon,
      })}
      ${template({
        ...args,
        'static-color': 'white',
        quiet: true,
        'default-slot': 'Quiet',
        'icon-slot': editIcon,
      })}
    </div>
    <div style="display: flex; gap: 16px; flex-wrap: wrap;">
      ${template({
        ...args,
        'static-color': 'black',
        'default-slot': 'Default',
        'icon-slot': editIcon,
      })}
      ${template({
        ...args,
        'static-color': 'black',
        quiet: true,
        'default-slot': 'Quiet',
        'icon-slot': editIcon,
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
      'icon-slot': editIcon,
    })}
    ${template({
      ...args,
      disabled: true,
      'default-slot': 'Disabled',
      'icon-slot': editIcon,
    })}
    ${template({
      ...args,
      pending: true,
      'default-slot': 'Pending',
      'icon-slot': editIcon,
    })}
  `,
  tags: ['states'],
  parameters: { flexLayout: 'row-wrap' },
};

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
            'icon-slot': uploadIcon,
          })}
          ${template({
            ...args,
            quiet: true,
            'default-slot': 'Edit',
            'pending-label': 'Edit in-progress',
            'icon-slot': editIcon,
          })}
        </div>
      </div>
    `;
  },
  tags: ['states', '!test'],
};

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

export const IconOnly: Story = {
  render: (args) => html`
    <swc-action-button size=${args.size} accessible-label="Edit">
      <swc-icon-edit slot="icon"></swc-icon-edit>
    </swc-action-button>
  `,
  tags: ['behaviors'],
};
IconOnly.storyName = 'Icon only';

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = {
  render: (args) => html`
    ${template({ ...args, 'default-slot': 'Format' })}
    <swc-action-button size=${args.size} accessible-label="Edit">
      <swc-icon-edit slot="icon"></swc-icon-edit>
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
