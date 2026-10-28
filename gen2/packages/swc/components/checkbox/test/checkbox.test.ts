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

import { Checkbox } from '@adobe/spectrum-wc/checkbox';

import '@adobe/spectrum-wc/components/checkbox/swc-checkbox.js';

import { getComponent } from '../../../utils/test-utils.js';
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

// ──────────────────────────────────────────────────────────────
// TEST: Registration and stub render
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
    });

    await step('size defaults to m', () => {
      expect(checkbox.size).toBe('m');
      expect(checkbox).toHaveAttribute('size', 'm');
    });

    await step('label slot content labels the input', () => {
      const input = checkbox.shadowRoot?.querySelector('input');
      const label = input?.labels?.[0];
      const slot = label?.querySelector<HTMLSlotElement>('slot[name="label"]');
      const text = slot
        ?.assignedNodes({ flatten: true })
        .map((node) => node.textContent)
        .join('')
        .trim();
      expect(input?.labels).toHaveLength(1);
      expect(text).toBe('Send me product updates');
    });
  },
};
RegistrationTest.storyName = 'Registration and stub render';
