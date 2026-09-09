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

import { TextField } from '@adobe/spectrum-wc/text-field';

import '@adobe/spectrum-wc/components/text-field/swc-text-field.js';

import { getComponent, getComponents } from '../../../utils/test-utils.js';
import meta from '../stories/text-field.stories.js';
import { Accessibility, States } from '../stories/text-field.stories.js';

// This file defines dev-only test stories that reuse the main story metadata.
export default {
  ...meta,
  title: 'Text field/Tests',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

// ──────────────────────────────────────────────────────────────
// TEST: Invalid state wires description + error text
// ──────────────────────────────────────────────────────────────

export const StatesTest: Story = {
  ...States,
  play: async ({ canvasElement, step }) => {
    const fields = await getComponents<TextField>(
      canvasElement,
      'swc-text-field'
    );
    const invalidField = fields[fields.length - 1];
    const input = invalidField.shadowRoot?.querySelector('input');

    await step('invalid input carries aria-invalid', () => {
      expect(input?.getAttribute('aria-invalid')).toBe('true');
    });

    await step(
      'error text is folded into ariaDescribedByElements, after the description',
      () => {
        const resolved = input?.ariaDescribedByElements ?? [];
        expect(resolved).toHaveLength(2);
        expect(resolved[0]?.className).toContain('swc-FieldDescription');
        expect(resolved[1]?.className).toContain('swc-FieldErrorText');
      }
    );

    await step('required is reflected onto the native input', () => {
      const requiredField = fields[1];
      const requiredInput = requiredField.shadowRoot?.querySelector('input');
      expect(requiredInput?.required).toBe(true);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: accessible-describedby combines with a slotted description
// ──────────────────────────────────────────────────────────────

export const AccessibilityTest: Story = {
  ...Accessibility,
  play: async ({ canvasElement, step }) => {
    const fields = await getComponents<TextField>(
      canvasElement,
      'swc-text-field'
    );
    const externallyDescribed = fields[1];
    const input = externallyDescribed.shadowRoot?.querySelector('input');

    await step('accessible-describedby resolves the external paragraph', () => {
      const resolved = input?.ariaDescribedByElements ?? [];
      expect(resolved).toHaveLength(1);
      expect(resolved[0]?.id).toBe('accessibility-external-description');
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Form participation via FieldAssociationController
// ──────────────────────────────────────────────────────────────

export const FormParticipationTest: Story = {
  render: () => html`
    <form>
      <swc-text-field
        name="username"
        value="Example"
        accessible-label="Username"
      ></swc-text-field>
    </form>
  `,
  play: async ({ canvasElement, step }) => {
    const field = await getComponent<TextField>(
      canvasElement,
      'swc-text-field'
    );
    const form = canvasElement.querySelector('form');
    if (!form) {
      throw new Error('form not found');
    }

    await step('value participates in FormData', () => {
      expect(new FormData(form).get('username')).toBe('Example');
      expect(field.form, 'form pass-through resolves to the owning form').toBe(
        form
      );
    });

    await step('disabling excludes it, re-enabling recovers', async () => {
      field.disabled = true;
      await field.updateComplete;
      expect(new FormData(form).has('username')).toBe(false);
      field.disabled = false;
      await field.updateComplete;
      expect(new FormData(form).get('username')).toBe('Example');
    });

    await step(
      'native reset restores the value attribute default',
      async () => {
        field.value = 'Updated';
        await field.updateComplete;
        expect(new FormData(form).get('username')).toBe('Updated');
        form.reset();
        await field.updateComplete;
        expect(field.value, 'value restored to the initial attribute').toBe(
          'Example'
        );
        expect(new FormData(form).get('username')).toBe('Example');
      }
    );
  },
};
FormParticipationTest.storyName = 'Form participation';

export const DisabledStateTest: Story = {
  render: () => html`
    <form>
      <fieldset>
        <swc-text-field
          name="username"
          value="Example"
          accessible-label="Username"
        ></swc-text-field>
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
    if (!form || !fieldset) {
      throw new Error('form or fieldset not found');
    }

    await step('enabled: no disabled state, value participates', () => {
      expect(field.matches(':state(disabled)'), 'no disabled state').toBe(
        false
      );
      expect(new FormData(form).get('username')).toBe('Example');
    });

    await step('own disabled sets the custom state', async () => {
      field.disabled = true;
      await field.updateComplete;
      expect(
        field.matches(':state(disabled)'),
        'own disabled sets :state(disabled)'
      ).toBe(true);
      expect(new FormData(form).has('username')).toBe(false);
      field.disabled = false;
      await field.updateComplete;
    });

    await step(
      'cascaded <fieldset disabled> sets the state on the host',
      async () => {
        fieldset.disabled = true;
        await field.updateComplete;
        expect(
          field.matches(':state(disabled)'),
          'cascade sets :state(disabled) without the host property'
        ).toBe(true);
        expect(
          field.disabled,
          'the public property stays false under the cascade'
        ).toBe(false);
        expect(
          field.shadowRoot?.querySelector('input')?.disabled,
          'inner input is disabled'
        ).toBe(true);
        expect(
          new FormData(form).has('username'),
          'excluded while cascaded'
        ).toBe(false);

        fieldset.disabled = false;
        await field.updateComplete;
        expect(
          field.matches(':state(disabled)'),
          'state clears when re-enabled'
        ).toBe(false);
        expect(new FormData(form).get('username')).toBe('Example');
      }
    );
  },
};
DisabledStateTest.storyName = 'Disabled state';

export const ChangeEventTest: Story = {
  render: () => html`
    <swc-text-field accessible-label="Username"></swc-text-field>
  `,
  play: async ({ canvasElement, step }) => {
    const field = await getComponent<TextField>(
      canvasElement,
      'swc-text-field'
    );

    await step('change re-dispatches across the shadow boundary', () => {
      // Native change is composed:false and would never reach a host listener.
      let heard = false;
      field.addEventListener('change', () => (heard = true));
      const input = field.shadowRoot?.querySelector('input');
      input?.dispatchEvent(new Event('change'));
      expect(heard, 'host emits a change event').toBe(true);
    });
  },
};
ChangeEventTest.storyName = 'Change event';
