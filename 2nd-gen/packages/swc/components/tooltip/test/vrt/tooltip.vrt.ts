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
  TOOLTIP_PLACEMENTS,
  TOOLTIP_VARIANTS,
} from '@adobe/spectrum-wc-core/components/tooltip';

import '@adobe/spectrum-wc/components/button/swc-button.js';
import '@adobe/spectrum-wc/components/tooltip/swc-tooltip.js';

import {
  forcedColorsVrtParameters,
  forceManualPopover,
  row,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

const meta: Meta = {
  title: 'Tooltip/Tooltip VRT',
  component: 'swc-tooltip',
  tags: ['dev'],
};

export default meta;

// `PlacementController` positions the tooltip relative to a real trigger
// element, resolved via `for="id"` (see resolveTrigger() in
// Tooltip.base.ts); with no trigger to measure against, every tooltip
// renders at the popover's unpositioned default (the viewport corner). Each
// call needs a globally unique id: `tooltipContent()` runs twice per story
// (once per theme() block), so a bare per-row counter would collide between
// the light/ltr and dark/rtl copies sharing one document.
const tooltip = (
  id: string,
  {
    variant = 'neutral',
    placement = 'top',
    content = 'Tooltip content',
    gridArea,
  }: {
    variant?: (typeof TOOLTIP_VARIANTS)[number];
    placement?: (typeof TOOLTIP_PLACEMENTS)[number];
    content?: string;
    // Set only by the Placements compass grid below; every other caller
    // renders inside a plain row() instead.
    gridArea?: string;
  }
) => html`
  <div
    style="position: relative; inline-size: 120px; block-size: 72px; display: flex; align-items: center; justify-content: center; ${gridArea
      ? `grid-area: ${gridArea};`
      : ''}"
  >
    <swc-button id=${id} size="s">Trigger</swc-button>
    <swc-tooltip open for=${id} variant=${variant} placement=${placement}>
      ${content}
    </swc-tooltip>
  </div>
`;

// Six tooltips forced open at once with only a 16px flex gap (the plain
// row() layout) overlap badly: a "left"/"right"/"start"/"end" tooltip's
// bubble is top-layer content positioned by translate, not clipped by its
// trigger's local box, so it spills into the neighboring cell. Arranging the
// six placements on a compass-rose grid — the same layout the docs stories
// use for a single open tooltip — gives every direction an empty cell to pop
// into, so it holds up even with all six open simultaneously.
const placementsGrid = (idPrefix: string) => html`
  <div
    style="display: grid; justify-content: center; justify-items: center; gap: var(--swc-spacing-400); grid-template-areas: '. top .' 'start . right' 'left . end' '. bottom .';"
  >
    ${TOOLTIP_PLACEMENTS.map((placement) =>
      tooltip(`${idPrefix}-placement-${placement}`, {
        placement,
        gridArea: placement,
      })
    )}
  </div>
`;

const tooltipContent = (idPrefix: string) => html`
  ${row(
    TOOLTIP_VARIANTS.map((variant) =>
      tooltip(`${idPrefix}-variant-${variant}`, {
        variant,
        content: `${variant} tooltip`,
      })
    ),
    'Variants'
  )}
  ${row([placementsGrid(idPrefix)], 'Placements')}
  ${row(
    [
      tooltip(`${idPrefix}-cjk-ja`, { content: '承認ワークフローを開始' }),
      tooltip(`${idPrefix}-cjk-ko`, { content: '승인 워크플로 시작' }),
      tooltip(`${idPrefix}-cjk-zh`, { content: '启动审批工作流' }),
    ],
    'CJK language'
  )}
`;

// Every tooltip above renders `open`, but native `popover="auto"` (Tooltip's
// default mode) only permits one open instance page-wide: each one that
// connects light-dismisses the previously-open one, and Tooltip's own toggle
// listener syncs that dismissal back into `open`. Without this play
// function, only the last tooltip in DOM order would actually render open by
// the time Chromatic snapshots. Forcing `popover="manual"` (VRT-only; not
// how Tooltip behaves in production) lets every placement and variant stay
// open simultaneously. See `forceManualPopover` in `.storybook/helpers/vrt.ts`.
const forceOpenTooltips = forceManualPopover('swc-tooltip');

export const Permutations: Story = {
  render: () => html`
    ${theme(tooltipContent('light'), 'light', 'ltr')}
    ${theme(tooltipContent('dark'), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
  play: forceOpenTooltips,
};

export const ForcedColors: Story = {
  render: () => theme(tooltipContent('forced'), 'light', 'ltr'),
  parameters: forcedColorsVrtParameters,
  play: forceOpenTooltips,
};
