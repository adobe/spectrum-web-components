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
import { expect } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import { Divider } from '@adobe/swc/divider';

import '@adobe/swc/divider';

import baseMeta from '../stories/divider.stories.js';
import {
    Overview as BaseOverview,
    Sizes as BaseSizes,
    StaticColors as BaseStaticColors,
    Vertical as BaseVertical,
} from '../stories/divider.stories.js';

// This file defines dev-only test stories that reuse the main story metadata.
export default {
    ...baseMeta,
    title: 'Divider/Tests',
    parameters: {
        ...baseMeta.parameters,
        docs: { disable: true, page: null },
    },
    tags: ['!autodocs', 'dev'],
} as Meta;

const getDivider = (canvasElement: HTMLElement): Divider => {
    return canvasElement.querySelector('swc-divider') as Divider;
};

// Test: overview renders a separator with a size class.
export const OverviewTest: Story = {
    ...BaseOverview,
    play: async ({ canvasElement }) => {
        const divider = getDivider(canvasElement);
        await divider.updateComplete;
        expect(divider.getAttribute('role')).toBe('separator');
        expect(divider.getAttribute('size')).toBe('m');
        expect(
            divider.shadowRoot?.querySelector('.swc-Divider--sizeM')
        ).toBeTruthy();
    },
};

// Test: each size renders the expected size class.
export const SizesTest: Story = {
    ...BaseSizes,
    play: async ({ canvasElement }) => {
        Divider.VALID_SIZES.forEach((size) => {
            const divider = canvasElement.querySelector(
                `swc-divider[size="${size}"]`
            ) as Divider | null;
            if (!divider) {
                return;
            }
            expect(divider.size).toBe(size);
            expect(
                divider.shadowRoot?.querySelector(
                    `.swc-Divider--size${size.toUpperCase()}`
                )
            ).toBeTruthy();
        });
    },
};

// Test: vertical dividers reflect orientation and class.
export const VerticalTest: Story = {
    ...BaseVertical,
    play: async ({ canvasElement }) => {
        const dividers = Array.from(
            canvasElement.querySelectorAll('swc-divider')
        );
        dividers.forEach((divider) => {
            expect(divider.hasAttribute('vertical')).toBe(true);
            expect(divider.getAttribute('aria-orientation')).toBe('vertical');
            expect(
                divider.shadowRoot?.querySelector('.swc-Divider--vertical')
            ).toBeTruthy();
        });
    },
};

// Test: static colors reflect to attribute and class.
export const StaticColorsTest: Story = {
    ...BaseStaticColors,
    play: async ({ canvasElement }) => {
        const dividers = Array.from(
            canvasElement.querySelectorAll('swc-divider[static-color]')
        );
        dividers.forEach((divider) => {
            const staticColor = divider.getAttribute('static-color');
            expect(staticColor).toBeTruthy();
            const className = `swc-Divider--static${staticColor
                ?.toString()
                .slice(0, 1)
                .toUpperCase()}${staticColor?.toString().slice(1)}`;
            expect(
                divider.shadowRoot?.querySelector(`.${className}`)
            ).toBeTruthy();
        });
    },
};
