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
    SizedMixin,
    PropertyValues,
} from '@spectrum-web-components/base';

import styles from './divider.css.js';

/**
 * @element sp-divider
 */
export class Divider extends SizedMixin(SpectrumElement, {
    validSizes: ['s', 'm', 'l'],
}) {
    public static styles: CSSResultArray = [styles];

    @property({ type: Boolean, reflect: true })
    public vertical = false;

    protected render(): TemplateResult {
        return html``;
    }

    protected firstUpdated(changed: PropertyValues<this>): void {
        super.firstUpdated(changed);
        this.setAttribute('role', 'separator');
    }

    protected updated(changed: PropertyValues<this>): void {
        super.updated(changed);
        if (changed.has('vertical')) {
            if (this.vertical) {
                this.setAttribute('aria-orientation', 'vertical');
            } else {
                this.removeAttribute('aria-orientation');
            }
        }
    }
}
