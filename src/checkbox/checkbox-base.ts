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

import { property } from 'lit-element';
import Input from '../shared/input';

export default class CheckboxBase extends Input {
    @property({ type: Boolean, reflect: true })
    public checked: boolean = false;

    @property({ type: Boolean, reflect: true })
    public quiet: boolean = false;

    public handleChange(): void {
        if (this.focusElement) {
            this.checked = this.focusElement.checked;
        }
    }

    public firstUpdated(): void {
        super.firstUpdated();
        if (this.hasAttribute('checked')) {
            if (this.focusElement) {
                this.focusElement.checked = true;
            }
        }
    }
}
