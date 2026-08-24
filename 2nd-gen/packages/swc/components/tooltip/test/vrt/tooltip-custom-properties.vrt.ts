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

import '@adobe/spectrum-wc/components/button/swc-button.js';
import '@adobe/spectrum-wc/components/tooltip/swc-tooltip.js';

import type { CustomPropertyCase } from '../../../../.storybook/helpers/index.js';
import {
  coveredCustomProperties,
  customPropertyRows,
  theme,
  verifyCustomPropertyCoverage,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';
import customElementsManifest from '../../../../dist/custom-elements.json';

// Metadata

const meta: Meta = {
  title: 'Tooltip/Tooltip VRT',
  component: 'swc-tooltip',
  tags: ['dev'],
};

export default meta;

// Helpers

type TooltipPropertyCase = CustomPropertyCase<`--swc-tooltip-${string}`>;

// `--swc-tooltip-background-color` is the tooltip's only public custom property.
// `rebeccapurple` reads clearly different from the neutral default, and is dark
// enough that the tooltip's light text keeps an accessible contrast ratio.
const TOOLTIP_PROPERTY_CASES: readonly TooltipPropertyCase[] = [
  { property: '--swc-tooltip-background-color', value: 'rebeccapurple' },
];

// Each cell pairs a trigger with a tooltip that must be open for the background
// to paint; ids stay unique (property + ref/override) so `for` resolves per button.
const renderPropertyCase = (
  { property }: TooltipPropertyCase,
  style?: string
) => {
  const slug = property.replace(/[^a-z0-9]+/gi, '-');
  const id = `tt-cp-${slug}-${style ? 'override' : 'reference'}`;
  return html`
    <div class="tooltip-cp-cell">
      <swc-button id=${id}>${style ? 'Override' : 'Reference'}</swc-button>
      <swc-tooltip
        for=${id}
        placement="bottom"
        .shouldFlip=${false}
        style=${style ?? nothing}
      >
        Tooltip background
      </swc-tooltip>
    </div>
  `;
};

const layoutStyles = html`
  <style>
    .tooltip-cp-cell {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      min-block-size: 120px;
      min-inline-size: 200px;
    }
  </style>
`;

const coveredTooltipCustomProperties = coveredCustomProperties(
  TOOLTIP_PROPERTY_CASES
);

// Open each tooltip (as `popover="manual"` so they coexist), let the entrance
// transition settle, then assert every CEM-documented custom property is covered.
const openAndVerifyCoverage = async ({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}) => {
  const tooltips = Array.from(
    canvasElement.querySelectorAll('swc-tooltip')
  ) as (HTMLElement & { open: boolean })[];
  tooltips.forEach((tooltip) => {
    tooltip.setAttribute('popover', 'manual');
    tooltip.open = true;
  });
  await waitFor(() => {
    tooltips.forEach((tooltip) => {
      expect(tooltip.matches(':popover-open')).toBe(true);
      expect(getComputedStyle(tooltip).opacity).toBe('1');
    });
  });
  await verifyCustomPropertyCoverage({
    customElementsManifest,
    modulePath: 'components/tooltip/Tooltip.ts',
    declarationName: 'Tooltip',
    coveredProperties: coveredTooltipCustomProperties,
  });
};

// VRT stories

export const CustomProperties: Story = {
  render: () => html`
    ${layoutStyles}
    ${theme(
      customPropertyRows(TOOLTIP_PROPERTY_CASES, renderPropertyCase),
      'light',
      'ltr'
    )}
  `,
  // Short content (both triggers always on-screen), so no custom viewport —
  // just a settle delay for the entrance transition.
  parameters: {
    ...vrtParameters,
    chromatic: {
      ...(vrtParameters as { chromatic?: Record<string, unknown> }).chromatic,
      delay: 500,
    },
  },
  play: openAndVerifyCoverage,
};
