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
    SpectrumElement,
    property,
    CSSResultArray,
    TemplateResult,
    queryAssignedNodes,
} from '@spectrum-web-components/base';

import radioGroupStyles from './radio-group.css.js';
import { Radio } from '@spectrum-web-components/radio';

/**
 * Radio group component
 *
 * @attr column - arranges radio buttons vertically
 */
export class RadioGroup extends SpectrumElement {
    public static get styles(): CSSResultArray {
        return [radioGroupStyles];
    }

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
        if (!this.buttons.length) {
            return;
        }
        const firstButtonNonDisabled = this.buttons.find((button) => {
            if (this.selected) {
                return button.checked;
            }
            return !button.disabled;
        });
        /* istanbul ignore else */
        if (firstButtonNonDisabled) {
            firstButtonNonDisabled.focus();
        }
    }

    private handleFocusin = (event: FocusEvent): void => {
        const target = event.target as Radio;
        this.selected = target.value;
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
        /* istanbul ignore if */
        if (!activeElement) {
            return;
        }
        let nextIndex = this.buttons.indexOf(activeElement);
        /* istanbul ignore if */
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
                    ...(this.getRootNode() as Document).querySelectorAll<
                        RadioGroup
                    >('sp-radio-group'),
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
        circularIndexedElement(this.buttons, nextIndex).focus();
    };

    private handleFocusout = (): void => {
        const firstButtonNonDisabled = this.buttons.find((button) => {
            if (this.selected) {
                return button.checked;
            }
            return !button.disabled;
        });
        /* istanbul ignore else */
        if (firstButtonNonDisabled) {
            firstButtonNonDisabled.tabIndex = 0;
        }
        this.removeEventListener('keydown', this.handleKeydown);
        this.removeEventListener('focusout', this.handleFocusout);
    };

    @property({ type: String, reflect: true })
    public name = '';

    private _selected = '';

    @property({ reflect: true })
    public get selected(): string {
        return this._selected;
    }

    public set selected(value: string) {
        const old = this.selected;
        const radio = value
            ? (this.querySelector(`sp-radio[value="${value}"]`) as Radio)
            : undefined;

        // If no matching radio, selected is reset to empty string
        this._selected = radio ? value : '';
        const applyDefault = this.dispatchEvent(
            new Event('change', {
                cancelable: true,
                bubbles: true,
                composed: true,
            })
        );
        if (!applyDefault) {
            this._selected = old;
            return;
        }
        this.deselectChecked();
        if (radio) radio.checked = true;
        this.requestUpdate('selected', old);
    }

    protected render(): TemplateResult {
        return html`
            <slot></slot>
        `;
    }

    protected firstUpdated(): void {
        const checkedRadio = this.querySelector('sp-radio[checked]') as Radio;
        const checkedRadioValue = checkedRadio ? checkedRadio.value : '';

        // If selected already assigned, don't overwrite
        this.selected = this.selected || checkedRadioValue;

        this.buttons.map((button) => {
            button.addEventListener('change', (event: Event) => {
                event.stopPropagation();
                const target = event.target as Radio;
                this.selected = target.value;
            });
        });
    }

    protected updated(): void {
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

    private deselectChecked(): void {
        const previousChecked = this.querySelectorAll('sp-radio[checked]');

        previousChecked.forEach((element) => {
            const radio = element as Radio;
            radio.checked = false;
        });
    }
}
