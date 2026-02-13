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

import { Asset } from '@adobe/swc/asset';

import '@adobe/swc/asset';

import {
    getComponent,
    getComponents,
    withWarningSpy,
} from '../../../utils/test-utils.js';
import meta from '../stories/asset.stories.js';
import { Overview, Variants } from '../stories/asset.stories.js';

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

        await step(
            'renders slotted content when no variant is set',
            async () => {
                const img = asset.querySelector('img');
                expect(asset.variant).toBeUndefined();
                expect(img).toBeTruthy();
                expect(img?.getAttribute('alt')?.length).toBeGreaterThan(0);
            }
        );
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

        await step(
            'file variant falls back to default aria-label',
            async () => {
                const fileAsset = assets.find(
                    (a) => a.getAttribute('variant') === 'file'
                ) as Asset;
                const svg = fileAsset.shadowRoot?.querySelector('svg');
                expect(svg?.getAttribute('aria-label')).toBe('File');
            }
        );

        await step(
            'folder variant falls back to default aria-label',
            async () => {
                const folderAsset = assets.find(
                    (a) => a.getAttribute('variant') === 'folder'
                ) as Asset;
                const svg = folderAsset.shadowRoot?.querySelector('svg');
                expect(svg?.getAttribute('aria-label')).toBe('Folder');
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

            expect(fileAsset).toBeTruthy();
            expect(folderAsset).toBeTruthy();
        });
    },
};

// ──────────────────────────────────────────────────────────────
// TEST: Dev mode warnings
// ──────────────────────────────────────────────────────────────

export const InvalidVariantWarningTest: Story = {
    render: () => html` <swc-asset></swc-asset> `,
    play: async ({ canvasElement, step }) => {
        const asset = await getComponent<Asset>(canvasElement, 'swc-asset');

        await step('warns when an invalid variant is set in DEBUG mode', () =>
            withWarningSpy(async (warnCalls) => {
                asset.variant = 'not-a-variant' as Asset['variant'];
                await asset.updateComplete;

                expect(warnCalls.length).toBeGreaterThan(0);
                expect(String(warnCalls[0]?.[1] || '')).toContain('variant');
            })
        );
    },
};

export const ValidVariantNoWarningTest: Story = {
    render: () => html` <swc-asset variant="file" label="Report"></swc-asset> `,
    play: async ({ canvasElement, step }) => {
        const asset = await getComponent<Asset>(canvasElement, 'swc-asset');

        await step(
            'does not warn when a valid variant is set in DEBUG mode',
            () =>
                withWarningSpy(async (warnCalls) => {
                    asset.variant = 'folder';
                    await asset.updateComplete;

                    expect(warnCalls.length).toBe(0);
                })
        );
    },
};
