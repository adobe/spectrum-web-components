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
 * The `TopNavItem` component is a custom web component that represents an item in a top navigation bar.
 * It extends the `LikeAnchor` and `Focusable` mixins to provide anchor-like behavior and focus management.
 *
 * @element sp-top-nav-item
 *
 * @slot - The text label of the Top Nav Item.
 *
 */
export class TopNavItem extends LikeAnchor(Focusable) {
    /**
     * Returns the styles to be applied to the component.
     */
    public static override get styles(): CSSResultArray {
        return [itemStyles, topNavItemStyles];
    }

    /**
     * Query to select the anchor element within the component.
     */
    @query('a')
    private anchor!: HTMLAnchorElement;

    /**
     * Indicates whether the top nav item is selected.
     *
     * This property is reflected as an attribute, meaning changes to the property
     * will be mirrored in the corresponding HTML attribute.
     */
    @property({ type: Boolean, reflect: true })
    public selected = false;

    /**
     * The value of the top nav item, representing the href of the anchor element.
     */
    public value = '';

    /**
     * Returns the focusable element within the component.
     */
    public override get focusElement(): HTMLAnchorElement {
        return this.anchor;
    }

    /**
     * Simulates a click on the anchor element.
     */
    public override click(): void {
        this.anchor.click();
    }

    /**
     * Renders the content of the top nav item component.
     *
     * This method returns a template result containing an anchor element with various attributes
     * and a slot for the text label.
     */
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

    /**
     * Lifecycle method called when the component updates.
     *
     * This method updates the value property to reflect the href of the anchor element.
     */
    protected override updated(changes: PropertyValues): void {
        super.updated(changes);
        this.value = this.anchor.href;
    }
}
