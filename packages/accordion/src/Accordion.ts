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
    PropertyValues,
    queryAssignedNodes,
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

    /**
     * Allows multiple accordion items to be opened at the same time
     */
    @property({ type: Boolean, reflect: true, attribute: 'allow-multiple' })
    public allowMultiple = false;

    @queryAssignedNodes()
    private defaultNodes!: NodeListOf<AccordionItem>;

    private get items(): AccordionItem[] {
        return [...(this.defaultNodes || [])].filter(
            (node: HTMLElement) => typeof node.tagName !== 'undefined'
        ) as AccordionItem[];
    }

    public focus(): void {
        if (this.focusElement.isSameNode(this)) {
            return;
        }

        super.focus();
    }

    public get focusElement(): Accordion | AccordionItem {
        const items = this.items;
        if (items && !items.length) {
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
        const items = this.items;
        /* c8 ignore next 3 */
        if (items && !items.length) {
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
        const items = this.items;
        const focused = items.indexOf(getActiveElement(this) as AccordionItem);
        let next = focused;
        let availableItems = items.length;
        // cycle through the available items in the directions of the offset to find the next non-disabled item
        while ((items[next].disabled || next === focused) && availableItems) {
            availableItems -= 1;
            next = (items.length + next + direction) % items.length;
        }
        // if there are no non-disabled items, skip the work to focus a child
        if (items[next].disabled || next === focused) {
            return;
        }
        items[next].focus();
    }

    private onToggle(event: Event): void {
        const target = event.target as AccordionItem;
        const items = [...this.items] as AccordionItem[];
        /* c8 ignore next 3 */
        if (items && !items.length) {
            return;
        }
        if (!this.allowMultiple && !event.defaultPrevented) {
            items.forEach((item) => {
                if (item.open && item !== target) {
                    item.open = false;
                }
            });
        }
    }

    protected render(): TemplateResult {
        return html`
            <slot></slot>
        `;
    }

    protected firstUpdated(changed: PropertyValues): void {
        super.firstUpdated(changed);

        this.addEventListener('focusin', this.startListeningToKeyboard);
        this.addEventListener('focusout', this.stopListeningToKeyboard);
        this.addEventListener('sp-accordion-item-toggle', this.onToggle);
    }
}
