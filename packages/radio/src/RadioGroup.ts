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
    html,
    property,
    TemplateResult,
    queryAssignedNodes,
    PropertyValues,
} from '@spectrum-web-components/base';
import { FieldGroup } from '@spectrum-web-components/field-group';

import { Radio } from './Radio.js';

/**
 * Radio group component
 * @slot - The `sp-radio` elements to display/manage in the group.
 *
 */
export class RadioGroup extends FieldGroup {
    @property({ type: String })
    public name = '';

    @queryAssignedNodes('')
    public defaultNodes!: Node[];

    public get buttons(): Radio[] {
        return this.defaultNodes.filter(
            (node) => (node as HTMLElement) instanceof Radio
        ) as Radio[];
    }

    constructor() {
        super();
        this.addEventListener('focusin', this.handleFocusin);
    }

    public focus(): void {
        debugger;
        if (!this.buttons.length) {
            return;
        }
        const firstButtonNonDisabled = this.buttons.find((button) => {
            if (this.selected) {
                return button.checked;
            }
            return !button.disabled;
        });
        if (firstButtonNonDisabled) {
            firstButtonNonDisabled.focus();
        }
    }

    private handleFocusin = (): void => {
        this.addEventListener('focusout', this.handleFocusout);
        this.addEventListener('keydown', this.handleKeydown);
        requestAnimationFrame(() => {
            const firstButtonWithTabIndex = this.buttons.find(
                (button) => button.tabIndex === 0
            );
            if (firstButtonWithTabIndex) {
                firstButtonWithTabIndex.tabIndex = -1;
            }
        });
    };

    private handleKeydown = (event: KeyboardEvent): void => {
        const { code } = event;
        const activeElement = (this.getRootNode() as Document)
            .activeElement as Radio;
        /* c8 ignore next 3 */
        if (!activeElement) {
            return;
        }
        let nextIndex = this.buttons.indexOf(activeElement);
        /* c8 ignore next 3 */
        if (nextIndex === -1) {
            return;
        }
        const circularIndexedElement = <T extends HTMLElement>(
            list: T[],
            index: number
        ): T => list[(list.length + index) % list.length];
        const buttonFromDelta = (delta: number): void => {
            nextIndex += delta;
            while (circularIndexedElement(this.buttons, nextIndex).disabled) {
                nextIndex += delta;
            }
        };
        switch (code) {
            case 'ArrowUp':
                buttonFromDelta(-1);
                break;
            case 'ArrowLeft':
                buttonFromDelta(this.isLTR ? -1 : 1);
                break;
            case 'ArrowRight':
                buttonFromDelta(this.isLTR ? 1 : -1);
                break;
            case 'ArrowDown':
                buttonFromDelta(1);
                break;
            case 'End':
                nextIndex = this.buttons.length;
                buttonFromDelta(-1);
                break;
            case 'Home':
                nextIndex = -1;
                buttonFromDelta(1);
                break;
            case 'PageUp':
            case 'PageDown':
                const tagsSiblings = [
                    ...(this.getRootNode() as Document).querySelectorAll<RadioGroup>(
                        'sp-radio-group'
                    ),
                ];
                if (tagsSiblings.length < 2) {
                    return;
                }
                event.preventDefault();
                const currentIndex = tagsSiblings.indexOf(this);
                const offset = code === 'PageUp' ? -1 : 1;
                let nextRadioGroupIndex = currentIndex + offset;
                let nextRadioGroup = circularIndexedElement(
                    tagsSiblings,
                    nextRadioGroupIndex
                );
                while (!nextRadioGroup.buttons.length) {
                    nextRadioGroupIndex += offset;
                    nextRadioGroup = circularIndexedElement(
                        tagsSiblings,
                        nextRadioGroupIndex
                    );
                }
                nextRadioGroup.focus();
                return;
            default:
                return;
        }
        event.preventDefault();
        const nextRadio = circularIndexedElement(this.buttons, nextIndex);
        this._setSelected(nextRadio.value);
        nextRadio.focus();
    };

    private handleFocusout = (event: FocusEvent): void => {
        const nextActiveElement = event.relatedTarget as Node;
        if (nextActiveElement && this.contains(nextActiveElement)) {
            return;
        }
        const firstButtonNonDisabled = this.buttons.find((button) => {
            if (this.selected) {
                return button.checked;
            }
            return !button.disabled;
        });
        if (firstButtonNonDisabled) {
            firstButtonNonDisabled.tabIndex = 0;
        }
        this.removeEventListener('keydown', this.handleKeydown);
        this.removeEventListener('focusout', this.handleFocusout);
    };

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

    protected render(): TemplateResult {
        return html`
            <slot></slot>
        `;
    }

    protected firstUpdated(changes: PropertyValues<this>): void {
        super.firstUpdated(changes);
        const checkedRadio = this.querySelector('sp-radio[checked]') as Radio;
        const checkedRadioValue = checkedRadio ? checkedRadio.value : '';
        // Prefer the checked item over the selected value
        this.selected = checkedRadioValue || this.selected;
        // Validate the selected value is actual a radio option
        if (this.selected && this.selected !== checkedRadioValue) {
            const selectedRadio = this.querySelector(
                `sp-radio[value="${this.selected}"]`
            ) as Radio;
            if (!selectedRadio) {
                this.selected = '';
            } else {
                selectedRadio.checked = true;
            }
        }

        this.addEventListener('change', (event: Event) => {
            if (event.target === this) {
                return;
            }
            event.stopPropagation();
            const target = event.target as Radio;
            this._setSelected(target.value);
        });
        this.buttons.map((button, index) => {
            const focusable = this.selected
                ? !button.disabled && button.value === this.selected
                    ? '0'
                    : '-1'
                : !button.disabled && index === 0
                ? '0'
                : '-1';
            button.setAttribute('tabindex', focusable);
        });
    }

    protected updated(changes: PropertyValues<this>): void {
        super.updated(changes);
        if (changes.has('selected')) {
            this.validateRadios();
        }
    }

    private validateRadios(): void {
        let validSelection = false;
        this.buttons.map((button) => {
            button.checked = this.selected === button.value;
            validSelection = validSelection || button.checked;
        });
        if (!validSelection) {
            this.selected = '';
        }
    }
}
