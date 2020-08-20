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
    property,
    html,
    TemplateResult,
    query,
    CSSResultArray,
} from '@spectrum-web-components/base';
import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';

export class CheckboxBase extends Focusable {
    public static get styles(): CSSResultArray {
        return [...super.styles];
    }

    @property({ type: Boolean, reflect: true })
    public checked = false;

    @property({ type: Boolean, reflect: true })
    public quiet = false;

    @query('#input')
    protected inputElement!: HTMLInputElement;

    public get focusElement(): HTMLElement {
        return this.inputElement;
    }

    public handleChange(event: Event): void {
        this.checked = this.inputElement.checked;

        // Change events from the shadow DOM are not transmitted into
        // the parent light DOM
        const changeEvent = new CustomEvent('change', {
            detail: {
                sourceEvent: event,
            },
            bubbles: event.bubbles,
            cancelable: event.cancelable,
        });
        this.dispatchEvent(changeEvent);
    }

    protected render(): TemplateResult {
        return html`
            <input
                id="input"
                aria-labelledby="label"
                type="checkbox"
                .checked=${this.checked}
                @change=${this.handleChange}
            />
        `;
    }
}
