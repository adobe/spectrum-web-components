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
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import styles from './table-body.css.js';
import { MutationController } from '@lit-labs/observers/mutation-controller.js';

/**
 * @element sp-table-body
 */
export class TableBody extends SpectrumElement {
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

    protected shouldHaveTabIndex(): void {
        if (this.offsetHeight < this.scrollHeight) {
            this.tabIndex = 0;
        } else {
            this.removeAttribute('tabindex');
        }
    }

    @property({ reflect: true })
    public override role = 'rowgroup';

    protected override render(): TemplateResult {
        return html`
            <slot></slot>
        `;
    }
}
