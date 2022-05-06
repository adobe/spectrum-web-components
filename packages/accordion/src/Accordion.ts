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
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    property,
    queryAssignedNodes,
} from '@spectrum-web-components/base/src/decorators.js';

import { AccordionItem } from './AccordionItem.js';

import styles from './accordion.css.js';

/**
 * @element sp-accordion
 * @slot - The sp-accordion-item children to display.
 */
export class Accordion extends SpectrumElement {
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
        const firstActive = this.items.find((el) => {
            return !el.disabled;
        });
        if (firstActive) {
            firstActive.focus();
        }
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

    protected render(): TemplateResult {
        return html`
            <slot @sp-accordion-item-toggle=${this.onToggle}></slot>
        `;
    }
}
