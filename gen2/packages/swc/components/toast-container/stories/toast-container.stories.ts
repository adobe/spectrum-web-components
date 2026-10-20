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
import { fn } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import { TOAST_VARIANTS } from '@adobe/spectrum-wc-core/components/toast/index.js';
import {
  TOAST_CONTAINER_PLACEMENTS,
  type ToastContainerPlacement,
  ToastQueue,
  type ToastQueueOptions,
} from '@adobe/spectrum-wc-core/components/toast-container/index.js';

import '@adobe/spectrum-wc/components/button/swc-button.js';
import '@adobe/spectrum-wc/components/toast-container/swc-toast-container.js';

// ────────────────
//    METADATA
// ────────────────

type ToastContainerArgs = ToastQueueOptions & {
  message: string;
  placement: ToastContainerPlacement;
};

const meta: Meta<ToastContainerArgs> = {
  title: 'Toast container',
  component: 'swc-toast-container',
  tags: ['migrated'],
  args: {
    placement: 'bottom',
    message: 'File saved',
    variant: 'positive',
    timeout: 6000,
    actionLabel: '',
    shouldCloseOnAction: false,
    onAction: fn(),
  },
  argTypes: {
    placement: { control: 'select', options: TOAST_CONTAINER_PLACEMENTS },
    message: { control: 'text' },
    variant: { control: 'select', options: TOAST_VARIANTS },
    timeout: { control: 'number' },
    actionLabel: { control: 'text' },
    shouldCloseOnAction: { control: 'boolean' },
    onAction: { control: false },
    onClose: { control: false },
  },
  parameters: {
    layout: 'fullscreen',
    flexLayout: 'row-wrap',
    docs: { disable: true, page: null },
  },
  beforeEach: () => {
    ToastQueue.clear();
    return () => ToastQueue.clear();
  },
  render: (args) => {
    const addOne = (): void => {
      addToast(args);
    };
    const addTwo = (): void => {
      addToast(args, ' (1)');
      addToast(args, ' (2)');
    };
    const closeNewest = (): void => {
      const entry = ToastQueue.entries[0];
      if (entry) {
        ToastQueue.close(entry.key);
      }
    };
    const clear = (): void => ToastQueue.clear();
    return html`
      <swc-button variant="secondary" @click=${addOne}>Add toast</swc-button>
      <swc-button variant="secondary" @click=${addTwo}>
        Add two toasts
      </swc-button>
      <swc-button variant="secondary" @click=${closeNewest}>
        Close newest
      </swc-button>
      <swc-button variant="secondary" @click=${clear}>Clear</swc-button>
      <swc-toast-container .placement=${args.placement}></swc-toast-container>
    `;
  },
};

export default meta;

// ───────────────
//    HELPERS
// ───────────────

const addToast = (args: ToastContainerArgs, suffix = ''): string =>
  ToastQueue.add(`${args.message}${suffix}`, {
    variant: args.variant,
    iconLabel: args.iconLabel,
    timeout: args.timeout,
    actionLabel: args.actionLabel,
    onAction: args.onAction,
    shouldCloseOnAction: args.shouldCloseOnAction,
    onClose: args.onClose,
  });

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story<ToastContainerArgs> = {
  tags: ['dev'],
};

// ──────────────────
//    OVERVIEW STORY
// ──────────────────

export const Overview: Story<ToastContainerArgs> = {
  args: { timeout: null },
  tags: ['overview'],
  play: ({ args }) => {
    addToast(args);
  },
};

// ──────────────────
//    OPTIONS STORIES
// ──────────────────

export const Top: Story<ToastContainerArgs> = {
  ...Overview,
  args: { ...Overview.args, placement: 'top' },
  tags: ['options'],
};

export const TopEnd: Story<ToastContainerArgs> = {
  ...Overview,
  args: { ...Overview.args, placement: 'top-end' },
  tags: ['options'],
};

export const Bottom: Story<ToastContainerArgs> = {
  ...Overview,
  args: { ...Overview.args, placement: 'bottom' },
  tags: ['options'],
};

export const BottomEnd: Story<ToastContainerArgs> = {
  ...Overview,
  args: { ...Overview.args, placement: 'bottom-end' },
  tags: ['options'],
};

// ──────────────────
//    BEHAVIORS STORIES
// ──────────────────

export const Action: Story<ToastContainerArgs> = {
  args: { actionLabel: 'Undo', timeout: 6000 },
  tags: ['behaviors'],
};
