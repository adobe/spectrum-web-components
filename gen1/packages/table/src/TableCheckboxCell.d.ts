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
import { Checkbox } from '@spectrum-web-components/checkbox';
import '@spectrum-web-components/checkbox/sp-checkbox.js';
/**
 * @element sp-table-checkbox-cell
 */
export declare class TableCheckboxCell extends SpectrumElement {
    static get styles(): CSSResultArray;
    /**
     * Whether or not the checkbox cell is in the table head.
     */
    headCell: boolean;
    role: string;
    checkbox: Checkbox;
    indeterminate: boolean;
    checked: boolean;
    disabled: boolean;
    selectsSingle: boolean;
    emphasized: boolean;
    /**
     * The accessible label for the checkbox. For header rows, this defaults to 'Select All'.
     * For body rows, this should be set to the text content of the first cell in the row.
     */
    label: string;
    click(): void;
    /**
     * Updates the aria-label on the checkbox's internal input element.
     */
    private updateInputAriaLabel;
    protected updated(changed: PropertyValues): Promise<void>;
    protected firstUpdated(changed: PropertyValues): Promise<void>;
    protected render(): TemplateResult;
}
