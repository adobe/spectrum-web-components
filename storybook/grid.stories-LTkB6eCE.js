import { s, i, S } from './lit-element-BulMEkr1.js';
import { x, j } from './lit-html-COgVUehj.js';
import { n as n$1, S as SpectrumElement } from './define-element-C_3bgzm7.js';
import { d as defaultRenderItem, a as defaultKeyFunction, v as virtualize, b as virtualizerRef } from './virtualize-DIfnaams.js';
import { B as BaseLayout, d as dim1, a as dim2 } from './BaseLayout-df2zAa6N.js';
import { s as s$1 } from './resize-controller-BJKfu6ft.js';
import { R as RovingTabindexController } from './RovingTabindex-Bi74mHtS.js';
import './sp-action-bar-C2fVNsMF.js';
import './sp-card-DsYPUfie.js';
import './sp-action-menu-phLWl3Od.js';
import './sp-menu-item-DOkBCZjF.js';
import './sp-tooltip-BpGkeKe1.js';
import './sp-checkbox-CbcDFwgB.js';
import './sp-action-button-BGmiWspi.js';
import './sp-action-group-BuA30sND.js';
import './sp-icon-edit-BAtqCbns.js';
import './sp-icon-more-DU6G5_Dk.js';
import './directive-Bn5c4u4M.js';
import './async-directive-DF6rMZJ5.js';
import './directive-helpers-icdnqxxc.js';
import './repeat-D5JakrYV.js';
import './FocusGroup-DQHKf855.js';
import './sp-popover-BH6yktMg.js';
import './Popover-CdFgwNhh.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
import './sp-close-button-lUq7Iv6y.js';
import './spectrum-icon-cross.css-NFfmPqwL.js';
import './ButtonBase-Euqk2NbC.js';
import './like-anchor-B3Uz3TFY.js';
import './if-defined-DDJGFaN4.js';
import './focusable-w-VMKDtH.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-C6K935AT.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-BIYWpr2G.js';
import './sp-icon-cross500-CGrmdtVu.js';
import './Cross500-HJNUUNvY.js';
import './sizedMixin-BzkTbMb8.js';
import './sp-field-label-oZHlTsnx.js';
import './random-id-BST1Puzz.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './ElementResolution-B9KteuX8.js';
import './observe-slot-presence-Ceiwt-jV.js';
import './sp-asset-BW4hm1qg.js';
import './sp-quick-actions-Dtp2mK4_.js';
import './sp-divider-CWUCLHk6.js';
import './divider.css-DO2_iA7o.js';
import './heading-C6ZIrIYw.js';
import './spectrum-lang.css-DOD3bmds.js';
import './slottable-request-event-DXuuyGoq.js';
import './Picker-TUMgNVnC.js';
import './spectrum-icon-chevron.css-CeYia-Jd.js';
import './sp-icon-chevron100-BExoFMYC.js';
import './Chevron100-2ZEB0c-t.js';
import './sp-icon-alert-Cbypiip7.js';
import './custom-tag-Diwq7nXX.js';
import './sp-menu-C-dIukbW.js';
import './MatchMedia-SZ42m4IA.js';
import './DependencyManger-Dpkh1Bse.js';
import './PendingState-BK9ivzsq.js';
import './get-label-from-slot-Cg6mfN40.js';
import './platform-r3Lf9REX.js';
import './class-map-DdRvesrq.js';
import './style-map-DtKTc8KS.js';
import './state-DrummH0c.js';
import './spectrum-icon-checkmark.css-NuoPlGW7.js';
import './focusable-selectors-CUZEb4r9.js';
import './CheckboxMixin-CMl_b79j.js';
import './sp-icon-checkmark300-BDWnUGU2.js';
import './Checkmark300-Cv25Kwxj.js';
import './sp-icon-dash300--ZN9FvZF.js';
import './Dash300-DagFK8mn.js';
import './spectrum-icon-dash.css-lElR_d7u.js';
import './sp-icon-corner-triangle300-Df1iqVxq.js';
import './CornerTriangle300-B7hvHiLM.js';
import './Edit-CCpN7dze.js';
import './More-C2yzfCOG.js';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class LitVirtualizer extends s {
    constructor() {
        super(...arguments);
        this.items = [];
        this.renderItem = defaultRenderItem;
        this.keyFunction = defaultKeyFunction;
        this.layout = {};
        this.scroller = false;
    }
    createRenderRoot() {
        return this;
    }
    render() {
        const { items, renderItem, keyFunction, layout, scroller } = this;
        return x `${virtualize({
            items,
            renderItem,
            keyFunction,
            layout,
            scroller,
        })}`;
    }
    element(index) {
        return this[virtualizerRef]?.element(index);
    }
    get layoutComplete() {
        return this[virtualizerRef]?.layoutComplete;
    }
    /**
     * This scrollToIndex() shim is here to provide backwards compatibility with other 0.x versions of
     * lit-virtualizer. It is deprecated and will likely be removed in the 1.0.0 release.
     */
    scrollToIndex(index, position = 'start') {
        this.element(index)?.scrollIntoView({ block: position });
    }
}
__decorate([
    n$1({ attribute: false })
], LitVirtualizer.prototype, "items", void 0);
__decorate([
    n$1()
], LitVirtualizer.prototype, "renderItem", void 0);
__decorate([
    n$1()
], LitVirtualizer.prototype, "keyFunction", void 0);
__decorate([
    n$1({ attribute: false })
], LitVirtualizer.prototype, "layout", void 0);
__decorate([
    n$1({ reflect: true, type: Boolean })
], LitVirtualizer.prototype, "scroller", void 0);

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
// function numberToPixelSize(n: number): PixelSize {
//     return n === 0 ? '0' : `${n}px`;
// }
function paddingValueToNumber(v) {
    if (v === 'match-gap') {
        return Infinity;
    }
    return parseInt(v);
}
function gapValueToNumber(v) {
    if (v === 'auto') {
        return Infinity;
    }
    return parseInt(v);
}
function gap1(direction) {
    return direction === 'horizontal' ? 'column' : 'row';
}
function gap2(direction) {
    return direction === 'horizontal' ? 'row' : 'column';
}
function padding1(direction) {
    return direction === 'horizontal' ? ['left', 'right'] : ['top', 'bottom'];
}
function padding2(direction) {
    return direction === 'horizontal' ? ['top', 'bottom'] : ['left', 'right'];
}
class SizeGapPaddingBaseLayout extends BaseLayout {
    constructor() {
        super(...arguments);
        this._itemSize = {};
        this._gaps = {};
        this._padding = {};
    }
    _getDefaultConfig() {
        return Object.assign({}, super._getDefaultConfig(), {
            itemSize: { width: '300px', height: '300px' },
            gap: '8px',
            padding: 'match-gap',
        });
    }
    // Temp, to support current flexWrap implementation
    get _gap() {
        return this._gaps.row;
    }
    // Temp, to support current flexWrap implementation
    get _idealSize() {
        return this._itemSize[dim1(this.direction)];
    }
    get _idealSize1() {
        return this._itemSize[dim1(this.direction)];
    }
    get _idealSize2() {
        return this._itemSize[dim2(this.direction)];
    }
    get _gap1() {
        return this._gaps[gap1(this.direction)];
    }
    get _gap2() {
        return this._gaps[gap2(this.direction)];
    }
    get _padding1() {
        const padding = this._padding;
        const [start, end] = padding1(this.direction);
        return [padding[start], padding[end]];
    }
    get _padding2() {
        const padding = this._padding;
        const [start, end] = padding2(this.direction);
        return [padding[start], padding[end]];
    }
    set itemSize(dims) {
        const size = this._itemSize;
        if (typeof dims === 'string') {
            dims = {
                width: dims,
                height: dims,
            };
        }
        const width = parseInt(dims.width);
        const height = parseInt(dims.height);
        if (width !== size.width) {
            size.width = width;
            this._triggerReflow();
        }
        if (height !== size.height) {
            size.height = height;
            this._triggerReflow();
        }
    }
    set gap(spec) {
        this._setGap(spec);
    }
    // This setter is overridden in specific layouts to narrow the accepted types
    _setGap(spec) {
        const values = spec.split(' ').map((v) => gapValueToNumber(v));
        const gaps = this._gaps;
        if (values[0] !== gaps.row) {
            gaps.row = values[0];
            this._triggerReflow();
        }
        if (values[1] === undefined) {
            if (values[0] !== gaps.column) {
                gaps.column = values[0];
                this._triggerReflow();
            }
        }
        else {
            if (values[1] !== gaps.column) {
                gaps.column = values[1];
                this._triggerReflow();
            }
        }
    }
    set padding(spec) {
        const padding = this._padding;
        const values = spec
            .split(' ')
            .map((v) => paddingValueToNumber(v));
        if (values.length === 1) {
            padding.top = padding.right = padding.bottom = padding.left = values[0];
            this._triggerReflow();
        }
        else if (values.length === 2) {
            padding.top = padding.bottom = values[0];
            padding.right = padding.left = values[1];
            this._triggerReflow();
        }
        else if (values.length === 3) {
            padding.top = values[0];
            padding.right = padding.left = values[1];
            padding.bottom = values[2];
            this._triggerReflow();
        }
        else if (values.length === 4) {
            ['top', 'right', 'bottom', 'left'].forEach((side, idx) => (padding[side] = values[idx]));
            this._triggerReflow();
        }
    }
}

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
///
class GridBaseLayout extends SizeGapPaddingBaseLayout {
    constructor() {
        super(...arguments);
        this._metrics = null;
        this.flex = null;
        this.justify = null;
    }
    _getDefaultConfig() {
        return Object.assign({}, super._getDefaultConfig(), {
            flex: false,
            justify: 'start',
        });
    }
    set gap(spec) {
        super._setGap(spec);
    }
    _updateLayout() {
        const justify = this.justify;
        const [padding1Start, padding1End] = this._padding1;
        const [padding2Start, padding2End] = this._padding2;
        // TODO (graynorton): Omit these checks in production mode
        ['_gap1', '_gap2'].forEach((gap) => {
            const gapValue = this[gap];
            if (gapValue === Infinity &&
                !['space-between', 'space-around', 'space-evenly'].includes(justify)) {
                throw new Error(`grid layout: gap can only be set to 'auto' when justify is set to 'space-between', 'space-around' or 'space-evenly'`);
            }
            if (gapValue === Infinity && gap === '_gap2') {
                throw new Error(`grid layout: ${gap2(this.direction)}-gap cannot be set to 'auto' when direction is set to ${this.direction}`);
            }
        });
        const usePaddingAndGap2 = this.flex || ['start', 'center', 'end'].includes(justify);
        const metrics = {
            rolumns: -1,
            itemSize1: -1,
            itemSize2: -1,
            // Infinity represents 'auto', so we set an invalid placeholder until we can calculate
            gap1: this._gap1 === Infinity ? -1 : this._gap1,
            gap2: usePaddingAndGap2 ? this._gap2 : 0,
            // Infinity represents 'match-gap', so we set padding to match gap
            padding1: {
                start: padding1Start === Infinity ? this._gap1 : padding1Start,
                end: padding1End === Infinity ? this._gap1 : padding1End,
            },
            padding2: usePaddingAndGap2
                ? {
                    start: padding2Start === Infinity ? this._gap2 : padding2Start,
                    end: padding2End === Infinity ? this._gap2 : padding2End,
                }
                : {
                    start: 0,
                    end: 0,
                },
            positions: [],
        };
        // 1. Calculate available space, taking padding into account
        const availableSpace = this._viewDim2 - metrics.padding2.start - metrics.padding2.end;
        if (availableSpace <= 0) {
            // If we have no space, we won't render any rolumns
            metrics.rolumns = 0;
        }
        else {
            // 2. Calculate how many ideally sized "rolumns" (including gaps) fit in the available space
            const gapSize = usePaddingAndGap2 ? metrics.gap2 : 0;
            let rolumns = 0;
            let spaceTaken = 0;
            if (availableSpace >= this._idealSize2) {
                rolumns =
                    Math.floor((availableSpace - this._idealSize2) / (this._idealSize2 + gapSize)) + 1;
                spaceTaken = rolumns * this._idealSize2 + (rolumns - 1) * gapSize;
            }
            // 3. If we're flexing items to fill the available space exactly, decide whether to add
            // a rolumn and reduce item size, or keep the number of rolumns and increase item size
            if (this.flex) {
                // If we have at least half the space we need for another rolumn, go ahead and add one
                if ((availableSpace - spaceTaken) / (this._idealSize2 + gapSize) >=
                    0.5) {
                    rolumns = rolumns + 1;
                }
                metrics.rolumns = rolumns;
                // Calculate the flexed item size
                metrics.itemSize2 = Math.round((availableSpace - gapSize * (rolumns - 1)) / rolumns);
                // Calculate item size in the other dimension, preserving area (the default), aspect ratio or ideal size in that dimension as specified
                const preserve = this.flex === true ? 'area' : this.flex.preserve;
                switch (preserve) {
                    case 'aspect-ratio':
                        metrics.itemSize1 = Math.round((this._idealSize1 / this._idealSize2) * metrics.itemSize2);
                        break;
                    case dim1(this.direction):
                        metrics.itemSize1 = Math.round(this._idealSize1);
                        break;
                    case 'area':
                    default:
                        metrics.itemSize1 = Math.round((this._idealSize1 * this._idealSize2) / metrics.itemSize2);
                }
            }
            else {
                // We're not flexing, so use the specified sizes unmodified
                metrics.itemSize1 = this._idealSize1;
                metrics.itemSize2 = this._idealSize2;
                metrics.rolumns = rolumns;
            }
            // 4. Calculate the position for each item in a template rolumn
            let pos;
            if (usePaddingAndGap2) {
                const spaceTaken = metrics.rolumns * metrics.itemSize2 +
                    (metrics.rolumns - 1) * metrics.gap2;
                pos =
                    this.flex || justify === 'start'
                        ? metrics.padding2.start
                        : justify === 'end'
                            ? this._viewDim2 - metrics.padding2.end - spaceTaken
                            : Math.round(this._viewDim2 / 2 - spaceTaken / 2);
            }
            else {
                const spaceToDivide = availableSpace - metrics.rolumns * metrics.itemSize2;
                if (justify === 'space-between') {
                    metrics.gap2 = Math.round(spaceToDivide / (metrics.rolumns - 1));
                    pos = 0;
                }
                else if (justify === 'space-around') {
                    metrics.gap2 = Math.round(spaceToDivide / metrics.rolumns);
                    pos = Math.round(metrics.gap2 / 2);
                }
                else {
                    // justify == 'space-evenly'
                    metrics.gap2 = Math.round(spaceToDivide / (metrics.rolumns + 1));
                    pos = metrics.gap2;
                }
                // If primary-axis gap was set to 'auto', provide the value now
                // (and set 'match-gap' padding values transitively)
                if (this._gap1 === Infinity) {
                    metrics.gap1 = metrics.gap2;
                    if (padding1Start === Infinity) {
                        metrics.padding1.start = pos;
                    }
                    if (padding1End === Infinity) {
                        metrics.padding1.end = pos;
                    }
                }
            }
            for (let i = 0; i < metrics.rolumns; i++) {
                metrics.positions.push(pos);
                pos += metrics.itemSize2 + metrics.gap2;
            }
        }
        this._metrics = metrics;
    }
}

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const grid = (config) => Object.assign({
    type: GridLayout,
}, config);
class GridLayout extends GridBaseLayout {
    /**
     * Returns the average size (precise or estimated) of an item in the scrolling direction,
     * including any surrounding space.
     */
    get _delta() {
        return this._metrics.itemSize1 + this._metrics.gap1;
    }
    _getItemSize(_idx) {
        return {
            [this._sizeDim]: this._metrics.itemSize1,
            [this._secondarySizeDim]: this._metrics.itemSize2,
        };
    }
    _getActiveItems() {
        const metrics = this._metrics;
        const { rolumns } = metrics;
        if (rolumns === 0) {
            this._first = -1;
            this._last = -1;
            this._physicalMin = 0;
            this._physicalMax = 0;
        }
        else {
            const { padding1 } = metrics;
            const min = Math.max(0, this._scrollPosition - this._overhang);
            const max = Math.min(this._scrollSize, this._scrollPosition + this._viewDim1 + this._overhang);
            const firstCow = Math.max(0, Math.floor((min - padding1.start) / this._delta));
            const lastCow = Math.max(0, Math.ceil((max - padding1.start) / this._delta));
            this._first = firstCow * rolumns;
            this._last = Math.min(lastCow * rolumns - 1, this.items.length - 1);
            this._physicalMin = padding1.start + this._delta * firstCow;
            this._physicalMax = padding1.start + this._delta * lastCow;
        }
    }
    _getItemPosition(idx) {
        const { rolumns, padding1, positions, itemSize1, itemSize2 } = this._metrics;
        return {
            [this._positionDim]: padding1.start + Math.floor(idx / rolumns) * this._delta,
            [this._secondaryPositionDim]: positions[idx % rolumns],
            [dim1(this.direction)]: itemSize1,
            [dim2(this.direction)]: itemSize2,
        };
    }
    _updateScrollSize() {
        const { rolumns, gap1, padding1, itemSize1 } = this._metrics;
        let size = 1;
        if (rolumns > 0) {
            const cows = Math.ceil(this.items.length / rolumns);
            size =
                padding1.start + cows * itemSize1 + (cows - 1) * gap1 + padding1.end;
        }
        this._scrollSize = size;
    }
}

const e=i`
    :host{contain:strict;pointer-events:none;display:block;position:relative}::slotted(*){pointer-events:all}
`;

const o=r=>{requestAnimationFrame(()=>{requestAnimationFrame(()=>{r();});});};class GridController{constructor(t,{elements:i,itemSize:e,gap:n,padding:s}){this._first=0;this._last=0;this.handleFocusin=t=>{const i=()=>this.host.scrollToIndex(0),e=()=>{this.focus(),this.host.tabIndex=-1;};t.target===this.host&&(this._first>0?o(()=>{i(),o(e);}):o(e));};this.handleFocusout=t=>{(!t.relatedTarget||!this.host.contains(t.relatedTarget))&&(this.host.tabIndex=0);};this.handleRangeChanged=t=>{this.rovingTabindexController.clearElementCache(t.first);};this.handleVisibleChanged=t=>{this._first=t.first,this._last=t.last;};this.host=t,this.host.addController(this),this.applyLayout(e,n,s),this.resizeController=new s$1(this.host,{callback:h=>{h.forEach(d=>{this.measureDirectionLength(d.contentRect);});}}),this.rovingTabindexController=new RovingTabindexController(this.host,{direction:"grid",elements:i,focusInIndex:()=>this.host.getRootNode().activeElement===this.host?0:-1});}get itemSize(){return this._itemSize()}_itemSize(){return {width:100,height:100}}get gap(){return this._gap()}_gap(){}get padding(){return this._padding()}_padding(){}focus(t){this.rovingTabindexController.focus(t);}applyLayout(t,i,e){typeof t=="object"?this._itemSize=()=>t:typeof t=="function"&&typeof t()!="undefined"&&(this._itemSize=t),typeof i=="string"?this._gap=()=>i:typeof i=="function"&&(this._gap=i),typeof e=="string"?this._padding=()=>e:typeof e=="function"&&(this._padding=e);}update({elements:t,itemSize:i,gap:e,padding:n}){this.rovingTabindexController.update({elements:t}),this.applyLayout(i,e,n);const s=this.host.getBoundingClientRect();this.measureDirectionLength(s);}measureDirectionLength(t){const i=this.gap?parseFloat(this.gap):0,e=this.padding?parseFloat(this.padding):0,n=t.width-e*2,s=Math.floor((n-this.itemSize.width)/(i+this.itemSize.width))+1;this.rovingTabindexController.directionLength=Math.floor(s);}hostConnected(){this.host.addEventListener("rangeChanged",this.handleRangeChanged),this.host.addEventListener("visibilityChanged",this.handleVisibleChanged),this.host.addEventListener("focusin",this.handleFocusin),this.host.addEventListener("focusout",this.handleFocusout),this.host.tabIndex=0,this.host.style.setProperty("outline","none","important");}hostDisconnected(){this.host.removeEventListener("rangeChanged",this.handleRangeChanged),this.host.removeEventListener("visibilityChanged",this.handleVisibleChanged),this.host.removeEventListener("focusin",this.handleFocusin),this.host.removeEventListener("focusout",this.handleFocusout);}}

var l=Object.defineProperty;var n=(d,a,e,i)=>{for(var t=void 0,r=d.length-1,s;r>=0;r--)(s=d[r])&&(t=(s(a,e,t))||t);return t&&l(a,e,t),t};class Grid extends LitVirtualizer{constructor(){super(...arguments);this.__gridPart=void 0;this.gap="0";this.items=[];this.itemSize={width:200,height:200};this.selected=[];this.gridController=new GridController(this,{elements:()=>[],itemSize:()=>this.itemSize,gap:()=>this.gap,padding:()=>this.padding||this.gap});}static get styles(){return [e]}handleChange(e){const i=e.target,t=this.items[parseFloat(i.getAttribute("key")||"")],r=[...this.selected];if(!r.includes(t))r.push(t);else {const s=r.indexOf(t);s>-1&&r.splice(s,1);}this.selected=r;}createRenderRoot(){var i;const e=(i=this.shadowRoot)!=null?i:this.attachShadow(this.constructor.shadowRootOptions);return S(e,this.constructor.elementStyles),e}render(){return x`
            <slot></slot>
        `}update(e){if((e.has("itemSize")||e.has("gap")||e.has("padding")||e.has("focusableSelector"))&&(this.updateComplete.then(()=>{this.gridController.update({elements:()=>[...this.querySelectorAll(this.focusableSelector)],itemSize:()=>this.itemSize,gap:()=>this.gap,padding:()=>this.padding||this.gap});}),this.layout=grid({itemSize:{width:`${this.itemSize.width}px`,height:`${this.itemSize.height}px`},gap:this.gap,padding:this.padding||this.gap})),e.has("renderItem")){const i=this.renderItem;this.renderItem=(t,r)=>{const s=this.selected.includes(t);return i(t,r,s)};}this.isConnected&&(this.__gridPart=j(super.render(),this)),super.update(e);}connectedCallback(){var e;super.connectedCallback(),(e=this.__gridPart)==null||e.setConnected(!0),this.addEventListener("change",this.handleChange,{capture:!0});}disconnectedCallback(){var e;this.removeEventListener("change",this.handleChange,{capture:!0}),(e=this.__gridPart)==null||e.setConnected(!1),super.disconnectedCallback();}}n([n$1({type:String})],Grid.prototype,"focusableSelector"),n([n$1({type:String})],Grid.prototype,"gap"),n([n$1({type:String})],Grid.prototype,"padding"),n([n$1({type:Array})],Grid.prototype,"items"),n([n$1({type:Object})],Grid.prototype,"itemSize"),n([n$1({type:Array})],Grid.prototype,"selected");

customElements.define("sp-grid",Grid);

var grid_stories = {
  title: "Grid",
  component: "sp-grid"
};
function generateItems(count) {
  const items = [];
  while (count) {
    count -= 1;
    items.unshift({ id: count });
  }
  return items;
}
const renderItem = (item, index, selected) => {
  return x`
        <sp-card
            toggles
            variant="quiet"
            heading="Card Heading ${item.id}"
            subheading="JPG Photo"
            style="contain: strict; padding: 1px;"
            value="card-${item.id}"
            .selected=${selected}
            key=${index}
            draggable="true"
        >
            <img
                alt=""
                slot="preview"
                src="https://picsum.photos/id/${item.id}/200/300"
                decoding="async"
            />
            <div slot="description">10/15/18</div>
            <div slot="footer">Footer</div>
            <sp-action-menu
                label="File actions"
                slot="actions"
                placement="bottom-end"
                quiet
                tabindex="-1"
            >
                <sp-tooltip slot="tooltip" self-managed placement="top">
                    Do stuff
                </sp-tooltip>
                <sp-menu-item>Deselect</sp-menu-item>
                <sp-menu-item>Select Inverse</sp-menu-item>
                <sp-menu-item>Feather...</sp-menu-item>
                <sp-menu-item>Select and Mask...</sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item>Save Selection</sp-menu-item>
                <sp-menu-item disabled>Make Work Path</sp-menu-item>
            </sp-action-menu>
        </sp-card>
    `;
};
const handleChange = (event) => {
  const actionbar = document.querySelector("sp-action-bar");
  const selected = document.querySelector(".selected");
  const ids = document.querySelector(".ids");
  actionbar.open = !!event.currentTarget.selected.length;
  actionbar.style.setProperty(
    "display",
    !!event.currentTarget.selected.length ? "flex" : "none"
  );
  selected.textContent = "" + event.currentTarget.selected.length;
  ids.textContent = "" + event.currentTarget.selected.map((selection) => selection.id).join(", ");
};
const handleActionBarChange = (event) => {
  event.preventDefault();
  const grid = document.querySelector("sp-grid");
  const actionbar = document.querySelector("sp-action-bar");
  actionbar.open = false;
  grid.selected = [];
};
const Default = () => {
  const items = generateItems(1e3);
  return x`
        <h1>Random before content that is focusable</h1>
        <input id="first-input" />
        <sp-grid
            @change=${handleChange}
            .items=${items}
            .focusableSelector=${"sp-card"}
            .renderItem=${renderItem}
        ></sp-grid>
        <sp-action-bar variant="fixed">
            <sp-checkbox @click=${handleActionBarChange} checked>
                <span class="selected"></span>
                Selected
                <span class="ids"></span>
            </sp-checkbox>
            <sp-action-group quiet>
                <sp-action-button>
                    <sp-icon-edit slot="icon" label="Edit"></sp-icon-edit>
                </sp-action-button>
                <sp-action-button>
                    <sp-icon-more slot="icon" label="More"></sp-icon-more>
                </sp-action-button>
            </sp-action-group>
        </sp-action-bar>
        <h2>Random after content that is focusable</h2>
        <input id="last-input" />
    `;
};
Default.swc_vrt = {
  skip: true
};
const sized = ({ gap, padding } = { gap: 10, padding: 10 }) => {
  const items = generateItems(1e3);
  function handleMediaChange() {
    let width = document.body.offsetWidth * 0.4;
    const height = 300;
    if (matchMedium.matches) {
      width = 300;
    } else if (matchLarge.matches) {
      width = 400;
    }
    document.querySelector("sp-grid").itemSize = {
      width,
      height
    };
  }
  const matchSmall = window.matchMedia("(max-width: 600px)");
  const matchMedium = window.matchMedia(
    "(min-width: 601px) and (max-width: 1200px)"
  );
  const matchLarge = window.matchMedia("(min-width: 1201px)");
  matchSmall.addEventListener("change", handleMediaChange);
  matchMedium.addEventListener("change", handleMediaChange);
  matchLarge.addEventListener("change", handleMediaChange);
  return x`
        <h1>Random before content that is focusable</h1>
        <input id="first-input" />
        <sp-grid
            @change=${handleChange}
            .items=${items}
            .focusableSelector=${"sp-card"}
            .renderItem=${renderItem}
            .itemSize=${{
    width: 200,
    height: 300
  }}
            .gap=${`${gap}px`}
            .padding=${`${padding}px`}
        ></sp-grid>
        <sp-action-bar variant="fixed" style="display: none">
            <sp-checkbox @click=${handleActionBarChange} checked>
                <span class="selected"></span>
                Selected
                <span class="ids"></span>
            </sp-checkbox>
            <sp-action-group quiet>
                <sp-action-button>
                    <sp-icon-edit slot="icon" label="Edit"></sp-icon-edit>
                </sp-action-button>
                <sp-action-button>
                    <sp-icon-more slot="icon" label="More"></sp-icon-more>
                </sp-action-button>
            </sp-action-group>
        </sp-action-bar>
        <h2>Random after content that is focusable</h2>
        <input id="last-input" />
    `;
};
sized.args = {
  gap: 10,
  padding: 10
};
sized.argTypes = {
  gap: {
    name: "gap",
    type: { name: "number", required: false },
    description: "Spacing between items.",
    table: {
      type: { summary: "number" }
    },
    control: {
      type: "number"
    }
  },
  padding: {
    name: "padding",
    type: { name: "number", required: false },
    description: "Spacing around all items.",
    table: {
      type: { summary: "number" }
    },
    control: {
      type: "number"
    }
  }
};
sized.swc_vrt = {
  skip: true
};
class MyParent extends SpectrumElement {
  render() {
    return x`
            <div class="child"><slot></slot></div>
        `;
  }
}
MyParent.styles = [
  i`
            :host {
                display: block;
                height: 100vh;
                overflow: hidden;
            }

            .child {
                height: 100%;
                overflow: scroll;
            }
        `
];
customElements.define("my-parent", MyParent);
const scrollParentInAssignedSlot = () => {
  const items = generateItems(1e3);
  return x`
        <my-parent>
            <sp-grid
                .items=${items}
                .focusableSelector=${"sp-card"}
                .renderItem=${renderItem}
            ></sp-grid>
        </my-parent>
    `;
};
scrollParentInAssignedSlot.swc_vrt = {
  skip: true
};
const __namedExportsOrder = ['Default', 'sized', 'scrollParentInAssignedSlot'];

export { Default, __namedExportsOrder, grid_stories as default, scrollParentInAssignedSlot, sized };
