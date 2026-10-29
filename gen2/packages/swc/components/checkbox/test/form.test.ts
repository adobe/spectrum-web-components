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

import { html } from 'lit';
import { expect, waitFor } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import type { Checkbox } from '@adobe/spectrum-wc/checkbox';

import '@adobe/spectrum-wc/components/checkbox/swc-checkbox.js';

import { getComponent, getComponents } from '../../../utils/test-utils.js';

export default {
  title: 'Checkbox/Form tests',
  component: 'swc-checkbox',
  parameters: { docs: { disable: true, page: null } },
  tags: ['!autodocs', 'dev'],
} satisfies Meta;

function formOf(canvasElement: HTMLElement): HTMLFormElement {
  const form = canvasElement.querySelector('form');
  if (!form) {
    throw new Error('Test requires a form');
  }
  return form;
}

function inputOf(checkbox: Checkbox): HTMLInputElement {
  const input = checkbox.shadowRoot?.querySelector('input');
  if (!input) {
    throw new Error('swc-checkbox rendered no input');
  }
  return input;
}

// ──────────────────────────────────────────────────────────────
// TEST: Form value (B2, B16)
// ──────────────────────────────────────────────────────────────

export const FormValueTest: Story = {
  render: () => html`
    <form>
      <swc-checkbox name="updates">
        <span slot="label">Updates</span>
      </swc-checkbox>
      <swc-checkbox name="topic" value="news" checked>
        <span slot="label">News</span>
      </swc-checkbox>
      <swc-checkbox name="topic" value="events">
        <span slot="label">Events</span>
      </swc-checkbox>
      <swc-checkbox name="topic" value="tips" checked>
        <span slot="label">Tips</span>
      </swc-checkbox>
    </form>
  `,
  play: async ({ canvasElement, step }) => {
    const form = formOf(canvasElement);
    const [updates, news] = await getComponents<Checkbox>(
      canvasElement,
      'swc-checkbox'
    );

    await step('each checkbox is form associated', () => {
      expect(updates.form).toBe(form);
    });

    await step('unchecked contributes nothing', () => {
      expect(new FormData(form).has('updates')).toBe(false);
    });

    await step('checked submits name=value, with "on" by default', async () => {
      inputOf(updates).click();
      await updates.updateComplete;
      expect(new FormData(form).get('updates')).toBe('on');
    });

    await step('change listeners read the current form value', async () => {
      let seen: string | null | undefined;
      updates.addEventListener(
        'change',
        () => {
          seen = new FormData(form).get('updates') as string | null;
        },
        { once: true }
      );
      inputOf(updates).click();
      expect(seen).toBe(null);
      inputOf(updates).click();
      await updates.updateComplete;
      expect(new FormData(form).get('updates')).toBe('on');
    });

    await step('same-name checkboxes each submit their value in order', () => {
      expect(new FormData(form).getAll('topic')).toEqual(['news', 'tips']);
    });

    await step('value changes update the submitted value', async () => {
      news.value = 'headlines';
      await news.updateComplete;
      expect(new FormData(form).getAll('topic')).toEqual(['headlines', 'tips']);
    });

    await step('indeterminate does not change the form value', async () => {
      news.indeterminate = true;
      await news.updateComplete;
      expect(new FormData(form).getAll('topic')).toEqual(['headlines', 'tips']);
    });
  },
};
FormValueTest.storyName = 'Form value';

// ──────────────────────────────────────────────────────────────
// TEST: Validity (B17)
// ──────────────────────────────────────────────────────────────

export const RequiredTest: Story = {
  render: () => html`
    <form>
      <swc-checkbox name="terms" value="accepted" required>
        <span slot="label">I agree to the terms</span>
      </swc-checkbox>
    </form>
  `,
  play: async ({ canvasElement, step }) => {
    const form = formOf(canvasElement);
    const checkbox = await getComponent<Checkbox>(
      canvasElement,
      'swc-checkbox'
    );
    let submits = 0;
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      submits += 1;
    });

    await step('required sets the inner input required', () => {
      expect(inputOf(checkbox).required).toBe(true);
    });

    await step('required and unchecked is valueMissing', () => {
      expect(checkbox.willValidate).toBe(true);
      expect(checkbox.validity.valueMissing).toBe(true);
      expect(checkbox.checkValidity()).toBe(false);
      expect(checkbox.validationMessage).not.toBe('');
      expect(checkbox.matches(':invalid')).toBe(true);
    });

    await step('it blocks native submit and fires invalid', () => {
      let invalid = 0;
      checkbox.addEventListener('invalid', () => (invalid += 1), {
        once: true,
      });
      form.requestSubmit();
      expect(submits).toBe(0);
      expect(invalid).toBe(1);
    });

    await step('checking clears valueMissing and submits', async () => {
      inputOf(checkbox).click();
      await checkbox.updateComplete;
      expect(checkbox.validity.valid).toBe(true);
      expect(checkbox.matches(':invalid')).toBe(false);
      form.requestSubmit();
      expect(submits).toBe(1);
    });
  },
};
RequiredTest.storyName = 'required';

export const InvalidStatusTest: Story = {
  render: () => html`
    <form>
      <swc-checkbox name="plan" checked>
        <span slot="label">Premium plan</span>
        <span slot="error-text">This plan is unavailable.</span>
      </swc-checkbox>
    </form>
  `,
  play: async ({ canvasElement, step }) => {
    const form = formOf(canvasElement);
    const checkbox = await getComponent<Checkbox>(
      canvasElement,
      'swc-checkbox'
    );
    const errorText = checkbox.querySelector('[slot="error-text"]');
    if (!errorText) {
      throw new Error('Test requires error text');
    }

    await step('invalid sets customError even when checked', async () => {
      checkbox.fieldStatus = 'invalid';
      await checkbox.updateComplete;
      expect(checkbox.validity.customError).toBe(true);
      expect(checkbox.checkValidity()).toBe(false);
      expect(checkbox.validationMessage).toBe('This plan is unavailable.');
      expect(form.checkValidity()).toBe(false);
    });

    await step('the message follows edits to the error text', async () => {
      errorText.textContent = 'Choose another plan.';
      await waitFor(() =>
        expect(checkbox.validationMessage).toBe('Choose another plan.')
      );
    });

    await step('empty error text falls back to a default message', async () => {
      errorText.textContent = '';
      await waitFor(() =>
        expect(checkbox.validationMessage).toBe('Enter a valid value.')
      );
    });

    await step('clearing the status clears customError', async () => {
      checkbox.fieldStatus = undefined;
      await checkbox.updateComplete;
      expect(checkbox.validity.customError).toBe(false);
      expect(checkbox.checkValidity()).toBe(true);
      expect(checkbox.validationMessage).toBe('');
    });
  },
};
InvalidStatusTest.storyName = 'field-status="invalid" validity';

// ──────────────────────────────────────────────────────────────
// TEST: Barring and disabling (B17, B19, B22, C8, C10)
// ──────────────────────────────────────────────────────────────

export const BarredTest: Story = {
  render: () => html`
    <form>
      <fieldset>
        <swc-checkbox name="terms" required>
          <span slot="label">I agree to the terms</span>
        </swc-checkbox>
      </fieldset>
    </form>
  `,
  play: async ({ canvasElement, step }) => {
    const form = formOf(canvasElement);
    const fieldset = form.querySelector('fieldset');
    const checkbox = await getComponent<Checkbox>(
      canvasElement,
      'swc-checkbox'
    );
    if (!fieldset) {
      throw new Error('Test requires a fieldset');
    }
    let submits = 0;
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      submits += 1;
    });

    await step('disabled and read-only statuses bar validation', async () => {
      for (const status of ['disabled', 'readonly'] as const) {
        checkbox.fieldStatus = status;
        await checkbox.updateComplete;
        expect(checkbox.willValidate).toBe(false);
        expect(checkbox.validity.valueMissing).toBe(false);
        expect(checkbox.checkValidity()).toBe(true);
        form.requestSubmit();
      }
      expect(submits).toBe(2);
    });

    await step(
      'disabled is excluded from FormData; read-only is not',
      async () => {
        checkbox.fieldStatus = 'readonly';
        checkbox.checked = true;
        await checkbox.updateComplete;
        expect(new FormData(form).get('terms')).toBe('on');
        checkbox.fieldStatus = 'disabled';
        await checkbox.updateComplete;
        expect(new FormData(form).has('terms')).toBe(false);
        checkbox.fieldStatus = undefined;
        checkbox.checked = false;
        await checkbox.updateComplete;
        expect(checkbox.willValidate).toBe(true);
        expect(checkbox.validity.valueMissing).toBe(true);
      }
    );

    await step('a disabled fieldset disables, excludes, and bars', async () => {
      checkbox.checked = true;
      fieldset.disabled = true;
      await waitFor(() =>
        expect(checkbox.matches(':state(disabled)')).toBe(true)
      );
      expect(inputOf(checkbox).disabled).toBe(true);
      expect(checkbox.willValidate).toBe(false);
      expect(new FormData(form).has('terms')).toBe(false);
    });

    await step(
      'invalid keeps customError inside a disabled fieldset',
      async () => {
        checkbox.fieldStatus = 'invalid';
        await checkbox.updateComplete;
        expect(checkbox.validity.customError).toBe(true);
        expect(checkbox.validity.valueMissing).toBe(false);
      }
    );

    await step('re-enabling the fieldset restores the state', async () => {
      checkbox.fieldStatus = undefined;
      fieldset.disabled = false;
      await waitFor(() =>
        expect(checkbox.matches(':state(disabled)')).toBe(false)
      );
      expect(inputOf(checkbox).disabled).toBe(false);
      expect(new FormData(form).get('terms')).toBe('on');
    });
  },
};
BarredTest.storyName = 'Barred and disabled fields';

// ──────────────────────────────────────────────────────────────
// TEST: Reset and restore (B9, B16)
// ──────────────────────────────────────────────────────────────

export const ResetTest: Story = {
  render: () => html`
    <form>
      <swc-checkbox name="a" checked><span slot="label">A</span></swc-checkbox>
      <swc-checkbox name="b"><span slot="label">B</span></swc-checkbox>
    </form>
  `,
  play: async ({ canvasElement, step }) => {
    const form = formOf(canvasElement);
    const [a, b] = await getComponents<Checkbox>(canvasElement, 'swc-checkbox');

    await step('reset restores each default checked state', async () => {
      inputOf(a).click();
      inputOf(b).click();
      await a.updateComplete;
      await b.updateComplete;
      expect(new FormData(form).has('a')).toBe(false);
      form.reset();
      await a.updateComplete;
      await b.updateComplete;
      expect(a.checked).toBe(true);
      expect(b.checked).toBe(false);
      expect(new FormData(form).get('a')).toBe('on');
      expect(new FormData(form).has('b')).toBe(false);
    });

    await step(
      'reset clears invalid and keeps read-only and disabled',
      async () => {
        for (const [status, kept] of [
          ['invalid', undefined],
          ['readonly', 'readonly'],
          ['disabled', 'disabled'],
        ] as const) {
          a.fieldStatus = status;
          await a.updateComplete;
          form.reset();
          await a.updateComplete;
          expect(a.fieldStatus).toBe(kept);
        }
        a.fieldStatus = undefined;
        await a.updateComplete;
      }
    );

    await step('reset leaves indeterminate untouched', async () => {
      b.indeterminate = true;
      await b.updateComplete;
      form.reset();
      await b.updateComplete;
      expect(b.indeterminate).toBe(true);
    });

    await step(
      'state restore sets checked from "true" or "false"',
      async () => {
        b.formStateRestoreCallback('true');
        await b.updateComplete;
        expect(b.checked).toBe(true);
        expect(new FormData(form).get('b')).toBe('on');
        b.formStateRestoreCallback('false');
        await b.updateComplete;
        expect(b.checked).toBe(false);
        expect(new FormData(form).has('b')).toBe(false);
      }
    );
  },
};
ResetTest.storyName = 'Reset and state restore';

// ──────────────────────────────────────────────────────────────
// TEST: Script changes take effect immediately
// ──────────────────────────────────────────────────────────────

export const ImmediateSyncTest: Story = {
  render: () => html`
    <form>
      <swc-checkbox name="terms" required>
        <span slot="label">I agree to the terms</span>
      </swc-checkbox>
    </form>
  `,
  play: async ({ canvasElement, step }) => {
    const form = formOf(canvasElement);
    const checkbox = await getComponent<Checkbox>(
      canvasElement,
      'swc-checkbox'
    );

    await step('setting checked updates FormData and validity at once', () => {
      checkbox.checked = true;
      expect(new FormData(form).get('terms')).toBe('on');
      expect(checkbox.checkValidity()).toBe(true);
      expect(inputOf(checkbox).checked).toBe(true);
    });

    await step('form reset updates FormData and validity at once', async () => {
      checkbox.fieldStatus = 'invalid';
      await checkbox.updateComplete;
      expect(checkbox.validity.customError).toBe(true);
      form.reset();
      expect(new FormData(form).has('terms')).toBe(false);
      expect(checkbox.validity.customError).toBe(false);
      expect(checkbox.validity.valueMissing).toBe(true);
    });
  },
};
ImmediateSyncTest.storyName = 'Script changes take effect immediately';
