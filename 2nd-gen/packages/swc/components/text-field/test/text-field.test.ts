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

import {
  fixture,
  getComponent,
  getComponents,
  withWarningSpy,
} from '../../../utils/test-utils.js';
import meta from '../stories/text-field.stories.js';
import { Labelling, States } from '../stories/text-field.stories.js';

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
      expect(label).toBeTruthy();
      expect(label?.getAttribute('for')).toBe(input?.id);
    });

    await step('accessible-label sets aria-label on the input', () => {
      const input = labelOnly.shadowRoot?.querySelector('input');
      expect(input?.getAttribute('aria-label')).toBe(
        'Accessible-label only (no visible label)'
      );
    });

    await step(
      'accessible-labelledby resolves external row/column headers',
      () => {
        const input = labelledbyWins.shadowRoot?.querySelector('input');
        const resolved = input?.ariaLabelledByElements;
        expect(resolved).toHaveLength(2);
        expect(resolved?.map((el) => el.id)).toEqual([
          'labelling-row-header',
          'labelling-col-header',
        ]);
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: required is reflected onto the native input
// ──────────────────────────────────────────────────────────────

export const StatesTest: Story = {
  ...States,
  play: async ({ canvasElement, step }) => {
    const fields = await getComponents<TextField>(
      canvasElement,
      'swc-text-field'
    );

    await step('required is reflected onto the native input', () => {
      const requiredField = fields[1];
      const requiredInput = requiredField.shadowRoot?.querySelector('input');
      expect(requiredInput?.required).toBe(true);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: readonly, aria-invalid, and value round-trip bindings
// ──────────────────────────────────────────────────────────────

export const BindingsTest: Story = {
  render: () => html`
    <swc-text-field accessible-label="Username"></swc-text-field>
  `,
  play: async ({ canvasElement, step }) => {
    const field = await getComponent<TextField>(
      canvasElement,
      'swc-text-field'
    );
    const input = () =>
      field.shadowRoot?.querySelector('input') as HTMLInputElement;

    await step('readonly reflects onto the native input', async () => {
      expect(input().readOnly).toBe(false);
      field.readonly = true;
      await field.updateComplete;
      expect(input().readOnly).toBe(true);
    });

    await step('invalid sets aria-invalid on the native input', async () => {
      expect(input().getAttribute('aria-invalid')).toBe(null);
      field.invalid = true;
      await field.updateComplete;
      expect(input().getAttribute('aria-invalid')).toBe('true');
    });

    await step('typing round-trips the native value back to the host', () => {
      // The @input handler is the only path that syncs user edits onto
      // the host `value`; assert it so `.value` in render can't silently
      // drift from what the user sees.
      input().value = 'typed by user';
      input().dispatchEvent(new Event('input'));
      expect(field.value).toBe('typed by user');
    });

    await step('focusing the host delegates to the native input', () => {
      // delegatesFocus makes the field a single tab stop with focus
      // landing on the real control rather than the host wrapper.
      field.focus();
      expect(field.shadowRoot?.activeElement).toBe(input());
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
        expect(messages.some((m) => m.includes('expects "type"'))).toBe(true);
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
        expect(messages.some((m) => m.includes('expects "label-position"'))).toBe(
          true
        );
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
        expect(messages.some((m) => m.includes('accessible name'))).toBe(true);
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
          messages.some((m) => m.includes('named only by its placeholder'))
        ).toBe(true);
        // The generic missing-name warning is suppressed in favor of this one.
        expect(
          messages.some((m) => m.includes('requires an accessible name'))
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
        expect(messages.some((m) => m.includes('placeholder'))).toBe(false);
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
        expect(messages.some((m) => m.includes('set on the host'))).toBe(true);
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
            )
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
          expect(messages.some((m) => m.includes(CONFLICT_PHRASE))).toBe(false);
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
          expect(messages.some((m) => m.includes(CONFLICT_PHRASE))).toBe(false);
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
        expect(messages.some((m) => m.includes(CONFLICT_PHRASE))).toBe(false);
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
