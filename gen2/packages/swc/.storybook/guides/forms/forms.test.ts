/**
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed
 * under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

import { expect, userEvent, waitFor, within } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import type { TextField } from '@adobe/spectrum-wc/text-field';

import { getComponents } from '../../../utils/test-utils.js';
import meta, { FormBehavior } from './forms.stories.js';

export default {
  ...meta,
  title: 'Forms/Tests',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

const initialResult = 'Submit the form to see its data.';
const blockedResult = 'Submission blocked. Correct the highlighted fields.';
const submittedResult = 'Submitted:\nname: River\nemail: river@example.com';

const getForm = async (canvasElement: HTMLElement) => {
  const fields = await getComponents<TextField>(
    canvasElement,
    'swc-text-field'
  );
  const form = canvasElement.querySelector('form');
  const name = form?.querySelector<TextField>('[name="name"]');
  const email = form?.querySelector<TextField>('[name="email"]');
  const fieldset = form?.querySelector('fieldset');
  const output = form?.querySelector<HTMLOutputElement>('[data-form-data]');
  if (!form || !name || !email || !fieldset || !output) {
    throw new Error('Form, fields, fieldset, or result not found.');
  }
  const nameInput = name.roleElement;
  const emailInput = email.roleElement;
  if (!nameInput || !emailInput) {
    throw new Error('Form inputs not found.');
  }
  const canvas = within(canvasElement);
  return {
    form,
    name,
    email,
    nameInput,
    emailInput,
    fields,
    fieldset,
    output,
    canvas,
    submit: canvas.getByRole('button', { name: 'Submit' }),
    reset: canvas.getByRole('button', { name: 'Reset' }),
    toggle: canvas.getByRole('button', { name: 'Disable fields' }),
    updateFields: () =>
      Promise.all(fields.map((field) => field.updateComplete)),
  };
};

// ────────────────────
// FORM INTEGRATION
// ────────────────────

export const InitialStateTest: Story = {
  ...FormBehavior,
  play: async ({ canvasElement }) => {
    const { form, nameInput, email, emailInput, fields, canvas, output } =
      await getForm(canvasElement);
    expect(fields).toHaveLength(2);
    expect(form).toHaveAccessibleName('Account details');
    expect(canvas.getByRole('group', { name: 'Profile' })).toBeVisible();
    expect(canvas.getByRole('group', { name: 'Form actions' })).toBeVisible();
    expect(nameInput).toHaveAccessibleName('Name');
    expect(emailInput).toHaveAccessibleName('Email address');
    expect(nameInput.placeholder).toBe('Enter your name');
    expect(emailInput.placeholder).toBe('Enter your email address');
    expect(nameInput.autocomplete).toBe('name');
    expect(emailInput.autocomplete).toBe('email');
    expect(emailInput.type).toBe('email');
    expect(nameInput.minLength).toBe(-1);
    expect(email.querySelector('[slot="description"]')).toHaveTextContent(
      'For account updates.'
    );
    expect(output).toHaveAccessibleName('Form result');
    expect(output.value).toBe(initialResult);
    for (const field of fields) {
      expect(field.value).toBe('');
      expect(field.fieldStatus).toBeUndefined();
    }
    expect(nameInput.required).toBe(true);
    expect(emailInput.required).toBe(true);
  },
};
InitialStateTest.storyName = 'Initial form state';

export const EmptySubmissionTest: Story = {
  ...FormBehavior,
  play: async ({ canvasElement }) => {
    const { name, email, submit, output } = await getForm(canvasElement);
    await userEvent.click(submit);
    await waitFor(() => {
      expect(output.value).toBe(blockedResult);
      expect(name).toHaveFocus();
      expect(name.shadowRoot?.activeElement).toBe(name.roleElement);
    });
    expect(name.fieldStatus).toBe('invalid');
    expect(name.validationMessage).toBe('Enter your name.');
    expect(email.fieldStatus).toBe('invalid');
    expect(email.validationMessage).toBe('Enter an email address.');
  },
};
EmptySubmissionTest.storyName = 'Empty submission';

export const UntouchedFieldTest: Story = {
  ...FormBehavior,
  play: async ({ canvasElement }) => {
    const { email, emailInput, output } = await getForm(canvasElement);
    await userEvent.type(emailInput, 'not-an-email');
    await userEvent.tab();
    await email.updateComplete;
    expect(email.validity.typeMismatch).toBe(true);
    expect(email.fieldStatus).toBeUndefined();
    expect(email.roleElement).not.toHaveAttribute('aria-invalid');
    expect(output.value).toBe(initialResult);
  },
};
UntouchedFieldTest.storyName = 'Untouched field validation';

export const InvalidEmailTest: Story = {
  ...FormBehavior,
  play: async ({ canvasElement }) => {
    const { name, nameInput, email, emailInput, submit, output } =
      await getForm(canvasElement);
    await userEvent.type(nameInput, 'River');
    await userEvent.type(emailInput, 'not-an-email');
    await userEvent.click(submit);
    await waitFor(() => {
      expect(output.value).toBe(blockedResult);
      expect(email).toHaveFocus();
      expect(email.shadowRoot?.activeElement).toBe(email.roleElement);
    });
    expect(name.fieldStatus).toBeUndefined();
    expect(email.fieldStatus).toBe('invalid');
    expect(email.validationMessage).toBe('Enter a valid email address.');
    expect(email.roleElement).toHaveAttribute('aria-invalid', 'true');
    expect(
      email.shadowRoot?.querySelector('.swc-TextField-invalidIcon')
    ).toBeTruthy();
  },
};
InvalidEmailTest.storyName = 'Invalid email submission';

export const ErrorCorrectionTest: Story = {
  ...FormBehavior,
  play: async ({ canvasElement }) => {
    const { nameInput, email, emailInput, submit, output } =
      await getForm(canvasElement);
    await userEvent.type(nameInput, 'River');
    await userEvent.click(submit);
    await waitFor(() => expect(email.fieldStatus).toBe('invalid'));
    await userEvent.type(emailInput, 'river');
    await waitFor(() =>
      expect(email.validationMessage).toBe('Enter a valid email address.')
    );
    await userEvent.type(emailInput, '@example.com');
    await waitFor(() => {
      expect(email.fieldStatus).toBeUndefined();
      expect(email.validity.valid).toBe(true);
    });
    expect(email.roleElement).not.toHaveAttribute('aria-invalid');
    expect(
      email.shadowRoot?.querySelector('.swc-FormFieldErrorText')
    ).toBeNull();
    expect(output.value).toBe(blockedResult);
  },
};
ErrorCorrectionTest.storyName = 'Correcting a displayed error';

export const ValidSubmissionTest: Story = {
  ...FormBehavior,
  play: async ({ canvasElement }) => {
    const { form, name, nameInput, email, emailInput, submit, output } =
      await getForm(canvasElement);
    await userEvent.type(nameInput, 'River');
    await userEvent.type(emailInput, 'river@example.com');
    await userEvent.click(submit);
    await waitFor(() => expect(output.value).toBe(submittedResult));
    expect(name.fieldStatus).toBeUndefined();
    expect(email.fieldStatus).toBeUndefined();
    expect([...new FormData(form)]).toEqual([
      ['name', 'River'],
      ['email', 'river@example.com'],
    ]);
  },
};
ValidSubmissionTest.storyName = 'Valid submission';

export const BlockedResubmissionTest: Story = {
  ...FormBehavior,
  play: async ({ canvasElement }) => {
    const { name, email, submit, output, updateFields } =
      await getForm(canvasElement);
    name.value = 'River';
    email.value = 'river@example.com';
    await updateFields();
    await userEvent.click(submit);
    await waitFor(() => expect(output.value).toBe(submittedResult));
    name.value = '';
    email.value = '';
    await updateFields();
    await userEvent.click(submit);
    await waitFor(() => {
      expect(output.value).toBe(blockedResult);
      expect(name).toHaveFocus();
      expect(name.shadowRoot?.activeElement).toBe(name.roleElement);
    });
  },
};
BlockedResubmissionTest.storyName = 'Blocked resubmission replaces results';

export const ResetErrorsTest: Story = {
  ...FormBehavior,
  play: async ({ canvasElement }) => {
    const { name, email, fields, submit, reset, output, updateFields } =
      await getForm(canvasElement);
    name.value = 'River';
    email.value = 'not-an-email';
    await updateFields();
    await userEvent.click(submit);
    await waitFor(() => expect(email.fieldStatus).toBe('invalid'));
    await userEvent.click(reset);
    await updateFields();
    for (const field of fields) {
      expect(field.value).toBe('');
      expect(field.fieldStatus).toBeUndefined();
      expect(field.validity.customError).toBe(false);
      expect(field.roleElement).not.toHaveAttribute('aria-invalid');
      expect(
        field.shadowRoot?.querySelector('.swc-FormFieldErrorText')
      ).toBeNull();
    }
    expect(output.value).toBe(initialResult);
  },
};
ResetErrorsTest.storyName = 'Reset clears errors';

export const ResetSubmissionTest: Story = {
  ...FormBehavior,
  play: async ({ canvasElement }) => {
    const { form, name, email, submit, reset, output, updateFields } =
      await getForm(canvasElement);
    name.value = 'River';
    email.value = 'river@example.com';
    await updateFields();
    await userEvent.click(submit);
    await waitFor(() => expect(output.value).toBe(submittedResult));
    await userEvent.click(reset);
    await updateFields();
    expect([...new FormData(form)]).toEqual([
      ['name', ''],
      ['email', ''],
    ]);
    expect(output.value).toBe(initialResult);
  },
};
ResetSubmissionTest.storyName = 'Reset clears submitted results';

export const DisabledFieldsTest: Story = {
  ...FormBehavior,
  play: async ({ canvasElement }) => {
    const { form, fields, fieldset, toggle, submit, output, updateFields } =
      await getForm(canvasElement);
    expect(fieldset.contains(toggle)).toBe(false);
    await userEvent.click(toggle);
    await updateFields();
    expect(fieldset.disabled).toBe(true);
    expect(toggle).toHaveAttribute('aria-pressed', 'true');
    expect(toggle).toBeEnabled();
    for (const field of fields) {
      expect(field.roleElement).toBeDisabled();
      expect(field.willValidate).toBe(false);
    }
    expect([...new FormData(form)]).toEqual([]);
    await userEvent.click(submit);
    await waitFor(() =>
      expect(output.value).toBe('Submitted:\nNo enabled fields to include.')
    );
  },
};
DisabledFieldsTest.storyName = 'Disabled fields are excluded';

export const ResetDisabledFieldsTest: Story = {
  ...FormBehavior,
  play: async ({ canvasElement }) => {
    const { name, fields, fieldset, toggle, reset, output, updateFields } =
      await getForm(canvasElement);
    name.value = 'River';
    await name.updateComplete;
    await userEvent.click(toggle);
    await updateFields();
    await userEvent.click(reset);
    await updateFields();
    expect(fieldset.disabled).toBe(true);
    expect(toggle).toHaveAttribute('aria-pressed', 'true');
    expect(name.value).toBe('');
    expect(output.value).toBe(initialResult);
    for (const field of fields) {
      expect(field.roleElement).toBeDisabled();
    }
    await userEvent.click(toggle);
    await updateFields();
    expect(fieldset.disabled).toBe(false);
    expect(toggle).toHaveAttribute('aria-pressed', 'false');
    for (const field of fields) {
      expect(field.roleElement).not.toBeDisabled();
    }
  },
};
ResetDisabledFieldsTest.storyName = 'Reset preserves disabled state';

// ────────────────────
// FORM LAYOUT
// ────────────────────

export const ActionsLayoutTest: Story = {
  ...FormBehavior,
  play: async ({ canvasElement }) => {
    const { form, fieldset, submit, reset, toggle, output } =
      await getForm(canvasElement);
    for (const button of [submit, reset, toggle]) {
      expect(button).toBeVisible();
      expect(button.getBoundingClientRect().top).toBeCloseTo(
        submit.getBoundingClientRect().top,
        1
      );
    }
    expect(fieldset).toHaveStyle({ borderWidth: '0px', padding: '0px' });
    expect(output).toHaveStyle({
      backgroundColor: 'rgba(0, 0, 0, 0)',
      padding: '0px',
    });
    expect(parseFloat(getComputedStyle(output).fontSize)).toBeLessThan(
      parseFloat(getComputedStyle(form).fontSize)
    );
  },
};
ActionsLayoutTest.storyName = 'Layout: actions and result';

export const StableWidthTest: Story = {
  ...FormBehavior,
  play: async ({ canvasElement }) => {
    const { form, name, email, submit, reset, output, updateFields } =
      await getForm(canvasElement);
    const control = name.shadowRoot?.querySelector('.swc-TextField-control');
    if (!control) {
      throw new Error('Name control not found.');
    }
    // Match the shrink-to-fit wrapper around an MDX Canvas.
    const container = document.createElement('div');
    container.style.cssText = 'display: inline-block; max-inline-size: 100%;';
    form.before(container);
    container.append(form);
    try {
      const initialWidth = form.getBoundingClientRect().width;
      const controlWidth = control.getBoundingClientRect().width;
      const expectStableWidth = () => {
        expect(form.getBoundingClientRect().width).toBeCloseTo(initialWidth, 1);
        expect(control.getBoundingClientRect().width).toBeCloseTo(
          controlWidth,
          1
        );
      };
      await userEvent.click(submit);
      await waitFor(() => expect(output.value).toBe(blockedResult));
      expectStableWidth();

      const longName = 'Long name '.repeat(30);
      name.value = longName;
      email.value = 'river@example.com';
      await updateFields();
      await userEvent.click(submit);
      await waitFor(() =>
        expect(output.value).toBe(
          `Submitted:\nname: ${longName}\nemail: river@example.com`
        )
      );
      expectStableWidth();

      await userEvent.click(reset);
      await updateFields();
      expect(output.value).toBe(initialResult);
      expectStableWidth();

      container.style.display = 'block';
      container.style.inlineSize = '240px';
      expect(form.getBoundingClientRect().width).toBeLessThanOrEqual(
        container.getBoundingClientRect().width
      );
    } finally {
      container.before(form);
      container.remove();
    }
  },
};
StableWidthTest.storyName = 'Layout: stable responsive width';
