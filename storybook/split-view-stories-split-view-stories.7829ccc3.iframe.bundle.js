"use strict";(self.webpackChunk_spectrum_web_components_1st_gen=self.webpackChunk_spectrum_web_components_1st_gen||[]).push([[324],{"../node_modules/lit/async-directive.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Kq:function(){return lit_html_async_directive_js__WEBPACK_IMPORTED_MODULE_0__.Kq},u$:function(){return lit_html_async_directive_js__WEBPACK_IMPORTED_MODULE_0__.u$}});var lit_html_async_directive_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../node_modules/lit-html/development/async-directive.js")},"./packages/split-view/stories/split-view.stories.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Horizontal:function(){return Horizontal},HorizontalResizable:function(){return HorizontalResizable},HorizontalResizableCollapsible:function(){return HorizontalResizableCollapsible},MultipleLevels:function(){return MultipleLevels},OnePaneNoSplitter:function(){return OnePaneNoSplitter},ShowFirstTwoPanes:function(){return ShowFirstTwoPanes},Vertical:function(){return Vertical},VerticalResizable:function(){return VerticalResizable},VerticalResizableCollapsible:function(){return VerticalResizableCollapsible},__namedExportsOrder:function(){return __namedExportsOrder},default:function(){return split_view_stories}});var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),directives_dev=__webpack_require__("./tools/base/src/directives.dev.js"),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js"),streaming_listener_dev=__webpack_require__("./tools/base/src/streaming-listener.dev.js"),random_id_dev=__webpack_require__("./tools/shared/src/random-id.dev.js");var split_view_css=index_dev.AH`
    :host{--spectrum-splitview-vertical-width:100%;--spectrum-splitview-vertical-gripper-width:50%;--spectrum-splitview-vertical-gripper-outer-width:100%;--spectrum-splitview-vertical-gripper-reset:0;--spectrum-splitview-content-color:var(--spectrum-body-color);--spectrum-splitview-handle-background-color-hover:var(--spectrum-gray-400);--spectrum-splitview-handle-background-color-down:var(--spectrum-gray-800);--spectrum-splitview-handle-background-color-focus:var(--spectrum-focus-indicator-color);--spectrum-splitview-handle-width:var(--spectrum-border-width-200);--spectrum-splitview-gripper-width:var(--spectrum-border-width-400);--spectrum-splitview-gripper-height:16px;--spectrum-splitview-gripper-border-width-horizontal:3px;--spectrum-splitview-gripper-border-width-vertical:var(--spectrum-border-width-400);display:flex;overflow:hidden}::slotted(*){background-color:var(--mod-splitview-background-color,var(--spectrum-splitview-background-color));block-size:100%;color:var(--mod-splitview-content-color,var(--spectrum-splitview-content-color))}#gripper{content:"";border-radius:var(--mod-splitview-gripper-border-radius,var(--spectrum-splitview-gripper-border-radius));border-style:solid;border-color:var(--highcontrast-splitview-handle-background-color,var(--mod-splitview-handle-background-color,var(--spectrum-splitview-handle-background-color)));touch-action:none;inline-size:var(--mod-splitview-gripper-width,var(--spectrum-splitview-gripper-width));block-size:var(--mod-splitview-gripper-height,var(--spectrum-splitview-gripper-height));border-block-width:var(--mod-splitview-gripper-border-width-vertical,var(--spectrum-splitview-gripper-border-width-vertical));border-inline-width:var(--mod-splitview-gripper-border-width-horizontal,var(--spectrum-splitview-gripper-border-width-horizontal));display:block;position:absolute;inset-block-start:50%;inset-inline-start:calc((var(--mod-splitview-gripper-width,var(--spectrum-splitview-gripper-width)) + (2*var(--mod-splitview-gripper-border-width-vertical,var(--spectrum-splitview-gripper-border-width-vertical))) - var(--mod-splitview-gripper-width,var(--spectrum-splitview-gripper-width)))/2*-1);transform:translateY(-50%)}#gripper:before{background-color:var(--highcontrast-splitview-handle-background-color,var(--mod-splitview-handle-background-color,var(--spectrum-splitview-handle-background-color)))}#splitter{background-color:var(--highcontrast-splitview-handle-background-color,var(--mod-splitview-handle-background-color,var(--spectrum-splitview-handle-background-color)));-webkit-user-select:none;user-select:none;inline-size:var(--mod-splitview-handle-width,var(--spectrum-splitview-handle-width));z-index:1;block-size:100%;position:relative}#splitter.is-collapsed-end #gripper:before,#splitter.is-collapsed-start #gripper:before{content:"";inline-size:var(--mod-splitview-handle-width,var(--spectrum-splitview-handle-width));block-size:100%;position:absolute;inset-block-start:0;inset-inline-start:calc(50% - var(--mod-splitview-handle-width,var(--spectrum-splitview-handle-width))/2)}#splitter.is-collapsed-start #gripper{inset-inline-start:0}#splitter.is-collapsed-end #gripper{inset-inline:auto 0}:host([resizable]) #splitter.is-hovered{background-color:var(--highcontrast-splitview-handle-background-color-hover,var(--mod-splitview-handle-background-color-hover,var(--spectrum-splitview-handle-background-color-hover)))}:host([resizable]) #splitter.is-hovered #gripper{border-color:var(--highcontrast-splitview-handle-background-color-hover,var(--mod-splitview-handle-background-color-hover,var(--spectrum-splitview-handle-background-color-hover)))}:host([resizable]) #splitter.is-hovered #gripper:before{background-color:var(--highcontrast-splitview-handle-background-color-hover,var(--mod-splitview-handle-background-color-hover,var(--spectrum-splitview-handle-background-color-hover)))}@media (hover:hover){:host([resizable]) #splitter:hover{background-color:var(--highcontrast-splitview-handle-background-color-hover,var(--mod-splitview-handle-background-color-hover,var(--spectrum-splitview-handle-background-color-hover)))}:host([resizable]) #splitter:hover #gripper{border-color:var(--highcontrast-splitview-handle-background-color-hover,var(--mod-splitview-handle-background-color-hover,var(--spectrum-splitview-handle-background-color-hover)))}:host([resizable]) #splitter:hover #gripper:before{background-color:var(--highcontrast-splitview-handle-background-color-hover,var(--mod-splitview-handle-background-color-hover,var(--spectrum-splitview-handle-background-color-hover)))}}:host([resizable]) #splitter.is-active,:host([resizable]) #splitter:active{background-color:var(--highcontrast-splitview-handle-background-color-down,var(--mod-splitview-handle-background-color-down,var(--spectrum-splitview-handle-background-color-down)))}:host([resizable]) #splitter.is-active #gripper,:host([resizable]) #splitter:active #gripper{border-color:var(--highcontrast-splitview-handle-background-color-down,var(--mod-splitview-handle-background-color-down,var(--spectrum-splitview-handle-background-color-down)))}:host([resizable]) #splitter.is-active #gripper:before,:host([resizable]) #splitter:active #gripper:before{background-color:var(--highcontrast-splitview-handle-background-color-down,var(--mod-splitview-handle-background-color-down,var(--spectrum-splitview-handle-background-color-down)))}:host([resizable]) #splitter:focus{outline:none}:host([resizable]) #splitter:focus-visible{background-color:var(--highcontrast-splitview-handle-background-color-focus,var(--mod-splitview-handle-background-color-focus,var(--spectrum-splitview-handle-background-color-focus)));outline:none}:host([resizable]) #splitter:focus-visible #gripper{border-color:var(--highcontrast-splitview-handle-background-color-focus,var(--mod-splitview-handle-background-color-focus,var(--spectrum-splitview-handle-background-color-focus)));box-shadow:0 0 0 1px var(--highcontrast-splitview-handle-background-color-focus,var(--mod-splitview-handle-background-color-focus,var(--spectrum-splitview-handle-background-color-focus)))}:host([resizable]) #splitter:focus-visible #gripper:before{background-color:var(--highcontrast-splitview-handle-background-color-focus,var(--mod-splitview-handle-background-color-focus,var(--spectrum-splitview-handle-background-color-focus)))}:host([vertical]){flex-direction:column}:host([vertical]) ::slotted(*){block-size:auto;inline-size:var(--mod-splitview-vertical-width,var(--spectrum-splitview-vertical-width))}:host([vertical]) #gripper{transform:translate(calc(var(--mod-splitview-vertical-gripper-width,var(--spectrum-splitview-vertical-gripper-width))*-1));inline-size:var(--mod-splitview-gripper-height,var(--spectrum-splitview-gripper-height));block-size:var(--mod-splitview-gripper-width,var(--spectrum-splitview-gripper-width));border-block-width:var(--mod-splitview-gripper-border-width-horizontal,var(--spectrum-splitview-gripper-border-width-horizontal));border-inline-width:var(--mod-splitview-gripper-border-width-vertical,var(--spectrum-splitview-gripper-border-width-vertical));inset-block-start:calc((var(--mod-splitview-gripper-width,var(--spectrum-splitview-gripper-width)) + (2*var(--mod-splitview-gripper-border-width-vertical,var(--spectrum-splitview-gripper-border-width-vertical))) - var(--mod-splitview-gripper-width,var(--spectrum-splitview-gripper-width)))/2*-1);inset-inline-start:var(--mod-splitview-vertical-gripper-width,var(--spectrum-splitview-vertical-gripper-width))}:host([vertical]) #splitter{inline-size:var(--mod-splitview-vertical-width,var(--spectrum-splitview-vertical-width));block-size:var(--mod-splitview-handle-width,var(--spectrum-splitview-handle-width))}:host([vertical]) #splitter.is-collapsed-end #gripper,:host([vertical]) #splitter.is-collapsed-start #gripper{inset-inline-start:var(--mod-splitview-vertical-gripper-width,var(--spectrum-splitview-vertical-gripper-width))}:host([vertical]) #splitter.is-collapsed-end #gripper:before,:host([vertical]) #splitter.is-collapsed-start #gripper:before{inline-size:var(--mod-splitview-vertical-gripper-outer-width,var(--spectrum-splitview-vertical-gripper-outer-width));block-size:var(--mod-splitview-handle-width,var(--spectrum-splitview-handle-width));inset-block-start:calc(var(--mod-splitview-vertical-gripper-width,var(--spectrum-splitview-vertical-gripper-width)) - var(--mod-splitview-handle-width,var(--spectrum-splitview-handle-width))/2);inset-inline-start:var(--mod-splitview-vertical-gripper-reset,var(--spectrum-splitview-vertical-gripper-reset))}:host([vertical]) #splitter.is-collapsed-start #gripper{inset-block-start:var(--mod-splitview-vertical-gripper-reset,var(--spectrum-splitview-vertical-gripper-reset))}:host([vertical]) #splitter.is-collapsed-end #gripper{inset-block-start:auto;inset-block-end:var(--mod-splitview-vertical-gripper-reset,var(--spectrum-splitview-vertical-gripper-reset))}@media (forced-colors:active){:host{--highcontrast-splitview-handle-background-color:CanvasText;--highcontrast-splitview-handle-background-color-hover:CanvasText;--highcontrast-splitview-handle-background-color-down:CanvasText;--highcontrast-splitview-handle-background-color-focus:Highlight}}:host{--spectrum-splitview-background-color:var(--system-split-view-background-color);--spectrum-splitview-handle-background-color:var(--system-split-view-handle-background-color);--spectrum-splitview-gripper-border-radius:var(--system-split-view-gripper-border-radius)}:host{--spectrum-split-view-first-pane-size:50%}::slotted(*){overflow:auto}::slotted(:first-child){order:1}:host(:not([vertical])) ::slotted(:first-child:not(:last-child)){width:var(--spectrum-split-view-first-pane-size)}:host([vertical]) ::slotted(:first-child:not(:last-child)){height:var(--spectrum-split-view-first-pane-size)}::slotted(:nth-child(2)){flex:1;order:3}::slotted(:nth-child(n+3)){display:none}#gripper{touch-action:none}#splitter{order:2;height:auto}:host([resizable]) #splitter{cursor:ew-resize;background-clip:content-box}:host([vertical][resizable]) #splitter{cursor:ns-resize;background-clip:content-box}:host([resizable][dir=ltr]) #splitter.is-resized-start,:host([resizable][dir=rtl]) #splitter.is-resized-end{cursor:e-resize}:host([resizable][dir=ltr]) #splitter.is-resized-end,:host([resizable][dir=rtl]) #splitter.is-resized-start{cursor:w-resize}:host([vertical][resizable]) #splitter.is-resized-start{cursor:s-resize}:host([vertical][resizable]) #splitter.is-resized-end{cursor:n-resize}:host([resizable][collapsible]) #splitter.is-resized-start,:host([resizable][collapsible]) #splitter.is-resized-end{cursor:ew-resize}:host([resizable][dir=ltr][collapsible]) #splitter.is-collapsed-start,:host([resizable][dir=rtl][collapsible]) #splitter.is-collapsed-end{cursor:e-resize}:host([resizable][dir=ltr][collapsible]) #splitter.is-collapsed-end,:host([resizable][dir=rtl][collapsible]) #splitter.is-collapsed-start{cursor:w-resize}:host([vertical][resizable][collapsible]) #splitter.is-collapsed-start{cursor:s-resize}:host([vertical][resizable][collapsible]) #splitter.is-collapsed-end{cursor:n-resize}:host([vertical][resizable][collapsible]) #splitter.is-resized-start,:host([vertical][resizable][collapsible]) #splitter.is-resized-end{cursor:ns-resize}
`,__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__decorateClass=(decorators,target,key,kind)=>{for(var decorator,result=kind>1?void 0:kind?__getOwnPropDesc(target,key):target,i=decorators.length-1;i>=0;i--)(decorator=decorators[i])&&(result=(kind?decorator(target,key,result):decorator(result))||result);return kind&&result&&__defProp(target,key,result),result};class SplitView extends index_dev.wG{constructor(){super(),this.vertical=!1,this.resizable=!1,this.collapsible=!1,this.primaryMin=0,this.primaryMax=3840,this.secondaryMin=0,this.secondaryMax=3840,this.firstPaneSize="auto",this.enoughChildren=!1,this.viewSize=0,this.offset=0,this.minPos=0,this.maxPos=3840,this.controlledElIDApplied=!1;const RO=window.ResizeObserver;RO&&(this.observer=new RO(()=>{this.rect=void 0,this.updateMinMax()}))}static get styles(){return[split_view_css]}connectedCallback(){var _a;super.connectedCallback(),null==(_a=this.observer)||_a.observe(this)}disconnectedCallback(){var _a;null==(_a=this.observer)||_a.unobserve(this),super.disconnectedCallback()}get splitterSize(){return this._splitterSize||(this._splitterSize=this.splitter&&Math.round(parseFloat(window.getComputedStyle(this.splitter).getPropertyValue(this.vertical?"height":"width")))||2),this._splitterSize}render(){var _a,_b;const splitterClasses={"is-resized-start":this.splitterPos===this.minPos,"is-resized-end":this.splitterPos&&this.splitterPos>this.splitterSize&&this.splitterPos===this.maxPos,"is-collapsed-start":0===this.splitterPos,"is-collapsed-end":this.splitterPos&&this.splitterPos>=Math.max(this.splitterSize,this.viewSize-this.splitterSize)},label=this.resizable?this.label||"Resize the panels":void 0;return index_dev.qy`
            <slot
                id=${(0,directives_dev.JR)(this.resizable?null==(_a=this.controlledEl)?void 0:_a.id:void 0)}
                @slotchange=${this.onContentSlotChange}
                style="--spectrum-split-view-first-pane-size: ${this.firstPaneSize}"
            ></slot>
            ${this.enoughChildren?index_dev.qy`
                      <div
                          id="splitter"
                          class=${(0,directives_dev.Hk)(splitterClasses)}
                          role="separator"
                          aria-controls=${(0,directives_dev.JR)(this.resizable?null==(_b=this.controlledEl)?void 0:_b.id:void 0)}
                          aria-label=${(0,directives_dev.JR)(label)}
                          aria-orientation=${this.vertical?"horizontal":"vertical"}
                          aria-valuenow=${Math.round(parseFloat(this.firstPaneSize)/this.viewSize*100)}
                          tabindex=${(0,directives_dev.JR)(this.resizable?"0":void 0)}
                          @keydown=${this.onKeydown}
                          ${(0,streaming_listener_dev.b)({start:["pointerdown",this.onPointerdown],streamInside:["pointermove",this.onPointermove],end:[["pointerup","pointercancel","pointerleave"],this.onPointerup]})}
                      >
                          ${this.resizable?index_dev.qy`
                                    <div id="gripper"></div>
                                `:index_dev.s6}
                      </div>
                  `:index_dev.s6}
        `}onContentSlotChange(event){this.controlledEl&&this.controlledElIDApplied&&(this.controlledEl.removeAttribute("id"),this.controlledElIDApplied=!1),this.controlledEl=event.target.assignedElements()[0],this.controlledEl&&!this.controlledEl.id&&(this.controlledEl.id=`${this.tagName.toLowerCase()}-${(0,random_id_dev.l)()}`,this.controlledElIDApplied=!0),this.enoughChildren=this.children.length>1,this.checkResize()}onPointerdown(event){!this.resizable||event.button&&0!==event.button?event.preventDefault():(this.splitter.setPointerCapture(event.pointerId),this.offset=this.getOffset())}onPointermove(event){event.preventDefault();let pos=this.vertical||this.isLTR?this.getPosition(event)-this.offset:this.offset-this.getPosition(event);this.collapsible&&pos<this.minPos-50&&(pos=0),this.collapsible&&pos>this.maxPos+50&&(pos=this.viewSize-this.splitterSize),this.updatePosition(pos)}onPointerup(event){this.splitter.releasePointerCapture(event.pointerId)}getOffset(){this.rect||(this.rect=this.getBoundingClientRect());const offsetX=this.isLTR?this.rect.left:this.rect.right;return this.vertical?this.rect.top:offsetX}getPosition(event){return this.vertical?event.clientY:event.clientX}movePosition(event,offset){event.preventDefault(),void 0!==this.splitterPos&&this.updatePosition(this.splitterPos+offset)}onKeydown(event){if(!this.resizable)return;let direction=0;const isLTRorVertical=this.isLTR||this.vertical;switch(event.key){case"Home":return event.preventDefault(),void this.updatePosition(this.collapsible?0:this.minPos);case"End":return event.preventDefault(),void this.updatePosition(this.collapsible?this.viewSize-this.splitterSize:this.maxPos);case"ArrowLeft":direction=isLTRorVertical?-1:1;break;case"ArrowRight":direction=isLTRorVertical?1:-1;break;case"ArrowUp":case"PageUp":direction=this.vertical?-1:1;break;case"ArrowDown":case"PageDown":direction=this.vertical?1:-1}if(0!==direction){const moveBy=event.key.startsWith("Page")?50:10;this.movePosition(event,moveBy*direction)}}async checkResize(){if(this.enoughChildren&&(this.updateMinMax(),void 0===this.splitterPos)){const startPos=await this.calcStartPos();this.updatePosition(startPos)}}updateMinMax(){this.viewSize=this.vertical?this.offsetHeight:this.offsetWidth,this.minPos=Math.max(this.primaryMin,this.viewSize-this.secondaryMax),this.maxPos=Math.min(this.primaryMax,this.viewSize-Math.max(this.secondaryMin,this.splitterSize))}updatePosition(x){let pos=this.getLimitedPosition(x);this.collapsible&&x<=0&&(pos=0),this.collapsible&&x>this.maxPos&&x>=this.viewSize-this.splitterSize&&(pos=this.viewSize-this.splitterSize),pos!==this.splitterPos&&(this.splitterPos=pos,this.dispatchChangeEvent())}getLimitedPosition(input){return input<=this.minPos?this.minPos:input>=this.maxPos?this.maxPos:Math.max(this.minPos,Math.min(this.maxPos,input))}async calcStartPos(){if(void 0!==this.primarySize&&/^\d+(px)?$/.test(this.primarySize))return parseInt(this.primarySize,10);if(void 0!==this.primarySize&&/^\d+%$/.test(this.primarySize))return parseInt(this.primarySize,10)*this.viewSize/100;if("auto"===this.primarySize){this.firstPaneSize="auto";const firstEl=this.paneSlot.assignedNodes({flatten:!0}).find(node=>node instanceof HTMLElement);if(void 0!==firstEl.updateComplete&&await firstEl.updateComplete,firstEl){const size=window.getComputedStyle(firstEl).getPropertyValue(this.vertical?"height":"width"),size_i=parseFloat(size);if(!isNaN(size_i))return this.getLimitedPosition(Math.ceil(size_i))}}return this.viewSize/2}dispatchChangeEvent(){const changeEvent=new Event("change",{bubbles:!0,composed:!0});this.dispatchEvent(changeEvent)}willUpdate(changed){this.hasUpdated&&!changed.has("primarySize")||(this.splitterPos=void 0,this.checkResize()),changed.has("splitterPos")&&void 0!==this.splitterPos&&this.enoughChildren&&(this.firstPaneSize=`${Math.round(this.splitterPos)}px`)}}__decorateClass([(0,decorators_dev.wk)()],SplitView.prototype,"controlledEl",2),__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],SplitView.prototype,"vertical",2),__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],SplitView.prototype,"resizable",2),__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],SplitView.prototype,"collapsible",2),__decorateClass([(0,decorators_dev.MZ)({type:Number,attribute:"primary-min"})],SplitView.prototype,"primaryMin",2),__decorateClass([(0,decorators_dev.MZ)({type:Number,attribute:"primary-max"})],SplitView.prototype,"primaryMax",2),__decorateClass([(0,decorators_dev.MZ)({type:String,attribute:"primary-size"})],SplitView.prototype,"primarySize",2),__decorateClass([(0,decorators_dev.MZ)({type:Number,attribute:"secondary-min"})],SplitView.prototype,"secondaryMin",2),__decorateClass([(0,decorators_dev.MZ)({type:Number,attribute:"secondary-max"})],SplitView.prototype,"secondaryMax",2),__decorateClass([(0,decorators_dev.MZ)({type:Number,reflect:!0,attribute:"splitter-pos"})],SplitView.prototype,"splitterPos",2),__decorateClass([(0,decorators_dev.MZ)({type:String,attribute:!1})],SplitView.prototype,"firstPaneSize",2),__decorateClass([(0,decorators_dev.MZ)()],SplitView.prototype,"label",2),__decorateClass([(0,decorators_dev.MZ)({type:Boolean,attribute:!1})],SplitView.prototype,"enoughChildren",2),__decorateClass([(0,decorators_dev.MZ)({type:Number})],SplitView.prototype,"viewSize",2),__decorateClass([(0,decorators_dev.P)("slot")],SplitView.prototype,"paneSlot",2),__decorateClass([(0,decorators_dev.P)("#splitter")],SplitView.prototype,"splitter",2),(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-split-view",SplitView);var split_view_stories={title:"Split View",component:"sp-split-view",args:{primarySize:100},argTypes:{primarySize:{name:"primarySize",type:{name:"number",required:!1},description:"Size of the primary panel.",table:{type:{summary:"number"},defaultValue:{summary:void 0}},control:{type:"number"}}}};const Horizontal=args=>index_dev.qy`
        <sp-split-view style="height: 200px" .primarySize="${args.primarySize}">
            <div>First panel</div>
            <div>Second panel</div>
        </sp-split-view>
    `,HorizontalResizable=args=>index_dev.qy`
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
    `,HorizontalResizableCollapsible=args=>index_dev.qy`
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
    `;HorizontalResizableCollapsible.args={primarySize:void 0};const Vertical=args=>index_dev.qy`
        <sp-split-view vertical .primarySize="${args.primarySize}">
            <div>First panel</div>
            <div>Second panel</div>
        </sp-split-view>
    `;Vertical.args={primarySize:void 0};const VerticalResizable=args=>index_dev.qy`
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
    `;VerticalResizable.args={primarySize:void 0};const VerticalResizableCollapsible=args=>index_dev.qy`
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
    `;VerticalResizableCollapsible.args={primarySize:250};const MultipleLevels=args=>index_dev.qy`
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
    `,OnePaneNoSplitter=args=>index_dev.qy`
        <sp-split-view style="height: 200px" .primarySize="${args.primarySize}">
            <div>First panel</div>
        </sp-split-view>
    `,ShowFirstTwoPanes=args=>index_dev.qy`
        <sp-split-view style="height: 200px" .primarySize="${args.primarySize}">
            <div>First panel</div>
            <div>Second panel</div>
            <div>Third (invisible) panel</div>
        </sp-split-view>
    `;ShowFirstTwoPanes.args={primarySize:void 0};const __namedExportsOrder=["Horizontal","HorizontalResizable","HorizontalResizableCollapsible","Vertical","VerticalResizable","VerticalResizableCollapsible","MultipleLevels","OnePaneNoSplitter","ShowFirstTwoPanes"];Horizontal.parameters={...Horizontal.parameters,docs:{...Horizontal.parameters?.docs,source:{originalSource:'args => {\n  return html`\n        <sp-split-view style="height: 200px" .primarySize="${args.primarySize}">\n            <div>First panel</div>\n            <div>Second panel</div>\n        </sp-split-view>\n    `;\n}',...Horizontal.parameters?.docs?.source}}},HorizontalResizable.parameters={...HorizontalResizable.parameters,docs:{...HorizontalResizable.parameters?.docs,source:{originalSource:'args => {\n  return html`\n        <sp-split-view\n            resizable\n            primary-min="50"\n            .primarySize="${args.primarySize}"\n            secondary-min="50"\n        >\n            <div>\n                <h1>First panel</h1>\n                <p>\n                    Lorem Ipsum is simply dummy text of the printing and\n                    typesetting industry.\n                </p>\n            </div>\n            <div>\n                <h2>Second panel</h2>\n                <p>\n                    It is a long established fact that a reader will be\n                    distracted by the readable content of a page when looking at\n                    its layout.\n                </p>\n            </div>\n        </sp-split-view>\n    `;\n}',...HorizontalResizable.parameters?.docs?.source}}},HorizontalResizableCollapsible.parameters={...HorizontalResizableCollapsible.parameters,docs:{...HorizontalResizableCollapsible.parameters?.docs,source:{originalSource:'args => {\n  return html`\n        <sp-split-view\n            resizable\n            collapsible\n            primary-min="50"\n            secondary-min="50"\n            style="height: 500px;"\n            .primarySize="${args.primarySize}"\n        >\n            <div>\n                <h1>First panel</h1>\n                <p>\n                    Lorem Ipsum is simply dummy text of the printing and\n                    typesetting industry. Lorem Ipsum has been the industry\'s\n                    standard dummy text ever since the 1500s, when an unknown\n                    printer took a galley of type and scrambled it to make a\n                    type specimen book. It has survived not only five centuries,\n                    but also the leap into electronic typesetting, remaining\n                    essentially unchanged. It was popularised in the 1960s with\n                    the release of Letraset sheets containing Lorem Ipsum\n                    passages, and more recently with desktop publishing software\n                    like Aldus PageMaker including versions of Lorem Ipsum.\n                </p>\n            </div>\n            <div>\n                <h2>Second panel</h2>\n                <p>\n                    It is a long established fact that a reader will be\n                    distracted by the readable content of a page when looking at\n                    its layout. The point of using Lorem Ipsum is that it has a\n                    more-or-less normal distribution of letters, as opposed to\n                    using \'Content here, content here\', making it look like\n                    readable English. Many desktop publishing packages and web\n                    page editors now use Lorem Ipsum as their default model\n                    text, and a search for \'lorem ipsum\' will uncover many web\n                    sites still in their infancy. Various versions have evolved\n                    over the years, sometimes by accident, sometimes on purpose\n                    (injected humour and the like).\n                </p>\n            </div>\n        </sp-split-view>\n    `;\n}',...HorizontalResizableCollapsible.parameters?.docs?.source}}},Vertical.parameters={...Vertical.parameters,docs:{...Vertical.parameters?.docs,source:{originalSource:'args => {\n  return html`\n        <sp-split-view vertical .primarySize="${args.primarySize}">\n            <div>First panel</div>\n            <div>Second panel</div>\n        </sp-split-view>\n    `;\n}',...Vertical.parameters?.docs?.source}}},VerticalResizable.parameters={...VerticalResizable.parameters,docs:{...VerticalResizable.parameters?.docs,source:{originalSource:'args => {\n  return html`\n        <sp-split-view\n            vertical\n            resizable\n            primary-min="50"\n            primary-max="100"\n            secondary-min="50"\n            style="height: 400px;"\n            .primarySize="${args.primarySize}"\n        >\n            <div>\n                <h1>First panel</h1>\n                <p>\n                    Lorem Ipsum is simply dummy text of the printing and\n                    typesetting industry. Lorem Ipsum has been the industry\'s\n                    standard dummy text ever since the 1500s, when an unknown\n                    printer took a galley of type and scrambled it to make a\n                    type specimen book. It has survived not only five centuries,\n                    but also the leap into electronic typesetting, remaining\n                    essentially unchanged. It was popularised in the 1960s with\n                    the release of Letraset sheets containing Lorem Ipsum\n                    passages, and more recently with desktop publishing software\n                    like Aldus PageMaker including versions of Lorem Ipsum.\n                </p>\n            </div>\n            <div>\n                <h2>Second panel</h2>\n                <p>\n                    It is a long established fact that a reader will be\n                    distracted by the readable content of a page when looking at\n                    its layout. The point of using Lorem Ipsum is that it has a\n                    more-or-less normal distribution of letters, as opposed to\n                    using \'Content here, content here\', making it look like\n                    readable English. Many desktop publishing packages and web\n                    page editors now use Lorem Ipsum as their default model\n                    text, and a search for \'lorem ipsum\' will uncover many web\n                    sites still in their infancy. Various versions have evolved\n                    over the years, sometimes by accident, sometimes on purpose\n                    (injected humour and the like).\n                </p>\n            </div>\n        </sp-split-view>\n    `;\n}',...VerticalResizable.parameters?.docs?.source}}},VerticalResizableCollapsible.parameters={...VerticalResizableCollapsible.parameters,docs:{...VerticalResizableCollapsible.parameters?.docs,source:{originalSource:'args => {\n  return html`\n        <sp-split-view\n            vertical\n            resizable\n            collapsible\n            primary-min="50"\n            secondary-min="40"\n            style="height: 400px;"\n            .primarySize="${args.primarySize}"\n        >\n            <div>\n                <h1>First panel</h1>\n                <p>\n                    Lorem Ipsum is simply dummy text of the printing and\n                    typesetting industry. Lorem Ipsum has been the industry\'s\n                    standard dummy text ever since the 1500s, when an unknown\n                    printer took a galley of type and scrambled it to make a\n                    type specimen book. It has survived not only five centuries,\n                    but also the leap into electronic typesetting, remaining\n                    essentially unchanged. It was popularised in the 1960s with\n                    the release of Letraset sheets containing Lorem Ipsum\n                    passages, and more recently with desktop publishing software\n                    like Aldus PageMaker including versions of Lorem Ipsum.\n                </p>\n            </div>\n            <div>\n                <h2>Second panel</h2>\n                <p>\n                    It is a long established fact that a reader will be\n                    distracted by the readable content of a page when looking at\n                    its layout. The point of using Lorem Ipsum is that it has a\n                    more-or-less normal distribution of letters, as opposed to\n                    using \'Content here, content here\', making it look like\n                    readable English. Many desktop publishing packages and web\n                    page editors now use Lorem Ipsum as their default model\n                    text, and a search for \'lorem ipsum\' will uncover many web\n                    sites still in their infancy. Various versions have evolved\n                    over the years, sometimes by accident, sometimes on purpose\n                    (injected humour and the like).\n                </p>\n            </div>\n        </sp-split-view>\n    `;\n}',...VerticalResizableCollapsible.parameters?.docs?.source}}},MultipleLevels.parameters={...MultipleLevels.parameters,docs:{...MultipleLevels.parameters?.docs,source:{originalSource:'args => {\n  return html`\n        <sp-split-view\n            resizable\n            primary-min="50"\n            primary-max="200"\n            secondary-min="50"\n            style="height: 400px; width: 600px;"\n        >\n            <div>\n                <h1>First panel - Level 1</h1>\n                <p>\n                    Lorem Ipsum is simply dummy text of the printing and\n                    typesetting industry. Lorem Ipsum has been the industry\'s\n                    standard dummy text ever since the 1500s, when an unknown\n                    printer took a galley of type and scrambled it to make a\n                    type specimen book. It has survived not only five centuries,\n                    but also the leap into electronic typesetting, remaining\n                    essentially unchanged. It was popularised in the 1960s with\n                    the release of Letraset sheets containing Lorem Ipsum\n                    passages, and more recently with desktop publishing software\n                    like Aldus PageMaker including versions of Lorem Ipsum.\n                </p>\n            </div>\n            <div>\n                <h2>Second panel - Level 1</h2>\n                <sp-split-view\n                    vertical\n                    resizable\n                    primary-min="50"\n                    .primarySize="${args.primarySize}"\n                    secondary-min="50"\n                    style="height: 300px;"\n                >\n                    <div>\n                        <h3>First panel - Level 2</h3>\n                        <p>\n                            Lorem Ipsum is simply dummy text of the printing and\n                            typesetting industry.\n                        </p>\n                    </div>\n                    <div>\n                        <h4>Second panel - Level 2</h4>\n                        <p>\n                            It is a long established fact that a reader will be\n                            distracted by the readable content of a page when\n                            looking at its layout.\n                        </p>\n                    </div>\n                </sp-split-view>\n            </div>\n        </sp-split-view>\n    `;\n}',...MultipleLevels.parameters?.docs?.source}}},OnePaneNoSplitter.parameters={...OnePaneNoSplitter.parameters,docs:{...OnePaneNoSplitter.parameters?.docs,source:{originalSource:'args => {\n  return html`\n        <sp-split-view style="height: 200px" .primarySize="${args.primarySize}">\n            <div>First panel</div>\n        </sp-split-view>\n    `;\n}',...OnePaneNoSplitter.parameters?.docs?.source}}},ShowFirstTwoPanes.parameters={...ShowFirstTwoPanes.parameters,docs:{...ShowFirstTwoPanes.parameters?.docs,source:{originalSource:'args => {\n  return html`\n        <sp-split-view style="height: 200px" .primarySize="${args.primarySize}">\n            <div>First panel</div>\n            <div>Second panel</div>\n            <div>Third (invisible) panel</div>\n        </sp-split-view>\n    `;\n}',...ShowFirstTwoPanes.parameters?.docs?.source}}}},"./tools/base/src/streaming-listener.dev.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{b:function(){return streamingListener}});var lit__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../node_modules/lit/index.js"),lit_async_directive_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../node_modules/lit/async-directive.js");const defaultListener=["",()=>{}];class StreamingListenerDirective extends lit_async_directive_js__WEBPACK_IMPORTED_MODULE_1__.Kq{constructor(){super(...arguments),this.start=defaultListener,this.streamInside=defaultListener,this.end=defaultListener,this.streamOutside=defaultListener,this.state="off",this.handleStart=event=>{this.clearStream(),this.callHandler(this.start[1],event),event.defaultPrevented||(this.removeListeners(),this.addListeners("on"))},this.handleInside=event=>{this.handleStream(this.streamInside[1],event)},this.handleEnd=event=>{this.clearStream(),this.callHandler(this.end[1],event),this.removeListeners(),this.addListeners("off")},this.handleOutside=event=>{this.handleStream(this.streamOutside[1],event)}}render(_configGroup){return lit__WEBPACK_IMPORTED_MODULE_0__.s6}update(part,[{start:start,end:end,streamInside:streamInside=defaultListener,streamOutside:streamOutside=defaultListener}]){var _a;this.element!==part.element&&(this.element=part.element,this.removeListeners()),this.host=(null==(_a=part.options)?void 0:_a.host)||this.element,this.start=start,this.end=end,this.streamInside=streamInside,this.streamOutside=streamOutside,this.addListeners()}addListeners(state){this.state=state||this.state,"off"===this.state?(this.addListener(this.streamOutside[0],this.handleOutside),this.addListener(this.start[0],this.handleStart)):"on"===this.state&&(this.addListener(this.streamInside[0],this.handleInside),this.addListener(this.end[0],this.handleEnd))}callHandler(value,event){"function"==typeof value?value.call(this.host,event):value.handleEvent(event)}handleStream(value,event){this.stream||(this.callHandler(value,event),this.stream=requestAnimationFrame(()=>{this.stream=void 0}))}clearStream(){null!=this.stream&&(cancelAnimationFrame(this.stream),this.stream=void 0)}addListener(type,fn){Array.isArray(type)?type.map(eventName=>{this.element.addEventListener(eventName,fn)}):this.element.addEventListener(type,fn)}removeListener(type,fn){Array.isArray(type)?type.map(eventName=>{this.element.removeEventListener(eventName,fn)}):this.element.removeEventListener(type,fn)}removeListeners(){this.removeListener(this.start[0],this.handleStart),this.removeListener(this.streamInside[0],this.handleInside),this.removeListener(this.end[0],this.handleEnd),this.removeListener(this.streamOutside[0],this.handleOutside)}disconnected(){this.removeListeners()}reconnected(){this.addListeners()}}const streamingListener=(0,lit_async_directive_js__WEBPACK_IMPORTED_MODULE_1__.u$)(StreamingListenerDirective)}}]);
//# sourceMappingURL=split-view-stories-split-view-stories.7829ccc3.iframe.bundle.js.map