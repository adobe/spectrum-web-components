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
    TemplateResult,
} from '@spectrum-web-components/base';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import { PickerBase } from '@spectrum-web-components/picker';
import '@spectrum-web-components/action-button/sp-action-button.js';
import { ObserveSlotText } from '@spectrum-web-components/shared/src/observe-slot-text.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-more.js';
import actionMenuStyles from './action-menu.css.js';
import { Placement } from '@spectrum-web-components/overlay';

/**
 * @element sp-action-menu
 *
 * @slot - menu items to be listed in the Action Menu
 * @slot icon - The icon to use for Action Menu
 * @slot label - The label to use on for the Action Menu
 * @attr selects - By default `sp-action-menu` does not manage a selection. If
 *   you'd like for a selection to be held by the `sp-menu` that it presents in
 *   its overlay, use `selects="single" to activate this functionality.
 */
export class ActionMenu extends ObserveSlotText(PickerBase, 'label') {
    public static override get styles(): CSSResultArray {
        return [actionMenuStyles];
    }

    @property({ type: String })
    public override selects: undefined | 'single' = undefined;

    @property({ type: String })
    public tooltip_description = 'none';

    @property({ type: String })
    public tooltip_placement: Placement = 'none';

    protected override listRole: 'listbox' | 'menu' = 'menu';
    protected override itemRole = 'menuitem';
    private get hasLabel(): boolean {
        return this.slotHasContent;
    }

    protected override get buttonContent(): TemplateResult[] {
        return [
            html`
                <slot name="icon" slot="icon" ?icon-only=${!this.hasLabel}>
                    <sp-icon-more class="icon"></sp-icon-more>
                </slot>
                <slot name="label" ?hidden=${!this.hasLabel}></slot>
            `,
        ];
    }

    private renderTooltip(): TemplateResult {
        if (
            this.tooltip_description != 'none' &&
            this.tooltip_placement != 'none'
        )
            return html`
                <sp-tooltip self-managed placement=${this.tooltip_placement}>
                    ${this.tooltip_description}
                </sp-tooltip>
            `;
        else if (this.tooltip_description != 'none')
            return html`
                <sp-tooltip self-managed>
                    ${this.tooltip_description}
                </sp-tooltip>
            `;
        else return html``;
    }

    protected override render(): TemplateResult {
        return html`
            <sp-action-button
                ?quiet=${this.quiet}
                ?selected=${this.open}
                aria-haspopup="true"
                aria-controls=${ifDefined(this.open ? 'menu' : undefined)}
                aria-expanded=${this.open ? 'true' : 'false'}
                aria-label=${ifDefined(this.label || undefined)}
                id="button"
                class="button"
                size=${this.size}
                @blur=${this.onButtonBlur}
                @click=${this.onButtonClick}
                @focus=${this.onButtonFocus}
                ?disabled=${this.disabled}
            >
                ${this.buttonContent} ${this.renderTooltip()}
            </sp-action-button>
        `;
    }

    protected override update(changedProperties: PropertyValues<this>): void {
        if (changedProperties.has('invalid')) {
            this.invalid = false;
        }
        super.update(changedProperties);
    }
}
