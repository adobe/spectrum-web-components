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

import '../stories/demo-hosts.js';

import { getComponent } from '../../../../swc/utils/test-utils.js';
import {
  DEMO_TABLIST_CHANGE_EVENT,
  type DemoSelectionViewSwitcher,
} from '../stories/demo-hosts.js';
import selectionMeta, {
  Eligibility,
  ModeSwitching,
  MultipleMode,
  SingleMode,
  SingleToggleMode,
  TablistPattern,
} from '../stories/selection-controller.stories.js';

/**
 * Dispatches a keydown with both `key` and `code` set. The SelectionController checks
 * `event.key` for Enter/Space activation; `code` is included for parity with real events.
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

/** Dispatches an arrow-key keydown for `FocusgroupNavigationController` (checks `event.key`). */
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

export const SingleModeTest: Story = {
  ...SingleMode,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<DemoSelectionViewSwitcher>(
      canvasElement,
      'demo-selection-view-switcher'
    );
    const root = host.shadowRoot!;
    const views = Array.from(
      root.querySelectorAll<HTMLButtonElement>('[data-view]')
    );
    expect(views.length).toBe(3);

    await step(
      'defaultToFirstSelectable selects the first view on mount',
      async () => {
        expect(views[0].getAttribute('aria-checked')).toBe('true');
        expect(views[1].getAttribute('aria-checked')).toBe('false');
      }
    );

    await step('clicking a different view replaces the selection', async () => {
      views[1].click();
      expect(views[1].getAttribute('aria-checked')).toBe('true');
      expect(views[0].getAttribute('aria-checked')).toBe('false');
    });

    await step(
      'clicking the already-selected view again has no effect (single mode)',
      async () => {
        views[1].click();
        expect(views[1].getAttribute('aria-checked')).toBe('true');
      }
    );

    await step('Enter key selects the focused view', async () => {
      views[2].focus();
      activate(views[2], 'Enter');
      expect(views[2].getAttribute('aria-checked')).toBe('true');
      expect(views[1].getAttribute('aria-checked')).toBe('false');
    });

    await step('Space key selects the focused view', async () => {
      views[0].focus();
      activate(views[0], 'Space');
      expect(views[0].getAttribute('aria-checked')).toBe('true');
      expect(views[2].getAttribute('aria-checked')).toBe('false');
    });

    await step(
      'a { silent: true } call clears the selection despite single mode',
      async () => {
        // Interactively, single mode can't be emptied (asserted above via
        // re-click having no effect), but a silent programmatic clear — the
        // pattern a consumer uses to resync from an external property reset
        // to "nothing selected" — can still empty it.
        expect(views[0].getAttribute('aria-checked')).toBe('true');

        host.clearSelectionSilently();

        expect(
          views[0].getAttribute('aria-checked'),
          'previously selected view is deselected'
        ).toBe('false');
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// Single-toggle mode — clicking the selected item clears it
// ──────────────────────────────────────────────────────────────

export const SingleToggleModeTest: Story = {
  ...SingleToggleMode,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<HTMLElement>(
      canvasElement,
      'demo-selection-priority'
    );
    const root = host.shadowRoot!;
    const options = Array.from(
      root.querySelectorAll<HTMLButtonElement>('[data-priority]')
    );
    expect(options.length).toBe(3);

    await step('initially nothing is selected', async () => {
      for (const option of options) {
        expect(option.getAttribute('aria-checked')).toBe('false');
      }
    });

    await step('clicking Medium selects it', async () => {
      options[1].click();
      expect(options[1].getAttribute('aria-checked')).toBe('true');
    });

    await step(
      'clicking the active option again clears the selection',
      async () => {
        options[1].click();
        for (const option of options) {
          expect(option.getAttribute('aria-checked')).toBe('false');
        }
      }
    );

    await step(
      'clicking a different option replaces the selection',
      async () => {
        options[0].click();
        options[2].click();
        expect(options[2].getAttribute('aria-checked')).toBe('true');
        expect(options[0].getAttribute('aria-checked')).toBe('false');
      }
    );

    await step('Space on the active option clears the selection', async () => {
      options[2].focus();
      activate(options[2], 'Space');
      for (const option of options) {
        expect(option.getAttribute('aria-checked')).toBe('false');
      }
    });
  },
};

// ──────────────────────────────────────────────────────────────
// Multiple mode — independent toggles, selectAll, clearAll
// ──────────────────────────────────────────────────────────────

export const MultipleModeTest: Story = {
  ...MultipleMode,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<HTMLElement>(
      canvasElement,
      'demo-selection-filter-tags'
    );
    const root = host.shadowRoot!;
    const tags = Array.from(
      root.querySelectorAll<HTMLButtonElement>('[data-tag]')
    );
    expect(tags.length).toBe(5);

    const [selectAllBtn, clearBtn] = Array.from(
      root.querySelectorAll<HTMLButtonElement>('.action-btn')
    );

    await step('initially all tags are deselected', async () => {
      for (const tag of tags) {
        expect(tag.getAttribute('aria-pressed')).toBe('false');
      }
      expect(root.querySelector('.count')?.textContent?.trim()).toBe(
        'No filters selected'
      );
    });

    await step('clicking a tag selects it independently', async () => {
      tags[0].click();
      expect(tags[0].getAttribute('aria-pressed')).toBe('true');
      expect(tags[1].getAttribute('aria-pressed')).toBe('false');
    });

    await step('clicking another tag adds it to the selection', async () => {
      tags[2].click();
      expect(tags[0].getAttribute('aria-pressed')).toBe('true');
      expect(tags[2].getAttribute('aria-pressed')).toBe('true');
    });

    await step('clicking a selected tag deselects it (toggle)', async () => {
      tags[0].click();
      expect(tags[0].getAttribute('aria-pressed')).toBe('false');
      expect(tags[2].getAttribute('aria-pressed')).toBe('true');
    });

    await step(
      'onSelectionChange mirrors the count into the host',
      async () => {
        expect(root.querySelector('.count')?.textContent?.trim()).toBe(
          '1 filter selected'
        );
      }
    );

    await step('selectAll selects every tag', async () => {
      selectAllBtn.click();
      for (const tag of tags) {
        expect(tag.getAttribute('aria-pressed')).toBe('true');
      }
      expect(root.querySelector('.count')?.textContent?.trim()).toBe(
        '5 filters selected'
      );
    });

    await step('clearAll deselects every tag', async () => {
      clearBtn.click();
      for (const tag of tags) {
        expect(tag.getAttribute('aria-pressed')).toBe('false');
      }
      expect(root.querySelector('.count')?.textContent?.trim()).toBe(
        'No filters selected'
      );
    });

    await step('Enter key toggles a focused tag in multiple mode', async () => {
      tags[1].focus();
      activate(tags[1], 'Enter');
      expect(tags[1].getAttribute('aria-pressed')).toBe('true');
    });
  },
};

// ──────────────────────────────────────────────────────────────
// Runtime mode switch via setOptions
// ──────────────────────────────────────────────────────────────

export const ModeSwitchingTest: Story = {
  ...ModeSwitching,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<HTMLElement>(
      canvasElement,
      'demo-selection-mode-switcher'
    );
    const root = host.shadowRoot!;

    const trigger = (key: string): HTMLButtonElement =>
      root.querySelector<HTMLButtonElement>(`[data-panel-trigger="${key}"]`)!;
    const body = (key: string): HTMLElement =>
      root.querySelector<HTMLElement>(`[data-panel-body="${key}"]`)!;
    const modeBtn = (mode: string): HTMLButtonElement => {
      const btn = Array.from(
        root.querySelectorAll<HTMLButtonElement>('.mode-btn')
      ).find((b) => b.textContent?.trim() === mode);
      expect(btn).toBeTruthy();
      return btn!;
    };

    await step(
      'starts in single-toggle mode with everything collapsed',
      async () => {
        expect(trigger('general').getAttribute('aria-expanded')).toBe('false');
        expect(body('general').hidden).toBe(true);
      }
    );

    await step('clicking a trigger opens its panel', async () => {
      trigger('general').click();
      expect(trigger('general').getAttribute('aria-expanded')).toBe('true');
      expect(body('general').hidden).toBe(false);
    });

    await step(
      'single-toggle: clicking a different trigger closes the first',
      async () => {
        trigger('appearance').click();
        expect(trigger('appearance').getAttribute('aria-expanded')).toBe(
          'true'
        );
        expect(trigger('general').getAttribute('aria-expanded')).toBe('false');
      }
    );

    await step(
      'switching to multiple mode: several panels can open at once',
      async () => {
        modeBtn('multiple').click();

        trigger('general').click();
        trigger('privacy').click();

        expect(trigger('general').getAttribute('aria-expanded')).toBe('true');
        expect(trigger('appearance').getAttribute('aria-expanded')).toBe(
          'true'
        );
        expect(trigger('privacy').getAttribute('aria-expanded')).toBe('true');
      }
    );

    await step(
      'switching back to single collapses to only the first selected panel',
      async () => {
        modeBtn('single').click();

        // "First" means first inserted into the selection cache, not first
        // clicked in this step: "appearance" was already selected before the
        // switch to multiple mode, so it is first in insertion order even
        // though "general" and "privacy" were clicked more recently.
        const openCount = ['general', 'appearance', 'privacy'].filter(
          (key) => trigger(key).getAttribute('aria-expanded') === 'true'
        ).length;
        expect(openCount).toBe(1);
        expect(trigger('appearance').getAttribute('aria-expanded')).toBe(
          'true'
        );
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// Tablist: SelectionController + FocusgroupNavigationController
// ──────────────────────────────────────────────────────────────

export const TablistPatternTest: Story = {
  ...TablistPattern,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<HTMLElement>(
      canvasElement,
      'demo-selection-tablist'
    );
    const root = host.shadowRoot!;

    const tab = (key: string): HTMLButtonElement =>
      root.querySelector<HTMLButtonElement>(`[data-tab="${key}"]`)!;
    const panel = (key: string): HTMLElement =>
      root.querySelector<HTMLElement>(`[data-tab-panel="${key}"]`)!;

    await step(
      'defaultToFirstSelectable selects the first tab on mount',
      async () => {
        expect(tab('layers').getAttribute('aria-selected')).toBe('true');
        expect(tab('adjustments').getAttribute('aria-selected')).toBe('false');
        expect(panel('layers').hidden).toBe(false);
        expect(panel('adjustments').hidden).toBe(true);
      }
    );

    await step(
      'ArrowRight moves focus without changing the selection',
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
      expect(panel('adjustments').hidden).toBe(false);
      expect(tab('layers').getAttribute('aria-selected')).toBe('false');
      expect(panel('layers').hidden).toBe(true);
    });

    await step('pointer click directly selects the target tab', async () => {
      tab('export').click();

      expect(tab('export').getAttribute('aria-selected')).toBe('true');
      expect(panel('export').hidden).toBe(false);
      expect(tab('adjustments').getAttribute('aria-selected')).toBe('false');
    });

    await step('ArrowLeft wraps from first tab to last', async () => {
      tab('layers').focus();
      arrowKey(tab('layers'), 'ArrowLeft');

      expect(shadowFocused(host)?.getAttribute('data-tab')).toBe('export');
    });

    await step(
      'read-your-write: confirmSelectionChange runs after mutators, so a listener sees the new selection',
      async () => {
        // 'export' is selected entering this step.
        let ariaSelectedInHandler: string | null = null;
        let panelHiddenInHandler: boolean | null = null;
        host.addEventListener(
          DEMO_TABLIST_CHANGE_EVENT,
          () => {
            ariaSelectedInHandler = tab('layers').getAttribute('aria-selected');
            panelHiddenInHandler = panel('layers').hidden;
          },
          { once: true }
        );

        tab('layers').click();

        expect(
          ariaSelectedInHandler,
          'tab is already aria-selected inside the confirm handler'
        ).toBe('true');
        expect(
          panelHiddenInHandler,
          "tab's panel is already visible inside the confirm handler"
        ).toBe(false);
      }
    );

    await step(
      'canceling confirmSelectionChange reverts to the prior selection',
      async () => {
        // 'layers' is selected entering this step.
        host.addEventListener(
          DEMO_TABLIST_CHANGE_EVENT,
          (event) => event.preventDefault(),
          { once: true }
        );

        tab('export').click();

        expect(
          tab('export').getAttribute('aria-selected'),
          'clicked tab reverts to deselected'
        ).toBe('false');
        expect(
          panel('export').hidden,
          "clicked tab's panel reverts to hidden"
        ).toBe(true);
        expect(
          tab('layers').getAttribute('aria-selected'),
          'prior selection is restored'
        ).toBe('true');
        expect(
          panel('layers').hidden,
          "prior selection's panel is restored to visible"
        ).toBe(false);
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// Eligibility — disabled, hidden, custom isDisabled; guard conditions
// ──────────────────────────────────────────────────────────────

export const EligibilityTest: Story = {
  ...Eligibility,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<HTMLElement>(
      canvasElement,
      'demo-selection-eligibility'
    );
    const root = host.shadowRoot!;
    const normal = root.querySelector<HTMLButtonElement>(
      '[data-elig="normal"]'
    )!;
    const disabled = root.querySelector<HTMLButtonElement>(
      '[data-elig="disabled"]'
    )!;
    const hidden = root.querySelector<HTMLButtonElement>(
      '[data-elig="hidden"]'
    )!;
    const locked = root.querySelector<HTMLButtonElement>(
      '[data-elig="locked"]'
    )!;

    await step('clicking a native disabled item has no effect', async () => {
      disabled.click();
      expect(disabled.getAttribute('aria-pressed')).toBe('false');
    });

    await step('clicking a hidden item has no effect', async () => {
      // A native `hidden` attribute makes the element non-clickable in a
      // real browser (display: none), but the controller's eligibility
      // check also rejects it directly if a synthetic click still reaches it.
      hidden.click();
      expect(hidden.getAttribute('aria-pressed')).toBe('false');
    });

    await step(
      'clicking an item excluded by a custom isDisabled has no effect',
      async () => {
        locked.click();
        expect(locked.getAttribute('aria-pressed')).toBe('false');
      }
    );

    await step('clicking a normal item still works', async () => {
      normal.click();
      expect(normal.getAttribute('aria-pressed')).toBe('true');
      normal.click();
      expect(normal.getAttribute('aria-pressed')).toBe('false');
    });

    await step(
      'Enter on a disabled item (via a custom isDisabled) has no effect',
      async () => {
        locked.focus();
        activate(locked, 'Enter');
        expect(locked.getAttribute('aria-pressed')).toBe('false');
      }
    );

    await step('a non-primary mouse button click is ignored', async () => {
      normal.dispatchEvent(
        new MouseEvent('click', { bubbles: true, composed: true, button: 1 })
      );
      expect(normal.getAttribute('aria-pressed')).toBe('false');
    });

    await step('a modifier-key click is ignored', async () => {
      normal.dispatchEvent(
        new MouseEvent('click', {
          bubbles: true,
          composed: true,
          button: 0,
          ctrlKey: true,
        })
      );
      expect(normal.getAttribute('aria-pressed')).toBe('false');
    });

    await step(
      'a repeated keydown (held key) does not re-trigger activation',
      async () => {
        normal.focus();
        normal.dispatchEvent(
          new KeyboardEvent('keydown', {
            key: 'Enter',
            bubbles: true,
            composed: true,
            cancelable: true,
            repeat: true,
          })
        );
        expect(normal.getAttribute('aria-pressed')).toBe('false');
      }
    );
  },
};
