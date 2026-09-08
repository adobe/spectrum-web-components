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
import { expect } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import { TextField } from '@adobe/spectrum-wc/text-field';

import '@adobe/spectrum-wc/components/text-field/swc-text-field.js';

import { getComponents } from '../../../utils/test-utils.js';
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
