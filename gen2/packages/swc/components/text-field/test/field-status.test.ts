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
import { expect } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import type { TextField } from '@adobe/spectrum-wc/text-field';

import '@adobe/spectrum-wc/components/text-field/swc-text-field.js';

import {
  fixture,
  getComponent,
  withWarningSpy,
} from '../../../utils/test-utils.js';

export default {
  title: 'Text field/Field status tests',
  component: 'swc-text-field',
  parameters: { docs: { disable: true, page: null } },
  tags: ['!autodocs', 'dev'],
} satisfies Meta;

export const StatusTransitions: Story = {
  render: () => html`
    <form>
      <swc-text-field name="username" value="alex" required>
        <span slot="label">Username</span>
        <span slot="description">Choose a username.</span>
        <span slot="error-text">This username is unavailable.</span>
      </swc-text-field>
    </form>
  `,
  play: async ({ canvasElement, step }) => {
    const field = await getComponent<TextField>(
      canvasElement,
      'swc-text-field'
    );
    const form = canvasElement.querySelector('form');
    const input = field.roleElement;
    if (!form || !input) {
      throw new Error('Field status test requires a form and input');
    }

    await step(
      'untouched status is undefined with no legacy properties',
      () => {
        expect(field.fieldStatus).toBeUndefined();
        expect(field).not.toHaveAttribute('field-status');
        for (const property of ['disabled', 'readonly', 'invalid', 'valid']) {
          expect(
            property in field,
            `${property} is not a public property`
          ).toBe(false);
        }
      }
    );

    await step('each status replaces the previous authored state', async () => {
      const statuses = [
        'invalid',
        'disabled',
        'readonly',
        'valid',
        undefined,
      ] as const;
      for (const previous of statuses) {
        for (const status of statuses) {
          field.fieldStatus = previous;
          await field.updateComplete;
          field.fieldStatus = status;
          await field.updateComplete;

          expect(field.getAttribute('field-status')).toBe(status ?? null);
          expect(input.disabled).toBe(status === 'disabled');
          expect(input.readOnly).toBe(status === 'readonly');
          expect(field.required).toBe(true);
          expect(input.required).toBe(true);
          expect(field.hasAttribute('disabled')).toBe(status === 'disabled');
          expect(field.hasAttribute('readonly')).toBe(status === 'readonly');
          expect(field.matches(':disabled')).toBe(status === 'disabled');
          expect(field.willValidate).toBe(
            status !== 'disabled' && status !== 'readonly'
          );
          expect(new FormData(form).has('username')).toBe(
            status !== 'disabled'
          );
          expect(input.getAttribute('aria-invalid')).toBe(
            status === 'invalid' ? 'true' : null
          );
          expect(field.validity.customError).toBe(status === 'invalid');
          expect(field.checkValidity()).toBe(status !== 'invalid');
          expect(
            field.shadowRoot?.querySelector('.swc-FormFieldErrorText') !== null
          ).toBe(status === 'invalid');
          expect(
            field.shadowRoot?.querySelector('.swc-TextField-invalidIcon') !==
              null
          ).toBe(status === 'invalid');
          expect(input.ariaDescribedByElements?.[0]).toHaveClass(
            status === 'invalid'
              ? 'swc-FormFieldErrorText'
              : 'swc-FormFieldDescription'
          );
        }
      }
    });

    await step(
      'removing the attribute restores undefined and native eligibility',
      async () => {
        field.setAttribute('field-status', 'readonly');
        await field.updateComplete;
        expect(field.fieldStatus).toBe('readonly');
        expect(field.willValidate).toBe(false);
        field.removeAttribute('field-status');
        await field.updateComplete;
        expect(field.fieldStatus).toBeUndefined();
        expect(input.readOnly).toBe(false);
        expect(field).not.toHaveAttribute('readonly');
        expect(field.willValidate).toBe(true);
      }
    );
  },
};
StatusTransitions.storyName = 'Exclusive status transitions';

export const InvalidWithoutErrorText: Story = {
  render: () => html`
    <swc-text-field value="alex">
      <span slot="label">Username</span>
      <span slot="description">Choose a username.</span>
    </swc-text-field>
  `,
  play: async ({ canvasElement }) => {
    const field = await getComponent<TextField>(
      canvasElement,
      'swc-text-field'
    );

    field.fieldStatus = 'invalid';
    await field.updateComplete;
    expect(
      field.shadowRoot?.querySelector('.swc-FormFieldDescription')
    ).toBeNull();
    expect(
      field.shadowRoot?.querySelector('.swc-FormFieldErrorText')
    ).toBeNull();
    expect(field.roleElement?.ariaDescribedByElements ?? []).toHaveLength(0);
    expect(field.roleElement).toHaveAttribute('aria-invalid', 'true');
    expect(
      field.shadowRoot?.querySelector('.swc-TextField-invalidIcon')
    ).toHaveAttribute('aria-hidden', 'true');
    expect(field.checkValidity()).toBe(false);
  },
};
InvalidWithoutErrorText.storyName = 'Invalid without error text';

export const ValidationSources: Story = {
  ...StatusTransitions,
  play: async ({ canvasElement, step }) => {
    const field = await getComponent<TextField>(
      canvasElement,
      'swc-text-field'
    );
    await step('slotted messages apply only while invalid', async () => {
      for (const status of [
        'invalid',
        'disabled',
        'readonly',
        'valid',
        undefined,
      ] as const) {
        field.fieldStatus = status;
        await field.updateComplete;
        expect(field.validity.customError).toBe(status === 'invalid');
        expect(field.checkValidity()).toBe(status !== 'invalid');
        if (field.willValidate) {
          expect(field.validationMessage).toBe(
            status === 'invalid' ? 'This username is unavailable.' : ''
          );
        }
        expect(field.roleElement?.getAttribute('aria-invalid')).toBe(
          status === 'invalid' ? 'true' : null
        );
      }
      expect(field.checkValidity()).toBe(true);
    });

    await step(
      'authored valid does not bypass native required validation',
      async () => {
        field.fieldStatus = 'valid';
        field.value = '';
        await field.updateComplete;
        expect(field.validity.valueMissing).toBe(true);
        expect(field.checkValidity()).toBe(false);
        expect(field.fieldStatus).toBe('valid');
        expect(field.roleElement).not.toHaveAttribute('aria-invalid');
      }
    );
  },
};
ValidationSources.storyName = 'Status and independent validation sources';

export const BarredNativeConstraints: Story = {
  render: () => html`
    <form>
      <fieldset>
        <swc-text-field name="email" type="email" value="not-an-email">
          <span slot="label">Email</span>
        </swc-text-field>
      </fieldset>
    </form>
  `,
  play: async ({ canvasElement, step }) => {
    const field = await getComponent<TextField>(
      canvasElement,
      'swc-text-field'
    );
    const form = canvasElement.querySelector('form');
    const fieldset = canvasElement.querySelector('fieldset');
    const input = field.roleElement;
    if (!form || !fieldset || !input) {
      throw new Error(
        'Native constraint test requires a form, fieldset, and input'
      );
    }

    expect(field.validity.typeMismatch).toBe(true);
    expect(field.checkValidity()).toBe(false);

    for (const status of ['disabled', 'readonly'] as const) {
      await step(`${status} suspends native constraint errors`, async () => {
        field.fieldStatus = status;
        await field.updateComplete;
        expect(input.validity.typeMismatch).toBe(true);
        expect(input.validationMessage).toBe('');
        expect(field.validity.valid).toBe(true);
        expect(field.willValidate).toBe(false);
        expect(field.checkValidity()).toBe(true);
        expect(form.checkValidity()).toBe(true);

        field.fieldStatus = undefined;
        await field.updateComplete;
        expect(field.willValidate).toBe(true);
        expect(field.validity.typeMismatch).toBe(true);
        expect(field.validity.customError).toBe(false);
        expect(field.validity.typeMismatch).toBe(true);
        expect(field.checkValidity()).toBe(false);
        expect(form.checkValidity()).toBe(false);
      });
    }

    await step(
      'inherited fieldset disabling suspends native errors',
      async () => {
        fieldset.disabled = true;
        await field.updateComplete;
        expect(input.disabled).toBe(true);
        expect(field.validity.valid).toBe(true);
        expect(field.checkValidity()).toBe(true);
        expect(form.checkValidity()).toBe(true);
        fieldset.disabled = false;
        await field.updateComplete;
        expect(field.willValidate).toBe(true);
        expect(field.validity.typeMismatch).toBe(true);
        expect(field.checkValidity()).toBe(false);
        expect(form.checkValidity()).toBe(false);
      }
    );
  },
};
BarredNativeConstraints.storyName = 'Disabled and read-only native constraints';

export const StatusWarnings: Story = {
  render: () => html`
    <span></span>
  `,
  play: async ({ step }) => {
    await step('undefined is accepted without a warning', () =>
      withWarningSpy(async (calls) => {
        const field = await fixture<TextField>(html`
          <swc-text-field accessible-label="Username"></swc-text-field>
        `);
        try {
          expect(calls).toHaveLength(0);
        } finally {
          field.remove();
        }
      })
    );
    await step('unsupported authored status produces an enum warning', () =>
      withWarningSpy(async (calls) => {
        const field = await fixture<TextField>(html`
          <!-- @ts-ignore: Intentionally unsupported status tests the enum warning. -->
          <swc-text-field
            accessible-label="Username"
            field-status="unsupported"
          ></swc-text-field>
        `);
        try {
          expect(
            calls.some((call) => String(call[1]).includes('field-status'))
          ).toBe(true);
          expect(field.roleElement).not.toHaveAttribute('aria-invalid');
        } finally {
          field.remove();
        }
      })
    );
  },
};
StatusWarnings.storyName = 'Status validation warnings';
