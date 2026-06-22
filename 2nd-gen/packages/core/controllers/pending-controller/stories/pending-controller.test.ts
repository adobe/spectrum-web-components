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
 * These Storybook play tests verify observable `PendingController` behavior using
 * real browser timers and programmatic property changes.
 *
 * ### Timing
 *
 * The `demo-pending-host` element uses a 250 ms controller delay (shortened from
 * the 1000 ms production default) so tests are responsive without multi-second
 * waits. All `wait()` calls include a buffer beyond the configured delay.
 *
 * ### Focus-retention contract
 *
 * When `pendingActive` transitions from `false` to `true`, the controller calls
 * `host.requestUpdate()`, which triggers a Lit re-render. Because lit-html patches
 * the DOM in place rather than replacing elements, the focused `<button>` is not
 * destroyed. The test verifies that `shadowRoot.activeElement` still points to the
 * same internal button after the re-render.
 */

import { expect } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import './demo-hosts.js';

import type { DemoPendingHost } from './demo-hosts.js';
import pendingMeta, { FocusRetained } from './pending-controller.stories.js';

// ─────────────────────────
//     HELPERS
// ─────────────────────────

/** Waits `ms` milliseconds for async timers to settle. */
function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ─────────────────────────
//     META
// ─────────────────────────

export default {
  ...pendingMeta,
  title: 'Controllers/Pending controller/Tests',
  parameters: {
    ...pendingMeta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

// ──────────────────────────────────────────────────────────────────────────
//     Focus retained through controller-triggered re-render
// ──────────────────────────────────────────────────────────────────────────

/**
 * Verifies that when `pendingActive` becomes `true` (after the controller's 250 ms
 * delay following a mouse-focus-style interaction), Lit's in-place DOM patch does
 * not move focus away from the internal `<button>`.
 *
 * Sequence:
 * 1. Focus the internal button (simulating mouse-click focus).
 * 2. Verify focus is on the button before any pending state.
 * 3. Set `pending = true` — immediately applies `aria-disabled` and `aria-label`.
 * 4. Wait for the controller's 250 ms delay (plus a buffer).
 * 5. Verify `pendingActive` visual is active (spinner present, CSS class applied).
 * 6. Verify focus is still on the same button element after the re-render.
 */
export const FocusRetainedTest: Story = {
  ...FocusRetained,
  play: async ({ canvasElement, step }) => {
    const host =
      canvasElement.querySelector<DemoPendingHost>('demo-pending-host');
    if (!host) {
      throw new Error('demo-pending-host not found');
    }

    const shadowRoot = host.shadowRoot as ShadowRoot;
    const internalButton =
      shadowRoot.querySelector<HTMLButtonElement>('button');
    if (!internalButton) {
      throw new Error('Internal <button> not found');
    }

    await step('button is not pending in initial state', async () => {
      expect(host.pending, 'pending defaults to false').toBe(false);
      expect(
        internalButton.getAttribute('aria-disabled'),
        'aria-disabled is absent in default state'
      ).toBeNull();
    });

    await step(
      'mouse-focus-style interaction: button receives focus',
      async () => {
        // Dispatch pointerdown before focus to mirror the sequence a real
        // mouse click produces (pointer-click focus, not keyboard focus).
        internalButton.dispatchEvent(
          new PointerEvent('pointerdown', { bubbles: true, composed: true })
        );
        internalButton.focus();
        expect(
          shadowRoot.activeElement,
          'internal button is the active element in the shadow root'
        ).toBe(internalButton);
      }
    );

    await step(
      'setting pending=true immediately applies aria attributes; focus is preserved',
      async () => {
        host.pending = true;
        await host.updateComplete;

        expect(
          internalButton.getAttribute('aria-disabled'),
          'aria-disabled is set to true immediately when pending'
        ).toBe('true');
        expect(
          internalButton.getAttribute('aria-label'),
          'aria-label is set to the derived busy name immediately'
        ).toBe('Save, busy');
        expect(
          shadowRoot.activeElement,
          'focus is still on the internal button after the immediate aria update'
        ).toBe(internalButton);
      }
    );

    await step(
      'after the controller delay, pendingActive re-renders the button; focus is preserved',
      async () => {
        // The demo host uses delay=250 ms. Wait 350 ms to include a buffer.
        await wait(350);
        await host.updateComplete;

        const spinner = shadowRoot.querySelector('.swc-PendingSpinner');
        expect(
          spinner,
          'spinner is rendered once pendingActive is true'
        ).toBeTruthy();
        expect(
          internalButton.classList.contains('demo-button--pendingActive'),
          'pendingActive CSS class is applied after the controller delay'
        ).toBe(true);
        expect(
          shadowRoot.activeElement,
          'focus is still on the same button element after the controller-triggered re-render'
        ).toBe(internalButton);
      }
    );

    await step(
      'clearing pending removes the busy visual; focus is preserved',
      async () => {
        host.pending = false;
        await host.updateComplete;
        // Allow the deactivation re-render to settle.
        await wait(50);
        await host.updateComplete;

        expect(
          shadowRoot.querySelector('.swc-PendingSpinner'),
          'spinner is removed after pending clears'
        ).toBeNull();
        expect(
          internalButton.classList.contains('demo-button--pendingActive'),
          'pendingActive class is removed after pending clears'
        ).toBe(false);
        expect(
          shadowRoot.activeElement,
          'focus is still on the button after pending clears'
        ).toBe(internalButton);
      }
    );
  },
};
FocusRetainedTest.storyName = 'Focus retained on re-render (test)';
