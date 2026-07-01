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

import Color from 'colorjs.io';

/**
 * Adaptive white-first dual-border contrast helper (SWC-2295, RSP-2021,
 * SDS-16402).
 *
 * The color handle renders a dark border, a white separator, and a second dark
 * border. To meet WCAG 1.4.11 non-text contrast (≥3:1) across the color
 * spectrum, the opacity (α) of the dark borders is computed adaptively:
 *
 * - If the white separator already meets 3:1 against the underlying color, the
 *   dark borders stay at the floor opacity for softer, uniform chrome
 *   (white-first).
 * - Otherwise α climbs from the floor until the dark border itself meets 3:1.
 *
 * **v1 limitation (A1):** the underlying color is approximated by the handle's
 * own `color`, not by sampling the surrounding gradient. This is accurate on
 * smooth gradients and approximate at steep or saturated edges.
 */

/** Minimum dark-border opacity (matches the 1st-gen static 42%). */
export const COLOR_HANDLE_ALPHA_FLOOR = 0.42;

/** WCAG 1.4.11 non-text contrast target. */
export const COLOR_HANDLE_CONTRAST_TARGET = 3;

type Rgb = [number, number, number];

const WHITE: Rgb = [255, 255, 255];

function srgbToLinear(channel: number): number {
  const c = channel / 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function relativeLuminance([r, g, b]: Rgb): number {
  return (
    0.2126 * srgbToLinear(r) +
    0.7152 * srgbToLinear(g) +
    0.0722 * srgbToLinear(b)
  );
}

/** Standard WCAG 2.2 contrast ratio between two opaque sRGB colors. */
export function contrastRatio(colorA: Rgb, colorB: Rgb): number {
  const la = relativeLuminance(colorA);
  const lb = relativeLuminance(colorB);
  const hi = Math.max(la, lb);
  const lo = Math.min(la, lb);
  return (hi + 0.05) / (lo + 0.05);
}

/**
 * Predicts the rendered color of a black border painted at opacity α over an
 * opaque background.
 */
export function compositeBlackOver([r, g, b]: Rgb, alpha: number): Rgb {
  return [
    Math.round(r * (1 - alpha)),
    Math.round(g * (1 - alpha)),
    Math.round(b * (1 - alpha)),
  ];
}

/**
 * The minimum α in `[floor, 1]` that makes a black border composited over
 * `adjacency` meet `target` contrast against that same adjacency.
 */
export function findMinAlpha(
  adjacency: Rgb,
  target: number = COLOR_HANDLE_CONTRAST_TARGET,
  floor: number = COLOR_HANDLE_ALPHA_FLOOR
): number {
  for (let a = floor; a <= 1 + 1e-9; a += 0.01) {
    if (contrastRatio(compositeBlackOver(adjacency, a), adjacency) >= target) {
      return Math.min(1, Math.round(a * 100) / 100);
    }
  }
  return 1;
}

/**
 * Parses a CSS color string to opaque sRGB channels in `[0, 255]`. Alpha is
 * intentionally dropped: the border sits over the composited swatch, whose hue
 * is what matters for the contrast decision. Returns `null` for unparseable
 * input so callers can fall back to the floor.
 */
function parseToRgb255(color: string): Rgb | null {
  try {
    const { r, g, b } = new Color(color).to('srgb').srgb as unknown as {
      r: number;
      g: number;
      b: number;
    };
    const clamp = (c: number): number =>
      Math.max(0, Math.min(255, Math.round(c * 255)));
    return [clamp(r), clamp(g), clamp(b)];
  } catch {
    return null;
  }
}

/**
 * Computes the adaptive dark-border opacity for a handle showing `color`,
 * using the white-first strategy. Returns the floor when `color` cannot be
 * parsed so the border is never weaker than 1st-gen.
 */
export function computeBorderAlpha(
  color: string,
  {
    target = COLOR_HANDLE_CONTRAST_TARGET,
    floor = COLOR_HANDLE_ALPHA_FLOOR,
  }: { target?: number; floor?: number } = {}
): number {
  const adjacency = parseToRgb255(color);
  if (!adjacency) {
    return floor;
  }
  // White-first: if the white separator already carries 3:1, keep the softer
  // floor; otherwise escalate α until the dark border itself passes.
  if (contrastRatio(WHITE, adjacency) >= target) {
    return floor;
  }
  return findMinAlpha(adjacency, target, floor);
}
