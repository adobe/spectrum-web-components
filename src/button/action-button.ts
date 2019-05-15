/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { CSSResultArray, property } from 'lit-element';
import ButtonBase from './button-base';
import buttonStyles from './action-button.css';

export class ActionButton extends ButtonBase {
    public static is = 'sp-action-button';

    @property({ type: Boolean, reflect: true })
    protected quiet: boolean = false;

    @property({ type: Boolean, reflect: true })
    protected selected: boolean = false;

    @property({ type: Boolean, reflect: true, attribute: 'hold-affordance' })
    protected holdAffordance: boolean = false;

    public static get styles(): CSSResultArray {
        return [buttonStyles];
    }
}
