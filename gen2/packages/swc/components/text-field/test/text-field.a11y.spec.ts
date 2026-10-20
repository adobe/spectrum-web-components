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
 * Accessibility tests for the gen2 Text Field component.
 *
 * ARIA snapshot tests validate the accessibility tree (the `textbox` role,
 * its accessible name, and its description) across every labelling source,
 * size, label position, necessity indicator, prefix, and state the stories
 * cover. aXe WCAG compliance and color-contrast checks run via
 * test-storybook (see .storybook/test-runner.ts).
 *
 * The component sets `delegatesFocus: true`, so tab focus lands on the
 * internal `<input>`. Keyboard-interaction tests exercise that contract
 * with real trusted input.
 */

test.describe('Text field - ARIA Snapshots', () => {
  for (const story of ['overview', 'playground']) {
    test(`shows the Name example in ${story}`, async ({ page }) => {
      const root = await gotoStory(
        page,
        `components-text-field--${story}`,
        'swc-text-field'
      );
      await expect(root).toMatchAriaSnapshot(`
        - textbox "Name"
      `);
      await expect(root.locator('input')).toHaveAttribute(
        'placeholder',
        'Enter your full name'
      );
    });
  }

  test('shows named anatomy variations side by side', async ({ page }) => {
    await page.setViewportSize({ width: 1000, height: 800 });
    const root = await gotoStory(
      page,
      'components-text-field--anatomy',
      'swc-text-field'
    );
    await expect(root).toMatchAriaSnapshot(`
      - textbox "Email address"
      - textbox "Email address"
    `);
    const fields = root.locator('swc-text-field');
    await expect(fields).toHaveCount(2);
    const [description, error] = await fields.evaluateAll((fields) =>
      fields.map((field) => {
        const { left, right, top } = field.getBoundingClientRect();
        return { left, right, top };
      })
    );
    expect(error.top).toBeCloseTo(description.top, 1);
    expect(error.left).toBeGreaterThanOrEqual(description.right);
  });

  test('stacks label-overflow examples vertically', async ({ page }) => {
    await page.setViewportSize({ width: 1000, height: 800 });
    const root = await gotoStory(
      page,
      'components-text-field--label-overflow',
      'swc-text-field'
    );
    const fields = root.locator('swc-text-field');
    await expect(fields).toHaveCount(3);
    const bounds = await fields.evaluateAll((fields) =>
      fields.map((field) => {
        const { left, top, bottom } = field.getBoundingClientRect();
        return { left, top, bottom };
      })
    );
    bounds.slice(1).forEach((field, index) => {
      expect(field.left).toBeCloseTo(bounds[0].left, 1);
      expect(field.top).toBeGreaterThanOrEqual(bounds[index].bottom);
    });
  });

  test('resolves each accessible name source in precedence order', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-text-field--labelling',
      'swc-text-field'
    );
    const fields = root.locator('swc-text-field');
    await expect(fields).toHaveCount(6);
    await expect(fields.nth(4)).toMatchAriaSnapshot(`
      - textbox "Email address"
    `);
    await expect(fields.nth(5)).toMatchAriaSnapshot(`
      - textbox "Email address"
    `);
    // Assert the mapping directly: Playwright's name matchers do not
    // consistently represent cross-shadow element-reference relationships.
    const labelledbyNames = await root
      .locator('swc-text-field[accessible-labelledby]')
      .evaluateAll((fields) =>
        fields.map((field) =>
          field.shadowRoot
            ?.querySelector('input')
            ?.ariaLabelledByElements?.map(
              (element) => element.textContent?.trim() ?? ''
            )
            .join(' ')
        )
      );
    expect(labelledbyNames).toEqual([
      'Billing Street address',
      'Billing City',
      'Shipping Street address',
      'Shipping City',
    ]);
    await expect(
      root.getByRole('table', { name: 'Delivery addresses' })
    ).toBeVisible();
    await expect(
      root.getByRole('rowheader', { name: 'Billing' })
    ).toBeVisible();
    await expect(
      root.getByRole('columnheader', { name: 'Street address' })
    ).toBeVisible();
    await expect(
      root.getByRole('rowheader', { name: 'Shipping' })
    ).toBeVisible();
    await expect(
      root.getByRole('columnheader', { name: 'City' })
    ).toBeVisible();
  });

  test('keeps the required icon inline across sizes and label positions', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-text-field--required',
      'swc-text-field'
    );
    const field = root.locator('swc-text-field');
    await page.evaluate(() => document.fonts.ready);
    for (const size of ['s', 'm', 'l', 'xl']) {
      for (const position of ['top', 'side']) {
        for (const text of [
          'Full name',
          'A longer field label that wraps across several lines in this example',
        ]) {
          await field.evaluate(
            (field, { size, position, text }) => {
              field.setAttribute('size', size);
              field.setAttribute('label-position', position);
              field.setAttribute('style', 'inline-size: 260px;');
              const label = field.querySelector('[slot="label"]');
              if (!label) {
                throw new Error('Field label not found');
              }
              label.textContent = text;
            },
            { size, position, text }
          );
          await expect
            .poll(
              () =>
                field.evaluate((field) => {
                  const label = field.querySelector('[slot="label"]');
                  const icon = field.shadowRoot?.querySelector(
                    '.swc-FormFieldLabel-requiredIndicator swc-ui-icon'
                  );
                  if (!label || !icon || !icon.parentElement) {
                    throw new Error('Field label or required icon not found');
                  }
                  const range = document.createRange();
                  range.selectNodeContents(label);
                  const lines = Array.from(range.getClientRects());
                  const lastLine = lines[lines.length - 1];
                  const bounds = icon.getBoundingClientRect();
                  if (label.textContent?.startsWith('A longer')) {
                    const labelBounds = field.shadowRoot
                      ?.querySelector('label')
                      ?.getBoundingClientRect();
                    if (!labelBounds) {
                      throw new Error('Rendered field label not found');
                    }
                    return (
                      lines.length > 1 &&
                      bounds.left >= labelBounds.left &&
                      bounds.right <= labelBounds.right &&
                      bounds.bottom <= labelBounds.bottom
                    );
                  }
                  return (
                    bounds.top < lastLine.bottom &&
                    bounds.bottom > lastLine.top &&
                    bounds.left - lastLine.right <=
                      parseFloat(
                        getComputedStyle(icon.parentElement).marginInlineStart
                      ) +
                        0.5
                  );
                }),
              { message: `${size}/${position}: ${text}` }
            )
            .toBe(true);
        }
      }
    }
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

  test('exposes an identical accessible name across necessity-indicator modes', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-text-field--necessity-indicator',
      'swc-text-field'
    );
    // The necessity-indicator span is `aria-hidden="true"` (see
    // `renderNecessityIndicator` in `render-label.ts`), so the "(required)"
    // and "(optional)" text is excluded from the accessible name. All three
    // fields expose the same name; the mode only affects visible presentation.
    await expect(root).toMatchAriaSnapshot(`
      - textbox "Email address"
      - textbox "Email address"
      - textbox "Email address"
    `);
    const fields = root.locator('swc-text-field');
    await expect(fields.nth(0).locator('input')).toHaveAttribute(
      'required',
      ''
    );
    await expect(fields.nth(1).locator('input')).toHaveAttribute(
      'required',
      ''
    );
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

  for (const { story, snapshot } of [
    { story: 'default', snapshot: '- textbox "Full name"' },
    { story: 'required', snapshot: '- textbox "Full name"' },
    { story: 'read-only', snapshot: '- textbox "Username": sam.rivera' },
    { story: 'invalid', snapshot: '- textbox "Email address"' },
    {
      story: 'disabled-invalid',
      snapshot: '- textbox "Email address" [disabled]: not-an-email',
    },
  ]) {
    test(`exposes the ${story} state as a standalone story`, async ({
      page,
    }) => {
      const root = await gotoStory(
        page,
        `components-text-field--${story}`,
        'swc-text-field'
      );
      const input = root.locator('input');
      await expect(input).toMatchAriaSnapshot(snapshot);
      if (story === 'required') {
        await expect(input).toHaveAttribute('required', '');
      } else if (story === 'read-only') {
        await expect(input).toHaveAttribute('readonly', '');
      } else if (story === 'invalid') {
        await expect(input).toHaveAttribute('aria-invalid', 'true');
      } else if (story === 'disabled-invalid') {
        await expect(input).toHaveAttribute('aria-invalid', 'true');
        await expect(root.locator('.swc-FormFieldErrorText')).toBeVisible();
        await expect(root.locator('.swc-FormFieldDescription')).toHaveCount(0);
      }
    });
  }

  for (const forcedColors of ['none', 'active'] as const) {
    test(`preserves disabled error text styling with forced colors ${forcedColors}`, async ({
      page,
    }) => {
      await page.emulateMedia({ forcedColors });
      const root = await gotoStory(
        page,
        'components-text-field--disabled-invalid',
        'swc-text-field'
      );
      const error = root.locator('.swc-FormFieldErrorText');
      const labelColor = await root
        .locator('.swc-FormFieldLabel')
        .evaluate((label) => getComputedStyle(label).color);
      await expect(error).toBeVisible();
      await expect(root.locator('[slot="error-text"]')).toBeVisible();
      await expect(root.locator('[slot="error-text"]')).toHaveText(
        'Enter a valid email address.'
      );
      await expect(error).toHaveCSS('color', labelColor);
      await expect(root.locator('.swc-TextField-invalidIcon')).toHaveCount(0);
    });
  }

  test('shows one disabled field with an existing value', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-text-field--disabled',
      'swc-text-field'
    );
    const fields = root.locator('swc-text-field');
    await expect(fields).toHaveCount(1);
    await expect(fields.nth(0).locator('input')).toMatchAriaSnapshot(`
      - textbox "Email address" [disabled]: person@example.com
    `);
  });

  test('associates description text via aria-describedby', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-text-field--accessibility',
      'swc-text-field'
    );
    await expect(root).toMatchAriaSnapshot(`
      - text: Slotted
      - code: description
      - textbox "Comments"
      - text: Optional; visible to your team only.
      - code: accessible-describedby
      - text: ": described by another element"
      - paragraph: Describe the issue in as much detail as possible.
      - textbox "Issue details"
    `);
    const describedByIds = await root
      .locator('swc-text-field')
      .nth(1)
      .locator('input')
      .evaluate((input) =>
        (input as HTMLInputElement).ariaDescribedByElements?.map(
          (element) => element.id
        )
      );
    expect(describedByIds).toEqual(['accessibility-external-description']);
  });
});

test.describe('Text field - Keyboard interactions', () => {
  test('fits the address matrix at 390px without horizontal scrolling', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const root = await gotoStory(
      page,
      'components-text-field--labelling',
      'swc-text-field'
    );
    const dimensions = await root
      .getByRole('region', { name: 'Scrollable delivery address table' })
      .evaluate((element) => ({
        available: element.clientWidth,
        content: element.scrollWidth,
        page: element.ownerDocument.documentElement.scrollWidth,
        viewport: element.ownerDocument.documentElement.clientWidth,
      }));
    expect(dimensions.content).toBeLessThanOrEqual(dimensions.available);
    expect(dimensions.page).toBeLessThanOrEqual(dimensions.viewport);
  });

  test('keeps the address matrix keyboard-scrollable on narrow screens', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 844 });
    const root = await gotoStory(
      page,
      'components-text-field--labelling',
      'swc-text-field'
    );
    const region = root.getByRole('region', {
      name: 'Scrollable delivery address table',
    });
    const dimensions = await region.evaluate((element) => ({
      available: element.clientWidth,
      content: element.scrollWidth,
      page: element.ownerDocument.documentElement.scrollWidth,
      viewport: element.ownerDocument.documentElement.clientWidth,
    }));
    expect(dimensions.content).toBeGreaterThan(dimensions.available);
    expect(dimensions.page).toBeLessThanOrEqual(dimensions.viewport);
    await expect(region).toHaveAttribute('tabindex', '0');
    await region.focus();
    await page.keyboard.press('ArrowRight');
    await expect
      .poll(() => region.evaluate((element) => element.scrollLeft))
      .toBeGreaterThan(0);
  });

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
    const root = await gotoStory(
      page,
      'components-text-field--disabled',
      'swc-text-field'
    );
    await root.evaluate((root) => {
      const before = document.createElement('button');
      before.textContent = 'Before disabled field';
      const after = document.createElement('button');
      after.textContent = 'After disabled field';
      root.prepend(before);
      root.append(after);
    });
    await page.getByRole('button', { name: 'Before disabled field' }).focus();
    await page.keyboard.press('Tab');
    await expect(
      page.getByRole('button', { name: 'After disabled field' })
    ).toBeFocused();
  });
});
