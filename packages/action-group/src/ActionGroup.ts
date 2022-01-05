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
    PropertyValues,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import type { ActionButton } from '@spectrum-web-components/action-button';

import styles from './action-group.css.js';

const EMPTY_SELECTION: string[] = [];

/**
 * @element sp-action-group
 * @slot - the sp-action-button elements that make up the group
 */
export class ActionGroup extends SpectrumElement {
    public static get styles(): CSSResultArray {
        return [styles];
    }

    public buttons: ActionButton[] = [];
    protected _buttonSelector = 'sp-action-button';

    @property({ type: Boolean, reflect: true })
    public compact = false;

    @property({ type: Boolean, reflect: true })
    public emphasized = false;

    @property({ type: Boolean, reflect: true })
    public justified = false;

    @property({ type: String })
    public label = '';

    @property({ type: Boolean, reflect: true })
    public quiet = false;

    @property({ type: String })
    public selects: undefined | 'single' | 'multiple';

    @property({ type: Boolean, reflect: true })
    public vertical = false;

    @property({ type: Array })
    public get selected(): string[] {
        return this._selected;
    }

    public set selected(selected: string[]) {
        if (selected === this.selected) return;
        const old = this.selected;
        this._selected = selected;

        const applyDefault = this.dispatchEvent(
            new Event('change', {
                bubbles: true,
                composed: true,
                cancelable: true,
            })
        );

        if (!applyDefault) {
            this._selected = old;
            this.buttons.map((button) => {
                button.selected = this.selected.includes(button.value);
            });
        }
    }

    private _selected: string[] = EMPTY_SELECTION;

    public focus(options?: FocusOptions): void {
        if (!this.buttons.length) {
            return;
        }
        const firstButtonNonDisabled = this.buttons.find((button) => {
            if (this.selected) {
                return button.selected;
            }
            return !button.disabled;
        });
        if (firstButtonNonDisabled) {
            firstButtonNonDisabled.focus(options);
        }
    }

    private deselectSelectedButtons(): void {
        const selected = [
            ...this.querySelectorAll('[selected]'),
        ] as ActionButton[];
        selected.forEach((el) => {
            el.selected = false;
            el.tabIndex = -1;
            el.setAttribute('aria-checked', 'false');
        });
    }

    private handleClick(event: Event): void {
        const target = event.target as ActionButton;
        if (typeof target.value === 'undefined') {
            return;
        }
        switch (this.selects) {
            case 'single': {
                this.deselectSelectedButtons();
                target.selected = true;
                target.tabIndex = 0;
                target.setAttribute('aria-checked', 'true');
                this.selected = [target.value];
                target.focus();
                break;
            }
            case 'multiple': {
                const selected = [...this.selected];
                target.selected = !target.selected;
                target.setAttribute(
                    'aria-checked',
                    target.selected ? 'true' : 'false'
                );
                if (target.selected) {
                    selected.push(target.value);
                } else {
                    selected.splice(this.selected.indexOf(target.value), 1);
                }
                this.selected = selected;
                break;
            }
            default:
                this.deselectSelectedButtons();
                this.selected = EMPTY_SELECTION;
                break;
        }
    }

    private handleFocusin = (): void => {
        this.addEventListener('focusout', this.handleFocusout);
        this.addEventListener('keydown', this.handleKeydown);
    };

    private handleKeydown = (event: KeyboardEvent): void => {
        const { code } = event;
        if (
            ![
                'ArrowUp',
                'ArrowLeft',
                'ArrowRight',
                'ArrowDown',
                'End',
                'Home',
                'PageUp',
                'PageDown',
            ].includes(code)
        ) {
            return;
        }
        const activeElement = (this.getRootNode() as Document)
            .activeElement as ActionButton;
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
            default:
                const tagsSiblings = [
                    ...(
                        this.getRootNode() as Document
                    ).querySelectorAll<ActionGroup>('sp-action-group'),
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
        }
        event.preventDefault();
        const nextRadio = circularIndexedElement(this.buttons, nextIndex);
        activeElement.tabIndex = -1;
        nextRadio.tabIndex = 0;
        nextRadio.focus();
    };

    private handleFocusout = (event: FocusEvent): void => {
        const { relatedTarget } = event;
        if (!relatedTarget || !this.contains(relatedTarget as HTMLElement)) {
            const firstButtonNonDisabled = this.buttons.find((button) => {
                if (this.selected.length) {
                    return button.selected;
                }
                return !button.disabled;
            });
            if (firstButtonNonDisabled) {
                firstButtonNonDisabled.tabIndex = 0;
            }
        }
        this.removeEventListener('keydown', this.handleKeydown);
        this.removeEventListener('focusout', this.handleFocusout);
    };

    private async manageSelects(): Promise<void> {
        if (!this.buttons.length) {
            return;
        }

        const options = this.buttons;
        switch (this.selects) {
            case 'single': {
                this.setAttribute('role', 'radiogroup');
                const selections: ActionButton[] = [];
                let firstEnabled: ActionButton | undefined;
                const updates = options.map(async (option) => {
                    await option.updateComplete;
                    option.setAttribute('role', 'radio');
                    option.setAttribute(
                        'aria-checked',
                        option.selected ? 'true' : 'false'
                    );
                    option.tabIndex = option.selected ? 0 : -1;
                    if (option.selected) {
                        selections.push(option);
                    }
                    if (!firstEnabled && !option.disabled) {
                        firstEnabled = option;
                    }
                });
                await Promise.all(updates);
                // if user passes in multiple values in .selected
                if (selections.length > 1) {
                    selections.forEach((button) => {
                        button.tabIndex = 0;
                    });
                    this.selected = selections.map((button) => {
                        return button.value;
                    });
                } else if (selections.length === 1) {
                    if (selections[0] || firstEnabled) {
                        (
                            (selections[0] || firstEnabled) as ActionButton
                        ).tabIndex = 0;
                    }
                    this.selected = selections[0]
                        ? [selections[0].value]
                        : EMPTY_SELECTION;
                }
                break;
            }
            case 'multiple': {
                this.setAttribute('role', 'group');
                const selection: string[] = [];
                const updates = options.map(async (option) => {
                    await option.updateComplete;
                    option.setAttribute('role', 'checkbox');
                    option.setAttribute(
                        'aria-checked',
                        option.selected ? 'true' : 'false'
                    );
                    option.tabIndex = 0;
                    if (option.selected) {
                        selection.push(option.value);
                    }
                });
                await Promise.all(updates);
                this.selected = !!selection.length
                    ? selection
                    : EMPTY_SELECTION;
                break;
            }
            default:
                // if user defines .selected
                if (this.selected.length > 0) {
                    const selections: ActionButton[] = [];
                    const updates = options.map(async (option) => {
                        await option.updateComplete;
                        option.setAttribute(
                            'aria-checked',
                            option.selected ? 'true' : 'false'
                        );
                        option.setAttribute('role', 'button');
                        option.tabIndex = option.selected ? 0 : -1;
                        if (option.selected) {
                            selections.push(option);
                        }
                    });
                    await Promise.all(updates);
                    // if user passes in multiple values in .selected
                    selections.forEach((button) => {
                        button.tabIndex = 0;
                    });
                    this.selected = selections.map((button) => {
                        return button.value;
                    });
                } else {
                    this.buttons.forEach((option) => {
                        option.setAttribute('role', 'button');
                        option.tabIndex = 0;
                    });
                    this.removeAttribute('role');
                    this.selected = EMPTY_SELECTION;
                    break;
                }
        }
    }

    protected render(): TemplateResult {
        return html`
            <slot role="presentation" @slotchange=${this.manageButtons}></slot>
        `;
    }

    protected firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
        this.addEventListener('click', this.handleClick);
        this.addEventListener('focusin', this.handleFocusin);
    }

    protected updated(changes: PropertyValues): void {
        super.updated(changes);
        if (changes.has('selects')) {
            this.manageSelects();
            this.manageChildren();
        }
        if (
            (changes.has('quiet') && this.quiet) ||
            (changes.has('emphasized') && this.emphasized)
        ) {
            this.manageChildren();
        }
        // Update `aria-label` when `label` available or not first `updated`
        if (
            changes.has('label') &&
            (this.label || typeof changes.get('label') !== 'undefined')
        ) {
            if (this.label.length) {
                this.setAttribute('aria-label', this.label);
            } else {
                this.removeAttribute('aria-label');
            }
        }
    }

    private manageChildren(): void {
        this.buttons.forEach((button) => {
            button.quiet = this.quiet;
            button.emphasized = this.emphasized;
            button.selected = this.selected.includes(button.value);
        });
    }

    private manageButtons = (): void => {
        const slot = this.shadowRoot.querySelector('slot');
        if (!slot) return;
        const assignedElements = slot.assignedElements({ flatten: true });
        const buttons = assignedElements.reduce((acc: unknown[], el) => {
            if (el.matches(this._buttonSelector)) {
                acc.push(el);
            } else {
                const buttonDescendents = Array.from(
                    el.querySelectorAll(`:scope > ${this._buttonSelector}`)
                );
                acc.push(...buttonDescendents);
            }
            return acc;
        }, []);
        this.buttons = buttons as ActionButton[];
        // <selected> element merges selected so following paradigm here
        const currentlySelectedButtons: string[] = [];
        this.buttons.forEach((button: ActionButton) => {
            if (button.selected) {
                currentlySelectedButtons.push(button.value);
            }
        });
        this.selected = this.selected.concat(currentlySelectedButtons);
        this.manageChildren();
        this.manageSelects();
    };

    public connectedCallback(): void {
        super.connectedCallback();
        if (!this.observer) {
            this.observer = new MutationObserver(this.manageButtons);
            this.manageButtons();
        }
        this.observer.observe(this, { childList: true, subtree: true });

        if (this.hasAttribute('selected')) {
            const selected = this.getAttribute('selected')!;
            this._selected = JSON.parse(selected);
        }
    }

    public disconnectedCallback(): void {
        this.observer.disconnect();
        super.disconnectedCallback();
    }

    private observer!: MutationObserver;
}
