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
 * Accessibility tests for Radio component (2nd Generation)
 *
 * ARIA snapshot tests validate the accessibility tree structure.
 * aXe WCAG compliance and color contrast validation are run via
 * test-storybook (see .storybook/test-runner.ts). Both are included
 * in the `test:a11y` command.
 */

test.describe('Radio - ARIA Snapshots', () => {
  test('should have correct accessibility tree for overview', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-radio--overview',
      'swc-radio'
    );
    await expect(root).toMatchAriaSnapshot(`
      - radio "Option 1"
      - radio "Option 2"
      - radio "Option 3"
    `);
  });

  test('should have correct accessibility tree for default story', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-radio--default',
      'swc-radio'
    );
    await expect(root).toMatchAriaSnapshot(`
      - radio "Radio"
    `);
  });

  test('should handle emphasized variant', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-radio--emphasized',
      'swc-radio'
    );
    await expect(root).toMatchAriaSnapshot(`
      - radio "Emphasized radio"
    `);
  });

  test('should handle invalid state', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-radio--invalid',
      'swc-radio'
    );
    await expect(root).toMatchAriaSnapshot(`
      - radio "Invalid radio"
    `);
  });

  test('should handle disabled state', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-radio--disabled',
      'swc-radio'
    );
    await expect(root).toMatchAriaSnapshot(`
      - radio "Disabled radio"
    `);
  });

  test('should handle sizes story', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-radio--sizes',
      'swc-radio'
    );
    await expect(root).toMatchAriaSnapshot(`
      - radio "Size s"
      - radio "Size m"
      - radio "Size l"
      - radio "Size xl"
    `);
  });

  test('should handle group example', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-radio--group-example',
      'swc-radio'
    );
    await expect(root).toMatchAriaSnapshot(`
      - radiogroup
        - radio "Option 1"
        - radio "Option 2"
        - radio "Option 3"
        - radio "Option 4"
    `);
  });

  test('should handle accessibility story', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-radio--accessibility',
      'swc-radio'
    );
    await expect(root).toMatchAriaSnapshot(`
      - radiogroup
        - radio "Option A"
        - radio "Option B"
    `);
  });
});
