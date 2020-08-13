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
    CSSResultArray,
    TemplateResult,
} from '@spectrum-web-components/base';

import menuGroupStyles from './menu-group.css.js';

/**
 * Spectrum Menu Group Component
 * @element sp-menu-group
 *
 * @slot header - headline of the menu group
 * @slot - menu items to be listed in the group
 */
export class MenuGroup extends SpectrumElement {
    public static get styles(): CSSResultArray {
        return [menuGroupStyles];
    }

    private instanceCount = MenuGroup.instances;

    private static instances = 0;

    public constructor() {
        super();
        MenuGroup.instances += 1;
    }

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
