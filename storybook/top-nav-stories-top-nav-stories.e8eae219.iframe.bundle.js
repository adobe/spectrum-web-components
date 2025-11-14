"use strict";(self.webpackChunk_spectrum_web_components_1st_gen=self.webpackChunk_spectrum_web_components_1st_gen||[]).push([[430],{"./packages/action-menu/sp-action-menu.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js"),directives_dev=__webpack_require__("./tools/base/src/directives.dev.js"),Picker_dev=__webpack_require__("./packages/picker/src/Picker.dev.js"),observe_slot_presence_dev=(__webpack_require__("./packages/action-button/sp-action-button.dev.js"),__webpack_require__("./tools/shared/src/observe-slot-presence.dev.js")),observe_slot_text_dev=__webpack_require__("./tools/shared/src/observe-slot-text.dev.js");__webpack_require__("./packages/icons-workflow/icons/sp-icon-more.js");var action_menu_css=index_dev.AH`
    :host{display:inline-flex}:host([quiet]){min-width:0}:host>sp-menu{display:none}::slotted([slot=icon]),.icon{flex-shrink:0}#popover{max-width:none}:host([dir=ltr]) ::slotted([slot=icon]),:host([dir=ltr]) .icon{margin-left:calc(-1*(var(--spectrum-actionbutton-textonly-padding-left-adjusted) - var(--spectrum-actionbutton-padding-left-adjusted)))}:host([dir=rtl]) ::slotted([slot=icon]),:host([dir=rtl]) .icon{margin-right:calc(-1*(var(--spectrum-actionbutton-textonly-padding-left-adjusted) - var(--spectrum-actionbutton-padding-left-adjusted)))}:host([dir]) slot[icon-only]::slotted([slot=icon]),:host([dir]) slot[icon-only] .icon{margin-inline:calc((var(--custom-actionbutton-edge-to-text,var(--spectrum-actionbutton-edge-to-text)) - var(--custom-actionbutton-edge-to-visual-only,var(--spectrum-actionbutton-edge-to-visual-only)))*-1)}sp-overlay:not(:defined){display:none}
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
        `}update(changedProperties){changedProperties.has("invalid")&&(this.invalid=!1),super.update(changedProperties)}hasAccessibleLabel(){return!!this.label||!!this.getAttribute("aria-label")||!!this.getAttribute("aria-labelledby")||!!this.appliedLabel||this.hasLabel||this.labelOnly}warnNoLabel(){window.__swc.warn(this,`<${this.localName}> needs one of the following to be accessible:`,"https://opensource.adobe.com/spectrum-web-components/components/action-menu/#accessibility",{type:"accessibility",issues:[`an <sp-field-label> element with a \`for\` attribute referencing the \`id\` of the \`<${this.localName}>\`, or`,'value supplied to the "label" attribute, which will be displayed visually as placeholder text','text content supplied in a <span> with slot="label", or, text content supplied in a <span> with slot="label-only"',"which will also be displayed visually as placeholder text."]})}}__decorateClass([(0,decorators_dev.MZ)({type:String})],ActionMenu.prototype,"selects",2),__decorateClass([(0,decorators_dev.MZ)({reflect:!0,attribute:"static-color"})],ActionMenu.prototype,"staticColor",2),__decorateClass([(0,decorators_dev.wk)()],ActionMenu.prototype,"labelOnly",1),(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-action-menu",ActionMenu)},"./packages/avatar/sp-avatar.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js"),directives_dev=__webpack_require__("./tools/base/src/directives.dev.js"),like_anchor_dev=__webpack_require__("./tools/shared/src/like-anchor.dev.js"),focusable_dev=__webpack_require__("./tools/shared/src/focusable.dev.js");var avatar_css=index_dev.AH`
    :host{--spectrum-avatar-color-opacity:1;--spectrum-avatar-inline-size:var(--spectrum-avatar-size-100);--spectrum-avatar-block-size:var(--spectrum-avatar-size-100);--spectrum-avatar-border-radius:var(--spectrum-avatar-block-size);--spectrum-avatar-focus-indicator-thickness:var(--spectrum-focus-indicator-thickness);--spectrum-avatar-focus-indicator-gap:var(--spectrum-focus-indicator-gap);--spectrum-avatar-focus-indicator-color:var(--spectrum-focus-indicator-color);--spectrum-avatar-color-opacity-disabled:var(--spectrum-avatar-opacity-disabled)}:host([size="50"]){--spectrum-avatar-inline-size:var(--spectrum-avatar-size-50);--spectrum-avatar-block-size:var(--spectrum-avatar-size-50)}:host([size="75"]){--spectrum-avatar-inline-size:var(--spectrum-avatar-size-75);--spectrum-avatar-block-size:var(--spectrum-avatar-size-75)}:host([size="100"]){--spectrum-avatar-inline-size:var(--spectrum-avatar-size-100);--spectrum-avatar-block-size:var(--spectrum-avatar-size-100)}:host([size="200"]){--spectrum-avatar-inline-size:var(--spectrum-avatar-size-200);--spectrum-avatar-block-size:var(--spectrum-avatar-size-200)}:host([size="300"]){--spectrum-avatar-inline-size:var(--spectrum-avatar-size-300);--spectrum-avatar-block-size:var(--spectrum-avatar-size-300)}:host([size="400"]){--spectrum-avatar-inline-size:var(--spectrum-avatar-size-400);--spectrum-avatar-block-size:var(--spectrum-avatar-size-400)}:host([size="500"]){--spectrum-avatar-inline-size:var(--spectrum-avatar-size-500);--spectrum-avatar-block-size:var(--spectrum-avatar-size-500)}:host([size="600"]){--spectrum-avatar-inline-size:var(--spectrum-avatar-size-600);--spectrum-avatar-block-size:var(--spectrum-avatar-size-600)}:host([size="700"]){--spectrum-avatar-inline-size:var(--spectrum-avatar-size-700);--spectrum-avatar-block-size:var(--spectrum-avatar-size-700)}@media (forced-colors:active){:host{--highcontrast-avatar-focus-indicator-color:CanvasText}}:host{inline-size:var(--mod-avatar-inline-size,var(--spectrum-avatar-inline-size));block-size:var(--mod-avatar-block-size,var(--spectrum-avatar-block-size));border-radius:var(--mod-avatar-border-radius,var(--spectrum-avatar-border-radius));-webkit-user-drag:none;-webkit-user-select:none;user-select:none;opacity:var(--mod-avatar-color-opacity,var(--spectrum-avatar-color-opacity));border-width:0;outline:none;display:inline-block;position:relative;overflow:visible}:host([disabled]){opacity:var(--mod-avatar-color-opacity-disabled,var(--spectrum-avatar-color-opacity-disabled))}:host(:not([disabled])) .is-focused:after,:host(:not([disabled])) .link:focus-visible:after{pointer-events:none;content:"";inline-size:calc(var(--mod-avatar-inline-size,var(--spectrum-avatar-inline-size)) + var(--mod-avatar-focus-indicator-gap,var(--spectrum-avatar-focus-indicator-gap))*2);block-size:calc(var(--mod-avatar-inline-size,var(--spectrum-avatar-inline-size)) + var(--mod-avatar-focus-indicator-gap,var(--spectrum-avatar-focus-indicator-gap))*2);border-style:solid;border-width:var(--mod-avatar-focus-indicator-thickness,var(--spectrum-avatar-focus-indicator-thickness));border-color:var(--highcontrast-avatar-focus-indicator-color,var(--mod-avatar-focus-indicator-color,var(--spectrum-avatar-focus-indicator-color)));border-radius:var(--mod-avatar-border-radius,var(--spectrum-avatar-border-radius));position:absolute;inset-block-start:calc((var(--mod-avatar-focus-indicator-gap,var(--spectrum-avatar-focus-indicator-gap)) + var(--mod-avatar-focus-indicator-thickness,var(--spectrum-avatar-focus-indicator-thickness)))*-1);inset-inline-start:calc((var(--mod-avatar-focus-indicator-gap,var(--spectrum-avatar-focus-indicator-gap)) + var(--mod-avatar-focus-indicator-thickness,var(--spectrum-avatar-focus-indicator-thickness)))*-1)}.link{outline:0}.image{inline-size:var(--mod-avatar-inline-size,var(--spectrum-avatar-inline-size));block-size:var(--mod-avatar-block-size,var(--spectrum-avatar-block-size));border-radius:var(--mod-avatar-border-radius,var(--spectrum-avatar-border-radius))}img{vertical-align:top}
`,__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__decorateClass=(decorators,target,key,kind)=>{for(var decorator,result=kind>1?void 0:kind?__getOwnPropDesc(target,key):target,i=decorators.length-1;i>=0;i--)(decorator=decorators[i])&&(result=(kind?decorator(target,key,result):decorator(result))||result);return kind&&result&&__defProp(target,key,result),result};const validSizes=[50,75,100,200,300,400,500,600,700],defaultSize=validSizes[2];class Avatar extends((0,like_anchor_dev.$)(focusable_dev.z)){constructor(){super(...arguments),this.src="",this._size=defaultSize}static get styles(){return[avatar_css]}get focusElement(){return this.anchorElement||this}get size(){return this._size}set size(value){const size=value,validSize=validSizes.includes(size)?size:defaultSize;if(validSize&&this.setAttribute("size",`${validSize}`),this._size===validSize)return;const oldSize=this._size;this._size=validSize,this.requestUpdate("size",oldSize)}render(){const avatar=index_dev.qy`
            <img
                class="image"
                alt=${(0,directives_dev.JR)(this.label||void 0)}
                src=${this.src}
            />
        `;return this.href?this.renderAnchor({id:"link",className:"link",anchorContent:avatar}):avatar}firstUpdated(changes){super.firstUpdated(changes),this.hasAttribute("size")||this.setAttribute("size",`${this.size}`)}}__decorateClass([(0,decorators_dev.P)("#link")],Avatar.prototype,"anchorElement",2),__decorateClass([(0,decorators_dev.MZ)()],Avatar.prototype,"src",2),__decorateClass([(0,decorators_dev.MZ)({type:Number,reflect:!0})],Avatar.prototype,"size",1),(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-avatar",Avatar)},"./packages/divider/src/divider.css.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){const i=__webpack_require__("./tools/base/src/index.dev.js").AH`
    @media (forced-colors:active){:host{--highcontrast-divider-background-color:CanvasText}}:host{--spectrum-divider-thickness:var(--spectrum-divider-thickness-medium)}:host([size=s]){--spectrum-divider-thickness:var(--spectrum-divider-thickness-small)}:host([size=l]){--spectrum-divider-thickness:var(--spectrum-divider-thickness-large);--spectrum-divider-background-color:var(--spectrum-gray-800)}:host([static-color=white]){--mod-divider-background-color:var(--mod-divider-background-color-medium-static-white,var(--spectrum-divider-background-color-static-white))}:host([static-color=white][size=s]){--mod-divider-background-color:var(--mod-divider-background-color-small-static-white,var(--spectrum-divider-background-color-static-white))}:host([static-color=white][size=l]){--mod-divider-background-color:var(--mod-divider-background-color-large-static-white,var(--spectrum-transparent-white-800))}:host([static-color=black]){--mod-divider-background-color:var(--mod-divider-background-color-medium-static-black,var(--spectrum-divider-background-color-static-black))}:host([static-color=black][size=s]){--mod-divider-background-color:var(--mod-divider-background-color-small-static-black,var(--spectrum-divider-background-color-static-black))}:host([static-color=black][size=l]){--mod-divider-background-color:var(--mod-divider-background-color-large-static-black,var(--spectrum-transparent-black-800))}:host{block-size:var(--mod-divider-thickness,var(--spectrum-divider-thickness));border:none;border-width:var(--mod-divider-thickness,var(--spectrum-divider-thickness));border-radius:var(--mod-divider-thickness,var(--spectrum-divider-thickness));background-color:var(--highcontrast-divider-background-color,var(--mod-divider-background-color,var(--spectrum-divider-background-color)));inline-size:100%;overflow:visible}:host([vertical]){inline-size:var(--mod-divider-thickness,var(--spectrum-divider-thickness));block-size:100%;block-size:var(--mod-divider-vertical-height,100%);margin-block:var(--mod-divider-vertical-margin);align-self:var(--mod-divider-vertical-align)}:host{--spectrum-divider-background-color:var(--system-divider-background-color);--spectrum-divider-background-color-static-white:var(--system-divider-background-color-static-white);--spectrum-divider-background-color-static-black:var(--system-divider-background-color-static-black)}:host{display:block}hr{border:none;margin:0}
`;__webpack_exports__.A=i},"./packages/icon/sp-icon.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var _src_Icon_dev_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icon/src/Icon.dev.js");(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon",_src_Icon_dev_js__WEBPACK_IMPORTED_MODULE_0__.I)},"./packages/icons-workflow/icons/sp-icon-download.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-workflow/src/custom-tag.js"),Download=__webpack_require__("./packages/icons-workflow/src/icons-s2/Download.js"),SaveTo=__webpack_require__("./packages/icons-workflow/src/icons/SaveTo.js");class IconDownload extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),2===this.spectrumVersion?(0,Download.s)({hidden:!this.label,title:this.label}):(0,SaveTo._)({hidden:!this.label,title:this.label})}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon-download",IconDownload)},"./packages/icons-workflow/icons/sp-icon-link.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");var Link=__webpack_require__("./packages/icons-workflow/src/icons/Link.js");class IconLink extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),2===this.spectrumVersion?(({width:l=24,height:t=24,hidden:e=!1,title:r="Link"}={})=>custom_tag.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${l}"
    height="${t}"
    viewBox="0 0 20 20"
    aria-hidden=${e?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${r}"
  >
    <path
      d="m5.31348,18.74805c-1.04102,0-2.08105-.39648-2.87305-1.18848-1.58398-1.58398-1.58398-4.16211,0-5.74707l3.90527-3.90527c1.58496-1.58398,4.16211-1.58301,5.74707,0,.2168.21777.40723.45703.56641.70996.2207.35059.11523.81348-.23535,1.03418-.35254.22168-.81348.11426-1.03418-.23535-.10059-.16016-.22168-.31152-.35938-.44922-.99902-.99902-2.625-.99805-3.62402.00098l-3.90527,3.90527c-.99902,1-.99902,2.62695,0,3.62598,1.00098,1.00098,2.62695.99707,3.62598,0l1.95215-1.95215c.29297-.29297.76758-.29297,1.06055,0s.29297.76758,0,1.06055l-1.95215,1.95215c-.79199.79199-1.83301,1.1875-2.87402,1.18848Zm8.34082-6.65527l3.90527-3.90527c1.58398-1.58496,1.58398-4.16309,0-5.74707s-4.16309-1.58398-5.74707,0l-1.95215,1.95215c-.29297.29297-.29297.76758,0,1.06055s.76758.29297,1.06055,0l1.95215-1.95215c.99902-.99805,2.625-1,3.62598,0,.99902.99902.99902,2.62598,0,3.62598l-3.90527,3.90527c-.99902.99902-2.625,1-3.62402.00098-.1377-.1377-.25879-.28906-.35938-.44922-.2207-.34961-.68164-.45703-1.03418-.23535-.35059.2207-.45605.68359-.23535,1.03418.15918.25293.34961.49219.56641.70996.79297.79199,1.83301,1.18848,2.87402,1.18848,1.04004,0,2.08105-.39648,2.87305-1.18848Z"
      fill="currentColor"
    />
  </svg>`)({hidden:!this.label,title:this.label}):(0,Link.q)({hidden:!this.label,title:this.label})}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon-link",IconLink)},"./packages/icons-workflow/icons/sp-icon-more.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");var More=__webpack_require__("./packages/icons-workflow/src/icons/More.js");class IconMore extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),2===this.spectrumVersion?(({width:r=24,height:l=24,hidden:e=!1,title:c="More"}={})=>custom_tag.T`<svg
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
  </svg>`)({hidden:!this.label,title:this.label}):(0,More.Z)({hidden:!this.label,title:this.label})}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon-more",IconMore)},"./packages/icons-workflow/icons/sp-icon-search.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-workflow/src/custom-tag.js"),Search=__webpack_require__("./packages/icons-workflow/src/icons-s2/Search.js"),Magnify=__webpack_require__("./packages/icons-workflow/src/icons/Magnify.js");class IconSearch extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),2===this.spectrumVersion?(0,Search.W)({hidden:!this.label,title:this.label}):(0,Magnify.j)({hidden:!this.label,title:this.label})}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon-search",IconSearch)},"./packages/icons-workflow/icons/sp-icon-settings.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");var Settings=__webpack_require__("./packages/icons-workflow/src/icons/Settings.js");class IconSettings extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),2===this.spectrumVersion?(({width:l=24,height:c=24,hidden:t=!1,title:e="Settings"}={})=>custom_tag.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${l}"
    height="${c}"
    viewBox="0 0 20 20"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${e}"
  >
    <path
      d="M10.00391,12.58887c-.88818,0-1.75293-.45996-2.22803-1.2832h0c-.70801-1.22754-.28613-2.80078.93994-3.50879.59326-.34375,1.28516-.43359,1.94922-.25684.6626.17773,1.21631.60352,1.55908,1.19727.34326.59375.43408,1.28613.25684,1.94824-.17773.66309-.60254,1.2168-1.19678,1.55957-.40332.2334-.84473.34375-1.28027.34375ZM9.07471,10.55566c.29443.50879.94824.68359,1.45947.39062.24707-.14258.42383-.37305.49756-.64844s.03613-.56348-.10645-.81055c-.14307-.24707-.37305-.42383-.64893-.49805-.2749-.07324-.56299-.03516-.81055.10645-.51025.29492-.68555.94922-.39111,1.45996h0Z"
      fill="currentColor"
    />
    <path
      d="M6.90674,18.31836c-.33936,0-.68213-.08496-.99219-.26465l-.81982-.47266c-.89307-.51367-1.25-1.64941-.81104-2.58301l.58008-1.2334c-.26514-.36328-.48975-.75098-.67188-1.16113l-1.35693-.1123c-1.02881-.08496-1.83447-.95996-1.83447-1.99121l-.00098-.94629c0-1.0332.80518-1.90918,1.8335-1.99414l1.35449-.11426c.0918-.20898.19238-.40918.30176-.59961.10986-.19141.2334-.37891.36914-.56445l-.58057-1.22949c-.44092-.93262-.08643-2.06836.80713-2.58496l.82031-.47363c.89258-.5166,2.05371-.25879,2.64258.58984l.77734,1.11816c.44385-.0498.89209-.04785,1.34082,0l.77539-1.11914c.58887-.84961,1.75098-1.10938,2.64355-.59375l.81982.47266c.89404.51562,1.24951,1.65137.81055,2.58398l-.58008,1.23242c.26562.36426.49023.75195.67188,1.16113l1.35693.1123c1.02832.08496,1.83398.95996,1.83496,1.99121l.00049.94727c.00098,1.03125-.80371,1.90723-1.83203,1.99414l-1.35547.11426c-.09131.20898-.19189.4082-.30273.59961h0c-.10938.18945-.23242.37793-.36816.56348l.58057,1.22949c.44043.93164.08643,2.06738-.80664,2.58496l-.8208.47461c-.89355.51855-2.05371.25781-2.64258-.59082l-.77734-1.11816c-.4458.04883-.89404.04785-1.34082.00098l-.77637,1.12012c-.38379.55371-1.01172.85645-1.65039.85645ZM6.9043,3.22461c-.08496,0-.17041.02148-.24805.06641l-.8208.47461c-.22266.12891-.31152.41211-.20117.64551l.77881,1.65039c.12598.2666.08398.58203-.10742.80664-.2041.23926-.37305.47656-.5166.72559-.14111.24609-.26514.51855-.36816.80957-.09814.27832-.3501.47266-.64404.49707l-1.81885.15332c-.26172.02246-.4585.23633-.4585.49902l.00098.94629c0,.25781.20117.47656.4585.49805l1.81934.15039c.29395.02441.54639.21875.64502.49707.19873.56055.49707,1.07617.88672,1.53223.19189.22363.23438.54004.10889.80664l-.77783,1.65234c-.10938.2334-.021.51758.20264.64551l.82031.47363c.22412.12988.51416.06348.66016-.14746l1.04102-1.50195c.16748-.24219.45898-.36914.75244-.30957.58838.10742,1.18457.1084,1.77002-.00098.28955-.05469.58496.06641.75342.30957l1.04199,1.49902c.14648.20996.43848.27637.66064.14746l.82031-.47363c.22607-.13086.31348-.40918.20117-.64648l-.77881-1.65039c-.12598-.2666-.08398-.58203.10742-.80664.2041-.24023.37305-.47656.51562-.72461l.00049-.00098c.14258-.24707.26318-.51172.36865-.80957.09863-.27832.35059-.47266.64453-.49707l1.81885-.15234c.25635-.02246.45752-.24121.45752-.49902l-.00049-.94727c0-.26172-.19727-.47559-.45898-.49805l-1.81885-.15039c-.29395-.02441-.54639-.21875-.64502-.49707-.19775-.55957-.49658-1.0752-.88721-1.53223-.19141-.22461-.23389-.54004-.1084-.80664l.77734-1.65234c.10986-.2334.021-.51758-.20264-.64648l-.81982-.47266c-.22461-.12695-.51416-.06152-.66113.14941l-1.03955,1.5c-.16797.24316-.45898.36816-.75293.31055-.59131-.10938-1.1875-.10938-1.77002,0-.29199.05176-.58545-.06738-.75342-.30957l-1.04199-1.49902c-.09619-.1377-.25293-.21387-.41211-.21387Z"
      fill="currentColor"
    />
  </svg>`)({hidden:!this.label,title:this.label}):(0,Settings.Z)({hidden:!this.label,title:this.label})}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon-settings",IconSettings)},"./packages/icons-workflow/src/icons-s2/Download.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{s:function(){return DownloadIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const DownloadIcon=({width:l=24,height:t=24,hidden:e=!1,title:r="Download"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${l}"
    height="${t}"
    viewBox="0 0 20 20"
    aria-hidden=${e?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${r}"
  >
    <path
      d="m13.53027,9.42676c-.29199-.29199-.7666-.29395-1.06055,0l-1.7168,1.71411V2.75c0-.41406-.33594-.75-.75-.75s-.75.33594-.75.75v8.39941l-1.72266-1.72266c-.29297-.29297-.76758-.29297-1.06055,0s-.29297.76758,0,1.06055l2.99805,2.99805c.14648.14648.33789.21973.53027.21973.19141,0,.38379-.07324.53027-.21973l3.00195-2.99805c.29297-.29199.29297-.76758,0-1.06055Z"
      fill="currentColor"
    />
    <path
      d="m15.75,18H4.25c-1.24023,0-2.25-1.00977-2.25-2.25v-2.02148c0-.41406.33594-.75.75-.75s.75.33594.75.75v2.02148c0,.41309.33691.75.75.75h11.5c.41309,0,.75-.33691.75-.75v-2.02148c0-.41406.33594-.75.75-.75s.75.33594.75.75v2.02148c0,1.24023-1.00977,2.25-2.25,2.25Z"
      fill="currentColor"
    />
  </svg>`},"./packages/icons-workflow/src/icons-s2/Search.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{W:function(){return SearchIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const SearchIcon=({width:e=24,height:t=24,hidden:r=!1,title:l="Search"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${e}"
    height="${t}"
    viewBox="0 0 20 20"
    aria-hidden=${r?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${l}"
  >
    <path
      d="m18.53027,17.46973l-5.08325-5.08325c.96936-1.20142,1.55298-2.72644,1.55298-4.38647,0-3.85938-3.14062-7-7-7S1,4.14062,1,8s3.14062,7,7,7c1.66003,0,3.18506-.58362,4.38647-1.55298l5.08325,5.08325c.14648.14648.33789.21973.53027.21973s.38379-.07324.53027-.21973c.29297-.29297.29297-.76758,0-1.06055Zm-10.53027-3.96973c-3.03223,0-5.5-2.46777-5.5-5.5s2.46777-5.5,5.5-5.5,5.5,2.46777,5.5,5.5-2.46777,5.5-5.5,5.5Z"
      fill="currentColor"
    />
  </svg>`},"./packages/icons-workflow/src/icons/Link.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{q:function(){return LinkIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const LinkIcon=({width:a=24,height:t=24,hidden:e=!1,title:l="Link"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    height="${t}"
    viewBox="0 0 36 36"
    width="${a}"
    aria-hidden=${e?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${l}"
  >
    <path
      d="M31.7 4.3a7.176 7.176 0 0 0-10.148 0c-.385.386-4.264 4.222-5.351 5.309a8.307 8.307 0 0 1 3.743.607c.519-.52 3.568-3.526 3.783-3.741a4.1 4.1 0 0 1 5.8 5.8l-7.119 7.115a4.617 4.617 0 0 1-3.372 1.3 3.953 3.953 0 0 1-2.7-1.109 4.154 4.154 0 0 1-1.241-1.626 2.067 2.067 0 0 0-.428.318l-1.635 1.712a7.144 7.144 0 0 0 1.226 1.673c2.8 2.8 7.875 2.364 10.677-.438l6.765-6.768a7.174 7.174 0 0 0 0-10.152Z"
    />
    <path
      d="M15.926 25.824c-.52.52-3.5 3.547-3.713 3.762a4.1 4.1 0 1 1-5.8-5.8L13.6 16.6a4.58 4.58 0 0 1 3.366-1.292 4.2 4.2 0 0 1 3.784 2.782 2.067 2.067 0 0 0 .428-.318l1.734-1.721a7.165 7.165 0 0 0-1.226-1.673 7.311 7.311 0 0 0-10.26.048l-7.187 7.186a7.176 7.176 0 0 0 10.148 10.149c.386-.386 4.194-4.243 5.281-5.33a8.3 8.3 0 0 1-3.742-.607Z"
    />
  </svg>`},"./packages/icons-workflow/src/icons/Magnify.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{j:function(){return MagnifyIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const MagnifyIcon=({width:t=24,height:e=24,hidden:a=!1,title:l="Magnify"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    height="${e}"
    viewBox="0 0 36 36"
    width="${t}"
    aria-hidden=${a?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${l}"
  >
    <path
      d="M33.173 30.215 25.4 22.443a12.826 12.826 0 1 0-2.957 2.957l7.772 7.772a2.1 2.1 0 0 0 2.958-2.958ZM6 15a9 9 0 1 1 9 9 9 9 0 0 1-9-9Z"
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
  </svg>`},"./packages/icons-workflow/src/icons/SaveTo.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{_:function(){return SaveToIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const SaveToIcon=({width:a=24,height:e=24,hidden:t=!1,title:l="Save To"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    height="${e}"
    viewBox="0 0 36 36"
    width="${a}"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${l}"
  >
    <path
      d="M33 10h-6a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h3v16H6V14h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v22a1 1 0 0 0 1 1h30a1 1 0 0 0 1-1V11a1 1 0 0 0-1-1Z"
    />
    <path
      d="m10.2 17.331 7.445 7.525a.5.5 0 0 0 .7 0l7.455-7.525a.782.782 0 0 0 .2-.526.8.8 0 0 0-.8-.8H20V3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v13h-5.2a.8.8 0 0 0-.8.8.782.782 0 0 0 .2.531Z"
    />
  </svg>`},"./packages/icons-workflow/src/icons/Settings.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Z:function(){return SettingsIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const SettingsIcon=({width:a=24,height:l=24,hidden:t=!1,title:e="Settings"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    height="${l}"
    viewBox="0 0 36 36"
    width="${a}"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${e}"
  >
    <path
      d="M32.9 15.793h-3.111a11.953 11.953 0 0 0-1.842-4.507l2.205-2.206a1.1 1.1 0 0 0 0-1.56l-1.673-1.672a1.1 1.1 0 0 0-1.56 0l-2.205 2.205a11.925 11.925 0 0 0-4.507-1.841V3.1A1.1 1.1 0 0 0 19.1 2h-2.2a1.1 1.1 0 0 0-1.1 1.1v3.112a11.925 11.925 0 0 0-4.507 1.841l-2.2-2.205a1.1 1.1 0 0 0-1.56 0L5.848 7.52a1.1 1.1 0 0 0 0 1.56l2.205 2.206a11.953 11.953 0 0 0-1.842 4.507H3.1A1.1 1.1 0 0 0 2 16.9v2.2a1.1 1.1 0 0 0 1.1 1.1h3.111a11.934 11.934 0 0 0 1.842 4.507l-2.205 2.212a1.1 1.1 0 0 0 0 1.56l1.673 1.673a1.1 1.1 0 0 0 1.56 0l2.205-2.205a11.925 11.925 0 0 0 4.507 1.841V32.9A1.1 1.1 0 0 0 16.9 34h2.2a1.1 1.1 0 0 0 1.1-1.1v-3.112a11.925 11.925 0 0 0 4.507-1.841l2.205 2.205a1.1 1.1 0 0 0 1.56 0l1.673-1.673a1.1 1.1 0 0 0 0-1.56l-2.205-2.205a11.934 11.934 0 0 0 1.842-4.507H32.9A1.1 1.1 0 0 0 34 19.1v-2.2a1.1 1.1 0 0 0-1.1-1.107ZM22.414 18A4.414 4.414 0 1 1 18 13.586 4.414 4.414 0 0 1 22.414 18Z"
    />
  </svg>`},"./packages/menu/sp-menu-divider.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js");var menu_divider_css=index_dev.AH`
    :host{--spectrum-menu-divider-thickness:var(--spectrum-divider-thickness-medium);inline-size:auto;margin-block:var(--mod-menu-section-divider-margin-block,max(0px,(var(--spectrum-menu-item-section-divider-height) - var(--spectrum-menu-divider-thickness))/2));margin-inline:var(--mod-menu-item-label-inline-edge-to-content,var(--spectrum-menu-item-label-inline-edge-to-content));overflow:visible}.spectrum-Menu-back:focus-visible{box-shadow:var(--spectrum-menu-item-focus-indicator-shadow)var(--spectrum-menu-item-focus-indicator-border-width)0 0 0 var(--spectrum-menu-item-focus-indicator-color-default);outline:var(--spectrum-menu-item-focus-indicator-width)var(--spectrum-menu-item-focus-indicator-outline-style)var(--spectrum-menu-item-focus-indicator-color-default);outline-offset:var(--spectrum-menu-item-focus-indicator-offset);border-radius:var(--spectrum-menu-item-corner-radius)}.spectrum-Menu-back{padding-inline:var(--mod-menu-back-padding-inline-start,0)var(--mod-menu-back-padding-inline-end,var(--spectrum-menu-item-label-inline-edge-to-content));padding-block:var(--mod-menu-back-padding-block-start,0)var(--mod-menu-back-padding-block-end,0);flex-flow:wrap;align-items:center;display:flex}.spectrum-Menu-backButton{cursor:pointer;background:0 0;border:0;margin:0;padding:0;display:inline-flex}.spectrum-Menu-backButton:focus-visible{outline:var(--spectrum-focus-indicator-thickness)solid var(--spectrum-focus-indicator-color);outline-offset:calc((var(--spectrum-focus-indicator-thickness) + 1px)*-1)}.spectrum-Menu-backHeading{color:var(--highcontrast-menu-item-color-default,var(--mod-menu-back-heading-color,var(--spectrum-menu-section-header-color)));font-size:var(--mod-menu-section-header-font-size,var(--spectrum-menu-section-header-font-size));font-weight:var(--mod-menu-section-header-font-weight,var(--spectrum-menu-section-header-font-weight));line-height:var(--mod-menu-section-header-line-height,var(--spectrum-menu-section-header-line-height));display:block}:host{flex-shrink:0;display:block}
`,divider_css=__webpack_require__("./packages/divider/src/divider.css.js");class MenuDivider extends((0,index_dev.ZG)(index_dev.wG,{validSizes:["s","m","l"]})){static get styles(){return[divider_css.A,menu_divider_css]}firstUpdated(changed){super.firstUpdated(changed),this.setAttribute("role","separator")}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-menu-divider",MenuDivider)},"./packages/top-nav/sp-top-nav-item.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),directives_dev=__webpack_require__("./tools/base/src/directives.dev.js"),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js"),src_index_dev=__webpack_require__("./tools/shared/src/index.dev.js"),tab_css=__webpack_require__("./packages/tabs/src/tab.css.js");var top_nav_item_css=index_dev.AH`
    a{color:inherit}a:focus,a:focus-visible{outline:none}:host a:before{block-size:calc(100% - var(--mod-tabs-top-to-text,var(--spectrum-tabs-top-to-text)));border:var(--mod-tabs-focus-indicator-width,var(--spectrum-tabs-focus-indicator-width))solid transparent;border-radius:var(--mod-tabs-focus-indicator-border-radius,var(--spectrum-tabs-focus-indicator-border-radius));box-sizing:border-box;content:"";inline-size:calc(100% + var(--mod-tabs-focus-indicator-gap,var(--spectrum-tabs-focus-indicator-gap))*2);inset-block-start:calc(var(--mod-tabs-top-to-text,var(--spectrum-tabs-top-to-text))/2);inset-inline:calc(var(--mod-tabs-focus-indicator-gap,var(--spectrum-tabs-focus-indicator-gap))*-1);pointer-events:none;position:absolute}:host a.focus-visible,:host a:focus-visible{color:var(--highcontrast-tabs-color-key-focus,var(--mod-tabs-color-key-focus,var(--spectrum-tabs-color-key-focus)))}:host a.focus-visible:before,:host a:focus-visible:before{border-color:var(--highcontrast-tabs-focus-indicator-color,var(--mod-tabs-focus-indicator-color,var(--spectrum-tabs-focus-indicator-color)))}#item-label{padding-block:var(--mod-tabs-top-to-text,var(--spectrum-tabs-top-to-text))var(--mod-tabs-bottom-to-text,var(--spectrum-tabs-bottom-to-text));margin-block:0}slot{pointer-events:none}
`,__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__decorateClass=(decorators,target,key,kind)=>{for(var decorator,result=kind>1?void 0:kind?__getOwnPropDesc(target,key):target,i=decorators.length-1;i>=0;i--)(decorator=decorators[i])&&(result=(kind?decorator(target,key,result):decorator(result))||result);return kind&&result&&__defProp(target,key,result),result};class TopNavItem extends((0,src_index_dev.$i)(src_index_dev.zo)){constructor(){super(...arguments),this.selected=!1,this.value=""}static get styles(){return[tab_css.A,top_nav_item_css]}get focusElement(){return this.anchor}click(){this.anchor.click()}render(){return index_dev.qy`
            <a
                id="item-label"
                href=${(0,directives_dev.JR)(this.href)}
                download=${(0,directives_dev.JR)(this.download)}
                target=${(0,directives_dev.JR)(this.target)}
                aria-label=${(0,directives_dev.JR)(this.label)}
                aria-current=${(0,directives_dev.JR)(this.selected&&this.href?"page":void 0)}
                rel=${(0,directives_dev.JR)(this.rel)}
            >
                <slot></slot>
            </a>
        `}updated(changes){super.updated(changes),this.value=this.anchor.href}}__decorateClass([(0,decorators_dev.P)("a")],TopNavItem.prototype,"anchor",2),__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],TopNavItem.prototype,"selected",2),(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-top-nav-item",TopNavItem)},"./packages/top-nav/sp-top-nav.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js"),directives_dev=__webpack_require__("./tools/base/src/directives.dev.js"),resize_controller=__webpack_require__("../node_modules/@lit-labs/observers/development/resize-controller.js"),tabs_sizes_css=__webpack_require__("./packages/tabs/src/tabs-sizes.css.js"),tabs_css=__webpack_require__("./packages/tabs/src/tabs.css.js"),Tabs_dev=__webpack_require__("./packages/tabs/src/Tabs.dev.js"),__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__decorateClass=(decorators,target,key,kind)=>{for(var decorator,result=kind>1?void 0:kind?__getOwnPropDesc(target,key):target,i=decorators.length-1;i>=0;i--)(decorator=decorators[i])&&(result=(kind?decorator(target,key,result):decorator(result))||result);return kind&&result&&__defProp(target,key,result),result};class TopNav extends((0,index_dev.ZG)(index_dev.wG)){constructor(){super(...arguments),this.label="",this.ignoreURLParts="",this.selectionIndicatorStyle="transform: translateX(0px) scaleX(0) scaleY(0)",this.shouldAnimate=!1,this.quiet=!1,this.onClick=event=>{const target=event.target;this.shouldAnimate=!0,this.selectTarget(target)},this._items=[],this.resizeController=new resize_controller.P(this,{callback:()=>{this.updateSelectionIndicator()}}),this.updateSelectionIndicator=async()=>{const selectedItem=this.items.find(item=>item.value===this.selected||item.value===window.location.href);if(!selectedItem)return void(this.selectionIndicatorStyle="transform: translateX(0px) scaleX(0) scaleY(0)");await Promise.all([selectedItem.updateComplete,document.fonts?document.fonts.ready:Promise.resolve()]);const{width:width}=selectedItem.getBoundingClientRect();this.selectionIndicatorStyle=Tabs_dev.KW.transformX(selectedItem.offsetLeft,width)}}static get styles(){return[tabs_sizes_css.A,tabs_css.A,Tabs_dev.KW.baseStyles()]}set selected(value){const oldValue=this.selected;value!==oldValue&&(this.updateCheckedState(value),this._selected=value,this.requestUpdate("selected",oldValue))}get selected(){return this._selected}get items(){return this._items}set items(items){items!==this.items&&(this._items.forEach(item=>{this.resizeController.unobserve(item)}),items.forEach(item=>{this.resizeController.observe(item)}),this._items=items)}manageItems(){this.items=this.slotEl.assignedElements({flatten:!0}).filter(el=>"sp-top-nav-item"===el.localName);let{href:href}=window.location;const ignoredURLParts=this.ignoreURLParts.split(" ");ignoredURLParts.includes("hash")&&(href=href.replace(window.location.hash,"")),ignoredURLParts.includes("search")&&(href=href.replace(window.location.search,""));const selectedChild=this.items.find(item=>item.value===href);selectedChild?this.selectTarget(selectedChild):this.selected=""}render(){return index_dev.qy`
            <div @click=${this.onClick} id="list">
                <slot @slotchange=${this.onSlotChange}></slot>
                <div
                    id="selection-indicator"
                    class=${(0,directives_dev.JR)(this.shouldAnimate?void 0:"first-position")}
                    style=${this.selectionIndicatorStyle}
                ></div>
            </div>
        `}firstUpdated(changes){super.firstUpdated(changes),this.setAttribute("direction","horizontal"),this.setAttribute("role","navigation")}updated(changes){super.updated(changes),changes.has("dir")&&this.updateSelectionIndicator(),this.shouldAnimate||void 0===changes.get("shouldAnimate")||(this.shouldAnimate=!0),changes.has("label")&&(this.label||void 0!==changes.get("label"))&&(this.label.length?this.setAttribute("aria-label",this.label):this.removeAttribute("aria-label"))}selectTarget(target){const{value:value}=target;value&&(this.selected=value)}onSlotChange(){this.manageItems()}updateCheckedState(value){this.items.forEach(item=>{item.selected=!1}),requestAnimationFrame(()=>{if(value&&value.length){const currentItem=this.items.find(item=>item.value===value||item.value===window.location.href);currentItem?currentItem.selected=!0:this.selected=""}this.updateSelectionIndicator()})}connectedCallback(){super.connectedCallback(),window.addEventListener("resize",this.updateSelectionIndicator),"fonts"in document&&document.fonts.addEventListener("loadingdone",this.updateSelectionIndicator)}disconnectedCallback(){window.removeEventListener("resize",this.updateSelectionIndicator),"fonts"in document&&document.fonts.removeEventListener("loadingdone",this.updateSelectionIndicator),super.disconnectedCallback()}}__decorateClass([(0,decorators_dev.MZ)({reflect:!0})],TopNav.prototype,"dir",2),__decorateClass([(0,decorators_dev.MZ)({type:String})],TopNav.prototype,"label",2),__decorateClass([(0,decorators_dev.MZ)({attribute:"ignore-url-parts"})],TopNav.prototype,"ignoreURLParts",2),__decorateClass([(0,decorators_dev.MZ)()],TopNav.prototype,"selectionIndicatorStyle",2),__decorateClass([(0,decorators_dev.MZ)({attribute:!1})],TopNav.prototype,"shouldAnimate",2),__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],TopNav.prototype,"quiet",2),__decorateClass([(0,decorators_dev.MZ)({reflect:!0})],TopNav.prototype,"selected",1),__decorateClass([(0,decorators_dev.P)("slot")],TopNav.prototype,"slotEl",2),(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-top-nav",TopNav)},"./packages/top-nav/stories/top-nav.stories.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:function(){return Default},Modes:function(){return Modes},Selected:function(){return Selected},__namedExportsOrder:function(){return __namedExportsOrder},autofocus:function(){return autofocus},default:function(){return top_nav_stories}});var index_dev=__webpack_require__("./tools/base/src/index.dev.js");__webpack_require__("./packages/top-nav/sp-top-nav.dev.js"),__webpack_require__("./packages/top-nav/sp-top-nav-item.dev.js"),__webpack_require__("./packages/icon/sp-icon.dev.js"),__webpack_require__("./packages/action-menu/sp-action-menu.dev.js"),__webpack_require__("./packages/menu/sp-menu.dev.js"),__webpack_require__("./packages/menu/sp-menu-item.dev.js"),__webpack_require__("./packages/menu/sp-menu-divider.dev.js"),__webpack_require__("./packages/action-group/sp-action-group.dev.js"),__webpack_require__("./packages/action-button/sp-action-button.dev.js"),__webpack_require__("./packages/avatar/sp-avatar.dev.js"),__webpack_require__("./packages/icons-workflow/icons/sp-icon-settings.js"),__webpack_require__("./packages/icons-workflow/icons/sp-icon-download.js"),__webpack_require__("./packages/icons-workflow/icons/sp-icon-link.js"),__webpack_require__("./packages/icons-workflow/icons/sp-icon-search.js");var top_nav_stories={title:"Top Nav",component:"sp-top-nav"};const Default=()=>index_dev.qy`
        <sp-top-nav>
            <sp-top-nav-item href="#">Site Name</sp-top-nav-item>
            <sp-top-nav-item href="#page-1" style="margin-inline-start: auto;">
                Page 1
            </sp-top-nav-item>
            <sp-top-nav-item href="#page-2">Page 2</sp-top-nav-item>
            <sp-top-nav-item href="#page-3">Page 3</sp-top-nav-item>
            <sp-top-nav-item href="#page-4">
                Page with Really Long Name
            </sp-top-nav-item>
            <sp-action-menu
                label="Account"
                style="margin-inline-start: auto;"
                quiet
            >
                <sp-icon-settings slot="icon"></sp-icon-settings>
                <sp-menu-item>Account Settings</sp-menu-item>
                <sp-menu-item>My Profile</sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item>Share</sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item>Help</sp-menu-item>
                <sp-menu-item>Sign Out</sp-menu-item>
            </sp-action-menu>
        </sp-top-nav>
    `,Selected=()=>{let{href:href}=location;return href=href.replace(location.search,""),index_dev.qy`
        <sp-top-nav ignore-url-parts="search">
            <sp-top-nav-item href="#">Site Name</sp-top-nav-item>
            <sp-top-nav-item href="#page-1" style="margin-inline-start: auto;">
                Page 1
            </sp-top-nav-item>
            <sp-top-nav-item href="#page-2">Page 2</sp-top-nav-item>
            <sp-top-nav-item href=${href} class="selected">
                Page 3
            </sp-top-nav-item>
            <sp-top-nav-item href="#page-4">
                Page with Really Long Name
            </sp-top-nav-item>
            <sp-action-menu
                label="Account"
                style="margin-inline-start: auto;"
                quiet
            >
                <sp-icon-settings slot="icon"></sp-icon-settings>
                <sp-menu-item>Account Settings</sp-menu-item>
                <sp-menu-item>My Profile</sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item>Share</sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item>Help</sp-menu-item>
                <sp-menu-item>Sign Out</sp-menu-item>
            </sp-action-menu>
        </sp-top-nav>
    `};class WrappedTopNav extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML='\n            <sp-top-nav>\n                <sp-top-nav-item href="#">Site Name</sp-top-nav-item>\n                <sp-top-nav-item href="#page-1" style="margin-inline-start: auto;">\n                    Page 1\n                </sp-top-nav-item>\n                <sp-top-nav-item href="#page-2">Page 2</sp-top-nav-item>\n                <sp-top-nav-item href="#page-3">Page 3</sp-top-nav-item>\n                <sp-top-nav-item href="#page-4" autofocus>\n                    Page with Really Long Name\n                </sp-top-nav-item>\n                <sp-action-menu label="Account" style="margin-inline-start: auto;" quiet>\n                    <sp-icon-settings slot="icon"></sp-icon-settings>\n                    <sp-menu-item>Account Settings</sp-menu-item>\n                    <sp-menu-item>My Profile</sp-menu-item>\n                    <sp-menu-divider></sp-menu-divider>\n                    <sp-menu-item>Share</sp-menu-item>\n                    <sp-menu-divider></sp-menu-divider>\n                    <sp-menu-item>Help</sp-menu-item>\n                    <sp-menu-item>Sign Out</sp-menu-item>\n                </sp-action-menu>\n            </sp-top-nav>\n        '}}customElements.define("wrapped-top-nav",WrappedTopNav);const autofocus=()=>index_dev.qy`
        <wrapped-top-nav></wrapped-top-nav>
    `,Modes=()=>index_dev.qy`
        <sp-top-nav>
            <sp-action-button quiet href="/marketing-page" label="App">
                <sp-icon slot="icon" src=${"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxMy4wLjIsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDE0OTQ4KSAgLS0+DQo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMC8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9UUi8yMDAxL1JFQy1TVkctMjAwMTA5MDQvRFREL3N2ZzEwLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMCIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iNjRweCIgaGVpZ2h0PSI2NHB4IiB2aWV3Qm94PSI1LjUgLTMuNSA2NCA2NCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyA1LjUgLTMuNSA2NCA2NCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8Zz4NCgk8Y2lyY2xlIGZpbGw9IiNGRkZGRkYiIGN4PSIzNy43ODUiIGN5PSIyOC41MDEiIHI9IjI4LjgzNiIvPg0KCTxwYXRoIGQ9Ik0zNy40NDEtMy41YzguOTUxLDAsMTYuNTcyLDMuMTI1LDIyLjg1Nyw5LjM3MmMzLjAwOCwzLjAwOSw1LjI5NSw2LjQ0OCw2Ljg1NywxMC4zMTQNCgkJYzEuNTYxLDMuODY3LDIuMzQ0LDcuOTcxLDIuMzQ0LDEyLjMxNGMwLDQuMzgxLTAuNzczLDguNDg2LTIuMzE0LDEyLjMxM2MtMS41NDMsMy44MjgtMy44Miw3LjIxLTYuODI4LDEwLjE0Mw0KCQljLTMuMTIzLDMuMDg1LTYuNjY2LDUuNDQ4LTEwLjYyOSw3LjA4NmMtMy45NjEsMS42MzgtOC4wNTcsMi40NTctMTIuMjg1LDIuNDU3cy04LjI3Ni0wLjgwOC0xMi4xNDMtMi40MjkNCgkJYy0zLjg2Ni0xLjYxOC03LjMzMy0zLjk2MS0xMC40LTcuMDI3Yy0zLjA2Ny0zLjA2Ni01LjQtNi41MjQtNy0xMC4zNzJTNS41LDMyLjc2Nyw1LjUsMjguNWMwLTQuMjI5LDAuODA5LTguMjk1LDIuNDI4LTEyLjINCgkJYzEuNjE5LTMuOTA1LDMuOTcyLTcuNCw3LjA1Ny0xMC40ODZDMjEuMDgtMC4zOTQsMjguNTY1LTMuNSwzNy40NDEtMy41eiBNMzcuNTU3LDIuMjcyYy03LjMxNCwwLTEzLjQ2NywyLjU1My0xOC40NTgsNy42NTcNCgkJYy0yLjUxNSwyLjU1My00LjQ0OCw1LjQxOS01LjgsOC42Yy0xLjM1NCwzLjE4MS0yLjAyOSw2LjUwNS0yLjAyOSw5Ljk3MmMwLDMuNDI5LDAuNjc1LDYuNzM0LDIuMDI5LDkuOTEzDQoJCWMxLjM1MywzLjE4MywzLjI4NSw2LjAyMSw1LjgsOC41MTZjMi41MTQsMi40OTYsNS4zNTEsNC4zOTksOC41MTUsNS43MTVjMy4xNjEsMS4zMTQsNi40NzYsMS45NzEsOS45NDMsMS45NzENCgkJYzMuNDI4LDAsNi43NS0wLjY2NSw5Ljk3My0xLjk5OWMzLjIxOS0xLjMzNSw2LjEyMS0zLjI1Nyw4LjcxMy01Ljc3MWM0Ljk5LTQuODc2LDcuNDg0LTEwLjk5LDcuNDg0LTE4LjM0NA0KCQljMC0zLjU0My0wLjY0OC02Ljg5NS0xLjk0My0xMC4wNTdjLTEuMjkzLTMuMTYyLTMuMTgtNS45OC01LjY1NC04LjQ1OEM1MC45ODQsNC44NDQsNDQuNzk1LDIuMjcyLDM3LjU1NywyLjI3MnogTTM3LjE1NiwyMy4xODcNCgkJbC00LjI4NywyLjIyOWMtMC40NTgtMC45NTEtMS4wMTktMS42MTktMS42ODUtMmMtMC42NjctMC4zOC0xLjI4Ni0wLjU3MS0xLjg1OC0wLjU3MWMtMi44NTYsMC00LjI4NiwxLjg4NS00LjI4Niw1LjY1Nw0KCQljMCwxLjcxNCwwLjM2MiwzLjA4NCwxLjA4NSw0LjExM2MwLjcyNCwxLjAyOSwxLjc5MSwxLjU0NCwzLjIwMSwxLjU0NGMxLjg2NywwLDMuMTgxLTAuOTE1LDMuOTQ0LTIuNzQzbDMuOTQyLDINCgkJYy0wLjgzOCwxLjU2My0yLDIuNzkxLTMuNDg2LDMuNjg2Yy0xLjQ4NCwwLjg5Ni0zLjEyMywxLjM0My00LjkxNCwxLjM0M2MtMi44NTcsMC01LjE2My0wLjg3NS02LjkxNS0yLjYyOQ0KCQljLTEuNzUyLTEuNzUyLTIuNjI4LTQuMTktMi42MjgtNy4zMTNjMC0zLjA0OCwwLjg4Ni01LjQ2NiwyLjY1Ny03LjI1N2MxLjc3MS0xLjc5LDQuMDA5LTIuNjg2LDYuNzE1LTIuNjg2DQoJCUMzMi42MDQsMTguNTU4LDM1LjQ0MSwyMC4xMDEsMzcuMTU2LDIzLjE4N3ogTTU1LjYxMywyMy4xODdsLTQuMjI5LDIuMjI5Yy0wLjQ1Ny0wLjk1MS0xLjAyLTEuNjE5LTEuNjg2LTINCgkJYy0wLjY2OC0wLjM4LTEuMzA3LTAuNTcxLTEuOTE0LTAuNTcxYy0yLjg1NywwLTQuMjg3LDEuODg1LTQuMjg3LDUuNjU3YzAsMS43MTQsMC4zNjMsMy4wODQsMS4wODYsNC4xMTMNCgkJYzAuNzIzLDEuMDI5LDEuNzg5LDEuNTQ0LDMuMjAxLDEuNTQ0YzEuODY1LDAsMy4xOC0wLjkxNSwzLjk0MS0yLjc0M2w0LDJjLTAuODc1LDEuNTYzLTIuMDU3LDIuNzkxLTMuNTQxLDMuNjg2DQoJCWMtMS40ODYsMC44OTYtMy4xMDUsMS4zNDMtNC44NTcsMS4zNDNjLTIuODk2LDAtNS4yMDktMC44NzUtNi45NDEtMi42MjljLTEuNzM2LTEuNzUyLTIuNjAyLTQuMTktMi42MDItNy4zMTMNCgkJYzAtMy4wNDgsMC44ODUtNS40NjYsMi42NTgtNy4yNTdjMS43Ny0xLjc5LDQuMDA4LTIuNjg2LDYuNzEzLTIuNjg2QzUxLjExNywxOC41NTgsNTMuOTM4LDIwLjEwMSw1NS42MTMsMjMuMTg3eiIvPg0KPC9nPg0KPC9zdmc+DQo="}></sp-icon>
            </sp-action-button>
            <sp-top-nav-item href="#">Design</sp-top-nav-item>
            <sp-top-nav-item href="#prototype">Prototype</sp-top-nav-item>
            <span style="margin-inline-start: auto; font-size: 1.1em;">
                document_name.pdf
            </span>
            <sp-action-group style="margin-inline-start: auto;" quiet>
                <sp-action-button label="Search">
                    <sp-icon-search slot="icon"></sp-icon-search>
                </sp-action-button>
                <sp-action-button label="Download">
                    <sp-icon-download slot="icon"></sp-icon-download>
                </sp-action-button>
                <sp-action-button label="Link">
                    <sp-icon-link slot="icon"></sp-icon-link>
                </sp-action-button>
                <sp-action-menu label="User" quiet>
                    <sp-avatar
                        slot="icon"
                        label="User avatar"
                        src=${"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAyADIDASIAAhEBAxEB/8QAHAAAAgIDAQEAAAAAAAAAAAAAAAcFCAMEBgIJ/8QAMhAAAgEDBAEBBgYABwAAAAAAAQIDBAURAAYSITEHEyJBUWGBFBUjMnGhCCU1QmKisf/EABkBAAMBAQEAAAAAAAAAAAAAAAMEBQIGAf/EACoRAAICAAMHAwUBAAAAAAAAAAECAAMRITEEBRITQVGhYXHwFBUiY5Gx/9oADAMBAAIRAxEAPwD6b0VwFTIQYXUD4ka3I5AwOAcZ+OldD6+2H9BI6iB5JDjgHGdbq+uu3BKEkqUhfOG5Hr7agV7y2XTmgwmUZI4YyM68kjj40urr6x0dMjR0UXt5mAKs59zB7z0e9chQ+sNw3JE1TR1oSBWZAY4woYqxBODk+R/WriVs6gjrF3uRNY8SyY94gfLUfcHqWXjTFQR5JOk5UeodfDVwQT1rNLNyaMMAOZAyQCB5x3j6H5HUpat5x3J5va1M6zAAcSfOktqFlKliPx6nHT3m67UsyE7Vqq8cjhofPz0a5bpuxLLg9/u0ag/WHv5Ea4ZQikrWRwp5lR2so850xdpx1W6kelt9FNWPGAZJQAFQH5kkDvB0+H9JtjQXmko5LVSrBURlIVpmaWRpBkkcRk/tBOdRV1itu09wT2Gx0wpKdCG4FChZiikswPee/j8tC2bcvOs4LXAHprErEapOIyGhtlzsdqSavRVSCMqEMisx49qDg9fL7DUf6dR7leulWte2pt38HCtIkEbrUe2x+oXJ6IJ7GPuNTu9Krlt2WBWPAg8j8SfnquHqr6j3Cr9OKiw2i/z7c3BTVUZWoWQQfiU97EaOWGchSSAcjA6xrr0I2QrSxJUDIn/IBU5q5DOPu60u6KbclTNWVdDUWIVdM9vjjhIniXBEwd84OQTjrwT3qauddFty2fjTdaeGWSXlxYgnj4A/n4/fS/8A8PW723lZ9t22a8/ntVZqflc62QiZal2DoqlgSGwQxJBP7QM+dO+qoLHUk/mEdCIU7VhTGQr9cYznUfeattlTU1vgpw8fPEapqy9RFg3rv7NihKkqcZD+dGmSLPsgj/U6P7286Nc19m/b8/sZ4LO/iKfe3qLda+hobpctwpZZaCYGGSiZVLAkF0CIFyWUYyfGT9cwB3pPeLvTbgaeOZKvOFSYSEJxwrE58kf+DSGX1hsF6UwVEtWY2BAQK+CMd8hnBH9d60rBVWKCy0tue5vMKX3I2elOeAPuAgPjIAUZ+mddTSbFIYYY9YV0BUqZcO6UEl920gpalIZZIlZHftSx8D+8arts66xbv3beLFUpBFVUE0sdX7dVxD7NirZJOMch0frrjbhvK5VE8Iot61Vtio0RY6aCjVlXjkoSpYYx5HWNczW2e3124btfpd03SnrbpwNU9FBGgbgFxhWZgP2g+PPeqL31vmwz94pXsrpkDr6S59o29Y9p2eoijlgo5qoiNZKciKVip59Fck4yTj/l9dRz7krbWGSpm/NqRcKs0aFahBjsuv8Av/le/pqtm0tx0ez7cYjuK83andhKkdUqHDAceWfJJHnJ7+wxmuvrbSqrLHBUP0R2qdfXsHU67F2xXACNV1FBhmY85fU7bcUro13iRlYgqzEEHPgg9jRqsTeuKcm/y1z35Pse/wDro0vwt3ENyz2iltrt+EzyPw+Op+2uzA5YnKjOT/OjRoo0jXWbZRVZiAAWPZA86xVk8kdSeMjr+zwxHnlnRo1hpoaTetsryUhDOzAeATnUTe2IY9nyR5/nRo0NZ71kYigqCQPHy0aNGgxif//Z"}
                        style="--mod-avatar-block-size: 100%; --mod-avatar-inline-size: 100%;"
                    ></sp-avatar>
                    <sp-menu-item>Profile</sp-menu-item>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-item>Sign Out</sp-menu-item>
                </sp-action-menu>
            </sp-action-group>
        </sp-top-nav>
    `,__namedExportsOrder=["Default","Selected","autofocus","Modes"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-top-nav>\n            <sp-top-nav-item href="#">Site Name</sp-top-nav-item>\n            <sp-top-nav-item href="#page-1" style="margin-inline-start: auto;">\n                Page 1\n            </sp-top-nav-item>\n            <sp-top-nav-item href="#page-2">Page 2</sp-top-nav-item>\n            <sp-top-nav-item href="#page-3">Page 3</sp-top-nav-item>\n            <sp-top-nav-item href="#page-4">\n                Page with Really Long Name\n            </sp-top-nav-item>\n            <sp-action-menu\n                label="Account"\n                style="margin-inline-start: auto;"\n                quiet\n            >\n                <sp-icon-settings slot="icon"></sp-icon-settings>\n                <sp-menu-item>Account Settings</sp-menu-item>\n                <sp-menu-item>My Profile</sp-menu-item>\n                <sp-menu-divider></sp-menu-divider>\n                <sp-menu-item>Share</sp-menu-item>\n                <sp-menu-divider></sp-menu-divider>\n                <sp-menu-item>Help</sp-menu-item>\n                <sp-menu-item>Sign Out</sp-menu-item>\n            </sp-action-menu>\n        </sp-top-nav>\n    `;\n}',...Default.parameters?.docs?.source}}},Selected.parameters={...Selected.parameters,docs:{...Selected.parameters?.docs,source:{originalSource:'() => {\n  let {\n    href\n  } = location;\n  href = href.replace(location.search, "");\n  return html`\n        <sp-top-nav ignore-url-parts="search">\n            <sp-top-nav-item href="#">Site Name</sp-top-nav-item>\n            <sp-top-nav-item href="#page-1" style="margin-inline-start: auto;">\n                Page 1\n            </sp-top-nav-item>\n            <sp-top-nav-item href="#page-2">Page 2</sp-top-nav-item>\n            <sp-top-nav-item href=${href} class="selected">\n                Page 3\n            </sp-top-nav-item>\n            <sp-top-nav-item href="#page-4">\n                Page with Really Long Name\n            </sp-top-nav-item>\n            <sp-action-menu\n                label="Account"\n                style="margin-inline-start: auto;"\n                quiet\n            >\n                <sp-icon-settings slot="icon"></sp-icon-settings>\n                <sp-menu-item>Account Settings</sp-menu-item>\n                <sp-menu-item>My Profile</sp-menu-item>\n                <sp-menu-divider></sp-menu-divider>\n                <sp-menu-item>Share</sp-menu-item>\n                <sp-menu-divider></sp-menu-divider>\n                <sp-menu-item>Help</sp-menu-item>\n                <sp-menu-item>Sign Out</sp-menu-item>\n            </sp-action-menu>\n        </sp-top-nav>\n    `;\n}',...Selected.parameters?.docs?.source}}},autofocus.parameters={...autofocus.parameters,docs:{...autofocus.parameters?.docs,source:{originalSource:"() => {\n  return html`\n        <wrapped-top-nav></wrapped-top-nav>\n    `;\n}",...autofocus.parameters?.docs?.source}}},Modes.parameters={...Modes.parameters,docs:{...Modes.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-top-nav>\n            <sp-action-button quiet href="/marketing-page" label="App">\n                <sp-icon slot="icon" src=${logo}></sp-icon>\n            </sp-action-button>\n            <sp-top-nav-item href="#">Design</sp-top-nav-item>\n            <sp-top-nav-item href="#prototype">Prototype</sp-top-nav-item>\n            <span style="margin-inline-start: auto; font-size: 1.1em;">\n                document_name.pdf\n            </span>\n            <sp-action-group style="margin-inline-start: auto;" quiet>\n                <sp-action-button label="Search">\n                    <sp-icon-search slot="icon"></sp-icon-search>\n                </sp-action-button>\n                <sp-action-button label="Download">\n                    <sp-icon-download slot="icon"></sp-icon-download>\n                </sp-action-button>\n                <sp-action-button label="Link">\n                    <sp-icon-link slot="icon"></sp-icon-link>\n                </sp-action-button>\n                <sp-action-menu label="User" quiet>\n                    <sp-avatar\n                        slot="icon"\n                        label="User avatar"\n                        src=${avatar}\n                        style="--mod-avatar-block-size: 100%; --mod-avatar-inline-size: 100%;"\n                    ></sp-avatar>\n                    <sp-menu-item>Profile</sp-menu-item>\n                    <sp-menu-divider></sp-menu-divider>\n                    <sp-menu-item>Sign Out</sp-menu-item>\n                </sp-action-menu>\n            </sp-action-group>\n        </sp-top-nav>\n    `;\n}',...Modes.parameters?.docs?.source}}}}}]);
//# sourceMappingURL=top-nav-stories-top-nav-stories.e8eae219.iframe.bundle.js.map