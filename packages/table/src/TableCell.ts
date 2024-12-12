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

import styles from './table-cell.css.js';

/**
 * @element sp-table-cell
 *
 * This component represents a cell within a table row.
 * @slot Cell content
 */
export class TableCell extends SpectrumElement {
    /**
     * Returns the styles to be applied to the component.
     */
    public static override get styles(): CSSResultArray {
        return [styles];
    }

    /**
     * Indicates the ARIA role of the cell.
     */
    @property({ reflect: true })
    public override role = 'gridcell';

    /**
     * Renders the component template.
     */
    protected override render(): TemplateResult {
        return html`
            <slot></slot>
        `;
    }
}
