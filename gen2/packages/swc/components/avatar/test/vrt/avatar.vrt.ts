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

import {
  AVATAR_VALID_SIZES,
  type AvatarSize,
} from '@adobe/spectrum-wc-core/components/avatar';

import '@adobe/spectrum-wc/components/avatar/swc-avatar.js';

import {
  forcedColorsVrtParameters,
  row,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

// Metadata

const meta: Meta = {
  title: 'Avatar/Avatar VRT',
  component: 'swc-avatar',
  tags: ['dev'],
};

export default meta;

// Helpers

const PLACEHOLDER_SRC = './images/avatar-preview.png';

const renderAvatar = (size: AvatarSize) => html`
  <swc-avatar src=${PLACEHOLDER_SRC} alt="Jane Doe" size=${size}></swc-avatar>
`;

// `alt` is aria-only (no visible text), and sizes are plain numbers with no
// named s/m/l equivalent, so a visible caption is added underneath -
// otherwise a reviewer can't tell which rendered avatar corresponds to which
// size value from the snapshot alone (same reasoning as
// color-handle.vrt.ts's renderHandle and progress-circle.vrt.ts's
// renderSizedCircle captions).
const captioned = (content: unknown, label: string) => html`
  <div
    style="display: flex; flex-direction: column; align-items: center; gap: var(--swc-spacing-100);"
  >
    ${content}
    <span class="swc-Detail swc-Detail--sizeM">${label}</span>
  </div>
`;

const renderSizedAvatar = (size: AvatarSize) =>
  captioned(renderAvatar(size), `${size}`);

// Outline needs a contrasting backdrop to read, same as avatar.stories.ts's
// own Outline story: the outline color/width tokens are subtle against the
// default page background.
const renderOutline = (size: AvatarSize) => html`
  <div
    style="display: inline-flex; padding: 16px; background: linear-gradient(to right, rgb(15, 23, 42), rgb(51, 65, 85)); border-radius: 8px;"
  >
    <swc-avatar
      src=${PLACEHOLDER_SRC}
      alt="Jane Doe"
      size=${size}
      outline
    ></swc-avatar>
  </div>
`;

const renderCaptionedOutline = (size: AvatarSize) =>
  captioned(renderOutline(size), `${size}`);

const renderDisabled = () => html`
  <swc-avatar
    src=${PLACEHOLDER_SRC}
    alt="Jane Doe"
    size="500"
    disabled
  ></swc-avatar>
`;

// `decorative` is deliberately not covered anywhere in this file: it only
// toggles `aria-hidden` and produces no pixel difference, so a VRT row for
// it can never usefully diff. That behavior is covered by
// avatar.a11y.spec.ts instead. Avatar also has no interactive states (not
// focusable, no :hover/:focus/:active rules in avatar.css), so neither story
// below needs forcePseudoStates.
const permutationContent = () => html`
  ${row(AVATAR_VALID_SIZES.map(renderSizedAvatar), 'Sizes')}
  ${row([renderCaptionedOutline(500), renderCaptionedOutline(1000)], 'Outline')}
  ${row([renderDisabled()], 'Disabled')}
`;

const forcedColorsContent = () => html`
  ${row([renderAvatar(500)], 'Default')}
  ${row([renderCaptionedOutline(500), renderCaptionedOutline(1000)], 'Outline')}
  ${row([renderDisabled()], 'Disabled')}
`;

// VRT stories

// Every size (50–1500), the outline modifier at the default size and at the
// large-size breakpoint (>=1000, where the outline width doubles per
// avatar.css), and the disabled state. Rendered once in light/ltr and once
// in dark/rtl below (that combination covers both axes), all in a single
// story so it costs one snapshot.
export const Permutations: Story = {
  render: () => html`
    ${theme(permutationContent(), 'light', 'ltr')}
    ${theme(permutationContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
};

// `forced-colors` replaces the whole page palette. avatar.css has no
// component-level forced-colors override (unlike divider/button), so this
// story verifies the token-level behavior rather than a bespoke rule. A
// single representative size covers the default and disabled cases, since
// size doesn't interact with forced-colors differently; outline is still
// checked at both width breakpoints in case forced-colors affects the
// outline color independent of its width.
export const ForcedColors: Story = {
  render: () => theme(forcedColorsContent(), 'light', 'ltr'),
  parameters: forcedColorsVrtParameters,
};
