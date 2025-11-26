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

import { gotoStory } from '../../../utils/a11y-helpers.js';

/**
 * Accessibility tests for Status Light component (2nd Generation)
 *
 * Tests both ARIA snapshot structure and aXe WCAG compliance
 *
 * Note: Uses the same test helpers as 1st gen - they work for both!
 * Key differences:
 * - Story IDs: 'components-status-light--default' (vs 'statuslight--m' in 1st gen)
 * - Element name: 'swc-status-light' (vs 'sp-status-light' in 1st gen)
 * - Storybook port: 6006 (vs 8080 in 1st gen) - handled by Playwright projects
 */

test.describe('Status Light - ARIA Snapshots', () => {
    test('should have correct accessibility tree structure', async ({
        page,
    }) => {
        const statusLight = await gotoStory(
            page,
            'components-status-light--default',
            'swc-status-light'
        );

        const snapshot = await statusLight.ariaSnapshot();
        expect(snapshot).toBeTruthy();
        await expect(statusLight).toMatchAriaSnapshot();
    });

    test('should handle semantic variants', async ({ page }) => {
        const statusLight = await gotoStory(
            page,
            'components-status-light--semantic-variants',
            'swc-status-light'
        );

        const snapshot = await statusLight.ariaSnapshot();
        expect(snapshot).toBeTruthy();
        await expect(statusLight).toMatchAriaSnapshot();
    });

    test('should reflect different sizes', async ({ page }) => {
        const statusLight = await gotoStory(
            page,
            'components-status-light--sizes',
            'swc-status-light'
        );

        const snapshot = await statusLight.ariaSnapshot();
        expect(snapshot).toBeTruthy();
        await expect(statusLight).toMatchAriaSnapshot();
    });
});

test.describe('Status Light - aXe Validation', () => {
    test('should not have accessibility violations - default', async ({
        page,
    }) => {
        await gotoStory(
            page,
            'components-status-light--default',
            'swc-status-light'
        );

        const results = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
            .analyze();

        expect(results.violations).toEqual([]);
    });

    test('should not have violations - semantic variants', async ({ page }) => {
        await gotoStory(
            page,
            'components-status-light--semantic-variants',
            'swc-status-light'
        );

        const results = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
            .analyze();

        expect(results.violations).toEqual([]);
    });

    test('should not have violations - sizes', async ({ page }) => {
        await gotoStory(
            page,
            'components-status-light--sizes',
            'swc-status-light'
        );

        const results = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
            .analyze();

        expect(results.violations).toEqual([]);
    });

    test('should verify color contrast', async ({ page }) => {
        await gotoStory(
            page,
            'components-status-light--default',
            'swc-status-light'
        );

        const results = await new AxeBuilder({ page })
            .withRules(['color-contrast'])
            .analyze();

        expect(results.violations).toEqual([]);
    });
});
