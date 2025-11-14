"use strict";(self.webpackChunk_spectrum_web_components_1st_gen=self.webpackChunk_spectrum_web_components_1st_gen||[]).push([[4565],{"./packages/swatch/stories/swatch-sizes.stories.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{XS:function(){return XS},__namedExportsOrder:function(){return __namedExportsOrder},l:function(){return l},m:function(){return m},s:function(){return s}});var _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./tools/base/src/index.dev.js");__webpack_require__("./packages/swatch/sp-swatch.dev.js");__webpack_exports__.default={title:"Swatch/Sizes",component:"sp-swatch"};const template=({size:size,color:color="rgb(255 0 0 / 0.7)"})=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
    <div style="display: flex; gap: 5px;">
        <sp-swatch color=${color} size=${size}></sp-swatch>
        <sp-swatch color=${color} rounding="none" size=${size}></sp-swatch>
        <sp-swatch color=${color} rounding="full" size=${size}></sp-swatch>
        <sp-swatch color=${color} border="light" size=${size}></sp-swatch>
        <sp-swatch color=${color} border="none" size=${size}></sp-swatch>
        <sp-swatch nothing size=${size}></sp-swatch>
        <sp-swatch color=${color} shape="rectangle" size=${size}></sp-swatch>
        <sp-swatch
            color=${color}
            shape="rectangle"
            size=${size}
            disabled
        ></sp-swatch>
        <sp-swatch
            rounding="full"
            shape="rectangle"
            size=${size}
            mixed-value
        ></sp-swatch>
    </div>
`,XS=()=>template({size:"xs"}),s=()=>template({size:"s"}),m=()=>template({size:"m"}),l=()=>template({size:"l"}),__namedExportsOrder=["XS","s","m","l"];XS.parameters={...XS.parameters,docs:{...XS.parameters?.docs,source:{originalSource:'() => template({\n  size: "xs"\n})',...XS.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:'() => template({\n  size: "s"\n})',...s.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:'() => template({\n  size: "m"\n})',...m.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:'() => template({\n  size: "l"\n})',...l.parameters?.docs?.source}}}}}]);
//# sourceMappingURL=swatch-stories-swatch-sizes-stories.fd969de6.iframe.bundle.js.map