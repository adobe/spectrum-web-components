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

import type { Cell } from './data.js';
import { TOTAL_FRAMES } from './data.js';

/**
 * Per-cell entry/exit choreography, driven via the Web Animations API rather
 * than static CSS `@keyframes`.
 *
 * A static-`@keyframes` + `animation-delay` design breaks down here:
 * `exitStart` is not a fixed frame-offset from `stagger` (it depends on
 * `maxStagger` per icon), so the "hold" duration between settle and exit
 * varies per cell. Two independent, infinitely-looping CSS animations
 * targeting the same `transform`/`opacity` properties can't express that;
 * whichever animation is listed last in the `animation` shorthand permanently
 * wins once both are "in effect", masking the other's contribution in every
 * subsequent cycle. A single `Element.animate()` call per cell, with one
 * merged keyframe list computed from that cell's own data, avoids the conflict
 * entirely (one authoritative timeline per element) while still running on the
 * compositor.
 */

const Y_START = -26;
const Y_OVERSHOOT = 1;
const Y_SETTLED = 0;
const Y_EXIT = 26;

const EASE_DROP = 'cubic-bezier(0.333, 0, 0.667, 1)';
const EASE_RECOVER = 'cubic-bezier(0.333, 0, 0.833, 1)';
const EASE_EXIT = 'cubic-bezier(0.563, 0, 0.906, 0.757)';
const EASE_FADE = 'cubic-bezier(0.167, 0.167, 0.833, 0.833)';

function frameOffset(frame: number): number {
  return Math.min(1, Math.max(0, frame / TOTAL_FRAMES));
}

/**
 * Builds the merged transform/opacity keyframe list for one cell's full
 * assemble, hold, and disassemble cycle. Keyframes are sorted by offset; each
 * property is interpolated independently from only the keyframes that specify
 * it, per the Web Animations spec, so transform and opacity stops can
 * interleave freely.
 */
export function buildCellKeyframes(cell: Cell): Keyframe[] {
  const keyframes: Keyframe[] = [
    {
      offset: frameOffset(cell.stagger),
      transform: `translateY(${Y_START}px)`,
      easing: EASE_DROP,
    },
    {
      offset: frameOffset(cell.stagger + 10),
      transform: `translateY(${Y_OVERSHOOT}px)`,
      easing: EASE_RECOVER,
    },
    {
      offset: frameOffset(cell.stagger + 13),
      transform: `translateY(${Y_SETTLED}px)`,
    },
    {
      offset: frameOffset(cell.exitStart),
      transform: `translateY(${Y_SETTLED}px)`,
      easing: EASE_EXIT,
    },
    {
      offset: frameOffset(cell.exitStart + 12),
      transform: `translateY(${Y_EXIT}px)`,
    },
    { offset: frameOffset(cell.fadeIn[0]), opacity: 0, easing: EASE_FADE },
    { offset: frameOffset(cell.fadeIn[1]), opacity: 1 },
    { offset: frameOffset(cell.fadeOut[0]), opacity: 1, easing: EASE_FADE },
    { offset: frameOffset(cell.fadeOut[1]), opacity: 0 },
  ];

  return keyframes.sort((a, b) => (a.offset as number) - (b.offset as number));
}

/** Fully settled appearance: full opacity, zero Y-offset. */
export const SETTLED_TRANSFORM = `translateY(${Y_SETTLED}px)`;
export const SETTLED_OPACITY = 1;
