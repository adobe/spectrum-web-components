/*
Copyright 2019 Adobe. All rights reserved.
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
    CSSResultArray,
    PropertyValues,
    TemplateResult,
    property,
} from 'lit-element';

import { Textfield } from '@spectrum-web-components/textfield';
import '@spectrum-web-components/icon';
import '@spectrum-web-components/icon';

import searchStyles from './search.css.js';
import clearButtonStyles from '@spectrum-web-components/button/lib/spectrum-clear-button.css.js';
import crossMediumStyles from '@spectrum-web-components/icon/lib/spectrum-icon-cross-medium.css.js';
import magnifierStyles from '@spectrum-web-components/icon/lib/spectrum-icon-magnifier.css.js';

/**
 * @slot icon - The icon that appears on the left of the label
 */

export class Search extends Textfield {
    public static get styles(): CSSResultArray {
        return [
            ...super.styles,
            searchStyles,
            clearButtonStyles,
            crossMediumStyles,
            magnifierStyles,
        ];
    }

    @property()
    public label = 'Search';

    @property()
    public placeholder = 'Search';

    protected render(): TemplateResult {
        return html`
            <form>
                <sp-icons-medium></sp-icons-medium>
                <sp-icon
                    id="icon"
                    class="icon magnifier"
                    size="s"
                    name="ui:Magnifier"
                ></sp-icon>
                ${super.render()}
                <button id="button" type="reset" aria-label="Reset">
                    <sp-icon
                        class="icon cross-medium"
                        size="s"
                        name="ui:CrossLarge"
                    ></sp-icon>
                </button>
            </form>
        `;
    }

    public updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);
        if (changedProperties.has('multiline')) {
            this.multiline = false;
        }
    }
}
