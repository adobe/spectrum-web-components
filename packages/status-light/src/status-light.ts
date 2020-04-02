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
    property,
    CSSResultArray,
    TemplateResult,
} from 'lit-element';
import statusLightStyles from './status-light.css.js';

/**
 * A Spectrum status light control.
 * @element sp-status-light
 */
export class StatusLight extends LitElement {
    public static get styles(): CSSResultArray {
        return [statusLightStyles];
    }

    /**
     * The visual variant to apply to this status light.
     */
    @property({ reflect: true })
    public variant:
        | 'negative'
        | 'notice'
        | 'positive'
        | 'info'
        | 'neutral'
        | 'yellow'
        | 'fuchsia'
        | 'indigo'
        | 'seafoam'
        | 'chartreuse'
        | 'magenta'
        | 'celery'
        | 'purple' = 'neutral';

    protected render(): TemplateResult {
        return html`
            <div id="root">
                <slot></slot>
            </div>
        `;
    }
}
