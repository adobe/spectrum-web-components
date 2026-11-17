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

import { expect, userEvent, waitFor } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import type { Menu } from '@adobe/spectrum-wc/components/menu/Menu.js';
import { MenuSeparator } from '@adobe/spectrum-wc/components/menu-separator/MenuSeparator.js';

import '@adobe/spectrum-wc/components/menu-separator/swc-menu-separator.js';

import { getComponent, withWarningSpy } from '../../../utils/test-utils.js';
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
      expect(separator.getAttribute('role'), 'role is separator').toBe(
        'separator'
      );
    });

    await step('adds no focus or naming attributes', async () => {
      expect(separator.hasAttribute('tabindex'), 'no tabindex').toBe(false);
      expect(separator.hasAttribute('aria-label'), 'no aria-label').toBe(false);
      expect(
        separator.hasAttribute('aria-orientation'),
        'no aria-orientation'
      ).toBe(false);
    });

    await step('renders the internal line element', async () => {
      expect(
        separator.shadowRoot?.querySelector('.swc-MenuSeparator'),
        'internal line element renders'
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

    await step('renders the medium divider thickness', async () => {
      expect(getComputedStyle(line).blockSize, 'line is 2px').toBe('2px');
    });

    await step('centers the line in the 12px container', async () => {
      expect(getComputedStyle(line).marginBlockStart, 'start margin').toBe(
        '5px'
      );
      expect(getComputedStyle(line).marginBlockEnd, 'end margin').toBe('5px');
    });
  },
};

export const FocusTest: Story = {
  ...Anatomy,
  play: async ({ canvasElement, step }) => {
    const menu = await getComponent<Menu>(canvasElement, 'swc-menu');
    const separator = await getComponent<MenuSeparator>(
      canvasElement,
      'swc-menu-separator'
    );
    const items = Array.from(
      canvasElement.querySelectorAll('swc-menu-item')
    ) as HTMLElement[];
    const popover = menu.shadowRoot?.querySelector('.swc-Menu') as HTMLElement;

    await step('keyboard navigation skips the separator', async () => {
      menu.open = true;
      await menu.updateComplete;
      await waitFor(() =>
        expect(popover.matches(':popover-open'), 'menu is open').toBe(true)
      );
      items[1].focus();
      await userEvent.keyboard('{ArrowDown}');
      expect(
        document.activeElement,
        'ArrowDown from Copy lands on Delete'
      ).toBe(items[2]);
    });

    await step('clicking the separator keeps the menu open', async () => {
      await userEvent.click(separator);
      expect(popover.matches(':popover-open'), 'menu stays open').toBe(true);
    });

    await step('slotting the separator logs no warning', async () => {
      await withWarningSpy(async (warnCalls) => {
        const extra = document.createElement('swc-menu-separator');
        menu.append(extra);
        await menu.updateComplete;
        extra.remove();
        expect(warnCalls.length, 'no placement warning').toBe(0);
      });
    });
  },
};
