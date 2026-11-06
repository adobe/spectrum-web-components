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

import { expect, type Locator, type Page, test } from '@playwright/test';

import type { Checkbox } from '@adobe/spectrum-wc/checkbox';

import { gotoStory } from '../../../utils/a11y-helpers.js';

/**
 * Accessibility tests for the gen2 Checkbox component.
 *
 * ARIA snapshots, name and state checks, and tests that need trusted pointer
 * or keyboard input, which play functions can't produce. aXe runs through
 * test-storybook. Each test configures the Playground story because the CI
 * Storybook build excludes `test/*.test.ts` stories.
 */

const PLAYGROUND = 'components-checkbox--playground';

type SubmitLog = { submitters: string[] };

/** Values the tests record on the page's `window`. */
type TestWindow = Window & { __submits?: SubmitLog; __changes?: boolean[] };

/** Moves the Playground checkbox into a form and records each submitter id. */
async function wrapInForm(checkbox: Locator): Promise<void> {
  await checkbox.evaluate((element: Checkbox) => {
    const form = document.createElement('form');
    form.id = 'form';
    element.replaceWith(form);
    form.append(element);
    const log: SubmitLog = { submitters: [] };
    (window as TestWindow).__submits = log;
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      log.submitters.push(event.submitter?.id ?? 'none');
    });
  });
}

function readSubmitters(page: Page): () => Promise<string[] | undefined> {
  return () =>
    page.evaluate(() => (window as TestWindow).__submits?.submitters);
}

/** Adds a native button; `where` places it relative to the form. */
async function addButton(
  page: Page,
  id: string,
  where: 'append' | 'prepend' | 'outside',
  disabled = false
): Promise<void> {
  await page.evaluate(
    ({ id, where, disabled }) => {
      const form = document.querySelector('#form') as HTMLFormElement;
      const button = document.createElement('button');
      button.id = id;
      button.type = 'submit';
      button.textContent = id;
      button.disabled = !!disabled;
      if (where === 'outside') {
        button.setAttribute('form', 'form');
        form.after(button);
      } else {
        form[where](button);
      }
    },
    { id, where, disabled }
  );
}

/**
 * Runs `change` after the checkbox's deferred Enter handler for the next
 * keydown. Same-delay timers run in the order they're scheduled, and this
 * listener runs after the inner input's, so no wait is needed.
 */
async function afterNextEnter(
  checkbox: Locator,
  change: 'add-submit' | 'remove-disabled'
): Promise<void> {
  await checkbox.evaluate((element: Checkbox, change) => {
    element.addEventListener(
      'keydown',
      () => {
        setTimeout(() => {
          const form = document.querySelector('#form') as HTMLFormElement;
          if (change === 'add-submit') {
            const button = document.createElement('button');
            button.id = 'submit';
            button.type = 'submit';
            form.append(button);
          } else {
            form.querySelector('#disabled')?.remove();
          }
        });
      },
      { once: true }
    );
  }, change);
}

test.describe('Checkbox - ARIA snapshots', () => {
  test('exposes role, name, and checked state from the inner input', async ({
    page,
  }) => {
    const root = await gotoStory(page, PLAYGROUND, 'swc-checkbox');
    const checkbox = root.locator('swc-checkbox');
    await expect(root).toMatchAriaSnapshot(`
      - checkbox "Send me product updates"
    `);

    for (const [setup, snapshot] of [
      [{ checked: true }, '[checked]'],
      [{ indeterminate: true }, '[checked=mixed]'],
      [{ fieldStatus: 'disabled' }, '[disabled]'],
    ] as const) {
      await checkbox.evaluate(async (element: Checkbox, props) => {
        element.checked = false;
        element.indeterminate = false;
        element.fieldStatus = undefined;
        Object.assign(element, props);
        await element.updateComplete;
      }, setup);
      await expect(root).toMatchAriaSnapshot(`
        - checkbox "Send me product updates" ${snapshot}
      `);
    }
  });

  test('read-only, invalid, and required reach the inner input', async ({
    page,
  }) => {
    const root = await gotoStory(page, PLAYGROUND, 'swc-checkbox');
    const checkbox = root.locator('swc-checkbox');
    const input = root.getByRole('checkbox', {
      name: 'Send me product updates',
    });

    await checkbox.evaluate(async (element: Checkbox) => {
      element.fieldStatus = 'readonly';
      await element.updateComplete;
    });
    await expect(root).toMatchAriaSnapshot(`
      - checkbox "Send me product updates" [disabled]
    `);
    await expect(input).toHaveAttribute('aria-disabled', 'true');
    await expect(input).not.toHaveAttribute('aria-readonly');
    await expect(input).toHaveJSProperty('disabled', false);
    await input.focus();
    await expect(input).toBeFocused();

    await checkbox.evaluate(async (element: Checkbox) => {
      element.fieldStatus = 'invalid';
      element.required = true;
      await element.updateComplete;
    });
    await expect(root).toMatchAriaSnapshot(`
      - checkbox "Send me product updates"
    `);
    await expect(input).toHaveAttribute('aria-invalid', 'true');
    await expect(input).toHaveJSProperty('required', true);
  });

  test('accessible-labelledby and accessible-label take precedence over the label slot', async ({
    page,
  }) => {
    const root = await gotoStory(page, PLAYGROUND, 'swc-checkbox');
    const checkbox = root.locator('swc-checkbox');

    await checkbox.evaluate(async (element: Checkbox) => {
      element.accessibleLabel = 'Product updates';
      await element.updateComplete;
    });
    await expect(root).toMatchAriaSnapshot(`
      - checkbox "Product updates"
    `);

    await checkbox.evaluate(async (element: Checkbox) => {
      element.querySelector('[slot="label"]')?.remove();
      await element.updateComplete;
    });
    // The label slot change re-renders after `updateComplete`, so wait for the
    // in-shadow label to go before reading the name.
    await expect(checkbox.locator('label')).toHaveCount(0);
    await expect(root).toMatchAriaSnapshot(`
      - checkbox "Product updates"
    `);

    // Playwright's name matchers don't follow element references across
    // shadow roots, so assert the reference the browser ranks first.
    const labelledBy = await checkbox.evaluate(async (element: Checkbox) => {
      const heading = document.createElement('span');
      heading.id = 'external-name';
      heading.textContent = 'Newsletter';
      element.before(heading);
      element.accessibleLabelledby = 'external-name';
      await element.updateComplete;
      const input = element.shadowRoot?.querySelector('input');
      return input?.ariaLabelledByElements?.map((ref) => ref.textContent);
    });
    expect(labelledBy).toEqual(['Newsletter']);
  });
});

test.describe('Checkbox - Keyboard interactions', () => {
  test('Space toggles, Enter does not', async ({ page }) => {
    const root = await gotoStory(page, PLAYGROUND, 'swc-checkbox');
    const checkbox = root.locator('swc-checkbox');

    await page.keyboard.press('Tab');
    await expect(checkbox.locator('input')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(checkbox).toHaveJSProperty('checked', false);
    await page.keyboard.press('Space');
    await expect(checkbox).toHaveJSProperty('checked', true);
    await expect(checkbox).toMatchAriaSnapshot(`
      - checkbox "Send me product updates" [checked]
    `);
  });

  test('a read-only checkbox is a Tab stop that Space does not toggle', async ({
    page,
  }) => {
    const root = await gotoStory(page, PLAYGROUND, 'swc-checkbox');
    const checkbox = root.locator('swc-checkbox');
    await checkbox.evaluate(async (element: Checkbox) => {
      element.checked = true;
      element.fieldStatus = 'readonly';
      await element.updateComplete;
    });

    await page.keyboard.press('Tab');
    await expect(checkbox.locator('input')).toBeFocused();
    await page.keyboard.press('Space');

    await expect(checkbox.locator('input')).toBeChecked();
    await expect(checkbox).toHaveJSProperty('checked', true);
    await expect(checkbox).toMatchAriaSnapshot(`
      - checkbox "Send me product updates" [checked]
    `);
  });

  test('Space on a mixed checkbox clears the mixed state and checks it', async ({
    page,
  }) => {
    const root = await gotoStory(page, PLAYGROUND, 'swc-checkbox');
    const checkbox = root.locator('swc-checkbox');
    await checkbox.evaluate(async (element: Checkbox) => {
      element.indeterminate = true;
      await element.updateComplete;
    });
    await expect(root).toMatchAriaSnapshot(`
      - checkbox "Send me product updates" [checked=mixed]
    `);

    await page.keyboard.press('Tab');
    await expect(checkbox.locator('input')).toBeFocused();
    await page.keyboard.press('Space');

    await expect(checkbox).toHaveJSProperty('indeterminate', false);
    await expect(checkbox).toHaveJSProperty('checked', true);
    await expect(root).toMatchAriaSnapshot(`
      - checkbox "Send me product updates" [checked]
    `);
  });

  test('focus() and a host tabindex route through the inner input', async ({
    page,
  }) => {
    const root = await gotoStory(page, PLAYGROUND, 'swc-checkbox');
    const checkbox = root.locator('swc-checkbox');
    const input = checkbox.locator('input');

    await checkbox.evaluate((element: Checkbox) => element.focus());
    await expect(input).toBeFocused();

    await checkbox.evaluate(async (element: Checkbox) => {
      element.blur();
      for (const [id, place] of [
        ['before', 'before'],
        ['after', 'after'],
      ] as const) {
        const button = document.createElement('button');
        button.id = id;
        button.textContent = id;
        element[place](button);
      }
      element.setAttribute('tabindex', '-1');
      await element.updateComplete;
    });
    await page.locator('#before').focus();
    await page.keyboard.press('Tab');
    await expect(page.locator('#after')).toBeFocused();
  });

  test('Tab skips a disabled checkbox and stops on each enabled one', async ({
    page,
  }) => {
    const root = await gotoStory(page, PLAYGROUND, 'swc-checkbox');
    await root.evaluate(async (element) => {
      element.innerHTML = `
        <button id="before">Before</button>
        <swc-checkbox id="first" accessible-label="First"></swc-checkbox>
        <swc-checkbox id="disabled" field-status="disabled" accessible-label="Disabled"></swc-checkbox>
        <swc-checkbox id="last" accessible-label="Last"></swc-checkbox>
        <button id="after">After</button>
      `;
      await Promise.all(
        Array.from(
          element.querySelectorAll('swc-checkbox'),
          (checkbox) => (checkbox as Checkbox).updateComplete
        )
      );
    });

    await page.locator('#before').focus();
    await page.keyboard.press('Tab');
    await expect(root.locator('#first input')).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await expect(root.locator('#first input')).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(root.locator('#last input')).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(root.locator('#after')).toBeFocused();
  });

  test('autofocus focuses the inner input', async ({ page }) => {
    const root = await gotoStory(page, PLAYGROUND, 'swc-checkbox');
    await root.evaluate(async (element) => {
      const checkbox = document.createElement('swc-checkbox');
      checkbox.id = 'autofocused';
      checkbox.setAttribute('autofocus', '');
      checkbox.setAttribute('accessible-label', 'Autofocused');
      element.append(checkbox);
    });

    await expect(root.locator('#autofocused input')).toBeFocused();
  });
});

test.describe('Checkbox - Pointer input', () => {
  test('keeps a user click when a click listener updates the checkbox', async ({
    page,
  }) => {
    const root = await gotoStory(page, PLAYGROUND, 'swc-checkbox');
    const checkbox = root.locator('swc-checkbox');
    await checkbox.evaluate(async (element: Checkbox) => {
      element.fieldStatus = 'invalid';
      await element.updateComplete;
      const changes: boolean[] = [];
      (window as TestWindow).__changes = changes;
      element.addEventListener('click', () => {
        element.fieldStatus = undefined;
      });
      element.addEventListener('change', () => changes.push(element.checked));
    });

    await checkbox.locator('input').click();

    await expect(checkbox).toHaveJSProperty('checked', true);
    await expect(checkbox.locator('input')).toBeChecked();
    expect(await page.evaluate(() => (window as TestWindow).__changes)).toEqual(
      [true]
    );
  });

  test('clicking the visible label toggles the checkbox', async ({ page }) => {
    const root = await gotoStory(page, PLAYGROUND, 'swc-checkbox');
    const checkbox = root.locator('swc-checkbox');
    const label = checkbox.locator('[slot="label"]');

    await label.click();
    await expect(checkbox).toHaveJSProperty('checked', true);
    await expect(root).toMatchAriaSnapshot(`
      - checkbox "Send me product updates" [checked]
    `);
    await label.click();
    await expect(checkbox).toHaveJSProperty('checked', false);
  });

  test('clicking the label of a read-only checkbox does not toggle it', async ({
    page,
  }) => {
    const root = await gotoStory(page, PLAYGROUND, 'swc-checkbox');
    const checkbox = root.locator('swc-checkbox');
    await checkbox.evaluate(async (element: Checkbox) => {
      element.fieldStatus = 'readonly';
      await element.updateComplete;
    });

    await checkbox.locator('[slot="label"]').click();

    await expect(checkbox).toHaveJSProperty('checked', false);
    await expect(checkbox.locator('input')).not.toBeChecked();
  });

  for (const initial of [false, true]) {
    test(`a click listener that sets checked to ${initial} again keeps it ${initial}, as on a native checkbox`, async ({
      page,
    }) => {
      const root = await gotoStory(page, PLAYGROUND, 'swc-checkbox');
      const checkbox = root.locator('swc-checkbox');
      await checkbox.evaluate(async (element: Checkbox, value: boolean) => {
        element.checked = value;
        await element.updateComplete;
        const native = document.createElement('input');
        native.type = 'checkbox';
        native.id = 'native';
        native.checked = value;
        element.after(native);
        for (const target of [element, native]) {
          target.addEventListener('click', () => {
            target.checked = value;
          });
        }
        const changes: boolean[] = [];
        (window as TestWindow).__changes = changes;
        element.addEventListener('change', () => changes.push(element.checked));
      }, initial);

      await page.locator('#native').click();
      await checkbox.locator('input').click();

      await expect(page.locator('#native')).toBeChecked({ checked: initial });
      await expect(checkbox).toHaveJSProperty('checked', initial);
      await expect(checkbox.locator('input')).toBeChecked({ checked: initial });
      expect(
        await page.evaluate(() => (window as TestWindow).__changes)
      ).toEqual([initial]);
    });
  }

  test('a click listener that re-adds the checked attribute keeps the user toggle, as on a native checkbox', async ({
    page,
  }) => {
    const root = await gotoStory(page, PLAYGROUND, 'swc-checkbox');
    const checkbox = root.locator('swc-checkbox');
    await checkbox.evaluate(async (element: Checkbox) => {
      element.setAttribute('checked', '');
      await element.updateComplete;
      const native = document.createElement('input');
      native.type = 'checkbox';
      native.id = 'native';
      native.setAttribute('checked', '');
      element.after(native);
      for (const target of [element, native]) {
        target.addEventListener('click', () => {
          target.setAttribute('checked', '');
        });
      }
    });

    await page.locator('#native').click();
    await checkbox.locator('input').click();

    await expect(page.locator('#native')).not.toBeChecked();
    await expect(checkbox).toHaveJSProperty('checked', false);
    await expect(checkbox.locator('input')).not.toBeChecked();
  });

  test('a click listener that sets indeterminate again keeps it, as on a native checkbox', async ({
    page,
  }) => {
    const root = await gotoStory(page, PLAYGROUND, 'swc-checkbox');
    const checkbox = root.locator('swc-checkbox');
    await checkbox.evaluate(async (element: Checkbox) => {
      element.indeterminate = true;
      await element.updateComplete;
      const native = document.createElement('input');
      native.type = 'checkbox';
      native.id = 'native';
      native.indeterminate = true;
      element.after(native);
      for (const target of [element, native]) {
        target.addEventListener('click', () => {
          target.indeterminate = true;
        });
      }
    });

    await page.locator('#native').click();
    await checkbox.locator('input').click();

    for (const input of [page.locator('#native'), checkbox.locator('input')]) {
      await expect(input).toHaveJSProperty('indeterminate', true);
      await expect(input).toBeChecked();
    }
    await expect(checkbox).toHaveJSProperty('indeterminate', true);
    await expect(checkbox).toHaveJSProperty('checked', true);
  });
});

test.describe('Checkbox - Form submission', () => {
  test('Enter submits through the default button and can be canceled', async ({
    page,
  }) => {
    const root = await gotoStory(page, PLAYGROUND, 'swc-checkbox');
    const checkbox = root.locator('swc-checkbox');
    const input = checkbox.locator('input');
    await wrapInForm(checkbox);
    const submitted = readSubmitters(page);

    // With no submit button, Enter does nothing; the button arrives only after
    // the handler has run, so the single submit comes from the second press.
    await afterNextEnter(checkbox, 'add-submit');
    await input.focus();
    await page.keyboard.press('Enter');
    await page.keyboard.press('Enter');
    await expect.poll(submitted).toEqual(['submit']);
    await expect(checkbox).toHaveJSProperty('checked', false);

    await checkbox.evaluate((element: Checkbox) => {
      element.addEventListener('keydown', (event) => event.preventDefault(), {
        once: true,
      });
    });
    await page.keyboard.press('Enter');
    await page.keyboard.press('Enter');
    await expect.poll(submitted).toEqual(['submit', 'submit']);
  });

  test('Enter uses the first submit button, including a form= button and a read-only checkbox', async ({
    page,
  }) => {
    const root = await gotoStory(page, PLAYGROUND, 'swc-checkbox');
    const checkbox = root.locator('swc-checkbox');
    const input = checkbox.locator('input');
    await wrapInForm(checkbox);
    const submitted = readSubmitters(page);

    await addButton(page, 'outside', 'outside');
    await input.focus();
    await page.keyboard.press('Enter');
    await expect.poll(submitted).toEqual(['outside']);

    await addButton(page, 'first', 'prepend');
    await addButton(page, 'last', 'append');
    await checkbox.evaluate(async (element: Checkbox) => {
      element.fieldStatus = 'readonly';
      await element.updateComplete;
    });
    await input.focus();
    await page.keyboard.press('Enter');
    await expect.poll(submitted).toEqual(['outside', 'first']);
  });

  test('Enter does nothing when the default button is disabled', async ({
    page,
  }) => {
    const root = await gotoStory(page, PLAYGROUND, 'swc-checkbox');
    const checkbox = root.locator('swc-checkbox');
    const input = checkbox.locator('input');
    await wrapInForm(checkbox);
    const submitted = readSubmitters(page);
    await addButton(page, 'disabled', 'append', true);
    await addButton(page, 'enabled', 'append');

    // The HTML spec skips implicit submission here; Chromium submits through
    // the next button instead. Follow the spec, as swc-text-field does.
    await afterNextEnter(checkbox, 'remove-disabled');
    await input.focus();
    await page.keyboard.press('Enter');
    await page.keyboard.press('Enter');
    await expect.poll(submitted).toEqual(['enabled']);
  });

  test('a blocked submit focuses the required checkbox', async ({ page }) => {
    const root = await gotoStory(page, PLAYGROUND, 'swc-checkbox');
    const checkbox = root.locator('swc-checkbox');
    await wrapInForm(checkbox);
    await addButton(page, 'submit', 'append');
    await checkbox.evaluate(async (element: Checkbox) => {
      element.required = true;
      await element.updateComplete;
    });

    await page.locator('#submit').click();

    await expect(checkbox.locator('input')).toBeFocused();
    await expect.poll(readSubmitters(page)).toEqual([]);
  });
});
