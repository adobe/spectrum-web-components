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
 * Playwright tests for Menu (2nd Generation): ARIA-tree snapshots of the closed
 * and open states, plus native light-dismiss behavior (Escape and outside click).
 *
 * Native light-dismiss needs trusted browser input, which the Storybook play
 * functions in `menu.test.ts` cannot produce, so it lives here rather than as a
 * play function. Synthetic interaction (click-to-toggle, focus, arrow-key
 * navigation, programmatic open/close) stays in `menu.test.ts`. aXe WCAG
 * compliance and color-contrast validation run via test-storybook (see
 * `.storybook/test-runner.ts`).
 */

test.describe('Menu - ARIA snapshots', () => {
  test('closed: the trigger exposes a collapsed menu control', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-menu--open-and-close',
      'swc-button'
    );
    await expect(root).toMatchAriaSnapshot(`
      - button "Edit" [expanded=false]
    `);
    await expect(root.getByRole('menu')).toHaveCount(0);
  });

  test('open: an internal menu surface holds the rows', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-menu--open-and-close',
      'swc-button'
    );
    await page.getByRole('button', { name: 'Edit' }).click();
    await expect(page.locator('swc-menu')).toHaveJSProperty('open', true);
    // Shows unnamed because Playwright can't see `ariaLabelledByElements`;
    // Chromium resolves it to "Edit". Wiring asserted in menu.test.ts.
    await expect(root).toMatchAriaSnapshot(`
      - button "Edit" [expanded]
      - menu:
        - menuitem "Cut"
        - menuitem "Copy"
        - menuitem "Paste"
    `);
  });

  test('the trigger exposes aria-haspopup="menu" and aria-expanded', async ({
    page,
  }) => {
    await gotoStory(page, 'components-menu--open-and-close', 'swc-button');
    const trigger = page.getByRole('button', { name: 'Edit' });

    await expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await trigger.click();
    await expect(page.locator('swc-menu')).toHaveJSProperty('open', true);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });
});

/**
 * Native light-dismiss (`popover="auto"` Escape/outside-click) is only
 * triggered by trusted browser input, which the Storybook play functions
 * cannot produce. These drive real keyboard/pointer input through Playwright
 * against the published component stories (which exist in every Storybook
 * mode, unlike the dev-only `*.test.ts` fixtures).
 */
test.describe('Menu - native dismissal', () => {
  test('Escape closes the menu and returns focus to the trigger', async ({
    page,
  }) => {
    await gotoStory(page, 'components-menu--open-and-close', 'swc-button');
    const menu = page.locator('swc-menu');
    const trigger = page.getByRole('button', { name: 'Edit' });

    await trigger.click();
    await expect(menu).toHaveJSProperty('open', true);
    // Opening moves focus onto the first row; escaping should close the menu
    // and hand focus back to the trigger.
    await page.keyboard.press('Escape');
    await expect(menu).toHaveJSProperty('open', false);
    await expect(trigger).toBeFocused();
  });

  // Activating a row closes the menu and restores focus to the trigger. If
  // that happened on keydown, the rest of the same physical press (the
  // repeats, then the keyup) would land on the trigger, which activates and
  // reopens the menu. Holding the key is what exposes it, because the repeats
  // are what reach the refocused trigger. Only trusted input runs the
  // browser's own activation behavior, so this cannot be a play function.
  // The other half of the same problem. A native button fires `click` on
  // Enter *keydown*, so the menu opens and focuses its first row before the
  // trigger's own keyup arrives. That keyup lands on the row, which must not
  // read it as its own press. Play functions cannot show this either: a
  // synthetic Enter never makes the trigger's inner button activate.
  for (const [name, key] of [
    ['Enter', 'Enter'],
    ['Space', ' '],
  ] as const) {
    test(`opening with ${name} does not activate the first row`, async ({
      page,
    }) => {
      await gotoStory(page, 'components-menu--open-and-close', 'swc-button');
      const menu = page.locator('swc-menu');
      const trigger = page.getByRole('button', { name: 'Edit' });

      await page.evaluate(() => {
        const w = window as unknown as Record<string, number>;
        w.__rowClicks = 0;
        document.addEventListener(
          'click',
          (event) => {
            const onRow = event
              .composedPath()
              .some(
                (node) => (node as HTMLElement)?.localName === 'swc-menu-item'
              );
            if (onRow) {
              w.__rowClicks += 1;
            }
          },
          true
        );
      });

      // Focus the trigger by keyboard, then open it with the key under test,
      // so the whole press is delivered the way a real user's would be.
      await trigger.focus();
      await page.keyboard.press(key);

      await expect(menu).toHaveJSProperty('open', true);
      const rowClicks = await page.evaluate(
        () => (window as unknown as Record<string, number>).__rowClicks
      );
      expect(rowClicks, 'no row activates while the menu is opening').toBe(0);
    });

    test(`a held ${name} on a row activates it once`, async ({ page }) => {
      await gotoStory(page, 'components-menu--open-and-close', 'swc-button');
      const menu = page.locator('swc-menu');
      const trigger = page.getByRole('button', { name: 'Edit' });

      await trigger.click();
      await expect(menu).toHaveJSProperty('open', true);

      // `open` alone is too weak a signal: held Enter used to reopen the menu
      // and then close it again, ending back at `false` while having run a
      // row twice. Counting activations and reopens catches both shapes.
      await page.evaluate(() => {
        const w = window as unknown as Record<string, number>;
        w.__rowClicks = 0;
        w.__reopens = 0;
        document.addEventListener(
          'click',
          (event) => {
            const onRow = event
              .composedPath()
              .some(
                (node) => (node as HTMLElement)?.localName === 'swc-menu-item'
              );
            if (onRow) {
              w.__rowClicks += 1;
            }
          },
          true
        );
        document.querySelector('swc-menu')?.addEventListener('swc-open', () => {
          w.__reopens += 1;
        });
      });

      // No awaits between the presses: a real held key gives the component no
      // gap to settle in, and an await here hides the bug entirely.
      await page.keyboard.down(key);
      await page.keyboard.down(key);
      await page.keyboard.down(key);
      await page.keyboard.up(key);

      const counts = await page.evaluate(() => {
        const w = window as unknown as Record<string, number>;
        return { rowClicks: w.__rowClicks, reopens: w.__reopens };
      });
      expect(counts.rowClicks, 'the row activates exactly once').toBe(1);
      expect(counts.reopens, 'the menu never reopens').toBe(0);
      await expect(menu).toHaveJSProperty('open', false);
      await expect(trigger).toBeFocused();
    });

    test(`a single ${name} on a row closes the menu once`, async ({ page }) => {
      await gotoStory(page, 'components-menu--open-and-close', 'swc-button');
      const menu = page.locator('swc-menu');
      const trigger = page.getByRole('button', { name: 'Edit' });

      await trigger.click();
      await expect(menu).toHaveJSProperty('open', true);

      await page.keyboard.press(key);

      await expect(menu).toHaveJSProperty('open', false);
      await expect(trigger).toBeFocused();
    });
  }

  test('an outside click closes the menu', async ({ page }) => {
    await gotoStory(page, 'components-menu--open-and-close', 'swc-button');
    const menu = page.locator('swc-menu');
    const trigger = page.getByRole('button', { name: 'Edit' });

    await trigger.click();
    await expect(menu).toHaveJSProperty('open', true);
    // A trusted pointer press in the empty top-left corner is outside the
    // menu and its trigger, so it light-dismisses.
    await page.mouse.click(2, 2);
    await expect(menu).toHaveJSProperty('open', false);
  });

  // Regression test for the reopen guard: pressing the trigger again while
  // open light-dismisses the menu before the trailing click fires, so a
  // naive `open = !open` handler would read `open` as already false and
  // flip it back to true instead of leaving it closed. Needs a real,
  // trusted click; synthetic play-function clicks don't trigger native
  // light-dismiss at all.
  test('clicking the trigger again while open closes it instead of reopening it', async ({
    page,
  }) => {
    await gotoStory(page, 'components-menu--open-and-close', 'swc-button');
    const menu = page.locator('swc-menu');
    const trigger = page.getByRole('button', { name: 'Edit' });

    await trigger.click();
    await expect(menu).toHaveJSProperty('open', true);

    await trigger.click();
    await expect(menu).toHaveJSProperty('open', false);
  });

  // Opening the menu focuses the first row whichever way it was opened, so the
  // only thing separating a mouse open from a keyboard one is `:focus-visible`.
  // That distinction is a native modality heuristic: it needs trusted input and
  // is invisible to the synthetic events in `menu.test.ts`, which report every
  // open as focus-visible.
  test('a mouse-opened menu paints no focus treatment on the first row', async ({
    page,
  }) => {
    await gotoStory(page, 'components-menu--open-and-close', 'swc-button');
    const menu = page.locator('swc-menu');
    const trigger = page.getByRole('button', { name: 'Edit' });

    await trigger.click();
    await expect(menu).toHaveJSProperty('open', true);

    const painted = await page.evaluate(() => {
      const row = document.querySelector('swc-menu-item') as HTMLElement;
      const chrome = row.shadowRoot?.querySelector('.swc-MenuItem') as Element;
      const styles = getComputedStyle(chrome);
      return {
        focused: row.matches(':focus'),
        outline: styles.outlineStyle,
        background: styles.backgroundColor,
      };
    });

    // Still focused: the row has to be, or arrow keys have nowhere to start.
    expect(painted.focused).toBe(true);
    expect(painted.outline).toBe('none');
    expect(painted.background).toMatch(/\/\s*0\s*\)|,\s*0\)/);
  });

  test('a keyboard-opened menu paints the focus treatment on the first row', async ({
    page,
  }) => {
    await gotoStory(page, 'components-menu--open-and-close', 'swc-button');
    const menu = page.locator('swc-menu');
    const trigger = page.getByRole('button', { name: 'Edit' });

    await trigger.focus();
    await page.keyboard.press('Enter');
    await expect(menu).toHaveJSProperty('open', true);

    const read = (property: 'outlineStyle' | 'backgroundColor') => () =>
      page.evaluate((prop) => {
        const row = document.querySelector('swc-menu-item') as HTMLElement;
        const chrome = row.shadowRoot?.querySelector(
          '.swc-MenuItem'
        ) as Element;
        return getComputedStyle(chrome)[prop as 'backgroundColor'];
      }, property);

    await expect.poll(read('outlineStyle')).toBe('solid');
    // Opaque, so the row reads as the keyboard cursor position. Polled rather
    // than read once: the fill transitions in, so a single read can catch it
    // still transparent at the start of the transition.
    await expect
      .poll(read('backgroundColor'))
      .not.toMatch(/\/\s*0\s*\)|,\s*0\)/);
  });

  // Opening focuses the first row, so without focus following the pointer a
  // keyboard-opened menu shows its focused row and a hovered row at once, and
  // arrow keys resume from the row the user stopped looking at. Needs trusted
  // input: `pointerover` from a synthetic hover does not move the real focus.
  test('hovering a row moves focus off the row the keyboard left behind', async ({
    page,
  }) => {
    await gotoStory(page, 'components-menu--open-and-close', 'swc-button');
    const menu = page.locator('swc-menu');
    const trigger = page.getByRole('button', { name: 'Edit' });

    await trigger.focus();
    await page.keyboard.press('Enter');
    await expect(menu).toHaveJSProperty('open', true);

    const rows = page.locator('swc-menu-item');
    await expect(rows.first()).toBeFocused();

    await rows.nth(2).hover();

    await expect(rows.nth(2)).toBeFocused();
    await expect(rows.first()).not.toBeFocused();

    // The roving tab stop moves with focus, so arrow keys continue from the
    // hovered row rather than from where the keyboard left off.
    await page.keyboard.press('ArrowUp');
    await expect(rows.nth(1)).toBeFocused();
  });

  // Spectrum resolves every down colour to its hover value, so colour cannot
  // show a press; the transform is the whole of the down state. Needs a real
  // button press, which a play function cannot produce.
  test('pressing a row shows a down state', async ({ page }) => {
    await gotoStory(page, 'components-menu--open-and-close', 'swc-button');
    const menu = page.locator('swc-menu');
    const trigger = page.getByRole('button', { name: 'Edit' });

    await trigger.click();
    await expect(menu).toHaveJSProperty('open', true);

    const row = page.locator('swc-menu-item').first();
    const chromeTransform = () =>
      row.evaluate(
        (el) =>
          getComputedStyle(
            el.shadowRoot?.querySelector('.swc-MenuItem') as Element
          ).transform
      );

    const box = (await row.boundingBox())!;
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    // Polled on both sides of the press: the transform rides a transition, so
    // a single read can catch either end of it mid-flight.
    await expect
      .poll(chromeTransform, { message: 'flat until pressed' })
      .toBe('none');

    await page.mouse.down();
    // The transition has to land before the transform is read.
    await expect
      .poll(chromeTransform, { message: 'the pressed row recedes' })
      .not.toBe('none');
    await page.mouse.up();
  });

  // A menu opens under wherever the cursor already is, and `pointerover` fires
  // for a row that arrives under a still cursor just as it does for one the
  // pointer moves onto. Without telling those apart, opening by keyboard with
  // the mouse resting over the menu starts focus under the cursor, and Enter
  // chooses that row instead of the first.
  test('a keyboard open ignores a cursor already resting over a row', async ({
    page,
  }) => {
    await gotoStory(page, 'components-menu--open-and-close', 'swc-button');
    const menu = page.locator('swc-menu');
    const trigger = page.getByRole('button', { name: 'Edit' });
    const rows = page.locator('swc-menu-item');

    // Learn where the last row lands, then close and park the cursor there.
    await trigger.click();
    await expect(menu).toHaveJSProperty('open', true);
    const lastBox = (await rows.nth(2).boundingBox())!;
    await page.keyboard.press('Escape');
    await expect(menu).toHaveJSProperty('open', false);
    await page.mouse.move(
      lastBox.x + lastBox.width / 2,
      lastBox.y + lastBox.height / 2
    );

    // Open by keyboard without moving the mouse again.
    await trigger.focus();
    await page.keyboard.press('Enter');
    await expect(menu).toHaveJSProperty('open', true);

    await expect(rows.first(), 'focus starts on the first row').toBeFocused();

    // And the press lands on the first row, which is the symptom that matters.
    let activated = '';
    await page.exposeFunction('noteActivation', (label: string) => {
      activated = label;
    });
    await page.evaluate(() => {
      for (const row of Array.from(
        document.querySelectorAll('swc-menu-item')
      )) {
        row.addEventListener('click', () =>
          (
            window as unknown as { noteActivation: (l: string) => void }
          ).noteActivation(row.textContent?.trim() ?? '')
        );
      }
    });
    await page.keyboard.press('Enter');
    await expect(menu).toHaveJSProperty('open', false);
    expect(activated, 'the first row is the one chosen').toBe('Cut');
  });

  // Once the pointer actually moves, it takes over again.
  test('a pointer move after a keyboard open restores hover focus', async ({
    page,
  }) => {
    await gotoStory(page, 'components-menu--open-and-close', 'swc-button');
    const menu = page.locator('swc-menu');
    const trigger = page.getByRole('button', { name: 'Edit' });
    const rows = page.locator('swc-menu-item');

    await trigger.focus();
    await page.keyboard.press('Enter');
    await expect(menu).toHaveJSProperty('open', true);
    await expect(rows.first()).toBeFocused();

    await rows.nth(2).hover();

    await expect(rows.nth(2), 'hover takes focus once moved').toBeFocused();
  });

  // `:focus-visible` is sticky once a key press has set the modality, so moving
  // focus to the hovered row would otherwise drag the keyboard ring along with
  // the pointer.
  test('a hovered row shows no focus ring after a keyboard open', async ({
    page,
  }) => {
    await gotoStory(page, 'components-menu--open-and-close', 'swc-button');
    const menu = page.locator('swc-menu');
    const trigger = page.getByRole('button', { name: 'Edit' });

    await trigger.focus();
    await page.keyboard.press('Enter');
    await expect(menu).toHaveJSProperty('open', true);

    const rows = page.locator('swc-menu-item');
    const outlineOf = (index: number) =>
      rows.nth(index).evaluate((row) => {
        const chrome = row.shadowRoot?.querySelector(
          '.swc-MenuItem'
        ) as Element;
        return getComputedStyle(chrome).outlineStyle;
      });

    // The keyboard put the ring on row one.
    expect(await outlineOf(0)).toBe('solid');

    await rows.nth(1).hover();
    await expect(rows.nth(1)).toBeFocused();

    // Focus moved, but the pointer marks its own row with the hover fill, so
    // no ring on either.
    expect(await outlineOf(1)).toBe('none');
    expect(await outlineOf(0)).toBe('none');

    // Moving the pointer off the row must not hand the ring back. The row
    // keeps focus, and hover alone cannot express that, because the gaps
    // between rows are not hovered either.
    await page.mouse.move(2, 2);
    await expect(rows.nth(1)).toBeFocused();
    expect(await outlineOf(1)).toBe('none');

    // Keyboard takes over again: the ring returns on the row it moves to.
    await page.keyboard.press('ArrowDown');
    await expect(rows.nth(2)).toBeFocused();
    expect(await outlineOf(2)).toBe('solid');
  });
});
