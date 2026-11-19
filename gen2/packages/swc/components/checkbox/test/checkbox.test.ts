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
import { expect, waitFor } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import {
  fixture,
  getComponent,
  getComponents,
  setupSwcWarningSpy,
  withWarningSpy,
} from '@swc-test-helpers/dom';

import { Checkbox } from '@adobe/spectrum-wc/checkbox';
import {
  CHECKBOX_STATUSES,
  CHECKBOX_VALID_SIZES,
  type CheckboxSize,
} from '@adobe/spectrum-wc-core/components/checkbox';

import '@adobe/spectrum-wc/components/checkbox/swc-checkbox.js';

import meta, { Playground } from '../stories/checkbox.stories.js';
import { elementOf, inputOf, partOf } from './helpers/checkbox-test-helpers.js';

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

function recordEvents(target: EventTarget, types: string[]): Event[] {
  const events: Event[] = [];
  for (const type of types) {
    target.addEventListener(type, (event) => events.push(event));
  }
  return events;
}

function boxOf(checkbox: Checkbox): DOMRect {
  const box = partOf(checkbox, '.swc-Checkbox-box');
  if (!box) {
    throw new Error('swc-checkbox rendered no box');
  }
  return box.getBoundingClientRect();
}

// ──────────────────────────────────────────────────────────────
// TEST: Defaults
// ──────────────────────────────────────────────────────────────

export const RegistrationTest: Story = {
  ...Playground,
  play: async ({ canvasElement, step }) => {
    const checkbox = await getComponent<Checkbox>(
      canvasElement,
      'swc-checkbox'
    );

    await step('registers the Checkbox class from swc-checkbox.js', () => {
      expect(
        customElements.get('swc-checkbox'),
        'registered swc-checkbox constructor'
      ).toBe(Checkbox);
      expect(checkbox, 'rendered element class').toBeInstanceOf(Checkbox);
    });

    await step('renders one native checkbox input', () => {
      const inputs =
        checkbox.shadowRoot?.querySelectorAll('input[type="checkbox"]') ?? [];
      expect(inputs, 'native checkbox inputs in shadow root').toHaveLength(1);
      expect(checkbox.roleElement, 'role element is the input').toBe(inputs[0]);
    });

    await step('renders documented public defaults', () => {
      expect(checkbox.size, 'default size').toBe('m');
      expect(checkbox, 'default size attribute').toHaveAttribute('size', 'm');
      expect(checkbox.checked, 'default checked').toBe(false);
      expect(checkbox.indeterminate, 'default indeterminate').toBe(false);
      expect(checkbox.fieldStatus, 'default field status').toBeUndefined();
      expect(checkbox.required, 'default required').toBe(false);
      expect(checkbox.emphasized, 'default emphasized').toBe(false);
      expect(checkbox.name, 'default name').toBeUndefined();
      expect(checkbox.value, 'default value').toBe('on');
    });

    await step('renders a decorative box after the input', () => {
      const box = partOf(checkbox, '.swc-Checkbox-box');
      expect(box, 'box hidden from assistive technology').toHaveAttribute(
        'aria-hidden',
        'true'
      );
      expect(
        inputOf(checkbox).nextElementSibling,
        'element after the input'
      ).toBe(box);
    });
  },
};
RegistrationTest.storyName = 'Registration and render';

export const OptionControlsTest: Story = {
  ...Playground,
  play: async ({ step }) => {
    await step('exposes the supported values in the enum controls', () => {
      expect(meta.argTypes?.size, 'size control').toMatchObject({
        control: { type: 'select' },
        options: [...CHECKBOX_VALID_SIZES],
      });
      expect(
        meta.argTypes?.['field-status'],
        'field-status control'
      ).toMatchObject({
        control: { type: 'select' },
        options: [undefined, ...CHECKBOX_STATUSES],
      });
      expect(
        meta.args?.['field-status'],
        'default field-status arg'
      ).toBeUndefined();
    });
  },
};
OptionControlsTest.storyName = 'Playground option controls';

// ──────────────────────────────────────────────────────────────
// TEST: Properties / Attributes
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

    await step('declares checked as a reactive property', () => {
      expect(
        Checkbox.elementProperties.has('checked'),
        'checked declared as a reactive property'
      ).toBe(true);
      expect(checkbox.checked, 'initial checked').toBe(false);
    });

    await step('drives the inner input from the property', async () => {
      checkbox.checked = true;
      await checkbox.updateComplete;
      expect(input.checked, 'input checked after setting true').toBe(true);
      checkbox.checked = false;
      await checkbox.updateComplete;
      expect(input.checked, 'input checked after setting false').toBe(false);
    });

    await step('updates the property on user activation', async () => {
      input.click();
      await checkbox.updateComplete;
      expect(checkbox.checked, 'checked after an input click').toBe(true);
    });

    await step('lets a change listener read checked from currentTarget', () => {
      let seen: boolean | undefined;
      checkbox.addEventListener(
        'change',
        (event) => {
          seen = (event.currentTarget as Checkbox).checked;
        },
        { once: true }
      );
      input.click();
      expect(seen, 'checked seen by the change listener').toBe(false);
    });

    await step('does not reflect the checked property', async () => {
      checkbox.checked = true;
      await checkbox.updateComplete;
      expect(
        checkbox,
        'checked attribute after property set'
      ).not.toHaveAttribute('checked');
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
    const form = elementOf<HTMLFormElement>(canvasElement, 'form');

    await step('sets the initial state from the checked attribute', () => {
      expect(untouched.checked, 'initial checked from attribute').toBe(true);
      expect(
        inputOf(untouched).checked,
        'initial input checked from attribute'
      ).toBe(true);
    });

    await step('follows the attribute before any change', async () => {
      untouched.removeAttribute('checked');
      await untouched.updateComplete;
      expect(untouched.checked, 'checked after removing attribute').toBe(false);
      untouched.setAttribute('checked', '');
      await untouched.updateComplete;
      expect(untouched.checked, 'checked after adding attribute').toBe(true);
    });

    await step(
      'stops following the attribute after a user toggle',
      async () => {
        inputOf(toggled).click();
        await toggled.updateComplete;
        expect(toggled.checked, 'checked after user toggle').toBe(false);
        expect(
          toggled,
          'checked attribute kept after user toggle'
        ).toHaveAttribute('checked');
        toggled.removeAttribute('checked');
        toggled.setAttribute('checked', '');
        await toggled.updateComplete;
        expect(
          toggled.checked,
          'checked after re-adding attribute post toggle'
        ).toBe(false);
      }
    );

    await step(
      'stops following the attribute after a script change',
      async () => {
        untouched.checked = false;
        await untouched.updateComplete;
        untouched.removeAttribute('checked');
        untouched.setAttribute('checked', '');
        await untouched.updateComplete;
        expect(
          untouched.checked,
          'checked after re-adding attribute post script change'
        ).toBe(false);
      }
    );

    await step(
      'restores the attribute and its control on form reset',
      async () => {
        form.reset();
        await toggled.updateComplete;
        await untouched.updateComplete;
        expect(toggled.checked, 'toggled checked after reset').toBe(true);
        expect(untouched.checked, 'untouched checked after reset').toBe(true);
        toggled.removeAttribute('checked');
        await toggled.updateComplete;
        expect(
          toggled.checked,
          'checked after removing attribute post reset'
        ).toBe(false);
      }
    );

    await step(
      'stops following the attribute when checked is set to its current value',
      async () => {
        form.reset();
        untouched.checked = true;
        untouched.removeAttribute('checked');
        await untouched.updateComplete;
        expect(
          untouched.checked,
          'checked after same-value set and attribute removal'
        ).toBe(true);
      }
    );

    await step('converts checked to a boolean', async () => {
      const loose = untouched as unknown as { checked: unknown };
      loose.checked = 'yes';
      expect(untouched.checked, 'checked from a truthy string').toBe(true);
      loose.checked = 0;
      expect(untouched.checked, 'checked from zero').toBe(false);
      await untouched.updateComplete;
    });

    await step(
      'hands control back to the attribute on a form reset during a click',
      async () => {
        toggled.setAttribute('checked', '');
        form.reset();
        await toggled.updateComplete;
        const reset = (): void => form.reset();
        toggled.addEventListener('click', reset, { once: true });
        inputOf(toggled).click();
        await toggled.updateComplete;
        expect(toggled.checked, 'checked after reset during click').toBe(true);
        toggled.removeAttribute('checked');
        await toggled.updateComplete;
        expect(
          toggled.checked,
          'checked after removing attribute post click reset'
        ).toBe(false);
      }
    );
  },
};
CheckedAttributeTest.storyName = 'checked attribute is the default';

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
      'reflects supported statuses without mirroring host attributes',
      async () => {
        for (const status of CHECKBOX_STATUSES) {
          checkbox.fieldStatus = status;
          await checkbox.updateComplete;
          expect(
            checkbox.getAttribute('field-status'),
            `field-status attribute for "${status}"`
          ).toBe(status);
          expect(
            checkbox,
            `host disabled attribute for "${status}"`
          ).not.toHaveAttribute('disabled');
          expect(
            checkbox,
            `host readonly attribute for "${status}"`
          ).not.toHaveAttribute('readonly');
        }
      }
    );

    await step('clears the status when the attribute is removed', async () => {
      checkbox.removeAttribute('field-status');
      await checkbox.updateComplete;
      expect(
        checkbox.fieldStatus,
        'field status after attribute removal'
      ).toBeUndefined();
    });

    await step(
      'tracks field-status="disabled" with the disabled custom state',
      async () => {
        checkbox.fieldStatus = 'disabled';
        await checkbox.updateComplete;
        expect(
          checkbox.matches(':state(disabled)'),
          'disabled custom state while disabled'
        ).toBe(true);
        checkbox.fieldStatus = 'readonly';
        await checkbox.updateComplete;
        expect(
          checkbox.matches(':state(disabled)'),
          'disabled custom state while read-only'
        ).toBe(false);
      }
    );
  },
};
FieldStatusTest.storyName = 'field-status values';

export const AriaStatesTest: Story = {
  render: () => html`
    <swc-checkbox><span slot="label">Terms</span></swc-checkbox>
  `,
  play: async ({ canvasElement, step }) => {
    const checkbox = await getComponent<Checkbox>(
      canvasElement,
      'swc-checkbox'
    );
    const input = inputOf(checkbox);

    await step('renders no role on the host', () => {
      expect(checkbox, 'host role attribute').not.toHaveAttribute('role');
    });

    await step(
      'sets aria-disabled on the input only while read-only',
      async () => {
        // Native readonly and aria-readonly do not apply to checkboxes, so
        // read-only is exposed as aria-disabled on a focusable input.
        checkbox.fieldStatus = 'readonly';
        await checkbox.updateComplete;
        expect(input, 'input aria-disabled while read-only').toHaveAttribute(
          'aria-disabled',
          'true'
        );
        expect(
          input,
          'input aria-readonly while read-only'
        ).not.toHaveAttribute('aria-readonly');
        expect(input.disabled, 'input disabled while read-only').toBe(false);
        expect(
          checkbox,
          'host aria-disabled while read-only'
        ).not.toHaveAttribute('aria-disabled');
        checkbox.fieldStatus = undefined;
        await checkbox.updateComplete;
        expect(
          input,
          'input aria-disabled after clearing status'
        ).not.toHaveAttribute('aria-disabled');
      }
    );

    await step(
      'sets aria-invalid on the input only while invalid',
      async () => {
        checkbox.fieldStatus = 'invalid';
        await checkbox.updateComplete;
        expect(input, 'input aria-invalid while invalid').toHaveAttribute(
          'aria-invalid',
          'true'
        );
        checkbox.fieldStatus = 'readonly';
        await checkbox.updateComplete;
        expect(input, 'input aria-invalid while read-only').not.toHaveAttribute(
          'aria-invalid'
        );
        checkbox.fieldStatus = undefined;
        await checkbox.updateComplete;
      }
    );

    await step(
      'uses native required instead of hand-written ARIA',
      async () => {
        checkbox.required = true;
        await checkbox.updateComplete;
        expect(input.required, 'input required').toBe(true);
        expect(input, 'input aria-required').not.toHaveAttribute(
          'aria-required'
        );
      }
    );

    await step(
      'treats a required read-only checkbox as neither required nor invalid',
      async () => {
        checkbox.fieldStatus = 'readonly';
        await checkbox.updateComplete;
        // A read-only checkbox is barred from validation, so required does
        // nothing and is not announced.
        expect(checkbox.willValidate, 'willValidate while read-only').toBe(
          false
        );
        expect(input.required, 'input required while read-only').toBe(false);
        expect(
          input,
          'input aria-required while read-only'
        ).not.toHaveAttribute('aria-required');
        expect(
          input,
          'input aria-invalid while required and read-only'
        ).not.toHaveAttribute('aria-invalid');
        expect(input.validity.valid, 'input validity while read-only').toBe(
          true
        );
        checkbox.fieldStatus = undefined;
        await checkbox.updateComplete;
        expect(input.required, 'input required after clearing status').toBe(
          true
        );
        expect(
          input,
          'input aria-required after clearing status'
        ).not.toHaveAttribute('aria-required');
      }
    );
  },
};
AriaStatesTest.storyName = 'ARIA states on the inner input';

export const DescribedByTest: Story = {
  render: () => html`
    <p id="checkbox-external-description">Applies to all mailing lists.</p>
    <swc-checkbox accessible-describedby="checkbox-external-description">
      <span slot="label">Unsubscribe</span>
      <span slot="description">Takes effect within a day.</span>
    </swc-checkbox>
  `,
  play: async ({ canvasElement, step }) => {
    const checkbox = await getComponent<Checkbox>(
      canvasElement,
      'swc-checkbox'
    );

    await step(
      'adds the accessible-describedby element to the description',
      () => {
        const described = inputOf(checkbox).ariaDescribedByElements ?? [];
        expect(described, 'input describedby element count').toHaveLength(2);
        expect(described[0], 'first describedby element').toHaveClass(
          'swc-FormFieldDescription'
        );
        expect(described[1]?.id, 'second describedby element id').toBe(
          'checkbox-external-description'
        );
      }
    );
  },
};
DescribedByTest.storyName = 'accessible-describedby';

// ──────────────────────────────────────────────────────────────
// TEST: Slots
// ──────────────────────────────────────────────────────────────

export const LabelSlotTest: Story = {
  ...Playground,
  play: async ({ canvasElement, step }) => {
    const checkbox = await getComponent<Checkbox>(
      canvasElement,
      'swc-checkbox'
    );

    await step('labels the input with the label slot content', () => {
      const input = inputOf(checkbox);
      const label = input.labels?.[0];
      const slot = label?.querySelector<HTMLSlotElement>('slot[name="label"]');
      const text = slot
        ?.assignedNodes({ flatten: true })
        .map((node) => node.textContent)
        .join('')
        .trim();
      expect(input.labels, 'labels of the input').toHaveLength(1);
      expect(text, 'slotted label text').toBe('Send me product updates');
    });
  },
};
LabelSlotTest.storyName = 'Label slot';

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
    const fieldset = elementOf<HTMLFieldSetElement>(canvasElement, 'fieldset');
    const icon = (checkbox: Checkbox): HTMLElement | null =>
      partOf(checkbox, '.swc-FormFieldErrorText-icon');

    await step('describes the input with the description by default', () => {
      const description = partOf(both, '.swc-FormFieldDescription');
      expect(description, 'rendered description').toBeTruthy();
      expect(
        partOf(both, '.swc-FormFieldErrorText'),
        'rendered error text while valid'
      ).toBe(null);
      expect(
        inputOf(both).ariaDescribedByElements?.[0],
        'input describedby element while valid'
      ).toBe(description);
      expect(icon(both), 'error icon while valid').toBe(null);
    });

    await step(
      'replaces the description with error text while invalid',
      async () => {
        both.fieldStatus = 'invalid';
        await both.updateComplete;
        const errorText = partOf(both, '.swc-FormFieldErrorText');
        expect(errorText, 'rendered error text while invalid').toBeTruthy();
        expect(
          partOf(both, '.swc-FormFieldDescription'),
          'rendered description while invalid'
        ).toBe(null);
        expect(
          inputOf(both).ariaDescribedByElements?.[0],
          'input describedby element while invalid'
        ).toBe(errorText);
        expect(icon(both), 'error icon while invalid').toBeTruthy();
      }
    );

    await step('shows the error icon with only a description or alone', () => {
      expect(
        icon(descriptionOnly),
        'error icon with only a description'
      ).toBeTruthy();
      expect(
        icon(neither),
        'error icon without description or error text'
      ).toBeTruthy();
    });

    await step(
      'hides the icon but keeps error text and aria-invalid in a disabled fieldset',
      async () => {
        fieldset.disabled = true;
        await waitFor(() =>
          expect(icon(both), 'error icon in a disabled fieldset').toBe(null)
        );
        expect(
          partOf(both, '.swc-FormFieldErrorText'),
          'error text in a disabled fieldset'
        ).toBeTruthy();
        expect(
          inputOf(both),
          'input aria-invalid in a disabled fieldset'
        ).toHaveAttribute('aria-invalid', 'true');
        fieldset.disabled = false;
        await waitFor(() =>
          expect(
            icon(both),
            'error icon after enabling the fieldset'
          ).toBeTruthy()
        );
      }
    );

    await step('restores the description when the status clears', async () => {
      both.fieldStatus = undefined;
      await both.updateComplete;
      expect(
        partOf(both, '.swc-FormFieldDescription'),
        'rendered description after clearing status'
      ).toBeTruthy();
      expect(icon(both), 'error icon after clearing status').toBe(null);
    });
  },
};
DescriptionTest.storyName = 'Description, error text, and error icon';

export const DescriptionClickTest: Story = {
  render: () => html`
    <swc-checkbox>
      <span slot="label">Terms</span>
      <span slot="description">Read the terms first.</span>
      <span slot="error-text">Accept the terms to continue.</span>
    </swc-checkbox>
  `,
  play: async ({ canvasElement, step }) => {
    const checkbox = await getComponent<Checkbox>(
      canvasElement,
      'swc-checkbox'
    );
    const events = recordEvents(checkbox, ['input', 'change']);

    await step('does not toggle on a description click', async () => {
      checkbox.querySelector<HTMLElement>('[slot="description"]')?.click();
      await checkbox.updateComplete;
      expect(checkbox.checked, 'checked after a description click').toBe(false);
      expect(events, 'events after a description click').toHaveLength(0);
    });

    await step('does not toggle on an error text click', async () => {
      checkbox.fieldStatus = 'invalid';
      await checkbox.updateComplete;
      checkbox.querySelector<HTMLElement>('[slot="error-text"]')?.click();
      await checkbox.updateComplete;
      expect(checkbox.checked, 'checked after an error text click').toBe(false);
      expect(events, 'events after an error text click').toHaveLength(0);
    });
  },
};
DescriptionClickTest.storyName = 'Description and error text clicks';

// ──────────────────────────────────────────────────────────────
// TEST: Variants / States
// ──────────────────────────────────────────────────────────────

export const SizeTest: Story = {
  ...Playground,
  play: async ({ canvasElement, step }) => {
    const checkbox = await getComponent<Checkbox>(
      canvasElement,
      'swc-checkbox'
    );

    await step(
      'keeps an invalid size, warns, and renders the default icons',
      () =>
        withWarningSpy(async (warnCalls) => {
          checkbox.setAttribute('size', 'xxl');
          await checkbox.updateComplete;
          expect(
            checkbox,
            'size attribute after an invalid value'
          ).toHaveAttribute('size', 'xxl');
          for (const icon of ['checkmark', 'dash']) {
            expect(
              partOf(checkbox, `swc-ui-icon[icon="${icon}"]`),
              `${icon} icon size for an invalid size`
            ).toHaveAttribute('size', 's');
          }
          expect(
            warnCalls.some((call) => String(call[1]).includes('"size"')),
            'warning names the invalid size'
          ).toBe(true);
          checkbox.removeAttribute('size');
          await checkbox.updateComplete;
        })
    );

    await step('reflects each valid size to the attribute', async () => {
      for (const size of CHECKBOX_VALID_SIZES) {
        checkbox.size = size;
        await checkbox.updateComplete;
        expect(checkbox, `size attribute for "${size}"`).toHaveAttribute(
          'size',
          size
        );
      }
    });
  },
};
SizeTest.storyName = 'Sizes';

export const BoxIconsTest: Story = {
  render: () => html`
    <swc-checkbox><span slot="label">Icons</span></swc-checkbox>
  `,
  play: async ({ canvasElement, step }) => {
    const checkbox = await getComponent<Checkbox>(
      canvasElement,
      'swc-checkbox'
    );
    const icon = (name: string): HTMLElement | null =>
      partOf(checkbox, `.swc-Checkbox-box swc-ui-icon[icon="${name}"]`);

    await step('renders the checkmark and dash icons in the box', () => {
      expect(icon('checkmark'), 'checkmark icon in the box').toBeTruthy();
      expect(icon('dash'), 'dash icon in the box').toBeTruthy();
    });

    await step(
      'sizes the icons one step smaller than the checkbox',
      async () => {
        const expected = {
          s: 'xs',
          m: 's',
          l: 'm',
          xl: 'l',
        } as const satisfies Record<CheckboxSize, string>;
        for (const size of CHECKBOX_VALID_SIZES) {
          const iconSize = expected[size];
          checkbox.size = size;
          await checkbox.updateComplete;
          expect(
            icon('checkmark'),
            `checkmark icon size for "${size}"`
          ).toHaveAttribute('size', iconSize);
          expect(icon('dash'), `dash icon size for "${size}"`).toHaveAttribute(
            'size',
            iconSize
          );
        }
      }
    );
  },
};
BoxIconsTest.storyName = 'Checkmark and dash icons';

export const BoxLayoutTest: Story = {
  render: () => html`
    <div style="inline-size: 160px">
      <swc-checkbox>
        <span slot="label">A long label that wraps across several lines</span>
      </swc-checkbox>
      <swc-checkbox accessible-label="No visible label"></swc-checkbox>
    </div>
  `,
  play: async ({ canvasElement, step }) => {
    const [wrapped, unlabeled] = await getComponents<Checkbox>(
      canvasElement,
      'swc-checkbox'
    );

    await step(
      'renders the form-field grid and the checkbox on one root',
      () => {
        const root = wrapped.shadowRoot?.firstElementChild;
        expect(root, 'shadow root first element classes').toHaveClass(
          'swc-FormField',
          'swc-Checkbox'
        );
      }
    );

    await step(
      'keeps the UI icon box for each icon step, without CSS resizing',
      async () => {
        // Desktop ui-icon tokens for the xs, s, m, and l icon sizes, in pixels.
        // The per-icon checkmark and dash size tokens are deleted in gen2.
        const expected = {
          s: [8, 8],
          m: [10, 10],
          l: [10, 10],
          xl: [12, 12],
        } as const satisfies Record<CheckboxSize, readonly [number, number]>;
        for (const size of CHECKBOX_VALID_SIZES) {
          const [checkmark, dash] = expected[size];
          wrapped.size = size;
          await wrapped.updateComplete;
          // offsetWidth ignores the scale(0) that hides an unselected icon.
          const width = (name: string): number | undefined =>
            partOf(wrapped, `swc-ui-icon[icon="${name}"]`)?.offsetWidth;
          expect(width('checkmark'), `${size} checkmark`).toBe(checkmark);
          expect(width('dash'), `${size} dash`).toBe(dash);
        }
        wrapped.size = 'm';
        await wrapped.updateComplete;
      }
    );

    await step(
      'covers only the box with the input when the label wraps',
      () => {
        // The in-shadow <label for> makes the label toggle the input.
        const box = boxOf(wrapped);
        const input = inputOf(wrapped).getBoundingClientRect();
        expect(input.toJSON(), 'input bounds match the box').toEqual(
          box.toJSON()
        );
      }
    );

    await step(
      'renders the box without an offset when there is no visible label',
      () => {
        const box = boxOf(unlabeled);
        const host = unlabeled.getBoundingClientRect();
        expect(box.top, 'box top matches host top').toBe(host.top);
        expect(host.height, 'host height matches box height').toBe(box.height);
      }
    );
  },
};
BoxLayoutTest.storyName = 'Box layout';

export const CjkLineHeightTest: Story = {
  render: () => html`
    <swc-checkbox lang="ja">
      <span slot="label">製品の最新情報を受け取る</span>
      <span slot="description">月に一度メールでお届けします</span>
    </swc-checkbox>
  `,
  play: async ({ canvasElement, step }) => {
    const checkbox = await getComponent<Checkbox>(
      canvasElement,
      'swc-checkbox'
    );

    await step(
      'applies the CJK line height to the label and description',
      () => {
        for (const selector of [
          '.swc-FormFieldLabel',
          '.swc-FormFieldDescription',
        ]) {
          const element = partOf(checkbox, selector);
          if (!element) {
            throw new Error(`swc-checkbox rendered no ${selector}`);
          }
          const { fontSize, lineHeight } = getComputedStyle(element);
          expect(
            parseFloat(lineHeight) / parseFloat(fontSize),
            `${selector} line-height ratio`
          ).toBeCloseTo(1.5, 2);
        }
      }
    );
  },
};
CjkLineHeightTest.storyName = 'CJK line height';

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

    await step('sets indeterminate on the inner input and reflects it', () => {
      expect(
        inputOf(checked).indeterminate,
        'input indeterminate from attribute'
      ).toBe(true);
      expect(checked, 'indeterminate attribute').toHaveAttribute(
        'indeterminate'
      );
      expect(checked.checked, 'checked alongside indeterminate').toBe(true);
    });

    await step(
      'unchecks an indeterminate checked checkbox on click',
      async () => {
        inputOf(checked).click();
        await checked.updateComplete;
        expect(checked.indeterminate, 'indeterminate after click').toBe(false);
        expect(checked.checked, 'checked after click').toBe(false);
        expect(
          inputOf(checked).indeterminate,
          'input indeterminate after click'
        ).toBe(false);
        expect(
          checked,
          'indeterminate attribute after click'
        ).not.toHaveAttribute('indeterminate');
      }
    );

    await step(
      'checks an indeterminate unchecked checkbox on click',
      async () => {
        inputOf(unchecked).click();
        await unchecked.updateComplete;
        expect(unchecked.indeterminate, 'indeterminate after click').toBe(
          false
        );
        expect(unchecked.checked, 'checked after click').toBe(true);
      }
    );

    await step(
      'leaves checked unchanged when indeterminate is set',
      async () => {
        unchecked.indeterminate = true;
        await unchecked.updateComplete;
        expect(unchecked.checked, 'checked after setting indeterminate').toBe(
          true
        );
        expect(
          inputOf(unchecked).indeterminate,
          'input indeterminate after setting indeterminate'
        ).toBe(true);
      }
    );
  },
};
IndeterminateTest.storyName = 'indeterminate';

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

    await step('fires one non-cancelable change on a user toggle', async () => {
      const events = recordEvents(checkbox, ['change']);
      input.click();
      await checkbox.updateComplete;
      expect(events, 'change events after a user toggle').toHaveLength(1);
      const [change] = events;
      expect(change, 'change event class').not.toBeInstanceOf(CustomEvent);
      expect(change.bubbles, 'change bubbles').toBe(true);
      expect(change.composed, 'change composed').toBe(true);
      expect(change.cancelable, 'change cancelable').toBe(false);
    });

    await step(
      'dispatches input to the host after checked updates',
      async () => {
        let seen: boolean | undefined;
        checkbox.addEventListener(
          'input',
          () => {
            seen = checkbox.checked;
          },
          { once: true }
        );
        input.click();
        expect(seen, 'checked seen by the input listener').toBe(false);
        await checkbox.updateComplete;
      }
    );

    await step(
      'still fires change when an input listener makes the checkbox read-only',
      async () => {
        const events = recordEvents(checkbox, ['change']);
        const makeReadOnly = (): void => {
          checkbox.fieldStatus = 'readonly';
        };
        checkbox.addEventListener('input', makeReadOnly, { once: true });
        const before = checkbox.checked;
        input.click();
        expect(
          events,
          'change events after an input listener sets read-only'
        ).toHaveLength(1);
        expect(
          checkbox.checked,
          'checked after an input listener sets read-only'
        ).toBe(!before);
        checkbox.fieldStatus = undefined;
        await checkbox.updateComplete;
      }
    );

    await step('fires nothing for programmatic changes', async () => {
      const events = recordEvents(checkbox, ['change', 'input']);
      checkbox.checked = !checkbox.checked;
      checkbox.indeterminate = true;
      await checkbox.updateComplete;
      expect(events, 'events after programmatic changes').toHaveLength(0);
    });

    await step(
      'blocks the toggle and change when click is canceled',
      async () => {
        const before = checkbox.checked;
        const events = recordEvents(checkbox, ['change', 'input']);
        const cancel = (event: Event): void => event.preventDefault();
        checkbox.addEventListener('click', cancel);
        checkbox.click();
        input.click();
        await checkbox.updateComplete;
        checkbox.removeEventListener('click', cancel);
        expect(checkbox.checked, 'checked after canceled clicks').toBe(before);
        expect(input.checked, 'input checked after canceled clicks').toBe(
          before
        );
        expect(events, 'events after canceled clicks').toHaveLength(0);
      }
    );
  },
};
ChangeEventTest.storyName = 'change event';

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
    const fieldset = elementOf<HTMLFieldSetElement>(canvasElement, 'fieldset');
    const events = recordEvents(checkbox, ['change']);

    await step('toggles an enabled checkbox on click()', async () => {
      checkbox.click();
      await checkbox.updateComplete;
      expect(checkbox.checked, 'checked after click()').toBe(true);
      expect(events, 'change events after click()').toHaveLength(1);
    });

    await step(
      'disables the input and click() for field-status="disabled"',
      async () => {
        checkbox.fieldStatus = 'disabled';
        await checkbox.updateComplete;
        expect(inputOf(checkbox).disabled, 'input disabled').toBe(true);
        checkbox.click();
        await checkbox.updateComplete;
        expect(checkbox.checked, 'checked after click() while disabled').toBe(
          true
        );
        expect(
          events,
          'change events after click() while disabled'
        ).toHaveLength(1);
        checkbox.fieldStatus = undefined;
        await checkbox.updateComplete;
      }
    );

    await step(
      'ignores click() right after disabling, before the input updates',
      async () => {
        checkbox.fieldStatus = 'disabled';
        checkbox.click();
        await checkbox.updateComplete;
        expect(
          checkbox.checked,
          'checked after click() right after disabling'
        ).toBe(true);
        expect(
          events,
          'change events after click() right after disabling'
        ).toHaveLength(1);
        checkbox.fieldStatus = undefined;
        await checkbox.updateComplete;
      }
    );

    await step(
      'disables the input and click() in a disabled fieldset',
      async () => {
        fieldset.disabled = true;
        await waitFor(() =>
          expect(
            inputOf(checkbox).disabled,
            'input disabled in a disabled fieldset'
          ).toBe(true)
        );
        checkbox.click();
        await checkbox.updateComplete;
        expect(
          checkbox.checked,
          'checked after click() in a disabled fieldset'
        ).toBe(true);
        expect(
          events,
          'change events after click() in a disabled fieldset'
        ).toHaveLength(1);
        fieldset.disabled = false;
        await waitFor(() =>
          expect(
            inputOf(checkbox).disabled,
            'input disabled after enabling the fieldset'
          ).toBe(false)
        );
      }
    );

    await step(
      'toggles on click() right after re-enabling, before the input updates',
      async () => {
        checkbox.fieldStatus = 'disabled';
        await checkbox.updateComplete;
        checkbox.fieldStatus = undefined;
        checkbox.click();
        expect(
          checkbox.checked,
          'checked after click() right after clearing disabled'
        ).toBe(false);
        await checkbox.updateComplete;

        fieldset.disabled = true;
        await waitFor(() =>
          expect(
            inputOf(checkbox).disabled,
            'input disabled in a disabled fieldset'
          ).toBe(true)
        );
        fieldset.disabled = false;
        checkbox.click();
        expect(
          checkbox.checked,
          'checked after click() right after enabling the fieldset'
        ).toBe(true);
        await checkbox.updateComplete;
      }
    );
  },
};
ClickTest.storyName = 'click() and disabled';

export const ClickBeforeRenderTest: Story = {
  ...Playground,
  play: async ({ canvasElement, step }) => {
    const checkbox = document.createElement('swc-checkbox') as Checkbox;
    checkbox.accessibleLabel = 'Created in script';
    const events = recordEvents(checkbox, ['input', 'change']);

    await step('does nothing on click() before connecting', () => {
      expect(checkbox.roleElement, 'input before connecting').toBe(null);
      expect(() => checkbox.click(), 'click() before connecting').not.toThrow();
      expect(checkbox.checked, 'checked after click() before connecting').toBe(
        false
      );
      expect(events, 'events after click() before connecting').toHaveLength(0);
    });

    await step(
      'does nothing on click() after connecting, before the first render',
      async () => {
        canvasElement.append(checkbox);
        expect(checkbox.hasUpdated, 'first render done on connect').toBe(false);
        expect(
          () => checkbox.click(),
          'click() before first render'
        ).not.toThrow();
        await checkbox.updateComplete;
        expect(checkbox.checked, 'checked after click() before render').toBe(
          false
        );
        expect(events, 'events after click() before render').toHaveLength(0);
      }
    );

    await step('toggles on click() after the first render', async () => {
      checkbox.click();
      await checkbox.updateComplete;
      expect(checkbox.checked, 'checked after click() post render').toBe(true);
      expect(
        events.map((event) => event.type),
        'events after click() post render'
      ).toEqual(['input', 'change']);
      checkbox.remove();
    });
  },
};
ClickBeforeRenderTest.storyName = 'click() before the first render';

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

    await step('keeps the input enabled while read-only', () => {
      expect(input.disabled, 'input disabled while read-only').toBe(false);
    });

    await step('ignores clicks on the input, label, and host', async () => {
      input.click();
      input.labels?.[0]?.click();
      checkbox.click();
      await checkbox.updateComplete;
      expect(checkbox.checked, 'checked after read-only clicks').toBe(true);
      expect(input.checked, 'input checked after read-only clicks').toBe(true);
      expect(events, 'events after read-only clicks').toHaveLength(0);
    });

    await step('still delivers every click to consumers', () => {
      // The input click, the label click and its input click, and click().
      expect(clicks, 'click events seen by consumers').toHaveLength(4);
    });

    await step('keeps the mixed state when canceling', async () => {
      checkbox.indeterminate = true;
      await checkbox.updateComplete;
      input.click();
      await checkbox.updateComplete;
      expect(
        checkbox.indeterminate,
        'indeterminate after a read-only click'
      ).toBe(true);
      expect(
        input.indeterminate,
        'input indeterminate after a read-only click'
      ).toBe(true);
      expect(checkbox.checked, 'checked after a read-only click').toBe(true);
      expect(events, 'events after a read-only click').toHaveLength(0);
      checkbox.indeterminate = false;
      await checkbox.updateComplete;
    });

    await step('undoes a click stopped before the guard', async () => {
      const stop = (event: Event): void => event.stopPropagation();
      canvasElement.addEventListener('click', stop, { capture: true });
      input.click();
      canvasElement.removeEventListener('click', stop, { capture: true });
      await checkbox.updateComplete;
      expect(checkbox.checked, 'checked after a stopped click').toBe(true);
      expect(input.checked, 'input checked after a stopped click').toBe(true);
      expect(events, 'events after a stopped click').toHaveLength(0);
    });

    await step('restores toggling when the status clears', async () => {
      checkbox.fieldStatus = undefined;
      await checkbox.updateComplete;
      input.click();
      await checkbox.updateComplete;
      expect(checkbox.checked, 'checked after clearing read-only').toBe(false);
      expect(
        events.map((event) => event.type),
        'events after clearing read-only'
      ).toEqual(['input', 'change']);
    });
  },
};
ReadOnlyTest.storyName = 'field-status="readonly" blocks the toggle';

// ──────────────────────────────────────────────────────────────
// TEST: Dev mode warnings
// ──────────────────────────────────────────────────────────────

export const FieldStatusWarningTest: Story = {
  render: () => html`
    <swc-checkbox><span slot="label">Status</span></swc-checkbox>
  `,
  play: async ({ canvasElement, step }) => {
    const checkbox = await getComponent<Checkbox>(
      canvasElement,
      'swc-checkbox'
    );

    await step('does not warn for supported statuses', async () => {
      await withWarningSpy(async (warnCalls) => {
        for (const status of CHECKBOX_STATUSES) {
          checkbox.fieldStatus = status;
          await checkbox.updateComplete;
        }
        expect(warnCalls, 'warnings for supported statuses').toHaveLength(0);
      });
    });

    await step('warns for valid and unknown statuses in dev', async () => {
      await withWarningSpy(async (warnCalls) => {
        checkbox.setAttribute('field-status', 'valid');
        await checkbox.updateComplete;
        expect(
          warnCalls.length,
          'warning count for field-status="valid"'
        ).toBeGreaterThan(0);
        expect(
          String(warnCalls[0][1]),
          'warning message for field-status="valid"'
        ).toContain('field-status');
      });
      checkbox.removeAttribute('field-status');
      await checkbox.updateComplete;
    });
  },
};
FieldStatusWarningTest.storyName = 'field-status warnings';

export const LabellingWarningsTest: Story = {
  render: () => html`
    <swc-checkbox><span slot="label">Named</span></swc-checkbox>
  `,
  play: async ({ step }) => {
    const messages = (warnCalls: unknown[][]): string[] =>
      warnCalls.map((call) => String(call?.[1] ?? ''));
    const warningsFor = async (template: TemplateResult): Promise<string[]> => {
      let result: string[] = [];
      await withWarningSpy(async (warnCalls) => {
        const checkbox = await fixture<Checkbox>(template);
        try {
          result = messages(warnCalls);
        } finally {
          checkbox.parentElement?.remove();
        }
      });
      return result;
    };

    await step('warns when a checkbox has no accessible name', async () => {
      const warnings = await warningsFor(html`
        <swc-checkbox></swc-checkbox>
      `);
      expect(
        warnings.some((m) => m.includes('accessible name')),
        'missing accessible name warning'
      ).toBe(true);
    });

    await step('warns about aria-label on the host', async () => {
      const warnings = await warningsFor(html`
        <swc-checkbox aria-label="Host name"></swc-checkbox>
      `);
      expect(
        warnings.some((m) => m.includes('"aria-label"')),
        'host aria-label warning'
      ).toBe(true);
    });

    await step(
      'warns when accessible-labelledby and accessible-label are both set',
      async () => {
        const heading = document.createElement('span');
        heading.id = 'warning-heading';
        heading.textContent = 'Heading';
        document.body.append(heading);
        let warnings: string[];
        try {
          warnings = await warningsFor(html`
            <swc-checkbox
              accessible-label="Label"
              accessible-labelledby="warning-heading"
            ></swc-checkbox>
          `);
        } finally {
          heading.remove();
        }
        expect(
          warnings.some((m) =>
            m.includes('both "accessible-labelledby" and "accessible-label"')
          ),
          'conflicting labelling attributes warning'
        ).toBe(true);
      }
    );

    await step(
      'warns about an unresolved accessible-labelledby id',
      async () => {
        const warnings = await warningsFor(html`
          <swc-checkbox
            accessible-label="Label"
            accessible-labelledby="missing-id"
          ></swc-checkbox>
        `);
        expect(
          warnings.some((m) => m.includes('"missing-id"')),
          'unresolved accessible-labelledby warning'
        ).toBe(true);
      }
    );

    await step(
      'warns when an external label targets the checkbox',
      async () => {
        await withWarningSpy(async (warnCalls) => {
          // fixture() returns the first checkbox; its container holds the rest.
          const first = await fixture<Checkbox>(html`
            <swc-checkbox
              id="external-target"
              accessible-label="Named"
            ></swc-checkbox>
            <label for="external-target">External</label>
            <label>
              Wrapping
              <swc-checkbox accessible-label="Named"></swc-checkbox>
            </label>
          `);
          const container = first.parentElement;
          try {
            if (!container) {
              throw new Error('fixture() rendered no container');
            }
            const checkboxes = await getComponents<Checkbox>(
              container,
              'swc-checkbox'
            );
            const labelWarnings = warnCalls.filter((call) =>
              String(call?.[1] ?? '').includes('<label>')
            );
            expect(
              labelWarnings.map((call) => call[0]),
              'elements warned about an external label'
            ).toEqual(checkboxes);
          } finally {
            container?.remove();
          }
        });
      }
    );

    await step(
      'warns about leftover readonly and invalid attributes',
      async () => {
        const warnings = await warningsFor(html`
          <swc-checkbox
            readonly
            invalid
            accessible-label="Named"
          ></swc-checkbox>
        `);
        expect(
          warnings.some((m) => m.includes('"readonly" attribute')),
          'leftover readonly attribute warning'
        ).toBe(true);
        expect(
          warnings.some((m) => m.includes('"invalid" attribute')),
          'leftover invalid attribute warning'
        ).toBe(true);
      }
    );

    await step(
      'stays quiet for a labelled checkbox and a host disabled attribute',
      async () => {
        const warnings = await warningsFor(html`
          <swc-checkbox disabled><span slot="label">Named</span></swc-checkbox>
        `);
        expect(
          warnings,
          'warnings for a labelled checkbox with host disabled'
        ).toHaveLength(0);
      }
    );
  },
};
LabellingWarningsTest.storyName = 'Accessibility dev warnings';

export const DebugOffWarningsTest: Story = {
  render: () => html`
    <swc-checkbox><span slot="label">Quiet</span></swc-checkbox>
  `,
  play: async ({ canvasElement, step }) => {
    const checkbox = await getComponent<Checkbox>(
      canvasElement,
      'swc-checkbox'
    );

    await step(
      'skips the markup checks and warnings when DEBUG is off',
      async () => {
        const { swcGlobals, warnCalls, restore } = setupSwcWarningSpy();
        const checkedAttributes: string[] = [];
        // Records which host attributes the markup checks read. warnIf is
        // already silent with DEBUG off, so only this read catches a missing
        // isDebug() guard.
        checkbox.hasAttribute = (name: string): boolean => {
          checkedAttributes.push(name);
          return Element.prototype.hasAttribute.call(checkbox, name);
        };
        try {
          swcGlobals.DEBUG = false;
          checkbox.setAttribute('readonly', '');
          checkbox.setAttribute('invalid', '');
          checkbox.requestUpdate();
          await checkbox.updateComplete;
          expect(warnCalls, 'warnings with DEBUG off').toHaveLength(0);
          expect(
            checkedAttributes,
            'leftover attributes read with DEBUG off'
          ).not.toContain('readonly');

          swcGlobals.DEBUG = true;
          checkbox.requestUpdate();
          await checkbox.updateComplete;
          expect(
            checkedAttributes,
            'leftover attributes read with DEBUG on'
          ).toContain('readonly');
          expect(
            warnCalls.length,
            'warning count with DEBUG on'
          ).toBeGreaterThan(0);
        } finally {
          Reflect.deleteProperty(checkbox, 'hasAttribute');
          checkbox.removeAttribute('readonly');
          checkbox.removeAttribute('invalid');
          restore();
        }
      }
    );
  },
};
DebugOffWarningsTest.storyName = 'No dev warnings when DEBUG is off';
