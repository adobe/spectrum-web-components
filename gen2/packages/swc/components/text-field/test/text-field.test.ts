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
import { html, type PropertyValues } from 'lit';
import { expect, fn, userEvent, waitFor, within } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import { TextField } from '@adobe/spectrum-wc/text-field';

import '@adobe/spectrum-wc/components/avatar/swc-avatar.js';
import '@adobe/spectrum-wc/components/text-field/swc-text-field.js';

import {
  fixture,
  getComponent,
  getComponents,
  withWarningSpy,
} from '../../../utils/test-utils.js';
import * as TextFieldStories from '../stories/text-field.stories.js';
import meta from '../stories/text-field.stories.js';
import {
  Accessibility,
  FormBehavior,
  Invalid,
  Labelling,
  LabelOverflow,
  NecessityIndicator,
  Required,
  Sizes,
} from '../stories/text-field.stories.js';

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
// TEST: Playground option controls
// ──────────────────────────────────────────────────────────────

export const OptionControlsTest: Story = {
  ...TextFieldStories.Playground,
  play: async ({ step }) => {
    await step(
      'enum controls expose their supported values and defaults',
      () => {
        expect(meta.argTypes?.['label-position']).toMatchObject({
          control: { type: 'inline-radio' },
          options: ['top', 'side'],
          table: { defaultValue: { summary: 'top' } },
        });
        expect(meta.argTypes?.['necessity-indicator']).toMatchObject({
          control: { type: 'inline-radio' },
          options: ['icon', 'label'],
          table: { defaultValue: { summary: 'icon' } },
        });
        expect(meta.argTypes?.size).toMatchObject({
          control: { type: 'select' },
          options: ['s', 'm', 'l', 'xl'],
        });
        expect(meta.argTypes?.['field-status']).toMatchObject({
          control: { type: 'select' },
          options: [undefined, 'disabled', 'invalid', 'valid', 'readonly'],
        });
        expect(meta.args?.['field-status']).toBeUndefined();
        for (const attribute of ['disabled', 'readonly']) {
          expect(meta.argTypes?.[attribute]).toMatchObject({
            table: { disable: true },
            control: false,
          });
        }
      }
    );
  },
};
OptionControlsTest.storyName = 'Playground option controls';

// ──────────────────────────────────────────────────────────────
// TEST: Labelling precedence in context
// ──────────────────────────────────────────────────────────────

export const LabellingTest: Story = {
  ...Labelling,
  play: async ({ canvasElement, step }) => {
    const fields = await getComponents<TextField>(
      canvasElement,
      'swc-text-field'
    );
    const [, , , , labelOnly, slotOnly] = fields;

    await step('the naming methods have distinct, readable sections', () => {
      const canvas = within(canvasElement);
      for (const { heading, api, count } of [
        {
          heading: 'Name from row and column headers',
          api: 'accessible-labelledby',
          count: 4,
        },
        {
          heading: 'Accessible name only',
          api: 'accessible-label="Email address"',
          count: 1,
        },
        {
          heading: 'Visible field label',
          api: 'slot="label"',
          count: 1,
        },
      ]) {
        const section = canvas.getByRole('region', { name: heading });
        const example = within(section);
        expect(
          example.getByRole('heading', { name: heading, level: 4 })
        ).toBeVisible();
        expect(example.getByText(api, { selector: 'code' })).toBeVisible();
        expect(section.querySelectorAll('swc-text-field')).toHaveLength(count);
      }
    });

    await step('external labels are actual row and column headers', () => {
      const canvas = within(canvasElement);
      expect(
        canvas.getByRole('table', { name: 'Delivery addresses' })
      ).toBeVisible();
      expect(
        canvas.getByRole('rowheader', { name: 'Billing' })
      ).toHaveAttribute('id', 'labelling-row-header');
      expect(
        canvas.getByRole('columnheader', { name: 'Street address' })
      ).toHaveAttribute('id', 'labelling-col-header');
      expect(
        canvas.getByRole('rowheader', { name: 'Shipping' })
      ).toHaveAttribute('id', 'labelling-shipping-header');
      expect(
        canvas.getByRole('columnheader', { name: 'City' })
      ).toHaveAttribute('id', 'labelling-city-header');
    });

    await step('slotted label renders as a real <label for>', () => {
      const label = slotOnly.shadowRoot?.querySelector('label');
      const input = slotOnly.shadowRoot?.querySelector('input');
      expect(label, 'slotted label renders').toBeTruthy();
      expect(label?.getAttribute('for'), 'label references the input id').toBe(
        input?.id
      );
    });

    await step('accessible-label sets aria-label on the input', () => {
      const input = labelOnly.shadowRoot?.querySelector('input');
      expect(
        input?.getAttribute('aria-label'),
        'accessible-label is set on the input'
      ).toBe('Email address');
    });

    await step(
      'accessible-labelledby resolves external row/column headers',
      () => {
        const expectedNames = [
          'Billing Street address',
          'Billing City',
          'Shipping Street address',
          'Shipping City',
        ];
        expect(fields).toHaveLength(6);
        fields.slice(0, 4).forEach((field, index) => {
          const resolved = field.roleElement?.ariaLabelledByElements;
          expect(resolved, expectedNames[index]).toHaveLength(2);
          expect(resolved?.map((element) => element.tagName)).toEqual([
            'TH',
            'TH',
          ]);
          expect(
            resolved?.map((element) => element.textContent?.trim()).join(' ')
          ).toBe(expectedNames[index]);
        });
      }
    );
  },
};

export const StateStoriesTest: Story = {
  ...Labelling,
  play: async ({ step }) => {
    await step('each state has its own discoverable story', () => {
      for (const name of [
        'Default',
        'Required',
        'Disabled',
        'ReadOnly',
        'Invalid',
        'Valid',
      ]) {
        expect(TextFieldStories).toHaveProperty(`${name}.tags`, ['states']);
      }
      expect(TextFieldStories).not.toHaveProperty('States');
    });
  },
};
StateStoriesTest.storyName = 'Discoverable state stories';

export const LabelOverflowTest: Story = {
  ...LabelOverflow,
  play: async ({ canvasElement, step }) => {
    const fields = await getComponents<TextField>(
      canvasElement,
      'swc-text-field'
    );
    const [topField] = fields;
    const control = topField.shadowRoot?.querySelector<HTMLElement>(
      '.swc-TextField-control'
    );
    const container = topField.parentElement;
    if (!control || !container) {
      throw new Error('control or container not found');
    }

    await step(
      'individual fields demonstrate constrained label wrapping',
      () => {
        expect(fields).toHaveLength(3);
        expect(topField.getBoundingClientRect().width).toBeCloseTo(180, 1);
        expect(control.getBoundingClientRect().width).toBeCloseTo(180, 1);
        for (const field of fields) {
          const label = field.shadowRoot?.querySelector('label');
          if (!label) {
            throw new Error('label not found');
          }
          expect(label.getBoundingClientRect().height).toBeGreaterThan(
            parseFloat(getComputedStyle(label).lineHeight)
          );
        }
      }
    );

    await step(
      'host width does not override the default control maximum',
      () => {
        container.style.inlineSize = '320px';
        expect(topField.getBoundingClientRect().width).toBeCloseTo(320, 1);
        expect(control.getBoundingClientRect().width).toBeCloseTo(208, 1);
      }
    );

    await step(
      'the public maximum-width override lets the control fill the host',
      () => {
        topField.style.setProperty('--swc-field-input-max-inline-size', '100%');
        expect(control.getBoundingClientRect().width).toBeCloseTo(320, 1);
        topField.style.removeProperty('--swc-field-input-max-inline-size');
        container.style.inlineSize = '180px';
      }
    );
  },
};
LabelOverflowTest.storyName = 'Constrained label overflow';

// ──────────────────────────────────────────────────────────────
// TEST: Size-specific field widths
// ──────────────────────────────────────────────────────────────

export const SizesTest: Story = {
  ...Sizes,
  play: async ({ canvasElement, step }) => {
    const fields = await getComponents<TextField>(
      canvasElement,
      'swc-text-field'
    );

    await step('each size uses its matching default field width', () => {
      expect(
        fields.map((field) => {
          const control = field.shadowRoot?.querySelector<HTMLElement>(
            '.swc-TextField-control'
          );
          return control ? getComputedStyle(control).maxInlineSize : null;
        }),
        'each size uses its default control width'
      ).toEqual(['192px', '208px', '224px', '240px']);
    });

    await step('consumers can override form-field size properties', () => {
      const field = fields[1];
      field.style.setProperty('--swc-form-field-label-font-size', '30px');
      const label = field.shadowRoot?.querySelector<HTMLElement>(
        '.swc-FormFieldLabel'
      );
      expect(
        label && getComputedStyle(label).fontSize,
        'consumer label font-size override applies'
      ).toBe('30px');
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Invalid icon width reservation
// ──────────────────────────────────────────────────────────────

export const InvalidWidthTest: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; align-items: flex-start; gap: 24px;"
    >
      <swc-text-field accessible-label="Email address"></swc-text-field>
      <div style="inline-size: 260px;">
        <swc-text-field id="narrow-field" label-position="side">
          <span slot="label">
            This side label wraps and the input shrinks toward a square
          </span>
        </swc-text-field>
      </div>
    </div>
  `,
  play: async ({ canvasElement, step }) => {
    const field = await getComponent<TextField>(
      canvasElement,
      'swc-text-field'
    );
    const control = field.shadowRoot?.querySelector<HTMLElement>(
      '.swc-TextField-control'
    );
    const input = field.shadowRoot?.querySelector<HTMLInputElement>(
      '.swc-TextField-input'
    );

    await step(
      'the input yields reserved space to the invalid icon without changing the control width',
      async () => {
        const validControlRect = control?.getBoundingClientRect();
        const validInputRect = input?.getBoundingClientRect();

        field.fieldStatus = 'invalid';
        await field.updateComplete;

        const invalidControlRect = control?.getBoundingClientRect();
        const invalidInputRect = input?.getBoundingClientRect();

        expect(
          invalidControlRect?.width,
          'invalid state does not change control width'
        ).toBe(validControlRect?.width);
        expect(
          invalidInputRect?.width,
          'input width shrinks to reserve space for the invalid icon'
        ).toBeLessThan(validInputRect?.width ?? 0);
        expect(
          invalidInputRect?.left,
          'input stays within the control left edge'
        ).toBeGreaterThanOrEqual(invalidControlRect?.left ?? 0);
        expect(
          invalidInputRect?.right,
          'input stays within the control right edge'
        ).toBeLessThanOrEqual(invalidControlRect?.right ?? 0);
      }
    );

    await step(
      'a long value stays inside the control at its minimum width',
      async () => {
        const narrowField = await getComponent<TextField>(
          canvasElement,
          '#narrow-field'
        );
        narrowField.value =
          'A very long value that must remain inside the control';
        await narrowField.updateComplete;

        const narrowControl =
          narrowField.shadowRoot?.querySelector<HTMLElement>(
            '.swc-TextField-control'
          );
        const narrowInput =
          narrowField.shadowRoot?.querySelector<HTMLInputElement>(
            '.swc-TextField-input'
          );
        const controlRect = narrowControl?.getBoundingClientRect();
        const inputRect = narrowInput?.getBoundingClientRect();

        expect(
          inputRect?.left,
          'long input value stays inside the control left edge'
        ).toBeGreaterThanOrEqual(controlRect?.left ?? 0);
        expect(
          inputRect?.right,
          'long input value stays inside the control right edge'
        ).toBeLessThanOrEqual(controlRect?.right ?? 0);
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Invalid description/error wiring
// ──────────────────────────────────────────────────────────────

export const InvalidStateTest: Story = {
  ...Invalid,
  play: async ({ canvasElement, step }) => {
    const invalidField = await getComponent<TextField>(
      canvasElement,
      'swc-text-field'
    );
    const input = invalidField.shadowRoot?.querySelector('input');

    await step('invalid input carries aria-invalid', () => {
      expect(
        input?.getAttribute('aria-invalid'),
        'invalid field sets aria-invalid'
      ).toBe('true');
    });

    await step(
      'invalid input never carries aria-errormessage (decision B9, describedby only)',
      () => {
        // Decision B9 in accessibility-migration-analysis.md: gen2 associates
        // the error via aria-describedby only, because AT support for
        // aria-errormessage is inconsistent while aria-describedby is universal.
        expect(
          input?.getAttribute('aria-errormessage'),
          'invalid field omits aria-errormessage'
        ).toBeNull();
      }
    );

    await step(
      'error text replaces the description in ariaDescribedByElements while invalid',
      () => {
        const resolved = input?.ariaDescribedByElements ?? [];
        expect(
          resolved,
          'invalid field has one describedby reference'
        ).toHaveLength(1);
        expect(
          resolved[0]?.className,
          'invalid field describes the error text'
        ).toContain('swc-FormFieldErrorText');
        expect(
          invalidField.shadowRoot?.querySelector('.swc-FormFieldDescription'),
          'invalid field removes the normal description'
        ).toBeNull();
      }
    );

    await step('an invalid field renders a decorative validation icon', () => {
      const icon = invalidField.shadowRoot?.querySelector(
        '.swc-TextField-invalidIcon'
      );
      expect(icon, 'invalid field renders its validation icon').toBeTruthy();
      expect(
        icon?.getAttribute('aria-hidden'),
        'validation icon is hidden from assistive technology'
      ).toBe('true');
    });

    await step('clearing invalid removes the validation icon', async () => {
      invalidField.fieldStatus = undefined;
      await invalidField.updateComplete;
      expect(
        invalidField.shadowRoot?.querySelector('.swc-TextField-invalidIcon'),
        'valid field omits the validation icon'
      ).toBeNull();
    });
  },
};

export const RequiredStateTest: Story = {
  ...Required,
  play: async ({ canvasElement, step }) => {
    const field = await getComponent<TextField>(
      canvasElement,
      'swc-text-field'
    );

    await step('required is reflected onto the native input', () => {
      expect(
        field.roleElement?.required,
        'required property reaches the input'
      ).toBe(true);
    });

    await step('the visible label shows a decorative asterisk', () => {
      const indicator = field.shadowRoot?.querySelector(
        '.swc-FormFieldLabel-requiredIndicator'
      );
      expect(indicator, 'required label renders its asterisk').toBeTruthy();
      expect(
        indicator?.querySelector('swc-ui-icon')?.getAttribute('aria-hidden'),
        'required asterisk is hidden from assistive technology'
      ).toBe('true');
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: necessity indicator: icon vs label, required vs optional
// ──────────────────────────────────────────────────────────────

export const NecessityIndicatorTest: Story = {
  ...NecessityIndicator,
  play: async ({ canvasElement, step }) => {
    const fields = await getComponents<TextField>(
      canvasElement,
      'swc-text-field'
    );
    const [requiredIcon, requiredLabel, optionalLabel] = fields;

    await step('icon mode renders the asterisk indicator', () => {
      expect(
        requiredIcon.shadowRoot?.querySelector(
          '.swc-FormFieldLabel-requiredIndicator'
        ),
        'required icon mode renders the asterisk'
      ).toBeTruthy();
      expect(
        requiredIcon.shadowRoot?.querySelector(
          '.swc-FormFieldLabel-requiredIndicator swc-ui-icon'
        )
      ).toHaveAttribute('aria-hidden', 'true');
    });

    await step('label mode marks a required field "(required)"', () => {
      const label = requiredLabel.shadowRoot?.querySelector(
        '.swc-FormFieldLabel-necessityLabel'
      );
      expect(label?.textContent?.trim(), 'required label is shown').toBe(
        '(required)'
      );
      expect(
        label?.getAttribute('aria-hidden'),
        'necessity text remains available to assistive technology'
      ).toBeNull();
    });

    await step('label mode marks an optional field "(optional)"', () => {
      const label = optionalLabel.shadowRoot?.querySelector(
        '.swc-FormFieldLabel-necessityLabel'
      );
      expect(label?.textContent?.trim(), 'optional label is shown').toBe(
        '(optional)'
      );
      expect(label?.hasAttribute('aria-hidden')).toBe(false);
    });

    await step(
      'icon mode shows no indicator on an optional field',
      async () => {
        const field = await fixture<TextField>(html`
          <swc-text-field necessity-indicator="icon">
            <span slot="label">Optional field</span>
          </swc-text-field>
        `);
        await field.updateComplete;
        expect(
          field.shadowRoot?.querySelector(
            '.swc-FormFieldLabel-requiredIndicator'
          ),
          'optional field omits the required asterisk'
        ).toBeNull();
        expect(
          field.shadowRoot?.querySelector('.swc-FormFieldLabel-necessityLabel'),
          'optional icon mode omits the necessity label'
        ).toBeNull();
        field.parentElement?.remove();
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: prefix slot renders as a leading affix inside the control
// ──────────────────────────────────────────────────────────────

export const PrefixTest: Story = {
  render: () => html`
    <swc-text-field accessible-label="Amount">
      <swc-avatar slot="prefix" alt=""></swc-avatar>
    </swc-text-field>
  `,
  play: async ({ canvasElement, step }) => {
    const field = await getComponent<TextField>(
      canvasElement,
      'swc-text-field'
    );

    await step('prefix content is assigned to the prefix slot', () => {
      const slot = field.shadowRoot?.querySelector<HTMLSlotElement>(
        'slot[name="prefix"]'
      );
      const assigned = slot?.assignedElements() ?? [];
      expect(assigned, 'prefix slot receives one element').toHaveLength(1);
      expect(assigned[0]?.localName, 'prefix slot receives the avatar').toBe(
        'swc-avatar'
      );
    });

    await step('the prefix avatar follows the field size', async () => {
      const avatar = field.querySelector('swc-avatar');
      expect(
        avatar?.getAttribute('size'),
        'medium field propagates its avatar size'
      ).toBe('75');
      field.size = 's';
      await field.updateComplete;
      expect(
        avatar?.getAttribute('size'),
        'small field propagates its avatar size'
      ).toBe('50');
      field.size = 'l';
      await field.updateComplete;
      expect(
        avatar?.getAttribute('size'),
        'large field propagates its avatar size'
      ).toBe('200');
      field.size = 'xl';
      await field.updateComplete;
      expect(
        avatar?.getAttribute('size'),
        'extra-large field propagates its avatar size'
      ).toBe('300');
    });

    await step('prefix and input share the bordered control wrapper', () => {
      const control = field.shadowRoot?.querySelector('.swc-TextField-control');
      const input = field.shadowRoot?.querySelector('.swc-TextField-input');
      const slot = field.shadowRoot?.querySelector('slot[name="prefix"]');
      expect(control, 'control wrapper renders').toBeTruthy();
      // The prefix slot precedes the input inside the control.
      expect(control?.contains(input ?? null), 'input is inside control').toBe(
        true
      );
      expect(
        control?.contains(slot ?? null),
        'prefix slot is inside control'
      ).toBe(true);
      const nodes = [...(control?.children ?? [])];
      expect(
        nodes.indexOf(slot as Element),
        'prefix slot precedes the input in the control'
      ).toBeLessThan(nodes.indexOf(input as Element));
    });
  },
};
PrefixTest.storyName = 'Prefix';

// ──────────────────────────────────────────────────────────────
// TEST: host selection API delegates to the native input
// ──────────────────────────────────────────────────────────────

export const SelectionTest: Story = {
  render: () => html`
    <swc-text-field
      accessible-label="Selection"
      value="hello world"
    ></swc-text-field>
  `,
  play: async ({ canvasElement, step }) => {
    const field = await getComponent<TextField>(
      canvasElement,
      'swc-text-field'
    );
    const input = field.shadowRoot?.querySelector('input');

    await step('select() selects all text through the host', () => {
      field.select();
      expect(
        input?.selectionStart,
        'select() updates the selection start'
      ).toBe(0);
      expect(input?.selectionEnd, 'select() updates the selection end').toBe(
        'hello world'.length
      );
    });

    await step('setSelectionRange() sets a range on the native input', () => {
      field.setSelectionRange(0, 5);
      expect(
        input?.selectionStart,
        'setSelectionRange() sets the selection start'
      ).toBe(0);
      expect(
        input?.selectionEnd,
        'setSelectionRange() sets the selection end'
      ).toBe(5);
    });
  },
};
SelectionTest.storyName = 'Selection';

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
      expect(resolved, 'external description resolves once').toHaveLength(1);
      expect(resolved[0]?.id, 'input references the external description').toBe(
        'accessibility-external-description'
      );
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: readonly, aria-invalid, and value round-trip bindings
// ──────────────────────────────────────────────────────────────

export const BindingsTest: Story = {
  render: () => html`
    <swc-text-field
      accessible-label="Username"
      placeholder="Enter your username"
    ></swc-text-field>
  `,
  play: async ({ canvasElement, step }) => {
    const field = await getComponent<TextField>(
      canvasElement,
      'swc-text-field'
    );
    const input = () =>
      field.shadowRoot?.querySelector('input') as HTMLInputElement;

    await step('readonly reflects onto the native input', async () => {
      expect(input().readOnly, 'input starts editable').toBe(false);
      field.fieldStatus = 'readonly';
      await field.updateComplete;
      expect(input().readOnly, 'readonly property reaches the input').toBe(
        true
      );
    });

    await step('invalid sets aria-invalid on the native input', async () => {
      expect(
        input().getAttribute('aria-invalid'),
        'valid input omits aria-invalid'
      ).toBe(null);
      field.fieldStatus = 'invalid';
      await field.updateComplete;
      expect(
        input().getAttribute('aria-invalid'),
        'invalid property sets aria-invalid'
      ).toBe('true');
    });

    await step(
      'placeholder passes through natively, not as aria-placeholder',
      () => {
        // accessibility-migration-analysis.md (placeholder section): the
        // browser exposes native `placeholder` to the a11y tree, so gen2 does
        // not duplicate via `aria-placeholder`.
        expect(
          input().placeholder,
          'placeholder reaches the native input'
        ).toBe('Enter your username');
        expect(
          input().getAttribute('aria-placeholder'),
          'placeholder is not duplicated as aria-placeholder'
        ).toBeNull();
      }
    );

    await step('typing round-trips the native value back to the host', () => {
      // The @input handler is the only path that syncs user edits onto
      // the host `value`; assert it so `.value` in render can't silently
      // drift from what the user sees.
      input().value = 'typed by user';
      input().dispatchEvent(new Event('input'));
      expect(field.value, 'host value reflects typed input').toBe(
        'typed by user'
      );
    });

    await step('focusing the host delegates to the native input', () => {
      // delegatesFocus makes the field a single tab stop with focus
      // landing on the real control rather than the host wrapper.
      field.focus();
      expect(
        field.shadowRoot?.activeElement,
        'host focus lands on the internal input'
      ).toBe(input());
    });
  },
};
BindingsTest.storyName = 'Bindings';

// ──────────────────────────────────────────────────────────────
// TEST: Invalid enum values emit a DEBUG warning
// ──────────────────────────────────────────────────────────────

export const EnumValidationTest: Story = {
  render: () => html`
    <span></span>
  `,
  play: async ({ step }) => {
    await step('warns when "type" is not a supported value', () =>
      withWarningSpy(async (warnCalls) => {
        const field = await fixture<TextField>(html`
          <!-- @ts-ignore: "bogus" is intentionally unsupported to test the enum warning. -->
          <swc-text-field
            accessible-label="Named"
            type="bogus"
          ></swc-text-field>
        `);
        await field.updateComplete;
        const messages = warnCalls.map((c) => String(c?.[1] ?? ''));
        expect(
          messages.some((m) => m.includes('expects "type"')),
          'warning names the unsupported type value'
        ).toBe(true);
        field.parentElement?.remove();
      })
    );

    await step(
      'unsupported native types fall back to text without changing the value',
      () =>
        withWarningSpy(async (warnCalls) => {
          for (const type of ['color', 'number', 'checkbox', 'bogus']) {
            const field = await fixture<TextField>(html`
              <!-- @ts-ignore: Unsupported types intentionally test the text fallback and warning. -->
              <swc-text-field
                accessible-label="Named"
                type=${type}
                value="Unchanged text"
              ></swc-text-field>
            `);
            expect(field.roleElement?.type).toBe('text');
            expect(field.value).toBe('Unchanged text');
            expect(field.roleElement?.value).toBe('Unchanged text');
            expect(
              warnCalls.some((call) =>
                String(call?.[1]).includes(`Received "${type}"`)
              )
            ).toBe(true);

            field.type = 'email';
            await field.updateComplete;
            expect(field.roleElement?.type).toBe('email');
            field.setAttribute('type', type);
            await field.updateComplete;
            expect(field.roleElement?.type).toBe('text');
            expect(field.value).toBe('Unchanged text');
            expect(field.roleElement?.value).toBe('Unchanged text');
            field.parentElement?.remove();
          }
        })
    );

    await step('warns when "label-position" is not a supported value', () =>
      withWarningSpy(async (warnCalls) => {
        const field = await fixture<TextField>(html`
          <!-- @ts-ignore: "sideways" is intentionally unsupported to test the enum warning. -->
          <swc-text-field
            accessible-label="Named"
            label-position="sideways"
          ></swc-text-field>
        `);
        await field.updateComplete;
        const messages = warnCalls.map((c) => String(c?.[1] ?? ''));
        expect(
          messages.some((m) => m.includes('expects "label-position"')),
          'warning names the unsupported label position'
        ).toBe(true);
        field.parentElement?.remove();
      })
    );

    await step(
      'warns when "necessity-indicator" is not a supported value',
      () =>
        withWarningSpy(async (warnCalls) => {
          const field = await fixture<TextField>(html`
            <!-- @ts-ignore: "star" is intentionally unsupported to test the enum warning. -->
            <swc-text-field
              accessible-label="Named"
              necessity-indicator="star"
            ></swc-text-field>
          `);
          await field.updateComplete;
          const messages = warnCalls.map((c) => String(c?.[1] ?? ''));
          expect(
            messages.some((m) => m.includes('expects "necessity-indicator"')),
            'warning names the unsupported necessity indicator'
          ).toBe(true);
          field.parentElement?.remove();
        })
    );
  },
};
EnumValidationTest.storyName = 'Enum validation';

// ──────────────────────────────────────────────────────────────
// TEST: Missing accessible-name DEBUG warning
// ──────────────────────────────────────────────────────────────

export const MissingAccessibleNameTest: Story = {
  render: () => html`
    <span></span>
  `,
  play: async ({ step }) => {
    await step('warns when no label source is set', () =>
      withWarningSpy(async (warnCalls) => {
        const field = await fixture<TextField>(html`
          <swc-text-field></swc-text-field>
        `);
        await field.updateComplete;
        const messages = warnCalls.map((c) => String(c?.[1] ?? ''));
        expect(
          messages.some((m) => m.includes('accessible name')),
          'warning requests an accessible name'
        ).toBe(true);
        field.parentElement?.remove();
      })
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Placeholder-only name DEBUG warning
// ──────────────────────────────────────────────────────────────

export const PlaceholderOnlyNameTest: Story = {
  render: () => html`
    <span></span>
  `,
  play: async ({ step }) => {
    await step('warns when named only by a placeholder', () =>
      withWarningSpy(async (warnCalls) => {
        const field = await fixture<TextField>(html`
          <swc-text-field placeholder="Search"></swc-text-field>
        `);
        await field.updateComplete;
        const messages = warnCalls.map((c) => String(c?.[1] ?? ''));
        expect(
          messages.some((m) => m.includes('named only by its placeholder')),
          'warning identifies the placeholder-only name'
        ).toBe(true);
        // The generic missing-name warning is suppressed in favor of this one.
        expect(
          messages.some((m) => m.includes('requires an accessible name')),
          'placeholder-only warning replaces generic missing-name warning'
        ).toBe(false);
        field.parentElement?.remove();
      })
    );

    await step('does not warn when a placeholder accompanies a name', () =>
      withWarningSpy(async (warnCalls) => {
        const field = await fixture<TextField>(html`
          <swc-text-field
            accessible-label="Search"
            placeholder="Search"
          ></swc-text-field>
        `);
        await field.updateComplete;
        const messages = warnCalls.map((c) => String(c?.[1] ?? ''));
        expect(
          messages.some((m) => m.includes('placeholder')),
          'named field has no placeholder warning'
        ).toBe(false);
        field.parentElement?.remove();
      })
    );
  },
};
PlaceholderOnlyNameTest.storyName = 'Placeholder-only name';

// ──────────────────────────────────────────────────────────────
// TEST: aria-label / aria-labelledby on the host DEBUG warning
// ──────────────────────────────────────────────────────────────

export const HostAriaLabelWarningTest: Story = {
  render: () => html`
    <span></span>
  `,
  play: async ({ step }) => {
    await step('warns when aria-label is set on the host', () =>
      withWarningSpy(async (warnCalls) => {
        const field = await fixture<TextField>(html`
          <swc-text-field aria-label="Name"></swc-text-field>
        `);
        await field.updateComplete;
        const messages = warnCalls.map((c) => String(c?.[1] ?? ''));
        expect(
          messages.some((m) => m.includes('set on the host')),
          'warning explains aria-label belongs on the input'
        ).toBe(true);
        field.parentElement?.remove();
      })
    );
  },
};
HostAriaLabelWarningTest.storyName = 'Host aria-label warning';

// ──────────────────────────────────────────────────────────────
// TEST: Conflicting label sources DEBUG warning (WCAG 2.5.3)
// ──────────────────────────────────────────────────────────────

const CONFLICT_PHRASE =
  'sets both "accessible-labelledby" and "accessible-label"';
const IGNORED_PHRASE = '"accessible-label" is ignored';

export const LabelConflictTest: Story = {
  render: () => html`
    <span></span>
  `,
  play: async ({ step }) => {
    await step(
      'warns when both accessible-label and accessible-labelledby are set',
      () =>
        withWarningSpy(async (warnCalls) => {
          // The reference target lives as a plain (unslotted) light-DOM
          // child of the field itself, rather than a fixture sibling, so
          // `fixture()` still resolves to the `<swc-text-field>` (its
          // `firstElementChild` contract).
          const field = await fixture<TextField>(html`
            <swc-text-field
              accessible-label="Different text"
              accessible-labelledby="text-field-label-conflict-external"
            >
              <p id="text-field-label-conflict-external">External label</p>
            </swc-text-field>
          `);
          await field.updateComplete;
          const messages = warnCalls.map((c) => String(c?.[1] ?? ''));
          expect(
            messages.some(
              (m) => m.includes(CONFLICT_PHRASE) && m.includes(IGNORED_PHRASE)
            ),
            'warning identifies conflicting accessible name sources'
          ).toBe(true);
          field.parentElement?.remove();
        })
    );

    await step(
      'does not warn when a visible label is paired with accessible-label (the recommended WCAG 2.5.3 pattern)',
      () =>
        withWarningSpy(async (warnCalls) => {
          const field = await fixture<TextField>(html`
            <swc-text-field accessible-label="Query products">
              <span slot="label">Query</span>
            </swc-text-field>
          `);
          await field.updateComplete;
          const messages = warnCalls.map((c) => String(c?.[1] ?? ''));
          expect(
            messages.some((m) => m.includes(CONFLICT_PHRASE)),
            'visible label with accessible-label is allowed'
          ).toBe(false);
          field.parentElement?.remove();
        })
    );

    await step(
      'does not warn when a visible label is paired with accessible-labelledby',
      () =>
        withWarningSpy(async (warnCalls) => {
          const field = await fixture<TextField>(html`
            <swc-text-field
              accessible-labelledby="text-field-label-conflict-external-2"
            >
              <p id="text-field-label-conflict-external-2">External label</p>
              <span slot="label">Visible label</span>
            </swc-text-field>
          `);
          await field.updateComplete;
          const messages = warnCalls.map((c) => String(c?.[1] ?? ''));
          expect(
            messages.some((m) => m.includes(CONFLICT_PHRASE)),
            'visible label with accessible-labelledby is allowed'
          ).toBe(false);
          field.parentElement?.remove();
        })
    );

    await step('does not warn when accessible-label is the only source', () =>
      withWarningSpy(async (warnCalls) => {
        const field = await fixture<TextField>(html`
          <swc-text-field accessible-label="Named"></swc-text-field>
        `);
        await field.updateComplete;
        const messages = warnCalls.map((c) => String(c?.[1] ?? ''));
        expect(
          messages.some((m) => m.includes(CONFLICT_PHRASE)),
          'accessible-label alone does not trigger a conflict warning'
        ).toBe(false);
        field.parentElement?.remove();
      })
    );
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
      expect(
        new FormData(form).get('username'),
        'initial username is included in FormData'
      ).toBe('Example');
      expect(field.form, 'form pass-through resolves to the owning form').toBe(
        form
      );
    });

    await step('disabling excludes it, re-enabling recovers', async () => {
      field.fieldStatus = 'disabled';
      await field.updateComplete;
      expect(
        new FormData(form).has('username'),
        'disabled field is excluded from FormData'
      ).toBe(false);
      field.fieldStatus = undefined;
      await field.updateComplete;
      expect(
        new FormData(form).get('username'),
        're-enabled field is restored to FormData'
      ).toBe('Example');
    });

    await step(
      'native reset restores the value attribute default',
      async () => {
        field.value = 'Updated';
        await field.updateComplete;
        expect(
          new FormData(form).get('username'),
          'updated username is included in FormData'
        ).toBe('Updated');
        form.reset();
        await field.updateComplete;
        expect(field.value, 'value restored to the initial attribute').toBe(
          'Example'
        );
        expect(
          new FormData(form).get('username'),
          'reset restores the initial username in FormData'
        ).toBe('Example');
      }
    );
  },
};
FormParticipationTest.storyName = 'Form participation';

class UpdateTimingTextField extends TextField {
  public formValueAfterUpdate: FormDataEntryValue | null = null;

  protected override update(changedProperties: PropertyValues): void {
    super.update(changedProperties);
    const form = this.form;
    this.formValueAfterUpdate = form
      ? new FormData(form).get('username')
      : null;
  }
}
if (!customElements.get('test-text-field-update-timing')) {
  customElements.define('test-text-field-update-timing', UpdateTimingTextField);
}

export const FormUpdateTimingTest: Story = {
  render: () => html`
    <form>
      <test-text-field-update-timing
        name="username"
        value="Example"
        accessible-label="Username"
      ></test-text-field-update-timing>
    </form>
  `,
  play: async ({ canvasElement }) => {
    const field = await getComponent<UpdateTimingTextField>(
      canvasElement,
      'test-text-field-update-timing'
    );
    field.value = 'Updated';
    await field.updateComplete;
    expect(field.formValueAfterUpdate).toBe('Updated');
  },
};
FormUpdateTimingTest.storyName = 'Form value after super.update';

export const InputEventFormStateTest: Story = {
  render: () => html`
    <form>
      <swc-text-field name="username" required accessible-label="Username">
        <span slot="error-text">This username is unavailable.</span>
      </swc-text-field>
    </form>
  `,
  play: async ({ canvasElement, step }) => {
    const field = await getComponent<TextField>(
      canvasElement,
      'swc-text-field'
    );
    const form = field.form;
    const input = field.roleElement;
    if (!form || !input) {
      throw new Error('Input event test requires a form and input');
    }
    const states: {
      listener: string;
      value: string;
      formValue: FormDataEntryValue | null;
      valid: boolean;
      formValid: boolean;
      customError: boolean;
    }[] = [];
    for (const [listener, target] of [
      ['field', field],
      ['form', form],
    ] as const) {
      target.addEventListener('input', () => {
        states.push({
          listener,
          value: field.value,
          formValue: new FormData(form).get('username'),
          valid: field.checkValidity(),
          formValid: form.checkValidity(),
          customError: field.validity.customError,
        });
      });
    }
    const expectState = (
      value: string,
      valid: boolean,
      customError = false
    ): void => {
      expect(states).toEqual(
        ['field', 'form'].map((listener) => ({
          listener,
          value,
          formValue: value,
          valid,
          formValid: valid,
          customError,
        }))
      );
      states.length = 0;
    };

    await step('the first edit synchronizes value and validity', async () => {
      await userEvent.type(input, 'a');
      expectState('a', true);
    });
    await step('subsequent edits submit the current value', async () => {
      await userEvent.type(input, 'b');
      expectState('ab', true);
    });
    await step('clearing a required field is immediately invalid', async () => {
      await userEvent.type(input, '{Backspace}');
      expectState('a', true);
      await userEvent.type(input, '{Backspace}');
      expectState('', false);
    });
    await step('editing preserves application errors', async () => {
      field.fieldStatus = 'invalid';
      await field.updateComplete;
      await userEvent.type(input, 'b');
      expectState('b', false, true);
      expect(field.fieldStatus).toBe('invalid');
      expect(field.validationMessage).toBe('This username is unavailable.');
    });
  },
};
InputEventFormStateTest.storyName = 'Form state during input events';

// ──────────────────────────────────────────────────────────────
// TEST: Form state restoration
// ──────────────────────────────────────────────────────────────

export const FormStateRestoreTest: Story = {
  ...FormParticipationTest,
  play: async ({ canvasElement, step }) => {
    const field = await getComponent<TextField>(
      canvasElement,
      'swc-text-field'
    );
    const form = canvasElement.querySelector('form');
    const input = field.shadowRoot?.querySelector('input');
    if (!form || !input) {
      throw new Error('form or input not found');
    }
    const events: string[] = [];
    field.addEventListener('input', () => events.push('input'));
    field.addEventListener('change', () => events.push('change'));
    field.required = true;
    await field.updateComplete;

    await step(
      'restored strings synchronize the host, input, and form',
      async () => {
        for (const state of ['Restored', '', 'Restored\nvalue']) {
          field.formStateRestoreCallback(state);
          await field.updateComplete;
          const expected = state.replace(/\n/g, '');
          expect(field.value, 'host value is restored and sanitized').toBe(
            expected
          );
          expect(input.value, 'displayed value matches the host').toBe(
            expected
          );
          expect(
            new FormData(form).get('username'),
            'form value is restored'
          ).toBe(expected);
          expect(
            field.validity.valueMissing,
            'required validity follows the restored value'
          ).toBe(expected === '');
        }
      }
    );

    await step('non-string state leaves the text value unchanged', async () => {
      for (const state of [
        null,
        new File(['value'], 'state.txt'),
        new FormData(),
      ]) {
        field.formStateRestoreCallback(state);
        await field.updateComplete;
        expect(field.value).toBe('Restoredvalue');
        expect(input.value).toBe('Restoredvalue');
        expect(new FormData(form).get('username')).toBe('Restoredvalue');
      }
    });

    await step('restoration preserves the authored reset value', async () => {
      expect(field.getAttribute('value')).toBe('Example');
      form.reset();
      await field.updateComplete;
      expect(field.value).toBe('Example');
      expect(input.value).toBe('Example');
      expect(new FormData(form).get('username')).toBe('Example');
    });

    await step(
      'restoration and reset do not emit input or change events',
      () => {
        expect(events).toEqual([]);
      }
    );
  },
};
FormStateRestoreTest.storyName = 'Form state restoration';

// ──────────────────────────────────────────────────────────────
// TEST: Application-controlled invalid state
// ──────────────────────────────────────────────────────────────

export const InvalidContractTest: Story = {
  ...FormParticipationTest,
  play: async ({ canvasElement, step }) => {
    const field = await getComponent<TextField>(
      canvasElement,
      'swc-text-field'
    );
    const form = canvasElement.querySelector('form');
    const input = field.roleElement;
    if (!form || !input) {
      throw new Error('form or input not found');
    }
    let submissions = 0;
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      submissions++;
    });

    await step(
      'authored invalid blocks native validation and submit',
      async () => {
        field.fieldStatus = 'invalid';
        await field.updateComplete;
        expect(field.validity.customError).toBe(true);
        expect(field.checkValidity()).toBe(false);
        expect(form.checkValidity()).toBe(false);
        expect(field.validationMessage.length).toBeGreaterThan(0);
        expect(field.reportValidity()).toBe(false);
        expect(field.shadowRoot?.activeElement).toBe(input);
        form.requestSubmit();
        expect(submissions).toBe(0);
        expect(input.getAttribute('aria-invalid')).toBe('true');
      }
    );

    await step(
      'typing does not clear application-authored invalid',
      async () => {
        await userEvent.type(input, 'Updated');
        await field.updateComplete;
        expect(field.fieldStatus).toBe('invalid');
        expect(field.checkValidity()).toBe(false);
      }
    );

    await step('clearing invalid permits a valid field to submit', async () => {
      field.fieldStatus = undefined;
      await field.updateComplete;
      expect(field.validity.customError).toBe(false);
      expect(field.validationMessage).toBe('');
      expect(field.checkValidity()).toBe(true);
      expect(input.hasAttribute('aria-invalid')).toBe(false);
      form.requestSubmit();
      expect(submissions).toBe(1);
    });

    await step('native errors do not automatically set invalid', async () => {
      field.required = true;
      field.value = '';
      await field.updateComplete;
      expect(field.validity.valueMissing).toBe(true);
      expect(field.checkValidity()).toBe(false);
      expect(field.fieldStatus).toBeUndefined();
      expect(input.hasAttribute('aria-invalid')).toBe(false);
      form.requestSubmit();
      expect(submissions).toBe(1);
    });

    await step(
      'clearing invalid preserves native constraint errors',
      async () => {
        field.fieldStatus = 'invalid';
        await field.updateComplete;
        expect(field.validity.customError).toBe(true);
        expect(field.validity.valueMissing).toBe(true);
        field.fieldStatus = undefined;
        await field.updateComplete;
        expect(field.validity.customError).toBe(false);
        expect(field.validity.valueMissing).toBe(true);
        expect(field.validationMessage).toBe(input.validationMessage);
        expect(field.checkValidity()).toBe(false);
      }
    );

    await step(
      'disabled and readonly fields do not block submission',
      async () => {
        field.fieldStatus = 'invalid';
        await field.updateComplete;
        for (const status of ['disabled', 'readonly'] as const) {
          field.fieldStatus = status;
          await field.updateComplete;
          expect(field.willValidate).toBe(false);
          expect(field.checkValidity()).toBe(true);
          expect(form.checkValidity()).toBe(true);
          form.requestSubmit();
          field.fieldStatus = 'invalid';
          await field.updateComplete;
          expect(field.fieldStatus).toBe('invalid');
          expect(field.checkValidity()).toBe(false);
        }
        expect(submissions).toBe(3);
      }
    );
  },
};
InvalidContractTest.storyName = 'Application-controlled invalid state';

// ──────────────────────────────────────────────────────────────
// TEST: Slot-backed validation
// ──────────────────────────────────────────────────────────────

export const SlottedErrorLifecycleTest: Story = {
  ...FormParticipationTest,
  play: async ({ canvasElement, step }) => {
    const field = await getComponent<TextField>(
      canvasElement,
      'swc-text-field'
    );
    const form = canvasElement.querySelector('form');
    const input = field.roleElement;
    if (!form || !input) {
      throw new Error('form or input not found');
    }
    const error = document.createElement('span');
    error.slot = 'error-text';
    error.textContent = 'Username is already taken.';
    field.append(error);
    const events: string[] = [];
    field.addEventListener('input', () => events.push('input'));
    field.addEventListener('change', () => events.push('change'));
    let submissions = 0;
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      submissions++;
    });

    await step(
      'slotted errors block validity and submit while invalid',
      async () => {
        field.fieldStatus = 'invalid';
        await field.updateComplete;
        expect(field.validity.customError).toBe(true);
        expect(field.validationMessage).toBe('Username is already taken.');
        expect(field.checkValidity()).toBe(false);
        expect(form.checkValidity()).toBe(false);
        form.requestSubmit();
        expect(submissions).toBe(0);
        await field.updateComplete;
        expect(input.validationMessage).toBe('Username is already taken.');
        expect(field.fieldStatus).toBe('invalid');
        expect(input.getAttribute('aria-invalid')).toBe('true');
      }
    );

    await step(
      'updates and restoration preserve application errors',
      async () => {
        field.value = 'Updated';
        field.size = 'l';
        await field.updateComplete;
        field.formStateRestoreCallback('Restored');
        await field.updateComplete;
        expect(field.validationMessage).toBe('Username is already taken.');
        expect(field.checkValidity()).toBe(false);
      }
    );

    await step(
      'disabled fieldsets suspend but do not clear authored errors',
      async () => {
        const fieldset = document.createElement('fieldset');
        field.before(fieldset);
        fieldset.append(field);
        fieldset.disabled = true;
        await field.updateComplete;
        expect(field.willValidate).toBe(false);
        expect(form.checkValidity()).toBe(true);
        fieldset.disabled = false;
        await field.updateComplete;
        expect(field.validationMessage).toBe('Username is already taken.');
        expect(field.checkValidity()).toBe(false);
      }
    );

    await step('clearing invalid status restores native validity', async () => {
      field.fieldStatus = undefined;
      await field.updateComplete;
      expect(field.validity.customError).toBe(false);
      expect(field.validationMessage).toBe('');
      expect(field.checkValidity()).toBe(true);
      await field.updateComplete;
      form.requestSubmit();
      expect(submissions).toBe(1);
      expect(events).toEqual([]);
    });
  },
};
SlottedErrorLifecycleTest.storyName = 'Slotted error lifecycle';

export const SlotBackedValidationTest: Story = {
  ...FormParticipationTest,
  play: async ({ canvasElement, step }) => {
    const field = await getComponent<TextField>(
      canvasElement,
      'swc-text-field'
    );
    const error = document.createElement('span');
    error.slot = 'error-text';
    error.textContent = 'Username is already taken.';
    field.append(error);
    field.fieldStatus = 'invalid';
    await field.updateComplete;

    await step('uses the inline error as the validation message', () => {
      expect(field.validationMessage).toBe('Username is already taken.');
      expect(field.roleElement?.validationMessage).toBe(
        'Username is already taken.'
      );
      expect(field.validity.customError).toBe(true);
      expect(field.checkValidity()).toBe(false);
      expect('setCustomValidity' in field).toBe(false);
    });

    await step('tracks text edits and replacement error elements', async () => {
      error.textContent = 'Choose another username.';
      await waitFor(() =>
        expect(field.validationMessage).toBe('Choose another username.')
      );
      const replacement = document.createElement('span');
      replacement.slot = 'error-text';
      replacement.innerHTML = 'Try <strong>a different name</strong>.';
      error.replaceWith(replacement);
      await waitFor(() =>
        expect(field.validationMessage).toBe('Try a different name.')
      );
      const text = replacement.querySelector('strong')?.firstChild;
      if (!text) {
        throw new Error('Expected nested error text');
      }
      text.textContent = 'another name';
      await waitFor(() =>
        expect(field.validationMessage).toBe('Try another name.')
      );
      replacement.slot = 'prefix';
      await waitFor(() => {
        expect(field.validationMessage).toBe('Enter a valid value.');
        expect(
          field.shadowRoot?.querySelector('.swc-FormFieldErrorText')
        ).toBeNull();
      });
      replacement.slot = 'error-text';
      await waitFor(() => {
        expect(field.validationMessage).toBe('Try another name.');
        expect(
          field.shadowRoot?.querySelector('.swc-FormFieldErrorText')
        ).not.toBeNull();
      });
      replacement.remove();
      await waitFor(() =>
        expect(field.validationMessage).toBe('Enter a valid value.')
      );
      replacement.textContent = 'A new application error.';
      field.append(replacement);
      await waitFor(() =>
        expect(field.validationMessage).toBe('A new application error.')
      );
      replacement.textContent = '   ';
      await waitFor(() =>
        expect(field.validationMessage).toBe('Enter a valid value.')
      );
    });

    await step(
      'clears derived errors without clearing native constraints',
      async () => {
        field.required = true;
        field.value = '';
        field.fieldStatus = undefined;
        await field.updateComplete;
        expect(field.validity.customError).toBe(false);
        expect(field.validity.valueMissing).toBe(true);
        expect(field.validationMessage).toBe(
          field.roleElement?.validationMessage
        );
        expect(field.checkValidity()).toBe(false);
        field.value = 'available';
        await field.updateComplete;
        expect(field.validationMessage).toBe('');
        expect(field.checkValidity()).toBe(true);
      }
    );

    await step('reads changed error text after reconnection', async () => {
      field.fieldStatus = 'invalid';
      await field.updateComplete;
      field.remove();
      const message = field.querySelector('[slot="error-text"]');
      if (!message) {
        throw new Error('Expected error content');
      }
      message.textContent = 'Updated while disconnected.';
      canvasElement.append(field);
      await field.updateComplete;
      expect(field.validationMessage).toBe('Updated while disconnected.');
    });
  },
};
SlotBackedValidationTest.storyName = 'Slot-backed validation';

export const ValidationSourcesTest: Story = {
  ...FormParticipationTest,
  play: async ({ canvasElement, step }) => {
    const field = await getComponent<TextField>(
      canvasElement,
      'swc-text-field'
    );

    const error = document.createElement('span');
    error.slot = 'error-text';
    error.textContent = 'Username is already taken.';
    field.append(error);
    await step(
      'clearing authored invalid clears its derived custom error',
      async () => {
        field.fieldStatus = 'invalid';
        await field.updateComplete;
        expect(field.validationMessage).toBe('Username is already taken.');
        field.fieldStatus = undefined;
        await field.updateComplete;
        expect(field.validity.customError).toBe(false);
        expect(field.validationMessage).toBe('');
        expect(field.validity.valid).toBe(true);
      }
    );

    await step(
      'clearing authored invalid preserves native errors',
      async () => {
        for (const value of ['', '123']) {
          field.required = true;
          field.pattern = '[A-Za-z]+';
          field.value = value;
          field.fieldStatus = 'invalid';
          await field.updateComplete;
          expect(field.validity.customError).toBe(true);
          expect(field.validity.valueMissing).toBe(value === '');
          expect(field.validity.patternMismatch).toBe(value === '123');
          field.fieldStatus = undefined;
          await field.updateComplete;
          expect(field.validity.customError).toBe(false);
          expect(field.checkValidity()).toBe(false);
          expect(field.validationMessage).toBe(
            field.roleElement?.validationMessage
          );
        }
      }
    );
  },
};
ValidationSourcesTest.storyName = 'Native and authored validation sources';

export const BeforeRenderErrorTextTest: Story = {
  render: () => html`
    <span></span>
  `,
  play: async ({ canvasElement, step }) => {
    await step('uses error text supplied before first render', async () => {
      const field = new TextField();
      field.accessibleLabel = 'Username';
      field.fieldStatus = 'invalid';
      const error = document.createElement('span');
      error.slot = 'error-text';
      error.textContent = 'Username is already taken.';
      field.append(error);
      canvasElement.append(field);
      try {
        await field.updateComplete;
        expect(field.validationMessage).toBe('Username is already taken.');
        expect(field.validity.customError).toBe(true);
        expect(field.checkValidity()).toBe(false);
        field.fieldStatus = undefined;
        await field.updateComplete;
        expect(field.checkValidity()).toBe(true);
      } finally {
        field.remove();
      }
    });
  },
};
BeforeRenderErrorTextTest.storyName = 'Error text before first render';

// ──────────────────────────────────────────────────────────────
// TEST: Native form validation, reset, and submit behavior
// ──────────────────────────────────────────────────────────────

export const FormBehaviorTest: Story = {
  ...FormBehavior,
  play: async ({ canvasElement, step }) => {
    const field = await getComponent<TextField>(
      canvasElement,
      'swc-text-field'
    );
    const form = canvasElement.querySelector('form');
    const input = field.shadowRoot?.querySelector('input');
    const output = form?.querySelector<HTMLOutputElement>('[data-form-data]');
    if (!form || !input || !output) {
      throw new Error('form, input, or submission output not found');
    }

    await step('only basic form controls are shown', () => {
      const canvas = within(canvasElement);
      expect(canvas.getAllByRole('button')).toHaveLength(3);
      for (const name of ['Submit', 'Reset', 'Disable']) {
        expect(canvas.getByRole('button', { name })).toBeVisible();
      }
      expect(form.querySelector('details')).toBeNull();
      expect(form.querySelector('[data-validity]')).toBeNull();
    });

    await step('headings distinguish the form, actions, and results', () => {
      const canvas = within(canvasElement);
      expect(
        canvas.getByRole('heading', { name: 'Form participation', level: 2 })
      ).toBeVisible();
      for (const name of ['Form actions', 'Last submission']) {
        const heading = canvas.getByRole('heading', { name, level: 3 });
        expect(heading).toBeVisible();
        expect(heading).toHaveClass('swc-Heading--sizeXS');
      }
      expect(parseFloat(getComputedStyle(output).fontSize)).toBeLessThan(
        parseFloat(getComputedStyle(form).fontSize)
      );
      expect(output.value).toBe('Submit the form to see its data.');
    });

    await step('required participates in native validation', async () => {
      field.value = '';
      await field.updateComplete;
      expect(input.required, 'native input is required').toBe(true);
      expect(
        input.validity.valueMissing,
        'empty input is missing its value'
      ).toBe(true);
      expect(
        field.validity.valueMissing,
        'host validity reflects missing value'
      ).toBe(true);
      expect(field.checkValidity(), 'empty field fails validity check').toBe(
        false
      );
      expect(
        form.checkValidity(),
        'form fails while required field is empty'
      ).toBe(false);
      field.value = 'Filled';
      await field.updateComplete;
      expect(
        input.validity.valueMissing,
        'filled input is not missing a value'
      ).toBe(false);
      expect(field.validity.valid, 'host validity becomes valid').toBe(true);
      expect(field.checkValidity(), 'filled field passes validity check').toBe(
        true
      );
      expect(
        form.checkValidity(),
        'form is valid when required field is filled'
      ).toBe(true);
    });

    await step('reset restores the initial (empty) value', async () => {
      field.value = 'Changed';
      await field.updateComplete;
      form.reset();
      await field.updateComplete;
      expect(field.value, 'reset restores the host value to empty').toBe('');
      expect(
        new FormData(form).get('username'),
        'reset submits an empty username'
      ).toBe('');
    });

    await step(
      // `novalidate` on the form means submission is no longer natively
      // blocked, so the field's own invalid presentation (icon + error text)
      // is what signals the empty required field instead.
      'invalid submission surfaces the field-level invalid state',
      async () => {
        field.value = '';
        field.fieldStatus = undefined;
        await field.updateComplete;
        form.requestSubmit();
        await field.updateComplete;
        expect(
          field.fieldStatus,
          'empty submission marks the field invalid'
        ).toBe('invalid');
        await waitFor(() =>
          expect(
            field.shadowRoot?.querySelector('.swc-TextField-invalidIcon'),
            'invalid submission renders the validation icon'
          ).toBeTruthy()
        );
        expect(
          output.textContent?.trim(),
          'invalid submission does not show submitted form data'
        ).toBe('Submission blocked: the field is invalid.');
        expect(field.validationMessage).toBe('Enter a username.');
      }
    );

    await step('submit includes the field value when valid', async () => {
      field.value = 'Submitted';
      await field.updateComplete;
      form.requestSubmit();
      await field.updateComplete;
      expect(
        field.fieldStatus,
        'valid submission clears invalid state'
      ).toBeUndefined();
      expect(
        new FormData(form).get('username'),
        'submitted username is included in FormData'
      ).toBe('Submitted');
      await waitFor(() =>
        expect(
          output.textContent?.trim(),
          'output displays the submitted username'
        ).toBe('username: Submitted')
      );
    });

    await step('Reset clears the previous submission and error', async () => {
      const resetButton = form.querySelector<HTMLButtonElement>(
        'button[type="reset"]'
      );
      if (!resetButton) {
        throw new Error('reset button not found');
      }
      field.fieldStatus = 'invalid';
      await field.updateComplete;
      await userEvent.click(resetButton);
      await field.updateComplete;
      expect(field.value).toBe('');
      expect(field.fieldStatus).toBeUndefined();
      expect(field.validity.customError).toBe(false);
      expect(field.roleElement).not.toHaveAttribute('aria-invalid');
      expect(
        field.shadowRoot?.querySelector('.swc-FormFieldErrorText')
      ).toBeNull();
      expect(output.textContent?.trim()).toBe(
        'Submit the form to see its data.'
      );
      expect(field.validity.valueMissing).toBe(true);
    });

    await step(
      'a blocked attempt replaces the previous submission result',
      async () => {
        field.value = 'Previous';
        await field.updateComplete;
        form.requestSubmit();
        await waitFor(() => expect(output.value).toBe('username: Previous'));
        field.value = '';
        await field.updateComplete;
        form.requestSubmit();
        await waitFor(() =>
          expect(output.value).toBe('Submission blocked: the field is invalid.')
        );
        expect(
          canvasElement
            .querySelector('#submitted-form-data-label')
            ?.textContent?.trim()
        ).toBe('Last submission');
      }
    );

    await step(
      'the fieldset toggle can disable and re-enable the field',
      async () => {
        const fieldset = form.querySelector('fieldset');
        const toggleButton = form.querySelector<HTMLButtonElement>(
          '[data-toggle-fieldset]'
        );
        expect(fieldset).toBeTruthy();
        expect(toggleButton).toBeTruthy();
        if (!fieldset || !toggleButton) {
          throw new Error('fieldset or toggle button not found');
        }

        expect(fieldset.contains(toggleButton)).toBe(false);
        await userEvent.click(toggleButton);
        await field.updateComplete;
        expect(fieldset.disabled).toBe(true);
        expect(input.disabled).toBe(true);
        expect(toggleButton).toHaveAttribute('aria-pressed', 'true');
        expect(toggleButton).toBeEnabled();
        expect(field.willValidate).toBe(false);
        expect(new FormData(form).has('username')).toBe(false);

        await userEvent.click(toggleButton);
        await field.updateComplete;
        expect(fieldset.disabled).toBe(false);
        expect(input.disabled).toBe(false);
        expect(toggleButton).toHaveAttribute('aria-pressed', 'false');
        expect(toggleButton).toBeEnabled();
      }
    );

    await step('content changes do not resize the form', async () => {
      form.reset();
      await field.updateComplete;
      const initialWidth = form.getBoundingClientRect().width;

      form.requestSubmit();
      await waitFor(() =>
        expect(output.value).toBe('Submission blocked: the field is invalid.')
      );
      expect(form.getBoundingClientRect().width).toBeCloseTo(initialWidth, 1);

      const longUsername = 'long-username-'.repeat(30);
      field.value = longUsername;
      await field.updateComplete;
      form.requestSubmit();
      await waitFor(() =>
        expect(output.value).toBe(`username: ${longUsername}`)
      );
      expect(form.getBoundingClientRect().width).toBeCloseTo(initialWidth, 1);

      form.reset();
      await field.updateComplete;
      expect(output.value).toBe('Submit the form to see its data.');
      expect(form.getBoundingClientRect().width).toBeCloseTo(initialWidth, 1);
    });
  },
};
FormBehaviorTest.storyName = 'Form participation example';

export const DisabledStateTest: Story = {
  render: () => html`
    <form>
      <fieldset>
        <swc-text-field
          name="username"
          value="Example"
          accessible-label="Username"
          field-status="invalid"
        >
          <span slot="description">Choose a username.</span>
          <span slot="error-text">This username is unavailable.</span>
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
    if (!form || !fieldset) {
      throw new Error('form or fieldset not found');
    }

    const inputColor = (): string =>
      getComputedStyle(field.shadowRoot!.querySelector('.swc-TextField-input')!)
        .color;
    let enabledColor = '';

    await step('enabled: not :disabled, value participates', () => {
      enabledColor = inputColor();
      expect(field.matches(':disabled'), 'not :disabled').toBe(false);
      expect(
        new FormData(form).get('username'),
        'enabled field participates in FormData'
      ).toBe('Example');
    });

    await step('own disabled status styles as disabled', async () => {
      field.fieldStatus = 'disabled';
      await field.updateComplete;
      expect(
        field.matches(':disabled'),
        'the authored status does not mirror a host attribute'
      ).toBe(false);
      expect(
        field.matches(':state(disabled)'),
        'the authored status sets the disabled state'
      ).toBe(true);
      expect(inputColor(), 'the input takes the disabled color').not.toBe(
        enabledColor
      );
      expect(
        new FormData(form).has('username'),
        'disabled field is excluded from FormData'
      ).toBe(false);
      field.fieldStatus = undefined;
      await field.updateComplete;
    });

    await step(
      'cascaded <fieldset disabled> matches :disabled on the host',
      async () => {
        field.fieldStatus = 'invalid';
        fieldset.disabled = true;
        await field.updateComplete;
        expect(
          field.matches(':disabled'),
          'cascade matches :disabled without the host property'
        ).toBe(true);
        expect(
          field.matches(':state(disabled)'),
          'the cascade sets the disabled state'
        ).toBe(true);
        expect(
          field.fieldStatus,
          'the authored status stays invalid under the cascade'
        ).toBe('invalid');
        expect(
          field.shadowRoot?.querySelector('input')?.disabled,
          'inner input is disabled'
        ).toBe(true);
        expect(
          new FormData(form).has('username'),
          'excluded while cascaded'
        ).toBe(false);
        expect(
          field.shadowRoot?.querySelector('.swc-FormFieldErrorText')
        ).toBeVisible();
        expect(
          field.shadowRoot?.querySelector('.swc-TextField-invalidIcon')
        ).toBeNull();
        expect(field.roleElement).toHaveAttribute('aria-invalid', 'true');
        expect(field.roleElement?.ariaDescribedByElements?.[0]).toHaveClass(
          'swc-FormFieldErrorText'
        );
        expect(field.checkValidity()).toBe(true);

        fieldset.disabled = false;
        await field.updateComplete;
        expect(
          field.matches(':disabled'),
          ':disabled clears when re-enabled'
        ).toBe(false);
        expect(
          field.matches(':state(disabled)'),
          'the disabled state clears when re-enabled'
        ).toBe(false);
        expect(
          new FormData(form).get('username'),
          'field value returns to FormData when fieldset is enabled'
        ).toBe('Example');
      }
    );
  },
};
DisabledStateTest.storyName = 'Disabled state';

export const DisabledClickSuppressionTest: Story = {
  render: () => html`
    <fieldset>
      <swc-text-field
        name="username"
        accessible-label="Username"
        field-status="disabled"
      ></swc-text-field>
    </fieldset>
  `,
  play: async ({ canvasElement, step }) => {
    const field = await getComponent<TextField>(
      canvasElement,
      'swc-text-field'
    );
    const fieldset = canvasElement.querySelector('fieldset')!;
    const control = field.shadowRoot!.querySelector<HTMLElement>(
      '.swc-TextField-control'
    )!;
    const hostClick = fn();
    field.addEventListener('click', hostClick);

    const clickEverywhere = (): void => {
      field.click();
      control.click();
    };

    await step('the authored disabled status drops clicks', () => {
      clickEverywhere();
      expect(hostClick).not.toHaveBeenCalled();
    });

    await step('a disabled fieldset drops clicks', async () => {
      field.fieldStatus = undefined;
      fieldset.disabled = true;
      await field.updateComplete;
      clickEverywhere();
      expect(hostClick).not.toHaveBeenCalled();
    });

    await step('an enabled field still receives clicks', async () => {
      fieldset.disabled = false;
      await field.updateComplete;
      field.click();
      expect(hostClick).toHaveBeenCalledTimes(1);
    });
  },
};

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

// ──────────────────────────────────────────────────────────────
// TEST: Native implicit form submission
// ──────────────────────────────────────────────────────────────

export const ImplicitSubmitTest: Story = {
  render: () => html`
    <button
      type="submit"
      form="text-field-implicit-form"
      name="action"
      value="first"
    >
      Save
    </button>
    <form id="text-field-implicit-form">
      <swc-text-field
        accessible-label="Email"
        name="email"
        type="email"
        value="person@example.com"
        required
      ></swc-text-field>
      <button type="submit" name="action" value="second">Send</button>
    </form>
  `,
  play: async ({ canvasElement, step }) => {
    const field = await getComponent<TextField>(
      canvasElement,
      'swc-text-field'
    );
    const form = canvasElement.querySelector('form');
    const button = canvasElement.querySelector('button');
    const input = field.roleElement;
    if (!form || !button || !input) {
      throw new Error('form, submit button, or input not found');
    }
    const submissions: (HTMLElement | null)[] = [];
    let clicks = 0;
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      submissions.push(event.submitter);
    });
    button.addEventListener('click', () => clicks++);
    input.focus();

    await step('Enter clicks the first associated submit button', async () => {
      await userEvent.keyboard('{Enter}');
      await waitFor(() => expect(clicks).toBe(1));
      expect(submissions).toEqual([button]);
    });

    await step('native validation blocks an invalid submission', async () => {
      field.value = '';
      await field.updateComplete;
      await userEvent.keyboard('{Enter}');
      await waitFor(() => expect(clicks).toBe(2));
      expect(submissions).toHaveLength(1);
      field.value = 'person@example.com';
      await field.updateComplete;
    });

    await step(
      'formnovalidate on the default submitter is respected',
      async () => {
        field.value = '';
        button.formNoValidate = true;
        await field.updateComplete;
        await userEvent.keyboard('{Enter}');
        await waitFor(() => expect(submissions).toEqual([button, button]));
        button.formNoValidate = false;
        field.value = 'person@example.com';
        await field.updateComplete;
      }
    );

    await step(
      'a disabled default submitter does not fall through',
      async () => {
        button.disabled = true;
        await userEvent.keyboard('{Enter}');
        expect(clicks).toBe(3);
        expect(submissions).toHaveLength(2);
        button.disabled = false;
      }
    );

    await step('consumers can cancel Enter on the host', async () => {
      field.addEventListener('keydown', (event) => event.preventDefault(), {
        once: true,
      });
      await userEvent.keyboard('{Enter}');
      expect(clicks).toBe(3);
      expect(submissions).toHaveLength(2);
    });

    await step('composition and non-Enter keys do not submit', async () => {
      input.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'Enter',
          isComposing: true,
          bubbles: true,
          composed: true,
          cancelable: true,
        })
      );
      input.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'Enter',
          keyCode: 229,
          bubbles: true,
          composed: true,
          cancelable: true,
        })
      );
      await userEvent.keyboard('{ArrowLeft}');
      expect(clicks).toBe(3);
      expect(submissions).toHaveLength(2);
    });

    await step(
      'a canceled submit-button click prevents submission',
      async () => {
        button.addEventListener('click', (event) => event.preventDefault(), {
          once: true,
        });
        await userEvent.keyboard('{Enter}');
        await waitFor(() => expect(clicks).toBe(4));
        expect(submissions).toHaveLength(2);
      }
    );

    await step('an image input can be the default submitter', async () => {
      const image = document.createElement('input');
      image.type = 'image';
      image.alt = 'Save';
      image.setAttribute('form', form.id);
      button.before(image);
      await userEvent.keyboard('{Enter}');
      await waitFor(() => expect(submissions).toEqual([button, button, image]));
      image.remove();
    });
  },
};
ImplicitSubmitTest.storyName = 'Implicit submission';

export const ImplicitSubmitWithoutButtonTest: Story = {
  render: () => html`
    <form>
      <swc-text-field
        accessible-label="Username"
        name="username"
      ></swc-text-field>
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
      throw new Error('form or input not found');
    }
    const submissions: (HTMLElement | null)[] = [];
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      submissions.push(event.submitter);
    });
    input.focus();

    await step('a single field submits without a submit button', async () => {
      await userEvent.keyboard('{Enter}');
      await waitFor(() => expect(submissions).toEqual([null]));
    });

    await step(
      'native inputs with supported text-field types block implicit submission',
      async () => {
        const otherInput = document.createElement('input');
        otherInput.setAttribute('aria-label', 'Additional field');
        form.append(otherInput);
        for (const type of ['text', 'url', 'tel', 'email', 'password']) {
          otherInput.type = type;
          await userEvent.keyboard('{Enter}');
          expect(submissions, `${type} blocks submission`).toHaveLength(1);
        }
        otherInput.remove();
      }
    );

    await step(
      'another custom text field blocks implicit submission',
      async () => {
        const otherField = document.createElement('swc-text-field');
        otherField.accessibleLabel = 'Other';
        form.append(otherField);
        await otherField.updateComplete;
        await userEvent.keyboard('{Enter}');
        expect(submissions).toHaveLength(1);
        otherField.remove();
      }
    );

    await step(
      'other native types block only when the browser falls back to text',
      async () => {
        const otherInput = document.createElement('input');
        otherInput.setAttribute('aria-label', 'Additional field');
        form.append(otherInput);
        for (const type of [
          'search',
          'date',
          'month',
          'week',
          'time',
          'datetime-local',
          'number',
        ]) {
          otherInput.type = type;
          // Firefox and WebKit fall back to text for month and week inputs.
          const expectedSubmissions =
            submissions.length + (otherInput.type === 'text' ? 0 : 1);
          await userEvent.keyboard('{Enter}');
          await waitFor(() =>
            expect(
              submissions,
              `${type} resolves to ${otherInput.type}`
            ).toHaveLength(expectedSubmissions)
          );
          expect(submissions[submissions.length - 1]).toBeNull();
        }
        otherInput.remove();
      }
    );
  },
};
ImplicitSubmitWithoutButtonTest.storyName =
  'Implicit submission without a button';

// ──────────────────────────────────────────────────────────────
// TEST: Native single-line value sanitization
// ──────────────────────────────────────────────────────────────

export const ValueSanitizationTest: Story = {
  render: () => html`
    <form>
      <swc-text-field
        accessible-label="Email"
        name="email"
        type="email"
        value=" person@example.com "
      ></swc-text-field>
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
      throw new Error('form or input not found');
    }
    let events = 0;
    field.addEventListener('input', () => events++);
    field.addEventListener('change', () => events++);

    await step('initial values use native email sanitization', () => {
      expect(input.value).toBe('person@example.com');
      expect(field.value).toBe(input.value);
      expect(new FormData(form).get('email')).toBe(input.value);
    });

    await step(
      'programmatic values follow each native input type',
      async () => {
        for (const type of [
          'text',
          'email',
          'url',
          'tel',
          'password',
        ] as const) {
          const native = document.createElement('input');
          native.type = type;
          native.value = ' \tperson\n@example.com\r ';
          field.type = type;
          field.value = ' \tperson\n@example.com\r ';
          await field.updateComplete;
          expect(field.value, type).toBe(native.value);
          expect(input.value, type).toBe(native.value);
          expect(new FormData(form).get('email'), type).toBe(native.value);
        }
      }
    );

    await step('changing type sanitizes an existing value', async () => {
      field.type = 'text';
      field.value = ' person@example.com ';
      await field.updateComplete;
      field.type = 'email';
      await field.updateComplete;
      expect(field.value).toBe('person@example.com');
      expect(new FormData(form).get('email')).toBe(field.value);
    });

    await step(
      'reset sanitizes the authored default without emitting events',
      async () => {
        field.value = 'different@example.com';
        await field.updateComplete;
        form.reset();
        await field.updateComplete;
        expect(field.value).toBe('person@example.com');
        expect(input.value).toBe(field.value);
        expect(new FormData(form).get('email')).toBe(field.value);
        expect(events).toBe(0);
      }
    );
  },
};
ValueSanitizationTest.storyName = 'Native value sanitization';
