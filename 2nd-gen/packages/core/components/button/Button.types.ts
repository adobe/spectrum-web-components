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
 * Core button variants supported across both S1 and S2.
 */
export const BUTTON_VARIANTS_SEMANTIC = [
    'accent',
    'primary',
    'secondary',
    'negative',
] as const;

/**
 * Deprecated variant values that were valid in S1 but map to current API in S2.
 * - 'cta' → 'accent'
 * - 'overBackground' → static-color='white' + treatment='outline'
 * - 'white' → static-color='white'
 * - 'black' → static-color='black'
 */
export const BUTTON_VARIANTS_DEPRECATED = [
    'cta',
    'overBackground',
    'white',
    'black',
] as const;

/**
 * S1 button variants (includes deprecated variants for backwards compatibility).
 */
export const BUTTON_VARIANTS_S1 = [
    ...BUTTON_VARIANTS_SEMANTIC,
    ...BUTTON_VARIANTS_DEPRECATED,
] as const;

/**
 * S2 button variants (only semantic variants, no deprecated values).
 */
export const BUTTON_VARIANTS_S2 = BUTTON_VARIANTS_SEMANTIC;

export type ButtonVariantS1 = (typeof BUTTON_VARIANTS_S1)[number];
export type ButtonVariantS2 = (typeof BUTTON_VARIANTS_S2)[number];
export type ButtonVariant = ButtonVariantS1 | ButtonVariantS2;

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
 * Form button types.
 */
export type ButtonType = 'button' | 'submit' | 'reset';
