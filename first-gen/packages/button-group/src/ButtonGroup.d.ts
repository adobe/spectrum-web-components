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
declare const ButtonGroup_base: typeof SpectrumElement & {
    new (...args: any[]): import("@spectrum-web-components/base").SizedElementInterface;
    prototype: import("@spectrum-web-components/base").SizedElementInterface;
};
/**
 * @element sp-button-group
 * @slot - the sp-button elements that make up the group
 */
export declare class ButtonGroup extends ButtonGroup_base {
    static get styles(): CSSResultArray;
    vertical: boolean;
    slotElement: HTMLSlotElement;
    protected updated(changedProperties: PropertyValues): void;
    protected handleSlotchange({ target: slot, }: Event & {
        target: HTMLSlotElement;
    }): void;
    private manageChildrenSize;
    protected render(): TemplateResult;
}
export {};
