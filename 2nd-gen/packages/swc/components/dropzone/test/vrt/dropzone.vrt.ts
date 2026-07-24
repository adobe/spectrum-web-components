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
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import { DROPZONE_VALID_SIZES } from '@adobe/spectrum-wc-core/components/dropzone';

import '@adobe/spectrum-wc/components/button/swc-button.js';
import '@adobe/spectrum-wc/components/dropzone/swc-dropzone.js';
import '@adobe/spectrum-wc/components/illustrated-message/swc-illustrated-message.js';

import {
  forcedColorsVrtParameters,
  row,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';
import { DROPZONE_SVG } from './shared.js';

// Metadata

const meta: Meta = {
  title: 'Drop Zone/Drop Zone VRT',
  component: 'swc-dropzone',
  tags: ['dev'],
};

export default meta;

// Helpers

const sizeLabels = {
  s: 'Small',
  m: 'Medium',
  l: 'Large',
} as const;

type DropzoneCase = {
  size?: (typeof DROPZONE_VALID_SIZES)[number];
  dragged?: boolean;
  filled?: boolean;
  ariaLabel: string;
  focusTarget?: boolean;
};

const renderDropzone = ({
  size = 'm',
  dragged = false,
  filled = false,
  ariaLabel,
  focusTarget = false,
}: DropzoneCase) => {
  const filledContent = filled
    ? dragged
      ? html`
          <p>Drop file to replace</p>
        `
      : html`
          <span>report-q4.pdf uploaded</span>
          <swc-button size="s" variant="secondary">Replace file</swc-button>
        `
    : null;

  return html`
    <swc-dropzone
      size=${size}
      aria-label=${ariaLabel}
      ?dragged=${dragged}
      ?filled=${filled}
      ?data-focus-target=${focusTarget}
      style="min-inline-size: 220px;"
    >
      <swc-illustrated-message>
        ${unsafeHTML(DROPZONE_SVG)}
        <h2 slot="heading">Drag and drop your file</h2>
        <span slot="description">Or, select a file from your computer</span>
        <swc-button slot="actions" variant="accent">Browse files</swc-button>
      </swc-illustrated-message>
      ${filled
        ? html`
            <div
              slot="filled-content"
              style="display: flex; align-items: center; gap: 8px;"
            >
              ${filledContent}
            </div>
          `
        : null}
    </swc-dropzone>
  `;
};

// Real keyboard focus (not a synthetic pseudo-state mirror): entering focus
// on the browse control is what triggers `:host(:focus-within)`, so a `play`
// function drives it directly with `.focus()` rather than going through
// `forcePseudoStates` (that helper exists for :hover/:active, which have no
// real synthetic trigger in a static capture; focus-within has one).
//
// Only one element in a document can hold focus at a time, so the
// "Focus-within" row is rendered in the light/ltr theme only (see
// `permutationContent`'s `includeFocusRow` flag below); duplicating it into
// the dark/rtl theme as well would leave one copy permanently unfocused
// regardless of which element this queries, since `:host(:focus-within)`'s
// accent-border treatment doesn't vary by theme anyway.
const focusBrowseButton = async ({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}) => {
  const button = canvasElement.querySelector<HTMLElement>(
    'swc-dropzone[data-focus-target] swc-button'
  );
  button?.focus();
};

const permutationContent = (includeFocusRow: boolean) => html`
  ${row(
    DROPZONE_VALID_SIZES.map((size) =>
      renderDropzone({ size, ariaLabel: `${sizeLabels[size]} drop zone` })
    ),
    'Default'
  )}
  ${row(
    DROPZONE_VALID_SIZES.map((size) =>
      renderDropzone({
        size,
        dragged: true,
        ariaLabel: `${sizeLabels[size]} dragged drop zone`,
      })
    ),
    'Dragged'
  )}
  ${includeFocusRow
    ? row(
        [
          renderDropzone({
            ariaLabel: 'Keyboard-focused drop zone',
            focusTarget: true,
          }),
        ],
        'Focus-within (keyboard, no drag)'
      )
    : null}
  ${row(
    [
      renderDropzone({
        filled: true,
        ariaLabel: 'Filled drop zone',
      }),
    ],
    'Filled'
  )}
  ${row(
    [
      renderDropzone({
        filled: true,
        dragged: true,
        ariaLabel: 'Filled and dragged drop zone',
      }),
    ],
    'Filled + dragged (replace)'
  )}
`;

// VRT stories

// Every size (s/m/l) in the default and dragged states, a real keyboard-focus
// capture confirming `:focus-within` renders the same accent stroke as
// `[dragged]` without the attribute being set, and the filled / filled+dragged
// states (medium size only; spectrum-two fixes the filled content area to a
// constant height regardless of size, so additional sizes there would be
// redundant). Rendered once in light/ltr and once in dark/rtl, both in a
// single story so it costs one snapshot. The focus-within row is included
// only in the light/ltr pass; see `focusBrowseButton`'s comment above.
export const Permutations: Story = {
  render: () => html`
    ${theme(permutationContent(true), 'light', 'ltr')}
    ${theme(permutationContent(false), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
  play: focusBrowseButton,
};

// `forced-colors` replaces the whole page palette, so, like the real-focus
// capture above, it needs its own story rather than folding into
// Permutations. Default and dragged states are enough to confirm the SVG
// stroke and background swap to their forced-colors equivalents (ButtonText/
// Highlight/Canvas); size and the filled states don't interact with
// forced-colors mode differently, so they're not repeated here.
export const ForcedColors: Story = {
  render: () => html`
    ${row([renderDropzone({ ariaLabel: 'Drop zone' })], 'Default')}
    ${row(
      [renderDropzone({ dragged: true, ariaLabel: 'Dragged drop zone' })],
      'Dragged'
    )}
  `,
  parameters: forcedColorsVrtParameters,
};
