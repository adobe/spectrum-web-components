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
import { expect, userEvent, waitFor } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import { getComponent, getComponents } from '@swc-test-helpers/dom';

import type { Checkbox } from '@adobe/spectrum-wc/checkbox';

import '@adobe/spectrum-wc/components/checkbox/swc-checkbox.js';

import { FormParticipation } from '../stories/checkbox.stories.js';

export default {
  title: 'Checkbox/Form tests',
  component: 'swc-checkbox',
  parameters: { docs: { disable: true, page: null } },
  tags: ['!autodocs', 'dev'],
} satisfies Meta;

function formOf(
  canvasElement: HTMLElement,
  selector = 'form'
): HTMLFormElement {
  const form = canvasElement.querySelector<HTMLFormElement>(selector);
  if (!form) {
    throw new Error('Test requires a form');
  }
  return form;
}

function inputOf(checkbox: Checkbox): HTMLInputElement {
  const input = checkbox.shadowRoot?.querySelector('input');
  if (!input) {
    throw new Error('swc-checkbox rendered no input');
  }
  return input;
}

function elementOf<T extends Element>(root: ParentNode, selector: string): T {
  const element = root.querySelector<T>(selector);
  if (!element) {
    throw new Error(`Test requires ${selector}`);
  }
  return element;
}

/** Cancels each submit, so the page does not navigate, and records its submitter. */
function recordSubmits(form: HTMLFormElement): (HTMLElement | null)[] {
  const submitters: (HTMLElement | null)[] = [];
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    submitters.push(event.submitter);
  });
  return submitters;
}

/** Dispatches a synthetic keydown on the checkbox's inner input. */
function pressKey(
  checkbox: Checkbox,
  init: KeyboardEventInit,
  keyCode?: number
): KeyboardEvent {
  const event = new KeyboardEvent('keydown', {
    bubbles: true,
    composed: true,
    cancelable: true,
    ...init,
  });
  if (keyCode !== undefined) {
    Object.defineProperty(event, 'keyCode', { value: keyCode });
  }
  inputOf(checkbox).dispatchEvent(event);
  return event;
}

// ──────────────────────────────────────────────────────────────
// TEST: Defaults
// ──────────────────────────────────────────────────────────────

export const FormDefaultsTest: Story = {
  render: () => html`
    <form>
      <swc-checkbox name="updates">
        <span slot="label">Send me product updates</span>
      </swc-checkbox>
    </form>
    <swc-checkbox name="standalone">
      <span slot="label">Standalone</span>
    </swc-checkbox>
  `,
  play: async ({ canvasElement, step }) => {
    const form = formOf(canvasElement);
    const [inForm, standalone] = await getComponents<Checkbox>(
      canvasElement,
      'swc-checkbox'
    );

    await step('associates the checkbox with its ancestor form', () => {
      expect(inForm.form, 'form of a checkbox inside a form').toBe(form);
      expect(standalone.form, 'form of a checkbox outside any form').toBe(null);
    });

    await step('renders unchecked with the default value "on"', () => {
      expect(inForm.checked, 'default checked').toBe(false);
      expect(inForm.value, 'default value').toBe('on');
      expect(inForm.required, 'default required').toBe(false);
      expect(
        [...new FormData(form).entries()],
        'form entries of an unchecked checkbox'
      ).toEqual([]);
    });

    await step('starts valid and participating in validation', () => {
      expect(inForm.willValidate, 'default willValidate').toBe(true);
      expect(inForm.validity.valid, 'default validity').toBe(true);
      expect(inForm.validationMessage, 'default validation message').toBe('');
      expect(inForm.checkValidity(), 'default checkValidity result').toBe(true);
    });
  },
};
FormDefaultsTest.storyName = 'Form defaults';

export const PreRenderValidityTest: Story = {
  render: () => html`
    <form></form>
  `,
  play: async ({ canvasElement, step }) => {
    const form = formOf(canvasElement);
    let submits = 0;
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      submits += 1;
    });

    await step('reports valueMissing before the first render', () => {
      const checkbox = document.createElement('swc-checkbox');
      checkbox.setAttribute('name', 'terms');
      checkbox.setAttribute('required', '');
      form.append(checkbox);
      expect(
        checkbox.validity.valueMissing,
        'valueMissing before the first render'
      ).toBe(true);
      expect(
        checkbox.validationMessage,
        'validation message before the first render'
      ).not.toBe('');
      form.requestSubmit();
      expect(submits, 'submits blocked before the first render').toBe(0);
    });
  },
};
PreRenderValidityTest.storyName = 'Validity before the first render';

// ──────────────────────────────────────────────────────────────
// TEST: Properties / Attributes
// ──────────────────────────────────────────────────────────────

export const FormValueTest: Story = {
  render: () => html`
    <form>
      <swc-checkbox name="updates">
        <span slot="label">Updates</span>
      </swc-checkbox>
      <swc-checkbox name="topic" value="news" checked>
        <span slot="label">News</span>
      </swc-checkbox>
      <swc-checkbox name="topic" value="events">
        <span slot="label">Events</span>
      </swc-checkbox>
      <swc-checkbox name="topic" value="tips" checked>
        <span slot="label">Tips</span>
      </swc-checkbox>
    </form>
  `,
  play: async ({ canvasElement, step }) => {
    const form = formOf(canvasElement);
    const [updates, news] = await getComponents<Checkbox>(
      canvasElement,
      'swc-checkbox'
    );

    await step('associates each checkbox with the form', () => {
      expect(updates.form, 'associated form').toBe(form);
    });

    await step('contributes nothing while unchecked', () => {
      expect(
        new FormData(form).has('updates'),
        'form entry of an unchecked checkbox'
      ).toBe(false);
    });

    await step(
      'submits name=value when checked, with "on" by default',
      async () => {
        inputOf(updates).click();
        await updates.updateComplete;
        expect(
          new FormData(form).get('updates'),
          'default submitted value'
        ).toBe('on');
      }
    );

    await step(
      'exposes the current form value to change listeners',
      async () => {
        let seen: string | null | undefined;
        updates.addEventListener(
          'change',
          () => {
            seen = new FormData(form).get('updates') as string | null;
          },
          { once: true }
        );
        inputOf(updates).click();
        expect(
          seen,
          'form value seen by a change listener after unchecking'
        ).toBe(null);
        inputOf(updates).click();
        await updates.updateComplete;
        expect(
          new FormData(form).get('updates'),
          'form value after checking again'
        ).toBe('on');
      }
    );

    await step('submits each same-name checkbox value in order', () => {
      expect(
        new FormData(form).getAll('topic'),
        'same-name entries in document order'
      ).toEqual(['news', 'tips']);
    });

    await step('updates the submitted value when value changes', async () => {
      news.value = 'headlines';
      await news.updateComplete;
      expect(
        new FormData(form).getAll('topic'),
        'entries after a value change'
      ).toEqual(['headlines', 'tips']);
    });

    await step(
      'falls back to "on" when the value attribute is removed',
      async () => {
        news.removeAttribute('value');
        await news.updateComplete;
        expect(news.value, 'value without a value attribute').toBe('on');
        expect(news, 'value attribute after removal').not.toHaveAttribute(
          'value'
        );
        expect(
          new FormData(form).getAll('topic'),
          'entries without a value attribute'
        ).toEqual(['on', 'tips']);
        news.setAttribute('value', 'news');
        await news.updateComplete;
        expect(
          new FormData(form).getAll('topic'),
          'entries after restoring the value attribute'
        ).toEqual(['news', 'tips']);
      }
    );

    await step(
      'reflects and converts value like a native checkbox',
      async () => {
        expect(
          updates,
          'value attribute of the default value'
        ).not.toHaveAttribute('value');
        news.value = 'headlines';
        expect(
          new FormData(form).getAll('topic'),
          'entries right after a value change'
        ).toEqual(['headlines', 'tips']);
        await news.updateComplete;
        expect(news, 'reflected value attribute').toHaveAttribute(
          'value',
          'headlines'
        );
        const loose = news as unknown as { value: unknown };
        loose.value = null;
        expect(news.value, 'value after setting null').toBe('');
        expect(
          new FormData(form).getAll('topic'),
          'entries after setting value to null'
        ).toEqual(['', 'tips']);
        news.value = 'news';
        await news.updateComplete;
        expect(
          new FormData(form).getAll('topic'),
          'entries after restoring the value'
        ).toEqual(['news', 'tips']);
      }
    );

    await step('keeps the form value when indeterminate', async () => {
      news.indeterminate = true;
      await news.updateComplete;
      expect(
        new FormData(form).getAll('topic'),
        'entries while indeterminate'
      ).toEqual(['news', 'tips']);
    });
  },
};
FormValueTest.storyName = 'Form value';

export const ValueAttributeTest: Story = {
  render: () => html`
    <form>
      <swc-checkbox name="empty" value="" checked>
        <span slot="label">Empty</span>
      </swc-checkbox>
      <swc-checkbox name="plain" checked>
        <span slot="label">Plain</span>
      </swc-checkbox>
    </form>
  `,
  play: async ({ canvasElement, step }) => {
    const form = formOf(canvasElement);
    const [, plain] = await getComponents<Checkbox>(
      canvasElement,
      'swc-checkbox'
    );

    await step('submits an empty string for an empty value attribute', () => {
      expect(
        new FormData(form).get('empty'),
        'entry for an empty value attribute'
      ).toBe('');
    });

    await step('writes the attribute when value is set to "on"', async () => {
      plain.value = 'on';
      await plain.updateComplete;
      expect(plain, 'value attribute after setting "on"').toHaveAttribute(
        'value',
        'on'
      );
    });

    await step(
      'prefers a property set before the first update over the attribute',
      async () => {
        const early = document.createElement('swc-checkbox');
        early.setAttribute('name', 'early');
        early.setAttribute('value', 'from-attribute');
        early.setAttribute('checked', '');
        form.append(early);
        early.value = 'from-property';
        await early.updateComplete;
        expect(early, 'reflected value attribute').toHaveAttribute(
          'value',
          'from-property'
        );
        expect(
          new FormData(form).get('early'),
          'submitted value set before the first update'
        ).toBe('from-property');
      }
    );
  },
};
ValueAttributeTest.storyName = 'value attribute';

export const RequiredTest: Story = {
  render: () => html`
    <form>
      <swc-checkbox name="terms" value="accepted" required>
        <span slot="label">I agree to the terms</span>
      </swc-checkbox>
    </form>
  `,
  play: async ({ canvasElement, step }) => {
    const form = formOf(canvasElement);
    const checkbox = await getComponent<Checkbox>(
      canvasElement,
      'swc-checkbox'
    );
    let submits = 0;
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      submits += 1;
    });

    await step('sets the inner input required', () => {
      expect(inputOf(checkbox).required, 'inner input required').toBe(true);
    });

    await step('reports valueMissing while required and unchecked', () => {
      expect(checkbox.willValidate, 'willValidate while required').toBe(true);
      expect(
        checkbox.validity.valueMissing,
        'valueMissing while unchecked'
      ).toBe(true);
      expect(checkbox.checkValidity(), 'checkValidity while unchecked').toBe(
        false
      );
      expect(
        checkbox.validationMessage,
        'validation message while unchecked'
      ).not.toBe('');
      expect(checkbox.matches(':invalid'), ':invalid while unchecked').toBe(
        true
      );
    });

    await step('fails reportValidity and fires invalid while unchecked', () => {
      let invalid = 0;
      checkbox.addEventListener('invalid', () => (invalid += 1), {
        once: true,
      });
      expect(checkbox.reportValidity(), 'reportValidity while unchecked').toBe(
        false
      );
      expect(invalid, 'invalid events from reportValidity').toBe(1);
    });

    await step('blocks native submit and fires invalid', () => {
      let invalid = 0;
      checkbox.addEventListener('invalid', () => (invalid += 1), {
        once: true,
      });
      form.requestSubmit();
      expect(submits, 'submits while unchecked').toBe(0);
      expect(invalid, 'invalid events from a blocked submit').toBe(1);
    });

    await step('clears valueMissing and submits once checked', async () => {
      inputOf(checkbox).click();
      await checkbox.updateComplete;
      expect(checkbox.validity.valid, 'validity once checked').toBe(true);
      expect(checkbox.matches(':invalid'), ':invalid once checked').toBe(false);
      let invalid = 0;
      checkbox.addEventListener('invalid', () => (invalid += 1));
      expect(checkbox.reportValidity(), 'reportValidity once checked').toBe(
        true
      );
      expect(invalid, 'invalid events once checked').toBe(0);
      form.requestSubmit();
      expect(submits, 'submits once checked').toBe(1);
    });
  },
};
RequiredTest.storyName = 'required';

export const HostDisabledTest: Story = {
  render: () => html`
    <form>
      <swc-checkbox name="terms" checked field-status="readonly">
        <span slot="label">I agree to the terms</span>
      </swc-checkbox>
    </form>
  `,
  play: async ({ canvasElement, step }) => {
    const form = formOf(canvasElement);
    const checkbox = await getComponent<Checkbox>(
      canvasElement,
      'swc-checkbox'
    );
    const clicks: Event[] = [];
    checkbox.addEventListener('click', (event) => clicks.push(event));

    await step(
      'disables the checkbox from a host disabled attribute',
      async () => {
        checkbox.setAttribute('disabled', '');
        await waitFor(() =>
          expect(
            checkbox.matches(':state(disabled)'),
            'disabled custom state'
          ).toBe(true)
        );
        expect(inputOf(checkbox).disabled, 'inner input disabled').toBe(true);
        expect(
          new FormData(form).has('terms'),
          'form entry while disabled'
        ).toBe(false);
        expect(checkbox.willValidate, 'willValidate while disabled').toBe(
          false
        );
        checkbox.click();
        expect(checkbox.checked, 'checked after click() while disabled').toBe(
          true
        );
      }
    );

    await step('leaves the authored field-status untouched', () => {
      expect(checkbox.fieldStatus, 'field-status while disabled').toBe(
        'readonly'
      );
    });

    await step('restores the authored state when it is removed', async () => {
      checkbox.removeAttribute('disabled');
      await waitFor(() =>
        expect(
          checkbox.matches(':state(disabled)'),
          'disabled custom state after removal'
        ).toBe(false)
      );
      expect(inputOf(checkbox).disabled, 'inner input disabled').toBe(false);
      expect(checkbox.fieldStatus, 'field-status after removal').toBe(
        'readonly'
      );
      expect(new FormData(form).get('terms'), 'form entry after removal').toBe(
        'on'
      );
      expect(clicks, 'click events while disabled').toHaveLength(0);
    });
  },
};
HostDisabledTest.storyName = 'Host disabled attribute';

export const ImmediateSyncTest: Story = {
  render: () => html`
    <form>
      <swc-checkbox name="terms" required>
        <span slot="label">I agree to the terms</span>
      </swc-checkbox>
    </form>
  `,
  play: async ({ canvasElement, step }) => {
    const form = formOf(canvasElement);
    const checkbox = await getComponent<Checkbox>(
      canvasElement,
      'swc-checkbox'
    );

    await step(
      'updates FormData and validity as soon as checked is set',
      () => {
        checkbox.checked = true;
        expect(
          new FormData(form).get('terms'),
          'form entry right after setting checked'
        ).toBe('on');
        expect(
          checkbox.checkValidity(),
          'checkValidity right after setting checked'
        ).toBe(true);
        expect(
          inputOf(checkbox).checked,
          'inner input right after setting checked'
        ).toBe(true);
      }
    );

    await step(
      'updates FormData and validity as soon as the form resets',
      async () => {
        checkbox.fieldStatus = 'invalid';
        await checkbox.updateComplete;
        expect(checkbox.validity.customError, 'customError before reset').toBe(
          true
        );
        form.reset();
        expect(
          new FormData(form).has('terms'),
          'form entry right after reset'
        ).toBe(false);
        expect(
          checkbox.validity.customError,
          'customError right after reset'
        ).toBe(false);
        expect(
          checkbox.validity.valueMissing,
          'valueMissing right after reset'
        ).toBe(true);
      }
    );
  },
};
ImmediateSyncTest.storyName = 'Script changes take effect immediately';

// ──────────────────────────────────────────────────────────────
// TEST: Variants / States
// ──────────────────────────────────────────────────────────────

export const InvalidStatusTest: Story = {
  render: () => html`
    <form>
      <swc-checkbox name="plan" checked>
        <span slot="label">Premium plan</span>
        <span slot="error-text">This plan is unavailable.</span>
      </swc-checkbox>
    </form>
  `,
  play: async ({ canvasElement, step }) => {
    const form = formOf(canvasElement);
    const checkbox = await getComponent<Checkbox>(
      canvasElement,
      'swc-checkbox'
    );
    const errorText = elementOf(checkbox, '[slot="error-text"]');

    await step(
      'sets customError while invalid, even when checked',
      async () => {
        checkbox.fieldStatus = 'invalid';
        await checkbox.updateComplete;
        expect(checkbox.validity.customError, 'customError while invalid').toBe(
          true
        );
        expect(checkbox.checkValidity(), 'checkValidity while invalid').toBe(
          false
        );
        expect(
          checkbox.validationMessage,
          'validation message from error text'
        ).toBe('This plan is unavailable.');
        expect(form.checkValidity(), 'form validity while invalid').toBe(false);
      }
    );

    await step('blocks native submit while invalid, even when checked', () => {
      let submits = 0;
      const countSubmit = (event: Event): void => {
        event.preventDefault();
        submits += 1;
      };
      form.addEventListener('submit', countSubmit);
      try {
        form.requestSubmit();
        expect(submits, 'submits while invalid').toBe(0);
      } finally {
        form.removeEventListener('submit', countSubmit);
      }
    });

    await step('follows edits to the error text', async () => {
      errorText.textContent = 'Choose another plan.';
      await waitFor(() =>
        expect(
          checkbox.validationMessage,
          'validation message after an edit'
        ).toBe('Choose another plan.')
      );
    });

    await step(
      'falls back to a default message for empty error text',
      async () => {
        errorText.textContent = '';
        await waitFor(() =>
          expect(
            checkbox.validationMessage,
            'validation message for empty error text'
          ).toBe('Enter a valid value.')
        );
      }
    );

    await step('clears customError when the status clears', async () => {
      checkbox.fieldStatus = undefined;
      await checkbox.updateComplete;
      expect(checkbox.validity.customError, 'customError after clearing').toBe(
        false
      );
      expect(checkbox.checkValidity(), 'checkValidity after clearing').toBe(
        true
      );
      expect(
        checkbox.validationMessage,
        'validation message after clearing'
      ).toBe('');
    });
  },
};
InvalidStatusTest.storyName = 'field-status="invalid" validity';

export const BarredTest: Story = {
  render: () => html`
    <form>
      <fieldset>
        <swc-checkbox name="terms" required>
          <span slot="label">I agree to the terms</span>
        </swc-checkbox>
      </fieldset>
    </form>
  `,
  play: async ({ canvasElement, step }) => {
    const form = formOf(canvasElement);
    const fieldset = elementOf<HTMLFieldSetElement>(form, 'fieldset');
    const checkbox = await getComponent<Checkbox>(
      canvasElement,
      'swc-checkbox'
    );
    let submits = 0;
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      submits += 1;
    });

    await step(
      'bars validation for disabled and read-only statuses',
      async () => {
        for (const status of ['disabled', 'readonly'] as const) {
          checkbox.fieldStatus = status;
          await checkbox.updateComplete;
          expect(checkbox.willValidate, `willValidate while ${status}`).toBe(
            false
          );
          expect(
            checkbox.validity.valueMissing,
            `valueMissing while ${status}`
          ).toBe(false);
          expect(
            checkbox.checkValidity(),
            `checkValidity while ${status}`
          ).toBe(true);
          form.requestSubmit();
        }
        expect(submits, 'submits while barred').toBe(2);
      }
    );

    await step(
      'excludes a disabled checkbox from FormData but not a read-only one',
      async () => {
        checkbox.fieldStatus = 'readonly';
        checkbox.checked = true;
        await checkbox.updateComplete;
        expect(
          new FormData(form).get('terms'),
          'form entry while read-only'
        ).toBe('on');
        checkbox.fieldStatus = 'disabled';
        await checkbox.updateComplete;
        expect(
          new FormData(form).has('terms'),
          'form entry while disabled'
        ).toBe(false);
        checkbox.fieldStatus = undefined;
        checkbox.checked = false;
        await checkbox.updateComplete;
        expect(
          checkbox.willValidate,
          'willValidate after clearing the status'
        ).toBe(true);
        expect(
          checkbox.validity.valueMissing,
          'valueMissing after clearing the status'
        ).toBe(true);
      }
    );

    await step(
      'disables, excludes, and bars inside a disabled fieldset',
      async () => {
        checkbox.checked = true;
        fieldset.disabled = true;
        await waitFor(() =>
          expect(
            checkbox.matches(':state(disabled)'),
            'disabled custom state in a disabled fieldset'
          ).toBe(true)
        );
        expect(
          inputOf(checkbox).disabled,
          'inner input in a disabled fieldset'
        ).toBe(true);
        expect(
          checkbox.willValidate,
          'willValidate in a disabled fieldset'
        ).toBe(false);
        expect(
          new FormData(form).has('terms'),
          'form entry in a disabled fieldset'
        ).toBe(false);
      }
    );

    await step(
      'keeps customError for an invalid status inside a disabled fieldset',
      async () => {
        checkbox.fieldStatus = 'invalid';
        await checkbox.updateComplete;
        expect(
          checkbox.validity.customError,
          'customError in a disabled fieldset'
        ).toBe(true);
        expect(
          checkbox.validity.valueMissing,
          'valueMissing in a disabled fieldset'
        ).toBe(false);
      }
    );

    await step(
      'restores the state when the fieldset is re-enabled',
      async () => {
        checkbox.fieldStatus = undefined;
        fieldset.disabled = false;
        await waitFor(() =>
          expect(
            checkbox.matches(':state(disabled)'),
            'disabled custom state after re-enabling'
          ).toBe(false)
        );
        expect(
          inputOf(checkbox).disabled,
          'inner input after re-enabling'
        ).toBe(false);
        expect(
          new FormData(form).get('terms'),
          'form entry after re-enabling'
        ).toBe('on');
      }
    );
  },
};
BarredTest.storyName = 'Barred and disabled fields';

export const FieldsetReenableTest: Story = {
  render: () => html`
    <form>
      <fieldset disabled>
        <swc-checkbox name="terms" required>
          <span slot="label">I agree to the terms</span>
        </swc-checkbox>
        <swc-checkbox name="news" checked>
          <span slot="label">Send me news</span>
        </swc-checkbox>
      </fieldset>
    </form>
  `,
  play: async ({ canvasElement, step }) => {
    const form = formOf(canvasElement);
    const fieldset = elementOf<HTMLFieldSetElement>(form, 'fieldset');
    const [terms, news] = await getComponents<Checkbox>(
      canvasElement,
      'swc-checkbox'
    );
    let submits = 0;
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      submits += 1;
    });

    await step('applies fieldset re-enabling before the next update', () => {
      fieldset.disabled = false;
      expect(
        news.matches(':state(disabled)'),
        'disabled custom state right after re-enabling'
      ).toBe(false);
      expect(
        inputOf(news).disabled,
        'inner input right after re-enabling'
      ).toBe(false);
      expect(
        new FormData(form).get('news'),
        'form entry right after re-enabling'
      ).toBe('on');
      expect(
        terms.validity.valueMissing,
        'valueMissing right after re-enabling'
      ).toBe(true);
      form.requestSubmit();
      expect(submits, 'submits right after re-enabling').toBe(0);
    });

    await step('applies fieldset disabling at once', () => {
      fieldset.disabled = true;
      expect(
        new FormData(form).has('news'),
        'form entry right after disabling'
      ).toBe(false);
      expect(
        terms.validity.valueMissing,
        'valueMissing right after disabling'
      ).toBe(false);
      form.requestSubmit();
      expect(submits, 'submits right after disabling').toBe(1);
    });
  },
};
FieldsetReenableTest.storyName = 'Fieldset changes take effect immediately';

export const ResetTest: Story = {
  render: () => html`
    <form>
      <swc-checkbox name="a" checked><span slot="label">A</span></swc-checkbox>
      <swc-checkbox name="b"><span slot="label">B</span></swc-checkbox>
    </form>
  `,
  play: async ({ canvasElement, step }) => {
    const form = formOf(canvasElement);
    const [a, b] = await getComponents<Checkbox>(canvasElement, 'swc-checkbox');

    await step('restores each default checked state on reset', async () => {
      inputOf(a).click();
      inputOf(b).click();
      await a.updateComplete;
      await b.updateComplete;
      expect(new FormData(form).has('a'), 'form entry after unchecking a').toBe(
        false
      );
      form.reset();
      await a.updateComplete;
      await b.updateComplete;
      expect(a.checked, 'a checked after reset').toBe(true);
      expect(b.checked, 'b checked after reset').toBe(false);
      expect(new FormData(form).get('a'), 'form entry for a after reset').toBe(
        'on'
      );
      expect(new FormData(form).has('b'), 'form entry for b after reset').toBe(
        false
      );
    });

    await step(
      'clears invalid and keeps read-only and disabled on reset',
      async () => {
        for (const [status, kept] of [
          ['invalid', undefined],
          ['readonly', 'readonly'],
          ['disabled', 'disabled'],
        ] as const) {
          a.fieldStatus = status;
          await a.updateComplete;
          form.reset();
          await a.updateComplete;
          expect(a.fieldStatus, `field-status ${status} after reset`).toBe(
            kept
          );
        }
        a.fieldStatus = undefined;
        await a.updateComplete;
      }
    );

    await step('leaves indeterminate untouched on reset', async () => {
      b.indeterminate = true;
      await b.updateComplete;
      form.reset();
      await b.updateComplete;
      expect(b.indeterminate, 'indeterminate after reset').toBe(true);
    });

    await step('restores checked from a "true" or "false" state', async () => {
      b.formStateRestoreCallback('true');
      await b.updateComplete;
      expect(b.checked, 'checked after restoring "true"').toBe(true);
      expect(
        new FormData(form).get('b'),
        'form entry after restoring "true"'
      ).toBe('on');
      b.formStateRestoreCallback('false');
      await b.updateComplete;
      expect(b.checked, 'checked after restoring "false"').toBe(false);
      expect(
        new FormData(form).has('b'),
        'form entry after restoring "false"'
      ).toBe(false);
    });

    await step('ignores any other restored state', async () => {
      const file = new File(['true'], 'state.txt');
      const states: (string | File | FormData | null)[] = [
        null,
        'mixed',
        '',
        'on',
        file,
        new FormData(),
      ];
      for (const checked of [true, false]) {
        b.checked = checked;
        await b.updateComplete;
        for (const state of states) {
          b.formStateRestoreCallback(state);
          await b.updateComplete;
          expect(
            b.checked,
            `checked ${checked} after restoring ${String(state)}`
          ).toBe(checked);
        }
      }
    });
  },
};
ResetTest.storyName = 'Reset and state restore';

export const EnterKeySubmitTest: Story = {
  render: () => html`
    <form id="enter-main">
      <swc-checkbox name="terms" value="accepted">
        <span slot="label">I agree to the terms</span>
      </swc-checkbox>
      <swc-checkbox name="locked" field-status="disabled">
        <span slot="label">Locked</span>
      </swc-checkbox>
      <swc-checkbox name="removable">
        <span slot="label">Removable</span>
      </swc-checkbox>
      <button type="submit">Submit</button>
    </form>
    <form id="enter-control">
      <swc-checkbox name="control">
        <span slot="label">Control</span>
      </swc-checkbox>
      <button type="submit">Submit control</button>
    </form>
    <swc-checkbox name="standalone">
      <span slot="label">Standalone</span>
    </swc-checkbox>
  `,
  play: async ({ canvasElement, step }) => {
    const form = formOf(canvasElement, '#enter-main');
    const controlForm = formOf(canvasElement, '#enter-control');
    const [terms, locked, removable, control, standalone] =
      await getComponents<Checkbox>(canvasElement, 'swc-checkbox');
    const submitButton = elementOf<HTMLButtonElement>(form, 'button');
    const submitters = recordSubmits(form);
    const controlSubmitters = recordSubmits(controlForm);

    // Each keydown queues its submit check as a task, so once the control
    // form's later Enter has submitted, any earlier check has also run.
    const expectNoSubmit = async (
      act: () => void,
      message: string
    ): Promise<void> => {
      const before = submitters.length;
      const controlBefore = controlSubmitters.length;
      act();
      pressKey(control, { key: 'Enter' });
      await waitFor(() =>
        expect(controlSubmitters, 'control form submits').toHaveLength(
          controlBefore + 1
        )
      );
      expect(submitters, message).toHaveLength(before);
    };

    await step('submits through the form submit button on Enter', async () => {
      const event = pressKey(terms, { key: 'Enter' });
      expect(event.defaultPrevented, 'Enter keydown canceled').toBe(false);
      await waitFor(() =>
        expect(submitters, 'submits after Enter').toHaveLength(1)
      );
      expect(submitters[0], 'submitter for Enter').toBe(submitButton);
    });

    await step('does not toggle the checkbox on Enter', async () => {
      expect(terms.checked, 'checked after Enter').toBe(false);
      terms.checked = true;
      await terms.updateComplete;
      pressKey(terms, { key: 'Enter' });
      await waitFor(() =>
        expect(submitters, 'submits after a second Enter').toHaveLength(2)
      );
      expect(terms.checked, 'checked after Enter while checked').toBe(true);
      expect(inputOf(terms).checked, 'inner input after Enter').toBe(true);
    });

    await step('ignores keys other than Enter', async () => {
      await expectNoSubmit(() => {
        pressKey(terms, { key: ' ' });
        pressKey(terms, { key: 'a' });
        pressKey(terms, { key: 'Tab' });
      }, 'submits after non-Enter keys');
    });

    await step('ignores Enter during IME composition', async () => {
      await expectNoSubmit(() => {
        pressKey(terms, { key: 'Enter', isComposing: true });
      }, 'submits after a composing Enter');
      await expectNoSubmit(() => {
        pressKey(terms, { key: 'Enter' }, 229);
      }, 'submits after an Enter with keyCode 229');
    });

    await step(
      'cancels the submit when a keydown listener prevents default',
      async () => {
        let event: KeyboardEvent | undefined;
        terms.addEventListener(
          'keydown',
          (keydown) => keydown.preventDefault(),
          {
            once: true,
          }
        );
        await expectNoSubmit(() => {
          event = pressKey(terms, { key: 'Enter' });
        }, 'submits after a canceled Enter');
        expect(event?.defaultPrevented, 'Enter keydown canceled').toBe(true);
      }
    );

    await step('ignores Enter on a disabled checkbox', async () => {
      expect(locked.matches(':state(disabled)'), 'disabled custom state').toBe(
        true
      );
      await expectNoSubmit(() => {
        pressKey(locked, { key: 'Enter' });
      }, 'submits after Enter on a disabled checkbox');
    });

    await step(
      'ignores Enter when the checkbox is removed before submitting',
      async () => {
        await expectNoSubmit(() => {
          pressKey(removable, { key: 'Enter' });
          removable.remove();
        }, 'submits after Enter on a removed checkbox');
        expect(removable.isConnected, 'removed checkbox connected').toBe(false);
      }
    );

    await step('does nothing on Enter without a form', async () => {
      expect(standalone.form, 'form of a standalone checkbox').toBe(null);
      await expectNoSubmit(() => {
        pressKey(standalone, { key: 'Enter' });
      }, 'submits after Enter on a standalone checkbox');
      expect(standalone.checked, 'standalone checked after Enter').toBe(false);
    });
  },
};
EnterKeySubmitTest.storyName = 'Enter submits the form';

export const EnterKeySubmitterTest: Story = {
  render: () => html`
    <form id="enter-order">
      <swc-checkbox name="terms" checked>
        <span slot="label">I agree to the terms</span>
      </swc-checkbox>
      <button type="button" id="preview">Preview</button>
      <button type="submit" form="enter-other" id="foreign">
        Submit the other form
      </button>
      <input type="image" id="image" alt="Submit with an image" />
      <button type="submit" id="first">Submit</button>
      <button type="submit" id="second">Submit again</button>
    </form>
    <button type="submit" form="enter-order" id="outside">
      Submit from outside
    </button>
    <form id="enter-other"></form>
  `,
  play: async ({ canvasElement, step }) => {
    const form = formOf(canvasElement, '#enter-order');
    const otherForm = formOf(canvasElement, '#enter-other');
    const checkbox = await getComponent<Checkbox>(
      canvasElement,
      'swc-checkbox'
    );
    const preview = elementOf<HTMLButtonElement>(canvasElement, '#preview');
    const image = elementOf<HTMLInputElement>(canvasElement, '#image');
    const first = elementOf<HTMLButtonElement>(canvasElement, '#first');
    const second = elementOf<HTMLButtonElement>(canvasElement, '#second');
    const outside = elementOf<HTMLButtonElement>(canvasElement, '#outside');
    const submitters = recordSubmits(form);
    const otherSubmitters = recordSubmits(otherForm);
    let previewClicks = 0;
    preview.addEventListener('click', () => (previewClicks += 1));

    await step('clicks the first submit control in tree order', async () => {
      pressKey(checkbox, { key: 'Enter' });
      await waitFor(() =>
        expect(submitters, 'submits after Enter').toHaveLength(1)
      );
      expect(submitters[0], 'image input submitter').toBe(image);
      expect(previewClicks, 'type="button" clicks').toBe(0);
      expect(otherSubmitters, 'other form submits').toHaveLength(0);
    });

    await step('picks the first of several submit buttons', async () => {
      image.remove();
      pressKey(checkbox, { key: 'Enter' });
      await waitFor(() =>
        expect(submitters, 'submits after a second Enter').toHaveLength(2)
      );
      expect(submitters[1], 'first submit button submitter').toBe(first);
      expect(otherSubmitters, 'other form submits').toHaveLength(0);
    });

    await step(
      'uses a form-attribute submit button outside the form',
      async () => {
        first.remove();
        second.remove();
        pressKey(checkbox, { key: 'Enter' });
        await waitFor(() =>
          expect(submitters, 'submits after a third Enter').toHaveLength(3)
        );
        expect(submitters[2], 'outside submit button submitter').toBe(outside);
        expect(previewClicks, 'type="button" clicks').toBe(0);
        expect(otherSubmitters, 'other form submits').toHaveLength(0);
      }
    );
  },
};
EnterKeySubmitterTest.storyName = 'Enter clicks the default submit button';

export const EnterKeyShadowRootTest: Story = {
  render: () => html`
    <div id="shadow-host"></div>
  `,
  play: async ({ canvasElement, step }) => {
    const host = elementOf<HTMLElement>(canvasElement, '#shadow-host');
    const shadowRoot = host.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
      <form>
        <swc-checkbox name="terms" value="accepted" checked>
          <span slot="label">I agree to the terms</span>
        </swc-checkbox>
        <button type="submit">Submit</button>
      </form>
    `;
    const form = elementOf<HTMLFormElement>(shadowRoot, 'form');
    const checkbox = await getComponent<Checkbox>(form, 'swc-checkbox');
    const button = elementOf<HTMLButtonElement>(form, 'button');
    const submitters = recordSubmits(form);

    await step('submits a form inside a shadow root on Enter', async () => {
      expect(checkbox.form, 'form inside the shadow root').toBe(form);
      pressKey(checkbox, { key: 'Enter' });
      await waitFor(() =>
        expect(submitters, 'submits after Enter').toHaveLength(1)
      );
      expect(submitters[0], 'submitter inside the shadow root').toBe(button);
      expect(
        new FormData(form).get('terms'),
        'form entry inside the shadow root'
      ).toBe('accepted');
    });
  },
};
EnterKeyShadowRootTest.storyName = 'Enter submits a form in a shadow root';

export const FormParticipationTest: Story = {
  ...FormParticipation,
  play: async ({ canvasElement, step }) => {
    const form = formOf(canvasElement);
    const [terms, updates] = await getComponents<Checkbox>(
      canvasElement,
      'swc-checkbox'
    );
    const submitButton = elementOf<HTMLButtonElement>(
      form,
      'button[type="submit"]'
    );
    const resetButton = elementOf<HTMLButtonElement>(
      form,
      'button[type="reset"]'
    );
    const status = elementOf<HTMLElement>(form, '[role="status"]');
    const errorTextOf = (checkbox: Checkbox): Element | null | undefined =>
      checkbox.shadowRoot?.querySelector('.swc-FormFieldErrorText');
    const entries = (): [string, FormDataEntryValue][] => [
      ...new FormData(form).entries(),
    ];
    const submitted: [string, FormDataEntryValue][][] = [];
    form.addEventListener('submit', () => submitted.push(entries()));
    const lastSubmitted = (): [string, FormDataEntryValue][] | undefined =>
      submitted[submitted.length - 1];

    await step(
      'blocks a submit with terms unchecked and marks it invalid',
      async () => {
        await userEvent.click(submitButton);
        await waitFor(() =>
          expect(terms, 'terms field-status after submit').toHaveAttribute(
            'field-status',
            'invalid'
          )
        );
        await terms.updateComplete;
        expect(status.textContent, 'status text after a failed submit').toBe(
          ''
        );
        expect(submitted, 'entries at the failed submit').toEqual([[]]);
        expect(document.activeElement, 'focus after a failed submit').toBe(
          terms
        );
        expect(
          terms.matches(':focus'),
          'terms focus after a failed submit'
        ).toBe(true);
        expect(errorTextOf(terms), 'rendered error text').toBeTruthy();
        expect(terms.validationMessage, 'terms validation message').toBe(
          'Agree to the terms to continue.'
        );
        expect(updates.fieldStatus, 'updates field-status').toBeUndefined();
      }
    );

    await step('clears the invalid status when terms is checked', async () => {
      terms.click();
      await waitFor(() =>
        expect(terms, 'terms field-status after checking').not.toHaveAttribute(
          'field-status'
        )
      );
      await terms.updateComplete;
      expect(terms.checked, 'terms checked').toBe(true);
      expect(terms.validity.valid, 'terms validity after checking').toBe(true);
      expect(errorTextOf(terms), 'error text after checking').toBe(null);
    });

    await step('submits terms=accepted after the error is fixed', async () => {
      await userEvent.click(submitButton);
      await waitFor(() =>
        expect(status.textContent, 'status text after submit').toContain(
          'Submitted'
        )
      );
      expect(status.textContent, 'status text with only terms').toBe(
        'Submitted: terms=accepted'
      );
      expect(status.textContent, 'status text without updates').not.toContain(
        'updates='
      );
      expect(lastSubmitted(), 'entries at submit with terms').toEqual([
        ['terms', 'accepted'],
      ]);
      expect(entries(), 'entries read after submit with terms').toEqual(
        lastSubmitted()
      );
      expect(terms.fieldStatus, 'terms field-status after submit').toBe(
        undefined
      );
    });

    await step('adds updates=monthly when updates is checked', async () => {
      updates.click();
      await updates.updateComplete;
      expect(updates.checked, 'updates checked').toBe(true);
      await userEvent.click(submitButton);
      await waitFor(() =>
        expect(
          status.textContent,
          'status text after submitting updates'
        ).toContain('updates=monthly')
      );
      expect(status.textContent, 'status text with both fields').toBe(
        'Submitted: terms=accepted&updates=monthly'
      );
      expect(lastSubmitted(), 'entries at submit with both fields').toEqual([
        ['terms', 'accepted'],
        ['updates', 'monthly'],
      ]);
      expect(entries(), 'entries read after submit with both fields').toEqual(
        lastSubmitted()
      );
    });

    await step(
      'restores defaults and clears the status text on reset',
      async () => {
        await userEvent.click(resetButton);
        await terms.updateComplete;
        await updates.updateComplete;
        expect(terms.checked, 'terms checked after reset').toBe(false);
        expect(updates.checked, 'updates checked after reset').toBe(false);
        expect(status.textContent, 'status text after reset').toBe('');
        expect(entries(), 'entries read after reset').toEqual([]);
      }
    );

    await step(
      'submits no entries after reset and marks terms invalid',
      async () => {
        await userEvent.click(submitButton);
        await waitFor(() =>
          expect(terms.fieldStatus, 'terms field-status after submit').toBe(
            'invalid'
          )
        );
        expect(lastSubmitted(), 'entries at submit after reset').toEqual([]);
        expect(entries(), 'entries read at submit after reset').toEqual(
          lastSubmitted()
        );
        expect(document.activeElement, 'focus after a failed submit').toBe(
          terms
        );
      }
    );

    await step('clears the invalid status on reset', async () => {
      await userEvent.click(resetButton);
      await terms.updateComplete;
      expect(terms, 'terms field-status after reset').not.toHaveAttribute(
        'field-status'
      );
      expect(errorTextOf(terms), 'error text after reset').toBe(null);
      expect(
        terms.validity.valueMissing,
        'terms valueMissing after reset'
      ).toBe(true);
      expect(status.textContent, 'status text after reset').toBe('');
      expect(entries(), 'entries read after reset').toEqual([]);
    });
  },
};
FormParticipationTest.storyName = 'Form participation';
