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

import { html, render } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import '../swc-thread-alert.js';
import '@adobe/spectrum-wc/components/button/swc-button.js';
import '@adobe/spectrum-wc/components/close-button/swc-close-button.js';

import { threadAlertTemplate } from '../thread-alert.usage.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-thread-alert');

// Remove the obsolete slot even when Storybook caches the earlier manifest.
delete args['heading-slot'];
delete argTypes['heading-slot'];

/**
 * A thread alert places a status message and optional inline controls in a conversation.
 * Compose actions with [Button](../?path=/docs/components-button--docs) and
 * [Close button](../?path=/docs/components-close-button--docs).
 * Applications own announcements, focus, retry, and dismissal.
 */
const meta: Meta = {
  title: 'AI Toolkit/Thread alert',
  component: 'swc-thread-alert',
  args: {
    ...args,
    'default-slot': '<span>Message text</span>',
    'actions-slot': '<swc-button size="s">Try again</swc-button>',
    'dismiss-slot':
      '<swc-close-button size="s" accessible-label="Dismiss message"></swc-close-button>',
  },
  argTypes: {
    ...argTypes,
    variant: {
      control: 'select',
      options: ['informative', 'positive', 'notice', 'negative', 'neutral'],
    },
  },
  render: (args) => template(args),
  parameters: {
    docs: {
      packagePath: 'patterns/ai-toolkit/thread-alert',
      subtitle: 'A compact message with optional inline actions.',
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/dNpCfRKCSd14Qq2x01g0ys/?node-id=353-13756',
    },
    layout: 'padded',
    styles: { 'inline-size': '100%', 'max-inline-size': '451px' },
  },
  excludeStories: ['meta'],
  tags: ['migrated'],
};

export { meta };
export default meta;

// ────────────────────
//    HELPERS
// ────────────────────

const statusMessages = {
  informative: 'Your request is ready to send.',
  positive: 'Your response was saved.',
  notice: 'Review your request before continuing.',
  negative: 'Your response could not be completed.',
  neutral: 'This conversation is archived.',
};

const insertMessage = async (event: Event): Promise<void> => {
  const trigger = event.currentTarget;
  if (!(trigger instanceof HTMLElement)) {
    throw new Error('Expected the application message trigger');
  }
  const app = trigger.closest('[data-announcements]');
  const container = app?.querySelector('[data-message]');
  const announcer = app?.querySelector('[role="status"]');
  if (!(container instanceof HTMLElement) || !announcer) {
    throw new Error(
      'Expected the application message container and live region'
    );
  }
  const focus = trigger.hasAttribute('data-focus');
  announcer.textContent = '';
  render(
    html`
      <swc-thread-alert tabindex=${ifDefined(focus ? '-1' : undefined)}>
        Your request is ready.
      </swc-thread-alert>
    `,
    container
  );
  const alert = container.querySelector('swc-thread-alert');
  if (!alert) {
    throw new Error('Expected the inserted thread alert');
  }
  await alert.updateComplete;
  if (focus) {
    alert.focus();
  } else {
    announcer.textContent = 'Your request is ready.';
  }
};

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story = {
  args: { variant: 'notice', showButton: false },
  argTypes: {
    showButton: {
      name: 'Show button',
      control: 'boolean',
      description: 'Show the optional action button in this example.',
      table: { category: 'Demo' },
    },
  },
  render: ({ showButton, ...args }) =>
    template({
      ...args,
      'actions-slot': showButton ? args['actions-slot'] : '',
    }),
  tags: ['dev'],
};

// ──────────────────────────
//    OVERVIEW STORY
// ──────────────────────────

export const Overview: Story = {
  render: () => threadAlertTemplate,
  tags: ['overview'],
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

export const Anatomy: Story = {
  args: {
    variant: 'negative',
    'default-slot': '<span>Your response could not be completed.</span>',
  },
  tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

export const SemanticVariants: Story = {
  render: (args) => html`
    ${Object.entries(statusMessages).map(([variant, message]) =>
      template({ ...args, variant, 'default-slot': `<span>${message}</span>` })
    )}
  `,
  parameters: {
    flexLayout: 'row-wrap',
    styles: { 'flex-direction': 'column', 'align-items': 'stretch' },
  },
  tags: ['options'],
};
SemanticVariants.storyName = 'Semantic variants';

export const OptionalControls: Story = {
  render: (args) => html`
    ${template({
      ...args,
      'default-slot': '<span>Your response was saved.</span>',
      variant: 'positive',
      'actions-slot': '',
    })}
    ${template({
      ...args,
      'default-slot': '<span>Your response could not be completed.</span>',
      variant: 'negative',
      'dismiss-slot': '',
    })}
    ${template({
      ...args,
      'default-slot': '<span>This conversation is archived.</span>',
      variant: 'neutral',
      'actions-slot': '',
      'dismiss-slot': '',
    })}
  `,
  parameters: {
    flexLayout: 'row-wrap',
    styles: { 'flex-direction': 'column', 'align-items': 'stretch' },
  },
  tags: ['options'],
};
OptionalControls.storyName = 'Optional controls';

// ──────────────────────────
//    STATES STORIES
// ──────────────────────────

export const States: Story = {
  args: {
    'default-slot': '<span>Your request is being retried.</span>',
    'actions-slot':
      '<swc-button size="s" pending pending-label="Retrying">Try again</swc-button>',
  },
  tags: ['states'],
};

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

export const TextWrapping: Story = {
  args: {
    variant: 'negative',
    'default-slot':
      '<span>Your response could not be completed. Check your connection, then try again. Request: request_0123456789abcdefghijklmnopqrstuvwxyz0123456789.</span>',
  },
  tags: ['behaviors'],
};
TextWrapping.storyName = 'Text wrapping';

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = {
  ...Anatomy,
  tags: ['a11y'],
};

export const DarkTheme: Story = {
  ...SemanticVariants,
  globals: { theme: 'dark' },
  tags: ['a11y'],
};
DarkTheme.storyName = 'Dark theme';

export const RightToLeft: Story = {
  ...Anatomy,
  globals: { textDirection: 'rtl' },
  tags: ['a11y'],
};
RightToLeft.storyName = 'Right to left';

export const DynamicInsertion: Story = {
  render: () => html`
    <div data-announcements>
      <swc-button size="s" @click=${insertMessage}>Announce message</swc-button>
      <swc-button size="s" data-focus @click=${insertMessage}>
        Focus message
      </swc-button>
      <p role="status"></p>
      <div data-message></div>
    </div>
  `,
  tags: ['a11y'],
};
DynamicInsertion.storyName = 'Dynamic insertion';
