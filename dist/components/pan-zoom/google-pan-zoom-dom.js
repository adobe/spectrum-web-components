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
import { html, LitElement, property } from '@polymer/lit-element';
// @ts-ignore - css generated at build time
import googlePanZoomDomStyles from './google-pan-zoom-dom.css.js';
export class GooglePanZoomDom extends LitElement {
    constructor() {
        super(...arguments);
        this.translateX = 0;
        this.translateY = 0;
        this.scale = 1;
    }
    onPan(ev) {
        this.translateX = ev.detail.x;
        this.translateY = ev.detail.y;
        const panEvent = new CustomEvent('pan', {
            bubbles: true,
            composed: true,
            detail: ev.detail,
        });
        this.dispatchEvent(panEvent);
    }
    onZoom(ev) {
        this.translateX = ev.detail.x;
        this.translateY = ev.detail.y;
        this.scale = ev.detail.scale;
        const zoomEvent = new CustomEvent('zoom', {
            bubbles: true,
            composed: true,
            detail: ev.detail,
        });
        this.dispatchEvent(zoomEvent);
    }
    /* content: Container for slotted content. CSS transform is applied here */
    render() {
        return html`
            <style>
                ${googlePanZoomDomStyles}
            </style>
            <google-pan-zoom @pan="${this.onPan}" @zoom="${this.onZoom}">
                <div id="content" style="${this.contentStyle}">
                    <slot></slot>
                </div>
            </google-pan-zoom>
        `;
    }
    get contentStyle() {
        return `transform: ${this.transform}`;
    }
    get transform() {
        const translate = `
            translate(${this.translateX}px, ${this.translateY}px)
        `;
        const scale = `scale(${this.scale})`;
        return translate.concat(scale);
    }
}
__decorate(
    [property({ type: Number })],
    GooglePanZoomDom.prototype,
    'translateX',
    void 0
);
__decorate(
    [property({ type: Number })],
    GooglePanZoomDom.prototype,
    'translateY',
    void 0
);
__decorate(
    [property({ type: Number })],
    GooglePanZoomDom.prototype,
    'scale',
    void 0
);
if (!customElements.get('google-pan-zoom-dom')) {
    customElements.define('google-pan-zoom-dom', GooglePanZoomDom);
}

//# sourceMappingURL=google-pan-zoom-dom.js.map
