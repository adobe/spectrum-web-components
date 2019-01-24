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
import { html } from '@polymer/lit-element';
// @ts-ignore - css generated at build time
import secondaryButtonStyles from './button-secondary.css.js';
import { SpectrumButton } from './button';
export class SpectrumSecondaryButton extends SpectrumButton {
    render() {
        const renderedHTML = super.render();
        return html`
            ${renderedHTML}
            <style>
                ${secondaryButtonStyles}
            </style>
        `;
    }
}
if (!customElements.get('spectrum-button-secondary')) {
    customElements.define('spectrum-button-secondary', SpectrumSecondaryButton);
}

//# sourceMappingURL=button-secondary.js.map
