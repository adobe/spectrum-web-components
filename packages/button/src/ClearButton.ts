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
    SizedMixin,
    TemplateResult,
} from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import { StyledButton } from './StyledButton.js';
import buttonStyles from '@spectrum-web-components/clear-button/src/clear-button.css.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-cross75.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-cross100.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-cross200.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-cross300.js';
import crossMediumStyles from '@spectrum-web-components/icon/src/spectrum-icon-cross.css.js';

const crossIcon: Record<string, () => TemplateResult> = {
    s: () => html`
        <sp-icon-cross75
            slot="icon"
            class="icon spectrum-UIIcon-Cross75"
        ></sp-icon-cross75>
    `,
    m: () => html`
        <sp-icon-cross100
            slot="icon"
            class="icon spectrum-UIIcon-Cross100"
        ></sp-icon-cross100>
    `,
    l: () => html`
        <sp-icon-cross200
            slot="icon"
            class="icon spectrum-UIIcon-Cross200"
        ></sp-icon-cross200>
    `,
    xl: () => html`
        <sp-icon-cross300
            slot="icon"
            class="icon spectrum-UIIcon-Cross300"
        ></sp-icon-cross300>
    `,
};

/**
 * @element sp-clear-button
 *
 * @slot - text label of the Clear Button
 */
export class ClearButton extends SizedMixin(StyledButton, {
    noDefaultSize: true,
}) {
    public static override get styles(): CSSResultArray {
        return [...super.styles, buttonStyles, crossMediumStyles];
    }

    /**
     * The visual variant to apply to this button.
     * @deprecated Use `static-color='white'` instead.
     */
    @property({ reflect: true })
    public variant: 'overBackground' | undefined;

    /**
     * The visual variant to apply to this button.
     */
    @property({ reflect: true })
    public staticColor: 'white' | undefined;

    protected override get buttonContent(): TemplateResult[] {
        return [crossIcon[this.size]()];
    }

    protected override render(): TemplateResult {
        return html`
            <div class="fill">${super.render()}</div>
        `;
    }
}
