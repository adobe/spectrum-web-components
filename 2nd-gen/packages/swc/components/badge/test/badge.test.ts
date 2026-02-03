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

import {
    BADGE_VALID_SIZES,
    BADGE_VARIANTS_COLOR_S2,
    BADGE_VARIANTS_S2,
    BADGE_VARIANTS_SEMANTIC,
    FIXED_VALUES,
} from '../../../../core/components/badge/Badge.types.js';
import { meta } from '../stories/badge.stories.js';
import {
    Anatomy,
    Fixed,
    NonSemanticVariants,
    Outline,
    Overview,
    SemanticVariants,
    Sizes,
    Subtle,
} from '../stories/badge.stories.js';

// This file defines dev-only test stories that reuse the main story metadata.
export default {
    ...meta,
    title: 'Badge/Tests',
    parameters: {
        ...meta.parameters,
        docs: { disable: true, page: null },
    },
    tags: ['!autodocs', 'dev'],
} as Meta;

// Reuse the same element lookup for all play functions.
const getBadge = (canvasElement: HTMLElement): Badge => {
    return canvasElement.querySelector('swc-badge') as Badge;
};

// Test: overview args render expected values and slot content.
export const OverviewTest: Story = {
    ...Overview,
    play: async ({ canvasElement }) => {
        const badge = getBadge(canvasElement);
        await badge.updateComplete;
        expect(badge.variant).toBe('informative');
        expect(badge.size).toBe('m');
        expect(badge.textContent?.trim()).toBeTruthy();
    },
};

// Test: anatomy includes icon slot content.
export const AnatomyTest: Story = {
    ...Anatomy,
    play: async ({ canvasElement }) => {
        const badges = Array.from(canvasElement.querySelectorAll('swc-badge'));
        const badgeWithIcon = badges.find((item) =>
            item.querySelector('[slot="icon"]')
        );
        expect(badgeWithIcon).toBeTruthy();
        const slottedIcon = badgeWithIcon?.querySelector('[slot="icon"]');
        expect(slottedIcon).toBeTruthy();
        expect(slottedIcon?.textContent?.trim()).toBeTruthy();
    },
};

// Test: semantic variant reflects to attribute and class.
export const SemanticVariantsTest: Story = {
    ...SemanticVariants,
    play: async ({ canvasElement }) => {
        BADGE_VARIANTS_SEMANTIC.forEach((variant) => {
            const badge = canvasElement.querySelector(
                `swc-badge[variant="${variant}"]`
            ) as Badge | null;
            expect(badge).toBeTruthy();
            const semanticClass = badge?.shadowRoot
                ?.querySelector(`.swc-Badge--${variant}`)
                ?.classList.contains(`swc-Badge--${variant}`);
            expect(semanticClass).toBe(true);
        });
    },
};

// Test: outline reflects to attribute and can be toggled.
export const OutlineTest: Story = {
    ...Outline,
    play: async ({ canvasElement }) => {
        BADGE_VARIANTS_SEMANTIC.forEach((variant) => {
            const badge = canvasElement.querySelector(
                `swc-badge[variant="${variant}"]`
            ) as Badge | null;
            expect(badge?.hasAttribute('outline')).toBe(true);
            expect(
                badge?.shadowRoot?.querySelector('.swc-Badge--outline')
            ).toBeTruthy();
        });
    },
};

// Test: size reflects to attribute and can be changed.
export const SizesTest: Story = {
    ...Sizes,
    play: async ({ canvasElement }) => {
        BADGE_VALID_SIZES.forEach((size) => {
            const badge = canvasElement.querySelector(
                `swc-badge[size="${size}"]`
            ) as Badge | null;
            expect(badge).toBeTruthy();
            expect(badge?.size).toBe(size);
        });
    },
};

// Test: subtle reflects to attribute and can be toggled.
export const SubtleTest: Story = {
    ...Subtle,
    play: async ({ canvasElement }) => {
        BADGE_VARIANTS_S2.forEach((variant) => {
            const badge = canvasElement.querySelector(
                `swc-badge[variant="${variant}"]`
            ) as Badge | null;
            expect(badge?.hasAttribute('subtle')).toBe(true);
            expect(
                badge?.shadowRoot?.querySelector('.swc-Badge--subtle')
            ).toBeTruthy();
        });
    },
};

// Test: fixed reflects to attribute and can be changed.
export const FixedTest: Story = {
    ...Fixed,
    play: async ({ canvasElement }) => {
        FIXED_VALUES.forEach((value) => {
            const badge = canvasElement.querySelector(
                `swc-badge[fixed="${value}"]`
            ) as Badge | null;
            expect(badge).toBeTruthy();
            expect(
                badge?.shadowRoot?.querySelector(`.swc-Badge--fixed-${value}`)
            ).toBeTruthy();
        });
    },
};

// Test: color variants reflect to attribute and class.
export const NonSemanticVariantsTest: Story = {
    ...NonSemanticVariants,
    play: async ({ canvasElement }) => {
        BADGE_VARIANTS_COLOR_S2.forEach(async (variant) => {
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
