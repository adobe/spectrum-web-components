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
    CSSResultArray,
    TemplateResult,
    property,
} from '@spectrum-web-components/base';

import { AccordionItem } from './AccordionItem.js';

import styles from './accordion.css.js';
import { Focusable, getActiveElement } from '@spectrum-web-components/shared';

/**
 * @element sp-accordion
 */
export class Accordion extends Focusable {
    public static get styles(): CSSResultArray {
        return [styles];
    }

    public focusedItemIndex = 0;
    public focusInItemIndex = 0;
    protected isShiftTabbing = false;

    /**
     * Allows multiple accordion items to be opened at the same time
     */
    @property({ type: Boolean, reflect: true, attribute: 'allow-multiple' })
    public allowMultiple = false;

    public constructor() {
        super();
        this.handleKeydown = this.handleKeydown.bind(this);
        this.startListeningToKeyboard = this.startListeningToKeyboard.bind(
            this
        );
        this.stopListeningToKeyboard = this.stopListeningToKeyboard.bind(this);

        this.addEventListener('focusin', this.startListeningToKeyboard);
        this.addEventListener('focusout', this.stopListeningToKeyboard);
        this.addEventListener('sp-accordion-item-toggle', this.onToggle);
    }

    public focus(): void {
        if (this.focusElement.isSameNode(this)) {
            return;
        }

        super.focus();
    }

    public get focusElement(): Accordion | AccordionItem {
        const items = this.querySelectorAll('sp-accordion-item');
        if (!items.length) {
            return this;
        }
        let index = 0;
        while (index < items.length && items[index] && items[index].disabled) {
            index += 1;
        }
        if (items[index]) {
            return items[index];
        }
        /* c8 ignore next */
        return this;
    }

    public startListeningToKeyboard(): void {
        const accordionItems = this.querySelectorAll('sp-accordion-item');
        /* c8 ignore next 3 */
        if (accordionItems.length === 0) {
            return;
        }
        this.addEventListener('keydown', this.handleKeydown);
    }

    public stopListeningToKeyboard(): void {
        this.removeEventListener('keydown', this.handleKeydown);
    }

    private handleKeydown(event: KeyboardEvent): void {
        const { code } = event;
        /* c8 ignore next 3 */
        if (code !== 'ArrowDown' && code !== 'ArrowUp') {
            return;
        }
        event.preventDefault();
        const direction = code === 'ArrowDown' ? 1 : -1;
        this.focusItemByOffset(direction);
    }

    private focusItemByOffset(direction: number): void {
        const items = [...this.querySelectorAll('sp-accordion-item')];
        const focused = items.indexOf(getActiveElement(this) as AccordionItem);
        let next = focused;
        next = (items.length + next + direction) % items.length;
        while (items[next].disabled) {
            next = (items.length + next + direction) % items.length;
        }
        items[next].focus();
    }

    protected manageShiftTab(): void {
        this.addEventListener('keydown', (event: KeyboardEvent) => {
            const items = [
                ...this.querySelectorAll('sp-accordion-item'),
            ] as AccordionItem[];
            const firstFocusable = items.find(
                (item) => !item.disabled
            ) as AccordionItem;
            if (
                !event.defaultPrevented &&
                event.shiftKey &&
                event.code === 'Tab' &&
                (event.composedPath() as AccordionItem[]).includes(
                    firstFocusable
                )
            ) {
                this.isShiftTabbing = true;
                HTMLElement.prototype.focus.apply(this);
                setTimeout(() => (this.isShiftTabbing = false), 0);
            }
        });
    }

    protected render(): TemplateResult {
        return html`
            <slot></slot>
        `;
    }

    private onToggle(event: Event): void {
        const target = event.target as AccordionItem;
        const accordionItems = this.querySelectorAll('sp-accordion-item');
        /* c8 ignore next 3 */
        if (!accordionItems) {
            return;
        }
        if (!this.allowMultiple) {
            accordionItems.forEach((item: Element) => {
                const accordionItem = item as AccordionItem;
                if (accordionItem.open && accordionItem !== target) {
                    accordionItem.open = false;
                }
            });
        }

        target.open = true;
    }
}
