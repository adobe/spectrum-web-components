"use strict";(self.webpackChunk_adobe_spectrum_web_components=self.webpackChunk_adobe_spectrum_web_components||[]).push([[3902],{"./packages/asset/sp-asset.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js");var asset_css=index_dev.AH`
    :host{--spectrum-asset-folder-background:var(--highcontrast-asset-icon-background-color,var(--mod-asset-folder-background-color,var(--spectrum-asset-folder-background-color)));--spectrum-asset-file-background:var(--highcontrast-asset-icon-background-color,var(--mod-asset-file-background-color,var(--spectrum-asset-file-background-color)));--spectrum-asset-folder-outline:var(--mod-asset-icon-outline-color,var(--spectrum-asset-icon-outline-color));--spectrum-asset-file-outline:var(--mod-asset-icon-outline-color,var(--spectrum-asset-icon-outline-color));inline-size:100%;block-size:100%;justify-content:center;align-items:center;display:flex}::slotted(*){max-inline-size:100%;max-block-size:100%;object-fit:contain;transition:opacity var(--spectrum-animation-duration-100)}.file,.folder{inline-size:max(48px,min(100%,80px));inline-size:max(var(--mod-asset-icon-min-width,48px),min(100%,var(--mod-asset-icon-max-width,80px)));block-size:100%;margin:20px;margin:var(--mod-asset-icon-margin,20px)}.folderBackground{fill:var(--spectrum-asset-folder-background)}.fileBackground{fill:var(--spectrum-asset-file-background)}.folderOutline{fill:var(--spectrum-asset-folder-outline)}.fileOutline{fill:var(--spectrum-asset-file-outline)}@media (forced-colors:active){:host{--highcontrast-asset-icon-background-color:currentColor}}:host{--spectrum-asset-folder-background-color:var(--system-asset-folder-background-color);--spectrum-asset-file-background-color:var(--system-asset-file-background-color);--spectrum-asset-icon-outline-color:var(--system-asset-icon-outline-color)}
`,__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__decorateClass=(decorators,target,key,kind)=>{for(var decorator,result=kind>1?void 0:kind?__getOwnPropDesc(target,key):target,i=decorators.length-1;i>=0;i--)(decorator=decorators[i])&&(result=(kind?decorator(target,key,result):decorator(result))||result);return kind&&result&&__defProp(target,key,result),result};class Asset extends index_dev.wG{constructor(){super(...arguments),this.label=""}static get styles(){return[asset_css]}render(){return"file"===this.variant?(label=this.label,index_dev.qy`
    <svg
        class="file"
        role="img"
        viewBox="0 0 128 128"
        aria-label=${label||"File"}
    >
        <path
            class="fileBackground"
            d="M24,126c-5.5,0-10-4.5-10-10V12c0-5.5,4.5-10,10-10h61.5c2.1,0,4.1,0.8,5.6,2.3l20.5,20.4c1.5,1.5,2.4,3.5,2.4,5.7V116c0,5.5-4.5,10-10,10H24z"
        ></path>
        <path
            class="fileOutline"
            d="M113.1,23.3L92.6,2.9C90.7,1,88.2,0,85.5,0H24c-6.6,0-12,5.4-12,12v104c0,6.6,5.4,12,12,12h80c6.6,0,12-5.4,12-12V30.4C116,27.8,114.9,25.2,113.1,23.3z M90,6l20.1,20H92c-1.1,0-2-0.9-2-2V6z M112,116c0,4.4-3.6,8-8,8H24c-4.4,0-8-3.6-8-8V12c0-4.4,3.6-8,8-8h61.5c0.2,0,0.3,0,0.5,0v20c0,3.3,2.7,6,6,6h20c0,0.1,0,0.3,0,0.4V116z"
        ></path>
    </svg>
`):"folder"===this.variant?(label=>index_dev.qy`
    <svg
        class="folder"
        role="img"
        viewBox="0 0 32 32"
        aria-label=${label||"Folder"}
    >
        <path
            class="folderBackground"
            d="M3,29.5c-1.4,0-2.5-1.1-2.5-2.5V5c0-1.4,1.1-2.5,2.5-2.5h10.1c0.5,0,1,0.2,1.4,0.6l3.1,3.1c0.2,0.2,0.4,0.3,0.7,0.3H29c1.4,0,2.5,1.1,2.5,2.5v18c0,1.4-1.1,2.5-2.5,2.5H3z"
        ></path>
        <path
            class="folderOutline"
            d="M29,6H18.3c-0.1,0-0.2,0-0.4-0.2l-3.1-3.1C14.4,2.3,13.8,2,13.1,2H3C1.3,2,0,3.3,0,5v22c0,1.6,1.3,3,3,3h26c1.7,0,3-1.4,3-3V9C32,7.3,30.7,6,29,6z M31,27c0,1.1-0.9,2-2,2H3c-1.1,0-2-0.9-2-2V7h28c1.1,0,2,0.9,2,2V27z"
        ></path>
    </svg>
`)(this.label):index_dev.qy`
            <slot></slot>
        `;var label}}__decorateClass([(0,decorators_dev.MZ)({type:String,reflect:!0})],Asset.prototype,"variant",2),__decorateClass([(0,decorators_dev.MZ)()],Asset.prototype,"label",2),(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-asset",Asset)},"./packages/asset/stories/asset.stories.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:function(){return Default},File:function(){return File},Folder:function(){return Folder},__namedExportsOrder:function(){return __namedExportsOrder}});var _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./tools/base/src/index.dev.js"),_card_stories_images__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__("./packages/asset/sp-asset.dev.js"),__webpack_require__("./packages/card/stories/images.js"));__webpack_exports__.default={title:"Asset",component:"sp-asset"};const Default=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-asset style="height: 128px">
            <img src=${_card_stories_images__WEBPACK_IMPORTED_MODULE_2__.o} alt="Demo Graphic" />
        </sp-asset>
    `,File=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-asset variant="file"></sp-asset>
    `,Folder=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-asset variant="folder"></sp-asset>
    `,__namedExportsOrder=["Default","File","Folder"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-asset style="height: 128px">\n            <img src=${portrait} alt="Demo Graphic" />\n        </sp-asset>\n    `;\n}',...Default.parameters?.docs?.source}}},File.parameters={...File.parameters,docs:{...File.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-asset variant="file"></sp-asset>\n    `;\n}',...File.parameters?.docs?.source}}},Folder.parameters={...Folder.parameters,docs:{...Folder.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-asset variant="folder"></sp-asset>\n    `;\n}',...Folder.parameters?.docs?.source}}}}}]);
//# sourceMappingURL=asset-stories-asset-stories.88ceb790.iframe.bundle.js.map