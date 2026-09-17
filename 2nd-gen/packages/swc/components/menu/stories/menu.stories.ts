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
import { ref } from 'lit/directives/ref.js';
import { expect, waitFor } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import { MENU_PLACEMENTS } from '@adobe/spectrum-wc-core/components/menu';

import '@adobe/spectrum-wc/components/button/swc-button.js';
import '@adobe/spectrum-wc/components/menu/swc-menu.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-menu');

// The manifest only records the type alias name, not its expanded union, so
// the helper falls back to free text without this override.
argTypes.placement = {
  ...argTypes.placement,
  control: { type: 'select' },
  options: MENU_PLACEMENTS,
  table: { category: 'attributes', defaultValue: { summary: 'bottom-start' } },
};

// Internal CSS-only state `Menu` sets itself; excluded so the helper's
// attribute round-trip doesn't clobber it with a stale value.
argTypes['actual-placement'] = {
  table: { disable: true },
  control: false,
};

/**
 * A menu is a full [menu button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/)
 * host: an externally-referenced trigger opens a `PlacementController`-anchored
 * surface containing a `role="menu"` list of `swc-menu-item` rows.
 */
const meta: Meta = {
  title: 'Menu',
  component: 'swc-menu',
  args,
  argTypes,
  render: (args) => template(args),
  parameters: {
    docs: { subtitle: `Menu-button host for a list of actions` },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=37252-553',
    },
    // Pending a real Stackblitz project for swc-menu.
    // stackblitz: { url: '' },
  },
  tags: ['migrated'],
};

export default meta;

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

// Placeholders for `swc-menu-item`, which doesn't exist yet; matches its
// eventual tag name and `role="menuitem"` so the story stays aXe-clean.
const defaultItems = html`
  <swc-menu-item role="menuitem" tabindex="-1">Cut</swc-menu-item>
  <swc-menu-item role="menuitem" tabindex="-1">Copy</swc-menu-item>
  <swc-menu-item role="menuitem" tabindex="-1">Paste</swc-menu-item>
`;

export const Playground: Story = {
  args: {
    open: false,
    for: 'playground-trigger',
    'actual-placement': null,
    placement: 'bottom-start',
    'should-flip': true,
  },
  render: (args) => html`
    <swc-button id="playground-trigger">Edit</swc-button>
    ${template(args, defaultItems)}
  `,
  tags: ['dev'],
};

// ──────────────────────────
//    OVERVIEW STORY
// ──────────────────────────

export const Overview: Story = {
  args: {
    open: true,
    for: 'overview-trigger',
    'actual-placement': null,
  },
  render: (args) => html`
    <swc-button id="overview-trigger">Edit</swc-button>
    ${template(args, defaultItems)}
  `,
  tags: ['overview'],
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

export const Anatomy: Story = {
  args: {
    for: 'anatomy-trigger',
    'actual-placement': null,
  },
  render: (args) => html`
    <swc-button id="anatomy-trigger">Edit</swc-button>
    ${template(args, defaultItems)}
  `,
  // Forces the surface open so the anatomy is visible without a click.
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const menu = canvasElement.querySelector('swc-menu') as HTMLElement & {
      open: boolean;
    };
    menu.open = true;
    await waitFor(() => {
      expect(menu.matches(':popover-open')).toBe(true);
    });
  },
  tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

export const Sizes: Story = {
  args: {
    for: 'sizes-trigger',
    'actual-placement': null,
    size: 'm',
  },
  render: (args) => html`
    <swc-button id="sizes-trigger">Edit</swc-button>
    ${template(args, defaultItems)}
  `,
  tags: ['options'],
};

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

export const OpenAndClose: Story = {
  args: {
    for: 'open-close-trigger',
    'actual-placement': null,
  },
  render: (args) => html`
    <swc-button id="open-close-trigger">Edit</swc-button>
    ${template(args, defaultItems)}
  `,
  tags: ['behaviors'],
};
OpenAndClose.storyName = 'Open and close';

// Local-only: exercises `triggerElement`, a cross-shadow-boundary edge case,
// not referenced from the per-component MDX so it stays out of the
// production docs build. `tags: ['dev']` keeps it in the local sidebar only.
export const TriggerElement: Story = {
  render: () => {
    let triggerEl: HTMLElement | null = null;
    return html`
      <swc-button
        id="trigger-element-trigger"
        ${ref((el) => {
          triggerEl = (el as HTMLElement) ?? null;
        })}
      >
        Edit
      </swc-button>
      <swc-menu
        ${ref((el) => {
          if (el && triggerEl) {
            (
              el as HTMLElement & { triggerElement: HTMLElement | null }
            ).triggerElement = triggerEl;
          }
        })}
      >
        ${defaultItems}
      </swc-menu>
    `;
  },
  tags: ['dev'],
};

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = {
  args: {
    for: 'a11y-trigger',
    'actual-placement': null,
  },
  render: (args) => html`
    <swc-button id="a11y-trigger">Edit</swc-button>
    ${template(args, defaultItems)}
  `,
  // Forces the surface open so the ARIA/keyboard notes below have something
  // to point at without requiring a click first.
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const menu = canvasElement.querySelector('swc-menu') as HTMLElement & {
      open: boolean;
    };
    menu.open = true;
    await waitFor(() => {
      expect(menu.matches(':popover-open')).toBe(true);
    });
  },
  tags: ['a11y'],
};
