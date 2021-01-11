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
    TemplateResult,
    PropertyValues,
    html,
    ifDefined,
    property,
} from '@spectrum-web-components/base';
import { DropdownBase } from '@spectrum-web-components/dropdown';
import '@spectrum-web-components/action-button/sp-action-button.js';
import { ObserveSlotText } from '@spectrum-web-components/shared/src/observe-slot-text.js';
import { MoreIcon } from '@spectrum-web-components/icons-workflow';
import actionMenuStyles from './action-menu.css.js';

/**
 * @slot options - The menu with options that will display when the dropdown is open
 */
export class ActionMenu extends ObserveSlotText(DropdownBase, 'label') {
    public static get styles(): CSSResultArray {
        return [actionMenuStyles];
    }

    @property({ type: String, reflect: true })
    public size = 'm';

    protected listRole = 'menu';
    protected itemRole = 'menuitem';
    private get hasLabel(): boolean {
        return this.slotHasContent;
    }

    protected get buttonContent(): TemplateResult[] {
        return [
            html`
                <slot name="icon" slot="icon" ?icon-only=${!this.hasLabel}>
                    <sp-icon class="icon">
                        ${MoreIcon({ hidden: this.hasLabel })}
                    </sp-icon>
                </slot>
                <slot name="label" ?hidden=${!this.hasLabel}></slot>
            `,
        ];
    }

    protected get renderButton(): TemplateResult {
        return html`
            <sp-action-button
                quiet
                ?selected=${this.open}
                aria-haspopup="true"
                aria-controls="popover"
                aria-expanded=${this.open ? 'true' : 'false'}
                aria-label=${ifDefined(this.label || undefined)}
                id="button"
                class="button"
                @blur=${this.onButtonBlur}
                @click=${this.onButtonClick}
                @focus=${this.onButtonFocus}
                ?disabled=${this.disabled}
            >
                ${this.buttonContent}
            </sp-action-button>
        `;
    }

    protected updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);
        if (changedProperties.has('invalid')) {
            this.invalid = false;
        }
        this.quiet = true;
    }
}
