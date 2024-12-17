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
import '@spectrum-web-components/checkbox/sp-checkbox.js';
import {
    property,
    query,
} from '@spectrum-web-components/base/src/decorators.js';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';
import styles from './table-checkbox-cell.css.js';
import { Checkbox } from '@spectrum-web-components/checkbox';

/**
 * @element sp-table-checkbox-cell
 *
 * This component represents a checkbox cell within a table.
 */
export class TableCheckboxCell extends SpectrumElement {
    /**
     * Returns the styles to be applied to the component.
     */
    public static override get styles(): CSSResultArray {
        return [styles];
    }

    /**
     * Whether or not the checkbox cell is in the table head.
     */
    @property({ type: Boolean, reflect: true, attribute: 'head-cell' })
    public headCell = false;

    /**
     * The ARIA role of the table cell.
     */
    @property({ reflect: true })
    public override role = 'gridcell';

    /**
     * The checkbox element within the cell.
     */
    @query('.checkbox')
    public checkbox!: Checkbox;

    /**
     * Whether or not the checkbox is in an indeterminate state.
     */
    @property({ type: Boolean })
    public indeterminate = false;

    /**
     * Whether or not the checkbox is checked.
     */
    @property({ type: Boolean })
    public checked = false;

    /**
     * Whether or not the checkbox is disabled.
     */
    @property({ type: Boolean })
    public disabled = false;

    /**
     * Whether or not the checkbox selects a single row.
     */
    @property({ type: Boolean, reflect: true, attribute: 'selects-single' })
    public selectsSingle = false;

    /**
     * Whether or not the checkbox is emphasized.
     */
    @property({ type: Boolean, reflect: true })
    public emphasized = false;

    /**
     * Simulates a click on the checkbox.
     */
    public override click(): void {
        this.checkbox.click();
    }

    /**
     * Renders the component template.
     */
    protected override render(): TemplateResult {
        return html`
            <sp-checkbox
                ?checked=${this.checked}
                ?indeterminate=${this.indeterminate}
                ?disabled=${this.disabled}
                ?emphasized=${this.emphasized}
                aria-hidden=${ifDefined(this.selectsSingle)}
                class="checkbox"
            ></sp-checkbox>
        `;
    }
}
