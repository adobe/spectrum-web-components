"use strict";(self.webpackChunk_spectrum_web_components_1st_gen=self.webpackChunk_spectrum_web_components_1st_gen||[]).push([[2140],{"./tools/styles/stories/styles.stories.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:function(){return __namedExportsOrder},dividers:function(){return dividers}});var _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./tools/base/src/index.dev.js");__webpack_exports__.default={title:"Styles"};const dividers=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
    <style>
        .app-dividers {
            display: grid;
            position: absolute;
            inset: 0;
            grid-template-areas:
                'header header header'
                'toolbar main properties';
            grid-template-columns: 50px 1fr 250px;
            grid-template-rows: 50px 1fr;
            gap: var(--spectrum-global-alias-appframe-border-size);
            background: var(--spectrum-background-base-color);
        }
        header,
        aside {
            background: var(--spectrum-background-layer-1-color);
        }
        header {
            grid-area: header;
        }
        header + aside {
            grid-area: toolbar;
        }
        main {
            grid-area: main;
            background: var(--spectrum-background-layer-2-color);
        }
        main + aside {
            grid-area: properties;
        }
    </style>
    <div class="app-dividers">
        <header></header>
        <aside></aside>
        <main></main>
        <aside></aside>
    </div>
`,__namedExportsOrder=["dividers"];dividers.parameters={...dividers.parameters,docs:{...dividers.parameters?.docs,source:{originalSource:"() => html`\n    <style>\n        .app-dividers {\n            display: grid;\n            position: absolute;\n            inset: 0;\n            grid-template-areas:\n                'header header header'\n                'toolbar main properties';\n            grid-template-columns: 50px 1fr 250px;\n            grid-template-rows: 50px 1fr;\n            gap: var(--spectrum-global-alias-appframe-border-size);\n            background: var(--spectrum-background-base-color);\n        }\n        header,\n        aside {\n            background: var(--spectrum-background-layer-1-color);\n        }\n        header {\n            grid-area: header;\n        }\n        header + aside {\n            grid-area: toolbar;\n        }\n        main {\n            grid-area: main;\n            background: var(--spectrum-background-layer-2-color);\n        }\n        main + aside {\n            grid-area: properties;\n        }\n    </style>\n    <div class=\"app-dividers\">\n        <header></header>\n        <aside></aside>\n        <main></main>\n        <aside></aside>\n    </div>\n`",...dividers.parameters?.docs?.source}}}}}]);
//# sourceMappingURL=styles-stories-styles-stories.0d337628.iframe.bundle.js.map