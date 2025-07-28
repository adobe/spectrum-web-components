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
import '@spectrum-web-components/icons-ui/icons/sp-icon-arrow100.js';
export type SortedEventDetails = {
    sortDirection: 'asc' | 'desc';
    sortKey: string;
};
/**
 * @element sp-table-head-cell
 *
 * @fires sorted - Announces that the table head has been sorted and handles the sorted event
 */
export declare class TableHeadCell extends SpectrumElement {
    static get styles(): CSSResultArray;
    active: boolean;
    role: string;
    sortable: boolean;
    sortDirection: 'asc' | 'desc' | undefined;
    sortKey: string;
    protected handleKeydown(event: KeyboardEvent): void;
    private handleKeypress;
    protected handleKeyup(event: KeyboardEvent): void;
    protected handleClick(): void;
    protected render(): TemplateResult;
    protected firstUpdated(changes: PropertyValues): void;
    protected update(changes: PropertyValues): void;
}
