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
import { ButtonBase } from './button-base.js';
import buttonStyles from './action-button.css.js';

export class ActionButton extends ButtonBase {
    @property({ type: Boolean, reflect: true })
    public quiet = false;

    @property({ type: Boolean, reflect: true })
    public selected = false;

    @property({ type: Boolean, reflect: true, attribute: 'hold-affordance' })
    public holdAffordance = false;

    public static get styles(): CSSResultArray {
        return [...super.styles, buttonStyles];
    }
}
