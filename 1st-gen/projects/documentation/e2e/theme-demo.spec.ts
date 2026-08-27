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
import { expect, test } from '@playwright/test';

test.describe('what-is-a-theme demo', () => {
  const startURL =
    process.env.NODE_ENV === 'CI'
      ? process.env.DOC_PREVIEW_URL
      : 'http://localhost:8000/';

  test.beforeEach(async ({ page }) => {
    await page.goto(`${startURL}what-is-a-theme/`);
    await page.waitForLoadState('networkidle', { timeout: 30000 });
  });

  test('nested sp-theme examples render their own declared theme, not the global theme', async ({
    page,
  }) => {
    // The page has 3 demo `<sp-button>`s: one in the standalone
    // `system="spectrum" color="dark" scale="medium"` example, and two in
    // the combined example (the same spectrum/dark/medium button, plus a
    // `system="express" color="light" scale="large"` button).
    const buttons = page.locator('sp-button');
    await expect(buttons).toHaveCount(3, { timeout: 10000 });

    const [firstDark, combinedDark, combinedExpress] =
      await buttons.evaluateAll((els) =>
        els.map((el) => {
          const style = getComputedStyle(el);
          return {
            backgroundColor: style.backgroundColor,
            fontSize: style.fontSize,
          };
        })
      );

    // Both spectrum/dark/medium buttons should match each other...
    expect(combinedDark).toEqual(firstDark);
    // ...but the express/light/large button must render its own declared
    // theme, not silently inherit the surrounding (spectrum/dark) styling.
    expect(combinedExpress.backgroundColor).not.toBe(
      combinedDark.backgroundColor
    );
    expect(combinedExpress.fontSize).not.toBe(combinedDark.fontSize);
  });
});
