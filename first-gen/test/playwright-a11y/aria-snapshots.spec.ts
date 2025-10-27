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
import { gotoStory } from './test-helpers.js';

/**
 * ARIA Snapshot Testing Examples
 *
 * These tests demonstrate how to use Playwright's ARIA snapshot testing to verify
 * the accessibility tree structure of components. ARIA snapshots allow you to:
 *
 * 1. Assert the semantic structure of your component
 * 2. Verify proper ARIA roles and labels
 * 3. Ensure correct keyboard navigation structure
 * 4. Create regression tests for accessibility tree changes
 *
 * Learn more: https://playwright.dev/docs/aria-snapshots
 */

test.describe('ARIA Snapshot Testing - Badge Component', () => {
    test('should have correct accessibility tree structure for default badge', async ({
        page,
    }) => {
        // Navigate to story and wait for component to be fully ready
        const badge = await gotoStory(page, 'badge--default', 'sp-badge');

        const snapshot = await badge.ariaSnapshot();

        // Verify the basic structure exists
        expect(snapshot).toBeTruthy();

        // Badge should be a generic element with text content
        await expect(badge).toMatchAriaSnapshot();
    });

    test('should handle badge with icon', async ({ page }) => {
        const badge = await gotoStory(page, 'badge--icons', 'sp-badge');

        const snapshot = await badge.ariaSnapshot();

        // Badge with icon should still be accessible
        expect(snapshot).toBeTruthy();
    });

    test('should maintain accessibility with semantic variants', async ({
        page,
    }) => {
        await gotoStory(page, 'badge--semantic', 'sp-badge');
        const badges = page.locator('sp-badge');

        const count = await badges.count();

        expect(count).toBeGreaterThan(0);

        // Test the first badge
        const firstBadge = badges.first();
        const snapshot = await firstBadge.ariaSnapshot();
        expect(snapshot).toBeTruthy();
    });
});

test.describe('ARIA Snapshot Testing - Status Light Component', () => {
    test('should have correct accessibility tree structure for status light', async ({
        page,
    }) => {
        const statusLight = await gotoStory(
            page,
            'statuslight--m',
            'sp-status-light'
        );

        const snapshot = await statusLight.ariaSnapshot();

        // Status light should be accessible with its text content
        expect(snapshot).toBeTruthy();

        // Create baseline snapshot
        await expect(statusLight).toMatchAriaSnapshot();
    });

    test('should reflect different sizes', async ({ page }) => {
        const sizes = ['s', 'm', 'l'];

        for (const size of sizes) {
            const statusLight = await gotoStory(
                page,
                `statuslight--${size}`,
                'sp-status-light'
            );

            const snapshot = await statusLight.ariaSnapshot();

            // Each size should maintain accessibility
            expect(snapshot).toBeTruthy();
        }
    });

    test('should handle disabled status light', async ({ page }) => {
        const statusLight = await gotoStory(
            page,
            'statuslight--disabled-true',
            'sp-status-light'
        );

        const snapshot = await statusLight.ariaSnapshot();

        // Disabled state should still be accessible
        expect(snapshot).toBeTruthy();
    });
});
