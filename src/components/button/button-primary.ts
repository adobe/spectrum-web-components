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

// @ts-ignore - css generated at build time
import primaryButtonStyles from './button-primary.css.js';

import { SpectrumButton } from './button';

export class SpectrumPrimaryButton extends SpectrumButton {
    /**
     * Getter for variant attribute
     */
    public get variant(): string | null {
        return this.getAttribute('variant');
    }

    /**
     * Setter for variant attribute
     */
    public set variant(value: string | null) {
        if (value) {
            this.setAttribute('variant', value);
        } else {
            this.removeAttribute('variant');
        }
    }

    protected render() {
        const renderedHTML = super.render();
        return /* html */ `
            ${renderedHTML}
            <style>
                ${primaryButtonStyles}
            </style>
        `;
    }
}

if (!customElements.get('spectrum-button-primary')) {
    customElements.define('spectrum-button-primary', SpectrumPrimaryButton);
}
