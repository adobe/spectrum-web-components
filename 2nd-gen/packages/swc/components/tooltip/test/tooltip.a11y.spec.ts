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

    // Set open directly via the property API. HoverController handles hover/focus
    // in production; direct property access is the correct approach for a11y tests.
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

  // `popover="manual"` has no native Escape light-dismiss, so closing on Escape
  // is entirely the component's own document `handleKeyDown`. This exercises it
  // under trusted (Playwright) input; EscapeClosesTest in tooltip.test.ts covers
  // the synthetic-input path. Trusted input cannot run in a dev-indexed play
  // function, so this case lives here.
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

  // Trusted Escape ordering across the dismissible stack. A `<swc-popover>` is
  // `popover="auto"` (native light-dismiss); a `<swc-tooltip>` is `manual` and
  // thus outside the browser's auto-popover stack. When both are open with the
  // tooltip on top, one Escape must close only the tooltip — the tooltip's
  // capture-phase handler cancels the native popover dismiss so the popover the
  // user is working in survives — and a second Escape then closes the popover.
  // Only trusted (Playwright) input drives native popover light-dismiss, so this
  // cross-mechanism ordering cannot be exercised from a synthetic play function.
  test('Escape closes the topmost surface first, leaving the popover open', async ({
    page,
  }) => {
    await gotoStory(
      page,
      'tooltip-tests--coexists-popover-opened-over-tooltip-test',
      'swc-popover'
    );

    // Drive the state explicitly (open popover first, then tooltip on top) so
    // the assertion does not depend on the story's play-function timing. The
    // tooltip registers into the dismissible stack last, making it topmost.
    await page.evaluate(async () => {
      const popover = document.querySelector('swc-popover') as HTMLElement & {
        open: boolean;
        updateComplete: Promise<unknown>;
      };
      const tooltip = document.querySelector('swc-tooltip') as HTMLElement & {
        open: boolean;
        updateComplete: Promise<unknown>;
      };
      popover.open = true;
      await popover.updateComplete;
      tooltip.open = true;
      await tooltip.updateComplete;
    });
    await page.waitForFunction(
      () =>
        (document.querySelector('swc-popover') as { open?: boolean })?.open ===
          true &&
        document.querySelector('swc-tooltip')?.matches(':popover-open') === true
    );

    // First Escape: only the tooltip closes; the popover stays open.
    await page.keyboard.press('Escape');
    await page.waitForFunction(
      () => !document.querySelector('swc-tooltip')?.matches(':popover-open')
    );
    const popoverStillOpen = await page.evaluate(
      () => (document.querySelector('swc-popover') as { open?: boolean })?.open
    );
    expect(
      popoverStillOpen,
      'popover survives the Escape that closed the tooltip'
    ).toBe(true);

    // Second Escape: now the popover is topmost, native light-dismiss closes it.
    await page.keyboard.press('Escape');
    await page.waitForFunction(
      () =>
        (document.querySelector('swc-popover') as { open?: boolean })?.open ===
        false
    );
    const popoverClosed = await page.evaluate(
      () => (document.querySelector('swc-popover') as { open?: boolean })?.open
    );
    expect(popoverClosed, 'popover closes on the second Escape').toBe(false);
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
