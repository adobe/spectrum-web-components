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

import type { TextField } from '@adobe/spectrum-wc/text-field';

import '@adobe/spectrum-wc/components/text-field/swc-text-field.js';
import '@adobe/spectrum-wc/components/button-group/swc-button-group.js';

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

const validateField = async (field: TextField): Promise<void> => {
  if (field.fieldStatus === 'invalid') {
    field.fieldStatus = undefined;
  }
  await field.updateComplete;
  if (!field.willValidate) {
    return;
  }

  let message = '';
  if (field.validity.valueMissing) {
    message =
      field.name === 'name' ? 'Enter your name.' : 'Enter an email address.';
  } else if (field.validity.typeMismatch) {
    message = 'Enter a valid email address.';
  } else if (!field.validity.valid) {
    message = field.validationMessage;
  }

  if (message) {
    const errorText = field.querySelector('[slot="error-text"]');
    if (!errorText) {
      throw new Error('Form field error text not found.');
    }
    errorText.textContent = message;
    field.fieldStatus = 'invalid';
    await field.updateComplete;
  }
};

const handleInput = async (event: Event): Promise<void> => {
  const field = event.currentTarget as TextField;
  if (field.fieldStatus === 'invalid') {
    await validateField(field);
  }
};

const handleSubmit = async (event: SubmitEvent): Promise<void> => {
  event.preventDefault();
  const form = event.currentTarget as HTMLFormElement;
  const fields = Array.from(form.querySelectorAll('swc-text-field'));
  const output = form.querySelector<HTMLOutputElement>('[data-form-data]');
  if (!output) {
    throw new Error('Form result output not found.');
  }

  await Promise.all(fields.map(validateField));
  if (!form.checkValidity()) {
    output.value = 'Submission blocked. Correct the highlighted fields.';
    fields
      .find((field) => field.willValidate && !field.validity.valid)
      ?.focus();
    return;
  }

  const data = [...new FormData(form, event.submitter)]
    .map(([name, value]) => `${name}: ${value}`)
    .join('\n');
  output.value = `Submitted:\n${data || 'No enabled fields to include.'}`;
};

const toggleFieldsetDisabled = (event: Event): void => {
  const button = event.currentTarget as HTMLButtonElement;
  const fieldset = button.form?.querySelector('fieldset');
  if (!fieldset) {
    throw new Error('Form fieldset not found.');
  }
  fieldset.disabled = !fieldset.disabled;
  button.setAttribute('aria-pressed', String(fieldset.disabled));
};

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

export const FormBehavior: Story = {
  render: () => html`
    <form
      novalidate
      aria-label="Account details"
      style="display: flex; flex-direction: column; gap: 24px; inline-size: 28rem; max-inline-size: 100%;"
      @submit=${handleSubmit}
    >
      <fieldset
        aria-label="Profile"
        style="display: flex; flex-direction: column; gap: 24px; margin: 0; min-inline-size: 0; padding: 0; border: 0;"
      >
        <swc-text-field
          name="name"
          autocomplete="name"
          placeholder="Enter your name"
          required
          style="inline-size: 100%;"
          @input=${handleInput}
        >
          <span slot="label">Name</span>
          <span slot="error-text">Enter your name.</span>
        </swc-text-field>
        <swc-text-field
          name="email"
          type="email"
          autocomplete="email"
          placeholder="Enter your email address"
          required
          style="inline-size: 100%;"
          @input=${handleInput}
        >
          <span slot="label">Email address</span>
          <span slot="description">For account updates.</span>
          <span slot="error-text">Enter an email address.</span>
        </swc-text-field>
      </fieldset>
      <div
        style="display: flex; flex-wrap: wrap; align-items: center; gap: 12px;"
      >
        <swc-button-group aria-label="Form actions">
          <button type="submit" class="swc-Button">
            <span class="swc-Button-label">Submit</span>
          </button>
          <button type="reset" class="swc-Button swc-Button--secondary">
            <span class="swc-Button-label">Reset</span>
          </button>
        </swc-button-group>
        <button
          type="button"
          class="swc-Button swc-Button--secondary"
          data-toggle-fieldset
          aria-pressed="false"
          @click=${toggleFieldsetDisabled}
        >
          <span class="swc-Button-label">Disable fields</span>
        </button>
      </div>
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <span
          id="submitted-form-data-label"
          class="swc-Detail swc-Detail--sizeM"
        >
          Form result
        </span>
        <output
          data-form-data
          aria-labelledby="submitted-form-data-label"
          aria-live="polite"
          style="display: block; min-block-size: 2lh; font-family: monospace; font-size: 0.875rem; white-space: pre-wrap; overflow-wrap: anywhere;"
          .defaultValue=${'Submit the form to see its data.'}
        ></output>
      </div>
    </form>
  `,
  tags: ['behaviors'],
};
FormBehavior.storyName = 'Account details';
