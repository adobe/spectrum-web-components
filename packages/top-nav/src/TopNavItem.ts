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
    CSSResultArray,
    TemplateResult,
    PropertyValues,
    ifDefined,
    property,
    query,
} from '@spectrum-web-components/base';
import { Focusable, LikeAnchor } from '@spectrum-web-components/shared';

import itemStyles from '@spectrum-web-components/tabs/src/tab.css.js';
import topNavItemStyles from './top-nav-item.css.js';

/**
 * @slot icon - The icon that appears on the left of the label
 */

export class TopNavItem extends LikeAnchor(Focusable) {
    public static get styles(): CSSResultArray {
        return [itemStyles, topNavItemStyles];
    }

    @query('a')
    private anchor!: HTMLAnchorElement;

    @property({ type: Boolean, reflect: true })
    public selected = false;

    public value = '';

    public get focusElement(): HTMLAnchorElement {
        return this.anchor;
    }

    public click(): void {
        this.anchor.click();
    }

    protected render(): TemplateResult {
        return html`
            <a
                id="itemLabel"
                href=${ifDefined(this.href)}
                download=${ifDefined(this.download)}
                target=${ifDefined(this.target)}
                aria-label=${ifDefined(this.label)}
                aria-current=${ifDefined(
                    this.selected && this.href ? 'page' : undefined
                )}
                rel=${ifDefined(this.rel)}
            >
                <slot></slot>
            </a>
        `;
    }

    protected firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
    }

    protected updated(changes: PropertyValues): void {
        super.updated(changes);
        this.value = this.anchor.href;
    }
}
