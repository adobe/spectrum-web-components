"use strict";(self.webpackChunk_spectrum_web_components_1st_gen=self.webpackChunk_spectrum_web_components_1st_gen||[]).push([[4824],{"./packages/button/sp-button.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var _src_Button_dev_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/button/src/Button.dev.js");(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-button",_src_Button_dev_js__WEBPACK_IMPORTED_MODULE_0__.$n)},"./packages/button/stories/index.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{BK:function(){return renderLink},Uv:function(){return argTypes},a2:function(){return args},aR:function(){return renderWithIconOnly},c5:function(){return renderLinkWithTarget},dg:function(){return makeOverBackground},jM:function(){return renderButtonSet},oX:function(){return renderWithIcon},pG:function(){return renderMinWidthButton},vb:function(){return renderButton}});var _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./tools/base/src/index.dev.js"),_spectrum_web_components_base_src_directives_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./tools/base/src/directives.dev.js");__webpack_require__("./packages/button/sp-button.dev.js"),__webpack_require__("./packages/icon/sp-icon.dev.js"),__webpack_require__("./packages/icons-workflow/icons/sp-icon-help.js");const args={disabled:!1,variant:"cta",pending:!1},argTypes={disabled:{name:"disabled",type:{name:"boolean",required:!1},description:"Disable this control. It will not receive focus or events.",table:{type:{summary:"boolean"},defaultValue:{summary:!1}},control:{type:"boolean"}},variant:{name:"variant",type:{name:"string",required:!1},description:"The visual variant to apply to the button.",table:{type:{summary:"string"},defaultValue:{summary:"cta"}},control:{type:"inline-radio",options:["cta","accent","primary","secondary","negative","overBackground","black","white"]}},treatment:{name:"treatment",type:{name:"string",required:!1},description:"The visual treatment to apply to the button.",table:{type:{summary:"string"},defaultValue:{summary:"fill"}},control:{type:"inline-radio",options:["fill","outline"]}},pending:{name:"pending",type:{name:"boolean",required:!1},description:"Shows the pending state of the button.",table:{type:{summary:"boolean"},defaultValue:{summary:!1}},control:{type:"boolean"}},label:{name:"label",type:{name:"string",required:!1},description:"The label to apply to the aria-label of the button.",table:{type:{summary:"string"}},control:{type:"text"}}},makeOverBackground=staticColor=>story=>{const color="black"===staticColor?"var(--spectrum-docs-static-black-background-color)":"var(--spectrum-docs-static-white-background-color)";return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
            <div
                style="
                    background-color: ${color};
                    padding: calc(var(--swc-scale-factor) * 14px) calc(var(--swc-scale-factor) * 20px);
                    display: inline-block;
                "
            >
                ${story()}
            </div>
        `};function renderButton(properties){return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-button
            ?disabled=${!!properties.disabled}
            href=${(0,_spectrum_web_components_base_src_directives_js__WEBPACK_IMPORTED_MODULE_1__.JR)(properties.href)}
            ?icon-only=${properties.iconOnly}
            ?pending=${!!properties.pending}
            ?quiet="${!!properties.quiet}"
            ?no-wrap="${!!properties.noWrap}"
            size=${(0,_spectrum_web_components_base_src_directives_js__WEBPACK_IMPORTED_MODULE_1__.JR)(properties.size)}
            target=${(0,_spectrum_web_components_base_src_directives_js__WEBPACK_IMPORTED_MODULE_1__.JR)(properties.target)}
            treatment=${(0,_spectrum_web_components_base_src_directives_js__WEBPACK_IMPORTED_MODULE_1__.JR)(properties.treatment)}
            variant=${(0,_spectrum_web_components_base_src_directives_js__WEBPACK_IMPORTED_MODULE_1__.JR)(properties.variant)}
            static-color=${(0,_spectrum_web_components_base_src_directives_js__WEBPACK_IMPORTED_MODULE_1__.JR)(properties.staticColor)}
            label=${(0,_spectrum_web_components_base_src_directives_js__WEBPACK_IMPORTED_MODULE_1__.JR)(properties.label)}
        >
            ${properties.content||"Click Me"}
        </sp-button>
    `}function renderButtonSet(properties){const disabled=Object.assign({},properties,{disabled:!0}),icon=Object.assign({},properties,{content:_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
            <sp-icon-help slot="icon"></sp-icon-help>
            Click Me
        `});return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        ${renderButton(properties)} ${renderButton(disabled)}
        ${renderButton(icon)}
    `}const bellIcon=_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
    <svg slot="icon" viewBox="0 0 36 36" focusable="false" aria-hidden="true">
        <path
            d="M16 36a4.407 4.407 0 0 0 4-4h-8a4.407 4.407 0 0 0 4 4zm9.143-24.615c0-3.437-3.206-4.891-7.143-5.268V3a1.079 1.079 0 0 0-1.143-1h-1.714A1.079 1.079 0 0 0 14 3v3.117c-3.937.377-7.143 1.831-7.143 5.268C6.857 26.8 2 26.111 2 28.154V30h28v-1.846C30 26 25.143 26.8 25.143 11.385z"
        ></path>
    </svg>
`,renderWithIcon=props=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <style>
            .row {
                padding: 10px;
            }
        </style>
        <div class="row">
            ${renderButtonSet({...props,content:_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
                    <sp-icon-help slot="icon"></sp-icon-help>
                    Help
                `})}
        </div>
        <div class="row">
            ${renderButtonSet({...props,content:_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
                    ${bellIcon} Custom SVG
                `})}
        </div>
    `,renderWithIconOnly=props=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        ${function renderIconButtonSet(properties){const disabled=Object.assign({},properties,{iconOnly:!0,disabled:!0}),iconOnly=Object.assign({},properties,{iconOnly:!0,content:_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
            <sp-icon-help slot="icon"></sp-icon-help>
        `});return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        ${renderButton(iconOnly)} ${renderButton(disabled)}
    `}({...props,content:_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
                <sp-icon-help slot="icon"></sp-icon-help>
            `})}
    `,renderMinWidthButton=props=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <style>
            sp-button {
                min-width: 300px;
            }
        </style>
        ${renderButtonSet(props)}
    `,href="https://github.com/adobe/spectrum-web-components",renderLink=props=>renderButtonSet({...props,href:href}),renderLinkWithTarget=props=>renderButtonSet({...props,href:href,target:"_blank"})},"./packages/coachmark/sp-coach-indicator.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js");var coach_indicator_css=index_dev.AH`
    :host{margin:var(--mod-coach-indicator-gap,var(--spectrum-coach-indicator-gap));min-inline-size:var(--mod-coach-indicator-min-inline-size,var(--spectrum-coach-indicator-min-inline-size));min-block-size:var(--mod-coach-indicator-min-block-size,var(--spectrum-coach-indicator-min-block-size));inline-size:var(--mod-coach-indicator-inline-size,var(--spectrum-coach-indicator-inline-size));block-size:var(--mod-coach-indicator-block-size,var(--spectrum-coach-indicator-block-size));position:relative}:host([quiet]){--mod-coach-indicator-min-inline-size:calc(var(--mod-coach-indicator-quiet-ring-diameter,var(--spectrum-coach-indicator-quiet-ring-diameter-size))*2.75);--mod-coach-indicator-min-block-size:calc(var(--mod-coach-indicator-quiet-ring-diameter,var(--spectrum-coach-indicator-quiet-ring-diameter-size))*2.75);--mod-coach-indicator-inline-size:calc(var(--mod-coach-indicator-quiet-ring-diameter,var(--spectrum-coach-indicator-quiet-ring-diameter-size))*2.75);--mod-coach-indicator-block-size:calc(var(--mod-coach-indicator-quiet-ring-diameter,var(--spectrum-coach-indicator-quiet-ring-diameter-size))*2.75);--mod-coach-indicator-ring-inline-size:var(--mod-coach-indicator-quiet-ring-diameter,var(--spectrum-coach-indicator-quiet-ring-diameter-size));--mod-coach-indicator-ring-block-size:var(--mod-coach-indicator-quiet-ring-diameter,var(--spectrum-coach-indicator-quiet-ring-diameter-size));--mod-coach-indicator-top:calc(var(--mod-coach-indicator-min-inline-size)/3 - var(--spectrum-coach-indicator-ring-border-size));--mod-coach-indicator-left:calc(var(--mod-coach-indicator-min-inline-size)/3 - var(--spectrum-coach-indicator-ring-border-size));--mod-coach-indicator-inner-animation-delay-multiple:var(--mod-coach-indicator-quiet-animation-ring-inner-delay-multiple,var(--spectrum-coach-indicator-quiet-animation-ring-inner-delay-multiple))}.ring{border-style:solid;border-width:var(--mod-coach-indicator-ring-border-size,var(--spectrum-coach-indicator-ring-border-size));border-color:var(--mod-coach-indicator-ring-default-color,var(--spectrum-coach-indicator-ring-default-color));inline-size:var(--mod-coach-indicator-ring-inline-size,var(--spectrum-coach-indicator-ring-inline-size));block-size:var(--mod-coach-indicator-ring-block-size,var(--spectrum-coach-indicator-ring-block-size));animation:var(--mod-coach-indicator-animation-name,var(--spectrum-coach-indicator-animation-name))var(--mod-coach-animation-indicator-ring-duration,var(--spectrum-coach-animation-indicator-ring-duration))linear infinite;border-radius:50%;display:block;position:absolute;inset-block-start:var(--mod-coach-indicator-top,var(--spectrum-coach-indicator-top));inset-inline-start:var(--mod-coach-indicator-left,var(--spectrum-coach-indicator-left))}.ring:first-child{animation-delay:calc(var(--mod-coach-animation-indicator-ring-duration,var(--spectrum-coach-animation-indicator-ring-duration))*var(--mod-coach-indicator-inner-animation-delay-multiple,var(--spectrum-coach-indicator-inner-animation-delay-multiple)))}.ring:nth-child(2){animation-delay:calc(var(--mod-coach-animation-indicator-ring-duration,var(--spectrum-coach-animation-indicator-ring-duration))*var(--mod-coach-animation-indicator-ring-center-delay-multiple,var(--spectrum-coach-animation-indicator-ring-center-delay-multiple)))}.ring:nth-child(3){animation-delay:calc(var(--mod-coach-animation-indicator-ring-duration,var(--spectrum-coach-animation-indicator-ring-duration))*var(--mod-coach-animation-indicator-ring-outer-delay-multiple,var(--spectrum-coach-animation-indicator-ring-outer-delay-multiple)))}:host([static-color=white]) .ring{border-color:var(--mod-coach-indicator-ring-light-color,var(--spectrum-coach-indicator-ring-light-color))}:host([static-color=black]) .ring{border-color:var(--mod-coach-indicator-ring-dark-color,var(--spectrum-coach-indicator-ring-dark-color))}@media (prefers-reduced-motion:reduce){.ring{animation:none}}@keyframes pulse{0%{transform:scale(var(--spectrum-coach-indicator-animation-keyframe-0-scale));opacity:var(--spectrum-coach-indicator-animation-keyframe-0-opacity)}50%{transform:scale(var(--spectrum-coach-indicator-animation-keyframe-50-scale));opacity:var(--spectrum-coach-indicator-animation-keyframe-50-opacity)}to{transform:scale(var(--spectrum-coach-indicator-animation-keyframe-100-scale));opacity:var(--spectrum-coach-indicator-animation-keyframe-100-opacity)}}@keyframes pulse-quiet{0%{transform:scale(var(--spectrum-coach-indicator-quiet-animation-keyframe-0-scale));opacity:var(--spectrum-coach-indicator-animation-keyframe-0-opacity)}50%{transform:scale(var(--spectrum-coach-indicator-animation-keyframe-50-scale));opacity:var(--spectrum-coach-indicator-animation-keyframe-50-opacity)}to{transform:scale(var(--spectrum-coach-indicator-animation-keyframe-100-scale));opacity:var(--spectrum-coach-indicator-animation-keyframe-100-opacity)}}:host{--spectrum-coach-indicator-ring-border-size:var(--system-coach-indicator-ring-border-size);--spectrum-coach-indicator-min-inline-size:var(--system-coach-indicator-min-inline-size);--spectrum-coach-indicator-min-block-size:var(--system-coach-indicator-min-block-size);--spectrum-coach-indicator-inline-size:var(--system-coach-indicator-inline-size);--spectrum-coach-indicator-block-size:var(--system-coach-indicator-block-size);--spectrum-coach-indicator-ring-inline-size:var(--system-coach-indicator-ring-inline-size);--spectrum-coach-indicator-ring-block-size:var(--system-coach-indicator-ring-block-size);--spectrum-coach-indicator-ring-dark-color:var(--system-coach-indicator-ring-dark-color);--spectrum-coach-indicator-ring-light-color:var(--system-coach-indicator-ring-light-color);--spectrum-coach-indicator-top:var(--system-coach-indicator-top);--spectrum-coach-indicator-left:var(--system-coach-indicator-left);--spectrum-coach-animation-indicator-ring-duration:var(--system-coach-indicator-coach-animation-indicator-ring-duration);--spectrum-coach-animation-indicator-ring-inner-delay-multiple:var(--system-coach-indicator-coach-animation-indicator-ring-inner-delay-multiple);--spectrum-coach-animation-indicator-ring-center-delay-multiple:var(--system-coach-indicator-coach-animation-indicator-ring-center-delay-multiple);--spectrum-coach-animation-indicator-ring-outer-delay-multiple:var(--system-coach-indicator-coach-animation-indicator-ring-outer-delay-multiple);--spectrum-coach-indicator-quiet-animation-ring-inner-delay-multiple:var(--system-coach-indicator-quiet-animation-ring-inner-delay-multiple);--spectrum-coach-indicator-animation-name:var(--system-coach-indicator-animation-name);--spectrum-coach-indicator-inner-animation-delay-multiple:var(--system-coach-indicator-inner-animation-delay-multiple);--spectrum-coach-indicator-animation-keyframe-0-scale:var(--system-coach-indicator-animation-keyframe-0-scale);--spectrum-coach-indicator-animation-keyframe-0-opacity:var(--system-coach-indicator-animation-keyframe-0-opacity);--spectrum-coach-indicator-animation-keyframe-50-scale:var(--system-coach-indicator-animation-keyframe-50-scale);--spectrum-coach-indicator-animation-keyframe-50-opacity:var(--system-coach-indicator-animation-keyframe-50-opacity);--spectrum-coach-indicator-animation-keyframe-100-scale:var(--system-coach-indicator-animation-keyframe-100-scale);--spectrum-coach-indicator-animation-keyframe-100-opacity:var(--system-coach-indicator-animation-keyframe-100-opacity);--spectrum-coach-indicator-quiet-animation-keyframe-0-scale:var(--system-coach-indicator-quiet-animation-keyframe-0-scale)}:host([quiet]){--spectrum-coach-indicator-quiet-ring-diameter-size:var(--system-coach-indicator-quiet-quiet-ring-diameter-size);--spectrum-coach-indicator-animation-name:var(--system-coach-indicator-quiet-animation-name)}:host{display:inline-block}
`,__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__decorateClass=(decorators,target,key,kind)=>{for(var decorator,result=kind>1?void 0:kind?__getOwnPropDesc(target,key):target,i=decorators.length-1;i>=0;i--)(decorator=decorators[i])&&(result=(kind?decorator(target,key,result):decorator(result))||result);return kind&&result&&__defProp(target,key,result),result};class CoachIndicator extends index_dev.wG{constructor(){super(...arguments),this.quiet=!1}static get styles(){return[coach_indicator_css]}render(){return index_dev.qy`
            <div class="ring"></div>
            <div class="ring"></div>
            <div class="ring"></div>
        `}}__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],CoachIndicator.prototype,"quiet",2),__decorateClass([(0,decorators_dev.MZ)({reflect:!0,attribute:"static-color"})],CoachIndicator.prototype,"staticColor",2),(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-coach-indicator",CoachIndicator)},"./packages/coachmark/stories/coach-indicator-static.stories.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:function(){return __namedExportsOrder},staticBlack:function(){return staticBlack},staticWhite:function(){return staticWhite}});var _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./tools/base/src/index.dev.js"),_button_stories_index_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/button/stories/index.js");__webpack_require__("./packages/coachmark/sp-coach-indicator.dev.js");__webpack_exports__.default={title:"CoachIndicator",component:"sp-coach-indicator",decorators:[(0,_button_stories_index_js__WEBPACK_IMPORTED_MODULE_1__.dg)()]};const staticWhite=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-coach-indicator static-color="white"></sp-coach-indicator>
        <sp-coach-indicator quiet static-color="white"></sp-coach-indicator>
    `,staticBlack=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-coach-indicator static-color="black"></sp-coach-indicator>
        <sp-coach-indicator quiet static-color="black"></sp-coach-indicator>
    `,__namedExportsOrder=["staticWhite","staticBlack"];staticWhite.parameters={...staticWhite.parameters,docs:{...staticWhite.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-coach-indicator static-color="white"></sp-coach-indicator>\n        <sp-coach-indicator quiet static-color="white"></sp-coach-indicator>\n    `;\n}',...staticWhite.parameters?.docs?.source}}},staticBlack.parameters={...staticBlack.parameters,docs:{...staticBlack.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-coach-indicator static-color="black"></sp-coach-indicator>\n        <sp-coach-indicator quiet static-color="black"></sp-coach-indicator>\n    `;\n}',...staticBlack.parameters?.docs?.source}}}},"./packages/icon/sp-icon.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var _src_Icon_dev_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icon/src/Icon.dev.js");(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon",_src_Icon_dev_js__WEBPACK_IMPORTED_MODULE_0__.I)},"./packages/icons-workflow/icons/sp-icon-help.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-workflow/src/custom-tag.js"),Help=__webpack_require__("./packages/icons-workflow/src/icons/Help.js"),HelpCircle=__webpack_require__("./packages/icons-workflow/src/icons-s2/HelpCircle.js");class IconHelp extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),1===this.spectrumVersion?(0,Help.N)({hidden:!this.label,title:this.label}):(0,HelpCircle.V)({hidden:!this.label,title:this.label})}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon-help",IconHelp)},"./packages/icons-workflow/src/icons-s2/HelpCircle.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{V:function(){return HelpCircleIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const HelpCircleIcon=({width:e=24,height:l=24,hidden:r=!1,title:t="Help Circle"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${e}"
    height="${l}"
    viewBox="0 0 20 20"
    aria-hidden=${r?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${t}"
  >
    <path
      d="m9.9881,15.52679c-.23065.00813-.45538-.07387-.62661-.22862-.33033-.36505-.33033-.92102,0-1.28607.16935-.15851.39483-.24308.62664-.23504.23635-.00948.46589.08035.63302.24775.16207.1679.24916.39432.24137.62755.01238.23497-.06959.46515-.2277.6394-.17358.16474-.40786.24988-.64671.23503Z"
      fill="currentColor"
    />
    <path
      d="m10,18.75c-4.8252,0-8.75-3.9248-8.75-8.75S5.1748,1.25,10,1.25s8.75,3.9248,8.75,8.75-3.9248,8.75-8.75,8.75Zm0-16c-3.99805,0-7.25,3.25195-7.25,7.25s3.25195,7.25,7.25,7.25,7.25-3.25195,7.25-7.25-3.25195-7.25-7.25-7.25Z"
      fill="currentColor"
    />
    <path
      d="m9.99219,12.70605c-.41406,0-.75-.33594-.75-.75,0-1.02246.07031-1.71387,1.03906-2.68262.78516-.78613.91797-1.10156.91797-1.65137,0-.20996-.06641-1.25781-1.37402-1.25781-1.36523,0-1.51074,1.15625-1.52637,1.3877-.02637.41309-.39258.7207-.79688.69922-.41406-.02734-.72656-.38379-.69922-.79688.06348-.96484.77637-2.79004,3.02246-2.79004,1.88672,0,2.87402,1.3877,2.87402,2.75781,0,1.14355-.45703,1.81055-1.35742,2.71191-.57617.57617-.59961.81152-.59961,1.62207,0,.41406-.33594.75-.75.75Z"
      fill="currentColor"
    />
  </svg>`},"./packages/icons-workflow/src/icons/Help.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{N:function(){return HelpIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const HelpIcon=({width:e=24,height:a=24,hidden:t=!1,title:l="Help"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    height="${a}"
    viewBox="0 0 36 36"
    width="${e}"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${l}"
  >
    <path
      d="M18 2a16 16 0 1 0 16 16A16 16 0 0 0 18 2Zm.047 26.876a2.69 2.69 0 1 1 0-5.375 2.62 2.62 0 0 1 2.8 2.67 2.581 2.581 0 0 1-2.8 2.705Zm3.566-12.818-.2.21c-.789.829-1.684 1.768-1.684 2.351a2.771 2.771 0 0 0 .359 1.348l.145.277-.113.429a.617.617 0 0 1-.567.378h-2.682a.867.867 0 0 1-.65-.235 4.111 4.111 0 0 1-.845-2.525c0-1.677.934-2.714 2.225-4.15.2-.219.39-.42.575-.609.629-.651 1.013-1.071 1.013-1.515 0-.308 0-1.245-1.786-1.245a5.918 5.918 0 0 0-3.159.919.592.592 0 0 1-.653-.02l-.237-.169-.055-.443v-2.9a.879.879 0 0 1 .393-.819 8.275 8.275 0 0 1 4.3-1.1c3.291 0 5.5 2.117 5.5 5.272a6.131 6.131 0 0 1-1.879 4.546Z"
    />
  </svg>`}}]);
//# sourceMappingURL=coachmark-stories-coach-indicator-static-stories.d0998614.iframe.bundle.js.map