"use strict";(self.webpackChunk_spectrum_web_components_1st_gen=self.webpackChunk_spectrum_web_components_1st_gen||[]).push([[4222],{"../node_modules/lit/async-directive.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Kq:function(){return lit_html_async_directive_js__WEBPACK_IMPORTED_MODULE_0__.Kq},u$:function(){return lit_html_async_directive_js__WEBPACK_IMPORTED_MODULE_0__.u$}});var lit_html_async_directive_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../node_modules/lit-html/development/async-directive.js")},"../node_modules/lit/html.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{s6:function(){return lit_html__WEBPACK_IMPORTED_MODULE_0__.s6}});var lit_html__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../node_modules/lit-html/development/lit-html.js")},"./packages/contextual-help/stories/contextual-help.stories.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{CustomPlacement:function(){return CustomPlacement},Default:function(){return Default},Help:function(){return Help},__namedExportsOrder:function(){return __namedExportsOrder},customMaxWidth:function(){return customMaxWidth},default:function(){return contextual_help_stories}});var index_dev=__webpack_require__("./tools/base/src/index.dev.js");var directives_dev=__webpack_require__("./tools/base/src/directives.dev.js"),lit_helpers=__webpack_require__("./test/lit-helpers.js"),decorators_dev=(__webpack_require__("./packages/link/sp-link.dev.js"),__webpack_require__("./packages/action-button/sp-action-button.dev.js"),__webpack_require__("./packages/overlay/sp-overlay.dev.js"),__webpack_require__("./packages/icons-workflow/icons/sp-icon-help-outline.js"),__webpack_require__("./packages/icons-workflow/icons/sp-icon-info-outline.js"),__webpack_require__("./tools/base/src/decorators.dev.js")),slottable_request_event_dev=__webpack_require__("./packages/overlay/src/slottable-request-event.dev.js"),MatchMedia_dev=__webpack_require__("./tools/reactive-controllers/src/MatchMedia.dev.js");var contextual_help_css=index_dev.AH`
    .popover{min-inline-size:var(--mod-spectrum-contextual-help-minimum-width,var(--spectrum-contextual-help-minimum-width));padding-block:var(--mod-spectrum-contextual-help-padding,var(--spectrum-spacing-400));padding-inline:var(--mod-spectrum-contextual-help-padding,var(--spectrum-spacing-400));font-size:var(--mod-spectrum-contextual-help-body-size,var(--spectrum-contextual-help-body-size));color:var(--highcontrast-contextual-help-body-color,var(--mod-contextual-help-body-color,var(--spectrum-body-color)));max-inline-size:var(--mod-spectrum-contextual-help-popover-maximum-width);position:relative}.popover .body,.popover ::slotted([slot=heading]){margin:0}.popover ::slotted([slot=heading]){font-size:var(--mod-spectrum-contextual-help-heading-size,var(--spectrum-contextual-help-title-size));color:var(--highcontrast-contextual-help-heading-color,var(--mod-contextual-help-heading-color,var(--spectrum-heading-color)));margin-block-end:var(--mod-spectrum-contextual-help-content-spacing,var(--spectrum-contextual-help-content-spacing))}::slotted([slot=link]){margin-block-start:var(--mod-spectrum-contextual-help-link-spacing,var(--spectrum-spacing-300))}@media (forced-colors:active){:host{--highcontrast-contextual-help-heading-color:CanvasText;--highcontrast-contextual-help-body-color:CanvasText}}:host{display:inline-block}::slotted([slot=link]){display:block}
`,u=Object.defineProperty,h=Object.getOwnPropertyDescriptor,s=(c,r,e,i)=>{for(var p,o=i>1?void 0:i?h(r,e):r,a=c.length-1;a>=0;a--)(p=c[a])&&(o=(i?p(r,e,o):p(o))||o);return i&&o&&u(r,e,o),o};const DEFAULT_ARIA_LABELS_help="Help",DEFAULT_ARIA_LABELS_info="Information",t=class t extends index_dev.wG{constructor(){super(),this.isMobile=new MatchMedia_dev._9(this,MatchMedia_dev.yS),this.variant="info",this.placement="bottom-start",this.offset=0,this.open=!1;const e=t.instanceCount++;this.popoverId=`contextual-help-popover-${e}`,this.contentId=`contextual-help-content-${e}`}static get styles(){return[contextual_help_css]}get buttonAriaLabel(){return this.label?this.label:"help"===this.variant?DEFAULT_ARIA_LABELS_help:DEFAULT_ARIA_LABELS_info}renderOverlayContent(){return this.isMobile.matches?(Promise.all([__webpack_require__.e(5743),__webpack_require__.e(4282),__webpack_require__.e(1335)]).then(__webpack_require__.bind(__webpack_require__,"./packages/dialog/sp-dialog-base.dev.js")),Promise.all([__webpack_require__.e(5743),__webpack_require__.e(8614)]).then(__webpack_require__.bind(__webpack_require__,"./packages/dialog/sp-dialog.dev.js")),index_dev.qy`
                <sp-dialog-base underlay>
                    <sp-dialog dismissable size="s" id=${this.popoverId}>
                        <slot name="heading" slot="heading"></slot>
                        <slot></slot>
                        <slot name="link"></slot>
                    </sp-dialog>
                </sp-dialog-base>
            `):(__webpack_require__.e(5287).then(__webpack_require__.bind(__webpack_require__,"./packages/popover/sp-popover.dev.js")),index_dev.qy`
                <sp-popover
                    class="popover"
                    id=${this.popoverId}
                    role="region"
                    aria-labelledby=${this.contentId}
                >
                    <section id=${this.contentId}>
                        <div>
                            <slot name="heading"></slot>
                        </div>
                        <div class="body">
                            <slot></slot>
                        </div>
                        <slot name="link"></slot>
                    </section>
                </sp-popover>
            `)}handleSlottableRequest(e){if(e.stopPropagation(),e.data===slottable_request_event_dev.g)return this.open=!1,void(0,index_dev.XX)(void 0,e.target);this.open=!0;const i=this.renderOverlayContent();(0,index_dev.XX)(i,e.target)}render(){const e=this.isMobile.matches?void 0:this.placement;return index_dev.qy`
            <sp-action-button
                quiet
                size="s"
                id="trigger"
                aria-label=${this.buttonAriaLabel}
                aria-haspopup=${(0,directives_dev.JR)(this.isMobile.matches?"dialog":void 0)}
                aria-expanded=${this.open?"true":"false"}
                aria-controls=${this.popoverId}
                .active=${this.open}
            >
                ${"help"===this.variant?index_dev.qy`
                          <sp-icon-help-outline
                              slot="icon"
                          ></sp-icon-help-outline>
                      `:index_dev.qy`
                          <sp-icon-info-outline
                              slot="icon"
                          ></sp-icon-info-outline>
                      `}
            </sp-action-button>
            <sp-overlay
                trigger="trigger@click"
                placement=${(0,directives_dev.JR)(e)}
                type=${this.isMobile.matches?"modal":"auto"}
                receives-focus="true"
                .offset=${this.offset}
                @slottable-request=${this.handleSlottableRequest}
                ?open=${this.open}
            ></sp-overlay>
        `}};t.instanceCount=0,s([(0,decorators_dev.MZ)()],t.prototype,"label",2),s([(0,decorators_dev.MZ)()],t.prototype,"variant",2),s([(0,decorators_dev.MZ)({reflect:!0})],t.prototype,"placement",2),s([(0,decorators_dev.MZ)({type:Number})],t.prototype,"offset",2),s([(0,decorators_dev.MZ)({type:Boolean})],t.prototype,"open",2);let ContextualHelp=t;customElements.define("sp-contextual-help",ContextualHelp);const Template=(args={})=>index_dev.qy`
        <sp-contextual-help
            ${(0,lit_helpers.i)(args)}
            placement=${(0,directives_dev.JR)(args.placement)}
        >
            <h2 slot="heading">Permission required</h2>
            Your admin must grant you permission before you can create a
            segment.
            <sp-link
                slot="link"
                href="https://opensource.adobe.com/spectrum-web-components/"
            >
                Request permission
            </sp-link>
        </sp-contextual-help>
    `;var contextual_help_stories={title:"Contextual Help",component:"sp-contextual-help",args:{label:"",variant:"info",placement:void 0},argTypes:{open:{name:"open",type:{name:"boolean",required:!1},table:{type:{summary:"boolean"},defaultValue:{summary:!1}},control:{type:"boolean"}},variant:{name:"variant",type:{name:"string",required:!1},table:{defaultValue:{summary:"info"}},control:{labels:{info:"Info",help:"Help"},type:"select"},options:["info","help"]},label:{name:"label",type:{name:"string",required:!1},table:{type:{summary:"label"},defaultValue:{summary:"Information"}},control:"text"},offset:{name:"offset",type:{name:"number",required:!1},table:{type:{summary:"offset"},defaultValue:{summary:0}},control:"number"},placement:{name:"placement",type:{name:"string",required:!1},description:"The placement of the popover content in relation to the button",table:{type:{summary:"string"},defaultValue:{summary:"bottom-start"}},control:{type:"select",labels:{top:"top","top-start":"top-start","top-end":"top-end",right:"right","right-start":"right-start","right-end":"right-end",bottom:"bottom","bottom-start":"bottom-start","bottom-end":"bottom-end",left:"left","left-start":"left-start","left-end":"left-end"}},options:["top","top-start","top-end","right","right-start","right-end","bottom","bottom-start","bottom-end","left","left-start","left-end"]}}};const Default=args=>Template(args);Default.args={open:!0};const Help=args=>Template(args);Help.args={variant:"help",open:!0};const CustomPlacement=args=>index_dev.qy`
        <div
            style="width: 100%; height: 500px; display: flex; align-items: center; justify-content: center"
        >
            ${Template(args)}
        </div>
    `;CustomPlacement.args={placement:"top",open:!0};const customMaxWidth=args=>index_dev.qy`
        <sp-contextual-help
            ${(0,lit_helpers.i)(args||{})}
            style="--mod-spectrum-contextual-help-popover-maximum-width: 200px;"
        >
            <h2 slot="heading">Custom max width</h2>
            This is a test of the contextual help component with a custom max
            width of 200px.
        </sp-contextual-help>
    `;customMaxWidth.args={open:!0};const __namedExportsOrder=["Default","Help","CustomPlacement","customMaxWidth"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"args => Template(args)",...Default.parameters?.docs?.source}}},Help.parameters={...Help.parameters,docs:{...Help.parameters?.docs,source:{originalSource:"args => Template(args)",...Help.parameters?.docs?.source}}},CustomPlacement.parameters={...CustomPlacement.parameters,docs:{...CustomPlacement.parameters?.docs,source:{originalSource:'args => {\n  return html`\n        <div\n            style="width: 100%; height: 500px; display: flex; align-items: center; justify-content: center"\n        >\n            ${Template(args)}\n        </div>\n    `;\n}',...CustomPlacement.parameters?.docs?.source}}},customMaxWidth.parameters={...customMaxWidth.parameters,docs:{...customMaxWidth.parameters?.docs,source:{originalSource:'args => {\n  return html`\n        <sp-contextual-help\n            ${spreadProps(args || {})}\n            style="--mod-spectrum-contextual-help-popover-maximum-width: 200px;"\n        >\n            <h2 slot="heading">Custom max width</h2>\n            This is a test of the contextual help component with a custom max\n            width of 200px.\n        </sp-contextual-help>\n    `;\n}',...customMaxWidth.parameters?.docs?.source}}}},"./packages/icons-workflow/icons/sp-icon-help-outline.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-workflow/src/custom-tag.js"),HelpOutline=__webpack_require__("./packages/icons-workflow/src/icons/HelpOutline.js"),DefaultIcon=__webpack_require__("./packages/icons-workflow/src/DefaultIcon.js");class IconHelpOutline extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),1===this.spectrumVersion?(0,HelpOutline.j)({hidden:!this.label,title:this.label}):(0,DefaultIcon.$)({hidden:!this.label,title:this.label})}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon-help-outline",IconHelpOutline)},"./packages/icons-workflow/icons/sp-icon-info-outline.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-workflow/src/custom-tag.js"),InfoOutline=__webpack_require__("./packages/icons-workflow/src/icons/InfoOutline.js"),InfoCircle=__webpack_require__("./packages/icons-workflow/src/icons-s2/InfoCircle.js");class IconInfoOutline extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),1===this.spectrumVersion?(0,InfoOutline.Y)({hidden:!this.label,title:this.label}):(0,InfoCircle.e)({hidden:!this.label,title:this.label})}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon-info-outline",IconInfoOutline)},"./packages/icons-workflow/src/DefaultIcon.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{$:function(){return DefaultIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const DefaultIcon=({width:e=24,height:l=24,hidden:t=!1,title:r="Default"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            role="img"
            fill="currentColor"
            width=${e}
            height=${l}
            aria-hidden=${t?"true":"false"}
            aria-label=${t?void 0:r}
        >
            <path
                d="m10,18.75c-4.82471,0-8.75-3.9248-8.75-8.75S5.17529,1.25,10,1.25s8.75,3.9248,8.75,8.75-3.92529,8.75-8.75,8.75Zm0-16c-3.99756,0-7.25,3.25195-7.25,7.25s3.25244,7.25,7.25,7.25,7.25-3.25195,7.25-7.25-3.25244-7.25-7.25-7.25Z"
                fill="currentColor"
                stroke-width="0"
            ></path>
        </svg>
    `},"./packages/icons-workflow/src/icons-s2/InfoCircle.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{e:function(){return InfoCircleIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const InfoCircleIcon=({width:r=24,height:t=24,hidden:e=!1,title:l="Info Circle"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${r}"
    height="${t}"
    viewBox="0 0 20 20"
    aria-hidden=${e?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${l}"
  >
    <path
      d="m10,18.75c-4.8252,0-8.75-3.9248-8.75-8.75S5.1748,1.25,10,1.25s8.75,3.9248,8.75,8.75-3.9248,8.75-8.75,8.75Zm0-16c-3.99805,0-7.25,3.25195-7.25,7.25s3.25195,7.25,7.25,7.25,7.25-3.25195,7.25-7.25-3.25195-7.25-7.25-7.25Z"
      fill="currentColor"
    />
    <path
      d="m10.00064,5.26036c.23065-.00813.45538.07387.62661.22862.33033.36505.33033.92102,0,1.28607-.16935.15851-.39483.24308-.62664.23504-.23635.00948-.46589-.08035-.63302-.24775-.16207-.1679-.24916-.39432-.24137-.62755-.01238-.23497.06959-.46515.2277-.6394.17358-.16474.40786-.24988.64671-.23503Z"
      fill="currentColor"
    />
    <path
      d="m10,15.0625c-.41406,0-.75-.33594-.75-.75v-4.83496c0-.41406.33594-.75.75-.75s.75.33594.75.75v4.83496c0,.41406-.33594.75-.75.75Z"
      fill="currentColor"
    />
  </svg>`},"./packages/icons-workflow/src/icons/HelpOutline.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{j:function(){return HelpOutlineIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const HelpOutlineIcon=({width:e=24,height:t=24,hidden:a=!1,title:l="Help Outline"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${e}"
    height="${t}"
    viewBox="0 0 36 36"
    aria-hidden=${a?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${l}"
  >
    <path
      d="M20.181 25.932a1.833 1.833 0 0 1-1.954 2.015 1.862 1.862 0 0 1-1.956-2.015 1.955 1.955 0 1 1 3.91 0ZM17.953 8a9.232 9.232 0 0 0-4.518 1.072c-.119.063-.119.185-.119.307v2.971a.15.15 0 0 0 .238.122 7.385 7.385 0 0 1 3.744-1.01c1.813 0 2.527.766 2.527 1.869 0 .95-.565 1.593-1.545 2.603-1.427 1.472-2.29 2.389-2.29 3.829a3.417 3.417 0 0 0 .714 2.114.488.488 0 0 0 .386.123h2.586a.13.13 0 0 0 .119-.215 3.302 3.302 0 0 1-.476-1.686c0-.917 1.1-1.928 2.26-3.062a5.474 5.474 0 0 0 1.901-4.226c0-2.696-1.96-4.81-5.527-4.81ZM35 18A17 17 0 1 1 18 1a17 17 0 0 1 17 17Zm-3.65 0A13.35 13.35 0 1 0 18 31.35 13.35 13.35 0 0 0 31.35 18Z"
    />
  </svg>`},"./packages/icons-workflow/src/icons/InfoOutline.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Y:function(){return InfoOutlineIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const InfoOutlineIcon=({width:t=24,height:e=24,hidden:l=!1,title:a="Info Outline"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${t}"
    height="${e}"
    viewBox="0 0 36 36"
    aria-hidden=${l?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
  >
    <path
      d="M20.15 12A2.15 2.15 0 1 1 18 9.85 2.15 2.15 0 0 1 20.15 12Zm.183 12H20v-7.6a.4.4 0 0 0-.4-.4h-3.934s-1.166.032-1.166 1c0 .967 1.167 1 1.167 1H16v6h-.333s-1.167.032-1.167 1c0 .967 1.167 1 1.167 1h4.667s1.166-.033 1.166-1c0-.968-1.167-1-1.167-1ZM18 1a17 17 0 1 0 17 17A17 17 0 0 0 18 1Zm0 30.35A13.35 13.35 0 1 1 31.35 18 13.35 13.35 0 0 1 18 31.35Z"
    />
  </svg>`},"./packages/link/sp-link.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js"),like_anchor_dev=__webpack_require__("./tools/shared/src/like-anchor.dev.js"),focusable_dev=__webpack_require__("./tools/shared/src/focusable.dev.js");var link_css=__webpack_require__("./tools/base/src/index.dev.js").AH`
            /*!
 * Copyright 2025 Adobe. All rights reserved. This file is licensed to you under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0 Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License./
 * 
 *  Override divider background color when used inside alert-dialog/
 * .divider {
 *     --spectrum-divider-background-color: var(--system-alert-dialog-divider-background-color);
 *     --spectrum-divider-background-color-static-white: var(--spectrum-alert-dialog-divider-background-color-static-white);
 *     --spectrum-divider-background-color-static-black: var(--spectrum-alert-dialog-divider-background-color-static-black);
 * }
 */
@media (forced-colors:active){:host{--highcontrast-link-text-color:LinkText}}:host([variant=secondary]) a{--mod-link-text-color:var(--mod-link-text-color-secondary-default,var(--spectrum-neutral-content-color-default));--mod-link-text-color-hover:var(--mod-link-text-color-secondary-hover,var(--spectrum-neutral-content-color-hover));--mod-link-text-color-active:var(--mod-link-text-color-secondary-active,var(--spectrum-neutral-content-color-down));--mod-link-text-color-focus:var(--mod-link-text-color-secondary-focus,var(--spectrum-neutral-content-color-key-focus))}a{background-color:initial;text-decoration-skip:objects;transition:color var(--mod-link-animation-duration,var(--spectrum-animation-duration-100))ease-in-out;cursor:pointer;color:var(--highcontrast-link-text-color,var(--mod-link-text-color,var(--mod-link-text-color-primary-default,var(--spectrum-accent-content-color-default))));outline:none;text-decoration:underline}a:active{--mod-link-text-color:var(--mod-link-text-color-active,var(--mod-link-text-color-primary-active,var(--spectrum-accent-content-color-down)))}:host([quiet]) a{text-decoration:none}a:focus-visible,:host([quiet]) a:focus-visible{--mod-link-text-color:var(--mod-link-text-color-focus,var(--mod-link-text-color-primary-focus,var(--spectrum-accent-content-color-key-focus)));text-decoration:underline double;text-decoration-color:inherit}@media (hover:hover){a:hover{--mod-link-text-color:var(--mod-link-text-color-hover,var(--mod-link-text-color-primary-hover,var(--spectrum-accent-content-color-hover)))}:host([quiet]) a:hover{text-decoration:underline}}:host([static-color=white]) a{--mod-link-text-color:var(--mod-link-text-color-white,var(--spectrum-white));--mod-link-text-color-hover:var(--mod-link-text-color-white,var(--spectrum-white));--mod-link-text-color-active:var(--mod-link-text-color-white,var(--spectrum-white));--mod-link-text-color-focus:var(--mod-link-text-color-white,var(--spectrum-white))}:host([static-color=black]) a{--mod-link-text-color:var(--mod-link-text-color-black,var(--spectrum-black));--mod-link-text-color-hover:var(--mod-link-text-color-black,var(--spectrum-black));--mod-link-text-color-active:var(--mod-link-text-color-black,var(--spectrum-black));--mod-link-text-color-focus:var(--mod-link-text-color-black,var(--spectrum-black))}:host{display:inline}:host(:focus){outline:none}:host([href]) a:focus-visible{text-decoration:underline double}:host([disabled]){pointer-events:none}
        `,__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__decorateClass=(decorators,target,key,kind)=>{for(var decorator,result=kind>1?void 0:kind?__getOwnPropDesc(target,key):target,i=decorators.length-1;i>=0;i--)(decorator=decorators[i])&&(result=(kind?decorator(target,key,result):decorator(result))||result);return kind&&result&&__defProp(target,key,result),result};class Link extends((0,like_anchor_dev.$)(focusable_dev.z)){constructor(){super(...arguments),this.quiet=!1}static get styles(){return[link_css]}get focusElement(){return this.anchorElement}render(){return this.renderAnchor({id:"anchor"})}}__decorateClass([(0,decorators_dev.P)("#anchor")],Link.prototype,"anchorElement",2),__decorateClass([(0,decorators_dev.MZ)({type:String,reflect:!0})],Link.prototype,"variant",2),__decorateClass([(0,decorators_dev.MZ)({reflect:!0,attribute:"static-color"})],Link.prototype,"staticColor",2),__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0,attribute:"quiet"})],Link.prototype,"quiet",2),(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-link",Link)},"./test/lit-helpers.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{i:function(){return spreadProps}});var lit_html_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../node_modules/lit/html.js"),lit_async_directive_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../node_modules/lit/async-directive.js");class SpreadDirective extends lit_async_directive_js__WEBPACK_IMPORTED_MODULE_1__.Kq{constructor(){super(...arguments),this.prevData={}}render(_spreadData){return lit_html_js__WEBPACK_IMPORTED_MODULE_0__.s6}update(part,[spreadData]){var _a;this.element!==part.element&&(this.element=part.element),this.host=(null==(_a=part.options)?void 0:_a.host)||this.element,this.apply(spreadData),this.groom(spreadData),this.prevData=spreadData}apply(data){if(!data)return;const{prevData:prevData,element:element}=this;for(const key in data){const value=data[key];if(value===prevData[key])continue;const name=key.slice(1);switch(key[0]){case"@":prevData[key]&&element.removeEventListener(name,this,value),element.addEventListener(name,this,value);break;case".":element[name]=value;break;case"?":value?element.setAttribute(name,""):element.removeAttribute(name);break;default:null!=value?element.setAttribute(key,String(value)):element.removeAttribute(key)}}}groom(data){const{prevData:prevData,element:element}=this;if(prevData)for(const key in prevData)if(!data||!(key in data))switch(key[0]){case"@":const value=prevData[key];element.removeEventListener(key.slice(1),this,value);break;case".":element[key.slice(1)]=void 0;break;case"?":element.removeAttribute(key.slice(1));break;default:element.removeAttribute(key)}}handleEvent(event){const value=this.prevData[`@${event.type}`];"function"==typeof value?value.call(this.host,event):value.handleEvent(event)}disconnected(){const{prevData:prevData,element:element}=this;for(const key in prevData){if("@"!==key[0])continue;const value=prevData[key];element.removeEventListener(key.slice(1),this,value)}}reconnected(){const{prevData:prevData,element:element}=this;for(const key in prevData){if("@"!==key[0])continue;const value=prevData[key];element.addEventListener(key.slice(1),this,value)}}}(0,lit_async_directive_js__WEBPACK_IMPORTED_MODULE_1__.u$)(SpreadDirective);class SpreadPropsDirective extends lit_async_directive_js__WEBPACK_IMPORTED_MODULE_1__.Kq{constructor(){super(...arguments),this.prevData={}}render(_spreadData){return lit_html_js__WEBPACK_IMPORTED_MODULE_0__.s6}update(part,[spreadData]){var _a;this.element!==part.element&&(this.element=part.element),this.host=(null==(_a=part.options)?void 0:_a.host)||this.element,this.apply(spreadData),this.groom(spreadData),this.prevData=spreadData}apply(data){if(!data)return;const{prevData:prevData,element:element}=this;for(const key in data){const value=data[key];value!==prevData[key]&&(element[key]=value)}}groom(data){const{prevData:prevData,element:element}=this;if(prevData)for(const key in prevData)data&&key in data||(element[key]=void 0)}}const spreadProps=(0,lit_async_directive_js__WEBPACK_IMPORTED_MODULE_1__.u$)(SpreadPropsDirective)}}]);
//# sourceMappingURL=contextual-help-stories-contextual-help-stories.ce0a117a.iframe.bundle.js.map