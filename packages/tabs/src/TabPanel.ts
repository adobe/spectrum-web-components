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
    html,
    PropertyValues,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import { randomID } from '@spectrum-web-components/shared/src/random-id.js';

import panelStyles from './tab-panel.css.js';

/**
 * @element sp-tab-panel
 *
 * @slot - content of the Tab Panel
 */
export class TabPanel extends SpectrumElement {
    static override styles = [panelStyles];

    @property({ type: Boolean, reflect: true })
    public selected = false;

    @property({ type: String, reflect: true })
    public value = '';

    protected handleFocusin(): void {
        this.removeAttribute('tabindex');
    }

    protected handleFocusout(): void {
        this.tabIndex = this.selected ? 0 : -1;
    }

    protected override render(): TemplateResult {
        return html`
            <slot
                @focusin=${this.handleFocusin}
                @focusout=${this.handleFocusout}
            ></slot>
        `;
    }

    protected override firstUpdated(): void {
        this.slot = 'tab-panel';
        this.setAttribute('role', 'tabpanel');
        this.tabIndex = 0;
        if (!this.hasAttribute('id')) {
            this.id = `sp-tab-panel-${randomID()}`;
        }
    }

    protected override updated(changes: PropertyValues<this>): void {
        if (changes.has('selected')) {
            if (this.selected) {
                this.removeAttribute('aria-hidden');
                this.tabIndex = 0;
            } else {
                this.setAttribute('aria-hidden', 'true');
                this.tabIndex = -1;
            }
        }
    }
}
