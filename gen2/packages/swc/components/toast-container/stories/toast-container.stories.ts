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
import { ifDefined } from 'lit/directives/if-defined.js';
import { fn } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import {
  TOAST_CONTAINER_PLACEMENTS,
  TOAST_VARIANTS,
  type ToastContainerPlacement,
  ToastQueue,
  type ToastQueueOptions,
  type ToastVariant,
} from '@adobe/spectrum-wc-core/components/toast-container/index.js';

import '@adobe/spectrum-wc/components/button/swc-button.js';
import '@adobe/spectrum-wc/components/toast-container/swc-toast.js';
import '@adobe/spectrum-wc/components/toast-container/swc-toast-container.js';

import { uniqueId } from '../../../utils/id.js';

// ────────────────
//    METADATA
// ────────────────

type ToastContainerArgs = ToastQueueOptions & {
  message: string;
  placement: ToastContainerPlacement;
};

type ToastPlaygroundArgs = ToastContainerArgs & { open?: boolean };

// Spreading the helper's argTypes also hides the private and protected members
// that Storybook would otherwise list as controls.
const { argTypes: containerArgTypes } = getStorybookHelpers(
  'swc-toast-container'
);
const { argTypes: toastArgTypes } = getStorybookHelpers('swc-toast');

const hiddenControl = { table: { disable: true }, control: false } as const;

const queueOptions = { category: 'queue options' } as const;

/**
 * The toast container shows temporary notifications from a shared queue. Add
 * toasts with `ToastQueue.add()`; the container renders one toast at a time and
 * owns placement, auto-dismiss timing, and focus return.
 */
const meta: Meta<ToastContainerArgs> = {
  title: 'Toast container',
  component: 'swc-toast-container',
  tags: ['migrated'],
  args: {
    placement: 'bottom',
    message: 'File saved',
    variant: 'positive',
    iconLabel: '',
    timeout: null,
    actionLabel: '',
    shouldCloseOnAction: false,
    onAction: fn(),
  },
  argTypes: {
    ...containerArgTypes,
    placement: {
      ...containerArgTypes?.placement,
      control: 'select',
      options: TOAST_CONTAINER_PLACEMENTS,
    },
    message: {
      control: 'text',
      description: 'The notification text passed to `ToastQueue.add()`.',
      table: queueOptions,
    },
    variant: {
      control: 'select',
      options: TOAST_VARIANTS,
      description: 'The semantic variant of the toast.',
      table: { ...queueOptions, defaultValue: { summary: 'neutral' } },
    },
    iconLabel: {
      control: 'text',
      description:
        'An accessible label for the variant icon. Leave empty to use the default label for the variant.',
      table: queueOptions,
    },
    timeout: {
      control: 'number',
      description:
        'Auto-dismiss delay in milliseconds. Leave unset (or use 0) to keep the toast until it is closed. Positive values are raised to a 6000 minimum. Ignored when the toast has an action.',
      table: { ...queueOptions, defaultValue: { summary: 'none' } },
    },
    actionLabel: {
      control: 'text',
      description: 'The label for the optional action button.',
      table: queueOptions,
    },
    shouldCloseOnAction: {
      control: 'boolean',
      description: 'Whether activating the action also closes the toast.',
      table: { ...queueOptions, defaultValue: { summary: 'false' } },
    },
    onAction: hiddenControl,
    onClose: hiddenControl,
  },
  parameters: {
    layout: 'padded',
    flexLayout: 'row-wrap',
    docs: {
      subtitle:
        'Fixed region that shows queued toast notifications, one at a time.',
      // position: fixed needs its own viewport, so render docs canvases in iframes.
      story: { inline: false, height: '260px' },
    },
    // swc-toast is a second element of this component; surface its API table
    // alongside swc-toast-container's on the docs page.
    additionalApiTables: ['swc-toast'],
  },
  beforeEach: () => {
    ToastQueue.clear();
    return () => ToastQueue.clear();
  },
  render: (args) => {
    const addOne = (): void => {
      addToast(args, nextMessageSuffix());
    };
    const clear = (): void => ToastQueue.clear();
    return html`
      <swc-button variant="secondary" @click=${addOne}>Add toast</swc-button>
      <swc-button variant="secondary" @click=${clear}>Clear</swc-button>
      <swc-toast-container .placement=${args.placement}></swc-toast-container>
    `;
  },
};

export default meta;

// ───────────────
//    HELPERS
// ───────────────

const variantLabels = {
  neutral: 'Neutral',
  info: 'Info',
  positive: 'Positive',
  negative: 'Negative',
} as const satisfies Record<ToastVariant, string>;

const variantMessages = {
  neutral: 'Draft moved to archive',
  info: 'A new version is available',
  positive: 'File saved',
  negative: 'File could not be saved',
} as const satisfies Record<ToastVariant, string>;

// Numbers every message after the first so queued toasts are distinguishable.
const nextMessageSuffix = (): string =>
  ToastQueue.entries.length === 0 ? '' : ` (${ToastQueue.entries.length + 1})`;

const addToast = (args: ToastContainerArgs, suffix = ''): string =>
  ToastQueue.add(`${args.message}${suffix}`, {
    variant: args.variant,
    iconLabel: args.iconLabel || undefined,
    timeout: args.timeout,
    actionLabel: args.actionLabel,
    onAction: args.onAction,
    shouldCloseOnAction: args.shouldCloseOnAction,
    onClose: args.onClose,
  });

type StaticToastOptions = {
  message: string;
  variant?: ToastVariant;
  iconLabel?: string;
  actionLabel?: string;
  open?: boolean;
};

// Static toast for side-by-side docs; the container shows one toast at a time.
const staticToast = ({
  message,
  variant,
  iconLabel,
  actionLabel,
  open = true,
}: StaticToastOptions) => html`
  <swc-toast
    ?open=${open}
    variant=${ifDefined(variant)}
    icon-label=${ifDefined(iconLabel || undefined)}
    action-label=${ifDefined(actionLabel || undefined)}
  >
    <span id=${uniqueId('toast-message')}>${message}</span>
  </swc-toast>
`;

const staticStackParameters = {
  layout: 'padded',
  flexLayout: 'column-stretch',
  docs: { story: { inline: true } },
};

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
  tags: ['overview'],
  play: ({ args }) => {
    addToast(args);
  },
};

// ──────────────────
//    ANATOMY STORY
// ──────────────────

export const Anatomy: Story<ToastContainerArgs> = {
  ...Overview,
  args: { ...Overview.args, actionLabel: 'Undo', onAction: fn() },
  tags: ['anatomy'],
};

// ──────────────────
//    OPTIONS STORIES
// ──────────────────

export const Variants: Story<ToastContainerArgs> = {
  render: (args) => {
    const addVariant = (event: Event): void => {
      const variant = (event.currentTarget as HTMLElement).dataset
        .variant as ToastVariant;
      addToast({ ...args, variant, message: variantMessages[variant] });
    };
    return html`
      ${TOAST_VARIANTS.map(
        (variant) => html`
          <swc-button
            variant="secondary"
            data-variant=${variant}
            @click=${addVariant}
          >
            ${variantLabels[variant]}
          </swc-button>
        `
      )}
      <swc-toast-container .placement=${args.placement}></swc-toast-container>
    `;
  },
  tags: ['options'],
};

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

export const AutoDismiss: Story<ToastContainerArgs> = {
  args: { timeout: 6000 },
  tags: ['behaviors'],
};

export const Action: Story<ToastContainerArgs> = {
  args: { actionLabel: 'Undo' },
  tags: ['behaviors'],
};

// ──────────────────────────
//    ACCESSIBILITY STORY
// ──────────────────────────

export const Accessibility: Story<ToastContainerArgs> = {
  ...Overview,
  tags: ['a11y'],
};

// ───────────────────────────────────
//    TOAST ELEMENT STORIES
// ───────────────────────────────────

export const ToastPlayground: Story<ToastPlaygroundArgs> = {
  args: { open: true, variant: 'neutral' },
  argTypes: {
    // Reuse the manifest entries so names, descriptions, and the
    // attributes/slots categories match swc-toast's own API.
    open: { ...toastArgTypes?.open },
    variant: {
      ...toastArgTypes?.variant,
      control: 'select',
      options: TOAST_VARIANTS,
    },
    iconLabel: { ...toastArgTypes?.['icon-label'] },
    actionLabel: { ...toastArgTypes?.['action-label'] },
    message: { ...toastArgTypes?.['default-slot'] },
    placement: hiddenControl,
    timeout: hiddenControl,
    shouldCloseOnAction: hiddenControl,
  },
  render: (args) =>
    staticToast({
      message: args.message,
      variant: args.variant,
      iconLabel: args.iconLabel,
      actionLabel: args.actionLabel,
      open: args.open,
    }),
  parameters: {
    layout: 'padded',
    flexLayout: 'column-center',
    docs: { story: { inline: true } },
  },
  tags: ['dev'],
};

export const ToastAnatomy: Story<ToastPlaygroundArgs> = {
  ...ToastPlayground,
  args: {
    ...ToastPlayground.args,
    variant: 'info',
    message: 'File archived',
    actionLabel: 'Undo',
  },
  tags: ['anatomy'],
};

export const ToastVariants: Story<ToastContainerArgs> = {
  render: () => html`
    ${TOAST_VARIANTS.map((variant) =>
      staticToast({ message: variantMessages[variant], variant })
    )}
  `,
  parameters: staticStackParameters,
  tags: ['options'],
};

export const ToastAction: Story<ToastContainerArgs> = {
  render: () => html`
    ${staticToast({
      message: 'Your changes have been saved.',
      variant: 'positive',
      actionLabel: 'Undo',
    })}
    ${staticToast({
      message: 'Your changes have been saved.',
      variant: 'neutral',
      actionLabel: 'Undo',
    })}
  `,
  parameters: staticStackParameters,
  tags: ['options'],
};

export const ToastTextWrapping: Story<ToastContainerArgs> = {
  render: () => html`
    ${staticToast({
      message:
        'Your changes to the project have been saved and shared with everyone who has access to it.',
      actionLabel: 'Undo',
    })}
    ${staticToast({
      message: 'Supercalifragilisticexpialidocious'.repeat(4),
    })}
    ${staticToast({
      message:
        'The updated report is ready to review and has been shared with your team, including the latest changes to the project.',
      variant: 'positive',
      actionLabel: 'Undo',
    })}
    ${staticToast({
      message:
        'The updated report is ready to review and has been shared with your team, including the latest changes to the project.',
      variant: 'info',
    })}
  `,
  parameters: staticStackParameters,
  tags: ['behaviors'],
};

// ──────────────────
//    TEST FIXTURES
// ──────────────────

// Hidden fixture for the Playwright pause spec, which closes the newest toast
// through the queue so the pointer state under test stays untouched. The ci-a11y
// and production Storybooks build `*.stories.ts` but not `.test.ts` files, so it
// lives here. `!dev` keeps it out of the sidebar and `!test` out of the
// automatic runs; it stays addressable by story id.
export const ProgrammaticCloseFixture: Story<ToastContainerArgs> = {
  render: () => {
    const add = (): void => {
      ToastQueue.add('File saved', { timeout: 6000 });
    };
    const closeNewest = (): void => {
      const entry = ToastQueue.entries[0];
      if (entry) {
        ToastQueue.close(entry.key);
      }
    };
    return html`
      <swc-button variant="secondary" @click=${add}>Add toast</swc-button>
      <swc-button variant="secondary" @click=${closeNewest}>
        Close newest
      </swc-button>
      <swc-toast-container></swc-toast-container>
    `;
  },
  tags: ['!dev', '!test'],
};
