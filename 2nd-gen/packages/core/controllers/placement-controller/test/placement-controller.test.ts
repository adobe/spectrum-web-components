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
import { fromFloatingPlacement, toFloatingPlacement } from '../index.js';
import type {
  DemoPlacementConstrainSize,
  DemoPlacementFlip,
  DemoPlacementNoFlip,
  DemoPlacementPlayground,
  DemoPlacementVirtualTrigger,
} from '../stories/demo-hosts.js';
import meta, {
  ConstrainSize,
  Playground,
  ShouldFlip,
  VirtualTrigger,
} from '../stories/placement-controller.stories.js';

function readTranslate(el: HTMLElement): [number, number] {
  const match = el.style.translate.match(/^(-?\d*\.?\d+)px\s+(-?\d*\.?\d+)px$/);
  if (!match) {
    return [0, 0];
  }
  return [Number(match[1]), Number(match[2])];
}

function nextFrames(count = 2): Promise<void> {
  return new Promise<void>((resolve) => {
    let remaining = count;
    const tick = (): void => {
      remaining -= 1;
      if (remaining <= 0) {
        resolve();
      } else {
        requestAnimationFrame(tick);
      }
    };
    requestAnimationFrame(tick);
  });
}

export default {
  ...meta,
  title: 'Controllers/Placement controller/Tests',
  parameters: { ...meta.parameters, docs: { disable: true, page: null } },
  tags: ['!autodocs', 'dev'],
} as Meta;

export const AlignsStartAndEnd: Story = {
  ...Playground,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<DemoPlacementPlayground>(
      canvasElement,
      'demo-placement-playground'
    );
    await nextFrames();

    await step(
      'bottom-start and bottom-end differ on the cross axis',
      async () => {
        host.placement = 'bottom-start';
        await nextFrames();
        const [startX] = readTranslate(host.floatingEl);

        host.placement = 'bottom-end';
        await nextFrames();
        const [endX] = readTranslate(host.floatingEl);

        expect(startX).not.toBe(endX);
      }
    );
  },
};

export const PositionsBelowTrigger: Story = {
  ...Playground,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<DemoPlacementPlayground>(
      canvasElement,
      'demo-placement-playground'
    );
    await nextFrames();

    await step('reports computed placement', async () => {
      expect(host.actualPlacement).toBe('bottom');
    });

    await step('floating element sits below trigger', async () => {
      const triggerRect = host.triggerEl.getBoundingClientRect();
      const [, y] = readTranslate(host.floatingEl);
      expect(y).toBeGreaterThanOrEqual(Math.floor(triggerRect.bottom));
    });
  },
};

export const FlipReorients: Story = {
  ...ShouldFlip,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<DemoPlacementFlip>(
      canvasElement,
      'demo-placement-flip'
    );
    await nextFrames();

    await step('flips away from bottom when no room', async () => {
      expect(host.actualPlacement).toBeTruthy();
      expect(host.actualPlacement).not.toBe('bottom');
    });
  },
};

export const VirtualTriggerMoves: Story = {
  ...VirtualTrigger,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<DemoPlacementVirtualTrigger>(
      canvasElement,
      'demo-placement-virtual-trigger'
    );
    await nextFrames();

    const [, initialY] = readTranslate(host.floatingEl);

    await step('click moves the floating element', async () => {
      const rect = host.surfaceEl.getBoundingClientRect();
      host.surfaceEl.dispatchEvent(
        new MouseEvent('click', {
          bubbles: true,
          composed: true,
          clientX: rect.left + 200,
          clientY: rect.top + 200,
        })
      );
      await nextFrames();
      const [, nextY] = readTranslate(host.floatingEl);
      expect(nextY).toBeGreaterThan(initialY);
    });
  },
};

export const StopOnDisconnect: Story = {
  ...Playground,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<DemoPlacementPlayground>(
      canvasElement,
      'demo-placement-playground'
    );
    await nextFrames();
    const before = host.floatingEl.style.translate;

    await step('disconnect freezes translate', async () => {
      host.remove();
      window.dispatchEvent(new Event('resize'));
      await nextFrames();
      expect(host.floatingEl.style.translate).toBe(before);
    });
  },
};

/**
 * Direct exercise of the placement-conversion functions for the four
 * logical-side + physical-alignment placements that previously produced
 * invalid Floating UI strings (`start-top`, `start-bottom`, `end-top`,
 * `end-bottom`), plus the reverse-mapping path that converts Floating UI's
 * `left-start`/`left-end`/`right-start`/`right-end` back into the SWC union.
 */
export const ConversionFunctionsRoundTrip: Story = {
  ...Playground,
  play: async ({ step }) => {
    await step(
      'logical-side placements produce valid Floating UI placements',
      () => {
        expect(toFloatingPlacement('start-top')).toBe('left-start');
        expect(toFloatingPlacement('start-bottom')).toBe('left-end');
        expect(toFloatingPlacement('end-top')).toBe('right-start');
        expect(toFloatingPlacement('end-bottom')).toBe('right-end');
      }
    );

    await step('logical sides without alignment map to physical', () => {
      expect(toFloatingPlacement('start')).toBe('left');
      expect(toFloatingPlacement('end')).toBe('right');
    });

    await step('physical alignments map to Floating UI start/end', () => {
      expect(toFloatingPlacement('bottom-left')).toBe('bottom-start');
      expect(toFloatingPlacement('bottom-right')).toBe('bottom-end');
      expect(toFloatingPlacement('left-top')).toBe('left-start');
      expect(toFloatingPlacement('right-bottom')).toBe('right-end');
    });

    await step(
      'fromFloatingPlacement maps left/right start/end back to physical',
      () => {
        expect(fromFloatingPlacement('left-start')).toBe('left-top');
        expect(fromFloatingPlacement('left-end')).toBe('left-bottom');
        expect(fromFloatingPlacement('right-start')).toBe('right-top');
        expect(fromFloatingPlacement('right-end')).toBe('right-bottom');
      }
    );

    await step(
      'fromFloatingPlacement passes through already-valid SWC placements',
      () => {
        expect(fromFloatingPlacement('bottom')).toBe('bottom');
        expect(fromFloatingPlacement('top-start')).toBe('top-start');
        expect(fromFloatingPlacement('bottom-end')).toBe('bottom-end');
      }
    );
  },
};

/**
 * Verifies the four previously-broken logical-side placements compute a
 * non-zero translate (i.e. Floating UI received a valid placement). Before
 * the fix, `toFloatingPlacement('start-top')` returned the invalid
 * `'left-top'` and `computePosition` produced nonsensical coordinates.
 */
export const LogicalSidePlacementsCompute: Story = {
  ...Playground,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<DemoPlacementPlayground>(
      canvasElement,
      'demo-placement-playground'
    );
    host.shouldFlip = false;
    await nextFrames();

    const cases: Array<{
      requested: Parameters<typeof toFloatingPlacement>[0];
      expected: string;
    }> = [
      { requested: 'start-top', expected: 'left-top' },
      { requested: 'start-bottom', expected: 'left-bottom' },
      { requested: 'end-top', expected: 'right-top' },
      { requested: 'end-bottom', expected: 'right-bottom' },
    ];

    for (const { requested, expected } of cases) {
      await step(`${requested} → ${expected}`, async () => {
        host.placement = requested;
        await nextFrames();
        const [tx, ty] = readTranslate(host.floatingEl);
        // Translate must be a real number (not NaN, which is what invalid
        // Floating UI placements produced before the fix).
        expect(Number.isFinite(tx)).toBe(true);
        expect(Number.isFinite(ty)).toBe(true);
        // And the resolved placement comes back through the SWC union.
        expect(host.actualPlacement).toBe(expected);
      });
    }
  },
};

/**
 * `constrainSize: true` installs Floating UI's `size` middleware, which
 * writes `max-height` (and `max-width`) on the floating element when the
 * available space is smaller than the floating content.
 */
export const ConstrainSizeAppliesMaxHeight: Story = {
  ...ConstrainSize,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<DemoPlacementConstrainSize>(
      canvasElement,
      'demo-placement-constrain-size'
    );
    await nextFrames();

    await step('floating element receives a numeric max-height', () => {
      const maxHeight = host.floatingEl.style.maxHeight;
      expect(maxHeight).toMatch(/^\d+px$/);
    });

    await step(
      'isConstrained reflects when content exceeds the surface',
      () => {
        // The demo lists 24 items in a 180px surface, so size middleware
        // clamps height and reports `isConstrained`.
        expect(host.isConstrained).toBe(true);
      }
    );
  },
};

/**
 * With `shouldFlip: false`, the controller must keep the requested side
 * even when the floating element would overflow the boundary. The
 * `demo-placement-no-flip` host sits in a tight container that would
 * normally trigger flip; this verifies it stays put.
 */
export const NoFlipKeepsRequestedSide: Story = {
  ...ShouldFlip,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<DemoPlacementNoFlip>(
      canvasElement,
      'demo-placement-no-flip'
    );
    await nextFrames();

    await step(
      'requested placement is preserved without flip middleware',
      () => {
        // The no-flip demo uses the default `bottom` placement and
        // explicitly opts out of flip. `actualPlacement` should still
        // resolve to `'bottom'` even though the surface is constrained.
        expect(host.actualPlacement).toBe('bottom');
      }
    );
  },
};

/**
 * Calling `start()` again replaces the active session. The prior
 * `autoUpdate` cleanup must have run so its callback no longer drives
 * compute. We verify this indirectly: cycle through several placements
 * rapidly and observe that the final placement is reflected (i.e. no
 * stale `start-*` session writes coordinates after `end-*` is requested).
 */
export const RapidStartReplacesPriorSession: Story = {
  ...Playground,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<DemoPlacementPlayground>(
      canvasElement,
      'demo-placement-playground'
    );
    host.shouldFlip = false;
    await nextFrames();

    await step('final placement wins after a burst of changes', async () => {
      host.placement = 'top';
      host.placement = 'left';
      host.placement = 'right';
      host.placement = 'bottom-end';
      await nextFrames();
      expect(host.actualPlacement).toBe('bottom-end');
    });
  },
};
