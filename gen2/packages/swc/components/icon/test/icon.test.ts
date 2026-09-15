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
      expect(icon.accessibleLabel, 'accessibleLabel property is "Search"').toBe(
        'Search'
      );
      expect(icon.shadowRoot, 'shadow root is attached').toBeTruthy();
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Properties / Attributes
// ──────────────────────────────────────────────────────────────

export const SizeAttributeTest: Story = {
  render: () => html`
    <swc-icon size="xl" accessible-label="Search">
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
      expect(icon.getAttribute('size'), 'size attribute is "xl"').toBe('xl');
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Accessibility (host owns semantics)
// ──────────────────────────────────────────────────────────────

export const LabeledHostAccessibilityTest: Story = {
  render: () => html`
    <swc-icon accessible-label="Search">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
        <path
          d="M14.5 13.09 11.41 10a6 6 0 1 0-1.41 1.41l3.09 3.09a1 1 0 0 0 1.41-1.41zM3 7a4 4 0 1 1 8 0 4 4 0 0 1-8 0z"
        />
      </svg>
    </swc-icon>
  `,
  play: async ({ canvasElement, step }) => {
    const icon = await getComponent<Icon>(canvasElement, 'swc-icon');

    await step('applies role and aria-label to the host', async () => {
      expect(icon.getAttribute('role'), 'host has role="img"').toBe('img');
      expect(
        icon.getAttribute('aria-label'),
        'host aria-label matches accessibleLabel'
      ).toBe('Search');
      expect(
        icon.hasAttribute('aria-hidden'),
        'labeled host is not aria-hidden'
      ).toBe(false);
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

    await step('marks the host aria-hidden when no label', async () => {
      expect(
        icon.getAttribute('aria-hidden'),
        'host has aria-hidden="true" when no label'
      ).toBe('true');
      expect(icon.hasAttribute('role'), 'host has no role when no label').toBe(
        false
      );
      expect(
        icon.hasAttribute('aria-label'),
        'host has no aria-label when no label'
      ).toBe(false);
    });
  },
};

export const LabelTogglingTest: Story = {
  render: () => html`
    <swc-icon accessible-label="x">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
        <path
          d="M14.5 13.09 11.41 10a6 6 0 1 0-1.41 1.41l3.09 3.09a1 1 0 0 0 1.41-1.41zM3 7a4 4 0 1 1 8 0 4 4 0 0 1-8 0z"
        />
      </svg>
    </swc-icon>
  `,
  play: async ({ canvasElement, step }) => {
    const icon = await getComponent<Icon>(canvasElement, 'swc-icon');

    await step('initial label "x" sets aria-label on the host', async () => {
      expect(icon.getAttribute('aria-label'), 'host aria-label is "x"').toBe(
        'x'
      );
      expect(
        icon.hasAttribute('aria-hidden'),
        'host has no aria-hidden when label is set'
      ).toBe(false);
    });

    await step('clearing label marks the host aria-hidden', async () => {
      icon.accessibleLabel = '';
      await icon.updateComplete;
      expect(
        icon.getAttribute('aria-hidden'),
        'host has aria-hidden="true" after label is cleared'
      ).toBe('true');
      expect(
        icon.hasAttribute('aria-label'),
        'host has no aria-label after label is cleared'
      ).toBe(false);
    });

    await step(
      'setting label "y" restores aria-label on the host',
      async () => {
        icon.accessibleLabel = 'y';
        await icon.updateComplete;
        expect(icon.getAttribute('aria-label'), 'host aria-label is "y"').toBe(
          'y'
        );
        expect(
          icon.hasAttribute('aria-hidden'),
          'host has no aria-hidden after label is restored'
        ).toBe(false);
      }
    );
  },
};
