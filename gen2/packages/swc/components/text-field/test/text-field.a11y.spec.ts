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

import type { TextField } from '@adobe/spectrum-wc/text-field';

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

  test('includes textual necessity indicators in accessible names', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-text-field--necessity-indicator',
      'swc-text-field'
    );
    await expect(root).toMatchAriaSnapshot(`
      - textbox "Email address"
      - textbox "Email address (required)"
      - textbox "Email address (optional)"
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
    await expect(fields.nth(2).locator('input')).not.toHaveAttribute(
      'required'
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
    {
      story: 'valid',
      snapshot: '- textbox "Email address": person@example.com',
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
      }
    });
  }

  test('exposes invalid fields with error text or a description', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-text-field--invalid',
      'swc-text-field'
    );
    const fields = root.locator('swc-text-field');
    await expect(fields).toHaveCount(2);
    await expect(fields.nth(0).locator('input')).toMatchAriaSnapshot(`
      - textbox "Email address"
    `);
    await expect(fields.nth(1).locator('input')).toMatchAriaSnapshot(`
      - textbox "Username"
    `);
    for (const [index, slot, text] of [
      [0, 'error-text', 'Enter a valid email address.'],
      [1, 'description', 'Choose a username.'],
    ] as const) {
      const field = fields.nth(index);
      await expect(field.locator('input')).toHaveAttribute(
        'aria-invalid',
        'true'
      );
      await expect(field.locator(`[slot="${slot}"]`)).toBeVisible();
      await expect(field.locator(`[slot="${slot}"]`)).toHaveText(text);
      const describedSlots = await field
        .locator('input')
        .evaluate((input) =>
          input.ariaDescribedByElements?.map(
            (element) => element.querySelector('slot')?.name
          )
        );
      expect(describedSlots).toEqual([slot]);
    }
    const errorColor = await fields
      .nth(0)
      .locator('.swc-FormFieldErrorText')
      .evaluate((element) => getComputedStyle(element).color);
    await expect(fields.nth(1).locator('.swc-FormFieldDescription')).toHaveCSS(
      'color',
      errorColor
    );
  });

  for (const forcedColors of ['none', 'active'] as const) {
    test(`preserves disabled message styling with forced colors ${forcedColors}`, async ({
      page,
    }) => {
      await page.emulateMedia({ forcedColors });
      const root = await gotoStory(
        page,
        'components-text-field--invalid',
        'swc-text-field'
      );
      const fields = root.locator('swc-text-field');
      await expect(fields).toHaveCount(2);
      await fields.evaluateAll((fields) => {
        const fieldset = document.createElement('fieldset');
        fields[0].before(fieldset);
        fieldset.append(...fields);
        fieldset.disabled = true;
      });
      for (let index = 0; index < 2; index++) {
        const field = fields.nth(index);
        await expect(field.locator('input')).toBeDisabled();
        const message = field.locator(
          '.swc-FormFieldErrorText, .swc-FormFieldDescription'
        );
        const labelColor = await field
          .locator('.swc-FormFieldLabel')
          .evaluate((label) => getComputedStyle(label).color);
        await expect(message).toBeVisible();
        await expect(message).toHaveCSS('color', labelColor);
      }
      await expect(root.locator('[slot="error-text"]')).toBeVisible();
      await expect(root.locator('[slot="error-text"]')).toHaveText(
        'Enter a valid email address.'
      );
      await expect(root.locator('[slot="description"]').last()).toBeVisible();
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

test.describe('Text field - Events', () => {
  test('exposes input, change, and invalid with their documented behavior', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-text-field--overview',
      'swc-text-field'
    );
    const field = root.locator('swc-text-field');
    const input = field.locator('input');
    await field.evaluate((field: TextField) => {
      const events: {
        type: string;
        targetIsHost: boolean;
        bubbles: boolean;
        composed: boolean;
        cancelable: boolean;
        value: string;
      }[] = [];
      field.dataset.events = JSON.stringify(events);
      for (const type of ['input', 'change', 'invalid']) {
        field.addEventListener(type, (event) => {
          events.push({
            type: event.type,
            targetIsHost: event.target === field,
            bubbles: event.bubbles,
            composed: event.composed,
            cancelable: event.cancelable,
            value: field.value,
          });
          field.dataset.events = JSON.stringify(events);
        });
      }
    });

    const expected = [
      {
        type: 'input',
        targetIsHost: true,
        bubbles: true,
        composed: true,
        cancelable: false,
        value: 'Sam',
      },
      {
        type: 'change',
        targetIsHost: true,
        bubbles: true,
        composed: true,
        cancelable: false,
        value: 'Sam',
      },
      {
        type: 'invalid',
        targetIsHost: true,
        bubbles: false,
        composed: false,
        cancelable: true,
        value: '',
      },
    ];
    await input.fill('Sam');
    await expect(field).toHaveAttribute(
      'data-events',
      JSON.stringify(expected.slice(0, 1))
    );
    await input.blur();
    await expect(field).toHaveAttribute(
      'data-events',
      JSON.stringify(expected.slice(0, 2))
    );
    await field.evaluate(async (field: TextField) => {
      field.value = '';
      field.required = true;
      await field.updateComplete;
    });
    await expect(field).toHaveAttribute(
      'data-events',
      JSON.stringify(expected.slice(0, 2))
    );
    expect(
      await field.evaluate((field: TextField) => field.checkValidity())
    ).toBe(false);
    await expect(field).toHaveAttribute(
      'data-events',
      JSON.stringify(expected)
    );
  });
});

test.describe('Text field - Border color customization', () => {
  for (const status of [undefined, 'invalid', 'readonly'] as const) {
    test(`supports independent border colors when ${status ?? 'default'}`, async ({
      page,
    }) => {
      const root = await gotoStory(
        page,
        'components-text-field--overview',
        'swc-text-field'
      );
      const field = root.locator('swc-text-field');
      const input = field.locator('input');
      const control = field.locator('.swc-TextField-control');
      await field.evaluate(async (field: TextField, status) => {
        field.fieldStatus = status;
        field.style.setProperty(
          '--swc-text-field-border-color-default',
          'rgb(1, 2, 3)'
        );
        field.style.setProperty(
          '--swc-text-field-border-color-hover',
          'rgb(4, 5, 6)'
        );
        field.style.setProperty(
          '--swc-text-field-border-color-focus',
          'rgb(7, 8, 9)'
        );
        field.style.setProperty(
          '--swc-text-field-border-color-focus-hover',
          'rgb(10, 11, 12)'
        );
        await field.updateComplete;
      }, status);
      await control.evaluate((control: HTMLElement) => {
        control.style.transition = 'none';
      });

      for (const { focus, hover, color } of [
        { focus: false, hover: false, color: 'rgb(1, 2, 3)' },
        { focus: false, hover: true, color: 'rgb(4, 5, 6)' },
        { focus: true, hover: false, color: 'rgb(7, 8, 9)' },
        { focus: true, hover: true, color: 'rgb(10, 11, 12)' },
      ]) {
        if (focus) {
          await input.focus();
        } else {
          await input.evaluate((input: HTMLInputElement) => input.blur());
        }
        if (hover) {
          await control.hover();
        } else {
          await page.mouse.move(1000, 700);
        }
        await expect(control).toHaveCSS('border-top-color', color);
      }
    });
  }

  test('disabled border color wins over hover after invalid', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-text-field--overview',
      'swc-text-field'
    );
    const field = root.locator('swc-text-field');
    const control = field.locator('.swc-TextField-control');
    await field.evaluate(async (field: TextField) => {
      field.fieldStatus = 'disabled';
      await field.updateComplete;
    });
    await control.evaluate((control: HTMLElement) => {
      control.style.transition = 'none';
    });
    const disabledColor = await control.evaluate(
      (control) => getComputedStyle(control).borderTopColor
    );
    await field.evaluate(async (field: TextField) => {
      field.fieldStatus = 'invalid';
      await field.updateComplete;
      field.fieldStatus = 'disabled';
      await field.updateComplete;
    });
    await control.hover();
    await expect(control).toHaveCSS('border-top-color', disabledColor);
  });
});

test.describe('Text field - Keyboard interactions', () => {
  for (const { slot, index } of [
    { slot: 'description', index: 0 },
    { slot: 'error-text', index: 1 },
  ]) {
    for (const focused of [false, true]) {
      test(`clicking ${slot} with input ${focused ? 'focused' : 'unfocused'} does not focus the input`, async ({
        page,
      }) => {
        const root = await gotoStory(
          page,
          'components-text-field--anatomy',
          'swc-text-field'
        );
        const field = root.locator('swc-text-field').nth(index);
        const input = field.locator('input');
        const control = field.locator('.swc-TextField-control');
        await expect(input).not.toBeFocused();
        if (focused) {
          await input.focus();
          await expect(control).toHaveCSS('outline-style', 'solid');
        }
        await field.locator(`[slot="${slot}"]`).click();
        await expect(input).not.toBeFocused();
        await expect(control).toHaveCSS('outline-style', 'none');
      });
    }
  }

  test('messages do not add keyboard tab stops', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-text-field--anatomy',
      'swc-text-field'
    );
    const inputs = root.locator('swc-text-field input');
    await root.evaluate((root) => {
      const after = document.createElement('input');
      after.setAttribute('aria-label', 'After fields');
      root.append(after);
    });
    await inputs.nth(0).focus();
    await page.keyboard.press('Tab');
    await expect(inputs.nth(1)).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(
      root.getByRole('textbox', { name: 'After fields' })
    ).toBeFocused();
  });

  test('label, control padding, and prefix clicks still focus the input', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-text-field--prefix',
      'swc-text-field'
    );
    const field = root.locator('swc-text-field').first();
    const input = field.locator('input');
    await field.locator('[slot="label"]').click();
    await expect(input).toBeFocused();
    await input.evaluate((input: HTMLInputElement) => input.blur());
    await field.locator('.swc-TextField-control').click({
      position: { x: 1, y: 1 },
    });
    await expect(input).toBeFocused();
    await input.evaluate((input: HTMLInputElement) => input.blur());
    const prefix = await field.locator('[slot="prefix"]').boundingBox();
    if (!prefix) {
      throw new Error('Prefix click test requires a visible prefix');
    }
    await page.mouse.click(
      prefix.x + prefix.width / 2,
      prefix.y + prefix.height / 2
    );
    await expect(input).toBeFocused();
  });

  test('description text remains selectable and links remain usable', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-text-field--anatomy',
      'swc-text-field'
    );
    const field = root.locator('swc-text-field').first();
    const description = field.locator('[slot="description"]');
    await description.dblclick({ position: { x: 10, y: 8 } });
    expect(
      await page.evaluate(() => window.getSelection()?.toString().trim())
    ).toContain('Used');
    await description.evaluate((description) => {
      const link = document.createElement('a');
      link.href = '#field-help';
      link.textContent = 'More help';
      description.append(link);
    });
    const link = description.getByRole('link', { name: 'More help' });
    await link.click();
    await expect(page).toHaveURL(/#field-help$/);
    await expect(field.locator('input')).not.toBeFocused();
  });

  test('synchronizes form state before trusted input listeners run', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-text-field--overview',
      'swc-text-field'
    );
    const field = root.locator('swc-text-field');
    await field.evaluate(async (field: TextField) => {
      const form = document.createElement('form');
      field.before(form);
      form.append(field);
      field.name = 'username';
      field.required = true;
      await field.updateComplete;
      const states: {
        listener: string;
        trusted: boolean;
        value: string;
        formValue: FormDataEntryValue | null;
        valid: boolean;
        formValid: boolean;
      }[] = [];
      for (const [listener, target] of [
        ['field', field],
        ['form', form],
      ] as const) {
        target.addEventListener('input', (event) => {
          states.push({
            listener,
            trusted: event.isTrusted,
            value: field.value,
            formValue: new FormData(form).get('username'),
            valid: field.checkValidity(),
            formValid: form.checkValidity(),
          });
          field.dataset.inputStates = JSON.stringify(states);
        });
      }
    });
    await field.locator('input').focus();
    await page.keyboard.type('ab');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    const expected = ['a', 'ab', 'a', ''].flatMap((value) =>
      ['field', 'form'].map((listener) => ({
        listener,
        trusted: true,
        value,
        formValue: value,
        valid: value !== '',
        formValid: value !== '',
      }))
    );
    await expect(field).toHaveAttribute(
      'data-input-states',
      JSON.stringify(expected)
    );
  });

  test('preserves native minimum-length validation with trusted input', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-text-field--overview',
      'swc-text-field'
    );
    const field = root.locator('swc-text-field');
    await field.evaluate(async (field: TextField) => {
      const form = document.createElement('form');
      field.before(form);
      form.append(field);
      field.name = 'username';
      field.minlength = 5;
      await field.updateComplete;
    });
    const input = field.locator('input');
    const form = root.locator('form');
    await form.evaluate((form) => {
      form.dataset.submissions = '0';
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        form.dataset.submissions = String(Number(form.dataset.submissions) + 1);
      });
    });
    await input.evaluate((input) => {
      input.addEventListener('input', (event) => {
        input.dataset.trustedInput = String(event.isTrusted);
      });
    });
    const readValidity = () =>
      field.evaluate((field: TextField) => {
        const input = field.roleElement;
        const form = field.form;
        if (!input || !form) {
          throw new Error('Minimum-length test requires a form and input');
        }
        return {
          value: field.value,
          inputValue: input.value,
          nativeTooShort: input.validity.tooShort,
          tooShort: field.validity.tooShort,
          messageMatchesNative:
            field.validationMessage === input.validationMessage,
          validationMessage: field.validationMessage,
          valid: field.checkValidity(),
          formValid: form.checkValidity(),
          formValue: new FormData(form).get('username'),
          submissions: Number(form.dataset.submissions),
          trustedInput: input.dataset.trustedInput,
        };
      });

    await input.focus();
    await test.step('trusted typing below minlength blocks submission', async () => {
      await page.keyboard.type('abc');
      await expect.poll(readValidity).toMatchObject({
        value: 'abc',
        nativeTooShort: true,
        tooShort: true,
        messageMatchesNative: true,
        valid: false,
        formValid: false,
        trustedInput: 'true',
      });
      await form.evaluate((form: HTMLFormElement) => form.requestSubmit());
      expect((await readValidity()).submissions).toBe(0);
    });

    await test.step('unrelated renders preserve user-edit validity', async () => {
      await field.evaluate(async (field: TextField) => {
        field.placeholder = 'Enter a username';
        await field.updateComplete;
      });
      expect(await readValidity()).toMatchObject({
        nativeTooShort: true,
        tooShort: true,
      });
    });

    await test.step('exactly minlength characters permit submission', async () => {
      await page.keyboard.type('de');
      await expect.poll(readValidity).toMatchObject({
        value: 'abcde',
        nativeTooShort: false,
        tooShort: false,
        validationMessage: '',
        valid: true,
        formValid: true,
        formValue: 'abcde',
      });
      await form.evaluate((form: HTMLFormElement) => form.requestSubmit());
      expect((await readValidity()).submissions).toBe(1);
    });

    await test.step('deleting below minlength blocks submission again', async () => {
      await page.keyboard.press('Backspace');
      await page.keyboard.press('Backspace');
      await expect.poll(readValidity).toMatchObject({
        value: 'abc',
        nativeTooShort: true,
        tooShort: true,
      });
      await form.evaluate((form: HTMLFormElement) => form.requestSubmit());
      expect((await readValidity()).submissions).toBe(1);
    });

    await test.step('an empty optional field remains valid', async () => {
      await input.evaluate((input: HTMLInputElement) => input.select());
      await page.keyboard.press('Backspace');
      await expect.poll(readValidity).toMatchObject({
        value: '',
        tooShort: false,
        formValid: true,
      });
    });

    await test.step('programmatic values retain native validation semantics', async () => {
      await field.evaluate(async (field: TextField) => {
        field.value = 'abc';
        await field.updateComplete;
      });
      expect(await readValidity()).toMatchObject({
        inputValue: 'abc',
        nativeTooShort: false,
        tooShort: false,
        formValid: true,
        formValue: 'abc',
      });
    });
  });

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
