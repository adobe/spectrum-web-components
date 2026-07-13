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

import { Icon } from '@adobe/spectrum-wc/icon';

import '@adobe/spectrum-wc/components/icon/swc-icon.js';

import { getComponent } from '../../../utils/test-utils.js';
import meta from '../stories/icon.stories.js';
import { Overview } from '../stories/icon.stories.js';

// Copied from `elements/Chevron100Icon.ts`.
const chevronPath =
  'M2.83789 9.8252c-.19238 0-.38379-.07324-.53027-.21973-.29297-.29297-.29297-.76758 0-1.06055l3.54395-3.54492L2.30762 1.45508c-.29297-.29297-.29297-.76758 0-1.06055s.76758-.29297 1.06055 0l4.07422 4.0752c.29297.29297.29297.76758 0 1.06055l-4.07422 4.0752c-.14648.14648-.33789.21973-.53027.21973Z';

// This file defines dev-only test stories that reuse the main story metadata.
export default {
  ...meta,
  title: 'Icon/Tests',
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
    const icon = await getComponent<Icon>(canvasElement, 'swc-icon');

    await step('renders with expected default properties', async () => {
      expect(icon.label, 'label property is "Expand"').toBe('Expand');
      expect(icon.shadowRoot, 'shadow root is attached').toBeTruthy();
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Properties / Attributes
// ──────────────────────────────────────────────────────────────

export const SizeAttributeTest: Story = {
  render: () => html`
    <swc-icon size="xl" label="Expand">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
        <path d=${chevronPath} />
      </svg>
    </swc-icon>
  `,
  play: async ({ canvasElement, step }) => {
    const icon = await getComponent<Icon>(canvasElement, 'swc-icon');

    await step('reflects size attribute on host', async () => {
      expect(icon.getAttribute('size'), 'size attribute is "xl"').toBe('xl');
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Accessibility
// ──────────────────────────────────────────────────────────────

export const SlottedSvgAccessibilityTest: Story = {
  render: () => html`
    <swc-icon label="Expand">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
        <path d=${chevronPath} />
      </svg>
    </swc-icon>
  `,
  play: async ({ canvasElement, step }) => {
    const icon = await getComponent<Icon>(canvasElement, 'swc-icon');

    await step('applies aria attributes to slotted svg', async () => {
      const svg = icon.querySelector('svg')!;
      expect(svg.getAttribute('role'), 'slotted SVG has role="img"').toBe(
        'img'
      );
      expect(
        svg.getAttribute('aria-label'),
        'slotted SVG aria-label matches icon label'
      ).toBe('Expand');
    });
  },
};

export const NoLabelAriaHiddenTest: Story = {
  render: () => html`
    <swc-icon>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
        <path d=${chevronPath} />
      </svg>
    </swc-icon>
  `,
  play: async ({ canvasElement, step }) => {
    const icon = await getComponent<Icon>(canvasElement, 'swc-icon');

    await step('applies aria-hidden when no label', async () => {
      const svg = icon.querySelector('svg')!;
      expect(
        svg.getAttribute('aria-hidden'),
        'slotted SVG has aria-hidden="true" when no label'
      ).toBe('true');
      expect(
        svg.hasAttribute('aria-label'),
        'slotted SVG has no aria-label when icon has no label'
      ).toBe(false);
      expect(
        svg.getAttribute('focusable'),
        'slotted SVG sets focusable="false" when icon has no label'
      ).toBe('false');
      expect(
        icon.getAttribute('aria-hidden'),
        'host element has aria-hidden="true" when no label'
      ).toBe('true');
    });
  },
};

export const LabelTogglingTest: Story = {
  render: () => html`
    <swc-icon label="x">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
        <path d=${chevronPath} />
      </svg>
    </swc-icon>
  `,
  play: async ({ canvasElement, step }) => {
    const icon = await getComponent<Icon>(canvasElement, 'swc-icon');
    const svg = () => icon.querySelector('svg')!;

    await step('initial label "x" sets aria-label on svg', async () => {
      expect(
        svg().getAttribute('aria-label'),
        'SVG aria-label is "x" initially'
      ).toBe('x');
      expect(
        svg().getAttribute('aria-hidden'),
        'SVG has no aria-hidden when label is set'
      ).toBeNull();
      expect(
        svg().getAttribute('focusable'),
        'SVG has no focusable attribute when label is set'
      ).toBeNull();
    });

    await step('clearing label sets aria-hidden on svg', async () => {
      icon.label = '';
      await icon.updateComplete;
      expect(
        svg().getAttribute('aria-hidden'),
        'SVG has aria-hidden="true" after label is cleared'
      ).toBe('true');
      expect(
        svg().hasAttribute('aria-label'),
        'SVG has no aria-label after label is cleared'
      ).toBe(false);
      expect(
        svg().getAttribute('focusable'),
        'SVG sets focusable="false" after label is cleared'
      ).toBe('false');
    });

    await step('setting label "y" restores aria-label on svg', async () => {
      icon.label = 'y';
      await icon.updateComplete;
      expect(
        svg().getAttribute('aria-label'),
        'SVG aria-label is "y" after setting new label'
      ).toBe('y');
      expect(
        svg().getAttribute('aria-hidden'),
        'SVG has no aria-hidden after label is restored'
      ).toBeNull();
      expect(
        svg().getAttribute('focusable'),
        'SVG has no focusable attribute after label is restored'
      ).toBeNull();
    });
  },
};
