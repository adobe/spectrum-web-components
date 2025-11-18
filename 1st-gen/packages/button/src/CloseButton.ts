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
import { StyledButton } from './StyledButton.js';
import buttonStyles from '@spectrum-web-components/close-button/src/close-button.css.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-cross200.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-cross300.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-cross400.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-cross500.js';
import crossMediumStyles from '@spectrum-web-components/icon/src/spectrum-icon-cross.css.js';
import type { ButtonStaticColors } from './Button.js';

const crossIcon: Record<string, () => TemplateResult> = {
    s: () => html`
        <sp-icon-cross200
            slot="icon"
            class="icon spectrum-UIIcon-Cross200"
        ></sp-icon-cross200>
    `,
    m: () => html`
        <sp-icon-cross300
            slot="icon"
            class="icon spectrum-UIIcon-Cross300"
        ></sp-icon-cross300>
    `,
    l: () => html`
        <sp-icon-cross400
            slot="icon"
            class="icon spectrum-UIIcon-Cross400"
        ></sp-icon-cross400>
    `,
    xl: () => html`
        <sp-icon-cross500
            slot="icon"
            class="icon spectrum-UIIcon-Cross500"
        ></sp-icon-cross500>
    `,
};

/**
 * @element sp-close-button
 *
 * @slot - text label of the Close Button
 */
export class CloseButton extends SizedMixin(StyledButton, {
    noDefaultSize: true,
}) {
    public static override get styles(): CSSResultArray {
        return [...super.styles, buttonStyles, crossMediumStyles];
    }

    /**
     * The visual variant to apply to this button.
     */
    @property({ reflect: true })
    public variant: ButtonStaticColors | '' = '';

    @property({ reflect: true, attribute: 'static-color' })
    public staticColor?: 'black' | 'white';

    protected override get buttonContent(): TemplateResult[] {
        return [
            crossIcon[this.size](),
            html`
                <span id="label" class="visually-hidden">
                    <slot @slotchange=${this.manageTextObservedSlot}></slot>
                </span>
            `,
        ];
    }
}
