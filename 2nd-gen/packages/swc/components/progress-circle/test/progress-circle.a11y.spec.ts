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
 * Accessibility tests for Progress Circle component (2nd Generation)
 *
 * ARIA snapshot tests validate the accessibility tree structure.
 * ARIA attribute tests verify specific ARIA properties are correctly set.
 * aXe WCAG compliance and color contrast validation are handled automatically
 * by the Storybook test-runner (see .storybook/test-runner.ts).
 */

test.describe('Progress Circle - ARIA Snapshots', () => {
  test('should have correct accessibility tree for overview', async ({
    page,
  }) => {
    const progressCircle = await gotoStory(
      page,
      'components-progress-circle--overview',
      'swc-progress-circle'
    );
    const snapshot = await progressCircle.ariaSnapshot();

    expect(snapshot).toBeTruthy();
    await expect(progressCircle).toMatchAriaSnapshot();
  });

  test('should handle anatomy story with different progress values', async ({
    page,
  }) => {
    const progressCircle = await gotoStory(
      page,
      'components-progress-circle--anatomy',
      'swc-progress-circle'
    );
    const snapshot = await progressCircle.ariaSnapshot();

    expect(snapshot).toBeTruthy();
    await expect(progressCircle).toMatchAriaSnapshot();
  });

  test('should handle different sizes', async ({ page }) => {
    const progressCircle = await gotoStory(
      page,
      'components-progress-circle--sizes',
      'swc-progress-circle'
    );
    const snapshot = await progressCircle.ariaSnapshot();

    expect(snapshot).toBeTruthy();
    await expect(progressCircle).toMatchAriaSnapshot();
  });

  test('should handle static colors', async ({ page }) => {
    const progressCircle = await gotoStory(
      page,
      'components-progress-circle--static-colors',
      'swc-progress-circle'
    );
    const snapshot = await progressCircle.ariaSnapshot();

    expect(snapshot).toBeTruthy();
    await expect(progressCircle).toMatchAriaSnapshot();
  });

  test('should handle progress values', async ({ page }) => {
    const progressCircle = await gotoStory(
      page,
      'components-progress-circle--progress-values',
      'swc-progress-circle'
    );
    const snapshot = await progressCircle.ariaSnapshot();

    expect(snapshot).toBeTruthy();
    await expect(progressCircle).toMatchAriaSnapshot();
  });

  test('should handle indeterminate state', async ({ page }) => {
    const progressCircle = await gotoStory(
      page,
      'components-progress-circle--indeterminate',
      'swc-progress-circle'
    );
    const snapshot = await progressCircle.ariaSnapshot();

    expect(snapshot).toBeTruthy();
    await expect(progressCircle).toMatchAriaSnapshot();
  });
});

test.describe('Progress Circle - ARIA Attributes', () => {
  test('should have correct ARIA role', async ({ page }) => {
    await gotoStory(
      page,
      'components-progress-circle--overview',
      'swc-progress-circle'
    );

    const progressCircle = page.locator('swc-progress-circle').first();
    const role = await progressCircle.getAttribute('role');

    expect(role).toBe('progressbar');
  });

  test('should have aria-valuenow for determinate progress', async ({
    page,
  }) => {
    await gotoStory(
      page,
      'components-progress-circle--overview',
      'swc-progress-circle'
    );

    const progressCircle = page.locator('swc-progress-circle').first();
    const ariaValueNow = await progressCircle.getAttribute('aria-valuenow');

    expect(ariaValueNow).toBeTruthy();
    expect(Number(ariaValueNow)).toBeGreaterThanOrEqual(0);
    expect(Number(ariaValueNow)).toBeLessThanOrEqual(100);
  });

  test('should have aria-label from label attribute', async ({ page }) => {
    await gotoStory(
      page,
      'components-progress-circle--overview',
      'swc-progress-circle'
    );

    const progressCircle = page.locator('swc-progress-circle').first();
    const ariaLabel = await progressCircle.getAttribute('aria-label');

    expect(ariaLabel).toBeTruthy();
    expect(ariaLabel).toContain('document');
  });

  test('should not have aria-valuenow for indeterminate progress', async ({
    page,
  }) => {
    await gotoStory(
      page,
      'components-progress-circle--indeterminate',
      'swc-progress-circle'
    );

    const progressCircle = page.locator('swc-progress-circle').first();
    const ariaValueNow = await progressCircle.getAttribute('aria-valuenow');

    expect(ariaValueNow).toBeNull();
  });
});
