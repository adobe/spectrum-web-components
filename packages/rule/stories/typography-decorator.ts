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
    LitElement,
    CSSResultArray,
    TemplateResult,
    property,
    customElement,
} from '@spectrum-web-components/base';

import styles from '@spectrum-web-components/theme/src/typography.css.js';

/**
 * @element typography-decorator
 */
@customElement('typography-decorator')
export class Typography extends LitElement {
    static styles: CSSResultArray = [styles];

    @property({ attribute: false })
    public story?: TemplateResult;

    protected render(): TemplateResult {
        if (!this.story) return html``;
        return html`
            <div class="spectrum-Typography">
                ${this.story}
            </div>
        `;
    }
}
