"use strict";(self.webpackChunk_spectrum_web_components_1st_gen=self.webpackChunk_spectrum_web_components_1st_gen||[]).push([[4859],{"./packages/tags/stories/tags-sizes.stories.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:function(){return __namedExportsOrder},l:function(){return l},m:function(){return m},s:function(){return s}});var _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./tools/base/src/index.dev.js");__webpack_require__("./packages/tags/sp-tag.dev.js"),__webpack_require__("./packages/tags/sp-tags.dev.js"),__webpack_require__("./packages/avatar/sp-avatar.dev.js"),__webpack_require__("./packages/icon/sp-icon.dev.js"),__webpack_require__("./packages/icons-workflow/icons/sp-icon-magnify.js");__webpack_exports__.default={title:"Tags/Sizes",component:"sp-tags"};const template=({size:size})=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
    <sp-tags>
        <sp-tag deletable size=${size}>
            Tag 1
            <sp-icon-magnify slot="icon"></sp-icon-magnify>
        </sp-tag>
        <sp-tag invalid deletable size=${size}>
            Tag 2
            <sp-icon-magnify slot="icon"></sp-icon-magnify>
        </sp-tag>
        <sp-tag disabled deletable size=${size}>
            Tag 3
            <sp-icon-magnify slot="icon"></sp-icon-magnify>
        </sp-tag>
    </sp-tags>
`,s=()=>template({size:"s"}),m=()=>template({size:"m"}),l=()=>template({size:"l"}),__namedExportsOrder=["s","m","l"];s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:'() => template({\n  size: "s"\n})',...s.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:'() => template({\n  size: "m"\n})',...m.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:'() => template({\n  size: "l"\n})',...l.parameters?.docs?.source}}}}}]);
//# sourceMappingURL=tags-stories-tags-sizes-stories.a02250d7.iframe.bundle.js.map