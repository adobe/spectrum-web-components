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

import { html, CSSResultArray, TemplateResult, LitElement } from 'lit-element';

import tooltipStyles from './tooltip.css.js';

/**
 * @slot icon - The icon that appears on the left of the label
 */

export class Tooltip extends LitElement {
    public static get styles(): CSSResultArray {
        return [tooltipStyles];
    }

    render(): TemplateResult {
        return html`
            <slot name="icon"></slot>
            <span id="label"><slot></slot></span>
            <span id="tip"></span>
        `;
    }
}
