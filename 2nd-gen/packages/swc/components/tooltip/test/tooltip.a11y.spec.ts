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
 * Accessibility tests for Tooltip component (2nd Generation)
 *
 * ARIA snapshot tests validate the accessibility tree structure.
 * aXe WCAG compliance and color contrast validation are run via
 * test-storybook (see .storybook/test-runner.ts). Both are included
 * in the `test:a11y` command.
 */

test.describe('Tooltip - ARIA Snapshots', () => {
  test('closed tooltip is hidden from accessibility tree', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-tooltip--overview',
      'swc-button'
    );
    // The trigger button is accessible; the closed popover is hidden from the tree.
    await expect(root).toMatchAriaSnapshot(`
      - button "Open"
    `);
  });

  test('open tooltip exposes role="tooltip" in accessibility tree', async ({
    page,
  }) => {
    await gotoStory(page, 'components-tooltip--overview', 'swc-button');

    // Open the tooltip programmatically (HoverController not yet wired).
    await page.evaluate(() => {
      const tooltip = document.querySelector('swc-tooltip') as HTMLElement & {
        open: boolean;
      };
      if (tooltip) {
        tooltip.open = true;
      }
    });

    // Wait for the popover to appear in the top layer.
    await page.waitForFunction(() =>
      document.querySelector('swc-tooltip')?.matches(':popover-open')
    );

    const root = page.locator('#storybook-root');
    await expect(root).toMatchAriaSnapshot(`
      - button "Open"
      - tooltip "Save your changes"
    `);
  });

  test('tooltip is removed from accessibility tree when closed', async ({
    page,
  }) => {
    await gotoStory(page, 'components-tooltip--overview', 'swc-button');

    // Open then close via the property.
    await page.evaluate(() => {
      const tooltip = document.querySelector('swc-tooltip') as HTMLElement & {
        open: boolean;
      };
      if (tooltip) {
        tooltip.open = true;
      }
    });
    await page.waitForFunction(() =>
      document.querySelector('swc-tooltip')?.matches(':popover-open')
    );

    await page.evaluate(() => {
      const tooltip = document.querySelector('swc-tooltip') as HTMLElement & {
        open: boolean;
      };
      if (tooltip) {
        tooltip.open = false;
      }
    });
    await page.waitForFunction(
      () => !document.querySelector('swc-tooltip')?.matches(':popover-open')
    );

    const root = page.locator('#storybook-root');
    await expect(root).toMatchAriaSnapshot(`
      - button "Open"
    `);
  });

  test('Escape closes an open tooltip', async ({ page }) => {
    await gotoStory(page, 'components-tooltip--overview', 'swc-button');

    await page.evaluate(() => {
      const tooltip = document.querySelector('swc-tooltip') as HTMLElement & {
        open: boolean;
      };
      if (tooltip) {
        tooltip.open = true;
      }
    });
    await page.waitForFunction(() =>
      document.querySelector('swc-tooltip')?.matches(':popover-open')
    );

    await page.keyboard.press('Escape');

    await page.waitForFunction(
      () => !document.querySelector('swc-tooltip')?.matches(':popover-open')
    );

    const open = await page.evaluate(
      () => (document.querySelector('swc-tooltip') as { open?: boolean })?.open
    );
    expect(open, 'tooltip.open is false after Escape').toBe(false);
  });

  test('all variant triggers are accessible', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-tooltip--variants',
      'swc-button'
    );
    await expect(root).toMatchAriaSnapshot(`
      - button "Save"
      - button "Upload"
      - button "Delete"
    `);
  });

  test('all placement triggers are accessible', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-tooltip--placements',
      'swc-button'
    );
    // Each placement renders a separate trigger button.
    await expect(root).toMatchAriaSnapshot(`
      - button "top"
      - button "right"
      - button "end"
      - button "bottom"
      - button "left"
      - button "start"
    `);
  });
});
