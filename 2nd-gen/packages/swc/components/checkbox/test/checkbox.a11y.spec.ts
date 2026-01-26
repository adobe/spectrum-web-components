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
 * Accessibility tests for Checkbox component (2nd Generation)
 *
 * Tests both ARIA snapshot structure and aXe WCAG compliance
 */

test.describe('Checkbox - ARIA Snapshots', () => {
    test('should have correct accessibility tree for default checkbox', async ({
        page,
    }) => {
        const checkbox = await gotoStory(
            page,
            'components-checkbox--default',
            'swc-checkbox'
        );
        const snapshot = await checkbox.ariaSnapshot();

        expect(snapshot).toBeTruthy();
        await expect(checkbox).toMatchAriaSnapshot();
    });

    test('should handle checked state', async ({ page }) => {
        const checkbox = await gotoStory(
            page,
            'components-checkbox--checked',
            'swc-checkbox'
        );
        const snapshot = await checkbox.ariaSnapshot();

        expect(snapshot).toBeTruthy();
        await expect(checkbox).toMatchAriaSnapshot();
    });

    test('should handle indeterminate state', async ({ page }) => {
        const checkbox = await gotoStory(
            page,
            'components-checkbox--indeterminate',
            'swc-checkbox'
        );
        const snapshot = await checkbox.ariaSnapshot();

        expect(snapshot).toBeTruthy();
        await expect(checkbox).toMatchAriaSnapshot();
    });

    test('should reflect different sizes', async ({ page }) => {
        const checkbox = await gotoStory(
            page,
            'components-checkbox--sizes',
            'swc-checkbox'
        );
        const snapshot = await checkbox.ariaSnapshot();

        expect(snapshot).toBeTruthy();
        await expect(checkbox).toMatchAriaSnapshot();
    });

    test('should handle disabled state', async ({ page }) => {
        const checkbox = await gotoStory(
            page,
            'components-checkbox--disabled',
            'swc-checkbox'
        );
        const snapshot = await checkbox.ariaSnapshot();

        expect(snapshot).toBeTruthy();
        await expect(checkbox).toMatchAriaSnapshot();
    });

    test('should handle invalid state', async ({ page }) => {
        const checkbox = await gotoStory(
            page,
            'components-checkbox--invalid',
            'swc-checkbox'
        );
        const snapshot = await checkbox.ariaSnapshot();

        expect(snapshot).toBeTruthy();
        await expect(checkbox).toMatchAriaSnapshot();
    });
});

test.describe('Checkbox - aXe Validation', () => {
    test('should not have accessibility violations - default', async ({
        page,
    }) => {
        await gotoStory(page, 'components-checkbox--default', 'swc-checkbox');

        const results = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
            .analyze();

        expect(results.violations).toEqual([]);
    });

    test('should not have violations - checked state', async ({ page }) => {
        await gotoStory(page, 'components-checkbox--checked', 'swc-checkbox');

        await page.waitForLoadState('networkidle');

        const results = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
            .analyze();

        expect(results.violations).toEqual([]);
    });

    test('should not have violations - indeterminate state', async ({
        page,
    }) => {
        await gotoStory(
            page,
            'components-checkbox--indeterminate',
            'swc-checkbox'
        );

        await page.waitForLoadState('networkidle');

        const results = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
            .analyze();

        expect(results.violations).toEqual([]);
    });

    test('should not have violations - disabled state', async ({ page }) => {
        await gotoStory(page, 'components-checkbox--disabled', 'swc-checkbox');

        await page.waitForLoadState('networkidle');

        const results = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
            .analyze();

        expect(results.violations).toEqual([]);
    });

    test('should not have violations - invalid state', async ({ page }) => {
        await gotoStory(page, 'components-checkbox--invalid', 'swc-checkbox');

        await page.waitForLoadState('networkidle');

        const results = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
            .analyze();

        expect(results.violations).toEqual([]);
    });

    test('should not have violations - all states', async ({ page }) => {
        await gotoStory(
            page,
            'components-checkbox--all-states',
            'swc-checkbox'
        );

        await page.waitForLoadState('networkidle');

        const results = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
            .analyze();

        expect(results.violations).toEqual([]);
    });

    test('should not have violations - emphasized', async ({ page }) => {
        await gotoStory(
            page,
            'components-checkbox--emphasized',
            'swc-checkbox'
        );

        await page.waitForLoadState('networkidle');

        const results = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
            .analyze();

        expect(results.violations).toEqual([]);
    });
});
