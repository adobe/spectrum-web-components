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
// No `size` axis: menu.css has no size-dependent rules, so all four would
// render identically. No reduced-motion axis: it only zeroes the entry
// transition, invisible in a still.

// Top-layer surfaces don't expand their ancestor, hence the wide gaps.
// Groups run horizontally: stacking pushed triggers off-viewport, where
// `shift` clamped every side placement onto one band and they overlapped.
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

// Side placements first: `shift` clamps their cross axis (vertical) against
// the viewport, so they're the ones that drift down a long page.
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

// The label must be long enough to actually wrap at the 320px cap; one that
// merely looks long still fits on a line and proves nothing.
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

// Own story: `--swc-placement-available-height` is the remaining viewport,
// so at the bottom of a long page the tall case collapsed to ~100px.
const overflowRow = (prefix: string) =>
  row(
    [
      renderMenu('bottom-start', `${prefix}-overflow-wide`, LONG_LABEL_ROWS),
      renderMenu('bottom-start', `${prefix}-overflow-tall`, MANY_ROWS),
    ],
    'Content overflow (inline cap, long list)',
    // `bottom-start` left-aligns to the trigger, so the 320px case needs
    // more than its own width of clearance.
    WIDE_ROW_GAP
  );

// `popover="auto"` light-dismisses the others, so only one could be open at
// a time. Flipping to `manual` renders the whole matrix. VRT-only.
const openManyMenusForVrt: NonNullable<Story['play']> = async ({
  canvasElement,
}) => {
  const menus = [...canvasElement.querySelectorAll<Menu>('swc-menu')];
  await Promise.all(menus.map((menu) => menu.updateComplete));
  menus.forEach((menu) => {
    // Property, not attribute: `should-flip="false"` still reads as true.
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
  // Each menu focuses its first row, so the race winner is arbitrary and
  // would park a focus ring somewhere different each run.
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

// menu.css has `:dir()`-specific transforms for `start`/`end`. Runs every
// base, not just the logical ones, to confirm the physical sides stay put.
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

// Forced colors replaces the whole palette, so it needs its own snapshot.
// `top` before `bottom` so the groups open away from each other; reversed,
// they open into the gap between them and overlap.
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
