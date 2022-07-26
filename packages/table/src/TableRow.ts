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
    PropertyValues,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    property,
    queryAssignedElements,
} from '@spectrum-web-components/base/src/decorators.js';
import styles from './table-row.css.js';
import { TableCheckboxCell } from './TableCheckboxCell.js';

/**
 * @element sp-table
 *
 * @fires sorted - Announces that `selected` of the table row has changed
 */
export class TableRow extends SpectrumElement {
    public static override get styles(): CSSResultArray {
        return [styles];
    }

    @queryAssignedElements({
        selector: 'sp-table-checkbox-cell',
        flatten: true,
    })
    checkboxCells!: TableCheckboxCell[];

    @property({ reflect: true })
    public role = 'row';

    @property({ type: Boolean, reflect: true })
    public selected = false;

    @property({ type: String })
    public value = '';

    protected async handleChange(
        event: Event & { target: TableCheckboxCell }
    ): Promise<void> {
        this.selected = event.target.checkbox.checked;

        await 0;

        if (event?.defaultPrevented) {
            this.selected = !this.selected;
        }
    }

    protected manageSelected(): void {
        const [checkboxCell] = this.checkboxCells;
        if (!checkboxCell) return;
        checkboxCell.checked = this.selected;
    }

    protected override render(): TemplateResult {
        return html`
            <slot @change=${this.handleChange}></slot>
        `;
    }

    protected override willUpdate(changed: PropertyValues<this>): void {
        if (changed.has('selected')) {
            this.manageSelected();
        }
    }
}
