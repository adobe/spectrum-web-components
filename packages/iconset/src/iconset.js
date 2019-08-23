var __decorate =
    (this && this.__decorate) ||
    function(decorators, target, key, desc) {
        var c = arguments.length,
            r =
                c < 3
                    ? target
                    : desc === null
                    ? (desc = Object.getOwnPropertyDescriptor(target, key))
                    : desc,
            d;
        if (
            typeof Reflect === 'object' &&
            typeof Reflect.decorate === 'function'
        )
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if ((d = decorators[i]))
                    r =
                        (c < 3
                            ? d(r)
                            : c > 3
                            ? d(target, key, r)
                            : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
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
import { IconsetRegistry } from './iconset-registry';
import { LitElement, property } from 'lit-element';
export class Iconset extends LitElement {
    constructor() {
        super(...arguments);
        this.registered = false;
        this.handleRemoved = ({ detail }) => {
            if (detail.name === this.name) {
                this.registered = false;
                this.addIconset();
            }
        };
    }
    firstUpdated() {
        // force no display for all iconsets
        this.style.display = 'none';
    }
    /**
     * Name of the iconset, used by the IconsetRegistry to serve this icon set
     * to consuming icons.
     */
    set name(value) {
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
    get name() {
        return this._name;
    }
    /**
     * Returns a list of all icons in this iconset.
     */
    getIconList() {
        throw new Error('Not implemented!');
    }
    /**
     * On updated we register the iconset if we're not already registered
     */
    connectedCallback() {
        super.connectedCallback();
        this.addIconset();
        window.addEventListener('sp-iconset:removed', this.handleRemoved);
    }
    /**
     * On disconnected we remove the iconset
     */
    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener('sp-iconset:removed', this.handleRemoved);
        this.removeIconset();
    }
    addIconset() {
        if (!this.name || this.registered) {
            return;
        }
        IconsetRegistry.getInstance().addIconset(this.name, this);
        this.registered = true;
    }
    removeIconset() {
        if (!this.name) {
            return;
        }
        IconsetRegistry.getInstance().removeIconset(this.name);
        this.registered = false;
    }
}
__decorate([property()], Iconset.prototype, 'name', null);
//# sourceMappingURL=iconset.js.map
