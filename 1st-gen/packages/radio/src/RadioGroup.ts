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

import { PropertyValues } from '@spectrum-web-components/base';
import {
    property,
    queryAssignedNodes,
} from '@spectrum-web-components/base/src/decorators.js';
import { FocusVisiblePolyfillMixin } from '@spectrum-web-components/shared/src/focus-visible.js';
import { FieldGroup } from '@spectrum-web-components/field-group';

import { Radio } from './Radio.js';
import { RovingTabindexController } from '@spectrum-web-components/reactive-controllers/src/RovingTabindex.js';

/**
 * @element sp-radio-group
 *
 * @slot - The `sp-radio` elements to display/manage in the group.
 * @slot help-text - default or non-negative help text to associate to your form element
 * @slot negative-help-text - negative help text to associate to your form element when `invalid`
 *
 * @fires change - An alteration to the value of the element has been committed by the user.
 */
export class RadioGroup extends FocusVisiblePolyfillMixin(FieldGroup) {
    @property({ type: String })
    public name = '';

    @queryAssignedNodes()
    public defaultNodes!: Node[];

    public get buttons(): Radio[] {
        return this.defaultNodes.filter(
            (node) => (node as HTMLElement) instanceof Radio
        ) as Radio[];
    }

    rovingTabindexController = new RovingTabindexController<Radio>(this, {
        focusInIndex: (elements: Radio[]) => {
            return elements.findIndex((el) => {
                return this.selected
                    ? !el.disabled && el.value === this.selected
                    : !el.disabled;
            });
        },
        elementEnterAction: (el: Radio) => {
            this._setSelected(el.value);
        },
        elements: () => this.buttons,
        isFocusableElement: (el: Radio) => !el.disabled,
    });

    public override focus(): void {
        this.rovingTabindexController.focus();
    }

    private _setSelected(value: string): void {
        if (value === this.selected) {
            return;
        }
        const oldValue = this.selected;
        const radio = value
            ? (this.querySelector(`sp-radio[value="${value}"]`) as Radio)
            : undefined;

        // If no matching radio, selected is reset to empty string
        this.selected = radio ? value : '';
        const applyDefault = this.dispatchEvent(
            new Event('change', {
                cancelable: true,
                bubbles: true,
                composed: true,
            })
        );
        if (!applyDefault) {
            this.selected = oldValue;
            return;
        }
        this.validateRadios();
    }

    @property({ reflect: true })
    public selected = '';

    protected override willUpdate(changes: PropertyValues<this>): void {
        if (!this.hasUpdated) {
            this.setAttribute('role', 'radiogroup');
            const checkedRadio = this.querySelector(
                'sp-radio[checked]'
            ) as Radio;
            const checkedRadioValue = checkedRadio ? checkedRadio.value : '';
            // Prefer the checked item over the selected value
            this.selected = checkedRadioValue || this.selected;
            // Validate the selected value is actual a radio option
            if (this.selected && this.selected !== checkedRadioValue) {
                const selectedRadio = this.querySelector(
                    `sp-radio[value="${this.selected}"]`
                ) as Radio;
                if (selectedRadio) {
                    selectedRadio.checked = true;
                }
            }

            this.shadowRoot.addEventListener('change', (event: Event) => {
                event.stopPropagation();
                const target = event.target as Radio;
                this._setSelected(target.value);
            });
        }

        if (changes.has('selected')) {
            this.validateRadios();
        }
    }

    private async validateRadios(): Promise<void> {
        let validSelection = false;
        if (!this.hasUpdated) {
            // Initial validation has to happen after the initial render to allow
            // the buttons to be queries from the rendered <slot> element
            await this.updateComplete;
        }
        this.buttons.map((button) => {
            button.checked = this.selected === button.value;
            validSelection = validSelection || button.checked;
        });
        if (!validSelection) {
            this.selected = '';
        }
    }

    protected override handleSlotchange(): void {
        this.rovingTabindexController.clearElementCache();
    }
}
