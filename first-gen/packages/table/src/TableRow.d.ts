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
import { TableCheckboxCell } from './TableCheckboxCell.js';
/**
 * @element sp-table-row
 *
 * @fires sorted - Announces that `selected` of the table row has changed
 */
export declare class TableRow extends SpectrumElement {
    static get styles(): CSSResultArray;
    checkboxCells: TableCheckboxCell[];
    role: string;
    selectable: boolean;
    selected: boolean;
    value: string;
    protected handleChange(event: Event & {
        target: TableCheckboxCell;
    }): Promise<void>;
    protected handleSlotchange({ target, }: Event & {
        target: HTMLSlotElement;
    }): void;
    protected manageSelected(): Promise<void>;
    protected handleClick(event: Event): void;
    protected render(): TemplateResult;
    protected willUpdate(changed: PropertyValues<this>): void;
}
