/*
Copyright 2025 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { PropertyValues, type TemplateResult } from 'lit';
import { SizedMixin } from '../../base/sizedMixin.js';
import { property } from '../../base/decorators.js';
import { Focusable } from '../../shared/focusable.js';

/**
 * Base class for AccordionItem components
 * @element sp-accordion-item
 * @slot - The content of the item that is hidden when the item is not open
 * @fires sp-accordion-item-toggle - Announce that an accordion item has been toggled while allowing the event to be cancelled.
 */
export abstract class AccordionItemBase extends SizedMixin(Focusable, {
    noDefaultSize: true,
}) {
    @property({ type: Boolean, reflect: true })
    public open = false;

    @property({ type: String, reflect: true })
    public label = '';

    @property({ type: Boolean, reflect: true })
    public override disabled = false;

    public override get focusElement(): HTMLElement {
        return this.shadowRoot.querySelector('#header') as HTMLElement;
    }

    protected onClick(): void {
        /* c8 ignore next 3 */
        if (this.disabled) {
            return;
        }
        this.toggle();
    }

    protected toggle(): void {
        this.open = !this.open;
        const applyDefault = this.dispatchEvent(
            new CustomEvent('sp-accordion-item-toggle', {
                bubbles: true,
                composed: true,
                cancelable: true,
            })
        );
        if (!applyDefault) {
            this.open = !this.open;
        }
    }

    protected override updated(changes: PropertyValues): void {
        super.updated(changes);
        if (changes.has('disabled')) {
            if (this.disabled) {
                this.setAttribute('aria-disabled', 'true');
            } else {
                this.removeAttribute('aria-disabled');
            }
        }
    }

    /**
     * Render method to be implemented by subclasses
     */
    protected abstract override render(): TemplateResult;
}
