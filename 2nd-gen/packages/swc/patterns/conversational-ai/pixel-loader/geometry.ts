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

export interface CornerRadii {
  topLeft: boolean;
  topRight: boolean;
  bottomRight: boolean;
  bottomLeft: boolean;
}

const cornerRadiiCache = new WeakMap<readonly Cell[], CornerRadii[]>();

/**
 * A cell's corner is rounded only when both orthogonal neighbors adjacent to
 * that corner are empty. Adjacent filled cells join into flat edges; only
 * outward-facing corners round.
 *
 * Cached by `cells` identity: every icon's cell list is a stable, unchanging
 * array (see `data.ts`), so this only does real work once per icon rather
 * than on every render.
 */
export function computeCornerRadii(cells: readonly Cell[]): CornerRadii[] {
  const cached = cornerRadiiCache.get(cells);
  if (cached) {
    return cached;
  }

  const filled = new Set(cells.map((cell) => `${cell.col},${cell.row}`));
  const isFilled = (col: number, row: number): boolean =>
    filled.has(`${col},${row}`);

  const radii = cells.map(({ col, row }) => {
    const left = isFilled(col - 1, row);
    const right = isFilled(col + 1, row);
    const top = isFilled(col, row - 1);
    const bottom = isFilled(col, row + 1);

    return {
      topLeft: !left && !top,
      topRight: !right && !top,
      bottomRight: !right && !bottom,
      bottomLeft: !left && !bottom,
    };
  });

  cornerRadiiCache.set(cells, radii);
  return radii;
}

/** Converts a cell's corner flags into a CSS `border-radius` shorthand value. */
export function cornerRadiiToBorderRadius(
  radii: CornerRadii,
  radius: string
): string {
  const topLeft = radii.topLeft ? radius : '0';
  const topRight = radii.topRight ? radius : '0';
  const bottomRight = radii.bottomRight ? radius : '0';
  const bottomLeft = radii.bottomLeft ? radius : '0';

  return `${topLeft} ${topRight} ${bottomRight} ${bottomLeft}`;
}
