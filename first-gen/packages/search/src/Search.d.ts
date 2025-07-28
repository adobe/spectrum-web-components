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
import { Textfield } from '@spectrum-web-components/textfield';
import '@spectrum-web-components/button/sp-clear-button.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-search.js';
/**
 * @element sp-search
 * @slot help-text - default or non-negative help text to associate to your form element
 * @slot negative-help-text - negative help text to associate to your form element when `invalid`
 *
 * @fires submit - The search form has been submitted.
 */
export declare class Search extends Textfield {
    static get styles(): CSSResultArray;
    action: string;
    label: string;
    method?: 'get' | 'post' | 'dialog';
    placeholder: string;
    holdValueOnEscape: boolean;
    form: HTMLFormElement;
    private handleSubmit;
    private handleKeydown;
    reset(): Promise<void>;
    protected renderField(): TemplateResult;
    firstUpdated(changedProperties: PropertyValues): void;
    willUpdate(): void;
}
