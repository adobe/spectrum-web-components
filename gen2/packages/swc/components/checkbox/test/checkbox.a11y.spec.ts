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

import AxeBuilder from '@axe-core/playwright';
import { expect, type Locator, type Page, test } from '@playwright/test';
import { gotoStory } from '@swc-test-helpers/playwright';

import type { Checkbox } from '@adobe/spectrum-wc/checkbox';

/**
 * Accessibility tests for the gen2 Checkbox component.
 *
 * ARIA attributes and snapshots, keyboard and pointer input that play
 * functions can't produce, implicit form submission, and aXe validation of
 * every docs story. State tests configure the Playground story because the CI
 * Storybook build excludes `test/*.test.ts` stories.
 */

const PLAYGROUND = 'components-checkbox--playground';
const NAME = 'Send me product updates';
const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

/** Expected accessibility tree of each docs story, keyed by story ID suffix. */
const STORY_SNAPSHOTS: Record<string, string> = {
  playground: `
    - checkbox "Send me product updates" [checked=false]
    - text: Send me product updates
  `,
  overview: `
    - checkbox "Send me product updates" [checked]
    - text: Send me product updates
  `,
  anatomy: `
    - checkbox "Label" [checked]
    - text: Label
    - checkbox "Label" [checked=false]
    - text: Label Description
  `,
  sizes: `
    - checkbox "Size s" [checked]
    - text: Size s
    - checkbox "Size m" [checked]
    - text: Size m
    - checkbox "Size l" [checked]
    - text: Size l
    - checkbox "Size xl" [checked]
    - text: Size xl
  `,
  emphasized: `
    - checkbox "Unchecked" [checked=false]
    - text: Unchecked
    - checkbox "Checked" [checked]
    - text: Checked
    - checkbox "Indeterminate" [checked=mixed]
    - text: Indeterminate
  `,
  'with-description': `
    - checkbox "Send me product updates" [checked=false]
    - text: Send me product updates We send one email a month.
  `,
  'label-wrapping': `
    - checkbox "Send me product updates, event invitations, and occasional surveys about new features" [checked=false]
    - text: Send me product updates, event invitations, and occasional surveys about new features
  `,
  selection: `
    - checkbox "Unchecked" [checked=false]
    - text: Unchecked
    - checkbox "Checked" [checked]
    - text: Checked
    - checkbox "Indeterminate" [checked=mixed]
    - text: Indeterminate
  `,
  disabled: `
    - checkbox "Unchecked" [checked=false] [disabled]
    - text: Unchecked
    - checkbox "Checked" [checked] [disabled]
    - text: Checked
    - checkbox "Indeterminate" [checked=mixed] [disabled]
    - text: Indeterminate
    - checkbox "Emphasized checked" [checked] [disabled]
    - text: Emphasized checked
  `,
  'read-only': `
    - checkbox "Send me product updates" [checked] [disabled]
    - text: Send me product updates
  `,
  invalid: `
    - checkbox "I agree to the terms" [checked=false] [invalid]
    - text: I agree to the terms Check this box to continue.
    - checkbox "Share my usage data" [checked=false] [invalid]
    - text: Share my usage data Required by your organization.
    - checkbox "Confirm my email address" [checked=false] [invalid]
    - text: Confirm my email address
  `,
  'form-participation': `
    - checkbox "I agree to the terms of service" [checked=false]
    - text: I agree to the terms of service
    - checkbox "Send me product updates" [checked=false]
    - text: Send me product updates We send one email a month.
    - group:
      - button "Submit"
      - button "Reset"
    - status
  `,
};

type CheckboxState = Partial<
  Pick<Checkbox, 'checked' | 'indeterminate' | 'fieldStatus' | 'required'>
>;

type SubmitLog = { submitters: string[] };

/** Values the tests record on the page's `window`. */
type TestWindow = Window & {
  __submits?: SubmitLog;
  __changes?: boolean[];
  __controlSubmits?: number;
};

/** Resets the checkbox to its defaults, applies `state`, and waits to render. */
async function setState(
  checkbox: Locator,
  state: CheckboxState
): Promise<void> {
  await checkbox.evaluate(async (element: Checkbox, state) => {
    element.checked = false;
    element.indeterminate = false;
    element.fieldStatus = undefined;
    element.required = false;
    Object.assign(element, state);
    await element.updateComplete;
  }, state);
}

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

function readChanges(page: Page): Promise<boolean[] | undefined> {
  return page.evaluate(() => (window as TestWindow).__changes);
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
 * Adds a second form, outside the story root, with its own checkbox and
 * submit button, for ordering checks against the deferred Enter handler.
 */
async function addControlForm(page: Page): Promise<void> {
  await page.evaluate(() => {
    const form = document.createElement('form');
    form.id = 'control-form';
    const checkbox = document.createElement('swc-checkbox');
    checkbox.id = 'control';
    checkbox.setAttribute('accessible-label', 'Control');
    const button = document.createElement('button');
    button.type = 'submit';
    form.append(checkbox, button);
    (window as TestWindow).__controlSubmits = 0;
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      (window as TestWindow).__controlSubmits! += 1;
    });
    document.body.append(form);
  });
}

/**
 * Waits until every Enter pressed so far has been handled. Enter on the
 * control checkbox is handled after the earlier ones, so its submit marks
 * that point.
 */
async function waitForPendingEnters(page: Page): Promise<void> {
  const before = await page.evaluate(
    () => (window as TestWindow).__controlSubmits ?? 0
  );
  await page.locator('#control input').focus();
  await page.keyboard.press('Enter');
  await expect
    .poll(() => page.evaluate(() => (window as TestWindow).__controlSubmits), {
      message: 'the control form submits after the earlier Enter presses',
    })
    .toBe(before + 1);
}

test.describe('Checkbox - ARIA attributes', () => {
  test('should expose the checkbox role and name on the inner input, not the host', async ({
    page,
  }) => {
    const root = await gotoStory(page, PLAYGROUND, 'swc-checkbox');
    const checkbox = root.locator('swc-checkbox');
    const input = root.getByRole('checkbox', { name: NAME });

    await expect(checkbox, 'host sets no role').not.toHaveAttribute('role');
    await expect(input, 'one checkbox named by the label slot').toHaveCount(1);
    await expect(
      input,
      'role comes from a native checkbox input'
    ).toHaveJSProperty('type', 'checkbox');
    await expect(
      input,
      'unchecked input has no aria-invalid'
    ).not.toHaveAttribute('aria-invalid');
    await expect(
      input,
      'unchecked input has no aria-disabled'
    ).not.toHaveAttribute('aria-disabled');
    await expect(root, 'default accessibility tree').toMatchAriaSnapshot(`
      - checkbox "Send me product updates" [checked=false]
    `);
  });

  test('should expose checked and mixed states from the native input', async ({
    page,
  }) => {
    const root = await gotoStory(page, PLAYGROUND, 'swc-checkbox');
    const checkbox = root.locator('swc-checkbox');
    const input = root.getByRole('checkbox', { name: NAME });

    await setState(checkbox, { checked: true });
    await expect(input, 'input checked after checked = true').toBeChecked();
    await expect(root, 'tree after checked = true').toMatchAriaSnapshot(`
      - checkbox "Send me product updates" [checked]
    `);

    await setState(checkbox, { indeterminate: true });
    await expect(input, 'input mixed after indeterminate = true').toBeChecked({
      indeterminate: true,
    });
    await expect(root, 'tree after indeterminate = true').toMatchAriaSnapshot(`
      - checkbox "Send me product updates" [checked=mixed]
    `);
  });

  test('should set native disabled, not aria-disabled, on a disabled checkbox', async ({
    page,
  }) => {
    const root = await gotoStory(page, PLAYGROUND, 'swc-checkbox');
    const checkbox = root.locator('swc-checkbox');
    const input = root.getByRole('checkbox', { name: NAME });

    await setState(checkbox, { fieldStatus: 'disabled' });

    await expect(input, 'disabled input has native disabled').toBeDisabled();
    await expect(
      input,
      'disabled input has no aria-disabled'
    ).not.toHaveAttribute('aria-disabled');
    await expect(root, 'tree after field-status="disabled"')
      .toMatchAriaSnapshot(`
      - checkbox "Send me product updates" [checked=false] [disabled]
    `);
  });

  test('should set aria-disabled, not aria-readonly, on a focusable read-only checkbox', async ({
    page,
  }) => {
    const root = await gotoStory(page, PLAYGROUND, 'swc-checkbox');
    const checkbox = root.locator('swc-checkbox');
    const input = root.getByRole('checkbox', { name: NAME });

    await setState(checkbox, { fieldStatus: 'readonly' });

    await expect(root, 'tree after field-status="readonly"')
      .toMatchAriaSnapshot(`
      - checkbox "Send me product updates" [checked=false] [disabled]
    `);
    await expect(input, 'read-only input has aria-disabled').toHaveAttribute(
      'aria-disabled',
      'true'
    );
    await expect(
      input,
      'read-only input has no aria-readonly'
    ).not.toHaveAttribute('aria-readonly');
    await expect(
      input,
      'read-only input is not natively disabled'
    ).toHaveJSProperty('disabled', false);
    await input.focus();
    await expect(input, 'read-only input takes focus').toBeFocused();
  });

  test('should set aria-invalid and required on an invalid, required checkbox', async ({
    page,
  }) => {
    const root = await gotoStory(page, PLAYGROUND, 'swc-checkbox');
    const checkbox = root.locator('swc-checkbox');
    const input = root.getByRole('checkbox', { name: NAME });

    await setState(checkbox, { fieldStatus: 'invalid', required: true });

    await expect(root, 'tree after field-status="invalid"')
      .toMatchAriaSnapshot(`
      - checkbox "Send me product updates" [checked=false] [invalid]
    `);
    await expect(input, 'invalid input has aria-invalid').toHaveAttribute(
      'aria-invalid',
      'true'
    );
    await expect(input, 'required reaches the input').toHaveJSProperty(
      'required',
      true
    );

    await setState(checkbox, { required: true });
    await expect(
      input,
      'aria-invalid removed when no longer invalid'
    ).not.toHaveAttribute('aria-invalid');
    await expect(root, 'tree after clearing field-status').toMatchAriaSnapshot(`
      - checkbox "Send me product updates" [checked=false]
    `);
  });

  test('should drop required from the input while read-only', async ({
    page,
  }) => {
    const root = await gotoStory(page, PLAYGROUND, 'swc-checkbox');
    const checkbox = root.locator('swc-checkbox');
    const input = root.getByRole('checkbox', { name: NAME });

    await setState(checkbox, { required: true, fieldStatus: 'readonly' });
    await expect(input, 'read-only input is not required').toHaveJSProperty(
      'required',
      false
    );
    await expect(root, 'tree for a required read-only checkbox')
      .toMatchAriaSnapshot(`
      - checkbox "Send me product updates" [checked=false] [disabled]
    `);

    await setState(checkbox, { required: true });
    await expect(input, 'required returns once editable').toHaveJSProperty(
      'required',
      true
    );
    await expect(root, 'tree after clearing read-only').toMatchAriaSnapshot(`
      - checkbox "Send me product updates" [checked=false]
    `);
  });

  test('should give accessible-labelledby and accessible-label precedence over the label slot', async ({
    page,
  }) => {
    const root = await gotoStory(page, PLAYGROUND, 'swc-checkbox');
    const checkbox = root.locator('swc-checkbox');

    await checkbox.evaluate(async (element: Checkbox) => {
      element.accessibleLabel = 'Product updates';
      await element.updateComplete;
    });
    await expect(root, 'accessible-label overrides the label slot')
      .toMatchAriaSnapshot(`
      - checkbox "Product updates"
    `);

    await checkbox.evaluate(async (element: Checkbox) => {
      element.querySelector('[slot="label"]')?.remove();
      await element.updateComplete;
    });
    // The label slot change re-renders after `updateComplete`, so wait for the
    // in-shadow label to go before reading the name.
    await expect(
      checkbox.locator('label'),
      'no visible label once the label slot is empty'
    ).toHaveCount(0);
    await expect(
      root,
      'accessible-label names a checkbox with no visible label'
    ).toMatchAriaSnapshot(`
      - checkbox "Product updates" [checked=false]
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
    expect(
      labelledBy,
      'accessible-labelledby references the external name'
    ).toEqual(['Newsletter']);
  });

  test('should describe the input with its description or error text', async ({
    page,
  }) => {
    // Playwright's description matcher doesn't follow references into slots,
    // so read the slotted text of each element the input references.
    const describedBy = async (root: Locator): Promise<string[][]> =>
      root.locator('swc-checkbox').evaluateAll((elements) => {
        const textOf = (node: Node): string => {
          if (node instanceof HTMLSlotElement) {
            return node.assignedNodes({ flatten: true }).map(textOf).join('');
          }
          if (node instanceof Element && node.getAttribute('aria-hidden')) {
            return '';
          }
          if (node.nodeType === Node.TEXT_NODE) {
            return node.textContent ?? '';
          }
          return Array.from(node.childNodes).map(textOf).join('');
        };
        return elements.map((element) => {
          const input = element.shadowRoot?.querySelector('input');
          return (input?.ariaDescribedByElements ?? []).map((ref) =>
            textOf(ref).replace(/\s+/g, ' ').trim()
          );
        });
      });

    const withDescription = await gotoStory(
      page,
      'components-checkbox--with-description',
      'swc-checkbox'
    );
    expect(
      await describedBy(withDescription),
      'description slot describes the input'
    ).toEqual([['We send one email a month.']]);

    const invalid = await gotoStory(
      page,
      'components-checkbox--invalid',
      'swc-checkbox'
    );
    expect(
      await describedBy(invalid),
      'error text, or the description when no error text, describes an invalid input'
    ).toEqual([
      ['Check this box to continue.'],
      ['Required by your organization.'],
      [],
    ]);
  });
});

test.describe('Checkbox - ARIA snapshots', () => {
  for (const [story, snapshot] of Object.entries(STORY_SNAPSHOTS)) {
    test(`should match the accessibility tree - ${story}`, async ({ page }) => {
      const root = await gotoStory(
        page,
        `components-checkbox--${story}`,
        'swc-checkbox'
      );
      await expect(
        root,
        `accessibility tree for the ${story} story`
      ).toMatchAriaSnapshot(snapshot);
    });
  }

  test('should keep role, name, and state the same across sizes', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-checkbox--sizes',
      'swc-checkbox'
    );
    const checkboxes = root.locator('swc-checkbox');

    for (const [index, size] of ['s', 'm', 'l', 'xl'].entries()) {
      await expect(
        checkboxes.nth(index),
        `checkbox ${index} has size ${size}`
      ).toHaveAttribute('size', size);
      await expect(
        checkboxes.nth(index),
        `size ${size} keeps the checked checkbox role and name`
      ).toMatchAriaSnapshot(`
        - checkbox "Size ${size}" [checked]
      `);
    }
  });

  test('should keep role, name, and state the same when emphasized', async ({
    page,
  }) => {
    const emphasized = await gotoStory(
      page,
      'components-checkbox--emphasized',
      'swc-checkbox'
    );
    await expect(
      emphasized.locator('swc-checkbox[emphasized]'),
      'every Emphasized story checkbox is emphasized'
    ).toHaveCount(3);
    const emphasizedTree = await emphasized.ariaSnapshot();

    const standard = await gotoStory(
      page,
      'components-checkbox--selection',
      'swc-checkbox'
    );
    await expect(
      standard.locator('swc-checkbox[emphasized]'),
      'no Selection story checkbox is emphasized'
    ).toHaveCount(0);
    expect(
      emphasizedTree,
      'emphasized tree matches the default style tree'
    ).toBe(await standard.ariaSnapshot());
  });

  test('should update the accessibility tree after each state change', async ({
    page,
  }) => {
    const root = await gotoStory(page, PLAYGROUND, 'swc-checkbox');
    const checkbox = root.locator('swc-checkbox');
    await expect(root, 'default tree').toMatchAriaSnapshot(`
      - checkbox "Send me product updates" [checked=false]
    `);

    for (const [state, snapshot] of [
      [{ checked: true }, '[checked]'],
      [{ indeterminate: true }, '[checked=mixed]'],
      [{ fieldStatus: 'disabled' }, '[checked=false] [disabled]'],
      [{ fieldStatus: 'disabled', checked: true }, '[checked] [disabled]'],
      [{ fieldStatus: 'readonly' }, '[checked=false] [disabled]'],
      [{ fieldStatus: 'readonly', checked: true }, '[checked] [disabled]'],
      [{ fieldStatus: 'invalid' }, '[checked=false] [invalid]'],
      [{ fieldStatus: 'invalid', checked: true }, '[checked] [invalid]'],
      [{ required: true }, '[checked=false]'],
      [{}, '[checked=false]'],
    ] as const) {
      await setState(checkbox, state);
      await expect(root, `tree after setting ${JSON.stringify(state)}`)
        .toMatchAriaSnapshot(`
        - checkbox "Send me product updates" ${snapshot}
      `);
    }
  });
});

test.describe('Checkbox - Keyboard interactions', () => {
  test('should show the focus ring on the box for keyboard focus but not for a pointer click', async ({
    page,
  }) => {
    const root = await gotoStory(page, PLAYGROUND, 'swc-checkbox');
    const checkbox = root.locator('swc-checkbox');
    const box = checkbox.locator('.swc-Checkbox-box');
    const label = checkbox.locator('.swc-FormFieldLabel');
    const ringOf = () =>
      box.evaluate((element) => getComputedStyle(element).outlineStyle);
    const restingLabelColor = await label.evaluate(
      (element) => getComputedStyle(element).color
    );

    await page.locator('body').click({ position: { x: 1, y: 1 } });
    await page.keyboard.press('Tab');
    await expect(
      checkbox.locator('input'),
      'Tab focuses the inner input'
    ).toBeFocused();
    expect(await ringOf(), 'box outline with keyboard focus').toBe('solid');
    // The label color transitions, so wait for it to settle.
    await expect
      .poll(
        () => label.evaluate((element) => getComputedStyle(element).color),
        { message: 'label takes the focus color with keyboard focus' }
      )
      .not.toBe(restingLabelColor);

    await page.locator('body').click({ position: { x: 1, y: 1 } });
    // The transparent input sits over the box and takes the pointer.
    await checkbox.locator('input').click();
    await expect(
      checkbox.locator('input'),
      'a pointer click focuses the inner input'
    ).toBeFocused();
    expect(await ringOf(), 'box outline after a pointer click').toBe('none');
  });

  test('should toggle on Space and not on Enter', async ({ page }) => {
    const root = await gotoStory(page, PLAYGROUND, 'swc-checkbox');
    const checkbox = root.locator('swc-checkbox');
    const input = checkbox.locator('input');

    await page.keyboard.press('Tab');
    await expect(input, 'Tab focuses the inner input').toBeFocused();
    await page.keyboard.press('Enter');
    await expect(
      checkbox,
      'Enter leaves the checkbox unchecked'
    ).toHaveJSProperty('checked', false);
    await expect(root, 'tree after Enter').toMatchAriaSnapshot(`
      - checkbox "Send me product updates" [checked=false]
    `);

    await page.keyboard.press('Space');
    await expect(checkbox, 'first Space checks the checkbox').toHaveJSProperty(
      'checked',
      true
    );
    await expect(root, 'tree after the first Space').toMatchAriaSnapshot(`
      - checkbox "Send me product updates" [checked]
    `);

    await page.keyboard.press('Space');
    await expect(
      checkbox,
      'second Space unchecks the checkbox'
    ).toHaveJSProperty('checked', false);
    await expect(root, 'tree after the second Space').toMatchAriaSnapshot(`
      - checkbox "Send me product updates" [checked=false]
    `);
  });

  for (const [label, state, snapshot] of [
    ['unchecked', {}, '[checked=false]'],
    ['checked', { checked: true }, '[checked]'],
    ['mixed', { indeterminate: true }, '[checked=mixed]'],
    ['invalid', { fieldStatus: 'invalid' }, '[checked=false] [invalid]'],
    ['read-only', { fieldStatus: 'readonly' }, '[checked=false] [disabled]'],
  ] as const) {
    test(`should not toggle on Enter - ${label}`, async ({ page }) => {
      const root = await gotoStory(page, PLAYGROUND, 'swc-checkbox');
      const checkbox = root.locator('swc-checkbox');
      const input = checkbox.locator('input');
      await setState(checkbox, state);

      await page.keyboard.press('Tab');
      await expect(input, `Tab focuses the ${label} input`).toBeFocused();
      await page.keyboard.press('Enter');

      await expect(
        checkbox,
        `Enter keeps ${label} checked state`
      ).toHaveJSProperty('checked', 'checked' in state);
      await expect(
        checkbox,
        `Enter keeps ${label} indeterminate state`
      ).toHaveJSProperty('indeterminate', 'indeterminate' in state);
      await expect(root, `tree after Enter on a ${label} checkbox`)
        .toMatchAriaSnapshot(`
        - checkbox "Send me product updates" ${snapshot}
      `);
    });
  }

  test('should not toggle a focusable read-only checkbox on Space', async ({
    page,
  }) => {
    const root = await gotoStory(page, PLAYGROUND, 'swc-checkbox');
    const checkbox = root.locator('swc-checkbox');
    await setState(checkbox, { checked: true, fieldStatus: 'readonly' });

    await page.keyboard.press('Tab');
    await expect(
      checkbox.locator('input'),
      'Tab focuses the read-only input'
    ).toBeFocused();
    await page.keyboard.press('Space');

    await expect(
      checkbox.locator('input'),
      'Space leaves the read-only input checked'
    ).toBeChecked();
    await expect(
      checkbox,
      'Space leaves the read-only host checked'
    ).toHaveJSProperty('checked', true);
    await expect(root, 'tree after Space on a read-only checkbox')
      .toMatchAriaSnapshot(`
      - checkbox "Send me product updates" [checked] [disabled]
    `);
  });

  test('should clear the mixed state and check the checkbox on Space', async ({
    page,
  }) => {
    const root = await gotoStory(page, PLAYGROUND, 'swc-checkbox');
    const checkbox = root.locator('swc-checkbox');
    await setState(checkbox, { indeterminate: true });
    await expect(root, 'tree before Space on a mixed checkbox')
      .toMatchAriaSnapshot(`
      - checkbox "Send me product updates" [checked=mixed]
    `);

    await page.keyboard.press('Tab');
    await expect(
      checkbox.locator('input'),
      'Tab focuses the mixed input'
    ).toBeFocused();
    await page.keyboard.press('Space');

    await expect(checkbox, 'Space clears indeterminate').toHaveJSProperty(
      'indeterminate',
      false
    );
    await expect(checkbox, 'Space checks the mixed checkbox').toHaveJSProperty(
      'checked',
      true
    );
    await expect(root, 'tree after Space on a mixed checkbox')
      .toMatchAriaSnapshot(`
      - checkbox "Send me product updates" [checked]
    `);
  });

  test('should toggle each emphasized checkbox on Space', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-checkbox--emphasized',
      'swc-checkbox'
    );
    const inputs = root.locator('swc-checkbox input');

    for (const index of [0, 1, 2]) {
      await page.keyboard.press('Tab');
      await expect(
        inputs.nth(index),
        `Tab focuses checkbox ${index}`
      ).toBeFocused();
      await page.keyboard.press('Space');
    }

    await expect(root, 'tree after Space on each emphasized checkbox')
      .toMatchAriaSnapshot(`
      - checkbox "Unchecked" [checked]
      - checkbox "Checked" [checked=false]
      - checkbox "Indeterminate" [checked]
    `);
  });

  test('should toggle an invalid checkbox on Space and keep it invalid', async ({
    page,
  }) => {
    const root = await gotoStory(page, PLAYGROUND, 'swc-checkbox');
    const checkbox = root.locator('swc-checkbox');
    const input = checkbox.locator('input');
    await setState(checkbox, { fieldStatus: 'invalid' });

    await page.keyboard.press('Tab');
    await expect(input, 'Tab focuses the invalid input').toBeFocused();
    await page.keyboard.press('Space');

    await expect(
      checkbox,
      'Space checks the invalid checkbox'
    ).toHaveJSProperty('checked', true);
    await expect(
      input,
      'aria-invalid stays until the consumer clears field-status'
    ).toHaveAttribute('aria-invalid', 'true');
    await expect(root, 'tree after Space on an invalid checkbox')
      .toMatchAriaSnapshot(`
      - checkbox "Send me product updates" [checked] [invalid]
    `);
  });

  test('should toggle a required checkbox on Space and update its validity', async ({
    page,
  }) => {
    const root = await gotoStory(page, PLAYGROUND, 'swc-checkbox');
    const checkbox = root.locator('swc-checkbox');
    const input = checkbox.locator('input');
    const valueMissing = (): Promise<boolean> =>
      checkbox.evaluate((element: Checkbox) => element.validity.valueMissing);
    await setState(checkbox, { required: true });

    await page.keyboard.press('Tab');
    await expect(input, 'Tab focuses the required input').toBeFocused();
    await expect(input, 'required reaches the input').toHaveJSProperty(
      'required',
      true
    );
    expect(await valueMissing(), 'unchecked required value is missing').toBe(
      true
    );

    await page.keyboard.press('Space');
    await expect(
      checkbox,
      'Space checks the required checkbox'
    ).toHaveJSProperty('checked', true);
    await expect
      .poll(valueMissing, {
        message: 'checked required value is present',
      })
      .toBe(false);
    await expect(root, 'tree after Space on a required checkbox')
      .toMatchAriaSnapshot(`
      - checkbox "Send me product updates" [checked]
    `);

    await page.keyboard.press('Space');
    await expect(
      checkbox,
      'second Space unchecks the required checkbox'
    ).toHaveJSProperty('checked', false);
    await expect
      .poll(valueMissing, {
        message: 'unchecked required value is missing again',
      })
      .toBe(true);
    await expect(root, 'tree after the second Space').toMatchAriaSnapshot(`
      - checkbox "Send me product updates" [checked=false]
    `);
  });

  test('should route focus() and a host tabindex through the inner input', async ({
    page,
  }) => {
    const root = await gotoStory(page, PLAYGROUND, 'swc-checkbox');
    const checkbox = root.locator('swc-checkbox');
    const input = checkbox.locator('input');

    await checkbox.evaluate((element: Checkbox) => element.focus());
    await expect(input, 'host focus() focuses the inner input').toBeFocused();

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
    await expect(
      page.locator('#after'),
      'Tab skips a checkbox with tabindex="-1"'
    ).toBeFocused();
  });

  test('should skip a disabled checkbox on Tab and stop on each enabled one', async ({
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
    await expect(root, 'tree for the Tab sequence').toMatchAriaSnapshot(`
      - button "Before"
      - checkbox "First" [checked=false]
      - checkbox "Disabled" [checked=false] [disabled]
      - checkbox "Last" [checked=false]
      - button "After"
    `);

    await page.locator('#before').focus();
    await page.keyboard.press('Tab');
    await expect(
      root.locator('#first input'),
      'Tab focuses the first checkbox'
    ).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await expect(
      root.locator('#first input'),
      'ArrowDown does not move focus'
    ).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(
      root.locator('#last input'),
      'Tab skips the disabled checkbox'
    ).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(
      root.locator('#after'),
      'Tab leaves the last checkbox'
    ).toBeFocused();
  });

  test('should focus the inner input on autofocus', async ({ page }) => {
    const root = await gotoStory(page, PLAYGROUND, 'swc-checkbox');
    await root.evaluate(async (element) => {
      const checkbox = document.createElement('swc-checkbox');
      checkbox.id = 'autofocused';
      checkbox.setAttribute('autofocus', '');
      checkbox.setAttribute('accessible-label', 'Autofocused');
      element.append(checkbox);
    });

    await expect(
      root.locator('#autofocused input'),
      'autofocus focuses the inner input'
    ).toBeFocused();
  });
});

test.describe('Checkbox - Pointer input', () => {
  test('should keep a user click when a click listener updates the checkbox', async ({
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

    await expect(checkbox, 'click checks the host').toHaveJSProperty(
      'checked',
      true
    );
    await expect(
      checkbox.locator('input'),
      'click checks the inner input'
    ).toBeChecked();
    expect(
      await readChanges(page),
      'one change event with checked = true'
    ).toEqual([true]);
  });

  test('should toggle the checkbox on a click on the visible label', async ({
    page,
  }) => {
    const root = await gotoStory(page, PLAYGROUND, 'swc-checkbox');
    const checkbox = root.locator('swc-checkbox');
    const label = checkbox.locator('[slot="label"]');

    await label.click();
    await expect(checkbox, 'first label click checks').toHaveJSProperty(
      'checked',
      true
    );
    await expect(root, 'tree after the first label click').toMatchAriaSnapshot(`
      - checkbox "Send me product updates" [checked]
    `);
    await label.click();
    await expect(checkbox, 'second label click unchecks').toHaveJSProperty(
      'checked',
      false
    );
    await expect(root, 'tree after the second label click')
      .toMatchAriaSnapshot(`
      - checkbox "Send me product updates" [checked=false]
    `);
  });

  test('should not toggle a read-only checkbox on a label click', async ({
    page,
  }) => {
    const root = await gotoStory(page, PLAYGROUND, 'swc-checkbox');
    const checkbox = root.locator('swc-checkbox');
    await setState(checkbox, { fieldStatus: 'readonly' });

    await checkbox.locator('[slot="label"]').click();

    await expect(
      checkbox,
      'label click leaves the read-only host unchecked'
    ).toHaveJSProperty('checked', false);
    await expect(
      checkbox.locator('input'),
      'label click leaves the read-only input unchecked'
    ).not.toBeChecked();
  });

  for (const initial of [false, true]) {
    test(`should keep checked ${initial} when a click listener sets it again, as on a native checkbox`, async ({
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

      await expect(
        page.locator('#native'),
        `native checkbox stays ${initial}`
      ).toBeChecked({ checked: initial });
      await expect(checkbox, `host stays ${initial}`).toHaveJSProperty(
        'checked',
        initial
      );
      await expect(
        checkbox.locator('input'),
        `inner input stays ${initial}`
      ).toBeChecked({ checked: initial });
      expect(
        await readChanges(page),
        `one change event with checked = ${initial}`
      ).toEqual([initial]);
    });
  }

  test('should keep the user toggle when a click listener re-adds the checked attribute, as on a native checkbox', async ({
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

    await expect(
      page.locator('#native'),
      'native checkbox keeps the user uncheck'
    ).not.toBeChecked();
    await expect(checkbox, 'host keeps the user uncheck').toHaveJSProperty(
      'checked',
      false
    );
    await expect(
      checkbox.locator('input'),
      'inner input keeps the user uncheck'
    ).not.toBeChecked();
  });

  test('should keep indeterminate when a click listener sets it again, as on a native checkbox', async ({
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

    for (const [name, input] of [
      ['native checkbox', page.locator('#native')],
      ['inner input', checkbox.locator('input')],
    ] as const) {
      await expect(input, `${name} stays indeterminate`).toHaveJSProperty(
        'indeterminate',
        true
      );
      await expect(input, `${name} is checked`).toBeChecked();
    }
    await expect(checkbox, 'host stays indeterminate').toHaveJSProperty(
      'indeterminate',
      true
    );
    await expect(checkbox, 'host is checked').toHaveJSProperty('checked', true);
  });
});

test.describe('Checkbox - Form submission', () => {
  test('should submit through the default button on Enter and allow canceling it', async ({
    page,
  }) => {
    const root = await gotoStory(page, PLAYGROUND, 'swc-checkbox');
    const checkbox = root.locator('swc-checkbox');
    const input = checkbox.locator('input');
    await wrapInForm(checkbox);
    const submitted = readSubmitters(page);

    // With no submit button, Enter does nothing; the button arrives only after
    // that Enter is handled, so the single submit comes from the second press.
    await addControlForm(page);
    await input.focus();
    await page.keyboard.press('Enter');
    await waitForPendingEnters(page);
    await addButton(page, 'submit', 'append');
    await input.focus();
    await page.keyboard.press('Enter');
    await expect
      .poll(submitted, { message: 'only the second Enter submits' })
      .toEqual(['submit']);
    await expect(
      checkbox,
      'Enter does not check the checkbox'
    ).toHaveJSProperty('checked', false);

    await checkbox.evaluate((element: Checkbox) => {
      element.addEventListener('keydown', (event) => event.preventDefault(), {
        once: true,
      });
    });
    await page.keyboard.press('Enter');
    await page.keyboard.press('Enter');
    await expect
      .poll(submitted, { message: 'a canceled keydown does not submit' })
      .toEqual(['submit', 'submit']);
  });

  test('should submit through the first submit button on Enter, including a form= button and a read-only checkbox', async ({
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
    await expect
      .poll(submitted, { message: 'Enter submits through a form= button' })
      .toEqual(['outside']);

    await addButton(page, 'first', 'prepend');
    await addButton(page, 'last', 'append');
    await setState(checkbox, { fieldStatus: 'readonly' });
    await input.focus();
    await page.keyboard.press('Enter');
    await expect
      .poll(submitted, {
        message:
          'Enter on a read-only checkbox submits through the first button',
      })
      .toEqual(['outside', 'first']);
  });

  test('should not submit on Enter when the default button is disabled', async ({
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
    await addControlForm(page);
    await input.focus();
    await page.keyboard.press('Enter');
    await waitForPendingEnters(page);
    await page.evaluate(() => document.querySelector('#disabled')?.remove());
    await input.focus();
    await page.keyboard.press('Enter');
    await expect
      .poll(submitted, {
        message:
          'only the Enter after the disabled default button goes submits',
      })
      .toEqual(['enabled']);
  });

  test('should focus the required checkbox when its submit is blocked', async ({
    page,
  }) => {
    const root = await gotoStory(page, PLAYGROUND, 'swc-checkbox');
    const checkbox = root.locator('swc-checkbox');
    await wrapInForm(checkbox);
    await addButton(page, 'submit', 'append');
    await setState(checkbox, { required: true });

    await page.locator('#submit').click();

    await expect(
      checkbox.locator('input'),
      'blocked submit focuses the required input'
    ).toBeFocused();
    await expect
      .poll(readSubmitters(page), { message: 'the form does not submit' })
      .toEqual([]);
  });
});

test.describe('Checkbox - aXe validation', () => {
  for (const story of Object.keys(STORY_SNAPSHOTS)) {
    test(`should not have accessibility violations - ${story}`, async ({
      page,
    }) => {
      await gotoStory(page, `components-checkbox--${story}`, 'swc-checkbox');

      const results = await new AxeBuilder({ page })
        .withTags(WCAG_TAGS)
        .include('#storybook-root')
        .analyze();

      expect(
        results.violations,
        `WCAG violations for the ${story} story`
      ).toEqual([]);
    });
  }
});
