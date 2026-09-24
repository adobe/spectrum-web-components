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
 * Accessibility tests for Text Field component (2nd generation).
 *
 * ARIA snapshot tests validate the accessibility tree — the `textbox` role,
 * its accessible name, and its description — across every labelling source,
 * size, label position, necessity indicator, prefix, and state the stories
 * cover. aXe WCAG compliance and color-contrast checks run via
 * test-storybook (see .storybook/test-runner.ts).
 *
 * The component sets `delegatesFocus: true`, so tab focus lands on the
 * internal `<input>`. Keyboard-interaction tests exercise that contract
 * with real trusted input.
 */

test.describe('Text field - ARIA Snapshots', () => {
  test('exposes a textbox with the slotted label as its name', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-text-field--overview',
      'swc-text-field'
    );
    await expect(root).toMatchAriaSnapshot(`
      - textbox "Favorite food"
    `);
  });

  test('names each anatomy variation (description and error-text)', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-text-field--anatomy',
      'swc-text-field'
    );
    await expect(root).toMatchAriaSnapshot(`
      - textbox "Email address"
      - textbox "Email address"
    `);
  });

  test('resolves each accessible name source (slot, accessible-label, accessible-labelledby)', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-text-field--labelling',
      'swc-text-field'
    );
    await expect(root).toMatchAriaSnapshot(`
      - textbox "Email address"
      - textbox "Email address"
      - textbox "Billing Street address"
    `);
  });

  test('names each textbox across sizes', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-text-field--sizes',
      'swc-text-field'
    );
    await expect(root).toMatchAriaSnapshot(`
      - textbox "Small"
      - textbox "Medium"
      - textbox "Large"
      - textbox "Extra-large"
    `);
  });

  test('names each textbox across label positions (identical semantics)', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-text-field--label-positions',
      'swc-text-field'
    );
    await expect(root).toMatchAriaSnapshot(`
      - textbox "Label on top"
      - textbox "Label on side"
    `);
  });

  test('folds necessity into the label when necessity-indicator="label"', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-text-field--necessity-indicator',
      'swc-text-field'
    );
    // Icon mode: asterisk is aria-hidden, name is just the label. Label
    // mode: "(required)" / "(optional)" is text in the `<label for>`, so
    // it becomes part of the accessible name.
    await expect(root).toMatchAriaSnapshot(`
      - textbox "Email address"
      - textbox "Email address (required)"
      - textbox "Email address (optional)"
    `);
  });

  test('names each textbox with a leading prefix affix', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-text-field--prefix',
      'swc-text-field'
    );
    // Prefix content is non-interactive and not part of the accessible name.
    await expect(root).toMatchAriaSnapshot(`
      - textbox "URL"
      - textbox "Mention"
      - textbox "User Email"
    `);
  });

  test('reflects native form states (required / readonly / disabled / invalid)', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-text-field--states',
      'swc-text-field'
    );
    await expect(root).toMatchAriaSnapshot(`
      - text: Default
      - textbox "Default"
      - text: Full name
      - textbox "Full name"
      - textbox "Read-only": Read-only value
      - text: Disabled
      - textbox "Disabled" [disabled]: Disabled value
      - textbox "Disabled placeholder" [disabled]
      - textbox "Email address"
      - text: Enter a valid email address. Email address
      - textbox "Email address" [disabled]
      - text: We'll never share your email.
    `);
  });

  test('associates description text via aria-describedby', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-text-field--accessibility',
      'swc-text-field'
    );
    await expect(root).toMatchAriaSnapshot(`
      - textbox "Comments"
      - paragraph: Describe the issue in as much detail as possible.
      - textbox "Issue details"
    `);
  });
});

test.describe('Text field - Keyboard interactions', () => {
  test('tab focus lands on the internal input via delegatesFocus', async ({
    page,
  }) => {
    await gotoStory(page, 'components-text-field--overview', 'swc-text-field');

    await page.keyboard.press('Tab');

    // The host reports as active; shadow-active is the delegated `<input>`.
    const focus = await page.evaluate(() => {
      const host = document.querySelector('swc-text-field');
      const shadowActive = host?.shadowRoot?.activeElement;
      return {
        activeTag: document.activeElement?.tagName.toLowerCase() ?? '',
        shadowActiveTag: shadowActive?.tagName.toLowerCase() ?? '',
      };
    });
    expect(focus.activeTag).toBe('swc-text-field');
    expect(focus.shadowActiveTag).toBe('input');
  });

  test('typing into the focused field updates the host value', async ({
    page,
  }) => {
    await gotoStory(page, 'components-text-field--overview', 'swc-text-field');

    // Trusted keyboard input exercises the platform's own input dispatch,
    // catching regressions in the `@input` bridge that play functions
    // (synthetic events) can miss.
    await page.keyboard.press('Tab');
    await page.keyboard.type('hello');

    const value = await page.evaluate(() => {
      const host = document.querySelector('swc-text-field') as HTMLElement & {
        value: string;
      };
      return host.value;
    });
    expect(value).toBe('hello');
  });

  test('a disabled field is not reachable via Tab', async ({ page }) => {
    await gotoStory(page, 'components-text-field--states', 'swc-text-field');

    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');
      const active = await page.evaluate(() => {
        const host = document.activeElement as HTMLElement | null;
        return {
          tag: host?.tagName.toLowerCase() ?? '',
          disabled: host?.hasAttribute('disabled') ?? false,
        };
      });
      if (active.tag === 'swc-text-field') {
        expect(
          active.disabled,
          'Tab must never land on a disabled swc-text-field'
        ).toBe(false);
      }
    }
  });
});
