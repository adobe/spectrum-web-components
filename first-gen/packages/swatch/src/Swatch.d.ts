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
import { CSSResultArray, PropertyValues, TemplateResult } from '@spectrum-web-components/base';
import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-dash75.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-dash100.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-dash200.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-dash300.js';
export type SwatchBorder = 'light' | 'none' | undefined;
export type SwatchRounding = 'none' | 'full' | undefined;
export type SwatchShape = 'rectangle' | undefined;
declare const Swatch_base: typeof Focusable & {
    new (...args: any[]): import("@spectrum-web-components/base").SizedElementInterface;
    prototype: import("@spectrum-web-components/base").SizedElementInterface;
};
/**
 * @element sp-swatch
 */
export declare class Swatch extends Swatch_base {
    static get styles(): CSSResultArray;
    border: SwatchBorder;
    color: string;
    label: string;
    mixedValue: boolean;
    nothing: boolean;
    role: string;
    rounding: SwatchRounding;
    selected: boolean;
    shape: SwatchShape;
    get value(): string;
    set value(value: string);
    private _value?;
    get focusElement(): HTMLElement;
    toggle(force?: boolean): void;
    private handleClick;
    protected handleKeydown(event: KeyboardEvent): void;
    private handleKeypress;
    protected handleKeyup(event: KeyboardEvent): void;
    protected renderDisabled: () => TemplateResult;
    protected renderMixedValue: () => TemplateResult;
    protected render(): TemplateResult;
    protected willUpdate(changes: PropertyValues): void;
    protected firstUpdated(changes: PropertyValues): void;
}
export {};
