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

/*
 * @todo The S1 types can be removed once we are no longer maintaining 1st-gen.
 */

/**
 * Button variants supported across both S1 and S2.
 */
export const BUTTON_VARIANTS = [
    'accent',
    'primary',
    'secondary',
    'negative',
] as const;

export type ButtonVariant = (typeof BUTTON_VARIANTS)[number];

/**
 * Button treatments (fill or outline).
 */
export const BUTTON_TREATMENTS = ['fill', 'outline'] as const;

export type ButtonTreatment = (typeof BUTTON_TREATMENTS)[number];

/**
 * Static color variants for use over backgrounds.
 */
export const BUTTON_STATIC_COLORS = ['white', 'black'] as const;

export type ButtonStaticColor = (typeof BUTTON_STATIC_COLORS)[number];

/**
 * Deprecated variant values that map to current API.
 * - 'cta' → 'accent'
 * - 'overBackground' → static-color='white' + treatment='outline'
 * - 'white' → static-color='white'
 * - 'black' → static-color='black'
 */
export type DeprecatedButtonVariant =
    | 'cta'
    | 'overBackground'
    | 'white'
    | 'black';

/**
 * Form button types.
 */
export type ButtonType = 'button' | 'submit' | 'reset';
