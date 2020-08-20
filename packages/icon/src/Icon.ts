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
    html,
    SpectrumElement,
    property,
    query,
    CSSResultArray,
    TemplateResult,
} from '@spectrum-web-components/base';

import { IconsetRegistry } from '@spectrum-web-components/iconset/src/iconset-registry.js';

import iconStyles from './icon.css.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';

export class Icon extends SpectrumElement {
    public static is = 'sp-icon';

    @property()
    public src?: string;

    @property()
    public name?: string;

    @property({ reflect: true })
    public size = 'm';

    @property()
    public label?: string;

    @query('#container')
    private iconContainer?: HTMLElement;

    private updateIconPromise?: Promise<void>;

    public static get styles(): CSSResultArray {
        return [iconStyles];
    }

    public connectedCallback(): void {
        super.connectedCallback();
        window.addEventListener('sp-iconset-added', this.iconsetListener);
    }

    public disconnectedCallback(): void {
        super.disconnectedCallback();
        window.removeEventListener('sp-iconset-added', this.iconsetListener);
    }

    public firstUpdated(): void {
        this.updateIconPromise = this.updateIcon();
    }

    public attributeChangedCallback(
        name: string,
        old: string,
        value: string
    ): void {
        super.attributeChangedCallback(name, old, value);
        this.updateIconPromise = this.updateIcon(); // any of our attributes change, update our icon
    }

    private iconsetListener = (event: CustomEvent): void => {
        if (!this.name) {
            return;
        }
        // parse the icon name to get iconset name
        const icon = this.parseIcon(this.name);
        if (event.detail.name === icon.iconset) {
            this.updateIconPromise = this.updateIcon();
        }
    };

    protected render(): TemplateResult {
        if (this.name) {
            return html`
                <div id="container"></div>
            `;
        } else if (this.src) {
            return html`
                <img src="${this.src}" alt=${ifDefined(this.label)} />
            `;
        }
        return html`
            <slot></slot>
        `;
    }

    private async updateIcon(): Promise<void> {
        if (!this.name) {
            return Promise.resolve();
        }
        // parse the icon name to get iconset name
        const icon = this.parseIcon(this.name);
        // try to retrieve the iconset
        const iconset = IconsetRegistry.getInstance().getIconset(icon.iconset);
        if (!iconset) {
            // we can stop here as there's nothing to be done till we get the iconset
            return Promise.resolve();
        }
        if (!this.iconContainer) {
            return Promise.resolve();
        }
        this.iconContainer.innerHTML = '';
        return iconset.applyIconToElement(
            this.iconContainer,
            icon.icon,
            this.size,
            this.label ? this.label : ''
        );
    }

    private parseIcon(icon: string): { iconset: string; icon: string } {
        const iconParts = icon.split(':');
        let iconsetName = 'default';
        let iconName = icon;
        if (iconParts.length > 1) {
            iconsetName = iconParts[0];
            iconName = iconParts[1];
        }
        return { iconset: iconsetName, icon: iconName };
    }

    protected async _getUpdateComplete(): Promise<void> {
        await super._getUpdateComplete();
        await this.updateIconPromise;
    }
}
