"use strict";(self.webpackChunk_spectrum_web_components_1st_gen=self.webpackChunk_spectrum_web_components_1st_gen||[]).push([[5770],{"./packages/field-label/stories/field-label.stories.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:function(){return __namedExportsOrder},nativeInput:function(){return nativeInput},picker:function(){return picker},required:function(){return required},sideAlignEnd:function(){return sideAlignEnd},sideAlignStart:function(){return sideAlignStart},standard:function(){return standard}});var _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./tools/base/src/index.dev.js");__webpack_require__("./packages/textfield/sp-textfield.dev.js"),__webpack_require__("./packages/picker/sp-picker.dev.js"),__webpack_require__("./packages/field-label/sp-field-label.dev.js");__webpack_exports__.default={title:"Field Label",component:"sp-field-label"};const standard=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-field-label for="lifestory-1">Life Story</sp-field-label>
        <sp-textfield
            placeholder="Enter your life story"
            id="lifestory-1"
        ></sp-textfield>
        <sp-field-label for="lifestory-2" disabled>
            Life Story
            <sp-textfield
                placeholder="Enter your life story"
                disabled
                id="lifestory-2"
            ></sp-textfield>
        </sp-field-label>
    `,sideAlignStart=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-field-label
            for="lifestory"
            side-aligned="start"
            style="width: 72px;"
        >
            Life Story
        </sp-field-label>
        <sp-textfield
            placeholder="Enter your life story"
            id="lifestory"
        ></sp-textfield>
    `,sideAlignEnd=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-field-label for="lifestory" side-aligned="end" style="width: 72px;">
            Life Story
        </sp-field-label>
        <sp-textfield
            placeholder="Enter your life story"
            id="lifestory"
        ></sp-textfield>
    `,required=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-field-label for="lifestory-1" required>Life Story</sp-field-label>
        <sp-textfield
            placeholder="Enter your life story"
            id="lifestory-1"
        ></sp-textfield>
        <sp-field-label for="lifestory-2">Life Story (Required)</sp-field-label>
        <sp-textfield
            placeholder="Enter your life story"
            id="lifestory-2"
        ></sp-textfield>
        <br />
        <br />
        <sp-field-label for="lifestory-3" side-aligned="start" required>
            Life Story
        </sp-field-label>
        <sp-textfield
            placeholder="Enter your life story"
            id="lifestory-3"
        ></sp-textfield>
        <br />
        <br />
        <sp-field-label for="lifestory-4" side-aligned="end" required>
            Life Story
        </sp-field-label>
        <sp-textfield
            placeholder="Enter your life story"
            id="lifestory-4"
        ></sp-textfield>
        <sp-field-label for="lifestory-5" required disabled>
            Life Story
        </sp-field-label>
        <sp-textfield
            placeholder="Enter your life story"
            disabled
            id="lifestory-5"
        ></sp-textfield>
    `,picker=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-field-label for="country" required>
            Select a Country with a very long label, too long in fact
        </sp-field-label>
        <sp-picker id="country" value="item-2">
            <sp-menu-item value="item-1">Deselect</sp-menu-item>
            <sp-menu-item value="item-2">Select Inverse</sp-menu-item>
            <sp-menu-item value="item-3">Feather...</sp-menu-item>
            <sp-menu-item value="item-4">Select and Mask...</sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item value="item-5">Save Selection</sp-menu-item>
            <sp-menu-item disabled value="item-6">Make Work Path</sp-menu-item>
        </sp-picker>
    `,nativeInput=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-field-label for="lifestory-1" required>Life Story</sp-field-label>
        <input placeholder="Enter your life story" id="lifestory-1" />
    `,__namedExportsOrder=["standard","sideAlignStart","sideAlignEnd","required","picker","nativeInput"];standard.parameters={...standard.parameters,docs:{...standard.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-field-label for="lifestory-1">Life Story</sp-field-label>\n        <sp-textfield\n            placeholder="Enter your life story"\n            id="lifestory-1"\n        ></sp-textfield>\n        <sp-field-label for="lifestory-2" disabled>\n            Life Story\n            <sp-textfield\n                placeholder="Enter your life story"\n                disabled\n                id="lifestory-2"\n            ></sp-textfield>\n        </sp-field-label>\n    `;\n}',...standard.parameters?.docs?.source}}},sideAlignStart.parameters={...sideAlignStart.parameters,docs:{...sideAlignStart.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-field-label\n            for="lifestory"\n            side-aligned="start"\n            style="width: 72px;"\n        >\n            Life Story\n        </sp-field-label>\n        <sp-textfield\n            placeholder="Enter your life story"\n            id="lifestory"\n        ></sp-textfield>\n    `;\n}',...sideAlignStart.parameters?.docs?.source}}},sideAlignEnd.parameters={...sideAlignEnd.parameters,docs:{...sideAlignEnd.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-field-label for="lifestory" side-aligned="end" style="width: 72px;">\n            Life Story\n        </sp-field-label>\n        <sp-textfield\n            placeholder="Enter your life story"\n            id="lifestory"\n        ></sp-textfield>\n    `;\n}',...sideAlignEnd.parameters?.docs?.source}}},required.parameters={...required.parameters,docs:{...required.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-field-label for="lifestory-1" required>Life Story</sp-field-label>\n        <sp-textfield\n            placeholder="Enter your life story"\n            id="lifestory-1"\n        ></sp-textfield>\n        <sp-field-label for="lifestory-2">Life Story (Required)</sp-field-label>\n        <sp-textfield\n            placeholder="Enter your life story"\n            id="lifestory-2"\n        ></sp-textfield>\n        <br />\n        <br />\n        <sp-field-label for="lifestory-3" side-aligned="start" required>\n            Life Story\n        </sp-field-label>\n        <sp-textfield\n            placeholder="Enter your life story"\n            id="lifestory-3"\n        ></sp-textfield>\n        <br />\n        <br />\n        <sp-field-label for="lifestory-4" side-aligned="end" required>\n            Life Story\n        </sp-field-label>\n        <sp-textfield\n            placeholder="Enter your life story"\n            id="lifestory-4"\n        ></sp-textfield>\n        <sp-field-label for="lifestory-5" required disabled>\n            Life Story\n        </sp-field-label>\n        <sp-textfield\n            placeholder="Enter your life story"\n            disabled\n            id="lifestory-5"\n        ></sp-textfield>\n    `;\n}',...required.parameters?.docs?.source}}},picker.parameters={...picker.parameters,docs:{...picker.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-field-label for="country" required>\n            Select a Country with a very long label, too long in fact\n        </sp-field-label>\n        <sp-picker id="country" value="item-2">\n            <sp-menu-item value="item-1">Deselect</sp-menu-item>\n            <sp-menu-item value="item-2">Select Inverse</sp-menu-item>\n            <sp-menu-item value="item-3">Feather...</sp-menu-item>\n            <sp-menu-item value="item-4">Select and Mask...</sp-menu-item>\n            <sp-menu-divider></sp-menu-divider>\n            <sp-menu-item value="item-5">Save Selection</sp-menu-item>\n            <sp-menu-item disabled value="item-6">Make Work Path</sp-menu-item>\n        </sp-picker>\n    `;\n}',...picker.parameters?.docs?.source}}},nativeInput.parameters={...nativeInput.parameters,docs:{...nativeInput.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-field-label for="lifestory-1" required>Life Story</sp-field-label>\n        <input placeholder="Enter your life story" id="lifestory-1" />\n    `;\n}',...nativeInput.parameters?.docs?.source}}}},"./packages/textfield/sp-textfield.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var _src_Textfield_dev_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/textfield/src/Textfield.dev.js");(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-textfield",_src_Textfield_dev_js__WEBPACK_IMPORTED_MODULE_0__.q)}}]);
//# sourceMappingURL=field-label-stories-field-label-stories.f412cf08.iframe.bundle.js.map