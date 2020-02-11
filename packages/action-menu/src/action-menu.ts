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

import {
    CSSResultArray,
    TemplateResult,
    property,
    PropertyValues,
    html,
} from 'lit-element';
import { DropdownBase } from '@spectrum-web-components/dropdown';
import { ObserveSlotText } from '@spectrum-web-components/shared/lib/observe-slot-text';
import actionMenuStyles from './action-menu.css.js';

/**
 * @slot options - The menu with options that will display when the dropdown is open
 */
export class ActionMenu extends ObserveSlotText(DropdownBase) {
    public static get styles(): CSSResultArray {
        return [...super.styles, actionMenuStyles];
    }

    @property({ type: Boolean, reflect: true })
    public selected = false;

    @property({ type: Boolean, reflect: true })
    public quiet = true;

    protected listRole = 'menu';
    protected itemRole = 'menuitem';
    private get hasLabel(): boolean {
        return this.slotHasContent;
    }

    protected get buttonContent(): TemplateResult[] {
        return [
            html`
                <slot name="icon">
                    <svg
                        slot="icon"
                        viewBox="0 0 36 36"
                        class="icon"
                        focusable="false"
                        aria-hidden="true"
                        fill="currentColor"
                    >
                        <circle cx="17.8" cy="18.2" r="3.4"></circle>
                        <circle cx="29.5" cy="18.2" r="3.4"></circle>
                        <circle cx="6.1" cy="18.2" r="3.4"></circle>
                    </svg>
                </slot>
                <div id="label" ?hidden=${!this.hasLabel}>
                    <slot
                        name="label"
                        id="slot"
                        @slotchange=${this.manageObservedSlot}
                    ></slot>
                </div>
            `,
        ];
    }

    protected updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);
        if (changedProperties.has('open')) {
            this.selected = this.open;
        }
        if (changedProperties.has('quiet')) {
            this.quiet = true;
        }
        if (changedProperties.has('invalid')) {
            this.invalid = false;
        }
    }
}
