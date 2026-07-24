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

import { UiIcon } from '@adobe/spectrum-wc/ui-icons';

import '@adobe/spectrum-wc/components/ui-icons/swc-ui-icon.js';

import { getComponent } from '../../../utils/test-utils.js';
import meta, { Overview } from '../stories/ui-icons.internal.stories.js';

// This file defines dev-only test stories that reuse the main story metadata.
export default {
  ...meta,
  title: 'UI icons/Tests',
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
    const icon = await getComponent<UiIcon>(canvasElement, 'swc-ui-icon');

    await step('renders the requested icon at the default size', async () => {
      expect(icon.icon, 'icon property is "chevron"').toBe('chevron');
      expect(icon.size, 'default size is "m"').toBe('m');
      expect(
        icon.shadowRoot?.querySelector('svg'),
        'renders an svg'
      ).toBeTruthy();
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Properties / Attributes
// ──────────────────────────────────────────────────────────────

export const IconAttributeTest: Story = {
  render: () => html`
    <swc-ui-icon icon="checkmark" accessible-label="Done"></swc-ui-icon>
  `,
  play: async ({ canvasElement, step }) => {
    const icon = await getComponent<UiIcon>(canvasElement, 'swc-ui-icon');

    await step('renders the svg for the selected icon-set', async () => {
      expect(icon.icon, 'icon property is "checkmark"').toBe('checkmark');
      expect(
        icon.shadowRoot?.querySelector('svg'),
        'renders an svg'
      ).toBeTruthy();
    });
  },
};

export const SizeSelectsStepTest: Story = {
  render: () => html`
    <swc-ui-icon
      icon="chevron"
      size="xs"
      accessible-label="Chevron"
    ></swc-ui-icon>
  `,
  play: async ({ canvasElement, step }) => {
    const icon = await getComponent<UiIcon>(canvasElement, 'swc-ui-icon');
    const viewBox = () =>
      icon.shadowRoot?.querySelector('svg')?.getAttribute('viewBox') ?? '';

    let extraSmall = '';

    await step('reflects size and renders the xs optical step', async () => {
      expect(icon.getAttribute('size'), 'size attribute is "xs"').toBe('xs');
      extraSmall = viewBox();
      expect(extraSmall, 'xs renders an svg with a viewBox').toBeTruthy();
    });

    await step('a larger size selects a different optical step', async () => {
      icon.size = 'xl';
      await icon.updateComplete;
      const extraLarge = viewBox();
      expect(icon.getAttribute('size'), 'size attribute is "xl"').toBe('xl');
      expect(extraLarge, 'xl renders an svg with a viewBox').toBeTruthy();
      expect(extraLarge, 'xl optical step differs from the xs step').not.toBe(
        extraSmall
      );
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Accessibility (host owns semantics, inherited from IconBase)
// ──────────────────────────────────────────────────────────────

export const LabeledHostAccessibilityTest: Story = {
  render: () => html`
    <swc-ui-icon icon="chevron" accessible-label="Expand"></swc-ui-icon>
  `,
  play: async ({ canvasElement, step }) => {
    const icon = await getComponent<UiIcon>(canvasElement, 'swc-ui-icon');

    await step('exposes the host as a labeled image', async () => {
      expect(icon.getAttribute('role'), 'host has role="img"').toBe('img');
      expect(
        icon.getAttribute('aria-label'),
        'host aria-label matches accessibleLabel'
      ).toBe('Expand');
      expect(
        icon.hasAttribute('aria-hidden'),
        'labeled host is not aria-hidden'
      ).toBe(false);
    });
  },
};

export const DecorativeHostAccessibilityTest: Story = {
  render: () => html`
    <swc-ui-icon icon="chevron"></swc-ui-icon>
  `,
  play: async ({ canvasElement, step }) => {
    const icon = await getComponent<UiIcon>(canvasElement, 'swc-ui-icon');

    await step('hides the host from AT when no label', async () => {
      expect(
        icon.getAttribute('aria-hidden'),
        'host has aria-hidden="true"'
      ).toBe('true');
      expect(icon.hasAttribute('role'), 'host has no role').toBe(false);
      expect(icon.hasAttribute('aria-label'), 'host has no aria-label').toBe(
        false
      );
    });
  },
};

export const LabelTogglingTest: Story = {
  render: () => html`
    <swc-ui-icon icon="chevron" accessible-label="x"></swc-ui-icon>
  `,
  play: async ({ canvasElement, step }) => {
    const icon = await getComponent<UiIcon>(canvasElement, 'swc-ui-icon');

    await step('initial label sets aria-label on the host', async () => {
      expect(icon.getAttribute('aria-label'), 'host aria-label is "x"').toBe(
        'x'
      );
      expect(
        icon.hasAttribute('aria-hidden'),
        'host is not aria-hidden when labeled'
      ).toBe(false);
    });

    await step('clearing the label hides the host', async () => {
      icon.accessibleLabel = '';
      await icon.updateComplete;
      expect(
        icon.getAttribute('aria-hidden'),
        'host has aria-hidden="true" after clearing'
      ).toBe('true');
      expect(
        icon.hasAttribute('aria-label'),
        'host has no aria-label after clearing'
      ).toBe(false);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Edge cases
// ──────────────────────────────────────────────────────────────

export const UnknownIconTest: Story = {
  render: () => html`
    <swc-ui-icon icon="not-an-icon"></swc-ui-icon>
  `,
  play: async ({ canvasElement, step }) => {
    const icon = await getComponent<UiIcon>(canvasElement, 'swc-ui-icon');

    await step(
      'renders no svg for an unknown icon without throwing',
      async () => {
        expect(
          icon.shadowRoot?.querySelector('svg'),
          'no svg is rendered for an unknown icon'
        ).toBeNull();
      }
    );
  },
};
