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

import { setupSwcWarningSpy } from '../../../utils/test-utils.js';
import meta from '../stories/asset.stories.js';
import { Accessibility, Overview, Variants } from '../stories/asset.stories.js';

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

const getAsset = (canvasElement: HTMLElement): Asset => {
    return canvasElement.querySelector('swc-asset') as Asset;
};

// Test: overview renders slotted content when no variant is set.
export const OverviewTest: Story = {
    ...Overview,
    play: async ({ canvasElement }) => {
        const asset = getAsset(canvasElement);
        await asset.updateComplete;
        const img = asset.querySelector('img');
        expect(asset.variant).toBeUndefined();
        expect(img).toBeTruthy();
        expect(img?.getAttribute('alt')?.length).toBeGreaterThan(0);
    },
};

// Test: variant stories render file and folder icons with labels.
export const VariantsTest: Story = {
    ...Variants,
    play: async ({ canvasElement }) => {
        const assets = Array.from(canvasElement.querySelectorAll('swc-asset'));
        const fileAsset = assets.find(
            (item) => item.getAttribute('variant') === 'file'
        );
        const folderAsset = assets.find(
            (item) => item.getAttribute('variant') === 'folder'
        );

        expect(fileAsset).toBeTruthy();
        expect(folderAsset).toBeTruthy();

        await fileAsset?.updateComplete;
        await folderAsset?.updateComplete;

        expect(
            fileAsset?.shadowRoot?.querySelector('.spectrum-Asset-file')
        ).toBeTruthy();
        expect(
            folderAsset?.shadowRoot?.querySelector('.spectrum-Asset-folder')
        ).toBeTruthy();
    },
};

// Test: accessibility story provides labels for file and folder icons.
export const AccessibilityTest: Story = {
    ...Accessibility,
    play: async ({ canvasElement }) => {
        const assets = Array.from(canvasElement.querySelectorAll('swc-asset'));
        const fileAsset = assets.find(
            (item) => item.getAttribute('variant') === 'file'
        );
        const folderAsset = assets.find(
            (item) => item.getAttribute('variant') === 'folder'
        );

        await fileAsset?.updateComplete;
        await folderAsset?.updateComplete;

        const fileIcon = fileAsset?.shadowRoot?.querySelector(
            '.spectrum-Asset-file'
        );
        const folderIcon = folderAsset?.shadowRoot?.querySelector(
            '.spectrum-Asset-folder'
        );

        expect(fileIcon?.getAttribute('aria-label')?.length).toBeGreaterThan(0);
        expect(folderIcon?.getAttribute('aria-label')?.length).toBeGreaterThan(
            0
        );
    },
};

// Test: invalid variant warns in DEBUG mode.
export const InvalidVariantWarningTest: Story = {
    render: () => html` <swc-asset></swc-asset> `,
    play: async ({ canvasElement }) => {
        const asset = getAsset(canvasElement);
        const { warnCalls, restore } = setupSwcWarningSpy();

        try {
            asset.variant = 'not-a-variant' as Asset['variant'];
            await asset.updateComplete;

            expect(warnCalls.length).toBeGreaterThan(0);
            expect(String(warnCalls[0]?.[1] || '')).toContain('variant');
        } finally {
            restore();
        }
    },
};
