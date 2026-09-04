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
import { expect } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import { Asset } from '@adobe/spectrum-wc/asset';

import '@adobe/spectrum-wc/components/asset/swc-asset.js';

import { getComponent, withWarningSpy } from '../../../utils/test-utils.js';
import meta from '../stories/asset.stories.js';
import { Overview } from '../stories/asset.stories.js';

// This file defines dev-only test stories that reuse the main story metadata.
export default {
  ...meta,
  title: 'Asset/Tests',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

// ──────────────────────────────────────────────────────────────
// TEST: Defaults
// ──────────────────────────────────────────────────────────────

export const OverviewTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const asset = await getComponent<Asset>(canvasElement, 'swc-asset');

    await step('renders slotted content with defaults applied', async () => {
      const img = asset.querySelector('img');
      expect(asset.fit, 'fit defaults to cover').toBe('cover');
      expect(asset.background, 'background defaults to transparent').toBe(
        'transparent'
      );
      expect(img, 'slotted img element is rendered').toBeTruthy();
      expect(
        img?.getAttribute('alt')?.length,
        'slotted img has a non-empty alt attribute'
      ).toBeGreaterThan(0);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Dev mode warnings
// ──────────────────────────────────────────────────────────────

export const InvalidFitWarningTest: Story = {
  render: () => html`
    <swc-asset>
      <img src="./images/avatar-preview.png" alt="Preview" />
    </swc-asset>
  `,
  play: async ({ canvasElement, step }) => {
    const asset = await getComponent<Asset>(canvasElement, 'swc-asset');

    await step('warns when an invalid fit is set in DEBUG mode', () =>
      withWarningSpy(async (warnCalls) => {
        asset.fit = 'stretch' as Asset['fit'];
        await asset.updateComplete;

        expect(
          warnCalls.length,
          'at least one warning is emitted for invalid fit'
        ).toBeGreaterThan(0);
        expect(
          String(warnCalls[0]?.[1] || ''),
          'warning message references fit'
        ).toContain('fit');
      })
    );
  },
};

export const InvalidBackgroundWarningTest: Story = {
  render: () => html`
    <swc-asset>
      <img src="./images/avatar-preview.png" alt="Preview" />
    </swc-asset>
  `,
  play: async ({ canvasElement, step }) => {
    const asset = await getComponent<Asset>(canvasElement, 'swc-asset');

    await step('warns when an invalid background is set in DEBUG mode', () =>
      withWarningSpy(async (warnCalls) => {
        asset.background = 'gradient' as Asset['background'];
        await asset.updateComplete;

        expect(
          warnCalls.length,
          'at least one warning is emitted for invalid background'
        ).toBeGreaterThan(0);
        expect(
          String(warnCalls[0]?.[1] || ''),
          'warning message references background'
        ).toContain('background');
      })
    );
  },
};

export const AspectRatioNormalizationTest: Story = {
  render: () => html`
    <swc-asset>
      <img src="./images/avatar-preview.png" alt="Preview" />
    </swc-asset>
  `,
  play: async ({ canvasElement, step }) => {
    const asset = await getComponent<Asset>(canvasElement, 'swc-asset');

    await step('normalizes the "square" keyword to "1/1"', async () => {
      asset.aspectRatio = 'square';
      await asset.updateComplete;
      expect(asset.aspectRatio, 'square normalizes to 1/1').toBe('1/1');
    });

    await step('normalizes ":"-separated ratios to "/"', async () => {
      asset.aspectRatio = '16:9';
      await asset.updateComplete;
      expect(asset.aspectRatio, '16:9 normalizes to 16/9').toBe('16/9');
    });
  },
};

export const AspectRatioWidthHeightCombinationWarningTest: Story = {
  render: () => html`
    <swc-asset>
      <img src="./images/avatar-preview.png" alt="Preview" />
    </swc-asset>
  `,
  play: async ({ canvasElement, step }) => {
    const asset = await getComponent<Asset>(canvasElement, 'swc-asset');

    await step(
      'warns when aspectRatio is combined with both width and height',
      () =>
        withWarningSpy(async (warnCalls) => {
          asset.aspectRatio = '16/9';
          asset.width = '100px';
          asset.height = '100px';
          await asset.updateComplete;

          expect(
            warnCalls.length,
            'at least one warning is emitted for the combination'
          ).toBeGreaterThan(0);
        })
    );
  },
};

export const MultipleChildrenWarningTest: Story = {
  render: () => html`
    <swc-asset>
      <img src="./images/avatar-preview.png" alt="First" />
      <img src="./images/avatar-preview.png" alt="Second" />
    </swc-asset>
  `,
  play: async ({ canvasElement, step }) => {
    const asset = await getComponent<Asset>(canvasElement, 'swc-asset');

    await step('warns when more than one child is slotted', () =>
      withWarningSpy(async (warnCalls) => {
        // Re-trigger validation, which runs on every update.
        asset.requestUpdate();
        await asset.updateComplete;

        expect(
          warnCalls.length,
          'at least one warning is emitted for multiple children'
        ).toBeGreaterThan(0);
      })
    );
  },
};

export const UnsupportedChildTypeWarningTest: Story = {
  render: () => html`
    <swc-asset><span>Not an image</span></swc-asset>
  `,
  play: async ({ canvasElement, step }) => {
    const asset = await getComponent<Asset>(canvasElement, 'swc-asset');

    await step('warns when the slotted child is not img or svg', () =>
      withWarningSpy(async (warnCalls) => {
        asset.requestUpdate();
        await asset.updateComplete;

        expect(
          warnCalls.length,
          'at least one warning is emitted for an unsupported child type'
        ).toBeGreaterThan(0);
      })
    );
  },
};
