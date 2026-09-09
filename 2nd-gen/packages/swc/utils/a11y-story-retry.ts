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

const TRANSIENT_RETRY_COUNT = 3;

function isTransientNavigationError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return (
    message.includes('Execution context was destroyed') ||
    message.includes('Target page, context or browser has been closed')
  );
}

/**
 * Retry a story-readiness check against transient Storybook iframe reloads
 * (e.g. a quick reload while Vite optimizes deps mid-navigation).
 *
 * @param page - Playwright page object
 * @param callback - Readiness check to retry on transient navigation errors
 * @returns The result of the first successful callback invocation
 */
export async function waitForStoryReadyWithRetries(
  page: Page,
  callback: () => Promise<Locator>
): Promise<Locator> {
  for (let attempt = 0; attempt < TRANSIENT_RETRY_COUNT; attempt++) {
    try {
      return await callback();
    } catch (error) {
      const isLastAttempt = attempt === TRANSIENT_RETRY_COUNT - 1;
      if (!isTransientNavigationError(error) || isLastAttempt) {
        throw error;
      }

      // Storybook can trigger a quick iframe reload while optimizing deps.
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(200 * (attempt + 1));
    }
  }

  throw new Error('Failed to wait for story readiness after retries.');
}
