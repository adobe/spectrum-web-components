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
    PropertyValues,
    SizedMixin,
} from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import { StyledButton } from './StyledButton.js';
import buttonStyles from './button.css.js';

export type DeprecatedButtonVariants = 'cta' | 'overBackground';
export type ButtonStatics = 'white' | 'black';
export type ButtonVariants =
    | 'accent'
    | 'primary'
    | 'secondary'
    | 'negative'
    | ButtonStatics
    | DeprecatedButtonVariants;
export const VALID_VARIANTS = [
    'accent',
    'primary',
    'secondary',
    'negative',
    'white',
    'black',
];

export type ButtonTreatments = 'fill' | 'outline';

/**
 * @element sp-button
 *
 * @slot - text label of the Button
 * @slot icon - The icon to use for Button
 */
export class Button extends SizedMixin(StyledButton) {
    public static override get styles(): CSSResultArray {
        return [...super.styles, buttonStyles];
    }

    /**
     * The visual variant to apply to this button.
     */
    @property()
    public get variant(): ButtonVariants {
        return this._variant;
    }
    public set variant(variant: ButtonVariants) {
        if (variant === this.variant) return;

        this.requestUpdate('variant', this.variant);
        switch (variant) {
            case 'cta':
                this._variant = 'accent';
                break;
            case 'overBackground':
                this._variant = 'white';
                this.treatment = 'outline';
                break;
            default:
                if (!VALID_VARIANTS.includes(variant)) {
                    this._variant = 'accent';
                } else {
                    this._variant = variant;
                }
                break;
        }
        this.setAttribute('variant', this.variant);
    }
    private _variant: ButtonVariants = 'accent';

    /**
     * The visual variant to apply to this button.
     */
    @property({ reflect: true })
    public treatment: ButtonTreatments = 'fill';

    /**
     * Style this button to be less obvious
     */
    @property({ type: Boolean })
    public set quiet(quiet: boolean) {
        this.treatment = quiet ? 'outline' : 'fill';
    }

    protected override firstUpdated(changes: PropertyValues<this>): void {
        super.firstUpdated(changes);
        if (!this.hasAttribute('variant')) {
            this.setAttribute('variant', this.variant);
        }
    }
}
