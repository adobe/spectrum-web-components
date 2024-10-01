import { s as streamingListener } from './streaming-listener-CmIYw2xv.js';
import { r as randomID } from './random-id-BST1Puzz.js';
import { i } from './lit-element-BulMEkr1.js';
import { S as SpectrumElement, n, d as defineElement } from './define-element-C_3bgzm7.js';
import { x, T } from './lit-html-COgVUehj.js';
import { o } from './if-defined-DDJGFaN4.js';
import { e as e$1 } from './class-map-DdRvesrq.js';
import { r } from './state-DrummH0c.js';
import { e as e$2 } from './query-DQF6X5qW.js';
import './async-directive-DF6rMZJ5.js';
import './directive-helpers-icdnqxxc.js';
import './directive-Bn5c4u4M.js';
import './base-u8Z1Hrsd.js';

const e=i`
    :host{--spectrum-splitview-vertical-width:100%;--spectrum-splitview-vertical-gripper-width:50%;--spectrum-splitview-vertical-gripper-outer-width:100%;--spectrum-splitview-vertical-gripper-reset:0;--spectrum-splitview-background-color:var(--spectrum-gray-100);--spectrum-splitview-handle-background-color:var(--spectrum-gray-300);--spectrum-splitview-handle-background-color-hover:var(--spectrum-gray-400);--spectrum-splitview-handle-background-color-down:var(--spectrum-gray-800);--spectrum-splitview-handle-background-color-focus:var(--spectrum-focus-indicator-color);--spectrum-splitview-handle-width:var(--spectrum-border-width-200);--spectrum-splitview-gripper-border-radius:var(--spectrum-corner-radius-75);--spectrum-splitview-gripper-width:var(--spectrum-border-width-400);--spectrum-splitview-gripper-height:16px;--spectrum-splitview-gripper-border-width-horizontal:3px;--spectrum-splitview-gripper-border-width-vertical:var(--spectrum-border-width-400);display:flex;overflow:hidden}::slotted(*){block-size:100%;background-color:var(--mod-splitview-background-color,var(--spectrum-splitview-background-color))}#gripper{content:"";border-radius:var(--mod-splitview-gripper-border-radius,var(--spectrum-splitview-gripper-border-radius));border-style:solid;border-color:var(--highcontrast-splitview-handle-background-color,var(--mod-splitview-handle-background-color,var(--spectrum-splitview-handle-background-color)));touch-action:none;inline-size:var(--mod-splitview-gripper-width,var(--spectrum-splitview-gripper-width));block-size:var(--mod-splitview-gripper-height,var(--spectrum-splitview-gripper-height));border-block-width:var(--mod-splitview-gripper-border-width-vertical,var(--spectrum-splitview-gripper-border-width-vertical));border-inline-width:var(--mod-splitview-gripper-border-width-horizontal,var(--spectrum-splitview-gripper-border-width-horizontal));display:block;position:absolute;inset-block-start:50%;inset-inline-start:calc(( var(--mod-splitview-gripper-width,var(--spectrum-splitview-gripper-width)) + ( 2*var(--mod-splitview-gripper-border-width-vertical,var(--spectrum-splitview-gripper-border-width-vertical))) - var(--mod-splitview-gripper-width,var(--spectrum-splitview-gripper-width)))/2*-1);transform:translateY(-50%)}#gripper:before{background-color:var(--highcontrast-splitview-handle-background-color,var(--mod-splitview-handle-background-color,var(--spectrum-splitview-handle-background-color)))}#splitter{background-color:var(--highcontrast-splitview-handle-background-color,var(--mod-splitview-handle-background-color,var(--spectrum-splitview-handle-background-color)));-webkit-user-select:none;user-select:none;inline-size:var(--mod-splitview-handle-width,var(--spectrum-splitview-handle-width));block-size:100%;z-index:1;position:relative}#splitter.is-collapsed-end #gripper:before,#splitter.is-collapsed-start #gripper:before{content:"";inline-size:var(--mod-splitview-handle-width,var(--spectrum-splitview-handle-width));block-size:100%;position:absolute;inset-block-start:0;inset-inline-start:calc(50% - var(--mod-splitview-handle-width,var(--spectrum-splitview-handle-width))/2)}#splitter.is-collapsed-start #gripper{inset-inline-start:0}#splitter.is-collapsed-end #gripper{inset-inline:auto 0}:host([resizable]) #splitter.is-hovered{background-color:var(--highcontrast-splitview-handle-background-color-hover,var(--mod-splitview-handle-background-color-hover,var(--spectrum-splitview-handle-background-color-hover)))}:host([resizable]) #splitter.is-hovered #gripper{border-color:var(--highcontrast-splitview-handle-background-color-hover,var(--mod-splitview-handle-background-color-hover,var(--spectrum-splitview-handle-background-color-hover)))}:host([resizable]) #splitter.is-hovered #gripper:before{background-color:var(--highcontrast-splitview-handle-background-color-hover,var(--mod-splitview-handle-background-color-hover,var(--spectrum-splitview-handle-background-color-hover)))}@media (hover:hover){:host([resizable]) #splitter:hover{background-color:var(--highcontrast-splitview-handle-background-color-hover,var(--mod-splitview-handle-background-color-hover,var(--spectrum-splitview-handle-background-color-hover)))}:host([resizable]) #splitter:hover #gripper{border-color:var(--highcontrast-splitview-handle-background-color-hover,var(--mod-splitview-handle-background-color-hover,var(--spectrum-splitview-handle-background-color-hover)))}:host([resizable]) #splitter:hover #gripper:before{background-color:var(--highcontrast-splitview-handle-background-color-hover,var(--mod-splitview-handle-background-color-hover,var(--spectrum-splitview-handle-background-color-hover)))}}:host([resizable]) #splitter.is-active,:host([resizable]) #splitter:active{background-color:var(--highcontrast-splitview-handle-background-color-down,var(--mod-splitview-handle-background-color-down,var(--spectrum-splitview-handle-background-color-down)))}:host([resizable]) #splitter.is-active #gripper,:host([resizable]) #splitter:active #gripper{border-color:var(--highcontrast-splitview-handle-background-color-down,var(--mod-splitview-handle-background-color-down,var(--spectrum-splitview-handle-background-color-down)))}:host([resizable]) #splitter.is-active #gripper:before,:host([resizable]) #splitter:active #gripper:before{background-color:var(--highcontrast-splitview-handle-background-color-down,var(--mod-splitview-handle-background-color-down,var(--spectrum-splitview-handle-background-color-down)))}:host([resizable]) #splitter:focus{outline:none}:host([resizable]) #splitter:focus-visible{background-color:var(--highcontrast-splitview-handle-background-color-focus,var(--mod-splitview-handle-background-color-focus,var(--spectrum-splitview-handle-background-color-focus)));outline:none}:host([resizable]) #splitter:focus-visible #gripper{border-color:var(--highcontrast-splitview-handle-background-color-focus,var(--mod-splitview-handle-background-color-focus,var(--spectrum-splitview-handle-background-color-focus)));box-shadow:0 0 0 1px var(--highcontrast-splitview-handle-background-color-focus,var(--mod-splitview-handle-background-color-focus,var(--spectrum-splitview-handle-background-color-focus)))}:host([resizable]) #splitter:focus-visible #gripper:before{background-color:var(--highcontrast-splitview-handle-background-color-focus,var(--mod-splitview-handle-background-color-focus,var(--spectrum-splitview-handle-background-color-focus)))}:host([vertical]){flex-direction:column}:host([vertical]) ::slotted(*){block-size:auto;inline-size:var(--mod-splitview-vertical-width,var(--spectrum-splitview-vertical-width))}:host([vertical]) #gripper{transform:translate(calc(var(--mod-splitview-vertical-gripper-width,var(--spectrum-splitview-vertical-gripper-width))*-1));inline-size:var(--mod-splitview-gripper-height,var(--spectrum-splitview-gripper-height));block-size:var(--mod-splitview-gripper-width,var(--spectrum-splitview-gripper-width));border-block-width:var(--mod-splitview-gripper-border-width-horizontal,var(--spectrum-splitview-gripper-border-width-horizontal));border-inline-width:var(--mod-splitview-gripper-border-width-vertical,var(--spectrum-splitview-gripper-border-width-vertical));inset-block-start:calc(( var(--mod-splitview-gripper-width,var(--spectrum-splitview-gripper-width)) + ( 2*var(--mod-splitview-gripper-border-width-vertical,var(--spectrum-splitview-gripper-border-width-vertical))) - var(--mod-splitview-gripper-width,var(--spectrum-splitview-gripper-width)))/2*-1);inset-inline-start:var(--mod-splitview-vertical-gripper-width,var(--spectrum-splitview-vertical-gripper-width))}:host([vertical]) #splitter{inline-size:var(--mod-splitview-vertical-width,var(--spectrum-splitview-vertical-width));block-size:var(--mod-splitview-handle-width,var(--spectrum-splitview-handle-width))}:host([vertical]) #splitter.is-collapsed-end #gripper,:host([vertical]) #splitter.is-collapsed-start #gripper{inset-inline-start:var(--mod-splitview-vertical-gripper-width,var(--spectrum-splitview-vertical-gripper-width))}:host([vertical]) #splitter.is-collapsed-end #gripper:before,:host([vertical]) #splitter.is-collapsed-start #gripper:before{inline-size:var(--mod-splitview-vertical-gripper-outer-width,var(--spectrum-splitview-vertical-gripper-outer-width));block-size:var(--mod-splitview-handle-width,var(--spectrum-splitview-handle-width));inset-block-start:calc(var(--mod-splitview-vertical-gripper-width,var(--spectrum-splitview-vertical-gripper-width)) - var(--mod-splitview-handle-width,var(--spectrum-splitview-handle-width))/2);inset-inline-start:var(--mod-splitview-vertical-gripper-reset,var(--spectrum-splitview-vertical-gripper-reset))}:host([vertical]) #splitter.is-collapsed-start #gripper{inset-block-start:var(--mod-splitview-vertical-gripper-reset,var(--spectrum-splitview-vertical-gripper-reset))}:host([vertical]) #splitter.is-collapsed-end #gripper{inset-block-start:auto;inset-block-end:var(--mod-splitview-vertical-gripper-reset,var(--spectrum-splitview-vertical-gripper-reset))}@media (forced-colors:active){:host{--highcontrast-splitview-handle-background-color:CanvasText;--highcontrast-splitview-handle-background-color-hover:CanvasText;--highcontrast-splitview-handle-background-color-down:CanvasText;--highcontrast-splitview-handle-background-color-focus:Highlight}}:host{--spectrum-split-view-first-pane-size:50%}::slotted(*){overflow:auto}::slotted(:first-child){order:1}:host(:not([vertical])) ::slotted(:first-child:not(:last-child)){width:var(--spectrum-split-view-first-pane-size)}:host([vertical]) ::slotted(:first-child:not(:last-child)){height:var(--spectrum-split-view-first-pane-size)}::slotted(:nth-child(2)){flex:1;order:3}::slotted(:nth-child(n+3)){display:none}#gripper{touch-action:none}#splitter{height:auto;order:2}:host([resizable]) #splitter{cursor:ew-resize;background-clip:content-box}:host([vertical][resizable]) #splitter{cursor:ns-resize;background-clip:content-box}:host([resizable][dir=ltr]) #splitter.is-resized-start,:host([resizable][dir=rtl]) #splitter.is-resized-end{cursor:e-resize}:host([resizable][dir=ltr]) #splitter.is-resized-end,:host([resizable][dir=rtl]) #splitter.is-resized-start{cursor:w-resize}:host([vertical][resizable]) #splitter.is-resized-start{cursor:s-resize}:host([vertical][resizable]) #splitter.is-resized-end{cursor:n-resize}:host([resizable][collapsible]) #splitter.is-resized-start,:host([resizable][collapsible]) #splitter.is-resized-end{cursor:ew-resize}:host([resizable][dir=ltr][collapsible]) #splitter.is-collapsed-start,:host([resizable][dir=rtl][collapsible]) #splitter.is-collapsed-end{cursor:e-resize}:host([resizable][dir=ltr][collapsible]) #splitter.is-collapsed-end,:host([resizable][dir=rtl][collapsible]) #splitter.is-collapsed-start{cursor:w-resize}:host([vertical][resizable][collapsible]) #splitter.is-collapsed-start{cursor:s-resize}:host([vertical][resizable][collapsible]) #splitter.is-collapsed-end{cursor:n-resize}:host([vertical][resizable][collapsible]) #splitter.is-resized-start,:host([vertical][resizable][collapsible]) #splitter.is-resized-end{cursor:ns-resize}
`;

var v=Object.defineProperty;var s=(l,a,t,e)=>{for(var i=void 0,o=l.length-1,h;o>=0;o--)(h=l[o])&&(i=(h(a,t,i))||i);return i&&v(a,t,i),i};const d=3840,g=2,M=10,C=50,m=50;class SplitView extends SpectrumElement{constructor(){super();this.vertical=!1;this.resizable=!1;this.collapsible=!1;this.primaryMin=0;this.primaryMax=d;this.secondaryMin=0;this.secondaryMax=d;this.firstPaneSize="auto";this.enoughChildren=!1;this.viewSize=0;this.offset=0;this.minPos=0;this.maxPos=d;this.controlledElIDApplied=!1;const t=window.ResizeObserver;t&&(this.observer=new t(()=>{this.rect=void 0,this.updateMinMax();}));}static get styles(){return [e]}connectedCallback(){var t;super.connectedCallback(),(t=this.observer)==null||t.observe(this);}disconnectedCallback(){var t;(t=this.observer)==null||t.unobserve(this),super.disconnectedCallback();}get splitterSize(){return this._splitterSize||(this._splitterSize=this.splitter&&Math.round(parseFloat(window.getComputedStyle(this.splitter).getPropertyValue(this.vertical?"height":"width")))||g),this._splitterSize}render(){var i,o$1;const t={"is-resized-start":this.splitterPos===this.minPos,"is-resized-end":this.splitterPos&&this.splitterPos>this.splitterSize&&this.splitterPos===this.maxPos,"is-collapsed-start":this.splitterPos===0,"is-collapsed-end":this.splitterPos&&this.splitterPos>=Math.max(this.splitterSize,this.viewSize-this.splitterSize)},e=this.resizable?this.label||"Resize the panels":void 0;return x`
            <slot
                id=${o(this.resizable?(i=this.controlledEl)==null?void 0:i.id:void 0)}
                @slotchange=${this.onContentSlotChange}
                style="--spectrum-split-view-first-pane-size: ${this.firstPaneSize}"
            ></slot>
            ${this.enoughChildren?x`
                      <div
                          id="splitter"
                          class=${e$1(t)}
                          role="separator"
                          aria-controls=${o(this.resizable?(o$1=this.controlledEl)==null?void 0:o$1.id:void 0)}
                          aria-label=${o(e)}
                          aria-orientation=${this.vertical?"horizontal":"vertical"}
                          aria-valuenow=${Math.round(parseFloat(this.firstPaneSize)/this.viewSize*100)}
                          tabindex=${o(this.resizable?"0":void 0)}
                          @keydown=${this.onKeydown}
                          ${streamingListener({start:["pointerdown",this.onPointerdown],streamInside:["pointermove",this.onPointermove],end:[["pointerup","pointercancel","pointerleave"],this.onPointerup]})}
                      >
                          ${this.resizable?x`
                                    <div id="gripper"></div>
                                `:T}
                      </div>
                  `:T}
        `}onContentSlotChange(t){this.controlledEl&&this.controlledElIDApplied&&(this.controlledEl.removeAttribute("id"),this.controlledElIDApplied=!1),this.controlledEl=t.target.assignedElements()[0],this.controlledEl&&!this.controlledEl.id&&(this.controlledEl.id=`${this.tagName.toLowerCase()}-${randomID()}`,this.controlledElIDApplied=!0),this.enoughChildren=this.children.length>1,this.checkResize();}onPointerdown(t){if(!this.resizable||t.button&&t.button!==0){t.preventDefault();return}this.splitter.setPointerCapture(t.pointerId),this.offset=this.getOffset();}onPointermove(t){t.preventDefault();let e=this.vertical||this.isLTR?this.getPosition(t)-this.offset:this.offset-this.getPosition(t);this.collapsible&&e<this.minPos-m&&(e=0),this.collapsible&&e>this.maxPos+m&&(e=this.viewSize-this.splitterSize),this.updatePosition(e);}onPointerup(t){this.splitter.releasePointerCapture(t.pointerId);}getOffset(){this.rect||(this.rect=this.getBoundingClientRect());const t=this.isLTR?this.rect.left:this.rect.right;return this.vertical?this.rect.top:t}getPosition(t){return this.vertical?t.clientY:t.clientX}movePosition(t,e){t.preventDefault(),this.splitterPos!==void 0&&this.updatePosition(this.splitterPos+e);}onKeydown(t){if(!this.resizable)return;let e=0;const i=this.isLTR||this.vertical;switch(t.key){case"Home":t.preventDefault(),this.updatePosition(this.collapsible?0:this.minPos);return;case"End":t.preventDefault(),this.updatePosition(this.collapsible?this.viewSize-this.splitterSize:this.maxPos);return;case"ArrowLeft":e=i?-1:1;break;case"ArrowRight":e=i?1:-1;break;case"ArrowUp":e=this.vertical?-1:1;break;case"ArrowDown":e=this.vertical?1:-1;break;case"PageUp":e=this.vertical?-1:1;break;case"PageDown":e=this.vertical?1:-1;break}if(e!==0){const o=t.key.startsWith("Page")?C:M;this.movePosition(t,o*e);}}async checkResize(){if(this.enoughChildren&&(this.updateMinMax(),this.splitterPos===void 0)){const t=await this.calcStartPos();this.updatePosition(t);}}updateMinMax(){this.viewSize=this.vertical?this.offsetHeight:this.offsetWidth,this.minPos=Math.max(this.primaryMin,this.viewSize-this.secondaryMax),this.maxPos=Math.min(this.primaryMax,this.viewSize-Math.max(this.secondaryMin,this.splitterSize));}updatePosition(t){let e=this.getLimitedPosition(t);this.collapsible&&t<=0&&(e=0),this.collapsible&&t>this.maxPos&&t>=this.viewSize-this.splitterSize&&(e=this.viewSize-this.splitterSize),e!==this.splitterPos&&(this.splitterPos=e,this.dispatchChangeEvent());}getLimitedPosition(t){return t<=this.minPos?this.minPos:t>=this.maxPos?this.maxPos:Math.max(this.minPos,Math.min(this.maxPos,t))}async calcStartPos(){if(this.primarySize!==void 0&&/^\d+(px)?$/.test(this.primarySize))return parseInt(this.primarySize,10);if(this.primarySize!==void 0&&/^\d+%$/.test(this.primarySize))return parseInt(this.primarySize,10)*this.viewSize/100;if(this.primarySize==="auto"){this.firstPaneSize="auto";const e=this.paneSlot.assignedNodes({flatten:!0}).find(i=>i instanceof HTMLElement);if(typeof e.updateComplete!="undefined"&&await e.updateComplete,e){const i=window.getComputedStyle(e).getPropertyValue(this.vertical?"height":"width"),o=parseFloat(i);if(!isNaN(o))return this.getLimitedPosition(Math.ceil(o))}}return this.viewSize/2}dispatchChangeEvent(){const t=new Event("change",{bubbles:!0,composed:!0});this.dispatchEvent(t);}willUpdate(t){(!this.hasUpdated||t.has("primarySize"))&&(this.splitterPos=void 0,this.checkResize()),t.has("splitterPos")&&this.splitterPos!==void 0&&this.enoughChildren&&(this.firstPaneSize=`${Math.round(this.splitterPos)}px`);}}s([r()],SplitView.prototype,"controlledEl"),s([n({type:Boolean,reflect:!0})],SplitView.prototype,"vertical"),s([n({type:Boolean,reflect:!0})],SplitView.prototype,"resizable"),s([n({type:Boolean,reflect:!0})],SplitView.prototype,"collapsible"),s([n({type:Number,attribute:"primary-min"})],SplitView.prototype,"primaryMin"),s([n({type:Number,attribute:"primary-max"})],SplitView.prototype,"primaryMax"),s([n({type:String,attribute:"primary-size"})],SplitView.prototype,"primarySize"),s([n({type:Number,attribute:"secondary-min"})],SplitView.prototype,"secondaryMin"),s([n({type:Number,attribute:"secondary-max"})],SplitView.prototype,"secondaryMax"),s([n({type:Number,reflect:!0,attribute:"splitter-pos"})],SplitView.prototype,"splitterPos"),s([n({type:String,attribute:!1})],SplitView.prototype,"firstPaneSize"),s([n()],SplitView.prototype,"label"),s([n({type:Boolean,attribute:!1})],SplitView.prototype,"enoughChildren"),s([n({type:Number})],SplitView.prototype,"viewSize"),s([e$2("slot")],SplitView.prototype,"paneSlot"),s([e$2("#splitter")],SplitView.prototype,"splitter");

defineElement("sp-split-view",SplitView);

var splitView_stories = {
  title: "Split View",
  component: "sp-split-view",
  args: {
    primarySize: 100
  },
  argTypes: {
    primarySize: {
      name: "primarySize",
      type: { name: "number", required: false },
      description: "Size of the primary panel.",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: void 0 }
      },
      control: {
        type: "number"
      }
    }
  }
};
const Horizontal = (args) => {
  return x`
        <sp-split-view style="height: 200px" .primarySize="${args.primarySize}">
            <div>First panel</div>
            <div>Second panel</div>
        </sp-split-view>
    `;
};
const HorizontalResizable = (args) => {
  return x`
        <sp-split-view
            resizable
            primary-min="50"
            .primarySize="${args.primarySize}"
            secondary-min="50"
        >
            <div>
                <h1>First panel</h1>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                </p>
            </div>
            <div>
                <h2>Second panel</h2>
                <p>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout.
                </p>
            </div>
        </sp-split-view>
    `;
};
const HorizontalResizableCollapsible = (args) => {
  return x`
        <sp-split-view
            resizable
            collapsible
            primary-min="50"
            secondary-min="50"
            style="height: 500px;"
            .primarySize="${args.primarySize}"
        >
            <div>
                <h1>First panel</h1>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
            </div>
            <div>
                <h2>Second panel</h2>
                <p>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum is that it has a
                    more-or-less normal distribution of letters, as opposed to
                    using 'Content here, content here', making it look like
                    readable English. Many desktop publishing packages and web
                    page editors now use Lorem Ipsum as their default model
                    text, and a search for 'lorem ipsum' will uncover many web
                    sites still in their infancy. Various versions have evolved
                    over the years, sometimes by accident, sometimes on purpose
                    (injected humour and the like).
                </p>
            </div>
        </sp-split-view>
    `;
};
HorizontalResizableCollapsible.args = {
  primarySize: void 0
};
const Vertical = (args) => {
  return x`
        <sp-split-view vertical .primarySize="${args.primarySize}">
            <div>First panel</div>
            <div>Second panel</div>
        </sp-split-view>
    `;
};
Vertical.args = {
  primarySize: void 0
};
const VerticalResizable = (args) => {
  return x`
        <sp-split-view
            vertical
            resizable
            primary-min="50"
            primary-max="100"
            secondary-min="50"
            style="height: 400px;"
            .primarySize="${args.primarySize}"
        >
            <div>
                <h1>First panel</h1>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
            </div>
            <div>
                <h2>Second panel</h2>
                <p>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum is that it has a
                    more-or-less normal distribution of letters, as opposed to
                    using 'Content here, content here', making it look like
                    readable English. Many desktop publishing packages and web
                    page editors now use Lorem Ipsum as their default model
                    text, and a search for 'lorem ipsum' will uncover many web
                    sites still in their infancy. Various versions have evolved
                    over the years, sometimes by accident, sometimes on purpose
                    (injected humour and the like).
                </p>
            </div>
        </sp-split-view>
    `;
};
VerticalResizable.args = {
  primarySize: void 0
};
const VerticalResizableCollapsible = (args) => {
  return x`
        <sp-split-view
            vertical
            resizable
            collapsible
            primary-min="50"
            secondary-min="40"
            style="height: 400px;"
            .primarySize="${args.primarySize}"
        >
            <div>
                <h1>First panel</h1>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
            </div>
            <div>
                <h2>Second panel</h2>
                <p>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum is that it has a
                    more-or-less normal distribution of letters, as opposed to
                    using 'Content here, content here', making it look like
                    readable English. Many desktop publishing packages and web
                    page editors now use Lorem Ipsum as their default model
                    text, and a search for 'lorem ipsum' will uncover many web
                    sites still in their infancy. Various versions have evolved
                    over the years, sometimes by accident, sometimes on purpose
                    (injected humour and the like).
                </p>
            </div>
        </sp-split-view>
    `;
};
VerticalResizableCollapsible.args = {
  primarySize: 250
};
const MultipleLevels = (args) => {
  return x`
        <sp-split-view
            resizable
            primary-min="50"
            primary-max="200"
            secondary-min="50"
            style="height: 400px; width: 600px;"
        >
            <div>
                <h1>First panel - Level 1</h1>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
            </div>
            <div>
                <h2>Second panel - Level 1</h2>
                <sp-split-view
                    vertical
                    resizable
                    primary-min="50"
                    .primarySize="${args.primarySize}"
                    secondary-min="50"
                    style="height: 300px;"
                >
                    <div>
                        <h3>First panel - Level 2</h3>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.
                        </p>
                    </div>
                    <div>
                        <h4>Second panel - Level 2</h4>
                        <p>
                            It is a long established fact that a reader will be
                            distracted by the readable content of a page when
                            looking at its layout.
                        </p>
                    </div>
                </sp-split-view>
            </div>
        </sp-split-view>
    `;
};
const OnePaneNoSplitter = (args) => {
  return x`
        <sp-split-view style="height: 200px" .primarySize="${args.primarySize}">
            <div>First panel</div>
        </sp-split-view>
    `;
};
const ShowFirstTwoPanes = (args) => {
  return x`
        <sp-split-view style="height: 200px" .primarySize="${args.primarySize}">
            <div>First panel</div>
            <div>Second panel</div>
            <div>Third (invisible) panel</div>
        </sp-split-view>
    `;
};
ShowFirstTwoPanes.args = {
  primarySize: void 0
};
const __namedExportsOrder = ['Horizontal', 'HorizontalResizable', 'HorizontalResizableCollapsible', 'Vertical', 'VerticalResizable', 'VerticalResizableCollapsible', 'MultipleLevels', 'OnePaneNoSplitter', 'ShowFirstTwoPanes'];

export { Horizontal, HorizontalResizable, HorizontalResizableCollapsible, MultipleLevels, OnePaneNoSplitter, ShowFirstTwoPanes, Vertical, VerticalResizable, VerticalResizableCollapsible, __namedExportsOrder, splitView_stories as default };
