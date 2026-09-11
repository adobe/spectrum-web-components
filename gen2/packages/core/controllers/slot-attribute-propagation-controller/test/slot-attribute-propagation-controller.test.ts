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
 * These Storybook play tests exercise `SlotAttributePropagationController` in
 * isolation via the demo hosts in `../stories/demo-hosts.ts`, covering
 * behavior that the two real consumers (`ButtonGroupBase`,
 * `IllustratedMessageBase`) don't individually exercise: the `previousValue`
 * no-op guard, the `hostDisconnected()` reset, and the `selector` option.
 *
 * The guard and disconnect/reconnect tests can't use a mock/spy (this
 * codebase doesn't use `vi.spyOn` for these Storybook-driven tests; see
 * other controller test files). Instead they mutate a slotted child's
 * attribute out-of-band, force another update cycle with
 * `host.requestUpdate()` (which reliably re-runs `hostUpdate()` /
 * `hostUpdated()` on all controllers regardless of whether a reactive
 * property changed), and observe whether the controller overwrote the
 * manual value.
 */

import { html } from 'lit';
import { expect } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import '../stories/demo-hosts.js';

import { getComponent } from '../../../../swc/utils/test-utils.js';
import type {
  DemoSlotPropagationDefault,
  DemoSlotPropagationNamed,
  DemoSlotPropagationOptional,
  DemoSlotPropagationSelector,
} from '../stories/demo-hosts.js';
import meta from '../stories/slot-attribute-propagation-controller.stories.js';

export default {
  ...meta,
  title: 'Controllers/Slot attribute propagation controller/Tests',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

/** Resolves the default (unnamed) slot in a demo host's shadow DOM. */
function resolveDefaultSlot(host: Element): HTMLSlotElement | null {
  const slot =
    host.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');
  expect(slot, 'default slot must exist in shadow DOM').not.toBeNull();
  return slot ?? null;
}

// ──────────────────────────────────────────────────────────────────────────
//     Propagates on first render, targeting the default slot when slotName
//     is omitted
// ──────────────────────────────────────────────────────────────────────────

export const InitialRenderPropagation: Story = {
  render: () => html`
    <demo-slot-propagation-default size="l">
      <button class="swc-Button">Save</button>
      <button class="swc-Button">Cancel</button>
    </demo-slot-propagation-default>
  `,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<DemoSlotPropagationDefault>(
      canvasElement,
      'demo-slot-propagation-default'
    );

    await step(
      'every element assigned to the default slot receives the attribute on first render, since slotName is omitted',
      async () => {
        const buttons = host.querySelectorAll('button');
        expect(buttons.length, 'button count').toBe(2);
        for (const button of buttons) {
          expect(
            button.getAttribute('size'),
            'button receives initial size'
          ).toBe('l');
        }
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────────────────
//     Re-propagates in hostUpdated() when the value changes
// ──────────────────────────────────────────────────────────────────────────

export const PropagatesOnValueChange: Story = {
  render: () => html`
    <demo-slot-propagation-default size="m">
      <button class="swc-Button">Save</button>
    </demo-slot-propagation-default>
  `,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<DemoSlotPropagationDefault>(
      canvasElement,
      'demo-slot-propagation-default'
    );
    const button = host.querySelector('button')!;

    await step('initial value is propagated', async () => {
      expect(button.getAttribute('size'), 'initial size').toBe('m');
    });

    await step('changing the tracked value re-propagates', async () => {
      host.size = 'l';
      await host.updateComplete;
      expect(button.getAttribute('size'), 'size after change').toBe('l');
    });
  },
};
PropagatesOnValueChange.storyName = 'Re-propagates when the value changes';

// ──────────────────────────────────────────────────────────────────────────
//     Does not re-propagate when the value is unchanged (previousValue guard)
// ──────────────────────────────────────────────────────────────────────────

export const NoPropagationWhenUnchanged: Story = {
  render: () => html`
    <demo-slot-propagation-default size="m">
      <button class="swc-Button">Save</button>
    </demo-slot-propagation-default>
  `,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<DemoSlotPropagationDefault>(
      canvasElement,
      'demo-slot-propagation-default'
    );
    const button = host.querySelector('button')!;

    await step('initial value is propagated', async () => {
      expect(button.getAttribute('size'), 'initial size').toBe('m');
    });

    await step(
      'an update cycle with an unchanged value does not re-propagate',
      async () => {
        // Mutate the attribute out-of-band, bypassing the controller, then
        // force another update cycle without changing `size`. If the guard
        // were absent, hostUpdated() would call _propagateToSlot('m') again
        // and stomp this value back to 'm'.
        button.setAttribute('size', 'manually-set');
        host.requestUpdate();
        await host.updateComplete;

        expect(
          button.getAttribute('size'),
          'manual value survives an unrelated update cycle'
        ).toBe('manually-set');
      }
    );
  },
};
NoPropagationWhenUnchanged.storyName =
  'Does not re-propagate when the value is unchanged';

// ──────────────────────────────────────────────────────────────────────────
//     propagate() covers elements added after the first render (slotchange)
// ──────────────────────────────────────────────────────────────────────────

export const PropagatesViaSlotchange: Story = {
  render: () => html`
    <demo-slot-propagation-default size="s">
      <button class="swc-Button">Existing</button>
    </demo-slot-propagation-default>
  `,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<DemoSlotPropagationDefault>(
      canvasElement,
      'demo-slot-propagation-default'
    );

    await step(
      'a dynamically added element receives the current value via propagate()',
      async () => {
        const slot = resolveDefaultSlot(host);
        if (!slot) {
          return;
        }

        const slotChanged = new Promise<void>((resolve) =>
          slot.addEventListener('slotchange', () => resolve(), {
            once: true,
          })
        );

        const button = document.createElement('button');
        button.className = 'swc-Button';
        button.textContent = 'New';
        host.appendChild(button);

        await slotChanged;

        expect(
          button.getAttribute('size'),
          'dynamically added element receives current size'
        ).toBe('s');
      }
    );
  },
};
PropagatesViaSlotchange.storyName =
  'Propagates to elements added after first render';

// ──────────────────────────────────────────────────────────────────────────
//     propagate() updates the previousValue guard, so a hostUpdated() that
//     was already scheduled before propagate() ran doesn't repeat the sweep
// ──────────────────────────────────────────────────────────────────────────

export const PropagateUpdatesPreviousValueGuard: Story = {
  render: () => html`
    <demo-slot-propagation-default size="m">
      <button class="swc-Button">Save</button>
    </demo-slot-propagation-default>
  `,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<DemoSlotPropagationDefault>(
      canvasElement,
      'demo-slot-propagation-default'
    );
    const button = host.querySelector('button')!;
    const slot = resolveDefaultSlot(host);
    if (!slot) {
      return;
    }

    await step('initial value is propagated', async () => {
      expect(button.getAttribute('size'), 'initial size').toBe('m');
    });

    await step(
      'does not repeat propagation once a value has already been applied by propagate()',
      async () => {
        // Change the tracked property (schedules a hostUpdated() call for
        // 'l' without awaiting it yet), then synchronously dispatch
        // 'slotchange' so propagate() applies 'l' before that scheduled
        // hostUpdated() runs. This ordering is forced here (native
        // slotchange timing relative to Lit's update cycle isn't
        // guaranteed) specifically to prove hostUpdated() treats the
        // already-applied value as a no-op instead of repeating it.
        host.size = 'l';
        slot.dispatchEvent(new Event('slotchange'));

        expect(
          button.getAttribute('size'),
          'propagate() applies the new value immediately'
        ).toBe('l');

        // Mutate out-of-band after propagate() ran. If the still-pending
        // hostUpdated() redundantly repeats the sweep for the same value,
        // it will stomp this back to 'l'.
        button.setAttribute('size', 'manually-set');

        await host.updateComplete;

        expect(
          button.getAttribute('size'),
          'hostUpdated() does not repeat propagation for a value already applied by propagate()'
        ).toBe('manually-set');
      }
    );
  },
};
PropagateUpdatesPreviousValueGuard.storyName =
  'propagate() updates the previousValue guard';

// ──────────────────────────────────────────────────────────────────────────
//     hostDisconnected() resets previousValue so reconnect re-propagates
// ──────────────────────────────────────────────────────────────────────────

export const ResetsOnDisconnectReconnect: Story = {
  render: () => html`
    <demo-slot-propagation-default size="m">
      <button class="swc-Button">Save</button>
    </demo-slot-propagation-default>
  `,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<DemoSlotPropagationDefault>(
      canvasElement,
      'demo-slot-propagation-default'
    );
    const button = host.querySelector('button')!;
    const parent = host.parentElement!;

    await step('initial value is propagated', async () => {
      expect(button.getAttribute('size'), 'initial size').toBe('m');
    });

    await step(
      'disconnect, mutate the child out-of-band, then reconnect',
      async () => {
        host.remove();
        button.setAttribute('size', 'stale');
        parent.appendChild(host);

        // Reconnecting alone does not schedule a new Lit update cycle;
        // force one so hostUpdated() runs again with the same `size` value.
        host.requestUpdate();
        await host.updateComplete;
      }
    );

    await step(
      'the value is re-propagated even though it did not change, because hostDisconnected() reset previousValue',
      async () => {
        expect(
          button.getAttribute('size'),
          'value is re-propagated after reconnect'
        ).toBe('m');
      }
    );
  },
};
ResetsOnDisconnectReconnect.storyName =
  'Resets previousValue on disconnect so reconnect re-propagates';

// ──────────────────────────────────────────────────────────────────────────
//     slotName targets only the named slot
// ──────────────────────────────────────────────────────────────────────────

export const NamedSlotTargeting: Story = {
  render: () => html`
    <demo-slot-propagation-named size="l">
      <p>Default-slot content</p>
      <button slot="actions" class="swc-Button">Browse files</button>
    </demo-slot-propagation-named>
  `,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<DemoSlotPropagationNamed>(
      canvasElement,
      'demo-slot-propagation-named'
    );

    await step(
      'element assigned to the named slot receives the attribute',
      async () => {
        const actionButton = host.querySelector('[slot="actions"]')!;
        expect(
          actionButton.getAttribute('size'),
          'actions-slot element receives size'
        ).toBe('l');
      }
    );

    await step(
      'element assigned to the default slot is left untouched',
      async () => {
        const paragraph = host.querySelector('p')!;
        expect(
          paragraph.getAttribute('size'),
          'default-slot element does not receive size'
        ).toBeNull();
      }
    );
  },
};
NamedSlotTargeting.storyName = 'slotName targets only the named slot';

// ──────────────────────────────────────────────────────────────────────────
//     selector filters assigned elements
// ──────────────────────────────────────────────────────────────────────────

export const SelectorFiltersAssignedElements: Story = {
  render: () => html`
    <demo-slot-propagation-selector variant="accent">
      <button class="swc-Button target">Matches .target</button>
      <button class="swc-Button">Does not match</button>
    </demo-slot-propagation-selector>
  `,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<DemoSlotPropagationSelector>(
      canvasElement,
      'demo-slot-propagation-selector'
    );

    await step(
      'only the element matching the selector receives the attribute',
      async () => {
        const matching = host.querySelector('.target')!;
        expect(
          matching.getAttribute('variant'),
          'matching element receives the attribute'
        ).toBe('accent');
      }
    );

    await step(
      'the element that does not match the selector is left untouched',
      async () => {
        const nonMatching = host.querySelector('button:not(.target)')!;
        expect(
          nonMatching.getAttribute('variant'),
          'non-matching element does not receive the attribute'
        ).toBeNull();
      }
    );
  },
};
SelectorFiltersAssignedElements.storyName =
  'selector filters which assigned elements receive the attribute';

// ──────────────────────────────────────────────────────────────────────────
//     getValue returning null removes the attribute instead of setting it
// ──────────────────────────────────────────────────────────────────────────

export const NullValueRemovesAttribute: Story = {
  render: () => html`
    <demo-slot-propagation-optional>
      <input class="swc-Textfield" />
    </demo-slot-propagation-optional>
  `,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<DemoSlotPropagationOptional>(
      canvasElement,
      'demo-slot-propagation-optional'
    );
    const input = host.querySelector('input')!;

    await step(
      'omits the attribute on first render when getValue returns null',
      async () => {
        expect(
          input.getAttribute('invalid'),
          'attribute is absent when getValue() returns null'
        ).toBeNull();
      }
    );

    await step(
      'sets the attribute once getValue starts returning a string',
      async () => {
        host.invalid = true;
        await host.updateComplete;
        expect(
          input.getAttribute('invalid'),
          'attribute is set once getValue() returns a string'
        ).toBe('');
      }
    );

    await step(
      'removes the attribute again once getValue returns null',
      async () => {
        host.invalid = false;
        await host.updateComplete;
        expect(
          input.getAttribute('invalid'),
          'attribute is removed once getValue() returns null again'
        ).toBeNull();
      }
    );
  },
};
NullValueRemovesAttribute.storyName =
  'getValue returning null removes the attribute';
