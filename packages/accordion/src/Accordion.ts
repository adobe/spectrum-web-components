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
 * @slot - The sp-accordion-item children to display within the accordion.
 */
export class Accordion extends SizedMixin(SpectrumElement, {
    noDefaultSize: true,
}) {
    public static override get styles(): CSSResultArray {
        return [styles];
    }

    /**
     * Allows multiple accordion items to be opened at the same time.
     * When true, more than one accordion item can be expanded simultaneously.
     */
    @property({ type: Boolean, reflect: true, attribute: 'allow-multiple' })
    public allowMultiple = false;

    /**
     * Sets the spacing between the content and borders of an accordion item.
     * Can be 'compact' or 'spacious'.
     */
    @property({ type: String, reflect: true })
    public density?: 'compact' | 'spacious';

    /**
     * Retrieves the default nodes assigned to the slot.
     * These nodes are expected to be AccordionItem elements.
     */
    @queryAssignedNodes()
    private defaultNodes!: NodeListOf<AccordionItem>;

    /**
     * Gets the list of accordion items.
     * Filters the default nodes to include only valid AccordionItem elements.
     */
    private get items(): AccordionItem[] {
        return [...(this.defaultNodes || [])].filter(
            (node: HTMLElement) => typeof node.tagName !== 'undefined'
        ) as AccordionItem[];
    }

    /**
     * Controller for managing focus within the accordion.
     * Configures focus behavior for the accordion items.
     */
    focusGroupController = new FocusGroupController<AccordionItem>(this, {
        direction: 'vertical',
        elements: () => this.items,
        isFocusableElement: (el: AccordionItem) => !el.disabled,
    });

    /**
     * Overrides the focus method to delegate focus to the focus group controller.
     */
    public override focus(): void {
        this.focusGroupController.focus();
    }

    /**
     * Handles the toggle event for an accordion item.
     * Closes other accordion items if `allowMultiple` is false and the event is not prevented.
     */
    private async onToggle(event: Event): Promise<void> {
        const target = event.target as AccordionItem;

        // Let the event pass through the DOM so that it can be
        // prevented from the outside if a user so desires.
        await 0;

        if (this.allowMultiple || event.defaultPrevented) {
            // No toggling when `allowMultiple` is true or the user prevents it.
            return;
        }

        const items = [...this.items] as AccordionItem[];

        /* c8 ignore next 3 */
        if (items && !items.length) {
            // No toggling when there aren't items.
            return;
        }

        items.forEach((item) => {
            if (item !== target) {
                // Close all the items that didn't dispatch the event.
                item.open = false;
            }
        });
    }

    /**
     * Handles the slotchange event.
     * Clears the element cache in the focus group controller and updates the size of each accordion item.
     */
    private handleSlotchange(): void {
        this.focusGroupController.clearElementCache();
        this.items.forEach((item) => {
            item.size = this.size;
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
