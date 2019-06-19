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

import {
    LitElement,
    CSSResultArray,
    html,
    TemplateResult,
    property,
} from 'lit-element';
import commonStyles from './theme.css';

export class Theme extends LitElement {
    /**
     * The color theme to apply to Spectrum controls
     */
    @property({ reflect: true })
    public color: 'light' | 'dark' = 'light';

    /**
     * The scale to apply to Spectrum controls. Currently only medium is supported
     */
    @property({ reflect: true })
    public scale: 'medium' = 'medium';

    public static get styles(): CSSResultArray {
        return [commonStyles];
    }

    private renderTheme(children: TemplateResult): TemplateResult {
        let result;
        if (this.color === 'light') {
            result = html`
                <sp-theme-light id="theme">${children}</sp-theme-light>
            `;
        } else if (this.color === 'dark') {
            result = html`
                <sp-theme-dark id="theme">${children}</sp-theme-dark>
            `;
        } else {
            console.warn(`Unknown color ${this.color} for sp-theme`);
            return children;
        }
        if (!customElements.get(`sp-theme-${this.color}`)) {
            console.warn(
                `Theme component sp-theme-${this.color} has not been registered`
            );
        }
        return result;
    }

    private renderScale(children: TemplateResult): TemplateResult {
        let result;
        if (this.scale === 'medium') {
            result = html`
                <sp-scale-medium id="scale">${children}</sp-scale-medium>
            `;
        } else {
            console.warn(`Unknown scale ${this.scale} for sp-theme`);
            return children;
        }
        if (!customElements.get(`sp-theme-${this.color}`)) {
            console.warn(
                `Theme component sp-scale-${this.scale} has not been registered`
            );
        }
        return result;
    }

    protected render(): TemplateResult {
        return this.renderTheme(
            this.renderScale(
                html`
                    <slot></slot>
                `
            )
        );
    }
}
