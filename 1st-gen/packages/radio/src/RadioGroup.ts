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

    @property({ type: Boolean, reflect: true })
    public override invalid = false;

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

    private _childInvalidObserver?: MutationObserver | null;
    private _managedInvalid = false;

    public override disconnectedCallback(): void {
        this.clearInvalidObserver();
        super.disconnectedCallback();
    }

    protected override handleSlotchange(): void {
        this.rovingTabindexController.clearElementCache();
        this.manageInvalidObserver();
    }

    private manageInvalidObserver(): void {
        if (this._childInvalidObserver) {
            this._childInvalidObserver.disconnect();
        }
        this._childInvalidObserver = new MutationObserver(() => {
            this.checkInvalidState();
        });
        this._childInvalidObserver.observe(this, {
            attributes: true,
            attributeFilter: ['invalid'],
            subtree: true,
        });

        this.checkInvalidState();
    }

    private checkInvalidState(): void {
        const invalidChild = this.buttons.find((button) => button.invalid);
        if (invalidChild) {
            if (!this.invalid) {
                this.invalid = true;
                this._managedInvalid = true;
                window.__swc.warn(
                    this,
                    'The "invalid" attribute on <sp-radio> is deprecated. Please apply the "invalid" attribute to the parent <sp-radio-group> instead.',
                    'https://opensource.adobe.com/spectrum-web-components/components/radio',
                    { level: 'deprecation' }
                );
            }
        } else if (this.invalid && this._managedInvalid) {
            // Only clear invalid state if it was set by us (via child sync)
            this.invalid = false;
            this._managedInvalid = false;
            this.removeAttribute('aria-invalid');
        }
    }

    private clearInvalidObserver(): void {
        this._childInvalidObserver?.disconnect();
        this._childInvalidObserver = null;
    }

    protected override updated(changes: PropertyValues<this>): void {
        super.updated(changes);

        if (changes.has('invalid')) {
            if (this.invalid) {
                this.setAttribute('aria-invalid', 'true');
            } else {
                this.removeAttribute('aria-invalid');
            }
        }
    }
}
