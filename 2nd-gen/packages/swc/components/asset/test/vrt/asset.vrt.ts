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

import '@adobe/spectrum-wc/components/asset/swc-asset.js';

import {
  forcedColorsVrtParameters,
  row,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

// Metadata

const meta: Meta = {
  title: 'Asset/Asset VRT',
  component: 'swc-asset',
  tags: ['dev'],
};

export default meta;

// Helpers

const LANDSCAPE_SRC = './images/landscape-asset.jpg';
const PORTRAIT_SRC = './images/portrait-asset.jpg';

const captioned = (content: unknown, label: string) => html`
  <div
    style="display: flex; flex-direction: column; align-items: center; gap: var(--swc-spacing-100);"
  >
    ${content}
    <span class="swc-Detail swc-Detail--sizeM">${label}</span>
  </div>
`;

// A square box against a wide landscape image, so `contain` visibly
// letterboxes and `background` shows through the gap. `cover` fills the box
// with no gap regardless of `background`, so only its `transparent` default
// is included; the other two values would never show through it and are
// skipped as redundant.
const renderFitBackground = (
  fit: 'cover' | 'contain',
  background: 'transparent' | 'solid' | 'checkerboard'
) => html`
  <swc-asset fit=${fit} background=${background} width="120px" height="120px">
    <img src=${LANDSCAPE_SRC} alt="Fit: ${fit}, background: ${background}" />
  </swc-asset>
`;

// `.swc-Asset` has `border-radius: inherit; overflow: hidden`, so a
// host-level `border-radius` set by ordinary consumer CSS is expected to
// clip slotted content to match.
const renderBorderRadius = () => html`
  <swc-asset width="120px" height="120px" style="border-radius: 24px;">
    <img src=${PORTRAIT_SRC} alt="Rounded corners" />
  </swc-asset>
`;

const renderAspectRatioOnly = () => html`
  <swc-asset aspect-ratio="1/1">
    <img src=${PORTRAIT_SRC} alt="Aspect ratio only" />
  </swc-asset>
`;

const renderWidthOnly = () => html`
  <swc-asset width="120px">
    <img src=${PORTRAIT_SRC} alt="Width only" />
  </swc-asset>
`;

const renderHeightOnly = () => html`
  <swc-asset height="120px">
    <img src=${PORTRAIT_SRC} alt="Height only" />
  </swc-asset>
`;

const renderAspectRatioWithWidth = () => html`
  <swc-asset aspect-ratio="3/2" width="40px">
    <img src=${PORTRAIT_SRC} alt="Aspect ratio with width" />
  </swc-asset>
`;

const renderAspectRatioWithHeight = () => html`
  <swc-asset aspect-ratio="3/2" height="80px">
    <img src=${PORTRAIT_SRC} alt="Aspect ratio with height" />
  </swc-asset>
`;

// `decorative` and `accessibleLabel` are deliberately not covered anywhere in
// this file: neither produces a pixel difference (decorative only toggles
// `aria-hidden`; accessibleLabel only sets `alt`/`aria-label` on the slotted
// node), so a VRT row for either can never usefully diff. That behavior is
// covered by asset.a11y.spec.ts and asset.test.ts instead. Asset also has no
// interactive states (not focusable, no :hover/:focus/:active rules in
// asset.css), so this file needs no forcePseudoStates.
const permutationContent = () => html`
  ${row(
    [
      captioned(
        renderFitBackground('cover', 'transparent'),
        'cover / transparent'
      ),
      captioned(
        renderFitBackground('contain', 'transparent'),
        'contain / transparent'
      ),
      captioned(renderFitBackground('contain', 'solid'), 'contain / solid'),
      captioned(
        renderFitBackground('contain', 'checkerboard'),
        'contain / checkerboard'
      ),
    ],
    'Fit / background'
  )}
  ${row(
    [captioned(renderBorderRadius(), 'border-radius: 24px')],
    'Border radius'
  )}
  ${row(
    [
      captioned(renderAspectRatioOnly(), 'aspect-ratio only'),
      captioned(renderWidthOnly(), 'width only'),
      captioned(renderHeightOnly(), 'height only'),
      captioned(renderAspectRatioWithWidth(), 'aspect-ratio + width'),
      captioned(renderAspectRatioWithHeight(), 'aspect-ratio + height'),
    ],
    'Sizing'
  )}
`;

const forcedColorsContent = () => html`
  ${row(
    [
      captioned(renderFitBackground('contain', 'solid'), 'contain / solid'),
      captioned(
        renderFitBackground('contain', 'checkerboard'),
        'contain / checkerboard'
      ),
    ],
    'Fit / background'
  )}
`;

// VRT stories

// Fit x background (only the combinations where background is actually
// visible), border-radius clipping, and the sizing-input matrix
// (aspect-ratio / width / height alone and paired). Rendered once in
// light/ltr and once in dark/rtl below, all in a single story so it costs
// one snapshot.
export const Permutations: Story = {
  render: () => html`
    ${theme(permutationContent(), 'light', 'ltr')}
    ${theme(permutationContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
};

// `forced-colors` replaces the whole page palette. asset.css has no
// component-level forced-colors override of its own (the shared
// opacity-checkerboard fragment already handles its own pattern visibility),
// so this verifies the solid-background letterbox
// still render sensibly under the browser's forced-colors palette.
export const ForcedColors: Story = {
  render: () => theme(forcedColorsContent(), 'light', 'ltr'),
  parameters: forcedColorsVrtParameters,
};
