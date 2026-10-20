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

import { html, type TemplateResult } from 'lit';
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import '@adobe/spectrum-wc/components/text-field/swc-text-field.js';
import '@adobe/spectrum-wc/components/avatar/swc-avatar.js';
import '@adobe/spectrum-wc-icons/swc-icon-mention.js';

// ────────────────
//    METADATA
// ────────────────

const { events, args, argTypes, template } =
  getStorybookHelpers('swc-text-field');

/**
 * A single-line text field for entering and editing text.
 */
const meta: Meta = {
  title: 'Text field',
  component: 'swc-text-field',
  args,
  argTypes,
  render: (args) => template(args),
  parameters: {
    actions: {
      handles: events,
    },
    docs: {
      subtitle: `Single-line text field for entering and editing text`,
    },
  },
  tags: ['migrated'],
};

export default meta;

// ────────────────────
//    HELPERS
// ────────────────────

function captioned(
  caption: TemplateResult,
  content: TemplateResult
): TemplateResult {
  return html`
    <div
      style="display: flex; flex-direction: column; gap: var(--swc-spacing-100);"
    >
      <p class="swc-Detail swc-Detail--sizeM">${caption}</p>
      ${content}
    </div>
  `;
}

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story = {
  tags: ['dev'],
  args: {
    'label-slot': 'Name',
    placeholder: 'Enter your full name',
  },
  render: (args) => html`
    ${template({ ...args })}
  `,
};

// ──────────────────────────
//    OVERVIEW STORY
// ──────────────────────────

export const Overview: Story = {
  tags: ['overview'],
  render: () => html`
    <swc-text-field
      placeholder="Enter your full name"
      style="inline-size: 220px;"
    >
      <span slot="label">Name</span>
    </swc-text-field>
  `,
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

export const Anatomy: Story = {
  render: () => html`
    <swc-text-field autocomplete="email" style="inline-size: 220px;">
      <span slot="label">Email address</span>
      <span slot="description">Used for order updates only.</span>
    </swc-text-field>
    <swc-text-field autocomplete="email" invalid style="inline-size: 220px;">
      <span slot="label">Email address</span>
      <span slot="error-text">Enter a valid email address.</span>
    </swc-text-field>
  `,
  tags: ['anatomy'],
  parameters: {
    flexLayout: 'row-wrap',
    styles: {
      'align-items': 'flex-start',
    },
  },
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

export const Labelling: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 24px; inline-size: 100%; max-inline-size: 28rem;"
    >
      <section
        aria-labelledby="labelling-external-heading"
        style="display: grid; gap: 12px; min-inline-size: 0;"
      >
        <div>
          <h4
            id="labelling-external-heading"
            class="swc-Heading swc-Heading--sizeXS"
            style="margin: 0 0 4px;"
          >
            Name from row and column headers
          </h4>
          <code style="font-size: 0.875rem;">accessible-labelledby</code>
        </div>
        <div
          role="region"
          aria-label="Scrollable delivery address table"
          tabindex="0"
          style="min-inline-size: 0; overflow: auto;"
        >
          <table
            aria-label="Delivery addresses"
            style="border-spacing: 8px; text-align: start;"
          >
            <thead>
              <tr>
                <td></td>
                <th
                  id="labelling-col-header"
                  scope="col"
                  style="text-align: start;"
                >
                  Street address
                </th>
                <th
                  id="labelling-city-header"
                  scope="col"
                  style="text-align: start;"
                >
                  City
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th
                  id="labelling-row-header"
                  scope="row"
                  style="text-align: start;"
                >
                  Billing
                </th>
                <td>
                  <swc-text-field
                    id="labelling-labelledby-field"
                    autocomplete="billing street-address"
                    accessible-labelledby="labelling-row-header labelling-col-header"
                    value="12 Oak St"
                    style="inline-size: 132px;"
                  ></swc-text-field>
                </td>
                <td>
                  <swc-text-field
                    id="labelling-billing-city"
                    autocomplete="billing address-level2"
                    accessible-labelledby="labelling-row-header labelling-city-header"
                    value="Oakland"
                    style="inline-size: 112px;"
                  ></swc-text-field>
                </td>
              </tr>
              <tr>
                <th
                  id="labelling-shipping-header"
                  scope="row"
                  style="text-align: start;"
                >
                  Shipping
                </th>
                <td>
                  <swc-text-field
                    id="labelling-shipping-street"
                    autocomplete="shipping street-address"
                    accessible-labelledby="labelling-shipping-header labelling-col-header"
                    value="34 Pine St"
                    style="inline-size: 132px;"
                  ></swc-text-field>
                </td>
                <td>
                  <swc-text-field
                    id="labelling-shipping-city"
                    autocomplete="shipping address-level2"
                    accessible-labelledby="labelling-shipping-header labelling-city-header"
                    value="Berkeley"
                    style="inline-size: 112px;"
                  ></swc-text-field>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section
        aria-labelledby="labelling-string-heading"
        style="display: grid; gap: 12px; min-inline-size: 0;"
      >
        <div>
          <h4
            id="labelling-string-heading"
            class="swc-Heading swc-Heading--sizeXS"
            style="margin: 0 0 4px;"
          >
            Accessible name only
          </h4>
          <code style="font-size: 0.875rem;">
            accessible-label="Email address"
          </code>
        </div>
        <swc-text-field
          autocomplete="email"
          accessible-label="Email address"
          style="inline-size: 180px; max-inline-size: 100%;"
        ></swc-text-field>
      </section>
      <section
        aria-labelledby="labelling-slot-heading"
        style="display: grid; gap: 12px; min-inline-size: 0;"
      >
        <div>
          <h4
            id="labelling-slot-heading"
            class="swc-Heading swc-Heading--sizeXS"
            style="margin: 0 0 4px;"
          >
            Visible field label
          </h4>
          <code style="font-size: 0.875rem;">slot="label"</code>
        </div>
        <swc-text-field
          autocomplete="email"
          style="inline-size: 180px; max-inline-size: 100%;"
        >
          <span slot="label">Email address</span>
        </swc-text-field>
      </section>
    </div>
  `,
  tags: ['options'],
  parameters: {
    a11y: {
      // axe-core false positive: it can't read the `ariaLabelledByElements`
      // reflection LabellingMixin uses for `accessible-labelledby`, so it flags
      // a missing label that resolves fine in browsers/AT. See the forms-strategy
      // RFC axe-core policy (CONTRIBUTOR-DOCS, "3.4 axe-core policy").
      exclude: {
        label: [
          '#labelling-labelledby-field',
          '#labelling-billing-city',
          '#labelling-shipping-street',
          '#labelling-shipping-city',
        ],
      },
    },
  },
};

export const Sizes: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 20px; max-inline-size: 360px;"
    >
      <swc-text-field size="s" placeholder="Small placeholder">
        <span slot="label">Small</span>
        <span slot="description">Description for the small input.</span>
      </swc-text-field>
      <swc-text-field size="m" placeholder="Medium placeholder">
        <span slot="label">Medium</span>
        <span slot="description">Description for the medium input.</span>
      </swc-text-field>
      <swc-text-field size="l" placeholder="Large placeholder">
        <span slot="label">Large</span>
        <span slot="description">Description for the large input.</span>
      </swc-text-field>
      <swc-text-field size="xl" placeholder="Extra-large placeholder">
        <span slot="label">Extra-large</span>
        <span slot="description">Description for the extra-large input.</span>
      </swc-text-field>
    </div>
  `,
  tags: ['options'],
  parameters: {
    flexLayout: 'column-stretch',
    styles: {
      'inline-size': '220px',
    },
  },
};

export const LabelPositions: Story = {
  render: () => html`
    <swc-text-field label-position="top">
      <span slot="label">Label on top</span>
    </swc-text-field>
    <swc-text-field label-position="side">
      <span slot="label">Label on side</span>
    </swc-text-field>
  `,
  tags: ['options'],
  parameters: {
    flexLayout: 'column-stretch',
    styles: {
      'inline-size': '220px',
    },
  },
};
LabelPositions.storyName = 'Label positions';

export const NecessityIndicator: Story = {
  render: () => html`
    <swc-text-field required necessity-indicator="icon">
      <span slot="label">Email address</span>
    </swc-text-field>
    <swc-text-field required necessity-indicator="label">
      <span slot="label">Email address</span>
    </swc-text-field>
    <swc-text-field necessity-indicator="label">
      <span slot="label">Email address</span>
    </swc-text-field>
  `,
  tags: ['options'],
  parameters: {
    flexLayout: 'column-stretch',
    styles: {
      'inline-size': '220px',
    },
  },
};
NecessityIndicator.storyName = 'Necessity indicator';

export const Prefix: Story = {
  render: () => html`
    <swc-text-field placeholder="example.com">
      <span slot="label">URL</span>
      <span slot="prefix">https://</span>
    </swc-text-field>
    <swc-text-field placeholder="username">
      <span slot="label">Mention</span>
      <swc-icon-mention slot="prefix"></swc-icon-mention>
    </swc-text-field>
    <swc-text-field placeholder="contact@example.com">
      <span slot="label">User Email</span>
      <swc-avatar
        slot="prefix"
        src="./images/avatar-preview.png"
        alt=""
      ></swc-avatar>
    </swc-text-field>
  `,
  tags: ['options'],
  parameters: {
    flexLayout: 'column-stretch',
    styles: {
      'inline-size': '220px',
    },
  },
};

// ──────────────────────────
//    STATES STORIES
// ──────────────────────────

export const Default: Story = {
  args: {
    'label-slot': 'Full name',
  },
  tags: ['states'],
  parameters: {
    styles: { 'inline-size': '220px' },
  },
};

export const Required: Story = {
  args: {
    required: true,
    'label-slot': 'Full name',
  },
  tags: ['states'],
  parameters: {
    styles: { 'inline-size': '220px' },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'person@example.com',
    'label-slot': 'Email address',
  },
  tags: ['states'],
  parameters: {
    styles: { 'inline-size': '220px' },
  },
};

export const ReadOnly: Story = {
  args: {
    readonly: true,
    value: 'sam.rivera',
    'label-slot': 'Username',
  },
  tags: ['states'],
  parameters: {
    styles: { 'inline-size': '220px' },
  },
};
ReadOnly.storyName = 'Read-only';

export const Invalid: Story = {
  args: {
    invalid: true,
    autocomplete: 'email',
    'label-slot': 'Email address',
    'description-slot': "We'll never share your email.",
    'error-text-slot': 'Enter a valid email address.',
  },
  tags: ['states'],
  parameters: {
    styles: { 'inline-size': '220px' },
  },
};

export const DisabledInvalid: Story = {
  render: () => html`
    <swc-text-field autocomplete="email" disabled invalid value="not-an-email">
      <span slot="label">Email address</span>
      <span slot="description">We'll never share your email.</span>
      <span id="disabled-field-error" slot="error-text">
        Enter a valid email address.
      </span>
    </swc-text-field>
  `,
  tags: ['states'],
  parameters: {
    a11y: {
      // WCAG 1.4.3 exempts text that is part of an inactive UI component.
      // axe cannot infer that this slotted error text belongs to the
      // disabled custom element, so exclude only its color-contrast result.
      exclude: {
        'color-contrast': ['#disabled-field-error'],
      },
    },
    styles: {
      'inline-size': '220px',
    },
  },
};
DisabledInvalid.storyName = 'Disabled and invalid';

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

export const LabelOverflow: Story = {
  render: () => html`
    ${captioned(
      html`
        Top label in a 180px container
      `,
      html`
        <div style="inline-size: 180px;">
          <swc-text-field placeholder="My favorite book">
            <span slot="label">
              This top label wraps onto multiple lines instead of clipping
            </span>
          </swc-text-field>
        </div>
      `
    )}
    ${captioned(
      html`
        Side label with the default column cap
      `,
      html`
        <swc-text-field
          label-position="side"
          placeholder="My favorite book"
          style="inline-size: 260px;"
        >
          <span slot="label">
            This side label wraps within its column beside the input
          </span>
        </swc-text-field>
      `
    )}
    ${captioned(
      html`
        Side label with an 80px column cap
      `,
      html`
        <swc-text-field
          label-position="side"
          placeholder="My favorite book"
          style="inline-size: 260px; --swc-field-label-max-inline-size: 80px;"
        >
          <span slot="label">Tightly capped label wraps early</span>
        </swc-text-field>
      `
    )}
  `,
  tags: ['behaviors'],
  parameters: {
    flexLayout: 'column-stretch',
    styles: {
      'align-items': 'flex-start',
      gap: 'var(--swc-spacing-200)',
    },
  },
};
LabelOverflow.storyName = 'Label overflow';

// `novalidate` on the form (below) suppresses the native validation bubble, so
// submission no longer natively blocks on an invalid field either. Mirror that
// blocking decision here and surface it through the field's own invalid
// presentation (icon + error text) instead.
const handleSubmit = async (event: SubmitEvent): Promise<void> => {
  event.preventDefault();
  const form = event.currentTarget as HTMLFormElement;
  const field = form.querySelector('swc-text-field');
  const output = form.querySelector<HTMLOutputElement>('[data-form-data]');
  if (!field || !output) {
    return;
  }
  // Clear the demo's previous error before checking the current constraints.
  field.invalid = false;
  await field.updateComplete;
  field.invalid = !field.checkValidity();
  await field.updateComplete;
  updateValidity(form);
  if (field.invalid) {
    output.value = 'Submission blocked: the field is invalid.';
    return;
  }
  output.value = [...new FormData(form)]
    .map(([name, value]) => `${name}: ${value}`)
    .join('\n');
};

const updateValidity = (form: HTMLFormElement): void => {
  const field = form.querySelector('swc-text-field');
  const output = form.querySelector<HTMLOutputElement>('[data-validity]');
  if (field && output) {
    const fieldValid = field.checkValidity();
    const formValid = form.checkValidity();
    output.value = [
      `field.checkValidity(): ${fieldValid ? 'valid' : 'invalid'}`,
      `form.checkValidity(): ${formValid ? 'valid' : 'invalid'}`,
      field.validity.valueMissing ? 'validity.valueMissing: true' : '',
      field.validity.customError ? 'validity.customError: true' : '',
      field.validationMessage
        ? `validationMessage: ${field.validationMessage}`
        : '',
    ]
      .filter(Boolean)
      .join('\n');
  }
};

const showValidity = (event: Event): void => {
  const form = (event.currentTarget as HTMLElement).closest('form');
  if (form) {
    updateValidity(form);
  }
};

const toggleFieldsetDisabled = (event: Event): void => {
  const button = event.currentTarget as HTMLButtonElement;
  const fieldset = button.form?.querySelector('fieldset');
  if (fieldset) {
    fieldset.disabled = !fieldset.disabled;
    button.setAttribute('aria-pressed', String(fieldset.disabled));
  }
};

export const FormBehavior: Story = {
  render: () => html`
    <form
      novalidate
      aria-labelledby="form-participation-heading"
      style="display: flex; flex-direction: column; gap: 24px; inline-size: 100%; max-inline-size: 26rem;"
      @submit=${handleSubmit}
    >
      <h2
        id="form-participation-heading"
        class="swc-Heading swc-Heading--sizeM"
        style="margin: 0;"
      >
        Form participation
      </h2>
      <fieldset
        style="margin: 0; min-inline-size: 0; padding: 16px; border: 1px solid var(--swc-gray-300); border-radius: var(--swc-corner-radius-100);"
      >
        <legend class="swc-Heading swc-Heading--sizeXS">Account details</legend>
        <swc-text-field name="username" required>
          <span slot="label">Username</span>
          <span slot="error-text">Enter a username.</span>
        </swc-text-field>
      </fieldset>
      <section
        aria-labelledby="form-actions-heading"
        style="display: flex; flex-direction: column; align-items: flex-start; gap: 12px;"
      >
        <h3
          id="form-actions-heading"
          class="swc-Heading swc-Heading--sizeXS"
          style="margin: 0;"
        >
          Form actions
        </h3>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          <button type="submit" class="swc-Button">
            <span class="swc-Button-label">Submit</span>
          </button>
          <button type="reset" class="swc-Button swc-Button--secondary">
            <span class="swc-Button-label">Reset</span>
          </button>
          <button
            type="button"
            class="swc-Button swc-Button--secondary"
            @click=${showValidity}
          >
            <span class="swc-Button-label">Check validity</span>
          </button>
        </div>
        <button
          type="button"
          class="swc-Button swc-Button--secondary"
          data-toggle-fieldset
          aria-pressed="false"
          @click=${toggleFieldsetDisabled}
        >
          <span class="swc-Button-label">Disable</span>
        </button>
      </section>
      <section
        aria-labelledby="submitted-form-data-label"
        style="display: flex; flex-direction: column; gap: 12px;"
      >
        <h3
          id="submitted-form-data-label"
          class="swc-Heading swc-Heading--sizeXS"
          style="margin: 0;"
        >
          Last submission
        </h3>
        <output
          data-form-data
          aria-live="polite"
          style="display: block; min-block-size: 2lh; padding: 12px; border-radius: var(--swc-corner-radius-100); background: var(--swc-background-layer-1-color); font-family: monospace; font-size: 0.875rem; white-space: pre-wrap; overflow-wrap: anywhere;"
          .defaultValue=${'Submit the form to see its data.'}
        ></output>
      </section>
      <section
        aria-labelledby="validity-label"
        style="display: flex; flex-direction: column; gap: 12px;"
      >
        <h3
          id="validity-label"
          class="swc-Heading swc-Heading--sizeXS"
          style="margin: 0;"
        >
          Latest validation result
        </h3>
        <output
          data-validity
          aria-live="polite"
          style="display: block; min-block-size: 2lh; padding: 12px; border-radius: var(--swc-corner-radius-100); background: var(--swc-background-layer-1-color); font-family: monospace; font-size: 0.875rem; white-space: pre-wrap; overflow-wrap: anywhere;"
          .defaultValue=${'Submit or click Check validity to inspect the field and form validity.'}
        ></output>
        <p style="margin: 0;">
          Inline error text is supplied by the application.
          <code>validationMessage</code>
          comes from native validation or a custom error.
        </p>
      </section>
    </form>
  `,
  tags: ['behaviors'],
};
FormBehavior.storyName = 'Form participation';

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = {
  render: () => {
    // Muted captions so each external describedby element reads as part of its
    // own example.
    const caption =
      'margin-block-end: 8px; font-size: 0.75rem; color: #6e6e6e;';
    return html`
      <div
        style="display: flex; flex-direction: column; gap: 24px; max-inline-size: 44ch;"
      >
        <div>
          <div style=${caption}>
            Slotted
            <code>description</code>
          </div>
          <swc-text-field accessible-label="Comments">
            <span slot="description">Optional; visible to your team only.</span>
          </swc-text-field>
        </div>

        <div>
          <div style=${caption}>
            <code>accessible-describedby</code>
            : described by another element
          </div>
          <p
            id="accessibility-external-description"
            style="margin-block: 0 8px;"
          >
            Describe the issue in as much detail as possible.
          </p>
          <swc-text-field
            accessible-label="Issue details"
            accessible-describedby="accessibility-external-description"
          ></swc-text-field>
        </div>
      </div>
    `;
  },
  tags: ['a11y'],
};
