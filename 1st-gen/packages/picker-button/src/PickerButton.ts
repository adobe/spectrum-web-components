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
    DefaultElementSize,
    html,
    SizedMixin,
    TemplateResult,
} from '@spectrum-web-components/base';
import { classMap } from '@spectrum-web-components/base/src/directives.js';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import { ButtonBase } from '@spectrum-web-components/button/src/ButtonBase.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-chevron100.js';
import { ObserveSlotPresence } from '@spectrum-web-components/shared/src/observe-slot-presence.js';

import styles from './picker-button.css.js';
import chevronStyles from '@spectrum-web-components/icon/src/spectrum-icon-chevron.css.js';

const chevronClass = {
    s: 'spectrum-UIIcon-ChevronDown75',
    m: 'spectrum-UIIcon-ChevronDown100',
    l: 'spectrum-UIIcon-ChevronDown200',
    xl: 'spectrum-UIIcon-ChevronDown300',
};

/**
 * @element sp-picker-button
 */
export class PickerButton extends SizedMixin(
    ObserveSlotPresence(ButtonBase, '[slot="label"]')
) {
    public static override get styles(): CSSResultArray {
        return [styles, chevronStyles];
    }

    @property({ type: Boolean, reflect: true })
    invalid = false;

    @property({ reflect: true })
    position: 'left' | 'right' = 'right';

    protected get hasText(): boolean {
        return this.slotContentIsPresent;
    }

    protected override render(): TemplateResult {
        const rootClasses = {
            root: true,
            uiicononly: !this.hasText,
            textuiicon: this.hasText,
        };
        return html`
            <div class=${classMap(rootClasses)}>
                <div class="spectrum-PickerButton-fill">
                    <span
                        class="spectrum-PickerButton-label is-placeholder"
                        ?hidden=${!this.hasText}
                    >
                        <slot name="label"></slot>
                    </span>
                    <slot name="icon">
                        <sp-icon-chevron100
                            class="spectrum-PickerButton-icon spectrum-Icon ${chevronClass[
                                this.size as DefaultElementSize
                            ]}"
                        ></sp-icon-chevron100>
                    </slot>
                </div>
            </div>
        `;
    }
}
