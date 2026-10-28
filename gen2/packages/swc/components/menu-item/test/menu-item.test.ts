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
import { expect, userEvent, waitFor } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import type { MenuItem } from '@adobe/spectrum-wc/menu-item';
import { MENU_ITEM_VALID_SIZES } from '@adobe/spectrum-wc-core/components/menu-item';

import '@adobe/spectrum-wc/components/button/swc-button.js';
import '@adobe/spectrum-wc/components/menu/swc-menu.js';
import '@adobe/spectrum-wc/components/menu-item/swc-menu-item.js';

import { getComponent } from '../../../utils/test-utils.js';
import meta from '../stories/menu-item.stories.js';

export default {
  ...meta,
  title: 'Menu item/Tests',
  parameters: { ...meta.parameters, docs: { disable: true, page: null } },
  tags: ['!autodocs', 'dev'],
} as Meta;

const getItems = (canvasElement: HTMLElement): MenuItem[] =>
  Array.from(canvasElement.querySelectorAll('swc-menu-item'));

const inMenu = (rows: unknown, id: string) => html`
  <swc-button id=${id}>Edit</swc-button>
  <swc-menu for=${id}>${rows}</swc-menu>
`;

const threeRows = html`
  <swc-menu-item><span slot="label">Cut</span></swc-menu-item>
  <swc-menu-item disabled><span slot="label">Copy</span></swc-menu-item>
  <swc-menu-item><span slot="label">Paste</span></swc-menu-item>
`;

// ──────────────────────────────────────────────────────────────
// TEST: Defaults
// ──────────────────────────────────────────────────────────────

export const DefaultsTest: Story = {
  render: () => html`
    <swc-menu-item><span slot="label">Cut</span></swc-menu-item>
  `,
  play: async ({ canvasElement, step }) => {
    const item = await getComponent<MenuItem>(canvasElement, 'swc-menu-item');

    await step('renders expected default property values', async () => {
      expect(item.size, 'default size is m').toBe('m');
      expect(item.disabled, 'default disabled is false').toBe(false);
    });

    await step('carries role="menuitem" on the host', async () => {
      expect(item.getAttribute('role'), 'host role').toBe('menuitem');
    });

    await step('exposes no aria-disabled when enabled', async () => {
      expect(item.hasAttribute('aria-disabled'), 'no aria-disabled').toBe(
        false
      );
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Properties / Attributes
// ──────────────────────────────────────────────────────────────

export const PropertyMutationTest: Story = {
  render: () => html`
    <swc-menu-item><span slot="label">Cut</span></swc-menu-item>
  `,
  play: async ({ canvasElement, step }) => {
    const item = await getComponent<MenuItem>(canvasElement, 'swc-menu-item');

    await step('renders in every valid size', async () => {
      for (const size of MENU_ITEM_VALID_SIZES) {
        item.size = size;
        await item.updateComplete;
        expect(item.getAttribute('size'), `size attribute is "${size}"`).toBe(
          size
        );
      }
    });

    await step('reflects disabled and maps it to aria-disabled', async () => {
      item.disabled = true;
      await item.updateComplete;
      expect(item.hasAttribute('disabled'), 'disabled reflects').toBe(true);
      expect(item.getAttribute('aria-disabled'), 'aria-disabled set').toBe(
        'true'
      );

      item.disabled = false;
      await item.updateComplete;
      expect(item.hasAttribute('aria-disabled'), 'aria-disabled cleared').toBe(
        false
      );
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Role
// ──────────────────────────────────────────────────────────────

export const AuthoredRoleWinsTest: Story = {
  render: () => html`
    <swc-menu-item role="menuitemcheckbox">
      <span slot="label">Wrap</span>
    </swc-menu-item>
  `,
  play: async ({ canvasElement, step }) => {
    const item = await getComponent<MenuItem>(canvasElement, 'swc-menu-item');

    await step('does not overwrite an author-supplied role', async () => {
      expect(item.getAttribute('role'), 'authored role survives').toBe(
        'menuitemcheckbox'
      );
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Menu integration
// ──────────────────────────────────────────────────────────────

export const DiscoveredByMenuTest: Story = {
  render: () => inMenu(threeRows, 'discovery-trigger'),
  play: async ({ canvasElement, step }) => {
    const trigger = canvasElement.querySelector(
      '#discovery-trigger'
    ) as HTMLElement;

    await step('opening focuses the first row', async () => {
      await userEvent.click(trigger);
      await waitFor(() =>
        expect(document.activeElement, 'focus on the first row').toBe(
          getItems(canvasElement)[0]
        )
      );
    });

    // B20/Q20: disabled rows keep their place in the roving set. This is the
    // test the plan named as the one that settles whether the hand-rolled
    // mapping is enough.
    await step('arrow keys still reach a disabled row', async () => {
      await waitFor(() =>
        expect(
          getItems(canvasElement)[0].getAttribute('tabindex'),
          'first row holds the tab stop before navigating'
        ).toBe('0')
      );

      // Dispatched from the row rather than through `userEvent.keyboard`:
      // that helper tracks its own notion of focus and stops reaching the
      // menu once the row has a shadow root, landing the key on `body`.
      getItems(canvasElement)[0].dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'ArrowDown',
          bubbles: true,
          composed: true,
          cancelable: true,
        })
      );

      await waitFor(() =>
        expect(
          document.activeElement,
          'ArrowDown reaches the disabled row rather than skipping it'
        ).toBe(getItems(canvasElement)[1])
      );
      expect(
        getItems(canvasElement)[1].getAttribute('aria-disabled'),
        'the row it reached is genuinely the disabled one'
      ).toBe('true');
    });
  },
};
