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
    PropertyValues,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import { randomID } from '@spectrum-web-components/shared/src/random-id.js';

import panelStyles from './tab-panel.css.js';

/**
 * This component creates a tabpanel container for Tabs.
 *
 * @element sp-tab-panel
 *
 * @slot - content of the Tab Panel
 *
 */
export class TabPanel extends SpectrumElement {
    /**
     * Returns the styles to be applied to the component.
     */
    static override styles = [panelStyles];

    /**
     * Indicates if the tab panel is selected.
     */
    @property({ type: Boolean, reflect: true })
    public selected = false;

    /**
     * The value associated with the tab panel.
     */
    @property({ type: String, reflect: true })
    public value = '';

    /**
     * Handles focusin event by removing the tabindex attribute.
     */
    protected handleFocusin(): void {
        this.removeAttribute('tabindex');
    }

    /**
     * Handles focusout event by setting the tabindex attribute based on the selected state.
     */
    protected handleFocusout(): void {
        this.tabIndex = this.selected ? 0 : -1;
    }

    /**
     * Renders the component template.
     */
    protected override render(): TemplateResult {
        return html`
            <slot
                @focusin=${this.handleFocusin}
                @focusout=${this.handleFocusout}
            ></slot>
        `;
    }

    /**
     * Called after the element's DOM has been updated the first time.
     * Sets up initial attributes and properties.
     */
    protected override firstUpdated(): void {
        this.slot = 'tab-panel';

        this.setAttribute('role', 'tabpanel');

        this.tabIndex = 0;

        // Generate a unique ID if the element does not have one
        if (!this.hasAttribute('id')) {
            this.id = `sp-tab-panel-${randomID()}`;
        }
    }

    /**
     * Called when the element is updated.
     * Updates the aria-hidden attribute and tabindex based on the selected state.
     */
    protected override updated(changes: PropertyValues<this>): void {
        if (changes.has('selected')) {
            if (this.selected) {
                this.removeAttribute('aria-hidden');
                this.tabIndex = 0;
            } else {
                this.setAttribute('aria-hidden', 'true');
                this.tabIndex = -1;
            }
        }
    }
}
