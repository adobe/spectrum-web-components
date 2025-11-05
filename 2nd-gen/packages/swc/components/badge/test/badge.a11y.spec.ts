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

import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

import { gotoStory } from '../../../../../../1st-gen/test/a11y-helpers.js';

/**
 * Accessibility tests for Badge component (2nd Generation)
 *
 * Tests both ARIA snapshot structure and aXe WCAG compliance
 *
 * Note: Uses the same test helpers as 1st gen - they work for both!
 * Key differences:
 * - Story IDs: 'components-badge--default' (vs 'badge--default' in 1st gen)
 * - Element name: 'swc-badge' (vs 'sp-badge' in 1st gen)
 * - Storybook port: 6006 (vs 8080 in 1st gen) - handled by Playwright projects
 */

test.describe('Badge - ARIA Snapshots', () => {
    test('should have correct accessibility tree for default badge', async ({
        page,
    }) => {
        const badge = await gotoStory(
            page,
            'components-badge--default',
            'swc-badge'
        );
        const snapshot = await badge.ariaSnapshot();

        expect(snapshot).toBeTruthy();
        await expect(badge).toMatchAriaSnapshot();
    });

    test('should handle semantic variants', async ({ page }) => {
        const badge = await gotoStory(
            page,
            'components-badge--semantic-variants',
            'swc-badge'
        );
        const snapshot = await badge.ariaSnapshot();

        expect(snapshot).toBeTruthy();
        await expect(badge).toMatchAriaSnapshot();
    });
});

test.describe('Badge - aXe Validation', () => {
    test('should not have accessibility violations - default', async ({
        page,
    }) => {
        await gotoStory(page, 'components-badge--default', 'swc-badge');

        const results = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
            .analyze();

        expect(results.violations).toEqual([]);
    });

    test('should not have violations - semantic variants', async ({ page }) => {
        await gotoStory(
            page,
            'components-badge--semantic-variants',
            'swc-badge'
        );

        // Wait for any ongoing axe runs to complete
        await page.waitForLoadState('networkidle');

        const results = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
            .analyze();

        expect(results.violations).toEqual([]);
    });
});
