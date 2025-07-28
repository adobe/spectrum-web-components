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
import '@spectrum-web-components/icons-ui/icons/sp-icon-asterisk100.js';
declare const FieldLabel_base: typeof SpectrumElement & {
    new (...args: any[]): import("@spectrum-web-components/base").SizedElementInterface;
    prototype: import("@spectrum-web-components/base").SizedElementInterface;
};
/**
 * @element sp-field-label
 *
 * @slot - text content of the label
 */
export declare class FieldLabel extends FieldLabel_base {
    static get styles(): CSSResultArray;
    disabled: boolean;
    id: string;
    for: string;
    required: boolean;
    slotEl: HTMLSlotElement;
    sideAligned?: 'start' | 'end';
    private target?;
    private handleClick;
    private resolvedElement;
    private applyTargetLabel;
    private manageTarget;
    private get labelText();
    protected render(): TemplateResult;
    protected firstUpdated(changes: PropertyValues): void;
    protected willUpdate(changes: PropertyValues): void;
}
export {};
