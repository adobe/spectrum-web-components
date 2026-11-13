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
import { ifDefined } from 'lit/directives/if-defined.js';
import { expect, waitFor } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import { Menu, MenuItem } from '@adobe/spectrum-wc/menu';
import {
  MENU_PLACEMENTS,
  MENU_VALID_SIZES,
} from '@adobe/spectrum-wc-core/components/menu';

import '@adobe/spectrum-wc-icons/swc-icon-copy.js';
import '@adobe/spectrum-wc/components/button/swc-button.js';
import '@adobe/spectrum-wc/components/menu/swc-menu.js';
import '@adobe/spectrum-wc/components/menu/swc-menu-item.js';
import '@adobe/spectrum-wc/components/thumbnail/swc-thumbnail.js';

import type { ForcedPseudoState } from '../../../../.storybook/helpers/index.js';
import {
  forcedColorsVrtParameters,
  forcePseudoState,
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
// The placement stories carry no `size` axis: menu.css itself has no
// size-dependent rules, so all four surfaces would render identically. Row
// chrome does vary by size, which `RowPermutations` below covers instead. No
// reduced-motion axis: it only zeroes the entry transition, invisible in a
// still.

// Top-layer surfaces don't expand their ancestor, hence the wide gaps.
// Groups run horizontally: stacking pushed triggers off-viewport, where
// `shift` clamped every side placement onto one band and they overlapped.
const GROUP_GAP = 152;
const ITEM_GAP = 120;
const COLUMN_WIDTH = 340;
const COLUMN_GAP = 24;
// Out-of-flow surfaces don't grow their panel, so each panel reserves room for
// its tallest surface. Tallest surface in the row above: the 12 content shapes
// at `m`.
const SIZE_ROW_GAP = 620;
// Panel heights: the size matrix (two rows, `xl` below), and one `m` column.
const SIZE_BLOCK_HEIGHT = 1580;
const SINGLE_BLOCK_HEIGHT = 680;
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
  <swc-menu-item><span slot="label">Cut</span></swc-menu-item>
  <swc-menu-item><span slot="label">Copy</span></swc-menu-item>
  <swc-menu-item><span slot="label">Paste</span></swc-menu-item>
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

// `--swc-placement-available-height` is the remaining viewport, so a tall
// surface low on a long page collapses. `uncapped` lifts the surface's own
// height cap for the row stories, whose point is to see every row rather than
// a scrolled slice.
const createOpenPlay =
  ({ uncapped = false } = {}): NonNullable<Story['play']> =>
  async ({ canvasElement }) => {
    const menus = [...canvasElement.querySelectorAll<Menu>('swc-menu')];
    await Promise.all(menus.map((menu) => menu.updateComplete));
    menus.forEach((menu) => {
      // Property, not attribute: `should-flip="false"` still reads as true.
      menu.shouldFlip = false;
      const surface = menu.shadowRoot?.querySelector<HTMLElement>('.swc-Menu');
      surface?.setAttribute('popover', 'manual');
      if (uncapped) {
        surface?.style.setProperty('max-block-size', 'none');
      }
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

// `popover="auto"` light-dismisses the others, so only one could be open at
// a time. Flipping to `manual` renders the whole matrix. VRT-only.
const openManyMenusForVrt = createOpenPlay();
const openUncappedMenusForVrt = createOpenPlay({ uncapped: true });

// Row content
//
// Thumbnails and icons are the real `swc-thumbnail` and `swc-icon-*`
// elements, not stand-in glyphs: the row's layout reacts to a slotted
// `swc-thumbnail` specifically.

const SQUARE_SRC = './images/avatar-preview.png';
const LANDSCAPE_SRC = './images/landscape-asset.jpg';
const PORTRAIT_SRC = './images/portrait-asset.jpg';
const DESCRIPTION = 'Keeps the source formatting';
const SHORTCUT = '⌘⇧V';

type RowVisual = 'none' | 'icon' | 'thumbnail';

interface RowOptions {
  label?: string;
  visual?: RowVisual;
  thumbnailSrc?: string;
  description?: string;
  secondary?: string;
  disabled?: boolean;
  forceState?: ForcedPseudoState;
  lang?: string;
}

const visualFor = (visual: RowVisual, thumbnailSrc: string) => {
  if (visual === 'icon') {
    return html`
      <swc-icon-copy slot="visual"></swc-icon-copy>
    `;
  }
  if (visual === 'thumbnail') {
    return html`
      <swc-thumbnail slot="visual">
        <img src=${thumbnailSrc} alt="" />
      </swc-thumbnail>
    `;
  }
  return nothing;
};

const menuItem = ({
  label = 'Paste special',
  visual = 'none',
  thumbnailSrc = SQUARE_SRC,
  description,
  secondary,
  disabled = false,
  forceState,
  lang,
}: RowOptions = {}) => html`
  <swc-menu-item
    ?disabled=${disabled}
    data-force-state=${ifDefined(forceState)}
    lang=${ifDefined(lang)}
  >
    ${visualFor(visual, thumbnailSrc)}
    <span slot="label">${label}</span>
    ${description
      ? html`
          <span slot="description">${description}</span>
        `
      : nothing}
    ${secondary
      ? html`
          <span slot="secondary">${secondary}</span>
        `
      : nothing}
  </swc-menu-item>
`;

// Every content shape, so a Chromatic diff shows padding, gap, text gap, the
// stacked description and the trailing text at each size rather than one
// representative. Visual, description and secondary combine independently
// because the layout changes for each pairing: a thumbnail sits beside both
// text lines, and the secondary text shares the label's line.
const ROW_SHAPES: readonly RowOptions[] = [
  {},
  { secondary: SHORTCUT },
  { visual: 'icon' },
  { visual: 'icon', secondary: SHORTCUT },
  { visual: 'icon', description: DESCRIPTION },
  { visual: 'icon', description: DESCRIPTION, secondary: SHORTCUT },
  { visual: 'thumbnail' },
  { visual: 'thumbnail', secondary: SHORTCUT },
  { visual: 'thumbnail', description: DESCRIPTION },
  { visual: 'thumbnail', description: DESCRIPTION, secondary: SHORTCUT },
  {
    visual: 'icon',
    description: DESCRIPTION,
    secondary: SHORTCUT,
    disabled: true,
  },
  {
    visual: 'thumbnail',
    description: DESCRIPTION,
    secondary: SHORTCUT,
    disabled: true,
  },
];

// Each column is as wide as the widest surface (the 320px cap plus its border),
// so neighbouring surfaces never overlap. Triggers have to stay inside the
// viewport width at open time or `shift` clamps their surfaces onto each other,
// so wide matrices wrap into rows instead of growing sideways. Surfaces are
// out of flow, so each row's gap has to clear the tallest surface above it.
const menuColumn = (
  id: string,
  label: string,
  rows: unknown,
  size: string = 'm'
) => html`
  <div style="inline-size: ${COLUMN_WIDTH}px;">
    <swc-button id=${id}>${label}</swc-button>
    <swc-menu for=${id} size=${size} placement="bottom-start">${rows}</swc-menu>
  </div>
`;

const columnRows = (
  columns: readonly unknown[],
  perRow: number,
  rowGap: number
) => html`
  <div style="display: flex; flex-direction: column; gap: ${rowGap}px;">
    ${Array.from(
      { length: Math.ceil(columns.length / perRow) },
      (_, index) => html`
        <div style="display: flex; gap: ${COLUMN_GAP}px;">
          ${columns.slice(index * perRow, (index + 1) * perRow)}
        </div>
      `
    )}
  </div>
`;

// A themed panel tall enough to hold its out-of-flow surfaces, since the panel
// itself only grows to fit the triggers.
const themedBlock = (
  children: unknown,
  mode: 'light' | 'dark',
  dir: 'ltr' | 'rtl',
  minBlockSize: number
) => html`
  <div style="display: grid; min-block-size: ${minBlockSize}px;">
    ${theme(children, mode, dir)}
  </div>
`;

const shapeItems = () => ROW_SHAPES.map((shape) => menuItem(shape));

// Rows are only styled inside a menu surface, so each size gets its own open
// menu rather than bare rows on the page. Size changes the padding, gap and
// thumbnail dimensions, so every size carries every content shape. Dark only
// changes colour and RTL only mirrors the layout, so each needs a single size.
const permutationsPage = (prefix: string) => html`
  <div style="display: flex; gap: ${COLUMN_GAP}px; align-items: flex-start;">
    ${themedBlock(
      columnRows(
        MENU_VALID_SIZES.map((size) =>
          menuColumn(`${prefix}-${size}`, size, shapeItems(), size)
        ),
        2,
        SIZE_ROW_GAP
      ),
      'light',
      'ltr',
      SIZE_BLOCK_HEIGHT
    )}
    <div style="display: flex; flex-direction: column; gap: ${COLUMN_GAP}px;">
      ${themedBlock(
        menuColumn(`${prefix}-dark`, 'm, dark', shapeItems()),
        'dark',
        'ltr',
        SINGLE_BLOCK_HEIGHT
      )}
      ${themedBlock(
        menuColumn(`${prefix}-rtl`, 'm, RTL', shapeItems()),
        'light',
        'rtl',
        SINGLE_BLOCK_HEIGHT
      )}
    </div>
  </div>
`;

// The state rows name themselves, since a forced state has no other visible
// cue to say which row carries it. Disabled rows get the hover and focus
// states too: hover must stay inert, while the focus ring must still show
// because disabled rows stay in the roving set.
const STATE_ROWS: readonly RowOptions[] = [
  { label: 'Default' },
  { label: 'Hover', forceState: 'hover' },
  { label: 'Focus visible', forceState: 'focus-visible' },
  { label: 'Pressed', forceState: 'active' },
  { label: 'Disabled', disabled: true },
  { label: 'Disabled hover', disabled: true, forceState: 'hover' },
  { label: 'Disabled focus', disabled: true, forceState: 'focus-visible' },
];

const stateRows = (visual: RowVisual) =>
  STATE_ROWS.map((state) =>
    menuItem({
      description: DESCRIPTION,
      secondary: SHORTCUT,
      visual,
      ...state,
    })
  );

// States only change colour, the ring and the press transform, so one size is
// enough. The thumbnail column is there because the hover and focus content
// colours reach the description and trailing text beside a thumbnail too.
const statesPage = (prefix: string) => html`
  <div style="display: flex; gap: ${COLUMN_GAP}px; align-items: flex-start;">
    ${themedBlock(
      columnRows(
        [
          menuColumn(`${prefix}-icon`, 'm, icon', stateRows('icon')),
          menuColumn(
            `${prefix}-thumbnail`,
            'm, thumbnail',
            stateRows('thumbnail')
          ),
        ],
        2,
        0
      ),
      'light',
      'ltr',
      SINGLE_BLOCK_HEIGHT
    )}
    ${themedBlock(
      menuColumn(`${prefix}-dark`, 'm, dark', stateRows('icon')),
      'dark',
      'ltr',
      SINGLE_BLOCK_HEIGHT
    )}
  </div>
`;

// Forced colours replace the palette, so the story needs its own snapshot.
// Layout is unaffected, so it takes one column of states and one of shapes.
const forcedColorsPage = (prefix: string) =>
  themedBlock(
    columnRows(
      [
        menuColumn(`${prefix}-states`, 'States', stateRows('icon')),
        menuColumn(`${prefix}-shapes`, 'Shapes', shapeItems()),
      ],
      2,
      0
    ),
    'light',
    'ltr',
    SINGLE_BLOCK_HEIGHT
  );

// Hover, focus and press can't be triggered in a still. `forcePseudoState`
// mirrors the row's own rules onto `data-forced-*` attributes on the host.
const forceRowStates: NonNullable<Story['play']> = async ({
  canvasElement,
}) => {
  const items = [
    ...canvasElement.querySelectorAll<MenuItem>(
      'swc-menu-item[data-force-state]'
    ),
  ];
  await Promise.all(items.map((item) => item.updateComplete));
  items.forEach((item) => {
    const state = item.dataset.forceState as ForcedPseudoState;
    forcePseudoState(item, state);
    // The hover treatment is gated on `pointer-focus`, which the owning menu
    // sets when a real pointer moves over the row.
    if (state === 'hover') {
      item.setAttribute('pointer-focus', '');
    }
  });
};

const playOpenWithStates: NonNullable<Story['play']> = async (context) => {
  await openUncappedMenusForVrt(context);
  await forceRowStates(context);
};

// Content that stresses the layout rather than showing the anatomy, taken
// from probing the row with awkward input: text that has to wrap beside a
// visual, text with no break opportunity, CJK line breaking, and trailing
// text that must keep its width instead of being squeezed by a long label.
const WRAP_LABEL =
  'Export the current selection as a flattened layered composite file';
const UNBREAKABLE_LABEL =
  'Supercalifragilisticexpialidocious_unbreakable_token';
const LONG_DESCRIPTION =
  'Keeps the source formatting, including embedded colour profiles and any layer styles on the selection';

const wrappingRows = html`
  ${menuItem({ visual: 'icon', label: WRAP_LABEL })}
  ${menuItem({ visual: 'icon', label: UNBREAKABLE_LABEL })}
  ${menuItem({ label: WRAP_LABEL, secondary: SHORTCUT })}
  ${menuItem({
    visual: 'thumbnail',
    label: WRAP_LABEL,
    description: LONG_DESCRIPTION,
  })}
  ${menuItem({
    visual: 'thumbnail',
    label: 'Paste',
    description: LONG_DESCRIPTION,
    secondary: SHORTCUT,
  })}
  ${menuItem({
    visual: 'icon',
    label:
      '貼り付けて書式を一致させる長いラベルが折り返されるかどうかを確認します',
    description: '元の書式を保持します',
    secondary: SHORTCUT,
    lang: 'ja',
  })}
`;

// The thumbnail's own `fit` and the row's sizing meet here: a landscape and a
// portrait image must keep their ratio inside the square slot.
const imageryRows = html`
  ${menuItem({
    visual: 'thumbnail',
    thumbnailSrc: SQUARE_SRC,
    label: 'Square',
  })}
  ${menuItem({
    visual: 'thumbnail',
    thumbnailSrc: LANDSCAPE_SRC,
    label: 'Landscape',
    description: DESCRIPTION,
  })}
  ${menuItem({
    visual: 'thumbnail',
    thumbnailSrc: PORTRAIT_SRC,
    label: 'Portrait',
    description: DESCRIPTION,
    secondary: SHORTCUT,
  })}
  ${menuItem({
    visual: 'thumbnail',
    thumbnailSrc: LANDSCAPE_SRC,
    label: 'Disabled landscape',
    description: DESCRIPTION,
    disabled: true,
  })}
  ${menuItem({ visual: 'icon', label: 'Icon between thumbnails' })}
  ${menuItem({ visual: 'thumbnail', label: 'Thumbnail again' })}
  ${menuItem({ label: 'No visual among visuals' })}
`;

// Focus on the last row of a scrolled surface: the ring is inset so the
// surface's own `overflow: auto` can't clip it, and the first and last rows
// are where that would show.
const SCROLL_ROWS = html`
  ${Array.from({ length: 12 }, (_, index) =>
    menuItem({
      label: `Row ${index + 1}`,
      visual: (['none', 'icon', 'thumbnail'] as const)[index % 3],
      forceState: index === 11 ? 'focus-visible' : undefined,
    })
  )}
`;

const contentPage = (prefix: string) =>
  themedBlock(
    columnRows(
      [
        menuColumn(`${prefix}-wrapping`, 'Wrapping and CJK', wrappingRows),
        menuColumn(`${prefix}-imagery`, 'Thumbnail imagery', imageryRows),
        html`
          <div data-scroll-end>
            ${menuColumn(
              `${prefix}-scroll`,
              'Scrolled to the end',
              SCROLL_ROWS
            )}
          </div>
        `,
      ],
      3,
      0
    ),
    'light',
    'ltr',
    SINGLE_BLOCK_HEIGHT
  );

// The scrolled menu keeps a cap so it has something to scroll; the others
// show every row.
const playContent: NonNullable<Story['play']> = async (context) => {
  await playOpenWithStates(context);
  const menu = context.canvasElement.querySelector<Menu>(
    '[data-scroll-end] swc-menu'
  ) as Menu;
  const surface = menu.shadowRoot?.querySelector<HTMLElement>('.swc-Menu');
  surface?.style.setProperty('max-block-size', '320px');
  surface?.scrollTo({ top: surface.scrollHeight });
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

// Row chrome. Each story packs its light, dark and RTL cases onto one page
// rather than one story each: a Chromatic snapshot is billed per story, and
// dark only changes colour while RTL only mirrors the layout, so neither
// needs the full size matrix.
export const RowPermutations: Story = {
  render: () => vrtPage(permutationsPage('rows')),
  parameters: menuVrtParameters,
  play: openUncappedMenusForVrt,
};
RowPermutations.storyName = 'Row permutations';

// Row states, forced, in light and dark.
export const RowStates: Story = {
  render: () => vrtPage(statesPage('states')),
  parameters: menuVrtParameters,
  play: playOpenWithStates,
};
RowStates.storyName = 'Row states';

// Forced colours flatten the state backgrounds, so the row treatment needs
// its own snapshot to show the disabled text, the focus ring and the hover
// and press cues survive.
export const RowForcedColors: Story = {
  render: () => vrtPage(forcedColorsPage('forced')),
  parameters: menuForcedColorsVrtParameters,
  play: playOpenWithStates,
};
RowForcedColors.storyName = 'Row forced colors';

// Wrapping, unbreakable text, CJK, mixed image ratios, and a scrolled surface
// with the last row focused.
export const RowContent: Story = {
  render: () => vrtPage(contentPage('content')),
  parameters: menuVrtParameters,
  play: playContent,
};
RowContent.storyName = 'Row content';
