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
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { html, LitElement, property } from '@polymer/lit-element';
import PointerTracker from 'pointer-tracker';
// @ts-ignore - css generated at build time
import panZoomDomStyles from './pan-zoom-dom.css.js';
const minScaleAttr = 'min-scale';
function getDistance(a, b) {
    if (!b) {
        return 0;
    }
    return Math.sqrt(
        (b.clientX - a.clientX) ** 2 + (b.clientY - a.clientY) ** 2
    );
}
function getMidpoint(a, b) {
    if (!b) {
        return a;
    }
    return {
        clientX: (a.clientX + b.clientX) / 2,
        clientY: (a.clientY + b.clientY) / 2,
    };
}
function getAbsoluteValue(value, max) {
    if (typeof value === 'number') {
        return value;
    }
    if (value.trimRight().endsWith('%')) {
        return (max * parseFloat(value)) / 100;
    }
    return parseFloat(value);
}
// I'd rather use DOMMatrix/DOMPoint here, but the browser support isn't good enough.
// Given that, better to use something everything supports.
let cachedSvg;
function getSVG() {
    return (
        cachedSvg ||
        (cachedSvg = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'svg'
        ))
    );
}
function createMatrix() {
    return getSVG().createSVGMatrix();
}
function createPoint() {
    return getSVG().createSVGPoint();
}
const MIN_SCALE = 0.01;
export class CrispPanZoomDomGoogle extends LitElement {
    // @property({ type: SVGMatrix })
    // private transform = createMatrix();
    //
    // @property({ type: HTMLElement })
    // private positioningEl; // = document.createElement('div');
    /* content: Container for slotted content. CSS transform is applied here */
    constructor() {
        super();
        this.translateX = 0;
        this.translateY = 0;
        this.scaleOld = 1;
        this.transform = createMatrix();
        this.stageElChange();
        new MutationObserver(() => this.stageElChange()).observe(this, {
            childList: true,
        });
        const pointerTracker = new PointerTracker(this, {
            move: (previousPointers) => {
                this.onPointerMove(
                    previousPointers,
                    pointerTracker.currentPointers
                );
            },
            start: (pointer, event) => {
                // We only want to track 2 pointers at most
                if (
                    pointerTracker.currentPointers.length === 2 ||
                    !this.positioningEl
                ) {
                    return false;
                }
                event.preventDefault();
                return true;
            },
        });
        this.addEventListener('wheel', (event) => this.onWheel(event));
    }
    /**
     * Change the scale, adjusting x/y by a given transform origin.
     */
    scaleTo(scale, opts = {}) {
        let { originX = 0, originY = 0 } = opts;
        const { relativeTo = 'content', allowChangeEvent = false } = opts;
        const relativeToEl =
            relativeTo === 'content' ? this.positioningEl : this;
        // No content element? Fall back to just setting scale
        if (!relativeToEl || !this.positioningEl) {
            this.setTransform({ scale, allowChangeEvent });
            return;
        }
        const rect = relativeToEl.getBoundingClientRect();
        originX = getAbsoluteValue(originX, rect.width);
        originY = getAbsoluteValue(originY, rect.height);
        if (relativeTo === 'content') {
            originX += this.x;
            originY += this.y;
        } else {
            const currentRect = this.positioningEl.getBoundingClientRect();
            originX -= currentRect.left;
            originY -= currentRect.top;
        }
        this.applyChange({
            allowChangeEvent,
            originX,
            originY,
            scaleDiff: scale / this.scale,
        });
    }
    render() {
        return html`
            <style>
                ${panZoomDomStyles}
            </style>
            <pan-zoom>
                <div id="content" style="${this.contentStyle}">
                    <slot></slot>
                </div>
            </pan-zoom>
        `;
    }
    get minScale() {
        const attrValue = this.getAttribute(minScaleAttr);
        if (!attrValue) {
            return MIN_SCALE;
        }
        const value = parseFloat(attrValue);
        if (Number.isFinite(value)) {
            return Math.max(MIN_SCALE, value);
        }
        return MIN_SCALE;
    }
    get x() {
        return this.transform.e;
    }
    get y() {
        return this.transform.f;
    }
    get scale() {
        return this.transform.a;
    }
    /**
     * Update the stage with a given scale/x/y.
     */
    setTransform(opts = {}) {
        const { scale = this.scale, allowChangeEvent = false } = opts;
        let { x = this.x, y = this.y } = opts;
        // If we don't have an element to position, just set the value as given.
        // We'll check bounds later.
        if (!this.positioningEl) {
            this.updateTransform(scale, x, y, allowChangeEvent);
            return;
        }
        // Get current layout
        const thisBounds = this.getBoundingClientRect();
        const positioningElBounds = this.positioningEl.getBoundingClientRect();
        // Not displayed. May be disconnected or display:none.
        // Just take the values, and we'll check bounds later.
        if (!thisBounds.width || !thisBounds.height) {
            this.updateTransform(scale, x, y, allowChangeEvent);
            return;
        }
        // Create points for positioningEl.
        let topLeft = createPoint();
        topLeft.x = positioningElBounds.left - thisBounds.left;
        topLeft.y = positioningElBounds.top - thisBounds.top;
        let bottomRight = createPoint();
        bottomRight.x = positioningElBounds.width + topLeft.x;
        bottomRight.y = positioningElBounds.height + topLeft.y;
        // Calculate the intended position of positioningEl.
        const matrix = createMatrix()
            .translate(x, y)
            .scale(scale)
            // Undo current transform
            .multiply(this.transform.inverse());
        topLeft = topLeft.matrixTransform(matrix);
        bottomRight = bottomRight.matrixTransform(matrix);
        // Ensure positioningEl can't move beyond out-of-bounds.
        // Correct for x
        if (topLeft.x > thisBounds.width) {
            x += thisBounds.width - topLeft.x;
        } else if (bottomRight.x < 0) {
            x += -bottomRight.x;
        }
        // Correct for y
        if (topLeft.y > thisBounds.height) {
            y += thisBounds.height - topLeft.y;
        } else if (bottomRight.y < 0) {
            y += -bottomRight.y;
        }
        this.updateTransform(scale, x, y, allowChangeEvent);
    }
    /**
     * Update transform values without checking bounds. This is only called in setTransform.
     */
    updateTransform(scale, x, y, allowChangeEvent) {
        // Avoid scaling to zero
        if (scale < this.minScale) {
            return;
        }
        // Return if there's no change
        if (scale === this.scale && x === this.x && y === this.y) {
            return;
        }
        this.transform.e = x;
        this.transform.f = y;
        this.transform.d = this.transform.a = scale;
        this.style.setProperty('--x', this.x + 'px');
        this.style.setProperty('--y', this.y + 'px');
        this.style.setProperty('--scale', this.scale + '');
        this.translateX = this.x;
        this.translateY = this.y;
        this.scaleOld = this.scale;
        if (allowChangeEvent) {
            const event = new Event('change', { bubbles: true });
            this.dispatchEvent(event);
        }
    }
    /**
     * Called when the direct children of this element change.
     * Until we have have shadow dom support across the board, we
     * require a single element to be the child of <pinch-zoom>, and
     * that's the element we pan/scale.
     */
    stageElChange() {
        this.positioningEl = undefined;
        if (this.children.length === 0) {
            return;
        }
        this.positioningEl = this.children[0];
        if (this.children.length > 1) {
            // console.warn('<pinch-zoom> must not have more than one child.');
        }
        // Do a bounds check
        this.setTransform({ allowChangeEvent: true });
    }
    onWheel(event) {
        if (!this.positioningEl) {
            return;
        }
        event.preventDefault();
        const currentRect = this.positioningEl.getBoundingClientRect();
        let { deltaY } = event;
        const { ctrlKey, deltaMode } = event;
        if (deltaMode === 1) {
            // 1 is "lines", 0 is "pixels"
            // Firefox uses "lines" for some types of mouse
            deltaY *= 15;
        }
        // ctrlKey is true when pinch-zooming on a trackpad.
        const divisor = ctrlKey ? 100 : 300;
        const scaleDiff = 1 - deltaY / divisor;
        this.applyChange({
            allowChangeEvent: true,
            originX: event.clientX - currentRect.left,
            originY: event.clientY - currentRect.top,
            scaleDiff,
        });
    }
    onPointerMove(previousPointers, currentPointers) {
        if (!this.positioningEl) {
            return;
        }
        // Combine next points with previous points
        const currentRect = this.positioningEl.getBoundingClientRect();
        // For calculating panning movement
        const prevMidpoint = getMidpoint(
            previousPointers[0],
            previousPointers[1]
        );
        const newMidpoint = getMidpoint(currentPointers[0], currentPointers[1]);
        // Midpoint within the element
        const originX = prevMidpoint.clientX - currentRect.left;
        const originY = prevMidpoint.clientY - currentRect.top;
        // Calculate the desired change in scale
        const prevDistance = getDistance(
            previousPointers[0],
            previousPointers[1]
        );
        const newDistance = getDistance(currentPointers[0], currentPointers[1]);
        const scaleDiff = prevDistance ? newDistance / prevDistance : 1;
        this.applyChange({
            allowChangeEvent: true,
            originX,
            originY,
            panX: newMidpoint.clientX - prevMidpoint.clientX,
            panY: newMidpoint.clientY - prevMidpoint.clientY,
            scaleDiff,
        });
    }
    /** Transform the view & fire a change event */
    applyChange(opts = {}) {
        const {
            panX = 0,
            panY = 0,
            originX = 0,
            originY = 0,
            scaleDiff = 1,
            allowChangeEvent = false,
        } = opts;
        const matrix = createMatrix()
            // Translate according to panning.
            .translate(panX, panY)
            // Scale about the origin.
            .translate(originX, originY)
            // Apply current translate
            .translate(this.x, this.y)
            .scale(scaleDiff)
            .translate(-originX, -originY)
            // Apply current scale.
            .scale(this.scale);
        // Convert the transform into basic translate & scale.
        this.setTransform({
            allowChangeEvent,
            scale: matrix.a,
            x: matrix.e,
            y: matrix.f,
        });
    }
    // public onPan(ev: Event) {
    //     return;
    //     const scaleFactor = 1 / this.scale;
    //
    //     this.translateX -= ev.detail.deltaX * scaleFactor;
    //     this.translateY -= ev.detail.deltaY * scaleFactor;
    //
    //     const panEvent = new CustomEvent('pan', {
    //         bubbles: true,
    //         composed: true,
    //         detail: ev.detail,
    //     });
    //
    //     this.dispatchEvent(panEvent);
    // }
    //
    // public onZoom(ev: Event) {
    //     return;
    //     this.scale *= 1 - Math.sign(ev.detail.zoomDelta) * 0.06;
    //
    //     const zoomEvent = new CustomEvent('zoom', {
    //         bubbles: true,
    //         composed: true,
    //         detail: ev.detail,
    //     });
    //
    //     this.dispatchEvent(zoomEvent);
    // }
    //
    get contentStyle() {
        return `transform: ${this.transformString}`;
        // return `transform: ${this.transformString}; transform-origin:${
        //     this.transformOrigin
        // }`;
    }
    get transformString() {
        // const translate = `
        //     translate(${this.translateX}px, ${this.translateY}px)
        // `;
        const scale = `scale(${this.scaleOld})`;
        return scale; // translate.concat(scale);
    }
}
__decorate(
    [property({ type: Number })],
    CrispPanZoomDomGoogle.prototype,
    'translateX',
    void 0
);
__decorate(
    [property({ type: Number })],
    CrispPanZoomDomGoogle.prototype,
    'translateY',
    void 0
);
__decorate(
    [property({ type: Number })],
    CrispPanZoomDomGoogle.prototype,
    'scaleOld',
    void 0
);
if (!customElements.get('pan-zoom-dom-google')) {
    customElements.define('pan-zoom-dom-google', CrispPanZoomDomGoogle);
}

//# sourceMappingURL=pan-zoom-dom-google.js.map
