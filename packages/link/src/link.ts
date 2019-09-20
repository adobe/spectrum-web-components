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
    LitElement,
    property,
    CSSResultArray,
    TemplateResult,
} from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';

import linkStyles from './link.css.js';

/**
 * Spectrum Link Component
 *
 * @attr quiet - uses quiet styles or not
 * @attr over-background - uses over background styles or not
 */
export class Link extends LitElement {
    public static get styles(): CSSResultArray {
        return [linkStyles];
    }

    @property({ reflect: true })
    public href: string | undefined = undefined;

    @property({ reflect: true })
    public target: string | undefined = undefined;

    protected render(): TemplateResult {
        // prettier-ignore
        return html
        `<a href=${ifDefined(this.href)} target=${ifDefined(this.target)}><slot></slot></a>`
        ;
    }
}
