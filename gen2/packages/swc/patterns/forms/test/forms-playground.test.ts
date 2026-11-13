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

export default {
  title: 'Forms',
  parameters: {
    docs: { disable: true, page: null },
    controls: { disable: true },
  },
  tags: ['!autodocs', 'dev'],
} satisfies Meta;

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
    throw new Error('Forms playground requires field error text');
  }
  errorText.textContent = field.validationMessage;
  field.fieldStatus = 'invalid';
  await field.updateComplete;
};

const handleFieldEdit = async (event: Event): Promise<void> => {
  const field = event.currentTarget;
  if (!(field instanceof TextField) && !(field instanceof RadioGroup)) {
    throw new Error('Forms playground requires a supported control');
  }
  if (field.fieldStatus === 'invalid') {
    await validateField(field);
  }
};

const inspectForm = async (event: SubmitEvent): Promise<void> => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!(form instanceof HTMLFormElement)) {
    throw new Error('Forms playground requires a form');
  }
  const output = form.querySelector('output');
  if (!output) {
    throw new Error('Forms playground requires an inspection output');
  }
  const fields = Array.from(
    form.querySelectorAll<FormField>('swc-text-field, swc-radio-group')
  );
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

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 32px; inline-size: min(48rem, 100vw - 2rem); padding-block: 32px;"
    >
      <header style="display: flex; flex-direction: column; gap: 8px;">
        <h1 class="swc-Heading swc-Heading--sizeL">Forms playground</h1>
        <p class="swc-Body swc-Body--sizeS">
          Explore form behavior. No data is sent.
        </p>
      </header>
      <form
        novalidate
        aria-label="Forms playground"
        style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr)); align-items: start; gap: 24px;"
        @submit=${inspectForm}
      >
        <div
          style="display: flex; flex-direction: column; gap: 24px; min-inline-size: 0;"
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
          </div>
        </div>
        <div style="min-inline-size: 0;">
          <pre style="margin: 0;"><code style="display: block;"><output
            class="swc-Code swc-Code--sizeS"
            aria-label="Form results"
            aria-live="polite"
            tabindex="0"
            style="display: block; box-sizing: border-box; block-size: 16rem; padding: 16px; overflow: auto; border: 1px solid var(--swc-gray-300); border-radius: var(--swc-corner-radius-100); background: var(--swc-gray-75); white-space: pre;"
            .defaultValue=${'Submit to view results.'}
          ></output></code></pre>
        </div>
      </form>
    </div>
  `,
};
