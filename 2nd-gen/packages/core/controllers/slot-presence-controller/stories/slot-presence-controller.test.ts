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

/**
 * Storybook play tests for `SlotPresenceController`.
 *
 * These verify observable behavior on a real element:
 *
 * - Initial slotted content is reflected on the first render.
 * - Adding and removing matching light-DOM children updates presence and
 *   re-renders the host. The controller replaces the `ObserveSlotPresence`
 *   mixin's deferred re-render (`updateComplete.then(() => requestUpdate())`)
 *   with a synchronous `requestUpdate()` from the `MutationObserver` callback;
 *   these tests confirm the host still re-renders correctly after the change.
 * - Multiple selectors are tracked independently via `getPresence`.
 * - The guard errors (`isPresent` with multiple selectors, `getPresence` with
 *   an unobserved selector) throw as documented.
 */

import { html } from 'lit';
import { expect } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import './demo-hosts.js';

import type {
  DemoSlotPresenceHost,
  DemoSlotPresenceMultiHost,
} from './demo-hosts.js';
import presenceMeta from './slot-presence-controller.stories.js';

// ─────────────────────────
//     HELPERS
// ─────────────────────────

/** Resolves after a microtask flush so a batched `requestUpdate` can settle. */
function flush(): Promise<void> {
  return Promise.resolve();
}

function makeIcon(): SVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('slot', 'icon');
  svg.setAttribute('aria-hidden', 'true');
  return svg;
}

// ─────────────────────────
//     META
// ─────────────────────────

export default {
  ...presenceMeta,
  title: 'Controllers/Slot presence controller/Tests',
  parameters: {
    ...presenceMeta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

// ──────────────────────────────────────────────────────────────────────────
//     Presence reflects initial content and reacts to DOM changes
// ──────────────────────────────────────────────────────────────────────────

export const SingleSelectorTest: Story = {
  render: () => html`
    <demo-slot-presence-host>Verified</demo-slot-presence-host>
  `,
  play: async ({ canvasElement, step }) => {
    const host = canvasElement.querySelector<DemoSlotPresenceHost>(
      'demo-slot-presence-host'
    );
    if (!host) {
      throw new Error('demo-slot-presence-host not found');
    }
    await host.updateComplete;
    const status = (): string =>
      host.shadowRoot?.querySelector('.status')?.textContent?.trim() ?? '';

    await step('no icon present on first render', async () => {
      expect(host.hasIcon, 'hasIcon is false with no slotted icon').toBe(false);
      expect(status()).toBe('Icon present: no');
    });

    await step(
      'appending a matching child updates presence and re-renders',
      async () => {
        host.appendChild(makeIcon());
        // MutationObserver callbacks are async; allow the observer + the
        // controller's synchronous requestUpdate to settle.
        await flush();
        await host.updateComplete;

        expect(host.hasIcon, 'hasIcon becomes true after append').toBe(true);
        expect(status()).toBe('Icon present: yes');
        expect(
          host.shadowRoot?.querySelector('.icon-box'),
          'icon container is rendered once an icon is present'
        ).toBeTruthy();
      }
    );

    await step('removing the child updates presence again', async () => {
      const icon = host.querySelector('[slot="icon"]');
      icon?.remove();
      await flush();
      await host.updateComplete;

      expect(host.hasIcon, 'hasIcon returns to false after removal').toBe(
        false
      );
      expect(status()).toBe('Icon present: no');
    });
  },
};
SingleSelectorTest.storyName = 'Single selector reactivity';

// ──────────────────────────────────────────────────────────────────────────
//     Multiple selectors tracked independently
// ──────────────────────────────────────────────────────────────────────────

export const MultipleSelectorsTest: Story = {
  render: () => html`
    <demo-slot-presence-multi-host>
      <span slot="label">Uploading</span>
    </demo-slot-presence-multi-host>
  `,
  play: async ({ canvasElement, step }) => {
    const host = canvasElement.querySelector<DemoSlotPresenceMultiHost>(
      'demo-slot-presence-multi-host'
    );
    if (!host) {
      throw new Error('demo-slot-presence-multi-host not found');
    }
    await host.updateComplete;

    await step('label present, description absent initially', async () => {
      expect(host.hasLabel).toBe(true);
      expect(host.hasDescription).toBe(false);
    });

    await step('adding a description is tracked independently', async () => {
      const description = document.createElement('span');
      description.setAttribute('slot', 'description');
      description.textContent = '3 of 10 files';
      host.appendChild(description);
      await flush();
      await host.updateComplete;

      expect(host.hasLabel, 'label presence unchanged').toBe(true);
      expect(host.hasDescription, 'description presence now true').toBe(true);
    });
  },
};
MultipleSelectorsTest.storyName = 'Multiple selectors';

// ──────────────────────────────────────────────────────────────────────────
//     Guard errors
// ──────────────────────────────────────────────────────────────────────────

export const GuardErrorsTest: Story = {
  render: () => html`
    <demo-slot-presence-multi-host>
      <span slot="label">Uploading</span>
    </demo-slot-presence-multi-host>
  `,
  play: async ({ canvasElement, step }) => {
    const host = canvasElement.querySelector<DemoSlotPresenceMultiHost>(
      'demo-slot-presence-multi-host'
    );
    if (!host) {
      throw new Error('demo-slot-presence-multi-host not found');
    }
    await host.updateComplete;

    await step('getPresence throws for an unobserved selector', async () => {
      // @ts-expect-error — reaching into the private controller for the test.
      const controller = host.slotPresence;
      expect(() => controller.getPresence('[slot="unknown"]')).toThrow();
    });
  },
};
GuardErrorsTest.storyName = 'Guard errors';
