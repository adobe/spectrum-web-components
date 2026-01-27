"use strict";(self.webpackChunk_spectrum_web_components_1st_gen=self.webpackChunk_spectrum_web_components_1st_gen||[]).push([[5198,5287],{"../node_modules/lit/async-directive.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Kq:function(){return lit_html_async_directive_js__WEBPACK_IMPORTED_MODULE_0__.Kq},u$:function(){return lit_html_async_directive_js__WEBPACK_IMPORTED_MODULE_0__.u$}});var lit_html_async_directive_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../node_modules/lit-html/development/async-directive.js")},"./packages/action-menu/sp-action-menu.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js"),directives_dev=__webpack_require__("./tools/base/src/directives.dev.js"),Picker_dev=__webpack_require__("./packages/picker/src/Picker.dev.js"),observe_slot_presence_dev=(__webpack_require__("./packages/action-button/sp-action-button.dev.js"),__webpack_require__("./tools/shared/src/observe-slot-presence.dev.js")),observe_slot_text_dev=__webpack_require__("./tools/shared/src/observe-slot-text.dev.js");__webpack_require__("./packages/icons-workflow/icons/sp-icon-more.js");var action_menu_css=index_dev.AH`
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
        `}update(changedProperties){changedProperties.has("invalid")&&(this.invalid=!1),super.update(changedProperties)}hasAccessibleLabel(){return!!this.label||!!this.getAttribute("aria-label")||!!this.getAttribute("aria-labelledby")||!!this.appliedLabel||this.hasLabel||this.labelOnly}warnNoLabel(){window.__swc.warn(this,`<${this.localName}> needs one of the following to be accessible:`,"https://opensource.adobe.com/spectrum-web-components/components/action-menu/#accessibility",{type:"accessibility",issues:[`an <sp-field-label> element with a \`for\` attribute referencing the \`id\` of the \`<${this.localName}>\`, or`,'value supplied to the "label" attribute, which will be displayed visually as placeholder text','text content supplied in a <span> with slot="label", or, text content supplied in a <span> with slot="label-only"',"which will also be displayed visually as placeholder text."]})}}__decorateClass([(0,decorators_dev.MZ)({type:String})],ActionMenu.prototype,"selects",2),__decorateClass([(0,decorators_dev.MZ)({reflect:!0,attribute:"static-color"})],ActionMenu.prototype,"staticColor",2),__decorateClass([(0,decorators_dev.wk)()],ActionMenu.prototype,"labelOnly",1),(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-action-menu",ActionMenu)},"./packages/divider/src/divider.css.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){const i=__webpack_require__("./tools/base/src/index.dev.js").AH`
    @media (forced-colors:active){:host{--highcontrast-divider-background-color:CanvasText}}:host{--spectrum-divider-thickness:var(--spectrum-divider-thickness-medium)}:host([size=s]){--spectrum-divider-thickness:var(--spectrum-divider-thickness-small)}:host([size=l]){--spectrum-divider-thickness:var(--spectrum-divider-thickness-large);--spectrum-divider-background-color:var(--spectrum-gray-800)}:host([static-color=white]){--mod-divider-background-color:var(--mod-divider-background-color-medium-static-white,var(--spectrum-divider-background-color-static-white))}:host([static-color=white][size=s]){--mod-divider-background-color:var(--mod-divider-background-color-small-static-white,var(--spectrum-divider-background-color-static-white))}:host([static-color=white][size=l]){--mod-divider-background-color:var(--mod-divider-background-color-large-static-white,var(--spectrum-transparent-white-800))}:host([static-color=black]){--mod-divider-background-color:var(--mod-divider-background-color-medium-static-black,var(--spectrum-divider-background-color-static-black))}:host([static-color=black][size=s]){--mod-divider-background-color:var(--mod-divider-background-color-small-static-black,var(--spectrum-divider-background-color-static-black))}:host([static-color=black][size=l]){--mod-divider-background-color:var(--mod-divider-background-color-large-static-black,var(--spectrum-transparent-black-800))}:host{block-size:var(--mod-divider-thickness,var(--spectrum-divider-thickness));border:none;border-width:var(--mod-divider-thickness,var(--spectrum-divider-thickness));border-radius:var(--mod-divider-thickness,var(--spectrum-divider-thickness));background-color:var(--highcontrast-divider-background-color,var(--mod-divider-background-color,var(--spectrum-divider-background-color)));inline-size:100%;overflow:visible}:host([vertical]){inline-size:var(--mod-divider-thickness,var(--spectrum-divider-thickness));block-size:100%;block-size:var(--mod-divider-vertical-height,100%);margin-block:var(--mod-divider-vertical-margin);align-self:var(--mod-divider-vertical-align)}:host{--spectrum-divider-background-color:var(--system-divider-background-color);--spectrum-divider-background-color-static-white:var(--system-divider-background-color-static-white);--spectrum-divider-background-color-static-black:var(--system-divider-background-color-static-black)}:host{display:block}hr{border:none;margin:0}
`;__webpack_exports__.A=i},"./packages/icons-workflow/icons/sp-icon-more.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");var More=__webpack_require__("./packages/icons-workflow/src/icons/More.js");class IconMore extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),2===this.spectrumVersion?(({width:r=24,height:l=24,hidden:e=!1,title:c="More"}={})=>custom_tag.T`<svg
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
  </svg>`)({hidden:!this.label,title:this.label}):(0,More.Z)({hidden:!this.label,title:this.label})}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon-more",IconMore)},"./packages/icons-workflow/icons/sp-icon-show-menu.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-workflow/src/custom-tag.js"),ShowMenu=__webpack_require__("./packages/icons-workflow/src/icons/ShowMenu.js"),MenuHamburger=__webpack_require__("./packages/icons-workflow/src/icons-s2/MenuHamburger.js");class IconShowMenu extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),1===this.spectrumVersion?(0,ShowMenu.w)({hidden:!this.label,title:this.label}):(0,MenuHamburger.S)({hidden:!this.label,title:this.label})}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon-show-menu",IconShowMenu)},"./packages/icons-workflow/src/icons-s2/MenuHamburger.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{S:function(){return MenuHamburgerIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const MenuHamburgerIcon=({width:r=24,height:e=24,hidden:t=!1,title:l="Menu Hamburger"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
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
        `}}__decorateClass([(0,decorators_dev.gZ)({slot:"header",flatten:!0})],MenuGroup.prototype,"headerElements",2),__decorateClass([(0,decorators_dev.wk)()],MenuGroup.prototype,"headerElement",2),(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-menu-group",MenuGroup)},"./packages/menu/stories/submenu.stories.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:function(){return __namedExportsOrder},contextMenu:function(){return contextMenu},customRootSubmenu:function(){return customRootSubmenu},customRootSubmenuWithScroll:function(){return customRootSubmenuWithScroll},submenu:function(){return submenu}});var _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./tools/base/src/index.dev.js"),_spectrum_web_components_overlay__WEBPACK_IMPORTED_MODULE_6__=(__webpack_require__("./packages/action-menu/sp-action-menu.dev.js"),__webpack_require__("./packages/menu/sp-menu.dev.js"),__webpack_require__("./packages/menu/sp-menu-item.dev.js"),__webpack_require__("./packages/menu/sp-menu-divider.dev.js"),__webpack_require__("./packages/menu/sp-menu-group.dev.js"),__webpack_require__("./packages/overlay/src/index.dev.js"));__webpack_require__("./packages/popover/sp-popover.dev.js"),__webpack_require__("./packages/icons-workflow/icons/sp-icon-show-menu.js");function nextFrame(){return new Promise(res=>requestAnimationFrame(()=>res()))}__webpack_exports__.default={component:"sp-menu",title:"Menu/Submenu"};class SubmenuReady extends HTMLElement{constructor(){super(),this.handleMenuOpened=async event=>{this.menu.removeEventListener("sp-opened",this.handleMenuOpened),await nextFrame(),await event.target.updateComplete,this.submenu=document.querySelector("#submenu-item-1"),this.submenu&&(this.submenu.addEventListener("sp-opened",this.handleSubmenuOpened),this.submenu.click())},this.handleSubmenuOpened=async event=>{this.submenu.removeEventListener("sp-opened",this.handleSubmenuOpened),await nextFrame(),await event.target.updateComplete,this.submenuChild=document.querySelector("#submenu-item-2"),this.submenuChild&&(this.submenuChild.addEventListener("sp-opened",this.handleSubmenuChildOpened),this.submenuChild.click())},this.handleSubmenuChildOpened=async event=>{this.submenuChild.removeEventListener("sp-opened",this.handleSubmenuChildOpened),await nextFrame(),await event.target.updateComplete,this.ready(!0)},this.readyPromise=Promise.resolve(!1),this.readyPromise=new Promise(res=>{this.ready=res,this.setup()})}async setup(){await nextFrame(),this.menu=document.querySelector("sp-action-menu"),this.menu.addEventListener("sp-opened",this.handleMenuOpened),this.menu.addEventListener("sp-closed",()=>{this.menu.removeEventListener("sp-opened",this.handleMenuOpened)},{once:!0}),this.menu.open=!0}get updateComplete(){return this.readyPromise}}customElements.define("submenu-ready",SubmenuReady);const submenu=()=>{const getValueEls=()=>({root:document.querySelector("#root-value"),first:document.querySelector("#first-value"),second:document.querySelector("#second-value")}),handleFirstDescendantChange=event=>{getValueEls().first.textContent=event.target.selected[0]||""},handleSecondDescendantChange=event=>{getValueEls().second.textContent=event.target.selected[0]||""};return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-action-menu
            label="More Actions"
            @change=${event=>{getValueEls().root.textContent=event.target.value}}
            @sp-opened=${()=>{const valueEls=getValueEls();valueEls.root.textContent="",valueEls.first.textContent="",valueEls.second.textContent=""}}
        >
            <sp-icon-show-menu slot="icon"></sp-icon-show-menu>
            <sp-menu-group
                @change=${()=>console.log("group change")}
                role="none"
            >
                <span slot="header">New York</span>
                <sp-menu-item>Bronx</sp-menu-item>
                <sp-menu-item id="submenu-item-1">
                    Brooklyn
                    <sp-menu
                        slot="submenu"
                        @change=${handleFirstDescendantChange}
                    >
                        <sp-menu-item id="submenu-item-2">
                            Ft. Greene
                            <sp-menu
                                slot="submenu"
                                @change=${handleSecondDescendantChange}
                            >
                                <sp-menu-item>S. Oxford St</sp-menu-item>
                                <sp-menu-item>S. Portland Ave</sp-menu-item>
                                <sp-menu-item>S. Elliot Pl</sp-menu-item>
                            </sp-menu>
                        </sp-menu-item>
                        <sp-menu-item disabled>Park Slope</sp-menu-item>
                        <sp-menu-item>Williamsburg</sp-menu-item>
                    </sp-menu>
                </sp-menu-item>
                <sp-menu-item>
                    Manhattan
                    <sp-menu
                        slot="submenu"
                        @change=${handleFirstDescendantChange}
                    >
                        <sp-menu-item disabled>SoHo</sp-menu-item>
                        <sp-menu-item>
                            Union Square
                            <sp-menu
                                slot="submenu"
                                @change=${handleSecondDescendantChange}
                            >
                                <sp-menu-item>14th St</sp-menu-item>
                                <sp-menu-item>Broadway</sp-menu-item>
                                <sp-menu-item>Park Ave</sp-menu-item>
                            </sp-menu>
                        </sp-menu-item>
                        <sp-menu-item>Upper East Side</sp-menu-item>
                    </sp-menu>
                </sp-menu-item>
                <sp-menu-item disabled>
                    Queens
                    <sp-menu slot="submenu">
                        <sp-menu-item>
                            You shouldn't be able to see this!
                        </sp-menu-item>
                        <sp-menu-item>Forest Hills</sp-menu-item>
                        <sp-menu-item>Jamaica</sp-menu-item>
                    </sp-menu>
                </sp-menu-item>
            </sp-menu-group>
        </sp-action-menu>
        <div>
            Root value:
            <span id="root-value"></span>
            <br />
            First descendant value:
            <span id="first-value"></span>
            <br />
            Second descendant value:
            <span id="second-value"></span>
            <br />
        </div>
    `};submenu.decorators=[story=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        ${story()}
        <submenu-ready></submenu-ready>
    `];const contextMenu=()=>{const getValueEls=()=>({root:document.querySelector("#root-value"),first:document.querySelector("#first-value")}),clearValues=()=>{const valueEls=getValueEls();valueEls.root.textContent="",valueEls.first.textContent=""};return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <style>
            .app-root {
                position: absolute;
                inset: 0;
            }
            active-overlay::part(theme) {
                --swc-menu-width: 200px;
            }
        </style>
        <div class="app-root" @contextmenu=${async event=>{event.preventDefault();const virtualTrigger=new _spectrum_web_components_overlay__WEBPACK_IMPORTED_MODULE_6__.ec(event.clientX,event.clientY),overlay=document.querySelector("sp-overlay");clearValues(),overlay.triggerElement=virtualTrigger,overlay.willPreventClose=!0,overlay.type="auto",overlay.placement="right-start",overlay.open=!0}}>
            <div>
                Root value:
                <span id="root-value"></span>
                <br />
                First descendant value:
                <span id="first-value"></span>
                <br />
            </div>
        </div>
        <sp-overlay>
            <sp-popover
                style="max-width: 33vw;"
                @click=${event=>{var _a;return null==(_a=event.target)?void 0:_a.dispatchEvent(new Event("close",{bubbles:!0}))}}
            >
                <sp-menu @change=${event=>{var _a;getValueEls().root.textContent=event.target.value,null==(_a=event.target.parentElement)||_a.dispatchEvent(new Event("close",{bubbles:!0}))}}>
                    <sp-menu-group>
                        <span slot="header">Options</span>
                        <sp-menu-item>
                            Copy
                            <span slot="value">⌘​S</span>
                        </sp-menu-item>
                        <sp-menu-item>
                            Paste
                            <span slot="value">⌘​P</span>
                        </sp-menu-item>
                        <sp-menu-item>
                            Cut
                            <span slot="value">⌘​X</span>
                        </sp-menu-item>
                        <sp-menu-divider></sp-menu-divider>
                        <sp-menu-item>
                            Select layer
                            <sp-menu
                                slot="submenu"
                                selects="single"
                                @change=${event=>{getValueEls().first.textContent=event.target.selected[0]||""}}
                            >
                                <sp-menu-item selected>Ellipse 1</sp-menu-item>
                                <sp-menu-item>Rectangle</sp-menu-item>
                            </sp-menu>
                        </sp-menu-item>
                        <sp-menu-item>
                            Group
                            <span slot="value">⌘​G</span>
                        </sp-menu-item>
                        <sp-menu-item>
                            Unlock
                            <span slot="value">⌘​L</span>
                        </sp-menu-item>
                        <sp-menu-divider></sp-menu-divider>
                        <sp-menu-item>
                            Bring to front
                            <span slot="value">⇧​⌘​​]</span>
                        </sp-menu-item>
                        <sp-menu-item>
                            Bring forward
                            <span slot="value">⌘​​]</span>
                        </sp-menu-item>
                        <sp-menu-item>
                            Send backward
                            <span slot="value">⌘​​[</span>
                        </sp-menu-item>
                        <sp-menu-item>
                            Send to back
                            <span slot="value">⇧​⌘​​[</span>
                        </sp-menu-item>
                        <sp-menu-divider></sp-menu-divider>
                        <sp-menu-item>
                            Delete
                            <span slot="value">DEL</span>
                        </sp-menu-item>
                    </sp-menu-group>
                </sp-menu>
            </sp-popover>
        </sp-overlay>
    `},customRootSubmenu=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-action-menu label="More Actions">
            <sp-menu-item>Bronx</sp-menu-item>
            <sp-menu-item id="submenu-item-1">
                Brooklyn
                <div role="menuitem" slot="submenu" style="padding: 12px">
                    <img
                        src="https://placekitten.com/200/200"
                        alt="Kitten"
                        style="width: 100%; height: auto; border-radius: 4px"
                    />
                    <p>I am an arbitrary content in submenu</p>
                </div>
            </sp-menu-item>
        </sp-action-menu>
    `,customRootSubmenuWithScroll=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-action-menu label="More Actions">
            <sp-menu-item>Bronx</sp-menu-item>
            <sp-menu-item id="submenu-item-1">
                Brooklyn
                <div role="menuitem" slot="submenu" style="padding: 12px">
                    <sp-menu-item>Additional options</sp-menu-item>
                    <sp-menu-item>Available on request</sp-menu-item>
                    <sp-menu-item value="item-1">Deselect</sp-menu-item>
                    <sp-menu-item value="item-2">Select inverse</sp-menu-item>
                    <sp-menu-item value="item-3">Feather...</sp-menu-item>
                    <sp-menu-item value="item-4">
                        Select and mask...
                    </sp-menu-item>
                    <sp-menu-item value="item-5">Save selection</sp-menu-item>
                    <sp-menu-item value="item-1">Deselect</sp-menu-item>
                    <sp-menu-item value="item-2">Select inverse</sp-menu-item>
                    <sp-menu-item value="item-3">Feather...</sp-menu-item>
                    <sp-menu-item value="item-4">
                        Select and mask...
                    </sp-menu-item>
                    <sp-menu-item value="item-5">Save selection</sp-menu-item>
                    <sp-menu-item value="item-1">Deselect</sp-menu-item>
                    <sp-menu-item value="item-2">Select inverse</sp-menu-item>
                    <sp-menu-item value="item-3">Feather...</sp-menu-item>
                    <sp-menu-item value="item-4">
                        Select and mask...
                    </sp-menu-item>
                    <sp-menu-item value="item-5">Save selection</sp-menu-item>
                    <sp-menu-item value="item-1">Deselect</sp-menu-item>
                    <sp-menu-item value="item-2">Select inverse</sp-menu-item>
                    <sp-menu-item value="item-3">Feather...</sp-menu-item>
                    <sp-menu-item value="item-4">
                        Select and mask...
                    </sp-menu-item>
                    <sp-menu-item value="item-5">Save selection</sp-menu-item>
                    <sp-menu-item value="item-1">Deselect</sp-menu-item>
                    <sp-menu-item value="item-2">Select inverse</sp-menu-item>
                    <sp-menu-item value="item-3">Feather...</sp-menu-item>
                    <sp-menu-item value="item-4">
                        Select and mask...
                    </sp-menu-item>
                    <sp-menu-item value="item-5">Save selection</sp-menu-item>
                    <sp-menu-item value="item-1">Deselect</sp-menu-item>
                    <sp-menu-item value="item-2">Select inverse</sp-menu-item>
                    <sp-menu-item value="item-3">Feather...</sp-menu-item>
                    <sp-menu-item value="item-4">
                        Select and mask...
                    </sp-menu-item>
                    <sp-menu-item value="item-5">Save selection</sp-menu-item>
                    <sp-menu-item value="item-1">Deselect</sp-menu-item>
                    <sp-menu-item value="item-2">Select inverse</sp-menu-item>
                    <sp-menu-item value="item-3">Feather...</sp-menu-item>
                    <sp-menu-item value="item-4">
                        Select and mask...
                    </sp-menu-item>
                    <sp-menu-item value="item-5">Save selection</sp-menu-item>
                    <sp-menu-item value="item-1">Deselect</sp-menu-item>
                    <sp-menu-item value="item-2">Select inverse</sp-menu-item>
                    <sp-menu-item value="item-3">Feather...</sp-menu-item>
                    <sp-menu-item value="item-4">
                        Select and mask...
                    </sp-menu-item>
                    <sp-menu-item value="item-5">Save selection</sp-menu-item>
                    <sp-menu-item value="item-1">Deselect</sp-menu-item>
                    <sp-menu-item value="item-2">Select inverse</sp-menu-item>
                    <sp-menu-item value="item-3">Feather...</sp-menu-item>
                    <sp-menu-item value="item-4">
                        Select and mask...
                    </sp-menu-item>
                    <sp-menu-item value="item-5">Save selection</sp-menu-item>
                    <sp-menu-item value="item-1">Deselect</sp-menu-item>
                    <sp-menu-item value="item-2">Select inverse</sp-menu-item>
                    <sp-menu-item value="item-3">Feather...</sp-menu-item>
                    <sp-menu-item value="item-4">
                        Select and mask...
                    </sp-menu-item>
                    <sp-menu-item value="item-5">Save selection</sp-menu-item>
                    <sp-menu-item value="item-1">Deselect</sp-menu-item>
                    <sp-menu-item value="item-2">Select inverse</sp-menu-item>
                    <sp-menu-item value="item-3">Feather...</sp-menu-item>
                    <sp-menu-item value="item-4">
                        Select and mask...
                    </sp-menu-item>
                    <sp-menu-item value="item-5">Save selection</sp-menu-item>
                </div>
            </sp-menu-item>
        </sp-action-menu>
    `;customRootSubmenu.swc_vrt={skip:!0};const __namedExportsOrder=["submenu","contextMenu","customRootSubmenu","customRootSubmenuWithScroll"];submenu.parameters={...submenu.parameters,docs:{...submenu.parameters?.docs,source:{originalSource:'() => {\n  const getValueEls = () => {\n    return {\n      root: document.querySelector("#root-value"),\n      first: document.querySelector("#first-value"),\n      second: document.querySelector("#second-value")\n    };\n  };\n  const clearValues = () => {\n    const valueEls = getValueEls();\n    valueEls.root.textContent = "";\n    valueEls.first.textContent = "";\n    valueEls.second.textContent = "";\n  };\n  const handleRootChange = event => {\n    const valueEls = getValueEls();\n    valueEls.root.textContent = event.target.value;\n  };\n  const handleFirstDescendantChange = event => {\n    const valueEls = getValueEls();\n    valueEls.first.textContent = event.target.selected[0] || "";\n  };\n  const handleSecondDescendantChange = event => {\n    const valueEls = getValueEls();\n    valueEls.second.textContent = event.target.selected[0] || "";\n  };\n  return html`\n        <sp-action-menu\n            label="More Actions"\n            @change=${handleRootChange}\n            @sp-opened=${clearValues}\n        >\n            <sp-icon-show-menu slot="icon"></sp-icon-show-menu>\n            <sp-menu-group\n                @change=${() => console.log("group change")}\n                role="none"\n            >\n                <span slot="header">New York</span>\n                <sp-menu-item>Bronx</sp-menu-item>\n                <sp-menu-item id="submenu-item-1">\n                    Brooklyn\n                    <sp-menu\n                        slot="submenu"\n                        @change=${handleFirstDescendantChange}\n                    >\n                        <sp-menu-item id="submenu-item-2">\n                            Ft. Greene\n                            <sp-menu\n                                slot="submenu"\n                                @change=${handleSecondDescendantChange}\n                            >\n                                <sp-menu-item>S. Oxford St</sp-menu-item>\n                                <sp-menu-item>S. Portland Ave</sp-menu-item>\n                                <sp-menu-item>S. Elliot Pl</sp-menu-item>\n                            </sp-menu>\n                        </sp-menu-item>\n                        <sp-menu-item disabled>Park Slope</sp-menu-item>\n                        <sp-menu-item>Williamsburg</sp-menu-item>\n                    </sp-menu>\n                </sp-menu-item>\n                <sp-menu-item>\n                    Manhattan\n                    <sp-menu\n                        slot="submenu"\n                        @change=${handleFirstDescendantChange}\n                    >\n                        <sp-menu-item disabled>SoHo</sp-menu-item>\n                        <sp-menu-item>\n                            Union Square\n                            <sp-menu\n                                slot="submenu"\n                                @change=${handleSecondDescendantChange}\n                            >\n                                <sp-menu-item>14th St</sp-menu-item>\n                                <sp-menu-item>Broadway</sp-menu-item>\n                                <sp-menu-item>Park Ave</sp-menu-item>\n                            </sp-menu>\n                        </sp-menu-item>\n                        <sp-menu-item>Upper East Side</sp-menu-item>\n                    </sp-menu>\n                </sp-menu-item>\n                <sp-menu-item disabled>\n                    Queens\n                    <sp-menu slot="submenu">\n                        <sp-menu-item>\n                            You shouldn\'t be able to see this!\n                        </sp-menu-item>\n                        <sp-menu-item>Forest Hills</sp-menu-item>\n                        <sp-menu-item>Jamaica</sp-menu-item>\n                    </sp-menu>\n                </sp-menu-item>\n            </sp-menu-group>\n        </sp-action-menu>\n        <div>\n            Root value:\n            <span id="root-value"></span>\n            <br />\n            First descendant value:\n            <span id="first-value"></span>\n            <br />\n            Second descendant value:\n            <span id="second-value"></span>\n            <br />\n        </div>\n    `;\n}',...submenu.parameters?.docs?.source}}},contextMenu.parameters={...contextMenu.parameters,docs:{...contextMenu.parameters?.docs,source:{originalSource:'() => {\n  const contextmenu = async event => {\n    event.preventDefault();\n    const virtualTrigger = new VirtualTrigger(event.clientX, event.clientY);\n    const overlay = document.querySelector("sp-overlay");\n    clearValues();\n    overlay.triggerElement = virtualTrigger;\n    overlay.willPreventClose = true;\n    overlay.type = "auto";\n    overlay.placement = "right-start";\n    overlay.open = true;\n  };\n  const getValueEls = () => {\n    return {\n      root: document.querySelector("#root-value"),\n      first: document.querySelector("#first-value")\n    };\n  };\n  const clearValues = () => {\n    const valueEls = getValueEls();\n    valueEls.root.textContent = "";\n    valueEls.first.textContent = "";\n  };\n  const handleRootChange = event => {\n    var _a;\n    const valueEls = getValueEls();\n    valueEls.root.textContent = event.target.value;\n    (_a = event.target.parentElement) == null ? void 0 : _a.dispatchEvent(new Event("close", {\n      bubbles: true\n    }));\n  };\n  const handleFirstDescendantChange = event => {\n    const valueEls = getValueEls();\n    valueEls.first.textContent = event.target.selected[0] || "";\n  };\n  return html`\n        <style>\n            .app-root {\n                position: absolute;\n                inset: 0;\n            }\n            active-overlay::part(theme) {\n                --swc-menu-width: 200px;\n            }\n        </style>\n        <div class="app-root" @contextmenu=${contextmenu}>\n            <div>\n                Root value:\n                <span id="root-value"></span>\n                <br />\n                First descendant value:\n                <span id="first-value"></span>\n                <br />\n            </div>\n        </div>\n        <sp-overlay>\n            <sp-popover\n                style="max-width: 33vw;"\n                @click=${event => {\n    var _a;\n    return (_a = event.target) == null ? void 0 : _a.dispatchEvent(new Event("close", {\n      bubbles: true\n    }));\n  }}\n            >\n                <sp-menu @change=${handleRootChange}>\n                    <sp-menu-group>\n                        <span slot="header">Options</span>\n                        <sp-menu-item>\n                            Copy\n                            <span slot="value">⌘​S</span>\n                        </sp-menu-item>\n                        <sp-menu-item>\n                            Paste\n                            <span slot="value">⌘​P</span>\n                        </sp-menu-item>\n                        <sp-menu-item>\n                            Cut\n                            <span slot="value">⌘​X</span>\n                        </sp-menu-item>\n                        <sp-menu-divider></sp-menu-divider>\n                        <sp-menu-item>\n                            Select layer\n                            <sp-menu\n                                slot="submenu"\n                                selects="single"\n                                @change=${handleFirstDescendantChange}\n                            >\n                                <sp-menu-item selected>Ellipse 1</sp-menu-item>\n                                <sp-menu-item>Rectangle</sp-menu-item>\n                            </sp-menu>\n                        </sp-menu-item>\n                        <sp-menu-item>\n                            Group\n                            <span slot="value">⌘​G</span>\n                        </sp-menu-item>\n                        <sp-menu-item>\n                            Unlock\n                            <span slot="value">⌘​L</span>\n                        </sp-menu-item>\n                        <sp-menu-divider></sp-menu-divider>\n                        <sp-menu-item>\n                            Bring to front\n                            <span slot="value">⇧​⌘​​]</span>\n                        </sp-menu-item>\n                        <sp-menu-item>\n                            Bring forward\n                            <span slot="value">⌘​​]</span>\n                        </sp-menu-item>\n                        <sp-menu-item>\n                            Send backward\n                            <span slot="value">⌘​​[</span>\n                        </sp-menu-item>\n                        <sp-menu-item>\n                            Send to back\n                            <span slot="value">⇧​⌘​​[</span>\n                        </sp-menu-item>\n                        <sp-menu-divider></sp-menu-divider>\n                        <sp-menu-item>\n                            Delete\n                            <span slot="value">DEL</span>\n                        </sp-menu-item>\n                    </sp-menu-group>\n                </sp-menu>\n            </sp-popover>\n        </sp-overlay>\n    `;\n}',...contextMenu.parameters?.docs?.source}}},customRootSubmenu.parameters={...customRootSubmenu.parameters,docs:{...customRootSubmenu.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-action-menu label="More Actions">\n            <sp-menu-item>Bronx</sp-menu-item>\n            <sp-menu-item id="submenu-item-1">\n                Brooklyn\n                <div role="menuitem" slot="submenu" style="padding: 12px">\n                    <img\n                        src="https://placekitten.com/200/200"\n                        alt="Kitten"\n                        style="width: 100%; height: auto; border-radius: 4px"\n                    />\n                    <p>I am an arbitrary content in submenu</p>\n                </div>\n            </sp-menu-item>\n        </sp-action-menu>\n    `;\n}',...customRootSubmenu.parameters?.docs?.source}}},customRootSubmenuWithScroll.parameters={...customRootSubmenuWithScroll.parameters,docs:{...customRootSubmenuWithScroll.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-action-menu label="More Actions">\n            <sp-menu-item>Bronx</sp-menu-item>\n            <sp-menu-item id="submenu-item-1">\n                Brooklyn\n                <div role="menuitem" slot="submenu" style="padding: 12px">\n                    <sp-menu-item>Additional options</sp-menu-item>\n                    <sp-menu-item>Available on request</sp-menu-item>\n                    <sp-menu-item value="item-1">Deselect</sp-menu-item>\n                    <sp-menu-item value="item-2">Select inverse</sp-menu-item>\n                    <sp-menu-item value="item-3">Feather...</sp-menu-item>\n                    <sp-menu-item value="item-4">\n                        Select and mask...\n                    </sp-menu-item>\n                    <sp-menu-item value="item-5">Save selection</sp-menu-item>\n                    <sp-menu-item value="item-1">Deselect</sp-menu-item>\n                    <sp-menu-item value="item-2">Select inverse</sp-menu-item>\n                    <sp-menu-item value="item-3">Feather...</sp-menu-item>\n                    <sp-menu-item value="item-4">\n                        Select and mask...\n                    </sp-menu-item>\n                    <sp-menu-item value="item-5">Save selection</sp-menu-item>\n                    <sp-menu-item value="item-1">Deselect</sp-menu-item>\n                    <sp-menu-item value="item-2">Select inverse</sp-menu-item>\n                    <sp-menu-item value="item-3">Feather...</sp-menu-item>\n                    <sp-menu-item value="item-4">\n                        Select and mask...\n                    </sp-menu-item>\n                    <sp-menu-item value="item-5">Save selection</sp-menu-item>\n                    <sp-menu-item value="item-1">Deselect</sp-menu-item>\n                    <sp-menu-item value="item-2">Select inverse</sp-menu-item>\n                    <sp-menu-item value="item-3">Feather...</sp-menu-item>\n                    <sp-menu-item value="item-4">\n                        Select and mask...\n                    </sp-menu-item>\n                    <sp-menu-item value="item-5">Save selection</sp-menu-item>\n                    <sp-menu-item value="item-1">Deselect</sp-menu-item>\n                    <sp-menu-item value="item-2">Select inverse</sp-menu-item>\n                    <sp-menu-item value="item-3">Feather...</sp-menu-item>\n                    <sp-menu-item value="item-4">\n                        Select and mask...\n                    </sp-menu-item>\n                    <sp-menu-item value="item-5">Save selection</sp-menu-item>\n                    <sp-menu-item value="item-1">Deselect</sp-menu-item>\n                    <sp-menu-item value="item-2">Select inverse</sp-menu-item>\n                    <sp-menu-item value="item-3">Feather...</sp-menu-item>\n                    <sp-menu-item value="item-4">\n                        Select and mask...\n                    </sp-menu-item>\n                    <sp-menu-item value="item-5">Save selection</sp-menu-item>\n                    <sp-menu-item value="item-1">Deselect</sp-menu-item>\n                    <sp-menu-item value="item-2">Select inverse</sp-menu-item>\n                    <sp-menu-item value="item-3">Feather...</sp-menu-item>\n                    <sp-menu-item value="item-4">\n                        Select and mask...\n                    </sp-menu-item>\n                    <sp-menu-item value="item-5">Save selection</sp-menu-item>\n                    <sp-menu-item value="item-1">Deselect</sp-menu-item>\n                    <sp-menu-item value="item-2">Select inverse</sp-menu-item>\n                    <sp-menu-item value="item-3">Feather...</sp-menu-item>\n                    <sp-menu-item value="item-4">\n                        Select and mask...\n                    </sp-menu-item>\n                    <sp-menu-item value="item-5">Save selection</sp-menu-item>\n                    <sp-menu-item value="item-1">Deselect</sp-menu-item>\n                    <sp-menu-item value="item-2">Select inverse</sp-menu-item>\n                    <sp-menu-item value="item-3">Feather...</sp-menu-item>\n                    <sp-menu-item value="item-4">\n                        Select and mask...\n                    </sp-menu-item>\n                    <sp-menu-item value="item-5">Save selection</sp-menu-item>\n                    <sp-menu-item value="item-1">Deselect</sp-menu-item>\n                    <sp-menu-item value="item-2">Select inverse</sp-menu-item>\n                    <sp-menu-item value="item-3">Feather...</sp-menu-item>\n                    <sp-menu-item value="item-4">\n                        Select and mask...\n                    </sp-menu-item>\n                    <sp-menu-item value="item-5">Save selection</sp-menu-item>\n                    <sp-menu-item value="item-1">Deselect</sp-menu-item>\n                    <sp-menu-item value="item-2">Select inverse</sp-menu-item>\n                    <sp-menu-item value="item-3">Feather...</sp-menu-item>\n                    <sp-menu-item value="item-4">\n                        Select and mask...\n                    </sp-menu-item>\n                    <sp-menu-item value="item-5">Save selection</sp-menu-item>\n                </div>\n            </sp-menu-item>\n        </sp-action-menu>\n    `;\n}',...customRootSubmenuWithScroll.parameters?.docs?.source}}}},"./packages/overlay/src/OverlayTrigger.dev.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{N:function(){return OverlayTrigger}});var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js");__webpack_require__("./packages/overlay/sp-overlay.dev.js");var overlay_trigger_css=index_dev.AH`
    slot[name=longpress-describedby-descriptor]{display:none}
`,__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__decorateClass=(decorators,target,key,kind)=>{for(var decorator,result=kind>1?void 0:kind?__getOwnPropDesc(target,key):target,i=decorators.length-1;i>=0;i--)(decorator=decorators[i])&&(result=(kind?decorator(target,key,result):decorator(result))||result);return kind&&result&&__defProp(target,key,result),result};class OverlayTrigger extends index_dev.wG{constructor(){super(...arguments),this.offset=6,this.disabled=!1,this.receivesFocus="auto",this.clickContent=[],this.longpressContent=[],this.hoverContent=[],this.targetContent=[]}static get styles(){return[overlay_trigger_css]}getAssignedElementsFromSlot(slot){return slot.assignedElements({flatten:!0})}handleTriggerContent(event){this.targetContent=this.getAssignedElementsFromSlot(event.target)}handleSlotContent(event){switch(event.target.name){case"click-content":this.clickContent=this.getAssignedElementsFromSlot(event.target);break;case"longpress-content":this.longpressContent=this.getAssignedElementsFromSlot(event.target);break;case"hover-content":this.hoverContent=this.getAssignedElementsFromSlot(event.target)}}handleBeforetoggle(event){const{target:target}=event;let type;if(target===this.clickOverlayElement)type="click";else if(target===this.longpressOverlayElement)type="longpress";else{if(target!==this.hoverOverlayElement)return;type="hover"}"open"===event.newState?this.open=type:this.open===type&&(this.open=void 0)}update(changes){var _a,_b,_c,_d,_e,_f;changes.has("clickContent")&&(this.clickPlacement=(null==(_a=this.clickContent[0])?void 0:_a.getAttribute("placement"))||(null==(_b=this.clickContent[0])?void 0:_b.getAttribute("direction"))||void 0),changes.has("hoverContent")&&(this.hoverPlacement=(null==(_c=this.hoverContent[0])?void 0:_c.getAttribute("placement"))||(null==(_d=this.hoverContent[0])?void 0:_d.getAttribute("direction"))||void 0),changes.has("longpressContent")&&(this.longpressPlacement=(null==(_e=this.longpressContent[0])?void 0:_e.getAttribute("placement"))||(null==(_f=this.longpressContent[0])?void 0:_f.getAttribute("direction"))||void 0),super.update(changes)}renderSlot(name){return index_dev.qy`
            <slot name=${name} @slotchange=${this.handleSlotContent}></slot>
        `}renderClickOverlay(){var _a;const slot=this.renderSlot("click-content"),clickOverlay=index_dev.qy`
            <sp-overlay
                id="click-overlay"
                ?disabled=${this.disabled||!this.clickContent.length}
                ?open=${"click"===this.open&&!!this.clickContent.length}
                .offset=${this.offset}
                .placement=${this.clickPlacement||this.placement}
                .triggerElement=${this.targetContent[0]}
                .triggerInteraction=${"click"}
                .type=${this.type||"auto"}
                @beforetoggle=${this.handleBeforetoggle}
                .receivesFocus=${this.receivesFocus}
            >
                ${slot}
            </sp-overlay>
        `;return(null==(_a=this.triggeredBy)?void 0:_a.includes("click"))||this.clickContent.length?clickOverlay:slot}renderHoverOverlay(){var _a;const slot=this.renderSlot("hover-content"),hoverOverlay=index_dev.qy`
            <sp-overlay
                id="hover-overlay"
                ?open=${"hover"===this.open&&!!this.hoverContent.length}
                ?disabled=${this.disabled||!this.hoverContent.length||!!this.open&&"hover"!==this.open}
                .offset=${this.offset}
                .placement=${this.hoverPlacement||this.placement}
                .triggerElement=${this.targetContent[0]}
                .triggerInteraction=${"hover"}
                .type=${"hint"}
                @beforetoggle=${this.handleBeforetoggle}
                .receivesFocus=${this.receivesFocus}
            >
                ${slot}
            </sp-overlay>
        `;return(null==(_a=this.triggeredBy)?void 0:_a.includes("hover"))||this.hoverContent.length?hoverOverlay:slot}renderLongpressOverlay(){var _a;const slot=this.renderSlot("longpress-content"),longpressOverlay=index_dev.qy`
            <sp-overlay
                id="longpress-overlay"
                ?disabled=${this.disabled||!this.longpressContent.length}
                ?open=${"longpress"===this.open&&!!this.longpressContent.length}
                .offset=${this.offset}
                .placement=${this.longpressPlacement||this.placement}
                .triggerElement=${this.targetContent[0]}
                .triggerInteraction=${"longpress"}
                .type=${"auto"}
                @beforetoggle=${this.handleBeforetoggle}
                .receivesFocus=${this.receivesFocus}
            >
                ${slot}
            </sp-overlay>
            <slot name="longpress-describedby-descriptor"></slot>
        `;return(null==(_a=this.triggeredBy)?void 0:_a.includes("longpress"))||this.longpressContent.length?longpressOverlay:slot}render(){return index_dev.qy`
            <slot
                id="trigger"
                name="trigger"
                @slotchange=${this.handleTriggerContent}
            ></slot>
            ${[this.renderClickOverlay(),this.renderHoverOverlay(),this.renderLongpressOverlay()]}
        `}updated(changedProperties){if(super.updated(changedProperties),!this.triggeredBy){const issues=["You have not specified the `triggeredBy` property. For optimal performance, consider explicitly declaring which overlay types you plan to use.",'Example: triggered-by="click hover"',"This helps avoid unnecessary DOM operations and potential race conditions."];window.__swc.warn(this,"Performance optimization available for <overlay-trigger>:","https://opensource.adobe.com/spectrum-web-components/components/overlay-trigger/#performance-optimization",{issues:issues})}this.disabled&&changedProperties.has("disabled")&&(this.open=void 0)}async getUpdateComplete(){return await super.getUpdateComplete()}}__decorateClass([(0,decorators_dev.MZ)({attribute:"triggered-by"})],OverlayTrigger.prototype,"triggeredBy",2),__decorateClass([(0,decorators_dev.MZ)({reflect:!0})],OverlayTrigger.prototype,"placement",2),__decorateClass([(0,decorators_dev.MZ)()],OverlayTrigger.prototype,"type",2),__decorateClass([(0,decorators_dev.MZ)({type:Number})],OverlayTrigger.prototype,"offset",2),__decorateClass([(0,decorators_dev.MZ)({reflect:!0})],OverlayTrigger.prototype,"open",2),__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],OverlayTrigger.prototype,"disabled",2),__decorateClass([(0,decorators_dev.MZ)({attribute:"receives-focus"})],OverlayTrigger.prototype,"receivesFocus",2),__decorateClass([(0,decorators_dev.wk)()],OverlayTrigger.prototype,"clickContent",2),__decorateClass([(0,decorators_dev.wk)()],OverlayTrigger.prototype,"longpressContent",2),__decorateClass([(0,decorators_dev.wk)()],OverlayTrigger.prototype,"hoverContent",2),__decorateClass([(0,decorators_dev.wk)()],OverlayTrigger.prototype,"targetContent",2),__decorateClass([(0,decorators_dev.P)("#click-overlay",!0)],OverlayTrigger.prototype,"clickOverlayElement",2),__decorateClass([(0,decorators_dev.P)("#longpress-overlay",!0)],OverlayTrigger.prototype,"longpressOverlayElement",2),__decorateClass([(0,decorators_dev.P)("#hover-overlay",!0)],OverlayTrigger.prototype,"hoverOverlayElement",2)},"./packages/overlay/src/index.dev.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{hJ:function(){return Overlay_dev.Overlay},ec:function(){return VirtualTrigger_dev.e},F9:function(){return openOverlay},hZ:function(){return overlay_trigger_directive_dev.h}});var Overlay_dev=__webpack_require__("./packages/overlay/src/Overlay.dev.js");__webpack_require__("./packages/overlay/src/OverlayTrigger.dev.js");var VirtualTrigger_dev=__webpack_require__("./packages/overlay/src/VirtualTrigger.dev.js");async function openOverlay(triggerOrContent,interactionOrOptions,content,optionsV1){return Overlay_dev.Overlay.open(triggerOrContent,interactionOrOptions,content,optionsV1)}var overlay_trigger_directive_dev=__webpack_require__("./packages/overlay/src/overlay-trigger-directive.dev.js")},"./packages/overlay/src/overlay-trigger-directive.dev.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{h:function(){return trigger}});var _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./tools/base/src/index.dev.js"),_spectrum_web_components_base_src_async_directive_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./tools/base/src/async-directive.dev.js"),_strategies_dev_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/overlay/src/strategies.dev.js"),_slottable_request_event_dev_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./packages/overlay/src/slottable-request-event.dev.js"),_slottable_request_directive_dev_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./packages/overlay/src/slottable-request-directive.dev.js"),_AbstractOverlay_dev_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./packages/overlay/src/AbstractOverlay.dev.js"),_InteractionController_dev_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./packages/overlay/src/InteractionController.dev.js");class OverlayTriggerDirective extends _slottable_request_directive_dev_js__WEBPACK_IMPORTED_MODULE_4__.V{constructor(){super(...arguments),this.defaultOptions={triggerInteraction:"click",overlayOptions:{type:"auto",offset:0}},this.options={...this.defaultOptions.overlayOptions}}render(_template,_options){return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.s6}update(part,[template,options]){var _a,_b,_c,_d;this.options={...this.defaultOptions.overlayOptions,...null==options?void 0:options.overlayOptions},this.insertionOptions=null==options?void 0:options.insertionOptions,this.template=template,this.host=null==(_a=part.options)?void 0:_a.host;let newTarget=!1;const triggerInteraction=(null==options?void 0:options.triggerInteraction)||this.defaultOptions.triggerInteraction,newStrategy=_InteractionController_dev_js__WEBPACK_IMPORTED_MODULE_6__.G4[null==(_b=this.strategy)?void 0:_b.type]!==triggerInteraction;this.target!==part.element&&(this.target=part.element,newTarget=!0),(newTarget||newStrategy)&&(null==(_c=this.strategy)||_c.abort(),this.strategy=new _strategies_dev_js__WEBPACK_IMPORTED_MODULE_2__.W[triggerInteraction](this.target,{isPersistent:!0,handleOverlayReady:overlay=>{this.listenerHost=this.overlay=overlay,this.init()}})),this.strategy.open=null!=(_d=null==options?void 0:options.open)&&_d}handleSlottableRequest(event){var _a,_b;if(event.target!==event.currentTarget)return;const willRemoveSlottable=event.data===_slottable_request_event_dev_js__WEBPACK_IMPORTED_MODULE_3__.g,options={};if(this.host&&(options.host=this.host),(0,_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.XX)(willRemoveSlottable?void 0:this.template(),this.overlay,options),willRemoveSlottable)this.overlay.remove();else{_AbstractOverlay_dev_js__WEBPACK_IMPORTED_MODULE_5__.HR.applyOptions(this.overlay,{...this.options,trigger:this.target});const insertionEl="function"==typeof(null==(_a=this.insertionOptions)?void 0:_a.el)?this.insertionOptions.el():(null==(_b=this.insertionOptions)?void 0:_b.el)||this.target,{where:where="afterend"}=this.insertionOptions||{};insertionEl.insertAdjacentElement(where,this.overlay)}}disconnected(){var _a;this.overlay&&(this.overlay.open=!1,this.overlay.remove()),null==(_a=this.strategy)||_a.clearOverlay(),super.disconnected()}reconnected(){}}const trigger=(0,_spectrum_web_components_base_src_async_directive_js__WEBPACK_IMPORTED_MODULE_1__.u$)(OverlayTriggerDirective)},"./packages/overlay/src/slottable-request-directive.dev.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{V:function(){return SlottableRequestDirective},i:function(){return slottableRequest}});var _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./tools/base/src/index.dev.js"),_spectrum_web_components_base_src_async_directive_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./tools/base/src/async-directive.dev.js"),_slottable_request_event_dev_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/overlay/src/slottable-request-event.dev.js");class SlottableRequestDirective extends _spectrum_web_components_base_src_async_directive_js__WEBPACK_IMPORTED_MODULE_1__.Kq{render(_template){return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.s6}update(part,[template]){this.template=template,this.target!==part.element&&(this.target=part.element,this.renderBefore=this.target.children[0]),this.listenerHost=this.target,this.init()}handleSlottableRequest(event){if(event.target!==event.currentTarget)return;const willRemoveSlottable=event.data===_slottable_request_event_dev_js__WEBPACK_IMPORTED_MODULE_2__.g;(0,_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.XX)(willRemoveSlottable?void 0:this.template(),this.target,{renderBefore:this.renderBefore})}init(){var _a,_b;null==(_a=this.listeners)||_a.abort(),this.listeners=new AbortController;const{signal:signal}=this.listeners;this.listenerHost.addEventListener("slottable-request",event=>this.handleSlottableRequest(event),{signal:signal}),(null==(_b=window.__swc)?void 0:_b.warn)&&window.__swc.warn(void 0,'⚠️  WARNING ⚠️ : The Overlay Trigger Directive is experimental and there is no guarantees behind its usage in an application!! Its API and presence within the library could be changed at anytime. See "sp-overlay" or "Overlay.open()" for a stable API for overlaying content on your application.',"https://opensource.adobe.com/spectrum-web-components/components/overlay",{level:"high",type:"api"})}disconnected(){var _a;null==(_a=this.listeners)||_a.abort()}reconnected(){this.init()}}const slottableRequest=(0,_spectrum_web_components_base_src_async_directive_js__WEBPACK_IMPORTED_MODULE_1__.u$)(SlottableRequestDirective)},"./packages/popover/sp-popover.dev.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__);var _src_Popover_dev_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/popover/src/Popover.dev.js");(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-popover",_src_Popover_dev_js__WEBPACK_IMPORTED_MODULE_0__.A)},"./packages/popover/src/Popover.dev.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:function(){return Popover}});var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js");var popover_css=index_dev.AH`
    :host{pointer-events:none;visibility:hidden;opacity:0;transition:transform .13s ease-in-out,opacity .13s ease-in-out,visibility 0s linear .13s;transition:transform var(--mod-overlay-animation-duration,var(--spectrum-animation-duration-100,.13s))ease-in-out,opacity var(--mod-overlay-animation-duration,var(--spectrum-animation-duration-100,.13s))ease-in-out,visibility 0s linear var(--mod-overlay-animation-duration,var(--spectrum-animation-duration-100,.13s))}:host([open]){pointer-events:auto;visibility:visible;opacity:1;transition-delay:0s;transition-delay:var(--mod-overlay-animation-duration-opened,var(--spectrum-animation-duration-0,0s))}:host{--spectrum-popover-animation-distance:var(--spectrum-spacing-100);--spectrum-popover-background-color:var(--spectrum-background-layer-2-color);--spectrum-popover-border-color:var(--spectrum-gray-400);--spectrum-popover-content-area-spacing-vertical:var(--spectrum-popover-top-to-content-area);--spectrum-popover-shadow-horizontal:var(--spectrum-drop-shadow-x);--spectrum-popover-shadow-vertical:var(--spectrum-drop-shadow-y);--spectrum-popover-shadow-blur:var(--spectrum-drop-shadow-blur);--spectrum-popover-shadow-color:var(--spectrum-drop-shadow-color);--spectrum-popover-corner-radius:var(--spectrum-corner-radius-100);--spectrum-popover-pointer-width:var(--spectrum-popover-tip-width);--spectrum-popover-pointer-height:var(--spectrum-popover-tip-height);--spectrum-popover-pointer-edge-offset:calc(var(--spectrum-corner-radius-100) + var(--spectrum-popover-tip-width)/2);--spectrum-popover-pointer-edge-spacing:calc(var(--spectrum-popover-pointer-edge-offset) - var(--spectrum-popover-tip-width)/2)}@media (forced-colors:active){:host{--highcontrast-popover-border-color:CanvasText}}:host{--spectrum-popover-filter:drop-shadow(var(--mod-popover-shadow-horizontal,var(--spectrum-popover-shadow-horizontal))var(--mod-popover-shadow-vertical,var(--spectrum-popover-shadow-vertical))var(--mod-popover-shadow-blur,var(--spectrum-popover-shadow-blur))var(--mod-popover-shadow-color,var(--spectrum-popover-shadow-color)));box-sizing:border-box;padding:var(--mod-popover-content-area-spacing-vertical,var(--spectrum-popover-content-area-spacing-vertical))0;border-radius:var(--mod-popover-corner-radius,var(--spectrum-popover-corner-radius));border-style:solid;border-color:var(--highcontrast-popover-border-color,var(--mod-popover-border-color,var(--spectrum-popover-border-color)));border-width:var(--mod-popover-border-width,var(--spectrum-popover-border-width));background-color:var(--mod-popover-background-color,var(--spectrum-popover-background-color));filter:var(--mod-popover-filter,var(--spectrum-popover-filter));outline:none;flex-direction:column;display:inline-flex;position:absolute}:host([tip]){overflow:visible}:host([tip]) #tip .triangle{stroke-linecap:square;stroke-linejoin:miter;fill:var(--mod-popover-background-color,var(--spectrum-popover-background-color));stroke:var(--highcontrast-popover-border-color,var(--mod-popover-border-color,var(--spectrum-popover-border-color)));stroke-width:var(--mod-popover-border-width,var(--spectrum-popover-border-width))}*{--mod-popover-filter:none}:host([tip]) .spectrum-Popover--top-end,:host([tip]) .spectrum-Popover--top-left,:host([tip]) .spectrum-Popover--top-right,:host([tip]) .spectrum-Popover--top-start,:host([placement*=top][tip]){margin-block-end:calc(var(--mod-popover-pointer-height,var(--spectrum-popover-pointer-height)) - var(--mod-popover-border-width,var(--spectrum-popover-border-width)))}:host([open]) .spectrum-Popover--top-end,:host([open]) .spectrum-Popover--top-left,:host([open]) .spectrum-Popover--top-right,:host([open]) .spectrum-Popover--top-start,:host([placement*=top][open]){transform:translateY(calc(var(--mod-popover-animation-distance,var(--spectrum-popover-animation-distance))*-1))translateZ(0)}:host([tip]) .spectrum-Popover--bottom-end,:host([tip]) .spectrum-Popover--bottom-left,:host([tip]) .spectrum-Popover--bottom-right,:host([tip]) .spectrum-Popover--bottom-start,:host([placement*=bottom][tip]){margin-block-start:calc(var(--mod-popover-pointer-height,var(--spectrum-popover-pointer-height)) - var(--mod-popover-border-width,var(--spectrum-popover-border-width)))}:host([open]) .spectrum-Popover--bottom-end,:host([open]) .spectrum-Popover--bottom-left,:host([open]) .spectrum-Popover--bottom-right,:host([open]) .spectrum-Popover--bottom-start,:host([placement*=bottom][open]){transform:translateY(var(--mod-popover-animation-distance,var(--spectrum-popover-animation-distance)))translateZ(0)}:host([tip]) .spectrum-Popover--right-bottom,:host([tip]) .spectrum-Popover--right-top,:host([placement*=right][tip]){margin-left:calc(var(--mod-popover-pointer-width,var(--spectrum-popover-pointer-width)) - var(--mod-popover-border-width,var(--spectrum-popover-border-width)))}:host([open]) .spectrum-Popover--right-bottom,:host([open]) .spectrum-Popover--right-top,:host([placement*=right][open]){transform:translateX(var(--mod-popover-animation-distance,var(--spectrum-popover-animation-distance)))translateZ(0)}:host([tip]) .spectrum-Popover--left-bottom,:host([tip]) .spectrum-Popover--left-top,:host([placement*=left][tip]){margin-right:calc(var(--mod-popover-pointer-width,var(--spectrum-popover-pointer-width)) - var(--mod-popover-border-width,var(--spectrum-popover-border-width)))}:host([open]) .spectrum-Popover--left-bottom,:host([open]) .spectrum-Popover--left-top,:host([placement*=left][open]){transform:translateX(calc(var(--mod-popover-animation-distance,var(--spectrum-popover-animation-distance))*-1))translateZ(0)}:host([tip]) .spectrum-Popover--start-bottom,:host([tip]) .spectrum-Popover--start-top,:host([tip]) .spectrum-Popover--start{margin-inline-end:calc(var(--mod-popover-pointer-width,var(--spectrum-popover-pointer-width)) - var(--mod-popover-border-width,var(--spectrum-popover-border-width)))}:host([open]) .spectrum-Popover--start-bottom,:host([open]) .spectrum-Popover--start-top,:host([open]) .spectrum-Popover--start{transform:translateX(calc(var(--mod-popover-animation-distance,var(--spectrum-popover-animation-distance))*-1))translateZ(0)}:host([open]) .spectrum-Popover--start-bottom:dir(rtl),:host([open]) .spectrum-Popover--start-top:dir(rtl),:host([open]) .spectrum-Popover--start:dir(rtl),:host([dir=rtl][open]) .spectrum-Popover--start-bottom,:host([dir=rtl][open]) .spectrum-Popover--start-top,:host([dir=rtl][open]) .spectrum-Popover--start{transform:translateX(var(--mod-popover-animation-distance,var(--spectrum-popover-animation-distance)))translateZ(0)}:host([tip]) .spectrum-Popover--end-bottom,:host([tip]) .spectrum-Popover--end-top,:host([tip]) .spectrum-Popover--end{margin-inline-start:calc(var(--mod-popover-pointer-width,var(--spectrum-popover-pointer-width)) - var(--mod-popover-border-width,var(--spectrum-popover-border-width)))}:host([open]) .spectrum-Popover--end-bottom,:host([open]) .spectrum-Popover--end-top,:host([open]) .spectrum-Popover--end{transform:translateX(var(--mod-popover-animation-distance,var(--spectrum-popover-animation-distance)))translateZ(0)}:host([open]) .spectrum-Popover--end-bottom:dir(rtl),:host([open]) .spectrum-Popover--end-top:dir(rtl),:host([open]) .spectrum-Popover--end:dir(rtl),:host([dir=rtl][open]) .spectrum-Popover--end-bottom,:host([dir=rtl][open]) .spectrum-Popover--end-top,:host([dir=rtl][open]) .spectrum-Popover--end{transform:translateX(calc(var(--mod-popover-animation-distance,var(--spectrum-popover-animation-distance))*-1))translateZ(0)}:host([tip]) #tip,:host([tip][placement*=bottom]) #tip,:host([tip]) .spectrum-Popover--bottom-end #tip,:host([tip]) .spectrum-Popover--bottom-left #tip,:host([tip]) .spectrum-Popover--bottom-right #tip,:host([tip]) .spectrum-Popover--bottom-start #tip,:host([tip][placement*=top]) #tip,:host([tip]) .spectrum-Popover--top-end #tip,:host([tip]) .spectrum-Popover--top-left #tip,:host([tip]) .spectrum-Popover--top-right #tip,:host([tip]) .spectrum-Popover--top-start #tip{inline-size:var(--mod-popover-pointer-width,var(--spectrum-popover-pointer-width));block-size:var(--mod-popover-pointer-height,var(--spectrum-popover-pointer-height));margin:auto;position:absolute;inset-block-start:100%;inset-inline:0;transform:translate(0)}:host([tip]) .spectrum-Popover--top-left #tip{inset-inline:var(--mod-popover-pointer-edge-spacing,var(--spectrum-popover-pointer-edge-spacing))auto}:host([tip]) .spectrum-Popover--top-right #tip{inset-inline:auto var(--mod-popover-pointer-edge-spacing,var(--spectrum-popover-pointer-edge-spacing))}:host([tip]) .spectrum-Popover--top-start #tip{margin-inline-start:var(--mod-popover-pointer-edge-spacing,var(--spectrum-popover-pointer-edge-spacing))}:host([tip]) .spectrum-Popover--top-end #tip{margin-inline-end:var(--mod-popover-pointer-edge-spacing,var(--spectrum-popover-pointer-edge-spacing))}:host([tip][placement*=bottom]) #tip,:host([tip]) .spectrum-Popover--bottom-end #tip,:host([tip]) .spectrum-Popover--bottom-left #tip,:host([tip]) .spectrum-Popover--bottom-right #tip,:host([tip]) .spectrum-Popover--bottom-start #tip{inset-block:auto 100%;transform:scaleY(-1)}:host([tip]) .spectrum-Popover--bottom-left #tip{inset-inline:var(--mod-popover-pointer-edge-spacing,var(--spectrum-popover-pointer-edge-spacing))auto}:host([tip]) .spectrum-Popover--bottom-right #tip{inset-inline:auto var(--mod-popover-pointer-edge-spacing,var(--spectrum-popover-pointer-edge-spacing))}:host([tip]) .spectrum-Popover--bottom-start #tip{margin-inline-start:var(--mod-popover-pointer-edge-spacing,var(--spectrum-popover-pointer-edge-spacing))}:host([tip]) .spectrum-Popover--bottom-end #tip{margin-inline-end:var(--mod-popover-pointer-edge-spacing,var(--spectrum-popover-pointer-edge-spacing))}:host([tip]) .spectrum-Popover--end #tip,:host([tip]) .spectrum-Popover--end-bottom #tip,:host([tip]) .spectrum-Popover--end-top #tip,:host([tip][placement*=left]) #tip,:host([tip]) .spectrum-Popover--left-bottom #tip,:host([tip]) .spectrum-Popover--left-top #tip,:host([tip][placement*=right]) #tip,:host([tip]) .spectrum-Popover--right-bottom #tip,:host([tip]) .spectrum-Popover--right-top #tip,:host([tip]) .spectrum-Popover--start #tip,:host([tip]) .spectrum-Popover--start-bottom #tip,:host([tip]) .spectrum-Popover--start-top #tip{inline-size:var(--mod-popover-pointer-height,var(--spectrum-popover-pointer-height));block-size:var(--mod-popover-pointer-width,var(--spectrum-popover-pointer-width));inset-block:0}:host([tip][placement*=left]) #tip,:host([tip]) .spectrum-Popover--left-bottom #tip,:host([tip]) .spectrum-Popover--left-top #tip{left:100%;right:auto}:host([tip][placement*=right]) #tip,:host([tip]) .spectrum-Popover--right-bottom #tip,:host([tip]) .spectrum-Popover--right-top #tip{left:auto;right:100%;transform:scaleX(-1)}:host([tip]) .spectrum-Popover--end-top #tip,:host([tip]) .spectrum-Popover--left-top #tip,:host([tip]) .spectrum-Popover--right-top #tip,:host([tip]) .spectrum-Popover--start-top #tip{inset-block:var(--mod-popover-pointer-edge-spacing,var(--spectrum-popover-pointer-edge-spacing))auto}:host([tip]) .spectrum-Popover--end-bottom #tip,:host([tip]) .spectrum-Popover--left-bottom #tip,:host([tip]) .spectrum-Popover--right-bottom #tip,:host([tip]) .spectrum-Popover--start-bottom #tip{inset-block:auto var(--mod-popover-pointer-edge-spacing,var(--spectrum-popover-pointer-edge-spacing))}:host([tip]) .spectrum-Popover--start #tip,:host([tip]) .spectrum-Popover--start-bottom #tip,:host([tip]) .spectrum-Popover--start-top #tip{margin-inline-start:100%}:host([tip]) .spectrum-Popover--start #tip:dir(rtl),:host([tip]) .spectrum-Popover--start-bottom #tip:dir(rtl),:host([tip]) .spectrum-Popover--start-top #tip:dir(rtl),:host([dir=rtl][tip]) .spectrum-Popover--start #tip,:host([dir=rtl][tip]) .spectrum-Popover--start-bottom #tip,:host([dir=rtl][tip]) .spectrum-Popover--start-top #tip{transform:none}:host([tip]) .spectrum-Popover--end #tip,:host([tip]) .spectrum-Popover--end-bottom #tip,:host([tip]) .spectrum-Popover--end-top #tip{margin-inline-end:100%;transform:scaleX(-1)}:host([tip]) .spectrum-Popover--end #tip:dir(rtl),:host([tip]) .spectrum-Popover--end-bottom #tip:dir(rtl),:host([tip]) .spectrum-Popover--end-top #tip:dir(rtl),:host([dir=rtl][tip]) .spectrum-Popover--end #tip,:host([dir=rtl][tip]) .spectrum-Popover--end-bottom #tip,:host([dir=rtl][tip]) .spectrum-Popover--end-top #tip{transform:scaleX(1)}:host{--spectrum-popover-border-width:var(--system-popover-border-width)}:host{min-width:min-content;max-width:100%;max-height:100%;inline-size:var(--mod-popover-inline-size);clip-path:none}::slotted(*){overscroll-behavior:contain}:host([placement*=left]) #tip[style],:host([placement*=right]) #tip[style]{inset-block-end:auto}:host([placement*=top]) #tip[style],:host([placement*=bottom]) #tip[style]{inset-inline-end:auto}.block,.inline{width:100%;height:100%;display:block}:host([placement*=left]) .block,:host([placement*=right]) .block,:host([placement*=top]) .inline,:host([placement*=bottom]) .inline{display:none}::slotted(.visually-hidden){clip:rect(0,0,0,0);clip-path:inset(50%);white-space:nowrap;border:0;width:1px;height:1px;margin:0 -1px -1px 0;padding:0;position:absolute;overflow:hidden}::slotted(sp-menu){margin:0}:host([dialog]){min-width:var(--mod-popover-dialog-min-width,var(--spectrum-popover-dialog-min-width,270px));padding:var(--mod-popover-dialog-padding,var(--spectrum-popover-dialog-padding,30px 29px))}:host([tip][placement]) #tip{height:auto}
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
        `}}__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],Popover.prototype,"open",2),__decorateClass([(0,decorators_dev.MZ)({reflect:!0})],Popover.prototype,"placement",2),__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],Popover.prototype,"tip",2),__decorateClass([(0,decorators_dev.P)("#tip")],Popover.prototype,"tipElement",2)},"./tools/base/src/async-directive.dev.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Kq:function(){return lit_async_directive_js__WEBPACK_IMPORTED_MODULE_0__.Kq},u$:function(){return lit_async_directive_js__WEBPACK_IMPORTED_MODULE_0__.u$}});var lit_async_directive_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../node_modules/lit/async-directive.js")}}]);
//# sourceMappingURL=menu-stories-submenu-stories.5b308c2d.iframe.bundle.js.map