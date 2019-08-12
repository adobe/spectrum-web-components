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
    html,
    LitElement,
    property,
    query,
    CSSResultArray,
    TemplateResult,
} from 'lit-element';

import { IconsetRegistry } from '../iconset/iconset-registry';

import iconStyles from './icon.css';
import { nothing } from 'lit-html';

export class Icon extends LitElement {
    public static is = 'sp-icon';

    @property()
    public src?: string;

    @property()
    public name?: string;

    @property({ reflect: true })
    public size: string = 'm';

    @property()
    public label?: string;

    @query('#container')
    private iconContainer?: HTMLElement;

    private iconsetListener?: EventListener;

    private updateIconPromise?: Promise<any>;

    public static get styles(): CSSResultArray {
        return [iconStyles];
    }

    public connectedCallback(): void {
        super.connectedCallback();

        // start listening for iconset-added and do updateIcon if we get one later
        this.iconsetListener = ((ev: CustomEvent) => {
            if (!this.name) {
                return;
            }
            // parse the icon name to get iconset name
            const icon = this.parseIcon(this.name);
            if (!icon) {
                return;
            }
            if (ev.detail.name === icon.iconset) {
                this.updateIconPromise = this.updateIcon();
            }
        }) as EventListener;
        window.addEventListener('sp-iconset:added', this.iconsetListener);
    }
    public disconnectedCallback(): void {
        super.disconnectedCallback();
        if (this.iconsetListener) {
            window.removeEventListener(
                'sp-iconset:added',
                this.iconsetListener
            );
        }
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

    protected render(): TemplateResult {
        return html`
            <div id="container">${this.renderIcon()}</div>
        `;
    }

    private async updateIcon(): Promise<any> {
        if (!this.name) {
            return Promise.resolve();
        }
        // parse the icon name to get iconset name
        const icon = this.parseIcon(this.name);
        if (!icon) {
            return Promise.resolve();
        }
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
            this.size ? this.size : '',
            this.label ? this.label : ''
        );
    }

    private parseIcon(icon: string): { iconset: string; icon: string } | null {
        if (!icon) {
            return null;
        }
        const iconParts = icon.split(':');
        let iconsetName = 'default';
        let iconName = icon;
        if (iconParts.length > 1) {
            iconsetName = iconParts[0];
            iconName = iconParts[1];
        }
        return { iconset: iconsetName, icon: iconName };
    }

    private renderIcon(): TemplateResult {
        // handle src image case
        return html`
            ${this.src
                ? html`
                      <img src="${this.src}" />
                  `
                : nothing}
        `;
    }

    protected async _getUpdateComplete() {
        await super._getUpdateComplete();
        await this.updateIconPromise;
    }
}
