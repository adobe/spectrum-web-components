"use strict";(self.webpackChunk_spectrum_web_components_1st_gen=self.webpackChunk_spectrum_web_components_1st_gen||[]).push([[4060],{"./packages/action-button/stories/action-button-black.stories.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{XL:function(){return XL},XS:function(){return XS},__namedExportsOrder:function(){return __namedExportsOrder},l:function(){return l},m:function(){return m},s:function(){return s}});var _button_stories_index_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/button/stories/index.js"),_index_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/action-button/stories/index.js");__webpack_exports__.default={component:"sp-action-button",title:"Action Button/Static Black",decorators:[(0,_button_stories_index_js__WEBPACK_IMPORTED_MODULE_0__.dg)("black")]};const XS=args=>(0,_index_js__WEBPACK_IMPORTED_MODULE_1__.C)(args);XS.args={size:"xs",staticColor:"black"};const s=args=>(0,_index_js__WEBPACK_IMPORTED_MODULE_1__.C)(args);s.args={size:"s",staticColor:"black"};const m=args=>(0,_index_js__WEBPACK_IMPORTED_MODULE_1__.C)(args);m.args={size:"m",staticColor:"black"};const l=args=>(0,_index_js__WEBPACK_IMPORTED_MODULE_1__.C)(args);l.args={size:"l",staticColor:"black"};const XL=args=>(0,_index_js__WEBPACK_IMPORTED_MODULE_1__.C)(args);XL.args={size:"xl",staticColor:"black"};const __namedExportsOrder=["XS","s","m","l","XL"];XS.parameters={...XS.parameters,docs:{...XS.parameters?.docs,source:{originalSource:"args => renderButtons(args)",...XS.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:"args => renderButtons(args)",...s.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:"args => renderButtons(args)",...m.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:"args => renderButtons(args)",...l.parameters?.docs?.source}}},XL.parameters={...XL.parameters,docs:{...XL.parameters?.docs,source:{originalSource:"args => renderButtons(args)",...XL.parameters?.docs?.source}}}},"./packages/action-button/stories/index.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{C:function(){return renderButtons},v:function(){return renderButton}});var _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./tools/base/src/index.dev.js"),_spectrum_web_components_base_src_directives_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./tools/base/src/directives.dev.js");__webpack_require__("./packages/action-group/sp-action-group.dev.js"),__webpack_require__("./packages/icon/sp-icon.dev.js"),__webpack_require__("./packages/icons-workflow/icons/sp-icon-edit.js"),__webpack_require__("./packages/action-button/sp-action-button.dev.js");function renderButton({icon:icon,label:label,...properties}){return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-action-button
            href=${(0,_spectrum_web_components_base_src_directives_js__WEBPACK_IMPORTED_MODULE_1__.JR)(properties.href)}
            ?quiet="${!!properties.quiet}"
            ?emphasized="${!!properties.emphasized}"
            static-color="${(0,_spectrum_web_components_base_src_directives_js__WEBPACK_IMPORTED_MODULE_1__.JR)(properties.staticColor)}"
            ?disabled=${!!properties.disabled}
            ?selected=${!!properties.selected}
            ?toggles=${!!properties.toggles}
            size=${properties.size||"m"}
            ?hold-affordance=${!!properties.holdAffordance}
            ?active=${!!properties.active}
        >
            ${icon?(0,_spectrum_web_components_base_src_directives_js__WEBPACK_IMPORTED_MODULE_1__.HG)(icon):_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.s6}${label}
        </sp-action-button>
    `}function renderGroup(properties){const icon='<sp-icon-edit slot="icon"></sp-icon-edit>';return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-action-group
            ?quiet="${!!properties.quiet}"
            ?emphasized="${!!properties.emphasized}"
            size=${properties.size||"m"}
            static-color="${(0,_spectrum_web_components_base_src_directives_js__WEBPACK_IMPORTED_MODULE_1__.JR)(properties.staticColor)}"
        >
            ${renderButton({...properties,label:"Edit"})}
            ${renderButton({...properties,label:"Edit",icon:icon})}
            ${renderButton({...properties,icon:icon})}
            ${renderButton({...properties,icon:icon,holdAffordance:!0})}
        </sp-action-group>
    `}function renderButtons(properties){return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <div
            style="display: flex; flex-direction: column; gap: calc(var(--spectrum-spacing-100) * var(--swc-scale-factor));"
        >
            ${renderGroup(properties)}
            ${renderGroup({...properties,selected:!0})}
            ${renderGroup({...properties,disabled:!0})}
            ${renderGroup({...properties,disabled:!0,selected:!0})}
        </div>
    `}},"./packages/button/sp-button.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var _src_Button_dev_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/button/src/Button.dev.js");(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-button",_src_Button_dev_js__WEBPACK_IMPORTED_MODULE_0__.$n)},"./packages/button/stories/index.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{BK:function(){return renderLink},Uv:function(){return argTypes},a2:function(){return args},aR:function(){return renderWithIconOnly},c5:function(){return renderLinkWithTarget},dg:function(){return makeOverBackground},jM:function(){return renderButtonSet},oX:function(){return renderWithIcon},pG:function(){return renderMinWidthButton},vb:function(){return renderButton}});var _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./tools/base/src/index.dev.js"),_spectrum_web_components_base_src_directives_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./tools/base/src/directives.dev.js");__webpack_require__("./packages/button/sp-button.dev.js"),__webpack_require__("./packages/icon/sp-icon.dev.js"),__webpack_require__("./packages/icons-workflow/icons/sp-icon-help.js");const args={disabled:!1,variant:"cta",pending:!1},argTypes={disabled:{name:"disabled",type:{name:"boolean",required:!1},description:"Disable this control. It will not receive focus or events.",table:{type:{summary:"boolean"},defaultValue:{summary:!1}},control:{type:"boolean"}},variant:{name:"variant",type:{name:"string",required:!1},description:"The visual variant to apply to the button.",table:{type:{summary:"string"},defaultValue:{summary:"cta"}},control:{type:"inline-radio",options:["cta","accent","primary","secondary","negative","overBackground","black","white"]}},treatment:{name:"treatment",type:{name:"string",required:!1},description:"The visual treatment to apply to the button.",table:{type:{summary:"string"},defaultValue:{summary:"fill"}},control:{type:"inline-radio",options:["fill","outline"]}},pending:{name:"pending",type:{name:"boolean",required:!1},description:"Shows the pending state of the button.",table:{type:{summary:"boolean"},defaultValue:{summary:!1}},control:{type:"boolean"}},label:{name:"label",type:{name:"string",required:!1},description:"The label to apply to the aria-label of the button.",table:{type:{summary:"string"}},control:{type:"text"}}},makeOverBackground=staticColor=>story=>{const color="black"===staticColor?"var(--spectrum-docs-static-black-background-color)":"var(--spectrum-docs-static-white-background-color)";return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
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
    `,href="https://github.com/adobe/spectrum-web-components",renderLink=props=>renderButtonSet({...props,href:href}),renderLinkWithTarget=props=>renderButtonSet({...props,href:href,target:"_blank"})},"./packages/icon/sp-icon.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var _src_Icon_dev_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icon/src/Icon.dev.js");(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon",_src_Icon_dev_js__WEBPACK_IMPORTED_MODULE_0__.I)},"./packages/icons-workflow/icons/sp-icon-edit.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");var Edit=__webpack_require__("./packages/icons-workflow/src/icons/Edit.js");class IconEdit extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),2===this.spectrumVersion?(({width:t=24,height:l=24,hidden:e=!1,title:r="Edit"}={})=>custom_tag.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${t}"
    height="${l}"
    viewBox="0 0 20 20"
    aria-hidden=${e?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${r}"
  >
    <path
      d="m17.78076,1.75684c-1.27197-1.04102-3.22705-.89844-4.4502.32324L3.07764,12.33398c-.32031.31934-.55859.7168-.68896,1.15039l-1.38428,4.58398c-.08008.26465-.00781.55176.1875.74707.14258.14258.33447.21973.53027.21973.07227,0,.14551-.01074.2168-.03223l4.58252-1.38379c.43359-.12988.83154-.36816,1.15088-.68848,0,0,10.16846-10.16797,10.35547-10.35547.64795-.64746.99316-1.54492.94775-2.45996-.0459-.91504-.48145-1.77539-1.19482-2.3584ZM2.84473,17.16309l.97998-3.24609c.02716-.09033.06714-.17578.11377-.25732l2.40869,2.40918c-.08154.04639-.16718.08643-.25781.11377l-3.24463.98047Zm14.12158-11.64746c-.15472.15552-7.09985,7.1001-9.52545,9.52588l-2.47461-2.4751L14.39111,3.14062c.38623-.38672.896-.58594,1.38965-.58594.38086,0,.75244.11914,1.05029.3623.3916.32129.62109.77246.646,1.27246.0249.49316-.16113.97656-.51074,1.32617Z"
      fill="currentColor"
    />
  </svg>`)({hidden:!this.label,title:this.label}):(0,Edit.q)({hidden:!this.label,title:this.label})}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon-edit",IconEdit)},"./packages/icons-workflow/icons/sp-icon-help.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-workflow/src/custom-tag.js"),Help=__webpack_require__("./packages/icons-workflow/src/icons/Help.js"),HelpCircle=__webpack_require__("./packages/icons-workflow/src/icons-s2/HelpCircle.js");class IconHelp extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),1===this.spectrumVersion?(0,Help.N)({hidden:!this.label,title:this.label}):(0,HelpCircle.V)({hidden:!this.label,title:this.label})}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon-help",IconHelp)},"./packages/icons-workflow/src/icons-s2/HelpCircle.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{V:function(){return HelpCircleIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const HelpCircleIcon=({width:e=24,height:l=24,hidden:r=!1,title:t="Help Circle"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
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
  </svg>`},"./packages/icons-workflow/src/icons/Edit.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{q:function(){return EditIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const EditIcon=({width:t=24,height:e=24,hidden:a=!1,title:l="Edit"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
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
      d="M33.567 8.2 27.8 2.432a1.215 1.215 0 0 0-.866-.353H26.9a1.371 1.371 0 0 0-.927.406L5.084 23.372a.99.99 0 0 0-.251.422L2.055 33.1c-.114.377.459.851.783.851a.251.251 0 0 0 .062-.007c.276-.063 7.866-2.344 9.311-2.778a.972.972 0 0 0 .414-.249l20.888-20.889a1.372 1.372 0 0 0 .4-.883 1.221 1.221 0 0 0-.346-.945ZM11.4 29.316c-2.161.649-4.862 1.465-6.729 2.022l2.009-6.73Z"
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
//# sourceMappingURL=action-button-stories-action-button-black-stories.c8a335f7.iframe.bundle.js.map