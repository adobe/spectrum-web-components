/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { expect, Page, test } from '@playwright/test';

test.describe('search and go', () => {
    const startURL =
        process.env.NODE_ENV === 'CI'
            ? process.env.DOC_PREVIEW_URL
            : 'http://localhost:8080';
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
        const href = category
            ? `/${category}/${formattedSearchString}`
            : `/${formattedSearchString}`;
        const menuItem = await page.locator(menuItemSelector(href));
        await expect(menuItem).toBeVisible({ timeout: 3000 });
        await page.keyboard.press('ArrowDown');

        await expect(menuItem).toBeFocused();
        await page.keyboard.press('Enter');
    };

    test.beforeEach(async ({ page }) => {
        await page.goto(startURL as string);

        // Click the get started link.
        const searchField = await page.getByRole('searchbox', {
            name: 'Search',
        });

        await searchField.focus();
    });

    test('component: accordion', async ({ page }) => {
        await searchFor('accordion', page, 'components');
        await expect(page).toHaveURL(/accordion/);
    });

    test('tool: base', async ({ page }) => {
        await searchFor('base', page, 'tools');
        await expect(page).toHaveURL(/base/);
    });

    test('guide: getting-started', async ({ page }) => {
        await searchFor('getting started', page);
        await expect(page).toHaveURL(/getting-started/);
    });
});
