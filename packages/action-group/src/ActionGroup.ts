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
import { RovingTabindexController } from '@spectrum-web-components/reactive-controllers/src/RovingTabindex.js';

import styles from './action-group.css.js';

const EMPTY_SELECTION: string[] = [];

/**
 * @element sp-action-group
 * @slot - the sp-action-button elements that make up the group
 *
 * @fires change - Announces that selection state has been changed by user
 */
export class ActionGroup extends SpectrumElement {
    public static get styles(): CSSResultArray {
        return [styles];
    }

    public set buttons(tabs: ActionButton[]) {
        if (tabs === this.buttons) return;
        this._buttons = tabs;
        this.rovingTabindexController.clearElementCache();
    }

    public get buttons(): ActionButton[] {
        return this._buttons;
    }

    public _buttons: ActionButton[] = [];

    protected _buttonSelector = 'sp-action-button';

    rovingTabindexController = new RovingTabindexController<ActionButton>(
        this,
        {
            focusInIndex: (elements: ActionButton[]) => {
                let firstEnabledIndex = -1;
                const firstSelectedIndex = elements.findIndex((el, index) => {
                    if (!elements[firstEnabledIndex] && !el.disabled) {
                        firstEnabledIndex = index;
                    }
                    return el.selected && !el.disabled;
                });
                return elements[firstSelectedIndex]
                    ? firstSelectedIndex
                    : firstEnabledIndex;
            },
            elements: () => this.buttons,
            isFocusableElement: (el: ActionButton) => !el.disabled,
        }
    );

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
    public selected: string[] = EMPTY_SELECTION;

    private dispatchChange(old: string[]): void {
        const applyDefault = this.dispatchEvent(
            new Event('change', {
                bubbles: true,
                composed: true,
                cancelable: true,
            })
        );

        if (!applyDefault) {
            this.selected = old;
            this.buttons.map((button) => {
                button.selected = this.selected.includes(button.value);
            });
        }
    }

    private setSelected(selected: string[]): void {
        if (selected === this.selected) return;

        const old = this.selected;
        this.selected = selected;
        this.dispatchChange(old);
    }

    public focus(options?: FocusOptions): void {
        this.rovingTabindexController.focus(options);
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
                this.setSelected([target.value]);
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
                this.setSelected(selected);

                this.buttons.forEach((button) => {
                    button.tabIndex = -1;
                });

                target.tabIndex = 0;

                break;
            }
            default:
                break;
        }
    }

    private async manageSelects(): Promise<void> {
        if (!this.buttons.length) {
            return;
        }

        const options = this.buttons;
        switch (this.selects) {
            case 'single': {
                this.setAttribute('role', 'radiogroup');
                const selections: ActionButton[] = [];
                const updates = options.map(async (option) => {
                    await option.updateComplete;
                    option.setAttribute('role', 'radio');
                    option.setAttribute(
                        'aria-checked',
                        option.selected ? 'true' : 'false'
                    );
                    if (option.selected) {
                        selections.push(option);
                    }
                });
                await Promise.all(updates);

                const selected = selections.map((button) => {
                    return button.value;
                });

                this.selected = selected || EMPTY_SELECTION;
                break;
            }
            case 'multiple': {
                this.setAttribute('role', 'group');
                const selection: string[] = [];
                const selections: ActionButton[] = [];
                const updates = options.map(async (option) => {
                    await option.updateComplete;
                    option.setAttribute('role', 'checkbox');
                    option.setAttribute(
                        'aria-checked',
                        option.selected ? 'true' : 'false'
                    );
                    if (option.selected) {
                        selection.push(option.value);
                        selections.push(option);
                    }
                });
                await Promise.all(updates);
                const selected = !!selection.length
                    ? selection
                    : EMPTY_SELECTION;
                this.selected = selected;
                break;
            }
            default:
                // if user defines .selected
                if (this.selected.length) {
                    const selections: ActionButton[] = [];
                    const updates = options.map(async (option) => {
                        await option.updateComplete;
                        option.setAttribute(
                            'aria-checked',
                            option.selected ? 'true' : 'false'
                        );
                        option.setAttribute('role', 'button');
                        if (option.selected) {
                            selections.push(option);
                        }
                    });
                    await Promise.all(updates);

                    this.selected = selections.map((button) => {
                        return button.value;
                    });
                } else {
                    this.buttons.forEach((option) => {
                        option.setAttribute('role', 'button');
                    });
                    this.removeAttribute('role');
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
    }

    public disconnectedCallback(): void {
        this.observer.disconnect();
        super.disconnectedCallback();
    }

    private observer!: MutationObserver;
}
