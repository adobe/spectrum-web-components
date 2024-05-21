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
    CSSResultArray,
    html,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';

import stylesBase from '@spectrum-web-components/styles/src/spectrum-base.min.css' with { type: 'css' };
import stylesLang from '@spectrum-web-components/styles/src/spectrum-lang.min.css' with { type: 'css' };
import stylesHeading from '@spectrum-web-components/styles/src/spectrum-heading.min.css' with { type: 'css' };
import stylesBody from '@spectrum-web-components/styles/src/spectrum-body.min.css' with { type: 'css' };

import stylesDefault from './spectrum-illustrated-message.min.css' with { type: 'css' };
import stylesOveride from './illustrated-message.min.css' with { type: 'css' };

/**
 * @element sp-illustrated-message
 *
 * @slot - The SVG that represents the illustration
 * @slot heading - Headline for the message
 * @slot description - Description text for the illustration
 */
export class IllustratedMessage extends SpectrumElement {
    public static readonly is = 'sp-illustrated-message';

    public static override get styles(): CSSResultArray {
        return [
            stylesBase,
            stylesLang,
            stylesHeading,
            stylesBody,
            stylesDefault,
            stylesOveride,
        ];
    }

    @property()
    public heading = '';

    @property()
    public description = '';

    protected override render(): TemplateResult {
        return html`
            <div id="illustration"><slot></slot></div>
            <h2
                id="heading"
                class="spectrum-Heading spectrum-Heading--sizeL spectrum-Heading--light"
            >
                <slot name="heading">${this.heading}</slot>
            </h2>
            <div id="description" class="spectrum-Body spectrum-Body--sizeS">
                <slot name="description">${this.description}</slot>
            </div>
        `;
    }
}
