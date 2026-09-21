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

import { TOAST_VARIANTS } from '@adobe/spectrum-wc-core/components/toast/index.js';

import '@adobe/spectrum-wc/components/button/swc-button.js';
import '@adobe/spectrum-wc/components/toast/swc-toast.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-toast');

args['default-slot'] = 'File saved';

argTypes.variant = {
  ...argTypes.variant,
  control: { type: 'select' },
  options: TOAST_VARIANTS,
};

// Placeholder contrast until Phase 5 styling lands; toast.css has no background yet.
const preview = (content: unknown) => html`
  <div style="background-color: #292929; color: white;">${content}</div>
`;

/**
 * A toast displays a temporary notification in response to a user action or system event.
 */
const meta: Meta = {
  title: 'Toast',
  component: 'swc-toast',
  args,
  argTypes,
  render: (args) => preview(template(args)),
  parameters: {
    docs: {
      subtitle:
        'Temporary notification in response to a user action or system event.',
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
    open: true,
  },
  tags: ['dev'],
};

// ──────────────────────────
//    OVERVIEW STORY
// ──────────────────────────

export const Overview: Story = {
  tags: ['overview'],
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

export const Anatomy: Story = {
  render: (args) =>
    preview(
      template({
        ...args,
        open: true,
        variant: 'info',
        'default-slot': 'File archived',
        'action-slot': '<swc-button>Undo</swc-button>',
      })
    ),
  tags: ['anatomy'],
};

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = {
  render: (args) => html`
    ${preview(template({ ...args, open: true, 'default-slot': 'File saved' }))}
    ${preview(
      template({
        ...args,
        open: true,
        'default-slot':
          '<span id="toast-labelled-message">Upload complete</span>',
      })
    )}
  `,
  parameters: { flexLayout: 'row-wrap' },
  tags: ['a11y'],
};
