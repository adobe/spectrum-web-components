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

import { getComponent } from '../../../swc/utils/test-utils.js';
import focusMeta, {
  BothAxesLinear,
  DemoFocusgroupProgrammatic,
  DemoFocusgroupTextPrefix,
  Grid,
  HorizontalToolbar,
  ProgrammaticFocus,
  SkipDisabledMenu,
  TextPrefixFocus,
  VerticalMenu,
} from './focus-group-navigation-controller.stories.js';

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
      'Home and End jump to first and last cell in row-major order',
      async () => {
        cell('5').focus();
        keydown(shadowActiveButton(host)!, 'Home');
        expect(shadowActiveButton(host)?.textContent?.trim()).toBe('1');

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
      'focusItem updates roving tabindex and arrow navigation',
      async () => {
        host.focusProgrammaticTarget();
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
