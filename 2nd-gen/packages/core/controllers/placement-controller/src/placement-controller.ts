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

/** Minimum height the `size` middleware will allow the floating content to clamp to. */
const MIN_FLOATING_HEIGHT = 100;

const DEFAULT_PLACEMENT: Placement = 'bottom';
// Neutral default — controller does not impose a trigger gap. Consuming
// components set their own pattern-specific default.
const DEFAULT_OFFSET = 0;
const DEFAULT_CROSS_OFFSET = 0;
const DEFAULT_CONTAINER_PADDING = 8;
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

  /**
   * Cached `isWebKit()` result so `computePlacement` doesn't run a UA
   * regex per `autoUpdate` tick.
   */
  isWebKit: boolean;
};

/**
 * **PlacementController** — Lit reactive controller that positions a floating
 * element relative to a trigger using [Floating UI](https://floating-ui.com/)
 * (`computePosition` + `autoUpdate`).
 *
 * Hyphenated placements are accepted on the public API. Logical sides
 * (`start`, `end`) normalize to physical sides for positioning math; RTL is
 * handled in CSS at the consumer layer.
 *
 * @example
 * ```typescript
 * this.placement.start(this.trigger, this.dialog, {
 *   placement: 'bottom-start',
 *   offset: 0,
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
   * `stop` has been called.
   *
   * Set synchronously to the requested `PlacementOptions.placement`
   * (or `DEFAULT_PLACEMENT`) when `start` is called, then refreshed on every
   * successful `computePlacement` pass. `PlacementOptions.onPlacementChange`
   * fires alongside each refresh, so consumers can mirror this property in
   * a single callback without also reading it synchronously after `start()`.
   */
  public actualPlacement: Placement | null = null;

  /**
   * Whether the `size` middleware clamped the floating element's height
   * on the last compute. `true` when the content would otherwise overflow
   * the available space below/above the trigger, in which case the
   * controller writes a `max-height` style on the floating element.
   */
  public isConstrained = false;

  /**
   * Natural floating-element height from the first un-constrained compute,
   * used as the baseline that determines whether subsequent computes are
   * clamping content. Cleared on `stop()`.
   */
  private initialHeight?: number;

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
   * @param trigger - Anchor element or `VirtualTrigger`.
   * @param floating - Element to position (`position: fixed` or top-layer).
   * @param options - `PlacementOptions`; omitted properties use defaults.
   */
  public start(
    trigger: HTMLElement | VirtualTrigger,
    floating: HTMLElement,
    options: PlacementOptions = {}
  ): void {
    this.stop();
    const session: ActiveSession = {
      trigger,
      floating,
      options,
      isWebKit: isWebKit(),
    };
    this.session = session;
    this.actualPlacement = options.placement ?? DEFAULT_PLACEMENT;

    // Single `autoUpdate` channel — receives `ancestorScroll`,
    // `ancestorResize`, `elementResize`, and `layoutShift` by default. The
    // controller owns geometry only and just repositions on every event;
    // the caller decides whether ancestor scroll should close the surface.
    const autoUpdateCleanup = autoUpdate(trigger, floating, () => {
      void this.computePlacement();
    });

    // iOS WebKit `visualViewport` recompute channel. Floating UI's
    // `autoUpdate` doesn't observe `window.visualViewport`, so without this
    // an open floating element can drift away from its trigger on WebKit
    // (iOS Safari, WKWebView, desktop Safari while pinch-zoomed) when the
    // URL bar shows/hides, the virtual keyboard opens, etc. — until the
    // next event `autoUpdate` does observe. Listeners are passive and
    // rAF-coalesced so a burst of resize/scroll events compresses to one
    // compute per frame. The matching `visualViewport.offset*` correction
    // lives in `computePlacement`.
    let visualViewportCleanup: (() => void) | undefined;
    const visualViewport = window.visualViewport;
    if (session.isWebKit && visualViewport) {
      let rafId = 0;
      let cancelled = false;
      const onViewportChange = (): void => {
        if (cancelled || rafId) {
          return;
        }
        rafId = requestAnimationFrame(() => {
          rafId = 0;
          if (cancelled) {
            return;
          }
          void this.computePlacement();
        });
      };
      visualViewport.addEventListener('resize', onViewportChange, {
        passive: true,
      });
      visualViewport.addEventListener('scroll', onViewportChange, {
        passive: true,
      });
      visualViewportCleanup = () => {
        cancelled = true;
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = 0;
        }
        visualViewport.removeEventListener('resize', onViewportChange);
        visualViewport.removeEventListener('scroll', onViewportChange);
      };
    }

    this.cleanup = () => {
      visualViewportCleanup?.();
      autoUpdateCleanup();
    };
  }

  /**
   * Stop positioning: tear down `autoUpdate`, clear `actualPlacement`,
   * reset `isConstrained`, and remove the `max-height` / `max-width`
   * inline styles the `size` middleware wrote. Safe to call multiple
   * times.
   */
  public stop(): void {
    const floating = this.session?.floating;
    if (floating) {
      floating.style.removeProperty('max-height');
      floating.style.removeProperty('max-width');
    }
    this.cleanup?.();
    this.cleanup = undefined;
    this.session = null;
    this.actualPlacement = null;
    this.isConstrained = false;
    this.initialHeight = undefined;
  }

  /**
   * Force one recomputation outside the `autoUpdate` callback.
   *
   * Use when floating content reflows internally or when a
   * `VirtualTrigger` moves without a DOM mutation. No-op if
   * `start` has not been called.
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
   * and update `actualPlacement` when `flip` reorients.
   *
   * Waits for web fonts and a WebKit animation frame before measuring. Skips
   * when the floating element has zero dimensions. Aborts if `stop` or a
   * new `start` call replaces the active session while awaiting async work.
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

    if (session.isWebKit) {
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

    // Middleware order matches 1st-gen: offset → shift → flip → size.
    // `shift` runs before `flip` so the panel slides along the current
    // side before any decision to flip; `size` runs last so it sees the
    // final placement when clamping max-height / max-width.
    const middleware = [
      offset({ mainAxis, crossAxis }),
      shift({ padding: containerPadding }),
      flipMiddleware,
      size({
        padding: containerPadding,
        apply: ({ availableHeight, availableWidth, rects }) => {
          const maxHeight = Math.max(
            MIN_FLOATING_HEIGHT,
            Math.floor(availableHeight)
          );
          const actualHeight = rects.floating.height;
          // Track the natural (un-constrained) height on the first compute
          // so subsequent computes can detect whether content is currently
          // being clamped.
          this.initialHeight = !this.isConstrained
            ? actualHeight
            : (this.initialHeight ?? actualHeight);
          this.isConstrained =
            actualHeight < this.initialHeight || maxHeight <= actualHeight;
          Object.assign(floating.style, {
            maxWidth: `${Math.floor(availableWidth)}px`,
            maxHeight: this.isConstrained ? `${maxHeight}px` : '',
          });
        },
      }),
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
    if (visualViewport && session.isWebKit) {
      translateX -= visualViewport.offsetLeft;
      translateY -= visualViewport.offsetTop;
    }

    Object.assign(floating.style, {
      top: '0px',
      left: '0px',
      translate: `${roundByDPR(translateX)}px ${roundByDPR(translateY)}px`,
    });

    const nextPlacement = fromFloatingPlacement(placement);
    this.actualPlacement = nextPlacement;
    options.onPlacementChange?.(nextPlacement);
  }
}

export type { Placement, PlacementOptions, VirtualTrigger } from './types.js';
export { ALL_PLACEMENTS } from './types.js';
export {
  fromFloatingPlacement,
  toFloatingPlacement,
} from './placement-conversion.js';
