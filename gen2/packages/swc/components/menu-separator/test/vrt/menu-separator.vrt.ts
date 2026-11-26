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
import { expect, waitFor } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import type { Menu } from '@adobe/spectrum-wc/components/menu/Menu.js';

import '@adobe/spectrum-wc/components/button/swc-button.js';
import '@adobe/spectrum-wc/components/menu/swc-menu.js';
import '@adobe/spectrum-wc/components/menu/swc-menu-item.js';
import '@adobe/spectrum-wc/components/menu-separator/swc-menu-separator.js';

import {
  forcedColorsVrtParameters,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

// Metadata

const meta: Meta = {
  title: 'Menu/Menu separator VRT',
  component: 'swc-menu-separator',
  tags: ['dev'],
};

export default meta;

// Helpers
//
// No size or state axes: the separator has no properties and no interactive
// states, so the visual axes are theme, direction and forced colors. Each
// menu also holds one `hidden` separator that must not render.

const SHADOW_BLEED = 24;

const separatorVrtParameters = {
  ...vrtParameters,
  styles: {
    ...vrtParameters.styles,
    paddingBlock: `${SHADOW_BLEED}px`,
    paddingBlockEnd: `${SHADOW_BLEED + 220}px`,
    paddingInline: `${SHADOW_BLEED * 2}px`,
  },
};

const separatorForcedColorsVrtParameters = {
  ...separatorVrtParameters,
  chromatic: forcedColorsVrtParameters.chromatic,
};

const renderMenu = (id: string) => html`
  <swc-button id=${id}>Edit</swc-button>
  <swc-menu for=${id} placement="bottom-start">
    <swc-menu-item><span slot="label">Cut</span></swc-menu-item>
    <swc-menu-item><span slot="label">Copy</span></swc-menu-item>
    <swc-menu-separator></swc-menu-separator>
    <swc-menu-item><span slot="label">Paste</span></swc-menu-item>
    <swc-menu-separator hidden></swc-menu-separator>
    <swc-menu-item><span slot="label">Paste special</span></swc-menu-item>
    <swc-menu-separator></swc-menu-separator>
    <swc-menu-item><span slot="label">Delete</span></swc-menu-item>
  </swc-menu>
`;

// A captured still can't open the menu through interaction. VRT-only.
const openMenuForVrt: NonNullable<Story['play']> = async ({
  canvasElement,
}) => {
  const menus = [...canvasElement.querySelectorAll<Menu>('swc-menu')];
  await Promise.all(menus.map((menu) => menu.updateComplete));
  menus.forEach((menu) => {
    menu.shouldFlip = false;
    menu.open = true;
  });
  await Promise.all(
    menus.map((menu) =>
      waitFor(() => expect(menu.hasAttribute('actual-placement')).toBe(true))
    )
  );
  (document.activeElement as HTMLElement | null)?.blur();
};

// VRT stories

export const Light: Story = {
  render: () => theme(renderMenu('vrt-light'), 'light', 'ltr'),
  parameters: separatorVrtParameters,
  play: openMenuForVrt,
};

export const Dark: Story = {
  render: () => theme(renderMenu('vrt-dark'), 'dark', 'ltr'),
  parameters: separatorVrtParameters,
  play: openMenuForVrt,
};

export const Rtl: Story = {
  render: () => theme(renderMenu('vrt-rtl'), 'light', 'rtl'),
  parameters: separatorVrtParameters,
  play: openMenuForVrt,
};
Rtl.storyName = 'RTL';

// Forced colors replaces the whole palette, so the line needs its own snapshot.
export const ForcedColors: Story = {
  render: () => theme(renderMenu('vrt-forced'), 'light', 'ltr'),
  parameters: separatorForcedColorsVrtParameters,
  play: openMenuForVrt,
};
