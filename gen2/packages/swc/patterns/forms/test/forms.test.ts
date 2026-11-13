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

import type { Radio, RadioGroup } from '@adobe/spectrum-wc/radio-group';
import type { TextField } from '@adobe/spectrum-wc/text-field';

import '@adobe/spectrum-wc/components/text-field/swc-text-field.js';
import '@adobe/spectrum-wc/components/radio-group/swc-radio-group.js';
import '@adobe/spectrum-wc/components/radio-group/swc-radio.js';

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
  const form = canvasElement.querySelector('form');
  const submit = form?.querySelector<HTMLButtonElement>(
    'button[type="submit"]'
  );
  const reset = form?.querySelector<HTMLButtonElement>('button[type="reset"]');
  const emailInput = email.roleElement;
  if (!form) {
    throw new Error('Forms integration fixture is missing its form');
  }
  if (!emailInput) {
    throw new Error('Forms integration "email" field has no native input');
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
    submit,
    reset,
  };
};

export const CombinedSubmissionTest: Story = {
  play: async ({ canvasElement }) => {
    const { form, email, emailInput, accountType, workRadio, submit } =
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

    email.value = '';
    await email.updateComplete;
    await userEvent.type(emailInput, 'taylor@example.com');
    await userEvent.click(workRadio);
    await Promise.all([email.updateComplete, accountType.updateComplete]);
    await userEvent.click(submit);

    expect(submissions).toEqual([
      {
        submitter: submit,
        data: [
          ['email', 'taylor@example.com'],
          ['account-type', 'work'],
          ['action', 'save'],
        ],
      },
    ]);
  },
};
CombinedSubmissionTest.storyName = 'Controls contribute to one submission';

export const AggregateValidationTest: Story = {
  play: async ({ canvasElement, step }) => {
    const { form, email, emailInput, accountType, workRadio, submit } =
      await getFormControls(canvasElement);
    let submissions = 0;
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      submissions++;
    });

    await step('an invalid email blocks a valid radio group', async () => {
      email.value = '';
      await email.updateComplete;
      await userEvent.type(emailInput, 'not-an-email');
      await email.updateComplete;
      expect(email.validity.typeMismatch).toBe(true);
      expect(accountType.checkValidity()).toBe(true);
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

    await step('submission resumes when both controls are valid', async () => {
      await userEvent.click(workRadio);
      await accountType.updateComplete;
      expect(email.checkValidity()).toBe(true);
      expect(accountType.checkValidity()).toBe(true);
      expect(form.checkValidity()).toBe(true);
      await userEvent.click(submit);
      expect(submissions).toBe(1);
    });
  },
};
AggregateValidationTest.storyName = 'All controls must pass validation';

export const NoValidateCustomErrorsTest: Story = {
  play: async ({ canvasElement, step }) => {
    const { form, email, emailInput, accountType, submit } =
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
        await Promise.all([email.updateComplete, accountType.updateComplete]);
        expect(email.validationMessage).toBe(
          'This email address needs review.'
        );
        expect(accountType.validationMessage).toBe(
          'This account type needs review.'
        );
        expect(email.validity.customError).toBe(true);
        expect(accountType.validity.customError).toBe(true);
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
        expect(email.validity.valueMissing).toBe(true);
        await userEvent.click(submit);
        expect(validityAtSubmit).toEqual([false, false]);
      }
    );

    await step(
      'clearing the group error preserves the email constraint',
      async () => {
        accountType.fieldStatus = undefined;
        await accountType.updateComplete;
        expect(accountType.checkValidity()).toBe(true);
        expect(email.validity.valueMissing).toBe(true);
        await userEvent.click(submit);
        expect(validityAtSubmit).toEqual([false, false, false]);
      }
    );

    await step(
      'fixing the remaining control restores form validity',
      async () => {
        await userEvent.type(emailInput, 'taylor@example.com');
        await email.updateComplete;
        await userEvent.click(submit);
        expect(validityAtSubmit).toEqual([false, false, false, true]);
      }
    );
  },
};
NoValidateCustomErrorsTest.storyName =
  'Custom errors affect form validity with novalidate';

export const WholeFormResetTest: Story = {
  play: async ({ canvasElement, step }) => {
    const { form, email, emailInput, accountType, workRadio, reset } =
      await getFormControls(canvasElement);

    await step('editing both controls updates form data', async () => {
      email.value = '';
      await email.updateComplete;
      await userEvent.type(emailInput, 'taylor@example.com');
      await userEvent.click(workRadio);
      await Promise.all([email.updateComplete, accountType.updateComplete]);
      expect([...new FormData(form)]).toEqual([
        ['email', 'taylor@example.com'],
        ['account-type', 'work'],
      ]);
    });

    await step('both authored errors make the form invalid', async () => {
      email.fieldStatus = 'invalid';
      accountType.fieldStatus = 'invalid';
      await Promise.all([email.updateComplete, accountType.updateComplete]);
      expect(email.validity.customError).toBe(true);
      expect(accountType.validity.customError).toBe(true);
      expect(form.checkValidity()).toBe(false);
    });

    await step(
      'one reset restores defaults and clears both errors',
      async () => {
        await userEvent.click(reset);
        await Promise.all([email.updateComplete, accountType.updateComplete]);
        expect(emailInput.value).toBe('river@example.com');
        expect(accountType.selected).toBe('personal');
        expect(email.fieldStatus).toBeUndefined();
        expect(accountType.fieldStatus).toBeUndefined();
        expect(email.validity.customError).toBe(false);
        expect(accountType.validity.customError).toBe(false);
        expect(form.checkValidity()).toBe(true);
        expect([...new FormData(form)]).toEqual([
          ['email', 'river@example.com'],
          ['account-type', 'personal'],
        ]);
      }
    );
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
    const { form, email, emailInput, accountType, submit } =
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
    await Promise.all([email.updateComplete, accountType.updateComplete]);
    expect(form.checkValidity()).toBe(false);

    await step('disabling a group excludes only its controls', async () => {
      fieldset.disabled = true;
      await Promise.all([email.updateComplete, accountType.updateComplete]);
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
      await Promise.all([email.updateComplete, accountType.updateComplete]);
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
        await email.updateComplete;
        expect(email.checkValidity()).toBe(true);
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
    const { form, email, emailInput, accountType, workRadio, submit, reset } =
      await getFormControls(canvasElement);
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
      expect(form.checkValidity()).toBe(false);
      await userEvent.click(submit);
      expect(submissions).toEqual([]);
    });

    await step(
      'fieldset disabling excludes native and custom inputs',
      async () => {
        fieldset.disabled = true;
        await Promise.all([email.updateComplete, accountType.updateComplete]);
        expect(reference.willValidate).toBe(false);
        expect(email.willValidate).toBe(false);
        expect(accountType.willValidate).toBe(false);
        expect(form.checkValidity()).toBe(true);
        await userEvent.click(submit);
        expect(submissions).toEqual([
          { submitter: submit, data: [['action', 'save']] },
        ]);

        fieldset.disabled = false;
        await Promise.all([email.updateComplete, accountType.updateComplete]);
        expect(reference.willValidate).toBe(true);
        expect(email.willValidate).toBe(true);
        expect(accountType.willValidate).toBe(true);
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
        await email.updateComplete;
        expect(form.checkValidity()).toBe(true);
        await userEvent.click(submit);
        expect(submissions).toEqual([
          { submitter: submit, data: [['action', 'save']] },
          {
            submitter: submit,
            data: [
              ['email', 'taylor@example.com'],
              ['account-type', 'work'],
              ['reference', 'changed'],
              ['action', 'save'],
            ],
          },
        ]);
      }
    );

    await step('one reset restores native and component defaults', async () => {
      await userEvent.click(reset);
      await Promise.all([email.updateComplete, accountType.updateComplete]);
      expect(reference.value).toBe('account');
      expect(emailInput.value).toBe('river@example.com');
      expect(accountType.selected).toBe('personal');
      expect(form.checkValidity()).toBe(true);
      expect([...new FormData(form)]).toEqual([
        ['email', 'river@example.com'],
        ['account-type', 'personal'],
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
