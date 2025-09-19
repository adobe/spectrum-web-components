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

test.describe('Badge Component', () => {
    test('should render default badge story correctly', async ({ page }) => {
        // Navigate to the badge Default story in Storybook
        await page.goto(
            '/iframe.html?args=&id=components-badge--default&viewMode=story'
        );

        // Wait for the badge component to be rendered
        const badge = page.locator('swc-badge');
        await expect(badge).toBeVisible();

        // Check that the badge has the expected text content
        await expect(badge).toContainText('Badge');

        // Verify the default variant is applied
        await expect(badge).toHaveAttribute('variant', 'informative');

        // Verify the default size is applied
        await expect(badge).toHaveAttribute('size', 'm');
    });
});
