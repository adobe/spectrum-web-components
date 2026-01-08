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
import { expect, Page, test } from '@playwright/test';

test.describe('search and go', () => {
    const startURL =
        process.env.NODE_ENV === 'CI'
            ? process.env.DOC_PREVIEW_URL
            : 'http://localhost:8000/';
    const menuItemSelector = (href: string) => {
        return `#search-container sp-overlay[open] > sp-popover > sp-menu > sp-menu-group > sp-menu-item[href = "${href}"]`;
    };

    const searchFor = async (
        searchString: string,
        page: Page,
        category?: string
    ): Promise<void> => {
        await page.keyboard.type(searchString, { delay: 100 });

        const formattedSearchString = searchString.replace(/\s+/g, '-');
        let href = category
            ? `/${category}/${formattedSearchString}/`
            : `/${formattedSearchString}/`;

        // add the SWC_DIR to the href
        href = `${process.env.SWC_DIR ? `/${process.env.SWC_DIR}/docs/first-gen-docs` : ''}${href}`;

        const menuItem = page.locator(menuItemSelector(href));

        // Wait for search results to populate with retry logic
        await page.waitForTimeout(500); // Allow search to process
        await expect(menuItem).toBeVisible({ timeout: 10000 });

        // Click directly on the target menu item since ArrowDown only moves
        // to the first result, which may not be the item we're looking for
        // when multiple matches exist (e.g., searching "base" returns many results)
        await menuItem.click();

        // Wait for navigation to complete
        await page.waitForLoadState('networkidle', { timeout: 15000 });
    };

    test.beforeEach(async ({ page }) => {
        await page.goto(startURL as string);
        await page.waitForLoadState('networkidle', { timeout: 30000 });

        // Wait for any dynamic content to load
        await page.waitForTimeout(1000);

        // Click the get started link.
        const searchField = await page.getByRole('searchbox', {
            name: 'Search',
        });
        await expect(searchField, 'Search field should be visible').toBeVisible(
            { timeout: 10000 }
        );
        await searchField.focus();
        await expect(searchField, 'Search field should be focused').toBeFocused(
            { timeout: 10000 }
        );
        await page.waitForTimeout(500); // Ensure focus is set
    });

    test('component: accordion', async ({ page }) => {
        await searchFor('accordion', page, 'components');
        await expect(page).toHaveURL(/accordion/, { timeout: 10000 });
    });

    test('tool: base', async ({ page }) => {
        await searchFor('base', page, 'tools');
        // Use more specific URL matching that accounts for Azure Blob Storage paths
        await expect(page).toHaveURL(/base/, { timeout: 10000 });
    });

    test('guide: getting-started', async ({ page }) => {
        await searchFor('getting started', page);
        await expect(page).toHaveURL(/getting-started/, { timeout: 10000 });
    });
});
