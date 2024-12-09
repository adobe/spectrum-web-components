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
import styles from './table-body.css.js';
import { MutationController } from '@lit-labs/observers/mutation-controller.js';

/**
 * @element sp-table-body
 *
 * This component represents the body of a table.
 *
 * @slot - The rows of the table.
 */
export class TableBody extends SpectrumElement {
    /**
     * Returns the styles to be applied to the component.
     */
    public static override get styles(): CSSResultArray {
        return [styles];
    }

    constructor() {
        super();
        new MutationController(this, {
            config: {
                childList: true,
                subtree: true,
            },
            callback: () => {
                requestAnimationFrame(() => {
                    this.shouldHaveTabIndex();
                });
            },
        });
    }

    /**
     * Determines if the table body should have a tabindex attribute based on its scroll height.
     */
    protected shouldHaveTabIndex(): void {
        if (this.offsetHeight < this.scrollHeight) {
            this.tabIndex = 0;
        } else {
            this.removeAttribute('tabindex');
        }
    }

    /**
     * The ARIA role of the table body.
     * @property {string}
     */
    @property({ reflect: true })
    public override role = 'rowgroup';

    /**
     * Renders the component template.
     */
    protected override render(): TemplateResult {
        return html`
            <slot></slot>
        `;
    }
}
