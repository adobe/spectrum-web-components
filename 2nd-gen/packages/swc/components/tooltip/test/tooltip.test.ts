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
import { expect, userEvent } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import { Tooltip } from '@adobe/spectrum-wc/tooltip';

import '@adobe/spectrum-wc/components/button/swc-button.js';
import '@adobe/spectrum-wc/components/tooltip/swc-tooltip.js';

import {
  TOOLTIP_PLACEMENTS,
  TOOLTIP_VARIANTS,
} from '../../../../core/components/tooltip/Tooltip.types.js';
import {
  getComponent,
  getComponents,
  withWarningSpy,
} from '../../../utils/test-utils.js';
import meta, {
  Overview,
  Placements,
  Variants,
} from '../stories/tooltip.stories.js';

// This file defines dev-only test stories that reuse the main story metadata.
export default {
  ...meta,
  title: 'Tooltip/Tests',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

// Type alias for elements with ariaDescribedByElements (available in Chrome 135+, Firefox 136+, Safari 16.4+).
type AriaRelatable = Element & { ariaDescribedByElements: Element[] | null };

// Awaits a DOM event dispatched on the given element, resolving with the event object.
const waitForEvent = <T extends Event>(
  el: EventTarget,
  eventName: string
): Promise<T> =>
  new Promise<T>((resolve) => {
    el.addEventListener(eventName, (event) => resolve(event as T), {
      once: true,
    });
  });

// ──────────────────────────────────────────────────────────────
// TEST: Defaults
// ──────────────────────────────────────────────────────────────

export const OverviewTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const tooltip = await getComponent<Tooltip>(canvasElement, 'swc-tooltip');

    await step('renders expected default property values', async () => {
      expect(tooltip.variant, 'default variant is neutral').toBe('neutral');
      expect(tooltip.placement, 'default placement is top').toBe('top');
      expect(tooltip.open, 'default open is false').toBe(false);
      expect(tooltip.manual, 'default manual is false').toBe(false);
      expect(tooltip.delay, 'default delay is 1500').toBe(1500);
    });

    await step('sets role="tooltip" on the host element', async () => {
      expect(tooltip.getAttribute('role'), 'host has role="tooltip"').toBe(
        'tooltip'
      );
    });

    await step('sets popover="auto" on the host element', async () => {
      expect(tooltip.getAttribute('popover'), 'host has popover="auto"').toBe(
        'auto'
      );
    });

    await step('renders text content in default slot', async () => {
      expect(
        tooltip.textContent?.trim(),
        'default slot has text content'
      ).toBeTruthy();
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Properties / Attributes
// ──────────────────────────────────────────────────────────────

export const PropertyMutationTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const tooltip = await getComponent<Tooltip>(canvasElement, 'swc-tooltip');

    await step('variant reflects to attribute after mutation', async () => {
      tooltip.variant = 'informative';
      await tooltip.updateComplete;
      expect(
        tooltip.getAttribute('variant'),
        'variant attribute is informative after mutation'
      ).toBe('informative');

      tooltip.variant = 'negative';
      await tooltip.updateComplete;
      expect(
        tooltip.getAttribute('variant'),
        'variant attribute is negative after second mutation'
      ).toBe('negative');

      tooltip.variant = 'neutral';
      await tooltip.updateComplete;
      expect(
        tooltip.getAttribute('variant'),
        'variant attribute is neutral after third mutation'
      ).toBe('neutral');
    });

    await step('placement reflects to attribute after mutation', async () => {
      tooltip.placement = 'bottom';
      await tooltip.updateComplete;
      expect(
        tooltip.getAttribute('placement'),
        'placement attribute is bottom after mutation'
      ).toBe('bottom');

      tooltip.placement = 'start';
      await tooltip.updateComplete;
      expect(
        tooltip.getAttribute('placement'),
        'placement attribute is start after mutation'
      ).toBe('start');
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Open / close state
// ──────────────────────────────────────────────────────────────

export const OpenCloseTest: Story = {
  render: () => html`
    <swc-button id="tt-open-close-trigger">Toggle</swc-button>
    <swc-tooltip for="tt-open-close-trigger" placement="top">
      Tooltip text
    </swc-tooltip>
  `,
  play: async ({ canvasElement, step }) => {
    const tooltip = await getComponent<Tooltip>(canvasElement, 'swc-tooltip');

    await step('open=true reflects [open] attribute on host', async () => {
      tooltip.open = true;
      await tooltip.updateComplete;
      expect(
        tooltip.hasAttribute('open'),
        'open attribute is present when open=true'
      ).toBe(true);
    });

    await step('open=false removes [open] attribute from host', async () => {
      tooltip.open = false;
      await tooltip.updateComplete;
      expect(
        tooltip.hasAttribute('open'),
        'open attribute is absent when open=false'
      ).toBe(false);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Lifecycle events
// ──────────────────────────────────────────────────────────────

export const LifecycleEventsTest: Story = {
  render: () => html`
    <swc-button id="tt-events-trigger">Open</swc-button>
    <swc-tooltip for="tt-events-trigger" placement="top">
      Tooltip content
    </swc-tooltip>
  `,
  play: async ({ canvasElement, step }) => {
    const tooltip = await getComponent<Tooltip>(canvasElement, 'swc-tooltip');

    await step('swc-open fires when tooltip is opened', async () => {
      const openPromise = waitForEvent(tooltip, 'swc-open');
      tooltip.open = true;
      await openPromise;
      tooltip.open = false;
      await tooltip.updateComplete;
    });

    await step('swc-close fires when tooltip is closed', async () => {
      tooltip.open = true;
      await tooltip.updateComplete;

      const closePromise = waitForEvent(tooltip, 'swc-close');
      tooltip.open = false;
      await closePromise;
    });

    await step('swc-after-open fires after tooltip fully opens', async () => {
      const afterOpenPromise = waitForEvent(tooltip, 'swc-after-open');
      tooltip.open = true;
      await afterOpenPromise;
      tooltip.open = false;
      await tooltip.updateComplete;
    });

    await step('swc-after-close fires after tooltip fully closes', async () => {
      tooltip.open = true;
      await tooltip.updateComplete;

      const afterClosePromise = waitForEvent(tooltip, 'swc-after-close');
      tooltip.open = false;
      await afterClosePromise;
    });

    await step('events bubble and are composed', async () => {
      let bubbled = false;
      const handler = () => {
        bubbled = true;
      };
      canvasElement.addEventListener('swc-open', handler, { once: true });
      tooltip.open = true;
      await waitForEvent(tooltip, 'swc-open');
      expect(bubbled, 'swc-open bubbled to canvas').toBe(true);
      canvasElement.removeEventListener('swc-open', handler);
      tooltip.open = false;
      await tooltip.updateComplete;
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Escape closes tooltip
// ──────────────────────────────────────────────────────────────

export const EscapeClosesTest: Story = {
  render: () => html`
    <swc-button id="tt-escape-trigger">Open</swc-button>
    <swc-tooltip for="tt-escape-trigger" placement="top">
      Press Escape to close
    </swc-tooltip>
  `,
  play: async ({ canvasElement, step }) => {
    const tooltip = await getComponent<Tooltip>(canvasElement, 'swc-tooltip');

    await step('Escape closes the open tooltip', async () => {
      tooltip.open = true;
      await waitForEvent(tooltip, 'swc-open');
      expect(tooltip.open, 'tooltip is open before Escape').toBe(true);

      const closePromise = waitForEvent(tooltip, 'swc-close');
      await userEvent.keyboard('{Escape}');
      await closePromise;

      expect(tooltip.open, 'tooltip is closed after Escape').toBe(false);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: ARIA wiring — native trigger
// ──────────────────────────────────────────────────────────────

export const AriaWiringNativeTest: Story = {
  render: () => html`
    <button id="tt-native-trigger">Save</button>
    <swc-tooltip for="tt-native-trigger" placement="top">
      Changes will be saved
    </swc-tooltip>
  `,
  play: async ({ canvasElement, step }) => {
    const tooltip = await getComponent<Tooltip>(canvasElement, 'swc-tooltip');
    const trigger = canvasElement.querySelector(
      '#tt-native-trigger'
    ) as AriaRelatable;

    await step(
      'sets ariaDescribedByElements on native trigger when open=true',
      async () => {
        tooltip.open = true;
        await tooltip.updateComplete;

        const elements = trigger.ariaDescribedByElements ?? [];
        expect(elements, 'ariaDescribedByElements contains tooltip').toContain(
          tooltip
        );
      }
    );

    await step(
      'removes ariaDescribedByElements from native trigger when open=false',
      async () => {
        tooltip.open = false;
        await tooltip.updateComplete;

        const elements = trigger.ariaDescribedByElements ?? [];
        expect(
          elements,
          'ariaDescribedByElements no longer contains tooltip'
        ).not.toContain(tooltip);
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: ARIA wiring — SWC component trigger (shadow root with <button>)
// ──────────────────────────────────────────────────────────────

export const AriaWiringSwcTriggerTest: Story = {
  render: () => html`
    <swc-button id="tt-swc-trigger">Save</swc-button>
    <swc-tooltip for="tt-swc-trigger" placement="top">
      Changes will be saved
    </swc-tooltip>
  `,
  play: async ({ canvasElement, step }) => {
    const swcButton = canvasElement.querySelector(
      '#tt-swc-trigger'
    ) as HTMLElement;
    await (swcButton as HTMLElement & { updateComplete: Promise<boolean> })
      .updateComplete;

    const tooltip = await getComponent<Tooltip>(canvasElement, 'swc-tooltip');
    const innerButton = swcButton.shadowRoot?.querySelector(
      'button'
    ) as AriaRelatable | null;

    await step(
      'inner shadow <button> has correct ARIA relationship when tooltip opens',
      async () => {
        expect(
          innerButton,
          'swc-button has an inner <button> in its shadow root'
        ).toBeTruthy();

        tooltip.open = true;
        await tooltip.updateComplete;

        const elements = innerButton?.ariaDescribedByElements ?? [];
        expect(
          elements,
          'inner shadow button ariaDescribedByElements contains tooltip host'
        ).toContain(tooltip);
      }
    );

    await step(
      'inner shadow <button> ARIA relationship is removed when tooltip closes',
      async () => {
        tooltip.open = false;
        await tooltip.updateComplete;

        const elements = innerButton?.ariaDescribedByElements ?? [];
        expect(
          elements,
          'inner shadow button ariaDescribedByElements no longer contains tooltip'
        ).not.toContain(tooltip);
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: ARIA wiring — triggerElement setter overrides `for`
// ──────────────────────────────────────────────────────────────

export const AriaWiringTriggerElementOverrideTest: Story = {
  render: () => html`
    <swc-button id="tt-wrong-target">Wrong target</swc-button>
    <swc-button id="tt-correct-target">Correct target</swc-button>
    <swc-tooltip for="tt-wrong-target" placement="top">
      Tooltip text
    </swc-tooltip>
  `,
  play: async ({ canvasElement, step }) => {
    const tooltip = await getComponent<Tooltip>(canvasElement, 'swc-tooltip');
    const wrongTarget = canvasElement.querySelector(
      '#tt-wrong-target'
    ) as HTMLElement & { updateComplete: Promise<boolean> };
    const correctTarget = canvasElement.querySelector(
      '#tt-correct-target'
    ) as HTMLElement & { updateComplete: Promise<boolean> };
    await wrongTarget.updateComplete;
    await correctTarget.updateComplete;
    const wrongInner = wrongTarget.shadowRoot?.querySelector(
      'button'
    ) as AriaRelatable | null;
    const correctInner = correctTarget.shadowRoot?.querySelector(
      'button'
    ) as AriaRelatable | null;

    await step(
      'triggerElement setter routes ARIA wiring away from `for` target',
      async () => {
        tooltip.triggerElement = correctTarget as HTMLElement;
        tooltip.open = true;
        await tooltip.updateComplete;

        expect(
          correctInner?.ariaDescribedByElements ?? [],
          'correct target inner button receives ariaDescribedByElements'
        ).toContain(tooltip);

        expect(
          wrongInner?.ariaDescribedByElements ?? [],
          'for target inner button does not receive ariaDescribedByElements when triggerElement is set'
        ).not.toContain(tooltip);
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: ARIA wiring — no trigger set
// ──────────────────────────────────────────────────────────────

export const AriaWiringNoTriggerTest: Story = {
  render: () => html`
    <swc-tooltip placement="top">Standalone tooltip</swc-tooltip>
  `,
  play: async ({ canvasElement, step }) => {
    const tooltip = await getComponent<Tooltip>(canvasElement, 'swc-tooltip');

    await step(
      'opening tooltip with no for or triggerElement does not throw',
      async () => {
        let threw = false;
        try {
          tooltip.open = true;
          await tooltip.updateComplete;
        } catch {
          threw = true;
        }
        expect(threw, 'no error thrown when opening without trigger').toBe(
          false
        );
        tooltip.open = false;
        await tooltip.updateComplete;
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: ARIA wiring — manual mode still wires ARIA
// ──────────────────────────────────────────────────────────────

export const AriaWiringManualModeTest: Story = {
  render: () => html`
    <swc-button id="tt-manual-trigger">Save</swc-button>
    <swc-tooltip for="tt-manual-trigger" manual placement="top">
      Consumer-controlled tooltip
    </swc-tooltip>
  `,
  play: async ({ canvasElement, step }) => {
    const tooltip = await getComponent<Tooltip>(canvasElement, 'swc-tooltip');
    const trigger = canvasElement.querySelector(
      '#tt-manual-trigger'
    ) as HTMLElement & {
      updateComplete: Promise<boolean>;
    };
    await trigger.updateComplete;
    const innerButton = trigger.shadowRoot?.querySelector(
      'button'
    ) as AriaRelatable | null;

    await step(
      'manual mode does not prevent ARIA wiring when for is set',
      async () => {
        tooltip.open = true;
        await tooltip.updateComplete;

        const elements = innerButton?.ariaDescribedByElements ?? [];
        expect(
          elements,
          'ariaDescribedByElements is set on inner button even in manual mode'
        ).toContain(tooltip);
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Variants
// ──────────────────────────────────────────────────────────────

export const VariantsTest: Story = {
  ...Variants,
  play: async ({ canvasElement, step }) => {
    await step('renders all valid tooltip variants', async () => {
      for (const variant of TOOLTIP_VARIANTS) {
        const tooltip = canvasElement.querySelector(
          `swc-tooltip[variant="${variant}"]`
        ) as Tooltip | null;
        expect(
          tooltip,
          `tooltip with variant="${variant}" is rendered`
        ).toBeTruthy();
        await tooltip?.updateComplete;
        expect(
          tooltip?.variant,
          `tooltip variant property is "${variant}"`
        ).toBe(variant);
      }
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Placements
// ──────────────────────────────────────────────────────────────

export const PlacementsTest: Story = {
  ...Placements,
  play: async ({ canvasElement, step }) => {
    await step('renders all valid placement values', async () => {
      const tooltips = await getComponents<Tooltip>(
        canvasElement,
        'swc-tooltip'
      );
      for (const placement of TOOLTIP_PLACEMENTS) {
        const tooltip = tooltips.find((t) => t.placement === placement);
        expect(
          tooltip,
          `tooltip with placement="${placement}" is rendered`
        ).toBeTruthy();
      }
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Debug warnings
// ──────────────────────────────────────────────────────────────

export const ForIdNotFoundWarningTest: Story = {
  render: () => html`
    <swc-tooltip for="does-not-exist" placement="top">Tooltip</swc-tooltip>
  `,
  play: async ({ canvasElement, step }) => {
    const tooltip = await getComponent<Tooltip>(canvasElement, 'swc-tooltip');

    await step(
      'warns in DEBUG mode when for attribute does not resolve to an element',
      () =>
        withWarningSpy(async (warnCalls) => {
          tooltip.open = true;
          await tooltip.updateComplete;
          tooltip.open = false;
          await tooltip.updateComplete;

          expect(
            warnCalls.length,
            'at least one warning is emitted for unresolved for attribute'
          ).toBeGreaterThan(0);
          expect(
            String(warnCalls[0]?.[1] ?? ''),
            'warning message references the for attribute value'
          ).toContain('does-not-exist');
        })
    );
  },
};
