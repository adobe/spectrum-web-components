/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { html, LitElement, property } from '@polymer/lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';

// @ts-ignore - css generated at build time
import linkStyles from './link.css.js';

export class Link extends LitElement {
    public static readonly is = 'spectrum-link';

    @property({ type: String })
    public href = '';

    protected render() {
        return html`
            <style>
                ${linkStyles}
            </style>
            <a href=${ifDefined(this.href)}><slot></slot></a>
        `;
    }
}
