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

import type { Checkbox } from '@adobe/spectrum-wc/checkbox';
import type { Radio, RadioGroup } from '@adobe/spectrum-wc/radio-group';
import type { TextField } from '@adobe/spectrum-wc/text-field';

import '@adobe/spectrum-wc/components/text-field/swc-text-field.js';
import '@adobe/spectrum-wc/components/radio-group/swc-radio-group.js';
import '@adobe/spectrum-wc/components/radio-group/swc-radio.js';
import '@adobe/spectrum-wc/components/checkbox/swc-checkbox.js';

export default {
  title: 'Forms/Tests',
  parameters: { docs: { disable: true, page: null } },
  tags: ['!autodocs', 'dev'],
  render: () => html`
    <form
      aria-label="Account"
      style="display: flex; flex-direction: column; gap: 24px; inline-size: 28rem; max-inline-size: 100%;"
    >
      ${accountFields} ${formActions}
    </form>
  `,
} satisfies Meta;

const accountFields = html`
  <swc-text-field name="email" type="email" value="river@example.com" required>
    <span slot="label">Email</span>
    <span slot="error-text">This email address needs review.</span>
  </swc-text-field>
  <swc-radio-group name="account-type" selected="personal" required>
    <span slot="label">Account type</span>
    <span slot="error-text">This account type needs review.</span>
    <swc-radio value="personal"><span slot="label">Personal</span></swc-radio>
    <swc-radio value="work"><span slot="label">Work</span></swc-radio>
  </swc-radio-group>
  <swc-checkbox name="updates" value="weekly">
    <span slot="label">Send me weekly updates</span>
  </swc-checkbox>
  <swc-checkbox name="terms" value="accepted" checked required>
    <span slot="label">I agree to the terms of service</span>
    <span slot="error-text">These terms need review.</span>
  </swc-checkbox>
`;

const formActions = html`
  <div style="display: flex; flex-wrap: wrap; gap: 12px;">
    <button type="submit" name="action" value="save" class="swc-Button">
      <span class="swc-Button-label">Save</span>
    </button>
    <button type="reset" class="swc-Button swc-Button--secondary">
      <span class="swc-Button-label">Reset</span>
    </button>
  </div>
`;

const getFormControls = async (canvasElement: HTMLElement) => {
  const email = await getComponent<TextField>(
    canvasElement,
    'swc-text-field[name="email"]'
  );
  const accountType = await getComponent<RadioGroup>(
    canvasElement,
    'swc-radio-group'
  );
  const radios = await getComponents<Radio>(accountType, 'swc-radio');
  const workRadio = radios.find((radio) => radio.value === 'work');
  if (!workRadio) {
    throw new Error('Forms integration fixture is missing the "work" radio');
  }
  const updates = await getComponent<Checkbox>(
    canvasElement,
    'swc-checkbox[name="updates"]'
  );
  const terms = await getComponent<Checkbox>(
    canvasElement,
    'swc-checkbox[name="terms"]'
  );
  const form = canvasElement.querySelector('form');
  const submit = form?.querySelector<HTMLButtonElement>(
    'button[type="submit"]'
  );
  const reset = form?.querySelector<HTMLButtonElement>('button[type="reset"]');
  const emailInput = email.roleElement;
  const updatesInput = updates.roleElement;
  const termsInput = terms.roleElement;
  if (!form) {
    throw new Error('Forms integration fixture is missing its form');
  }
  if (!emailInput) {
    throw new Error('Forms integration "email" field has no native input');
  }
  if (!updatesInput || !termsInput) {
    throw new Error('Forms integration checkboxes have no native input');
  }
  if (!submit) {
    throw new Error('Forms integration fixture is missing its submit button');
  }
  if (!reset) {
    throw new Error('Forms integration fixture is missing its reset button');
  }
  return {
    form,
    email,
    emailInput,
    accountType,
    workRadio,
    updates,
    updatesInput,
    terms,
    termsInput,
    submit,
    reset,
  };
};

export const CombinedSubmissionTest: Story = {
  play: async ({ canvasElement, step }) => {
    const {
      form,
      email,
      emailInput,
      accountType,
      workRadio,
      updates,
      updatesInput,
      submit,
    } = await getFormControls(canvasElement);
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

    await step('checked checkboxes join one submission', async () => {
      email.value = '';
      await email.updateComplete;
      await userEvent.type(emailInput, 'taylor@example.com');
      await userEvent.click(workRadio);
      await userEvent.click(updatesInput);
      await Promise.all([
        email.updateComplete,
        accountType.updateComplete,
        updates.updateComplete,
      ]);
      await userEvent.click(submit);

      expect(submissions).toEqual([
        {
          submitter: submit,
          data: [
            ['email', 'taylor@example.com'],
            ['account-type', 'work'],
            ['updates', 'weekly'],
            ['terms', 'accepted'],
            ['action', 'save'],
          ],
        },
      ]);
    });

    await step('an unchecked checkbox leaves the submission', async () => {
      await userEvent.click(updatesInput);
      await updates.updateComplete;
      expect(updates.checked).toBe(false);
      await userEvent.click(submit);

      expect(submissions).toHaveLength(2);
      expect(submissions[1]).toEqual({
        submitter: submit,
        data: [
          ['email', 'taylor@example.com'],
          ['account-type', 'work'],
          ['terms', 'accepted'],
          ['action', 'save'],
        ],
      });
    });
  },
};
CombinedSubmissionTest.storyName = 'Controls contribute to one submission';

export const ExternalFormAssociationTest: Story = {
  render: () => html`
    <swc-text-field
      form="external-account-form"
      name="email"
      type="email"
      value="river@example.com"
      required
    >
      <span slot="label">Email outside the form</span>
    </swc-text-field>
    <swc-checkbox
      form="external-account-form"
      name="terms"
      value="accepted"
      checked
      required
    >
      <span slot="label">Terms outside the form</span>
    </swc-checkbox>
    <form
      id="external-account-form"
      aria-label="Account with an external field"
      style="display: flex; flex-direction: column; gap: 24px; inline-size: 28rem; max-inline-size: 100%;"
    >
      <swc-radio-group name="account-type" selected="personal" required>
        <span slot="label">Account type</span>
        <swc-radio value="personal">
          <span slot="label">Personal</span>
        </swc-radio>
        <swc-radio value="work"><span slot="label">Work</span></swc-radio>
      </swc-radio-group>
      <swc-checkbox name="updates" value="weekly">
        <span slot="label">Send me weekly updates</span>
      </swc-checkbox>
      ${formActions}
    </form>
  `,
  play: async ({ canvasElement, step }) => {
    const {
      form,
      email,
      emailInput,
      accountType,
      workRadio,
      terms,
      termsInput,
      submit,
      reset,
    } = await getFormControls(canvasElement);
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

    await step('the form includes its external fields in tree order', () => {
      expect(form.contains(email)).toBe(false);
      expect(form.contains(terms)).toBe(false);
      expect(email.form).toBe(form);
      expect(terms.form).toBe(form);
      expect(accountType.form).toBe(form);
      expect(Array.from(form.elements)).toContain(email);
      expect(Array.from(form.elements)).toContain(terms);
      expect(Array.from(form.elements)).toContain(accountType);
      expect([...new FormData(form)]).toEqual([
        ['email', 'river@example.com'],
        ['terms', 'accepted'],
        ['account-type', 'personal'],
      ]);
    });

    await step('an invalid external field blocks the shared form', async () => {
      email.value = '';
      await email.updateComplete;
      expect(email.validity.valueMissing).toBe(true);
      expect(accountType.checkValidity()).toBe(true);
      expect(form.checkValidity()).toBe(false);
      await userEvent.click(submit);
      expect(submissions).toEqual([]);
    });

    await step(
      'an unchecked external checkbox blocks the shared form',
      async () => {
        await userEvent.type(emailInput, 'taylor@example.com');
        await userEvent.click(termsInput);
        await Promise.all([email.updateComplete, terms.updateComplete]);
        expect(email.checkValidity()).toBe(true);
        expect(terms.validity.valueMissing).toBe(true);
        expect(form.checkValidity()).toBe(false);
        await userEvent.click(submit);
        expect(submissions).toEqual([]);
      }
    );

    await step(
      'one submission includes internal and external fields',
      async () => {
        await userEvent.click(termsInput);
        await userEvent.click(workRadio);
        await Promise.all([accountType.updateComplete, terms.updateComplete]);
        await userEvent.click(submit);
        expect(submissions).toEqual([
          {
            submitter: submit,
            data: [
              ['email', 'taylor@example.com'],
              ['terms', 'accepted'],
              ['account-type', 'work'],
              ['action', 'save'],
            ],
          },
        ]);
      }
    );

    await step(
      'one reset restores internal and external defaults',
      async () => {
        await userEvent.click(termsInput);
        await terms.updateComplete;
        expect(terms.checked).toBe(false);
        await userEvent.click(reset);
        await Promise.all([
          email.updateComplete,
          accountType.updateComplete,
          terms.updateComplete,
        ]);
        expect(emailInput.value).toBe('river@example.com');
        expect(accountType.selected).toBe('personal');
        expect(terms.checked).toBe(true);
        expect(form.checkValidity()).toBe(true);
        expect([...new FormData(form)]).toEqual([
          ['email', 'river@example.com'],
          ['terms', 'accepted'],
          ['account-type', 'personal'],
        ]);
      }
    );
  },
};
ExternalFormAssociationTest.storyName = 'Fields outside their owning form';

export const DraftSubmitterTest: Story = {
  render: () => html`
    <form
      aria-label="Account with draft submission"
      style="display: flex; flex-direction: column; gap: 24px; inline-size: 28rem; max-inline-size: 100%;"
    >
      ${accountFields} ${formActions}
      <button
        type="submit"
        name="action"
        value="draft"
        formnovalidate
        class="swc-Button swc-Button--secondary"
      >
        <span class="swc-Button-label">Save draft</span>
      </button>
    </form>
  `,
  play: async ({ canvasElement, step }) => {
    const { form, email, accountType, terms, submit } =
      await getFormControls(canvasElement);
    const draft = form.querySelector<HTMLButtonElement>(
      'button[formnovalidate]'
    );
    if (!draft) {
      throw new Error('Draft submission fixture is missing its draft button');
    }
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
    email.value = '';
    accountType.selected = '';
    terms.checked = false;
    await Promise.all([
      email.updateComplete,
      accountType.updateComplete,
      terms.updateComplete,
    ]);

    await step('normal submission validates every control', async () => {
      expect(form.noValidate).toBe(false);
      expect(submit.formNoValidate).toBe(false);
      expect(email.validity.valueMissing).toBe(true);
      expect(accountType.validity.valueMissing).toBe(true);
      expect(terms.validity.valueMissing).toBe(true);
      expect(form.checkValidity()).toBe(false);
      await userEvent.click(submit);
      expect(submissions).toEqual([]);
    });

    await step('the draft submitter bypasses native constraints', async () => {
      expect(draft.formNoValidate).toBe(true);
      await userEvent.click(draft);
      expect(submissions).toEqual([
        {
          submitter: draft,
          data: [
            ['email', ''],
            ['action', 'draft'],
          ],
        },
      ]);
      expect(form.checkValidity()).toBe(false);
    });

    await step('draft submission leaves authored errors intact', async () => {
      email.fieldStatus = 'invalid';
      accountType.fieldStatus = 'invalid';
      terms.fieldStatus = 'invalid';
      await Promise.all([
        email.updateComplete,
        accountType.updateComplete,
        terms.updateComplete,
      ]);
      expect(email.validity.customError).toBe(true);
      expect(accountType.validity.customError).toBe(true);
      expect(terms.validity.customError).toBe(true);
      await userEvent.click(draft);
      expect(submissions).toHaveLength(2);
      expect(submissions[1]).toEqual({
        submitter: draft,
        data: [
          ['email', ''],
          ['action', 'draft'],
        ],
      });
      expect(email.fieldStatus).toBe('invalid');
      expect(accountType.fieldStatus).toBe('invalid');
      expect(terms.fieldStatus).toBe('invalid');
      await userEvent.click(submit);
      expect(submissions).toHaveLength(2);
    });
  },
};
DraftSubmitterTest.storyName = 'Draft submitters skip native validation';

export const AggregateValidationTest: Story = {
  play: async ({ canvasElement, step }) => {
    const {
      form,
      email,
      emailInput,
      accountType,
      workRadio,
      terms,
      termsInput,
      submit,
    } = await getFormControls(canvasElement);
    let submissions = 0;
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      submissions++;
    });

    await step('an invalid email blocks valid choices', async () => {
      email.value = '';
      await email.updateComplete;
      await userEvent.type(emailInput, 'not-an-email');
      await email.updateComplete;
      expect(email.validity.typeMismatch).toBe(true);
      expect(accountType.checkValidity()).toBe(true);
      expect(terms.checkValidity()).toBe(true);
      expect(form.checkValidity()).toBe(false);
      await userEvent.click(submit);
      expect(submissions).toBe(0);
    });

    await step('an unselected radio group blocks a valid email', async () => {
      email.value = '';
      await email.updateComplete;
      await userEvent.type(emailInput, 'taylor@example.com');
      accountType.selected = '';
      await Promise.all([email.updateComplete, accountType.updateComplete]);
      expect(email.checkValidity()).toBe(true);
      expect(accountType.validity.valueMissing).toBe(true);
      expect(form.checkValidity()).toBe(false);
      await userEvent.click(submit);
      expect(submissions).toBe(0);
    });

    await step(
      'an unchecked required checkbox blocks valid fields and takes focus',
      async () => {
        await userEvent.click(workRadio);
        await userEvent.click(termsInput);
        await Promise.all([accountType.updateComplete, terms.updateComplete]);
        expect(email.checkValidity()).toBe(true);
        expect(accountType.checkValidity()).toBe(true);
        expect(terms.validity.valueMissing).toBe(true);
        expect(form.checkValidity()).toBe(false);
        emailInput.focus();
        await userEvent.click(submit);
        expect(submissions).toBe(0);
        expect(termsInput.matches(':focus')).toBe(true);
      }
    );

    await step(
      'a blocked submission focuses the first invalid control',
      async () => {
        email.value = 'not-an-email';
        await email.updateComplete;
        expect(email.validity.typeMismatch).toBe(true);
        expect(terms.validity.valueMissing).toBe(true);
        await userEvent.click(submit);
        expect(submissions).toBe(0);
        expect(emailInput.matches(':focus')).toBe(true);
        expect(termsInput.matches(':focus')).toBe(false);
      }
    );

    await step('submission resumes when every control is valid', async () => {
      email.value = 'taylor@example.com';
      await userEvent.click(termsInput);
      await Promise.all([email.updateComplete, terms.updateComplete]);
      expect(email.checkValidity()).toBe(true);
      expect(accountType.checkValidity()).toBe(true);
      expect(terms.checkValidity()).toBe(true);
      expect(form.checkValidity()).toBe(true);
      await userEvent.click(submit);
      expect(submissions).toBe(1);
    });
  },
};
AggregateValidationTest.storyName = 'All controls must pass validation';

export const NoValidateCustomErrorsTest: Story = {
  play: async ({ canvasElement, step }) => {
    const { form, email, emailInput, accountType, terms, submit } =
      await getFormControls(canvasElement);
    form.noValidate = true;
    const validityAtSubmit: boolean[] = [];
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      validityAtSubmit.push(form.checkValidity());
    });

    await step(
      'custom errors affect form validity without blocking submit events',
      async () => {
        email.fieldStatus = 'invalid';
        accountType.fieldStatus = 'invalid';
        terms.fieldStatus = 'invalid';
        await Promise.all([
          email.updateComplete,
          accountType.updateComplete,
          terms.updateComplete,
        ]);
        expect(email.validationMessage).toBe(
          'This email address needs review.'
        );
        expect(accountType.validationMessage).toBe(
          'This account type needs review.'
        );
        expect(terms.validationMessage).toBe('These terms need review.');
        expect(email.validity.customError).toBe(true);
        expect(accountType.validity.customError).toBe(true);
        expect(terms.validity.customError).toBe(true);
        await userEvent.click(submit);
        expect(validityAtSubmit).toEqual([false]);
      }
    );

    await step(
      'clearing one custom error leaves another custom control invalid',
      async () => {
        email.value = '';
        email.fieldStatus = undefined;
        await email.updateComplete;
        expect(email.validity.customError).toBe(false);
        expect(accountType.validity.customError).toBe(true);
        expect(terms.validity.customError).toBe(true);
        expect(email.validity.valueMissing).toBe(true);
        await userEvent.click(submit);
        expect(validityAtSubmit).toEqual([false, false]);
      }
    );

    await step(
      'clearing the choice errors preserves the email constraint',
      async () => {
        accountType.fieldStatus = undefined;
        await accountType.updateComplete;
        expect(accountType.checkValidity()).toBe(true);
        expect(terms.validity.customError).toBe(true);
        await userEvent.click(submit);
        expect(validityAtSubmit).toEqual([false, false, false]);

        terms.fieldStatus = undefined;
        await terms.updateComplete;
        expect(terms.checkValidity()).toBe(true);
        expect(email.validity.valueMissing).toBe(true);
        await userEvent.click(submit);
        expect(validityAtSubmit).toEqual([false, false, false, false]);
      }
    );

    await step(
      'fixing the remaining control restores form validity',
      async () => {
        await userEvent.type(emailInput, 'taylor@example.com');
        await email.updateComplete;
        await userEvent.click(submit);
        expect(validityAtSubmit).toEqual([false, false, false, false, true]);
      }
    );
  },
};
NoValidateCustomErrorsTest.storyName =
  'Custom errors affect form validity with novalidate';

export const WholeFormResetTest: Story = {
  play: async ({ canvasElement, step }) => {
    const {
      form,
      email,
      emailInput,
      accountType,
      workRadio,
      updates,
      updatesInput,
      terms,
      termsInput,
      reset,
    } = await getFormControls(canvasElement);

    await step('editing every control updates form data', async () => {
      email.value = '';
      await email.updateComplete;
      await userEvent.type(emailInput, 'taylor@example.com');
      await userEvent.click(workRadio);
      await userEvent.click(updatesInput);
      await userEvent.click(termsInput);
      await Promise.all([
        email.updateComplete,
        accountType.updateComplete,
        updates.updateComplete,
        terms.updateComplete,
      ]);
      expect([...new FormData(form)]).toEqual([
        ['email', 'taylor@example.com'],
        ['account-type', 'work'],
        ['updates', 'weekly'],
      ]);
    });

    await step('authored errors make the form invalid', async () => {
      email.fieldStatus = 'invalid';
      accountType.fieldStatus = 'invalid';
      terms.fieldStatus = 'invalid';
      await Promise.all([
        email.updateComplete,
        accountType.updateComplete,
        terms.updateComplete,
      ]);
      expect(email.validity.customError).toBe(true);
      expect(accountType.validity.customError).toBe(true);
      expect(terms.validity.customError).toBe(true);
      expect(form.checkValidity()).toBe(false);
    });

    await step(
      'one reset restores defaults and clears every error',
      async () => {
        await userEvent.click(reset);
        await Promise.all([
          email.updateComplete,
          accountType.updateComplete,
          updates.updateComplete,
          terms.updateComplete,
        ]);
        expect(emailInput.value).toBe('river@example.com');
        expect(accountType.selected).toBe('personal');
        expect(updates.checked).toBe(false);
        expect(terms.checked).toBe(true);
        expect(email.fieldStatus).toBeUndefined();
        expect(accountType.fieldStatus).toBeUndefined();
        expect(terms.fieldStatus).toBeUndefined();
        expect(email.validity.customError).toBe(false);
        expect(accountType.validity.customError).toBe(false);
        expect(terms.validity.customError).toBe(false);
        expect(form.checkValidity()).toBe(true);
        expect([...new FormData(form)]).toEqual([
          ['email', 'river@example.com'],
          ['account-type', 'personal'],
          ['terms', 'accepted'],
        ]);
      }
    );

    await step('one reset keeps disabled and read-only statuses', async () => {
      email.fieldStatus = 'readonly';
      accountType.fieldStatus = 'disabled';
      updates.fieldStatus = 'disabled';
      terms.fieldStatus = 'readonly';
      email.value = 'taylor@example.com';
      accountType.selected = 'work';
      updates.checked = true;
      terms.checked = false;
      await Promise.all([
        email.updateComplete,
        accountType.updateComplete,
        updates.updateComplete,
        terms.updateComplete,
      ]);
      expect([...new FormData(form)]).toEqual([
        ['email', 'taylor@example.com'],
      ]);

      await userEvent.click(reset);
      await Promise.all([
        email.updateComplete,
        accountType.updateComplete,
        updates.updateComplete,
        terms.updateComplete,
      ]);
      expect(email.fieldStatus).toBe('readonly');
      expect(accountType.fieldStatus).toBe('disabled');
      expect(updates.fieldStatus).toBe('disabled');
      expect(terms.fieldStatus).toBe('readonly');
      expect(updates.checked).toBe(false);
      expect(terms.checked).toBe(true);
      expect(form.checkValidity()).toBe(true);
      expect([...new FormData(form)]).toEqual([
        ['email', 'river@example.com'],
        ['terms', 'accepted'],
      ]);
    });
  },
};
WholeFormResetTest.storyName = 'One reset restores all control defaults';

export const FieldsetBoundaryTest: Story = {
  render: () => html`
    <form
      aria-label="Account"
      style="display: flex; flex-direction: column; gap: 24px; inline-size: 28rem; max-inline-size: 100%;"
    >
      <fieldset
        aria-label="Account fields"
        style="display: flex; flex-direction: column; gap: 24px; min-inline-size: 0; margin: 0; padding: 0; border: 0;"
      >
        ${accountFields}
      </fieldset>
      <swc-text-field name="reference" value="account" required>
        <span slot="label">Reference outside the fieldset</span>
      </swc-text-field>
      ${formActions}
    </form>
  `,
  play: async ({ canvasElement, step }) => {
    const { form, email, emailInput, accountType, terms, termsInput, submit } =
      await getFormControls(canvasElement);
    const fieldset = form.querySelector('fieldset');
    const reference = await getComponent<TextField>(
      canvasElement,
      'swc-text-field[name="reference"]'
    );
    const referenceInput = reference.roleElement;
    if (!fieldset) {
      throw new Error('Forms boundary fixture is missing its fieldset');
    }
    if (!referenceInput) {
      throw new Error('Forms boundary reference field has no native input');
    }
    let submissions = 0;
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      submissions++;
    });
    email.value = '';
    await email.updateComplete;
    await userEvent.type(emailInput, 'not-an-email');
    accountType.fieldStatus = 'invalid';
    await userEvent.click(termsInput);
    await Promise.all([
      email.updateComplete,
      accountType.updateComplete,
      terms.updateComplete,
    ]);
    expect(terms.validity.valueMissing).toBe(true);
    expect(form.checkValidity()).toBe(false);

    await step('disabling a group excludes only its controls', async () => {
      fieldset.disabled = true;
      await Promise.all([
        email.updateComplete,
        accountType.updateComplete,
        terms.updateComplete,
      ]);
      expect(terms.willValidate).toBe(false);
      expect(terms.validity.valueMissing).toBe(false);
      expect(termsInput.disabled).toBe(true);
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
      await Promise.all([
        email.updateComplete,
        accountType.updateComplete,
        terms.updateComplete,
      ]);
      expect(termsInput.disabled).toBe(false);
      expect(terms.validity.valueMissing).toBe(true);
      expect([...new FormData(form)]).toEqual([
        ['email', 'not-an-email'],
        ['account-type', 'personal'],
        ['reference', 'account'],
      ]);
      expect(form.checkValidity()).toBe(false);
      await userEvent.click(submit);
      expect(submissions).toBe(2);
    });

    await step(
      'the re-enabled group error still blocks valid siblings',
      async () => {
        email.value = '';
        await email.updateComplete;
        await userEvent.type(emailInput, 'taylor@example.com');
        await userEvent.click(termsInput);
        await Promise.all([email.updateComplete, terms.updateComplete]);
        expect(email.checkValidity()).toBe(true);
        expect(terms.checkValidity()).toBe(true);
        expect(reference.checkValidity()).toBe(true);
        expect(accountType.validity.customError).toBe(true);
        expect(form.checkValidity()).toBe(false);
        await userEvent.click(submit);
        expect(submissions).toBe(2);

        accountType.fieldStatus = undefined;
        await accountType.updateComplete;
        expect(form.checkValidity()).toBe(true);
        await userEvent.click(submit);
        expect(submissions).toBe(3);
      }
    );
  },
};
FieldsetBoundaryTest.storyName = 'Disabled groups preserve form boundaries';

export const NativeInputCompatibilityTest: Story = {
  render: () => html`
    <form
      aria-label="Native input compatibility"
      style="display: flex; flex-direction: column; gap: 24px; inline-size: 28rem; max-inline-size: 100%;"
    >
      <fieldset
        aria-label="Mixed form controls"
        style="display: flex; flex-direction: column; gap: 24px; min-inline-size: 0; margin: 0; padding: 0; border: 0;"
      >
        ${accountFields}
        <label>
          Native reference
          <input name="reference" value="account" required />
        </label>
      </fieldset>
      ${formActions}
    </form>
  `,
  play: async ({ canvasElement, step }) => {
    const {
      form,
      email,
      emailInput,
      accountType,
      workRadio,
      updates,
      updatesInput,
      terms,
      submit,
      reset,
    } = await getFormControls(canvasElement);
    const fieldset = form.querySelector('fieldset');
    const reference = form.querySelector<HTMLInputElement>(
      'input[name="reference"]'
    );
    if (!fieldset) {
      throw new Error('Native compatibility fixture is missing its fieldset');
    }
    if (!reference) {
      throw new Error('Native compatibility fixture is missing its input');
    }
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

    await step('an invalid native input blocks valid components', async () => {
      reference.focus();
      reference.select();
      await userEvent.keyboard('{Backspace}');
      expect(reference.validity.valueMissing).toBe(true);
      expect(email.checkValidity()).toBe(true);
      expect(accountType.checkValidity()).toBe(true);
      expect(terms.checkValidity()).toBe(true);
      expect(form.checkValidity()).toBe(false);
      await userEvent.click(submit);
      expect(submissions).toEqual([]);
    });

    await step(
      'fieldset disabling excludes native and custom inputs',
      async () => {
        fieldset.disabled = true;
        await Promise.all([
          email.updateComplete,
          accountType.updateComplete,
          terms.updateComplete,
        ]);
        expect(reference.willValidate).toBe(false);
        expect(email.willValidate).toBe(false);
        expect(accountType.willValidate).toBe(false);
        expect(terms.willValidate).toBe(false);
        expect(form.checkValidity()).toBe(true);
        await userEvent.click(submit);
        expect(submissions).toEqual([
          { submitter: submit, data: [['action', 'save']] },
        ]);

        fieldset.disabled = false;
        await Promise.all([
          email.updateComplete,
          accountType.updateComplete,
          terms.updateComplete,
        ]);
        expect(reference.willValidate).toBe(true);
        expect(email.willValidate).toBe(true);
        expect(accountType.willValidate).toBe(true);
        expect(terms.willValidate).toBe(true);
        expect(reference.validity.valueMissing).toBe(true);
        expect(form.checkValidity()).toBe(false);
        await userEvent.click(submit);
        expect(submissions).toHaveLength(1);
      }
    );

    await step('an invalid component blocks a valid native input', async () => {
      await userEvent.type(reference, 'changed');
      email.value = '';
      await email.updateComplete;
      await userEvent.type(emailInput, 'not-an-email');
      await userEvent.click(workRadio);
      await Promise.all([email.updateComplete, accountType.updateComplete]);
      expect(reference.checkValidity()).toBe(true);
      expect(accountType.checkValidity()).toBe(true);
      expect(email.validity.typeMismatch).toBe(true);
      expect(form.checkValidity()).toBe(false);
      await userEvent.click(submit);
      expect(submissions).toHaveLength(1);
    });

    await step(
      'one submission includes native and component values',
      async () => {
        // Keep user-event's selection state in sync when replacing the email.
        emailInput.focus();
        await userEvent.keyboard('{Control>}a{/Control}{Backspace}');
        await email.updateComplete;
        expect(email.value).toBe('');
        await userEvent.type(emailInput, 'taylor@example.com');
        await userEvent.click(updatesInput);
        await Promise.all([email.updateComplete, updates.updateComplete]);
        expect(form.checkValidity()).toBe(true);
        await userEvent.click(submit);
        expect(submissions).toEqual([
          { submitter: submit, data: [['action', 'save']] },
          {
            submitter: submit,
            data: [
              ['email', 'taylor@example.com'],
              ['account-type', 'work'],
              ['updates', 'weekly'],
              ['terms', 'accepted'],
              ['reference', 'changed'],
              ['action', 'save'],
            ],
          },
        ]);
      }
    );

    await step('one reset restores native and component defaults', async () => {
      await userEvent.click(reset);
      await Promise.all([
        email.updateComplete,
        accountType.updateComplete,
        updates.updateComplete,
      ]);
      expect(reference.value).toBe('account');
      expect(emailInput.value).toBe('river@example.com');
      expect(accountType.selected).toBe('personal');
      expect(updates.checked).toBe(false);
      expect(form.checkValidity()).toBe(true);
      expect([...new FormData(form)]).toEqual([
        ['email', 'river@example.com'],
        ['account-type', 'personal'],
        ['terms', 'accepted'],
        ['reference', 'account'],
      ]);
    });
  },
};
NativeInputCompatibilityTest.storyName =
  'Native inputs work alongside components';

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

export const CheckboxImplicitSubmitTest: Story = {
  render: () => html`
    <form
      aria-label="Buttonless form with a checkbox"
      style="display: flex; flex-direction: column; gap: 24px; inline-size: 28rem; max-inline-size: 100%;"
    >
      <swc-text-field name="email" value="river@example.com">
        <span slot="label">Email</span>
      </swc-text-field>
      <swc-checkbox name="updates" value="weekly" checked>
        <span slot="label">Send me weekly updates</span>
      </swc-checkbox>
    </form>
  `,
  play: async ({ canvasElement, step }) => {
    const email = await getComponent<TextField>(
      canvasElement,
      'swc-text-field'
    );
    const updates = await getComponent<Checkbox>(canvasElement, 'swc-checkbox');
    const form = email.form;
    const emailInput = email.roleElement;
    const updatesInput = updates.roleElement;
    if (!form || !emailInput || !updatesInput) {
      throw new Error('Buttonless checkbox form or inputs not found');
    }
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

    await step(
      'a checkbox does not prevent buttonless submission',
      async () => {
        emailInput.focus();
        await userEvent.keyboard('{Enter}');
        await waitFor(() =>
          expect(submissions).toEqual([
            {
              submitter: null,
              data: [
                ['email', 'river@example.com'],
                ['updates', 'weekly'],
              ],
            },
          ])
        );
      }
    );

    await step('Enter in a checkbox needs a submit button', async () => {
      updatesInput.focus();
      await userEvent.keyboard('{Enter}');
      // Queue behind deferred Enter handling before asserting no submission.
      await new Promise<void>((resolve) => setTimeout(resolve, 0));
      expect(updates.checked).toBe(true);
      expect(submissions).toHaveLength(1);
    });

    const submit = document.createElement('button');
    submit.type = 'submit';
    submit.name = 'action';
    submit.value = 'save';
    submit.textContent = 'Save';
    form.append(submit);

    await step(
      'Enter in either control uses the default submit button',
      async () => {
        await userEvent.keyboard('{Enter}');
        await waitFor(() => expect(submissions).toHaveLength(2));
        emailInput.focus();
        await userEvent.keyboard('{Enter}');
        await waitFor(() => expect(submissions).toHaveLength(3));
        const expected = {
          submitter: submit,
          data: [
            ['email', 'river@example.com'],
            ['updates', 'weekly'],
            ['action', 'save'],
          ],
        };
        expect(submissions.slice(1)).toEqual([expected, expected]);
      }
    );
  },
};
CheckboxImplicitSubmitTest.storyName =
  'Checkboxes do not prevent buttonless submission';
