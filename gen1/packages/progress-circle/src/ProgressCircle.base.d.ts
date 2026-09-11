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
import { PropertyValues, SpectrumElement } from '@spectrum-web-components/base';
import { ProgressCircleStaticColor } from './ProgressCircle.types.js';
declare const ProgressCircleBase_base: typeof SpectrumElement & import("@spectrum-web-components/base").Constructor<import("@spectrum-web-components/base").SizedElementInterface> & import("@spectrum-web-components/base").SizedElementConstructor;
/**
 * A progress circle component that visually represents the completion progress of a task.
 * Can be used in both determinate (with specific progress value) and indeterminate (loading) states.
 *
 * @attribute {ElementSize} size - The size of the progress circle.
 *
 * @slot - Accessible label for the progress circle.
 */
export declare abstract class ProgressCircleBase extends ProgressCircleBase_base {
    /**
     * @internal
     *
     * A readonly array of the valid static colors for the progress circle.
     */
    static readonly STATIC_COLORS: readonly string[];
    /**
     * @internal
     *
     * Static color variant for use on different backgrounds.
     */
    staticColor?: ProgressCircleStaticColor;
    /**
     * Whether the progress circle shows indeterminate progress (loading state).
     */
    indeterminate: boolean;
    /**
     * Accessible label for the progress circle.
     */
    label: string;
    /**
     * Progress value from 0 to 100.
     */
    progress: number;
    private languageResolver;
    /**
     * @internal
     */
    private slotEl;
    protected makeRotation(rotation: number): string | undefined;
    protected handleSlotchange(): void;
    protected firstUpdated(changes: PropertyValues): void;
    private formatProgress;
    protected updated(changes: PropertyValues): void;
}
export {};
