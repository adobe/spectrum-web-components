"use strict";(self.webpackChunk_spectrum_web_components_1st_gen=self.webpackChunk_spectrum_web_components_1st_gen||[]).push([[1508],{"./packages/icons-workflow/stories/icons-workflow.stories.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Icons:function(){return Icons},__namedExportsOrder:function(){return __namedExportsOrder},elements:function(){return elements}});__webpack_require__("./packages/icon/sp-icon.dev.js"),__webpack_require__("./packages/iconset/stories/icons-demo.js");var _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./tools/base/src/index.dev.js"),_spectrum_web_components_base_src_directives_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./tools/base/src/directives.dev.js");__webpack_exports__.default={title:"Icons/Workflow",argTypes:{color:{control:"color"},size:{control:{type:"inline-radio",options:["s","m","l","xl"]}}},args:{color:"#000000",size:"m"},swc_vrt:{preload:async()=>{await Promise.all([__webpack_require__.e(2801),__webpack_require__.e(9131)]).then(__webpack_require__.bind(__webpack_require__,"./packages/icons-workflow/stories/icon-manifest.js"))}}};const elements=({color:color,size:size})=>{const content=Promise.all([__webpack_require__.e(2801),__webpack_require__.e(9131)]).then(__webpack_require__.bind(__webpack_require__,"./packages/icons-workflow/stories/icon-manifest.js")).then(iconManifest=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_2__.qy`
            <icons-demo
                style="color: ${color}"
                size=${size}
                .icons=${iconManifest.iconManifest}
                name="workflow"
            ></icons-demo>
        `);return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_2__.qy`
        <style>
            .icon {
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
            }
            sp-icon {
                margin-bottom: 10px;
            }
        </style>
        <delayed-ready>
            ${(0,_spectrum_web_components_base_src_directives_js__WEBPACK_IMPORTED_MODULE_3__.TG)(content,_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_2__.qy`
                    Loading...
                `)}
        </delayed-ready>
    `},Icons=({color:color,size:size})=>{const content=Promise.all([__webpack_require__.e(2801),__webpack_require__.e(2720)]).then(__webpack_require__.bind(__webpack_require__,"./packages/icons-workflow/src/index.js")).then(icons=>{const iconTemplates=[];for(const icon in icons)"setCustomTemplateLiteralTag"!==icon&&iconTemplates.push({template:icons[icon],name:icon});return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_2__.qy`
            <icons-demo style="color: ${color}">
                ${iconTemplates.map(icon=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_2__.qy`
                        <bdo class="icon" dir="ltr">
                            <sp-icon size=${size}>${icon.template()}</sp-icon>
                            ${icon.name}
                        </bdo>
                    `)}
            </icons-demo>
        `});return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_2__.qy`
        <style>
            .icon {
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
            }
            sp-icon {
                margin-bottom: 10px;
            }
        </style>
        <delayed-ready>
            ${(0,_spectrum_web_components_base_src_directives_js__WEBPACK_IMPORTED_MODULE_3__.TG)(content,_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_2__.qy`
                    Loading...
                `)}
        </delayed-ready>
    `},__namedExportsOrder=["elements","Icons"];elements.parameters={...elements.parameters,docs:{...elements.parameters?.docs,source:{originalSource:'({\n  color,\n  size\n}) => {\n  const content = import("./icon-manifest.js").then(iconManifest => html`\n            <icons-demo\n                style="color: ${color}"\n                size=${size}\n                .icons=${iconManifest.iconManifest}\n                name="workflow"\n            ></icons-demo>\n        `);\n  return html`\n        <style>\n            .icon {\n                display: flex;\n                flex-direction: column;\n                align-items: center;\n                text-align: center;\n            }\n            sp-icon {\n                margin-bottom: 10px;\n            }\n        </style>\n        <delayed-ready>\n            ${until(content, html`\n                    Loading...\n                `)}\n        </delayed-ready>\n    `;\n}',...elements.parameters?.docs?.source}}},Icons.parameters={...Icons.parameters,docs:{...Icons.parameters?.docs,source:{originalSource:'({\n  color,\n  size\n}) => {\n  const content = import("../").then(icons => {\n    const iconTemplates = [];\n    for (const icon in icons) {\n      if (icon === "setCustomTemplateLiteralTag") continue;\n      iconTemplates.push({\n        // eslint-disable-next-line @typescript-eslint/no-explicit-any\n        template: icons[icon],\n        name: icon\n      });\n    }\n    return html`\n            <icons-demo style="color: ${color}">\n                ${iconTemplates.map(icon => html`\n                        <bdo class="icon" dir="ltr">\n                            <sp-icon size=${size}>${icon.template()}</sp-icon>\n                            ${icon.name}\n                        </bdo>\n                    `)}\n            </icons-demo>\n        `;\n  });\n  return html`\n        <style>\n            .icon {\n                display: flex;\n                flex-direction: column;\n                align-items: center;\n                text-align: center;\n            }\n            sp-icon {\n                margin-bottom: 10px;\n            }\n        </style>\n        <delayed-ready>\n            ${until(content, html`\n                    Loading...\n                `)}\n        </delayed-ready>\n    `;\n}',...Icons.parameters?.docs?.source}}}}}]);
//# sourceMappingURL=icons-workflow-stories-icons-workflow-stories.3d8214f8.iframe.bundle.js.map