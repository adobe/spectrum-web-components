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
import { CYCLE_FRAMES } from './data.js';

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

// Vertical offsets are expressed as a percentage of a single cell's height so
// the motion scales with `--swc-pixel-loader-size` rather than being a fixed
// pixel distance. Entry distance is per-cell (see `buildCellKeyframes`): each
// cell falls from the top of the frame down its column to its settled row, so
// pixels visibly rain from the top and fill bottom-up while staying inside the
// box (no clipping needed).
const Y_OVERSHOOT = 6;
const Y_SETTLED = 0;
const Y_EXIT = 200;

const EASE_DROP = 'cubic-bezier(0.333, 0, 0.667, 1)';
const EASE_RECOVER = 'cubic-bezier(0.333, 0, 0.833, 1)';
const EASE_EXIT = 'cubic-bezier(0.563, 0, 0.906, 0.757)';
const EASE_FADE = 'cubic-bezier(0.167, 0.167, 0.833, 0.833)';

function frameOffset(frame: number): number {
  return Math.min(1, Math.max(0, frame / CYCLE_FRAMES));
}

/**
 * Builds the merged transform/opacity keyframe list for one cell's full
 * assemble, hold, and disassemble cycle. Keyframes are sorted by offset; each
 * property is interpolated independently from only the keyframes that specify
 * it, per the Web Animations spec, so transform and opacity stops can
 * interleave freely.
 */
export function buildCellKeyframes(cell: Cell): Keyframe[] {
  // Start each cell at the top of the frame (row 0) so it falls down its column
  // to its settled row: bottom rows fall the furthest, the top row barely
  // moves, and the whole icon reads as raining in from the top.
  const entryStart = -Math.max(0, cell.row) * 100;

  const keyframes: Keyframe[] = [
    {
      offset: frameOffset(cell.stagger),
      transform: `translateY(${entryStart}%)`,
      easing: EASE_DROP,
    },
    {
      offset: frameOffset(cell.stagger + 10),
      transform: `translateY(${Y_OVERSHOOT}%)`,
      easing: EASE_RECOVER,
    },
    {
      offset: frameOffset(cell.stagger + 13),
      transform: `translateY(${Y_SETTLED}%)`,
    },
    {
      offset: frameOffset(cell.exitStart),
      transform: `translateY(${Y_SETTLED}%)`,
      easing: EASE_EXIT,
    },
    {
      offset: frameOffset(cell.exitStart + 12),
      transform: `translateY(${Y_EXIT}%)`,
    },
    // No entry fade: the pixel appears solid at the top of the frame and falls
    // in. Opacity stays 0 until the fall starts, then steps straight to full.
    { offset: frameOffset(cell.stagger), opacity: 0 },
    { offset: frameOffset(cell.stagger + 1), opacity: 1 },
    // Keep the fade on the way out, but a touch quicker: hold solid briefly,
    // then fade over the last part of the exit fall.
    { offset: frameOffset(cell.fadeOut[0]), opacity: 1 },
    {
      offset: frameOffset(
        cell.fadeOut[0] + (cell.fadeOut[1] - cell.fadeOut[0]) * 0.55
      ),
      opacity: 1,
      easing: EASE_FADE,
    },
    { offset: frameOffset(cell.fadeOut[1]), opacity: 0 },
  ];

  return keyframes.sort((a, b) => (a.offset as number) - (b.offset as number));
}

/**
 * Reduced-motion variant: the same staggered fade-in and fade-out as the full
 * build, but with no `translateY` fall. Pixels appear and disappear in place so
 * the loader still communicates ongoing activity without the large motion that
 * `prefers-reduced-motion` asks us to avoid.
 */
export function buildReducedMotionKeyframes(cell: Cell): Keyframe[] {
  return [
    { offset: frameOffset(cell.fadeIn[0]), opacity: 0, easing: EASE_FADE },
    { offset: frameOffset(cell.fadeIn[1]), opacity: 1 },
    { offset: frameOffset(cell.fadeOut[0]), opacity: 1, easing: EASE_FADE },
    { offset: frameOffset(cell.fadeOut[1]), opacity: 0 },
  ];
}

/** Fully settled appearance: full opacity, zero Y-offset. */
export const SETTLED_TRANSFORM = `translateY(${Y_SETTLED}%)`;
export const SETTLED_OPACITY = 1;
