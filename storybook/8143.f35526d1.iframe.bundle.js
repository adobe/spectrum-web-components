"use strict";(self.webpackChunk_spectrum_web_components_1st_gen=self.webpackChunk_spectrum_web_components_1st_gen||[]).push([[8143],{"./packages/action-menu/sp-action-menu.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js"),directives_dev=__webpack_require__("./tools/base/src/directives.dev.js"),Picker_dev=__webpack_require__("./packages/picker/src/Picker.dev.js"),observe_slot_presence_dev=(__webpack_require__("./packages/action-button/sp-action-button.dev.js"),__webpack_require__("./tools/shared/src/observe-slot-presence.dev.js")),observe_slot_text_dev=__webpack_require__("./tools/shared/src/observe-slot-text.dev.js");__webpack_require__("./packages/icons-workflow/icons/sp-icon-more.js");var action_menu_css=index_dev.AH`
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
        `}update(changedProperties){changedProperties.has("invalid")&&(this.invalid=!1),super.update(changedProperties)}hasAccessibleLabel(){return!!this.label||!!this.getAttribute("aria-label")||!!this.getAttribute("aria-labelledby")||!!this.appliedLabel||this.hasLabel||this.labelOnly}warnNoLabel(){window.__swc.warn(this,`<${this.localName}> needs one of the following to be accessible:`,"https://opensource.adobe.com/spectrum-web-components/components/action-menu/#accessibility",{type:"accessibility",issues:[`an <sp-field-label> element with a \`for\` attribute referencing the \`id\` of the \`<${this.localName}>\`, or`,'value supplied to the "label" attribute, which will be displayed visually as placeholder text','text content supplied in a <span> with slot="label", or, text content supplied in a <span> with slot="label-only"',"which will also be displayed visually as placeholder text."]})}}__decorateClass([(0,decorators_dev.MZ)({type:String})],ActionMenu.prototype,"selects",2),__decorateClass([(0,decorators_dev.MZ)({reflect:!0,attribute:"static-color"})],ActionMenu.prototype,"staticColor",2),__decorateClass([(0,decorators_dev.wk)()],ActionMenu.prototype,"labelOnly",1),(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-action-menu",ActionMenu)},"./packages/action-menu/stories/index.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{q:function(){return ActionMenuMarkup}});var _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./tools/base/src/index.dev.js"),_spectrum_web_components_base_src_directives_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./tools/base/src/directives.dev.js");__webpack_require__("./packages/action-menu/sp-action-menu.dev.js"),__webpack_require__("./packages/icon/sp-icon.dev.js"),__webpack_require__("./packages/menu/sp-menu-divider.dev.js"),__webpack_require__("./packages/menu/sp-menu-item.dev.js"),__webpack_require__("./packages/tooltip/sp-tooltip.dev.js");const ActionMenuMarkup=({align:align="start",ariaLabel:ariaLabel="More Actions",onChange:onChange=()=>{},changeHandler:changeHandler=()=>{},disabled:disabled=!1,forcePopover:forcePopover=!1,open:open=!1,quiet:quiet=!1,staticValue:staticValue="",visibleLabel:visibleLabel="",customIcon:customIcon="",size:size="m",selects:selects="",selected:selected=!1,tooltipDescription:tooltipDescription="",tooltipPlacement:tooltipPlacement="bottom"}={})=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-action-menu
            label=${ariaLabel}
            ?disabled=${disabled}
            ?open=${open}
            ?quiet=${quiet}
            ?force-popover=${forcePopover}
            static-color=${(0,_spectrum_web_components_base_src_directives_js__WEBPACK_IMPORTED_MODULE_1__.JR)("none"===staticValue?void 0:staticValue)}
            size=${size}
            @change=${event=>{changeHandler(event.target.value),onChange(event.target.value)}}
            .selects=${selects||void 0}
            value=${selected?"Select Inverse":""}
            style=${(0,_spectrum_web_components_base_src_directives_js__WEBPACK_IMPORTED_MODULE_1__.JR)("end"===align?"float: inline-end;":void 0)}
        >
            ${customIcon?(0,_spectrum_web_components_base_src_directives_js__WEBPACK_IMPORTED_MODULE_1__.HG)(customIcon):_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.s6}
            ${visibleLabel?_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
                      <span slot="label">${visibleLabel}</span>
                  `:_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.s6}
            <sp-menu-item>Deselect</sp-menu-item>
            <sp-menu-item ?selected=${selected}>Select Inverse</sp-menu-item>
            <sp-menu-item>Feather...</sp-menu-item>
            <sp-menu-item>Select and Mask...</sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item>Save Selection</sp-menu-item>
            <sp-menu-item disabled>Make Work Path</sp-menu-item>
            ${tooltipDescription?_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
                      <sp-tooltip
                          slot="tooltip"
                          self-managed
                          placement=${tooltipPlacement}
                      >
                          ${tooltipDescription}
                      </sp-tooltip>
                  `:_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy``}
        </sp-action-menu>
    `},"./packages/divider/src/divider.css.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){const i=__webpack_require__("./tools/base/src/index.dev.js").AH`
    @media (forced-colors:active){:host{--highcontrast-divider-background-color:CanvasText}}:host{--spectrum-divider-thickness:var(--spectrum-divider-thickness-medium)}:host([size=s]){--spectrum-divider-thickness:var(--spectrum-divider-thickness-small)}:host([size=l]){--spectrum-divider-thickness:var(--spectrum-divider-thickness-large);--spectrum-divider-background-color:var(--spectrum-gray-800)}:host([static-color=white]){--mod-divider-background-color:var(--mod-divider-background-color-medium-static-white,var(--spectrum-divider-background-color-static-white))}:host([static-color=white][size=s]){--mod-divider-background-color:var(--mod-divider-background-color-small-static-white,var(--spectrum-divider-background-color-static-white))}:host([static-color=white][size=l]){--mod-divider-background-color:var(--mod-divider-background-color-large-static-white,var(--spectrum-transparent-white-800))}:host([static-color=black]){--mod-divider-background-color:var(--mod-divider-background-color-medium-static-black,var(--spectrum-divider-background-color-static-black))}:host([static-color=black][size=s]){--mod-divider-background-color:var(--mod-divider-background-color-small-static-black,var(--spectrum-divider-background-color-static-black))}:host([static-color=black][size=l]){--mod-divider-background-color:var(--mod-divider-background-color-large-static-black,var(--spectrum-transparent-black-800))}:host{block-size:var(--mod-divider-thickness,var(--spectrum-divider-thickness));border:none;border-width:var(--mod-divider-thickness,var(--spectrum-divider-thickness));border-radius:var(--mod-divider-thickness,var(--spectrum-divider-thickness));background-color:var(--highcontrast-divider-background-color,var(--mod-divider-background-color,var(--spectrum-divider-background-color)));inline-size:100%;overflow:visible}:host([vertical]){inline-size:var(--mod-divider-thickness,var(--spectrum-divider-thickness));block-size:100%;block-size:var(--mod-divider-vertical-height,100%);margin-block:var(--mod-divider-vertical-margin);align-self:var(--mod-divider-vertical-align)}:host{--spectrum-divider-background-color:var(--system-divider-background-color);--spectrum-divider-background-color-static-white:var(--system-divider-background-color-static-white);--spectrum-divider-background-color-static-black:var(--system-divider-background-color-static-black)}:host{display:block}hr{border:none;margin:0}
`;__webpack_exports__.A=i},"./packages/icon/sp-icon.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var _src_Icon_dev_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icon/src/Icon.dev.js");(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon",_src_Icon_dev_js__WEBPACK_IMPORTED_MODULE_0__.I)},"./packages/icons-workflow/icons/sp-icon-more.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");var More=__webpack_require__("./packages/icons-workflow/src/icons/More.js");class IconMore extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),2===this.spectrumVersion?(({width:r=24,height:l=24,hidden:e=!1,title:c="More"}={})=>custom_tag.T`<svg
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
  </svg>`)({hidden:!this.label,title:this.label}):(0,More.Z)({hidden:!this.label,title:this.label})}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon-more",IconMore)},"./packages/icons-workflow/src/icons/More.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Z:function(){return MoreIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const MoreIcon=({width:e=24,height:r=24,hidden:t=!1,title:l="More"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
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
  </svg>`},"./packages/menu/sp-menu-divider.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js");var menu_divider_css=index_dev.AH`
    :host{--spectrum-menu-divider-thickness:var(--spectrum-divider-thickness-medium);inline-size:auto;margin-block:var(--mod-menu-section-divider-margin-block,max(0px,(var(--spectrum-menu-item-section-divider-height) - var(--spectrum-menu-divider-thickness))/2));margin-inline:var(--mod-menu-item-label-inline-edge-to-content,var(--spectrum-menu-item-label-inline-edge-to-content));overflow:visible}.spectrum-Menu-back:focus-visible{box-shadow:var(--spectrum-menu-item-focus-indicator-shadow)var(--spectrum-menu-item-focus-indicator-border-width)0 0 0 var(--spectrum-menu-item-focus-indicator-color-default);outline:var(--spectrum-menu-item-focus-indicator-width)var(--spectrum-menu-item-focus-indicator-outline-style)var(--spectrum-menu-item-focus-indicator-color-default);outline-offset:var(--spectrum-menu-item-focus-indicator-offset);border-radius:var(--spectrum-menu-item-corner-radius)}.spectrum-Menu-back{padding-inline:var(--mod-menu-back-padding-inline-start,0)var(--mod-menu-back-padding-inline-end,var(--spectrum-menu-item-label-inline-edge-to-content));padding-block:var(--mod-menu-back-padding-block-start,0)var(--mod-menu-back-padding-block-end,0);flex-flow:wrap;align-items:center;display:flex}.spectrum-Menu-backButton{cursor:pointer;background:0 0;border:0;margin:0;padding:0;display:inline-flex}.spectrum-Menu-backButton:focus-visible{outline:var(--spectrum-focus-indicator-thickness)solid var(--spectrum-focus-indicator-color);outline-offset:calc((var(--spectrum-focus-indicator-thickness) + 1px)*-1)}.spectrum-Menu-backHeading{color:var(--highcontrast-menu-item-color-default,var(--mod-menu-back-heading-color,var(--spectrum-menu-section-header-color)));font-size:var(--mod-menu-section-header-font-size,var(--spectrum-menu-section-header-font-size));font-weight:var(--mod-menu-section-header-font-weight,var(--spectrum-menu-section-header-font-weight));line-height:var(--mod-menu-section-header-line-height,var(--spectrum-menu-section-header-line-height));display:block}:host{flex-shrink:0;display:block}
`,divider_css=__webpack_require__("./packages/divider/src/divider.css.js");class MenuDivider extends((0,index_dev.ZG)(index_dev.wG,{validSizes:["s","m","l"]})){static get styles(){return[divider_css.A,menu_divider_css]}firstUpdated(changed){super.firstUpdated(changed),this.setAttribute("role","separator")}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-menu-divider",MenuDivider)},"./packages/overlay/stories/index.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Q:function(){return areIconsPresent},Z:function(){return isOverlayOpen}});var _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./tools/base/src/index.dev.js");function nextFrame(){return new Promise(res=>requestAnimationFrame(()=>res()))}class IsOverlayOpen extends HTMLElement{constructor(){super(),this.sendFocus=async()=>{var _a;const selectedItem=null==(_a=document.querySelector("[focusable]"))?void 0:_a.querySelector("[selected]");selectedItem&&(selectedItem.focus(),selectedItem.focused=!0,await nextFrame(),selectedItem.scrollIntoView({block:"start"}),await nextFrame())},this.handleOpened=async event=>{const overlay=event.target,actions=[nextFrame(),overlay.updateComplete,this.sendFocus()];await Promise.all(actions),await nextFrame(),await nextFrame(),await nextFrame(),await nextFrame(),this.ready(!0)},this.readyPromise=Promise.resolve(!1),this.readyPromise=new Promise(res=>{this.ready=res,this.setup()})}async setup(){await nextFrame(),document.addEventListener("sp-opened",this.handleOpened)}get updateComplete(){return this.readyPromise}disconnectedCallback(){document.removeEventListener("sp-opened",this.handleOpened)}}customElements.define("is-overlay-open",IsOverlayOpen);const isOverlayOpen=story=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        ${story()}
        <is-overlay-open></is-overlay-open>
    `;class AreIconsPresent extends HTMLElement{constructor(){super(),this.overlayTimeout=null,this.sendFocus=async()=>{var _a;const selectedItem=null==(_a=document.querySelector("[focusable]"))?void 0:_a.querySelector("[selected]");selectedItem&&(selectedItem.focus(),selectedItem.focused=!0,await nextFrame(),selectedItem.scrollIntoView({block:"start"}),await nextFrame())},this.handleOpened=async event=>{this.overlayTimeout&&(clearTimeout(this.overlayTimeout),this.overlayTimeout=null);const overlay=event.target,actions=[nextFrame(),overlay.updateComplete,this.sendFocus()];await Promise.all(actions),await nextFrame(),await nextFrame(),await nextFrame(),await nextFrame(),this.checkIcons()},this.checkIcons=async()=>{const icons=[...document.querySelectorAll("sp-icon")],picker=document.querySelector("sp-picker");if(picker){const pickerIcon=picker.querySelector("sp-icon");pickerIcon&&icons.push(pickerIcon)}const iconLoadPromises=Array.from(icons).map(icon=>new Promise(resolve=>{var _a;if("updateComplete"in icon&&"function"==typeof(null==(_a=icon.updateComplete)?void 0:_a.then))return void icon.updateComplete.then(()=>{resolve()});const src=icon.getAttribute("src");if(!src){const imgElement2=icon.querySelector("img");return imgElement2?void(imgElement2.complete?resolve():(imgElement2.addEventListener("load",()=>{resolve()},{once:!0}),imgElement2.addEventListener("error",()=>{console.warn("Failed to load icon image"),resolve()},{once:!0}))):void resolve()}const imgElement=icon.querySelector("img");if(imgElement)return void(imgElement.complete?resolve():(imgElement.addEventListener("load",()=>{resolve()},{once:!0}),imgElement.addEventListener("error",()=>{console.warn(`Failed to load icon image: ${src}`),resolve()},{once:!0})));const img=new Image;img.onload=()=>resolve(),img.onerror=()=>{console.warn(`Failed to load icon: ${src}`),resolve()},img.src=src}));await Promise.all(iconLoadPromises),await nextFrame(),this.ready(!0)},this.readyPromise=Promise.resolve(!1),this.readyPromise=new Promise(res=>{this.ready=res,this.setup()})}async setup(){await nextFrame(),document.addEventListener("sp-opened",this.handleOpened)}get updateComplete(){return this.readyPromise}disconnectedCallback(){document.removeEventListener("sp-opened",this.handleOpened)}}customElements.define("are-icons-present",AreIconsPresent);const areIconsPresent=story=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        ${story()}
        <are-icons-present></are-icons-present>
    `}}]);
//# sourceMappingURL=8143.f35526d1.iframe.bundle.js.map