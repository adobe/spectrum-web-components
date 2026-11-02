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

import { MenuSeparator } from '@adobe/spectrum-wc/components/menu-separator/MenuSeparator.js';

import '@adobe/spectrum-wc/components/menu-separator/swc-menu-separator.js';

import { getComponent } from '../../../utils/test-utils.js';
import meta, { Anatomy, Overview } from '../stories/menu-separator.stories.js';

// This file defines dev-only test stories that reuse the main story metadata.
export default {
  ...meta,
  title: 'Menu separator/Tests',
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
    const separator = await getComponent<MenuSeparator>(
      canvasElement,
      'swc-menu-separator'
    );

    await step('exposes role="separator" on the host', async () => {
      expect(separator.getAttribute('role')).toBe('separator');
    });

    await step('adds no focus or naming attributes', async () => {
      expect(separator.hasAttribute('tabindex')).toBe(false);
      expect(separator.hasAttribute('aria-label')).toBe(false);
      expect(separator.hasAttribute('aria-orientation')).toBe(false);
    });

    await step('renders the internal line element', async () => {
      expect(
        separator.shadowRoot?.querySelector('.swc-MenuSeparator')
      ).toBeTruthy();
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Styling
// ──────────────────────────────────────────────────────────────

export const AnatomyTest: Story = {
  ...Anatomy,
  play: async ({ canvasElement, step }) => {
    const separator = await getComponent<MenuSeparator>(
      canvasElement,
      'swc-menu-separator'
    );
    const line = separator.shadowRoot?.querySelector(
      '.swc-MenuSeparator'
    ) as HTMLElement;

    await step('renders a 2px line', async () => {
      expect(getComputedStyle(line).blockSize).toBe('2px');
    });

    await step('centers the line in the 12px container', async () => {
      expect(getComputedStyle(line).marginBlockStart).toBe('5px');
      expect(getComputedStyle(line).marginBlockEnd).toBe('5px');
    });
  },
};
