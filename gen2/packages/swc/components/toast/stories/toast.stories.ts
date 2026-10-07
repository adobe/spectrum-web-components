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

/**
 * A toast displays a temporary notification in response to a user action or system event.
 */
const meta: Meta = {
  title: 'Toast',
  component: 'swc-toast',
  args,
  argTypes,
  render: (args) => template(args),
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
  render: (args) => {
    const onToggle = (event: MouseEvent): void => {
      const root = (event.currentTarget as HTMLElement).getRootNode() as
        | Document
        | ShadowRoot;
      const toast = root.querySelector('swc-toast') as
        | (HTMLElement & { open: boolean })
        | null;
      if (toast) {
        toast.open = !toast.open;
      }
    };

    return html`
      <swc-button variant="secondary" @click=${onToggle}>
        Toggle toast
      </swc-button>
      ${template(args)}
    `;
  },
  args: {
    open: false,
  },
  parameters: {
    flexLayout: 'column-center',
  },
  tags: ['dev'],
};

// ──────────────────────────
//    OVERVIEW STORY
// ──────────────────────────

export const Overview: Story = {
  args: {
    open: true,
  },
  tags: ['overview'],
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

export const Anatomy: Story = {
  render: (args) =>
    template({
      ...args,
      open: true,
      variant: 'info',
      'default-slot': 'File archived',
      'action-label': 'Undo',
    }),
  tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

export const Variants: Story = {
  render: (args) => html`
    ${TOAST_VARIANTS.map((variant) =>
      template({
        ...args,
        open: true,
        variant,
        'default-slot': `${variant[0].toUpperCase()}${variant.slice(1)} message`,
      })
    )}
  `,
  parameters: { flexLayout: 'column-stretch' },
  tags: ['options'],
};

export const Action: Story = {
  render: (args) => html`
    ${template({
      ...args,
      open: true,
      variant: 'positive',
      'default-slot': 'Your changes have been saved.',
      'action-label': 'Undo',
    })}
    ${template({
      ...args,
      open: true,
      variant: 'neutral',
      'default-slot': 'Your changes have been saved.',
      'action-label': 'Undo',
    })}
  `,
  parameters: { flexLayout: 'column-stretch' },
  tags: ['options'],
};

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

export const TextWrapping: Story = {
  render: (args) => html`
    ${template({
      ...args,
      open: true,
      'default-slot':
        'Your changes to the project have been saved and shared with everyone who has access to it.',
      'action-label': 'Undo',
    })}
    ${template({
      ...args,
      open: true,
      'default-slot': 'Supercalifragilisticexpialidocious'.repeat(4),
    })}
    ${template({
      ...args,
      open: true,
      variant: 'positive',
      'default-slot':
        'The updated report is ready to review and has been shared with your team, including the latest changes to the project.',
      'action-label': 'Undo',
    })}
    ${template({
      ...args,
      open: true,
      variant: 'info',
      'default-slot':
        'The updated report is ready to review and has been shared with your team, including the latest changes to the project.',
      'action-label': undefined,
    })}
  `,
  parameters: { flexLayout: 'column-stretch' },
  tags: ['behaviors'],
};

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = {
  render: (args) => html`
    ${template({ ...args, open: true, 'default-slot': 'File saved' })}
    ${template({
      ...args,
      open: true,
      'default-slot':
        '<span id="toast-labelled-message">Upload complete</span>',
    })}
  `,
  parameters: { flexLayout: 'row-wrap' },
  tags: ['a11y'],
};
