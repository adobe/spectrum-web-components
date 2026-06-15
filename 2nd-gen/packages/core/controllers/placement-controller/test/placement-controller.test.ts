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
import { expect, waitFor } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import '../stories/demo-hosts.js';

import { getComponent } from '../../../../swc/utils/test-utils.js';
import { fromFloatingPlacement, toFloatingPlacement } from '../index.js';
import type {
  DemoPlacementMultiController,
  DemoPlacementTestFixture,
  DemoPlacementVirtualTrigger,
} from '../stories/demo-hosts.js';
import meta, {
  VirtualTrigger,
} from '../stories/placement-controller.stories.js';

const testFixtureStory: Story = {
  render: () => html`
    <demo-placement-test-fixture></demo-placement-test-fixture>
  `,
};

function readTranslate(el: HTMLElement): [number, number] {
  const match = el.style.translate.match(/^(-?\d*\.?\d+)px\s+(-?\d*\.?\d+)px$/);
  if (!match) {
    return [0, 0];
  }
  return [Number(match[1]), Number(match[2])];
}

export default {
  ...meta,
  title: 'Controllers/Placement controller/Tests',
  parameters: { ...meta.parameters, docs: { disable: true, page: null } },
  tags: ['!autodocs', 'dev'],
} as Meta;

export const AlignsStartAndEnd: Story = {
  ...testFixtureStory,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<DemoPlacementTestFixture>(
      canvasElement,
      'demo-placement-test-fixture'
    );
    host.triggerPosition = 'top-center';
    await waitFor(() => expect(host.actualPlacement).toBe('bottom'));

    await step(
      'bottom-start and bottom-end differ on the cross axis',
      async () => {
        host.placement = 'bottom-start';
        await waitFor(() => expect(host.actualPlacement).toBe('bottom-start'));
        const [startX] = readTranslate(host.floatingEl);

        host.placement = 'bottom-end';
        await waitFor(() => expect(host.actualPlacement).toBe('bottom-end'));
        const [endX] = readTranslate(host.floatingEl);

        // `bottom-start` pins the floating start edge to the trigger start
        // edge; `bottom-end` pins the end edges. The gap between the two
        // positions is exactly the width difference between the two boxes.
        const triggerWidth = host.triggerEl.getBoundingClientRect().width;
        const floatingWidth = host.floatingEl.getBoundingClientRect().width;
        const expectedGap = Math.abs(floatingWidth - triggerWidth);
        expect(Math.abs(startX - endX)).toBeGreaterThanOrEqual(expectedGap - 2);
        expect(Math.abs(startX - endX)).toBeLessThanOrEqual(expectedGap + 2);
      }
    );
  },
};

export const PositionsBelowTrigger: Story = {
  ...testFixtureStory,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<DemoPlacementTestFixture>(
      canvasElement,
      'demo-placement-test-fixture'
    );
    host.triggerPosition = 'top-center';
    await waitFor(() => expect(host.actualPlacement).toBe('bottom'));

    await step('floating element sits directly below the trigger', () => {
      const triggerRect = host.triggerEl.getBoundingClientRect();
      const [, y] = readTranslate(host.floatingEl);
      // With placement `bottom` and `offset: 0`, the floating top edge sits
      // flush against the trigger bottom edge.
      expect(Math.abs(y - triggerRect.bottom)).toBeLessThanOrEqual(2);
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
    await waitFor(() => expect(host.floatingEl.style.translate).not.toBe(''));
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
      await waitFor(() => {
        const [, y] = readTranslate(host.floatingEl);
        expect(y).toBeGreaterThan(initialY);
      });
    });
  },
};

/**
 * `recompute()` forces a fresh `computePosition` pass outside `autoUpdate`.
 * A `VirtualTrigger` reports its anchor from JS coordinates, so moving the
 * anchor produces no layout event for `autoUpdate` to observe — the position
 * only updates when `recompute()` is called. This isolates `recompute()`: the
 * translate stays put after the coordinates change, and moves only once
 * `recompute()` runs.
 */
export const RecomputeUpdatesPositionInIsolation: Story = {
  ...VirtualTrigger,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<DemoPlacementVirtualTrigger>(
      canvasElement,
      'demo-placement-virtual-trigger'
    );
    await waitFor(() => expect(host.floatingEl.style.translate).not.toBe(''));
    const [x0, y0] = readTranslate(host.floatingEl);

    await step('moving the virtual anchor alone does not reposition', () => {
      host.x += 120;
      host.y += 120;
      // The anchor rect is computed in JS, so no resize/scroll/layout-shift
      // event fires for `autoUpdate`. Without `recompute()` the controller has
      // no reason to run, so the translate is still the pre-move value.
      const [x1, y1] = readTranslate(host.floatingEl);
      expect(x1).toBe(x0);
      expect(y1).toBe(y0);
    });

    await step('recompute() picks up the new anchor position', async () => {
      host.controller.recompute();
      await waitFor(() => {
        const [x2, y2] = readTranslate(host.floatingEl);
        expect(x2).toBeGreaterThan(x0);
        expect(y2).toBeGreaterThan(y0);
      });
    });
  },
};

export const StopOnDisconnect: Story = {
  ...testFixtureStory,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<DemoPlacementTestFixture>(
      canvasElement,
      'demo-placement-test-fixture'
    );
    await waitFor(() => expect(host.floatingEl.style.translate).not.toBe(''));
    const before = host.floatingEl.style.translate;

    await step('disconnect freezes translate', () => {
      host.remove();
      // `disconnectedCallback` fires synchronously, so by the time this
      // line returns the controller has called `stop()` (autoUpdate
      // listeners removed, session nulled). A subsequent in-flight
      // `computePlacement` would still bail at the session check before
      // writing — so dispatching a resize here is a no-op, kept only as
      // documentation of intent.
      window.dispatchEvent(new Event('resize'));
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
  ...testFixtureStory,
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

    await step(
      'logical sides flip to the opposite physical side in RTL',
      () => {
        // Default and explicit LTR are equivalent.
        expect(toFloatingPlacement('start', 'ltr')).toBe('left');
        expect(toFloatingPlacement('end', 'ltr')).toBe('right');
        // RTL: inline-start is the right, inline-end is the left.
        expect(toFloatingPlacement('start', 'rtl')).toBe('right');
        expect(toFloatingPlacement('end', 'rtl')).toBe('left');
        // The vertical sub-alignment is preserved across the flip.
        expect(toFloatingPlacement('start-top', 'rtl')).toBe('right-start');
        expect(toFloatingPlacement('start-bottom', 'rtl')).toBe('right-end');
        expect(toFloatingPlacement('end-top', 'rtl')).toBe('left-start');
        expect(toFloatingPlacement('end-bottom', 'rtl')).toBe('left-end');
      }
    );

    await step('physical sides and logical alignments are not flipped', () => {
      // Physical sides ignore direction.
      expect(toFloatingPlacement('left', 'rtl')).toBe('left');
      expect(toFloatingPlacement('right', 'rtl')).toBe('right');
      // Logical alignment suffixes pass through for Floating UI to RTL-flip.
      expect(toFloatingPlacement('bottom-start', 'rtl')).toBe('bottom-start');
      expect(toFloatingPlacement('top-end', 'rtl')).toBe('top-end');
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
 * valid translate (i.e. Floating UI received a valid placement). Before
 * the fix, `toFloatingPlacement('start-top')` returned the invalid
 * `'left-top'` and `computePosition` produced nonsensical coordinates.
 */
export const LogicalSidePlacementsCompute: Story = {
  ...testFixtureStory,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<DemoPlacementTestFixture>(
      canvasElement,
      'demo-placement-test-fixture'
    );
    host.shouldFlip = false;
    await waitFor(() => expect(host.actualPlacement).toBe('bottom'));

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
        await waitFor(() => expect(host.actualPlacement).toBe(expected));
        const [tx, ty] = readTranslate(host.floatingEl);
        // Translate must be a real number (not NaN, which is what invalid
        // Floating UI placements produced before the fix).
        expect(Number.isFinite(tx)).toBe(true);
        expect(Number.isFinite(ty)).toBe(true);
      });
    }
  },
};

/**
 * `size` middleware is always installed. Rather than writing `max-width` /
 * `max-height` directly (which would override a component's intended CSS
 * max-size), it exposes the available space as the custom properties
 * `--swc-placement-available-width` and `--swc-placement-available-height`
 * on the floating element; components opt in via `min()`.
 *
 * We pin the trigger to the bottom of the viewport with a 600 px tall floating
 * element and `shouldFlip: false` so the available height is meaningfully
 * constrained.
 */
export const SizeMiddlewareExposesAvailableSpace: Story = {
  ...testFixtureStory,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<DemoPlacementTestFixture>(
      canvasElement,
      'demo-placement-test-fixture'
    );
    host.triggerPosition = 'bottom-center';
    host.tallFloating = true;
    host.shouldFlip = false;

    const availableWidth = (): string =>
      host.floatingEl.style.getPropertyValue('--swc-placement-available-width');
    const availableHeight = (): string =>
      host.floatingEl.style.getPropertyValue(
        '--swc-placement-available-height'
      );

    await waitFor(() => {
      expect(availableWidth()).toMatch(/^\d+px$/);
      expect(availableHeight()).toMatch(/^\d+px$/);
    });

    await step('available space is exposed as concrete px values', () => {
      const width = parseFloat(availableWidth());
      const height = parseFloat(availableHeight());
      // A real, positive width bounded by the viewport.
      expect(width).toBeGreaterThan(0);
      expect(width).toBeLessThanOrEqual(window.innerWidth);
      // Trigger pinned to the viewport bottom with `shouldFlip: false` leaves
      // little room below, so the height is floored to MIN_FLOATING_HEIGHT
      // (100) and stays well under the 600px natural content height.
      expect(height).toBeGreaterThanOrEqual(100);
      expect(height).toBeLessThan(600);
    });

    await step('no inline max-width / max-height is written', () => {
      expect(host.floatingEl.style.maxWidth).toBe('');
      expect(host.floatingEl.style.maxHeight).toBe('');
    });
  },
};

/**
 * Calling `start()` again replaces the active session. Cycling through
 * several placements rapidly and waiting for the final one's compute to
 * land verifies that prior sessions don't write stale coordinates after
 * the latest `start()` call.
 */
export const RapidStartReplacesPriorSession: Story = {
  ...testFixtureStory,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<DemoPlacementTestFixture>(
      canvasElement,
      'demo-placement-test-fixture'
    );
    host.shouldFlip = false;
    await waitFor(() => expect(host.actualPlacement).toBe('bottom'));

    await step('final placement wins after a burst of changes', async () => {
      host.placement = 'top';
      host.placement = 'left';
      host.placement = 'right';
      host.placement = 'bottom-end';
      await waitFor(() => expect(host.actualPlacement).toBe('bottom-end'));
    });
  },
};

/**
 * With `shouldFlip: true` and a floating panel that can't fit below a
 * trigger pinned to the viewport bottom, `flip` middleware reorients to
 * the opposite side.
 */
export const FlipReorients: Story = {
  ...testFixtureStory,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<DemoPlacementTestFixture>(
      canvasElement,
      'demo-placement-test-fixture'
    );
    host.placement = 'bottom';
    host.triggerPosition = 'bottom-center';
    host.tallFloating = true;
    host.shouldFlip = true;

    await step(
      'actualPlacement reorients away from bottom (flips to top)',
      async () => {
        await waitFor(() => {
          expect(host.actualPlacement).toBe('top');
        });
      }
    );
  },
};

/**
 * With `shouldFlip: false`, the controller keeps the requested side even
 * when the floating panel overflows the boundary.
 */
export const NoFlipKeepsRequestedSide: Story = {
  ...testFixtureStory,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<DemoPlacementTestFixture>(
      canvasElement,
      'demo-placement-test-fixture'
    );
    host.placement = 'bottom';
    host.triggerPosition = 'bottom-center';
    host.tallFloating = true;
    host.shouldFlip = false;

    await step('actualPlacement stays at the requested side', async () => {
      await waitFor(() => expect(host.actualPlacement).toBe('bottom'));
    });
  },
};

/**
 * The `offset` option adds pixels along the placement direction. With
 * placement `'bottom'`, increasing `offset` pushes the floating element
 * further down (larger `translateY`).
 */
export const OffsetMovesAlongPlacementAxis: Story = {
  ...testFixtureStory,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<DemoPlacementTestFixture>(
      canvasElement,
      'demo-placement-test-fixture'
    );
    host.placement = 'bottom';
    host.triggerPosition = 'top-center';
    host.offset = 0;
    await waitFor(() => expect(host.floatingEl.style.translate).not.toBe(''));
    const [, y0] = readTranslate(host.floatingEl);

    await step('offset: 40 shifts translateY down by 40px', async () => {
      host.offset = 40;
      await waitFor(() => {
        const [, y40] = readTranslate(host.floatingEl);
        expect(y40 - y0).toBeGreaterThanOrEqual(38);
        expect(y40 - y0).toBeLessThanOrEqual(42);
      });
    });
  },
};

/**
 * The `crossOffset` option slides along the trigger edge. With placement
 * `'bottom'`, increasing `crossOffset` shifts the floating element
 * sideways (`translateX`) without changing `translateY` materially.
 */
export const CrossOffsetMovesAlongTriggerEdge: Story = {
  ...testFixtureStory,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<DemoPlacementTestFixture>(
      canvasElement,
      'demo-placement-test-fixture'
    );
    host.placement = 'bottom';
    host.triggerPosition = 'center';
    host.crossOffset = 0;
    await waitFor(() => expect(host.floatingEl.style.translate).not.toBe(''));
    const [x0, y0] = readTranslate(host.floatingEl);

    await step(
      'crossOffset: 40 shifts translateX, not translateY',
      async () => {
        host.crossOffset = 40;
        await waitFor(() => {
          const [x40, y40] = readTranslate(host.floatingEl);
          // crossOffset: 40 slides the panel 40px along the trigger edge…
          expect(Math.abs(x40 - x0)).toBeGreaterThanOrEqual(38);
          expect(Math.abs(x40 - x0)).toBeLessThanOrEqual(42);
          // …without moving it along the placement axis.
          expect(Math.abs(y40 - y0)).toBeLessThanOrEqual(2);
        });
      }
    );
  },
};

/**
 * The `containerPadding` option controls the inset used by `shift` when
 * the floating element would overflow the boundary. With the trigger near
 * the right edge, raising `containerPadding` pulls the floating element
 * further inward (smaller `translateX`).
 */
export const ContainerPaddingMovesPanelInward: Story = {
  ...testFixtureStory,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<DemoPlacementTestFixture>(
      canvasElement,
      'demo-placement-test-fixture'
    );
    host.placement = 'bottom';
    host.triggerPosition = 'top-right';
    host.containerPadding = 8;
    await waitFor(() => expect(host.floatingEl.style.translate).not.toBe(''));
    const [xSmall] = readTranslate(host.floatingEl);

    await step(
      'larger containerPadding pulls the panel further inside the boundary',
      async () => {
        host.containerPadding = 64;
        await waitFor(() => {
          const [xLarge] = readTranslate(host.floatingEl);
          // With the trigger near the right edge, shift clamps the panel a
          // fixed inset from the boundary in both cases, so raising padding
          // from 8 to 64 moves it inward by exactly the 56px delta.
          expect(xSmall - xLarge).toBeGreaterThanOrEqual(54);
          expect(xSmall - xLarge).toBeLessThanOrEqual(58);
        });
      }
    );
  },
};

/**
 * `onPlacementChange` fires with the computed hyphenated placement, but on
 * change only: once after the first compute, then again whenever an
 * `autoUpdate` tick (or `recompute()`) produces a *different* value. A compute
 * that yields the same placement does not re-notify. The no-flip case hands the
 * callback the requested placement; the flip case hands it the flipped value.
 */
export const OnPlacementChangeFiresWithComputedPlacement: Story = {
  ...testFixtureStory,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<DemoPlacementTestFixture>(
      canvasElement,
      'demo-placement-test-fixture'
    );
    host.placement = 'bottom';
    host.triggerPosition = 'top-center';
    host.tallFloating = false;
    host.shouldFlip = true;

    await step(
      'callback fires with the requested placement when nothing flips',
      async () => {
        await waitFor(() => {
          expect(host.placementChanges.length).toBeGreaterThan(0);
          expect(host.placementChanges.at(-1)).toBe('bottom');
        });
      }
    );

    await step(
      'a recompute with no placement change does not fire again',
      async () => {
        const count = host.placementChanges.length;
        host.controller.recompute();
        // Let the (async) compute run; it resolves to the same placement.
        await new Promise<void>((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
        );
        expect(host.placementChanges.length).toBe(count);
        expect(host.actualPlacement).toBe('bottom');
      }
    );

    await step(
      'callback fires with the new placement when flip reorients',
      async () => {
        host.triggerPosition = 'bottom-center';
        host.tallFloating = true;
        await waitFor(() => {
          expect(host.placementChanges.at(-1)).toBe('top');
        });
      }
    );

    await step('no consecutive duplicate placements were emitted', () => {
      for (let i = 1; i < host.placementChanges.length; i += 1) {
        expect(host.placementChanges[i]).not.toBe(host.placementChanges[i - 1]);
      }
    });
  },
};

/**
 * When a `tipElement` is passed in options, the controller installs
 * `arrow` middleware. For a bottom/top placement it pins the tip to the
 * floating's horizontal edge (`left: 0`) and slides it along that edge with
 * inline `translate` so the tip points at the trigger's center. The test
 * reads the tip's style and geometry directly to assert that contract.
 */
export const ArrowMiddlewarePositionsTip: Story = {
  render: () => html`
    <demo-placement-arrow></demo-placement-arrow>
  `,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<
      HTMLElement & {
        tipEl: HTMLElement;
        triggerEl: HTMLElement;
        floatingEl: HTMLElement;
      }
    >(canvasElement, 'demo-placement-arrow');

    await waitFor(() => expect(host.floatingEl.style.translate).not.toBe(''));

    await step('controller pins the tip to the floating edge', async () => {
      // Default demo placement is `bottom-end`, so the tip rides the top
      // edge of the floating panel: the controller writes `left: 0` and
      // leaves `top` cleared.
      await waitFor(() => {
        expect(host.tipEl.style.left).toBe('0px');
        expect(host.tipEl.style.translate).not.toBe('');
      });
    });

    await step('tip points at the trigger center', () => {
      const triggerRect = host.triggerEl.getBoundingClientRect();
      const tipRect = host.tipEl.getBoundingClientRect();
      const triggerCenterX = triggerRect.left + triggerRect.width / 2;
      const tipCenterX = tipRect.left + tipRect.width / 2;
      expect(Math.abs(tipCenterX - triggerCenterX)).toBeLessThanOrEqual(2);
    });
  },
};

/**
 * Two `PlacementController` instances on a single host keep separate state and
 * do not interfere: each positions its own floating element at its own trigger,
 * each exposes its own `--swc-placement-available-*` custom properties, and
 * calling `stop()` on one leaves the other's position, properties, and
 * `actualPlacement` untouched. All controller state lives on the instance (no
 * module-level or static sharing), so this guards that property against future
 * refactors.
 */
export const TwoControllersDoNotInterfere: Story = {
  render: () => html`
    <demo-placement-multi-controller></demo-placement-multi-controller>
  `,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<DemoPlacementMultiController>(
      canvasElement,
      'demo-placement-multi-controller'
    );
    const availableWidth = (el: HTMLElement): string =>
      el.style.getPropertyValue('--swc-placement-available-width');

    await waitFor(() => {
      expect(host.actualPlacementA).toBe('bottom-start');
      expect(host.actualPlacementB).toBe('top-end');
    });

    await step('each floating element is positioned at its own trigger', () => {
      const aRect = host.floatingA.getBoundingClientRect();
      const bRect = host.floatingB.getBoundingClientRect();
      const aTrigger = host.triggerA.getBoundingClientRect();
      const bTrigger = host.triggerB.getBoundingClientRect();
      // A (`bottom-start`) sits below its top-left trigger; B (`top-end`) sits
      // above its bottom-right trigger. Distinct triggers, distinct positions.
      expect(Math.abs(aRect.top - aTrigger.bottom)).toBeLessThanOrEqual(2);
      expect(Math.abs(bRect.bottom - bTrigger.top)).toBeLessThanOrEqual(2);
    });

    await step('each floating element gets its own available space', () => {
      expect(availableWidth(host.floatingA)).toMatch(/^\d+px$/);
      expect(availableWidth(host.floatingB)).toMatch(/^\d+px$/);
    });

    await step('stopping one controller leaves the other intact', () => {
      const bTranslateBefore = host.floatingB.style.translate;
      host.controllerA.stop();

      // A is torn down: custom props removed, placement cleared.
      expect(availableWidth(host.floatingA)).toBe('');
      expect(host.controllerA.actualPlacement).toBeNull();

      // B is untouched: same position, props, and placement.
      expect(host.floatingB.style.translate).toBe(bTranslateBefore);
      expect(availableWidth(host.floatingB)).toMatch(/^\d+px$/);
      expect(host.actualPlacementB).toBe('top-end');
    });
  },
};
