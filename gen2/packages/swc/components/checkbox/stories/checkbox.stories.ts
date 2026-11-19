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
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import type { Checkbox } from '@adobe/spectrum-wc/checkbox';
import {
  CHECKBOX_STATUSES,
  CHECKBOX_VALID_SIZES,
} from '@adobe/spectrum-wc-core/components/checkbox';

import '@adobe/spectrum-wc/components/checkbox/swc-checkbox.js';
import '@adobe/spectrum-wc/components/button-group/swc-button-group.js';

// ────────────────
//    METADATA
// ────────────────

const { events, args, argTypes, template } =
  getStorybookHelpers('swc-checkbox');

argTypes.size = {
  ...argTypes.size,
  control: { type: 'select' },
  options: CHECKBOX_VALID_SIZES,
};

argTypes['field-status'] = {
  ...argTypes['field-status'],
  control: { type: 'select' },
  options: [undefined, ...CHECKBOX_STATUSES],
};
args['field-status'] = undefined;

/**
 * A checkbox selects or marks an item, or gives consent. Each checkbox is an
 * independent control with its own label, and submits its own value with a
 * native `<form>`. Use checkboxes to let people select any number of options
 * from a list, or to mark a single option as selected. Use a switch instead
 * when the control activates something rather than selecting it.
 *
 * For shared validation, submission, and reset guidance, see the
 * [Forms pattern](?path=/docs/patterns-forms--docs).
 */
const meta: Meta = {
  title: 'Checkbox',
  component: 'swc-checkbox',
  args,
  argTypes,
  render: (args) => template(args),
  parameters: {
    actions: {
      handles: events,
    },
    docs: {
      subtitle: 'Independent selection or consent control',
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/xHBWBBIe2eo5vwoCeNrC4Q/S2---Web?node-id=9961-2510',
    },
    stackblitz: {
      url: 'https://stackblitz.com/edit/vitejs-vite-zybk2quz',
    },
  },
  tags: ['migrated'],
};

export default meta;

// ────────────────
//    HELPERS
// ────────────────

const checkboxesOf = (form: HTMLFormElement): Checkbox[] =>
  Array.from(form.elements).filter(
    (element): element is Checkbox => element.localName === 'swc-checkbox'
  );

// Follows forms RFC section 3.6: clear the previous invalid statuses, validate,
// mark each failing field, and focus the first one.
const handleFormSubmit = async (event: SubmitEvent): Promise<void> => {
  event.preventDefault();
  const form = event.currentTarget as HTMLFormElement;
  const fields = checkboxesOf(form);
  const status = form.querySelector('[role="status"]');

  for (const field of fields) {
    if (field.fieldStatus === 'invalid') {
      field.fieldStatus = undefined;
    }
  }
  await Promise.all(fields.map((field) => field.updateComplete));

  if (form.checkValidity()) {
    if (status) {
      const entries = Array.from(
        new FormData(form),
        ([name, value]) => `${name}=${String(value)}`
      );
      status.textContent = `Submitted: ${entries.join('&')}`;
    }
    return;
  }
  for (const field of fields) {
    if (field.willValidate && !field.validity.valid) {
      field.fieldStatus = 'invalid';
    }
  }
  if (status) {
    status.textContent = '';
  }
  fields.find((field) => field.willValidate && !field.validity.valid)?.focus();
};

const handleFormReset = (event: Event): void => {
  const status = (event.currentTarget as HTMLFormElement).querySelector(
    '[role="status"]'
  );
  if (status) {
    status.textContent = '';
  }
};

// Updates the displayed error when the user commits a change.
const handleFormChange = async (event: Event): Promise<void> => {
  const field = event.target as Checkbox;
  if (field.localName !== 'swc-checkbox' || field.fieldStatus !== 'invalid') {
    return;
  }
  field.fieldStatus = undefined;
  await field.updateComplete;
  if (!field.checkValidity()) {
    field.fieldStatus = 'invalid';
  }
};

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story = {
  tags: ['dev'],
  args: {
    'label-slot': 'Send me product updates',
  },
};

// ──────────────────────────
//    OVERVIEW STORY
// ──────────────────────────

export const Overview: Story = {
  args: {
    checked: true,
    'label-slot': 'Send me product updates',
  },
  tags: ['overview'],
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

export const Anatomy: Story = {
  render: (args) => html`
    ${template({ ...args, checked: true, 'label-slot': 'Label' })}
    ${template({
      ...args,
      'label-slot': 'Label',
      'description-slot': 'Description',
    })}
    ${template({
      ...args,
      'field-status': 'invalid',
      'label-slot': 'Label',
      'error-text-slot': 'Error text',
    })}
  `,
  parameters: { flexLayout: 'row-wrap' },
  tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

export const Sizes: Story = {
  render: (args) => html`
    ${CHECKBOX_VALID_SIZES.map((size) =>
      template({
        ...args,
        size,
        checked: true,
        'label-slot': `Size ${size}`,
      })
    )}
  `,
  parameters: { flexLayout: 'row-wrap' },
  tags: ['options'],
};

export const Emphasized: Story = {
  render: (args) => html`
    ${template({ ...args, emphasized: true, 'label-slot': 'Unchecked' })}
    ${template({
      ...args,
      emphasized: true,
      checked: true,
      'label-slot': 'Checked',
    })}
    ${template({
      ...args,
      emphasized: true,
      indeterminate: true,
      'label-slot': 'Indeterminate',
    })}
  `,
  parameters: { flexLayout: 'row-wrap' },
  tags: ['options'],
};

export const WithDescription: Story = {
  args: {
    'label-slot': 'Send me product updates',
    'description-slot': 'We send one email a month.',
  },
  tags: ['options'],
};
WithDescription.storyName = 'With description';

// ──────────────────────────
//    STATES STORIES
// ──────────────────────────

export const Selection: Story = {
  render: (args) => html`
    ${template({ ...args, 'label-slot': 'Unchecked' })}
    ${template({ ...args, checked: true, 'label-slot': 'Checked' })}
    ${template({ ...args, indeterminate: true, 'label-slot': 'Indeterminate' })}
  `,
  parameters: { flexLayout: 'row-wrap' },
  tags: ['states'],
};

export const Required: Story = {
  args: {
    required: true,
    'label-slot': 'I agree to the terms of service',
    'description-slot': 'Required to create an account.',
  },
  tags: ['states'],
};

export const Disabled: Story = {
  render: (args) => html`
    ${template({
      ...args,
      'field-status': 'disabled',
      'label-slot': 'Unchecked',
    })}
    ${template({
      ...args,
      'field-status': 'disabled',
      checked: true,
      'label-slot': 'Checked',
    })}
    ${template({
      ...args,
      'field-status': 'disabled',
      indeterminate: true,
      'label-slot': 'Indeterminate',
    })}
    ${template({
      ...args,
      'field-status': 'disabled',
      emphasized: true,
      checked: true,
      'label-slot': 'Emphasized checked',
    })}
  `,
  parameters: { flexLayout: 'row-wrap' },
  tags: ['states'],
};

export const ReadOnly: Story = {
  args: {
    'field-status': 'readonly',
    checked: true,
    'label-slot': 'Send me product updates',
  },
  tags: ['states'],
};
ReadOnly.storyName = 'Read-only';

export const Invalid: Story = {
  render: (args) => html`
    ${template({
      ...args,
      'field-status': 'invalid',
      required: true,
      'label-slot': 'I agree to the terms',
      'error-text-slot': 'Check this box to continue.',
    })}
    ${template({
      ...args,
      'field-status': 'invalid',
      'label-slot': 'Share my usage data',
      'description-slot': 'Required by your organization.',
    })}
    ${template({
      ...args,
      'field-status': 'invalid',
      'label-slot': 'Confirm my email address',
    })}
  `,
  parameters: { flexLayout: 'row-wrap' },
  tags: ['states'],
};

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

export const FormParticipation: Story = {
  render: () => html`
    <form
      novalidate
      @submit=${handleFormSubmit}
      @change=${handleFormChange}
      @reset=${handleFormReset}
      style="display: grid; gap: var(--swc-spacing-300);"
    >
      <swc-checkbox name="terms" value="accepted" required>
        <span slot="label">I agree to the terms of service</span>
        <span slot="error-text">Agree to the terms to continue.</span>
      </swc-checkbox>
      <swc-checkbox name="updates" value="monthly">
        <span slot="label">Send me product updates</span>
        <span slot="description">We send one email a month.</span>
      </swc-checkbox>
      <swc-checkbox name="plan" value="basic" checked field-status="readonly">
        <span slot="label">Keep my current plan</span>
        <span slot="description">Managed by your administrator.</span>
      </swc-checkbox>
      <swc-button-group>
        <button class="swc-Button" type="submit">Submit</button>
        <button class="swc-Button swc-Button--secondary" type="reset">
          Reset
        </button>
      </swc-button-group>
      <p role="status"></p>
    </form>
  `,
  parameters: {
    styles: { 'inline-size': 'min(320px, 100vw)' },
  },
  tags: ['behaviors'],
};
FormParticipation.storyName = 'Form participation';

export const LabelWrapping: Story = {
  args: {
    'label-slot':
      'Send me product updates, event invitations, and occasional surveys about new features',
  },
  parameters: { styles: { maxInlineSize: '240px' } },
  tags: ['behaviors'],
};
LabelWrapping.storyName = 'Label wrapping';

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = {
  render: () => html`
    <swc-checkbox name="updates" value="monthly">
      <span slot="label">Send me product updates</span>
      <span slot="description">We send one email a month.</span>
    </swc-checkbox>
    <swc-checkbox name="terms" value="accepted" required field-status="invalid">
      <span slot="label">I agree to the terms of service</span>
      <span slot="description">Required to create an account.</span>
      <span slot="error-text">Agree to the terms to continue.</span>
    </swc-checkbox>
    <fieldset
      style="display: grid; gap: var(--swc-spacing-100); margin: 0; padding: 0; border: none;"
    >
      <legend>Notification preferences</legend>
      <swc-checkbox name="notify" value="email" checked>
        <span slot="label">Email notifications</span>
      </swc-checkbox>
      <swc-checkbox name="notify" value="sms">
        <span slot="label">SMS notifications</span>
      </swc-checkbox>
      <swc-checkbox name="notify" value="push">
        <span slot="label">Push notifications</span>
      </swc-checkbox>
    </fieldset>
    <table>
      <caption>Shared files</caption>
      <thead>
        <tr>
          <th scope="col">Select</th>
          <th scope="col">Name</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <swc-checkbox
              accessible-label="Select Quarterly report.pdf"
            ></swc-checkbox>
          </td>
          <td>Quarterly report.pdf</td>
        </tr>
        <tr>
          <td>
            <swc-checkbox
              accessible-label="Select Budget forecast.xlsx"
            ></swc-checkbox>
          </td>
          <td>Budget forecast.xlsx</td>
        </tr>
      </tbody>
    </table>
  `,
  parameters: {
    styles: {
      display: 'grid',
      gap: 'var(--swc-spacing-300)',
      'justify-items': 'start',
    },
  },
  tags: ['a11y'],
};
