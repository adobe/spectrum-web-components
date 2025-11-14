"use strict";(self.webpackChunk_spectrum_web_components_1st_gen=self.webpackChunk_spectrum_web_components_1st_gen||[]).push([[5624],{"./packages/link/sp-link.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js"),like_anchor_dev=__webpack_require__("./tools/shared/src/like-anchor.dev.js"),focusable_dev=__webpack_require__("./tools/shared/src/focusable.dev.js");var link_css=__webpack_require__("./tools/base/src/index.dev.js").AH`
            /*!
 * Copyright 2025 Adobe. All rights reserved. This file is licensed to you under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0 Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License./
 * 
 *  Override divider background color when used inside alert-dialog/
 * .divider {
 *     --spectrum-divider-background-color: var(--system-alert-dialog-divider-background-color);
 *     --spectrum-divider-background-color-static-white: var(--spectrum-alert-dialog-divider-background-color-static-white);
 *     --spectrum-divider-background-color-static-black: var(--spectrum-alert-dialog-divider-background-color-static-black);
 * }
 */
@media (forced-colors:active){:host{--highcontrast-link-text-color:LinkText}}:host([variant=secondary]) a{--mod-link-text-color:var(--mod-link-text-color-secondary-default,var(--spectrum-neutral-content-color-default));--mod-link-text-color-hover:var(--mod-link-text-color-secondary-hover,var(--spectrum-neutral-content-color-hover));--mod-link-text-color-active:var(--mod-link-text-color-secondary-active,var(--spectrum-neutral-content-color-down));--mod-link-text-color-focus:var(--mod-link-text-color-secondary-focus,var(--spectrum-neutral-content-color-key-focus))}a{background-color:initial;text-decoration-skip:objects;transition:color var(--mod-link-animation-duration,var(--spectrum-animation-duration-100))ease-in-out;cursor:pointer;color:var(--highcontrast-link-text-color,var(--mod-link-text-color,var(--mod-link-text-color-primary-default,var(--spectrum-accent-content-color-default))));outline:none;text-decoration:underline}a:active{--mod-link-text-color:var(--mod-link-text-color-active,var(--mod-link-text-color-primary-active,var(--spectrum-accent-content-color-down)))}:host([quiet]) a{text-decoration:none}a:focus-visible,:host([quiet]) a:focus-visible{--mod-link-text-color:var(--mod-link-text-color-focus,var(--mod-link-text-color-primary-focus,var(--spectrum-accent-content-color-key-focus)));text-decoration:underline double;text-decoration-color:inherit}@media (hover:hover){a:hover{--mod-link-text-color:var(--mod-link-text-color-hover,var(--mod-link-text-color-primary-hover,var(--spectrum-accent-content-color-hover)))}:host([quiet]) a:hover{text-decoration:underline}}:host([static-color=white]) a{--mod-link-text-color:var(--mod-link-text-color-white,var(--spectrum-white));--mod-link-text-color-hover:var(--mod-link-text-color-white,var(--spectrum-white));--mod-link-text-color-active:var(--mod-link-text-color-white,var(--spectrum-white));--mod-link-text-color-focus:var(--mod-link-text-color-white,var(--spectrum-white))}:host([static-color=black]) a{--mod-link-text-color:var(--mod-link-text-color-black,var(--spectrum-black));--mod-link-text-color-hover:var(--mod-link-text-color-black,var(--spectrum-black));--mod-link-text-color-active:var(--mod-link-text-color-black,var(--spectrum-black));--mod-link-text-color-focus:var(--mod-link-text-color-black,var(--spectrum-black))}:host{display:inline}:host(:focus){outline:none}:host([href]) a:focus-visible{text-decoration:underline double}:host([disabled]){pointer-events:none}
        `,__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__decorateClass=(decorators,target,key,kind)=>{for(var decorator,result=kind>1?void 0:kind?__getOwnPropDesc(target,key):target,i=decorators.length-1;i>=0;i--)(decorator=decorators[i])&&(result=(kind?decorator(target,key,result):decorator(result))||result);return kind&&result&&__defProp(target,key,result),result};class Link extends((0,like_anchor_dev.$)(focusable_dev.z)){constructor(){super(...arguments),this.quiet=!1}static get styles(){return[link_css]}get focusElement(){return this.anchorElement}render(){return this.renderAnchor({id:"anchor"})}}__decorateClass([(0,decorators_dev.P)("#anchor")],Link.prototype,"anchorElement",2),__decorateClass([(0,decorators_dev.MZ)({type:String,reflect:!0})],Link.prototype,"variant",2),__decorateClass([(0,decorators_dev.MZ)({reflect:!0,attribute:"static-color"})],Link.prototype,"staticColor",2),__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0,attribute:"quiet"})],Link.prototype,"quiet",2),(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-link",Link)},"./packages/link/stories/link.stories.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:function(){return Default},Disabled:function(){return Disabled},Download:function(){return Download},Quiet:function(){return Quiet},__namedExportsOrder:function(){return __namedExportsOrder},secondary:function(){return secondary},secondaryQuiet:function(){return secondaryQuiet},staticBlack:function(){return staticBlack},staticBlackQuiet:function(){return staticBlackQuiet},staticWhite:function(){return staticWhite},staticWhiteQuiet:function(){return staticWhiteQuiet}});var _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./tools/base/src/index.dev.js");__webpack_require__("./packages/link/sp-link.dev.js");__webpack_exports__.default={component:"sp-link",title:"Link"};const Default=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        This is a <sp-link href="#">link</sp-link> in a sentence.
    `,Quiet=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        This is a <sp-link quiet href="#">quiet link</sp-link> in a sentence.
    `,Disabled=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        This is a <sp-link disabled onclick="('hi')" href="#">disabled non focusable link</sp-link> in a sentence.
    `,secondary=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        This is a <sp-link variant="secondary" href="#">link</sp-link> in a sentence.
    `,secondaryQuiet=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        This is a <sp-link variant="secondary" quiet href="#">quiet link</sp-link> in a sentence.
    `,staticWhite=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <div
            style="background-color: rgb(15, 121, 125); padding: 15px 20px; display: inline-block;"
        >
            <p style="color: rgb(240, 240, 240);">
                This
                <sp-link static-color="white" href="#">link</sp-link>
                has a background.
            </p>
        </div>
    `,staticBlack=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <div
            style="background-color: rgb(181, 209, 211); padding: 15px 20px; display: inline-block;"
        >
            <p style="color: rgb(15, 15, 15);">
                This
                <sp-link static-color="black" href="#">link</sp-link>
                has a background.
            </p>
        </div>
    `,staticWhiteQuiet=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <div
            style="background-color: rgb(15, 121, 125); padding: 15px 20px; display: inline-block;"
        >
            <p style="color: rgb(240, 240, 240);">
                This
                <sp-link static-color="white" quiet href="#">link</sp-link>
                has a background.
            </p>
        </div>
    `,staticBlackQuiet=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <div
            style="background-color: rgb(181, 209, 211); padding: 15px 20px; display: inline-block;"
        >
            <p style="color: rgb(15, 15, 15);">
                This
                <sp-link static-color="black" quiet href="#">link</sp-link>
                has a background.
            </p>
        </div>
    `,Download=()=>{const blob=new Blob(["some text for the file"],{type:"text/plain;charset=utf-8"});return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        This is a
        <sp-link download="somefile.txt" href="${URL.createObjectURL(blob)}">
            downloadable file
        </sp-link>
        for you to click on.
    `},__namedExportsOrder=["Default","Quiet","Disabled","secondary","secondaryQuiet","staticWhite","staticBlack","staticWhiteQuiet","staticBlackQuiet","Download"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        This is a <sp-link href="#">link</sp-link> in a sentence.\n    `;\n}',...Default.parameters?.docs?.source}}},Quiet.parameters={...Quiet.parameters,docs:{...Quiet.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        This is a <sp-link quiet href="#">quiet link</sp-link> in a sentence.\n    `;\n}',...Quiet.parameters?.docs?.source}}},Disabled.parameters={...Disabled.parameters,docs:{...Disabled.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        This is a <sp-link disabled onclick="(\'hi\')" href="#">disabled non focusable link</sp-link> in a sentence.\n    `;\n}',...Disabled.parameters?.docs?.source}}},secondary.parameters={...secondary.parameters,docs:{...secondary.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        This is a <sp-link variant="secondary" href="#">link</sp-link> in a sentence.\n    `;\n}',...secondary.parameters?.docs?.source}}},secondaryQuiet.parameters={...secondaryQuiet.parameters,docs:{...secondaryQuiet.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        This is a <sp-link variant="secondary" quiet href="#">quiet link</sp-link> in a sentence.\n    `;\n}',...secondaryQuiet.parameters?.docs?.source}}},staticWhite.parameters={...staticWhite.parameters,docs:{...staticWhite.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <div\n            style="background-color: rgb(15, 121, 125); padding: 15px 20px; display: inline-block;"\n        >\n            <p style="color: rgb(240, 240, 240);">\n                This\n                <sp-link static-color="white" href="#">link</sp-link>\n                has a background.\n            </p>\n        </div>\n    `;\n}',...staticWhite.parameters?.docs?.source}}},staticBlack.parameters={...staticBlack.parameters,docs:{...staticBlack.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <div\n            style="background-color: rgb(181, 209, 211); padding: 15px 20px; display: inline-block;"\n        >\n            <p style="color: rgb(15, 15, 15);">\n                This\n                <sp-link static-color="black" href="#">link</sp-link>\n                has a background.\n            </p>\n        </div>\n    `;\n}',...staticBlack.parameters?.docs?.source}}},staticWhiteQuiet.parameters={...staticWhiteQuiet.parameters,docs:{...staticWhiteQuiet.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <div\n            style="background-color: rgb(15, 121, 125); padding: 15px 20px; display: inline-block;"\n        >\n            <p style="color: rgb(240, 240, 240);">\n                This\n                <sp-link static-color="white" quiet href="#">link</sp-link>\n                has a background.\n            </p>\n        </div>\n    `;\n}',...staticWhiteQuiet.parameters?.docs?.source}}},staticBlackQuiet.parameters={...staticBlackQuiet.parameters,docs:{...staticBlackQuiet.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <div\n            style="background-color: rgb(181, 209, 211); padding: 15px 20px; display: inline-block;"\n        >\n            <p style="color: rgb(15, 15, 15);">\n                This\n                <sp-link static-color="black" quiet href="#">link</sp-link>\n                has a background.\n            </p>\n        </div>\n    `;\n}',...staticBlackQuiet.parameters?.docs?.source}}},Download.parameters={...Download.parameters,docs:{...Download.parameters?.docs,source:{originalSource:'() => {\n  const blob = new Blob(["some text for the file"], {\n    type: "text/plain;charset=utf-8"\n  });\n  return html`\n        This is a\n        <sp-link download="somefile.txt" href="${URL.createObjectURL(blob)}">\n            downloadable file\n        </sp-link>\n        for you to click on.\n    `;\n}',...Download.parameters?.docs?.source}}}}}]);
//# sourceMappingURL=link-stories-link-stories.6f52cf3c.iframe.bundle.js.map