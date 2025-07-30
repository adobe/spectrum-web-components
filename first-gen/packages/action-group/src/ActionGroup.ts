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

import {
    CSSResultArray,
    html,
    PropertyValues,
    SizedMixin,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    property,
    query,
} from '@spectrum-web-components/base/src/decorators.js';
import { ActionButton } from '@spectrum-web-components/action-button';
import { RovingTabindexController } from '@spectrum-web-components/reactive-controllers/src/RovingTabindex.js';
import { MutationController } from '@lit-labs/observers/mutation-controller.js';

import styles from './action-group.css.js';

const EMPTY_SELECTION: string[] = [];

/**
 * @element sp-action-group
 * @slot - the sp-action-button elements that make up the group
 *
 * @fires change - Announces that selection state has been changed by user
 */
export class ActionGroup extends SizedMixin(SpectrumElement, {
    validSizes: ['xs', 's', 'm', 'l', 'xl'],
    noDefaultSize: true,
}) {
    static override shadowRootOptions = {
        ...SpectrumElement.shadowRootOptions,
        delegatesFocus: true,
    };
    public static override get styles(): CSSResultArray {
        return [styles];
    }

    public set buttons(buttons: ActionButton[]) {
        /* c8 ignore next 1 */
        if (buttons === this.buttons) return;
        this._buttons = buttons;
        this.rovingTabindexController.clearElementCache();
    }

    public get buttons(): ActionButton[] {
        return this._buttons;
    }

    public _buttons: ActionButton[] = [];

    protected _buttonSelector = 'sp-action-button, sp-action-menu';

    constructor() {
        super();

        new MutationController(this, {
            config: {
                childList: true,
                subtree: true,
            },
            callback: () => {
                this.manageButtons();
            },
            skipInitial: true,
        });
    }

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
            hostDelegatesFocus: true,
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

    @property({ reflect: true, attribute: 'static-color' })
    public staticColor?: 'white' | 'black';

    @property({ type: Boolean, reflect: true })
    public vertical = false;

    private _selected: string[] = EMPTY_SELECTION;

    set selected(selected: string[]) {
        this.requestUpdate('selected', this._selected);
        this._selected = selected;
        this.updateComplete.then(() => {
            this.applySelects();
            this.manageChildren();
        });
    }

    @property({ type: Array })
    get selected(): string[] {
        return this._selected;
    }

    @query('slot')
    slotElement!: HTMLSlotElement;

    private dispatchChange(old: string[]): void {
        const applyDefault = this.dispatchEvent(
            new Event('change', {
                bubbles: true,
                composed: true,
                cancelable: true,
            })
        );

        if (!applyDefault) {
            this.setSelected(old);
            this.buttons.map((button) => {
                button.selected = this.selected.includes(button.value);
            });
        }
    }

    private setSelected(selected: string[], announce?: boolean): void {
        /* c8 ignore next 1 */
        if (selected === this.selected) return;

        const old = this.selected;
        this.requestUpdate('selected', old);
        this._selected = selected;
        if (!announce) return;
        this.dispatchChange(old);
    }

    public override focus(options?: FocusOptions): void {
        this.rovingTabindexController.focus(options);
    }

    private deselectSelectedButtons(): void {
        this.buttons.forEach((button) => {
            if (!button.selected) return;

            button.selected = false;
            button.tabIndex = -1;
            button.setAttribute(
                this.selects ? 'aria-checked' : /* c8 ignore */ 'aria-pressed',
                'false'
            );
        });
    }

    private handleActionButtonChange(event: Event): void {
        event.stopPropagation();
        event.preventDefault();
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
                this.setSelected([target.value], true);
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
                this.setSelected(selected, true);

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

    private async applySelects(): Promise<void> {
        await this.manageSelects(true);
    }

    private async manageSelects(applied?: boolean): Promise<void> {
        if (!this.buttons.length) {
            return;
        }

        const options = this.buttons;
        switch (this.selects) {
            case 'single': {
                // single behaves as a radio group
                this.setAttribute('role', 'radiogroup');
                const selections: ActionButton[] = [];
                const updates = options.map(async (option) => {
                    await option.updateComplete;
                    if (option instanceof ActionButton)
                        option.setAttribute('role', 'radio');
                    option.setAttribute(
                        'aria-checked',
                        option.selected ? 'true' : 'false'
                    );
                    if (option.selected) {
                        selections.push(option);
                    }
                });
                if (applied) break;
                await Promise.all(updates);

                const selected = selections.map((button) => {
                    return button.value;
                });

                this.setSelected(selected || EMPTY_SELECTION);
                break;
            }
            case 'multiple': {
                // switching from single to multiple, remove role="radiogroup"
                if (this.getAttribute('role') === 'radiogroup') {
                    this.removeAttribute('role');
                }
                const selection: string[] = [];
                const selections: ActionButton[] = [];
                const updates = options.map(async (option) => {
                    await option.updateComplete;
                    if (option instanceof ActionButton)
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
                if (applied) break;
                await Promise.all(updates);
                const selected = !!selection.length
                    ? selection
                    : EMPTY_SELECTION;
                this.setSelected(selected);
                break;
            }
            default:
                // if user defines .selected
                if (this.selected.length) {
                    const selections: ActionButton[] = [];
                    const updates = options.map(async (option) => {
                        await option.updateComplete;
                        if (option instanceof ActionButton)
                            option.setAttribute('role', 'button');
                        if (option.selected) {
                            option.setAttribute('aria-pressed', 'true');
                            selections.push(option);
                        } else {
                            option.removeAttribute('aria-pressed');
                        }
                    });
                    if (applied) break;
                    await Promise.all(updates);

                    this.setSelected(
                        selections.map((button) => {
                            return button.value;
                        })
                    );
                } else {
                    this.buttons.forEach((option) => {
                        if (option instanceof ActionButton)
                            option.setAttribute('role', 'button');
                    });
                    break;
                }
        }

        // When no other role is defined, use role="toolbar", which is appropriate with roving tabindex.
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', 'toolbar');
        }
    }

    protected override render(): TemplateResult {
        return html`
            <slot role="presentation" @slotchange=${this.manageButtons}></slot>
        `;
    }

    protected override firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
        this.addEventListener('click', this.handleClick);
    }

    protected override updated(changes: PropertyValues): void {
        super.updated(changes);
        if (changes.has('selects')) {
            this.manageSelects();
            this.manageChildren();
            if (!!this.selects) {
                this.shadowRoot.addEventListener(
                    'change',
                    this.handleActionButtonChange
                );
            } else {
                this.shadowRoot.removeEventListener(
                    'change',
                    this.handleActionButtonChange
                );
            }
        }
        if (
            changes.has('quiet') ||
            changes.has('emphasized') ||
            changes.has('size') ||
            changes.has('staticColor')
        ) {
            this.manageChildren(changes);
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

    private manageChildren(changes?: PropertyValues): void {
        this.buttons.forEach((button) => {
            if (this.quiet || changes?.get('quiet')) {
                button.quiet = this.quiet;
            }
            if (this.emphasized || changes?.get('emphasized')) {
                button.emphasized = this.emphasized;
            }
            if (this.staticColor || changes?.get('staticColor')) {
                button.staticColor = this.staticColor;
            }
            if (this.selects || !this.hasManaged) {
                button.selected = this.selected.includes(button.value);
            }
            if (
                this.size &&
                (this.size !== 'm' ||
                    typeof changes?.get('size') !== 'undefined')
            ) {
                button.size = this.size;
            }
        });
    }

    private hasManaged = false;

    private manageButtons = (): void => {
        if (!this.slotElement) {
            return;
        }
        const assignedElements = this.slotElement.assignedElements({
            flatten: true,
        });
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
        if (this.selects || !this.hasManaged) {
            // <select> element merges selected so following paradigm here
            const currentlySelectedButtons: string[] = [];
            this.buttons.forEach((button: ActionButton) => {
                if (button.selected) {
                    currentlySelectedButtons.push(button.value);
                }
            });
            this.setSelected(this.selected.concat(currentlySelectedButtons));
        }
        this.manageChildren();
        this.manageSelects();
        this.hasManaged = true;
    };
}
