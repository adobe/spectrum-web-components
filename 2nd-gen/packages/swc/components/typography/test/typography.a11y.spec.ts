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
import { expect, test } from '@playwright/test';

/**
 * Accessibility tests for Typography styles (2nd Generation)
 *
 * Typography is a CSS-only utility — there is no `<swc-typography>` custom element.
 * This local helper navigates to a story and waits for the `.typography-samples`
 * container to appear rather than using `customElements.whenDefined()`, which only
 * works for custom elements with a hyphen in the tag name.
 *
 * ARIA snapshot tests validate the accessibility tree structure.
 * aXe WCAG compliance and color contrast validation are run via
 * test-storybook (see .storybook/test-runner.ts). Both are included
 * in the `test:a11y` command.
 */
async function gotoTypographyStory(
  page: Page,
  storyId: string
): Promise<Locator> {
  await page.goto(`/iframe.html?id=${storyId}&viewMode=story`, {
    waitUntil: 'domcontentloaded',
  });

  // Wait for the Storybook root to contain rendered content
  await page.waitForFunction(() => {
    const root = document.querySelector('#storybook-root');
    return root && root.children.length > 0;
  });

  // Wait for the typography wrapper to be visible (CSS-only component)
  await page
    .locator('.typography-samples')
    .first()
    .waitFor({ state: 'visible' });

  return page.locator('#storybook-root');
}

test.describe('Typography - ARIA Snapshots', () => {
  test('heading variant renders an accessible level-2 heading', async ({
    page,
  }) => {
    const root = await gotoTypographyStory(
      page,
      'components-typography--playground'
    );
    await expect(root).toMatchAriaSnapshot(`
      - heading /Reserved for main page heading/ [level=2]
    `);
  });

  test('heading variant with all sizes renders multiple accessible headings', async ({
    page,
  }) => {
    const root = await gotoTypographyStory(
      page,
      'components-typography--heading-variant'
    );
    await expect(root).toMatchAriaSnapshot(`
      - heading /Reserved for main page heading/ [level=2]
      - heading /Reserved for main page heading/ [level=2]
    `);
  });

  test('prose container renders nested semantic heading hierarchy', async ({
    page,
  }) => {
    const root = await gotoTypographyStory(
      page,
      'components-typography--prose-container'
    );
    await expect(root).toMatchAriaSnapshot(`
      - heading "Semantic H1" [level=1]
      - heading "Semantic H2" [level=2]
      - heading "Semantic H3" [level=3]
      - heading "Semantic H4" [level=4]
    `);
  });
});
