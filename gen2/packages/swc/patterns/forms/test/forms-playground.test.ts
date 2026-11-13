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

const inspectForm = (event: SubmitEvent): void => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!(form instanceof HTMLFormElement)) {
    throw new Error('Forms playground requires a form');
  }
  const output = form.querySelector('output');
  if (!output) {
    throw new Error('Forms playground requires an inspection output');
  }
  output.value = JSON.stringify(
    {
      valid: form.checkValidity(),
      data: [...new FormData(form, event.submitter)],
    },
    null,
    2
  );
};

const toggleCustomError = (event: Event): void => {
  const checkbox = event.currentTarget;
  if (!(checkbox instanceof HTMLInputElement)) {
    throw new Error('Forms playground requires a custom-error checkbox');
  }
  const field = checkbox.form?.querySelector<TextField>(
    'swc-text-field[name="name"]'
  );
  if (!field) {
    throw new Error('Forms playground requires the "name" field');
  }
  field.fieldStatus = checkbox.checked ? 'invalid' : undefined;
};

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story = {
  render: () => html`
    <form
      novalidate
      aria-label="Forms playground"
      style="display: flex; flex-direction: column; gap: 24px; inline-size: 28rem; max-inline-size: 100%;"
      @submit=${inspectForm}
    >
      <p>
        Edit the controls and check their validity and data. Nothing is sent.
      </p>
      <swc-text-field name="name" value="River" autocomplete="name" required>
        <span slot="label">Name</span>
        <span slot="error-text">This name needs review.</span>
      </swc-text-field>
      <label>
        <input type="checkbox" name="confirmed" value="yes" checked required />
        Confirm details
      </label>
      <label>
        <input type="checkbox" @change=${toggleCustomError} />
        Show a custom error on Name
      </label>
      <div style="display: flex; flex-wrap: wrap; gap: 12px;">
        <button type="submit" name="action" value="inspect" class="swc-Button">
          <span class="swc-Button-label">Check form</span>
        </button>
        <button type="reset" class="swc-Button swc-Button--secondary">
          <span class="swc-Button-label">Reset</span>
        </button>
      </div>
      <pre style="margin: 0;"><code style="display: block;"><output
        class="swc-Code swc-Code--sizeS"
        aria-label="Form inspection"
        aria-live="polite"
        tabindex="0"
        style="display: block; box-sizing: border-box; block-size: 16rem; padding: 16px; overflow: auto; border: 1px solid var(--swc-gray-300); border-radius: var(--swc-corner-radius-100); background: var(--swc-gray-75); white-space: pre;"
        .defaultValue=${'Check the form to view results.'}
      ></output></code></pre>
    </form>
  `,
};
