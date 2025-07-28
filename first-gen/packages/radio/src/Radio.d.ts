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
import { CSSResultArray, PropertyValues, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
declare const Radio_base: typeof SpectrumElement & {
    new (...args: any[]): import("@spectrum-web-components/base").SizedElementInterface;
    prototype: import("@spectrum-web-components/base").SizedElementInterface;
};
/**
 * @element sp-radio
 *
 * @slot - text label of the Radio button
 * @attr invalid - Uses the invalid style
 * @attr disabled - Uses the disabled style
 * @attr checked - Represents when the input is checked
 * @attr value - Identifies this radio button within its radio group
 *
 * @fires change - When the input is interacted with and its state is changed
 */
export declare class Radio extends Radio_base {
    static get styles(): CSSResultArray;
    /**
     * When this control is rendered, focus it automatically
     * @private
     */
    autofocus: boolean;
    value: string;
    checked: boolean;
    disabled: boolean;
    emphasized: boolean;
    invalid: boolean;
    readonly: boolean;
    click(): void;
    protected manageAutoFocus(): void;
    protected activate(): void;
    protected handleKeyup(event: KeyboardEvent): void;
    protected render(): TemplateResult;
    protected firstUpdated(changes: PropertyValues): void;
    protected updated(changes: PropertyValues): void;
}
export {};
