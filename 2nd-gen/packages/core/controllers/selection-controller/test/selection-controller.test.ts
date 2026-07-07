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

import { expect } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import {
  selectionControllerChange,
  type SelectionControllerChangeDetail,
} from '@spectrum-web-components/core/controllers/index.js';

import '../stories/demo-hosts.js';

import { getComponent } from '../../../../swc/utils/test-utils.js';
import {
  DEMO_TAB_CHANGE_EVENT,
  type DemoSelectionStarSingle,
} from '../stories/demo-hosts.js';
import selectionMeta, {
  AccordionModeSwitch,
  MultipleListbox,
  SingleModeRating,
  SingleToggleModeRating,
  TablistWithFocusgroup,
} from '../stories/selection-controller.stories.js';

/**
 * Dispatches a keydown with both `key` and `code` set. The SelectionController
 * checks `event.code` for Enter/Space activation, so both must be present.
 */
function activate(
  target: HTMLElement,
  code: 'Enter' | 'Space' = 'Enter'
): void {
  target.dispatchEvent(
    new KeyboardEvent('keydown', {
      key: code === 'Space' ? ' ' : code,
      code,
      bubbles: true,
      composed: true,
      cancelable: true,
    })
  );
}

/**
 * Dispatches a keydown with `key` only, for FocusgroupNavigationController
 * arrow key tests (which check `event.key`, not `event.code`).
 */
function arrowKey(target: HTMLElement, key: string): void {
  target.dispatchEvent(
    new KeyboardEvent('keydown', {
      key,
      bubbles: true,
      composed: true,
      cancelable: true,
    })
  );
}

/** Returns the currently focused element inside the host's shadow root. */
function shadowFocused(host: HTMLElement): HTMLElement | null {
  const active = host.shadowRoot?.activeElement;
  return active instanceof HTMLElement ? active : null;
}

export default {
  ...selectionMeta,
  title: 'Controllers/Selection controller/Tests',
  parameters: {
    ...selectionMeta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

// ──────────────────────────────────────────────────────────────
// Single mode — clicking the selected item has no effect
// ──────────────────────────────────────────────────────────────

export const SingleModeRatingTest: Story = {
  ...SingleModeRating,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<DemoSelectionStarSingle>(
      canvasElement,
      'demo-selection-star-single'
    );
    const root = host.shadowRoot!;
    const stars = Array.from(
      root.querySelectorAll<HTMLButtonElement>('[data-star-single]')
    );
    expect(stars.length).toBe(5);

    await step('initially no star is selected', async () => {
      for (const star of stars) {
        expect(star.getAttribute('aria-checked')).toBe('false');
      }
    });

    await step(
      'clicking star 2 selects it and leaves others deselected',
      async () => {
        stars[1].click();
        expect(stars[1].getAttribute('aria-checked')).toBe('true');
        for (let i = 0; i < 5; i++) {
          if (i !== 1) {
            expect(stars[i].getAttribute('aria-checked')).toBe('false');
          }
        }
      }
    );

    await step(
      'clicking the already-selected star again has no effect (single mode)',
      async () => {
        stars[1].click();
        expect(stars[1].getAttribute('aria-checked')).toBe('true');
      }
    );

    await step('clicking a different star replaces the selection', async () => {
      stars[3].click();
      expect(stars[3].getAttribute('aria-checked')).toBe('true');
      expect(stars[1].getAttribute('aria-checked')).toBe('false');
    });

    await step('Enter key selects the focused star', async () => {
      stars[0].focus();
      activate(stars[0], 'Enter');
      expect(stars[0].getAttribute('aria-checked')).toBe('true');
      expect(stars[3].getAttribute('aria-checked')).toBe('false');
    });

    await step('Space key selects the focused star', async () => {
      stars[4].focus();
      activate(stars[4], 'Space');
      expect(stars[4].getAttribute('aria-checked')).toBe('true');
      expect(stars[0].getAttribute('aria-checked')).toBe('false');
    });

    await step(
      'a silent { silent: true } call clears the selection despite single mode',
      async () => {
        // Clicking the active star has no effect in single mode (asserted
        // above), but a silent programmatic clear — the pattern a consumer
        // uses to resync from an external property reset to "nothing
        // selected" — can still empty it.
        expect(stars[4].getAttribute('aria-checked')).toBe('true');

        host.clearSelectionSilently();

        expect(
          stars[4].getAttribute('aria-checked'),
          'previously active star is deselected'
        ).toBe('false');
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// Single-toggle mode — clicking the selected item clears it
// ──────────────────────────────────────────────────────────────

export const SingleToggleModeRatingTest: Story = {
  ...SingleToggleModeRating,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<HTMLElement>(
      canvasElement,
      'demo-selection-star-toggle'
    );
    const root = host.shadowRoot!;
    const stars = Array.from(
      root.querySelectorAll<HTMLButtonElement>('[data-star-toggle]')
    );
    expect(stars.length).toBe(5);

    await step('clicking star 3 selects it', async () => {
      stars[2].click();
      expect(stars[2].getAttribute('aria-checked')).toBe('true');
      for (let i = 0; i < 5; i++) {
        if (i !== 2) {
          expect(stars[i].getAttribute('aria-checked')).toBe('false');
        }
      }
    });

    await step(
      'clicking the active star again clears the selection',
      async () => {
        stars[2].click();
        for (const star of stars) {
          expect(star.getAttribute('aria-checked')).toBe('false');
        }
      }
    );

    await step('clicking star 2 selects it', async () => {
      stars[1].click();
      expect(stars[1].getAttribute('aria-checked')).toBe('true');
    });

    await step('clicking a different star replaces the selection', async () => {
      stars[4].click();
      expect(stars[4].getAttribute('aria-checked')).toBe('true');
      expect(stars[1].getAttribute('aria-checked')).toBe('false');
    });

    await step('Space on the active star clears the selection', async () => {
      stars[4].focus();
      activate(stars[4], 'Space');
      for (const star of stars) {
        expect(star.getAttribute('aria-checked')).toBe('false');
      }
    });
  },
};

// ──────────────────────────────────────────────────────────────
// Multiple mode — independent toggles, selectAll, clearAll
// ──────────────────────────────────────────────────────────────

export const MultipleListboxTest: Story = {
  ...MultipleListbox,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<HTMLElement>(
      canvasElement,
      'demo-selection-listbox'
    );
    const root = host.shadowRoot!;
    const options = Array.from(
      root.querySelectorAll<HTMLElement>('[data-option]')
    );
    expect(options.length).toBe(7);

    const [selectAllBtn, clearBtn] = Array.from(
      root.querySelectorAll<HTMLButtonElement>('.action-btn')
    );

    await step('initially all options are deselected', async () => {
      for (const option of options) {
        expect(option.getAttribute('aria-selected')).toBe('false');
      }
    });

    await step('clicking an option selects it independently', async () => {
      options[0].click();
      expect(options[0].getAttribute('aria-selected')).toBe('true');
      expect(options[1].getAttribute('aria-selected')).toBe('false');
    });

    await step('clicking another option adds it to the selection', async () => {
      options[2].click();
      expect(options[0].getAttribute('aria-selected')).toBe('true');
      expect(options[2].getAttribute('aria-selected')).toBe('true');
      expect(options[1].getAttribute('aria-selected')).toBe('false');
    });

    await step('clicking a selected option deselects it (toggle)', async () => {
      options[0].click();
      expect(options[0].getAttribute('aria-selected')).toBe('false');
      expect(options[2].getAttribute('aria-selected')).toBe('true');
    });

    await step('selectAll selects every option', async () => {
      selectAllBtn.click();
      for (const option of options) {
        expect(option.getAttribute('aria-selected')).toBe('true');
      }
    });

    await step('clearAll deselects every option', async () => {
      clearBtn.click();
      for (const option of options) {
        expect(option.getAttribute('aria-selected')).toBe('false');
      }
    });

    await step(
      'selectionControllerChange event fires with correct detail',
      async () => {
        let receivedDetail: SelectionControllerChangeDetail | null = null;
        const handler = ((
          event: CustomEvent<SelectionControllerChangeDetail>
        ) => {
          receivedDetail = event.detail;
        }) as EventListener;

        host.addEventListener(selectionControllerChange, handler);
        options[1].click();

        expect(receivedDetail).toBeTruthy();
        expect(receivedDetail!.selectedItems).toContain(options[1]);
        expect(receivedDetail!.addedItems).toContain(options[1]);
        expect(receivedDetail!.removedItems.length).toBe(0);
        expect(receivedDetail!.selectedItems.length).toBe(1);

        host.removeEventListener(selectionControllerChange, handler);
      }
    );

    await step(
      'selectionControllerChange event bubbles and is composed',
      async () => {
        let captured = false;
        const handler = ((event: CustomEvent) => {
          expect(event.bubbles).toBe(true);
          expect(event.composed).toBe(true);
          captured = true;
        }) as EventListener;

        canvasElement.addEventListener(selectionControllerChange, handler);
        options[3].click();
        expect(captured).toBe(true);
        canvasElement.removeEventListener(selectionControllerChange, handler);
      }
    );

    await step(
      'Enter key toggles a focused option in multiple mode',
      async () => {
        options[0].focus();
        const wasBefore = options[0].getAttribute('aria-selected');
        activate(options[0] as HTMLElement, 'Enter');
        const isNow = options[0].getAttribute('aria-selected');
        expect(isNow).not.toBe(wasBefore);
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// Runtime mode switch via setOptions
// ──────────────────────────────────────────────────────────────

export const AccordionModeSwitchTest: Story = {
  ...AccordionModeSwitch,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<HTMLElement>(
      canvasElement,
      'demo-selection-accordion'
    );
    const root = host.shadowRoot!;

    const trigger = (key: string): HTMLButtonElement =>
      root.querySelector<HTMLButtonElement>(`[data-accordion="${key}"]`)!;
    const panel = (key: string): HTMLElement =>
      root.querySelector<HTMLElement>(`[data-panel="${key}"]`)!;
    const modeBtn = (label: string): HTMLButtonElement => {
      const btn = Array.from(
        root.querySelectorAll<HTMLButtonElement>('.mode-btn')
      ).find((b) => b.textContent?.trim() === label);
      expect(btn).toBeTruthy();
      return btn!;
    };

    await step(
      'after mount all panels are hidden (refresh deselects all)',
      async () => {
        expect(trigger('general').getAttribute('aria-expanded')).toBe('false');
        expect(trigger('appearance').getAttribute('aria-expanded')).toBe(
          'false'
        );
        expect(panel('general').hidden).toBe(true);
        expect(panel('appearance').hidden).toBe(true);
      }
    );

    await step('clicking the General trigger opens its panel', async () => {
      trigger('general').click();
      expect(trigger('general').getAttribute('aria-expanded')).toBe('true');
      expect(panel('general').hidden).toBe(false);
    });

    await step(
      'single mode: clicking a different trigger closes General and opens Appearance',
      async () => {
        trigger('appearance').click();
        expect(trigger('appearance').getAttribute('aria-expanded')).toBe(
          'true'
        );
        expect(panel('appearance').hidden).toBe(false);
        expect(trigger('general').getAttribute('aria-expanded')).toBe('false');
        expect(panel('general').hidden).toBe(true);
      }
    );

    await step(
      'switching to single-toggle mode retains the current open panel',
      async () => {
        modeBtn('single-toggle').click();
        expect(trigger('appearance').getAttribute('aria-expanded')).toBe(
          'true'
        );
        expect(panel('appearance').hidden).toBe(false);
      }
    );

    await step(
      'single-toggle mode: clicking the open trigger closes it',
      async () => {
        trigger('appearance').click();
        expect(trigger('appearance').getAttribute('aria-expanded')).toBe(
          'false'
        );
        expect(panel('appearance').hidden).toBe(true);
      }
    );

    await step(
      'switching to multiple mode: multiple panels can be open simultaneously',
      async () => {
        modeBtn('multiple').click();

        trigger('content').click();
        trigger('support').click();

        expect(trigger('content').getAttribute('aria-expanded')).toBe('true');
        expect(panel('content').hidden).toBe(false);
        expect(trigger('support').getAttribute('aria-expanded')).toBe('true');
        expect(panel('support').hidden).toBe(false);
      }
    );

    await step(
      'switching back to single retains only the first selected panel',
      async () => {
        modeBtn('single').click();

        const openCount = [
          'general',
          'appearance',
          'content',
          'support',
        ].filter(
          (key) => trigger(key).getAttribute('aria-expanded') === 'true'
        ).length;
        expect(openCount).toBe(1);

        expect(trigger('content').getAttribute('aria-expanded')).toBe('true');
        expect(trigger('support').getAttribute('aria-expanded')).toBe('false');
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// Tablist: FocusgroupNavigationController + SelectionController
// ──────────────────────────────────────────────────────────────

export const TablistWithFocusgroupTest: Story = {
  ...TablistWithFocusgroup,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<HTMLElement>(
      canvasElement,
      'demo-selection-tabs'
    );
    const root = host.shadowRoot!;

    const tab = (key: string): HTMLButtonElement =>
      root.querySelector<HTMLButtonElement>(`[data-tab="${key}"]`)!;
    const tabPanel = (key: string): HTMLElement =>
      root.querySelector<HTMLElement>(`[data-tab-panel="${key}"]`)!;

    await step(
      'defaultToFirstSelectable auto-selects the first tab on mount',
      async () => {
        expect(tab('layers').getAttribute('aria-selected')).toBe('true');
        expect(tab('adjustments').getAttribute('aria-selected')).toBe('false');
        expect(tab('export').getAttribute('aria-selected')).toBe('false');
        expect(tabPanel('layers').hasAttribute('hidden')).toBe(false);
        expect(tabPanel('adjustments').hasAttribute('hidden')).toBe(true);
        expect(tabPanel('export').hasAttribute('hidden')).toBe(true);
      }
    );

    await step(
      'ArrowRight moves focus without changing the selection (manual activation)',
      async () => {
        tab('layers').focus();
        arrowKey(tab('layers'), 'ArrowRight');

        expect(shadowFocused(host)?.getAttribute('data-tab')).toBe(
          'adjustments'
        );
        expect(tab('adjustments').getAttribute('aria-selected')).toBe('false');
        expect(tab('layers').getAttribute('aria-selected')).toBe('true');
      }
    );

    await step('Enter on the focused tab selects it', async () => {
      const focused = shadowFocused(host) as HTMLButtonElement;
      expect(focused.getAttribute('data-tab')).toBe('adjustments');

      activate(focused, 'Enter');

      expect(tab('adjustments').getAttribute('aria-selected')).toBe('true');
      expect(tabPanel('adjustments').hasAttribute('hidden')).toBe(false);
      expect(tab('layers').getAttribute('aria-selected')).toBe('false');
      expect(tabPanel('layers').hasAttribute('hidden')).toBe(true);
    });

    await step('Space on a focused tab selects it', async () => {
      arrowKey(tab('adjustments'), 'ArrowRight');
      const focused = shadowFocused(host) as HTMLButtonElement;
      expect(focused.getAttribute('data-tab')).toBe('export');

      activate(focused, 'Space');

      expect(tab('export').getAttribute('aria-selected')).toBe('true');
      expect(tabPanel('export').hasAttribute('hidden')).toBe(false);
      expect(tab('adjustments').getAttribute('aria-selected')).toBe('false');
    });

    await step('pointer click directly selects the target tab', async () => {
      tab('layers').click();

      expect(tab('layers').getAttribute('aria-selected')).toBe('true');
      expect(tabPanel('layers').hasAttribute('hidden')).toBe(false);
      expect(tab('export').getAttribute('aria-selected')).toBe('false');
      expect(tabPanel('export').hasAttribute('hidden')).toBe(true);
    });

    await step('ArrowLeft wraps from first tab to last', async () => {
      tab('layers').focus();
      arrowKey(tab('layers'), 'ArrowLeft');

      expect(shadowFocused(host)?.getAttribute('data-tab')).toBe('export');
      expect(tab('layers').getAttribute('aria-selected')).toBe('true');
    });

    await step(
      'confirmSelectionChange runs after mutators — the listener sees the new selection',
      async () => {
        // 'layers' is selected entering this step (from the prior step).
        let ariaSelectedInHandler: string | null = null;
        let panelHiddenInHandler: boolean | null = null;
        host.addEventListener(
          DEMO_TAB_CHANGE_EVENT,
          () => {
            ariaSelectedInHandler =
              tab('adjustments').getAttribute('aria-selected');
            panelHiddenInHandler =
              tabPanel('adjustments').hasAttribute('hidden');
          },
          { once: true }
        );

        tab('adjustments').click();

        expect(
          ariaSelectedInHandler,
          'tab is already aria-selected inside the confirm handler'
        ).toBe('true');
        expect(
          panelHiddenInHandler,
          "tab's panel is already visible inside the confirm handler"
        ).toBe(false);
        expect(tab('adjustments').getAttribute('aria-selected')).toBe('true');
      }
    );

    await step(
      'canceling confirmSelectionChange reverts to the prior selection',
      async () => {
        // 'adjustments' is selected entering this step.
        host.addEventListener(
          DEMO_TAB_CHANGE_EVENT,
          (event) => event.preventDefault(),
          { once: true }
        );

        tab('export').click();

        expect(
          tab('export').getAttribute('aria-selected'),
          'clicked tab reverts to deselected'
        ).toBe('false');
        expect(
          tabPanel('export').hasAttribute('hidden'),
          "clicked tab's panel reverts to hidden"
        ).toBe(true);
        expect(
          tab('adjustments').getAttribute('aria-selected'),
          'prior selection is restored'
        ).toBe('true');
        expect(
          tabPanel('adjustments').hasAttribute('hidden'),
          "prior selection's panel is restored to visible"
        ).toBe(false);
      }
    );
  },
};
