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

import { getComponent } from '../../../../utils/test-utils.js';
import { exitStartOf } from '../animation.js';
import { ICONS, PRESETS } from '../data.js';
import { PixelLoader } from '../PixelLoader.js';
import { meta, Overview } from '../stories/pixel-loader.stories.js';

export default {
  ...meta,
  title: 'Conversational AI/Pixel loader/Tests',
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
// `prefers-reduced-motion` media query).
type ReducedMotionInternals = {
  _reducedMotionQuery: { matches: boolean } | null;
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
    const query = { matches: false };
    internals._reducedMotionQuery = query;

    await step('reduced motion freezes on the settled icon', async () => {
      query.matches = true;
      internals._handleReducedMotionChange();
      await el.updateComplete;

      const [first] = cells(el);
      // Matches React Spectrum: no running animation, settled appearance.
      expect(first.getAnimations()).toHaveLength(0);
      expect(first.style.scale).toBe('1');
      expect(first.style.opacity).toBe('1');
    });

    await step('leaving reduced motion restarts the animation', async () => {
      query.matches = false;
      internals._handleReducedMotionChange();
      await el.updateComplete;

      const [first] = cells(el);
      expect(first.getAnimations().length).toBeGreaterThan(0);
    });
  },
};
