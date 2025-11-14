"use strict";(self.webpackChunk_spectrum_web_components_1st_gen=self.webpackChunk_spectrum_web_components_1st_gen||[]).push([[1342],{"./packages/color-loupe/sp-color-loupe.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js");var color_loupe_css=index_dev.AH`
    :host{inline-size:var(--spectrum-color-loupe-width);block-size:var(--spectrum-color-loupe-height);transform:translateY(8px);transform:translateY(var(--mod-colorloupe-animation-distance,8px));opacity:0;transform-origin:bottom;pointer-events:none;filter:drop-shadow(var(--mod-colorloupe-drop-shadow-x,var(--spectrum-drop-shadow-x))var(--mod-colorloupe-drop-shadow-y,var(--spectrum-color-loupe-drop-shadow-y))var(--mod-colorloupe-drop-shadow-blur,var(--spectrum-color-loupe-drop-shadow-blur))var(--mod-colorloupe-drop-shadow-color,var(--spectrum-color-loupe-drop-shadow-color)));transition:transform .1s ease-in-out,opacity .125s ease-in-out;position:absolute;inset-block-end:calc(var(--spectrum-color-handle-size) - var(--spectrum-color-handle-outer-border-width) + var(--mod-colorloupe-offset,var(--spectrum-color-loupe-bottom-to-color-handle)));inset-inline-end:calc(50% - var(--spectrum-color-loupe-width)/2)}:host:dir(rtl),:host([dir=rtl]){inset-inline-end:calc(50% - var(--spectrum-color-loupe-width)/2 - 1px)}:host([open]){opacity:1;transform:translate(0)}:host .is-disabled{opacity:0}.spectrum-ColorLoupe-inner-border{fill:var(--spectrum-picked-color);stroke:var(--mod-colorloupe-inner-border-color,var(--spectrum-color-loupe-inner-border));stroke-width:var(--mod-colorloupe-inner-border-width,var(--spectrum-color-loupe-inner-border-width))}.spectrum-ColorLoupe-outer-border{fill:none;stroke:var(--highcontrast-colorloupe-outer-border-color,var(--mod-colorloupe-outer-border-color,var(--spectrum-color-loupe-outer-border)));stroke-width:calc(var(--mod-colorloupe-outer-border-width,var(--spectrum-color-loupe-outer-border-width)) + 2px)}.spectrum-ColorLoupe-checkerboard-pattern{fill:var(--spectrum-opacity-checkerboard-square-dark)}.spectrum-ColorLoupe-checkerboard-background{fill:var(--spectrum-opacity-checkerboard-square-light)}.spectrum-ColorLoupe-checkerboard-fill{fill:var(--spectrum-colorloupe-checkerboard-fill)}@media (forced-colors:active){:host{--highcontrast-colorloupe-outer-border-color:CanvasText}}svg{width:inherit;height:inherit}.loupe-clipped{clip-path:path("M23 61.575C19.0044 57.435 15.2591 53.0606 11.784 48.475C8.68949 44.4532 5.96348 40.1608 3.639 35.65C1.224 30.8 0 26.549 0 23C0.00319993 17.6937 1.84059 12.5516 5.20091 8.44488C8.56122 4.33815 13.2378 1.51928 18.4385 0.465803C23.6392 -0.587678 29.0442 0.189006 33.7378 2.66428C38.4314 5.13955 42.125 9.16122 44.193 14.048C45.3915 16.88 46.0061 19.9248 46 23C46 26.551 44.774 30.811 42.355 35.661C40.0274 40.1747 37.298 44.4698 34.2 48.494C30.7297 53.0728 26.9898 57.4409 23 61.575ZZ")}.opacity-checkerboard{block-size:100%;inline-size:100%;position:absolute;top:2px;left:2px}
`,opacity_checkerboard_css=__webpack_require__("./tools/opacity-checkerboard/src/opacity-checkerboard.css.js"),__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__decorateClass=(decorators,target,key,kind)=>{for(var decorator,result=kind>1?void 0:kind?__getOwnPropDesc(target,key):target,i=decorators.length-1;i>=0;i--)(decorator=decorators[i])&&(result=(kind?decorator(target,key,result):decorator(result))||result);return kind&&result&&__defProp(target,key,result),result};class ColorLoupe extends index_dev.wG{constructor(){super(...arguments),this.open=!1,this.color="rgba(255, 0, 0, 0.5)"}static get styles(){return[opacity_checkerboard_css.A,color_loupe_css]}render(){return index_dev.qy`
            <div class="opacity-checkerboard loupe-clipped"></div>
            <div class="spectrum-ColorLoupe-inner-border loupe-clipped"></div>
            <div class="spectrum-ColorLoupe-outer-border loupe-clipped"></div>
            <svg
                aria-hidden="true"
                class="spectrum-ColorLoupe is-open"
                overflow="visible"
                style="--spectrum-picked-color: ${this.color}; position: absolute;"
            >
                <defs>
                    <path
                        id="loupe-path"
                        d="M23 61.575C19.0044 57.435 15.2591 53.0606 11.784 48.475C8.68949 44.4532 5.96348 40.1608 3.639 35.65C1.224 30.8 0 26.549 0 23C0.00319993 17.6937 1.84059 12.5516 5.20091 8.44488C8.56122 4.33815 13.2378 1.51928 18.4385 0.465803C23.6392 -0.587678 29.0442 0.189006 33.7378 2.66428C38.4314 5.13955 42.125 9.16122 44.193 14.048C45.3915 16.88 46.0061 19.9248 46 23C46 26.551 44.774 30.811 42.355 35.661C40.0274 40.1747 37.298 44.4698 34.2 48.494C30.7297 53.0728 26.9898 57.4409 23 61.575ZZ"
                        transform="translate(2, 2)"
                    />
                    <mask id="loupe-mask">
                        <rect
                            x="0"
                            y="0"
                            height="100"
                            width="100"
                            fill="white"
                        />
                        <use xlink:href="#path" fill="black" />
                    </mask>
                </defs>

                <g class="spectrum-ColorLoupe-loupe">
                    <g>
                        <use
                            xlink:href="#loupe-path"
                            mask="url(#loupe-mask)"
                            transform="translate(2, 2)"
                            class="spectrum-ColorLoupe-inner-border"
                        />
                        <use
                            xlink:href="#loupe-path"
                            mask="url(#loupe-mask)"
                            class="spectrum-ColorLoupe-outer-border"
                        />
                    </g>
                </g>
            </svg>
        `}}__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],ColorLoupe.prototype,"open",2),__decorateClass([(0,decorators_dev.MZ)({type:String})],ColorLoupe.prototype,"color",2),(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-color-loupe",ColorLoupe)},"./packages/color-loupe/stories/color-loupe.stories.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:function(){return __namedExportsOrder},open:function(){return open}});var _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./tools/base/src/index.dev.js");__webpack_require__("./packages/color-loupe/sp-color-loupe.dev.js");__webpack_exports__.default={title:"Color/Loupe",component:"sp-color-loupe"};const open=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-color-loupe open style="inset-block-start:25%;"></sp-color-loupe>
    `,__namedExportsOrder=["open"];open.parameters={...open.parameters,docs:{...open.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-color-loupe open style="inset-block-start:25%;"></sp-color-loupe>\n    `;\n}',...open.parameters?.docs?.source}}}},"./tools/opacity-checkerboard/src/opacity-checkerboard.css.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){const c=__webpack_require__("./tools/base/src/index.dev.js").AH`
    .opacity-checkerboard{background:repeating-conic-gradient(var(--mod-opacity-checkerboard-light,var(--spectrum-opacity-checkerboard-square-light))0 25%,var(--mod-opacity-checkerboard-dark,var(--spectrum-opacity-checkerboard-square-dark))0 50%)0 0/calc(var(--mod-opacity-checkerboard-size,var(--spectrum-opacity-checkerboard-square-size))*2)calc(var(--mod-opacity-checkerboard-size,var(--spectrum-opacity-checkerboard-square-size))*2)}@supports (background:repeating-conic-gradient(from 0deg, red 0deg, red 0deg 1deg, red 2deg)){.opacity-checkerboard{background:repeating-conic-gradient(var(--mod-opacity-checkerboard-light,var(--spectrum-opacity-checkerboard-square-light))0 25%,var(--mod-opacity-checkerboard-dark,var(--spectrum-opacity-checkerboard-square-dark))0 50%)var(--mod-opacity-checkerboard-position,left top)/calc(var(--mod-opacity-checkerboard-size,var(--spectrum-opacity-checkerboard-square-size))*2)calc(var(--mod-opacity-checkerboard-size,var(--spectrum-opacity-checkerboard-square-size))*2)}}@media (forced-colors:active){.opacity-checkerboard{forced-color-adjust:none}}
`;__webpack_exports__.A=c}}]);
//# sourceMappingURL=color-loupe-stories-color-loupe-stories.53d61c4d.iframe.bundle.js.map