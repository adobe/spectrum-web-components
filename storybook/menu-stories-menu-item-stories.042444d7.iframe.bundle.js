"use strict";(self.webpackChunk_spectrum_web_components_1st_gen=self.webpackChunk_spectrum_web_components_1st_gen||[]).push([[9858],{"./packages/icons-workflow/icons/sp-icon-edit.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");var Edit=__webpack_require__("./packages/icons-workflow/src/icons/Edit.js");class IconEdit extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),2===this.spectrumVersion?(({width:t=24,height:l=24,hidden:e=!1,title:r="Edit"}={})=>custom_tag.T`<svg
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
  </svg>`},"./packages/menu/stories/menu-item.stories.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:function(){return Default},MenuItemWithCheckbox:function(){return MenuItemWithCheckbox},__namedExportsOrder:function(){return __namedExportsOrder},descriptionSlot:function(){return descriptionSlot},href:function(){return href},noWrap:function(){return noWrap},valueSlot:function(){return valueSlot}});var _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./tools/base/src/index.dev.js"),_spectrum_web_components_base_src_directives_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./tools/base/src/directives.dev.js");__webpack_require__("./packages/icons-workflow/icons/sp-icon-edit.js"),__webpack_require__("./packages/menu/sp-menu.dev.js"),__webpack_require__("./packages/menu/sp-menu-item.dev.js"),__webpack_require__("./packages/action-button/sp-action-button.dev.js"),__webpack_require__("./packages/checkbox/sp-checkbox.dev.js");__webpack_exports__.default={component:"sp-menu-item",title:"Menu Item"};const Default=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-menu>
            <sp-menu-item>Menu Item</sp-menu-item>
        </sp-menu>
    `;class CheckBoxBehindMenuItem extends _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.WF{constructor(){super(...arguments),this._renderMenu=!0}_onMenuChange(_event){this._renderMenu=!1,this.requestUpdate(),console.log("On menu change, renderMenu: ",this._renderMenu)}_onCheckboxChange(_event){console.log("On checkbox change")}_handleReset(){this._renderMenu=!0,this.requestUpdate()}render(){return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
            <sp-action-button @click=${this._handleReset}>
                Reset
            </sp-action-button>
            ${(0,_spectrum_web_components_base_src_directives_js__WEBPACK_IMPORTED_MODULE_1__.z7)(this._renderMenu,()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
                    <sp-menu @change=${this._onMenuChange}>
                        <sp-menu-item value="Item 1">
                            Click left margin!
                        </sp-menu-item>
                    </sp-menu>
                `)}
            ${(0,_spectrum_web_components_base_src_directives_js__WEBPACK_IMPORTED_MODULE_1__.z7)(!this._renderMenu,()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
                    <sp-checkbox @change=${this._onCheckboxChange}>
                        Should not be checked
                    </sp-checkbox>
                `)}
        `}}customElements.define("checkbox-behind-menu-item",CheckBoxBehindMenuItem);const MenuItemWithCheckbox=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <checkbox-behind-menu-item></checkbox-behind-menu-item>
    `;MenuItemWithCheckbox.swc_vrt={skip:!0};const noWrap=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-menu style="width: 150px;">
            <sp-menu-item no-wrap>
                Select a Country with a very long label, too long, in fact
            </sp-menu-item>
        </sp-menu>
    `,descriptionSlot=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-menu>
            <sp-menu-item>
                Quick export
                <span slot="description">Share a snapshot</span>
            </sp-menu-item>
        </sp-menu>
    `,valueSlot=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <style>
            kbd {
                font-family: var(--spectrum-alias-body-text-font-family);
                white-space: nowrap;
            }
        </style>
        <sp-menu style="width: 150px;" selects="single">
            <sp-menu-item>
                Save
                <kbd slot="value">⌘​S</kbd>
            </sp-menu-item>
            <sp-menu-item selected>
                Save As...
                <kbd slot="value">⇧​⌘​S</kbd>
            </sp-menu-item>
            <sp-menu-item disabled>
                Save All
                <kbd slot="value">⌥​⌘​S</kbd>
            </sp-menu-item>
        </sp-menu>
    `,href=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-menu style="width: 150px;">
            <sp-menu-item
                href="https://opensource.adobe.com/spectrum-web-components"
            >
                <sp-icon-edit slot="icon"></sp-icon-edit>
                Edit the Documentation Site
            </sp-menu-item>
        </sp-menu>
    `,__namedExportsOrder=["Default","MenuItemWithCheckbox","noWrap","descriptionSlot","valueSlot","href"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"() => {\n  return html`\n        <sp-menu>\n            <sp-menu-item>Menu Item</sp-menu-item>\n        </sp-menu>\n    `;\n}",...Default.parameters?.docs?.source}}},MenuItemWithCheckbox.parameters={...MenuItemWithCheckbox.parameters,docs:{...MenuItemWithCheckbox.parameters?.docs,source:{originalSource:"() => {\n  return html`\n        <checkbox-behind-menu-item></checkbox-behind-menu-item>\n    `;\n}",...MenuItemWithCheckbox.parameters?.docs?.source}}},noWrap.parameters={...noWrap.parameters,docs:{...noWrap.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-menu style="width: 150px;">\n            <sp-menu-item no-wrap>\n                Select a Country with a very long label, too long, in fact\n            </sp-menu-item>\n        </sp-menu>\n    `;\n}',...noWrap.parameters?.docs?.source}}},descriptionSlot.parameters={...descriptionSlot.parameters,docs:{...descriptionSlot.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-menu>\n            <sp-menu-item>\n                Quick export\n                <span slot="description">Share a snapshot</span>\n            </sp-menu-item>\n        </sp-menu>\n    `;\n}',...descriptionSlot.parameters?.docs?.source}}},valueSlot.parameters={...valueSlot.parameters,docs:{...valueSlot.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <style>\n            kbd {\n                font-family: var(--spectrum-alias-body-text-font-family);\n                white-space: nowrap;\n            }\n        </style>\n        <sp-menu style="width: 150px;" selects="single">\n            <sp-menu-item>\n                Save\n                <kbd slot="value">⌘​S</kbd>\n            </sp-menu-item>\n            <sp-menu-item selected>\n                Save As...\n                <kbd slot="value">⇧​⌘​S</kbd>\n            </sp-menu-item>\n            <sp-menu-item disabled>\n                Save All\n                <kbd slot="value">⌥​⌘​S</kbd>\n            </sp-menu-item>\n        </sp-menu>\n    `;\n}',...valueSlot.parameters?.docs?.source}}},href.parameters={...href.parameters,docs:{...href.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-menu style="width: 150px;">\n            <sp-menu-item\n                href="https://opensource.adobe.com/spectrum-web-components"\n            >\n                <sp-icon-edit slot="icon"></sp-icon-edit>\n                Edit the Documentation Site\n            </sp-menu-item>\n        </sp-menu>\n    `;\n}',...href.parameters?.docs?.source}}}}}]);
//# sourceMappingURL=menu-stories-menu-item-stories.042444d7.iframe.bundle.js.map