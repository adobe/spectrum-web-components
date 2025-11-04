/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { gotoStory } from '../../../../2nd-gen/test/a11y-helpers.js';

/**
 * Accessibility tests for Badge component
 *
 * Tests both ARIA snapshot structure and aXe WCAG compliance
 */

test.describe('Badge - ARIA Snapshots', () => {
    test('should have correct accessibility tree for default badge', async ({
        page,
    }) => {
        const badge = await gotoStory(page, 'badge--default', 'sp-badge');
        const snapshot = await badge.ariaSnapshot();

        expect(snapshot).toBeTruthy();
        await expect(badge).toMatchAriaSnapshot();
    });

    test('should handle badge with icon', async ({ page }) => {
        const badge = await gotoStory(page, 'badge--icons', 'sp-badge');
        const snapshot = await badge.ariaSnapshot();

        expect(snapshot).toBeTruthy();
    });

    test('should maintain accessibility with semantic variants', async ({
        page,
    }) => {
        await gotoStory(page, 'badge--semantic', 'sp-badge');
        const badges = page.locator('sp-badge');

        const count = await badges.count();
        expect(count).toBeGreaterThan(0);

        // Verify each badge is accessible
        for (let i = 0; i < count; i++) {
            const badge = badges.nth(i);
            const snapshot = await badge.ariaSnapshot();
            expect(snapshot).toBeTruthy();
        }
    });
});

test.describe('Badge - aXe Validation', () => {
    test('should not have accessibility violations - default', async ({
        page,
    }) => {
        await gotoStory(page, 'badge--default', 'sp-badge');

        const results = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
            .analyze();

        expect(results.violations).toEqual([]);
    });

    test('should not have violations - semantic variants', async ({ page }) => {
        await gotoStory(page, 'badge--semantic', 'sp-badge');

        const results = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
            .analyze();

        expect(results.violations).toEqual([]);
    });

    test('should not have violations - with icon', async ({ page }) => {
        await gotoStory(page, 'badge--icons', 'sp-badge');

        const results = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
            .analyze();

        expect(results.violations).toEqual([]);
    });

    test('should verify color contrast', async ({ page }) => {
        await gotoStory(page, 'badge--semantic', 'sp-badge');

        const results = await new AxeBuilder({ page })
            .withRules(['color-contrast'])
            .analyze();

        expect(results.violations).toEqual([]);
    });
});
