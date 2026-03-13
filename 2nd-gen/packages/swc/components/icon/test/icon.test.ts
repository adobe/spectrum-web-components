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

import '@adobe/spectrum-wc/icon';

import { getComponent } from '../../../utils/test-utils.js';
import meta from '../stories/icon.internal.stories.js';
import { Overview } from '../stories/icon.internal.stories.js';

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
      expect(icon.label).toBe('Search');
      expect(icon.shadowRoot).toBeTruthy();
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Properties / Attributes
// ──────────────────────────────────────────────────────────────

export const SizeAttributeTest: Story = {
  render: () => html`
    <swc-icon size="xl" label="Search">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
        <path
          d="M14.5 13.09 11.41 10a6 6 0 1 0-1.41 1.41l3.09 3.09a1 1 0 0 0 1.41-1.41zM3 7a4 4 0 1 1 8 0 4 4 0 0 1-8 0z"
        />
      </svg>
    </swc-icon>
  `,
  play: async ({ canvasElement, step }) => {
    const icon = await getComponent<Icon>(canvasElement, 'swc-icon');

    await step('reflects size attribute on host', async () => {
      expect(icon.getAttribute('size')).toBe('xl');
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Accessibility
// ──────────────────────────────────────────────────────────────

export const SlottedSvgAccessibilityTest: Story = {
  render: () => html`
    <swc-icon label="Search">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
        <path
          d="M14.5 13.09 11.41 10a6 6 0 1 0-1.41 1.41l3.09 3.09a1 1 0 0 0 1.41-1.41zM3 7a4 4 0 1 1 8 0 4 4 0 0 1-8 0z"
        />
      </svg>
    </swc-icon>
  `,
  play: async ({ canvasElement, step }) => {
    const icon = await getComponent<Icon>(canvasElement, 'swc-icon');

    await step('applies aria attributes to slotted svg', async () => {
      const svg = icon.querySelector('svg')!;
      expect(svg.getAttribute('role')).toBe('img');
      expect(svg.getAttribute('aria-label')).toBe('Search');
    });
  },
};

export const NoLabelAriaHiddenTest: Story = {
  render: () => html`
    <swc-icon>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
        <path
          d="M14.5 13.09 11.41 10a6 6 0 1 0-1.41 1.41l3.09 3.09a1 1 0 0 0 1.41-1.41zM3 7a4 4 0 1 1 8 0 4 4 0 0 1-8 0z"
        />
      </svg>
    </swc-icon>
  `,
  play: async ({ canvasElement, step }) => {
    const icon = await getComponent<Icon>(canvasElement, 'swc-icon');

    await step('applies aria-hidden when no label', async () => {
      const svg = icon.querySelector('svg')!;
      expect(svg.getAttribute('aria-hidden')).toBe('true');
      expect(svg.hasAttribute('aria-label')).toBe(false);
      expect(icon.getAttribute('aria-hidden')).toBe('true');
    });
  },
};

export const LabelTogglingTest: Story = {
  render: () => html`
    <swc-icon label="x">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
        <path
          d="M14.5 13.09 11.41 10a6 6 0 1 0-1.41 1.41l3.09 3.09a1 1 0 0 0 1.41-1.41zM3 7a4 4 0 1 1 8 0 4 4 0 0 1-8 0z"
        />
      </svg>
    </swc-icon>
  `,
  play: async ({ canvasElement, step }) => {
    const icon = await getComponent<Icon>(canvasElement, 'swc-icon');
    const svg = () => icon.querySelector('svg')!;

    await step('initial label "x" sets aria-label on svg', async () => {
      expect(svg().getAttribute('aria-label')).toBe('x');
      expect(svg().getAttribute('aria-hidden')).toBeNull();
    });

    await step('clearing label sets aria-hidden on svg', async () => {
      icon.label = '';
      await icon.updateComplete;
      expect(svg().getAttribute('aria-hidden')).toBe('true');
      expect(svg().hasAttribute('aria-label')).toBe(false);
    });

    await step('setting label "y" restores aria-label on svg', async () => {
      icon.label = 'y';
      await icon.updateComplete;
      expect(svg().getAttribute('aria-label')).toBe('y');
      expect(svg().getAttribute('aria-hidden')).toBeNull();
    });
  },
};
