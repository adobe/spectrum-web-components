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
import { PropertyValues } from 'lit';

import { SizedMixin, SpectrumElement } from '@swc/core/shared/base';

import { ObserveSlotText } from '@swc/core/shared/observe-slot-text';
import { ObserveSlotPresence } from '@swc/core/shared/observe-slot-presence';

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
 * @element sp-badge-base
 * @slot - The text label to display in the badge.
 * @slot icon - The icon to display in the badge.
 */
export abstract class BadgeBase extends SizedMixin(
    ObserveSlotText(ObserveSlotPresence(SpectrumElement, '[slot="icon"]'), ''),
    {
        noDefaultSize: true,
    }
) {
    @property({ type: String, reflect: true })
    public variant: BadgeVariant = 'informative';

    @property({ reflect: true })
    public get fixed(): FixedValues | undefined {
        return this._fixed;
    }

    public set fixed(fixed: FixedValues | undefined) {
        if (fixed === this.fixed) {
            return;
        }
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

    protected get hasIcon(): boolean {
        return this.slotContentIsPresent;
    }

    protected override update(changedProperties: PropertyValues): void {
        super.update(changedProperties);
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
    }
}
