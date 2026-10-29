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

import { html, nothing } from 'lit';
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import { BUTTON_VALID_SIZES } from '@adobe/spectrum-wc-core/components/button';

import '../swc-ai-button.js';

import {
  captioned,
  forcePseudoState,
  row,
  SIZE_LABELS,
  theme,
} from '../../../../.storybook/helpers/index.js';
import {
  PIXEL_LOADER_ICON_NAMES,
  type PixelLoaderIconName,
} from '../../pixel-loader/index.js';
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

argTypes.icon = {
  ...argTypes.icon,
  control: { type: 'select' },
  options: PIXEL_LOADER_ICON_NAMES,
};

args['default-slot'] = 'Ask AI';
args.size = 'm';
args.icon = 'aiLogo';

/**
 * AI buttons start an AI action, such as asking an assistant about the current
 * context. They show a pixel-art icon from the pixel loader, in its static
 * state, before a short label. The icon is the AI mark by default.
 *
 * The surface of the button is translucent glass. The content behind the
 * button shows through it, blurred and tinted.
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

/** Example labels for a few pixel loader icons. */
const ICON_EXAMPLES = [
  ['aiLogo', 'Ask AI'],
  ['wand', 'Generate'],
  ['image', 'Create image'],
  ['brush', 'Edit with AI'],
  ['comment', 'Summarize'],
  ['microphone', 'Dictate'],
] as const satisfies ReadonlyArray<readonly [PixelLoaderIconName, string]>;

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

const THEME_LABELS = { light: 'Light theme', dark: 'Dark theme' } as const;

/**
 * Backdrops for the backgrounds story. They don't change with the theme, so
 * the light and dark glass show over the same content.
 */
const BACKGROUNDS = [
  ['White', 'rgb(255 255 255)'],
  ['Black', 'rgb(0 0 0)'],
  ['Blue', 'rgb(45 91 255)'],
  ['Yellow', 'rgb(255 212 0)'],
  ['Green', 'rgb(26 163 100)'],
  ['Gradient', 'url(./images/card-preview.jpg) center / cover'],
  ['Painting', 'url(./images/landscape-art.jpg) 40% 70% / 900px auto'],
  ['Photo', 'url(./images/avatar-preview.png) 50% 30% / 260px auto'],
] as const;

/** Document text set behind the AI buttons in the backgrounds story. */
const DOCUMENT_TEXT =
  'The spring campaign launches in March with a hero video, three social cuts, and a new landing page. Review the brief and send your feedback by Friday, so that the team can lock the schedule.';

/** Shows a default and a disabled AI button over a background. */
const backgroundTile = (
  storyArgs: Record<string, unknown>,
  background: string,
  behind: unknown = nothing
) => html`
  <div
    style="position: relative; display: flex; gap: var(--swc-spacing-200); align-items: center; justify-content: center; box-sizing: border-box; min-inline-size: 240px; min-block-size: 120px; padding: var(--swc-spacing-300); overflow: hidden; border: 1px solid var(--swc-gray-300); border-radius: var(--swc-corner-radius-500); background: ${background};"
  >
    ${behind} ${template(storyArgs)}
    ${template({ ...storyArgs, disabled: true })}
  </div>
`;

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

export const Icons: Story = {
  render: (args) => html`
    ${ICON_EXAMPLES.map(([icon, label]) =>
      captioned(template({ ...args, icon, 'default-slot': label }), icon)
    )}
  `,
  parameters: { flexLayout: 'row-wrap' },
  tags: ['options'],
};

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

export const Backgrounds: Story = {
  render: (args) => html`
    ${(['light', 'dark'] as const).map((mode) =>
      theme(
        row(
          html`
            ${BACKGROUNDS.map(([label, background]) =>
              captioned(backgroundTile(args, background), label)
            )}
            ${captioned(
              backgroundTile(
                args,
                'transparent',
                html`
                  <p
                    class="swc-Body swc-Body--sizeXS"
                    style="position: absolute; inset: 0; margin: 0; padding: var(--swc-spacing-200);"
                  >
                    ${DOCUMENT_TEXT}
                  </p>
                `
              ),
              'Text'
            )}
          `,
          THEME_LABELS[mode]
        ),
        mode
      )
    )}
  `,
  parameters: {
    layout: 'padded',
    styles: {
      display: 'flex',
      'flex-direction': 'column',
      gap: 'var(--swc-spacing-400)',
    },
  },
  tags: ['behaviors'],
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
