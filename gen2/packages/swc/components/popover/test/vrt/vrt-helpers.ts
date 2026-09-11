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
import { expect, waitFor } from '@storybook/test';
import type { StoryObj as Story } from '@storybook/web-components';

import { Popover } from '@adobe/spectrum-wc/popover';

import {
  forcedColorsVrtParameters,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

// `.swc-Popover` paints `filter: drop-shadow` outside its border box; pad VRT
// canvases so Chromatic does not crop the halo at story edges. Inline bleed is
// larger because open surfaces (especially size `l` and side placements) paint
// in the top layer and do not expand their ancestor's in-flow width.
export const SURFACE_SHADOW_BLEED = 24;
export const INLINE_SHADOW_BLEED = 48;

// Wide enough for side `start`/`end` alignment variants and size `l` (576px)
// surfaces centered on a trigger with inline shadow bleed on both sides.
export const VRT_MIN_INLINE_SIZE = 900;

// Open bottom surfaces sit in the top layer and do not expand their ancestor's
// box, so reserve in-flow space below the last bottom-opening row for `theme()`
// backgrounds and snapshot bleed. Internal scroll sizing is unchanged.
export const BOTTOM_SURFACE_RESERVE = 72;

const popoverCanvasPadding = `padding-block: ${SURFACE_SHADOW_BLEED}px; padding-block-end: ${SURFACE_SHADOW_BLEED + BOTTOM_SURFACE_RESERVE}px; padding-inline: ${INLINE_SHADOW_BLEED}px;`;

export const popoverVrtParameters = {
  ...vrtParameters,
  styles: {
    ...vrtParameters.styles,
    paddingBlock: `${SURFACE_SHADOW_BLEED}px`,
    paddingBlockEnd: `${SURFACE_SHADOW_BLEED + BOTTOM_SURFACE_RESERVE}px`,
    paddingInline: `${INLINE_SHADOW_BLEED}px`,
  },
};

export const popoverForcedColorsVrtParameters = {
  ...popoverVrtParameters,
  chromatic: forcedColorsVrtParameters.chromatic,
};

// Open popovers escape into the top layer, so spacing keeps adjacent
// surfaces from overlapping. GROUP_GAP separates labeled rows on a page;
// PROPERTY_GROUP_GAP separates custom-property groups; PAIR_GAP separates
// side-by-side reference/override pairs. Item gaps separate triggers within
// a stack row. `tall` fits multi-line bottom surfaces; `upward` adds label
// clearance when the first item opens toward its heading.
export const GROUP_GAP = 96;
export const PROPERTY_GROUP_GAP = 140;
export const PAIR_GAP = 320;
const ITEM_GAP = 64;
const TALL_ITEM_GAP = 96;
const UPWARD_LABEL_GAP = 64;

export type StackLayout = 'default' | 'tall' | 'upward';

const STACK_GAPS: Record<StackLayout, { itemGap: number; labelGap: number }> = {
  default: { itemGap: ITEM_GAP, labelGap: 8 },
  tall: { itemGap: TALL_ITEM_GAP, labelGap: 8 },
  upward: { itemGap: TALL_ITEM_GAP, labelGap: UPWARD_LABEL_GAP },
};

export const stack = (
  children: readonly unknown[],
  label?: string,
  layout: StackLayout = 'default'
) => {
  const { itemGap, labelGap } = STACK_GAPS[layout];
  return html`
    <div style="display: flex; flex-direction: column; gap: ${labelGap}px;">
      ${label
        ? html`
            <span class="swc-Detail swc-Detail--sizeM">${label}</span>
          `
        : nothing}
      <div style="display: flex; flex-direction: column; gap: ${itemGap}px;">
        ${children}
      </div>
    </div>
  `;
};

export const vrtPage = (
  children: unknown,
  groupGap = GROUP_GAP,
  minInlineSize = VRT_MIN_INLINE_SIZE
) => html`
  <div
    style="display: flex; flex-direction: column; gap: ${groupGap}px; min-inline-size: ${minInlineSize}px; ${popoverCanvasPadding}"
  >
    ${children}
  </div>
`;

export const propertyCompareRow = (
  label: string,
  reference: unknown,
  override: unknown
) => html`
  <div
    style="display: flex; flex-direction: column; gap: var(--swc-spacing-100);"
  >
    <span class="swc-Detail swc-Detail--sizeM">${label}</span>
    <div style="display: flex; gap: ${PAIR_GAP}px; justify-content: center;">
      ${reference} ${override}
    </div>
  </div>
`;

// Native `popover="auto"` light-dismisses every other open auto popover, so
// only one can be open at a time in a real page. Flipping each non-modal
// instance's internal surface to `popover="manual"` before opening it skips
// that step, letting a whole permutation matrix render open in one snapshot;
// `<dialog>` (modal mode) has no such exclusivity and needs no flip. This is
// a VRT-only hack: it only matters for visual fidelity, never for actual
// popover behavior.
export const openManyPopoversForVrt: NonNullable<Story['play']> = async ({
  canvasElement,
}) => {
  const popovers = [...canvasElement.querySelectorAll<Popover>('swc-popover')];
  await Promise.all(popovers.map((popover) => popover.updateComplete));
  popovers.forEach((popover) => {
    // Force via the property, not the `should-flip` attribute: `template()`
    // serializes boolean args as a plain attribute string, and HTML boolean
    // attributes are presence-based, so `should-flip="false"` still reads as
    // true. A real flip (driven by viewport space, not the requested
    // placement) would make the snapshot depend on layout rather than the
    // axis under test.
    popover.shouldFlip = false;
    if (popover.modal) {
      return;
    }
    popover.shadowRoot
      ?.querySelector('.swc-Popover')
      ?.setAttribute('popover', 'manual');
  });
  popovers.forEach((popover) => {
    popover.open = true;
  });
  await Promise.all(
    popovers.map((popover) =>
      waitFor(() => expect(popover.hasAttribute('actual-placement')).toBe(true))
    )
  );
  // Every open `modal` instance locks page scroll for the (correct) real
  // lifecycle reason: a modal dialog should block the page behind it. Several
  // opened at once for a snapshot means that lock never releases while the
  // story is mounted, which only matters for a human scrolling through this
  // dev-only page; Chromatic captures the full rendered height without
  // scrolling, so overriding it back is safe here and nowhere else.
  document.documentElement.style.overflow = '';
};
