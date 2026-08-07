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

  // Escape must dismiss the dismissible stack in reverse open order (LIFO),
  // whichever surface is on top. Only trusted (Playwright) input drives the
  // popover's native light-dismiss, so this cross-mechanism ordering can't run in
  // a synthetic play function. Both orders share the CoexistenceWithPopover
  // fixture and differ only in which surface is opened last (topmost).
  type Surface = 'popover' | 'tooltip';
  const orderedScenarios: Array<{
    name: string;
    openOrder: readonly Surface[];
  }> = [
    {
      name: 'tooltip opened over a popover',
      openOrder: ['popover', 'tooltip'],
    },
    {
      name: 'popover opened over a tooltip',
      openOrder: ['tooltip', 'popover'],
    },
  ];

  // Read visibility per surface: the popover via its reconciled `open` (its host
  // is `display: contents`, so it never matches `:popover-open`), the tooltip via
  // `:popover-open` on the host.
  const surfaceIsOpen = (kind: Surface): boolean => {
    const el = document.querySelector(`swc-${kind}`);
    return kind === 'tooltip'
      ? el?.matches(':popover-open') === true
      : (el as (Element & { open?: boolean }) | null)?.open === true;
  };

  for (const { name, openOrder } of orderedScenarios) {
    // Escape dismisses in reverse open order: the last-opened surface registers
    // into the dismissible stack last, so it is topmost and closes first.
    const closeOrder = [...openOrder].reverse();

    test(`Escape dismisses in reverse open order: ${name}`, async ({
      page,
    }) => {
      await gotoStory(
        page,
        'components-tooltip--coexistence-with-popover',
        'swc-button'
      );

      // Drive open state explicitly and in a fixed order so the assertion does
      // not depend on the story's play-function timing.
      await page.evaluate(
        async (order: Surface[]) => {
          for (const kind of order) {
            const el = document.querySelector(`swc-${kind}`) as
              | (HTMLElement & {
                  open: boolean;
                  updateComplete: Promise<unknown>;
                })
              | null;
            if (!el) {
              continue;
            }
            el.open = true;
            await el.updateComplete;
          }
        },
        [...openOrder]
      );
      await page.waitForFunction(
        () =>
          (document.querySelector('swc-popover') as { open?: boolean })
            ?.open === true &&
          document.querySelector('swc-tooltip')?.matches(':popover-open') ===
            true
      );

      // One Escape per surface: each must close exactly the topmost remaining
      // surface and leave every surface still below it open.
      for (let i = 0; i < closeOrder.length; i++) {
        const closing = closeOrder[i];
        const stillOpen = closeOrder.slice(i + 1);

        await page.keyboard.press('Escape');
        await page.waitForFunction((kind: Surface) => {
          const el = document.querySelector(`swc-${kind}`);
          return kind === 'tooltip'
            ? !el?.matches(':popover-open')
            : (el as (Element & { open?: boolean }) | null)?.open === false;
        }, closing);

        expect(
          await page.evaluate(surfaceIsOpen, closing),
          `${closing} closed on Escape #${i + 1}`
        ).toBe(false);
        for (const other of stillOpen) {
          expect(
            await page.evaluate(surfaceIsOpen, other),
            `${other} stays open after Escape #${i + 1}`
          ).toBe(true);
        }
      }
    });
  }

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
