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
    property,
    CSSResultArray,
    TemplateResult,
} from '@spectrum-web-components/base';

import messageStyles from './illustrated-message.css.js';

/**
 * @slot - The SVG that represents the illustration
 */

export class IllustratedMessage extends SpectrumElement {
    public static readonly is = 'sp-illustrated-message';

    public static get styles(): CSSResultArray {
        return [messageStyles];
    }

    @property()
    public heading = '';

    @property()
    public description = '';

    protected render(): TemplateResult {
        return html`
            <div id="illustration"><slot></slot></div>
            <h2 id="heading">${this.heading}</h2>
            <p id="description">${this.description}</p>
        `;
    }
}
