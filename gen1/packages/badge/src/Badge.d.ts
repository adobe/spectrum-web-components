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
import { CSSResultArray, TemplateResult } from '@spectrum-web-components/base';
import { BadgeBase } from './Badge.base.js';
import { type BadgeVariantS1, type FixedValues as FixedValuesBase } from './Badge.types.js';
/**
 * @deprecated The `BADGE_VARIANTS` export is deprecated and will be removed
 * in a future release. If needed, you can access the internal
 * `Badge.VARIANTS` property from the constructor.
 */
export declare const BADGE_VARIANTS: readonly ["accent", "informative", "neutral", "positive", "notice", "negative", "fuchsia", "indigo", "magenta", "purple", "seafoam", "yellow", "gray", "red", "orange", "chartreuse", "celery", "green", "cyan", "blue"];
/**
 * @deprecated The `FIXED_VALUES` export is deprecated and will be removed
 * in a future release. If needed, you can access the internal
 * `Badge.FIXED_VALUES` property from the constructor.
 */
export declare const FIXED_VALUES: readonly ["block-start", "block-end", "inline-start", "inline-end"];
/**
 * @deprecated The `BadgeVariant` type export is deprecated and will be removed
 * in a future release. If needed, you can infer this type from the `Badge`
 * prototype as follows: `typeof Badge.prototype.variant`
 */
export type BadgeVariant = BadgeVariantS1;
/**
 * @deprecated The `FixedValues` type export is deprecated and will be removed
 * in a future release. If needed, you can infer this type from the `Badge`
 * constructor as follows: `typeof Badge.FIXED_VALUES`
 */
export type FixedValues = FixedValuesBase;
/**
 * @element sp-badge
 *
 * @slot - Text label of the badge
 * @slot icon - Optional icon that appears to the left of the label
 */
export declare class Badge extends BadgeBase {
    /**
     * @internal
     */
    static readonly VARIANTS_COLOR: readonly ["fuchsia", "indigo", "magenta", "purple", "seafoam", "yellow", "gray", "red", "orange", "chartreuse", "celery", "green", "cyan", "blue"];
    /**
     * @internal
     */
    static readonly VARIANTS: readonly ["accent", "informative", "neutral", "positive", "notice", "negative", "fuchsia", "indigo", "magenta", "purple", "seafoam", "yellow", "gray", "red", "orange", "chartreuse", "celery", "green", "cyan", "blue"];
    /**
     * The variant of the badge.
     */
    variant: BadgeVariantS1;
    static get styles(): CSSResultArray;
    protected render(): TemplateResult;
}
