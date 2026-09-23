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

import type { ReactiveElement } from 'lit';
import { html } from 'lit';
import { expect } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import { TriggerPressController } from '../index.js';

export default {
  title: 'Controllers/Trigger press controller/Tests',
  tags: ['!autodocs', 'dev'],
  render: () => html`
    <div></div>
  `,
} as Meta;

// A minimal host: the controller only calls `addController` in its
// constructor and otherwise drives the trigger through its own methods.
function makeHost(): ReactiveElement {
  return { addController: () => undefined } as unknown as ReactiveElement;
}

function makeTrigger(canvasElement: HTMLElement): HTMLButtonElement {
  const trigger = document.createElement('button');
  canvasElement.appendChild(trigger);
  return trigger;
}

// A normal click with no press-correlated dismissal: pointerdown, pointerup
// on the same target, then click — the sequence a real click produces.
function click(trigger: HTMLElement): void {
  trigger.dispatchEvent(
    new PointerEvent('pointerdown', { bubbles: true, composed: true })
  );
  trigger.dispatchEvent(
    new PointerEvent('pointerup', { bubbles: true, composed: true })
  );
  trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }));
}

export const BasicToggleTest: Story = {
  play: async ({ canvasElement, step }) => {
    const trigger = makeTrigger(canvasElement);
    const controller = new TriggerPressController(makeHost());
    let toggleCount = 0;
    controller.attach(trigger, { onToggle: () => toggleCount++ });

    await step('a normal click calls onToggle', () => {
      click(trigger);
      expect(toggleCount, 'onToggle called once').toBe(1);
    });

    await step('a second normal click calls onToggle again', () => {
      click(trigger);
      expect(toggleCount, 'onToggle called twice').toBe(2);
    });

    controller.detach();
    trigger.remove();
  },
};

export const ReopenGuardTest: Story = {
  play: async ({ canvasElement, step }) => {
    const trigger = makeTrigger(canvasElement);
    const controller = new TriggerPressController(makeHost());
    let toggleCount = 0;
    controller.attach(trigger, { onToggle: () => toggleCount++ });

    await step(
      'a dismissal noted during a press is consumed by the trailing click',
      () => {
        trigger.dispatchEvent(
          new PointerEvent('pointerdown', { bubbles: true, composed: true })
        );
        // Simulates the surface's native-close reaction observing a
        // dismissal while this press is in flight (e.g. the light-dismiss
        // fired by this same press).
        controller.noteNativeDismiss();
        trigger.dispatchEvent(
          new PointerEvent('pointerup', { bubbles: true, composed: true })
        );
        trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        expect(
          toggleCount,
          'onToggle is not called for the click that closed the surface'
        ).toBe(0);
      }
    );

    await step('the next normal click toggles again', () => {
      click(trigger);
      expect(toggleCount, 'the guard does not persist past one gesture').toBe(
        1
      );
    });

    controller.detach();
    trigger.remove();
  },
};

export const NoteNativeDismissWithoutPressTest: Story = {
  play: async ({ canvasElement, step }) => {
    const trigger = makeTrigger(canvasElement);
    const controller = new TriggerPressController(makeHost());
    let toggleCount = 0;
    controller.attach(trigger, { onToggle: () => toggleCount++ });

    await step('noteNativeDismiss without an active press is a no-op', () => {
      controller.noteNativeDismiss();
      click(trigger);
      expect(
        toggleCount,
        'onToggle still fires; nothing was in flight to attribute the dismissal to'
      ).toBe(1);
    });

    controller.detach();
    trigger.remove();
  },
};

export const TouchstartOpensGestureWindowTest: Story = {
  play: async ({ canvasElement, step }) => {
    const trigger = makeTrigger(canvasElement);
    const controller = new TriggerPressController(makeHost());
    let toggleCount = 0;
    controller.attach(trigger, { onToggle: () => toggleCount++ });

    await step(
      'touchstart opens the same gesture window as pointerdown',
      () => {
        trigger.dispatchEvent(
          new Event('touchstart', { bubbles: true, composed: true })
        );
        controller.noteNativeDismiss();
        trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        expect(
          toggleCount,
          'onToggle is not called for the click that closed the surface'
        ).toBe(0);
      }
    );

    controller.detach();
    trigger.remove();
  },
};

// A touch gesture fires both `touchstart` and `pointerdown` on the trigger
// for the same physical press, so `onPressStart` runs twice before the
// trailing click. Regression coverage for the second `onPressStart` call
// aborting the first call's still-pending `pressEndAbort` controller before
// creating its own (rather than leaving that controller's document listeners
// attached past this gesture, tied to a signal `pressEndAbort` no longer
// references).
export const DoublePressStartTest: Story = {
  play: async ({ canvasElement, step }) => {
    const trigger = makeTrigger(canvasElement);
    const controller = new TriggerPressController(makeHost());
    let toggleCount = 0;
    controller.attach(trigger, { onToggle: () => toggleCount++ });

    await step(
      'a dismissal noted during a touchstart+pointerdown press is still consumed by the trailing click',
      () => {
        trigger.dispatchEvent(
          new Event('touchstart', { bubbles: true, composed: true })
        );
        trigger.dispatchEvent(
          new PointerEvent('pointerdown', { bubbles: true, composed: true })
        );
        controller.noteNativeDismiss();
        trigger.dispatchEvent(
          new PointerEvent('pointerup', { bubbles: true, composed: true })
        );
        trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        expect(
          toggleCount,
          'onToggle is not called for the click that closed the surface'
        ).toBe(0);
      }
    );

    await step('a normal gesture right after still toggles normally', () => {
      click(trigger);
      expect(
        toggleCount,
        'the double press-start does not affect the next, unrelated gesture'
      ).toBe(1);
    });

    controller.detach();
    trigger.remove();
  },
};

export const PressEndWithoutClickResetsTest: Story = {
  play: async ({ canvasElement, step }) => {
    const trigger = makeTrigger(canvasElement);
    const other = document.createElement('div');
    canvasElement.appendChild(other);
    const controller = new TriggerPressController(makeHost());
    let toggleCount = 0;
    controller.attach(trigger, { onToggle: () => toggleCount++ });

    await step(
      'a pointerup off the trigger (drag away) resets the gesture window',
      () => {
        trigger.dispatchEvent(
          new PointerEvent('pointerdown', { bubbles: true, composed: true })
        );
        // Ends on a different element, so no click ever follows.
        other.dispatchEvent(
          new PointerEvent('pointerup', { bubbles: true, composed: true })
        );

        // A later, unrelated dismissal must not be attributed to this dead
        // gesture.
        controller.noteNativeDismiss();
        click(trigger);
        expect(
          toggleCount,
          'onToggle fires normally once the gesture window has closed'
        ).toBe(1);
      }
    );

    controller.detach();
    trigger.remove();
    other.remove();
  },
};

export const DismissDuringCancelledPressDoesNotLeakTest: Story = {
  play: async ({ canvasElement, step }) => {
    const trigger = makeTrigger(canvasElement);
    const controller = new TriggerPressController(makeHost());
    let toggleCount = 0;
    controller.attach(trigger, { onToggle: () => toggleCount++ });

    await step(
      'a dismissal noted during a press that is cancelled (no click) does not leak into the next click',
      () => {
        trigger.dispatchEvent(
          new PointerEvent('pointerdown', { bubbles: true, composed: true })
        );
        // A native dismissal lands while this press is still active...
        controller.noteNativeDismiss();
        // ...but the gesture is cancelled instead of producing a click (e.g.
        // the platform reinterpreted it as a scroll).
        trigger.dispatchEvent(
          new PointerEvent('pointercancel', { bubbles: true, composed: true })
        );

        // A later, unrelated click must not be swallowed by the dismissal
        // attributed to the dead gesture above.
        click(trigger);
        expect(
          toggleCount,
          'a fresh click after the cancelled gesture still toggles'
        ).toBe(1);
      }
    );

    controller.detach();
    trigger.remove();
  },
};

export const AttachUpdatesCallbackTest: Story = {
  play: async ({ canvasElement, step }) => {
    const trigger = makeTrigger(canvasElement);
    const controller = new TriggerPressController(makeHost());
    let firstCalled = 0;
    let secondCalled = 0;
    controller.attach(trigger, { onToggle: () => firstCalled++ });

    await step(
      're-attaching the same element updates the callback without duplicating listeners',
      () => {
        controller.attach(trigger, { onToggle: () => secondCalled++ });
        click(trigger);
        expect(firstCalled, 'the stale callback is not invoked').toBe(0);
        expect(
          secondCalled,
          'the latest callback is invoked exactly once'
        ).toBe(1);
      }
    );

    controller.detach();
    trigger.remove();
  },
};

export const DetachRemovesListenersTest: Story = {
  play: async ({ canvasElement, step }) => {
    const trigger = makeTrigger(canvasElement);
    const controller = new TriggerPressController(makeHost());
    let toggleCount = 0;
    controller.attach(trigger, { onToggle: () => toggleCount++ });

    await step('detach stops the trigger from toggling on click', () => {
      controller.detach();
      click(trigger);
      expect(toggleCount, 'no listener remains after detach').toBe(0);
    });

    trigger.remove();
  },
};

export const HostDisconnectedDetachesTest: Story = {
  play: async ({ canvasElement, step }) => {
    const trigger = makeTrigger(canvasElement);
    const controller = new TriggerPressController(makeHost());
    let toggleCount = 0;
    controller.attach(trigger, { onToggle: () => toggleCount++ });

    await step('hostDisconnected detaches the current trigger', () => {
      controller.hostDisconnected();
      click(trigger);
      expect(toggleCount, 'no listener remains after disconnect').toBe(0);
    });

    trigger.remove();
  },
};
