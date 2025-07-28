/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import { CSSResultArray, ElementSize, PropertyValues, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
import { RovingTabindexController } from '@spectrum-web-components/reactive-controllers/src/RovingTabindex.js';
import type { Swatch, SwatchBorder, SwatchRounding, SwatchShape } from './Swatch.js';
export type SwatchGroupSizes = Exclude<ElementSize, 'xxs' | 'xl' | 'xxl'>;
export type SwatchSelects = 'single' | 'multiple' | undefined;
declare const SwatchGroup_base: typeof SpectrumElement & {
    new (...args: any[]): import("@spectrum-web-components/base").SizedElementInterface;
    prototype: import("@spectrum-web-components/base").SizedElementInterface;
};
/**
 * @element sp-swatch-group
 *
 * @slot - Swatch elements to manage as a group
 */
export declare class SwatchGroup extends SwatchGroup_base {
    static get styles(): CSSResultArray;
    border: SwatchBorder;
    density: 'compact' | 'spacious' | undefined;
    rounding: SwatchRounding;
    get selected(): string[];
    set selected(selected: string[]);
    private _selected;
    selects: SwatchSelects;
    private selectedSet;
    shape: SwatchShape;
    swatches: Swatch[];
    constructor();
    rovingTabindexController: RovingTabindexController<Swatch>;
    focus(options?: FocusOptions): void;
    protected handleChange(event: Event & {
        target: Swatch;
    }): void;
    private manageChange;
    private getPassthroughSwatchActions;
    private getSelectionSwatchActions;
    protected render(): TemplateResult;
    protected willUpdate(changes: PropertyValues<this>): void;
}
export {};
