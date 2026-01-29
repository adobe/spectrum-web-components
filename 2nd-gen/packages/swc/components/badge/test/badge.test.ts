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

import type { Badge } from '@adobe/swc/badge';

type StoryTestContext = {
    canvasElement: HTMLElement;
};

import '@adobe/swc/badge';

// ──────────────────────────────────────────────────────────────
// TEST: Defaults
// ──────────────────────────────────────────────────────────────

/**
 * Test: should have correct default property values
 */
const testBadgeDefaults = async (badge: Badge) => {
    await expect(badge.variant).toBe('informative');
    await expect(badge.subtle).toBe(false);
    await expect(badge.outline).toBe(false);
    await expect(badge.fixed).toBeUndefined();
    await expect(badge.size).toBe('m');
};

// ──────────────────────────────────────────────────────────────
// TEST: Properties / Attributes
// ──────────────────────────────────────────────────────────────

/**
 * Test: should reflect variant property to attribute
 */
const testVariantPropertyReflection = async (badge: Badge) => {
    await badge.updateComplete;
    await expect(badge.getAttribute('variant')).toBe('positive');
    await expect(
        badge.shadowRoot?.querySelector('.swc-Badge--positive')
    ).toBeTruthy();
};

/**
 * Test: should reflect subtle property to attribute
 */
const testSubtlePropertyReflection = async (badge: Badge) => {
    await badge.updateComplete;
    await expect(badge.hasAttribute('subtle')).toBe(true);
    await expect(
        badge.shadowRoot?.querySelector('.swc-Badge--subtle')
    ).toBeTruthy();
};

/**
 * Test: should set subtle via attribute
 */
const testSubtlePropertySetViaAttribute = async (badge: Badge) => {
    badge.subtle = false;
    await badge.updateComplete;
    await expect(badge.subtle).toBe(false);
};

/**
 * Test: should reflect outline property to attribute
 */
const testOutlinePropertyReflection = async (badge: Badge) => {
    await badge.updateComplete;
    await expect(badge.hasAttribute('outline')).toBe(true);
    await expect(
        badge.shadowRoot?.querySelector('.swc-Badge--outline')
    ).toBeTruthy();
};

/**
 * Test: should set outline via attribute
 */
const testOutlinePropertySetViaAttribute = async (badge: Badge) => {
    badge.outline = false;
    await badge.updateComplete;
    await expect(badge.outline).toBe(false);
};

/**
 * Test: should handle fixed property
 */
const testFixedProperty = async (badge: Badge) => {
    await badge.updateComplete;
    await expect(badge.getAttribute('fixed')).toBe('inline-start');
    await expect(
        badge.shadowRoot?.querySelector('.swc-Badge--fixed-inline-start')
    ).toBeTruthy();
};

/**
 * Test: should set fixed via attribute
 */
const testFixedPropertySetViaAttribute = async (badge: Badge) => {
    badge.fixed = 'inline-end';
    await badge.updateComplete;
    await expect(badge.fixed).toBe('inline-end');
};

/**
 * Test: should handle size property
 */
const testSizeProperty = async (badge: Badge) => {
    await badge.updateComplete;
    await expect(badge.getAttribute('size')).toBe('l');
};

/**
 * Test: should set size via attribute
 */
const testSizePropertySetViaAttribute = async (badge: Badge) => {
    badge.size = 'm';
    await badge.updateComplete;
    await expect(badge.size).toBe('m');
};

// ──────────────────────────────────────────────────────────────
// TEST: Slots
// ──────────────────────────────────────────────────────────────

/**
 * Test: should render default slot content
 */
const testDefaultSlotContent = async (badge: Badge) => {
    await expect(badge.textContent?.trim()).toBeTruthy();
};

/**
 * Test: should accept icon slot
 */
const testIconSlot = async (badge: Badge) => {
    // Verify slotted icon is present in light DOM
    const slottedIcon = badge.querySelector('[slot="icon"]');
    await expect(slottedIcon).toBeTruthy();
    await expect(slottedIcon?.textContent?.trim()).toBeTruthy();
};

const getBadge = (context: StoryTestContext): Badge => {
    return context.canvasElement.querySelector('swc-badge') as Badge;
};

export const storyTests = {
    Default: async (context: StoryTestContext) => {
        const badge = getBadge(context);
        await testBadgeDefaults(badge);
        await testDefaultSlotContent(badge);
    },
    WithIcon: async (context: StoryTestContext) => {
        const badge = getBadge(context);
        await testIconSlot(badge);
    },
    SemanticVariants: async (context: StoryTestContext) => {
        const badge = getBadge(context);
        await testVariantPropertyReflection(badge);
    },
    Outline: async (context: StoryTestContext) => {
        const badge = getBadge(context);
        await testOutlinePropertyReflection(badge);
        await testOutlinePropertySetViaAttribute(badge);
    },
    Sizes: async (context: StoryTestContext) => {
        const badge = getBadge(context);
        await testSizeProperty(badge);
        await testSizePropertySetViaAttribute(badge);
    },
    Subtle: async (context: StoryTestContext) => {
        const badge = getBadge(context);
        await testSubtlePropertyReflection(badge);
        await testSubtlePropertySetViaAttribute(badge);
    },
    Fixed: async (context: StoryTestContext) => {
        const badge = getBadge(context);
        await testFixedProperty(badge);
        await testFixedPropertySetViaAttribute(badge);
    },
};
