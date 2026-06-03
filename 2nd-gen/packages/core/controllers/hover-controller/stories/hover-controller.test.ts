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
 * These Storybook play tests verify user-observable behaviour (open/close state and
 * approximate timing) using real browser timers and pointer/focus event dispatch.
 *
 * ### Coverage gap: multi-document warm-state isolation
 *
 * `getWarmState` keys on `document` (not `window`) so each iframe has independent
 * state. This architectural property has no test coverage here because play tests
 * run in a single document. A standalone Vitest unit test with `vi.useFakeTimers()`
 * and two `Document` instances would be needed to cover it.
 *
 * ### Notes on other apparent gaps
 *
 * - `isWarm` transitions: indirectly proven — `WarmStateAcceleration` would fail if
 *   `isWarm` were never set to `true`, because the second trigger would not open
 *   immediately. Direct assertion is possible via
 *   `document[Symbol.for('swc-hover-state:<key>')]` if ever needed.
 * - Timer ordering: observable-behaviour tests cover the important cases; a timing
 *   race would surface as real-world flakiness before a precise ordering test would
 *   catch it.
 *
 * ### Pointer-click vs keyboard focus contract
 *
 * `HoverController` opens on `focusin` only when no `pointerdown` immediately
 * preceded it (`hadPointerdown` flag). Tests simulate keyboard focus by dispatching
 * `focusin` without a prior `pointerdown`; they simulate pointer-click focus by
 * dispatching `pointerdown` immediately before `focusin`. `userEvent.tab()` is also
 * used for keyboard-focus tests to mirror real Tab navigation in Chromium.
 */

import { html } from 'lit';
import { expect, userEvent, waitFor } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import './demo-hosts.js';

import type { DemoHoverHost, DemoHoverHostB } from './demo-hosts.js';
import hoverMeta, {
  Disabled,
  ImmediateDelay,
  KeyboardFocus,
  Manual,
  MultiTypeIsolation,
  PointerBridge,
  WarmUpAndCooldown,
} from './hover-controller.stories.js';

// ─────────────────────────
//     HELPERS
// ─────────────────────────

/** Dispatches a composed `pointerenter` from the given element. */
function pointerEnter(target: HTMLElement): void {
  target.dispatchEvent(
    new PointerEvent('pointerenter', { bubbles: false, composed: true })
  );
}

/** Dispatches a composed `pointerleave` from the given element. */
function pointerLeave(target: HTMLElement): void {
  target.dispatchEvent(
    new PointerEvent('pointerleave', { bubbles: false, composed: true })
  );
}

/** Waits at least `ms` milliseconds for async timers to settle. */
function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Returns the `demo-hover-host` by its trigger-id attribute within the canvas.
 * Assumes exactly one host per trigger ID in the story.
 */
function getHost(canvas: HTMLElement, triggerId: string): DemoHoverHost {
  const host = canvas.ownerDocument.querySelector<DemoHoverHost>(
    `demo-hover-host[trigger-id="${triggerId}"]`
  );
  if (!host) {
    throw new Error(`demo-hover-host[trigger-id="${triggerId}"] not found`);
  }
  return host;
}

function getHostB(canvas: HTMLElement, triggerId: string): DemoHoverHostB {
  const host = canvas.ownerDocument.querySelector<DemoHoverHostB>(
    `demo-hover-host-b[trigger-id="${triggerId}"]`
  );
  if (!host) {
    throw new Error(`demo-hover-host-b[trigger-id="${triggerId}"] not found`);
  }
  return host;
}

function getTrigger(canvas: HTMLElement, id: string): HTMLButtonElement {
  const trigger =
    canvas.querySelector<HTMLButtonElement>(`#${id}`) ??
    canvas.ownerDocument.querySelector<HTMLButtonElement>(`#${id}`);
  if (!trigger) {
    throw new Error(`Trigger #${id} not found`);
  }
  return trigger;
}

// ─────────────────────────
//     META
// ─────────────────────────

export default {
  ...hoverMeta,
  title: 'Controllers/Hover controller/Tests',
  parameters: {
    ...hoverMeta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

// ──────────────────────────────────────────────────────────────────────────
//     Warm-up: shows after delay elapses
// ──────────────────────────────────────────────────────────────────────────

export const WarmupTimerOpens: Story = {
  ...WarmUpAndCooldown,
  play: async ({ canvasElement, step }) => {
    const trigger = getTrigger(canvasElement, 'warm-trigger-a');
    const host = getHost(canvasElement, 'warm-trigger-a');

    await step('popover is initially closed', async () => {
      expect(host.matches(':popover-open')).toBe(false);
    });

    await step(
      'pointerenter starts warmup; popover stays closed during delay',
      async () => {
        pointerEnter(trigger);
        expect(host.matches(':popover-open')).toBe(false);
      }
    );

    await step('after delay elapses, popover opens', async () => {
      // WarmUpAndCooldown story uses delay="250"; wait for it plus a buffer.
      await wait(350);
      expect(host.matches(':popover-open')).toBe(true);
    });

    pointerLeave(trigger);
    await wait(350);
  },
};

// ──────────────────────────────────────────────────────────────────────────
//     Warm-state acceleration: second pointerenter opens immediately
// ──────────────────────────────────────────────────────────────────────────

export const WarmStateAcceleration: Story = {
  ...WarmUpAndCooldown,
  play: async ({ canvasElement, step }) => {
    const triggerA = getTrigger(canvasElement, 'warm-trigger-a');
    const triggerB = getTrigger(canvasElement, 'warm-trigger-b');
    const hostA = getHost(canvasElement, 'warm-trigger-a');
    const hostB = getHost(canvasElement, 'warm-trigger-b');

    await step(
      'warm up type by hovering trigger A until it opens',
      async () => {
        pointerEnter(triggerA);
        await wait(350);
        expect(hostA.matches(':popover-open')).toBe(true);
      }
    );

    await step(
      'move pointer to trigger B without waiting for cooldown',
      async () => {
        // Leave A, immediately enter B — cooldown for A has NOT fired yet.
        pointerLeave(triggerA);
        pointerEnter(triggerB);
      }
    );

    await step('trigger B opens immediately (still warm)', async () => {
      // No additional wait; warm state is true so showPopover is synchronous.
      expect(hostB.matches(':popover-open')).toBe(true);
    });

    pointerLeave(triggerB);
    await wait(350);
  },
};

// ──────────────────────────────────────────────────────────────────────────
//     Cooldown: warm state resets after delay-ms idle
// ──────────────────────────────────────────────────────────────────────────

export const CooldownResetsWarmState: Story = {
  ...WarmUpAndCooldown,
  play: async ({ canvasElement, step }) => {
    const triggerA = getTrigger(canvasElement, 'warm-trigger-a');
    const triggerB = getTrigger(canvasElement, 'warm-trigger-b');
    const hostA = getHost(canvasElement, 'warm-trigger-a');
    const hostB = getHost(canvasElement, 'warm-trigger-b');

    await step('warm up by hovering trigger A', async () => {
      pointerEnter(triggerA);
      await wait(350);
      expect(hostA.matches(':popover-open')).toBe(true);
    });

    await step('leave trigger A; wait for cooldown to elapse', async () => {
      pointerLeave(triggerA);
      // Cooldown fires after closeDelay (300 ms default); wait well beyond that.
      await wait(400);
      expect(hostA.matches(':popover-open')).toBe(false);
    });

    await step(
      'hover trigger B after cooldown — must re-warm, not open immediately',
      async () => {
        pointerEnter(triggerB);
        // Still closed immediately after enter (warmup restarted from zero).
        expect(hostB.matches(':popover-open')).toBe(false);
        await wait(350);
        // Now open after the new warmup.
        expect(hostB.matches(':popover-open')).toBe(true);
      }
    );

    pointerLeave(triggerB);
    await wait(350);
  },
};

// ──────────────────────────────────────────────────────────────────────────
//     Cooldown cancel: pointerenter during cooldown reopens immediately
// ──────────────────────────────────────────────────────────────────────────

export const CooldownCancelledByReenter: Story = {
  ...WarmUpAndCooldown,
  play: async ({ canvasElement, step }) => {
    const triggerA = getTrigger(canvasElement, 'warm-trigger-a');
    const hostA = getHost(canvasElement, 'warm-trigger-a');

    await step('warm up trigger A', async () => {
      pointerEnter(triggerA);
      await wait(350);
      expect(hostA.matches(':popover-open')).toBe(true);
    });

    await step('leave trigger A — cooldown timer starts', async () => {
      pointerLeave(triggerA);
    });

    await step(
      're-enter trigger before cooldown fires; popover stays or reopens immediately',
      async () => {
        // Re-enter immediately — cooldown should be cancelled.
        pointerEnter(triggerA);
        expect(hostA.matches(':popover-open')).toBe(true);
      }
    );

    pointerLeave(triggerA);
    await wait(350);
  },
};

// ──────────────────────────────────────────────────────────────────────────
//     Focus opens immediately regardless of warm state
// ──────────────────────────────────────────────────────────────────────────

/**
 * `userEvent.tab()` dispatches a real keydown(Tab) event; Chromium sets
 * `:focus-visible` on the resulting focus transition, which passes the
 * controller's guard and opens the popover immediately.
 */
export const FocusOpensImmediately: Story = {
  ...KeyboardFocus,
  play: async ({ canvasElement, step }) => {
    const trigger = getTrigger(canvasElement, 'focus-trigger');
    const host = getHost(canvasElement, 'focus-trigger');

    await step('popover is initially closed', async () => {
      expect(host.matches(':popover-open')).toBe(false);
    });

    await step('keyboard focus opens popover immediately', async () => {
      await userEvent.tab();
      // :focus-visible is set by keyboard navigation; controller opens synchronously.
      await waitFor(
        () => {
          expect(host.matches(':popover-open')).toBe(true);
        },
        { timeout: 300 }
      );
    });

    trigger.blur();
  },
};

// ──────────────────────────────────────────────────────────────────────────
//     Focus-out closes immediately
// ──────────────────────────────────────────────────────────────────────────

export const FocusOutClosesImmediately: Story = {
  ...KeyboardFocus,
  play: async ({ canvasElement, step }) => {
    const trigger = getTrigger(canvasElement, 'focus-trigger');
    const host = getHost(canvasElement, 'focus-trigger');

    await step('open via keyboard focus', async () => {
      await userEvent.tab();
      await waitFor(
        () => {
          expect(host.matches(':popover-open')).toBe(true);
        },
        { timeout: 300 }
      );
    });

    await step(
      'focusout closes popover immediately without waiting for any timer',
      async () => {
        trigger.blur();
        expect(host.matches(':popover-open')).toBe(false);
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────────────────
//     Focus cancels in-flight warmup timer
// ──────────────────────────────────────────────────────────────────────────

/**
 * If the pointer enters the trigger (starting the warmup timer) and the user then
 * keyboard-focuses it before the timer fires, the timer is cancelled and the
 * popover opens immediately.
 */
export const FocusCancelsWarmupTimer: Story = {
  ...KeyboardFocus,
  play: async ({ canvasElement, step }) => {
    const trigger = getTrigger(canvasElement, 'focus-trigger');
    const host = getHost(canvasElement, 'focus-trigger');

    await step(
      'pointerenter starts warmup (delay=1500 ms); popover still closed',
      async () => {
        pointerEnter(trigger);
        expect(host.matches(':popover-open')).toBe(false);
      }
    );

    await step(
      'keyboard focus cancels warmup and opens immediately',
      async () => {
        await userEvent.tab();
        await waitFor(
          () => {
            expect(host.matches(':popover-open')).toBe(true);
          },
          { timeout: 300 }
        );
      }
    );

    trigger.blur();
  },
};
FocusCancelsWarmupTimer.storyName = 'Keyboard focus cancels warmup timer';

// ──────────────────────────────────────────────────────────────────────────
//     Focus priority: pointer leave is a no-op while trigger is focused
// ──────────────────────────────────────────────────────────────────────────

/**
 * While the trigger is in focus-priority mode (`focusin` with `:focus-visible`),
 * `pointerleave` must not start the cooldown timer. The popover stays open until
 * `focusout` fires.
 */
export const FocusPriorityBlocksPointerLeave: Story = {
  ...KeyboardFocus,
  play: async ({ canvasElement, step }) => {
    const trigger = getTrigger(canvasElement, 'focus-trigger');
    const host = getHost(canvasElement, 'focus-trigger');

    await step('keyboard focus opens popover', async () => {
      await userEvent.tab();
      await waitFor(
        () => {
          expect(host.matches(':popover-open')).toBe(true);
        },
        { timeout: 300 }
      );
    });

    await step(
      'pointerleave while focused does not start cooldown; popover stays open',
      async () => {
        pointerLeave(trigger);
        // Wait well beyond a cooldown period to confirm no timer fired.
        await wait(300);
        expect(host.matches(':popover-open')).toBe(true);
      }
    );

    await step('focusout closes the popover', async () => {
      trigger.blur();
      expect(host.matches(':popover-open')).toBe(false);
    });
  },
};
FocusPriorityBlocksPointerLeave.storyName =
  'Focus priority blocks pointer leave';

// ──────────────────────────────────────────────────────────────────────────
//     Pointer-click focus does not open the popover
// ──────────────────────────────────────────────────────────────────────────

/**
 * Simulates pointer-click focus by dispatching `pointerdown` immediately
 * before `focusin`. The controller sees `hadPointerdown = true` when `focusin`
 * arrives and skips the open, preventing the flash caused by `popover="auto"`
 * light-dismissing the popover on the same `pointerdown`.
 */
export const PointerClickFocusDoesNotOpen: Story = {
  ...KeyboardFocus,
  play: async ({ canvasElement, step }) => {
    const trigger = getTrigger(canvasElement, 'focus-trigger');
    const host = getHost(canvasElement, 'focus-trigger');

    await step(
      'pointerdown before focusin is detected as pointer-click; controller skips open',
      async () => {
        // Dispatch pointerdown first (sets hadPointerdown = true in the controller),
        // then focusin — the same sequence a real pointer click produces.
        trigger.dispatchEvent(
          new PointerEvent('pointerdown', {
            bubbles: true,
            composed: true,
          })
        );
        trigger.dispatchEvent(
          new FocusEvent('focusin', { bubbles: true, composed: true })
        );
        expect(host.matches(':popover-open')).toBe(false);
      }
    );

    trigger.blur();
  },
};
PointerClickFocusDoesNotOpen.storyName = 'Pointer-click focus does not open';

// ──────────────────────────────────────────────────────────────────────────
//     WCAG pointer bridge: popover stays open when pointer moves to host
// ──────────────────────────────────────────────────────────────────────────

export const PointerBridgeKeepsOpen: Story = {
  ...PointerBridge,
  play: async ({ canvasElement, step }) => {
    const trigger = getTrigger(canvasElement, 'bridge-trigger');
    const host = getHost(canvasElement, 'bridge-trigger');

    await step('open via hover', async () => {
      pointerEnter(trigger);
      // PointerBridge story uses delay="200".
      await wait(300);
      expect(host.matches(':popover-open')).toBe(true);
    });

    await step('leave trigger — cooldown timer starts', async () => {
      pointerLeave(trigger);
    });

    await step(
      'enter popover host before cooldown fires — cancels cooldown',
      async () => {
        pointerEnter(host);
        // Wait longer than closeDelay (300 ms default) to confirm timer was cancelled.
        await wait(350);
        expect(host.matches(':popover-open')).toBe(true);
      }
    );

    pointerLeave(host);
    await wait(300);
  },
};

// ──────────────────────────────────────────────────────────────────────────
//     Disabled guard: pointer events do not open the popover
// ──────────────────────────────────────────────────────────────────────────

export const DisabledGuard: Story = {
  ...Disabled,
  play: async ({ canvasElement, step }) => {
    const trigger = getTrigger(canvasElement, 'disabled-trigger');
    const host = getHost(canvasElement, 'disabled-trigger');

    await step('pointerenter has no effect when host is disabled', async () => {
      pointerEnter(trigger);
      await wait(150);
      expect(host.matches(':popover-open')).toBe(false);
    });
  },
};

// ──────────────────────────────────────────────────────────────────────────
//     Manual guard: pointer events do not open the popover
// ──────────────────────────────────────────────────────────────────────────

export const ManualGuard: Story = {
  ...Manual,
  play: async ({ canvasElement, step }) => {
    const trigger = getTrigger(canvasElement, 'manual-trigger');
    const host = getHost(canvasElement, 'manual-trigger');

    await step(
      'pointerenter has no effect when host is in manual mode',
      async () => {
        pointerEnter(trigger);
        await wait(150);
        expect(host.matches(':popover-open')).toBe(false);
      }
    );

    await step('showPopover() still works programmatically', async () => {
      host.showPopover();
      expect(host.matches(':popover-open')).toBe(true);
      host.hidePopover();
    });
  },
};

// ──────────────────────────────────────────────────────────────────────────
//     Guard re-evaluation: disabling mid-session stops future events
// ──────────────────────────────────────────────────────────────────────────

export const GuardReEvaluation: Story = {
  render: () => html`
    <div style="padding: 8px 0 48px;">
      <button
        id="guard-eval-trigger"
        style="font: inherit; padding: 8px 16px; border-radius: 4px; border: 1px solid currentColor; background: transparent; cursor: pointer;"
      >
        Hover me
      </button>
    </div>
    <demo-hover-host
      id="guard-eval-host"
      trigger-id="guard-eval-trigger"
      delay="100"
    >
      Popover
    </demo-hover-host>
  `,
  play: async ({ canvasElement, step }) => {
    const trigger = getTrigger(canvasElement, 'guard-eval-trigger');
    const host =
      canvasElement.ownerDocument.querySelector<DemoHoverHost>(
        '#guard-eval-host'
      )!;

    await step('hover opens popover normally', async () => {
      pointerEnter(trigger);
      await wait(150);
      expect(host.matches(':popover-open')).toBe(true);
    });

    await step(
      'disabled=true while popover is open closes it immediately',
      async () => {
        host.disabled = true;
        await host.updateComplete;
        // hostUpdated() detects the guard activated and calls callHidePopover().
        expect(host.matches(':popover-open')).toBe(false);
      }
    );

    await step('hover has no effect while disabled', async () => {
      pointerEnter(trigger);
      await wait(150);
      expect(host.matches(':popover-open')).toBe(false);
    });

    await step('set disabled=false; hover opens again', async () => {
      host.disabled = false;
      await host.updateComplete;
      pointerEnter(trigger);
      await wait(150);
      expect(host.matches(':popover-open')).toBe(true);
      pointerLeave(trigger);
      await wait(400);
    });
  },
};

// ──────────────────────────────────────────────────────────────────────────
//     setTarget(null): detaches listeners from previous trigger
// ──────────────────────────────────────────────────────────────────────────

export const SetTargetNull: Story = {
  render: () => html`
    <div style="padding: 8px 0 48px;">
      <button
        id="null-target-trigger"
        style="font: inherit; padding: 8px 16px; border-radius: 4px; border: 1px solid currentColor; background: transparent; cursor: pointer;"
      >
        Hover me
      </button>
    </div>
    <demo-hover-host
      id="null-target-host"
      trigger-id="null-target-trigger"
      delay="100"
    >
      Popover
    </demo-hover-host>
    <button
      id="clear-target-btn"
      style="margin-top: 12px; font: inherit; padding: 6px 12px; border-radius: 4px; border: 1px solid currentColor; background: transparent; cursor: pointer;"
    >
      Clear trigger-id
    </button>
  `,
  play: async ({ canvasElement, step }) => {
    const trigger = getTrigger(canvasElement, 'null-target-trigger');
    const host =
      canvasElement.ownerDocument.querySelector<DemoHoverHost>(
        '#null-target-host'
      )!;
    const clearBtn =
      canvasElement.ownerDocument.querySelector<HTMLButtonElement>(
        '#clear-target-btn'
      )!;

    await step('hover opens normally', async () => {
      pointerEnter(trigger);
      await wait(150);
      expect(host.matches(':popover-open')).toBe(true);
      pointerLeave(trigger);
      // Wait for closeDelay (300 ms) to elapse so the popover is closed
      // before the next step detaches the trigger.
      await wait(400);
    });

    await step(
      'clear trigger-id; setTarget(null) detaches listeners',
      async () => {
        clearBtn.addEventListener(
          'click',
          () => {
            host.triggerId = '';
          },
          { once: true }
        );
        clearBtn.click();
        await host.updateComplete;

        pointerEnter(trigger);
        await wait(150);
        expect(host.matches(':popover-open')).toBe(false);
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────────────────
//     delay=0: opens synchronously on pointerenter
// ──────────────────────────────────────────────────────────────────────────

export const DelayZeroOpensSync: Story = {
  ...ImmediateDelay,
  play: async ({ canvasElement, step }) => {
    const trigger = getTrigger(canvasElement, 'immediate-trigger');
    const host = getHost(canvasElement, 'immediate-trigger');

    await step('pointerenter opens immediately when delay=0', async () => {
      pointerEnter(trigger);
      expect(host.matches(':popover-open')).toBe(true);
    });

    await step(
      'pointerleave starts closeDelay cooldown (default 300 ms)',
      async () => {
        pointerLeave(trigger);
        // closeDelay (300 ms default) is independent of delay=0; wait for it.
        await wait(400);
        expect(host.matches(':popover-open')).toBe(false);
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────────────────
//     Multi-type isolation: different warmStateKey values are independent
// ──────────────────────────────────────────────────────────────────────────

export const WarmStateTypeIsolation: Story = {
  ...MultiTypeIsolation,
  play: async ({ canvasElement, step }) => {
    const triggerA = getTrigger(canvasElement, 'isolation-trigger-a');
    const triggerB = getTrigger(canvasElement, 'isolation-trigger-b');
    const hostA = getHost(canvasElement, 'isolation-trigger-a');
    const hostB = getHostB(canvasElement, 'isolation-trigger-b');

    await step('warm up type A by hovering trigger A', async () => {
      pointerEnter(triggerA);
      // MultiTypeIsolation story uses delay="250".
      await wait(350);
      expect(hostA.matches(':popover-open')).toBe(true);
      pointerLeave(triggerA);
    });

    await step(
      'hover trigger B immediately after — type B is cold, must wait full delay',
      async () => {
        pointerEnter(triggerB);
        // Immediately after enter, should still be closed (not warmed by type A).
        expect(hostB.matches(':popover-open')).toBe(false);
        await wait(350);
        expect(hostB.matches(':popover-open')).toBe(true);
      }
    );

    pointerLeave(triggerB);
    await wait(350);
  },
};
