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
    queryAssignedNodes,
} from '@spectrum-web-components/base/src/decorators.js';
import { FocusGroupController } from '@spectrum-web-components/reactive-controllers/src/FocusGroup.js';

import { AccordionItem } from './AccordionItem.js';

import styles from './accordion.css.js';

/**
 * @element sp-accordion
 * @slot - The sp-accordion-item children to display.
 */
export class Accordion extends SizedMixin(SpectrumElement, {
    noDefaultSize: true,
}) {
    public static override get styles(): CSSResultArray {
        return [styles];
    }

    /**
     * Allows multiple accordion items to be opened at the same time
     */
    @property({ type: Boolean, reflect: true, attribute: 'allow-multiple' })
    public allowMultiple = false;

    /**
     * Sets the spacing between the content to borders of an accordion item
     */
    @property({ type: String, reflect: true })
    public density?: 'compact' | 'spacious';

    /**
     * The heading level (2-6) to use for all accordion item titles.
     * Defaults to 3.
     */
    @property({ type: Number, reflect: true })
    public level: number = 3;

    @queryAssignedNodes()
    private defaultNodes!: NodeListOf<AccordionItem>;

    private get items(): AccordionItem[] {
        return [...(this.defaultNodes || [])].filter(
            (node: HTMLElement) => typeof node.tagName !== 'undefined'
        ) as AccordionItem[];
    }

    focusGroupController = new FocusGroupController<AccordionItem>(this, {
        direction: 'vertical',
        elements: () => this.items,
        isFocusableElement: (el: AccordionItem) => !el.disabled,
    });

    public override focus(): void {
        this.focusGroupController.focus();
    }

    private async onToggle(event: Event): Promise<void> {
        const target = event.target as AccordionItem;
        // Let the event pass through the DOM so that it can be
        // prevented from the outside if a user so desires.
        await 0;
        if (this.allowMultiple || event.defaultPrevented) {
            // No toggling when `allowMultiple` or the user prevents it.
            return;
        }
        const items = [...this.items] as AccordionItem[];
        /* c8 ignore next 3 */
        if (items && !items.length) {
            // no toggling when there aren't items.
            return;
        }
        items.forEach((item) => {
            if (item !== target) {
                // Close all the items that didn't dispatch the event.
                item.open = false;
            }
        });
    }

    private handleSlotchange(): void {
        this.focusGroupController.clearElementCache();
        this.items.forEach((item) => {
            item.size = this.size;
            item.level = this.level;
        });
    }

    protected override updated(changed: PropertyValues<this>): void {
        super.updated(changed);
        if (
            changed.has('size') &&
            (!!changed.get('size') || this.size !== 'm')
        ) {
            this.items.forEach((item) => {
                item.size = this.size;
            });
        }
        if (
            changed.has('level') &&
            (!!changed.get('level') || this.level !== 3)
        ) {
            this.items.forEach((item) => {
                item.level = this.level;
            });
        }
    }

    protected override render(): TemplateResult {
        return html`
            <slot
                @slotchange=${this.handleSlotchange}
                @sp-accordion-item-toggle=${this.onToggle}
            ></slot>
        `;
    }
}
