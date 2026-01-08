/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {
    CSSResultArray,
    html,
    PropertyValues,
    TemplateResult,
} from '@spectrum-web-components/base';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';
import {
    property,
    query,
} from '@spectrum-web-components/base/src/decorators.js';
import { Focusable, LikeAnchor } from '@spectrum-web-components/shared';

import itemStyles from '@spectrum-web-components/tabs/src/tab.css.js';
import topNavItemStyles from './top-nav-item.css.js';

/**
 * @element sp-top-nav-item
 *
 * @slot - text label of the Top Nav Item
 */

export class TopNavItem extends LikeAnchor(Focusable) {
    public static override get styles(): CSSResultArray {
        return [itemStyles, topNavItemStyles];
    }

    @query('a')
    private anchor!: HTMLAnchorElement;

    @property({ type: Boolean, reflect: true })
    public selected = false;

    public value = '';

    public override get focusElement(): HTMLAnchorElement {
        return this.anchor;
    }

    public override click(): void {
        this.anchor.click();
    }

    protected override render(): TemplateResult {
        return html`
            <a
                id="item-label"
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

    protected override updated(changes: PropertyValues): void {
        super.updated(changes);
        this.value = this.anchor.href;
    }
}
