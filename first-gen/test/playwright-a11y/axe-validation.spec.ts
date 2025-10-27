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
import { gotoStory } from './test-helpers.js';

/**
 * Accessibility Rule Validation with aXe-core
 *
 * These tests demonstrate how to use @axe-core/playwright to automatically detect
 * accessibility violations based on WCAG 2.0, 2.1, 2.2 and other standards.
 *
 * aXe-core checks for issues like:
 * - Missing alt text on images
 * - Insufficient color contrast
 * - Missing form labels
 * - Invalid ARIA usage
 * - Keyboard accessibility issues
 * - And many more...
 *
 * Learn more: https://github.com/dequelabs/axe-core
 * Playwright integration: https://playwright.dev/docs/accessibility-testing
 */

test.describe('aXe Rule Validation - Badge Component', () => {
    test('should not have accessibility violations - default badge', async ({
        page,
    }) => {
        await gotoStory(page, 'badge--default', 'sp-badge');

        // Run aXe accessibility scan (exclude best-practice for component-only testing)
        const accessibilityScanResults = await new AxeBuilder({
            page,
        })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
            .analyze();

        // Assert no violations found
        expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('should not have violations - semantic badge variants', async ({
        page,
    }) => {
        await gotoStory(page, 'badge--semantic', 'sp-badge');

        const accessibilityScanResults = await new AxeBuilder({
            page,
        })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
            .analyze();

        expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('should not have violations - badge with icon', async ({ page }) => {
        await gotoStory(page, 'badge--icons', 'sp-badge');

        const accessibilityScanResults = await new AxeBuilder({
            page,
        })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
            .analyze();

        expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('should verify color contrast for badge', async ({ page }) => {
        await gotoStory(page, 'badge--semantic', 'sp-badge');

        // Check color contrast specifically
        const accessibilityScanResults = await new AxeBuilder({ page })
            .withRules(['color-contrast'])
            .analyze();

        expect(accessibilityScanResults.violations).toEqual([]);
    });
});

test.describe('aXe Rule Validation - Status Light Component', () => {
    test('should not have accessibility violations - medium size', async ({
        page,
    }) => {
        await gotoStory(page, 'statuslight--m', 'sp-status-light');

        const accessibilityScanResults = await new AxeBuilder({
            page,
        })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
            .analyze();

        expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('should not have violations - different sizes', async ({ page }) => {
        const sizes = ['s', 'l'];

        for (const size of sizes) {
            await gotoStory(page, `statuslight--${size}`, 'sp-status-light');

            const accessibilityScanResults = await new AxeBuilder({
                page,
            })
                .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
                .analyze();

            expect(accessibilityScanResults.violations).toEqual([]);
        }
    });

    test('should not have violations - disabled status light', async ({
        page,
    }) => {
        await gotoStory(page, 'statuslight--disabled-true', 'sp-status-light');

        const accessibilityScanResults = await new AxeBuilder({
            page,
        })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
            .analyze();

        expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('should verify color contrast for status light', async ({ page }) => {
        await gotoStory(page, 'statuslight--m', 'sp-status-light');

        // Check color contrast specifically for status indicator
        const accessibilityScanResults = await new AxeBuilder({ page })
            .withRules(['color-contrast'])
            .analyze();

        expect(accessibilityScanResults.violations).toEqual([]);
    });
});
