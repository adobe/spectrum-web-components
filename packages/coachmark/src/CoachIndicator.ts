/*
Copyright 2023 Adobe. All rights reserved.
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
import styles from './coach-indicator.css.js';

/**
 * @element sp-coach-indicator
 */
export class CoachIndicator extends SpectrumElement {
    public static override get styles(): CSSResultArray {
        return [styles];
    }

    @property({ type: Boolean, reflect: true })
    public quiet = false;

    @property({ reflect: true })
    public static?: 'white' | 'black';

    @property({ reflect: true })
    public variant?: 'white' | 'black';

    protected override render(): TemplateResult {
        return html`
            <div class="ring"></div>
            <div class="ring"></div>
            <div class="ring"></div>
        `;
    }

    protected override updated(changes: PropertyValues): void {
        super.updated(changes);
        if (
            changes.has('variant') &&
            (this.variant || typeof changes.get('variant'))
        ) {
            this.static = this.variant;
            if (window.__swc.DEBUG) {
                window.__swc.warn(
                    this,
                    `The "variant" attribute/property of <${this.localName}> have been deprecated. Use "static" with any of the same values instead. "variant" will be removed in a future release.`,
                    'https://opensource.adobe.com/spectrum-web-components/components/badge/#fixed',
                    { level: 'deprecation' }
                );
            }
        }
    }
}
