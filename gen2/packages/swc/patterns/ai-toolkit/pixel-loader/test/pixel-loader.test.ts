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

import '../swc-pixel-loader.js';

import { getComponent, withWarningSpy } from '../../../../utils/test-utils.js';
import { exitStartOf } from '../animation.js';
import { ICONS, PRESETS } from '../data.js';
import { PixelLoader } from '../PixelLoader.js';
import { meta, Overview } from '../stories/pixel-loader.internal.stories.js';

export default {
  ...meta,
  title: 'AI Toolkit/Pixel loader/Tests',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

// Queries the inner progressbar container from the loader's shadow root.
function container(el: PixelLoader): HTMLElement {
  const root = el.shadowRoot?.querySelector<HTMLElement>('.swc-PixelLoader');
  if (!root) {
    throw new Error('swc-pixel-loader: expected .swc-PixelLoader container');
  }
  return root;
}

// Queries the rendered pixel cells from the loader's shadow root.
function cells(el: PixelLoader): HTMLElement[] {
  return Array.from(
    el.shadowRoot?.querySelectorAll<HTMLElement>('.swc-PixelLoader-cell') ?? []
  );
}

const prefersReducedMotion = (): boolean =>
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Waits for the rendered cell count to reach `count`, allowing for the
// deferred "finish the current build, then swap" icon transition.
async function waitForCellCount(
  el: PixelLoader,
  count: number,
  tries = 90
): Promise<void> {
  for (let i = 0; i < tries; i += 1) {
    await el.updateComplete;
    if (cells(el).length === count) {
      return;
    }
    await new Promise((resolve) => requestAnimationFrame(resolve));
  }
  throw new Error(`swc-pixel-loader: cell count did not reach ${count}`);
}

// ──────────────────────────────────────────────────────────────
// TEST: Defaults
// ──────────────────────────────────────────────────────────────

export const OverviewTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<PixelLoader>(
      canvasElement,
      'swc-pixel-loader'
    );

    await step('renders and upgrades as swc-pixel-loader', async () => {
      expect(el).toBeInstanceOf(PixelLoader);
    });

    await step('exposes the documented defaults', async () => {
      expect(el.icon).toBe('aiLogo');
      expect(el.preset).toBeUndefined();
      expect(el.paused).toBe(false);
      expect(el.label).toBe('Loading');
    });

    await step('renders one cell per cell in the active icon', async () => {
      expect(cells(el)).toHaveLength(ICONS.aiLogo.length);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Icon and preset
// ──────────────────────────────────────────────────────────────

export const IconTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<PixelLoader>(
      canvasElement,
      'swc-pixel-loader'
    );

    await step('icon reflects to the host attribute', async () => {
      el.icon = 'hourglass';
      await el.updateComplete;
      expect(el.getAttribute('icon')).toBe('hourglass');
    });

    await step(
      'preset overrides icon and drives the rendered glyph',
      async () => {
        // `analyze` starts on `flower`, whose cell count differs from `aiLogo`,
        // so a matching count proves the preset (not `icon`) is on screen.
        el.icon = 'aiLogo';
        el.preset = 'analyze';
        await el.updateComplete;

        const firstPresetIcon = PRESETS.analyze[0];
        expect(el.getAttribute('preset')).toBe('analyze');
        expect(cells(el)).toHaveLength(ICONS[firstPresetIcon].length);
      }
    );

    await step(
      'swapping presets after a cycle starts at the first icon of the new preset',
      async () => {
        // Simulate a mid-cycle preset: `analyze[3]` is `eye` (18 cells).
        // `cc[0]` is `aiLogo` (12); `cc[3]` is `crop` (18). If the index reset
        // ran after render, this swap would paint `crop` for a frame.
        (el as unknown as { _presetIndex: number })._presetIndex = 3;
        await el.updateComplete;
        expect(cells(el)).toHaveLength(ICONS.eye.length);

        el.preset = 'cc';
        await el.updateComplete;
        expect(cells(el)).toHaveLength(ICONS.aiLogo.length);
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Finish-then-swap icon transition
// ──────────────────────────────────────────────────────────────

export const FinishThenSwapTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<PixelLoader>(
      canvasElement,
      'swc-pixel-loader'
    );

    // Finishing only applies while a build is actually animating.
    if (prefersReducedMotion()) {
      return;
    }

    await step('a mid-build icon change defers the swap', async () => {
      // aiLogo is mid-build; request a larger icon.
      el.icon = 'hourglass';
      await el.updateComplete;

      // The requested icon reflects immediately, but the grid keeps showing the
      // previous icon while its build finishes, rather than snapping.
      expect(el.icon).toBe('hourglass');
      expect(cells(el)).toHaveLength(ICONS.aiLogo.length);
    });

    await step(
      'the requested icon appears once the current build settles',
      async () => {
        await waitForCellCount(el, ICONS.hourglass.length);
        expect(cells(el)).toHaveLength(ICONS.hourglass.length);
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Build direction
// ──────────────────────────────────────────────────────────────

export const BuildDirectionTest: Story = {
  ...Overview,
  play: async ({ step }) => {
    await step('generated icons assemble from the bottom row up', async () => {
      // `brush` uses rowOffset 0, so its cell `row` values match source rows.
      // The bottom row (largest row index) must start its entry, and its exit,
      // before the top row, matching the hand-authored aiLogo direction.
      const brush = ICONS.brush;
      const bottomRow = Math.max(...brush.map((cell) => cell.row));
      const topRow = Math.min(...brush.map((cell) => cell.row));

      const earliestStagger = (row: number): number =>
        Math.min(
          ...brush
            .filter((cell) => cell.row === row)
            .map((cell) => cell.stagger)
        );
      const earliestExit = (row: number): number =>
        Math.min(
          ...brush
            .filter((cell) => cell.row === row)
            .map((cell) => exitStartOf(cell))
        );

      expect(earliestStagger(bottomRow)).toBeLessThan(earliestStagger(topRow));
      expect(earliestExit(bottomRow)).toBeLessThan(earliestExit(topRow));
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Accessibility wiring
// ──────────────────────────────────────────────────────────────

export const AccessibilityTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<PixelLoader>(
      canvasElement,
      'swc-pixel-loader'
    );

    await step('exposes an indeterminate progressbar', async () => {
      const root = container(el);
      expect(root.getAttribute('role')).toBe('progressbar');
      expect(root.hasAttribute('aria-valuenow')).toBe(false);
    });

    await step('label drives the accessible name', async () => {
      expect(container(el).getAttribute('aria-label')).toBe('Loading');

      el.label = 'Generating response';
      await el.updateComplete;
      expect(container(el).getAttribute('aria-label')).toBe(
        'Generating response'
      );
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Paused / static render
// ──────────────────────────────────────────────────────────────

export const PausedTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<PixelLoader>(
      canvasElement,
      'swc-pixel-loader'
    );

    await step(
      'paused reflects and renders the settled appearance',
      async () => {
        el.paused = true;
        await el.updateComplete;

        expect(el.hasAttribute('paused')).toBe(true);
        const [first] = cells(el);
        expect(first.style.opacity).toBe('1');
        expect(first.style.scale).toBe('1');
        expect(first.getAnimations()).toHaveLength(0);
      }
    );

    await step(
      'a paused preset freezes on one icon instead of running the ticker',
      async () => {
        el.preset = 'mega';
        await el.updateComplete;

        // With the ticker suppressed, the settled first icon stays on screen.
        const firstPresetIcon = PRESETS.mega[0];
        expect(cells(el)).toHaveLength(ICONS[firstPresetIcon].length);
        expect(
          cells(el).every((cell) => cell.getAnimations().length === 0)
        ).toBe(true);
      }
    );

    await step('unpausing restarts the cell animation', async () => {
      if (prefersReducedMotion()) {
        return;
      }
      el.preset = undefined;
      el.paused = false;
      await el.updateComplete;

      const [first] = cells(el);
      expect(first.getAnimations().length).toBeGreaterThan(0);

      // The settled inline styles from the paused frame must be cleared so the
      // animation restarts cleanly instead of leaving artifacts.
      expect(first.style.opacity).toBe('');
      expect(first.style.translate).toBe('');
      expect(first.style.scale).toBe('');
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Reduced-motion live toggle
// ──────────────────────────────────────────────────────────────

// Reaches the private reduced-motion query and its change handler so the OS
// setting can be simulated deterministically (the harness cannot flip the real
// `prefers-reduced-motion` media query). The stub carries no-op listener
// methods so `disconnectedCallback`'s `removeEventListener` cleanup doesn't
// throw when the element tears down.
type MediaQueryStub = {
  matches: boolean;
  addEventListener: () => void;
  removeEventListener: () => void;
};
type ReducedMotionInternals = {
  _reducedMotionQuery: MediaQueryStub | null;
  _handleReducedMotionChange: () => void;
};

export const ReducedMotionTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<PixelLoader>(
      canvasElement,
      'swc-pixel-loader'
    );

    const internals = el as unknown as ReducedMotionInternals;
    const query: MediaQueryStub = {
      matches: false,
      addEventListener: () => {},
      removeEventListener: () => {},
    };
    internals._reducedMotionQuery = query;

    const opacityOffsets = (cellEl: HTMLElement): number[] =>
      (cellEl.getAnimations()[0].effect as KeyframeEffect)
        .getKeyframes()
        .map((frame) => frame.computedOffset);

    await step('reduced motion fades in place, one row at a time', async () => {
      query.matches = true;
      internals._handleReducedMotionChange();
      await el.updateComplete;

      const cellEls = cells(el);
      const [first] = cellEls;
      const anims = first.getAnimations();
      // A single opacity track per cell: no falling or scaling transform.
      expect(anims).toHaveLength(1);
      const props = new Set(
        (anims[0].effect as KeyframeEffect)
          .getKeyframes()
          .flatMap((frame) => Object.keys(frame))
      );
      expect(props.has('opacity')).toBe(true);
      expect(props.has('translate')).toBe(false);
      expect(props.has('scale')).toBe(false);

      // Timed by row: aiLogo cells 1 and 2 share row 5, so they fade together,
      // while cell 0 (row 6) fades on a different beat.
      expect(opacityOffsets(cellEls[1])).toEqual(opacityOffsets(cellEls[2]));
      expect(opacityOffsets(cellEls[0])).not.toEqual(
        opacityOffsets(cellEls[1])
      );
    });

    await step(
      'leaving reduced motion restores the full falling build',
      async () => {
        query.matches = false;
        internals._handleReducedMotionChange();
        await el.updateComplete;

        const [first] = cells(el);
        // A `translate` drop and a `scale` pop per cell.
        expect(first.getAnimations()).toHaveLength(2);
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Reconnect restarts the animation
// ──────────────────────────────────────────────────────────────

export const ReconnectTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<PixelLoader>(
      canvasElement,
      'swc-pixel-loader'
    );
    const parent = el.parentNode;
    if (!parent) {
      throw new Error('swc-pixel-loader: expected a parent node');
    }

    await step('cells animate on the initial mount', async () => {
      expect(cells(el)[0]?.getAnimations().length).toBeGreaterThan(0);
    });

    await step('disconnecting cancels the cell animations', async () => {
      el.remove();
      expect(cells(el)[0]?.getAnimations().length).toBe(0);
    });

    // A single-icon loader has no property change on reconnect, so Lit does not
    // re-render; the animation must be restarted from connectedCallback.
    await step('reconnecting restarts the cell animations', async () => {
      parent.appendChild(el);
      await el.updateComplete;
      await new Promise((resolve) => requestAnimationFrame(resolve));
      expect(cells(el)[0]?.getAnimations().length).toBeGreaterThan(0);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Dev mode warnings
// ──────────────────────────────────────────────────────────────

export const InvalidIconWarningTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<PixelLoader>(
      canvasElement,
      'swc-pixel-loader'
    );

    await step(
      'warns for an unknown icon, then falls back to aiLogo',
      async () =>
        withWarningSpy(async (warnCalls) => {
          el.icon = 'not-an-icon' as unknown as PixelLoader['icon'];
          await el.updateComplete;

          expect(
            warnCalls.length,
            'a warning is emitted for the invalid icon'
          ).toBeGreaterThan(0);
          expect(
            String(warnCalls[0]?.[1] || ''),
            'warning message references icon'
          ).toContain('icon');
          // The silent fallback still renders the aiLogo cells.
          expect(cells(el)).toHaveLength(ICONS.aiLogo.length);
        })
    );
  },
};

export const ValidIconNoWarningTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<PixelLoader>(
      canvasElement,
      'swc-pixel-loader'
    );

    await step('does not warn for a valid icon', async () =>
      withWarningSpy(async (warnCalls) => {
        el.icon = 'hourglass';
        await el.updateComplete;

        expect(warnCalls.length, 'no warnings for a valid icon').toBe(0);
      })
    );
  },
};

export const InvalidPresetWarningTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<PixelLoader>(
      canvasElement,
      'swc-pixel-loader'
    );

    await step('warns for an unknown preset, then drops the preset', async () =>
      withWarningSpy(async (warnCalls) => {
        el.preset = 'not-a-preset' as unknown as PixelLoader['preset'];
        await el.updateComplete;

        expect(
          warnCalls.length,
          'a warning is emitted for the invalid preset'
        ).toBeGreaterThan(0);
        expect(
          String(warnCalls[0]?.[1] || ''),
          'warning message references preset'
        ).toContain('preset');
        // Preset is dropped: the `icon` (aiLogo) drives the render instead.
        expect(cells(el)).toHaveLength(ICONS.aiLogo.length);
      })
    );
  },
};

export const ValidPresetNoWarningTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<PixelLoader>(
      canvasElement,
      'swc-pixel-loader'
    );

    await step('does not warn for a valid preset', async () =>
      withWarningSpy(async (warnCalls) => {
        el.preset = 'mega';
        await el.updateComplete;

        expect(warnCalls.length, 'no warnings for a valid preset').toBe(0);
      })
    );
  },
};
