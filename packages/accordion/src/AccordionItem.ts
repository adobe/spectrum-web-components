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
} from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';

import { ChevronRightMediumIcon } from '@spectrum-web-components/icons-ui';

import styles from './accordion-item.css.js';

/**
 * @element sp-accordion
 * @slot - The content of the item that is hidden when the item is not open
 */
export class AccordionItem extends Focusable {
    public static get styles(): CSSResultArray {
        return [styles];
    }

    @property({ type: Boolean, reflect: true })
    public open = false;

    @property({ type: String, reflect: true })
    public label = '';

    @property({ type: Boolean, reflect: true })
    public disabled = false;

    public get focusElement(): HTMLElement {
        return this.shadowRoot.querySelector('#header') as HTMLElement;
    }

    constructor() {
        super();

        this.addEventListener('keydown', this.onKeyDown);
    }

    private onKeyDown(event: KeyboardEvent): void {
        if (this.disabled) {
            return;
        }
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.dispatchEvent(
                new CustomEvent('sp-accordion-item-toggle', {
                    bubbles: true,
                    composed: true,
                })
            );
        }
    }

    private onClick(): void {
        /* istanbul ignore if */
        if (this.disabled) {
            return;
        }
        this.dispatchEvent(
            new CustomEvent('sp-accordion-item-toggle', {
                bubbles: true,
                composed: true,
            })
        );
    }

    protected render(): TemplateResult {
        return html`
            <h3 id="heading">
                <button
                    id="header"
                    @click=${this.onClick}
                    aria-label=${ifDefined(this.label || undefined)}
                    aria-expanded=${this.open}
                    aria-controls="content"
                >
                    ${this.label}
                </button>
                <sp-icon id="indicator" size="xs">
                    ${ChevronRightMediumIcon({ hidden: true })}
                </sp-icon>
            </h3>
            <div id="content" role="region" aria-labelledby="header">
                <slot></slot>
            </div>
        `;
    }

    protected updated(changes: PropertyValues): void {
        super.updated(changes);
        if (changes.has('disabled')) {
            if (this.disabled) {
                this.setAttribute('aria-disabled', 'true');
            } else {
                this.removeAttribute('aria-disabled');
            }
        }
    }
}
