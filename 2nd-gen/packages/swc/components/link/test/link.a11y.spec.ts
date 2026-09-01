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

import { gotoCssStory } from '../../../utils/a11y-helpers.js';

/**
 * Accessibility tests for Link styles (2nd Generation)
 *
 * Link is a CSS-only utility; there is no `<swc-link>` custom element.
 * Stories render native `<a href>` elements with optional BEM classes from
 * `link.css` or typography wrappers from `typography.css`.
 *
 * ARIA snapshot tests validate the accessibility tree structure.
 * aXe WCAG compliance and color contrast validation are run via
 * test-storybook (see .storybook/test-runner.ts). Both are included
 * in the `test:a11y` command.
 */

test.describe('Link - ARIA Snapshots', () => {
  test('standalone explicit link exposes link role and name', async ({
    page,
  }) => {
    const root = await gotoCssStory(
      page,
      'components-link--standalone',
      'a[href]'
    );
    await expect(root).toMatchAriaSnapshot(`
      - link "Account settings"
    `);
  });

  test('secondary link exposes link role and name', async ({ page }) => {
    const root = await gotoCssStory(
      page,
      'components-link--secondary',
      'a[href]'
    );
    await expect(root).toMatchAriaSnapshot(`
      - link "Learn more"
    `);
  });

  test('quiet standalone link exposes link role and name', async ({ page }) => {
    const root = await gotoCssStory(
      page,
      'components-link--quiet-standalone',
      'a[href]'
    );
    await expect(root).toMatchAriaSnapshot(`
      - link "Privacy policy"
    `);
  });

  test('in-prose link is named from visible text', async ({ page }) => {
    const root = await gotoCssStory(
      page,
      'components-link--in-prose',
      'a[href]'
    );
    await expect(root).toMatchAriaSnapshot(`
      - link "inline link"
    `);
  });

  test('link list renders multiple named links', async ({ page }) => {
    const root = await gotoCssStory(
      page,
      'components-link--link-list',
      'a[href]'
    );
    await expect(root.locator('.swc-Typography--links')).toMatchAriaSnapshot(`
      - list:
        - listitem:
          - link "Privacy policy"
        - listitem:
          - link "Terms of use"
        - listitem:
          - link "Contact support"
    `);
  });

  test('accessibility story renders descriptive prose link', async ({
    page,
  }) => {
    const root = await gotoCssStory(
      page,
      'components-link--accessibility',
      'a[href]'
    );
    await expect(root).toMatchAriaSnapshot(`
      - paragraph:
        - link "view the full schedule"
    `);
  });

  test('links are keyboard focusable', async ({ page }) => {
    const root = await gotoCssStory(
      page,
      'components-link--standalone',
      'a[href]'
    );
    const anchor = root.locator('a[href]').first();
    await anchor.focus();
    await expect(anchor).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(anchor).not.toBeFocused();
  });
});
