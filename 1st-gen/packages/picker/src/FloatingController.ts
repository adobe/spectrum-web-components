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

import type {
  ReactiveController,
  ReactiveElement,
} from '@spectrum-web-components/base';
import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  type Placement,
  shift,
  size,
} from '@floating-ui/dom';

// Spectrum design spec: minimum distance between overlay and viewport edge.
const REQUIRED_DISTANCE_TO_EDGE = 8;
// Minimum overlay height before it gets constrained.
const MIN_OVERLAY_HEIGHT = 100;

function roundByDPR(num?: number): number {
  if (typeof num === 'undefined') {
    return 0;
  }
  const dpr = window.devicePixelRatio || 1;
  return Math.round(num * dpr) / dpr;
}

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

    const [mainAxis = 0, crossAxis = 0] = Array.isArray(options.offset)
      ? options.offset
      : [options.offset ?? 0, 0];

    const { x, y, placement } = await computePosition(trigger, popover, {
      placement: options.placement ?? 'bottom-start',
      middleware: [
        offset({ mainAxis, crossAxis }),
        flip(),
        shift({ padding: REQUIRED_DISTANCE_TO_EDGE }),
        size({
          padding: REQUIRED_DISTANCE_TO_EDGE,
          apply: ({ availableHeight, availableWidth }) => {
            Object.assign(popover.style, {
              maxHeight: `${Math.max(MIN_OVERLAY_HEIGHT, Math.floor(availableHeight))}px`,
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

    // Sync placement attribute on the styled sp-popover child.
    const popoverChild = popover.querySelector('[placement]');
    if (popoverChild) {
      popoverChild.setAttribute('placement', placement);
    }
  }

  hostDisconnected(): void {
    this.stop();
  }
}
