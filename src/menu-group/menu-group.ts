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

import { html, LitElement, CSSResultArray, TemplateResult } from 'lit-element';

import menuGroupStyles from './menu-group.css';

let instances = 0;

/**
 * Spectrum Menu Group Component
 * @element sp-menu-group
 */
export class MenuGroup extends LitElement {
    public static get styles(): CSSResultArray {
        return [menuGroupStyles];
    }

    private instanceCount = instances++;

    public render(): TemplateResult {
        const labelledby = `menu-heading-category-${this.instanceCount}`;
        return html`
            <span class="header" id=${labelledby} aria-hidden="true">
                <slot name="header"></slot>
            </span>
            <div aria-labelledby=${labelledby} role="group">
                <slot></slot>
            </div>
        `;
    }

    protected firstUpdated(): void {
        this.setAttribute('role', 'group');
    }
}
