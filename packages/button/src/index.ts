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
export * from './button.js';
export * from './action-button.js';
export * from './clear-button.js';

import { Button } from './button.js';
import { ActionButton } from './action-button.js';
import { ClearButton } from './clear-button.js';

/* istanbul ignore else */
if (!customElements.get('sp-action-button')) {
    customElements.define('sp-action-button', ActionButton);
}

/* istanbul ignore else */
if (!customElements.get('sp-clear-button')) {
    customElements.define('sp-clear-button', ClearButton);
}

/* istanbul ignore else */
if (!customElements.get('sp-button')) {
    customElements.define('sp-button', Button);
}

declare global {
    interface HTMLElementTagNameMap {
        'sp-button': Button;
        'sp-action-button': ActionButton;
        'sp-clear-button': ClearButton;
    }
}
