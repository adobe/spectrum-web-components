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
import panZoomDomStyles from './pan-zoom-dom.css.js';
export class CrispPanZoomDom extends LitElement {
    constructor() {
        super(...arguments);
        this.translateX = 0;
        this.translateY = 0;
        this.scale = 1;
    }
    onPan(ev) {
        const scaleFactor = 1 / this.scale;
        this.translateX -= ev.detail.deltaX * scaleFactor;
        this.translateY -= ev.detail.deltaY * scaleFactor;
        const panEvent = new CustomEvent('pan', {
            bubbles: true,
            composed: true,
            detail: ev.detail,
        });
        this.dispatchEvent(panEvent);
    }
    onZoom(ev) {
        this.scale *= 1 - Math.sign(ev.detail.zoomDelta) * 0.06;
        const zoomEvent = new CustomEvent('zoom', {
            bubbles: true,
            composed: true,
            detail: ev.detail,
        });
        this.dispatchEvent(zoomEvent);
    }
    setTransformation(transform) {
        if (transform.translateX) {
            this.translateX = transform.translateX;
        }
        if (transform.translateY) {
            this.translateY = transform.translateY;
        }
        if (transform.scale) {
            this.scale = transform.scale;
        }
    }
    pan(x, y) {
        const scaleFactor = 1 / this.scale;
        this.translateX -= x * scaleFactor;
        this.translateY -= y * scaleFactor;
    }
    zoom(delta) {
        this.scale *= 1 - Math.sign(delta) * 0.06;
    }
    /* content: Container for slotted content. CSS transform is applied here */
    render() {
        return html`
            <style>
                ${panZoomDomStyles}
            </style>
            <pan-zoom @pan="${this.onPan}" @zoom="${this.onZoom}">
                <div id="content" style="${this.contentStyle}">
                    <slot></slot>
                </div>
            </pan-zoom>
        `;
    }
    get contentStyle() {
        return `transform: ${this.transform}; transform-origin:${
            this.transformOrigin
        }`;
    }
    get transform() {
        const translate = `
            translate(${this.translateX}px, ${this.translateY}px)
        `;
        const scale = `scale(${this.scale})`;
        return translate.concat(scale);
    }
    get transformOrigin() {
        const xOffset = `calc(50% - ${this.translateX}px) `;
        const yOffset = `calc(50% - ${this.translateY}px)`;
        return xOffset.concat(yOffset);
    }
}
__decorate(
    [property({ type: Number })],
    CrispPanZoomDom.prototype,
    'translateX',
    void 0
);
__decorate(
    [property({ type: Number })],
    CrispPanZoomDom.prototype,
    'translateY',
    void 0
);
__decorate(
    [property({ type: Number })],
    CrispPanZoomDom.prototype,
    'scale',
    void 0
);
if (!customElements.get('pan-zoom-dom')) {
    customElements.define('pan-zoom-dom', CrispPanZoomDom);
}

//# sourceMappingURL=pan-zoom-dom.js.map
