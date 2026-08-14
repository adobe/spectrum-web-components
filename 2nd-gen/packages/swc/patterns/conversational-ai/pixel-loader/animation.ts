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

/**
 * Per-cell entry/hold/exit choreography for the pixel loader, ported from the
 * React Spectrum implementation so the two match frame-for-frame. Each cell runs
 * two Web Animations (a `translate` drop and a `scale` pop), and the whole grid
 * runs one `opacity` envelope. `translate` and `scale` are separate animations
 * because each has its own per-segment easing, which a single merged keyframe
 * list could not express (a keyframe's easing applies to every property in it).
 */

import type { Cell } from './data.js';

const FPS = 30;
const ms2f = (ms: number): number => (ms * FPS) / 1000;

// Frames from a cell's launch to its settled rest, and to fall back out.
const DROP_SETTLE = 13;
const EXIT_FALL = 12;
// Constant assembled hold every cell observes after it settles.
const HOLD_FRAMES = ms2f(1400);

// Per-cell scale pop: entrance 10% -> 100% completing `ENT_LEAD` frames before
// the cell settles; exit 100% -> 30% starting as the cell begins to fall away.
const ENT_DUR = ms2f(150);
const ENT_LEAD = ms2f(150);
const ENT_FLOOR = 0.1;
const EXIT_DUR = ms2f(230);
const EXIT_FLOOR = 0.3;

// Group opacity envelope applied once to the cell-grid container.
const OP_FADE_IN = ms2f(400);
const OP_FADE_OUT = ms2f(400);

// Per-cell vertical offsets as a percentage of a cell's height (so the fall
// scales with `--swc-pixel-loader-size`). These are RSP's px offsets (-26/1/26)
// expressed relative to its default cell (size 21 / 7 = 3px), i.e. ~8.7 cells,
// so pixels start well above the frame and read as falling from the top at any
// size rather than only at RSP's small default size.
const Y_START = (-26 / 3) * 100;
const Y_OVERSHOOT = (1 / 3) * 100;
const Y_EXIT = (26 / 3) * 100;

/**
 * The "settle" curve a cell eases along as it comes to rest. Shared: it is both
 * the drop's recover segment here and the finish-then-swap ease in PixelLoader,
 * which must match so an interrupted build settles identically to a normal one.
 */
export const SETTLE_EASING = 'cubic-bezier(0.333, 0, 0.833, 1)';

const EASE = {
  drop: 'cubic-bezier(0.333, 0, 0.667, 1)',
  recover: SETTLE_EASING,
  exit: 'cubic-bezier(0.563, 0, 0.906, 0.757)',
  fade: 'cubic-bezier(0.167, 0.167, 0.833, 0.833)',
  scaleIn: 'cubic-bezier(0.505, 0.015, 0.42, 0.938)',
  scaleOut: 'cubic-bezier(0.538, 0.017, 0.851, 0.357)',
} as const;

/** Frame at which a cell begins its exit fall: a constant hold after it settles. */
export function exitStartOf(cell: Cell): number {
  return cell.stagger + DROP_SETTLE + HOLD_FRAMES;
}

/**
 * Loop length in frames. It grows with the icon's stagger spread so every cell
 * shares one settle -> hold -> exit cadence.
 */
export function loopFramesFor(cells: readonly Cell[]): number {
  let maxStagger = 1;
  for (const cell of cells) {
    maxStagger = Math.max(maxStagger, cell.stagger);
  }
  return maxStagger + DROP_SETTLE + HOLD_FRAMES + EXIT_FALL;
}

/** Duration of one assemble/hold/disassemble cycle for the given icon, in ms. */
export function durationForCells(cells: readonly Cell[]): number {
  return (loopFramesFor(cells) / FPS) * 1000;
}

function offset(frame: number, total: number): number {
  return Math.min(1, Math.max(0, frame / total));
}

// Keyframes are built in ascending frame order, so equal offsets are adjacent;
// keep the first at each offset (matching the reference) to avoid Web Animations
// discontinuities from duplicate stops.
function dedupe(frames: Keyframe[]): Keyframe[] {
  const out: Keyframe[] = [];
  let last: number | null = null;
  for (const frame of frames) {
    const value = frame.offset as number;
    if (value === last) {
      continue;
    }
    last = value;
    out.push(frame);
  }
  return out;
}

/** Vertical drop keyframes for one cell (the `translate` property). */
export function cellTranslateKeyframes(cell: Cell, total: number): Keyframe[] {
  const start = cell.stagger;
  const exit = exitStartOf(cell);
  const frames: Keyframe[] = [
    {
      offset: 0,
      translate: `0 ${Y_START}%`,
      easing: start > 0 ? 'linear' : EASE.drop,
    },
  ];
  if (start > 0) {
    frames.push({
      offset: offset(start, total),
      translate: `0 ${Y_START}%`,
      easing: EASE.drop,
    });
  }
  frames.push({
    offset: offset(start + 10, total),
    translate: `0 ${Y_OVERSHOOT}%`,
    easing: EASE.recover,
  });
  frames.push({
    offset: offset(start + DROP_SETTLE, total),
    translate: '0 0%',
    easing: 'linear',
  });
  frames.push({
    offset: offset(exit, total),
    translate: '0 0%',
    easing: EASE.exit,
  });
  frames.push({
    offset: offset(exit + EXIT_FALL, total),
    translate: `0 ${Y_EXIT}%`,
    easing: 'linear',
  });
  frames.push({ offset: 1, translate: `0 ${Y_EXIT}%` });
  return dedupe(frames);
}

/** Scale pop keyframes for one cell (the `scale` property). */
export function cellScaleKeyframes(cell: Cell, total: number): Keyframe[] {
  const inEnd = cell.stagger + DROP_SETTLE - ENT_LEAD;
  const inStart = inEnd - ENT_DUR;
  const outStart = exitStartOf(cell);
  const outEnd = outStart + EXIT_DUR;
  const frames: Keyframe[] = [
    { offset: 0, scale: '0', easing: 'linear' },
    {
      offset: offset(inStart, total),
      scale: String(ENT_FLOOR),
      easing: EASE.scaleIn,
    },
    { offset: offset(inEnd, total), scale: '1', easing: 'linear' },
    { offset: offset(outStart, total), scale: '1', easing: EASE.scaleOut },
    {
      offset: offset(outEnd, total),
      scale: String(EXIT_FLOOR),
      easing: 'linear',
    },
    {
      offset: offset(outStart + EXIT_FALL, total),
      scale: '0',
      easing: 'linear',
    },
    { offset: 1, scale: '0' },
  ];
  return dedupe(frames);
}

/** Group opacity envelope keyframes for the cell-grid container. */
export function groupOpacityKeyframes(total: number): Keyframe[] {
  return [
    { offset: 0, opacity: 0, easing: EASE.fade },
    { offset: offset(OP_FADE_IN, total), opacity: 1, easing: 'linear' },
    {
      offset: offset(total - OP_FADE_OUT, total),
      opacity: 1,
      easing: EASE.fade,
    },
    { offset: 1, opacity: 0 },
  ];
}

/** Fully settled appearance: full size, full opacity, no vertical offset. */
export const SETTLED_TRANSLATE = '0 0px';
export const SETTLED_SCALE = '1';
export const SETTLED_OPACITY = 1;
