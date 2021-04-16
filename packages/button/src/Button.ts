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
    property,
    SizedMixin,
} from '@spectrum-web-components/base';
import { StyledButton } from './StyledButton.js';
import buttonStyles from './button.css.js';

export type ButtonVariants =
    | 'cta'
    | 'overBackground'
    | 'primary'
    | 'secondary'
    | 'negative';

/**
 * A Spectrum button control.
 * @element sp-button
 */
export class Button extends SizedMixin(StyledButton) {
    public static get styles(): CSSResultArray {
        return [...super.styles, buttonStyles];
    }

    /**
     * The visual variant to apply to this button.
     */
    @property({ reflect: true })
    public variant: ButtonVariants = 'cta';

    /**
     * There is a warning in place for this control
     */
    @property({ type: Boolean, reflect: true })
    public warning = false;

    /**
     * Style this button to be less obvious
     */
    @property({ type: Boolean, reflect: true })
    public quiet = false;
}
