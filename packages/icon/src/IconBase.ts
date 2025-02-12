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

import iconStyles from './icon.css.js';

export class IconBase extends SpectrumElement {
    public static override get styles(): CSSResultArray {
        return [iconStyles];
    }

    @property({ reflect: true })
    public label = '';

    @property({ reflect: true })
    public size?: 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';

    public override connectedCallback(): void {
        super.connectedCallback();
    }

    public override disconnectedCallback(): void {
        super.disconnectedCallback();
    }

    protected override update(changes: PropertyValues): void {
        if (changes.has('label')) {
            if (this.label) {
                this.removeAttribute('aria-hidden');
            } else {
                this.setAttribute('aria-hidden', 'true');
            }
        }

        super.update(changes);
    }

    protected override render(): TemplateResult {
        return html`
            <slot></slot>
        `;
    }
}
