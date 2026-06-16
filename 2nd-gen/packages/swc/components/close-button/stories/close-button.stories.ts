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
  BUTTON_STATIC_COLORS,
  BUTTON_VALID_SIZES,
} from '@spectrum-web-components/core/components/button';

import '@adobe/spectrum-wc/components/close-button/swc-close-button.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-close-button');

argTypes.size = {
  ...argTypes.size,
  control: { type: 'select' },
  options: BUTTON_VALID_SIZES,
  table: {
    category: 'attributes',
    defaultValue: {
      summary: 'm',
    },
  },
};

argTypes['static-color'] = {
  ...argTypes['static-color'],
  control: 'select',
  options: ['', ...BUTTON_STATIC_COLORS],
  table: {
    ...argTypes['static-color']?.table,
    category: 'attributes',
  },
};

args['accessible-label'] = 'Close';

/**
 * Close buttons dismiss dialogs, banners, toasts, and similar surfaces. They
 * are compact, icon-forward controls that require an accessible name describing
 * the dismiss action. For primary actions, see
 * [Button](../?path=/docs/components-button--docs).
 */
const meta: Meta = {
  title: 'Close Button',
  component: 'swc-close-button',
  args,
  argTypes,
  render: (args) => template(args),
  parameters: {
    docs: {
      subtitle: 'Compact dismiss control for overlays and chrome regions',
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=125265-577',
    },
  },
  tags: ['migrated'],
};

export default meta;

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story = {
  args: {
    'accessible-label': 'Close',
  },
  tags: ['dev'],
};

// ──────────────────────────
//    OVERVIEW STORY
// ──────────────────────────

export const Overview: Story = {
  args: {
    'accessible-label': 'Close',
  },
  tags: ['overview'],
};

// ──────────────────────────
//    ANATOMY STORY
// ──────────────────────────

export const Anatomy: Story = {
  render: () => html`
    <swc-close-button accessible-label="Close">Close</swc-close-button>
  `,
  tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

export const Sizes: Story = {
  render: (args) => html`
    <div style="display: flex; align-items: center; gap: 16px;">
      ${BUTTON_VALID_SIZES.map(
        (size) => html`
          ${template({
            ...args,
            size,
            'accessible-label': `Close (${size})`,
          })}
        `
      )}
    </div>
  `,
  tags: ['options'],
  parameters: {
    flexLayout: 'row-wrap',
  },
};

export const StaticColors: Story = {
  render: (args) => html`
    <div style="display: flex; align-items: center; gap: 16px;">
      ${template({
        ...args,
        'static-color': 'white',
        'accessible-label': 'Close (white)',
      })}
    </div>
    <div style="display: flex; align-items: center; gap: 16px;">
      ${template({
        ...args,
        'static-color': 'black',
        'accessible-label': 'Close (black)',
      })}
    </div>
  `,
  tags: ['options'],
  parameters: {
    flexLayout: false,
    staticColorsDemo: true,
  },
};
StaticColors.storyName = 'Static colors';

// ──────────────────────────
//    STATES STORIES
// ──────────────────────────

export const States: Story = {
  render: (args) => html`
    <div style="display: flex; align-items: center; gap: 16px;">
      ${template({ ...args, 'accessible-label': 'Close' })}
      ${template({ ...args, disabled: true, 'accessible-label': 'Close' })}
    </div>
  `,
  tags: ['states'],
  parameters: {
    flexLayout: 'row-wrap',
  },
};

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = {
  render: (args) => html`
    <div
      style="display: flex; flex-direction: column; gap: 24px; max-inline-size: 28rem;"
    >
      <section>
        <h4 style="margin: 0 0 8px;">Icon-only with accessible-label</h4>
        <p style="margin: 0 0 12px;">
          The cross icon is decorative (
          <code>aria-hidden</code>
          ). The name comes from
          <code>accessible-label</code>
          on the host.
        </p>
        ${template({ ...args, 'accessible-label': 'Close' })}
      </section>

      <section>
        <h4 style="margin: 0 0 8px;">Visible slot label</h4>
        <p style="margin: 0 0 12px;">
          Slotted text is visually hidden but exposed as the button name when
          <code>accessible-label</code>
          is omitted.
        </p>
        ${template({ ...args, 'accessible-label': undefined }, 'Dismiss')}
      </section>

      <section
        style="padding: 16px; border: 1px solid var(--spectrum-gray-300, #ccc); border-radius: 4px;"
      >
        <div
          style="display: flex; align-items: flex-start; justify-content: space-between; gap: 16px;"
        >
          <div>
            <h4 style="margin: 0 0 4px;">Dialog title</h4>
            <p style="margin: 0;">
              Use a dismiss name that matches the action (for example
              &quot;Close&quot;), not a clear/reset verb.
            </p>
          </div>
          ${template({
            ...args,
            'accessible-label': 'Close dialog',
          })}
        </div>
      </section>

      <section>
        <h4 style="margin: 0 0 8px;">Disabled</h4>
        ${template({
          ...args,
          disabled: true,
          'accessible-label': 'Close',
        })}
      </section>
    </div>
  `,
  parameters: {
    flexLayout: 'column-stretch',
  },
  tags: ['a11y'],
};
