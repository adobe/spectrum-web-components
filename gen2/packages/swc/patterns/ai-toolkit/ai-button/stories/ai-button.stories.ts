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

import { BUTTON_VALID_SIZES } from '@adobe/spectrum-wc-core/components/button';

import '../swc-ai-button.js';

import {
  captioned,
  forcePseudoState,
  SIZE_LABELS,
} from '../../../../.storybook/helpers/index.js';
import type { AiButton } from '../AiButton.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-ai-button');

argTypes.size = {
  ...argTypes.size,
  control: { type: 'select' },
  options: BUTTON_VALID_SIZES,
};

args['default-slot'] = 'Ask AI';
args.size = 'm';

/**
 * AI buttons start an AI action, such as asking an assistant about the current
 * context. They show the AI mark from the pixel loader, in its static state,
 * before a short label.
 */
const meta: Meta = {
  title: 'AI Toolkit/AI button',
  component: 'swc-ai-button',
  args,
  argTypes,
  render: (args) => template(args),
  parameters: {
    docs: {
      packagePath: 'patterns/ai-toolkit/ai-button',
      subtitle: 'Starts an AI action from a glass button with the AI mark.',
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/N2iKSHlhPmxcIa4DKSUb8s/AI-Button?node-id=2032-87260',
    },
  },
  tags: ['migrated'],
};

export default meta;

// ────────────────────
//    HELPERS
// ────────────────────

const ICON_ONLY_ARGS = {
  'default-slot': '',
  'accessible-label': 'Ask AI',
};

const STATE_LABELS = {
  default: 'Default',
  hover: 'Hover',
  disabled: 'Disabled',
} as const;

type AiButtonState = keyof typeof STATE_LABELS;

/** Renders an AI button in a state. Hover is forced by `forceHover`. */
const renderState = (
  storyArgs: Record<string, unknown>,
  state: AiButtonState
) => html`
  <div ?data-force-hover=${state === 'hover'}>
    ${template({ ...storyArgs, disabled: state === 'disabled' })}
  </div>
`;

/** Forces the hover appearance on AI buttons inside `[data-force-hover]`. */
const forceHover = async ({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}): Promise<void> => {
  const hosts = canvasElement.querySelectorAll<AiButton>(
    '[data-force-hover] swc-ai-button'
  );
  for (const host of hosts) {
    await host.updateComplete;
    forcePseudoState(host, 'hover', '.swc-AiButton');
  }
};

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story = {
  tags: ['autodocs', 'dev'],
  args: {
    size: 'm',
    'default-slot': 'Ask AI',
  },
};

// ──────────────────────────────
//    OVERVIEW STORY
// ──────────────────────────────

export const Overview: Story = {
  tags: ['overview'],
  args: {
    size: 'm',
    'default-slot': 'Ask AI',
  },
};

// ──────────────────────────
//    ANATOMY STORY
// ──────────────────────────

export const Anatomy: Story = {
  render: (args) => html`
    ${template({ ...args, 'default-slot': 'Ask AI' })}
    ${template({ ...args, ...ICON_ONLY_ARGS })}
  `,
  parameters: { flexLayout: 'row-wrap' },
  tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

export const Sizes: Story = {
  render: (args) => html`
    ${BUTTON_VALID_SIZES.map((size) =>
      captioned(template({ ...args, size }), SIZE_LABELS[size])
    )}
  `,
  parameters: { flexLayout: 'row-wrap' },
  tags: ['options'],
};

export const IconOnly: Story = {
  render: (args) => html`
    ${BUTTON_VALID_SIZES.map((size) =>
      captioned(
        template({ ...args, ...ICON_ONLY_ARGS, size }),
        SIZE_LABELS[size]
      )
    )}
  `,
  parameters: { flexLayout: 'row-wrap' },
  tags: ['options'],
};
IconOnly.storyName = 'Icon only';

// ──────────────────────────
//    STATES STORY
// ──────────────────────────

export const States: Story = {
  render: (args) => html`
    ${(Object.keys(STATE_LABELS) as AiButtonState[]).map((state) =>
      captioned(renderState(args, state), STATE_LABELS[state])
    )}
  `,
  play: forceHover,
  parameters: {
    flexLayout: 'row-wrap',
    docs: { story: { autoplay: true } },
  },
  tags: ['states'],
};

// ────────────────────────────────
//    ACCESSIBILITY STORY
// ────────────────────────────────

export const Accessibility: Story = {
  render: (args) => html`
    ${template({ ...args, 'default-slot': 'Ask AI' })}
    ${template({
      ...args,
      ...ICON_ONLY_ARGS,
      'accessible-label': 'Ask AI about this document',
    })}
  `,
  parameters: { flexLayout: 'row-wrap' },
  tags: ['a11y'],
};

// ────────────────────────────────
//    DESIGN REFERENCE STORY
// ────────────────────────────────

export const DesignReference: Story = {
  render: (args) => html`
    <div
      style="display: grid; grid-template-columns: repeat(4, auto); gap: var(--swc-spacing-500) var(--swc-spacing-700); align-items: center; justify-items: start;"
    >
      <span></span>
      ${Object.values(STATE_LABELS).map(
        (label) => html`
          <span class="swc-Detail swc-Detail--sizeS">${label}</span>
        `
      )}
      ${BUTTON_VALID_SIZES.map((size) =>
        [false, true].map(
          (iconOnly) => html`
            <span class="swc-Detail swc-Detail--sizeS">
              ${SIZE_LABELS[size]}, ${iconOnly ? 'icon only' : 'icon and label'}
            </span>
            ${(Object.keys(STATE_LABELS) as AiButtonState[]).map((state) =>
              renderState(
                {
                  ...args,
                  size,
                  ...(iconOnly ? ICON_ONLY_ARGS : { 'default-slot': 'Ask AI' }),
                },
                state
              )
            )}
          `
        )
      )}
    </div>
  `,
  play: forceHover,
  parameters: { layout: 'padded' },
  tags: ['dev'],
};
DesignReference.storyName = 'Design reference';
