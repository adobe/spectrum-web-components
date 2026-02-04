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

export const ASSET_VARIANTS = ['file', 'folder'] as const;

export type AssetVariant = (typeof ASSET_VARIANTS)[number];

// Image-specific types
export const LOADING_TYPES = ['lazy', 'eager'] as const;
export type LoadingType = (typeof LOADING_TYPES)[number];

export const OBJECT_FIT_VALUES = [
    'contain',
    'cover',
    'fill',
    'none',
    'scale-down',
] as const;
export type ObjectFit = (typeof OBJECT_FIT_VALUES)[number];

export const DECODING_TYPES = ['sync', 'async', 'auto'] as const;
export type DecodingType = (typeof DECODING_TYPES)[number];

export const CROSSORIGIN_VALUES = ['anonymous', 'use-credentials'] as const;
export type CrossOrigin = (typeof CROSSORIGIN_VALUES)[number];

export const REFERRERPOLICY_VALUES = [
    'no-referrer',
    'no-referrer-when-downgrade',
    'origin',
    'origin-when-cross-origin',
    'same-origin',
    'strict-origin',
    'strict-origin-when-cross-origin',
    'unsafe-url',
] as const;
export type ReferrerPolicy = (typeof REFERRERPOLICY_VALUES)[number];
