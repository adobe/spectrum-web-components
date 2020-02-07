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
import { __decorate } from "tslib";
import { property, html } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { LikeAnchor } from '@spectrum-web-components/shared/lib/like-anchor.js';
import { Focusable } from '@spectrum-web-components/shared/lib/focusable.js';
import { ObserveSlotText } from '@spectrum-web-components/shared/lib/observe-slot-text';
import buttonStyles from './button-base.css.js';
export class ButtonBase extends LikeAnchor(ObserveSlotText(Focusable)) {
    constructor() {
        super(...arguments);
        this.iconRight = false;
    }
    static get styles() {
        return [...super.styles, buttonStyles];
    }
    get hasIcon() {
        return !!this.querySelector('[slot="icon"]');
    }
    get hasLabel() {
        return this.slotHasContent;
    }
    get focusElement() {
        /* istanbul ignore if */
        if (!this.shadowRoot) {
            return this;
        }
        return this.shadowRoot.querySelector('#button');
    }
    get buttonContent() {
        const icon = html `
            <slot name="icon"></slot>
        `;
        const content = [
            html `
                <div id="label" ?hidden=${!this.hasLabel}>
                    <slot
                        id="slot"
                        @slotchange=${this.manageObservedSlot}
                    ></slot>
                </div>
            `,
        ];
        if (!this.hasIcon) {
            return content;
        }
        this.iconRight ? content.push(icon) : content.unshift(icon);
        return content;
    }
    render() {
        return this.href && this.href.length > 0
            ? this.renderAnchor({
                id: 'button',
                anchorContent: this.buttonContent,
            })
            : html `
                  <button id="button" aria-label=${ifDefined(this.label)}>
                      ${this.buttonContent}
                  </button>
              `;
    }
}
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'icon-right' })
], ButtonBase.prototype, "iconRight", void 0);
//# sourceMappingURL=ButtonBase.js.map