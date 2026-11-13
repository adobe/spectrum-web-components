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
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import { RadioGroup } from '@adobe/spectrum-wc/radio-group';
import { TextField } from '@adobe/spectrum-wc/text-field';

import '@adobe/spectrum-wc/components/text-field/swc-text-field.js';
import '@adobe/spectrum-wc/components/radio-group/swc-radio-group.js';
import '@adobe/spectrum-wc/components/radio-group/swc-radio.js';

// ────────────────
//    METADATA
// ────────────────

/**
 * Examples of form validation, submission, and reset with HTML forms.
 */
const meta: Meta = {
  title: 'Forms',
  tags: ['migrated'],
  parameters: {
    docs: {
      subtitle: 'Form-level behavior with Spectrum Web Components',
    },
    controls: { disable: true },
  },
};

export default meta;

// ────────────────────
//    HELPERS
// ────────────────────

type FormField = TextField | RadioGroup;

const validateField = async (field: FormField): Promise<void> => {
  if (field.fieldStatus === 'invalid') {
    field.fieldStatus = undefined;
  }
  await field.updateComplete;
  if (!field.willValidate || field.validity.valid) {
    return;
  }
  const errorText = field.querySelector('[slot="error-text"]');
  if (!errorText) {
    throw new Error('Form field error text not found.');
  }
  errorText.textContent = field.validationMessage;
  field.fieldStatus = 'invalid';
  await field.updateComplete;
};

const handleFieldEdit = async (event: Event): Promise<void> => {
  const field = event.currentTarget;
  if (!(field instanceof TextField) && !(field instanceof RadioGroup)) {
    throw new Error('Form field edit requires a supported control.');
  }
  if (field.fieldStatus === 'invalid') {
    await validateField(field);
  }
};

const handleSubmit = async (event: SubmitEvent): Promise<void> => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!(form instanceof HTMLFormElement)) {
    throw new Error('Form submission requires a form.');
  }
  const fields = Array.from(
    form.querySelectorAll<FormField>('swc-text-field, swc-radio-group')
  );
  const output = form.querySelector<HTMLOutputElement>('[data-form-data]');
  if (!output) {
    throw new Error('Form result output not found.');
  }

  await Promise.all(fields.map(validateField));
  const valid = form.checkValidity();
  output.value = JSON.stringify(
    {
      valid,
      data: [...new FormData(form, event.submitter)],
    },
    null,
    2
  );
  if (!valid) {
    fields
      .find((field) => field.willValidate && !field.validity.valid)
      ?.focus();
  }
};

const toggleFieldsetDisabled = (event: Event): void => {
  const button = event.currentTarget;
  if (!(button instanceof HTMLButtonElement)) {
    throw new Error('Form fieldset toggle requires a button.');
  }
  const fieldset = button.form?.querySelector('fieldset');
  if (!fieldset) {
    throw new Error('Form fieldset not found.');
  }
  const label = button.querySelector('.swc-Button-label');
  if (!label) {
    throw new Error('Form fieldset toggle label not found.');
  }
  fieldset.disabled = !fieldset.disabled;
  label.textContent = fieldset.disabled ? 'Enable fields' : 'Disable fields';
};

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

export const FormBehavior: Story = {
  render: () => html`
    <form
      novalidate
      aria-label="Account details"
      style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr)); align-items: start; gap: 24px; inline-size: min(48rem, 100vw - 2rem); max-inline-size: 100%; padding-block: 32px;"
      @submit=${handleSubmit}
    >
      <div
        style="display: flex; flex-direction: column; gap: 24px; min-inline-size: 0;"
      >
        <fieldset
          aria-label="Account fields"
          style="display: flex; flex-direction: column; gap: 24px; margin: 0; min-inline-size: 0; padding: 0; border: 0;"
        >
          <swc-text-field
            name="email"
            type="email"
            autocomplete="email"
            required
            style="inline-size: 100%; --swc-field-input-max-inline-size: 100%;"
            @input=${handleFieldEdit}
          >
            <span slot="label">Email address</span>
            <span slot="error-text"></span>
          </swc-text-field>
          <swc-radio-group
            name="account-type"
            orientation="horizontal"
            required
            style="inline-size: 100%;"
            @change=${handleFieldEdit}
          >
            <span slot="label">Account type</span>
            <span slot="error-text"></span>
            <swc-radio value="personal">
              <span slot="label">Personal</span>
            </swc-radio>
            <swc-radio value="work"><span slot="label">Work</span></swc-radio>
          </swc-radio-group>
        </fieldset>
        <div style="display: flex; flex-wrap: wrap; gap: 12px;">
          <button
            type="submit"
            name="action"
            value="inspect"
            class="swc-Button"
          >
            <span class="swc-Button-label">Submit</span>
          </button>
          <button type="reset" class="swc-Button swc-Button--secondary">
            <span class="swc-Button-label">Reset</span>
          </button>
          <button
            type="button"
            class="swc-Button swc-Button--secondary"
            data-toggle-fieldset
            @click=${toggleFieldsetDisabled}
          >
            <span class="swc-Button-label">Disable fields</span>
          </button>
        </div>
      </div>
      <div style="min-inline-size: 0;">
        <pre style="margin: 0;"><code style="display: block;"><output
          data-form-data
          class="swc-Code swc-Code--sizeS"
          aria-label="Form results"
          aria-live="polite"
          tabindex="0"
          style="display: block; box-sizing: border-box; block-size: 16rem; padding: 16px; overflow: auto; border: 1px solid var(--swc-gray-300); border-radius: var(--swc-corner-radius-100); background: var(--swc-gray-75); white-space: pre;"
          .defaultValue=${'Submit to view results.'}
        ></output></code></pre>
      </div>
    </form>
  `,
  tags: ['behaviors'],
};
FormBehavior.storyName = 'Account details';
