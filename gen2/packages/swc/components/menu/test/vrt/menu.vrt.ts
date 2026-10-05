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
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import { Menu } from '@adobe/spectrum-wc/menu';
import { MENU_PLACEMENTS } from '@adobe/spectrum-wc-core/components/menu';

import '@adobe/spectrum-wc/components/button/swc-button.js';
import '@adobe/spectrum-wc/components/menu/swc-menu.js';

import {
  forcedColorsVrtParameters,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

// Metadata

const meta: Meta = {
  title: 'Menu/Menu VRT',
  component: 'swc-menu',
  tags: ['dev'],
};

export default meta;

// Helpers
//
// `size` is deliberately not an axis here. `menu.css` has no size-dependent
// rules; `size` only forwards to `swc-menu-item`, which has not shipped, so
// a size row would render four identical surfaces. Add it with the row
// component that actually styles against it.
//
// `prefers-reduced-motion` is likewise skipped: it only zeroes the entry
// transition, and a settled open menu looks the same either way in a still
// capture.

// Open surfaces sit in the top layer and do not expand their ancestor's
// box, so rows need generous in-flow spacing to keep adjacent menus from
// overlapping in the snapshot.
//
// Groups lay their items out *horizontally*. Stacking them vertically
// pushed later triggers below the initial viewport, and floating-ui's
// `shift` then clamped every side-placed surface onto the same visible
// band: `left-bottom`, `right-top` and `right-bottom` all landed at the
// same y and overlapped. A horizontal row keeps every trigger on screen,
// which is what the side placements need to resolve honestly.
const GROUP_GAP = 152;
const ITEM_GAP = 120;
const WIDE_ROW_GAP = 360;
const SHADOW_BLEED = 24;
const VRT_MIN_INLINE_SIZE = 900;

const menuVrtParameters = {
  ...vrtParameters,
  styles: {
    ...vrtParameters.styles,
    paddingBlock: `${SHADOW_BLEED}px`,
    paddingBlockEnd: `${SHADOW_BLEED + 220}px`,
    paddingInline: `${SHADOW_BLEED * 2}px`,
  },
};

const menuForcedColorsVrtParameters = {
  ...menuVrtParameters,
  chromatic: forcedColorsVrtParameters.chromatic,
};

const DEFAULT_ROWS = html`
  <swc-menu-item role="menuitem">Cut</swc-menu-item>
  <swc-menu-item role="menuitem">Copy</swc-menu-item>
  <swc-menu-item role="menuitem">Paste</swc-menu-item>
`;

// The trigger carries the permutation's name: an open surface can cover or
// sit beside its trigger, so labelling the trigger keeps every case
// identifiable in a Chromatic diff.
const renderMenu = (
  placement: string,
  id: string,
  rows: unknown = DEFAULT_ROWS
) => html`
  <div style="display: grid; place-items: center;">
    <swc-button id=${id}>${placement}</swc-button>
    <swc-menu for=${id} placement=${placement}>${rows}</swc-menu>
  </div>
`;

const row = (
  children: readonly unknown[],
  label?: string,
  gap: number = ITEM_GAP
) => html`
  <div style="display: flex; flex-direction: column; gap: 8px;">
    ${label
      ? html`
          <span class="swc-Detail swc-Detail--sizeM">${label}</span>
        `
      : nothing}
    <div
      style="display: flex; gap: ${gap}px; justify-content: center; align-items: center;"
    >
      ${children}
    </div>
  </div>
`;

const vrtPage = (children: unknown) => html`
  <div
    style="display: flex; flex-direction: column; gap: ${GROUP_GAP}px; min-inline-size: ${VRT_MIN_INLINE_SIZE}px;"
  >
    ${children}
  </div>
`;

// One group per base side, each holding its two alignment variants. The
// alignment is what shifts the surface along the trigger's edge, so pairing
// them makes that offset the obvious difference within a row.
type PlacementBase = 'start' | 'end' | 'left' | 'right' | 'top' | 'bottom';

// Side placements first: floating-ui's `shift` clamps the cross axis against
// the visual viewport, and for side placements that axis is vertical, so they
// are the ones that drift if pushed down a long page. See the VRT testing
// guide's "Positioned overlay components" section.
const PLACEMENT_BASES = [
  'start',
  'end',
  'left',
  'right',
  'top',
  'bottom',
] as const satisfies readonly PlacementBase[];

const placementGroup = (base: PlacementBase, prefix: string) => {
  const placements = MENU_PLACEMENTS.filter((placement) =>
    placement.startsWith(`${base}-`)
  );
  return row(
    placements.map((placement, i) =>
      renderMenu(placement, `${prefix}-${base}-${i}`)
    ),
    base
  );
};

const placementRows = (prefix: string) =>
  PLACEMENT_BASES.map((base) => placementGroup(base, prefix));

// `.swc-Menu` caps inline size at 320px and block size at 90vb with
// `overflow: auto`. The long label has to be long enough to actually wrap
// against that inline cap; a label that merely looks long still fits on one
// line and proves nothing. The block cap is viewport-relative, so the long
// list demonstrates list rendering rather than guaranteeing a scrollbar at
// every capture height.
const LONG_LABEL_ROWS = html`
  <swc-menu-item role="menuitem">
    Export the current selection as a flattened layered composite file with
    embedded colour profiles
  </swc-menu-item>
  <swc-menu-item role="menuitem">Copy</swc-menu-item>
`;

const MANY_ROWS = html`
  ${[
    'Cut',
    'Copy',
    'Paste',
    'Paste special',
    'Duplicate',
    'Delete',
    'Select all',
    'Deselect',
    'Invert selection',
    'Group',
    'Ungroup',
    'Lock',
    'Unlock',
    'Bring forward',
    'Send backward',
  ].map(
    (label) => html`
      <swc-menu-item role="menuitem">${label}</swc-menu-item>
    `
  )}
`;

// Lives in its own story rather than appended to the placement page: the
// tall case needs real space below its trigger. PlacementController feeds
// the remaining viewport height into `--swc-placement-available-height`, and
// `.swc-Menu` caps `max-block-size` against it, so the same markup at the
// bottom of a long page collapsed to ~100px instead of showing the scroll.
const overflowRow = (prefix: string) =>
  row(
    [
      renderMenu('bottom-start', `${prefix}-overflow-wide`, LONG_LABEL_ROWS),
      renderMenu('bottom-start', `${prefix}-overflow-tall`, MANY_ROWS),
    ],
    'Content overflow (inline cap, long list)',
    // `bottom-start` left-aligns each surface to its trigger, so the
    // inline-capped (320px) case needs more than its own width of clearance
    // before the next trigger or the two surfaces overlap.
    WIDE_ROW_GAP
  );

// Native `popover="auto"` light-dismisses every other open auto popover, so
// only one menu could be open at a time in a real page. Flipping each
// shadow-internal surface to `popover="manual"` before opening lets the whole
// matrix render open in one snapshot. VRT-only: it changes nothing about how
// the component behaves for consumers.
const openManyMenusForVrt: NonNullable<Story['play']> = async ({
  canvasElement,
}) => {
  const menus = [...canvasElement.querySelectorAll<Menu>('swc-menu')];
  await Promise.all(menus.map((menu) => menu.updateComplete));
  menus.forEach((menu) => {
    // Set the property, not the attribute: `should-flip` is a presence-based
    // boolean, so `should-flip="false"` still reads as true. A real flip
    // would make the snapshot depend on viewport space rather than the
    // placement under test.
    menu.shouldFlip = false;
    menu.shadowRoot
      ?.querySelector('.swc-Menu')
      ?.setAttribute('popover', 'manual');
  });
  menus.forEach((menu) => {
    menu.open = true;
  });
  // `actual-placement` lands only after PlacementController's async compute;
  // `menu.css` gates `opacity` on it, so capturing earlier would snapshot
  // invisible surfaces.
  await Promise.all(
    menus.map((menu) =>
      waitFor(() => expect(menu.hasAttribute('actual-placement')).toBe(true))
    )
  );
  // Every open menu moves focus to its own first row, so with a matrix open
  // at once the winner of that race is arbitrary and would park a focus ring
  // on a different item between runs. Dropping focus keeps the snapshot
  // deterministic.
  (document.activeElement as HTMLElement | null)?.blur();
};

// VRT stories

export const Permutations: Story = {
  render: () =>
    theme(
      vrtPage(html`
        ${placementRows('permutations')}
      `),
      'light',
      'ltr'
    ),
  parameters: menuVrtParameters,
  play: openManyMenusForVrt,
};

export const ContentOverflow: Story = {
  render: () => theme(vrtPage(overflowRow('overflow')), 'light', 'ltr'),
  parameters: menuVrtParameters,
  play: openManyMenusForVrt,
};
ContentOverflow.storyName = 'Content overflow';

// `start`/`end` resolve against writing direction, and `menu.css` has
// direction-specific entry-transform rules for them
// (`:host([placement^="end"]:dir(rtl))`). Running every base here, not just
// the logical ones, confirms the physical sides stay put rather than
// assuming it.
export const PermutationsRtl: Story = {
  render: () =>
    theme(
      vrtPage(html`
        ${placementRows('permutations-rtl')}
      `),
      'dark',
      'rtl'
    ),
  parameters: menuVrtParameters,
  play: openManyMenusForVrt,
};
PermutationsRtl.storyName = 'Permutations (RTL)';

// `forced-colors` replaces the whole page palette, so it needs its own
// snapshot. `top` is listed before `bottom` for the same reason the main
// page orders them that way: `top` opens upward and `bottom` downward, so
// in that order the two groups diverge. Reversed, they both open into the
// gap between them and overlap. A representative subset is enough to confirm the
// `@media (forced-colors: active)` rule's `border-color: CanvasText` reaches
// the surface.
export const ForcedColors: Story = {
  render: () =>
    theme(
      vrtPage(html`
        ${placementGroup('top', 'forced')} ${placementGroup('bottom', 'forced')}
      `),
      'light',
      'ltr'
    ),
  parameters: menuForcedColorsVrtParameters,
  play: openManyMenusForVrt,
};
