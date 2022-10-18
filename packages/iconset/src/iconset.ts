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
import { IconsetRegistry } from './iconset-registry.js';

import { LitElement } from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';

export abstract class Iconset extends LitElement {
    protected registered = false;

    private _name!: string;

    protected override firstUpdated(): void {
        // force no display for all iconsets
        this.style.display = 'none';
        if (window.__swc.DEBUG) {
            window.__swc.warn(
                this,
                'Iconsets have been deprecated and will be removed from the project in an upcoming version. For default Spectrum Icons, learn more about leveraging UI Icons (https://opensource.adobe.com/spectrum-web-components/components/icons-ui/) or Workflow Icons (https://opensource.adobe.com/spectrum-web-components/components/icons-workflow/) as an alternative.',
                'https://opensource.adobe.com/spectrum-web-components/components/iconset/#deprecated',
                { level: 'deprecation' }
            );
        }
    }

    /**
     * Name of the iconset, used by the IconsetRegistry to serve this icon set
     * to consuming icons.
     */
    @property()
    public override set name(value: string) {
        // if we're already registered in the iconset registry
        // we'll need to update our registration
        if (this.registered) {
            if (this._name) {
                // remove from the iconset map using the old name
                IconsetRegistry.getInstance().removeIconset(this._name);
            }

            if (value) {
                // set in the map using the new name
                IconsetRegistry.getInstance().addIconset(value, this);
            }
        }
        this._name = value;
    }
    public override get name(): string {
        return this._name;
    }

    /**
     * Applies an icon to the given element
     */
    public abstract applyIconToElement(
        el: HTMLElement,
        icon: string,
        size: string,
        label: string
    ): void;

    /**
     * Returns a list of all icons in this iconset.
     */
    public abstract getIconList(): string[];

    private handleRemoved = ({
        detail,
    }: {
        detail: { name: string };
    }): void => {
        if (detail.name === this.name) {
            this.registered = false;
            this.addIconset();
        }
    };

    /**
     * On updated we register the iconset if we're not already registered
     */
    public override connectedCallback(): void {
        super.connectedCallback();
        this.addIconset();
        window.addEventListener('sp-iconset-removed', this.handleRemoved);
    }
    /**
     * On disconnected we remove the iconset
     */
    public override disconnectedCallback(): void {
        super.disconnectedCallback();
        window.removeEventListener('sp-iconset-removed', this.handleRemoved);
        this.removeIconset();
    }

    private addIconset(): void {
        if (!this.name || this.registered) {
            return;
        }
        IconsetRegistry.getInstance().addIconset(this.name, this);
        this.registered = true;
    }

    private removeIconset(): void {
        if (!this.name) {
            return;
        }
        IconsetRegistry.getInstance().removeIconset(this.name);
        this.registered = false;
    }
}
