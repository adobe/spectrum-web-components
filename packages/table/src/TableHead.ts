/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import {
    CSSResultArray,
    html,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import type { TableHeadCell } from './TableHeadCell.js';
import { TableCheckboxCell } from './TableCheckboxCell.js';
import styles from './table-head.css.js';

/**
 * @element sp-table-head
 *
 * This component represents the table head row.
 */
export class TableHead extends SpectrumElement {
    /**
     * Returns the styles to be applied to the component
     */
    public static override get styles(): CSSResultArray {
        return [styles];
    }

    /**
     * The ARIA role of the table row.
     */
    @property({ reflect: true })
    public override role = 'row';

    /**
     * Indicates whether the table head row is selected.
     */
    @property({ type: Boolean, reflect: true })
    public selected?: boolean;

    /**
     * Handles the sorted event for the table head cells.
     * Resets the sort direction of all other cells except the target cell.
     */
    private handleSorted({ target }: Event): void {
        const childCells = [...this.children] as TableHeadCell[];

        childCells.forEach((cell) => {
            if (cell !== target) {
                cell.sortDirection = undefined;
            }
        });
    }

    /**
     * Handles the change event for the table head checkbox cell.
     * Updates the selected state based on the checkbox state.
     */
    protected handleChange({
        target: checkboxCell,
    }: Event & { target: TableCheckboxCell }): void {
        this.selected =
            checkboxCell.checkbox.checked ||
            checkboxCell.checkbox.indeterminate;
    }

    /**
     * Renders the component template.
     */
    protected override render(): TemplateResult {
        return html`
            <slot
                @sorted=${this.handleSorted}
                @change=${this.handleChange}
            ></slot>
        `;
    }
}
