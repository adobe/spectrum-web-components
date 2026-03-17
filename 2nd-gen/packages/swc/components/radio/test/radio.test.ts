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

import { Radio } from '@adobe/spectrum-wc/radio';

import '@adobe/spectrum-wc/radio';

import { getComponent, getComponents } from '../../../utils/test-utils.js';
import meta from '../stories/radio.stories.js';
import {
  Default,
  Disabled,
  Emphasized,
  GroupExample,
  Invalid,
  Overview,
  Readonly,
  Sizes,
} from '../stories/radio.stories.js';

// This file defines dev-only test stories that reuse the main story metadata.
export default {
  ...meta,
  title: 'Radio/Tests',
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
    const radios = await getComponents<Radio>(canvasElement, 'swc-radio');

    await step('renders radios with role and slot content', async () => {
      expect(radios.length).toBe(3);
      for (const radio of radios) {
        expect(radio.getAttribute('role')).toBe('radio');
        expect(radio.textContent?.trim()).toBeTruthy();
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
    const radio = await getComponent<Radio>(canvasElement, 'swc-radio');

    await step('reflects checked and value', async () => {
      expect(radio.checked).toBe(true);
      expect(radio.value).toBe('opt');
      expect(radio.getAttribute('aria-checked')).toBe('true');
    });
  },
};

export const EmphasizedTest: Story = {
  ...Emphasized,
  play: async ({ canvasElement, step }) => {
    const radio = await getComponent<Radio>(canvasElement, 'swc-radio');

    await step('reflects emphasized and checked attributes', async () => {
      expect(radio.emphasized).toBe(true);
      expect(radio.checked).toBe(true);
    });
  },
};

export const InvalidTest: Story = {
  ...Invalid,
  play: async ({ canvasElement, step }) => {
    const radio = await getComponent<Radio>(canvasElement, 'swc-radio');

    await step('reflects invalid attribute', async () => {
      expect(radio.invalid).toBe(true);
      expect(radio.hasAttribute('aria-invalid')).toBe(true);
    });
  },
};

export const DisabledTest: Story = {
  ...Disabled,
  play: async ({ canvasElement, step }) => {
    const radio = await getComponent<Radio>(canvasElement, 'swc-radio');

    await step('reflects disabled state', async () => {
      expect(radio.disabled).toBe(true);
      expect(radio.getAttribute('aria-disabled')).toBe('true');
    });
  },
};

export const ReadonlyTest: Story = {
  ...Readonly,
  play: async ({ canvasElement, step }) => {
    const radio = await getComponent<Radio>(canvasElement, 'swc-radio');

    await step('reflects readonly and checked attributes', async () => {
      expect(radio.readonly).toBe(true);
      expect(radio.checked).toBe(true);
    });
  },
};

export const SizesTest: Story = {
  ...Sizes,
  play: async ({ canvasElement, step }) => {
    await step('reflects size attribute for each valid size', async () => {
      for (const size of Radio.VALID_SIZES) {
        const radio = canvasElement.querySelector(
          `swc-radio[size="${size}"]`
        ) as Radio | null;
        await radio?.updateComplete;
        expect(radio).toBeTruthy();
        expect(radio?.size).toBe(size);
      }
    });
  },
};

export const GroupExampleTest: Story = {
  ...GroupExample,
  play: async ({ canvasElement, step }) => {
    const radios = await getComponents<Radio>(canvasElement, 'swc-radio');

    await step('renders multiple radios with one checked', async () => {
      expect(radios.length).toBe(4);
      const checked = radios.filter((r) => r.checked);
      expect(checked.length).toBe(1);
      expect(checked[0]?.value).toBe('2');
    });
  },
};

export const PropertyMutationTest: Story = {
  render: () => html`
    <swc-radio value="one">Option</swc-radio>
  `,
  play: async ({ canvasElement, step }) => {
    const radio = await getComponent<Radio>(canvasElement, 'swc-radio');

    await step('value reflects to attribute after mutation', async () => {
      radio.value = 'two';
      await radio.updateComplete;
      expect(radio.getAttribute('value')).toBe('two');
    });

    await step('checked reflects to aria-checked after mutation', async () => {
      radio.checked = true;
      await radio.updateComplete;
      expect(radio.getAttribute('aria-checked')).toBe('true');
    });

    await step('disabled reflects after mutation', async () => {
      radio.disabled = true;
      await radio.updateComplete;
      expect(radio.getAttribute('aria-disabled')).toBe('true');
    });
  },
};
