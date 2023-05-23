/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import {
    html,
    LitElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';

export class MenuTest extends LitElement {
    @property({ type: Number })
    propCount = 0;

    private handleClick(): void {
        this.propCount += 1;
    }

    private _renderMenu(): TemplateResult {
        return html`
            <sp-menu>
                <sp-menu-item value="item-1">Deselect</sp-menu-item>
                <sp-menu-item value="item-2">Select inverse</sp-menu-item>
                <sp-menu-item value="item-3">Feather...</sp-menu-item>
                <sp-menu-item value="item-4">Select and mask...</sp-menu-item>
                <sp-menu-item value="item-5">Save selection</sp-menu-item>
                <sp-menu-item value="item-6" disabled>
                    Make work path
                </sp-menu-item>
            </sp-menu>
        `;
    }

    override render(): TemplateResult {
        return html`
            <div>Clicks: ${this.propCount}</div>
            <sp-button
                slot="trigger"
                variant="positive"
                @click=${this.handleClick}
            >
                Show/Hide
            </sp-button>
            ${this.propCount % 2 === 0 ? this._renderMenu() : html``}
        `;
    }
}

customElements.define('menu-test', MenuTest);
