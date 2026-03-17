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

import { Checkbox } from '@adobe/spectrum-wc/checkbox';

import '@adobe/spectrum-wc/checkbox';

import { getComponent, getComponents } from '../../../utils/test-utils.js';
import meta from '../stories/checkbox.stories.js';
import {
  Checked,
  Default,
  Disabled,
  Emphasized,
  Indeterminate,
  Invalid,
  Overview,
  Readonly,
  Sizes,
} from '../stories/checkbox.stories.js';

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
// TEST: Defaults
// ──────────────────────────────────────────────────────────────

export const OverviewTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const checkboxes = await getComponents<Checkbox>(canvasElement, 'swc-checkbox');

    await step('renders checkboxes with input and slot content', async () => {
      expect(checkboxes.length).toBe(3);
      for (const cb of checkboxes) {
        const input = cb.shadowRoot?.querySelector('#input');
        expect(input?.getAttribute('type')).toBe('checkbox');
        expect(cb.textContent?.trim()).toBeTruthy();
      }
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Properties / Attributes
// ──────────────────────────────────────────────────────────────

export const DefaultTest: Story = {
  ...Default,
  play: async ({ canvasElement, step }) => {
    const checkbox = await getComponent<Checkbox>(canvasElement, 'swc-checkbox');

    await step('renders unchecked by default', async () => {
      expect(checkbox.checked).toBe(false);
      expect(checkbox.indeterminate).toBe(false);
      expect(checkbox.size).toBe('m');
    });
  },
};

export const CheckedTest: Story = {
  ...Checked,
  play: async ({ canvasElement, step }) => {
    const checkbox = await getComponent<Checkbox>(canvasElement, 'swc-checkbox');

    await step('reflects checked attribute', async () => {
      expect(checkbox.checked).toBe(true);
      expect(checkbox.hasAttribute('checked')).toBe(true);
    });
  },
};

export const IndeterminateTest: Story = {
  ...Indeterminate,
  play: async ({ canvasElement, step }) => {
    const checkbox = await getComponent<Checkbox>(canvasElement, 'swc-checkbox');

    await step('reflects indeterminate attribute', async () => {
      expect(checkbox.indeterminate).toBe(true);
      expect(checkbox.hasAttribute('indeterminate')).toBe(true);
    });
  },
};

export const EmphasizedTest: Story = {
  ...Emphasized,
  play: async ({ canvasElement, step }) => {
    const checkbox = await getComponent<Checkbox>(canvasElement, 'swc-checkbox');

    await step('reflects emphasized and checked attributes', async () => {
      expect(checkbox.emphasized).toBe(true);
      expect(checkbox.checked).toBe(true);
    });
  },
};

export const InvalidTest: Story = {
  ...Invalid,
  play: async ({ canvasElement, step }) => {
    const checkbox = await getComponent<Checkbox>(canvasElement, 'swc-checkbox');

    await step('reflects invalid attribute', async () => {
      expect(checkbox.invalid).toBe(true);
      expect(checkbox.hasAttribute('invalid')).toBe(true);
    });
  },
};

export const DisabledTest: Story = {
  ...Disabled,
  play: async ({ canvasElement, step }) => {
    const checkbox = await getComponent<Checkbox>(canvasElement, 'swc-checkbox');

    await step('reflects disabled state', async () => {
      expect(checkbox.disabled).toBe(true);
      const input = checkbox.shadowRoot?.querySelector('#input');
      expect(input?.hasAttribute('disabled')).toBe(true);
    });
  },
};

export const ReadonlyTest: Story = {
  ...Readonly,
  play: async ({ canvasElement, step }) => {
    const checkbox = await getComponent<Checkbox>(canvasElement, 'swc-checkbox');

    await step('reflects readonly and checked attributes', async () => {
      expect(checkbox.readonly).toBe(true);
      expect(checkbox.checked).toBe(true);
    });
  },
};

export const SizesTest: Story = {
  ...Sizes,
  play: async ({ canvasElement, step }) => {
    await step('reflects size attribute for each valid size', async () => {
      for (const size of Checkbox.VALID_SIZES) {
        const checkbox = canvasElement.querySelector(
          `swc-checkbox[size="${size}"]`
        ) as Checkbox | null;
        await checkbox?.updateComplete;
        expect(checkbox).toBeTruthy();
        expect(checkbox?.size).toBe(size);
      }
    });
  },
};

export const PropertyMutationTest: Story = {
  render: () => html`
    <swc-checkbox>Checkbox</swc-checkbox>
  `,
  play: async ({ canvasElement, step }) => {
    const checkbox = await getComponent<Checkbox>(canvasElement, 'swc-checkbox');

    await step('checked reflects to attribute after mutation', async () => {
      checkbox.checked = true;
      await checkbox.updateComplete;
      expect(checkbox.hasAttribute('checked')).toBe(true);
    });

    await step('indeterminate reflects to attribute after mutation', async () => {
      checkbox.indeterminate = true;
      await checkbox.updateComplete;
      expect(checkbox.hasAttribute('indeterminate')).toBe(true);
    });

    await step('disabled reflects after mutation', async () => {
      checkbox.disabled = true;
      await checkbox.updateComplete;
      const input = checkbox.shadowRoot?.querySelector('#input');
      expect(input?.hasAttribute('disabled')).toBe(true);
    });
  },
};
