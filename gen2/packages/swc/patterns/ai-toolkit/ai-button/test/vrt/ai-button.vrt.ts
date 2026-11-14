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

import '../../swc-ai-button.js';

import type { ForcedPseudoState } from '../../../../../.storybook/helpers/index.js';
import {
  captioned,
  createPermutations,
  FORCED_STATES,
  forcedColorsVrtParameters,
  forcePseudoStates,
  row,
  theme,
  vrtParameters,
} from '../../../../../.storybook/helpers/index.js';
import {
  AI_BUTTON_ICONS,
  AI_BUTTON_VALID_SIZES,
  type AiButton,
  type AiButtonIcon,
  type AiButtonSize,
} from '../../AiButton.js';

// Metadata

const meta: Meta = {
  title: 'AI Toolkit/AI button/AI button VRT',
  component: 'swc-ai-button',
  tags: ['dev'],
};

export default meta;

// Helpers

type AiButtonCase = {
  size?: AiButtonSize;
  iconOnly?: boolean;
  icon?: AiButtonIcon;
  label?: string;
  disabled?: boolean;
  forceState?: ForcedPseudoState;
  lang?: string;
};

// Icon-only buttons render with no child content, so they have no label.
const renderAiButton = ({
  size = 'm',
  iconOnly = false,
  icon,
  label = 'Ask AI',
  disabled = false,
  forceState,
  lang,
}: AiButtonCase) =>
  iconOnly
    ? html`
        <swc-ai-button
          size=${size}
          icon=${icon ?? nothing}
          accessible-label=${label}
          ?disabled=${disabled}
          data-force-state=${forceState ?? nothing}
        ></swc-ai-button>
      `
    : html`
        <swc-ai-button
          size=${size}
          icon=${icon ?? nothing}
          ?disabled=${disabled}
          data-force-state=${forceState ?? nothing}
          lang=${lang ?? nothing}
        >
          ${label}
        </swc-ai-button>
      `;

// Every size, with and without a label. The glow's size and position change
// with both.
const SIZE_CASES = createPermutations([
  { iconOnly: [false, true], size: AI_BUTTON_VALID_SIZES },
]);

/** A five-point star that no `icon` value draws, for the `icon` slot. */
const STAR_POINTS =
  '10,1.41 12.13,7.97 19.04,7.97 13.45,12.03 15.58,18.59 10,14.54 4.42,18.59 6.55,12.03 0.96,7.97 7.87,7.97';

// `icon="ai-search"` shows that the slotted star replaces the icon attribute.
const renderSlottedIcon = (size: AiButtonSize) => html`
  <swc-ai-button size=${size} icon="ai-search">
    <svg slot="icon" viewBox="0 0 20 20">
      <polygon points=${STAR_POINTS}></polygon>
    </svg>
    Ask AI
  </swc-ai-button>
`;

const CJK_LABELS = [
  ['ja', 'AIに質問'],
  ['ko', 'AI에게 질문'],
  ['zh', '询问 AI'],
] as const;

// The glass blurs and tints whatever is behind it, so the backdrops are flat
// colors, a detailed painting, and text.
const BACKDROPS = [
  ['Black', 'rgb(0 0 0)'],
  ['Blue', 'rgb(45 91 255)'],
  ['Painting', 'url(images/landscape-art.jpg) 40% 70% / 900px auto'],
] as const;

const DOCUMENT_TEXT =
  'The spring campaign launches in March with a hero video, three social cuts, and a new landing page. Review the brief and send your feedback by Friday.';

/** A default and a disabled AI button over a backdrop. */
const backdropTile = (background: string, behind: unknown = nothing) => html`
  <div
    style="position: relative; display: flex; gap: var(--swc-spacing-200); align-items: center; justify-content: center; box-sizing: border-box; inline-size: 240px; block-size: 96px; padding: var(--swc-spacing-300); overflow: hidden; border-radius: var(--swc-corner-radius-500); background: ${background};"
  >
    ${behind} ${renderAiButton({})} ${renderAiButton({ disabled: true })}
  </div>
`;

// The hover, focus, and press styles are on the internal `.swc-AiButton`, so
// force the states there once each button has rendered it.
const forceAiButtonStates = async ({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}) => {
  await Promise.all(
    [...canvasElement.querySelectorAll<AiButton>('swc-ai-button')].map(
      (el) => el.updateComplete
    )
  );
  await forcePseudoStates(
    'swc-ai-button[data-force-state]',
    '.swc-AiButton'
  )({ canvasElement });
};

const permutationContent = () => html`
  ${row(
    SIZE_CASES.filter(({ iconOnly }) => !iconOnly).map(renderAiButton),
    'Icon and label'
  )}
  ${row(
    SIZE_CASES.filter(({ iconOnly }) => iconOnly).map(renderAiButton),
    'Icon only'
  )}
  ${row(
    SIZE_CASES.map((testCase) =>
      renderAiButton({ ...testCase, disabled: true })
    ),
    'Disabled'
  )}
  ${FORCED_STATES.map((state) =>
    row(
      SIZE_CASES.map((testCase) =>
        renderAiButton({ ...testCase, forceState: state })
      ),
      state
    )
  )}
  ${row(
    AI_BUTTON_ICONS.map((icon) => captioned(renderAiButton({ icon }), icon)),
    'Icons'
  )}
  ${row(AI_BUTTON_VALID_SIZES.map(renderSlottedIcon), 'Icon slot')}
  ${row(
    [
      renderAiButton({ label: 'AI' }),
      renderAiButton({ label: 'Summarize this document with AI' }),
    ],
    'Label length'
  )}
  ${row(
    CJK_LABELS.map(([lang, label]) => renderAiButton({ lang, label })),
    'CJK language'
  )}
  ${row(
    [
      ...BACKDROPS.map(([label, background]) =>
        captioned(backdropTile(background), label)
      ),
      captioned(
        backdropTile(
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
      ),
    ],
    'Backdrops'
  )}
`;

// VRT stories

// Every size with and without a label, disabled, forced hover/focus-visible/
// active, the 8 AI icons, a custom icon in the `icon` slot, short and long
// labels, CJK labels, and the glass over flat colors, a painting, and text.
// Rendered once in light/ltr and once in dark/rtl (that pair covers both
// axes, including the glow's RTL mirroring), all in a single story so it
// costs one snapshot.
export const Permutations: Story = {
  render: () => html`
    ${theme(permutationContent(), 'light', 'ltr')}
    ${theme(permutationContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
  play: forceAiButtonStates,
};

// `forced-colors` replaces the whole page palette, so it can't be scoped to a
// subtree the way theme()'s light/dark split is, and needs its own snapshot.
// Forced colors hide the glass and draw a border, which turns `Highlight` on
// hover and `GrayText` when disabled.
export const ForcedColors: Story = {
  render: () => theme(permutationContent(), 'light', 'ltr'),
  parameters: forcedColorsVrtParameters,
  play: forceAiButtonStates,
};
