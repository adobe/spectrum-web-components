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
 *
 * @slot - menu items to be listed in the Action Menu
 * @slot icon - The icon to use for the Action Menu
 * @slot label - The label to use for the Action Menu
 * @slot label-only - The label to use for the Action Menu (no icon space reserved)
 * @slot tooltip - Tooltip to be applied to the Action Button
 * @attr selects - By default `sp-action-menu` does not manage a selection. If
 *   you'd like for a selection to be held by the `sp-menu` that it presents in
 *   its overlay, use `selects="single" to activate this functionality.
 */
export class ActionMenu extends ObserveSlotPresence(
    ObserveSlotText(PickerBase, 'label'),
    '[slot="label-only"]'
) {
    public static override get styles(): CSSResultArray {
        return [actionMenuStyles];
    }

    @property({ type: String })
    public override selects: undefined | 'single' = undefined;

    @property({ reflect: true, attribute: 'static-color' })
    public staticColor?: 'white' | 'black';

    protected override listRole: 'listbox' | 'menu' = 'menu';
    protected override itemRole = 'menuitem';
    private get hasLabel(): boolean {
        return this.slotHasContent;
    }

    @state()
    private get labelOnly(): boolean {
        return this.slotContentIsPresent;
    }

    public override handleSlottableRequest = (
        event: SlottableRequestEvent
    ): void => {
        this.dispatchEvent(new SlottableRequestEvent(event.name, event.data));
    };

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
            <slot
                name="tooltip"
                @slotchange=${this.handleTooltipSlotchange}
            ></slot>
            ${this.renderMenu} ${this.renderDescriptionSlot}
        `;
    }

    protected override update(changedProperties: PropertyValues<this>): void {
        if (changedProperties.has('invalid')) {
            this.invalid = false;
        }
        super.update(changedProperties);
    }

    protected override hasAccessibleLabel(): boolean {
        return (
            !!this.label ||
            !!this.getAttribute('aria-label') ||
            !!this.getAttribute('aria-labelledby') ||
            !!this.appliedLabel ||
            this.hasLabel ||
            this.labelOnly
        );
    }

    protected override warnNoLabel(): void {
        window.__swc.warn(
            this,
            `<${this.localName}> needs one of the following to be accessible:`,
            'https://opensource.adobe.com/spectrum-web-components/components/action-menu/#accessibility',
            {
                type: 'accessibility',
                issues: [
                    `an <sp-field-label> element with a \`for\` attribute referencing the \`id\` of the \`<${this.localName}>\`, or`,
                    'value supplied to the "label" attribute, which will be displayed visually as placeholder text',
                    'text content supplied in a <span> with slot="label", or, text content supplied in a <span> with slot="label-only"',
                    'which will also be displayed visually as placeholder text.',
                ],
            }
        );
    }
}
