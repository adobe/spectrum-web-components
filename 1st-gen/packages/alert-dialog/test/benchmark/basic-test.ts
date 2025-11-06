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
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/alert-dialog/sp-alert-dialog.js';
import { html } from '@spectrum-web-components/base';
import { measureFixtureCreation } from '../../../../test/benchmark/helpers.js';

measureFixtureCreation(html`
    <sp-alert-dialog variant="confirmation">
        <h2 slot="heading">Disclaimer</h2>
        Smart filters are nondestructive and will preserve your original images.
        <sp-button
            slot="button"
            id="cancelButton"
            variant="secondary"
            treatment="outline"
            onclick="this.dispatchEvent(new Event('close', { bubbles: true, composed: true }));"
        >
            Cancel
        </sp-button>
        <sp-button
            slot="button"
            id="confirmButton"
            variant="accent"
            treatment="fill"
            onclick="this.dispatchEvent(new Event('close', { bubbles: true, composed: true }));"
        >
            Enable
        </sp-button>
    </sp-alert-dialog>
`);
