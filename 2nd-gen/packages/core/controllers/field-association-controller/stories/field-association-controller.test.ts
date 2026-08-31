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

/**
 * These Storybook play tests exercise `FieldAssociationController` through the
 * three throwaway harnesses (`demo-field-text`, `demo-field-radio`,
 * `demo-field-combobox`), so a failure isolates to the controller rather than a
 * full `swc-*` component. Values are read back through the native
 * `new FormData(form)`, which includes form-associated custom elements.
 */

import { expect } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import './demo-hosts.js';

import type {
  DemoFieldCombobox,
  DemoFieldHostBase,
  DemoFieldRadio,
  DemoFieldText,
} from './demo-hosts.js';
import fieldMeta, {
  DefaultValueReset,
  DisabledCascade,
  Exclusion,
  FormValue,
  Validity,
} from './field-association-controller.stories.js';

// ─────────────────────────
//     HELPERS
// ─────────────────────────

/** Resolves the form and requires it to exist. */
function getForm(canvasElement: HTMLElement): HTMLFormElement {
  const form = canvasElement.querySelector('form');
  if (!form) {
    throw new Error('form not found');
  }
  return form;
}

/** Requires a harness of the given tag inside the form. */
function getHost<T extends DemoFieldHostBase>(
  form: HTMLFormElement,
  tag: string
): T {
  const host = form.querySelector<T>(tag);
  if (!host) {
    throw new Error(`${tag} not found`);
  }
  return host;
}

// ─────────────────────────
//     META
// ─────────────────────────

export default {
  ...fieldMeta,
  title: 'Controllers/Field association controller/Tests',
  parameters: {
    ...fieldMeta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

// ──────────────────────────────────────────────────────────────────────────
//     A non-null value is included in FormData
// ──────────────────────────────────────────────────────────────────────────

export const FormValueTest: Story = {
  ...FormValue,
  play: async ({ canvasElement, step }) => {
    const form = getForm(canvasElement);
    const host = getHost<DemoFieldText>(form, 'demo-field-text');
    await host.updateComplete;

    await step('the value is submitted under the field name', () => {
      expect(new FormData(form).get('username')).toBe('Example');
    });

    await step('form and willValidate pass through to the host', () => {
      expect(host.form, 'form resolves to the owning form').toBe(form);
      expect(host.willValidate, 'the field is validation-eligible').toBe(true);
    });
  },
};
FormValueTest.storyName = 'Form value included (test)';

// ──────────────────────────────────────────────────────────────────────────
//     setValue(null) excludes an unselected field
// ──────────────────────────────────────────────────────────────────────────

export const ExclusionTest: Story = {
  ...Exclusion,
  play: async ({ canvasElement, step }) => {
    const form = getForm(canvasElement);
    const host = getHost<DemoFieldCombobox>(form, 'demo-field-combobox');
    await host.updateComplete;

    await step('unselected combobox is excluded from FormData', () => {
      expect(new FormData(form).has('color')).toBe(false);
    });

    await step('selecting a value includes it', async () => {
      host.value = 'Red';
      await host.updateComplete;
      expect(new FormData(form).get('color')).toBe('Red');
    });
  },
};
ExclusionTest.storyName = 'Excluded when unselected (test)';

// ──────────────────────────────────────────────────────────────────────────
//     defaultValue restores on formResetCallback
// ──────────────────────────────────────────────────────────────────────────

export const DefaultValueResetTest: Story = {
  ...DefaultValueReset,
  play: async ({ canvasElement, step }) => {
    const form = getForm(canvasElement);
    const host = getHost<DemoFieldText>(form, 'demo-field-text');
    await host.updateComplete;

    await step('a changed value is submitted', async () => {
      host.value = 'Updated';
      await host.updateComplete;
      expect(new FormData(form).get('nickname')).toBe('Updated');
    });

    await step(
      'native reset restores the value attribute default',
      async () => {
        form.reset();
        await host.updateComplete;
        expect(host.value, 'value restored to the initial attribute').toBe(
          'Example'
        );
        expect(new FormData(form).get('nickname')).toBe('Example');
      }
    );
  },
};
DefaultValueResetTest.storyName = 'Default value restored on reset (test)';

// ──────────────────────────────────────────────────────────────────────────
//     <fieldset disabled> cascades and fires onDisabledChange once per change
// ──────────────────────────────────────────────────────────────────────────

export const DisabledCascadeTest: Story = {
  ...DisabledCascade,
  play: async ({ canvasElement, step }) => {
    const form = getForm(canvasElement);
    const fieldset = form.querySelector('fieldset');
    if (!fieldset) {
      throw new Error('fieldset not found');
    }
    const textHost = getHost<DemoFieldText>(form, 'demo-field-text');
    const radioHost = getHost<DemoFieldRadio>(form, 'demo-field-radio');
    await textHost.updateComplete;
    await radioHost.updateComplete;

    await step('both fields participate before disabling', () => {
      const data = new FormData(form);
      expect(data.get('first')).toBe('Example');
      expect(data.get('subscribe')).toBe('yes');
    });

    await step(
      'disabling the fieldset cascades, fires once, and excludes both',
      async () => {
        fieldset.disabled = true;
        await textHost.updateComplete;
        await radioHost.updateComplete;

        expect(textHost.disabledChangeCount, 'text cascade fired once').toBe(1);
        expect(radioHost.disabledChangeCount, 'radio cascade fired once').toBe(
          1
        );
        expect(
          textHost.shadowRoot?.querySelector('input')?.disabled,
          'inner text control is disabled'
        ).toBe(true);

        const data = new FormData(form);
        expect(data.has('first'), 'text excluded while disabled').toBe(false);
        expect(data.has('subscribe'), 'radio excluded while disabled').toBe(
          false
        );
      }
    );

    await step(
      're-enabling recovers participation and fires once more',
      async () => {
        fieldset.disabled = false;
        await textHost.updateComplete;
        await radioHost.updateComplete;

        expect(textHost.disabledChangeCount, 'text cascade fired again').toBe(
          2
        );
        expect(radioHost.disabledChangeCount, 'radio cascade fired again').toBe(
          2
        );

        const data = new FormData(form);
        expect(data.get('first')).toBe('Example');
        expect(data.get('subscribe')).toBe('yes');
      }
    );
  },
};
DisabledCascadeTest.storyName = 'Disabled cascade (test)';

// ──────────────────────────────────────────────────────────────────────────
//     validity, validationMessage, checkValidity pass through to internals
// ──────────────────────────────────────────────────────────────────────────

export const ValidityTest: Story = {
  ...Validity,
  play: async ({ canvasElement, step }) => {
    const form = getForm(canvasElement);
    const host = getHost<DemoFieldText>(form, 'demo-field-text');
    await host.updateComplete;
    const input = host.shadowRoot?.querySelector('input');
    if (!input) {
      throw new Error('inner input not found');
    }

    await step(
      'required-but-empty is invalid through the pass-throughs',
      () => {
        expect(host.willValidate, 'field is validation-eligible').toBe(true);
        expect(host.checkValidity(), 'checkValidity reflects invalid').toBe(
          false
        );
        expect(host.validity.valid, 'validity.valid is false').toBe(false);
        expect(host.validity.valueMissing, 'valueMissing is true').toBe(true);
        expect(
          host.validity.valueMissing,
          'host validity matches the inner control'
        ).toBe(input.validity.valueMissing);
        expect(
          host.validationMessage.length,
          'validationMessage is non-empty'
        ).toBeGreaterThan(0);
      }
    );

    await step('a valid value clears the invalid state', async () => {
      host.value = 'ada@example.com';
      await host.updateComplete;
      expect(host.checkValidity(), 'checkValidity reflects valid').toBe(true);
      expect(host.validity.valid, 'validity.valid is true').toBe(true);
      expect(host.reportValidity(), 'reportValidity passes through').toBe(true);
    });
  },
};
ValidityTest.storyName = 'Validity pass-throughs (test)';
