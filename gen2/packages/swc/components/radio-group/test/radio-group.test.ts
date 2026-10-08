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
import { expect, fn, waitFor } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import { Radio, RadioGroup } from '@adobe/spectrum-wc/radio-group';

import '@adobe/spectrum-wc/components/radio-group/swc-radio-group.js';
import '@adobe/spectrum-wc/components/radio-group/swc-radio.js';

import { fixture, getComponent } from '../../../utils/test-utils.js';
import meta, {
  Invalid,
  NecessityIndicator,
  Playground,
  ReadOnly,
} from '../stories/radio-group.stories.js';

/** An element carrying the ARIA element-reflection properties this file asserts on. */
type ReflectedAriaElement = Element & {
  ariaLabelledByElements: Element[] | null;
  ariaDescribedByElements: Element[] | null;
};

// This file defines dev-only test stories that reuse the main story metadata.
export default {
  ...meta,
  title: 'Radio group/Tests',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

// ──────────────────────────────────────────────────────────────
// TEST: Defaults
// ──────────────────────────────────────────────────────────────

export const OverviewTest: Story = {
  ...Playground,
  play: async ({ canvasElement }) => {
    const radioGroup = await getComponent<RadioGroup>(
      canvasElement,
      'swc-radio-group'
    );

    expect(radioGroup, 'renders a swc-radio-group').toBeInstanceOf(RadioGroup);
    expect(radioGroup.orientation, 'default orientation is vertical').toBe(
      'vertical'
    );
    expect(radioGroup.labelPosition, 'default label-position is top').toBe(
      'top'
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: role="radiogroup" lives on the rendered outer element, not the host
// ──────────────────────────────────────────────────────────────

export const RoleWiringTest: Story = {
  render: () => html`
    <swc-radio-group>
      <span slot="label">Favorite color</span>
      <swc-radio value="1" checked><span slot="label">Red</span></swc-radio>
      <swc-radio value="2"><span slot="label">Green</span></swc-radio>
      <swc-radio value="3"><span slot="label">Blue</span></swc-radio>
    </swc-radio-group>
  `,
  play: async ({ canvasElement }) => {
    const group = await getComponent<RadioGroup>(
      canvasElement,
      'swc-radio-group'
    );
    const items = Array.from(group.querySelectorAll<Radio>('swc-radio'));

    expect(group.getAttribute('role'), 'host carries no role').toBeNull();
    expect(
      group.roleElement?.getAttribute('role'),
      'the internal role element carries role="radiogroup"'
    ).toBe('radiogroup');

    expect(group.roleElement).toBe(
      group.shadowRoot?.querySelector('.swc-RadioGroup')
    );
    const itemsWrapper = group.shadowRoot?.querySelector(
      '.swc-RadioGroup-items'
    );
    expect(itemsWrapper?.getAttribute('role')).toBeNull();
    expect(
      group.roleElement?.contains(
        group.shadowRoot?.querySelector('.swc-FormFieldLabel') ?? null
      )
    ).toBe(true);

    // The layout wrapper slots the light-DOM items inside the role element.
    const itemsSlot = group.roleElement?.querySelector(
      'slot:not([name])'
    ) as HTMLSlotElement | null;
    expect(itemsSlot?.parentElement).toBe(itemsWrapper);
    expect(
      itemsSlot?.assignedElements({ flatten: true }),
      'the layout wrapper slots the items inside the role element'
    ).toEqual(items);

    expect(items.map((item) => item.posInSet)).toEqual([1, 2, 3]);
    expect(items.every((item) => item.setSize === 3)).toBe(true);
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: group label/description wiring precedence
// ──────────────────────────────────────────────────────────────

export const GroupLabelWiringTest: Story = {
  render: () => html`
    <div>
      <span id="external-label">External label</span>
      <swc-radio-group id="slotted-label">
        <span slot="label">Slotted label</span>
        <span slot="description">Slotted description</span>
        <swc-radio value="1"><span slot="label">Red</span></swc-radio>
      </swc-radio-group>
      <swc-radio-group
        id="accessible-label-only"
        accessible-label="String label"
      >
        <swc-radio value="1"><span slot="label">Red</span></swc-radio>
      </swc-radio-group>
      <swc-radio-group
        id="accessible-labelledby-wins"
        accessible-labelledby="external-label"
      >
        <span slot="label">Slotted label (should be outranked)</span>
        <swc-radio value="1"><span slot="label">Red</span></swc-radio>
      </swc-radio-group>
    </div>
  `,
  play: async ({ canvasElement }) => {
    const slotted = await getComponent<RadioGroup>(
      canvasElement,
      '#slotted-label'
    );
    const slottedRole = slotted.roleElement as ReflectedAriaElement | null;
    // The referenced element is the wrapper span in the role element's shadow
    // root, not the slotted element itself.
    const renderedLabelSpan = slotted.shadowRoot?.querySelector(
      '.swc-FormFieldLabel'
    );
    const slottedDescSpan = slotted.shadowRoot?.querySelector(
      '.swc-FormFieldDescription'
    );
    expect(
      slottedRole?.ariaLabelledByElements,
      'a slotted label wires onto the role element via ariaLabelledByElements'
    ).toEqual([renderedLabelSpan]);
    expect(
      slottedRole?.ariaDescribedByElements,
      'a slotted description wires onto the role element via ariaDescribedByElements'
    ).toEqual([slottedDescSpan]);

    const labelOnly = await getComponent<RadioGroup>(
      canvasElement,
      '#accessible-label-only'
    );
    expect(
      (labelOnly.roleElement as ReflectedAriaElement | null)?.getAttribute(
        'aria-label'
      ),
      'accessible-label with no slotted label sets aria-label on the role element'
    ).toBe('String label');

    const labelledbyWins = await getComponent<RadioGroup>(
      canvasElement,
      '#accessible-labelledby-wins'
    );
    const external = canvasElement.querySelector('#external-label');
    expect(
      (labelledbyWins.roleElement as ReflectedAriaElement | null)
        ?.ariaLabelledByElements,
      'accessible-labelledby (external reference) outranks a slotted label'
    ).toEqual([external]);
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: group labeling responds to name-source and slot changes
// ──────────────────────────────────────────────────────────────

export const GroupLabelLifecycleTest: Story = {
  render: () => html`
    <div>
      <span id="dynamic-radio-label">External label</span>
      <swc-radio-group accessible-labelledby="missing-radio-label">
        <span slot="label">Slotted label</span>
        <swc-radio value="1"><span slot="label">Red</span></swc-radio>
      </swc-radio-group>
    </div>
  `,
  play: async ({ canvasElement }) => {
    const group = await getComponent<RadioGroup>(
      canvasElement,
      'swc-radio-group'
    );
    const target = group.roleElement as ReflectedAriaElement;
    const label = group.shadowRoot?.querySelector('.swc-FormFieldLabel');

    expect(target.ariaLabelledByElements).toEqual([label]);

    group.accessibleLabel = 'String label';
    await group.updateComplete;
    expect(target.ariaLabelledByElements).toBeNull();
    expect(target.getAttribute('aria-label')).toBe('String label');

    group.accessibleLabelledby = 'dynamic-radio-label';
    await group.updateComplete;
    expect(target.ariaLabelledByElements).toEqual([
      canvasElement.querySelector('#dynamic-radio-label'),
    ]);

    group.accessibleLabelledby = '';
    group.accessibleLabel = '';
    await group.updateComplete;
    expect(target.ariaLabelledByElements).toEqual([label]);
    expect(target.getAttribute('aria-label')).toBeNull();

    group.querySelector('[slot="label"]')?.remove();
    await waitFor(() => {
      expect(target.ariaLabelledByElements).toBeNull();
    });
  },
};

export const NecessityIndicatorTest: Story = {
  ...NecessityIndicator,
  play: async ({ canvasElement }) => {
    const [requiredIcon, requiredLabel, optionalLabel] =
      canvasElement.querySelectorAll<RadioGroup>('swc-radio-group');
    await Promise.all(
      [requiredIcon, requiredLabel, optionalLabel].map(
        (group) => group.updateComplete
      )
    );

    const indicator = requiredIcon.shadowRoot?.querySelector(
      '.swc-FormFieldLabel-requiredIndicator'
    );
    expect(indicator?.getAttribute('aria-hidden')).toBe('true');
    expect(
      requiredLabel.shadowRoot
        ?.querySelector('.swc-FormFieldLabel-necessityLabel')
        ?.textContent?.trim()
    ).toBe('(required)');
    expect(
      optionalLabel.shadowRoot
        ?.querySelector('.swc-FormFieldLabel-necessityLabel')
        ?.textContent?.trim()
    ).toBe('(optional)');

    // The label stays a non-`<label>` element wired by `aria-labelledby`.
    expect(requiredIcon.shadowRoot?.querySelector('label')).toBeNull();
  },
};

export const ErrorIconTest: Story = {
  ...Invalid,
  play: async ({ canvasElement }) => {
    const group = await getComponent<RadioGroup>(
      canvasElement,
      'swc-radio-group'
    );
    const icon = group.shadowRoot?.querySelector(
      '.swc-FormFieldErrorText-icon'
    );
    expect(icon?.getAttribute('aria-hidden')).toBe('true');
    expect(
      (group.roleElement as ReflectedAriaElement).ariaDescribedByElements
    ).toEqual([group.shadowRoot?.querySelector('.swc-FormFieldErrorText')]);

    group.invalid = false;
    await group.updateComplete;
    expect(
      group.shadowRoot?.querySelector('.swc-FormFieldErrorText-icon')
    ).toBeNull();
  },
};

export const GroupStateLifecycleTest: Story = {
  render: () => html`
    <swc-radio-group>
      <span slot="label">Favorite color</span>
      <swc-radio value="1" checked><span slot="label">Red</span></swc-radio>
    </swc-radio-group>
  `,
  play: async ({ canvasElement }) => {
    const group = await getComponent<RadioGroup>(
      canvasElement,
      'swc-radio-group'
    );
    const target = group.roleElement;
    const attributes = ['aria-required', 'aria-invalid', 'aria-readonly'];

    for (const attribute of attributes) {
      expect(target?.getAttribute(attribute)).toBe('false');
    }

    group.selected = '1';
    group.required = true;
    group.invalid = true;
    group.readonly = true;
    await group.updateComplete;
    for (const attribute of attributes) {
      expect(target?.getAttribute(attribute)).toBe('true');
      expect(group.getAttribute(attribute)).toBeNull();
    }

    group.required = false;
    group.invalid = false;
    group.readonly = false;
    await group.updateComplete;
    for (const attribute of attributes) {
      expect(target?.getAttribute(attribute)).toBe('false');
    }
  },
};

export const DisabledCascadeTest: Story = {
  render: () => html`
    <swc-radio-group disabled>
      <span slot="label">Favorite color</span>
      <swc-radio value="1"><span slot="label">Red</span></swc-radio>
      <swc-radio value="2"><span slot="label">Green</span></swc-radio>
    </swc-radio-group>
  `,
  play: async ({ canvasElement }) => {
    const group = await getComponent<RadioGroup>(
      canvasElement,
      'swc-radio-group'
    );
    const items = Array.from(group.querySelectorAll<Radio>('swc-radio'));

    expect(
      items.every((item) => item.disabled),
      'group-level disabled cascades to every item'
    ).toBe(true);
  },
};

export const DisabledStateLifecycleTest: Story = {
  render: () => html`
    <form>
      <fieldset>
        <swc-radio-group>
          <span slot="label">Shipping</span>
          <swc-radio value="standard">
            <span slot="label">Standard</span>
          </swc-radio>
          <swc-radio value="express" disabled>
            <span slot="label">Express</span>
          </swc-radio>
        </swc-radio-group>
      </fieldset>
    </form>
  `,
  play: async ({ canvasElement }) => {
    const group = await getComponent<RadioGroup>(
      canvasElement,
      'swc-radio-group'
    );
    const items = Array.from(group.querySelectorAll<Radio>('swc-radio'));
    const fieldset = canvasElement.querySelector('fieldset')!;
    await waitFor(() => {
      expect(items.map((item) => item.disabled)).toEqual([false, true]);
      expect(items.map((item) => item.tabIndex)).toEqual([0, -1]);
    });

    group.disabled = true;
    await group.updateComplete;
    await waitFor(() => {
      expect(items.map((item) => item.disabled)).toEqual([true, true]);
      expect(items.map((item) => item.tabIndex)).toEqual([-1, -1]);
    });

    const added = document.createElement('swc-radio') as Radio;
    added.value = 'pickup';
    const label = document.createElement('span');
    label.slot = 'label';
    label.textContent = 'Pickup';
    added.append(label);
    group.append(added);
    await waitFor(() => expect(added.disabled).toBe(true));
    added.remove();
    await waitFor(() => expect(added.disabled).toBe(false));

    fieldset.disabled = true;
    group.disabled = false;
    await group.updateComplete;
    await waitFor(() => {
      expect(items.map((item) => item.disabled)).toEqual([true, true]);
    });

    fieldset.disabled = false;
    await waitFor(() => {
      expect(items.map((item) => item.disabled)).toEqual([false, true]);
      expect(items.map((item) => item.tabIndex)).toEqual([0, -1]);
    });

    group.disabled = true;
    await group.updateComplete;
    group.disabled = false;
    await group.updateComplete;
    await waitFor(() => {
      expect(items.map((item) => item.disabled)).toEqual([false, true]);
      expect(items.map((item) => item.tabIndex)).toEqual([0, -1]);
    });
  },
};

export const InvalidFormSubmissionTest: Story = {
  render: () => html`
    <form>
      <swc-radio-group name="shipping" selected="express" required invalid>
        <span slot="label">Shipping</span>
        <swc-radio value="express"><span slot="label">Express</span></swc-radio>
        <span slot="error-text">
          Express shipping is unavailable for this address.
        </span>
      </swc-radio-group>
    </form>
  `,
  play: async ({ canvasElement }) => {
    const group = await getComponent<RadioGroup>(
      canvasElement,
      'swc-radio-group'
    );
    const form = canvasElement.querySelector('form')!;
    const submit = fn((event: Event) => event.preventDefault());
    const invalid = (event: Event): void => event.preventDefault();
    form.addEventListener('submit', submit);
    group.addEventListener('invalid', invalid);
    try {
      expect(group.validity.customError).toBe(true);
      expect(group.validity.valueMissing).toBe(false);
      expect(group.validationMessage).not.toBe('');
      expect(group.checkValidity()).toBe(false);
      expect(group.reportValidity()).toBe(false);
      expect(form.checkValidity()).toBe(false);
      form.requestSubmit();
      expect(submit).not.toHaveBeenCalled();

      group.invalid = false;
      await group.updateComplete;
      expect(group.checkValidity()).toBe(true);
      expect(group.reportValidity()).toBe(true);
      form.requestSubmit();
      expect(submit).toHaveBeenCalledTimes(1);

      group.selected = '';
      await group.updateComplete;
      expect(group.validity.valueMissing).toBe(true);
      expect(group.validity.customError).toBe(false);
      group.invalid = true;
      await group.updateComplete;
      expect(group.validity.valueMissing).toBe(true);
      expect(group.validity.customError).toBe(true);

      group.disabled = true;
      await group.updateComplete;
      expect(group.willValidate).toBe(false);
      expect(group.checkValidity()).toBe(true);
      expect(form.checkValidity()).toBe(true);
    } finally {
      form.removeEventListener('submit', submit);
      group.removeEventListener('invalid', invalid);
    }
  },
};

const preventDefault = (event: Event): void => event.preventDefault();

const reportFormValidity = (event: Event): void => {
  (event.target as HTMLElement).closest('form')?.reportValidity();
};

export const InvalidSubmitFocusTest: Story = {
  render: () => html`
    <form @submit=${preventDefault}>
      <button type="button" id="before">Before</button>
      <swc-radio-group name="shipping" required>
        <span slot="label">Shipping</span>
        <swc-radio value="express"><span slot="label">Express</span></swc-radio>
        <swc-radio value="standard">
          <span slot="label">Standard</span>
        </swc-radio>
      </swc-radio-group>
      <button type="submit" id="submit">Submit</button>
    </form>
  `,
  play: async ({ canvasElement }) => {
    const group = await getComponent<RadioGroup>(
      canvasElement,
      'swc-radio-group'
    );
    const form = canvasElement.querySelector('form')!;
    const before = canvasElement.querySelector<HTMLButtonElement>('#before')!;
    const cancel = (event: Event): void => event.preventDefault();

    before.focus();
    group.addEventListener('invalid', cancel);
    form.requestSubmit();
    group.removeEventListener('invalid', cancel);
    expect(document.activeElement, 'a canceled invalid event keeps focus').toBe(
      before
    );

    form.requestSubmit();
    expect(document.activeElement, 'the group host is the focus target').toBe(
      group
    );
    expect(
      group.shadowRoot?.activeElement,
      'focus lands on the radiogroup element'
    ).toBe(group.roleElement);

    before.focus();
    group.disabled = true;
    await group.updateComplete;
    group.focus();
    expect(document.activeElement, 'a disabled group ignores focus()').toBe(
      before
    );
  },
};

// With `novalidate` the browser skips validation on submit, so nothing blocks
// the submit or moves focus; validity is only reported when called explicitly.
export const InvalidSubmitNoValidateTest: Story = {
  render: () => html`
    <form novalidate @submit=${preventDefault} @reset=${preventDefault}>
      <button type="button" id="before">Before</button>
      <swc-radio-group name="shipping" required>
        <span slot="label">Shipping</span>
        <swc-radio value="express"><span slot="label">Express</span></swc-radio>
        <swc-radio value="standard">
          <span slot="label">Standard</span>
        </swc-radio>
      </swc-radio-group>
      <button type="submit" id="submit">Submit</button>
      <button type="button" id="report" @click=${reportFormValidity}>
        Report validity
      </button>
    </form>
  `,
  play: async ({ canvasElement }) => {
    const group = await getComponent<RadioGroup>(
      canvasElement,
      'swc-radio-group'
    );
    const form = canvasElement.querySelector('form')!;
    const before = canvasElement.querySelector<HTMLButtonElement>('#before')!;
    const submit = fn();
    const invalid = fn();
    form.addEventListener('submit', submit);
    group.addEventListener('invalid', invalid);
    try {
      before.focus();
      form.requestSubmit();
      expect(submit, 'submit is not blocked').toHaveBeenCalledTimes(1);
      expect(invalid, 'submit fires no invalid event').not.toHaveBeenCalled();
      expect(document.activeElement, 'submit does not move focus').toBe(before);

      expect(form.checkValidity()).toBe(false);
      expect(invalid, 'checkValidity fires invalid').toHaveBeenCalledTimes(1);
      expect(document.activeElement, 'checkValidity is silent').toBe(before);

      const [invalidEvent] = invalid.mock.calls[0] as [Event];
      expect(invalidEvent.target, 'invalid targets the host').toBe(group);
      expect(group.matches(':invalid'), 'the host matches :invalid').toBe(true);
      group.focus();
      expect(document.activeElement, 'host.focus() reaches the wrapper').toBe(
        group
      );
      expect(
        group.shadowRoot?.activeElement,
        'the inner wrapper has focus'
      ).toBe(group.roleElement);
      before.focus();

      expect(form.reportValidity()).toBe(false);
      expect(document.activeElement, 'reportValidity focuses the group').toBe(
        group
      );
    } finally {
      form.removeEventListener('submit', submit);
      group.removeEventListener('invalid', invalid);
    }
  },
};

export const LateAddedSelectionTest: Story = {
  render: () => html`
    <swc-radio-group selected="2">
      <span slot="label">Favorite color</span>
      <swc-radio value="1"><span slot="label">Red</span></swc-radio>
    </swc-radio-group>
  `,
  play: async ({ canvasElement }) => {
    const group = await getComponent<RadioGroup>(
      canvasElement,
      'swc-radio-group'
    );
    const item = document.createElement('swc-radio') as Radio;
    item.value = '2';
    const label = document.createElement('span');
    label.slot = 'label';
    label.textContent = 'Green';
    item.append(label);
    group.append(item);

    await waitFor(() => {
      expect(item.checked).toBe(true);
      expect(item.tabIndex).toBe(0);
      expect(item.posInSet).toBe(2);
      expect(item.setSize).toBe(2);
    });
    expect(group.selected).toBe('2');
    expect(group.querySelector<Radio>('swc-radio[value="1"]')?.checked).toBe(
      false
    );
  },
};

export const InitialCheckedRadioTest: Story = {
  render: () => html`
    <swc-radio-group selected="1">
      <span slot="label" checked value="not-a-radio">Favorite color</span>
      <swc-radio value="1"><span slot="label">Red</span></swc-radio>
      <swc-radio value="2" checked><span slot="label">Green</span></swc-radio>
    </swc-radio-group>
  `,
  play: async ({ canvasElement }) => {
    const group = await getComponent<RadioGroup>(
      canvasElement,
      'swc-radio-group'
    );
    expect(group.selected).toBe('2');
    const items = Array.from(group.querySelectorAll<Radio>('swc-radio'));
    expect(items.map((item) => item.checked)).toEqual([false, true]);
    expect(items[1].tabIndex).toBe(0);
    group.selected = '1';
    await group.updateComplete;
    group.formResetCallback();
    await group.updateComplete;
    expect(group.selected).toBe('2');
  },
};

export const ReadOnlySelectionTest: Story = {
  ...ReadOnly,
  play: async ({ canvasElement }) => {
    const group = await getComponent<RadioGroup>(
      canvasElement,
      'swc-radio-group'
    );
    const items = Array.from(group.querySelectorAll<Radio>('swc-radio'));
    const press = (target: Radio, key: string) =>
      target.dispatchEvent(
        new KeyboardEvent('keydown', {
          key,
          bubbles: true,
          composed: true,
          cancelable: true,
        })
      );
    items[1].focus();

    // Focus moves with the keys, but selection does not follow it.
    press(items[1], 'ArrowRight');
    expect(document.activeElement, 'ArrowRight moves focus').toBe(items[2]);
    press(items[2], 'Home');
    expect(document.activeElement, 'Home moves focus').toBe(items[0]);
    expect(group.selected).toBe('2');
    expect(items.map((item) => item.checked)).toEqual([false, true, false]);

    group.readonly = false;
    await group.updateComplete;
    press(items[0], 'ArrowRight');
    expect(document.activeElement).toBe(items[1]);
    expect(group.selected).toBe('2');
    press(items[1], 'ArrowRight');
    expect(group.selected).toBe('3');
  },
};

export const MultipleCheckedRadiosTest: Story = {
  play: async () => {
    const originalSwc = window.__swc;
    const warn = fn();
    window.__swc = { ...originalSwc, DEBUG: true, warn };
    let group: RadioGroup | undefined;
    try {
      group = await fixture<RadioGroup>(html`
        <swc-radio-group>
          <span slot="label">Favorite color</span>
          <swc-radio value="1" checked><span slot="label">Red</span></swc-radio>
          <swc-radio value="2" checked>
            <span slot="label">Green</span>
          </swc-radio>
        </swc-radio-group>
      `);
      expect(
        warn.mock.calls.some(
          (call) =>
            call[0] === group &&
            call[1] ===
              'Multiple <swc-radio> items are initially checked; the first checked item takes precedence.'
        )
      ).toBe(true);
      expect(group.selected).toBe('1');
      expect(
        Array.from(group.querySelectorAll<Radio>('swc-radio')).map(
          (item) => item.checked
        )
      ).toEqual([true, false]);
    } finally {
      group?.remove();
      window.__swc = originalSwc;
    }
  },
};
