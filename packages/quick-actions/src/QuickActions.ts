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
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';

import styles from './quick-actions.css.js';

/**
 * @element sp-quick-actions
 *
 * @slot - Action Buttons to displayed for quick use
 */
export class QuickActions extends SpectrumElement {
    public static override get styles(): CSSResultArray {
        return [styles];
    }

    @property({ type: Boolean, reflect: true })
    public opened = false;

    @property({
        type: Boolean,
        attribute: 'text-only',
        hasChanged() {
            return false;
        },
    })
    public textOnly = false;

    protected override update(changes: PropertyValues<this>): void {
        super.update(changes);
        if (window.__swc.DEBUG) {
            window.__swc.warn(
                this,
                `<${this.localName}> is deprecated. Use an Action bar to allow users to perform actions on either a single or multiple items at the same time, instead.`,
                'https://opensource.adobe.com/spectrum-web-components/components/quick-actions/#deprecation',
                { level: 'deprecation' }
            );
        }
    }

    protected override render(): TemplateResult {
        return html`
            <slot></slot>
        `;
    }
}
