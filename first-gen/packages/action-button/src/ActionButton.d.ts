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
import { ButtonBase } from '@spectrum-web-components/button';
import '@spectrum-web-components/icons-ui/icons/sp-icon-corner-triangle300.js';
export declare const LONGPRESS_DURATION = 300;
export type LongpressEvent = {
    source: 'pointer' | 'keyboard';
};
declare const ActionButton_base: typeof ButtonBase & {
    new (...args: any[]): import("@spectrum-web-components/base").SizedElementInterface;
    prototype: import("@spectrum-web-components/base").SizedElementInterface;
};
/**
 * @element sp-action-button
 *
 * @slot - text label of the Action Button
 * @slot icon - The icon to use for Action Button
 * @fires change - Announces a change in the `selected` property of an action button
 * @fires longpress - Synthesizes a "longpress" interaction that signifies a
 * `pointerdown` event that is >=300ms or a keyboard event where code is `Space` or code is `ArrowDown`
 * while `altKey===true`.
 */
export declare class ActionButton extends ActionButton_base {
    static get styles(): CSSResultArray;
    emphasized: boolean;
    holdAffordance: boolean;
    quiet: boolean;
    role: string;
    /**
     * Whether an Action Button with `role='button'`
     * should also be `aria-pressed='true'`
     */
    selected: boolean;
    /**
     * Whether to automatically manage the `selected`
     * attribute on interaction and whether `aria-pressed="false"`
     * should be used when `selected === false`
     */
    toggles: boolean;
    /**
     * The static color variant to use for the action button.
     */
    staticColor?: 'white' | 'black';
    get value(): string;
    set value(value: string);
    private _value;
    /**
     * @private
     */
    get itemText(): string;
    constructor();
    private onClick;
    private handlePointerdownHoldAffordance;
    private handlePointerupHoldAffordance;
    /**
     * @private
     */
    protected handleKeydown(event: KeyboardEvent): void;
    protected handleKeyup(event: KeyboardEvent): void;
    protected get buttonContent(): TemplateResult[];
    protected updated(changes: PropertyValues): void;
}
declare global {
    interface GlobalEventHandlersEventMap {
        longpress: CustomEvent<LongpressEvent>;
    }
}
export {};
