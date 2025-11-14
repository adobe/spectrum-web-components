"use strict";(self.webpackChunk_spectrum_web_components_1st_gen=self.webpackChunk_spectrum_web_components_1st_gen||[]).push([[6787],{"./packages/tabs/sp-tab-panel.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js"),random_id_dev=__webpack_require__("./tools/shared/src/random-id.dev.js");var tab_panel_css=index_dev.AH`
    :host{display:inline-flex}:host(:not([selected])){display:none}
`,__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__decorateClass=(decorators,target,key,kind)=>{for(var decorator,result=kind>1?void 0:kind?__getOwnPropDesc(target,key):target,i=decorators.length-1;i>=0;i--)(decorator=decorators[i])&&(result=(kind?decorator(target,key,result):decorator(result))||result);return kind&&result&&__defProp(target,key,result),result};class TabPanel extends index_dev.wG{constructor(){super(...arguments),this.selected=!1,this.value=""}handleFocusin(){this.removeAttribute("tabindex")}handleFocusout(){this.tabIndex=this.selected?0:-1}render(){return index_dev.qy`
            <slot
                @focusin=${this.handleFocusin}
                @focusout=${this.handleFocusout}
            ></slot>
        `}firstUpdated(){this.slot="tab-panel",this.setAttribute("role","tabpanel"),this.tabIndex=0,this.hasAttribute("id")||(this.id=`sp-tab-panel-${(0,random_id_dev.l)()}`)}updated(changes){changes.has("selected")&&(this.selected?(this.removeAttribute("aria-hidden"),this.tabIndex=0):(this.setAttribute("aria-hidden","true"),this.tabIndex=-1))}}TabPanel.styles=[tab_panel_css],__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],TabPanel.prototype,"selected",2),__decorateClass([(0,decorators_dev.MZ)({type:String,reflect:!0})],TabPanel.prototype,"value",2),(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-tab-panel",TabPanel)},"./packages/tabs/sp-tab.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js"),focus_visible_dev=__webpack_require__("./tools/shared/src/focus-visible.dev.js"),observe_slot_presence_dev=__webpack_require__("./tools/shared/src/observe-slot-presence.dev.js"),observe_slot_text_dev=__webpack_require__("./tools/shared/src/observe-slot-text.dev.js"),random_id_dev=__webpack_require__("./tools/shared/src/random-id.dev.js"),tab_css=__webpack_require__("./packages/tabs/src/tab.css.js"),__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__decorateClass=(decorators,target,key,kind)=>{for(var decorator,result=kind>1?void 0:kind?__getOwnPropDesc(target,key):target,i=decorators.length-1;i>=0;i--)(decorator=decorators[i])&&(result=(kind?decorator(target,key,result):decorator(result))||result);return kind&&result&&__defProp(target,key,result),result};class Tab extends((0,focus_visible_dev.p)((0,observe_slot_text_dev.O)((0,observe_slot_presence_dev.e)(index_dev.wG,'[slot="icon"]'),""))){constructor(){super(...arguments),this.disabled=!1,this.label="",this.selected=!1,this.vertical=!1,this.value=""}static get styles(){return[tab_css.A]}get hasIcon(){return this.slotContentIsPresent}get hasLabel(){return!!this.label||this.slotHasContent}render(){return index_dev.qy`
            ${this.hasIcon?index_dev.qy`
                      <slot name="icon"></slot>
                  `:index_dev.s6}
            <label id="item-label" ?hidden=${!this.hasLabel}>
                ${this.slotHasContent?index_dev.s6:this.label}
                <slot>${this.label}</slot>
            </label>
        `}firstUpdated(changes){super.firstUpdated(changes),this.setAttribute("role","tab"),this.hasAttribute("id")||(this.id=`sp-tab-${(0,random_id_dev.l)()}`)}updated(changes){super.updated(changes),changes.has("selected")&&(this.setAttribute("aria-selected",this.selected?"true":"false"),this.setAttribute("tabindex",this.selected?"0":"-1")),changes.has("disabled")&&(this.disabled?this.setAttribute("aria-disabled","true"):this.removeAttribute("aria-disabled"))}}__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],Tab.prototype,"disabled",2),__decorateClass([(0,decorators_dev.MZ)({reflect:!0})],Tab.prototype,"label",2),__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],Tab.prototype,"selected",2),__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],Tab.prototype,"vertical",2),__decorateClass([(0,decorators_dev.MZ)({type:String,reflect:!0})],Tab.prototype,"value",2),(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-tab",Tab)},"./packages/tabs/sp-tabs.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var _src_Tabs_dev_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/tabs/src/Tabs.dev.js");(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-tabs",_src_Tabs_dev_js__WEBPACK_IMPORTED_MODULE_0__.tU)},"./packages/tabs/stories/index.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{f:function(){return renderTabsOverflowExample}});__webpack_require__("./packages/tabs/sp-tab.dev.js"),__webpack_require__("./packages/tabs/sp-tabs.dev.js"),__webpack_require__("./packages/tabs/sp-tab-panel.dev.js");var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js"),directives_dev=__webpack_require__("./tools/base/src/directives.dev.js"),resize_controller=__webpack_require__("../node_modules/@lit-labs/observers/development/resize-controller.js"),spectrum_icon_chevron_css=(__webpack_require__("./packages/action-button/sp-action-button.dev.js"),__webpack_require__("./packages/icons-ui/icons/sp-icon-chevron100.js"),__webpack_require__("./packages/icon/src/spectrum-icon-chevron.css.js")),tabs_sizes_css=__webpack_require__("./packages/tabs/src/tabs-sizes.css.js");var tabs_overflow_css=index_dev.AH`
    :host{--sp-tabs-overflow-next-button-right:calc(-1*var(--spectrum-component-edge-to-text-100));--sp-tabs-overflow-previous-button-left:calc(-1*var(--spectrum-component-edge-to-text-100));--sp-tabs-overflow-button-height:calc(var(--spectrum-tab-item-height-medium) - var(--spectrum-border-width-200));--sp-tabs-overflow-button-size:var(--spectrum-tab-item-height-medium);--sp-tabs-overflow-icon-color:var(--spectrum-gray-800);--sp-tabs-overflow-shadow-color:var(--spectrum-gray-100);--sp-tabs-overflow-shadow-width:50px;--mod-actionbutton-icon-size:var(--spectrum-workflow-icon-size-100);width:100%;inset:0}:host([size=s]){--sp-tabs-overflow-button-height:calc(var(--spectrum-tab-item-height-small) - var(--spectrum-border-width-200));--sp-tabs-overflow-button-size:var(--spectrum-tab-item-height-small);--mod-actionbutton-icon-size:var(--spectrum-workflow-icon-size-75)}:host([size=l]){--sp-tabs-overflow-button-height:calc(var(--spectrum-tab-item-height-large) - var(--spectrum-border-width-200));--sp-tabs-overflow-button-size:var(--spectrum-tab-item-height-large);--mod-actionbutton-icon-size:var(--spectrum-workflow-icon-size-200)}:host([size=xl]){--sp-tabs-overflow-button-height:calc(var(--spectrum-tab-item-height-extra-large) - var(--spectrum-border-width-200));--sp-tabs-overflow-button-size:var(--spectrum-tab-item-height-extra-large);--mod-actionbutton-icon-size:var(--spectrum-workflow-icon-size-300)}:host([compact]){--sp-tabs-overflow-button-height:calc(var(--spectrum-tab-item-compact-height-medium) - var(--spectrum-border-width-200));--mod-actionbutton-icon-size:var(--spectrum-workflow-icon-size-50)}sp-action-button{width:var(--sp-tabs-overflow-button-size);height:var(--sp-tabs-overflow-button-height);z-index:2;text-align:center;box-shadow:none;color:var(--sp-tabs-overflow-icon-color);background:0 0;border:none;position:absolute}sp-action-button.left-scroll{visibility:hidden;left:var(--sp-tabs-overflow-previous-button-left)}sp-action-button.right-scroll{visibility:hidden;right:var(--sp-tabs-overflow-next-button-right)}sp-action-button.left-scroll.show,sp-action-button.right-scroll.show{visibility:visible}.tabs-overflow-container{position:relative}.tabs-overflow-container:before,.tabs-overflow-container:after{content:"";visibility:hidden;z-index:1;height:var(--sp-tabs-overflow-button-height);width:var(--sp-tabs-overflow-shadow-width);pointer-events:none;position:absolute;inset-block-start:0}.tabs-overflow-container:before{background:transparent linear-gradient(270deg,transparent,var(--sp-tabs-overflow-shadow-color))0 0 no-repeat padding-box;left:0}.tabs-overflow-container:after{background:transparent linear-gradient(90deg,transparent,var(--sp-tabs-overflow-shadow-color))0 0 no-repeat padding-box;right:0}.tabs-overflow-container.left-shadow:before,.tabs-overflow-container.right-shadow:after{visibility:visible}
`,__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__decorateClass=(decorators,target,key,kind)=>{for(var decorator,result=kind>1?void 0:kind?__getOwnPropDesc(target,key):target,i=decorators.length-1;i>=0;i--)(decorator=decorators[i])&&(result=(kind?decorator(target,key,result):decorator(result))||result);return kind&&result&&__defProp(target,key,result),result};class TabsOverflow extends((0,index_dev.ZG)(index_dev.wG)){constructor(){super(),this.compact=!1,this.labelPrevious="Scroll to previous tabs",this.labelNext="Scroll to next tabs",this.overflowState={canScrollLeft:!1,canScrollRight:!1},this.scrollFactor=.5,this.resizeController=new resize_controller.P(this,{target:this,callback:()=>{this._updateScrollState()}})}static get styles(){return[tabs_overflow_css,tabs_sizes_css.A,spectrum_icon_chevron_css.A]}get scrollContent(){return this.tabs}firstUpdated(changes){super.firstUpdated(changes);const[tabs]=this.scrollContent;tabs&&(tabs.enableTabsScroll=!0),this.resizeController.observe(this.overflowContainer)}async _handleSlotChange(){const[tabsElement]=this.scrollContent;await(null==tabsElement?void 0:tabsElement.updateComplete),this._updateScrollState()}_updateScrollState(){const{scrollContent:scrollContent,overflowState:overflowState}=this;if(scrollContent){const[tabsElement]=this.scrollContent,{canScrollLeft:canScrollLeft,canScrollRight:canScrollRight}=(null==tabsElement?void 0:tabsElement.scrollState)||{canScrollLeft:!1,canScrollRight:!1};this.overflowState={...overflowState,canScrollLeft:canScrollLeft,canScrollRight:canScrollRight}}}_handleScrollClick(event){const currentTarget=event.currentTarget,[tabsElement]=this.scrollContent,dist=tabsElement.clientWidth*this.scrollFactor,left=currentTarget.classList.contains("left-scroll")?-dist:dist;tabsElement.scrollTabs(left,"smooth")}updated(changedProperties){super.updated(changedProperties),changedProperties.has("dir")&&this._updateScrollState()}render(){const{canScrollRight:canScrollRight,canScrollLeft:canScrollLeft}=this.overflowState,ariaLabelPrevious=this.labelPrevious,ariaLabelNext=this.labelNext;return index_dev.qy`
            <div
                class=${(0,directives_dev.Hk)({"tabs-overflow-container":!0,"left-shadow":canScrollLeft,"right-shadow":canScrollRight})}
            >
                <sp-action-button
                    class=${(0,directives_dev.Hk)({"left-scroll":!0,show:canScrollLeft})}
                    aria-label=${ariaLabelPrevious}
                    quiet
                    dir="rtl"
                    tabindex="-1"
                    @click=${this._handleScrollClick}
                >
                    <sp-icon-chevron100
                        slot="icon"
                        class="spectrum-UIIcon-ChevronLeft300"
                    ></sp-icon-chevron100>
                </sp-action-button>
                <sp-action-button
                    class=${(0,directives_dev.Hk)({"right-scroll":!0,show:canScrollRight})}
                    aria-label=${ariaLabelNext}
                    quiet
                    tabindex="-1"
                    @click=${this._handleScrollClick}
                >
                    <sp-icon-chevron100
                        slot="icon"
                        class="spectrum-UIIcon-ChevronRight300"
                    ></sp-icon-chevron100>
                </sp-action-button>
                <slot
                    @slotchange=${this._handleSlotChange}
                    @sp-tabs-scroll=${this._updateScrollState}
                ></slot>
            </div>
        `}}__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],TabsOverflow.prototype,"compact",2),__decorateClass([(0,decorators_dev.MZ)({type:String,attribute:"label-previous"})],TabsOverflow.prototype,"labelPrevious",2),__decorateClass([(0,decorators_dev.MZ)({type:String,attribute:"label-next"})],TabsOverflow.prototype,"labelNext",2),__decorateClass([(0,decorators_dev.MZ)({reflect:!0})],TabsOverflow.prototype,"dir",2),__decorateClass([(0,decorators_dev.wk)()],TabsOverflow.prototype,"overflowState",2),__decorateClass([(0,decorators_dev.KN)({selector:"sp-tabs",flatten:!0})],TabsOverflow.prototype,"tabs",2),__decorateClass([(0,decorators_dev.P)(".tabs-overflow-container")],TabsOverflow.prototype,"overflowContainer",2),(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-tabs-overflow",TabsOverflow);const renderTabsOverflowExample=({selected:selected=1,count:count=20,size:size="m",includeTabPanel:includeTabPanel,compact:compact})=>index_dev.qy`
        <style>
            .container {
                width: 100%;
                height: 150px;
                border: 4px solid gray;
                resize: both;
            }
        </style>
        <div class="container">
            <sp-tabs-overflow size=${size} ?compact=${compact}>
                <sp-tabs size=${size} selected=${selected} ?compact=${compact}>
                    ${(0,directives_dev.ux)(new Array(count),item=>item,(_item,index)=>index_dev.qy`
                            <sp-tab
                                label=${`Tab Item ${index+1}`}
                                value=${index+1}
                            ></sp-tab>
                        `)}
                    ${includeTabPanel?index_dev.qy`
                              ${(0,directives_dev.ux)(new Array(count),item=>item,(_item,index)=>index_dev.qy`
                                      <sp-tab-panel value=${index+1}>
                                          Content for Tab Item ${index+1}
                                      </sp-tab-panel>
                                  `)}
                          `:index_dev.s6}
                </sp-tabs>
            </sp-tabs-overflow>
        </div>
    `},"./packages/tabs/stories/tabs-overflow.stories.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:function(){return __namedExportsOrder},autoscroll:function(){return autoscroll},autoscrollOnlyHorizontally:function(){return autoscrollOnlyHorizontally},compact:function(){return compact}});var _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./tools/base/src/index.dev.js"),_index_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/tabs/stories/index.js");__webpack_exports__.default={title:"Tabs Overflow",component:"sp-tabs-overflow"};const compact=args=>(0,_index_js__WEBPACK_IMPORTED_MODULE_1__.f)(args);compact.args={compact:!0};const autoscroll=args=>(0,_index_js__WEBPACK_IMPORTED_MODULE_1__.f)(args);autoscroll.args={selected:15};const autoscrollOnlyHorizontally=args=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <style>
            .container {
                height: 500px;
                overflow-y: scroll;
            }
        </style>
        <div class="container">
            <div style="height: 500px">There are some tabs down here!</div>
            ${(0,_index_js__WEBPACK_IMPORTED_MODULE_1__.f)(args)}
        </div>
    `;autoscrollOnlyHorizontally.args={selected:15};const __namedExportsOrder=["compact","autoscroll","autoscrollOnlyHorizontally"];compact.parameters={...compact.parameters,docs:{...compact.parameters?.docs,source:{originalSource:"args => {\n  return renderTabsOverflowExample(args);\n}",...compact.parameters?.docs?.source}}},autoscroll.parameters={...autoscroll.parameters,docs:{...autoscroll.parameters?.docs,source:{originalSource:"args => {\n  return renderTabsOverflowExample(args);\n}",...autoscroll.parameters?.docs?.source}}},autoscrollOnlyHorizontally.parameters={...autoscrollOnlyHorizontally.parameters,docs:{...autoscrollOnlyHorizontally.parameters?.docs,source:{originalSource:'args => {\n  return html`\n        <style>\n            .container {\n                height: 500px;\n                overflow-y: scroll;\n            }\n        </style>\n        <div class="container">\n            <div style="height: 500px">There are some tabs down here!</div>\n            ${renderTabsOverflowExample(args)}\n        </div>\n    `;\n}',...autoscrollOnlyHorizontally.parameters?.docs?.source}}}}}]);
//# sourceMappingURL=tabs-stories-tabs-overflow-stories.40e7b892.iframe.bundle.js.map