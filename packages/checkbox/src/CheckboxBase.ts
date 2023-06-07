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

import { html, TemplateResult } from '@spectrum-web-components/base';
import {
    property,
    query,
} from '@spectrum-web-components/base/src/decorators.js';
import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';

export class CheckboxBase extends Focusable {
    @property({ type: Boolean, reflect: true })
    public checked = false;

    @property({ type: Boolean, reflect: true })
    public readonly = false;

    @query('#input')
    protected inputElement!: HTMLInputElement;

    public override get focusElement(): HTMLElement {
        return this.inputElement;
    }

    public handleChange(): void {
        if (this.readonly) {
            this.inputElement.checked = this.checked;
            return;
        }
        this.checked = this.inputElement.checked;

        const changeEvent = new CustomEvent('change', {
            bubbles: true,
            cancelable: true,
            composed: true,
        });
        const applyDefault = this.dispatchEvent(changeEvent);

        if (!applyDefault) {
            this.checked = !this.inputElement.checked;
            this.inputElement.checked = this.checked;
        }
    }

    protected override render(): TemplateResult {
        return html`
            <input
                id="input"
                type="checkbox"
                .checked=${this.checked}
                @change=${this.handleChange}
            />
        `;
    }
}
