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
    CSSResultGroup,
    html,
    PropertyValues,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';

import styles from './combobox-item.css.js';

/**
 * @element sp-combobox-item
 */
export class ComboboxItem extends SpectrumElement {
    public static override get styles(): CSSResultGroup {
        return [styles];
    }

    public get value(): string {
        return (this.textContent as string).trim();
    }

    protected override render(): TemplateResult {
        return html`
            <slot></slot>
        `;
    }

    protected override firstUpdated(changed: PropertyValues<this>): void {
        super.firstUpdated(changed);
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', 'option');
        }
        // If I am an light DOM child of combobox
        // if ((this.parentElement as HTMLElement)?.localName === 'sp-combobox') {
        //     this.slot = 'option';

        //     /*
        //     <sp-combobox>
        //         <sp-combobox-item slot="option"></sp-combobox-item>
        //     </sp-combobox>
        //     */
        // }
        // If I am in the shadow DOM of a combobox
        if (
            (this.getRootNode() as ShadowRoot).host?.localName === 'sp-combobox'
        ) {
            return;

            /*
            <sp-combobox>
                <sp-combobox-item slot="option"></sp-combobox-item>
            </sp-combobox>
            */
        }
        this.slot = 'option';
    }
}
