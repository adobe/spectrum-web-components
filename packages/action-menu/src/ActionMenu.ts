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
import { state } from '@spectrum-web-components/base/src/decorators.js';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import { DESCRIPTION_ID, PickerBase } from '@spectrum-web-components/picker';
import '@spectrum-web-components/action-button/sp-action-button.js';
import { ObserveSlotPresence } from '@spectrum-web-components/shared/src/observe-slot-presence.js';
import { ObserveSlotText } from '@spectrum-web-components/shared/src/observe-slot-text.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-more.js';
import actionMenuStyles from './action-menu.css.js';
import { SlottableRequestEvent } from '@spectrum-web-components/overlay/src/slottable-request-event.js';

/**
 * @element sp-action-menu
 * @slot - Menu items to be listed in the Action Menu.
 * @slot icon - The icon to use for the Action Menu.
 * @slot label - The label to use for the Action Menu.
 * @slot label-only - The label to use for the Action Menu (no icon space reserved).
 * @slot tooltip - Tooltip to be applied to the Action Button.
 * @attribute selects - By default, the Action Menu does not manage a selection.
 *                      Use `selects="single"` to activate selection functionality in the menu.
 */
export class ActionMenu extends ObserveSlotPresence(
    ObserveSlotText(PickerBase, 'label'),
    '[slot="label-only"]'
) {
    public static override get styles(): CSSResultArray {
        return [actionMenuStyles];
    }

    /**
     * Defines the selection mode for the action menu.
     * Can be 'single' for single selection or undefined for no selection management.
     */
    @property({ type: String })
    public override selects: undefined | 'single' = undefined;

    /**
     * Defines the static color variant for the action menu.
     * Can be 'white' or 'black'.
     */
    @property({ reflect: true, attribute: 'static-color' })
    public staticColor?: 'white' | 'black';

    /*
     * Defines the role of the list element
     */
    protected override listRole: 'listbox' | 'menu' = 'menu';

    /*
     * Defines the role of the item elements
     */
    protected override itemRole = 'menuitem';

    /*
     * Whether the label slot has content
     */
    private get hasLabel(): boolean {
        return this.slotHasContent;
    }

    @state()
    private get labelOnly(): boolean {
        return this.slotContentIsPresent;
    }

    /**
     * Handles slottable request events and re-dispatches them.
     */
    public override handleSlottableRequest = (
        event: SlottableRequestEvent
    ): void => {
        this.dispatchEvent(new SlottableRequestEvent(event.name, event.data));
    };

    /*
     * Retrieves the content to be rendered inside the button.
     */
    protected override get buttonContent(): TemplateResult[] {
        return [
            html`
                ${this.labelOnly
                    ? html``
                    : html`
                          <slot
                              name="icon"
                              slot="icon"
                              ?icon-only=${!this.hasLabel}
                              ?hidden=${this.labelOnly}
                          >
                              <sp-icon-more
                                  class="icon"
                                  size=${this.size}
                              ></sp-icon-more>
                          </slot>
                      `}
                <slot name="label" ?hidden=${!this.hasLabel}></slot>
                <slot name="label-only"></slot>
                <slot
                    name="tooltip"
                    @slotchange=${this.handleTooltipSlotchange}
                ></slot>
            `,
        ];
    }

    protected override render(): TemplateResult {
        if (this.tooltipEl) {
            this.tooltipEl.disabled = this.open;
        }

        return html`
            <sp-action-button
                aria-describedby=${DESCRIPTION_ID}
                ?quiet=${this.quiet}
                ?selected=${this.open}
                static-color=${ifDefined(this.staticColor)}
                aria-haspopup="true"
                aria-controls=${ifDefined(this.open ? 'menu' : undefined)}
                aria-expanded=${this.open ? 'true' : 'false'}
                aria-label=${ifDefined(this.label || undefined)}
                id="button"
                class="button"
                size=${this.size}
                @blur=${this.handleButtonBlur}
                @focus=${this.handleButtonFocus}
                @keydown=${{
                    handleEvent: this.handleEnterKeydown,
                    capture: true,
                }}
                ?disabled=${this.disabled}
            >
                ${this.buttonContent}
            </sp-action-button>
            ${this.renderMenu} ${this.renderDescriptionSlot}
        `;
    }

    protected override update(changedProperties: PropertyValues<this>): void {
        if (changedProperties.has('invalid')) {
            this.invalid = false;
        }

        super.update(changedProperties);
    }
}
