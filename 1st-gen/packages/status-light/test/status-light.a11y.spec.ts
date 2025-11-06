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
 * Accessibility tests for Status Light component
 *
 * Tests both ARIA snapshot structure and aXe WCAG compliance
 */

test.describe('Status Light - ARIA Snapshots', () => {
    test('should have correct accessibility tree structure', async ({
        page,
    }) => {
        const statusLight = await gotoStory(
            page,
            'statuslight--m',
            'sp-status-light'
        );

        const snapshot = await statusLight.ariaSnapshot();
        expect(snapshot).toBeTruthy();
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
            expect(snapshot).toBeTruthy();
        }
    });

    test('should handle disabled state', async ({ page }) => {
        const statusLight = await gotoStory(
            page,
            'statuslight--disabled-true',
            'sp-status-light'
        );

        const snapshot = await statusLight.ariaSnapshot();
        expect(snapshot).toBeTruthy();
    });
});

test.describe('Status Light - aXe Validation', () => {
    test('should not have accessibility violations - medium size', async ({
        page,
    }) => {
        await gotoStory(page, 'statuslight--m', 'sp-status-light');

        const results = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
            .analyze();

        expect(results.violations).toEqual([]);
    });

    test('should not have violations - different sizes', async ({ page }) => {
        const sizes = ['s', 'l'];

        for (const size of sizes) {
            await gotoStory(page, `statuslight--${size}`, 'sp-status-light');

            const results = await new AxeBuilder({ page })
                .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
                .analyze();

            expect(results.violations).toEqual([]);
        }
    });

    test('should not have violations - disabled state', async ({ page }) => {
        await gotoStory(page, 'statuslight--disabled-true', 'sp-status-light');

        const results = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
            .analyze();

        expect(results.violations).toEqual([]);
    });

    test('should verify color contrast', async ({ page }) => {
        await gotoStory(page, 'statuslight--m', 'sp-status-light');

        const results = await new AxeBuilder({ page })
            .withRules(['color-contrast'])
            .analyze();

        expect(results.violations).toEqual([]);
    });
});
