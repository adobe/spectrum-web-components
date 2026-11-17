/**
 * Copyright 2026 Adobe. All rights reserved.
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

import { waitForStoryReadyWithRetries } from './a11y-story-retry.js';
import { waitForCustomElement } from './wait-for-custom-element.js';

/**
 * Navigate to a Storybook story and wait for it to be ready. Waits for
 * `#storybook-root` to render, then for `elementSelector` to become visible
 * within it. If the resolved element is a custom element, also waits for
 * it to be defined in the custom elements registry before returning; plain
 * elements (e.g. CSS-only Typography or Link markup) skip that step.
 *
 * @param page - Playwright page object
 * @param storyId - Storybook story ID (e.g., 'components-badge--sizes')
 * @param elementSelector - CSS selector for the main element to wait for
 * @returns The `#storybook-root` locator containing all rendered elements
 */
export async function gotoStory(
  page: Page,
  storyId: string,
  elementSelector: string
): Promise<Locator> {
  await page.goto(`/iframe.html?id=${storyId}&viewMode=story`, {
    waitUntil: 'domcontentloaded',
  });

  return waitForStoryReadyWithRetries(page, async () => {
    await page.waitForFunction(() => {
      const root = document.querySelector('#storybook-root');
      return root && root.children.length > 0;
    });

    const root = page.locator('#storybook-root');
    const element = root.locator(elementSelector).first();
    await element.waitFor({ state: 'visible' });

    const tagName = await element.evaluate((el) => el.tagName.toLowerCase());
    if (tagName.includes('-')) {
      await waitForCustomElement(page, tagName);
    }

    return root;
  });
}
