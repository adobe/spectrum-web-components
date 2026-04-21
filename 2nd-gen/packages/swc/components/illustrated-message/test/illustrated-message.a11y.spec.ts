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
 * Accessibility tests for IllustratedMessage component (2nd Generation)
 *
 * ARIA snapshot tests validate the accessibility tree structure.
 * aXe WCAG compliance and color contrast validation are run via
 * test-storybook (see .storybook/test-runner.ts). Both are included
 * in the `test:a11y` command.
 */

test.describe('IllustratedMessage - ARIA Snapshots', () => {
  test('should have correct accessibility tree for overview', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-illustrated-message--overview',
      'swc-illustrated-message'
    );
    await expect(root).toMatchAriaSnapshot(`
      - heading "Illustrated message title" [level=2]
    `);
  });

  test('should have heading in light DOM (consumer-owned)', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-illustrated-message--overview',
      'swc-illustrated-message'
    );
    // The heading is slotted from light DOM — it must be queryable from outside
    // the shadow root and must not appear inside the shadow DOM.
    await expect(root.locator('h2[slot="heading"]')).toBeVisible();
  });

  test('should have correct heading for each size variant', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-illustrated-message--sizes',
      'swc-illustrated-message'
    );
    await expect(root).toMatchAriaSnapshot(`
      - heading "Small" [level=2]
      - heading "Medium" [level=2]
      - heading "Large" [level=2]
    `);
  });

  test('should have correct heading for each orientation variant', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-illustrated-message--orientation',
      'swc-illustrated-message'
    );
    await expect(root).toMatchAriaSnapshot(`
      - heading "Vertical (default)" [level=2]
      - heading "Horizontal" [level=2]
    `);
  });

  test('should hide decorative illustration from assistive technology', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-illustrated-message--illustration-accessibility',
      'swc-illustrated-message'
    );
    // The first component has aria-hidden="true" on its SVG.
    // It must not produce an img role in the accessibility tree.
    const first = root.locator('swc-illustrated-message').first();
    await expect(first.getByRole('img')).toHaveCount(0);
    // Heading is still accessible.
    await expect(first).toMatchAriaSnapshot(`
      - heading "Illustrated message title" [level=2]
    `);
  });

  test('should expose informative illustration to assistive technology', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-illustrated-message--illustration-accessibility',
      'swc-illustrated-message'
    );
    // The second component has role="img" + aria-label on its SVG.
    // It must appear as a named image in the accessibility tree.
    const second = root.locator('swc-illustrated-message').nth(1);
    await expect(
      second.getByRole('img', { name: 'Cloud storage illustration' })
    ).toBeVisible();
    await expect(second).toMatchAriaSnapshot(`
      - img "Cloud storage illustration"
      - heading "Illustrated message title" [level=2]
    `);
  });
});
