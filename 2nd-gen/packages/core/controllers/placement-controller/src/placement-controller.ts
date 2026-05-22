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

import type { ReactiveController, ReactiveControllerHost } from 'lit';
import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
  size,
} from '@floating-ui/dom';

import { getFallbackPlacements } from './fallback-placements.js';
import {
  fromFloatingPlacement,
  toFloatingPlacement,
} from './placement-conversion.js';
import type { Placement, PlacementOptions, VirtualTrigger } from './types.js';

/** Minimum height for the floating content when `constrainSize` is enabled. */
const MIN_FLOATING_HEIGHT = 100;

const DEFAULT_PLACEMENT: Placement = 'bottom';
const DEFAULT_OFFSET = 8;
const DEFAULT_CROSS_OFFSET = 0;
const DEFAULT_CONTAINER_PADDING = 12;
const DEFAULT_SHOULD_FLIP = true;

/**
 * Round a pixel value to the nearest device-pixel boundary so translated
 * coordinates stay sharp on high-DPR displays.
 *
 * @param num - Coordinate in CSS pixels.
 * @returns The value rounded to the nearest physical pixel.
 */
function roundByDPR(num: number): number {
  const dpr = window.devicePixelRatio || 1;
  return Math.round(num * dpr) / dpr;
}

/**
 * Detect WebKit-based browsers (Safari, iOS) where `visualViewport` offset
 * correction is required after `computePosition`.
 *
 * @returns True when the runtime appears to be WebKit without Chrome.
 */
function isWebKit(): boolean {
  if (typeof navigator === 'undefined') {
    return false;
  }
  const ua = navigator.userAgent;
  return /AppleWebKit/.test(ua) && !/Chrome/.test(ua);
}

type ActiveSession = {
  trigger: HTMLElement | VirtualTrigger;
  floating: HTMLElement;
  options: PlacementOptions;
};

/**
 * **PlacementController** — Lit reactive controller that positions a floating
 * element relative to a trigger using [Floating UI](https://floating-ui.com/)
 * (`computePosition` + `autoUpdate`).
 *
 * The public API uses hyphenated placements aligned with `<swc-popover>` and
 * Floating UI. Logical sides (`start`, `end`) normalize to physical sides for
 * positioning math; RTL is handled in CSS at the consumer layer.
 *
 * @example
 * ```typescript
 * this.placement.start(this.trigger, this.dialog, {
 *   placement: 'bottom-start',
 *   offset: 8,
 *   crossOffset: 0,
 *   shouldFlip: true,
 *   onPlacementChange: (p) => {
 *     this.actualPlacement = p;
 *   },
 * });
 * ```
 */
export class PlacementController implements ReactiveController {
  private cleanup?: () => void;
  private session: ActiveSession | null = null;

  /**
   * The computed placement after `flip` reorients (hyphenated). `null` when
   * {@link stop} has been called.
   */
  public actualPlacement: Placement | null = null;

  /**
   * Whether {@link PlacementOptions.constrainSize} clamped the floating
   * element's height on the last compute.
   */
  public isConstrained = false;

  /**
   * Registers this controller on `host` via `addController`.
   *
   * @param host - Reactive element that owns the floating surface lifecycle.
   */
  constructor(host: ReactiveControllerHost) {
    host.addController(this);
  }

  /**
   * Begin positioning `floating` relative to `trigger`.
   *
   * Tears down any prior session, stores the new options, and subscribes to
   * Floating UI `autoUpdate` so placement stays correct on scroll and resize.
   *
   * @param trigger - Anchor element or {@link VirtualTrigger}.
   * @param floating - Element to position (`position: fixed` or top-layer).
   * @param options - {@link PlacementOptions}; omitted properties use defaults.
   */
  public start(
    trigger: HTMLElement | VirtualTrigger,
    floating: HTMLElement,
    options: PlacementOptions = {}
  ): void {
    this.stop();
    this.session = { trigger, floating, options };
    this.actualPlacement = options.placement ?? DEFAULT_PLACEMENT;

    this.cleanup = autoUpdate(trigger, floating, () => {
      void this.computePlacement();
    });
  }

  /**
   * Stop positioning: tear down `autoUpdate`, clear {@link actualPlacement},
   * and reset {@link isConstrained}. Safe to call multiple times.
   */
  public stop(): void {
    this.cleanup?.();
    this.cleanup = undefined;
    this.session = null;
    this.actualPlacement = null;
    this.isConstrained = false;
  }

  /**
   * Force one recomputation outside the `autoUpdate` callback.
   *
   * Use when floating content reflows internally or when a
   * {@link VirtualTrigger} moves without a DOM mutation. No-op if
   * {@link start} has not been called.
   */
  public recompute(): void {
    void this.computePlacement();
  }

  /**
   * Lit lifecycle hook — tears down positioning when the host disconnects.
   *
   * @internal
   */
  public hostDisconnected(): void {
    this.stop();
  }

  /**
   * Run Floating UI `computePosition`, apply the result to the floating element,
   * and update {@link actualPlacement} when `flip` reorients.
   *
   * Waits for web fonts and a WebKit animation frame before measuring. Skips
   * when the floating element has zero dimensions. Aborts if {@link stop} or a
   * new {@link start} call replaces the active session while awaiting async work.
   */
  private async computePlacement(): Promise<void> {
    const session = this.session;
    if (!session) {
      return;
    }

    const { trigger, floating, options } = session;

    if (document.fonts) {
      await document.fonts.ready;
    }
    if (this.session !== session) {
      return;
    }

    if (isWebKit()) {
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => resolve())
      );
      if (this.session !== session) {
        return;
      }
    }

    const floatingRect = floating.getBoundingClientRect();
    if (floatingRect.width === 0 && floatingRect.height === 0) {
      return;
    }

    const requestedPlacement = options.placement ?? DEFAULT_PLACEMENT;
    const floatingPlacement = toFloatingPlacement(requestedPlacement);
    const containerPadding =
      options.containerPadding ?? DEFAULT_CONTAINER_PADDING;
    const shouldFlip = options.shouldFlip ?? DEFAULT_SHOULD_FLIP;
    const mainAxis = options.offset ?? DEFAULT_OFFSET;
    const crossAxis = options.crossOffset ?? DEFAULT_CROSS_OFFSET;

    const flipMiddleware =
      shouldFlip &&
      (!(trigger instanceof HTMLElement)
        ? flip({
            padding: containerPadding,
            fallbackPlacements: getFallbackPlacements(floatingPlacement),
            fallbackStrategy: 'bestFit',
          })
        : flip({
            padding: containerPadding,
            fallbackStrategy: 'bestFit',
          }));

    const middleware = [
      offset({ mainAxis, crossAxis }),
      ...(flipMiddleware ? [flipMiddleware] : []),
      shift({ padding: containerPadding }),
      ...(options.constrainSize
        ? [
            size({
              padding: containerPadding,
              apply: ({ availableHeight, availableWidth, rects }) => {
                const maxHeight = Math.max(
                  MIN_FLOATING_HEIGHT,
                  Math.floor(availableHeight)
                );
                const actualHeight = rects.floating.height;
                this.isConstrained =
                  actualHeight >= maxHeight ||
                  Math.floor(availableHeight) <= MIN_FLOATING_HEIGHT;
                Object.assign(floating.style, {
                  maxHeight: `${maxHeight}px`,
                  maxWidth: `${Math.floor(availableWidth)}px`,
                });
              },
            }),
          ]
        : []),
    ];

    const { x, y, placement } = await computePosition(trigger, floating, {
      placement: floatingPlacement,
      middleware,
      strategy: 'fixed',
    });
    if (this.session !== session) {
      return;
    }

    let translateX = x;
    let translateY = y;
    const visualViewport = window.visualViewport;
    if (visualViewport && isWebKit()) {
      translateX -= visualViewport.offsetLeft;
      translateY -= visualViewport.offsetTop;
    }

    Object.assign(floating.style, {
      top: '0px',
      left: '0px',
      translate: `${roundByDPR(translateX)}px ${roundByDPR(translateY)}px`,
    });

    const nextPlacement = fromFloatingPlacement(placement);
    if (nextPlacement !== this.actualPlacement) {
      this.actualPlacement = nextPlacement;
      options.onPlacementChange?.(nextPlacement);
    }
  }
}

export type { Placement, PlacementOptions, VirtualTrigger } from './types.js';
export { ALL_PLACEMENTS } from './types.js';
export {
  fromFloatingPlacement,
  toFloatingPlacement,
  toPlacementClassSuffix,
} from './placement-conversion.js';
