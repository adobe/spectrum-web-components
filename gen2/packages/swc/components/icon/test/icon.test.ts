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

// A custom, non-Spectrum SVG slotted into the frame as the test fixture — the
// frame's intended use. Follows the slotted-SVG contract: a single `<svg>` with a
// `viewBox`, no `width`/`height`, `fill="currentColor"`, and no ARIA.
const iconSvg = html`
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      fill="currentColor"
    />
  </svg>
`;

// ──────────────────────────────────────────────────────────────
// TEST: Defaults
// ──────────────────────────────────────────────────────────────

export const OverviewTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const icon = await getComponent<Icon>(canvasElement, 'swc-icon');

    await step('renders with expected default properties', async () => {
      expect(
        icon.accessibleLabel,
        'accessibleLabel property is "Favorite"'
      ).toBe('Favorite');
      expect(icon.shadowRoot, 'shadow root is attached').toBeTruthy();
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Properties / Attributes
// ──────────────────────────────────────────────────────────────

export const SizeAttributeTest: Story = {
  render: () => html`
    <swc-icon size="xl" accessible-label="Search">${iconSvg}</swc-icon>
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
    <swc-icon accessible-label="Search">${iconSvg}</swc-icon>
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
    <swc-icon>${iconSvg}</swc-icon>
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
    <swc-icon accessible-label="x">${iconSvg}</swc-icon>
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
