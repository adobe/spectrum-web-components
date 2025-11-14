"use strict";(self.webpackChunk_spectrum_web_components_1st_gen=self.webpackChunk_spectrum_web_components_1st_gen||[]).push([[5760],{"./packages/card/stories/card.stories.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:function(){return Default},Gallery:function(){return Gallery},Horizontal:function(){return Horizontal},Quiet:function(){return Quiet},ScrollTest:function(){return ScrollTest},SlottedHeading:function(){return SlottedHeading},__namedExportsOrder:function(){return __namedExportsOrder},actions:function(){return actions},horizontalWithHREF:function(){return horizontalWithHREF},href:function(){return href},noPreviewImage:function(){return noPreviewImage},quietActions:function(){return quietActions},quietFile:function(){return quietFile},quietFolder:function(){return quietFolder},smallQuiet:function(){return smallQuiet},toggles:function(){return toggles}});var _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./tools/base/src/index.dev.js"),_images__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__("./packages/card/sp-card.dev.js"),__webpack_require__("./packages/card/stories/images.js")),_spectrum_web_components_base_src_directives_js__WEBPACK_IMPORTED_MODULE_10__=(__webpack_require__("./packages/icons-workflow/icons/sp-icon-file-txt.js"),__webpack_require__("./packages/textfield/sp-textfield.dev.js"),__webpack_require__("./packages/action-menu/sp-action-menu.dev.js"),__webpack_require__("./packages/menu/sp-menu.dev.js"),__webpack_require__("./packages/menu/sp-menu-item.dev.js"),__webpack_require__("./packages/menu/sp-menu-divider.dev.js"),__webpack_require__("./packages/link/sp-link.dev.js"),__webpack_require__("./tools/base/src/directives.dev.js"));__webpack_exports__.default={component:"sp-card",title:"Card",args:{horizontal:!1,toggles:!1},argTypes:{horizontal:{name:"horizontal",type:{name:"boolean",required:!1},table:{type:{summary:"boolean"},defaultValue:{summary:!1}},control:{type:"boolean"}},toggles:{name:"toggles",type:{name:"boolean",required:!1},table:{type:{summary:"boolean"},defaultValue:{summary:!1}},control:{type:"boolean"}}}};const Default=args=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-card
            heading="Card Heading"
            subheading="JPG"
            ?horizontal=${args.horizontal}
            ?toggles=${args.toggles}
            style="width: 200px;"
        >
            <img slot="cover-photo" src=${_images__WEBPACK_IMPORTED_MODULE_2__.o} alt="Demo Graphic" />
            <div slot="footer">Footer</div>
        </sp-card>
    `;Default.args={};const href=args=>{const{onClick:onClick}=args;return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-card
            heading="Card Heading"
            subheading="JPG"
            ?toggles=${void 0===args.toggles||args.toggles}
            ?horizontal=${args.horizontal}
            style="width: 200px;"
            href="https://opensource.adobe.com/spectrum-web-components"
            @click=${event=>{"like-anchor"===event.composedPath()[0].id&&(event.stopPropagation(),event.preventDefault(),onClick&&onClick(event))}}
        >
            <div slot="footer">
                Footer with a
                <sp-link href="https://google.com">link to Google</sp-link>
            </div>
            <sp-action-menu
                label="More Actions"
                slot="actions"
                placement="bottom-end"
                quiet
            >
                <sp-menu-item>Deselect</sp-menu-item>
                <sp-menu-item>Select Inverse</sp-menu-item>
                <sp-menu-item>Feather...</sp-menu-item>
                <sp-menu-item>Select and Mask...</sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item>Save Selection</sp-menu-item>
                <sp-menu-item disabled>Make Work Path</sp-menu-item>
            </sp-action-menu>
            <img slot="cover-photo" src=${_images__WEBPACK_IMPORTED_MODULE_2__.o} alt="Demo Graphic" />
        </sp-card>
    `};href.argTypes={onClick:{action:"link click"}};const actions=args=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-card
            heading="Card Heading"
            subheading="JPG"
            ?horizontal=${args.horizontal}
            ?toggles=${args.toggles}
            style="width: 200px;"
        >
            <img slot="cover-photo" src=${_images__WEBPACK_IMPORTED_MODULE_2__.o} alt="Demo Graphic" />
            <div slot="footer">Footer</div>
            <sp-action-menu
                label="More Actions"
                slot="actions"
                placement="bottom-end"
                quiet
            >
                <sp-menu-item>Deselect</sp-menu-item>
                <sp-menu-item>Select Inverse</sp-menu-item>
                <sp-menu-item>Feather...</sp-menu-item>
                <sp-menu-item>Select and Mask...</sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item>Save Selection</sp-menu-item>
                <sp-menu-item disabled>Make Work Path</sp-menu-item>
            </sp-action-menu>
        </sp-card>
    `,Gallery=args=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-card
            variant="gallery"
            heading="Card Heading"
            subheading="JPG"
            ?horizontal=${args.horizontal}
            ?toggles=${args.toggles}
        >
            <img
                slot="preview"
                src=${_images__WEBPACK_IMPORTED_MODULE_2__.e}
                style="object-fit: cover"
                alt="Demo Graphic"
            />
            <div slot="description">10/15/18</div>
        </sp-card>
    `,noPreviewImage=args=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-card
            heading="Card Heading"
            subheading="No preview image"
            ?horizontal=${args.horizontal}
            ?toggles=${args.toggles}
            style="width: 200px;"
        >
            <div slot="footer">Footer</div>
        </sp-card>
    `,Quiet=args=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <div>
            <sp-card
                variant="quiet"
                heading="Card Heading"
                subheading="JPG"
                ?horizontal=${args.horizontal}
                ?toggles=${args.toggles}
                style="width: 208px; height: 264px"
            >
                <img src=${_images__WEBPACK_IMPORTED_MODULE_2__.o} alt="Demo Graphic" slot="preview" />
                <div slot="description">10/15/18</div>
            </sp-card>
        </div>
    `,quietFile=args=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <div>
            <sp-card
                variant="quiet"
                subheading="JPG"
                asset="file"
                ?horizontal=${args.horizontal}
                ?toggles=${args.toggles}
                style="width: 208px; height: 264px"
            >
                <img src=${_images__WEBPACK_IMPORTED_MODULE_2__.o} alt="Demo Graphic" slot="preview" />
                <div slot="heading">File Name</div>
                <div slot="description">10/15/18</div>
            </sp-card>
        </div>
    `,quietFolder=args=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <div>
            <sp-card
                variant="quiet"
                subheading="JPG"
                asset="folder"
                ?horizontal=${args.horizontal}
                ?toggles=${args.toggles}
                style="width: 208px; height: 264px"
            >
                <img src=${_images__WEBPACK_IMPORTED_MODULE_2__.o} alt="Demo Graphic" slot="preview" />
                <div slot="heading">Folder Name</div>
                <div slot="description">10/15/18</div>
            </sp-card>
        </div>
    `,quietActions=args=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <div>
            <sp-card
                variant="quiet"
                heading="Card Heading"
                subheading="JPG"
                ?horizontal=${args.horizontal}
                ?toggles=${args.toggles}
                style="width: 208px; height: 264px"
            >
                <img src=${_images__WEBPACK_IMPORTED_MODULE_2__.o} alt="Demo Graphic" slot="preview" />
                <div slot="description">10/15/18</div>
                <sp-action-menu
                    label="More Actions"
                    slot="actions"
                    placement="bottom-end"
                    quiet
                >
                    <sp-menu-item>Deselect</sp-menu-item>
                    <sp-menu-item>Select Inverse</sp-menu-item>
                    <sp-menu-item>Feather...</sp-menu-item>
                    <sp-menu-item>Select and Mask...</sp-menu-item>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-item>Save Selection</sp-menu-item>
                    <sp-menu-item disabled>Make Work Path</sp-menu-item>
                </sp-action-menu>
            </sp-card>
        </div>
    `;quietActions.storyName="Quiet w/ Actions";const Horizontal=args=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-card
            ?horizontal=${args.horizontal}
            ?toggles=${args.toggles}
            heading="Card Heading"
            subheading="JPG"
        >
            <sp-icon-file-txt
                slot="preview"
                style="width: 36px; height: 36px;"
            ></sp-icon-file-txt>
        </sp-card>
    `;Horizontal.args={horizontal:!0};const horizontalWithHREF=args=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-card
            ?horizontal=${args.horizontal}
            ?toggles=${args.toggles}
            heading="Card Heading"
            subheading="JPG"
            href="https://opensource.adobe.com/spectrum-web-components"
            target="_blank"
        >
            <sp-icon-file-txt
                slot="preview"
                style="width: 36px; height: 36px;"
            ></sp-icon-file-txt>
        </sp-card>
    `;horizontalWithHREF.args={horizontal:!0};const smallQuiet=args=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <div>
            <sp-card
                size=${(0,_spectrum_web_components_base_src_directives_js__WEBPACK_IMPORTED_MODULE_10__.JR)(args.size)}
                ?horizontal=${args.horizontal}
                ?toggles=${args.toggles}
                heading="Card Heading"
                subheading="JPG"
                variant="quiet"
                style="width: 115px"
            >
                <img src=${_images__WEBPACK_IMPORTED_MODULE_2__.o} alt="Demo Graphic" slot="preview" />
                <div slot="footer">Footer</div>
                <sp-action-menu
                    label="More Actions"
                    slot="actions"
                    placement="bottom-end"
                    quiet
                >
                    <sp-menu-item>Deselect</sp-menu-item>
                    <sp-menu-item>Select Inverse</sp-menu-item>
                    <sp-menu-item>Feather...</sp-menu-item>
                    <sp-menu-item>Select and Mask...</sp-menu-item>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-item>Save Selection</sp-menu-item>
                    <sp-menu-item disabled>Make Work Path</sp-menu-item>
                </sp-action-menu>
            </sp-card>
        </div>
    `;smallQuiet.args={size:"s"};const SlottedHeading=args=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <style>
            .slotted-textfield-heading {
                width: 100%;
            }
        </style>
        <sp-card
            style="
                --spectrum-card-title-width: 100%;
                --spectrum-card-title-padding-right: 0;
                --spectrum-card-title-padding-left: 0;
                --spectrum-card-body-header-height: auto;
                --spectrum-alias-single-line-width: 100%;
            "
            ?horizontal=${args.horizontal}
            ?toggles=${args.toggles}
        >
            <img slot="cover-photo" src=${_images__WEBPACK_IMPORTED_MODULE_2__.o} alt="Demo Graphic" />
            <sp-textfield
                class="slotted-textfield-heading"
                slot="heading"
                value="Apr 23 Project"
                quiet
            ></sp-textfield>
            <div slot="subheading">Last modified on 6/17/2020, 3:37 PM</div>
            <sp-action-menu
                label="More Actions"
                slot="actions"
                placement="bottom-end"
                quiet
            >
                <sp-menu-item>Deselect</sp-menu-item>
                <sp-menu-item>Select Inverse</sp-menu-item>
                <sp-menu-item>Feather...</sp-menu-item>
                <sp-menu-item>Select and Mask...</sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item>Save Selection</sp-menu-item>
                <sp-menu-item disabled>Make Work Path</sp-menu-item>
            </sp-action-menu>
        </sp-card>
    `,toggles=args=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-card
            ?horizontal=${args.horizontal}
            ?toggles=${args.toggles}
            heading="Card Heading"
            subheading="JPG"
        >
            <img slot="cover-photo" src=${_images__WEBPACK_IMPORTED_MODULE_2__.o} alt="Demo Graphic" />
            <sp-action-menu
                label="More Actions"
                slot="actions"
                placement="bottom-end"
                quiet
            >
                <sp-menu-item>Deselect</sp-menu-item>
                <sp-menu-item>Select Inverse</sp-menu-item>
                <sp-menu-item>Feather...</sp-menu-item>
                <sp-menu-item>Select and Mask...</sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item>Save Selection</sp-menu-item>
                <sp-menu-item disabled>Make Work Path</sp-menu-item>
            </sp-action-menu>
        </sp-card>
    `;toggles.args={toggles:!0};const ScrollTest=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <div class="scroll-container">
            <div class="scroll-indicator">
                <h3>Switch to mobile view to test touch behavior.</h3>
                <p>
                    In mobile view, verify that touch events work correctly and
                    scrolling doesn't trigger unwanted clicks.
                </p>
            </div>
            ${Array.from({length:20},()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
                    <div style="margin: 10px;">
                        <sp-card
                            heading="Card Heading"
                            subheading="JPG"
                            ?horizontal=${!1}
                            style="width: 200px;"
                        >
                            <img
                                slot="cover-photo"
                                src=${_images__WEBPACK_IMPORTED_MODULE_2__.o}
                                alt="Demo Graphic"
                            />
                            <div slot="footer">Footer</div>
                        </sp-card>
                    </div>
                `)}
        </div>
    `,__namedExportsOrder=["Default","href","actions","Gallery","noPreviewImage","Quiet","quietFile","quietFolder","quietActions","Horizontal","horizontalWithHREF","smallQuiet","SlottedHeading","toggles","ScrollTest"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'args => {\n  return html`\n        <sp-card\n            heading="Card Heading"\n            subheading="JPG"\n            ?horizontal=${args.horizontal}\n            ?toggles=${args.toggles}\n            style="width: 200px;"\n        >\n            <img slot="cover-photo" src=${portrait} alt="Demo Graphic" />\n            <div slot="footer">Footer</div>\n        </sp-card>\n    `;\n}',...Default.parameters?.docs?.source}}},href.parameters={...href.parameters,docs:{...href.parameters?.docs,source:{originalSource:'args => {\n  const {\n    onClick\n  } = args;\n  return html`\n        <sp-card\n            heading="Card Heading"\n            subheading="JPG"\n            ?toggles=${args.toggles !== void 0 ? args.toggles : true}\n            ?horizontal=${args.horizontal}\n            style="width: 200px;"\n            href="https://opensource.adobe.com/spectrum-web-components"\n            @click=${event => {\n    const composedTarget = event.composedPath()[0];\n    if (composedTarget.id !== "like-anchor") return;\n    event.stopPropagation();\n    event.preventDefault();\n    onClick && onClick(event);\n  }}\n        >\n            <div slot="footer">\n                Footer with a\n                <sp-link href="https://google.com">link to Google</sp-link>\n            </div>\n            <sp-action-menu\n                label="More Actions"\n                slot="actions"\n                placement="bottom-end"\n                quiet\n            >\n                <sp-menu-item>Deselect</sp-menu-item>\n                <sp-menu-item>Select Inverse</sp-menu-item>\n                <sp-menu-item>Feather...</sp-menu-item>\n                <sp-menu-item>Select and Mask...</sp-menu-item>\n                <sp-menu-divider></sp-menu-divider>\n                <sp-menu-item>Save Selection</sp-menu-item>\n                <sp-menu-item disabled>Make Work Path</sp-menu-item>\n            </sp-action-menu>\n            <img slot="cover-photo" src=${portrait} alt="Demo Graphic" />\n        </sp-card>\n    `;\n}',...href.parameters?.docs?.source}}},actions.parameters={...actions.parameters,docs:{...actions.parameters?.docs,source:{originalSource:'args => {\n  return html`\n        <sp-card\n            heading="Card Heading"\n            subheading="JPG"\n            ?horizontal=${args.horizontal}\n            ?toggles=${args.toggles}\n            style="width: 200px;"\n        >\n            <img slot="cover-photo" src=${portrait} alt="Demo Graphic" />\n            <div slot="footer">Footer</div>\n            <sp-action-menu\n                label="More Actions"\n                slot="actions"\n                placement="bottom-end"\n                quiet\n            >\n                <sp-menu-item>Deselect</sp-menu-item>\n                <sp-menu-item>Select Inverse</sp-menu-item>\n                <sp-menu-item>Feather...</sp-menu-item>\n                <sp-menu-item>Select and Mask...</sp-menu-item>\n                <sp-menu-divider></sp-menu-divider>\n                <sp-menu-item>Save Selection</sp-menu-item>\n                <sp-menu-item disabled>Make Work Path</sp-menu-item>\n            </sp-action-menu>\n        </sp-card>\n    `;\n}',...actions.parameters?.docs?.source}}},Gallery.parameters={...Gallery.parameters,docs:{...Gallery.parameters?.docs,source:{originalSource:'args => {\n  return html`\n        <sp-card\n            variant="gallery"\n            heading="Card Heading"\n            subheading="JPG"\n            ?horizontal=${args.horizontal}\n            ?toggles=${args.toggles}\n        >\n            <img\n                slot="preview"\n                src=${landscape}\n                style="object-fit: cover"\n                alt="Demo Graphic"\n            />\n            <div slot="description">10/15/18</div>\n        </sp-card>\n    `;\n}',...Gallery.parameters?.docs?.source}}},noPreviewImage.parameters={...noPreviewImage.parameters,docs:{...noPreviewImage.parameters?.docs,source:{originalSource:'args => {\n  return html`\n        <sp-card\n            heading="Card Heading"\n            subheading="No preview image"\n            ?horizontal=${args.horizontal}\n            ?toggles=${args.toggles}\n            style="width: 200px;"\n        >\n            <div slot="footer">Footer</div>\n        </sp-card>\n    `;\n}',...noPreviewImage.parameters?.docs?.source}}},Quiet.parameters={...Quiet.parameters,docs:{...Quiet.parameters?.docs,source:{originalSource:'args => {\n  return html`\n        <div>\n            <sp-card\n                variant="quiet"\n                heading="Card Heading"\n                subheading="JPG"\n                ?horizontal=${args.horizontal}\n                ?toggles=${args.toggles}\n                style="width: 208px; height: 264px"\n            >\n                <img src=${portrait} alt="Demo Graphic" slot="preview" />\n                <div slot="description">10/15/18</div>\n            </sp-card>\n        </div>\n    `;\n}',...Quiet.parameters?.docs?.source}}},quietFile.parameters={...quietFile.parameters,docs:{...quietFile.parameters?.docs,source:{originalSource:'args => {\n  return html`\n        <div>\n            <sp-card\n                variant="quiet"\n                subheading="JPG"\n                asset="file"\n                ?horizontal=${args.horizontal}\n                ?toggles=${args.toggles}\n                style="width: 208px; height: 264px"\n            >\n                <img src=${portrait} alt="Demo Graphic" slot="preview" />\n                <div slot="heading">File Name</div>\n                <div slot="description">10/15/18</div>\n            </sp-card>\n        </div>\n    `;\n}',...quietFile.parameters?.docs?.source}}},quietFolder.parameters={...quietFolder.parameters,docs:{...quietFolder.parameters?.docs,source:{originalSource:'args => {\n  return html`\n        <div>\n            <sp-card\n                variant="quiet"\n                subheading="JPG"\n                asset="folder"\n                ?horizontal=${args.horizontal}\n                ?toggles=${args.toggles}\n                style="width: 208px; height: 264px"\n            >\n                <img src=${portrait} alt="Demo Graphic" slot="preview" />\n                <div slot="heading">Folder Name</div>\n                <div slot="description">10/15/18</div>\n            </sp-card>\n        </div>\n    `;\n}',...quietFolder.parameters?.docs?.source}}},quietActions.parameters={...quietActions.parameters,docs:{...quietActions.parameters?.docs,source:{originalSource:'args => {\n  return html`\n        <div>\n            <sp-card\n                variant="quiet"\n                heading="Card Heading"\n                subheading="JPG"\n                ?horizontal=${args.horizontal}\n                ?toggles=${args.toggles}\n                style="width: 208px; height: 264px"\n            >\n                <img src=${portrait} alt="Demo Graphic" slot="preview" />\n                <div slot="description">10/15/18</div>\n                <sp-action-menu\n                    label="More Actions"\n                    slot="actions"\n                    placement="bottom-end"\n                    quiet\n                >\n                    <sp-menu-item>Deselect</sp-menu-item>\n                    <sp-menu-item>Select Inverse</sp-menu-item>\n                    <sp-menu-item>Feather...</sp-menu-item>\n                    <sp-menu-item>Select and Mask...</sp-menu-item>\n                    <sp-menu-divider></sp-menu-divider>\n                    <sp-menu-item>Save Selection</sp-menu-item>\n                    <sp-menu-item disabled>Make Work Path</sp-menu-item>\n                </sp-action-menu>\n            </sp-card>\n        </div>\n    `;\n}',...quietActions.parameters?.docs?.source}}},Horizontal.parameters={...Horizontal.parameters,docs:{...Horizontal.parameters?.docs,source:{originalSource:'args => {\n  return html`\n        <sp-card\n            ?horizontal=${args.horizontal}\n            ?toggles=${args.toggles}\n            heading="Card Heading"\n            subheading="JPG"\n        >\n            <sp-icon-file-txt\n                slot="preview"\n                style="width: 36px; height: 36px;"\n            ></sp-icon-file-txt>\n        </sp-card>\n    `;\n}',...Horizontal.parameters?.docs?.source}}},horizontalWithHREF.parameters={...horizontalWithHREF.parameters,docs:{...horizontalWithHREF.parameters?.docs,source:{originalSource:'args => {\n  return html`\n        <sp-card\n            ?horizontal=${args.horizontal}\n            ?toggles=${args.toggles}\n            heading="Card Heading"\n            subheading="JPG"\n            href="https://opensource.adobe.com/spectrum-web-components"\n            target="_blank"\n        >\n            <sp-icon-file-txt\n                slot="preview"\n                style="width: 36px; height: 36px;"\n            ></sp-icon-file-txt>\n        </sp-card>\n    `;\n}',...horizontalWithHREF.parameters?.docs?.source}}},smallQuiet.parameters={...smallQuiet.parameters,docs:{...smallQuiet.parameters?.docs,source:{originalSource:'args => {\n  return html`\n        <div>\n            <sp-card\n                size=${ifDefined(args.size)}\n                ?horizontal=${args.horizontal}\n                ?toggles=${args.toggles}\n                heading="Card Heading"\n                subheading="JPG"\n                variant="quiet"\n                style="width: 115px"\n            >\n                <img src=${portrait} alt="Demo Graphic" slot="preview" />\n                <div slot="footer">Footer</div>\n                <sp-action-menu\n                    label="More Actions"\n                    slot="actions"\n                    placement="bottom-end"\n                    quiet\n                >\n                    <sp-menu-item>Deselect</sp-menu-item>\n                    <sp-menu-item>Select Inverse</sp-menu-item>\n                    <sp-menu-item>Feather...</sp-menu-item>\n                    <sp-menu-item>Select and Mask...</sp-menu-item>\n                    <sp-menu-divider></sp-menu-divider>\n                    <sp-menu-item>Save Selection</sp-menu-item>\n                    <sp-menu-item disabled>Make Work Path</sp-menu-item>\n                </sp-action-menu>\n            </sp-card>\n        </div>\n    `;\n}',...smallQuiet.parameters?.docs?.source}}},SlottedHeading.parameters={...SlottedHeading.parameters,docs:{...SlottedHeading.parameters?.docs,source:{originalSource:'args => {\n  return html`\n        <style>\n            .slotted-textfield-heading {\n                width: 100%;\n            }\n        </style>\n        <sp-card\n            style="\n                --spectrum-card-title-width: 100%;\n                --spectrum-card-title-padding-right: 0;\n                --spectrum-card-title-padding-left: 0;\n                --spectrum-card-body-header-height: auto;\n                --spectrum-alias-single-line-width: 100%;\n            "\n            ?horizontal=${args.horizontal}\n            ?toggles=${args.toggles}\n        >\n            <img slot="cover-photo" src=${portrait} alt="Demo Graphic" />\n            <sp-textfield\n                class="slotted-textfield-heading"\n                slot="heading"\n                value="Apr 23 Project"\n                quiet\n            ></sp-textfield>\n            <div slot="subheading">Last modified on 6/17/2020, 3:37 PM</div>\n            <sp-action-menu\n                label="More Actions"\n                slot="actions"\n                placement="bottom-end"\n                quiet\n            >\n                <sp-menu-item>Deselect</sp-menu-item>\n                <sp-menu-item>Select Inverse</sp-menu-item>\n                <sp-menu-item>Feather...</sp-menu-item>\n                <sp-menu-item>Select and Mask...</sp-menu-item>\n                <sp-menu-divider></sp-menu-divider>\n                <sp-menu-item>Save Selection</sp-menu-item>\n                <sp-menu-item disabled>Make Work Path</sp-menu-item>\n            </sp-action-menu>\n        </sp-card>\n    `;\n}',...SlottedHeading.parameters?.docs?.source}}},toggles.parameters={...toggles.parameters,docs:{...toggles.parameters?.docs,source:{originalSource:'args => {\n  return html`\n        <sp-card\n            ?horizontal=${args.horizontal}\n            ?toggles=${args.toggles}\n            heading="Card Heading"\n            subheading="JPG"\n        >\n            <img slot="cover-photo" src=${portrait} alt="Demo Graphic" />\n            <sp-action-menu\n                label="More Actions"\n                slot="actions"\n                placement="bottom-end"\n                quiet\n            >\n                <sp-menu-item>Deselect</sp-menu-item>\n                <sp-menu-item>Select Inverse</sp-menu-item>\n                <sp-menu-item>Feather...</sp-menu-item>\n                <sp-menu-item>Select and Mask...</sp-menu-item>\n                <sp-menu-divider></sp-menu-divider>\n                <sp-menu-item>Save Selection</sp-menu-item>\n                <sp-menu-item disabled>Make Work Path</sp-menu-item>\n            </sp-action-menu>\n        </sp-card>\n    `;\n}',...toggles.parameters?.docs?.source}}},ScrollTest.parameters={...ScrollTest.parameters,docs:{...ScrollTest.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <div class="scroll-container">\n            <div class="scroll-indicator">\n                <h3>Switch to mobile view to test touch behavior.</h3>\n                <p>\n                    In mobile view, verify that touch events work correctly and\n                    scrolling doesn\'t trigger unwanted clicks.\n                </p>\n            </div>\n            ${Array.from({\n    length: 20\n  }, () => html`\n                    <div style="margin: 10px;">\n                        <sp-card\n                            heading="Card Heading"\n                            subheading="JPG"\n                            ?horizontal=${false}\n                            style="width: 200px;"\n                        >\n                            <img\n                                slot="cover-photo"\n                                src=${portrait}\n                                alt="Demo Graphic"\n                            />\n                            <div slot="footer">Footer</div>\n                        </sp-card>\n                    </div>\n                `)}\n        </div>\n    `;\n}',...ScrollTest.parameters?.docs?.source}}}},"./packages/icons-workflow/icons/sp-icon-file-txt.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-workflow/src/custom-tag.js"),FileTxt=__webpack_require__("./packages/icons-workflow/src/icons/FileTxt.js"),FileText=__webpack_require__("./packages/icons-workflow/src/icons-s2/FileText.js");class IconFileTxt extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),1===this.spectrumVersion?(0,FileTxt.y)({hidden:!this.label,title:this.label}):(0,FileText.d)({hidden:!this.label,title:this.label})}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon-file-txt",IconFileTxt)},"./packages/icons-workflow/src/icons-s2/FileText.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{d:function(){return FileTextIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const FileTextIcon=({width:t=24,height:e=24,hidden:l=!1,title:r="File Text"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${t}"
    height="${e}"
    viewBox="0 0 20 20"
    aria-hidden=${l?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${r}"
  >
    <path
      d="m16.34082,5.2959l-3.62109-3.62207c-.41895-.41895-.99902-.65918-1.59082-.65918h-5.87891c-1.24023,0-2.25,1.00977-2.25,2.25v12.4834c0,1.24023,1.00977,2.25,2.25,2.25h9.5c1.24023,0,2.25-1.00977,2.25-2.25V6.88672c0-.60059-.23438-1.16602-.65918-1.59082Zm-1.06055,1.06055c.04614.04614.07397.10352.10596.1582h-3.13623c-.41309,0-.75-.33691-.75-.75v-3.13623c.05542.03223.11353.0603.15918.10596l3.62109,3.62207Zm-.53027,10.1416H5.25c-.41309,0-.75-.33691-.75-.75V3.26465c0-.41309.33691-.75.75-.75h4.75v3.25c0,1.24023,1.00977,2.25,2.25,2.25h3.25v7.7334c0,.41309-.33691.75-.75.75Z"
      fill="currentColor"
    />
    <path
      d="m13,11.49805h-6c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h6c.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
      fill="currentColor"
    />
    <path
      d="m13,14.49805h-6c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h6c.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
      fill="currentColor"
    />
  </svg>`},"./packages/icons-workflow/src/icons/FileTxt.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{y:function(){return FileTxtIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const FileTxtIcon=({width:a=24,height:t=24,hidden:e=!1,title:l="File Txt"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    height="${t}"
    viewBox="0 0 36 36"
    width="${a}"
    aria-hidden=${e?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${l}"
  >
    <path d="M20 2v10h10L20 2z" />
    <path
      d="M19 14a1 1 0 0 1-1-1V2H7a1 1 0 0 0-1 1v30a1 1 0 0 0 1 1h22a1 1 0 0 0 1-1V14Zm7 15.5a.5.5 0 0 1-.5.5h-15a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h15a.5.5 0 0 1 .5.5Zm0-4a.5.5 0 0 1-.5.5h-15a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h15a.5.5 0 0 1 .5.5Zm0-4a.5.5 0 0 1-.5.5h-15a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h15a.5.5 0 0 1 .5.5Z"
    />
  </svg>`},"./packages/link/sp-link.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js"),like_anchor_dev=__webpack_require__("./tools/shared/src/like-anchor.dev.js"),focusable_dev=__webpack_require__("./tools/shared/src/focusable.dev.js");var link_css=__webpack_require__("./tools/base/src/index.dev.js").AH`
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
        `,__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__decorateClass=(decorators,target,key,kind)=>{for(var decorator,result=kind>1?void 0:kind?__getOwnPropDesc(target,key):target,i=decorators.length-1;i>=0;i--)(decorator=decorators[i])&&(result=(kind?decorator(target,key,result):decorator(result))||result);return kind&&result&&__defProp(target,key,result),result};class Link extends((0,like_anchor_dev.$)(focusable_dev.z)){constructor(){super(...arguments),this.quiet=!1}static get styles(){return[link_css]}get focusElement(){return this.anchorElement}render(){return this.renderAnchor({id:"anchor"})}}__decorateClass([(0,decorators_dev.P)("#anchor")],Link.prototype,"anchorElement",2),__decorateClass([(0,decorators_dev.MZ)({type:String,reflect:!0})],Link.prototype,"variant",2),__decorateClass([(0,decorators_dev.MZ)({reflect:!0,attribute:"static-color"})],Link.prototype,"staticColor",2),__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0,attribute:"quiet"})],Link.prototype,"quiet",2),(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-link",Link)},"./packages/menu/sp-menu-divider.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js");var menu_divider_css=index_dev.AH`
    :host{--spectrum-menu-divider-thickness:var(--spectrum-divider-thickness-medium);inline-size:auto;margin-block:var(--mod-menu-section-divider-margin-block,max(0px,(var(--spectrum-menu-item-section-divider-height) - var(--spectrum-menu-divider-thickness))/2));margin-inline:var(--mod-menu-item-label-inline-edge-to-content,var(--spectrum-menu-item-label-inline-edge-to-content));overflow:visible}.spectrum-Menu-back:focus-visible{box-shadow:var(--spectrum-menu-item-focus-indicator-shadow)var(--spectrum-menu-item-focus-indicator-border-width)0 0 0 var(--spectrum-menu-item-focus-indicator-color-default);outline:var(--spectrum-menu-item-focus-indicator-width)var(--spectrum-menu-item-focus-indicator-outline-style)var(--spectrum-menu-item-focus-indicator-color-default);outline-offset:var(--spectrum-menu-item-focus-indicator-offset);border-radius:var(--spectrum-menu-item-corner-radius)}.spectrum-Menu-back{padding-inline:var(--mod-menu-back-padding-inline-start,0)var(--mod-menu-back-padding-inline-end,var(--spectrum-menu-item-label-inline-edge-to-content));padding-block:var(--mod-menu-back-padding-block-start,0)var(--mod-menu-back-padding-block-end,0);flex-flow:wrap;align-items:center;display:flex}.spectrum-Menu-backButton{cursor:pointer;background:0 0;border:0;margin:0;padding:0;display:inline-flex}.spectrum-Menu-backButton:focus-visible{outline:var(--spectrum-focus-indicator-thickness)solid var(--spectrum-focus-indicator-color);outline-offset:calc((var(--spectrum-focus-indicator-thickness) + 1px)*-1)}.spectrum-Menu-backHeading{color:var(--highcontrast-menu-item-color-default,var(--mod-menu-back-heading-color,var(--spectrum-menu-section-header-color)));font-size:var(--mod-menu-section-header-font-size,var(--spectrum-menu-section-header-font-size));font-weight:var(--mod-menu-section-header-font-weight,var(--spectrum-menu-section-header-font-weight));line-height:var(--mod-menu-section-header-line-height,var(--spectrum-menu-section-header-line-height));display:block}:host{flex-shrink:0;display:block}
`,divider_css=__webpack_require__("./packages/divider/src/divider.css.js");class MenuDivider extends((0,index_dev.ZG)(index_dev.wG,{validSizes:["s","m","l"]})){static get styles(){return[divider_css.A,menu_divider_css]}firstUpdated(changed){super.firstUpdated(changed),this.setAttribute("role","separator")}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-menu-divider",MenuDivider)},"./packages/textfield/sp-textfield.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var _src_Textfield_dev_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/textfield/src/Textfield.dev.js");(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-textfield",_src_Textfield_dev_js__WEBPACK_IMPORTED_MODULE_0__.q)}}]);
//# sourceMappingURL=card-stories-card-stories.98154fb5.iframe.bundle.js.map