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
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import { Popover } from '@adobe/spectrum-wc/popover';

import '@adobe/spectrum-wc/components/avatar/swc-avatar.js';
import '@adobe/spectrum-wc/components/button/swc-button.js';
import '@adobe/spectrum-wc/components/divider/swc-divider.js';
import '@adobe/spectrum-wc/components/popover/swc-popover.js';

// ────────────────
//    METADATA
// ────────────────

const { events, args, argTypes, template } = getStorybookHelpers('swc-popover');

argTypes.placement = {
  ...argTypes.placement,
  control: { type: 'select' },
  options: Popover.VALID_PLACEMENTS,
  table: { category: 'attributes', defaultValue: { summary: 'bottom' } },
};

argTypes.size = {
  ...argTypes.size,
  control: { type: 'select' },
  options: [undefined, ...Popover.VALID_SIZES],
  table: { category: 'attributes' },
};

// `actual-placement` is internal CSS-only state that `Popover` manages directly
// via setAttribute (the declared side before opening, then the flip-resolved side
// from PlacementController). The Storybook helper otherwise observes the attribute
// change, writes it back into `args`, and re-applies it through its `spread`
// directive on the next render — clobbering the resolved side with a stale value.
// Declaring it here (control disabled) makes the helper exclude it from the spread.
argTypes['actual-placement'] = {
  table: { disable: true },
  control: false,
};

/**
 * A popover is an anchored top-layer surface. In its default (non-modal) mode it
 * renders an internal `<div popover="auto">` with native light-dismiss; setting
 * `modal` renders a `<dialog>` opened via `showModal()` for blocking behavior.
 *
 * Scaffolded in Phase 2 (Setup). Lifecycle, events, and full stories land in
 * later migration phases.
 */
const meta: Meta = {
  title: 'Popover',
  component: 'swc-popover',
  args,
  argTypes,
  render: (args) => template(args),
  parameters: {
    actions: {
      handles: events,
    },
    docs: {
      subtitle: `Anchored top-layer surface for menus, dialogs, and contextual content`,
    },
  },
  tags: ['migrated'],
};

export default meta;

// ────────────────────
//    HELPERS
// ────────────────────

// A compact account card composed from existing components (avatar, divider,
// button) and the global typography classes. Passed as the popover's slotted
// content to show a realistic, polished example rather than a bare sentence.
const accountCard = `
  <div style="display: flex; flex-direction: column; gap: 16px; inline-size: 240px;">
    <div style="display: flex; align-items: center; gap: 12px;">
      <swc-avatar
        src="https://picsum.photos/id/64/48/48"
        alt=""
        size="300"
      ></swc-avatar>
      <div style="display: flex; flex-direction: column; gap: 2px;">
        <span class="swc-Title swc-Title--sizeS">Jess Lee</span>
        <span class="swc-Detail swc-Detail--sizeS">Product designer</span>
      </div>
    </div>
    <swc-divider size="s"></swc-divider>
    <p class="swc-Body swc-Body--sizeS" style="margin: 0;">
      Manage your profile, notification preferences, and connected apps.
    </p>
    <div style="display: flex; gap: 8px; justify-content: flex-end;">
      <swc-button variant="secondary" fill-style="outline" size="s">
        Dismiss
      </swc-button>
      <swc-button variant="accent" size="s">Open settings</swc-button>
    </div>
  </div>
`;

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story = {
  tags: ['dev'],
  args: {
    open: false,
    placement: 'bottom',
    'hide-arrow': false,
    for: 'playground-trigger',
    'default-slot': 'This popover is anchored to the button above.',
  },
  render: (args) => html`
    <swc-button id="playground-trigger">Toggle popover</swc-button>
    ${template(args)}
  `,
};

// ──────────────────────────
//    OVERVIEW STORY
// ──────────────────────────

export const Overview: Story = {
  args: {
    open: true,
    placement: 'bottom',
    'hide-arrow': false,
    for: 'overview-trigger',
    'default-slot': accountCard,
  },
  render: (args) => html`
    <swc-button id="overview-trigger">Account</swc-button>
    ${template(args)}
  `,
  tags: ['overview'],
};

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

export const CustomAnchor: Story = {
  args: {
    placement: 'bottom',
    'default-slot': 'Anchored to the link, not the button that opened it.',
  },
  render: (args) => {
    // The toggle control and the positioning anchor are different elements: the
    // button drives `open` while the popover anchors to the link via the
    // `triggerElement` property. `manual` is set so the link's own click is not
    // wired to toggle; the button owns visibility instead.
    //
    // The ref captures only the wrapper element: lit commits bindings in
    // document order, so the wrapper's ref callback runs before the
    // `${template()}` child binding has rendered `<swc-popover>`. The popover
    // and anchor are therefore resolved lazily inside `toggle`, which runs on
    // user click once the full subtree is in the DOM.
    let wrapper: Element | null = null;
    // Track the desired open state in the story rather than reading
    // `popover.open`. The button sits outside the popover, so clicking it while
    // open triggers the browser's native light-dismiss, which flips
    // `popover.open` to false before this handler runs. Driving `popover.open`
    // from a locally tracked intent makes the second click resolve to false
    // (matching the already-dismissed state) so the popover closes.
    let open = false;
    const capture = (element?: Element): void => {
      wrapper = element ?? null;
    };
    const toggle = (): void => {
      const popover = wrapper?.querySelector<Popover>('swc-popover');
      const anchor = wrapper?.querySelector<HTMLElement>('#custom-anchor');
      if (!popover || !anchor) {
        return;
      }
      popover.triggerElement = anchor;
      open = !open;
      popover.open = open;
    };
    return html`
      <div ${ref(capture)}>
        <div
          style="display: flex; flex-direction: column; align-items: flex-start; gap: 24px;"
        >
          <swc-button @click=${toggle}>Toggle popover</swc-button>
          <a href="#anchor" id="custom-anchor">Anchored link</a>
        </div>
        ${template({ ...args, manual: true })}
      </div>
    `;
  },
  tags: ['behaviors'],
};
CustomAnchor.storyName = 'Custom anchor';
