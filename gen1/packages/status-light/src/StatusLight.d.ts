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
import { CSSResultArray, PropertyValues, TemplateResult } from '@spectrum-web-components/base';
import { StatusLightBase } from './StatusLight.base.js';
import { type StatusLightVariantS1 } from './StatusLight.types.js';
/**
 * @deprecated The `STATUSLIGHT_VARIANTS` export is deprecated and will be removed
 * in a future release. If needed, you can access the internal
 * `StatusLight.VARIANTS` property from the constructor.
 */
export declare const STATUSLIGHT_VARIANTS: readonly ["neutral", "info", "positive", "negative", "notice", "accent", "fuchsia", "indigo", "magenta", "purple", "seafoam", "yellow", "chartreuse", "celery", "cyan"];
/**
 * @deprecated The `StatusLightVariant` type export is deprecated and will be removed
 * in a future release. If needed, you can infer this type from the `StatusLight`
 * prototype as follows: `typeof StatusLight.prototype.variant`
 */
export type StatusLightVariant = StatusLightVariantS1;
/**
 * @element sp-status-light
 *
 * @slot - text label of the Status Light
 */
export declare class StatusLight extends StatusLightBase {
    /**
     * @internal
     */
    static readonly VARIANTS_COLOR: readonly ["fuchsia", "indigo", "magenta", "purple", "seafoam", "yellow", "chartreuse", "celery", "cyan"];
    /**
     * @internal
     */
    static readonly VARIANTS_SEMANTIC: readonly ["neutral", "info", "positive", "negative", "notice", "accent"];
    /**
     * @internal
     */
    static readonly VARIANTS: readonly ["neutral", "info", "positive", "negative", "notice", "accent", "fuchsia", "indigo", "magenta", "purple", "seafoam", "yellow", "chartreuse", "celery", "cyan"];
    /**
     * The variant of the status light.
     */
    variant: StatusLightVariantS1;
    /**
     * @deprecated The `disabled` property is is deprecated and will be removed
     * in a future release.
     *
     * A status light in a disabled state shows that a status exists, but is not available in that circumstance. This can be used to maintain layout continuity and communicate that a status may become available later.
     */
    disabled: boolean;
    protected updated(changes: PropertyValues): void;
    static get styles(): CSSResultArray;
    protected render(): TemplateResult;
}
