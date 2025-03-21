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
    nothing,
    SizedMixin,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';

import { ObserveSlotText } from '@spectrum-web-components/shared/src/observe-slot-text.js';
import { ObserveSlotPresence } from '@spectrum-web-components/shared/src/observe-slot-presence.js';
import styles from './badge.css' with { type: 'css' };

export const BADGE_VARIANTS = [
    'accent',
    'neutral',
    'informative',
    'positive',
    'negative',
    'notice',
    'fuchsia',
    'indigo',
    'magenta',
    'purple',
    'seafoam',
    'yellow',
    'gray',
    'red',
    'orange',
    'chartreuse',
    'celery',
    'green',
    'cyan',
    'blue',
] as const;
export type BadgeVariant = (typeof BADGE_VARIANTS)[number];
export const FIXED_VALUES = [
    'inline-start',
    'inline-end',
    'block-start',
    'block-end',
] as const;
export type FixedValues = (typeof FIXED_VALUES)[number];

/**
 * @element sp-badge
 *
 * @slot - Text label of the badge
 * @slot icon - Optional icon that appears to the left of the label
 */
export class Badge extends SizedMixin(
    ObserveSlotText(ObserveSlotPresence(SpectrumElement, '[slot="icon"]'), ''),
    {
        noDefaultSize: true,
    }
) {
    public static override get styles(): CSSResultArray {
        return [styles];
    }

    @property({ reflect: true })
    public get fixed(): FixedValues | undefined {
        return this._fixed;
    }

    public set fixed(fixed: FixedValues | undefined) {
        if (fixed === this.fixed) return;
        const oldValue = this.fixed;
        this._fixed = fixed;
        if (fixed) {
            this.setAttribute('fixed', fixed);
        } else {
            this.removeAttribute('fixed');
        }
        this.requestUpdate('fixed', oldValue);
    }

    private _fixed?: FixedValues;

    @property({ type: String, reflect: true })
    public variant: BadgeVariant = 'informative';

    protected get hasIcon(): boolean {
        return this.slotContentIsPresent;
    }

    protected override render(): TemplateResult {
        if (window.__swc.DEBUG) {
            if (!BADGE_VARIANTS.includes(this.variant)) {
                window.__swc.warn(
                    this,
                    `<${this.localName}> element expect the "variant" attribute to be one of the following:`,
                    'https://opensource.adobe.com/spectrum-web-components/components/badge/#variants',
                    {
                        issues: [...BADGE_VARIANTS],
                    }
                );
            }
        }
        return html`
            ${this.hasIcon
                ? html`
                      <slot
                          name="icon"
                          ?icon-only=${!this.slotHasContent}
                      ></slot>
                  `
                : nothing}
            <div class="label">
                <slot></slot>
            </div>
        `;
    }
}
