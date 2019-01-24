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
import panZoomStyles from './pan-zoom.css.js';
export class CrispPanZoom extends LitElement {
    constructor() {
        super();
        this.cursorDevice = 'unknown';
        this.addEventListener('wheel', (ev) => this.onMouseWheel(ev));
    }
    onPan(ev) {
        const panDetail = {
            deltaX: ev.deltaX,
            deltaY: ev.deltaY,
        };
        const panEvent = new CustomEvent('pan', {
            bubbles: true,
            composed: true,
            detail: panDetail,
        });
        this.dispatchEvent(panEvent);
    }
    onZoom(ev) {
        const zoomDetail = {
            zoomDelta: ev.deltaY,
        };
        const zoomEvent = new CustomEvent('zoom', {
            bubbles: true,
            composed: true,
            detail: zoomDetail,
        });
        this.dispatchEvent(zoomEvent);
    }
    render() {
        return html`
            <style>
                ${panZoomStyles}
            </style>
            <slot></slot>
        `;
    }
    onMouseWheel(ev) {
        if (this.cursorDevice === 'unknown') {
            this.checkCursorDevice(ev);
        }
        ev.preventDefault();
        ev.stopPropagation();
        if (this.cursorDevice === 'trackpad') {
            if (!ev.ctrlKey) {
                this.onPan(ev);
            } else {
                this.onZoom(ev);
            }
        } else if (this.cursorDevice === 'mouse') {
            // TODO: Implement mouse handler
        }
        const wheelEvent = new CustomEvent('mouseWheel', {
            bubbles: true,
            composed: true,
            detail: ev,
        });
        this.dispatchEvent(wheelEvent);
    }
    checkCursorDevice(ev) {
        // macbook trackpad gives whole numbers when two-finger panning
        // if we're not detecting a pinch (ctrl key)
        // and receiving floats, detect as mouse
        const usingMouse = !ev.ctrlKey && ev.deltaY % 1 !== 0;
        this.cursorDevice = usingMouse ? 'mouse' : 'trackpad';
    }
}
__decorate(
    [property({ type: String })],
    CrispPanZoom.prototype,
    'cursorDevice',
    void 0
);
if (!customElements.get('pan-zoom')) {
    customElements.define('pan-zoom', CrispPanZoom);
}

//# sourceMappingURL=pan-zoom.js.map
