/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { CSSResultArray, property } from 'lit-element';
import { ButtonBase } from './button-base';
import buttonStyles from './button.css';

/**
 * A Spectrum button control.
 * @element sp-button
 */
export class Button extends ButtonBase {
    /**
     * The visual variant to apply to this button.
     */
    @property({ reflect: true })
    public variant:
        | 'cta'
        | 'overBackground'
        | 'primary'
        | 'secondary'
        | 'negative' = 'cta';

    /**
     * There is a warning in place for this control
     */
    @property({ type: Boolean, reflect: true })
    public warning: boolean = false;

    /**
     * Style this button to be less obvious
     */
    @property({ type: Boolean, reflect: true })
    public quiet: boolean = false;

    public static get styles(): CSSResultArray {
        return [buttonStyles];
    }
}
