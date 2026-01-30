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

import { StatusLight } from '@adobe/swc/status-light';

import '@adobe/swc/status-light';

import { meta as baseMeta } from '../stories/status-light.stories.js';
import {
    Default as BaseDefault,
    Sizes as BaseSizes,
} from '../stories/status-light.stories.js';

// This file defines dev-only test stories that reuse the main story metadata.
export default {
    ...baseMeta,
    title: 'Status light/Tests',
    parameters: {
        ...baseMeta.parameters,
        docs: { disable: true, page: null },
    },
    tags: ['!autodocs'],
} as Meta;

// Reuse the same element lookup for all play functions.
const getStatusLight = (canvasElement: HTMLElement): StatusLight => {
    return canvasElement.querySelector('swc-status-light') as StatusLight;
};

// Test: default properties and slot content.
export const DefaultTest: Story = {
    ...BaseDefault,
    play: async ({ canvasElement }) => {
        const statusLight = getStatusLight(canvasElement);
        expect(statusLight.variant).toBe('info');
        expect(statusLight.size).toBe('m');
        expect(statusLight.textContent?.trim()).toBeTruthy();
    },
};

// Test: each size renders and reflects correctly.
export const SizesTest: Story = {
    ...BaseSizes,
    play: async ({ canvasElement }) => {
        StatusLight.VALID_SIZES.forEach((size) => {
            // Get the current status light from the canvas element.
            const statusLight = canvasElement.querySelector(
                `swc-status-light[size="${size}"]`
            ) as StatusLight;
            expect(statusLight.variant).toBe('info');
            expect(statusLight.size).toBe(size);
        });
    },
};

// Test: composed content still renders the status light.
export const ComposedComponentTest: Story = {
    render: () => html`
        <div style="display: flex; gap: 10px;">
            <swc-status-light variant="positive" size="m">
                <span>Positive</span>
            </swc-status-light>
            <p>This is a test of the composed component</p>
        </div>
    `,
    play: async ({ canvasElement }) => {
        const statusLight = getStatusLight(canvasElement);
        expect(statusLight.variant).toBe('positive');
        expect(statusLight.size).toBe('m');
        expect(statusLight.textContent?.trim()).toBeTruthy();
    },
};
