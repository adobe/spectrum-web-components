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
 * Valid numeric size values for the Thumbnail component.
 *
 * Matches the full 1st-gen scale; no new sizes are added in Spectrum 2.
 */
export const THUMBNAIL_VALID_SIZES = [
  50, 75, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000,
] as const;

export type ThumbnailSize = (typeof THUMBNAIL_VALID_SIZES)[number];

export const THUMBNAIL_DEFAULT_SIZE = 500 as const satisfies ThumbnailSize;

/**
 * Valid `fit` values for the Thumbnail component.
 *
 * Replaces 1st-gen's `cover` boolean; matches Asset's `AssetFit` naming.
 */
export const THUMBNAIL_VALID_FITS = ['cover', 'contain'] as const;

export type ThumbnailFit = (typeof THUMBNAIL_VALID_FITS)[number];

/**
 * `'contain'`, not Asset's `'cover'` default, to preserve 1st-gen's existing
 * non-cover default behavior.
 */
export const THUMBNAIL_DEFAULT_FIT = 'contain' as const satisfies ThumbnailFit;
