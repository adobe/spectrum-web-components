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
declare const FieldGroup_base: typeof SpectrumElement & {
    new (...args: any[]): import("@spectrum-web-components/help-text/src/manage-help-text.js").HelpTextElementInterface;
    prototype: import("@spectrum-web-components/help-text/src/manage-help-text.js").HelpTextElementInterface;
};
/**
 * @element sp-field-group
 * @slot - the form controls that make up the group
 * @slot help-text - default or non-negative help text to associate to your form element
 * @slot negative-help-text - negative help text to associate to your form element when `invalid`
 */
export declare class FieldGroup extends FieldGroup_base {
    static get styles(): CSSResultArray;
    horizontal: boolean;
    invalid: boolean;
    label: string;
    vertical: boolean;
    protected handleSlotchange(): void;
    protected render(): TemplateResult;
    protected firstUpdated(changes: PropertyValues): void;
    protected updated(changes: PropertyValues<this>): void;
}
export {};
