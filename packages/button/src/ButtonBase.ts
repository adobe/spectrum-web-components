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
    property,
    html,
    TemplateResult,
    CSSResultArray,
    query,
} from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { LikeAnchor } from '@spectrum-web-components/shared/src/like-anchor.js';
import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';
import {
    ObserveSlotText,
    ObserveSlotPresence,
} from '@spectrum-web-components/shared';
import buttonStyles from './button-base.css.js';

export class ButtonBase extends LikeAnchor(
    ObserveSlotText(ObserveSlotPresence(Focusable, '[slot="icon"]'))
) {
    public static get styles(): CSSResultArray {
        return [...super.styles, buttonStyles];
    }

    protected get hasIcon(): boolean {
        return this.slotContentIsPresent;
    }

    @property({ type: Boolean, reflect: true, attribute: 'icon-right' })
    protected iconRight = false;

    private get hasLabel(): boolean {
        return this.slotHasContent;
    }

    @query('.button')
    private buttonElement!: HTMLButtonElement;

    public get focusElement(): HTMLElement {
        return this.buttonElement;
    }

    protected get buttonContent(): TemplateResult[] {
        const icon = html`
            <slot name="icon"></slot>
        `;
        const content = [
            html`
                <div id="label" ?hidden=${!this.hasLabel}>
                    <slot
                        id="slot"
                        @slotchange=${this.manageTextObservedSlot}
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

    protected render(): TemplateResult {
        return this.href && this.href.length > 0
            ? this.renderAnchor({
                  id: 'button',
                  className: 'button',
                  anchorContent: this.buttonContent,
              })
            : html`
                  <button
                      id="button"
                      class="button"
                      aria-label=${ifDefined(this.label)}
                  >
                      ${this.buttonContent}
                  </button>
              `;
    }
}
