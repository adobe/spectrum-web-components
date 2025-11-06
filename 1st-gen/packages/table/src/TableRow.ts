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
 * @element sp-table-row
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
    public override role = 'row';

    @property({ type: Boolean })
    public selectable = false;

    @property({ type: Boolean, reflect: true })
    public selected = false;

    @property({ type: String })
    public value = '';

    protected async handleChange(
        event: Event & { target: TableCheckboxCell }
    ): Promise<void> {
        if (!event.target.checkbox) {
            return;
        }

        this.selected = event.target.checkbox.checked;

        await 0;

        if (event.defaultPrevented) {
            this.selected = !this.selected;
        }
    }

    protected handleSlotchange({
        target,
    }: Event & { target: HTMLSlotElement }): void {
        const assignedElements = target.assignedElements();
        this.selectable = !!assignedElements.find(
            (el) => el.localName === 'sp-table-checkbox-cell'
        );
    }

    protected async manageSelected(): Promise<void> {
        await this.updateComplete;
        // Manage differently when parent table does not have `role="grid"`.
        // See: https://github.com/adobe/spectrum-web-components/issues/3397 and https://github.com/adobe/spectrum-web-components/issues/3395
        if (this.selectable) {
            this.setAttribute(
                'aria-selected',
                this.selected ? 'true' : 'false'
            );
        } else {
            this.removeAttribute('aria-selected');
        }
        const [checkboxCell] = this.checkboxCells;
        if (!checkboxCell) return;
        checkboxCell.checked = this.selected;
    }

    protected handleClick(event: Event): void {
        if (
            event
                .composedPath()
                .find(
                    (node) =>
                        (node as HTMLElement).localName ===
                        'sp-table-checkbox-cell'
                )
        ) {
            return;
        }
        const [checkboxCell] = this.checkboxCells;
        if (!checkboxCell) /* c8 ignore next */ return;
        checkboxCell.click();
    }

    protected override render(): TemplateResult {
        return html`
            <slot
                @change=${this.handleChange}
                @slotchange=${this.handleSlotchange}
            ></slot>
        `;
    }

    protected override willUpdate(changed: PropertyValues<this>): void {
        if (changed.has('selected')) {
            this.manageSelected();
        }
        if (changed.has('selectable')) {
            if (this.selectable) {
                this.addEventListener('click', this.handleClick);
            } else {
                this.removeEventListener('click', this.handleClick);
            }
        }
    }
}
