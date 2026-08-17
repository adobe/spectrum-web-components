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
import { expect, waitFor } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import { Popover } from '@adobe/spectrum-wc/popover';
import {
  POPOVER_VALID_PLACEMENTS,
  POPOVER_VALID_SIZES,
} from '@adobe/spectrum-wc-core/components/popover';

import '@adobe/spectrum-wc/components/button/swc-button.js';
import '@adobe/spectrum-wc/components/popover/swc-popover.js';

import { theme } from '../../../../.storybook/helpers/index.js';
import {
  openManyPopoversForVrt,
  popoverForcedColorsVrtParameters,
  popoverVrtParameters,
  stack,
  type StackLayout,
  vrtPage,
} from './vrt-helpers.js';

// Metadata

const meta: Meta = {
  title: 'Popover/Popover VRT',
  component: 'swc-popover',
  tags: ['dev'],
};

export default meta;

// Helpers

const { args, template } = getStorybookHelpers('swc-popover');

const DEFAULT_SLOT_MESSAGE =
  'Your changes are saved automatically as you edit.';

const DEFAULT_ARGS = {
  'accessible-label': 'Autosave',
  'default-slot': DEFAULT_SLOT_MESSAGE,
};

// `label` names the permutation on its trigger so each case is identifiable
// in the layout; slotted content is often shared within a row, and open
// surfaces can cover or leave their trigger.
const renderPopoverPermutation = (
  permutation: Record<string, unknown>,
  id: string,
  label: string
) => html`
  <div style="display: grid; place-items: center;">
    <swc-button id=${id}>${label}</swc-button>
    ${template({ ...args, ...DEFAULT_ARGS, ...permutation, for: id })}
  </div>
`;

// Groups one base side (top/bottom/start/end) and its two alignment
// variants, since the alignment is what visibly shifts the tip along the
// trigger's edge. Flipping is disabled by `openManyPopoversForVrt` so each
// renders on its requested side deterministically. Side placements are
// viewport-sensitive; see the note at `// VRT stories`.
type PlacementBase = 'top' | 'bottom' | 'start' | 'end';

// Alignment variants only shift the tip when the surface is taller than
// the trigger (~32px). Same copy as `DEFAULT_SLOT_MESSAGE`, wrapped so it
// breaks to several lines and the offset between `-start`/`-end` is visible.
const WRAPPED_DEFAULT_SLOT = `
  <span style="display: block; max-inline-size: 160px;">
    ${DEFAULT_SLOT_MESSAGE}
  </span>
`;

const placementGroup = (base: PlacementBase, prefix: string) => {
  const placements = POPOVER_VALID_PLACEMENTS.filter(
    (placement) => placement === base || placement.startsWith(`${base}-`)
  );
  const rendered = placements.map((placement, i) =>
    renderPopoverPermutation(
      { placement, 'default-slot': WRAPPED_DEFAULT_SLOT },
      `${prefix}-placement-${base}-${i}`,
      placement
    )
  );
  const layout: StackLayout =
    base === 'top' ? 'upward' : base === 'bottom' ? 'tall' : 'default';
  return stack(rendered, base, layout);
};

// All 12 placements. Direction (LTR/RTL) only changes where `start`/`end`
// land, so only those two need re-verification under RTL — see
// `PermutationsRtl` below, which covers that without paying for a second full
// copy of `top`/`bottom` (which don't care about direction at all).
const PLACEMENT_BASES = ['start', 'end', 'top', 'bottom'] as const;

const placementRows = (prefix: string) =>
  PLACEMENT_BASES.map((base) => placementGroup(base, prefix));

// `undefined` is the fit-content default; the three fixed sizes each pin an
// inline size regardless of content.
const SIZE_CASES = [undefined, ...POPOVER_VALID_SIZES] as const;

const SIZE_LABELS = { s: 'Small', m: 'Medium', l: 'Large' } as const;

const sizeRow = (prefix: string) =>
  stack(
    SIZE_CASES.map((size, i) =>
      renderPopoverPermutation(
        { placement: 'bottom', ...(size ? { size } : {}) },
        `${prefix}-size-${i}`,
        size ? SIZE_LABELS[size] : 'Default'
      )
    ),
    'Size'
  );

const hideArrowRow = (prefix: string) =>
  stack(
    [false, true].map((hideArrow, i) =>
      renderPopoverPermutation(
        { placement: 'bottom', 'hide-arrow': hideArrow },
        `${prefix}-arrow-${i}`,
        hideArrow ? 'Hidden' : 'Shown'
      )
    ),
    'Hide arrow'
  );

// Modal mode renders a `<dialog>` instead of a `popover` div, but shares the
// same positioning and surface styles, so a couple of placements are enough
// to confirm the dialog path matches. No manual-mode flip needed here:
// `showModal()` has no exclusivity with other open dialogs.
const modalRow = (prefix: string) =>
  stack(
    (['top', 'bottom'] as const).map((placement, i) =>
      renderPopoverPermutation(
        { placement, modal: true },
        `${prefix}-modal-${i}`,
        placement
      )
    ),
    'Modal',
    'upward'
  );

// Long content overflows `.swc-Popover-content` itself (that element already
// sets `max-block-size` / `overflow: auto`), so this needs plain content
// long enough to exceed it, not a second nested scroll region — an inner
// `overflow: auto` wrapper would give a visibly distinct nested scrollbar in
// addition to the outer one. Bottom shadow bleed comes from `vrtPage`'s extra
// `padding-block-end`; capping `--swc-placement-available-height` here would
// change the scroll scenario under test.
const scrollableContent = `
  <div style="display: flex; flex-direction: column; gap: 8px; max-inline-size: 220px;">
    <span class="swc-Title swc-Title--sizeS">Release notes</span>
    <p class="swc-Body swc-Body--sizeS" style="margin: 0;">
      <strong>2.4.0</strong> — Popover gained a modal mode, logical
      placements, and a configurable arrow.
    </p>
    <p class="swc-Body swc-Body--sizeS" style="margin: 0;">
      <strong>2.3.0</strong> — Focus now returns to the trigger on close, and
      nested popovers dismiss one layer at a time.
    </p>
    <p class="swc-Body swc-Body--sizeS" style="margin: 0;">
      <strong>2.2.0</strong> — Added the <code>size</code> attribute and
      public styling custom properties.
    </p>
    <p class="swc-Body swc-Body--sizeS" style="margin: 0;">
      <strong>2.1.0</strong> — Introduced the virtual-anchor positioning
      option.
    </p>
  </div>
`;

const overflowRow = (prefix: string) =>
  stack(
    [
      renderPopoverPermutation(
        { placement: 'bottom', size: 's', 'default-slot': scrollableContent },
        `${prefix}-overflow-0`,
        'Long content'
      ),
    ],
    'Content overflow'
  );

const permutationContent = (prefix: string) =>
  vrtPage(html`
    ${placementRows(prefix)} ${sizeRow(prefix)} ${hideArrowRow(prefix)}
    ${modalRow(prefix)} ${overflowRow(prefix)}
  `);

// VRT stories
//
// `Permutations` is the light/ltr matrix. Dark hide-arrow smoke lives on
// `PermutationsRtl` instead of appended here: the overflow row's open surface
// is tall and sits in the top layer, which covered the dark block when both
// were on one page.
//
// `start`/`end` side placements are viewport-sensitive: floating-ui's `shift`
// middleware clamps cross-axis position on scroll, and for side placements
// that axis is vertical. Keep them first in a story — see `PermutationsRtl`.

export const Permutations: Story = {
  render: () => theme(permutationContent('permutations'), 'light', 'ltr'),
  parameters: popoverVrtParameters,
  play: openManyPopoversForVrt,
};

// RTL start/end and dark hide-arrow smoke; must lead the page.
export const PermutationsRtl: Story = {
  render: () =>
    theme(
      html`
        <div
          style="display: flex; flex-direction: column; align-items: center;"
        >
          ${vrtPage(html`
            ${(['start', 'end'] as const).map((base) =>
              placementGroup(base, 'permutations-rtl')
            )}
            ${hideArrowRow('permutations-rtl')}
          `)}
        </div>
      `,
      'dark',
      'rtl'
    ),
  parameters: popoverVrtParameters,
  play: openManyPopoversForVrt,
};
PermutationsRtl.storyName = 'Permutations (RTL)';

// `forced-colors` replaces the whole page palette, so it needs its own
// story/snapshot (same reasoning as button.vrt.ts's ForcedColors). Covers a
// representative subset: the 4 base placements, arrow visibility, and modal,
// enough to confirm the `@media (forced-colors: active)` rule's
// `border-color: CanvasText` reaches both the surface and the tip.
export const ForcedColors: Story = {
  render: () =>
    theme(
      vrtPage(html`
        ${placementRows('forced')} ${hideArrowRow('forced')}
        ${modalRow('forced')}
      `),
      'light',
      'ltr'
    ),
  parameters: popoverForcedColorsVrtParameters,
  play: openManyPopoversForVrt,
};

// Nested popovers (inner opened from inside the outer) form an ancestor
// chain, which the native auto-popover algorithm exempts from light-dismiss,
// so no manual-mode flip is needed. Uses its own open sequence instead of
// `openManyPopoversForVrt`: the inner trigger is slotted inside the outer's
// surface, so its on-screen rect is wrong until the outer has actually
// anchored — opening inner before that settles would position it against the
// outer's pre-anchor origin.
export const Nested: Story = {
  render: () => html`
    <div
      style="display: grid; place-items: center; min-block-size: 360px; padding: 96px 128px;"
    >
      <swc-button id="nested-outer-trigger">Open outer</swc-button>
      <swc-popover
        id="nested-outer"
        for="nested-outer-trigger"
        accessible-label="Outer"
      >
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <p class="swc-Body swc-Body--sizeS" style="margin: 0;">
            Outer popover
          </p>
          <swc-button id="nested-inner-trigger" size="s">Open inner</swc-button>
          <swc-popover
            id="nested-inner"
            for="nested-inner-trigger"
            placement="end"
            accessible-label="Inner"
          >
            Inner popover
          </swc-popover>
        </div>
      </swc-popover>
    </div>
  `,
  play: async ({ canvasElement }) => {
    const outer = canvasElement.querySelector('#nested-outer') as Popover;
    const inner = canvasElement.querySelector('#nested-inner') as Popover;
    await outer.updateComplete;
    outer.open = true;
    await waitFor(() =>
      expect(outer.hasAttribute('actual-placement'), 'outer anchored').toBe(
        true
      )
    );
    inner.open = true;
    await waitFor(() =>
      expect(inner.hasAttribute('actual-placement'), 'inner anchored').toBe(
        true
      )
    );
  },
  parameters: popoverVrtParameters,
};
