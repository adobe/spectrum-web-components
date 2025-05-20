"use strict";(self.webpackChunk_adobe_spectrum_web_components=self.webpackChunk_adobe_spectrum_web_components||[]).push([[5287,6526],{"./packages/action-menu/sp-action-menu.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js"),directives_dev=__webpack_require__("./tools/base/src/directives.dev.js"),Picker_dev=__webpack_require__("./packages/picker/src/Picker.dev.js"),observe_slot_presence_dev=(__webpack_require__("./packages/action-button/sp-action-button.dev.js"),__webpack_require__("./tools/shared/src/observe-slot-presence.dev.js")),observe_slot_text_dev=__webpack_require__("./tools/shared/src/observe-slot-text.dev.js");__webpack_require__("./packages/icons-workflow/icons/sp-icon-more.js");var action_menu_css=index_dev.AH`
    :host{display:inline-flex}:host([quiet]){min-width:0}:host>sp-menu{display:none}::slotted([slot=icon]){flex-shrink:0}.icon{flex-shrink:0}#popover{max-width:none}:host([dir=ltr]) ::slotted([slot=icon]),:host([dir=ltr]) .icon{margin-left:calc(-1*(var(--spectrum-actionbutton-textonly-padding-left-adjusted) - var(--spectrum-actionbutton-padding-left-adjusted)))}:host([dir=rtl]) ::slotted([slot=icon]),:host([dir=rtl]) .icon{margin-right:calc(-1*(var(--spectrum-actionbutton-textonly-padding-left-adjusted) - var(--spectrum-actionbutton-padding-left-adjusted)))}:host([dir]) slot[icon-only]::slotted([slot=icon]),:host([dir]) slot[icon-only] .icon{margin-inline:calc((var(--custom-actionbutton-edge-to-text,var(--spectrum-actionbutton-edge-to-text)) - var(--custom-actionbutton-edge-to-visual-only,var(--spectrum-actionbutton-edge-to-visual-only)))*-1)}sp-overlay:not(:defined){display:none}
`,slottable_request_event_dev=__webpack_require__("./packages/overlay/src/slottable-request-event.dev.js"),__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__decorateClass=(decorators,target,key,kind)=>{for(var decorator,result=kind>1?void 0:kind?__getOwnPropDesc(target,key):target,i=decorators.length-1;i>=0;i--)(decorator=decorators[i])&&(result=(kind?decorator(target,key,result):decorator(result))||result);return kind&&result&&__defProp(target,key,result),result};class ActionMenu extends((0,observe_slot_presence_dev.e)((0,observe_slot_text_dev.O)(Picker_dev.C$,"label"),'[slot="label-only"]')){constructor(){super(...arguments),this.selects=void 0,this.listRole="menu",this.itemRole="menuitem",this.handleSlottableRequest=event=>{this.dispatchEvent(new slottable_request_event_dev.W(event.name,event.data))}}static get styles(){return[action_menu_css]}get hasLabel(){return this.slotHasContent}get labelOnly(){return this.slotContentIsPresent}get buttonContent(){return[index_dev.qy`
                ${this.labelOnly?index_dev.qy``:index_dev.qy`
                          <slot
                              name="icon"
                              slot="icon"
                              ?icon-only=${!this.hasLabel}
                              ?hidden=${this.labelOnly}
                          >
                              <sp-icon-more
                                  class="icon"
                                  size=${this.size}
                              ></sp-icon-more>
                          </slot>
                      `}
                <slot name="label" ?hidden=${!this.hasLabel}></slot>
                <slot name="label-only"></slot>
            `]}render(){return this.tooltipEl&&(this.tooltipEl.disabled=this.open),index_dev.qy`
            <sp-action-button
                aria-describedby=${Picker_dev.h5}
                ?quiet=${this.quiet}
                ?selected=${this.open}
                static-color=${(0,directives_dev.JR)(this.staticColor)}
                aria-haspopup="true"
                aria-controls=${(0,directives_dev.JR)(this.open?"menu":void 0)}
                aria-expanded=${this.open?"true":"false"}
                aria-label=${(0,directives_dev.JR)(this.label||void 0)}
                id="button"
                class="button"
                size=${this.size}
                @blur=${this.handleButtonBlur}
                @focus=${this.handleButtonFocus}
                @keydown=${{handleEvent:this.handleEnterKeydown,capture:!0}}
                ?disabled=${this.disabled}
            >
                ${this.buttonContent}
            </sp-action-button>
            <slot
                name="tooltip"
                @slotchange=${this.handleTooltipSlotchange}
            ></slot>
            ${this.renderMenu} ${this.renderDescriptionSlot}
        `}update(changedProperties){changedProperties.has("invalid")&&(this.invalid=!1),super.update(changedProperties)}hasAccessibleLabel(){return!!this.label||!!this.getAttribute("aria-label")||!!this.getAttribute("aria-labelledby")||!!this.appliedLabel||this.hasLabel||this.labelOnly}warnNoLabel(){window.__swc.warn(this,`<${this.localName}> needs one of the following to be accessible:`,"https://opensource.adobe.com/spectrum-web-components/components/action-menu/#accessibility",{type:"accessibility",issues:[`an <sp-field-label> element with a \`for\` attribute referencing the \`id\` of the \`<${this.localName}>\`, or`,'value supplied to the "label" attribute, which will be displayed visually as placeholder text','text content supplied in a <span> with slot="label", or, text content supplied in a <span> with slot="label-only"',"which will also be displayed visually as placeholder text."]})}}__decorateClass([(0,decorators_dev.MZ)({type:String})],ActionMenu.prototype,"selects",2),__decorateClass([(0,decorators_dev.MZ)({reflect:!0,attribute:"static-color"})],ActionMenu.prototype,"staticColor",2),__decorateClass([(0,decorators_dev.wk)()],ActionMenu.prototype,"labelOnly",1),(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-action-menu",ActionMenu)},"./packages/divider/src/divider.css.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){const i=__webpack_require__("./tools/base/src/index.dev.js").AH`
    @media (forced-colors:active){:host{--highcontrast-divider-background-color:CanvasText}}:host{--spectrum-divider-thickness:var(--spectrum-divider-thickness-medium)}:host([size=s]){--spectrum-divider-thickness:var(--spectrum-divider-thickness-small)}:host([size=l]){--spectrum-divider-thickness:var(--spectrum-divider-thickness-large);--spectrum-divider-background-color:var(--spectrum-gray-800)}:host([static-color=white]){--mod-divider-background-color:var(--mod-divider-background-color-medium-static-white,var(--spectrum-divider-background-color-static-white))}:host([static-color=white][size=s]){--mod-divider-background-color:var(--mod-divider-background-color-small-static-white,var(--spectrum-divider-background-color-static-white))}:host([static-color=white][size=l]){--mod-divider-background-color:var(--mod-divider-background-color-large-static-white,var(--spectrum-transparent-white-800))}:host([static-color=black]){--mod-divider-background-color:var(--mod-divider-background-color-medium-static-black,var(--spectrum-divider-background-color-static-black))}:host([static-color=black][size=s]){--mod-divider-background-color:var(--mod-divider-background-color-small-static-black,var(--spectrum-divider-background-color-static-black))}:host([static-color=black][size=l]){--mod-divider-background-color:var(--mod-divider-background-color-large-static-black,var(--spectrum-transparent-black-800))}:host{block-size:var(--mod-divider-thickness,var(--spectrum-divider-thickness));inline-size:100%;border:none;border-width:var(--mod-divider-thickness,var(--spectrum-divider-thickness));border-radius:var(--mod-divider-thickness,var(--spectrum-divider-thickness));background-color:var(--highcontrast-divider-background-color,var(--mod-divider-background-color,var(--spectrum-divider-background-color)));overflow:visible}:host([vertical]){inline-size:var(--mod-divider-thickness,var(--spectrum-divider-thickness));block-size:100%;block-size:var(--mod-divider-vertical-height,100%);margin-block:var(--mod-divider-vertical-margin);align-self:var(--mod-divider-vertical-align)}:host{--spectrum-divider-background-color:var(--system-divider-background-color);--spectrum-divider-background-color-static-white:var(--system-divider-background-color-static-white);--spectrum-divider-background-color-static-black:var(--system-divider-background-color-static-black)}:host{display:block}hr{border:none;margin:0}
`;__webpack_exports__.A=i},"./packages/icon/sp-icon.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var _src_Icon_dev_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icon/src/Icon.dev.js");(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon",_src_Icon_dev_js__WEBPACK_IMPORTED_MODULE_0__.I)},"./packages/icons-workflow/icons/sp-icon-checkmark-circle.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");var CheckmarkCircle=__webpack_require__("./packages/icons-workflow/src/icons/CheckmarkCircle.js");class IconCheckmarkCircle extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),2===this.spectrumVersion?(({width:e=24,height:l=24,hidden:r=!1,title:t="Checkmark Circle"}={})=>custom_tag.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${e}"
    height="${l}"
    viewBox="0 0 20 20"
    aria-hidden=${r?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${t}"
  >
    <path
      d="M10,18.75c-4.8252,0-8.75-3.9248-8.75-8.75S5.1748,1.25,10,1.25s8.75,3.9248,8.75,8.75-3.9248,8.75-8.75,8.75ZM10,2.75c-3.99805,0-7.25,3.25195-7.25,7.25s3.25195,7.25,7.25,7.25,7.25-3.25195,7.25-7.25-3.25195-7.25-7.25-7.25Z"
      fill="currentColor"
    />
    <path
      d="M9.22266,13.5c-.21191,0-.41504-.08984-.55762-.24805l-2.51074-2.79199c-.27734-.30859-.25195-.78223.05566-1.05957s.78125-.25195,1.05957.05566l1.89355,2.10645,3.4873-4.75586c.24316-.33398.71094-.40918,1.04785-.16113.33398.24414.40625.71387.16113,1.04785l-4.03223,5.5c-.13281.18262-.3418.29492-.56738.30566-.01172.00098-.02441.00098-.03711.00098Z"
      fill="currentColor"
    />
  </svg>`)({hidden:!this.label,title:this.label}):(0,CheckmarkCircle.D)({hidden:!this.label,title:this.label})}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon-checkmark-circle",IconCheckmarkCircle)},"./packages/icons-workflow/icons/sp-icon-export.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");var Export=__webpack_require__("./packages/icons-workflow/src/icons/Export.js");class IconExport extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),2===this.spectrumVersion?(({width:t=24,height:l=24,hidden:r=!1,title:e="Export"}={})=>custom_tag.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${t}"
    height="${l}"
    viewBox="0 0 20 20"
    aria-hidden=${r?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${e}"
  >
    <path
      d="M19.63574,9.46973l-3-3c-.29297-.29297-.76758-.29297-1.06055,0s-.29297.76758,0,1.06055l1.71973,1.71973h-9.15039c-.41406,0-.75.33594-.75.75s.33594.75.75.75h9.15039l-1.71973,1.71973c-.29297.29297-.29297.76758,0,1.06055.14648.14648.33789.21973.53027.21973s.38379-.07324.53027-.21973l3-3c.29297-.29297.29297-.76758,0-1.06055Z"
      fill="currentColor"
    />
    <path
      d="M13.04688,12.95605c-.41406,0-.75.33594-.75.75v2.04395c0,.41309-.33691.75-.75.75H3.25c-.41309,0-.75-.33691-.75-.75V4.25c0-.41309.33691-.75.75-.75h8.5c.41309,0,.75.33691.75.75v1.96777c0,.41406.33594.75.75.75s.75-.33594.75-.75v-1.96777c0-1.24023-1.00977-2.25-2.25-2.25H3.25c-1.24023,0-2.25,1.00977-2.25,2.25v11.5c0,1.24023,1.00977,2.25,2.25,2.25h8.29688c1.24023,0,2.25-1.00977,2.25-2.25v-2.04395c0-.41406-.33594-.75-.75-.75Z"
      fill="currentColor"
    />
  </svg>`)({hidden:!this.label,title:this.label}):(0,Export.G)({hidden:!this.label,title:this.label})}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon-export",IconExport)},"./packages/icons-workflow/icons/sp-icon-folder-open.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");var FolderOpen=__webpack_require__("./packages/icons-workflow/src/icons/FolderOpen.js");class IconFolderOpen extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),2===this.spectrumVersion?(({width:e=24,height:l=24,hidden:t=!1,title:r="Folder Open"}={})=>custom_tag.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${e}"
    height="${l}"
    viewBox="0 0 20 20"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${r}"
  >
    <path
      d="M19.21143,8.89648c-.4292-.56934-1.08398-.89648-1.79736-.89648H6.65918c-.99756,0-1.88672.66992-2.1626,1.62891l-1.64954,5.73682c-.20404-.13428-.34705-.35413-.34705-.61572V4.25c0-.41309.33643-.75.75-.75h3.56494c.21826,0,.42529.09473.56689.25684l1.70117,1.96875c.42773.49219,1.04688.77441,1.69922.77441h6.18945c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75h-6.18945c-.21777,0-.42432-.09473-.56592-.25684l-1.70117-1.96875c-.42773-.49219-1.04736-.77441-1.7002-.77441h-3.56494c-1.24072,0-2.25,1.00977-2.25,2.25v10.5c0,1.24023,1.00928,2.25,2.25,2.25.0235,0,.04327-.01123.06622-.01343.01978.00171.03687.01343.05682.01343h12.74756c.99805,0,1.88721-.66992,2.16211-1.62891l1.29395-4.5c.19727-.68457.06396-1.4043-.36523-1.97461ZM18.13525,10.45703l-1.29395,4.5c-.0918.31934-.38818.54297-.7207.54297H4.36914l1.56885-5.45703c.09229-.31934.38867-.54297.72119-.54297h10.75488c.23779,0,.45605.10938.59912.29883.14307.19043.1875.42969.12207.6582Z"
      fill="currentColor"
    />
  </svg>`)({hidden:!this.label,title:this.label}):(0,FolderOpen.u)({hidden:!this.label,title:this.label})}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon-folder-open",IconFolderOpen)},"./packages/icons-workflow/icons/sp-icon-more.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");var More=__webpack_require__("./packages/icons-workflow/src/icons/More.js");class IconMore extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),2===this.spectrumVersion?(({width:r=24,height:l=24,hidden:e=!1,title:c="More"}={})=>custom_tag.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${r}"
    height="${l}"
    viewBox="0 0 20 20"
    aria-hidden=${e?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${c}"
  >
    <circle cx="10" cy="10.02114" r="1.5" fill="currentColor" />
    <path
      d="m10,8.5c-.82843,0-1.5.67157-1.5,1.5s.67157,1.5,1.5,1.5,1.5-.67157,1.5-1.5-.67157-1.5-1.5-1.5Z"
      fill="currentColor"
    />
    <circle cx="4" cy="10.02114" r="1.5" fill="currentColor" />
    <circle cx="4" cy="10" r="1.5" fill="currentColor" />
    <circle cx="16" cy="10.02114" r="1.5" fill="currentColor" />
    <circle cx="16" cy="10" r="1.5" fill="currentColor" />
  </svg>`)({hidden:!this.label,title:this.label}):(0,More.Z)({hidden:!this.label,title:this.label})}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon-more",IconMore)},"./packages/icons-workflow/icons/sp-icon-share.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");var Share=__webpack_require__("./packages/icons-workflow/src/icons/Share.js");class IconShare extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),2===this.spectrumVersion?(({width:e=24,height:l=24,hidden:t=!1,title:r="Share"}={})=>custom_tag.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${e}"
    height="${l}"
    viewBox="0 0 20 20"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${r}"
  >
    <path
      d="m13.52734,5.49023l-3.00244-2.99756c-.29297-.29199-.76709-.29248-1.06006.00049l-2.99756,2.99756c-.29297.29297-.29297.76758,0,1.06055.14648.14648.33838.21973.53027.21973s.38379-.07324.53027-.21973l1.72217-1.72217v8.18115c0,.41406.33594.75.75.75s.75-.33594.75-.75V4.83667l1.71777,1.71509c.29297.29199.76758.29297,1.06055-.00098.29248-.29297.29248-.76807-.00098-1.06055Z"
      fill="currentColor"
    />
    <path
      d="m15.75,18.021H4.25c-1.24072,0-2.25-1.00928-2.25-2.25v-5.75c0-.41406.33594-.75.75-.75s.75.33594.75.75v5.75c0,.41357.33643.75.75.75h11.5c.41357,0,.75-.33643.75-.75v-5.75c0-.41406.33594-.75.75-.75s.75.33594.75.75v5.75c0,1.24072-1.00928,2.25-2.25,2.25Z"
      fill="currentColor"
    />
  </svg>`)({hidden:!this.label,title:this.label}):(0,Share.l)({hidden:!this.label,title:this.label})}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon-share",IconShare)},"./packages/icons-workflow/icons/sp-icon-show-menu.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-workflow/src/custom-tag.js"),ShowMenu=__webpack_require__("./packages/icons-workflow/src/icons/ShowMenu.js"),MenuHamburger=__webpack_require__("./packages/icons-workflow/src/icons-s2/MenuHamburger.js");class IconShowMenu extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),1===this.spectrumVersion?(0,ShowMenu.w)({hidden:!this.label,title:this.label}):(0,MenuHamburger.S)({hidden:!this.label,title:this.label})}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon-show-menu",IconShowMenu)},"./packages/icons-workflow/src/icons-s2/MenuHamburger.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{S:function(){return MenuHamburgerIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const MenuHamburgerIcon=({width:r=24,height:e=24,hidden:t=!1,title:l="Menu Hamburger"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${r}"
    height="${e}"
    viewBox="0 0 20 20"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${l}"
  >
    <path
      d="m16.25,14H3.75c-.41406,0-.75.33594-.75.75s.33594.75.75.75h12.5c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75Z"
      fill="currentColor"
    />
    <path
      d="m3.75,5.5h12.5c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75H3.75c-.41406,0-.75.33594-.75.75s.33594.75.75.75Z"
      fill="currentColor"
    />
    <path
      d="m16.25,9H3.75c-.41406,0-.75.33594-.75.75s.33594.75.75.75h12.5c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75Z"
      fill="currentColor"
    />
  </svg>`},"./packages/icons-workflow/src/icons/CheckmarkCircle.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{D:function(){return CheckmarkCircleIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const CheckmarkCircleIcon=({width:e=24,height:a=24,hidden:t=!1,title:l="Checkmark Circle"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${e}"
    height="${a}"
    viewBox="0 0 36 36"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${l}"
  >
    <path
      d="M18 2a16 16 0 1 0 16 16A16 16 0 0 0 18 2Zm10.666 9.08L16.018 27.341a1.208 1.208 0 0 1-.875.461c-.024.002-.05.002-.073.002a1.2 1.2 0 0 1-.85-.351l-7.784-7.795a1.2 1.2 0 0 1 0-1.698l1.326-1.325a1.201 1.201 0 0 1 1.695 0l5.346 5.347L25.314 8.473A1.203 1.203 0 0 1 27 8.263l1.455 1.133a1.205 1.205 0 0 1 .211 1.684Z"
    />
  </svg>`},"./packages/icons-workflow/src/icons/Export.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{G:function(){return ExportIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const ExportIcon=({width:a=24,height:t=24,hidden:e=!1,title:r="Export"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    height="${t}"
    viewBox="0 0 36 36"
    width="${a}"
    aria-hidden=${e?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${r}"
  >
    <path
      d="M25 26h-2a1 1 0 0 0-1 1v3H6V6h16v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v30a1 1 0 0 0 1 1h22a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1Z"
    />
    <path
      d="M35.856 17.649 29.332 10.2a.787.787 0 0 0-.527-.2.8.8 0 0 0-.8.8V16H17a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h11v5.2a.8.8 0 0 0 .8.8.787.787 0 0 0 .527-.2l6.524-7.445a.5.5 0 0 0 0-.7Z"
    />
  </svg>`},"./packages/icons-workflow/src/icons/FolderOpen.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{u:function(){return FolderOpenIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const FolderOpenIcon=({width:e=24,height:t=24,hidden:l=!1,title:a="Folder Open"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    height="${t}"
    viewBox="0 0 36 36"
    width="${e}"
    aria-hidden=${l?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
  >
    <path
      d="M30 14V9a1 1 0 0 0-1-1l-12.332.008-3.3-3.4A2 2 0 0 0 11.929 4H4a2 2 0 0 0-2 2v23a1 1 0 0 0 1 1h26.307a1 1 0 0 0 .936-.649l5.25-14A1 1 0 0 0 34.557 14ZM4 6h7.929l3.305 3.4.59.607h.845L28 10v4H8.693a1 1 0 0 0-.936.649L4 24.667Z"
    />
  </svg>`},"./packages/icons-workflow/src/icons/More.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Z:function(){return MoreIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const MoreIcon=({width:e=24,height:r=24,hidden:t=!1,title:l="More"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${e}"
    height="${r}"
    viewBox="0 0 36 36"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${l}"
  >
    <circle cx="17.8" cy="18.2" r="3.4" />
    <circle cx="29.5" cy="18.2" r="3.4" />
    <circle cx="6.1" cy="18.2" r="3.4" />
  </svg>`},"./packages/icons-workflow/src/icons/Share.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{l:function(){return ShareIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const ShareIcon=({width:a=24,height:e=24,hidden:t=!1,title:r="Share"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    height="${e}"
    viewBox="0 0 36 36"
    width="${a}"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${r}"
  >
    <path
      d="M33 10h-6a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h3v16H6V14h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v22a1 1 0 0 0 1 1h30a1 1 0 0 0 1-1V11a1 1 0 0 0-1-1Z"
    />
    <path
      d="M10.8 8H16v11a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V8h5.2a.8.8 0 0 0 .8-.8.787.787 0 0 0-.2-.527L18.351.144a.5.5 0 0 0-.7 0L10.2 6.668a.787.787 0 0 0-.2.532.8.8 0 0 0 .8.8Z"
    />
  </svg>`},"./packages/icons-workflow/src/icons/ShowMenu.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{w:function(){return ShowMenuIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const ShowMenuIcon=({width:t=24,height:e=24,hidden:r=!1,title:h="Show Menu"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    height="${e}"
    viewBox="0 0 36 36"
    width="${t}"
    aria-hidden=${r?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${h}"
  >
    <rect height="4" rx="1" ry="1" width="28" x="4" y="16" />
    <rect height="4" rx="1" ry="1" width="28" x="4" y="6" />
    <rect height="4" rx="1" ry="1" width="28" x="4" y="26" />
  </svg>`},"./packages/menu/sp-menu-divider.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js");var menu_divider_css=index_dev.AH`
    :host{--spectrum-menu-divider-thickness:var(--spectrum-divider-thickness-medium);inline-size:auto;margin-block:var(--mod-menu-section-divider-margin-block,max(0px,(var(--spectrum-menu-item-section-divider-height) - var(--spectrum-menu-divider-thickness))/2));margin-inline:var(--mod-menu-item-label-inline-edge-to-content,var(--spectrum-menu-item-label-inline-edge-to-content));overflow:visible}.spectrum-Menu-back:focus-visible{box-shadow:var(--spectrum-menu-item-focus-indicator-shadow)var(--spectrum-menu-item-focus-indicator-border-width)0 0 0 var(--spectrum-menu-item-focus-indicator-color-default);outline:var(--spectrum-menu-item-focus-indicator-width)var(--spectrum-menu-item-focus-indicator-outline-style)var(--spectrum-menu-item-focus-indicator-color-default);outline-offset:var(--spectrum-menu-item-focus-indicator-offset);border-radius:var(--spectrum-menu-item-corner-radius)}.spectrum-Menu-back{padding-inline:var(--mod-menu-back-padding-inline-start,0)var(--mod-menu-back-padding-inline-end,var(--spectrum-menu-item-label-inline-edge-to-content));padding-block:var(--mod-menu-back-padding-block-start,0)var(--mod-menu-back-padding-block-end,0);flex-flow:wrap;align-items:center;display:flex}.spectrum-Menu-backButton{cursor:pointer;background:0 0;border:0;margin:0;padding:0;display:inline-flex}.spectrum-Menu-backButton:focus-visible{outline:var(--spectrum-focus-indicator-thickness)solid var(--spectrum-focus-indicator-color);outline-offset:calc((var(--spectrum-focus-indicator-thickness) + 1px)*-1)}.spectrum-Menu-backHeading{color:var(--highcontrast-menu-item-color-default,var(--mod-menu-back-heading-color,var(--spectrum-menu-section-header-color)));font-size:var(--mod-menu-section-header-font-size,var(--spectrum-menu-section-header-font-size));font-weight:var(--mod-menu-section-header-font-weight,var(--spectrum-menu-section-header-font-weight));line-height:var(--mod-menu-section-header-line-height,var(--spectrum-menu-section-header-line-height));display:block}:host{flex-shrink:0;display:block}
`,divider_css=__webpack_require__("./packages/divider/src/divider.css.js");class MenuDivider extends((0,index_dev.ZG)(index_dev.wG,{validSizes:["s","m","l"]})){static get styles(){return[divider_css.A,menu_divider_css]}firstUpdated(changed){super.firstUpdated(changed),this.setAttribute("role","separator")}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-menu-divider",MenuDivider)},"./packages/menu/sp-menu-group.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js"),random_id_dev=__webpack_require__("./tools/shared/src/random-id.dev.js"),Menu_dev=__webpack_require__("./packages/menu/src/Menu.dev.js");__webpack_require__("./packages/menu/sp-menu.dev.js");var menu_group_css=index_dev.AH`
    .spectrum-Menu-back:focus-visible{box-shadow:var(--spectrum-menu-item-focus-indicator-shadow)var(--spectrum-menu-item-focus-indicator-border-width)0 0 0 var(--spectrum-menu-item-focus-indicator-color-default);outline:var(--spectrum-menu-item-focus-indicator-width)var(--spectrum-menu-item-focus-indicator-outline-style)var(--spectrum-menu-item-focus-indicator-color-default);outline-offset:var(--spectrum-menu-item-focus-indicator-offset);border-radius:var(--spectrum-menu-item-corner-radius)}.header{color:var(--highcontrast-menu-item-color-default,var(--mod-menu-section-header-color,var(--spectrum-menu-section-header-color)));font-size:var(--mod-menu-section-header-font-size,var(--spectrum-menu-section-header-font-size));font-weight:var(--mod-menu-section-header-font-weight,var(--spectrum-menu-section-header-font-weight));line-height:var(--mod-menu-section-header-line-height,var(--spectrum-menu-section-header-line-height));min-inline-size:var(--mod-menu-section-header-min-width,var(--spectrum-menu-section-header-min-width));padding-block-start:var(--mod-menu-section-header-top-edge-to-text,var(--mod-menu-item-top-edge-to-text,var(--spectrum-menu-item-top-edge-to-text)));padding-block-end:var(--mod-menu-section-header-bottom-edge-to-text,var(--mod-menu-item-bottom-edge-to-text,var(--spectrum-menu-item-bottom-edge-to-text)));padding-inline:var(--mod-menu-item-label-inline-edge-to-content,var(--spectrum-menu-item-label-inline-edge-to-content));grid-area:sectionHeadingArea/1/sectionHeadingArea/-1;display:block}.spectrum-Menu-back{padding-inline:var(--mod-menu-back-padding-inline-start,0)var(--mod-menu-back-padding-inline-end,var(--spectrum-menu-item-label-inline-edge-to-content));padding-block:var(--mod-menu-back-padding-block-start,0)var(--mod-menu-back-padding-block-end,0);flex-flow:wrap;align-items:center;display:flex}.spectrum-Menu-back .header{padding:0}.spectrum-Menu-backButton{cursor:pointer;background:0 0;border:0;margin:0;padding:0;display:inline-flex}.spectrum-Menu-backButton:focus-visible{outline:var(--spectrum-focus-indicator-thickness)solid var(--spectrum-focus-indicator-color);outline-offset:calc((var(--spectrum-focus-indicator-thickness) + 1px)*-1)}.spectrum-Menu-backHeading{color:var(--highcontrast-menu-item-color-default,var(--mod-menu-back-heading-color,var(--spectrum-menu-section-header-color)));font-size:var(--mod-menu-section-header-font-size,var(--spectrum-menu-section-header-font-size));font-weight:var(--mod-menu-section-header-font-weight,var(--spectrum-menu-section-header-font-weight));line-height:var(--mod-menu-section-header-line-height,var(--spectrum-menu-section-header-line-height));display:block}:host{flex-direction:column;margin:0;display:flex;overflow:visible}[hidden]{display:none!important}
`,__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__decorateClass=(decorators,target,key,kind)=>{for(var decorator,result=kind>1?void 0:kind?__getOwnPropDesc(target,key):target,i=decorators.length-1;i>=0;i--)(decorator=decorators[i])&&(result=(kind?decorator(target,key,result):decorator(result))||result);return kind&&result&&__defProp(target,key,result),result};class MenuGroup extends Menu_dev.W{constructor(){super(...arguments),this.headerId=""}static get styles(){return[...super.styles,menu_group_css]}get ownRole(){return"group"}get controlsRovingTabindex(){return!1}updateLabel(){const headerElement=this.headerElements.length?this.headerElements[0]:void 0;if(headerElement!==this.headerElement)if(this.headerElement&&this.headerElement.id===this.headerId&&this.headerElement.removeAttribute("id"),headerElement){this.headerId=this.headerId||`sp-menu-group-label-${(0,random_id_dev.l)()}`;const headerId=headerElement.id||this.headerId;headerElement.id||(headerElement.id=headerId),this.setAttribute("aria-labelledby",headerId)}else this.removeAttribute("aria-labelledby");this.headerElement=headerElement}render(){return index_dev.qy`
            <span class="header" ?hidden=${!this.headerElement}>
                <slot name="header" @slotchange=${this.updateLabel}></slot>
            </span>
            ${this.renderMenuItemSlot()}
        `}}__decorateClass([(0,decorators_dev.gZ)({slot:"header",flatten:!0})],MenuGroup.prototype,"headerElements",2),__decorateClass([(0,decorators_dev.wk)()],MenuGroup.prototype,"headerElement",2),(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-menu-group",MenuGroup)},"./packages/menu/stories/menu.stories.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:function(){return Default},MenuGroupSelects:function(){return MenuGroupSelects},MenuGroupSelectsMultiple:function(){return MenuGroupSelectsMultiple},Selected:function(){return Selected},SelectsWithIcons:function(){return SelectsWithIcons},__namedExportsOrder:function(){return __namedExportsOrder},controlled:function(){return controlled},dynamicRemoval:function(){return dynamicRemoval},headersAndIcons:function(){return headersAndIcons},menuItemWithDescription:function(){return menuItemWithDescription},menuWithValueSlots:function(){return menuWithValueSlots},multipleSelect:function(){return multipleSelect},selectedOffPage:function(){return selectedOffPage},singleSelect:function(){return singleSelect}});var _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./tools/base/src/index.dev.js");__webpack_require__("./packages/menu/sp-menu.dev.js"),__webpack_require__("./packages/popover/sp-popover.dev.js"),__webpack_require__("./packages/action-menu/sp-action-menu.dev.js"),__webpack_require__("./packages/menu/sp-menu-item.dev.js"),__webpack_require__("./packages/menu/sp-menu-divider.dev.js"),__webpack_require__("./packages/menu/sp-menu-group.dev.js"),__webpack_require__("./packages/icon/sp-icon.dev.js"),__webpack_require__("./packages/icons-workflow/icons/sp-icon-checkmark-circle.js"),__webpack_require__("./packages/icons-workflow/icons/sp-icon-export.js"),__webpack_require__("./packages/icons-workflow/icons/sp-icon-folder-open.js"),__webpack_require__("./packages/icons-workflow/icons/sp-icon-share.js"),__webpack_require__("./packages/icons-workflow/icons/sp-icon-show-menu.js");__webpack_exports__.default={component:"sp-menu",title:"Menu"};const Default=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-menu>
            <sp-menu-item>Deselect</sp-menu-item>
            <sp-menu-item>Select Inverse</sp-menu-item>
            <sp-menu-item>Feather...</sp-menu-item>
            <sp-menu-item>Select and Mask...</sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item>Save Selection</sp-menu-item>
            <sp-menu-item disabled>Make Work Path</sp-menu-item>
        </sp-menu>

        <sp-popover open>
            <sp-menu>
                <sp-menu-item>Deselect</sp-menu-item>
                <sp-menu-item>Select Inverse</sp-menu-item>
                <sp-menu-item>Feather...</sp-menu-item>
                <sp-menu-item>Select and Mask...</sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item>Save Selection</sp-menu-item>
                <sp-menu-item disabled>Make Work Path</sp-menu-item>
            </sp-menu>
        </sp-popover>
    `,singleSelect=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-menu
            selects="single"
            @change=${({target:{value:value}})=>{navigator.clipboard.writeText(value)}}
        >
            <sp-menu-item selected>Deselect</sp-menu-item>
            <sp-menu-item>Select Inverse</sp-menu-item>
            <sp-menu-item>Feather...</sp-menu-item>
            <sp-menu-item>Select and Mask...</sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item>Save Selection</sp-menu-item>
            <sp-menu-item disabled>Make Work Path</sp-menu-item>
        </sp-menu>

        <sp-popover open>
            <sp-menu
                selects="single"
                @change=${({target:{value:value}})=>{navigator.clipboard.writeText(value)}}
            >
                <sp-menu-item>Deselect</sp-menu-item>
                <sp-menu-item>Select Inverse</sp-menu-item>
                <sp-menu-item selected>Feather...</sp-menu-item>
                <sp-menu-item>Select and Mask...</sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item>Save Selection</sp-menu-item>
                <sp-menu-item disabled>Make Work Path</sp-menu-item>
            </sp-menu>
        </sp-popover>
    `,multipleSelect=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-menu selects="multiple">
            <sp-menu-item>Deselect</sp-menu-item>
            <sp-menu-item>Select Inverse</sp-menu-item>
            <sp-menu-item selected>Feather...</sp-menu-item>
            <sp-menu-item>Select and Mask...</sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item selected>Save Selection</sp-menu-item>
            <sp-menu-item disabled>Make Work Path</sp-menu-item>
        </sp-menu>

        <sp-popover open>
            <sp-menu selects="multiple">
                <sp-menu-item>Deselect</sp-menu-item>
                <sp-menu-item selected>Select Inverse</sp-menu-item>
                <sp-menu-item>Feather...</sp-menu-item>
                <sp-menu-item selected>Select and Mask...</sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item>Save Selection</sp-menu-item>
                <sp-menu-item disabled>Make Work Path</sp-menu-item>
            </sp-menu>
        </sp-popover>
    `,controlled=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <p>
            This Menu will default to a
            <code>selected</code>
            value of
            <code>[ 'Feather...', 'Save Selection' ]</code>
            but then on any subsequent interaction be forced to a
            <code>selected</code>
            value of
            <code>[ 'Select and Mask...' ]</code>
            .
        </p>
        <sp-menu selects="multiple" @change=${event=>{event.target.updateComplete.then((()=>{event.target.selected=["Select and Mask..."]}))}}>
            <sp-menu-item>Deselect</sp-menu-item>
            <sp-menu-item>Select Inverse</sp-menu-item>
            <sp-menu-item selected>Feather...</sp-menu-item>
            <sp-menu-item>Select and Mask...</sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item selected>Save Selection</sp-menu-item>
            <sp-menu-item disabled>Make Work Path</sp-menu-item>
        </sp-menu>
    `;controlled.swc_vrt={skip:!0},controlled.parameters={chromatic:{disableSnapshot:!0}};class MenuItemWithDescription extends _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.WF{overriderender(){return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
            <sp-menu>
                <sp-menu-item>
                    <sp-icon-export slot="icon"></sp-icon-export>
                    Quick export
                    <span slot="description">Share a snapshot</span>
                </sp-menu-item>
                <sp-menu-item>
                    <sp-icon-folder-open slot="icon"></sp-icon-folder-open>
                    Open a copy
                    <span slot="description">Illustrator for iPad</span>
                </sp-menu-item>
                <sp-menu-item disabled>
                    <sp-icon-share slot="icon"></sp-icon-share>
                    Share link
                    <span slot="description">Enable comments and download</span>
                </sp-menu-item>
            </sp-menu>

            <sp-popover open>
                <sp-menu selects="multiple">
                    <sp-menu-item>Deselect</sp-menu-item>
                    <sp-menu-item selected>
                        Select Inverse
                        <span slot="description">Enable inverse selection</span>
                    </sp-menu-item>
                    <sp-menu-item>Feather...</sp-menu-item>
                    <sp-menu-item selected>Select and Mask...</sp-menu-item>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-item>Save Selection</sp-menu-item>
                    <sp-menu-item disabled>
                        Make Work Path
                        <span slot="description">
                            Create a reusable work path
                        </span>
                    </sp-menu-item>
                </sp-menu>
            </sp-popover>
        `}}customElements.define("menu-item-with-description",MenuItemWithDescription);const menuItemWithDescription=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
    <menu-item-with-description></menu-item-with-description>
`;class WithIcons extends _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.WF{render(){return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
            <sp-popover open>
                <sp-menu selects="single">
                    <sp-menu-item>
                        <sp-icon-export slot="icon"></sp-icon-export>
                        Quick export
                    </sp-menu-item>
                    <sp-menu-item selected>
                        <sp-icon-folder-open slot="icon"></sp-icon-folder-open>
                        Open a copy
                    </sp-menu-item>
                    <sp-menu-item>
                        <sp-icon-share slot="icon"></sp-icon-share>
                        Share link
                        <span slot="description">
                            Enable comments and download
                        </span>
                    </sp-menu-item>
                </sp-menu>
            </sp-popover>
        `}}customElements.define("menu-with-icons",WithIcons);const SelectsWithIcons=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
    <menu-with-icons></menu-with-icons>
`;class HeadersAndIcons extends _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.WF{render(){return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
            <sp-popover open>
                <sp-menu selects="single">
                    <sp-menu-group>
                        <span slot="header">Section Heading</span>
                        <sp-menu-item>Action 1</sp-menu-item>
                        <sp-menu-item>Action 2</sp-menu-item>
                        <sp-menu-item>Action 3</sp-menu-item>
                    </sp-menu-group>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-group>
                        <span slot="header">Section Heading</span>
                        <sp-menu-item>
                            <sp-icon-checkmark-circle
                                slot="icon"
                            ></sp-icon-checkmark-circle>
                            Save
                        </sp-menu-item>
                        <sp-menu-item disabled>
                            <sp-icon-checkmark-circle
                                slot="icon"
                            ></sp-icon-checkmark-circle>
                            Download
                        </sp-menu-item>
                        <sp-menu-item disabled>
                            <sp-icon-checkmark-circle
                                slot="icon"
                            ></sp-icon-checkmark-circle>
                            Share link
                            <span slot="description">Enable comments</span>
                        </sp-menu-item>
                    </sp-menu-group>
                </sp-menu>
            </sp-popover>
        `}}customElements.define("headers-and-icons",HeadersAndIcons);const headersAndIcons=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
    <headers-and-icons></headers-and-icons>
`;headersAndIcons.storyName="Headers and Icons";const Selected=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-popover open style="width: 200px;">
            <sp-menu>
                <sp-menu-group>
                    <span slot="header">San Francisco</span>
                    <sp-menu-item>Financial District</sp-menu-item>
                    <sp-menu-item>South of Market</sp-menu-item>
                    <sp-menu-item>North Beach</sp-menu-item>
                </sp-menu-group>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-group selects="single">
                    <span slot="header">Oakland</span>
                    <sp-menu-item>City Center</sp-menu-item>
                    <sp-menu-item disabled>Jack London Square</sp-menu-item>
                    <sp-menu-item selected>
                        My best friend's mom's house in the burbs just off
                        Silverado street
                    </sp-menu-item>
                </sp-menu-group>
            </sp-menu>
        </sp-popover>
    `,MenuGroupSelects=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-popover open style="width: 200px;">
            <sp-menu selects="single">
                <sp-menu-group selects="inherit">
                    <span slot="header">One of these</span>
                    <sp-menu-item>Camden</sp-menu-item>
                    <sp-menu-item>Cedar Riverside</sp-menu-item>
                    <sp-menu-item>Downtown</sp-menu-item>
                    <sp-menu-item>Northeast Arts District</sp-menu-item>
                    <sp-menu-item selected>Uptown</sp-menu-item>
                </sp-menu-group>
                <sp-menu-group selects="inherit">
                    <span slot="header">Or of these</span>
                    <sp-menu-item>Lowertown</sp-menu-item>
                    <sp-menu-item>Grand Ave</sp-menu-item>
                </sp-menu-group>
                <sp-menu-group selects="multiple">
                    <span slot="header">Many of these</span>
                    <sp-menu-item>Financial District</sp-menu-item>
                    <sp-menu-item selected>South of Market</sp-menu-item>
                    <sp-menu-item selected>North Beach</sp-menu-item>
                </sp-menu-group>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-group selects="single">
                    <span slot="header">One of these</span>
                    <sp-menu-item>City Center</sp-menu-item>
                    <sp-menu-item disabled>Jack London Square</sp-menu-item>
                    <sp-menu-item selected>
                        My best friend's mom's house in the burbs just off
                        Silverado street
                    </sp-menu-item>
                </sp-menu-group>
            </sp-menu>
        </sp-popover>
    `,selectedOffPage=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <p style="height: 100vh; padding-bottom: 50px;">
            In this example the \`&lt;sp-menu-item selected&gt;\` element is off
            the visible page by default, but does not alter the page scroll on
            load.
        </p>
        <sp-menu>
            <sp-menu-item selected style="padding-bottom: 50px;">
                My best friend's mom's house in the burbs just off Silverado
                street
            </sp-menu-item>
        </sp-menu>
    `,MenuGroupSelectsMultiple=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-popover open style="width: 200px;">
            <sp-menu selects="multiple">
                <sp-menu-group selects="inherit">
                    <span slot="header">Many of these</span>
                    <sp-menu-item>Camden</sp-menu-item>
                    <sp-menu-item selected>Cedar Riverside</sp-menu-item>
                    <sp-menu-item selected>Downtown</sp-menu-item>
                    <sp-menu-item>Northeast Arts District</sp-menu-item>
                    <sp-menu-item>Uptown</sp-menu-item>
                </sp-menu-group>
                <sp-menu-group selects="inherit">
                    <span slot="header">And these, too</span>
                    <sp-menu-item>Lowertown</sp-menu-item>
                    <sp-menu-item selected>Grand Ave</sp-menu-item>
                </sp-menu-group>
                <sp-menu-group>
                    <span slot="header">None of these</span>
                    <sp-menu-item>Financial District</sp-menu-item>
                    <sp-menu-item>South of Market</sp-menu-item>
                    <sp-menu-item>North Beach</sp-menu-item>
                </sp-menu-group>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-group selects="single">
                    <span slot="header">One of these</span>
                    <sp-menu-item>City Center</sp-menu-item>
                    <sp-menu-item disabled>Jack London Square</sp-menu-item>
                    <sp-menu-item selected>
                        My best friend's mom's house in the burbs just off
                        Silverado street
                    </sp-menu-item>
                </sp-menu-group>
            </sp-menu>
        </sp-popover>
    `,menuWithValueSlots=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-menu style="width: 150px">
            <sp-menu-item>
                Undo
                <span slot="value">⌘​Z</span>
            </sp-menu-item>
            <sp-menu-item disabled>
                Redo
                <span slot="value">⇧⌘​Z</span>
            </sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item>
                Cut
                <span slot="value">⌘​X</span>
            </sp-menu-item>
            <sp-menu-item>
                Copy
                <span slot="value">⌘​S</span>
            </sp-menu-item>
            <sp-menu-item disabled>
                Paste
                <span slot="value">⌘​P</span>
            </sp-menu-item>
        </sp-menu>
        <sp-popover open style="width: 150px">
            <sp-menu>
                <sp-menu-item>
                    Undo
                    <span slot="value">⌘​Z</span>
                </sp-menu-item>
                <sp-menu-item disabled>
                    Redo
                    <span slot="value">⇧⌘​Z</span>
                </sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item>
                    Cut
                    <span slot="value">⌘​X</span>
                </sp-menu-item>
                <sp-menu-item>
                    Copy
                    <span slot="value">⌘​S</span>
                </sp-menu-item>
                <sp-menu-item disabled>
                    Paste
                    <span slot="value">⌘​P</span>
                </sp-menu-item>
            </sp-menu>
        </sp-popover>
    `;headersAndIcons.storyName="Dynamic MenuItems";const dynamicRemoval=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-menu id="casey" selects="single">
            <sp-menu-item>Deselect</sp-menu-item>
            <sp-menu-item>Select Inverse</sp-menu-item>
            <sp-menu-item id="nikkimk" @focus=${async function(event){var _a,_b;await(null==(_a=event.target)?void 0:_a.updateComplete),null==(_b=event.target)||_b.remove()}}>
                Feather...
            </sp-menu-item>
            <sp-menu-item selected>Select and Mask...</sp-menu-item>
            <sp-menu-item>Save Selection</sp-menu-item>
            <sp-menu-item disabled>Make Work Path</sp-menu-item>
        </sp-menu>
    `,__namedExportsOrder=["Default","singleSelect","multipleSelect","controlled","menuItemWithDescription","SelectsWithIcons","headersAndIcons","Selected","MenuGroupSelects","selectedOffPage","MenuGroupSelectsMultiple","menuWithValueSlots","dynamicRemoval"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"() => {\n  return html`\n        <sp-menu>\n            <sp-menu-item>Deselect</sp-menu-item>\n            <sp-menu-item>Select Inverse</sp-menu-item>\n            <sp-menu-item>Feather...</sp-menu-item>\n            <sp-menu-item>Select and Mask...</sp-menu-item>\n            <sp-menu-divider></sp-menu-divider>\n            <sp-menu-item>Save Selection</sp-menu-item>\n            <sp-menu-item disabled>Make Work Path</sp-menu-item>\n        </sp-menu>\n\n        <sp-popover open>\n            <sp-menu>\n                <sp-menu-item>Deselect</sp-menu-item>\n                <sp-menu-item>Select Inverse</sp-menu-item>\n                <sp-menu-item>Feather...</sp-menu-item>\n                <sp-menu-item>Select and Mask...</sp-menu-item>\n                <sp-menu-divider></sp-menu-divider>\n                <sp-menu-item>Save Selection</sp-menu-item>\n                <sp-menu-item disabled>Make Work Path</sp-menu-item>\n            </sp-menu>\n        </sp-popover>\n    `;\n}",...Default.parameters?.docs?.source}}},singleSelect.parameters={...singleSelect.parameters,docs:{...singleSelect.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-menu\n            selects="single"\n            @change=${({\n    target: {\n      value\n    }\n  }) => {\n    navigator.clipboard.writeText(value);\n  }}\n        >\n            <sp-menu-item selected>Deselect</sp-menu-item>\n            <sp-menu-item>Select Inverse</sp-menu-item>\n            <sp-menu-item>Feather...</sp-menu-item>\n            <sp-menu-item>Select and Mask...</sp-menu-item>\n            <sp-menu-divider></sp-menu-divider>\n            <sp-menu-item>Save Selection</sp-menu-item>\n            <sp-menu-item disabled>Make Work Path</sp-menu-item>\n        </sp-menu>\n\n        <sp-popover open>\n            <sp-menu\n                selects="single"\n                @change=${({\n    target: {\n      value\n    }\n  }) => {\n    navigator.clipboard.writeText(value);\n  }}\n            >\n                <sp-menu-item>Deselect</sp-menu-item>\n                <sp-menu-item>Select Inverse</sp-menu-item>\n                <sp-menu-item selected>Feather...</sp-menu-item>\n                <sp-menu-item>Select and Mask...</sp-menu-item>\n                <sp-menu-divider></sp-menu-divider>\n                <sp-menu-item>Save Selection</sp-menu-item>\n                <sp-menu-item disabled>Make Work Path</sp-menu-item>\n            </sp-menu>\n        </sp-popover>\n    `;\n}',...singleSelect.parameters?.docs?.source}}},multipleSelect.parameters={...multipleSelect.parameters,docs:{...multipleSelect.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-menu selects="multiple">\n            <sp-menu-item>Deselect</sp-menu-item>\n            <sp-menu-item>Select Inverse</sp-menu-item>\n            <sp-menu-item selected>Feather...</sp-menu-item>\n            <sp-menu-item>Select and Mask...</sp-menu-item>\n            <sp-menu-divider></sp-menu-divider>\n            <sp-menu-item selected>Save Selection</sp-menu-item>\n            <sp-menu-item disabled>Make Work Path</sp-menu-item>\n        </sp-menu>\n\n        <sp-popover open>\n            <sp-menu selects="multiple">\n                <sp-menu-item>Deselect</sp-menu-item>\n                <sp-menu-item selected>Select Inverse</sp-menu-item>\n                <sp-menu-item>Feather...</sp-menu-item>\n                <sp-menu-item selected>Select and Mask...</sp-menu-item>\n                <sp-menu-divider></sp-menu-divider>\n                <sp-menu-item>Save Selection</sp-menu-item>\n                <sp-menu-item disabled>Make Work Path</sp-menu-item>\n            </sp-menu>\n        </sp-popover>\n    `;\n}',...multipleSelect.parameters?.docs?.source}}},controlled.parameters={...controlled.parameters,docs:{...controlled.parameters?.docs,source:{originalSource:"() => {\n  const forceSelection = event => {\n    event.target.updateComplete.then(() => {\n      event.target.selected = [\"Select and Mask...\"];\n    });\n  };\n  return html`\n        <p>\n            This Menu will default to a\n            <code>selected</code>\n            value of\n            <code>[ 'Feather...', 'Save Selection' ]</code>\n            but then on any subsequent interaction be forced to a\n            <code>selected</code>\n            value of\n            <code>[ 'Select and Mask...' ]</code>\n            .\n        </p>\n        <sp-menu selects=\"multiple\" @change=${forceSelection}>\n            <sp-menu-item>Deselect</sp-menu-item>\n            <sp-menu-item>Select Inverse</sp-menu-item>\n            <sp-menu-item selected>Feather...</sp-menu-item>\n            <sp-menu-item>Select and Mask...</sp-menu-item>\n            <sp-menu-divider></sp-menu-divider>\n            <sp-menu-item selected>Save Selection</sp-menu-item>\n            <sp-menu-item disabled>Make Work Path</sp-menu-item>\n        </sp-menu>\n    `;\n}",...controlled.parameters?.docs?.source}}},menuItemWithDescription.parameters={...menuItemWithDescription.parameters,docs:{...menuItemWithDescription.parameters?.docs,source:{originalSource:"() => html`\n    <menu-item-with-description></menu-item-with-description>\n`",...menuItemWithDescription.parameters?.docs?.source}}},SelectsWithIcons.parameters={...SelectsWithIcons.parameters,docs:{...SelectsWithIcons.parameters?.docs,source:{originalSource:"() => html`\n    <menu-with-icons></menu-with-icons>\n`",...SelectsWithIcons.parameters?.docs?.source}}},headersAndIcons.parameters={...headersAndIcons.parameters,docs:{...headersAndIcons.parameters?.docs,source:{originalSource:"() => html`\n    <headers-and-icons></headers-and-icons>\n`",...headersAndIcons.parameters?.docs?.source}}},Selected.parameters={...Selected.parameters,docs:{...Selected.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-popover open style="width: 200px;">\n            <sp-menu>\n                <sp-menu-group>\n                    <span slot="header">San Francisco</span>\n                    <sp-menu-item>Financial District</sp-menu-item>\n                    <sp-menu-item>South of Market</sp-menu-item>\n                    <sp-menu-item>North Beach</sp-menu-item>\n                </sp-menu-group>\n                <sp-menu-divider></sp-menu-divider>\n                <sp-menu-group selects="single">\n                    <span slot="header">Oakland</span>\n                    <sp-menu-item>City Center</sp-menu-item>\n                    <sp-menu-item disabled>Jack London Square</sp-menu-item>\n                    <sp-menu-item selected>\n                        My best friend\'s mom\'s house in the burbs just off\n                        Silverado street\n                    </sp-menu-item>\n                </sp-menu-group>\n            </sp-menu>\n        </sp-popover>\n    `;\n}',...Selected.parameters?.docs?.source}}},MenuGroupSelects.parameters={...MenuGroupSelects.parameters,docs:{...MenuGroupSelects.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-popover open style="width: 200px;">\n            <sp-menu selects="single">\n                <sp-menu-group selects="inherit">\n                    <span slot="header">One of these</span>\n                    <sp-menu-item>Camden</sp-menu-item>\n                    <sp-menu-item>Cedar Riverside</sp-menu-item>\n                    <sp-menu-item>Downtown</sp-menu-item>\n                    <sp-menu-item>Northeast Arts District</sp-menu-item>\n                    <sp-menu-item selected>Uptown</sp-menu-item>\n                </sp-menu-group>\n                <sp-menu-group selects="inherit">\n                    <span slot="header">Or of these</span>\n                    <sp-menu-item>Lowertown</sp-menu-item>\n                    <sp-menu-item>Grand Ave</sp-menu-item>\n                </sp-menu-group>\n                <sp-menu-group selects="multiple">\n                    <span slot="header">Many of these</span>\n                    <sp-menu-item>Financial District</sp-menu-item>\n                    <sp-menu-item selected>South of Market</sp-menu-item>\n                    <sp-menu-item selected>North Beach</sp-menu-item>\n                </sp-menu-group>\n                <sp-menu-divider></sp-menu-divider>\n                <sp-menu-group selects="single">\n                    <span slot="header">One of these</span>\n                    <sp-menu-item>City Center</sp-menu-item>\n                    <sp-menu-item disabled>Jack London Square</sp-menu-item>\n                    <sp-menu-item selected>\n                        My best friend\'s mom\'s house in the burbs just off\n                        Silverado street\n                    </sp-menu-item>\n                </sp-menu-group>\n            </sp-menu>\n        </sp-popover>\n    `;\n}',...MenuGroupSelects.parameters?.docs?.source}}},selectedOffPage.parameters={...selectedOffPage.parameters,docs:{...selectedOffPage.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <p style="height: 100vh; padding-bottom: 50px;">\n            In this example the \\`&lt;sp-menu-item selected&gt;\\` element is off\n            the visible page by default, but does not alter the page scroll on\n            load.\n        </p>\n        <sp-menu>\n            <sp-menu-item selected style="padding-bottom: 50px;">\n                My best friend\'s mom\'s house in the burbs just off Silverado\n                street\n            </sp-menu-item>\n        </sp-menu>\n    `;\n}',...selectedOffPage.parameters?.docs?.source}}},MenuGroupSelectsMultiple.parameters={...MenuGroupSelectsMultiple.parameters,docs:{...MenuGroupSelectsMultiple.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-popover open style="width: 200px;">\n            <sp-menu selects="multiple">\n                <sp-menu-group selects="inherit">\n                    <span slot="header">Many of these</span>\n                    <sp-menu-item>Camden</sp-menu-item>\n                    <sp-menu-item selected>Cedar Riverside</sp-menu-item>\n                    <sp-menu-item selected>Downtown</sp-menu-item>\n                    <sp-menu-item>Northeast Arts District</sp-menu-item>\n                    <sp-menu-item>Uptown</sp-menu-item>\n                </sp-menu-group>\n                <sp-menu-group selects="inherit">\n                    <span slot="header">And these, too</span>\n                    <sp-menu-item>Lowertown</sp-menu-item>\n                    <sp-menu-item selected>Grand Ave</sp-menu-item>\n                </sp-menu-group>\n                <sp-menu-group>\n                    <span slot="header">None of these</span>\n                    <sp-menu-item>Financial District</sp-menu-item>\n                    <sp-menu-item>South of Market</sp-menu-item>\n                    <sp-menu-item>North Beach</sp-menu-item>\n                </sp-menu-group>\n                <sp-menu-divider></sp-menu-divider>\n                <sp-menu-group selects="single">\n                    <span slot="header">One of these</span>\n                    <sp-menu-item>City Center</sp-menu-item>\n                    <sp-menu-item disabled>Jack London Square</sp-menu-item>\n                    <sp-menu-item selected>\n                        My best friend\'s mom\'s house in the burbs just off\n                        Silverado street\n                    </sp-menu-item>\n                </sp-menu-group>\n            </sp-menu>\n        </sp-popover>\n    `;\n}',...MenuGroupSelectsMultiple.parameters?.docs?.source}}},menuWithValueSlots.parameters={...menuWithValueSlots.parameters,docs:{...menuWithValueSlots.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-menu style="width: 150px">\n            <sp-menu-item>\n                Undo\n                <span slot="value">⌘​Z</span>\n            </sp-menu-item>\n            <sp-menu-item disabled>\n                Redo\n                <span slot="value">⇧⌘​Z</span>\n            </sp-menu-item>\n            <sp-menu-divider></sp-menu-divider>\n            <sp-menu-item>\n                Cut\n                <span slot="value">⌘​X</span>\n            </sp-menu-item>\n            <sp-menu-item>\n                Copy\n                <span slot="value">⌘​S</span>\n            </sp-menu-item>\n            <sp-menu-item disabled>\n                Paste\n                <span slot="value">⌘​P</span>\n            </sp-menu-item>\n        </sp-menu>\n        <sp-popover open style="width: 150px">\n            <sp-menu>\n                <sp-menu-item>\n                    Undo\n                    <span slot="value">⌘​Z</span>\n                </sp-menu-item>\n                <sp-menu-item disabled>\n                    Redo\n                    <span slot="value">⇧⌘​Z</span>\n                </sp-menu-item>\n                <sp-menu-divider></sp-menu-divider>\n                <sp-menu-item>\n                    Cut\n                    <span slot="value">⌘​X</span>\n                </sp-menu-item>\n                <sp-menu-item>\n                    Copy\n                    <span slot="value">⌘​S</span>\n                </sp-menu-item>\n                <sp-menu-item disabled>\n                    Paste\n                    <span slot="value">⌘​P</span>\n                </sp-menu-item>\n            </sp-menu>\n        </sp-popover>\n    `;\n}',...menuWithValueSlots.parameters?.docs?.source}}},dynamicRemoval.parameters={...dynamicRemoval.parameters,docs:{...dynamicRemoval.parameters?.docs,source:{originalSource:'() => {\n  const removeItem = async function (event) {\n    var _a, _b;\n    await ((_a = event.target) == null ? void 0 : _a.updateComplete);\n    (_b = event.target) == null ? void 0 : _b.remove();\n  };\n  return html`\n        <sp-menu id="casey" selects="single">\n            <sp-menu-item>Deselect</sp-menu-item>\n            <sp-menu-item>Select Inverse</sp-menu-item>\n            <sp-menu-item id="nikkimk" @focus=${removeItem}>\n                Feather...\n            </sp-menu-item>\n            <sp-menu-item selected>Select and Mask...</sp-menu-item>\n            <sp-menu-item>Save Selection</sp-menu-item>\n            <sp-menu-item disabled>Make Work Path</sp-menu-item>\n        </sp-menu>\n    `;\n}',...dynamicRemoval.parameters?.docs?.source}}}},"./packages/popover/sp-popover.dev.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__);var _src_Popover_dev_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/popover/src/Popover.dev.js");(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-popover",_src_Popover_dev_js__WEBPACK_IMPORTED_MODULE_0__.A)},"./packages/popover/src/Popover.dev.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:function(){return Popover}});var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js");var popover_css=index_dev.AH`
    :host{pointer-events:none;visibility:hidden;opacity:0;transition:transform .13s ease-in-out,opacity .13s ease-in-out,visibility 0s linear .13s;transition:transform var(--mod-overlay-animation-duration,var(--spectrum-animation-duration-100,.13s))ease-in-out,opacity var(--mod-overlay-animation-duration,var(--spectrum-animation-duration-100,.13s))ease-in-out,visibility 0s linear var(--mod-overlay-animation-duration,var(--spectrum-animation-duration-100,.13s))}:host([open]){pointer-events:auto;visibility:visible;opacity:1;transition-delay:0s;transition-delay:var(--mod-overlay-animation-duration-opened,var(--spectrum-animation-duration-0,0s))}:host{--spectrum-popover-animation-distance:var(--spectrum-spacing-100);--spectrum-popover-background-color:var(--spectrum-background-layer-2-color);--spectrum-popover-border-color:var(--spectrum-gray-400);--spectrum-popover-content-area-spacing-vertical:var(--spectrum-popover-top-to-content-area);--spectrum-popover-shadow-horizontal:var(--spectrum-drop-shadow-x);--spectrum-popover-shadow-vertical:var(--spectrum-drop-shadow-y);--spectrum-popover-shadow-blur:var(--spectrum-drop-shadow-blur);--spectrum-popover-shadow-color:var(--spectrum-drop-shadow-color);--spectrum-popover-corner-radius:var(--spectrum-corner-radius-100);--spectrum-popover-pointer-width:var(--spectrum-popover-tip-width);--spectrum-popover-pointer-height:var(--spectrum-popover-tip-height);--spectrum-popover-pointer-edge-offset:calc(var(--spectrum-corner-radius-100) + var(--spectrum-popover-tip-width)/2);--spectrum-popover-pointer-edge-spacing:calc(var(--spectrum-popover-pointer-edge-offset) - var(--spectrum-popover-tip-width)/2)}@media (forced-colors:active){:host{--highcontrast-popover-border-color:CanvasText}}:host{--spectrum-popover-filter:drop-shadow(var(--mod-popover-shadow-horizontal,var(--spectrum-popover-shadow-horizontal))var(--mod-popover-shadow-vertical,var(--spectrum-popover-shadow-vertical))var(--mod-popover-shadow-blur,var(--spectrum-popover-shadow-blur))var(--mod-popover-shadow-color,var(--spectrum-popover-shadow-color)));box-sizing:border-box;padding:var(--mod-popover-content-area-spacing-vertical,var(--spectrum-popover-content-area-spacing-vertical))0;border-radius:var(--mod-popover-corner-radius,var(--spectrum-popover-corner-radius));border-style:solid;border-color:var(--highcontrast-popover-border-color,var(--mod-popover-border-color,var(--spectrum-popover-border-color)));border-width:var(--mod-popover-border-width,var(--spectrum-popover-border-width));background-color:var(--mod-popover-background-color,var(--spectrum-popover-background-color));filter:var(--mod-popover-filter,var(--spectrum-popover-filter));outline:none;flex-direction:column;display:inline-flex;position:absolute}:host([tip]){overflow:visible}:host([tip]) #tip .triangle{stroke-linecap:square;stroke-linejoin:miter;fill:var(--mod-popover-background-color,var(--spectrum-popover-background-color));stroke:var(--highcontrast-popover-border-color,var(--mod-popover-border-color,var(--spectrum-popover-border-color)));stroke-width:var(--mod-popover-border-width,var(--spectrum-popover-border-width))}*{--mod-popover-filter:none}:host([tip]) .spectrum-Popover--top-end,:host([tip]) .spectrum-Popover--top-left,:host([tip]) .spectrum-Popover--top-right,:host([tip]) .spectrum-Popover--top-start,:host([placement*=top][tip]){margin-block-end:calc(var(--mod-popover-pointer-height,var(--spectrum-popover-pointer-height)) - var(--mod-popover-border-width,var(--spectrum-popover-border-width)))}:host([open]) .spectrum-Popover--top-end,:host([open]) .spectrum-Popover--top-left,:host([open]) .spectrum-Popover--top-right,:host([open]) .spectrum-Popover--top-start,:host([placement*=top][open]){transform:translateY(calc(var(--mod-popover-animation-distance,var(--spectrum-popover-animation-distance))*-1))translateZ(0)}:host([tip]) .spectrum-Popover--bottom-end,:host([tip]) .spectrum-Popover--bottom-left,:host([tip]) .spectrum-Popover--bottom-right,:host([tip]) .spectrum-Popover--bottom-start,:host([placement*=bottom][tip]){margin-block-start:calc(var(--mod-popover-pointer-height,var(--spectrum-popover-pointer-height)) - var(--mod-popover-border-width,var(--spectrum-popover-border-width)))}:host([open]) .spectrum-Popover--bottom-end,:host([open]) .spectrum-Popover--bottom-left,:host([open]) .spectrum-Popover--bottom-right,:host([open]) .spectrum-Popover--bottom-start,:host([placement*=bottom][open]){transform:translateY(var(--mod-popover-animation-distance,var(--spectrum-popover-animation-distance)))translateZ(0)}:host([tip]) .spectrum-Popover--right-bottom,:host([tip]) .spectrum-Popover--right-top,:host([placement*=right][tip]){margin-left:calc(var(--mod-popover-pointer-width,var(--spectrum-popover-pointer-width)) - var(--mod-popover-border-width,var(--spectrum-popover-border-width)))}:host([open]) .spectrum-Popover--right-bottom,:host([open]) .spectrum-Popover--right-top,:host([placement*=right][open]){transform:translateX(var(--mod-popover-animation-distance,var(--spectrum-popover-animation-distance)))translateZ(0)}:host([tip]) .spectrum-Popover--left-bottom,:host([tip]) .spectrum-Popover--left-top,:host([placement*=left][tip]){margin-right:calc(var(--mod-popover-pointer-width,var(--spectrum-popover-pointer-width)) - var(--mod-popover-border-width,var(--spectrum-popover-border-width)))}:host([open]) .spectrum-Popover--left-bottom,:host([open]) .spectrum-Popover--left-top,:host([placement*=left][open]){transform:translateX(calc(var(--mod-popover-animation-distance,var(--spectrum-popover-animation-distance))*-1))translateZ(0)}:host([tip]) .spectrum-Popover--start-bottom,:host([tip]) .spectrum-Popover--start-top,:host([tip]) .spectrum-Popover--start{margin-inline-end:calc(var(--mod-popover-pointer-width,var(--spectrum-popover-pointer-width)) - var(--mod-popover-border-width,var(--spectrum-popover-border-width)))}:host([open]) .spectrum-Popover--start-bottom,:host([open]) .spectrum-Popover--start-top,:host([open]) .spectrum-Popover--start{transform:translateX(calc(var(--mod-popover-animation-distance,var(--spectrum-popover-animation-distance))*-1))translateZ(0)}:host([open]) .spectrum-Popover--start-bottom:dir(rtl),:host([open]) .spectrum-Popover--start-top:dir(rtl),:host([open]) .spectrum-Popover--start:dir(rtl),:host([dir=rtl][open]) .spectrum-Popover--start-bottom,:host([dir=rtl][open]) .spectrum-Popover--start-top,:host([dir=rtl][open]) .spectrum-Popover--start{transform:translateX(var(--mod-popover-animation-distance,var(--spectrum-popover-animation-distance)))translateZ(0)}:host([tip]) .spectrum-Popover--end-bottom,:host([tip]) .spectrum-Popover--end-top,:host([tip]) .spectrum-Popover--end{margin-inline-start:calc(var(--mod-popover-pointer-width,var(--spectrum-popover-pointer-width)) - var(--mod-popover-border-width,var(--spectrum-popover-border-width)))}:host([open]) .spectrum-Popover--end-bottom,:host([open]) .spectrum-Popover--end-top,:host([open]) .spectrum-Popover--end{transform:translateX(var(--mod-popover-animation-distance,var(--spectrum-popover-animation-distance)))translateZ(0)}:host([open]) .spectrum-Popover--end-bottom:dir(rtl),:host([open]) .spectrum-Popover--end-top:dir(rtl),:host([open]) .spectrum-Popover--end:dir(rtl),:host([dir=rtl][open]) .spectrum-Popover--end-bottom,:host([dir=rtl][open]) .spectrum-Popover--end-top,:host([dir=rtl][open]) .spectrum-Popover--end{transform:translateX(calc(var(--mod-popover-animation-distance,var(--spectrum-popover-animation-distance))*-1))translateZ(0)}:host([tip]) #tip,:host([tip][placement*=bottom]) #tip,:host([tip]) .spectrum-Popover--bottom-end #tip,:host([tip]) .spectrum-Popover--bottom-left #tip,:host([tip]) .spectrum-Popover--bottom-right #tip,:host([tip]) .spectrum-Popover--bottom-start #tip,:host([tip][placement*=top]) #tip,:host([tip]) .spectrum-Popover--top-end #tip,:host([tip]) .spectrum-Popover--top-left #tip,:host([tip]) .spectrum-Popover--top-right #tip,:host([tip]) .spectrum-Popover--top-start #tip{inline-size:var(--mod-popover-pointer-width,var(--spectrum-popover-pointer-width));block-size:var(--mod-popover-pointer-height,var(--spectrum-popover-pointer-height));margin:auto;position:absolute;inset-block-start:100%;inset-inline:0;transform:translate(0)}:host([tip]) .spectrum-Popover--top-left #tip{inset-inline:var(--mod-popover-pointer-edge-spacing,var(--spectrum-popover-pointer-edge-spacing))auto}:host([tip]) .spectrum-Popover--top-right #tip{inset-inline:auto var(--mod-popover-pointer-edge-spacing,var(--spectrum-popover-pointer-edge-spacing))}:host([tip]) .spectrum-Popover--top-start #tip{margin-inline-start:var(--mod-popover-pointer-edge-spacing,var(--spectrum-popover-pointer-edge-spacing))}:host([tip]) .spectrum-Popover--top-end #tip{margin-inline-end:var(--mod-popover-pointer-edge-spacing,var(--spectrum-popover-pointer-edge-spacing))}:host([tip][placement*=bottom]) #tip,:host([tip]) .spectrum-Popover--bottom-end #tip,:host([tip]) .spectrum-Popover--bottom-left #tip,:host([tip]) .spectrum-Popover--bottom-right #tip,:host([tip]) .spectrum-Popover--bottom-start #tip{inset-block:auto 100%;transform:scaleY(-1)}:host([tip]) .spectrum-Popover--bottom-left #tip{inset-inline:var(--mod-popover-pointer-edge-spacing,var(--spectrum-popover-pointer-edge-spacing))auto}:host([tip]) .spectrum-Popover--bottom-right #tip{inset-inline:auto var(--mod-popover-pointer-edge-spacing,var(--spectrum-popover-pointer-edge-spacing))}:host([tip]) .spectrum-Popover--bottom-start #tip{margin-inline-start:var(--mod-popover-pointer-edge-spacing,var(--spectrum-popover-pointer-edge-spacing))}:host([tip]) .spectrum-Popover--bottom-end #tip{margin-inline-end:var(--mod-popover-pointer-edge-spacing,var(--spectrum-popover-pointer-edge-spacing))}:host([tip]) .spectrum-Popover--end #tip,:host([tip]) .spectrum-Popover--end-bottom #tip,:host([tip]) .spectrum-Popover--end-top #tip,:host([tip][placement*=left]) #tip,:host([tip]) .spectrum-Popover--left-bottom #tip,:host([tip]) .spectrum-Popover--left-top #tip,:host([tip][placement*=right]) #tip,:host([tip]) .spectrum-Popover--right-bottom #tip,:host([tip]) .spectrum-Popover--right-top #tip,:host([tip]) .spectrum-Popover--start #tip,:host([tip]) .spectrum-Popover--start-bottom #tip,:host([tip]) .spectrum-Popover--start-top #tip{inline-size:var(--mod-popover-pointer-height,var(--spectrum-popover-pointer-height));block-size:var(--mod-popover-pointer-width,var(--spectrum-popover-pointer-width));inset-block:0}:host([tip][placement*=left]) #tip,:host([tip]) .spectrum-Popover--left-bottom #tip,:host([tip]) .spectrum-Popover--left-top #tip{left:100%;right:auto}:host([tip][placement*=right]) #tip,:host([tip]) .spectrum-Popover--right-bottom #tip,:host([tip]) .spectrum-Popover--right-top #tip{left:auto;right:100%;transform:scaleX(-1)}:host([tip]) .spectrum-Popover--end-top #tip,:host([tip]) .spectrum-Popover--left-top #tip,:host([tip]) .spectrum-Popover--right-top #tip,:host([tip]) .spectrum-Popover--start-top #tip{inset-block:var(--mod-popover-pointer-edge-spacing,var(--spectrum-popover-pointer-edge-spacing))auto}:host([tip]) .spectrum-Popover--end-bottom #tip,:host([tip]) .spectrum-Popover--left-bottom #tip,:host([tip]) .spectrum-Popover--right-bottom #tip,:host([tip]) .spectrum-Popover--start-bottom #tip{inset-block:auto var(--mod-popover-pointer-edge-spacing,var(--spectrum-popover-pointer-edge-spacing))}:host([tip]) .spectrum-Popover--start #tip,:host([tip]) .spectrum-Popover--start-bottom #tip,:host([tip]) .spectrum-Popover--start-top #tip{margin-inline-start:100%}:host([tip]) .spectrum-Popover--start #tip:dir(rtl),:host([tip]) .spectrum-Popover--start-bottom #tip:dir(rtl),:host([tip]) .spectrum-Popover--start-top #tip:dir(rtl),:host([dir=rtl][tip]) .spectrum-Popover--start #tip,:host([dir=rtl][tip]) .spectrum-Popover--start-bottom #tip,:host([dir=rtl][tip]) .spectrum-Popover--start-top #tip{transform:none}:host([tip]) .spectrum-Popover--end #tip,:host([tip]) .spectrum-Popover--end-bottom #tip,:host([tip]) .spectrum-Popover--end-top #tip{margin-inline-end:100%;transform:scaleX(-1)}:host([tip]) .spectrum-Popover--end #tip:dir(rtl),:host([tip]) .spectrum-Popover--end-bottom #tip:dir(rtl),:host([tip]) .spectrum-Popover--end-top #tip:dir(rtl),:host([dir=rtl][tip]) .spectrum-Popover--end #tip,:host([dir=rtl][tip]) .spectrum-Popover--end-bottom #tip,:host([dir=rtl][tip]) .spectrum-Popover--end-top #tip{transform:scaleX(1)}:host{--spectrum-popover-border-width:var(--system-popover-border-width)}:host{min-width:min-content;max-height:100%;max-width:100%;clip-path:none}::slotted(*){overscroll-behavior:contain}:host([placement*=left]) #tip[style],:host([placement*=right]) #tip[style]{inset-block-end:auto}:host([placement*=top]) #tip[style],:host([placement*=bottom]) #tip[style]{inset-inline-end:auto}.block,.inline{width:100%;height:100%;display:block}:host([placement*=left]) .block,:host([placement*=right]) .block,:host([placement*=top]) .inline,:host([placement*=bottom]) .inline{display:none}::slotted(.visually-hidden){clip:rect(0,0,0,0);clip-path:inset(50%);height:1px;width:1px;white-space:nowrap;border:0;margin:0 -1px -1px 0;padding:0;position:absolute;overflow:hidden}::slotted(sp-menu){margin:0}:host([dialog]){min-width:var(--mod-popover-dialog-min-width,var(--spectrum-popover-dialog-min-width,270px));padding:var(--mod-popover-dialog-padding,var(--spectrum-popover-dialog-padding,30px 29px))}:host([tip][placement]) #tip{height:auto}
`,__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__decorateClass=(decorators,target,key,kind)=>{for(var decorator,result=kind>1?void 0:kind?__getOwnPropDesc(target,key):target,i=decorators.length-1;i>=0;i--)(decorator=decorators[i])&&(result=(kind?decorator(target,key,result):decorator(result))||result);return kind&&result&&__defProp(target,key,result),result};class Popover extends index_dev.wG{constructor(){super(...arguments),this.open=!1,this.tip=!1}static get styles(){return[popover_css]}renderTip(){return index_dev.qy`
            <div id="tip" aria-hidden="true">
                <svg class="tip block" viewBox="0 -0.5 16 9">
                    <path class="triangle" d="M-1,-1 8,8 17,-1"></path>
                </svg>
                <svg class="tip inline" viewBox="0 -0.5 9 16">
                    <path class="triangle" d="M-1,-1 8,8 -1,17"></path>
                </svg>
            </div>
        `}render(){return index_dev.qy`
            <slot></slot>
            ${this.tip?this.renderTip():index_dev.s6}
        `}}__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],Popover.prototype,"open",2),__decorateClass([(0,decorators_dev.MZ)({reflect:!0})],Popover.prototype,"placement",2),__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],Popover.prototype,"tip",2),__decorateClass([(0,decorators_dev.P)("#tip")],Popover.prototype,"tipElement",2)}}]);
//# sourceMappingURL=menu-stories-menu-stories.440f5b6d.iframe.bundle.js.map