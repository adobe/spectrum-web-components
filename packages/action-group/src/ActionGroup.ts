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
    CSSResultArray,
    TemplateResult,
    property,
    PropertyValues,
} from '@spectrum-web-components/base';
import type { ActionButton } from '@spectrum-web-components/action-button';

import styles from './action-group.css.js';

const EMPTY_SELECTION: string[] = [];

/**
 * @element sp-action-group
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

    private handleClick(event: Event): void {
        const target = event.target as ActionButton;
        if (typeof target.value === 'undefined') {
            return;
        }
        switch (this.selects) {
            case 'single': {
                const selected = [
                    ...this.querySelectorAll('[selected]'),
                ] as ActionButton[];
                selected.forEach((el) => {
                    el.selected = false;
                    el.tabIndex = -1;
                    el.setAttribute('aria-checked', 'false');
                });
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
                    ...(this.getRootNode() as Document).querySelectorAll<ActionGroup>(
                        'sp-action-group'
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
        switch (this.selects) {
            case 'single': {
                this.setAttribute('role', 'radiogroup');
                let selection: ActionButton | undefined;
                const options = this.buttons;
                const updates = options.map(async (option) => {
                    await option.updateComplete;
                    option.setAttribute('role', 'radio');
                    option.setAttribute(
                        'aria-checked',
                        option.selected ? 'true' : 'false'
                    );
                    option.tabIndex = option.selected ? 0 : -1;
                    if (option.selected) {
                        selection = option;
                    }
                });
                await Promise.all(updates);
                (selection || options[0]).tabIndex = 0;
                this.selected = selection ? [selection.value] : EMPTY_SELECTION;
                break;
            }
            case 'multiple': {
                this.setAttribute('role', 'group');
                const selection: string[] = [];
                const options = this.buttons;
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
                const options = [
                    ...this.querySelectorAll('sp-action-button'),
                ] as ActionButton[];
                options.forEach((option) => {
                    option.removeAttribute('role');
                    option.tabIndex = 0;
                });
                this.removeAttribute('role');
                this.selected = EMPTY_SELECTION;
                break;
        }
    }

    protected render(): TemplateResult {
        return html`
            <slot role="presentation"></slot>
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
        }
        if (
            (changes.has('quiet') && this.quiet) ||
            (changes.has('emphasized') && this.emphasized)
        ) {
            [...this.children].forEach((button) => {
                if (changes.has('quiet')) {
                    (button as ActionButton).quiet = this.quiet;
                }
                if (changes.has('emphasized')) {
                    (button as ActionButton).emphasized = this.emphasized;
                }
            });
        }
        if (changes.has('label')) {
            if (this.label.length) {
                this.setAttribute('aria-label', this.label);
            } else {
                this.removeAttribute('aria-label');
            }
        }
    }

    public connectedCallback(): void {
        super.connectedCallback();
        if (!this.observer) {
            const findButtons = (): void => {
                const buttons = [
                    ...this.querySelectorAll(this._buttonSelector),
                ] as ActionButton[];
                buttons.filter((button) => {
                    const buttonParent = button.parentElement;
                    return !buttonParent?.closest(this._buttonSelector);
                });
                this.buttons = buttons;
                this.manageSelects();
            };
            this.observer = new MutationObserver(findButtons);
            findButtons();
        }
        this.observer.observe(this, { childList: true, subtree: true });
    }

    public disconnectedCallback(): void {
        this.observer.disconnect();
        super.disconnectedCallback();
    }

    private observer!: MutationObserver;
}
