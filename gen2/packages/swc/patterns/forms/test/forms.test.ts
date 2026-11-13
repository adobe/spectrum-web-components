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
import { expect, userEvent, waitFor } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import { getComponent, getComponents } from '@swc-test-helpers/dom';

import type { TextField } from '@adobe/spectrum-wc/text-field';

import '@adobe/spectrum-wc/components/text-field/swc-text-field.js';

export default {
  title: 'Forms/Tests',
  parameters: { docs: { disable: true, page: null } },
  tags: ['!autodocs', 'dev'],
  render: () => html`
    <form
      aria-label="Account"
      style="display: flex; flex-direction: column; gap: 24px; inline-size: 28rem; max-inline-size: 100%;"
    >
      <fieldset
        style="display: flex; flex-direction: column; gap: 24px; min-inline-size: 0; margin: 0; padding: 0; border: 0;"
      >
        <legend style="margin-block-end: 16px;">Account details</legend>
        <swc-text-field name="name" value="River" required>
          <span slot="label">Name</span>
        </swc-text-field>
        <swc-text-field
          name="email"
          type="email"
          value="river@example.com"
          required
        >
          <span slot="label">Email</span>
        </swc-text-field>
        <label>
          <input
            type="checkbox"
            name="confirmed"
            value="yes"
            checked
            required
          />
          Confirm details
        </label>
      </fieldset>
      <swc-text-field name="reference" value="account" required>
        <span slot="label">Reference</span>
      </swc-text-field>
      <div style="display: flex; flex-wrap: wrap; gap: 12px;">
        <button type="submit" name="action" value="save" class="swc-Button">
          <span class="swc-Button-label">Save</span>
        </button>
        <button type="reset" class="swc-Button swc-Button--secondary">
          <span class="swc-Button-label">Reset</span>
        </button>
      </div>
    </form>
  `,
} satisfies Meta;

const getFormControls = async (canvasElement: HTMLElement) => {
  const fields = await getComponents<TextField>(
    canvasElement,
    'swc-text-field'
  );
  const name = fields.find((field) => field.name === 'name');
  const email = fields.find((field) => field.name === 'email');
  const reference = fields.find((field) => field.name === 'reference');
  const form = canvasElement.querySelector('form');
  const fieldset = form?.querySelector('fieldset');
  const confirmed = form?.querySelector<HTMLInputElement>(
    'input[name="confirmed"]'
  );
  const submit = form?.querySelector<HTMLButtonElement>(
    'button[type="submit"]'
  );
  const reset = form?.querySelector<HTMLButtonElement>('button[type="reset"]');
  const nameInput = name?.roleElement;
  const emailInput = email?.roleElement;
  const referenceInput = reference?.roleElement;
  if (!form) {
    throw new Error('Forms integration fixture is missing its form');
  }
  if (!fieldset) {
    throw new Error('Forms integration fixture is missing its fieldset');
  }
  if (!name) {
    throw new Error('Forms integration fixture is missing the "name" field');
  }
  if (!email) {
    throw new Error('Forms integration fixture is missing the "email" field');
  }
  if (!reference) {
    throw new Error(
      'Forms integration fixture is missing the "reference" field'
    );
  }
  if (!nameInput) {
    throw new Error('Forms integration "name" field has no native input');
  }
  if (!emailInput) {
    throw new Error('Forms integration "email" field has no native input');
  }
  if (!referenceInput) {
    throw new Error('Forms integration "reference" field has no native input');
  }
  if (!confirmed) {
    throw new Error(
      'Forms integration fixture is missing the "confirmed" checkbox'
    );
  }
  if (!submit) {
    throw new Error('Forms integration fixture is missing its submit button');
  }
  if (!reset) {
    throw new Error('Forms integration fixture is missing its reset button');
  }
  return {
    form,
    fieldset,
    name,
    email,
    nameInput,
    emailInput,
    confirmed,
    reference,
    referenceInput,
    submit,
    reset,
  };
};

export const CombinedSubmissionTest: Story = {
  play: async ({ canvasElement }) => {
    const { form, name, nameInput, submit } =
      await getFormControls(canvasElement);
    const submissions: {
      submitter: HTMLElement | null;
      data: [string, FormDataEntryValue][];
    }[] = [];
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      submissions.push({
        submitter: event.submitter,
        data: [...new FormData(form, event.submitter)],
      });
    });

    nameInput.focus();
    nameInput.select();
    await userEvent.keyboard('Taylor');
    await name.updateComplete;
    await userEvent.click(submit);

    expect(submissions).toEqual([
      {
        submitter: submit,
        data: [
          ['name', 'Taylor'],
          ['email', 'river@example.com'],
          ['confirmed', 'yes'],
          ['reference', 'account'],
          ['action', 'save'],
        ],
      },
    ]);
  },
};
CombinedSubmissionTest.storyName = 'Controls contribute to one submission';

export const AggregateValidationTest: Story = {
  play: async ({ canvasElement, step }) => {
    const { form, email, emailInput, confirmed, submit } =
      await getFormControls(canvasElement);
    let submissions = 0;
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      submissions++;
    });

    await step('an invalid custom control blocks the whole form', async () => {
      email.value = '';
      await email.updateComplete;
      await userEvent.type(emailInput, 'not-an-email');
      await email.updateComplete;
      expect(email.validity.typeMismatch).toBe(true);
      expect(confirmed.checkValidity()).toBe(true);
      expect(form.checkValidity()).toBe(false);
      await userEvent.click(submit);
      expect(submissions).toBe(0);
    });

    await step('an invalid native control also blocks the form', async () => {
      email.value = '';
      await email.updateComplete;
      await userEvent.type(emailInput, 'taylor@example.com');
      await email.updateComplete;
      await userEvent.click(confirmed);
      expect(email.checkValidity()).toBe(true);
      expect(confirmed.validity.valueMissing).toBe(true);
      expect(form.checkValidity()).toBe(false);
      await userEvent.click(submit);
      expect(submissions).toBe(0);
    });

    await step('submission resumes when all controls are valid', async () => {
      await userEvent.click(confirmed);
      expect(form.checkValidity()).toBe(true);
      await userEvent.click(submit);
      expect(submissions).toBe(1);
    });
  },
};
AggregateValidationTest.storyName = 'All controls must pass validation';

export const NoValidateCustomErrorsTest: Story = {
  play: async ({ canvasElement, step }) => {
    const { form, name, email, emailInput, submit } =
      await getFormControls(canvasElement);
    form.noValidate = true;
    const error = document.createElement('span');
    error.slot = 'error-text';
    error.textContent = 'This account name is unavailable.';
    name.append(error);
    const validityAtSubmit: boolean[] = [];
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      validityAtSubmit.push(form.checkValidity());
    });

    await step(
      'custom errors affect form validity without blocking submit events',
      async () => {
        name.fieldStatus = 'invalid';
        await name.updateComplete;
        expect(name.validationMessage).toBe(error.textContent);
        expect(email.checkValidity()).toBe(true);
        await userEvent.click(submit);
        expect(validityAtSubmit).toEqual([false]);
      }
    );

    await step(
      'clearing a custom error preserves a different control constraint',
      async () => {
        email.value = '';
        name.fieldStatus = undefined;
        await Promise.all([name.updateComplete, email.updateComplete]);
        expect(name.checkValidity()).toBe(true);
        expect(email.validity.valueMissing).toBe(true);
        await userEvent.click(submit);
        expect(validityAtSubmit).toEqual([false, false]);
      }
    );

    await step(
      'fixing the remaining control restores form validity',
      async () => {
        await userEvent.type(emailInput, 'taylor@example.com');
        await email.updateComplete;
        await userEvent.click(submit);
        expect(validityAtSubmit).toEqual([false, false, true]);
      }
    );
  },
};
NoValidateCustomErrorsTest.storyName =
  'Custom errors affect form validity with novalidate';

export const WholeFormResetTest: Story = {
  play: async ({ canvasElement }) => {
    const {
      form,
      name,
      email,
      nameInput,
      emailInput,
      confirmed,
      reference,
      referenceInput,
      reset,
    } = await getFormControls(canvasElement);

    nameInput.focus();
    nameInput.select();
    await userEvent.keyboard('Taylor');
    email.value = '';
    await email.updateComplete;
    await userEvent.type(emailInput, 'taylor@example.com');
    await userEvent.click(confirmed);
    referenceInput.focus();
    referenceInput.select();
    await userEvent.keyboard('changed');
    await Promise.all([
      name.updateComplete,
      email.updateComplete,
      reference.updateComplete,
    ]);
    expect([...new FormData(form)]).toEqual([
      ['name', 'Taylor'],
      ['email', 'taylor@example.com'],
      ['reference', 'changed'],
    ]);

    await userEvent.click(reset);
    await Promise.all([
      name.updateComplete,
      email.updateComplete,
      reference.updateComplete,
    ]);

    expect(nameInput.value).toBe('River');
    expect(emailInput.value).toBe('river@example.com');
    expect(confirmed.checked).toBe(true);
    expect(referenceInput.value).toBe('account');
    expect(form.checkValidity()).toBe(true);
    expect([...new FormData(form)]).toEqual([
      ['name', 'River'],
      ['email', 'river@example.com'],
      ['confirmed', 'yes'],
      ['reference', 'account'],
    ]);
  },
};
WholeFormResetTest.storyName = 'One reset restores all control defaults';

export const FieldsetBoundaryTest: Story = {
  play: async ({ canvasElement, step }) => {
    const {
      form,
      fieldset,
      name,
      email,
      nameInput,
      emailInput,
      reference,
      referenceInput,
      submit,
    } = await getFormControls(canvasElement);
    let submissions = 0;
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      submissions++;
    });
    nameInput.focus();
    nameInput.select();
    await userEvent.keyboard('{Backspace}');
    email.value = '';
    await email.updateComplete;
    await userEvent.type(emailInput, 'not-an-email');
    await Promise.all([name.updateComplete, email.updateComplete]);
    expect(form.checkValidity()).toBe(false);

    await step('disabling a group excludes only its controls', async () => {
      fieldset.disabled = true;
      await Promise.all([name.updateComplete, email.updateComplete]);
      expect([...new FormData(form)]).toEqual([['reference', 'account']]);
      expect(form.checkValidity()).toBe(true);
      await userEvent.click(submit);
      expect(submissions).toBe(1);
    });

    await step('a custom control outside the group stays active', async () => {
      referenceInput.focus();
      referenceInput.select();
      await userEvent.keyboard('{Backspace}');
      await reference.updateComplete;
      expect(referenceInput.disabled).toBe(false);
      expect(reference.matches(':disabled')).toBe(false);
      expect(reference.willValidate).toBe(true);
      expect(reference.validity.valueMissing).toBe(true);
      expect(new FormData(form).get('reference')).toBe('');
      expect(form.checkValidity()).toBe(false);
      await userEvent.click(submit);
      expect(submissions).toBe(1);

      await userEvent.type(referenceInput, 'account');
      await reference.updateComplete;
      expect(reference.value).toBe('account');
      expect(new FormData(form).get('reference')).toBe('account');
      expect(form.checkValidity()).toBe(true);
      await userEvent.click(submit);
      expect(submissions).toBe(2);
    });

    await step('re-enabling restores group values and validation', async () => {
      fieldset.disabled = false;
      await Promise.all([name.updateComplete, email.updateComplete]);
      expect([...new FormData(form)]).toEqual([
        ['name', ''],
        ['email', 'not-an-email'],
        ['confirmed', 'yes'],
        ['reference', 'account'],
      ]);
      expect(form.checkValidity()).toBe(false);
      await userEvent.click(submit);
      expect(submissions).toBe(2);
    });
  },
};
FieldsetBoundaryTest.storyName = 'Disabled groups preserve form boundaries';

export const MultipleTextFieldsImplicitSubmitTest: Story = {
  render: () => html`
    <form
      aria-label="Buttonless form"
      style="display: flex; flex-direction: column; gap: 24px; inline-size: 28rem; max-inline-size: 100%;"
    >
      <swc-text-field name="first">
        <span slot="label">First</span>
      </swc-text-field>
    </form>
  `,
  play: async ({ canvasElement, step }) => {
    const first = await getComponent<TextField>(
      canvasElement,
      'swc-text-field'
    );
    const form = first.form;
    const input = first.roleElement;
    if (!form || !input) {
      throw new Error('Buttonless form or input not found');
    }
    const submissions: (HTMLElement | null)[] = [];
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      submissions.push(event.submitter);
    });
    input.focus();

    await step('one text field submits without a button', async () => {
      await userEvent.keyboard('{Enter}');
      await waitFor(() => expect(submissions).toEqual([null]));
    });

    const second = document.createElement('swc-text-field');
    second.name = 'second';
    second.accessibleLabel = 'Second';
    form.append(second);
    await second.updateComplete;

    await step('a second text field prevents implicit submission', async () => {
      await userEvent.keyboard('{Enter}');
      // Queue behind deferred Enter handling before asserting no submission.
      await new Promise<void>((resolve) => setTimeout(resolve, 0));
      expect(submissions).toEqual([null]);
    });

    await step(
      'removing the second field permits submission again',
      async () => {
        second.remove();
        await userEvent.keyboard('{Enter}');
        await waitFor(() => expect(submissions).toEqual([null, null]));
      }
    );
  },
};
MultipleTextFieldsImplicitSubmitTest.storyName =
  'Multiple text fields prevent buttonless submission';
