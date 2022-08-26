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
 * @element sp-table
 *
 */
export class TableHead extends SpectrumElement {
    public static override get styles(): CSSResultArray {
        return [styles];
    }

    @property({ reflect: true })
    public role = 'row';

    @property({ type: Boolean, reflect: true })
    public selected?: boolean;

    private handleSorted({ target }: Event): void {
        const childCells = [...this.children] as TableHeadCell[];
        childCells.forEach((cell) => {
            if (cell !== target) {
                cell.sortDirection = undefined;
            }
        });
    }

    protected handleChange({
        target: checkboxCell,
    }: Event & { target: TableCheckboxCell }): void {
        this.selected =
            checkboxCell.checkbox.checked ||
            checkboxCell.checkbox.indeterminate;
    }

    protected override render(): TemplateResult {
        return html`
            <slot
                @sorted=${this.handleSorted}
                @change=${this.handleChange}
            ></slot>
        `;
    }
}
