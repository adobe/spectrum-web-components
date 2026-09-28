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

import {
  TOOLTIP_PLACEMENTS,
  TOOLTIP_VARIANTS,
  type TooltipPlacement,
  type TooltipVariant,
} from '@adobe/spectrum-wc-core/components/tooltip';

import '@adobe/spectrum-wc/components/button/swc-button.js';
import '@adobe/spectrum-wc/components/tooltip/swc-tooltip.js';

import {
  forcedColorsVrtParameters,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

// Metadata

const meta: Meta = {
  title: 'Tooltip/Tooltip VRT',
  component: 'swc-tooltip',
  tags: ['dev'],
};

export default meta;

// Helpers

type TooltipSpec = {
  id: string;
  triggerLabel: string;
  label: string;
  placement?: TooltipPlacement;
  variant?: TooltipVariant;
  lang?: string;
};

const variantLabels = {
  neutral: 'Save your changes',
  informative: 'File will be compressed',
  negative: 'Action cannot be undone',
} as const satisfies Record<TooltipVariant, string>;

const placementLabels = {
  top: 'Appears above',
  right: 'Appears to the right',
  end: 'Appears at end',
  bottom: 'Appears below',
  left: 'Appears to the left',
  start: 'Appears at start',
} as const satisfies Record<TooltipPlacement, string>;

// Trigger + tooltip wired via `for`; ids must be document-unique.
// `.shouldFlip=false` pins placement (deliberate flip is in `flippedSection`).
const tooltipPair = ({
  id,
  triggerLabel,
  label,
  placement,
  variant,
  lang,
}: TooltipSpec) => html`
  <swc-button id=${id}>${triggerLabel}</swc-button>
  <swc-tooltip
    for=${id}
    placement=${placement ?? 'top'}
    variant=${variant ?? 'neutral'}
    lang=${lang ?? nothing}
    .shouldFlip=${false}
  >
    ${label}
  </swc-tooltip>
`;

const sectionLabel = (label: string) => html`
  <p class="swc-Detail swc-Detail--sizeM">${label}</p>
`;

// Fixed-size cell reserving room around the trigger so its top-layer bubble
// never reaches a neighbour — identical in LTR/RTL.
const cell = (spec: TooltipSpec) => html`
  <div class="tooltip-vrt-cell">${tooltipPair(spec)}</div>
`;

const placementSection = (key: string) => html`
  ${sectionLabel('Placements')}
  <div class="tooltip-vrt-grid">
    ${TOOLTIP_PLACEMENTS.map((placement) =>
      cell({
        id: `${key}-placement-${placement}`,
        triggerLabel: placement,
        label: placementLabels[placement],
        placement,
      })
    )}
  </div>
`;

const variantSection = (key: string) => html`
  ${sectionLabel('Variants')}
  <div class="tooltip-vrt-grid">
    ${TOOLTIP_VARIANTS.map((variant) =>
      cell({
        id: `${key}-variant-${variant}`,
        triggerLabel: variant,
        label: variantLabels[variant],
        variant,
      })
    )}
  </div>
`;

// Deliberate flip: an oversized `container-padding` can't be satisfied above,
// so it resolves `actual-placement` to `bottom` (bubble + tip render below).
const flippedSection = (key: string) => html`
  ${sectionLabel('Flipped placement (top requested → resolves to bottom)')}
  <div class="tooltip-vrt-flip">
    <swc-button id="${key}-flip">Flips downward</swc-button>
    <swc-tooltip for="${key}-flip" placement="top" container-padding="200">
      Requested top, but flips below when there is no room above
    </swc-tooltip>
  </div>
`;

const permutationContent = (
  key: string,
  { flipped = false }: { flipped?: boolean } = {}
) => html`
  <div class="tooltip-vrt-block">
    ${flipped ? flippedSection(key) : ''} ${placementSection(key)}
    ${variantSection(key)}
  </div>
`;

// Text metrics in their own story (keeps the permutation stories short):
// wrapping, `overflow-wrap: break-word`, and the CJK `:lang()` line-height.
const wrappingSection = (key: string) => html`
  ${sectionLabel('Wrapping')}
  <div class="tooltip-vrt-wrap">
    ${tooltipPair({
      id: `${key}-wrap`,
      triggerLabel: 'Long label',
      label:
        "This is a longer tooltip message that wraps across multiple lines when the content exceeds the tooltip's maximum inline size",
      placement: 'bottom',
    })}
  </div>
`;

const breakWordSection = (key: string) => html`
  ${sectionLabel('Break-word (long unbroken token)')}
  <div class="tooltip-vrt-wrap">
    ${tooltipPair({
      id: `${key}-breakword`,
      triggerLabel: 'Long token',
      label:
        'https://spectrum.adobe.com/page/tooltip/#accessibility-and-keyboard-interactions',
      placement: 'bottom',
    })}
  </div>
`;

// CJK is LTR, so this stays in the light/LTR story only.
const cjkLabels = {
  ja: '承認待ちワークフローが実行中です',
  ko: '승인 대기 워크플로가 실행 중입니다',
  zh: '审批待处理工作流正在运行中',
} as const;

const cjkSection = (key: string) => html`
  ${sectionLabel('CJK line-height (lang ja / ko / zh)')}
  <div class="tooltip-vrt-grid">
    ${(['ja', 'ko', 'zh'] as const).map((lang) =>
      cell({
        id: `${key}-cjk-${lang}`,
        triggerLabel: lang.toUpperCase(),
        label: cjkLabels[lang],
        placement: 'bottom',
        lang,
      })
    )}
  </div>
`;

const textContent = (key: string) => html`
  <div class="tooltip-vrt-block">
    ${wrappingSection(key)} ${breakWordSection(key)} ${cjkSection(key)}
  </div>
`;

// Open all tooltips and let the entrance transition settle. Automatic tooltips
// are a single-open singleton, so mark each `manual` (they opt out) to let the
// grid show them all at once. `manual` must settle before `open`: HoverController
// hides the popover the moment `manual` turns on, which would undo a same-tick
// `open`.
const openAllTooltips = async ({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}) => {
  const tooltips = Array.from(
    canvasElement.querySelectorAll('swc-tooltip')
  ) as (HTMLElement & {
    open: boolean;
    manual: boolean;
    updateComplete: Promise<unknown>;
  })[];
  tooltips.forEach((tooltip) => {
    tooltip.manual = true;
  });
  await Promise.all(tooltips.map((tooltip) => tooltip.updateComplete));
  tooltips.forEach((tooltip) => {
    tooltip.open = true;
  });
  await waitFor(() => {
    tooltips.forEach((tooltip) => {
      expect(tooltip.matches(':popover-open')).toBe(true);
      expect(getComputedStyle(tooltip).opacity).toBe('1');
    });
  });
};

// Compact enough that a whole single-theme block fits the pinned viewport
// (below); cells reserve room so adjacent open bubbles never collide.
const layoutStyles = html`
  <style>
    .tooltip-vrt-block {
      display: flex;
      flex-direction: column;
      gap: var(--swc-spacing-300);
    }

    .tooltip-vrt-grid {
      display: grid;
      grid-template-columns: repeat(3, 340px);
      justify-content: center;
      gap: 8px 24px;
    }

    .tooltip-vrt-cell {
      display: flex;
      align-items: center;
      justify-content: center;
      min-block-size: 112px;
    }

    .tooltip-vrt-flip,
    .tooltip-vrt-wrap {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      min-block-size: 120px;
    }
  </style>
`;

// Tooltips are top-layer popovers positioned at open time; an off-screen trigger
// gets its bubble clamped (detached) by `shift`. Each theme is its own story
// sized to fit this pinned viewport so every trigger stays on-screen.
const SNAPSHOT_VIEWPORT = { width: 1200, height: 1000 } as const;

const withViewport = (base: Record<string, unknown>) => ({
  ...base,
  chromatic: {
    ...(base as { chromatic?: Record<string, unknown> }).chromatic,
    delay: 500,
    modes: { snapshot: { viewport: SNAPSHOT_VIEWPORT } },
  },
});

// VRT stories

// Light / LTR: flipped placement, all placements, semantic variants.
export const Permutations: Story = {
  render: () => html`
    ${layoutStyles}
    ${theme(permutationContent('light', { flipped: true }), 'light', 'ltr')}
  `,
  parameters: withViewport(vrtParameters),
  play: openAllTooltips,
};

// Dark / RTL: same axes minus the direction-agnostic flip; covers RTL
// `start`/`end` resolution and dark-theme bubble colours in its own snapshot.
export const PermutationsRtl: Story = {
  render: () => html`
    ${layoutStyles} ${theme(permutationContent('dark'), 'dark', 'rtl')}
  `,
  parameters: withViewport(vrtParameters),
  play: openAllTooltips,
};
PermutationsRtl.storyName = 'Permutations RTL';

// Forced-colors replaces the whole-page palette (can't be scoped like
// light/dark), so it gets its own single-theme story covering the same axes.
export const ForcedColors: Story = {
  render: () => html`
    ${layoutStyles}
    ${theme(permutationContent('forced', { flipped: true }), 'light', 'ltr')}
  `,
  parameters: withViewport(forcedColorsVrtParameters),
  play: openAllTooltips,
};

// Text metrics: wrapping, break-word, and CJK line-height (light / LTR).
export const TextRendering: Story = {
  render: () => html`
    ${layoutStyles} ${theme(textContent('text'), 'light', 'ltr')}
  `,
  parameters: withViewport(vrtParameters),
  play: openAllTooltips,
};
TextRendering.storyName = 'Text rendering';
