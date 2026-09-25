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
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import {
  THUMBNAIL_VALID_SIZES,
  type ThumbnailFit,
  type ThumbnailSize,
} from '@adobe/spectrum-wc-core/components/thumbnail';

import '@adobe/spectrum-wc/components/thumbnail/swc-thumbnail.js';

import {
  forcedColorsVrtParameters,
  row,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

// Metadata

const meta: Meta = {
  title: 'Thumbnail/Thumbnail VRT',
  component: 'swc-thumbnail',
  tags: ['dev'],
};

export default meta;

// Helpers

const SQUARE_SRC = './images/avatar-preview.png';
const LANDSCAPE_SRC = './images/landscape-asset.jpg';
const PORTRAIT_SRC = './images/portrait-asset.jpg';

// Styles key off :host([size]) and :host([fit]), which Lit reflects.
const renderThumbnail = (
  size?: ThumbnailSize,
  src = SQUARE_SRC,
  fit?: ThumbnailFit
) => html`
  <swc-thumbnail size=${ifDefined(size)} fit=${ifDefined(fit)}>
    <img src=${src} alt="Preview" />
  </swc-thumbnail>
`;

// Sizes are unidentifiable in a snapshot without a caption.
const captioned = (content: unknown, label: string) => html`
  <div
    style="display: flex; flex-direction: column; align-items: center; gap: var(--swc-spacing-100);"
  >
    ${content}
    <span class="swc-Detail swc-Detail--sizeM">${label}</span>
  </div>
`;

const renderSizedThumbnail = (size: ThumbnailSize) =>
  captioned(renderThumbnail(size), `${size}`);

// A square source renders `cover` and `contain` identically.
const renderFitCase = (src: string, fit: ThumbnailFit, label: string) =>
  captioned(renderThumbnail(1000, src, fit), label);

const fitContent = () => html`
  ${row(
    [
      renderFitCase(LANDSCAPE_SRC, 'contain', 'landscape / contain'),
      renderFitCase(LANDSCAPE_SRC, 'cover', 'landscape / cover'),
      renderFitCase(PORTRAIT_SRC, 'contain', 'portrait / contain'),
      renderFitCase(PORTRAIT_SRC, 'cover', 'portrait / cover'),
    ],
    'Fit'
  )}
`;

// `decorative` is a11y-only. No :hover/:focus-visible/:active rules to force.
const permutationContent = () => html`
  ${row(
    [captioned(renderThumbnail(), 'no size/fit authored')],
    'Default (reflected attributes)'
  )}
  ${row(THUMBNAIL_VALID_SIZES.map(renderSizedThumbnail), 'Sizes')}
  ${fitContent()}
`;

// Large size so the checkerboard and inset border read.
const chromeContent = () => html`
  ${row([captioned(renderThumbnail(1000), 'checkerboard + border')], 'Chrome')}
`;

// VRT stories

// Both axes, one snapshot.
export const Permutations: Story = {
  render: () => html`
    ${theme(
      html`
        ${permutationContent()}${chromeContent()}
      `,
      'light',
      'ltr'
    )}
    ${theme(
      html`
        ${permutationContent()}${chromeContent()}
      `,
      'dark',
      'rtl'
    )}
  `,
  parameters: vrtParameters,
};

// thumbnail.css switches the inset border to `CanvasText` under forced-colors.
export const ForcedColors: Story = {
  render: () =>
    theme(
      html`
        ${row([captioned(renderThumbnail(1000), 'default')], 'Default')}
        ${fitContent()}
      `,
      'light',
      'ltr'
    ),
  parameters: forcedColorsVrtParameters,
};
