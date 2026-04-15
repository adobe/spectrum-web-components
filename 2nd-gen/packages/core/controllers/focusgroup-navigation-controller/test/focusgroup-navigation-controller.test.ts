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
import { expect } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import '../stories/demo-hosts.js';

import { getComponent } from '../../../../swc/utils/test-utils.js';
import {
  focusgroupNavigationActiveChange,
  type FocusgroupNavigationActiveChangeDetail,
} from '../index.js';
import type {
  DemoFocusgroupDisabledHost,
  DemoFocusgroupDynamic,
  DemoFocusgroupEventTracker,
  DemoFocusgroupPlayground,
  DemoFocusgroupProgrammatic,
  DemoFocusgroupTextPrefix,
} from '../stories/demo-hosts.js';
import focusMeta, {
  BothAxesLinear,
  Grid,
  HorizontalToolbar,
  ProgrammaticFocus,
  SkipDisabledMenu,
  TextPrefixFocus,
  VerticalMenu,
} from '../stories/focusgroup-navigation-controller.stories.js';

type KeydownOptions = {
  ctrlKey?: boolean;
};

/**
 * Dispatches a composed `keydown` so listeners on the shadow host receive it like a real keystroke.
 *
 * @param target - Element to dispatch from (typically the focused control inside the host).
 * @param key - `KeyboardEvent.key` value.
 * @param options - Optional modifier keys.
 */
function keydown(
  target: HTMLElement,
  key: string,
  options?: KeydownOptions
): void {
  target.dispatchEvent(
    new KeyboardEvent('keydown', {
      key,
      bubbles: true,
      composed: true,
      cancelable: true,
      ctrlKey: options?.ctrlKey ?? false,
    })
  );
}

/** Returns the focused element inside the host shadow root, if any. */
function shadowActiveButton(host: HTMLElement): HTMLButtonElement | null {
  const root = host.shadowRoot;
  const active = root?.activeElement;
  return active instanceof HTMLButtonElement ? active : null;
}

export default {
  ...focusMeta,
  title: 'Focus group navigation controller/Tests',
  parameters: {
    ...focusMeta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

// ──────────────────────────────────────────────────────────────
// Horizontal toolbar (ArrowLeft / ArrowRight, wrap)
// ──────────────────────────────────────────────────────────────

export const HorizontalToolbarArrowNavigation: Story = {
  ...HorizontalToolbar,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<HTMLElement>(
      canvasElement,
      'demo-focusgroup-horizontal'
    );

    await step('ArrowRight moves forward along the toolbar', async () => {
      const root = host.shadowRoot;
      expect(root).toBeTruthy();
      const first = root!.querySelector<HTMLButtonElement>('button');
      expect(first?.textContent?.trim()).toBe('Bold');
      first!.focus();
      expect(shadowActiveButton(host)?.textContent?.trim()).toBe('Bold');

      keydown(first!, 'ArrowRight');
      expect(shadowActiveButton(host)?.textContent?.trim()).toBe('Italic');

      keydown(shadowActiveButton(host)!, 'ArrowRight');
      expect(shadowActiveButton(host)?.textContent?.trim()).toBe('Underline');

      keydown(shadowActiveButton(host)!, 'ArrowRight');
      expect(shadowActiveButton(host)?.textContent?.trim()).toBe(
        'Strikethrough'
      );
    });

    await step('ArrowLeft moves backward', async () => {
      keydown(shadowActiveButton(host)!, 'ArrowLeft');
      expect(shadowActiveButton(host)?.textContent?.trim()).toBe('Underline');
    });

    await step('wrap: ArrowRight from last item returns to first', async () => {
      while (
        shadowActiveButton(host)?.textContent?.trim() !== 'Strikethrough'
      ) {
        keydown(shadowActiveButton(host)!, 'ArrowRight');
      }
      keydown(shadowActiveButton(host)!, 'ArrowRight');
      expect(shadowActiveButton(host)?.textContent?.trim()).toBe('Bold');
    });
  },
};

// ──────────────────────────────────────────────────────────────
// Both axes (horizontal + vertical arrows on one linear order)
// ──────────────────────────────────────────────────────────────

export const BothAxesLinearArrowNavigation: Story = {
  ...BothAxesLinear,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<HTMLElement>(
      canvasElement,
      'demo-focusgroup-both-axes'
    );

    await step(
      'ArrowRight and ArrowDown both advance in getItems() order',
      async () => {
        const root = host.shadowRoot;
        expect(root).toBeTruthy();
        const first = root!.querySelector<HTMLButtonElement>('button');
        expect(first?.textContent?.trim()).toBe('Start');
        first!.focus();

        keydown(first!, 'ArrowRight');
        expect(shadowActiveButton(host)?.textContent?.trim()).toBe('Section A');

        keydown(shadowActiveButton(host)!, 'ArrowDown');
        expect(shadowActiveButton(host)?.textContent?.trim()).toBe('Section B');
      }
    );

    await step('ArrowLeft and ArrowUp both move backward', async () => {
      keydown(shadowActiveButton(host)!, 'ArrowLeft');
      expect(shadowActiveButton(host)?.textContent?.trim()).toBe('Section A');

      keydown(shadowActiveButton(host)!, 'ArrowUp');
      expect(shadowActiveButton(host)?.textContent?.trim()).toBe('Start');
    });

    await step('wrap: ArrowDown from last item returns to first', async () => {
      while (shadowActiveButton(host)?.textContent?.trim() !== 'End') {
        keydown(shadowActiveButton(host)!, 'ArrowDown');
      }
      keydown(shadowActiveButton(host)!, 'ArrowDown');
      expect(shadowActiveButton(host)?.textContent?.trim()).toBe('Start');
    });
  },
};

// ──────────────────────────────────────────────────────────────
// Vertical menu (ArrowDown through aria-disabled item)
// ──────────────────────────────────────────────────────────────

export const VerticalMenuArrowNavigation: Story = {
  ...VerticalMenu,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<HTMLElement>(
      canvasElement,
      'demo-focusgroup-vertical'
    );

    await step(
      'ArrowDown reaches each item including aria-disabled and last item',
      async () => {
        const root = host.shadowRoot;
        expect(root).toBeTruthy();
        const first = root!.querySelector<HTMLButtonElement>('button');
        expect(first?.textContent?.trim()).toBe('Copy');
        first!.focus();

        keydown(first!, 'ArrowDown');
        expect(shadowActiveButton(host)?.textContent?.trim()).toBe('Paste');

        keydown(shadowActiveButton(host)!, 'ArrowDown');
        expect(shadowActiveButton(host)?.textContent?.trim()).toBe(
          'Cut (unavailable)'
        );
        expect(shadowActiveButton(host)?.getAttribute('aria-disabled')).toBe(
          'true'
        );

        keydown(shadowActiveButton(host)!, 'ArrowDown');
        expect(shadowActiveButton(host)?.textContent?.trim()).toBe(
          'Select all'
        );
      }
    );

    await step('ArrowUp moves back through the list', async () => {
      keydown(shadowActiveButton(host)!, 'ArrowUp');
      expect(shadowActiveButton(host)?.textContent?.trim()).toBe(
        'Cut (unavailable)'
      );
    });

    await step(
      'Page Down skips two items; Page Up moves back two',
      async () => {
        const root = host.shadowRoot!;
        root.querySelector<HTMLButtonElement>('button')!.focus();
        expect(shadowActiveButton(host)?.textContent?.trim()).toBe('Copy');

        keydown(shadowActiveButton(host)!, 'PageDown');
        expect(shadowActiveButton(host)?.textContent?.trim()).toBe(
          'Cut (unavailable)'
        );

        root.querySelectorAll<HTMLButtonElement>('button')[3]!.focus();
        expect(shadowActiveButton(host)?.textContent?.trim()).toBe(
          'Select all'
        );

        keydown(shadowActiveButton(host)!, 'PageUp');
        expect(shadowActiveButton(host)?.textContent?.trim()).toBe('Paste');
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// Skip disabled (native disabled + aria-disabled omitted from arrows)
// ──────────────────────────────────────────────────────────────

export const SkipDisabledMenuArrowNavigation: Story = {
  ...SkipDisabledMenu,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<HTMLElement>(
      canvasElement,
      'demo-focusgroup-skip-disabled'
    );
    const root = host.shadowRoot!;
    const buttonByLabel = (label: string): HTMLButtonElement => {
      const b = Array.from(
        root.querySelectorAll<HTMLButtonElement>('button')
      ).find((btn) => btn.textContent?.trim() === label);
      expect(b).toBeTruthy();
      return b!;
    };

    await step(
      'skipped items use tabindex -1 and are disabled or aria-disabled',
      async () => {
        const save = buttonByLabel('Save');
        const close = buttonByLabel('Close');
        expect(save.disabled).toBe(true);
        expect(close.getAttribute('aria-disabled')).toBe('true');
        expect(save.tabIndex).toBe(-1);
        expect(close.tabIndex).toBe(-1);
      }
    );

    await step(
      'ArrowDown visits every enabled item in order then wraps to first',
      async () => {
        buttonByLabel('New').focus();
        const visited: string[] = [];
        for (let i = 0; i < 5; i++) {
          visited.push(shadowActiveButton(host)!.textContent!.trim());
          keydown(shadowActiveButton(host)!, 'ArrowDown');
        }
        expect(visited).toEqual(['New', 'Open', 'Print', 'Help', 'New']);
      }
    );

    await step('ArrowUp from first enabled wraps to last enabled', async () => {
      buttonByLabel('New').focus();
      keydown(shadowActiveButton(host)!, 'ArrowUp');
      expect(shadowActiveButton(host)?.textContent?.trim()).toBe('Help');
    });

    await step('many arrow steps never focus Save or Close', async () => {
      buttonByLabel('New').focus();
      for (let i = 0; i < 16; i++) {
        const label = shadowActiveButton(host)?.textContent?.trim();
        expect(label).not.toBe('Save');
        expect(label).not.toBe('Close');
        keydown(shadowActiveButton(host)!, 'ArrowDown');
      }
    });

    await step('Home and End stay within eligible items only', async () => {
      buttonByLabel('Print').focus();
      keydown(shadowActiveButton(host)!, 'Home');
      expect(shadowActiveButton(host)?.textContent?.trim()).toBe('New');
      keydown(shadowActiveButton(host)!, 'End');
      expect(shadowActiveButton(host)?.textContent?.trim()).toBe('Help');
    });
  },
};

// ──────────────────────────────────────────────────────────────
// Grid (spatial arrows, Home / End)
// ──────────────────────────────────────────────────────────────

export const GridArrowNavigation: Story = {
  ...Grid,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<HTMLElement>(
      canvasElement,
      'demo-focusgroup-grid'
    );

    const cell = (label: string): HTMLButtonElement => {
      const root = host.shadowRoot!;
      const buttons = Array.from(
        root.querySelectorAll<HTMLButtonElement>('.grid button')
      );
      const b = buttons.find((btn) => btn.textContent?.trim() === label);
      expect(b).toBeTruthy();
      return b!;
    };

    await step(
      'from center cell 5, arrows move to geometric neighbors',
      async () => {
        const c5 = cell('5');
        c5.focus();
        expect(shadowActiveButton(host)?.textContent?.trim()).toBe('5');

        keydown(c5, 'ArrowLeft');
        expect(shadowActiveButton(host)?.textContent?.trim()).toBe('4');

        keydown(shadowActiveButton(host)!, 'ArrowRight');
        expect(shadowActiveButton(host)?.textContent?.trim()).toBe('5');

        keydown(shadowActiveButton(host)!, 'ArrowUp');
        expect(shadowActiveButton(host)?.textContent?.trim()).toBe('2');

        keydown(shadowActiveButton(host)!, 'ArrowDown');
        expect(shadowActiveButton(host)?.textContent?.trim()).toBe('5');

        keydown(shadowActiveButton(host)!, 'ArrowDown');
        expect(shadowActiveButton(host)?.textContent?.trim()).toBe('8');
      }
    );

    await step(
      'Home and End scope to the current row per APG grid pattern',
      async () => {
        cell('5').focus();
        keydown(shadowActiveButton(host)!, 'Home');
        expect(shadowActiveButton(host)?.textContent?.trim()).toBe('4');

        keydown(shadowActiveButton(host)!, 'End');
        expect(shadowActiveButton(host)?.textContent?.trim()).toBe('6');

        cell('8').focus();
        keydown(shadowActiveButton(host)!, 'Home');
        expect(shadowActiveButton(host)?.textContent?.trim()).toBe('7');

        keydown(shadowActiveButton(host)!, 'End');
        expect(shadowActiveButton(host)?.textContent?.trim()).toBe('9');
      }
    );

    await step(
      'Ctrl+Home and Ctrl+End jump to first cell of first row and last cell of last row',
      async () => {
        cell('8').focus();
        keydown(shadowActiveButton(host)!, 'Home', { ctrlKey: true });
        expect(shadowActiveButton(host)?.textContent?.trim()).toBe('1');

        cell('2').focus();
        keydown(shadowActiveButton(host)!, 'End', { ctrlKey: true });
        expect(shadowActiveButton(host)?.textContent?.trim()).toBe('9');
      }
    );

    await step(
      'Page Down moves two rows; Page Up moves back two rows',
      async () => {
        cell('1').focus();
        keydown(shadowActiveButton(host)!, 'PageDown');
        expect(shadowActiveButton(host)?.textContent?.trim()).toBe('7');

        keydown(shadowActiveButton(host)!, 'PageUp');
        expect(shadowActiveButton(host)?.textContent?.trim()).toBe('1');
      }
    );

    await step(
      'Page Down past last row clamps to last row (same column clamped)',
      async () => {
        cell('5').focus();
        keydown(shadowActiveButton(host)!, 'PageDown');
        expect(shadowActiveButton(host)?.textContent?.trim()).toBe('8');
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// Programmatic focus + horizontal arrows without wrap
// ──────────────────────────────────────────────────────────────

export const ProgrammaticFocusAndArrows: Story = {
  ...ProgrammaticFocus,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<DemoFocusgroupProgrammatic>(
      canvasElement,
      'demo-focusgroup-programmatic'
    );

    await step('ArrowRight moves only among toolbar items A–C', async () => {
      const root = host.shadowRoot;
      expect(root).toBeTruthy();
      const itemA = root!.querySelector<HTMLButtonElement>('[data-item="a"]');
      expect(itemA).toBeTruthy();
      itemA!.focus();
      expect(shadowActiveButton(host)?.getAttribute('data-item')).toBe('a');

      keydown(itemA!, 'ArrowRight');
      expect(shadowActiveButton(host)?.getAttribute('data-item')).toBe('b');

      keydown(shadowActiveButton(host)!, 'ArrowRight');
      expect(shadowActiveButton(host)?.getAttribute('data-item')).toBe('c');
    });

    await step(
      'no wrap: ArrowRight from last toolbar item stays on C',
      async () => {
        keydown(shadowActiveButton(host)!, 'ArrowRight');
        expect(shadowActiveButton(host)?.getAttribute('data-item')).toBe('c');
      }
    );

    await step(
      'setActiveItem plus focus updates roving tabindex and arrow navigation',
      async () => {
        host.focusProgrammaticTarget();
        await Promise.resolve();
        expect(host.focusTarget).toBe('c');
        expect(shadowActiveButton(host)?.getAttribute('data-item')).toBe('c');

        keydown(shadowActiveButton(host)!, 'ArrowLeft');
        expect(shadowActiveButton(host)?.getAttribute('data-item')).toBe('b');
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// Text prefix / typeahead (focusFirstItemByTextPrefix)
// ──────────────────────────────────────────────────────────────

export const TextPrefixFocusNavigation: Story = {
  ...TextPrefixFocus,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<DemoFocusgroupTextPrefix>(
      canvasElement,
      'demo-focusgroup-text-prefix'
    );

    await step(
      'prefix "c" focuses Copy (first eligible match in order)',
      async () => {
        expect(host.focusByTextPrefix('c')).toBe(true);
        expect(shadowActiveButton(host)?.textContent?.trim()).toBe('Copy');
      }
    );

    await step('longer prefix "cu" focuses Cut', async () => {
      expect(host.focusByTextPrefix('cu')).toBe(true);
      expect(shadowActiveButton(host)?.textContent?.trim()).toBe('Cut');
    });

    await step('prefix is case-insensitive and trim-aware', async () => {
      expect(host.focusByTextPrefix('  PAS  ')).toBe(true);
      expect(shadowActiveButton(host)?.textContent?.trim()).toBe('Paste');

      expect(host.focusByTextPrefix('SEL')).toBe(true);
      expect(shadowActiveButton(host)?.textContent?.trim()).toBe('Select all');
    });

    await step('aria-label is used when present (icon-only item)', async () => {
      expect(host.focusByTextPrefix('un')).toBe(true);
      expect(shadowActiveButton(host)?.getAttribute('aria-label')).toBe('Undo');
    });

    await step(
      'whitespace-only prefix returns false without changing focus',
      async () => {
        host.focusByTextPrefix('Paste');
        expect(shadowActiveButton(host)?.textContent?.trim()).toBe('Paste');
        expect(host.focusByTextPrefix('   ')).toBe(false);
        expect(shadowActiveButton(host)?.textContent?.trim()).toBe('Paste');
      }
    );

    await step('no match returns false', async () => {
      expect(host.focusByTextPrefix('zzz')).toBe(false);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// Memory: Tab re-entry remembers last focused item (#25)
// ──────────────────────────────────────────────────────────────

export const MemoryTabReentry: Story = {
  ...HorizontalToolbar,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<HTMLElement>(
      canvasElement,
      'demo-focusgroup-horizontal'
    );
    const root = host.shadowRoot!;
    const buttons = Array.from(
      root.querySelectorAll<HTMLButtonElement>('button')
    );

    await step(
      'after navigating to third item, tabindex=0 remains on that item when focus leaves',
      async () => {
        buttons[0].focus();
        expect(shadowActiveButton(host)?.textContent?.trim()).toBe('Bold');

        keydown(buttons[0], 'ArrowRight');
        expect(shadowActiveButton(host)?.textContent?.trim()).toBe('Italic');

        keydown(shadowActiveButton(host)!, 'ArrowRight');
        expect(shadowActiveButton(host)?.textContent?.trim()).toBe('Underline');

        (document.activeElement as HTMLElement)?.blur();

        const tabbable = buttons.filter((b) => b.tabIndex === 0);
        expect(tabbable.length).toBe(1);
        expect(tabbable[0].textContent?.trim()).toBe('Underline');
      }
    );

    await step(
      'Tab re-entry to the group lands on the remembered item',
      async () => {
        const remembered = buttons.find((b) => b.tabIndex === 0);
        expect(remembered).toBeTruthy();
        remembered!.focus();
        expect(shadowActiveButton(host)?.textContent?.trim()).toBe('Underline');

        keydown(shadowActiveButton(host)!, 'ArrowRight');
        expect(shadowActiveButton(host)?.textContent?.trim()).toBe(
          'Strikethrough'
        );
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// RTL: ArrowLeft/ArrowRight swap in dir="rtl" context (#26)
// ──────────────────────────────────────────────────────────────

export const RTLArrowNavigation: Story = {
  render: () => html`
    <div dir="rtl">
      <demo-focusgroup-horizontal
        role="toolbar"
        aria-label="RTL toolbar"
      ></demo-focusgroup-horizontal>
    </div>
  `,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<HTMLElement>(
      canvasElement,
      'demo-focusgroup-horizontal'
    );
    const root = host.shadowRoot!;
    const first = root.querySelector<HTMLButtonElement>('button')!;

    await step('ArrowLeft moves forward in RTL', async () => {
      first.focus();
      expect(shadowActiveButton(host)?.textContent?.trim()).toBe('Bold');

      keydown(first, 'ArrowLeft');
      expect(shadowActiveButton(host)?.textContent?.trim()).toBe('Italic');

      keydown(shadowActiveButton(host)!, 'ArrowLeft');
      expect(shadowActiveButton(host)?.textContent?.trim()).toBe('Underline');
    });

    await step('ArrowRight moves backward in RTL', async () => {
      keydown(shadowActiveButton(host)!, 'ArrowRight');
      expect(shadowActiveButton(host)?.textContent?.trim()).toBe('Italic');

      keydown(shadowActiveButton(host)!, 'ArrowRight');
      expect(shadowActiveButton(host)?.textContent?.trim()).toBe('Bold');
    });

    await step(
      'wrap still works: ArrowRight from first wraps to last',
      async () => {
        keydown(shadowActiveButton(host)!, 'ArrowRight');
        expect(shadowActiveButton(host)?.textContent?.trim()).toBe(
          'Strikethrough'
        );
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// CSS-inherited RTL: direction via CSS, no dir attribute (#26b)
// ──────────────────────────────────────────────────────────────

export const CSSInheritedRTL: Story = {
  render: () => html`
    <div style="direction: rtl">
      <demo-focusgroup-horizontal
        role="toolbar"
        aria-label="CSS RTL toolbar"
      ></demo-focusgroup-horizontal>
    </div>
  `,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<HTMLElement>(
      canvasElement,
      'demo-focusgroup-horizontal'
    );
    const root = host.shadowRoot!;
    const first = root.querySelector<HTMLButtonElement>('button')!;

    await step(
      'ArrowLeft moves forward when RTL is set via CSS (no dir attribute)',
      async () => {
        first.focus();
        expect(shadowActiveButton(host)?.textContent?.trim()).toBe('Bold');

        keydown(first, 'ArrowLeft');
        expect(shadowActiveButton(host)?.textContent?.trim()).toBe('Italic');
      }
    );

    await step(
      'ArrowRight moves backward when RTL is set via CSS (no dir attribute)',
      async () => {
        keydown(shadowActiveButton(host)!, 'ArrowRight');
        expect(shadowActiveButton(host)?.textContent?.trim()).toBe('Bold');
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// Dynamic items: refresh() after adding/removing items (#27)
// ──────────────────────────────────────────────────────────────

export const DynamicItemRefresh: Story = {
  render: () => html`
    <demo-focusgroup-dynamic
      role="toolbar"
      aria-label="Dynamic toolbar"
    ></demo-focusgroup-dynamic>
  `,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<DemoFocusgroupDynamic>(
      canvasElement,
      'demo-focusgroup-dynamic'
    );
    const root = host.shadowRoot!;

    await step('initial items have correct roving tabindex', async () => {
      const buttons = Array.from(
        root.querySelectorAll<HTMLButtonElement>('button')
      );
      expect(buttons.length).toBe(4);
      const tabbable = buttons.filter((b) => b.tabIndex === 0);
      expect(tabbable.length).toBe(1);
    });

    await step(
      'removing items and calling refresh reassigns tabindex',
      async () => {
        host.items = ['Epsilon', 'Zeta'];
        await host.updateComplete;

        const buttons = Array.from(
          root.querySelectorAll<HTMLButtonElement>('button')
        );
        expect(buttons.length).toBe(2);
        const tabbable = buttons.filter((b) => b.tabIndex === 0);
        expect(tabbable.length).toBe(1);
        expect(tabbable[0].textContent?.trim()).toBe('Epsilon');
      }
    );

    await step(
      'adding items back and refreshing preserves navigation',
      async () => {
        host.items = ['Epsilon', 'Zeta', 'Eta'];
        await host.updateComplete;

        const buttons = Array.from(
          root.querySelectorAll<HTMLButtonElement>('button')
        );
        expect(buttons.length).toBe(3);

        buttons[0].focus();
        keydown(buttons[0], 'ArrowRight');
        expect(shadowActiveButton(host)?.textContent?.trim()).toBe('Zeta');

        keydown(shadowActiveButton(host)!, 'ArrowRight');
        expect(shadowActiveButton(host)?.textContent?.trim()).toBe('Eta');

        keydown(shadowActiveButton(host)!, 'ArrowRight');
        expect(shadowActiveButton(host)?.textContent?.trim()).toBe('Epsilon');
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// onActiveItemChange callback and custom event (#28, #29)
// ──────────────────────────────────────────────────────────────

export const ActiveChangeEventAndCallback: Story = {
  render: () => html`
    <demo-focusgroup-event-tracker
      role="toolbar"
      aria-label="Event tracker toolbar"
    ></demo-focusgroup-event-tracker>
  `,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<DemoFocusgroupEventTracker>(
      canvasElement,
      'demo-focusgroup-event-tracker'
    );
    const root = host.shadowRoot!;
    const buttons = Array.from(
      root.querySelectorAll<HTMLButtonElement>('button')
    );

    await step(
      'custom event fires with correct detail on arrow navigation',
      async () => {
        host.clearLogs();
        buttons[0].focus();
        keydown(buttons[0], 'ArrowRight');

        expect(host.activeChangeLog.length).toBeGreaterThan(0);
        expect(host.activeChangeLog).toContain('Second');
      }
    );

    await step(
      'onActiveItemChange callback fires alongside event',
      async () => {
        host.clearLogs();
        buttons[0].focus();
        keydown(buttons[0], 'ArrowRight');

        expect(host.callbackLog.length).toBeGreaterThan(0);
        expect(host.callbackLog).toContain('Second');
      }
    );

    await step('event detail has correct activeElement reference', async () => {
      let receivedDetail: FocusgroupNavigationActiveChangeDetail | null = null;
      const handler = ((
        event: CustomEvent<FocusgroupNavigationActiveChangeDetail>
      ) => {
        receivedDetail = event.detail;
      }) as EventListener;

      host.addEventListener(focusgroupNavigationActiveChange, handler);

      buttons[0].focus();
      keydown(buttons[0], 'ArrowRight');

      expect(receivedDetail).toBeTruthy();
      expect(receivedDetail!.activeElement).toBeInstanceOf(HTMLButtonElement);
      expect(receivedDetail!.activeElement?.textContent?.trim()).toBe('Second');

      host.removeEventListener(focusgroupNavigationActiveChange, handler);
    });

    await step('event bubbles and is composed', async () => {
      let captured = false;
      const handler = ((event: CustomEvent) => {
        expect(event.bubbles).toBe(true);
        expect(event.composed).toBe(true);
        captured = true;
      }) as EventListener;

      canvasElement.addEventListener(focusgroupNavigationActiveChange, handler);

      buttons[0].focus();
      keydown(buttons[0], 'ArrowRight');

      expect(captured).toBe(true);

      canvasElement.removeEventListener(
        focusgroupNavigationActiveChange,
        handler
      );
    });
  },
};

// ──────────────────────────────────────────────────────────────
// setOptions: dynamic direction change at runtime (#30)
// ──────────────────────────────────────────────────────────────

export const SetOptionsDirectionChange: Story = {
  render: () => html`
    <demo-focusgroup-playground
      .direction=${'horizontal'}
      .wrap=${true}
    ></demo-focusgroup-playground>
  `,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<HTMLElement>(
      canvasElement,
      'demo-focusgroup-playground'
    );
    const root = host.shadowRoot!;

    await step(
      'horizontal mode: ArrowRight moves forward, ArrowDown does nothing',
      async () => {
        const first = root.querySelector<HTMLButtonElement>('button')!;
        first.focus();
        expect(shadowActiveButton(host)?.textContent?.trim()).toBe('Bold');

        keydown(first, 'ArrowRight');
        const afterRight = shadowActiveButton(host)?.textContent?.trim();
        expect(afterRight).toBe('Italic');

        keydown(shadowActiveButton(host)!, 'ArrowDown');
        const afterDown = shadowActiveButton(host)?.textContent?.trim();
        expect(afterDown).toBe('Italic');
      }
    );

    await step(
      'switching to both via property: ArrowDown now moves forward',
      async () => {
        (host as DemoFocusgroupPlayground).direction = 'both';
        await (host as DemoFocusgroupPlayground).updateComplete;

        const current = shadowActiveButton(host)!;
        keydown(current, 'ArrowDown');
        const afterDown = shadowActiveButton(host)?.textContent?.trim();
        expect(afterDown).not.toBe(current.textContent?.trim());
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// Inert attribute: items with [inert] are excluded (#31)
// ──────────────────────────────────────────────────────────────

export const InertItemsSkipped: Story = {
  render: () => html`
    <demo-focusgroup-dynamic
      role="toolbar"
      aria-label="Inert test toolbar"
    ></demo-focusgroup-dynamic>
  `,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<DemoFocusgroupDynamic>(
      canvasElement,
      'demo-focusgroup-dynamic'
    );
    const root = host.shadowRoot!;

    await step('all four items are navigable initially', async () => {
      const buttons = Array.from(
        root.querySelectorAll<HTMLButtonElement>('button')
      );
      expect(buttons.length).toBe(4);

      buttons[0].focus();
      keydown(buttons[0], 'ArrowRight');
      expect(shadowActiveButton(host)?.textContent?.trim()).toBe('Beta');
    });

    await step(
      'marking second item inert skips it during arrow navigation',
      async () => {
        const buttons = Array.from(
          root.querySelectorAll<HTMLButtonElement>('button')
        );
        buttons[1].setAttribute('inert', '');
        host.callRefresh();

        buttons[0].focus();
        keydown(buttons[0], 'ArrowRight');
        expect(shadowActiveButton(host)?.textContent?.trim()).toBe('Gamma');

        buttons[1].removeAttribute('inert');
        host.callRefresh();
      }
    );

    await step('after removing inert, item is navigable again', async () => {
      const buttons = Array.from(
        root.querySelectorAll<HTMLButtonElement>('button')
      );
      buttons[0].focus();
      keydown(buttons[0], 'ArrowRight');
      expect(shadowActiveButton(host)?.textContent?.trim()).toBe('Beta');
    });
  },
};

// ──────────────────────────────────────────────────────────────
// Disconnect/reconnect: listeners removed and restored (#32)
// ──────────────────────────────────────────────────────────────

export const DisconnectReconnect: Story = {
  render: () => html`
    <div class="reconnect-container">
      <demo-focusgroup-horizontal
        role="toolbar"
        aria-label="Reconnect test toolbar"
      ></demo-focusgroup-horizontal>
    </div>
  `,
  play: async ({ canvasElement, step }) => {
    const container = canvasElement.querySelector('.reconnect-container')!;
    const host = await getComponent<HTMLElement>(
      canvasElement,
      'demo-focusgroup-horizontal'
    );

    await step('arrow navigation works before disconnect', async () => {
      const root = host.shadowRoot!;
      const first = root.querySelector<HTMLButtonElement>('button')!;
      first.focus();
      expect(shadowActiveButton(host)?.textContent?.trim()).toBe('Bold');

      keydown(first, 'ArrowRight');
      expect(shadowActiveButton(host)?.textContent?.trim()).toBe('Italic');
    });

    await step(
      'after disconnect and reconnect, arrow navigation resumes',
      async () => {
        container.removeChild(host);
        await new Promise((r) => setTimeout(r, 50));

        container.appendChild(host);
        await new Promise((r) => setTimeout(r, 50));

        const root = host.shadowRoot!;
        const buttons = Array.from(
          root.querySelectorAll<HTMLButtonElement>('button')
        );
        buttons[0].focus();
        expect(shadowActiveButton(host)?.textContent?.trim()).toBe('Bold');

        keydown(buttons[0], 'ArrowRight');
        expect(shadowActiveButton(host)?.textContent?.trim()).toBe('Italic');

        keydown(shadowActiveButton(host)!, 'ArrowRight');
        expect(shadowActiveButton(host)?.textContent?.trim()).toBe('Underline');
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// Natively disabled items must not become the roving tab stop
// ──────────────────────────────────────────────────────────────

export const DisabledButtonNeverTabStop: Story = {
  ...HorizontalToolbar,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<HTMLElement>(
      canvasElement,
      'demo-focusgroup-horizontal'
    );
    const root = host.shadowRoot!;
    const buttons = Array.from(
      root.querySelectorAll<HTMLButtonElement>('button')
    );

    await step(
      'tabindex="0" skips natively disabled first item and lands on next',
      async () => {
        // Natively disable the first button.
        buttons[0].disabled = true;

        // Trigger a tabindex recalculation by focusing and blurring.
        buttons[1].focus();
        buttons[1].blur();

        // The disabled button must NOT have tabindex="0" since it can't
        // receive focus, which would make the group unreachable via Tab.
        expect(buttons[0].tabIndex).not.toBe(0);

        // Another eligible button must be the tab stop.
        const tabStop = buttons.find((b) => b.tabIndex === 0 && !b.disabled);
        expect(tabStop).toBeTruthy();
      }
    );

    await step(
      're-enabling the button allows it to become the tab stop again',
      async () => {
        buttons[0].disabled = false;
        buttons[0].focus();

        expect(buttons[0].tabIndex).toBe(0);
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// Memory off: Tab re-entry resets to first item
// ──────────────────────────────────────────────────────────────

export const MemoryOffTabReentry: Story = {
  render: () => html`
    <demo-focusgroup-playground
      .direction=${'horizontal'}
      .wrap=${true}
      .memory=${false}
    ></demo-focusgroup-playground>
  `,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<DemoFocusgroupPlayground>(
      canvasElement,
      'demo-focusgroup-playground'
    );
    const root = host.shadowRoot!;

    await step(
      'when memory is false, Tab re-entry resets to the first item',
      async () => {
        const buttons = Array.from(
          root.querySelectorAll<HTMLButtonElement>('button')
        );
        // Navigate to the second item (Italic).
        buttons[0].focus();
        keydown(buttons[0], 'ArrowRight');
        expect(shadowActiveButton(host)?.textContent?.trim()).toBe('Italic');

        // Blur to simulate tabbing away from the group.
        (document.activeElement as HTMLElement)?.blur();

        // With memory off, tabindex="0" should reset to the first eligible item.
        const tabbable = buttons.filter((b) => b.tabIndex === 0);
        expect(tabbable.length).toBe(1);
        expect(tabbable[0].textContent?.trim()).toBe('Bold');
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// skipDisabled: false with first item natively disabled
// ──────────────────────────────────────────────────────────────

export const SkipDisabledFalseFirstItemDisabled: Story = {
  ...VerticalMenu,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<HTMLElement>(
      canvasElement,
      'demo-focusgroup-vertical'
    );
    const root = host.shadowRoot!;
    const buttons = Array.from(
      root.querySelectorAll<HTMLButtonElement>('button')
    );

    await step(
      'when skipDisabled is false and first item is natively disabled, tab stop falls through',
      async () => {
        // Natively disable the first button (Copy).
        buttons[0].disabled = true;

        // Trigger a tabindex refresh by focusing and blurring another item.
        buttons[1].focus();
        buttons[1].blur();

        // The first button is natively disabled and cannot hold tabindex="0".
        expect(buttons[0].tabIndex).not.toBe(0);

        // The tab stop should fall through to the next non-disabled eligible item.
        const tabStop = buttons.find((b) => b.tabIndex === 0 && !b.disabled);
        expect(tabStop).toBeTruthy();
        expect(tabStop!.textContent?.trim()).toBe('Paste');
      }
    );

    await step(
      'arrow navigation still includes aria-disabled items when skipDisabled is false',
      async () => {
        const tabStop = buttons.find((b) => b.tabIndex === 0 && !b.disabled)!;
        tabStop.focus();
        expect(shadowActiveButton(host)?.textContent?.trim()).toBe('Paste');

        // Arrow down should reach the aria-disabled item (Cut (unavailable)).
        keydown(shadowActiveButton(host)!, 'ArrowDown');
        expect(shadowActiveButton(host)?.textContent?.trim()).toBe(
          'Cut (unavailable)'
        );
        expect(shadowActiveButton(host)?.getAttribute('aria-disabled')).toBe(
          'true'
        );
      }
    );

    await step('cleanup: re-enable first button', async () => {
      buttons[0].disabled = false;
      buttons[0].focus();
      expect(buttons[0].tabIndex).toBe(0);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// Visibility hidden and display none items are excluded
// ──────────────────────────────────────────────────────────────

export const HiddenItemsSkipped: Story = {
  render: () => html`
    <demo-focusgroup-dynamic
      role="toolbar"
      aria-label="Hidden items test toolbar"
    ></demo-focusgroup-dynamic>
  `,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<DemoFocusgroupDynamic>(
      canvasElement,
      'demo-focusgroup-dynamic'
    );
    const root = host.shadowRoot!;

    await step(
      'visibility: hidden item is skipped during arrow navigation',
      async () => {
        const buttons = Array.from(
          root.querySelectorAll<HTMLButtonElement>('button')
        );
        expect(buttons.length).toBe(4);

        // Hide the second item with visibility: hidden.
        buttons[1].style.visibility = 'hidden';
        host.callRefresh();

        buttons[0].focus();
        keydown(buttons[0], 'ArrowRight');
        // Should skip "Beta" (hidden) and land on "Gamma".
        expect(shadowActiveButton(host)?.textContent?.trim()).toBe('Gamma');

        // Restore.
        buttons[1].style.visibility = '';
        host.callRefresh();
      }
    );

    await step(
      'display: none item is skipped during arrow navigation',
      async () => {
        const buttons = Array.from(
          root.querySelectorAll<HTMLButtonElement>('button')
        );

        // Hide the second item with display: none.
        buttons[1].style.display = 'none';
        host.callRefresh();

        buttons[0].focus();
        keydown(buttons[0], 'ArrowRight');
        // Should skip "Beta" (display: none) and land on "Gamma".
        expect(shadowActiveButton(host)?.textContent?.trim()).toBe('Gamma');

        // Restore.
        buttons[1].style.display = '';
        host.callRefresh();
      }
    );

    await step('after restoring, item is navigable again', async () => {
      const buttons = Array.from(
        root.querySelectorAll<HTMLButtonElement>('button')
      );
      buttons[0].focus();
      keydown(buttons[0], 'ArrowRight');
      expect(shadowActiveButton(host)?.textContent?.trim()).toBe('Beta');
    });
  },
};

// ──────────────────────────────────────────────────────────────
// DisabledMixin + FocusgroupNavigationController interaction
// ──────────────────────────────────────────────────────────────

export const DisabledMixinTabindexConflict: Story = {
  render: () => html`
    <demo-focusgroup-disabled-host
      tabindex="0"
      role="toolbar"
      aria-label="Disabled mixin test toolbar"
    ></demo-focusgroup-disabled-host>
  `,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<DemoFocusgroupDisabledHost>(
      canvasElement,
      'demo-focusgroup-disabled-host'
    );

    await step('child roving tabindex works when host is enabled', async () => {
      const root = host.shadowRoot!;
      const buttons = Array.from(
        root.querySelectorAll<HTMLButtonElement>('button')
      );

      // First child should be the active tab stop (tabindex=0).
      expect(buttons[0].tabIndex).toBe(0);
      expect(buttons[1].tabIndex).toBe(-1);
      expect(buttons[2].tabIndex).toBe(-1);

      // Arrow navigation works.
      buttons[0].focus();
      keydown(buttons[0], 'ArrowRight');
      expect(shadowActiveButton(host)?.textContent?.trim()).toBe('Beta');
    });

    await step(
      'disabling host sets aria-disabled and tabindex=-1 on host',
      async () => {
        // Record original host tabindex.
        expect(host.getAttribute('tabindex')).toBe('0');

        host.disabled = true;
        await host.updateComplete;

        expect(host.getAttribute('aria-disabled')).toBe('true');
        expect(host.getAttribute('tabindex')).toBe('-1');
      }
    );

    await step(
      'child roving tabindex is preserved while host is disabled',
      async () => {
        const root = host.shadowRoot!;
        const buttons = Array.from(
          root.querySelectorAll<HTMLButtonElement>('button')
        );

        // The controller's roving tabindex on children should be unaffected
        // by the host's DisabledMixin tabindex management.
        const activeChild = buttons.find((b) => b.tabIndex === 0);
        expect(activeChild).toBeTruthy();

        // At least one child should still be the active tab stop.
        const inactiveChildren = buttons.filter((b) => b.tabIndex === -1);
        expect(inactiveChildren.length).toBe(buttons.length - 1);
      }
    );

    await step('re-enabling host restores original tabindex', async () => {
      host.disabled = false;
      await host.updateComplete;

      expect(host.hasAttribute('aria-disabled')).toBe(false);
      expect(host.getAttribute('tabindex')).toBe('0');
    });

    await step('arrow navigation resumes after re-enabling', async () => {
      const root = host.shadowRoot!;
      const buttons = Array.from(
        root.querySelectorAll<HTMLButtonElement>('button')
      );

      // Find the current active child and navigate from it.
      const activeChild = buttons.find((b) => b.tabIndex === 0)!;
      activeChild.focus();
      const activeLabel = activeChild.textContent?.trim();

      keydown(activeChild, 'ArrowRight');
      const newActive = shadowActiveButton(host);
      expect(newActive).toBeTruthy();
      // Active item should have changed after arrow key.
      expect(newActive?.textContent?.trim()).not.toBe(activeLabel);
    });
  },
};
