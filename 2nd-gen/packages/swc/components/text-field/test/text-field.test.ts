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
  getComponents,
  withWarningSpy,
} from '../../../utils/test-utils.js';
import meta from '../stories/text-field.stories.js';
import {
  Accessibility,
  Labelling,
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
      'error text is associated via ariaErrorMessageElements, in addition to ariaDescribedByElements',
      () => {
        expect(input?.ariaErrorMessageElements).toHaveLength(1);
        expect(input?.ariaDescribedByElements).toHaveLength(2);
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
