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
    property,
    PropertyValues,
    TemplateResult,
} from '@spectrum-web-components/base';
import { ButtonBase } from '@spectrum-web-components/button';
import buttonStyles from './action-button.css.js';
import '@spectrum-web-components/icon/sp-icon.js';
import cornerTriangleStyles from '@spectrum-web-components/icon/src/spectrum-icon-corner-triangle.css.js';
import { CornerTriangle300Icon } from '@spectrum-web-components/icons-ui';

/**
 * @element sp-card
 *
 * @fires change - Announces a change in the `selected` property of an action button
 */
export class ActionButton extends ButtonBase {
    public static get styles(): CSSResultArray {
        return [buttonStyles, cornerTriangleStyles];
    }

    @property({ type: Boolean, reflect: true, attribute: 'hold-affordance' })
    public holdAffordance = false;

    @property({ type: Boolean, reflect: true })
    public selected = false;

    @property({ type: Boolean, reflect: true })
    public toggles = false;

    @property({ type: Boolean, reflect: true })
    public quiet = false;

    @property({ type: String, reflect: true })
    public size = 'm';

    @property({ type: Boolean, reflect: true })
    public emphasized = false;

    constructor() {
        super();
        this.addEventListener('click', this.onClick);
    }

    private onClick = (): void => {
        if (!this.toggles) {
            return;
        }
        this.selected = !this.selected;
        const applyDefault = this.dispatchEvent(
            new Event('change', {
                cancelable: true,
            })
        );
        if (!applyDefault) {
            this.selected = !this.selected;
        }
    };

    protected get buttonContent(): TemplateResult[] {
        const buttonContent = super.buttonContent;
        if (this.holdAffordance) {
            buttonContent.unshift(html`
                <sp-icon
                    id="hold-affordance"
                    size="none"
                    class="spectrum-UIIcon-CornerTriangle75"
                >
                    ${CornerTriangle300Icon()}
                </sp-icon>
            `);
        }
        return buttonContent;
    }

    protected updated(changes: PropertyValues): void {
        super.updated(changes);
        if (this.toggles && changes.has('selected')) {
            this.focusElement.setAttribute(
                'aria-pressed',
                this.selected ? 'true' : 'false'
            );
        }
    }
}
