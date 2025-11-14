"use strict";(self.webpackChunk_spectrum_web_components_1st_gen=self.webpackChunk_spectrum_web_components_1st_gen||[]).push([[3521],{"./packages/action-button/stories/action-button-quiet.stories.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{XL:function(){return XL},XS:function(){return XS},__namedExportsOrder:function(){return __namedExportsOrder},l:function(){return l},m:function(){return m},s:function(){return s}});var _index_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/action-button/stories/index.js");__webpack_exports__.default={component:"sp-action-button",title:"Action Button/Standard Quiet"};const XS=args=>(0,_index_js__WEBPACK_IMPORTED_MODULE_0__.C)(args);XS.args={size:"xs",quiet:true};const s=args=>(0,_index_js__WEBPACK_IMPORTED_MODULE_0__.C)(args);s.args={size:"s",quiet:true};const m=args=>(0,_index_js__WEBPACK_IMPORTED_MODULE_0__.C)(args);m.args={size:"m",quiet:true};const l=args=>(0,_index_js__WEBPACK_IMPORTED_MODULE_0__.C)(args);l.args={size:"l",quiet:true};const XL=args=>(0,_index_js__WEBPACK_IMPORTED_MODULE_0__.C)(args);XL.args={size:"xl",quiet:true};const __namedExportsOrder=["XS","s","m","l","XL"];XS.parameters={...XS.parameters,docs:{...XS.parameters?.docs,source:{originalSource:"args => renderButtons(args)",...XS.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:"args => renderButtons(args)",...s.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:"args => renderButtons(args)",...m.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:"args => renderButtons(args)",...l.parameters?.docs?.source}}},XL.parameters={...XL.parameters,docs:{...XL.parameters?.docs,source:{originalSource:"args => renderButtons(args)",...XL.parameters?.docs?.source}}}},"./packages/action-button/stories/index.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{C:function(){return renderButtons},v:function(){return renderButton}});var _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./tools/base/src/index.dev.js"),_spectrum_web_components_base_src_directives_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./tools/base/src/directives.dev.js");__webpack_require__("./packages/action-group/sp-action-group.dev.js"),__webpack_require__("./packages/icon/sp-icon.dev.js"),__webpack_require__("./packages/icons-workflow/icons/sp-icon-edit.js"),__webpack_require__("./packages/action-button/sp-action-button.dev.js");function renderButton({icon:icon,label:label,...properties}){return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
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
    `}},"./packages/icon/sp-icon.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var _src_Icon_dev_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icon/src/Icon.dev.js");(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon",_src_Icon_dev_js__WEBPACK_IMPORTED_MODULE_0__.I)},"./packages/icons-workflow/icons/sp-icon-edit.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");var Edit=__webpack_require__("./packages/icons-workflow/src/icons/Edit.js");class IconEdit extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),2===this.spectrumVersion?(({width:t=24,height:l=24,hidden:e=!1,title:r="Edit"}={})=>custom_tag.T`<svg
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
  </svg>`)({hidden:!this.label,title:this.label}):(0,Edit.q)({hidden:!this.label,title:this.label})}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon-edit",IconEdit)},"./packages/icons-workflow/src/icons/Edit.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{q:function(){return EditIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const EditIcon=({width:t=24,height:e=24,hidden:a=!1,title:l="Edit"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
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
  </svg>`}}]);
//# sourceMappingURL=action-button-stories-action-button-quiet-stories.97ad812c.iframe.bundle.js.map