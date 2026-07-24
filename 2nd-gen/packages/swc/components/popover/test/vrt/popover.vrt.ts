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

import {
  POPOVER_VALID_PLACEMENTS,
  POPOVER_VALID_SIZES,
} from '@adobe/spectrum-wc-core/components/popover';

import '@adobe/spectrum-wc/components/button/swc-button.js';
import '@adobe/spectrum-wc/components/popover/swc-popover.js';

import {
  forcedColorsVrtParameters,
  forceManualPopover,
  row,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

const meta: Meta = {
  title: 'Popover/Popover VRT',
  component: 'swc-popover',
  tags: ['dev'],
};

export default meta;

// PlacementController positions the popover relative to a real trigger,
// resolved via `for="id"` (same contract as Tooltip). Each call needs a
// globally unique id: `permutationContent()` runs twice per story (once per
// theme() block), so a bare per-row counter would collide between the
// light/ltr and dark/rtl copies sharing one document. The centered,
// padded wrapper gives every placement room to render without flipping.
const popover = (
  id: string,
  {
    placement = 'bottom',
    size,
    hideArrow = false,
    modal = false,
    accessibleLabel = 'Autosave',
    content = 'Your changes are saved automatically as you edit.',
  }: {
    placement?: (typeof POPOVER_VALID_PLACEMENTS)[number];
    size?: (typeof POPOVER_VALID_SIZES)[number];
    hideArrow?: boolean;
    modal?: boolean;
    accessibleLabel?: string;
    content?: string;
  }
) => html`
  <div
    style="display: grid; place-items: center; min-block-size: 280px; padding: 64px;"
  >
    <swc-button id=${id} size="s">Trigger</swc-button>
    <swc-popover
      open
      for=${id}
      placement=${placement}
      size=${size ?? nothing}
      ?hide-arrow=${hideArrow}
      ?modal=${modal}
      accessible-label=${accessibleLabel}
    >
      ${content}
    </swc-popover>
  </div>
`;

const permutationContent = (idPrefix: string) => html`
  ${row(
    POPOVER_VALID_SIZES.map((size) =>
      popover(`${idPrefix}-size-${size}`, { size, content: `Size ${size}` })
    ),
    'Sizes'
  )}
  ${POPOVER_VALID_PLACEMENTS.map(
    (placement) => html`
      ${row(
        [popover(`${idPrefix}-placement-${placement}`, { placement })],
        placement
      )}
    `
  )}
  ${row(
    [
      popover(`${idPrefix}-hide-arrow-shown`, { content: 'Arrow shown' }),
      popover(`${idPrefix}-hide-arrow-hidden`, {
        hideArrow: true,
        content: 'Arrow hidden',
      }),
    ],
    'Hide arrow'
  )}
`;

// Every popover above renders `open`, but its default (non-modal) mode uses
// native `popover="auto"` internally, which only permits one open instance
// page-wide: each one that connects light-dismisses the previously-open
// one. Forcing `popover="manual"` (VRT-only; not how Popover behaves in
// production) on the internal shadow element — not the host, unlike
// Tooltip — lets every size, placement, and arrow variant stay open
// simultaneously. Scoped to `:not([modal])`: a modal popover's internal
// element is a `<dialog>`, not a `popover="auto"` div, and does not
// participate in this dismissal group. See `forceManualPopover` in
// `.storybook/helpers/vrt.ts`.
const forceOpenPopovers = forceManualPopover(
  'swc-popover:not([modal])',
  (host) => host.shadowRoot?.querySelector('.swc-Popover') ?? null
);

export const Permutations: Story = {
  render: () => html`
    ${theme(permutationContent('light'), 'light', 'ltr')}
    ${theme(permutationContent('dark'), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
  play: forceOpenPopovers,
};

export const ForcedColors: Story = {
  render: () => theme(permutationContent('forced'), 'light', 'ltr'),
  parameters: forcedColorsVrtParameters,
  play: forceOpenPopovers,
};

// Modal mode renders a native `<dialog>` opened via `showModal()`, a
// separate top-layer mechanism from `popover="auto"`/`"manual"`: it applies
// its own `::backdrop` covering the full viewport. Kept in its own story
// (not folded into Permutations) so that backdrop does not dim every other
// row's snapshot; a single modal instance never collides with anything, so
// it needs no `forceManualPopover` play function.
export const Modal: Story = {
  render: () =>
    theme(
      row(
        [
          popover('modal', {
            modal: true,
            accessibleLabel: 'Delete file',
            content:
              'Are you sure you want to delete this file? This action cannot be undone.',
          }),
        ],
        'Modal'
      ),
      'light',
      'ltr'
    ),
  parameters: vrtParameters,
};
