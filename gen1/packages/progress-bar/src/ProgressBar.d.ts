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
declare const ProgressBar_base: typeof SpectrumElement & {
    new (...args: any[]): import("@spectrum-web-components/shared").SlotTextObservingInterface;
    prototype: import("@spectrum-web-components/shared").SlotTextObservingInterface;
} & import("@spectrum-web-components/base").Constructor<import("@spectrum-web-components/base").SizedElementInterface> & import("@spectrum-web-components/base").SizedElementConstructor;
/**
 * @element sp-progress-bar
 */
export declare class ProgressBar extends ProgressBar_base {
    static get styles(): CSSResultArray;
    indeterminate: boolean;
    label: string;
    private languageResolver;
    /**
     * @deprecated Use "static-color='white'" instead.
     */
    get overBackground(): boolean;
    set overBackground(overBackground: boolean);
    private _overBackground;
    sideLabel: boolean;
    progress: number;
    staticColor?: 'white';
    private slotEl;
    protected render(): TemplateResult;
    protected handleSlotchange(): void;
    protected firstUpdated(changes: PropertyValues): void;
    private formatProgress;
    protected updated(changes: PropertyValues): void;
}
export {};
