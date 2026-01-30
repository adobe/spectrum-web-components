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

import { Badge } from '@adobe/swc/badge';

import '@adobe/swc/badge';

import { meta as baseMeta } from '../stories/badge.stories.js';
import {
    ColorVariants as BaseColorVariants,
    Default as BaseDefault,
    Fixed as BaseFixed,
    Outline as BaseOutline,
    SemanticVariants as BaseSemanticVariants,
    Sizes as BaseSizes,
    Subtle as BaseSubtle,
    WithIcon as BaseWithIcon,
} from '../stories/badge.stories.js';

// This file defines dev-only test stories that reuse the main story metadata.
export default {
    ...baseMeta,
    title: 'Badge/Tests',
    parameters: {
        ...baseMeta.parameters,
        docs: { disable: true, page: null },
    },
    tags: ['!autodocs'],
} as Meta;

// Reuse the same element lookup for all play functions.
const getBadge = (canvasElement: HTMLElement): Badge => {
    return canvasElement.querySelector('swc-badge') as Badge;
};

// Test: default properties and slot content.
export const DefaultTest: Story = {
    ...BaseDefault,
    play: async ({ canvasElement }) => {
        const badge = getBadge(canvasElement);
        expect(badge.variant).toBe('informative');
        expect(badge.subtle).toBe(false);
        expect(badge.outline).toBe(false);
        expect(badge.fixed).toBeUndefined();
        expect(badge.size).toBe('m');
        expect(badge.textContent?.trim()).toBeTruthy();
    },
};

// Test: icon slot content is present.
export const WithIconTest: Story = {
    ...BaseWithIcon,
    play: async ({ canvasElement }) => {
        const badge = getBadge(canvasElement);
        const slottedIcon = badge.querySelector('[slot="icon"]');
        expect(slottedIcon).toBeTruthy();
        expect(slottedIcon?.textContent?.trim()).toBeTruthy();
    },
};

// Test: semantic variant reflects to attribute and class.
export const SemanticVariantsTest: Story = {
    ...BaseSemanticVariants,
    play: async ({ canvasElement }) => {
        const badge = getBadge(canvasElement);
        await badge.updateComplete;
        expect(badge.getAttribute('variant')).toBe('positive');
        expect(
            badge.shadowRoot?.querySelector('.swc-Badge--positive')
        ).toBeTruthy();
    },
};

// Test: outline reflects to attribute and can be toggled.
export const OutlineTest: Story = {
    ...BaseOutline,
    play: async ({ canvasElement }) => {
        const badge = getBadge(canvasElement);
        await badge.updateComplete;
        expect(badge.hasAttribute('outline')).toBe(true);
        expect(
            badge.shadowRoot?.querySelector('.swc-Badge--outline')
        ).toBeTruthy();
        badge.outline = false;
        await badge.updateComplete;
        expect(badge.outline).toBe(false);
    },
};

// Test: size reflects to attribute and can be changed.
export const SizesTest: Story = {
    ...BaseSizes,
    play: async ({ canvasElement }) => {
        const badge = getBadge(canvasElement);
        await badge.updateComplete;
        expect(badge.getAttribute('size')).toBe('l');
        badge.size = 'm';
        await badge.updateComplete;
        expect(badge.size).toBe('m');
    },
};

// Test: subtle reflects to attribute and can be toggled.
export const SubtleTest: Story = {
    ...BaseSubtle,
    play: async ({ canvasElement }) => {
        const badge = getBadge(canvasElement);
        await badge.updateComplete;
        expect(badge.hasAttribute('subtle')).toBe(true);
        expect(
            badge.shadowRoot?.querySelector('.swc-Badge--subtle')
        ).toBeTruthy();
        badge.subtle = false;
        await badge.updateComplete;
        expect(badge.subtle).toBe(false);
    },
};

// Test: fixed reflects to attribute and can be changed.
export const FixedTest: Story = {
    ...BaseFixed,
    play: async ({ canvasElement }) => {
        const badge = getBadge(canvasElement);
        await badge.updateComplete;
        expect(badge.getAttribute('fixed')).toBe('inline-start');
        expect(
            badge.shadowRoot?.querySelector('.swc-Badge--fixed-inline-start')
        ).toBeTruthy();
        badge.fixed = 'inline-end';
        await badge.updateComplete;
        expect(badge.fixed).toBe('inline-end');
    },
};

// Test: color variants reflect to attribute and class.
export const ColorVariantsTest: Story = {
    ...BaseColorVariants,
    play: async ({ canvasElement }) => {
        Badge.VARIANTS_COLOR.forEach(async (variant) => {
            const badge = canvasElement.querySelector(
                `swc-badge[variant="${variant}"]`
            ) as Badge;
            await badge.updateComplete;
            expect(badge.getAttribute('variant')).toBe(variant);
            expect(
                badge.shadowRoot?.querySelector(`.swc-Badge--${variant}`)
            ).toBeTruthy();
        });
    },
};
