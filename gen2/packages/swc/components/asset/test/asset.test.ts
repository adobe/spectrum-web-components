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

import {
  getComponent,
  getComponents,
  withWarningSpy,
} from '../../../utils/test-utils.js';
import meta from '../stories/asset.internal.stories.js';
import { Overview, Variants } from '../stories/asset.internal.stories.js';

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

    await step('renders slotted content when no variant is set', async () => {
      const img = asset.querySelector('img');
      expect(asset.variant, 'variant when not set').toBeUndefined();
      expect(img, 'slotted img element is rendered').toBeTruthy();
      expect(
        img?.getAttribute('alt')?.length,
        'slotted img has a non-empty alt attribute'
      ).toBeGreaterThan(0);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Slots
// ──────────────────────────────────────────────────────────────

export const DefaultLabelFallbackTest: Story = {
  render: () => html`
    <swc-asset variant="file"></swc-asset>
    <swc-asset variant="folder"></swc-asset>
  `,
  play: async ({ canvasElement, step }) => {
    const assets = await getComponents<Asset>(canvasElement, 'swc-asset');

    await step('file variant falls back to default aria-label', async () => {
      const fileAsset = assets.find(
        (a) => a.getAttribute('variant') === 'file'
      ) as Asset | null;
      expect(fileAsset, 'file asset is rendered').toBeTruthy();
      const svg = fileAsset?.shadowRoot?.querySelector('svg');
      expect(svg, 'file asset has an SVG in shadow DOM').toBeTruthy();
      expect(svg?.getAttribute('aria-label'), 'file asset SVG aria-label').toBe(
        'File'
      );
    });

    await step('folder variant falls back to default aria-label', async () => {
      const folderAsset = assets.find(
        (a) => a.getAttribute('variant') === 'folder'
      ) as Asset | null;
      expect(folderAsset, 'folder asset is rendered').toBeTruthy();
      const svg = folderAsset?.shadowRoot?.querySelector('svg');
      expect(svg, 'folder asset has an SVG in shadow DOM').toBeTruthy();
      expect(
        svg?.getAttribute('aria-label'),
        'folder asset SVG defaults to "Folder" aria-label'
      ).toBe('Folder');
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Properties / Attributes
// ──────────────────────────────────────────────────────────────

export const LabelMutationTest: Story = {
  render: () => html`
    <swc-asset variant="file"></swc-asset>
  `,
  play: async ({ canvasElement, step }) => {
    const asset = await getComponent<Asset>(canvasElement, 'swc-asset');

    await step(
      'SVG aria-label reflects default "File" when label is empty',
      async () => {
        const svg = asset.shadowRoot?.querySelector('svg');
        expect(svg, 'SVG is rendered initially').toBeTruthy();
        expect(
          svg?.getAttribute('aria-label'),
          'SVG aria-label defaults to "File" when no label is set'
        ).toBe('File');
      }
    );

    await step(
      'SVG aria-label updates when label property is set',
      async () => {
        asset.label = 'Q4 Budget Report';
        await asset.updateComplete;
        const svg = asset.shadowRoot?.querySelector('svg');
        expect(
          svg?.getAttribute('aria-label'),
          'SVG aria-label after label update'
        ).toBe('Q4 Budget Report');
      }
    );

    await step(
      'SVG aria-label reverts to default when label is cleared',
      async () => {
        asset.label = '';
        await asset.updateComplete;
        const svg = asset.shadowRoot?.querySelector('svg');
        expect(
          svg?.getAttribute('aria-label'),
          'SVG aria-label reverts to "File" when label is cleared'
        ).toBe('File');
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Variants / States
// ──────────────────────────────────────────────────────────────

export const VariantsTest: Story = {
  ...Variants,
  play: async ({ canvasElement, step }) => {
    const assets = await getComponents<Asset>(canvasElement, 'swc-asset');

    await step('renders file and folder icons with labels', async () => {
      const fileAsset = assets.find(
        (item) => item.getAttribute('variant') === 'file'
      );
      const folderAsset = assets.find(
        (item) => item.getAttribute('variant') === 'folder'
      );

      expect(fileAsset, 'file variant asset is rendered').toBeTruthy();
      expect(folderAsset, 'folder variant asset is rendered').toBeTruthy();
    });
  },
};

export const VariantMutationTest: Story = {
  render: () => html`
    <swc-asset></swc-asset>
  `,
  play: async ({ canvasElement, step }) => {
    const asset = await getComponent<Asset>(canvasElement, 'swc-asset');

    await step('initially renders slot when no variant is set', async () => {
      expect(asset.variant, 'variant is initially undefined').toBeUndefined();
      const svg = asset.shadowRoot?.querySelector('svg');
      expect(svg, 'no SVG is rendered when variant is not set').toBeNull();
    });

    await step('renders file SVG after variant is set to "file"', async () => {
      asset.variant = 'file';
      await asset.updateComplete;
      expect(
        asset.getAttribute('variant'),
        'variant attribute is "file" after mutation'
      ).toBe('file');
      const svg = asset.shadowRoot?.querySelector('svg');
      expect(svg, 'file SVG is rendered after variant mutation').toBeTruthy();
      expect(
        svg?.getAttribute('aria-label'),
        'file SVG has default "File" aria-label'
      ).toBe('File');
    });

    await step(
      'renders folder SVG after variant is set to "folder"',
      async () => {
        asset.variant = 'folder';
        await asset.updateComplete;
        expect(
          asset.getAttribute('variant'),
          'variant attribute is "folder" after mutation'
        ).toBe('folder');
        const svg = asset.shadowRoot?.querySelector('svg');
        expect(
          svg,
          'folder SVG is rendered after variant mutation'
        ).toBeTruthy();
        expect(
          svg?.getAttribute('aria-label'),
          'folder SVG has default "Folder" aria-label'
        ).toBe('Folder');
      }
    );

    await step('reverts to slot content when variant is cleared', async () => {
      asset.variant = undefined;
      await asset.updateComplete;
      expect(
        asset.variant,
        'variant is undefined after clearing'
      ).toBeUndefined();
      expect(
        asset.hasAttribute('variant'),
        'variant attribute is absent after clearing'
      ).toBe(false);
      const svg = asset.shadowRoot?.querySelector('svg');
      expect(svg, 'no SVG is rendered after variant is cleared').toBeNull();
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Dev mode warnings
// ──────────────────────────────────────────────────────────────

export const InvalidVariantWarningTest: Story = {
  render: () => html`
    <swc-asset></swc-asset>
  `,
  play: async ({ canvasElement, step }) => {
    const asset = await getComponent<Asset>(canvasElement, 'swc-asset');

    await step('warns when an invalid variant is set in DEBUG mode', () =>
      withWarningSpy(async (warnCalls) => {
        asset.variant = 'not-a-variant' as Asset['variant'];
        await asset.updateComplete;

        expect(
          warnCalls.length,
          'at least one warning is emitted for invalid variant'
        ).toBeGreaterThan(0);
        expect(
          String(warnCalls[0]?.[1] || ''),
          'warning message references variant'
        ).toContain('variant');
      })
    );
  },
};

export const ValidVariantNoWarningTest: Story = {
  render: () => html`
    <swc-asset variant="file" label="Report"></swc-asset>
  `,
  play: async ({ canvasElement, step }) => {
    const asset = await getComponent<Asset>(canvasElement, 'swc-asset');

    await step('does not warn when a valid variant is set in DEBUG mode', () =>
      withWarningSpy(async (warnCalls) => {
        asset.variant = 'folder';
        await asset.updateComplete;

        expect(
          warnCalls.length,
          'no warnings are emitted for valid variant'
        ).toBe(0);
      })
    );
  },
};
