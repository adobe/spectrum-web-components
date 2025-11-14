"use strict";(self.webpackChunk_spectrum_web_components_1st_gen=self.webpackChunk_spectrum_web_components_1st_gen||[]).push([[7906],{"./packages/button/sp-button.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var _src_Button_dev_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/button/src/Button.dev.js");(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-button",_src_Button_dev_js__WEBPACK_IMPORTED_MODULE_0__.$n)},"./packages/progress-circle/stories/progress-circle.stories.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:function(){return Default},__namedExportsOrder:function(){return __namedExportsOrder},inButton:function(){return inButton},staticWhite:function(){return staticWhite}});var _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./tools/base/src/index.dev.js");__webpack_require__("./packages/progress-circle/sp-progress-circle.dev.js"),__webpack_require__("./packages/button/sp-button.dev.js");__webpack_exports__.default={title:"Progress Circle",component:"sp-progress-circle",argTypes:{indeterminate:{name:"indeterminate",type:{name:"boolean",required:!1},description:"Whether the progress is indeterminate.",table:{type:{summary:"boolean"},defaultValue:{summary:!1}},control:{type:"boolean"}}}};const Default=({indeterminate:indeterminate}={})=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <div
            style="width: 250px; height: 150px; display: flex; align-items: center; justify-content: space-around;"
        >
            <sp-progress-circle
                progress="27"
                size="s"
                ?indeterminate=${indeterminate}
            ></sp-progress-circle>
            <sp-progress-circle
                progress="27"
                ?indeterminate=${indeterminate}
                label="Loading progress demo"
            ></sp-progress-circle>
            <sp-progress-circle
                progress="27"
                size="l"
                ?indeterminate=${indeterminate}
                label="Loading progress demo"
            ></sp-progress-circle>
        </div>
    `;Default.args={indeterminate:!1};const staticWhite=({indeterminate:indeterminate}={})=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <div
            style="width: 250px; height: 150px; background-color: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: space-around;"
        >
            <sp-progress-circle
                progress="53"
                static-color="white"
                size="s"
                ?indeterminate=${indeterminate}
                label="Loading progress demo"
            ></sp-progress-circle>
            <sp-progress-circle
                progress="53"
                static-color="white"
                ?indeterminate=${indeterminate}
                label="Loading progress demo"
            ></sp-progress-circle>
            <sp-progress-circle
                progress="53"
                static-color="white"
                size="l"
                ?indeterminate=${indeterminate}
                label="Loading progress demo"
            ></sp-progress-circle>
        </div>
    `;staticWhite.args={indeterminate:!1};const inButton=({indeterminate:indeterminate}={})=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
    <style>
        sp-progress-circle[slot='icon'] {
            align-self: center;
            margin-block: 0;
        }
    </style>
    <sp-button variant="black" style="color: white">
        <sp-progress-circle
            progress="53"
            static-color="white"
            size="s"
            ?indeterminate=${indeterminate}
            slot="icon"
            label="Processing"
        ></sp-progress-circle>
        Processing...
    </sp-button>
`,__namedExportsOrder=["Default","staticWhite","inButton"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'({\n  indeterminate\n} = {}) => {\n  return html`\n        <div\n            style="width: 250px; height: 150px; display: flex; align-items: center; justify-content: space-around;"\n        >\n            <sp-progress-circle\n                progress="27"\n                size="s"\n                ?indeterminate=${indeterminate}\n            ></sp-progress-circle>\n            <sp-progress-circle\n                progress="27"\n                ?indeterminate=${indeterminate}\n                label="Loading progress demo"\n            ></sp-progress-circle>\n            <sp-progress-circle\n                progress="27"\n                size="l"\n                ?indeterminate=${indeterminate}\n                label="Loading progress demo"\n            ></sp-progress-circle>\n        </div>\n    `;\n}',...Default.parameters?.docs?.source}}},staticWhite.parameters={...staticWhite.parameters,docs:{...staticWhite.parameters?.docs,source:{originalSource:'({\n  indeterminate\n} = {}) => {\n  return html`\n        <div\n            style="width: 250px; height: 150px; background-color: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: space-around;"\n        >\n            <sp-progress-circle\n                progress="53"\n                static-color="white"\n                size="s"\n                ?indeterminate=${indeterminate}\n                label="Loading progress demo"\n            ></sp-progress-circle>\n            <sp-progress-circle\n                progress="53"\n                static-color="white"\n                ?indeterminate=${indeterminate}\n                label="Loading progress demo"\n            ></sp-progress-circle>\n            <sp-progress-circle\n                progress="53"\n                static-color="white"\n                size="l"\n                ?indeterminate=${indeterminate}\n                label="Loading progress demo"\n            ></sp-progress-circle>\n        </div>\n    `;\n}',...staticWhite.parameters?.docs?.source}}},inButton.parameters={...inButton.parameters,docs:{...inButton.parameters?.docs,source:{originalSource:'({\n  indeterminate\n} = {}) => html`\n    <style>\n        sp-progress-circle[slot=\'icon\'] {\n            align-self: center;\n            margin-block: 0;\n        }\n    </style>\n    <sp-button variant="black" style="color: white">\n        <sp-progress-circle\n            progress="53"\n            static-color="white"\n            size="s"\n            ?indeterminate=${indeterminate}\n            slot="icon"\n            label="Processing"\n        ></sp-progress-circle>\n        Processing...\n    </sp-button>\n`',...inButton.parameters?.docs?.source}}}}}]);
//# sourceMappingURL=progress-circle-stories-progress-circle-stories.7aa62a3b.iframe.bundle.js.map