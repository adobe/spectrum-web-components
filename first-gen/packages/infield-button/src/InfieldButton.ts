/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import {
    CSSResultArray,
    html,
    SizedMixin,
    TemplateResult,
} from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import { ButtonBase } from '@spectrum-web-components/button/src/ButtonBase.js';

import styles from './infield-button.css.js';

/**
 * @element sp-infield-button
 */
export class InfieldButton extends SizedMixin(ButtonBase, {
    noDefaultSize: true,
    validSizes: ['s', 'm', 'l', 'xl'],
}) {
    public static override get styles(): CSSResultArray {
        return [...super.styles, styles];
    }

    /**
     * Whether to style the button as if it is at the start or end of a vertical stack
     * @type {'start' | 'end'}
     */
    @property()
    block?: 'start' | 'end';

    /**
     * Whether to style the button as if it is at the start or end of a horizontal group
     * @type {'start' | 'end'}
     */
    @property()
    inline?: 'start' | 'end';

    @property({ type: Boolean, reflect: true })
    quiet = false;

    protected override get buttonContent(): TemplateResult[] {
        const buttonContent = html`
            <div class="fill">
                <slot></slot>
            </div>
        `;
        return [buttonContent];
    }
}
