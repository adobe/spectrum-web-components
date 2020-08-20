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
import { ifDefined } from 'lit-html/directives/if-defined.js';

import avatarStyles from './avatar.css.js';

/**
 * Avatar component
 */
export class Avatar extends SpectrumElement {
    public static get styles(): CSSResultArray {
        return [avatarStyles];
    }

    @property()
    public label = '';

    @property()
    public src = '';

    protected render(): TemplateResult {
        return html`
            <img alt=${ifDefined(this.label || undefined)} src=${this.src} />
        `;
    }
}
