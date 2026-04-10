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

import type { ReactiveController, ReactiveElement } from 'lit';
import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
  size,
} from '@floating-ui/dom';

import {
  FALLBACK_PLACEMENTS,
  type FloatingOptions,
} from './floating-controller.types.js';

// Spectrum design spec: minimum distance between floating element and viewport edge.
// See: https://spectrum.adobe.com/page/popover/#Container-padding
const REQUIRED_DISTANCE_TO_EDGE = 8;

// Minimum height for the floating element — prevents it from being
// squished to an unusable size when viewport space is tight.
// See: https://github.com/adobe/spectrum-web-components/issues/910
const MIN_FLOATING_HEIGHT = 100;

function roundByDPR(num: number): number {
  const dpr = window.devicePixelRatio || 1;
  return Math.round(num * dpr) / dpr;
}

/**
 * Lightweight reactive controller that positions a floating element
 * (popover, tooltip, menu, etc.) relative to a trigger element using
 * Floating UI.
 *
 * This replaces the 1st-gen Overlay + PlacementController + OverlayStack
 * stack (~1500+ lines) with a single controller (~80 lines) that handles:
 *
 * - **Positioning** via `computePosition` with `strategy: 'fixed'`
 * - **Flipping** to the side with the most available space
 * - **Shifting** to stay within the viewport
 * - **Size constraining** so the floating element scrolls when space is tight
 * - **Auto-updating** on scroll, resize, and layout shift
 *
 * The caller is responsible for managing popover visibility (`showPopover` /
 * `hidePopover`) — this controller only handles positioning.
 *
 * @example
 * ```typescript
 * class MyPicker extends SpectrumElement {
 *   private floating = new FloatingController(this);
 *
 *   private open() {
 *     this.popoverEl.showPopover();
 *     this.floating.start(this, this.popoverEl, {
 *       placement: 'bottom-start',
 *       offset: 8,
 *     });
 *   }
 *
 *   private close() {
 *     this.floating.stop();
 *     this.popoverEl.hidePopover();
 *   }
 * }
 * ```
 */
export class FloatingController implements ReactiveController {
  private cleanup?: () => void;
  private host: ReactiveElement;

  constructor(host: ReactiveElement) {
    this.host = host;
    this.host.addController(this);
  }

  /**
   * Start positioning `floating` relative to `trigger`. Automatically
   * re-computes on scroll, resize, and layout shift via Floating UI's
   * `autoUpdate`.
   */
  start(
    trigger: HTMLElement,
    floating: HTMLElement,
    options: FloatingOptions = {}
  ): void {
    this.stop();

    this.cleanup = autoUpdate(trigger, floating, () => {
      this.computePlacement(trigger, floating, options).catch((err: unknown) =>
        console.warn('[FloatingController] positioning error:', err)
      );
    });
  }

  /** Stop positioning and clean up listeners. */
  stop(): void {
    this.cleanup?.();
    this.cleanup = undefined;
  }

  private async computePlacement(
    trigger: HTMLElement,
    floating: HTMLElement,
    options: FloatingOptions
  ): Promise<void> {
    // If the floating element has no dimensions yet (e.g. the custom
    // element hasn't upgraded), bail out — autoUpdate will retry when
    // the ResizeObserver fires after upgrade.
    const rect = floating.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) {
      return;
    }

    await (document.fonts ? document.fonts.ready : Promise.resolve());

    const resolvedPlacement = options.placement ?? 'bottom-start';

    const [mainAxis = 0, crossAxis = 0] = Array.isArray(options.offset)
      ? options.offset
      : [options.offset ?? 0, 0];

    const { x, y, placement } = await computePosition(trigger, floating, {
      placement: resolvedPlacement,
      middleware: [
        offset({ mainAxis, crossAxis }),
        flip({
          padding: REQUIRED_DISTANCE_TO_EDGE,
          fallbackPlacements: FALLBACK_PLACEMENTS[resolvedPlacement] ?? [
            resolvedPlacement,
          ],
          fallbackStrategy: 'bestFit',
        }),
        shift({ padding: REQUIRED_DISTANCE_TO_EDGE }),
        size({
          padding: REQUIRED_DISTANCE_TO_EDGE,
          apply: ({ availableHeight, availableWidth }) => {
            const maxH = Math.max(
              MIN_FLOATING_HEIGHT,
              Math.floor(availableHeight)
            );
            Object.assign(floating.style, {
              maxHeight: `${maxH}px`,
              maxWidth: `${Math.floor(availableWidth)}px`,
            });
          },
        }),
      ],
      strategy: 'fixed',
    });

    Object.assign(floating.style, {
      top: '0px',
      left: '0px',
      translate: `${roundByDPR(x)}px ${roundByDPR(y)}px`,
    });

    floating.setAttribute('actual-placement', placement);

    // Sync the placement attribute on any child that carries one
    // (e.g. sp-popover uses [placement] for tip arrow direction).
    const placementChild = floating.querySelector('[placement]');
    if (placementChild) {
      placementChild.setAttribute('placement', placement);
    }
  }

  hostDisconnected(): void {
    this.stop();
  }
}
