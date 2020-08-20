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
    property,
    PropertyValues,
} from '@spectrum-web-components/base';
import { ButtonBase } from './ButtonBase.js';
import buttonStyles from './action-button.css.js';

/**
 * @element sp-card
 *
 * @fires change - Announces a change in the `selected` property of an action button
 */
export class ActionButton extends ButtonBase {
    public static get styles(): CSSResultArray {
        return [...super.styles, buttonStyles];
    }

    @property({ type: Boolean, reflect: true, attribute: 'hold-affordance' })
    public holdAffordance = false;

    @property({ type: Boolean, reflect: true })
    public selected = false;

    @property({ type: Boolean, reflect: true })
    public toggles = false;

    @property({ type: Boolean, reflect: true })
    public quiet = false;

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
