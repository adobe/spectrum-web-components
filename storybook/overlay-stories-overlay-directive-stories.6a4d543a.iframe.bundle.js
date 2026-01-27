/*! For license information please see overlay-stories-overlay-directive-stories.6a4d543a.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunk_spectrum_web_components_1st_gen=self.webpackChunk_spectrum_web_components_1st_gen||[]).push([[2042],{"../node_modules/lit/async-directive.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Kq:function(){return lit_html_async_directive_js__WEBPACK_IMPORTED_MODULE_0__.Kq},u$:function(){return lit_html_async_directive_js__WEBPACK_IMPORTED_MODULE_0__.u$}});var lit_html_async_directive_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../node_modules/lit-html/development/async-directive.js")},"./packages/help-text/src/manage-help-text.dev.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{M:function(){return ManageHelpText}});var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),directives_dev=__webpack_require__("./tools/base/src/directives.dev.js"),condition_attribute_with_id_dev=__webpack_require__("./tools/base/src/condition-attribute-with-id.dev.js"),random_id_dev=__webpack_require__("./tools/shared/src/random-id.dev.js");class HelpTextManager{constructor(host,{mode:mode}={mode:"internal"}){this.mode="internal",this.handleSlotchange=({target:target})=>{this.handleHelpText(target),this.handleNegativeHelpText(target)},this.host=host,this.id=`sp-help-text-${(0,random_id_dev.l)()}`,this.mode=mode}get isInternal(){return"internal"===this.mode}render(negative){return index_dev.qy`
            <div
                id=${(0,directives_dev.JR)(this.isInternal?this.id:void 0)}
                aria-live="assertive"
            >
                <slot
                    name=${negative?"negative-help-text":`pass-through-help-text-${(0,random_id_dev.l)()}`}
                    @slotchange=${this.handleSlotchange}
                >
                    <slot name="help-text"></slot>
                </slot>
            </div>
        `}addId(){const id=this.helpTextElement?this.helpTextElement.id:this.id;this.conditionId=(0,condition_attribute_with_id_dev.$)(this.host,"aria-describedby",id),this.host.hasAttribute("tabindex")&&(this.previousTabindex=parseFloat(this.host.getAttribute("tabindex"))),this.host.tabIndex=0}removeId(){this.conditionId&&(this.conditionId(),delete this.conditionId),this.helpTextElement||(this.previousTabindex?this.host.tabIndex=this.previousTabindex:this.host.removeAttribute("tabindex"))}handleHelpText(target){if(this.isInternal)return;this.helpTextElement&&this.helpTextElement.id===this.id&&this.helpTextElement.removeAttribute("id"),this.removeId();const nextHelpTextElement=target.assignedElements()[0];this.helpTextElement=nextHelpTextElement,nextHelpTextElement&&(nextHelpTextElement.id||(nextHelpTextElement.id=this.id),this.addId())}handleNegativeHelpText(target){if("negative-help-text"!==target.name)return;target.assignedElements().forEach(el=>el.variant="negative")}}function ManageHelpText(constructor,{mode:mode}={mode:"internal"}){return class HelpTextElement extends constructor{constructor(){super(...arguments),this.helpTextManager=new HelpTextManager(this,{mode:mode})}get helpTextId(){return this.helpTextManager.id}renderHelpText(negative){return this.helpTextManager.render(negative)}}}},"./packages/icons-workflow/icons/sp-icon-magnify.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-workflow/src/custom-tag.js"),Magnify=__webpack_require__("./packages/icons-workflow/src/icons/Magnify.js"),Search=__webpack_require__("./packages/icons-workflow/src/icons-s2/Search.js");class IconMagnify extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),1===this.spectrumVersion?(0,Magnify.j)({hidden:!this.label,title:this.label}):(0,Search.W)({hidden:!this.label,title:this.label})}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon-magnify",IconMagnify)},"./packages/icons-workflow/icons/sp-icon-open-in.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");var OpenIn=__webpack_require__("./packages/icons-workflow/src/icons/OpenIn.js");class IconOpenIn extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),2===this.spectrumVersion?(({width:e=24,height:t=24,hidden:l=!1,title:r="Open In"}={})=>custom_tag.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${e}"
    height="${t}"
    viewBox="0 0 20 20"
    aria-hidden=${l?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${r}"
  >
    <path
      d="m18,15.75V4.25c0-1.24072-1.00928-2.25-2.25-2.25H4.25c-1.24072,0-2.25,1.00928-2.25,2.25v3.71777c0,.41406.33594.75.75.75s.75-.33594.75-.75v-3.71777c0-.41357.33643-.75.75-.75h11.5c.41357,0,.75.33643.75.75v11.5c0,.41357-.33643.75-.75.75h-3.81104c-.41406,0-.75.33594-.75.75s.33594.75.75.75h3.81104c1.24072,0,2.25-1.00928,2.25-2.25Z"
      fill="currentColor"
    />
    <path
      d="m11,9.75v4.24268c0,.41406-.33594.75-.75.75s-.75-.33594-.75-.75v-2.43213l-6.46973,6.46973c-.14648.14648-.33838.21973-.53027.21973s-.38379-.07324-.53027-.21973c-.29297-.29297-.29297-.76758,0-1.06055l6.46973-6.46973h-2.43213c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h4.24268c.41406,0,.75.33594.75.75Z"
      fill="currentColor"
    />
  </svg>`)({hidden:!this.label,title:this.label}):(0,OpenIn.F)({hidden:!this.label,title:this.label})}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon-open-in",IconOpenIn)},"./packages/icons-workflow/src/icons-s2/Search.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{W:function(){return SearchIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const SearchIcon=({width:e=24,height:t=24,hidden:r=!1,title:l="Search"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${e}"
    height="${t}"
    viewBox="0 0 20 20"
    aria-hidden=${r?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${l}"
  >
    <path
      d="m18.53027,17.46973l-5.08325-5.08325c.96936-1.20142,1.55298-2.72644,1.55298-4.38647,0-3.85938-3.14062-7-7-7S1,4.14062,1,8s3.14062,7,7,7c1.66003,0,3.18506-.58362,4.38647-1.55298l5.08325,5.08325c.14648.14648.33789.21973.53027.21973s.38379-.07324.53027-.21973c.29297-.29297.29297-.76758,0-1.06055Zm-10.53027-3.96973c-3.03223,0-5.5-2.46777-5.5-5.5s2.46777-5.5,5.5-5.5,5.5,2.46777,5.5,5.5-2.46777,5.5-5.5,5.5Z"
      fill="currentColor"
    />
  </svg>`},"./packages/icons-workflow/src/icons/Magnify.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{j:function(){return MagnifyIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const MagnifyIcon=({width:t=24,height:e=24,hidden:a=!1,title:l="Magnify"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    height="${e}"
    viewBox="0 0 36 36"
    width="${t}"
    aria-hidden=${a?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${l}"
  >
    <path
      d="M33.173 30.215 25.4 22.443a12.826 12.826 0 1 0-2.957 2.957l7.772 7.772a2.1 2.1 0 0 0 2.958-2.958ZM6 15a9 9 0 1 1 9 9 9 9 0 0 1-9-9Z"
    />
  </svg>`},"./packages/icons-workflow/src/icons/OpenIn.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{F:function(){return OpenInIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const OpenInIcon=({width:a=24,height:e=24,hidden:t=!1,title:l="Open In"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${a}"
    height="${e}"
    viewBox="0 0 36 36"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${l}"
  >
    <path
      d="M33 2H3a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V6h24v24H19a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z"
    />
    <path
      d="M18.636 27.764a.784.784 0 0 0 .56.236.803.803 0 0 0 .804-.754v-10.75a.497.497 0 0 0-.496-.496H8.754a.803.803 0 0 0-.754.804.785.785 0 0 0 .235.56l3.786 3.786-9.042 9.042a1 1 0 0 0 0 1.415l1.414 1.414a1 1 0 0 0 1.414 0l9.043-9.042Z"
    />
  </svg>`},"./packages/overlay/stories/overlay-directive.stories.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:function(){return Default},__namedExportsOrder:function(){return __namedExportsOrder},configured:function(){return configured},default:function(){return overlay_directive_stories},insertionOptions:function(){return insertionOptions},managedOverlayTrigger:function(){return managedOverlayTrigger}});var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),overlay_trigger_directive_dev=(__webpack_require__("./packages/action-button/sp-action-button.dev.js"),__webpack_require__("./packages/action-group/sp-action-group.dev.js"),__webpack_require__("./packages/button/sp-button.dev.js"),__webpack_require__("./packages/dialog/sp-dialog-wrapper.dev.js"),__webpack_require__("./packages/field-label/sp-field-label.dev.js"),__webpack_require__("./packages/icons-workflow/icons/sp-icon-magnify.js"),__webpack_require__("./packages/icons-workflow/icons/sp-icon-open-in.js"),__webpack_require__("./packages/overlay/overlay-trigger.dev.js"),__webpack_require__("./packages/overlay/src/overlay-trigger-directive.dev.js")),tooltip_directive_dev=(__webpack_require__("./packages/dialog/sp-dialog.dev.js"),__webpack_require__("./packages/picker/sp-picker.dev.js"),__webpack_require__("./packages/menu/sp-menu.dev.js"),__webpack_require__("./packages/menu/sp-menu-item.dev.js"),__webpack_require__("./packages/menu/sp-menu-divider.dev.js"),__webpack_require__("./packages/popover/sp-popover.dev.js"),__webpack_require__("./packages/slider/sp-slider.dev.js"),__webpack_require__("./packages/switch/sp-switch.dev.js"),__webpack_require__("./packages/radio/sp-radio.dev.js"),__webpack_require__("./packages/radio/sp-radio-group.dev.js"),__webpack_require__("./packages/tooltip/sp-tooltip.dev.js"),__webpack_require__("./tools/theme/sp-theme.dev.js"),__webpack_require__("./tools/theme/src/themes.dev.js"),__webpack_require__("./packages/accordion/sp-accordion.dev.js"),__webpack_require__("./packages/accordion/sp-accordion-item.dev.js"),__webpack_require__("./packages/overlay/stories/overlay-story-components.js"),__webpack_require__("./packages/tooltip/src/tooltip-directive.dev.js")),directives_dev=__webpack_require__("./tools/base/src/directives.dev.js"),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js"),lit_html=__webpack_require__("../node_modules/lit-html/development/lit-html.js"),directive=__webpack_require__("../node_modules/lit-html/development/directive.js"),directive_helpers=__webpack_require__("../node_modules/lit-html/development/directive-helpers.js");const getStringsFromTemplateResult=result=>(0,directive_helpers.ps)(result)?result._$litType$.h:result.strings;class CacheDirective extends directive.WL{constructor(partInfo){super(partInfo),this._templateCache=new WeakMap}render(v){return[v]}update(containerPart,[v]){const _valueKey=(0,directive_helpers.qb)(this._value)?getStringsFromTemplateResult(this._value):null,vKey=(0,directive_helpers.qb)(v)?getStringsFromTemplateResult(v):null;if(null!==_valueKey&&(null===vKey||_valueKey!==vKey)){const childPart=(0,directive_helpers.cN)(containerPart).pop();let cachedContainerPart=this._templateCache.get(_valueKey);if(void 0===cachedContainerPart){const fragment=document.createDocumentFragment();cachedContainerPart=(0,lit_html.XX)(lit_html.s6,fragment),cachedContainerPart.setConnected(!1),this._templateCache.set(_valueKey,cachedContainerPart)}(0,directive_helpers.mY)(cachedContainerPart,[childPart]),(0,directive_helpers.Dx)(cachedContainerPart,void 0,childPart)}if(null!==vKey){if(null===_valueKey||_valueKey!==vKey){const cachedContainerPart=this._templateCache.get(vKey);if(void 0!==cachedContainerPart){const cachedPart=(0,directive_helpers.cN)(cachedContainerPart).pop();(0,directive_helpers.Jz)(containerPart),(0,directive_helpers.Dx)(containerPart,void 0,cachedPart),(0,directive_helpers.mY)(containerPart,[cachedPart])}}this._value=v}else this._value=void 0;return this.render(v)}}const cache=(0,directive.u$)(CacheDirective);var __defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__decorateClass=(decorators,target,key,kind)=>{for(var decorator,result=kind>1?void 0:kind?__getOwnPropDesc(target,key):target,i=decorators.length-1;i>=0;i--)(decorator=decorators[i])&&(result=(kind?decorator(target,key,result):decorator(result))||result);return kind&&result&&__defProp(target,key,result),result};const storyStyles=index_dev.qy`
    <style>
        html,
        body,
        #root,
        #root-inner,
        sp-story-decorator {
            height: 100%;
            margin: 0;
        }

        sp-story-decorator::part(container) {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            align-items: center;
            justify-content: center;
        }

        overlay-trigger {
            flex: none;
        }

        #styled-div {
            background-color: var(--styled-div-background-color, blue);
            color: white;
            padding: 4px 10px;
            margin-bottom: 10px;
        }

        #inner-trigger {
            display: inline-block;
        }
    </style>
`;var overlay_directive_stories={title:"Overlay Directive",argTypes:{offset:{control:"number"},placement:{control:{type:"inline-radio",options:["top","top-start","top-end","bottom","bottom-start","bottom-end","left","left-start","left-end","right","right-start","right-end","auto","auto-start","auto-end","none"]}},type:{control:{type:"inline-radio",options:["modal","replace","inline"]}},colorStop:{control:{type:"inline-radio",options:["light","dark"]}},open:{name:"open",type:{name:"boolean",required:!1},description:"Whether the second accordion item is open.",table:{type:{summary:"boolean"},defaultValue:{summary:!1}},control:{type:"boolean"}}},args:{placement:"bottom",offset:0,colorStop:"light",triggerOn:"click",open:!1}};const template=({placement:placement,offset:offset,open:open,triggerOn:triggerOn,insertionOptions:insertionOptions2})=>index_dev.qy`
        ${storyStyles}
        <sp-button
            variant="primary"
            ${(0,tooltip_directive_dev.Y)(()=>index_dev.qy`
        Click to open a popover.
    `)}
            ${(0,overlay_trigger_directive_dev.h)(()=>index_dev.qy`
        <sp-popover placement="${(0,directives_dev.JR)(placement)}" tip>
            <sp-dialog no-divider>
                <div class="options-popover-content">
                    <sp-slider
                        value="5"
                        step="0.5"
                        min="0"
                        max="20"
                        label="Awesomeness"
                    ></sp-slider>
                    <div id="styled-div">
                        The background of this div should be blue
                    </div>
                    <sp-button
                        ${(0,tooltip_directive_dev.Y)(()=>index_dev.qy`
                                Click to open another popover.
                            `)}
                        ${(0,overlay_trigger_directive_dev.h)(()=>index_dev.qy`
                                <sp-popover placement="bottom" tip open>
                                    <sp-dialog size="s" no-divider>
                                        <div class="options-popover-content">
                                            Another Popover
                                        </div>
                                    </sp-dialog>
                                </sp-popover>
                            `,{triggerInteraction:"click",overlayOptions:{placement:"bottom"}})}
                    >
                        Press Me
                    </sp-button>
                </div>
            </sp-dialog>
        </sp-popover>
    `,{open:open,triggerInteraction:triggerOn,overlayOptions:{placement:placement,offset:offset},insertionOptions:insertionOptions2})}
        >
            Show Popover
        </sp-button>
    `,Default=({open:open}={})=>{const options=void 0!==open?{open:open}:void 0;return index_dev.qy`
        <sp-button ${(0,overlay_trigger_directive_dev.h)(()=>index_dev.qy`
        <sp-popover>
            <sp-dialog no-divider>Popover content goes here</sp-dialog>
        </sp-popover>
    `,options)}>Open Popover</sp-button>
    `};Default.swc_vrt={skip:!0},Default.parameters={chromatic:{disableSnapshot:!0}};const configured=args=>template(args);configured.swc_vrt={skip:!0},configured.parameters={chromatic:{disableSnapshot:!0}};const insertionOptions=(args={})=>index_dev.qy`
    ${template(args)}
    <div id="other-element"></div>
`;insertionOptions.args={insertionOptions:{el:()=>document.querySelector("#other-element"),where:"afterbegin"}},insertionOptions.swc_vrt={skip:!0},insertionOptions.parameters={chromatic:{disableSnapshot:!0}};class ManagedOverlayTrigger extends index_dev.WF{constructor(){super(...arguments),this.quickActionsEnabled=!1,this.isMenuOpen=!1}render(){return index_dev.qy`
            <div
                style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;"
            >
                <sp-field-label for="quick-actions-toggle">
                    Enable quick actions toolbar
                </sp-field-label>
                <sp-switch
                    id="quick-actions-toggle"
                    ?checked=${this.quickActionsEnabled}
                    @change=${()=>{this.quickActionsEnabled=!this.quickActionsEnabled}}
                >
                    ${this.quickActionsEnabled?"Enabled":"Disabled"}
                </sp-switch>

                <p
                    style="max-width: 600px; color: var(--spectrum-neutral-content-color-default); font-size: 14px; margin: 0;"
                >
                    The quick actions button below is wrapped with Lit's
                    <code>cache()</code>
                    directive, which preserves the DOM and component state when
                    toggled off instead of destroying it. This tests that the
                    overlay trigger properly handles reconnection without
                    errors.
                </p>

                ${cache(this.quickActionsEnabled?this.renderQuickActionsButton():index_dev.qy``)}
            </div>
        `}renderQuickActionsButton(){return index_dev.qy`
            <sp-action-button
                ?selected=${this.isMenuOpen}
                ${(0,overlay_trigger_directive_dev.h)(()=>index_dev.qy`
                        <sp-popover
                            @sp-opened=${event=>{event.target===event.currentTarget&&(this.isMenuOpen=!0)}}
                            @sp-closed=${event=>{event.target===event.currentTarget&&(this.isMenuOpen=!1)}}
                        >
                            <sp-menu>
                                <sp-menu-item>Copy</sp-menu-item>
                                <sp-menu-item>Paste</sp-menu-item>
                                <sp-menu-divider></sp-menu-divider>
                                <sp-menu-item>Delete</sp-menu-item>
                            </sp-menu>
                        </sp-popover>
                    `,{triggerInteraction:"click",overlayOptions:{placement:"bottom-end"},open:this.isMenuOpen})}
            >
                Quick Actions
            </sp-action-button>
        `}}__decorateClass([(0,decorators_dev.wk)()],ManagedOverlayTrigger.prototype,"quickActionsEnabled",2),__decorateClass([(0,decorators_dev.wk)()],ManagedOverlayTrigger.prototype,"isMenuOpen",2),customElements.define("managed-overlay-trigger",ManagedOverlayTrigger);const managedOverlayTrigger=()=>index_dev.qy`
    <managed-overlay-trigger></managed-overlay-trigger>
`;managedOverlayTrigger.swc_vrt={skip:!0},managedOverlayTrigger.parameters={chromatic:{disableSnapshot:!0}};const __namedExportsOrder=["Default","configured","insertionOptions","managedOverlayTrigger"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'({\n  open\n} = {}) => {\n  const renderPopover = () => html`\n        <sp-popover>\n            <sp-dialog no-divider>Popover content goes here</sp-dialog>\n        </sp-popover>\n    `;\n  const options = typeof open !== "undefined" ? {\n    open\n  } : void 0;\n  return html`\n        <sp-button ${trigger(renderPopover, options)}>Open Popover</sp-button>\n    `;\n}',...Default.parameters?.docs?.source}}},configured.parameters={...configured.parameters,docs:{...configured.parameters?.docs,source:{originalSource:"args => template(args)",...configured.parameters?.docs?.source}}},insertionOptions.parameters={...insertionOptions.parameters,docs:{...insertionOptions.parameters?.docs,source:{originalSource:'(args = {}) => html`\n    ${template(args)}\n    <div id="other-element"></div>\n`',...insertionOptions.parameters?.docs?.source}}},managedOverlayTrigger.parameters={...managedOverlayTrigger.parameters,docs:{...managedOverlayTrigger.parameters?.docs,source:{originalSource:"() => html`\n    <managed-overlay-trigger></managed-overlay-trigger>\n`",...managedOverlayTrigger.parameters?.docs?.source}}}},"./packages/tooltip/src/tooltip-directive.dev.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Y:function(){return tooltip}});var _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./tools/base/src/index.dev.js"),_spectrum_web_components_base_src_directives_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./tools/base/src/directives.dev.js"),_spectrum_web_components_overlay_src_overlay_trigger_directive_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/overlay/src/overlay-trigger-directive.dev.js");const tooltip=function tooltip2(tooltipContent,options){return(0,_spectrum_web_components_overlay_src_overlay_trigger_directive_js__WEBPACK_IMPORTED_MODULE_2__.h)(()=>(__webpack_require__.e(4987).then(__webpack_require__.bind(__webpack_require__,"./packages/tooltip/sp-tooltip.dev.js")),_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
                <sp-tooltip variant=${(0,_spectrum_web_components_base_src_directives_js__WEBPACK_IMPORTED_MODULE_1__.JR)(null==options?void 0:options.variant)}>
                    ${tooltipContent()}
                </sp-tooltip>
            `),{...options,triggerInteraction:"hover",overlayOptions:{type:"hint",...null==options?void 0:options.overlayOptions}})}}}]);
//# sourceMappingURL=overlay-stories-overlay-directive-stories.6a4d543a.iframe.bundle.js.map