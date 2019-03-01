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

import { html, LitElement, property, query } from 'lit-element';

import { IconsetRegistry } from '../iconset/iconset-registry';

import styles from './icon.css';

export class Icon extends LitElement {
    public static is = 'sp-icon';

    @property()
    public src?: string;

    @property()
    public name?: string;

    @property()
    public size: string = 'm';

    @query('#container')
    private iconContainer?: HTMLElement;

    private iconsetListener?: EventListener;

    public static get styles() {
        return [styles];
    }

    public connectedCallback() {
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
                this.updateIcon();
            }
        }) as EventListener;
        window.addEventListener('sp-iconset-added', this.iconsetListener);
    }
    public disconnectedCallback() {
        super.disconnectedCallback();
        if (this.iconsetListener) {
            window.removeEventListener(
                'sp-iconset-added',
                this.iconsetListener
            );
        }
    }

    public firstUpdated() {
        this.updateIcon();
    }

    public attributeChangedCallback(name: string, old: string, value: string) {
        super.attributeChangedCallback(name, old, value);
        this.updateIcon(); // any of our attributes change, update our icon
    }

    protected render() {
        return html`
            <div id="container">${this.renderIcon()}</div>
        `;
    }

    private updateIcon() {
        if (!this.name) {
            return;
        }
        // parse the icon name to get iconset name
        const icon = this.parseIcon(this.name);
        if (!icon) {
            return;
        }
        // try to retrieve the iconset
        const iconset = IconsetRegistry.getInstance().getIconset(icon.iconset);
        if (!iconset) {
            // we can stop here as there's nothing to be done till we get the iconset
            return;
        }
        if (!this.iconContainer) {
            return;
        }
        this.iconContainer.innerHTML = '';
        iconset.applyIconToElement(
            this.iconContainer,
            icon.icon,
            this.size ? this.size : ''
        );
    }

    private parseIcon(icon: string) {
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

    private renderIcon() {
        // handle src image case
        if (this.src) {
            return html`
                <img src="${this.src}" />
            `;
        }
        return html``;
    }
}
