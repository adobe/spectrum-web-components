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
import '@adobe/spectrum-wc/components/button-group/swc-button-group.js';
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

// `actual-placement` is internal CSS-only state that `Popover` sets via
// setAttribute once the PlacementController anchors the surface (the flip-resolved
// physical side); the stylesheet keys tip orientation and the entry fade on it. The
// Storybook helper otherwise observes the attribute change, writes it back into
// `args`, and re-applies it through its `spread` directive on the next render,
// clobbering the resolved side with a stale value. Declaring it here (control
// disabled) makes the helper exclude it from the spread.
argTypes['actual-placement'] = {
  table: { disable: true },
  control: false,
};

/**
 * A `<swc-popover>` is an overlay element positioned relative to a trigger. It
 * renders in the top layer, anchors itself to the trigger, and points at it with
 * an arrow (tip) by default.
 *
 * In its default (non-modal) mode it renders an internal `<div popover="auto">`:
 * the page behind stays interactive and scrollable, and the browser dismisses it
 * on outside click or `Escape`. Setting `modal` renders a `<dialog>` opened via
 * `showModal()` instead, which traps focus, makes the page behind inert, and
 * exposes `role="dialog"`.
 *
 * Associate a trigger with `for` (an id in the same tree root) or the
 * `triggerElement` property; `open` controls visibility and `manual` opts out of
 * the built-in click-to-toggle.
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
      subtitle: `An overlay element positioned relative to a trigger`,
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
  <div style="display: flex; flex-direction: column; gap: 16px;">
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
    <p class="swc-Body swc-Body--sizeS">
      Manage your profile, notification preferences, and connected apps.
    </p>
    <swc-button-group align="end" size="s">
      <swc-button
        variant="secondary"
        fill-style="outline"
        size="s"
        onclick="this.closest('swc-popover').open = false"
      >
        Dismiss
      </swc-button>
      <swc-button variant="accent" size="s">Open settings</swc-button>
    </swc-button-group>
  </div>
`;

// A short prompt with two focusable buttons. Realistic content that also keeps
// the modal focus trap demonstrable: toggle `modal` in the controls, open the
// popover, and Tab cycles within these buttons instead of escaping to the page.
const securityPanel = `
  <div style="display: flex; flex-direction: column; gap: 16px; max-inline-size: 280px;">
    <div style="display: flex; flex-direction: column; gap: 4px;">
      <span class="swc-Title swc-Title--sizeS">Two-factor authentication</span>
      <p class="swc-Body swc-Body--sizeS">
        Add a verification step at sign-in so your account stays protected even
        if your password is exposed.
      </p>
    </div>
    <swc-button-group align="end" size="s">
      <swc-button
        variant="secondary"
        fill-style="outline"
        size="s"
        onclick="this.closest('swc-popover').open = false"
      >
        Not now
      </swc-button>
      <swc-button
        variant="accent"
        size="s"
        onclick="this.closest('swc-popover').open = false"
      >
        Turn on
      </swc-button>
    </swc-button-group>
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
    'accessible-label': 'Two-factor authentication',
    'default-slot': securityPanel,
  },
  render: (args) => html`
    <swc-button id="playground-trigger">Open popover</swc-button>
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
    size: 's',
    'hide-arrow': false,
    for: 'overview-trigger',
    'accessible-label': 'Account',
    'default-slot': accountCard,
  },
  render: (args) => html`
    <style>
      swc-popover[for='overview-trigger'] {
        --swc-popover-content-padding: 12px;
      }
    </style>
    <swc-button id="overview-trigger">Open popover</swc-button>
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
    'accessible-label': 'Definition',
    'default-slot': `Spectrum Web Components is Adobe's open-source library of
      Spectrum-styled UI components.`,
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
          <swc-button @click=${toggle}>Open popover</swc-button>
          <a href="#anchor" id="custom-anchor">Spectrum Web Components</a>
        </div>
        ${template({ ...args, manual: true })}
      </div>
    `;
  },
  tags: ['behaviors'],
};
CustomAnchor.storyName = 'Custom anchor';

export const VirtualAnchor: Story = {
  args: {
    manual: true,
    'accessible-label': 'Add comment',
    'default-slot': `
      <div style="display: flex; flex-direction: column; gap: 12px; max-inline-size: 220px;">
        <p class="swc-Body swc-Body--sizeS">Leave a comment at this point.</p>
        <swc-button-group align="end" size="s">
          <swc-button
            variant="accent"
            size="s"
            onclick="this.closest('swc-popover').open = false"
          >
            Add comment
          </swc-button>
        </swc-button-group>
      </div>
    `,
  },
  render: (args) => {
    // The anchor is a `VirtualTrigger` (an object with `getBoundingClientRect`),
    // not a DOM element, so the popover opens at an arbitrary point. The wrapper
    // is captured lazily for the same reason as `Custom anchor`: the popover is
    // rendered by the `${template()}` child binding after this ref runs.
    let wrapper: Element | null = null;
    const capture = (element?: Element): void => {
      wrapper = element ?? null;
    };
    const openAtPoint = (event: MouseEvent): void => {
      const popover = wrapper?.querySelector<Popover>('swc-popover');
      if (!popover) {
        return;
      }
      // Keyboard activation has no pointer position (clientX/Y are 0); fall back
      // to the activated area's center so the example stays operable by keyboard.
      const area = event.currentTarget as HTMLElement;
      const rect = area.getBoundingClientRect();
      const hasPoint = event.clientX !== 0 || event.clientY !== 0;
      const x = hasPoint ? event.clientX : rect.left + rect.width / 2;
      const y = hasPoint ? event.clientY : rect.top + rect.height / 2;
      popover.triggerElement = {
        getBoundingClientRect: () => new DOMRect(x, y, 0, 0),
      };
      popover.open = true;
    };
    return html`
      <div ${ref(capture)}>
        <button
          @click=${openAtPoint}
          style="inline-size: 320px; block-size: 120px; display: grid; place-items: center; border: 1px dashed currentColor; border-radius: 8px; background: transparent; color: inherit; cursor: crosshair;"
        >
          Click anywhere to add a comment
        </button>
        ${template({ ...args })}
      </div>
    `;
  },
  tags: ['behaviors'],
};
VirtualAnchor.storyName = 'Virtual anchor';

// ──────────────────────────
//    HELPERS (interactive)
// ──────────────────────────

// Renders a trigger button wired to a closed popover via `for=`. A top-layer
// popover can't be shown open inline, and open auto popovers light-dismiss one
// another, so each example is a trigger the reader clicks to open. Each pair
// needs a unique id.
const triggered = (
  popoverArgs: Record<string, unknown>,
  id: string,
  buttonLabel: string
) => html`
  <swc-button id=${id}>${buttonLabel}</swc-button>
  ${template({ ...popoverArgs, for: id })}
`;

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

export const Anatomy: Story = {
  args: {
    'accessible-label': 'Autosave',
    'default-slot': 'Your changes are saved automatically as you edit.',
  },
  render: (args) => triggered({ ...args }, 'anatomy-trigger', 'Open popover'),
  tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

export const Placement: Story = {
  args: {
    'accessible-label': 'Draft visibility',
    'default-slot': 'Drafts stay private until you publish them.',
  },
  render: (args) => html`
    ${triggered({ ...args, placement: 'top' }, 'placement-top', 'Top')}
    ${triggered({ ...args, placement: 'right' }, 'placement-right', 'Right')}
    ${triggered({ ...args, placement: 'bottom' }, 'placement-bottom', 'Bottom')}
    ${triggered({ ...args, placement: 'left' }, 'placement-left', 'Left')}
  `,
  parameters: { flexLayout: 'row-wrap' },
  tags: ['options'],
};

export const Sizes: Story = {
  args: {
    'accessible-label': 'Notification settings',
    'default-slot': `We send a monthly summary of your account activity. Change
      how often you receive it, or turn it off entirely, in your notification
      settings.`,
  },
  render: (args) => html`
    ${triggered({ ...args, size: 's' }, 'size-s', 'Small')}
    ${triggered({ ...args, size: 'm' }, 'size-m', 'Medium')}
    ${triggered({ ...args, size: 'l' }, 'size-l', 'Large')}
    ${triggered({ ...args }, 'size-auto', 'Default')}
  `,
  parameters: { flexLayout: 'row-wrap' },
  tags: ['options'],
};

export const HideArrow: Story = {
  args: {
    'hide-arrow': true,
    'accessible-label': 'Sync status',
    'default-slot': 'Connected to Google Drive. Last synced a few moments ago.',
  },
  render: (args) =>
    triggered({ ...args }, 'hide-arrow-trigger', 'Open popover'),
  tags: ['options'],
};
HideArrow.storyName = 'Hide arrow';

// ──────────────────────────
//    STATES STORIES
// ──────────────────────────

export const States: Story = {
  args: {
    'accessible-label': 'Messages',
    'default-slot': 'You have 3 unread messages in your inbox.',
  },
  render: (args) => triggered({ ...args }, 'states-trigger', 'Open popover'),
  tags: ['states'],
};

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

export const Modal: Story = {
  args: {
    modal: true,
    'accessible-label': 'Account settings',
    'default-slot': accountCard,
  },
  render: (args) => triggered({ ...args }, 'modal-trigger', 'Open modal'),
  tags: ['behaviors'],
};

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = {
  args: { 'accessible-label': 'Account', 'default-slot': accountCard },
  render: (args) => triggered({ ...args }, 'a11y-trigger', 'Open popover'),
  tags: ['a11y'],
};
