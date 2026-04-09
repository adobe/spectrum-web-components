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

import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  type Placement,
  shift,
  size,
} from '@floating-ui/dom';

import type {
  ReactiveController,
  ReactiveElement,
} from '@spectrum-web-components/base';

// Spectrum design spec: minimum distance between overlay and viewport edge.
const REQUIRED_DISTANCE_TO_EDGE = 8;
// Minimum height for the floating content — prevents it from being
// squished to an unusable size when viewport space is tight.
const MIN_FLOATING_HEIGHT = 100;

function roundByDPR(num?: number): number {
  if (typeof num === 'undefined') {
    return 0;
  }
  const dpr = window.devicePixelRatio || 1;
  return Math.round(num * dpr) / dpr;
}

/**
 * Fallback placements for flip(), matching the original PlacementController.
 */
const getFallbackPlacements = (placement: Placement): Placement[] => {
  const fallbacks: Record<string, Placement[]> = {
    left: ['right', 'bottom', 'top'],
    'left-start': ['right-start', 'bottom', 'top'],
    'left-end': ['right-end', 'bottom', 'top'],
    right: ['left', 'bottom', 'top'],
    'right-start': ['left-start', 'bottom', 'top'],
    'right-end': ['left-end', 'bottom', 'top'],
    top: ['bottom', 'left', 'right'],
    'top-start': ['bottom-start', 'left', 'right'],
    'top-end': ['bottom-end', 'left', 'right'],
    bottom: ['top', 'left', 'right'],
    'bottom-start': ['top-start', 'left', 'right'],
    'bottom-end': ['top-end', 'left', 'right'],
  };
  return fallbacks[placement] ?? [placement];
};

export interface FloatingOptions {
  placement?: Placement;
  offset?: number | [number, number];
}

/**
 * Lightweight reactive controller that wraps Floating UI's computePosition
 * and autoUpdate. Replaces the full Overlay + PlacementController stack for
 * components that only need "auto"-type popover positioning (Picker, Menu,
 * ActionMenu, Combobox, etc.).
 *
 * The caller is responsible for managing popover visibility (showPopover /
 * hidePopover) — this controller only handles positioning.
 */
export class FloatingController implements ReactiveController {
  private cleanup?: () => void;
  private host: ReactiveElement;

  constructor(host: ReactiveElement) {
    this.host = host;
    this.host.addController(this);
  }

  /**
   * Start positioning `popover` relative to `trigger`. Automatically
   * re-computes on scroll, resize, and layout shift via Floating UI's
   * autoUpdate.
   */
  start(
    trigger: HTMLElement,
    popover: HTMLElement,
    options: FloatingOptions = {}
  ): void {
    this.stop();

    this.cleanup = autoUpdate(trigger, popover, () => {
      this.computePlacement(trigger, popover, options);
    });
  }

  /** Stop positioning and clean up listeners. */
  stop(): void {
    this.cleanup?.();
    this.cleanup = undefined;
  }

  private async computePlacement(
    trigger: HTMLElement,
    popover: HTMLElement,
    options: FloatingOptions
  ): Promise<void> {
    await (document.fonts ? document.fonts.ready : Promise.resolve());

    const resolvedPlacement = options.placement ?? 'bottom-start';

    const [mainAxis = 0, crossAxis = 0] = Array.isArray(options.offset)
      ? options.offset
      : [options.offset ?? 0, 0];

    // If the floating element has no dimensions yet (e.g. sp-popover
    // hasn't upgraded), bail out — autoUpdate will retry when it resizes.
    const popoverRect = popover.getBoundingClientRect();
    if (popoverRect.width === 0 && popoverRect.height === 0) {
      return;
    }

    const { x, y, placement } = await computePosition(trigger, popover, {
      placement: resolvedPlacement,
      middleware: [
        offset({ mainAxis, crossAxis }),
        flip({
          padding: REQUIRED_DISTANCE_TO_EDGE,
          fallbackPlacements: getFallbackPlacements(resolvedPlacement),
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
            Object.assign(popover.style, {
              maxHeight: `${maxH}px`,
              maxWidth: `${Math.floor(availableWidth)}px`,
            });
          },
        }),
      ],
      strategy: 'fixed',
    });

    Object.assign(popover.style, {
      top: '0px',
      left: '0px',
      translate: `${roundByDPR(x)}px ${roundByDPR(y)}px`,
    });

    popover.setAttribute('actual-placement', placement);

    // Sync placement attribute on the styled sp-popover child so the
    // tip arrow (if any) and transform-origin point the right way.
    const popoverChild = popover.querySelector('[placement]');
    if (popoverChild) {
      popoverChild.setAttribute('placement', placement);
    }
  }

  hostDisconnected(): void {
    this.stop();
  }
}
