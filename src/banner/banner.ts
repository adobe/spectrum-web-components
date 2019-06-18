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

import {
    html,
    property,
    CSSResultArray,
    TemplateResult,
    query,
} from 'lit-element';

import bannerStyles from './banner.css';
import { Focusable } from '../shared/focusable';

/**
 * Banner component
 *
 * @attr type - Determines the style, can be "info", "warning", or "error". Default is "info"
 * @attr corner - Determines if banner sets position at upper right corner or not.
 */
export class Banner extends Focusable {
    @property({ reflect: true })
    public type: 'info' | 'warning' | 'error' = 'info';

    @property({ reflect: true, type: Boolean })
    public corner = false;

    @query('#root')
    private rootElement!: HTMLDivElement;

    public get focusElement(): HTMLElement {
        return this.rootElement;
    }

    public static get styles(): CSSResultArray {
        return [bannerStyles];
    }

    protected render(): TemplateResult {
        return html`
            <div id="root">
                <div id="header"><slot name="header"></slot></div>
                <div id="content"><slot name="content"></slot></div>
            </div>
        `;
    }
}
