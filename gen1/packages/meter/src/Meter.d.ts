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
import { CSSResultArray, PropertyValues, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
import '@spectrum-web-components/field-label/sp-field-label.js';
export declare const meterVariants: string[];
export type MeterVariants = (typeof meterVariants)[number];
declare const Meter_base: typeof SpectrumElement & {
    new (...args: any[]): import("@spectrum-web-components/shared").SlotTextObservingInterface;
    prototype: import("@spectrum-web-components/shared").SlotTextObservingInterface;
} & import("@spectrum-web-components/base").Constructor<import("@spectrum-web-components/base").SizedElementInterface> & import("@spectrum-web-components/base").SizedElementConstructor;
/**
 * @element sp-meter
 *
 * @slot - text labeling the Meter
 */
export declare class Meter extends Meter_base {
    static get styles(): CSSResultArray;
    progress: number;
    /**
     * The variant applies specific styling when set to `negative`, `positive`, `notice`
     * `variant` attribute is removed when not matching one of the above.
     *
     * @param {string} variant
     */
    set variant(variant: MeterVariants);
    get variant(): MeterVariants;
    private _variant;
    label: string;
    private slotEl;
    private languageResolver;
    sideLabel: boolean;
    staticColor?: 'white';
    protected render(): TemplateResult;
    protected handleSlotchange(): void;
    protected firstUpdated(changes: PropertyValues): void;
    protected updated(changes: PropertyValues): void;
}
export {};
