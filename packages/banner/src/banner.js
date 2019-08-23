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
import { html, LitElement, property } from 'lit-element';
import bannerStyles from './banner.css';
/**
 * Banner component
 *
 * @attr type - Determines the style, can be "info", "warning", or "error". Default is "info"
 * @attr corner - Determines if banner sets position at upper right corner or not.
 *
 * @slot header - Primary message of the banner.
 * @slot content - Secondary message of the banner. Used to provide a description.
 */
export class Banner extends LitElement {
    constructor() {
        super(...arguments);
        this.type = 'info';
        this.corner = false;
    }
    render() {
        return html`
            <div id="header"><slot name="header"></slot></div>
            <div id="content"><slot name="content"></slot></div>
        `;
    }
}
Banner.styles = [bannerStyles];
__decorate(
    [property({ reflect: true, type: String })],
    Banner.prototype,
    'type',
    void 0
);
__decorate(
    [property({ reflect: true, type: Boolean })],
    Banner.prototype,
    'corner',
    void 0
);
//# sourceMappingURL=banner.js.map
