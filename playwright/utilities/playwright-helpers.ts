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
// eslint-disable-next-line import/extensions, require-extensions/require-extensions
import { axeTest } from '../fixtures/axe-test';

/**
 * Navigate to a specific story in Storybook
 *
 * @param page Playwright page
 * @param componentPath Path to the component (e.g., 'button')
 * @param storyId Specific story ID (e.g., 'primary')
 * @returns Promise that resolves when navigation is complete
 */
export async function navigateToStory(
    page: Page,
    componentPath: string,
    storyId: string,
    theme: 'light' | 'dark' = 'light'
): Promise<void> {
    // Navigate to the story URL
    // eslint-disable-next-line prettier/prettier
    await page.goto(
        `/iframe.html?id=${componentPath}--${storyId}&viewMode=story&globals=color:${theme}`
    );

    // Wait for the story to load
    await page.waitForLoadState('networkidle');
}

/**
 * Get a component from the current story
 *
 * @param page Playwright page
 * @param selector Selector for the component (typically the component tag name)
 * @returns Promise that resolves with the component locator
 */
export async function getComponentFromStory(page: Page, selector: string) {
    // Wait for the component to be available in the DOM
    await page.waitForSelector(selector);

    // Return a locator for the component
    return page.locator(selector);
}

/**
 * Set up a component test
 *
 * @param page Playwright page
 * @param componentName Component simple name without the "sp-" prefix. e.g. "accordion"
 * @param storyId Story ID if multiple words, use kebab case (e.g. "allow-multiple")
 */
export const componentTestSetup = async (
    page: Page,
    componentName: string,
    storyId: string,
    theme: 'light' | 'dark' = 'light'
) => {
    await navigateToStory(page, componentName, storyId, theme);
    const component = await getComponentFromStory(page, `sp-${componentName}`);
    expect(component).toBeVisible();
};

export const axeStoryTest = async (
    componentName: string,
    storyId: string,
    theme: 'light' | 'dark' = 'light'
) => {
    return test.describe(`${storyId}`, () => {
        test.beforeEach(async ({ page }) => {
            await componentTestSetup(page, componentName, storyId, theme);
        });

        axeTest('should pass axe scan', async ({ makeAxeBuilder }) => {
            const accessibilityScanResults = await makeAxeBuilder().analyze();

            expect(accessibilityScanResults.violations).toEqual([]);
        });

        test('should take snapshot', async ({ page }) => {
            await expect(page.locator('sp-theme')).toMatchAriaSnapshot({
                name: `${componentName}-${theme}-${storyId}.aria.yml`,
            });
        });
    });
};
