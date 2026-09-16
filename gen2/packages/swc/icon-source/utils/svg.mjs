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

import { optimize } from 'svgo';

// A4U fills paths with its own token; rewrite to the SWC icon color contract.
// Case-insensitive because SVGO may lowercase the custom-property name.
export const A4U_FILL = /var\(--iconPrimary[^)]*\)/gi;
export const SWC_FILL = 'var(--swc-icon-color, currentColor)';

/**
 * Clean a raw A4U SVG for either icon family. Rewrites the A4U fill to the SWC icon
 * color contract, then runs SVGO (`preset-default` keeps the `viewBox` in v4;
 * `removeDimensions` drops `width`/`height` so the element sizes the box). Family
 * generators share this so cleanup stays identical across UI and workflow icons.
 */
export function cleanSvg(raw, file) {
  // Rewrite the fill before SVGO so the source token is gone before SVGO can mangle the
  // custom-property casing.
  const withColor = raw.replace(A4U_FILL, SWC_FILL);
  const { data } = optimize(withColor, {
    path: file,
    multipass: true,
    plugins: ['preset-default', 'removeDimensions'],
  });
  // Normalize any casing SVGO applied inside the color var.
  return data.replace(/var\(--swc-icon-color[^)]*\)/gi, SWC_FILL).trim();
}
