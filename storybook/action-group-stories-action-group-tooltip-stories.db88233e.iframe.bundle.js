"use strict";(self.webpackChunk_adobe_spectrum_web_components=self.webpackChunk_adobe_spectrum_web_components||[]).push([[1082,5990,8701],{"./node_modules/lit/async-directive.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Kq:function(){return lit_html_async_directive_js__WEBPACK_IMPORTED_MODULE_0__.Kq},u$:function(){return lit_html_async_directive_js__WEBPACK_IMPORTED_MODULE_0__.u$}});var lit_html_async_directive_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lit-html/development/async-directive.js")},"./node_modules/lit/html.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{s6:function(){return lit_html__WEBPACK_IMPORTED_MODULE_0__.s6}});var lit_html__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lit-html/development/lit-html.js")},"./packages/action-group/stories/action-group-tooltip.stories.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:function(){return __namedExportsOrder},controlled:function(){return controlled},justified:function(){return justified},selectsMultiple:function(){return selectsMultiple},selectsSingle:function(){return selectsSingle},vertical:function(){return vertical}});var _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./tools/base/src/index.dev.js"),_spectrum_web_components_base_src_decorators_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./tools/base/src/decorators.dev.js"),_test_lit_helpers_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./test/lit-helpers.js"),__defProp=(__webpack_require__("./packages/action-group/sp-action-group.dev.js"),__webpack_require__("./packages/action-button/sp-action-button.dev.js"),__webpack_require__("./packages/overlay/overlay-trigger.dev.js"),__webpack_require__("./packages/tooltip/sp-tooltip.dev.js"),__webpack_require__("./packages/icons-workflow/icons/sp-icon-properties.js"),__webpack_require__("./packages/icons-workflow/icons/sp-icon-info.js"),__webpack_require__("./packages/icons-workflow/icons/sp-icon-view-all-tags.js"),Object.defineProperty),__getOwnPropDesc=Object.getOwnPropertyDescriptor;__webpack_exports__.default={title:"Action Group/Tooltips",component:"sp-action-group",args:{compact:!1,emphasized:!1,justified:!1,quiet:!1,vertical:!1,selects:"none",size:"m"},argTypes:{compact:{name:"compact",description:"Visually joins the buttons together to clarify their relationship to one another.",type:{name:"boolean",required:!1},table:{type:{summary:"boolean"},defaultValue:{summary:!1}},control:{type:"boolean"}},emphasized:{name:"emphasized",type:{name:"boolean",required:!1},table:{type:{summary:"boolean"},defaultValue:{summary:!1}},control:{type:"boolean"}},justified:{name:"justified",description:"Aligns the action group items to use all the available space on that line.",type:{name:"boolean",required:!1},table:{type:{summary:"boolean"},defaultValue:{summary:!1}},control:{type:"boolean"}},quiet:{name:"quiet",type:{name:"boolean",required:!1},table:{type:{summary:"boolean"},defaultValue:{summary:!1}},control:{type:"boolean"}},vertical:{name:"vertical",description:"Changes the orientation of the action group.",type:{name:"boolean",required:!1},table:{type:{summary:"boolean"},defaultValue:{summary:!1}},control:{type:"boolean"}},selects:{name:"selects",description:"Whether the elements selects its children and how many it can select at a time.",table:{defaultValue:{summary:""}},control:{type:"inline-radio",options:["none","single","multiple"]}},size:{name:"size",description:"The size at which to display the action group.",type:{name:"string",required:!0},table:{type:{summary:'"s" | "m" | "l" | "xl"'},defaultValue:{summary:"m"}},control:{type:"select",options:["s","m","l","xl"]}}}};const template=args=>(requestAnimationFrame(()=>{const group=document.querySelector("sp-action-group"),selectedDiv=group.nextElementSibling;selectedDiv&&(selectedDiv.textContent=`Selected: ${JSON.stringify(group.selected)}`)}),_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-action-group
            label="Favorite Color"
            ...=${(0,_test_lit_helpers_js__WEBPACK_IMPORTED_MODULE_2__.i)(args)}
            @change=${({target:target})=>{target.nextElementSibling.textContent=`Selected: ${JSON.stringify(target.selected)}`}}
        >
            <overlay-trigger>
                <sp-action-button slot="trigger">Red</sp-action-button>
                <sp-tooltip slot="hover-content">
                    This is a cool color.
                </sp-tooltip>
            </overlay-trigger>
            <overlay-trigger>
                <sp-action-button slot="trigger">Green</sp-action-button>
                <sp-tooltip slot="hover-content">
                    You wouldn't be wrong.
                </sp-tooltip>
            </overlay-trigger>
            <overlay-trigger>
                <sp-action-button slot="trigger" value="blue" selected>
                    Blue
                </sp-action-button>
                <sp-tooltip slot="hover-content">The sky in spring.</sp-tooltip>
            </overlay-trigger>
            <overlay-trigger>
                <sp-action-button slot="trigger">Yellow</sp-action-button>
                <sp-tooltip slot="hover-content">The sun at noon.</sp-tooltip>
            </overlay-trigger>
        </sp-action-group>
        ${args.selects?_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
                  <div>Selected:</div>
              `:_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.s6}
    `),selectsSingle=args=>template(args);selectsSingle.args={compact:!0,emphasized:!0,selects:"single"};const selectsMultiple=args=>template(args);selectsMultiple.args={compact:!0,emphasized:!0,selects:"multiple"};const justified=args=>template(args);justified.args={compact:!0,emphasized:!0,justified:!0,selects:void 0};const vertical=args=>template(args);vertical.args={compact:!0,emphasized:!0,vertical:!0,selects:void 0};class ActionGroupTooltips extends _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.wG{constructor(){super(...arguments),this.alignment="left"}render(){return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
            <sp-action-group quiet>
                <sp-action-button
                    quiet
                    value="left"
                    ?selected=${"left"===this.alignment}
                    @click=${()=>{this.alignment="left"}}
                >
                    <sp-icon slot="icon">
                        <svg
                            role="img"
                            fill="currentColor"
                            viewBox="0 0 18 18"
                            id="STextAlignLeft18N-icon"
                            width="18"
                            height="18"
                            aria-hidden="true"
                            focusable="false"
                        >
                            <rect
                                fill-rule="evenodd"
                                x="2"
                                y="14"
                                width="12"
                                height="2"
                                rx="0.5"
                            ></rect>
                            <rect
                                fill-rule="evenodd"
                                x="2"
                                y="2"
                                width="15"
                                height="2"
                                rx="0.5"
                            ></rect>
                            <rect
                                fill-rule="evenodd"
                                x="2"
                                y="6"
                                width="12"
                                height="2"
                                rx="0.5"
                            ></rect>
                            <rect
                                fill-rule="evenodd"
                                x="2"
                                y="10"
                                width="15"
                                height="2"
                                rx="0.5"
                            ></rect>
                        </svg>
                    </sp-icon>
                    <sp-tooltip self-managed placement="bottom">
                        Left align
                    </sp-tooltip>
                </sp-action-button>
                <sp-action-button
                    quiet
                    value="center"
                    ?selected=${"center"===this.alignment}
                    @click=${()=>{this.alignment="center"}}
                >
                    <sp-icon slot="icon">
                        <svg
                            role="img"
                            fill="currentColor"
                            viewBox="0 0 18 18"
                            id="STextAlignCenter18N-icon"
                            width="18"
                            height="18"
                            aria-hidden="true"
                            focusable="false"
                        >
                            <rect
                                fill-rule="evenodd"
                                x="4"
                                y="14"
                                width="10"
                                height="2"
                                rx="0.5"
                            ></rect>
                            <rect
                                fill-rule="evenodd"
                                x="1"
                                y="10"
                                width="16"
                                height="2"
                                rx="0.5"
                            ></rect>
                            <rect
                                fill-rule="evenodd"
                                x="1"
                                y="2"
                                width="16"
                                height="2"
                                rx="0.5"
                            ></rect>
                            <rect
                                fill-rule="evenodd"
                                x="4"
                                y="6"
                                width="10"
                                height="2"
                                rx="0.5"
                            ></rect>
                        </svg>
                    </sp-icon>
                    <sp-tooltip self-managed placement="bottom">
                        Center align
                    </sp-tooltip>
                </sp-action-button>
                <sp-action-button
                    quiet
                    value="right"
                    ?selected=${"right"===this.alignment}
                    @click=${()=>{this.alignment="right"}}
                >
                    <sp-icon slot="icon">
                        <svg
                            role="img"
                            fill="currentColor"
                            viewBox="0 0 18 18"
                            id="STextAlignRight18N-icon"
                            width="18"
                            height="18"
                            aria-hidden="true"
                            focusable="false"
                        >
                            <rect
                                fill-rule="evenodd"
                                x="4"
                                y="14"
                                width="12"
                                height="2"
                                rx="0.5"
                            ></rect>
                            <rect
                                fill-rule="evenodd"
                                x="1"
                                y="2"
                                width="15"
                                height="2"
                                rx="0.5"
                            ></rect>
                            <rect
                                fill-rule="evenodd"
                                x="4"
                                y="6"
                                width="12"
                                height="2"
                                rx="0.5"
                            ></rect>
                            <rect
                                fill-rule="evenodd"
                                x="1"
                                y="10"
                                width="15"
                                height="2"
                                rx="0.5"
                            ></rect>
                        </svg>
                    </sp-icon>
                    <sp-tooltip self-managed placement="bottom">
                        Right align
                    </sp-tooltip>
                </sp-action-button>
            </sp-action-group>
        `}}((decorators,target,key,kind)=>{for(var decorator,result=kind>1?void 0:kind?__getOwnPropDesc(target,key):target,i=decorators.length-1;i>=0;i--)(decorator=decorators[i])&&(result=(kind?decorator(target,key,result):decorator(result))||result);kind&&result&&__defProp(target,key,result)})([(0,_spectrum_web_components_base_src_decorators_js__WEBPACK_IMPORTED_MODULE_1__.wk)()],ActionGroupTooltips.prototype,"alignment",2),customElements.define("action-group-tooltips",ActionGroupTooltips);const controlled=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
    <action-group-tooltips></action-group-tooltips>
`,__namedExportsOrder=["selectsSingle","selectsMultiple","justified","vertical","controlled"];selectsSingle.parameters={...selectsSingle.parameters,docs:{...selectsSingle.parameters?.docs,source:{originalSource:"args => template(args)",...selectsSingle.parameters?.docs?.source}}},selectsMultiple.parameters={...selectsMultiple.parameters,docs:{...selectsMultiple.parameters?.docs,source:{originalSource:"args => template(args)",...selectsMultiple.parameters?.docs?.source}}},justified.parameters={...justified.parameters,docs:{...justified.parameters?.docs,source:{originalSource:"args => template(args)",...justified.parameters?.docs?.source}}},vertical.parameters={...vertical.parameters,docs:{...vertical.parameters?.docs,source:{originalSource:"args => template(args)",...vertical.parameters?.docs?.source}}},controlled.parameters={...controlled.parameters,docs:{...controlled.parameters?.docs,source:{originalSource:"() => html`\n    <action-group-tooltips></action-group-tooltips>\n`",...controlled.parameters?.docs?.source}}}},"./packages/icons-workflow/icons/sp-icon-info.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-workflow/src/custom-tag.js"),Info=__webpack_require__("./packages/icons-workflow/src/icons/Info.js"),InfoCircle=__webpack_require__("./packages/icons-workflow/src/icons-s2/InfoCircle.js");class IconInfo extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),1===this.spectrumVersion?(0,Info.m)({hidden:!this.label,title:this.label}):(0,InfoCircle.e)({hidden:!this.label,title:this.label})}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon-info",IconInfo)},"./packages/icons-workflow/icons/sp-icon-properties.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");var Properties=__webpack_require__("./packages/icons-workflow/src/icons/Properties.js");class IconProperties extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),2===this.spectrumVersion?(({width:e=24,height:t=24,hidden:r=!1,title:s="Properties"}={})=>custom_tag.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${e}"
    height="${t}"
    viewBox="0 0 20 20"
    aria-hidden=${r?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${s}"
  >
    <path
      d="m1.75,6.77148h2.6687c.34064,1.43018,1.62128,2.5,3.15405,2.5s2.81342-1.06982,3.15405-2.5h7.52319c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75h-7.52319c-.34064-1.43018-1.62128-2.5-3.15405-2.5s-2.81342,1.06982-3.15405,2.5H1.75c-.41406,0-.75.33594-.75.75s.33594.75.75.75Zm5.82275-2.5c.96484,0,1.75.78516,1.75,1.75s-.78516,1.75-1.75,1.75-1.75-.78516-1.75-1.75.78516-1.75,1.75-1.75Z"
      fill="currentColor"
    />
    <path
      d="m18.25,13.27148h-2.52319c-.34064-1.43018-1.62128-2.5-3.15405-2.5s-2.81342,1.06982-3.15405,2.5H1.75c-.41406,0-.75.33594-.75.75s.33594.75.75.75h7.6687c.34064,1.43018,1.62128,2.5,3.15405,2.5s2.81342-1.06982,3.15405-2.5h2.52319c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75Zm-5.67725,2.5c-.96484,0-1.75-.78516-1.75-1.75s.78516-1.75,1.75-1.75,1.75.78516,1.75,1.75-.78516,1.75-1.75,1.75Z"
      fill="currentColor"
    />
  </svg>`)({hidden:!this.label,title:this.label}):(0,Properties.h)({hidden:!this.label,title:this.label})}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon-properties",IconProperties)},"./packages/icons-workflow/icons/sp-icon-view-all-tags.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-workflow/src/custom-tag.js"),ViewAllTags=__webpack_require__("./packages/icons-workflow/src/icons/ViewAllTags.js"),DefaultIcon=__webpack_require__("./packages/icons-workflow/src/DefaultIcon.js");class IconViewAllTags extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),1===this.spectrumVersion?(0,ViewAllTags.b)({hidden:!this.label,title:this.label}):(0,DefaultIcon.$)({hidden:!this.label,title:this.label})}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon-view-all-tags",IconViewAllTags)},"./packages/icons-workflow/src/DefaultIcon.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{$:function(){return DefaultIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const DefaultIcon=({width:e=24,height:l=24,hidden:t=!1,title:r="Default"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`
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
  </svg>`},"./packages/icons-workflow/src/icons/Info.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{m:function(){return InfoIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const InfoIcon=({width:a=24,height:t=24,hidden:e=!1,title:r="Info"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    height="${t}"
    viewBox="0 0 36 36"
    width="${a}"
    aria-hidden=${e?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${r}"
  >
    <path
      d="M18 2a16 16 0 1 0 16 16A16 16 0 0 0 18 2Zm-.3 4.3a2.718 2.718 0 0 1 2.864 2.824 2.664 2.664 0 0 1-2.864 2.863 2.705 2.705 0 0 1-2.864-2.864A2.717 2.717 0 0 1 17.7 6.3ZM22 27a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h1v-6h-1a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v9h1a1 1 0 0 1 1 1Z"
    />
  </svg>`},"./packages/icons-workflow/src/icons/Properties.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{h:function(){return PropertiesIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const PropertiesIcon=({width:a=24,height:e=24,hidden:t=!1,title:r="Properties"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    height="${e}"
    viewBox="0 0 36 36"
    width="${a}"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${r}"
  >
    <path
      d="M33.5 6H15.9a5 5 0 0 0-9.8 0H2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3.6a5 5 0 0 0 9.8 0h17.6a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5ZM11 10a3 3 0 1 1 3-3 3 3 0 0 1-3 3ZM33.5 26H19.9a5 5 0 0 0-9.8 0H2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h7.6a5 5 0 0 0 9.8 0h13.6a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5ZM15 30a3 3 0 1 1 3-3 3 3 0 0 1-3 3ZM2 16.5v1a.5.5 0 0 0 .5.5h17.6a5 5 0 0 0 9.8 0h3.6a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-3.6a5 5 0 0 0-9.8 0H2.5a.5.5 0 0 0-.5.5Zm20 .5a3 3 0 1 1 3 3 3 3 0 0 1-3-3Z"
    />
  </svg>`},"./packages/icons-workflow/src/icons/ViewAllTags.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{b:function(){return ViewAllTagsIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const ViewAllTagsIcon=({width:t=24,height:e=24,hidden:r=!1,title:h="View All Tags"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    height="${e}"
    viewBox="0 0 36 36"
    width="${t}"
    aria-hidden=${r?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${h}"
  >
    <rect height="4" rx="1" ry="1" width="4" x="2" y="2" />
    <rect height="4" rx="1" ry="1" width="22" x="10" y="2" />
    <rect height="4" rx="1" ry="1" width="4" x="2" y="10" />
    <rect height="4" rx="1" ry="1" width="22" x="10" y="10" />
    <rect height="4" rx="1" ry="1" width="4" x="2" y="18" />
    <rect height="4" rx="1" ry="1" width="4" x="2" y="26" />
    <path
      d="m35.668 26.106-9.88-9.879a.772.772 0 0 0-.546-.227h-8.47a.772.772 0 0 0-.772.772v8.471a.772.772 0 0 0 .226.546l9.879 9.88a.772.772 0 0 0 1.092 0l8.471-8.469a.772.772 0 0 0 0-1.094ZM20.4 22.948a2.548 2.548 0 1 1 2.548-2.548 2.548 2.548 0 0 1-2.548 2.548ZM14.294 27.2c-.332-.332-.223-.756-.353-1.2H11a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6.091ZM14 18h-3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h3Z"
    />
  </svg>`},"./packages/overlay/overlay-trigger.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var _spectrum_web_components_base_src_define_element_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./tools/base/src/define-element.dev.js"),_src_OverlayTrigger_dev_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/overlay/src/OverlayTrigger.dev.js");(0,_spectrum_web_components_base_src_define_element_js__WEBPACK_IMPORTED_MODULE_0__.e)("overlay-trigger",_src_OverlayTrigger_dev_js__WEBPACK_IMPORTED_MODULE_1__.N)},"./packages/overlay/sp-overlay.dev.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__);var _spectrum_web_components_base_src_define_element_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./tools/base/src/define-element.dev.js"),_src_Overlay_dev_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/overlay/src/Overlay.dev.js");(0,_spectrum_web_components_base_src_define_element_js__WEBPACK_IMPORTED_MODULE_0__.e)("sp-overlay",_src_Overlay_dev_js__WEBPACK_IMPORTED_MODULE_1__.Overlay)},"./packages/overlay/src/OverlayTrigger.dev.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{N:function(){return OverlayTrigger}});var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js");__webpack_require__("./packages/overlay/sp-overlay.dev.js");var overlay_trigger_css=index_dev.AH`
    slot[name=longpress-describedby-descriptor]{display:none}
`,__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__decorateClass=(decorators,target,key,kind)=>{for(var decorator,result=kind>1?void 0:kind?__getOwnPropDesc(target,key):target,i=decorators.length-1;i>=0;i--)(decorator=decorators[i])&&(result=(kind?decorator(target,key,result):decorator(result))||result);return kind&&result&&__defProp(target,key,result),result};class OverlayTrigger extends index_dev.wG{constructor(){super(...arguments),this.offset=6,this.disabled=!1,this.receivesFocus="auto",this.clickContent=[],this.longpressContent=[],this.hoverContent=[],this.targetContent=[]}static get styles(){return[overlay_trigger_css]}getAssignedElementsFromSlot(slot){return slot.assignedElements({flatten:!0})}handleTriggerContent(event){this.targetContent=this.getAssignedElementsFromSlot(event.target)}handleSlotContent(event){switch(event.target.name){case"click-content":this.clickContent=this.getAssignedElementsFromSlot(event.target);break;case"longpress-content":this.longpressContent=this.getAssignedElementsFromSlot(event.target);break;case"hover-content":this.hoverContent=this.getAssignedElementsFromSlot(event.target)}}handleBeforetoggle(event){const{target:target}=event;let type;if(target===this.clickOverlayElement)type="click";else if(target===this.longpressOverlayElement)type="longpress";else{if(target!==this.hoverOverlayElement)return;type="hover"}"open"===event.newState?this.open=type:this.open===type&&(this.open=void 0)}update(changes){var _a,_b,_c,_d,_e,_f;changes.has("clickContent")&&(this.clickPlacement=(null==(_a=this.clickContent[0])?void 0:_a.getAttribute("placement"))||(null==(_b=this.clickContent[0])?void 0:_b.getAttribute("direction"))||void 0),changes.has("hoverContent")&&(this.hoverPlacement=(null==(_c=this.hoverContent[0])?void 0:_c.getAttribute("placement"))||(null==(_d=this.hoverContent[0])?void 0:_d.getAttribute("direction"))||void 0),changes.has("longpressContent")&&(this.longpressPlacement=(null==(_e=this.longpressContent[0])?void 0:_e.getAttribute("placement"))||(null==(_f=this.longpressContent[0])?void 0:_f.getAttribute("direction"))||void 0),super.update(changes)}renderSlot(name){return index_dev.qy`
            <slot name=${name} @slotchange=${this.handleSlotContent}></slot>
        `}renderClickOverlay(){var _a;const slot=this.renderSlot("click-content"),clickOverlay=index_dev.qy`
            <sp-overlay
                id="click-overlay"
                ?disabled=${this.disabled||!this.clickContent.length}
                ?open=${"click"===this.open&&!!this.clickContent.length}
                .offset=${this.offset}
                .placement=${this.clickPlacement||this.placement}
                .triggerElement=${this.targetContent[0]}
                .triggerInteraction=${"click"}
                .type=${this.type||"auto"}
                @beforetoggle=${this.handleBeforetoggle}
                .receivesFocus=${this.receivesFocus}
            >
                ${slot}
            </sp-overlay>
        `;return(null==(_a=this.triggeredBy)?void 0:_a.includes("click"))||this.clickContent.length?clickOverlay:slot}renderHoverOverlay(){var _a;const slot=this.renderSlot("hover-content"),hoverOverlay=index_dev.qy`
            <sp-overlay
                id="hover-overlay"
                ?open=${"hover"===this.open&&!!this.hoverContent.length}
                ?disabled=${this.disabled||!this.hoverContent.length||!!this.open&&"hover"!==this.open}
                .offset=${this.offset}
                .placement=${this.hoverPlacement||this.placement}
                .triggerElement=${this.targetContent[0]}
                .triggerInteraction=${"hover"}
                .type=${"hint"}
                @beforetoggle=${this.handleBeforetoggle}
                .receivesFocus=${this.receivesFocus}
            >
                ${slot}
            </sp-overlay>
        `;return(null==(_a=this.triggeredBy)?void 0:_a.includes("hover"))||this.hoverContent.length?hoverOverlay:slot}renderLongpressOverlay(){var _a;const slot=this.renderSlot("longpress-content"),longpressOverlay=index_dev.qy`
            <sp-overlay
                id="longpress-overlay"
                ?disabled=${this.disabled||!this.longpressContent.length}
                ?open=${"longpress"===this.open&&!!this.longpressContent.length}
                .offset=${this.offset}
                .placement=${this.longpressPlacement||this.placement}
                .triggerElement=${this.targetContent[0]}
                .triggerInteraction=${"longpress"}
                .type=${"auto"}
                @beforetoggle=${this.handleBeforetoggle}
                .receivesFocus=${this.receivesFocus}
            >
                ${slot}
            </sp-overlay>
            <slot name="longpress-describedby-descriptor"></slot>
        `;return(null==(_a=this.triggeredBy)?void 0:_a.includes("longpress"))||this.longpressContent.length?longpressOverlay:slot}render(){return index_dev.qy`
            <slot
                id="trigger"
                name="trigger"
                @slotchange=${this.handleTriggerContent}
            ></slot>
            ${[this.renderClickOverlay(),this.renderHoverOverlay(),this.renderLongpressOverlay()]}
        `}updated(changedProperties){if(super.updated(changedProperties),!this.triggeredBy){const issues=["You have not specified the `triggeredBy` property. For optimal performance, consider explicitly declaring which overlay types you plan to use.",'Example: triggered-by="click hover"',"This helps avoid unnecessary DOM operations and potential race conditions."];window.__swc.warn(this,"Performance optimization available for <overlay-trigger>:","https://opensource.adobe.com/spectrum-web-components/components/overlay-trigger/#performance-optimization",{issues:issues})}this.disabled&&changedProperties.has("disabled")&&(this.open=void 0)}async getUpdateComplete(){return await super.getUpdateComplete()}}__decorateClass([(0,decorators_dev.MZ)({attribute:"triggered-by"})],OverlayTrigger.prototype,"triggeredBy",2),__decorateClass([(0,decorators_dev.MZ)({reflect:!0})],OverlayTrigger.prototype,"placement",2),__decorateClass([(0,decorators_dev.MZ)()],OverlayTrigger.prototype,"type",2),__decorateClass([(0,decorators_dev.MZ)({type:Number})],OverlayTrigger.prototype,"offset",2),__decorateClass([(0,decorators_dev.MZ)({reflect:!0})],OverlayTrigger.prototype,"open",2),__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],OverlayTrigger.prototype,"disabled",2),__decorateClass([(0,decorators_dev.MZ)({attribute:"receives-focus"})],OverlayTrigger.prototype,"receivesFocus",2),__decorateClass([(0,decorators_dev.wk)()],OverlayTrigger.prototype,"clickContent",2),__decorateClass([(0,decorators_dev.wk)()],OverlayTrigger.prototype,"longpressContent",2),__decorateClass([(0,decorators_dev.wk)()],OverlayTrigger.prototype,"hoverContent",2),__decorateClass([(0,decorators_dev.wk)()],OverlayTrigger.prototype,"targetContent",2),__decorateClass([(0,decorators_dev.P)("#click-overlay",!0)],OverlayTrigger.prototype,"clickOverlayElement",2),__decorateClass([(0,decorators_dev.P)("#longpress-overlay",!0)],OverlayTrigger.prototype,"longpressOverlayElement",2),__decorateClass([(0,decorators_dev.P)("#hover-overlay",!0)],OverlayTrigger.prototype,"hoverOverlayElement",2)},"./test/lit-helpers.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{i:function(){return spreadProps}});var lit_html_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lit/html.js"),lit_async_directive_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/lit/async-directive.js");class SpreadDirective extends lit_async_directive_js__WEBPACK_IMPORTED_MODULE_1__.Kq{constructor(){super(...arguments),this.prevData={}}render(_spreadData){return lit_html_js__WEBPACK_IMPORTED_MODULE_0__.s6}update(part,[spreadData]){var _a;this.element!==part.element&&(this.element=part.element),this.host=(null==(_a=part.options)?void 0:_a.host)||this.element,this.apply(spreadData),this.groom(spreadData),this.prevData=spreadData}apply(data){if(!data)return;const{prevData:prevData,element:element}=this;for(const key in data){const value=data[key];if(value===prevData[key])continue;const name=key.slice(1);switch(key[0]){case"@":prevData[key]&&element.removeEventListener(name,this,value),element.addEventListener(name,this,value);break;case".":element[name]=value;break;case"?":value?element.setAttribute(name,""):element.removeAttribute(name);break;default:null!=value?element.setAttribute(key,String(value)):element.removeAttribute(key)}}}groom(data){const{prevData:prevData,element:element}=this;if(prevData)for(const key in prevData)if(!data||!(key in data))switch(key[0]){case"@":const value=prevData[key];element.removeEventListener(key.slice(1),this,value);break;case".":element[key.slice(1)]=void 0;break;case"?":element.removeAttribute(key.slice(1));break;default:element.removeAttribute(key)}}handleEvent(event){const value=this.prevData[`@${event.type}`];"function"==typeof value?value.call(this.host,event):value.handleEvent(event)}disconnected(){const{prevData:prevData,element:element}=this;for(const key in prevData){if("@"!==key[0])continue;const value=prevData[key];element.removeEventListener(key.slice(1),this,value)}}reconnected(){const{prevData:prevData,element:element}=this;for(const key in prevData){if("@"!==key[0])continue;const value=prevData[key];element.addEventListener(key.slice(1),this,value)}}}(0,lit_async_directive_js__WEBPACK_IMPORTED_MODULE_1__.u$)(SpreadDirective);class SpreadPropsDirective extends lit_async_directive_js__WEBPACK_IMPORTED_MODULE_1__.Kq{constructor(){super(...arguments),this.prevData={}}render(_spreadData){return lit_html_js__WEBPACK_IMPORTED_MODULE_0__.s6}update(part,[spreadData]){var _a;this.element!==part.element&&(this.element=part.element),this.host=(null==(_a=part.options)?void 0:_a.host)||this.element,this.apply(spreadData),this.groom(spreadData),this.prevData=spreadData}apply(data){if(!data)return;const{prevData:prevData,element:element}=this;for(const key in data){const value=data[key];value!==prevData[key]&&(element[key]=value)}}groom(data){const{prevData:prevData,element:element}=this;if(prevData)for(const key in prevData)data&&key in data||(element[key]=void 0)}}const spreadProps=(0,lit_async_directive_js__WEBPACK_IMPORTED_MODULE_1__.u$)(SpreadPropsDirective)}}]);
//# sourceMappingURL=action-group-stories-action-group-tooltip-stories.db88233e.iframe.bundle.js.map