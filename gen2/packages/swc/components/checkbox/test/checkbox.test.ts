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
import { expect, waitFor } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import { Checkbox } from '@adobe/spectrum-wc/checkbox';

import '@adobe/spectrum-wc/components/checkbox/swc-checkbox.js';

import {
  getComponent,
  getComponents,
  withWarningSpy,
} from '../../../utils/test-utils.js';
import meta, { Playground } from '../stories/checkbox.stories.js';

// This file defines dev-only test stories that reuse the main story metadata.
export default {
  ...meta,
  title: 'Checkbox/Tests',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

function inputOf(checkbox: Checkbox): HTMLInputElement {
  const input = checkbox.shadowRoot?.querySelector('input');
  if (!input) {
    throw new Error('swc-checkbox rendered no input');
  }
  return input;
}

function recordEvents(target: EventTarget, types: string[]): Event[] {
  const events: Event[] = [];
  for (const type of types) {
    target.addEventListener(type, (event) => events.push(event));
  }
  return events;
}

// ──────────────────────────────────────────────────────────────
// TEST: Registration and render
// ──────────────────────────────────────────────────────────────

export const RegistrationTest: Story = {
  ...Playground,
  play: async ({ canvasElement, step }) => {
    const checkbox = await getComponent<Checkbox>(
      canvasElement,
      'swc-checkbox'
    );

    await step('swc-checkbox.js registers the Checkbox class', () => {
      expect(customElements.get('swc-checkbox')).toBe(Checkbox);
      expect(checkbox).toBeInstanceOf(Checkbox);
    });

    await step('renders one native checkbox input', () => {
      const inputs =
        checkbox.shadowRoot?.querySelectorAll('input[type="checkbox"]') ?? [];
      expect(inputs).toHaveLength(1);
      expect(checkbox.roleElement).toBe(inputs[0]);
    });

    await step('size defaults to m and invalid sizes fall back', async () => {
      expect(checkbox.size).toBe('m');
      expect(checkbox).toHaveAttribute('size', 'm');
      checkbox.setAttribute('size', 'xxl');
      await checkbox.updateComplete;
      expect(checkbox.size).toBe('m');
      checkbox.size = 'xl';
      await checkbox.updateComplete;
      expect(checkbox).toHaveAttribute('size', 'xl');
    });

    await step('label slot content labels the input', () => {
      const input = inputOf(checkbox);
      const label = input.labels?.[0];
      const slot = label?.querySelector<HTMLSlotElement>('slot[name="label"]');
      const text = slot
        ?.assignedNodes({ flatten: true })
        .map((node) => node.textContent)
        .join('')
        .trim();
      expect(input.labels).toHaveLength(1);
      expect(text).toBe('Send me product updates');
    });

    await step('public defaults match the plan', () => {
      expect(checkbox.checked).toBe(false);
      expect(checkbox.indeterminate).toBe(false);
      expect(checkbox.fieldStatus).toBeUndefined();
      expect(checkbox.required).toBe(false);
      expect(checkbox.emphasized).toBe(false);
      expect(checkbox.name).toBeUndefined();
      expect(checkbox.value).toBe('on');
    });
  },
};
RegistrationTest.storyName = 'Registration and render';

export const OptionControlsTest: Story = {
  ...Playground,
  play: async ({ step }) => {
    await step('enum controls expose their supported values', () => {
      expect(meta.argTypes?.size).toMatchObject({
        control: { type: 'select' },
        options: ['s', 'm', 'l', 'xl'],
      });
      expect(meta.argTypes?.['field-status']).toMatchObject({
        control: { type: 'select' },
        options: [undefined, 'disabled', 'invalid', 'readonly'],
      });
      expect(meta.args?.['field-status']).toBeUndefined();
    });
  },
};
OptionControlsTest.storyName = 'Playground option controls';

// ──────────────────────────────────────────────────────────────
// TEST: checked (B9, SWC-1518)
// ──────────────────────────────────────────────────────────────

export const CheckedTest: Story = {
  render: () => html`
    <swc-checkbox><span slot="label">Accept</span></swc-checkbox>
  `,
  play: async ({ canvasElement, step }) => {
    const checkbox = await getComponent<Checkbox>(
      canvasElement,
      'swc-checkbox'
    );
    const input = inputOf(checkbox);

    await step('checked is a declared reactive property', () => {
      expect(Checkbox.elementProperties.has('checked')).toBe(true);
      expect(checkbox.checked).toBe(false);
    });

    await step('the property drives the inner input', async () => {
      checkbox.checked = true;
      await checkbox.updateComplete;
      expect(input.checked).toBe(true);
      checkbox.checked = false;
      await checkbox.updateComplete;
      expect(input.checked).toBe(false);
    });

    await step('user activation drives the property', async () => {
      input.click();
      await checkbox.updateComplete;
      expect(checkbox.checked).toBe(true);
    });

    await step('a change listener reads checked from currentTarget', () => {
      let seen: boolean | undefined;
      checkbox.addEventListener(
        'change',
        (event) => {
          seen = (event.currentTarget as Checkbox).checked;
        },
        { once: true }
      );
      input.click();
      expect(seen).toBe(false);
    });

    await step('the checked property is not reflected', async () => {
      checkbox.checked = true;
      await checkbox.updateComplete;
      expect(checkbox).not.toHaveAttribute('checked');
    });
  },
};
CheckedTest.storyName = 'checked property';

export const CheckedAttributeTest: Story = {
  render: () => html`
    <form>
      <swc-checkbox checked><span slot="label">Untouched</span></swc-checkbox>
      <swc-checkbox checked><span slot="label">Toggled</span></swc-checkbox>
    </form>
  `,
  play: async ({ canvasElement, step }) => {
    const [untouched, toggled] = await getComponents<Checkbox>(
      canvasElement,
      'swc-checkbox'
    );
    const form = canvasElement.querySelector('form');
    if (!form) {
      throw new Error('Test requires a form');
    }

    await step('the checked attribute sets the initial state', () => {
      expect(untouched.checked).toBe(true);
      expect(inputOf(untouched).checked).toBe(true);
    });

    await step('before any change, the attribute moves the state', async () => {
      untouched.removeAttribute('checked');
      await untouched.updateComplete;
      expect(untouched.checked).toBe(false);
      untouched.setAttribute('checked', '');
      await untouched.updateComplete;
      expect(untouched.checked).toBe(true);
    });

    await step(
      'after a user toggle, the attribute no longer moves the state',
      async () => {
        inputOf(toggled).click();
        await toggled.updateComplete;
        expect(toggled.checked).toBe(false);
        expect(toggled).toHaveAttribute('checked');
        toggled.removeAttribute('checked');
        toggled.setAttribute('checked', '');
        await toggled.updateComplete;
        expect(toggled.checked).toBe(false);
      }
    );

    await step(
      'after a script change, the attribute no longer moves the state',
      async () => {
        untouched.checked = false;
        await untouched.updateComplete;
        untouched.removeAttribute('checked');
        untouched.setAttribute('checked', '');
        await untouched.updateComplete;
        expect(untouched.checked).toBe(false);
      }
    );

    await step(
      'form reset restores the attribute and its control',
      async () => {
        form.reset();
        await toggled.updateComplete;
        await untouched.updateComplete;
        expect(toggled.checked).toBe(true);
        expect(untouched.checked).toBe(true);
        toggled.removeAttribute('checked');
        await toggled.updateComplete;
        expect(toggled.checked).toBe(false);
      }
    );
  },
};
CheckedAttributeTest.storyName = 'checked attribute is the default';

// ──────────────────────────────────────────────────────────────
// TEST: indeterminate (C2)
// ──────────────────────────────────────────────────────────────

export const IndeterminateTest: Story = {
  render: () => html`
    <swc-checkbox indeterminate checked>
      <span slot="label">Checked</span>
    </swc-checkbox>
    <swc-checkbox indeterminate>
      <span slot="label">Unchecked</span>
    </swc-checkbox>
  `,
  play: async ({ canvasElement, step }) => {
    const [checked, unchecked] = await getComponents<Checkbox>(
      canvasElement,
      'swc-checkbox'
    );

    await step('indeterminate sets the inner input and reflects', () => {
      expect(inputOf(checked).indeterminate).toBe(true);
      expect(checked).toHaveAttribute('indeterminate');
      expect(checked.checked).toBe(true);
    });

    await step('indeterminate and checked becomes not checked', async () => {
      inputOf(checked).click();
      await checked.updateComplete;
      expect(checked.indeterminate).toBe(false);
      expect(checked.checked).toBe(false);
      expect(inputOf(checked).indeterminate).toBe(false);
      expect(checked).not.toHaveAttribute('indeterminate');
    });

    await step('indeterminate and not checked becomes checked', async () => {
      inputOf(unchecked).click();
      await unchecked.updateComplete;
      expect(unchecked.indeterminate).toBe(false);
      expect(unchecked.checked).toBe(true);
    });

    await step('setting indeterminate leaves checked unchanged', async () => {
      unchecked.indeterminate = true;
      await unchecked.updateComplete;
      expect(unchecked.checked).toBe(true);
      expect(inputOf(unchecked).indeterminate).toBe(true);
    });
  },
};
IndeterminateTest.storyName = 'indeterminate';

// ──────────────────────────────────────────────────────────────
// TEST: change event (B10)
// ──────────────────────────────────────────────────────────────

export const ChangeEventTest: Story = {
  render: () => html`
    <swc-checkbox><span slot="label">Notify me</span></swc-checkbox>
  `,
  play: async ({ canvasElement, step }) => {
    const checkbox = await getComponent<Checkbox>(
      canvasElement,
      'swc-checkbox'
    );
    const input = inputOf(checkbox);

    await step('a user toggle fires one non-cancelable change', async () => {
      const events = recordEvents(checkbox, ['change']);
      input.click();
      await checkbox.updateComplete;
      expect(events).toHaveLength(1);
      const [change] = events;
      expect(change).not.toBeInstanceOf(CustomEvent);
      expect(change.bubbles).toBe(true);
      expect(change.composed).toBe(true);
      expect(change.cancelable).toBe(false);
    });

    await step('input reaches the host after checked updates', async () => {
      let seen: boolean | undefined;
      checkbox.addEventListener(
        'input',
        () => {
          seen = checkbox.checked;
        },
        { once: true }
      );
      input.click();
      expect(seen).toBe(false);
      await checkbox.updateComplete;
    });

    await step('programmatic changes fire nothing', async () => {
      const events = recordEvents(checkbox, ['change', 'input']);
      checkbox.checked = !checkbox.checked;
      checkbox.indeterminate = true;
      await checkbox.updateComplete;
      expect(events).toHaveLength(0);
    });

    await step('canceling click blocks the toggle and change', async () => {
      const before = checkbox.checked;
      const events = recordEvents(checkbox, ['change', 'input']);
      const cancel = (event: Event): void => event.preventDefault();
      checkbox.addEventListener('click', cancel);
      checkbox.click();
      input.click();
      await checkbox.updateComplete;
      checkbox.removeEventListener('click', cancel);
      expect(checkbox.checked).toBe(before);
      expect(input.checked).toBe(before);
      expect(events).toHaveLength(0);
    });
  },
};
ChangeEventTest.storyName = 'change event';

// ──────────────────────────────────────────────────────────────
// TEST: click() and field status
// ──────────────────────────────────────────────────────────────

export const ClickTest: Story = {
  render: () => html`
    <fieldset>
      <swc-checkbox><span slot="label">Remember me</span></swc-checkbox>
    </fieldset>
  `,
  play: async ({ canvasElement, step }) => {
    const checkbox = await getComponent<Checkbox>(
      canvasElement,
      'swc-checkbox'
    );
    const fieldset = canvasElement.querySelector('fieldset');
    if (!fieldset) {
      throw new Error('Test requires a fieldset');
    }
    const events = recordEvents(checkbox, ['change']);

    await step('click() toggles an enabled checkbox', async () => {
      checkbox.click();
      await checkbox.updateComplete;
      expect(checkbox.checked).toBe(true);
      expect(events).toHaveLength(1);
    });

    await step(
      'field-status="disabled" disables the input and click()',
      async () => {
        checkbox.fieldStatus = 'disabled';
        await checkbox.updateComplete;
        expect(inputOf(checkbox).disabled).toBe(true);
        checkbox.click();
        await checkbox.updateComplete;
        expect(checkbox.checked).toBe(true);
        expect(events).toHaveLength(1);
        checkbox.fieldStatus = undefined;
        await checkbox.updateComplete;
      }
    );

    await step(
      'a disabled fieldset disables the input and click()',
      async () => {
        fieldset.disabled = true;
        await waitFor(() => expect(inputOf(checkbox).disabled).toBe(true));
        checkbox.click();
        await checkbox.updateComplete;
        expect(checkbox.checked).toBe(true);
        expect(events).toHaveLength(1);
        fieldset.disabled = false;
        await waitFor(() => expect(inputOf(checkbox).disabled).toBe(false));
      }
    );
  },
};
ClickTest.storyName = 'click() and disabled';

export const ReadOnlyTest: Story = {
  render: () => html`
    <swc-checkbox field-status="readonly" checked>
      <span slot="label">Terms accepted</span>
    </swc-checkbox>
  `,
  play: async ({ canvasElement, step }) => {
    const checkbox = await getComponent<Checkbox>(
      canvasElement,
      'swc-checkbox'
    );
    const input = inputOf(checkbox);
    const events = recordEvents(checkbox, ['input', 'change']);
    const clicks = recordEvents(checkbox, ['click']);

    await step('read-only keeps the input enabled', () => {
      expect(input.disabled).toBe(false);
    });

    await step(
      'clicks on the input, label, and host do not toggle',
      async () => {
        input.click();
        input.labels?.[0]?.click();
        checkbox.click();
        await checkbox.updateComplete;
        expect(checkbox.checked).toBe(true);
        expect(input.checked).toBe(true);
        expect(events).toHaveLength(0);
      }
    );

    await step('consumers still receive the clicks', () => {
      expect(clicks.length).toBeGreaterThan(0);
    });

    await step('clearing the status restores toggling', async () => {
      checkbox.fieldStatus = undefined;
      await checkbox.updateComplete;
      input.click();
      await checkbox.updateComplete;
      expect(checkbox.checked).toBe(false);
      expect(events.map((event) => event.type)).toEqual(['input', 'change']);
    });
  },
};
ReadOnlyTest.storyName = 'field-status="readonly" blocks the toggle';

export const FieldStatusTest: Story = {
  render: () => html`
    <swc-checkbox><span slot="label">Status</span></swc-checkbox>
  `,
  play: async ({ canvasElement, step }) => {
    const checkbox = await getComponent<Checkbox>(
      canvasElement,
      'swc-checkbox'
    );

    await step(
      'supported statuses do not warn or mirror host attributes',
      async () => {
        await withWarningSpy(async (warnCalls) => {
          for (const status of ['disabled', 'invalid', 'readonly'] as const) {
            checkbox.fieldStatus = status;
            await checkbox.updateComplete;
            expect(checkbox.getAttribute('field-status')).toBe(status);
            expect(checkbox).not.toHaveAttribute('disabled');
            expect(checkbox).not.toHaveAttribute('readonly');
          }
          expect(warnCalls).toHaveLength(0);
        });
      }
    );

    await step('valid and unknown statuses warn in dev', async () => {
      await withWarningSpy(async (warnCalls) => {
        checkbox.setAttribute('field-status', 'valid');
        await checkbox.updateComplete;
        expect(warnCalls.length).toBeGreaterThan(0);
        expect(String(warnCalls[0][1])).toContain('field-status');
      });
    });

    await step('removing the attribute clears the status', async () => {
      checkbox.removeAttribute('field-status');
      await checkbox.updateComplete;
      expect(checkbox.fieldStatus).toBeUndefined();
    });

    await step(
      'the disabled custom state tracks field-status="disabled"',
      async () => {
        checkbox.fieldStatus = 'disabled';
        await checkbox.updateComplete;
        expect(checkbox.matches(':state(disabled)')).toBe(true);
        checkbox.fieldStatus = 'readonly';
        await checkbox.updateComplete;
        expect(checkbox.matches(':state(disabled)')).toBe(false);
      }
    );
  },
};
FieldStatusTest.storyName = 'field-status values';

// ──────────────────────────────────────────────────────────────
// TEST: description, error text, and error icon (Q7, B14)
// ──────────────────────────────────────────────────────────────

export const DescriptionTest: Story = {
  render: () => html`
    <fieldset>
      <swc-checkbox>
        <span slot="label">Both</span>
        <span slot="description">Description</span>
        <span slot="error-text">Error</span>
      </swc-checkbox>
      <swc-checkbox field-status="invalid">
        <span slot="label">Description only</span>
        <span slot="description">Description</span>
      </swc-checkbox>
      <swc-checkbox field-status="invalid">
        <span slot="label">Neither</span>
      </swc-checkbox>
    </fieldset>
  `,
  play: async ({ canvasElement, step }) => {
    const [both, descriptionOnly, neither] = await getComponents<Checkbox>(
      canvasElement,
      'swc-checkbox'
    );
    const fieldset = canvasElement.querySelector('fieldset');
    if (!fieldset) {
      throw new Error('Test requires a fieldset');
    }
    const icon = (checkbox: Checkbox): Element | null | undefined =>
      checkbox.shadowRoot?.querySelector('.swc-FormFieldErrorText-icon');

    await step('the description describes the input by default', () => {
      const description = both.shadowRoot?.querySelector(
        '.swc-FormFieldDescription'
      );
      expect(description).toBeTruthy();
      expect(both.shadowRoot?.querySelector('.swc-FormFieldErrorText')).toBe(
        null
      );
      expect(inputOf(both).ariaDescribedByElements?.[0]).toBe(description);
      expect(icon(both)).toBe(null);
    });

    await step(
      'while invalid, error text replaces the description',
      async () => {
        both.fieldStatus = 'invalid';
        await both.updateComplete;
        const errorText = both.shadowRoot?.querySelector(
          '.swc-FormFieldErrorText'
        );
        expect(errorText).toBeTruthy();
        expect(
          both.shadowRoot?.querySelector('.swc-FormFieldDescription')
        ).toBe(null);
        expect(inputOf(both).ariaDescribedByElements?.[0]).toBe(errorText);
        expect(icon(both)).toBeTruthy();
      }
    );

    await step('the error icon shows with only a description or alone', () => {
      expect(icon(descriptionOnly)).toBeTruthy();
      expect(icon(neither)).toBeTruthy();
    });

    await step(
      'a disabled fieldset hides the icon but keeps error text',
      async () => {
        fieldset.disabled = true;
        await waitFor(() => expect(icon(both)).toBe(null));
        expect(
          both.shadowRoot?.querySelector('.swc-FormFieldErrorText')
        ).toBeTruthy();
        fieldset.disabled = false;
        await waitFor(() => expect(icon(both)).toBeTruthy());
      }
    );

    await step('clearing the status restores the description', async () => {
      both.fieldStatus = undefined;
      await both.updateComplete;
      expect(
        both.shadowRoot?.querySelector('.swc-FormFieldDescription')
      ).toBeTruthy();
      expect(icon(both)).toBe(null);
    });
  },
};
DescriptionTest.storyName = 'Description, error text, and error icon';
