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

import { gotoStory } from '../../../utils/a11y-helpers.js';

/**
 * Accessibility tests for Typography styles (2nd Generation)
 *
 * Typography is a CSS-only utility; there is no `<swc-typography>` custom element.
 * `gotoStory` waits for the readiness selector to become visible; since there
 * is no custom element to upgrade, that visibility check alone is sufficient.
 *
 * ARIA snapshot tests validate the accessibility tree structure.
 * aXe WCAG compliance and color contrast validation are run via
 * test-storybook (see .storybook/test-runner.ts). Both are included
 * in the `test:a11y` command.
 */

test.describe('Typography - ARIA Snapshots', () => {
  test('heading variant renders an accessible level-2 heading', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-typography--playground',
      '.typography-samples'
    );
    await expect(root).toMatchAriaSnapshot(`
      - heading /Reserved for main page heading/ [level=2]
    `);
  });

  test('heading variant with all sizes renders multiple accessible headings', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-typography--heading-variant',
      '.typography-samples'
    );
    await expect(root).toMatchAriaSnapshot(`
      - heading /Reserved for main page heading/ [level=2]
      - heading /Reserved for main page heading/ [level=2]
    `);
  });

  test('prose container renders nested semantic heading hierarchy', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-typography--prose-container',
      '.typography-samples'
    );
    await expect(root).toMatchAriaSnapshot(`
      - heading "Semantic H1" [level=1]
      - heading "Semantic H2" [level=2]
      - heading "Semantic H3" [level=3]
      - heading "Semantic H4" [level=4]
    `);
  });

  test('prose container includes an inline link with accessible name', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-typography--prose-container',
      '.typography-samples'
    );
    await expect(root).toMatchAriaSnapshot(`
      - link "inline link"
    `);
  });

  test('link list renders named navigation links', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-typography--link-list',
      '.swc-Typography--links'
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
});
