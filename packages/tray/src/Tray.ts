/*
Copyright 2020 Adobe. All rights reserved.
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
    SpectrumElement,
    CSSResultArray,
    TemplateResult,
    property,
    query,
} from '@spectrum-web-components/base';
import '@spectrum-web-components/underlay/sp-underlay.js';

import modalStyles from '@spectrum-web-components/modal/src/modal.css.js';
import styles from './tray.css.js';

/**
 * @element sp-tray
 */
export class Tray extends SpectrumElement {
    public static get styles(): CSSResultArray {
        return [modalStyles, styles];
    }

    @property({ type: Boolean, reflect: true })
    public open = false;

    @query('.tray')
    private tray!: HTMLDivElement;

    public focus(): void {
        const firstFocusable = this.querySelector(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), [focusable]'
        ) as HTMLElement;
        if (firstFocusable) {
            firstFocusable.focus();
        } else if (this.children.length === 1) {
            this.tray.focus();
        } else {
            super.focus();
        }
    }

    public close(): void {
        this.open = false;
        this.dispatchEvent(
            new Event('close', {
                bubbles: true,
            })
        );
    }

    protected render(): TemplateResult {
        return html`
            <sp-underlay ?open=${this.open} @click=${this.close}></sp-underlay>
            <div class="tray modal" tabindex="-1">
                <slot></slot>
            </div>
        `;
    }
}
