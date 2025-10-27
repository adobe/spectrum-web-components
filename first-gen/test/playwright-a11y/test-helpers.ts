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

import type { Locator, Page } from '@playwright/test';

/**
 * Wait for a custom element to be fully defined and upgraded.
 * This is more deterministic than waiting for visibility alone.
 *
 * @param page - Playwright page object
 * @param tagName - Custom element tag name (e.g., 'sp-badge')
 * @returns Promise that resolves when element is defined
 */
export async function waitForCustomElement(
    page: Page,
    tagName: string
): Promise<void> {
    await page.evaluate((tag) => {
        return customElements.whenDefined(tag);
    }, tagName);
}

/**
 * Wait for Storybook story to be fully rendered.
 * More deterministic than arbitrary timeouts.
 *
 * @param page - Playwright page object
 * @param elementSelector - CSS selector for the element to wait for
 * @returns The located element
 */
export async function waitForStoryReady(
    page: Page,
    elementSelector: string
): Promise<Locator> {
    // Extract tag name from selector (handles 'sp-badge', 'sp-badge.class', etc.)
    const tagName = elementSelector.split(/[.#\s[\]]/)[0];

    // Step 1: Wait for the custom element to be defined in the registry
    await waitForCustomElement(page, tagName);

    // Step 2: Wait for Storybook's story rendering to complete
    await page.waitForFunction(() => {
        // Check if Storybook has finished rendering
        const root = document.querySelector('#storybook-root');
        return root && root.children.length > 0;
    });

    // Step 3: Locate the element and wait for it to be visible
    const element = page.locator(elementSelector).first();
    await element.waitFor({ state: 'visible' });

    // Step 4: Wait for Web Component to be fully upgraded (has shadow root if applicable)
    await element.evaluate((el) => {
        // If it's a custom element, wait for it to be fully upgraded
        if (el.tagName.includes('-')) {
            return customElements.whenDefined(el.tagName.toLowerCase());
        }
    });

    return element;
}

/**
 * Navigate to a Storybook story and wait for it to be ready.
 * Combines navigation + deterministic waiting.
 *
 * @param page - Playwright page object
 * @param storyId - Storybook story ID (e.g., 'badge--default')
 * @param elementSelector - CSS selector for the main element to wait for
 * @returns The located element
 */
export async function gotoStory(
    page: Page,
    storyId: string,
    elementSelector: string
): Promise<Locator> {
    // Navigate to story
    await page.goto(
        `http://localhost:8080/iframe.html?id=${storyId}&viewMode=story`
    );

    // Wait for story to be ready
    return waitForStoryReady(page, elementSelector);
}
