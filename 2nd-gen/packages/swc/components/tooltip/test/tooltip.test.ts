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
import { expect, userEvent, waitFor } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import type { Button } from '@adobe/spectrum-wc/button';
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

// ─── Test helpers ─────────────────────────────────────────────────────────────

/** Opens the tooltip and polls until it enters the top layer. Safer than
 * waitForEvent('swc-open'): beforetoggle timing varies in headless CI. */
const openTooltip = async (tooltip: Tooltip): Promise<void> => {
  tooltip.open = true;
  await waitFor(() => expect(tooltip.matches(':popover-open')).toBe(true), {
    timeout: 1000,
  });
};

/** Dispatches pointerenter on the trigger and waits for the tooltip to open. */
const hoverOpen = async (
  trigger: HTMLElement,
  tooltip: Tooltip
): Promise<void> => {
  trigger.dispatchEvent(
    new PointerEvent('pointerenter', { bubbles: false, composed: true })
  );
  await waitFor(() => expect(tooltip.open).toBe(true), { timeout: 200 });
};

/** Dispatches pointerleave on the trigger and waits for the tooltip to close
 * (includes the 300 ms HoverController cooldown plus generous CI headroom —
 * headless Chromium can throttle setTimeout callbacks in background pages). */
const hoverClose = async (
  trigger: HTMLElement,
  tooltip: Tooltip
): Promise<void> => {
  trigger.dispatchEvent(
    new PointerEvent('pointerleave', { bubbles: false, composed: true })
  );
  await waitFor(() => expect(tooltip.open).toBe(false), { timeout: 5000 });
};

/** Dispatches focusin on the trigger and waits for the tooltip to open. */
const focusOpen = async (
  trigger: HTMLElement,
  tooltip: Tooltip
): Promise<void> => {
  trigger.dispatchEvent(
    new FocusEvent('focusin', { bubbles: true, composed: true })
  );
  await waitFor(() => expect(tooltip.open).toBe(true), { timeout: 200 });
};

/** Dispatches focusout on the trigger and waits for the tooltip to close. */
const focusClose = async (
  trigger: HTMLElement,
  tooltip: Tooltip
): Promise<void> => {
  trigger.dispatchEvent(
    new FocusEvent('focusout', { bubbles: true, composed: true })
  );
  await waitFor(() => expect(tooltip.open).toBe(false), { timeout: 200 });
};

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

    await step('reflects variant attribute after mutation', async () => {
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

    await step('reflects placement attribute after mutation', async () => {
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

export const OpenCloseTest: Story = {
  render: () => html`
    <swc-button id="tt-open-close-trigger">Toggle</swc-button>
    <swc-tooltip for="tt-open-close-trigger" placement="top">
      Tooltip text
    </swc-tooltip>
  `,
  play: async ({ canvasElement, step }) => {
    const tooltip = await getComponent<Tooltip>(canvasElement, 'swc-tooltip');

    await step(
      'reflects [open] attribute when open is set to true',
      async () => {
        tooltip.open = true;
        await tooltip.updateComplete;
        expect(
          tooltip.hasAttribute('open'),
          'open attribute is present when open=true'
        ).toBe(true);
      }
    );

    await step(
      'removes [open] attribute when open is set to false',
      async () => {
        tooltip.open = false;
        await tooltip.updateComplete;
        expect(
          tooltip.hasAttribute('open'),
          'open attribute is absent when open=false'
        ).toBe(false);
      }
    );
  },
};

export const LifecycleEventsTest: Story = {
  render: () => html`
    <swc-button id="tt-events-trigger">Open</swc-button>
    <swc-tooltip for="tt-events-trigger" placement="top">
      Tooltip content
    </swc-tooltip>
  `,
  play: async ({ canvasElement, step }) => {
    const tooltip = await getComponent<Tooltip>(canvasElement, 'swc-tooltip');

    await step('fires swc-open when tooltip is opened', async () => {
      const openPromise = waitForEvent(tooltip, 'swc-open');
      tooltip.open = true;
      await openPromise;
      tooltip.open = false;
      await tooltip.updateComplete;
    });

    await step('fires swc-close when tooltip is closed', async () => {
      tooltip.open = true;
      await tooltip.updateComplete;

      const closePromise = waitForEvent(tooltip, 'swc-close');
      tooltip.open = false;
      await closePromise;
    });

    await step(
      'fires swc-after-open after the tooltip transition ends',
      async () => {
        const afterOpenPromise = waitForEvent(tooltip, 'swc-after-open');
        tooltip.open = true;
        await afterOpenPromise;
        tooltip.open = false;
        await tooltip.updateComplete;
      }
    );

    await step(
      'fires swc-after-close after the tooltip transition ends',
      async () => {
        tooltip.open = true;
        await tooltip.updateComplete;

        const afterClosePromise = waitForEvent(tooltip, 'swc-after-close');
        tooltip.open = false;
        await afterClosePromise;
      }
    );

    await step('dispatches events that bubble and are composed', async () => {
      let openBubbled = false;
      let closeBubbled = false;
      canvasElement.addEventListener(
        'swc-open',
        () => {
          openBubbled = true;
        },
        { once: true }
      );
      canvasElement.addEventListener(
        'swc-close',
        () => {
          closeBubbled = true;
        },
        { once: true }
      );

      tooltip.open = true;
      await waitForEvent(tooltip, 'swc-open');
      expect(openBubbled, 'swc-open bubbled to canvas').toBe(true);

      tooltip.open = false;
      await waitForEvent(tooltip, 'swc-close');
      expect(closeBubbled, 'swc-close bubbled to canvas').toBe(true);

      await tooltip.updateComplete;
    });
  },
};

export const AriaWiringNativeTest: Story = {
  render: () => html`
    <button id="tt-native-trigger">Save</button>
    <swc-tooltip for="tt-native-trigger" placement="top">
      Changes will be saved
    </swc-tooltip>
  `,
  play: async ({ canvasElement, step }) => {
    const tooltip = await getComponent<Tooltip>(canvasElement, 'swc-tooltip');
    const trigger = canvasElement.querySelector('#tt-native-trigger')!;

    await step(
      'sets ariaDescribedByElements on a native trigger when open is true',
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
      'removes ariaDescribedByElements from a native trigger when open is false',
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

export const AriaWiringSwcTriggerTest: Story = {
  render: () => html`
    <swc-button id="tt-swc-trigger">Save</swc-button>
    <swc-tooltip for="tt-swc-trigger" placement="top">
      Changes will be saved
    </swc-tooltip>
  `,
  play: async ({ canvasElement, step }) => {
    const swcButton = canvasElement.querySelector('#tt-swc-trigger') as Button;
    await swcButton.updateComplete;

    const tooltip = await getComponent<Tooltip>(canvasElement, 'swc-tooltip');
    const innerButton = swcButton.shadowRoot?.querySelector('button') ?? null;

    await step(
      'wires ariaDescribedByElements on the shadow <button> when the tooltip opens',
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
      'removes ariaDescribedByElements from the shadow <button> when the tooltip closes',
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
    ) as Button;
    const correctTarget = canvasElement.querySelector(
      '#tt-correct-target'
    ) as Button;
    await wrongTarget.updateComplete;
    await correctTarget.updateComplete;
    const wrongInner = wrongTarget.shadowRoot?.querySelector('button') ?? null;
    const correctInner =
      correctTarget.shadowRoot?.querySelector('button') ?? null;

    await step(
      'routes ARIA wiring to the triggerElement target instead of the for target',
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

export const TriggerElementHoverTest: Story = {
  render: () => html`
    <swc-button id="tt-te-hover">Hover me</swc-button>
    <swc-tooltip placement="top" delay="0">
      Wired via triggerElement, no for attribute
    </swc-tooltip>
  `,
  play: async ({ canvasElement, step }) => {
    const trigger = canvasElement.querySelector('#tt-te-hover') as Button;
    await trigger.updateComplete;
    const innerButton = trigger.shadowRoot?.querySelector('button') ?? null;
    const tooltip = await getComponent<Tooltip>(canvasElement, 'swc-tooltip');

    await step(
      'wires HoverController when triggerElement is set without a for attribute',
      async () => {
        tooltip.triggerElement = trigger;
        await tooltip.updateComplete;
        await hoverOpen(trigger, tooltip);
        expect(tooltip.open, 'tooltip opens on hover via triggerElement').toBe(
          true
        );
      }
    );

    await step(
      'closes when pointer leaves and sets ARIA on the inner shadow button',
      async () => {
        expect(
          innerButton?.ariaDescribedByElements ?? [],
          'inner shadow button receives ariaDescribedByElements via triggerElement wiring'
        ).toContain(tooltip);
        await hoverClose(trigger, tooltip);
        expect(tooltip.open, 'tooltip closes after pointer leaves').toBe(false);
      }
    );
  },
};

export const TriggerElementOverridesForHoverTest: Story = {
  render: () => html`
    <swc-button id="tt-te-wrong">Wrong target</swc-button>
    <swc-button id="tt-te-correct">Correct target</swc-button>
    <swc-tooltip for="tt-te-wrong" delay="0" placement="top">
      Should open on correct trigger
    </swc-tooltip>
  `,
  play: async ({ canvasElement, step }) => {
    const wrongTrigger = canvasElement.querySelector('#tt-te-wrong') as Button;
    const correctTrigger = canvasElement.querySelector(
      '#tt-te-correct'
    ) as Button;
    const tooltip = await getComponent<Tooltip>(canvasElement, 'swc-tooltip');

    await step(
      'triggerElement overrides for when set — hover wires to the override target',
      async () => {
        tooltip.triggerElement = correctTrigger;
        await tooltip.updateComplete;

        // Hovering the for-target (wrong) should NOT open the tooltip.
        wrongTrigger.dispatchEvent(
          new PointerEvent('pointerenter', { bubbles: false, composed: true })
        );
        await tooltip.updateComplete;
        expect(
          tooltip.open,
          'for target does not open tooltip when triggerElement overrides it'
        ).toBe(false);

        // Hovering the triggerElement target should open it.
        await hoverOpen(correctTrigger, tooltip);
        expect(tooltip.open, 'triggerElement target opens the tooltip').toBe(
          true
        );

        await hoverClose(correctTrigger, tooltip);
      }
    );
  },
};

export const AriaWiringNoTriggerTest: Story = {
  render: () => html`
    <swc-tooltip placement="top">Standalone tooltip</swc-tooltip>
  `,
  play: async ({ canvasElement, step }) => {
    const tooltip = await getComponent<Tooltip>(canvasElement, 'swc-tooltip');

    await step(
      'opens without throwing when no for attribute or triggerElement is set',
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

export const AriaWiringManualModeTest: Story = {
  render: () => html`
    <swc-button id="tt-manual-trigger">Save</swc-button>
    <swc-tooltip for="tt-manual-trigger" manual placement="top">
      Consumer-controlled tooltip
    </swc-tooltip>
  `,
  play: async ({ canvasElement, step }) => {
    const tooltip = await getComponent<Tooltip>(canvasElement, 'swc-tooltip');
    const trigger = canvasElement.querySelector('#tt-manual-trigger') as Button;
    await trigger.updateComplete;
    const innerButton = trigger.shadowRoot?.querySelector('button') ?? null;

    await step(
      'wires ariaDescribedByElements even when manual mode is active',
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
// TEST: ARIA wiring — labeling attribute
// ──────────────────────────────────────────────────────────────

export const AriaWiringLabelingTest: Story = {
  render: () => html`
    <swc-button id="tt-labeling-trigger" accessible-label="Favorite">
      ★
    </swc-button>
    <swc-tooltip for="tt-labeling-trigger" labeling placement="top">
      Favorite
    </swc-tooltip>
  `,
  play: async ({ canvasElement, step }) => {
    const tooltip = await getComponent<Tooltip>(canvasElement, 'swc-tooltip');
    const trigger = canvasElement.querySelector(
      '#tt-labeling-trigger'
    ) as Button;
    await trigger.updateComplete;
    const innerButton = trigger.shadowRoot?.querySelector('button') ?? null;

    await step(
      'sets ariaLabelledByElements (not ariaDescribedByElements) on inner button when labeling is set',
      async () => {
        tooltip.open = true;
        await tooltip.updateComplete;

        expect(
          innerButton?.ariaLabelledByElements ?? [],
          'inner button ariaLabelledByElements contains tooltip when labeling is set'
        ).toContain(tooltip);

        expect(
          innerButton?.ariaDescribedByElements ?? [],
          'inner button ariaDescribedByElements does not contain tooltip when labeling is set'
        ).not.toContain(tooltip);
      }
    );

    await step(
      'clears ariaLabelledByElements from inner button when closed',
      async () => {
        tooltip.open = false;
        await tooltip.updateComplete;

        expect(
          innerButton?.ariaLabelledByElements ?? [],
          'inner button ariaLabelledByElements no longer contains tooltip after close'
        ).not.toContain(tooltip);
      }
    );

    await step(
      'switches to ariaDescribedByElements on inner button when labeling is removed while open',
      async () => {
        tooltip.open = true;
        await tooltip.updateComplete;

        tooltip.labeling = false;
        await tooltip.updateComplete;

        expect(
          innerButton?.ariaDescribedByElements ?? [],
          'inner button ariaDescribedByElements contains tooltip after labeling removed'
        ).toContain(tooltip);

        expect(
          innerButton?.ariaLabelledByElements ?? [],
          'inner button ariaLabelledByElements does not contain tooltip after labeling removed'
        ).not.toContain(tooltip);

        tooltip.open = false;
        await tooltip.updateComplete;
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Variants / States
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

    await step('closes the open tooltip when Escape is pressed', async () => {
      await openTooltip(tooltip);
      expect(tooltip.open, 'tooltip is open before Escape').toBe(true);

      await userEvent.keyboard('{Escape}');
      await waitFor(
        () => expect(tooltip.matches(':popover-open')).toBe(false),
        { timeout: 1000 }
      );
      expect(tooltip.open, 'tooltip is closed after Escape').toBe(false);
    });
  },
};

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

    for (const variant of TOOLTIP_VARIANTS) {
      await step(`opens ${variant} variant tooltip for VRT`, async () => {
        const tooltip = canvasElement.querySelector(
          `swc-tooltip[variant="${variant}"]`
        ) as Tooltip;
        await openTooltip(tooltip);
      });
    }
  },
};

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

    for (const placement of TOOLTIP_PLACEMENTS) {
      await step(`opens ${placement} placement tooltip for VRT`, async () => {
        const tooltip = canvasElement.querySelector(
          `swc-tooltip[placement="${placement}"]`
        ) as Tooltip;
        await openTooltip(tooltip);
      });
    }
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Dev mode warnings
// ──────────────────────────────────────────────────────────────

// ──────────────────────────────────────────────────────────────
// VRT: Visual regression tests
// ──────────────────────────────────────────────────────────────

export const ForcedColorsOpenTest: Story = {
  render: () => html`
    <swc-button id="tt-forced-colors-trigger">Action</swc-button>
    <swc-tooltip for="tt-forced-colors-trigger" placement="top">
      Save your changes
    </swc-tooltip>
  `,
  parameters: {
    chromatic: { forcedColors: 'active' },
  },
  play: async ({ canvasElement }) => {
    const tooltip = await getComponent<Tooltip>(canvasElement, 'swc-tooltip');
    await openTooltip(tooltip);
  },
};

export const CJKLineHeightTest: Story = {
  render: () => html`
    <swc-button id="tt-cjk-trigger">Action</swc-button>
    <swc-tooltip for="tt-cjk-trigger" placement="top" lang="ja">
      変更内容を保存する
    </swc-tooltip>
  `,
  play: async ({ canvasElement }) => {
    const tooltip = await getComponent<Tooltip>(canvasElement, 'swc-tooltip');
    await openTooltip(tooltip);
  },
};

export const LogicalPlacementRTLTest: Story = {
  render: () => html`
    <swc-button id="tt-rtl-trigger">Action</swc-button>
    <swc-tooltip for="tt-rtl-trigger" placement="start" dir="rtl">
      Appears at start (right in RTL)
    </swc-tooltip>
  `,
  play: async ({ canvasElement }) => {
    const tooltip = await getComponent<Tooltip>(canvasElement, 'swc-tooltip');
    await openTooltip(tooltip);
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Dev mode warnings
// ──────────────────────────────────────────────────────────────

// ──────────────────────────────────────────────────────────────
// TEST: HoverController integration
// ──────────────────────────────────────────────────────────────

export const HoverOpensTest: Story = {
  render: () => html`
    <swc-button id="tt-hover-trigger">Hover me</swc-button>
    <swc-tooltip for="tt-hover-trigger" delay="0" placement="top">
      Appears on hover
    </swc-tooltip>
  `,
  play: async ({ canvasElement, step }) => {
    const trigger = canvasElement.querySelector('#tt-hover-trigger') as Button;
    const tooltip = await getComponent<Tooltip>(canvasElement, 'swc-tooltip');

    await step('opens and closes the tooltip on hover', async () => {
      await hoverOpen(trigger, tooltip);
      expect(tooltip.open, 'tooltip is open after hover').toBe(true);
      await hoverClose(trigger, tooltip);
      expect(tooltip.open, 'tooltip is closed after pointer leaves').toBe(
        false
      );
    });
  },
};

export const FocusOpensTest: Story = {
  render: () => html`
    <swc-button id="tt-focus-trigger">Focus me</swc-button>
    <swc-tooltip for="tt-focus-trigger" placement="top">
      Appears on focus
    </swc-tooltip>
  `,
  play: async ({ canvasElement, step }) => {
    const trigger = canvasElement.querySelector('#tt-focus-trigger') as Button;
    const tooltip = await getComponent<Tooltip>(canvasElement, 'swc-tooltip');

    await step(
      'opens the tooltip immediately when the trigger receives keyboard focus',
      async () => {
        await focusOpen(trigger, tooltip);
        expect(tooltip.open, 'tooltip is open after focus').toBe(true);
      }
    );

    await step('closes the tooltip when focus leaves the trigger', async () => {
      await focusClose(trigger, tooltip);
      expect(tooltip.open, 'tooltip is closed after blur').toBe(false);
    });
  },
};

export const DisabledPreventsHoverTest: Story = {
  render: () => html`
    <swc-button id="tt-disabled-trigger">Hover me</swc-button>
    <swc-tooltip for="tt-disabled-trigger" delay="0" disabled placement="top">
      Should not appear
    </swc-tooltip>
  `,
  play: async ({ canvasElement, step }) => {
    const trigger = canvasElement.querySelector(
      '#tt-disabled-trigger'
    ) as Button;
    const tooltip = await getComponent<Tooltip>(canvasElement, 'swc-tooltip');

    await step(
      'does not open the tooltip when disabled and trigger is hovered',
      async () => {
        trigger.dispatchEvent(
          new PointerEvent('pointerenter', { bubbles: false, composed: true })
        );
        await tooltip.updateComplete;
        expect(tooltip.open, 'tooltip remains closed when disabled').toBe(
          false
        );
      }
    );
  },
};

export const ManualPreventsHoverTest: Story = {
  render: () => html`
    <swc-button id="tt-manual-hover-trigger">Hover me</swc-button>
    <swc-tooltip for="tt-manual-hover-trigger" delay="0" manual placement="top">
      Manual tooltip
    </swc-tooltip>
  `,
  play: async ({ canvasElement, step }) => {
    const trigger = canvasElement.querySelector(
      '#tt-manual-hover-trigger'
    ) as Button;
    const tooltip = await getComponent<Tooltip>(canvasElement, 'swc-tooltip');

    await step(
      'does not open the tooltip on hover when manual mode is active',
      async () => {
        trigger.dispatchEvent(
          new PointerEvent('pointerenter', { bubbles: false, composed: true })
        );
        await tooltip.updateComplete;
        expect(tooltip.open, 'tooltip remains closed in manual mode').toBe(
          false
        );
      }
    );

    await step(
      'opens when open is set directly even in manual mode',
      async () => {
        tooltip.open = true;
        await tooltip.updateComplete;
        expect(tooltip.open, 'tooltip opens via property in manual mode').toBe(
          true
        );
        tooltip.open = false;
        await tooltip.updateComplete;
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: PlacementController integration
// ──────────────────────────────────────────────────────────────

export const PlacementControllerTest: Story = {
  render: () => html`
    <div style="display: flex; justify-content: center; padding: 120px;">
      <swc-button id="tt-placement-trigger">Trigger</swc-button>
    </div>
    <swc-tooltip for="tt-placement-trigger" placement="top">
      Positioned by PlacementController
    </swc-tooltip>
  `,
  play: async ({ canvasElement, step }) => {
    const tooltip = await getComponent<Tooltip>(canvasElement, 'swc-tooltip');

    await step(
      'applies translate positioning via PlacementController when opened',
      async () => {
        tooltip.open = true;
        // Poll for the popover-open state rather than waiting for swc-open:
        // beforetoggle timing varies across browsers in headless CI.
        await waitFor(
          () =>
            expect(
              tooltip.matches(':popover-open'),
              'tooltip entered the top layer'
            ).toBe(true),
          { timeout: 1000 }
        );

        // PlacementController is async; poll until it has applied positioning.
        await waitFor(
          () =>
            expect(
              tooltip.style.translate,
              'PlacementController applied a translate value'
            ).toBeTruthy(),
          { timeout: 1000 }
        );
      }
    );

    await step(
      'reflects the actual computed placement back into the placement property',
      async () => {
        await waitFor(
          () =>
            expect(
              ['top', 'bottom', 'left', 'right', 'start', 'end'],
              'placement reflects a valid computed side'
            ).toContain(tooltip.placement),
          { timeout: 1000 }
        );
      }
    );

    await step('positions the tip element via arrow middleware', async () => {
      // The arrow middleware writes translate on the tip span so the tip
      // tracks the trigger center independently of any cross-axis shift.
      const tip = tooltip.shadowRoot?.querySelector(
        '.swc-Tooltip-tip'
      ) as HTMLElement | null;
      await waitFor(
        () =>
          expect(
            tip?.style.translate,
            'arrow middleware set translate on .swc-Tooltip-tip'
          ).toBeTruthy(),
        { timeout: 1000 }
      );
    });

    await step('clears translate when closed', async () => {
      const tip = tooltip.shadowRoot?.querySelector(
        '.swc-Tooltip-tip'
      ) as HTMLElement | null;

      tooltip.open = false;

      // Poll for the bubble translate to clear rather than waiting for
      // swc-after-close: Firefox specifically in CI may not fire transitionend for
      // transition-behavior:allow-discrete discrete properties, which would
      // cause an unbounded hang if we waitForEvent('swc-after-close').
      await waitFor(
        () =>
          expect(
            tooltip.style.translate,
            'bubble translate is cleared after close'
          ).toBeFalsy(),
        { timeout: 2000 }
      );
      // Tip translate is cleared synchronously by placementController.stop().
      expect(
        tip?.style.translate,
        'tip translate is cleared after close'
      ).toBeFalsy();
    });

    await step(
      'uses the updated requested placement when consumer changes placement before reopening',
      async () => {
        // Consumer explicitly requests a different side.
        tooltip.placement = 'bottom';
        await tooltip.updateComplete;

        await openTooltip(tooltip);

        // PlacementController should rerun with the new requested placement.
        await waitFor(
          () =>
            expect(
              tooltip.style.translate,
              'PlacementController positioned tooltip for the new placement'
            ).toBeTruthy(),
          { timeout: 1000 }
        );

        tooltip.open = false;
        await tooltip.updateComplete;
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Shadow root scoping
// ──────────────────────────────────────────────────────────────

export const ShadowRootScopeTest: Story = {
  // Render an empty host; the shadow root and its contents are built in the
  // play function so getRootNode() on the tooltip returns the shadow root.
  render: () => html`
    <div id="shadow-root-host"></div>
  `,
  play: async ({ canvasElement, step }) => {
    const host = canvasElement.querySelector(
      '#shadow-root-host'
    ) as HTMLDivElement;
    const shadow = host.attachShadow({ mode: 'open' });

    const trigger = document.createElement('button');
    trigger.id = 'sr-trigger';
    trigger.textContent = 'Trigger';

    const tooltip = document.createElement('swc-tooltip') as Tooltip;
    tooltip.setAttribute('placement', 'top');
    tooltip.textContent = 'Shadow-scoped tooltip';

    shadow.append(trigger, tooltip);

    // Set 'for' after connecting so getRootNode() returns the shadow root when
    // the first updated() resolves the trigger via getRootNode().getElementById.
    tooltip.for = 'sr-trigger';
    await tooltip.updateComplete;

    await step(
      'resolves the trigger via getRootNode() scoped to the shadow root',
      async () => {
        tooltip.open = true;
        await tooltip.updateComplete;

        expect(
          trigger.ariaDescribedByElements ?? [],
          'native trigger inside shadow root receives ariaDescribedByElements wiring'
        ).toContain(tooltip);

        tooltip.open = false;
        await tooltip.updateComplete;
      }
    );
  },
};

export const ForIdNotFoundWarningTest: Story = {
  render: () => html`
    <swc-tooltip for="does-not-exist" placement="top">Tooltip</swc-tooltip>
  `,
  play: async ({ canvasElement, step }) => {
    const tooltip = await getComponent<Tooltip>(canvasElement, 'swc-tooltip');

    await step(
      'warns in DEBUG mode when the for attribute does not resolve to an element',
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
