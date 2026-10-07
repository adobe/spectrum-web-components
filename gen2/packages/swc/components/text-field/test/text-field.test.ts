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
import { expect, userEvent } from '@storybook/test';
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
import meta from '../stories/text-field.stories.js';
import {
  Accessibility,
  FormBehavior,
  Labelling,
  NecessityIndicator,
  Sizes,
  States,
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
// TEST: Labelling precedence in context
// ──────────────────────────────────────────────────────────────

export const LabellingTest: Story = {
  ...Labelling,
  play: async ({ canvasElement, step }) => {
    const fields = await getComponents<TextField>(
      canvasElement,
      'swc-text-field'
    );
    const [slotOnly, labelOnly, labelledbyWins] = fields;

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
        const input = labelledbyWins.shadowRoot?.querySelector('input');
        const resolved = input?.ariaLabelledByElements;
        expect(resolved, 'both labelledby references resolve').toHaveLength(2);
        expect(
          resolved?.map((el) => el.id),
          'labelledby references preserve row-then-column order'
        ).toEqual(['labelling-row-header', 'labelling-col-header']);
      }
    );
  },
};

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

        field.invalid = true;
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
// TEST: States: required reflection + invalid description/error wiring
// ──────────────────────────────────────────────────────────────

export const StatesTest: Story = {
  ...States,
  play: async ({ canvasElement, step }) => {
    const fields = await getComponents<TextField>(
      canvasElement,
      'swc-text-field'
    );
    const invalidField = fields[fields.length - 2];
    const disabledInvalidField = fields[fields.length - 1];
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
      'disabled invalid fields suppress invalid presentation and association',
      () => {
        const disabledInput =
          disabledInvalidField.shadowRoot?.querySelector('input');
        expect(
          disabledInput?.getAttribute('aria-invalid'),
          'disabled invalid field omits aria-invalid'
        ).toBeNull();
        expect(
          disabledInvalidField.shadowRoot?.querySelector(
            '.swc-FormFieldErrorText'
          ),
          'disabled invalid field hides error text'
        ).toBeNull();
        expect(
          disabledInvalidField.shadowRoot?.querySelector(
            '.swc-TextField-invalidIcon'
          ),
          'disabled invalid field hides validation icon'
        ).toBeNull();
        expect(
          disabledInput?.ariaDescribedByElements?.some((element) =>
            element.className.includes('swc-FormFieldErrorText')
          ),
          'disabled invalid field omits error text from describedby'
        ).toBe(false);
      }
    );

    await step('re-enabling restores the invalid presentation', async () => {
      disabledInvalidField.disabled = false;
      await disabledInvalidField.updateComplete;
      const reenabledInput =
        disabledInvalidField.shadowRoot?.querySelector('input');
      expect(
        reenabledInput?.getAttribute('aria-invalid'),
        're-enabled invalid field restores aria-invalid'
      ).toBe('true');
      expect(
        disabledInvalidField.shadowRoot?.querySelector(
          '.swc-FormFieldErrorText'
        ),
        're-enabled invalid field restores error text'
      ).toBeTruthy();
      expect(
        disabledInvalidField.shadowRoot?.querySelector(
          '.swc-TextField-invalidIcon'
        ),
        're-enabled invalid field restores validation icon'
      ).toBeTruthy();
    });

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

    await step('required is reflected onto the native input', () => {
      const requiredField = fields[1];
      const requiredInput = requiredField.shadowRoot?.querySelector('input');
      expect(
        requiredInput?.required,
        'required property reaches the input'
      ).toBe(true);
    });

    await step(
      'a required field with a visible label shows a decorative asterisk',
      () => {
        const indicator = fields[1].shadowRoot?.querySelector(
          '.swc-FormFieldLabel-requiredIndicator'
        );
        expect(indicator, 'required label renders its asterisk').toBeTruthy();
        expect(
          indicator?.getAttribute('aria-hidden'),
          'required asterisk is hidden from assistive technology'
        ).toBe('true');
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
      // A valid field renders no validation icon.
      expect(
        fields[0].shadowRoot?.querySelector('.swc-TextField-invalidIcon'),
        'valid field omits the validation icon'
      ).toBeNull();
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
        'necessity label is hidden from assistive technology'
      ).toBe('true');
    });

    await step('label mode marks an optional field "(optional)"', () => {
      const label = optionalLabel.shadowRoot?.querySelector(
        '.swc-FormFieldLabel-necessityLabel'
      );
      expect(label?.textContent?.trim(), 'optional label is shown').toBe(
        '(optional)'
      );
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
      field.readonly = true;
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
      field.invalid = true;
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

    await step('warns when "label-position" is not a supported value', () =>
      withWarningSpy(async (warnCalls) => {
        const field = await fixture<TextField>(html`
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
      field.disabled = true;
      await field.updateComplete;
      expect(
        new FormData(form).has('username'),
        'disabled field is excluded from FormData'
      ).toBe(false);
      field.disabled = false;
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
    const validityOutput =
      form?.querySelector<HTMLOutputElement>('[data-validity]');
    const checkValidityButton = form?.querySelector<HTMLButtonElement>(
      'button[type="button"]'
    );
    if (!form || !input || !output || !validityOutput || !checkValidityButton) {
      throw new Error('form, input, outputs, or validity button not found');
    }

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
      checkValidityButton.click();
      expect(
        validityOutput.textContent?.trim(),
        'validity output reports the empty required field'
      ).toBe(
        'field.checkValidity(): invalid\n' +
          'form.checkValidity(): invalid\n' +
          'validity.valueMissing: true'
      );

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
      checkValidityButton.click();
      expect(
        validityOutput.textContent?.trim(),
        'validity output reports the filled field'
      ).toBe('field.checkValidity(): valid\nform.checkValidity(): valid');
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
        field.invalid = false;
        await field.updateComplete;
        form.requestSubmit();
        await field.updateComplete;
        expect(field.invalid, 'empty submission marks the field invalid').toBe(
          true
        );
        expect(
          field.shadowRoot?.querySelector('.swc-TextField-invalidIcon'),
          'invalid submission renders the validation icon'
        ).toBeTruthy();
        expect(
          output.textContent?.trim(),
          'invalid submission does not show submitted form data'
        ).toBe('Submit the form to see its data.');
      }
    );

    await step('submit includes the field value when valid', async () => {
      field.value = 'Submitted';
      await field.updateComplete;
      form.requestSubmit();
      await field.updateComplete;
      expect(field.invalid, 'valid submission clears invalid state').toBe(
        false
      );
      expect(
        new FormData(form).get('username'),
        'submitted username is included in FormData'
      ).toBe('Submitted');
      expect(
        output.textContent?.trim(),
        'output displays the submitted username'
      ).toBe('username: Submitted');
    });

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
        expect(toggleButton).toBeEnabled();

        await userEvent.click(toggleButton);
        await field.updateComplete;
        expect(fieldset.disabled).toBe(false);
        expect(input.disabled).toBe(false);
        expect(toggleButton).toBeEnabled();
      }
    );
  },
};
FormBehaviorTest.storyName = 'Native form behavior';

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

    await step('enabled: not :disabled, value participates', () => {
      expect(field.matches(':disabled'), 'not :disabled').toBe(false);
      expect(
        new FormData(form).get('username'),
        'enabled field participates in FormData'
      ).toBe('Example');
    });

    await step('own disabled matches native :disabled', async () => {
      field.disabled = true;
      await field.updateComplete;
      expect(field.matches(':disabled'), 'own disabled matches :disabled').toBe(
        true
      );
      expect(
        new FormData(form).has('username'),
        'disabled field is excluded from FormData'
      ).toBe(false);
      field.disabled = false;
      await field.updateComplete;
    });

    await step(
      'cascaded <fieldset disabled> matches :disabled on the host',
      async () => {
        fieldset.disabled = true;
        await field.updateComplete;
        expect(
          field.matches(':disabled'),
          'cascade matches :disabled without the host property'
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
          field.matches(':disabled'),
          ':disabled clears when re-enabled'
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
