"use strict";(self.webpackChunk_spectrum_web_components_1st_gen=self.webpackChunk_spectrum_web_components_1st_gen||[]).push([[4934],{"../node_modules/lit/async-directive.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Kq:function(){return lit_html_async_directive_js__WEBPACK_IMPORTED_MODULE_0__.Kq},u$:function(){return lit_html_async_directive_js__WEBPACK_IMPORTED_MODULE_0__.u$}});var lit_html_async_directive_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../node_modules/lit-html/development/async-directive.js")},"../node_modules/lit/html.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{s6:function(){return lit_html__WEBPACK_IMPORTED_MODULE_0__.s6}});var lit_html__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../node_modules/lit-html/development/lit-html.js")},"./packages/action-menu/sp-action-menu.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js"),directives_dev=__webpack_require__("./tools/base/src/directives.dev.js"),Picker_dev=__webpack_require__("./packages/picker/src/Picker.dev.js"),observe_slot_presence_dev=(__webpack_require__("./packages/action-button/sp-action-button.dev.js"),__webpack_require__("./tools/shared/src/observe-slot-presence.dev.js")),observe_slot_text_dev=__webpack_require__("./tools/shared/src/observe-slot-text.dev.js");__webpack_require__("./packages/icons-workflow/icons/sp-icon-more.js");var action_menu_css=index_dev.AH`
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
        `}update(changedProperties){changedProperties.has("invalid")&&(this.invalid=!1),super.update(changedProperties)}hasAccessibleLabel(){return!!this.label||!!this.getAttribute("aria-label")||!!this.getAttribute("aria-labelledby")||!!this.appliedLabel||this.hasLabel||this.labelOnly}warnNoLabel(){window.__swc.warn(this,`<${this.localName}> needs one of the following to be accessible:`,"https://opensource.adobe.com/spectrum-web-components/components/action-menu/#accessibility",{type:"accessibility",issues:[`an <sp-field-label> element with a \`for\` attribute referencing the \`id\` of the \`<${this.localName}>\`, or`,'value supplied to the "label" attribute, which will be displayed visually as placeholder text','text content supplied in a <span> with slot="label", or, text content supplied in a <span> with slot="label-only"',"which will also be displayed visually as placeholder text."]})}}__decorateClass([(0,decorators_dev.MZ)({type:String})],ActionMenu.prototype,"selects",2),__decorateClass([(0,decorators_dev.MZ)({reflect:!0,attribute:"static-color"})],ActionMenu.prototype,"staticColor",2),__decorateClass([(0,decorators_dev.wk)()],ActionMenu.prototype,"labelOnly",1),(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-action-menu",ActionMenu)},"./packages/breadcrumbs/stories/breadcrumbs.stories.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{AddItemsDynamic:function(){return AddItemsDynamic},Compact:function(){return Compact},Default:function(){return Default},Disabled:function(){return Disabled},Links:function(){return Links},ShowRoot:function(){return ShowRoot},__namedExportsOrder:function(){return __namedExportsOrder},default:function(){return breadcrumbs_stories},resizableBehavior:function(){return resizableBehavior}});var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),decorators_dev=(__webpack_require__("./packages/icons-workflow/icons/sp-icon-settings.js"),__webpack_require__("./tools/base/src/decorators.dev.js")),lit_helpers=__webpack_require__("./test/lit-helpers.js"),directives_dev=__webpack_require__("./tools/base/src/directives.dev.js"),focusable_dev=__webpack_require__("./tools/shared/src/focusable.dev.js"),like_anchor_dev=__webpack_require__("./tools/shared/src/like-anchor.dev.js"),spectrum_icon_chevron_css=__webpack_require__("./packages/icon/src/spectrum-icon-chevron.css.js");__webpack_require__("./packages/icons-ui/icons/sp-icon-chevron100.js");var breadcrumb_item_css=index_dev.AH`
    #separator{margin-block:var(--mod-breadcrumbs-icon-spacing-block,var(--spectrum-breadcrumbs-icon-spacing-block));margin-inline:var(--mod-breadcrumbs-separator-spacing-inline,var(--spectrum-breadcrumbs-separator-spacing-inline));opacity:1;color:var(--highcontrast-breadcrumbs-separator-color,var(--mod-breadcrumbs-separator-color,var(--spectrum-breadcrumbs-separator-color)));position:relative}#separator:dir(rtl),:host([dir=rtl]) #separator{transform:scaleX(-1)}:host{box-sizing:border-box;white-space:nowrap;font-family:var(--mod-breadcrumbs-font-family,var(--spectrum-breadcrumbs-font-family));font-size:var(--mod-breadcrumbs-font-size,var(--spectrum-breadcrumbs-font-size));font-weight:var(--mod-breadcrumbs-font-weight,var(--spectrum-breadcrumbs-font-weight));line-height:var(--mod-breadcrumbs-line-height,var(--spectrum-breadcrumbs-line-height));align-items:center;display:inline-flex;position:relative}:host(:not(.is-menu):last-of-type){font-family:var(--mod-breadcrumbs-font-family-current,var(--spectrum-breadcrumbs-font-family-current));font-size:var(--mod-breadcrumbs-font-size-current,var(--spectrum-breadcrumbs-font-size-current));font-weight:var(--mod-breadcrumbs-font-weight-current,var(--spectrum-breadcrumbs-font-weight-current))}:host(:not(.is-menu):last-of-type) #separator{display:none}::slotted(sp-action-menu){margin-inline:var(--mod-breadcrumbs-action-button-spacing-inline,var(--spectrum-breadcrumbs-action-button-spacing-inline));margin-block:var(--mod-breadcrumbs-action-button-spacing-block,var(--spectrum-breadcrumbs-action-button-spacing-block));color:var(--highcontrast-breadcrumbs-action-button-color,var(--mod-breadcrumbs-action-button-color,var(--spectrum-breadcrumbs-action-button-color)))}::slotted(sp-action-menu[disabled]){color:var(--highcontrast-breadcrumbs-action-button-color-disabled,var(--mod-breadcrumbs-action-button-color-disabled,var(--spectrum-breadcrumbs-action-button-color-disabled)))}:host(:first-of-type)>::slotted(sp-action-menu){margin-inline-start:var(--mod-breadcrumbs-action-button-spacing-inline-start,var(--spectrum-breadcrumbs-action-button-spacing-inline-start))}#item-link{cursor:default;box-sizing:border-box;border-radius:var(--mod-breadcrumbs-item-link-border-radius,var(--spectrum-breadcrumbs-item-link-border-radius));color:var(--highcontrast-breadcrumbs-text-color,var(--mod-breadcrumbs-text-color,var(--spectrum-breadcrumbs-text-color)));outline:none;margin-block-start:var(--mod-breadcrumbs-text-spacing-block-start,var(--spectrum-breadcrumbs-text-spacing-block-start));margin-block-end:var(--mod-breadcrumbs-text-spacing-block-end,var(--spectrum-breadcrumbs-text-spacing-block-end));-webkit-text-decoration:none;text-decoration:none;display:block;position:relative}#item-link.is-disabled,:host([aria-disabled=true]) #item-link{color:var(--highcontrast-breadcrumbs-text-color-disabled,var(--mod-breadcrumbs-text-color-disabled,var(--spectrum-breadcrumbs-text-color-disabled)))}:host(:not(.is-menu):last-of-type) #item-link{color:var(--highcontrast-breadcrumbs-text-color-current,var(--mod-breadcrumbs-text-color-current,var(--spectrum-breadcrumbs-text-color-current)))}#item-link[href],#item-link[tabindex]{cursor:pointer}#item-link[href]:focus-visible,#item-link[tabindex]:focus-visible{-webkit-text-decoration:underline;text-decoration:underline;text-decoration-thickness:var(--mod-breadcrumbs-text-decoration-thickness,var(--spectrum-breadcrumbs-text-decoration-thickness));text-underline-offset:var(--mod-breadcrumbs-text-decoration-gap,var(--spectrum-breadcrumbs-text-decoration-gap))}@media (hover:hover){#item-link[href]:hover,#item-link[tabindex]:hover{-webkit-text-decoration:underline;text-decoration:underline;text-decoration-thickness:var(--mod-breadcrumbs-text-decoration-thickness,var(--spectrum-breadcrumbs-text-decoration-thickness));text-underline-offset:var(--mod-breadcrumbs-text-decoration-gap,var(--spectrum-breadcrumbs-text-decoration-gap))}}:host .is-dragged #item-link:before,#item-link:focus-visible:before{box-sizing:border-box;inline-size:calc(100% + var(--mod-breadcrumbs-focus-indicator-gap,var(--spectrum-breadcrumbs-focus-indicator-gap))*2 + var(--mod-breadcrumbs-focus-indicator-thickness,var(--spectrum-breadcrumbs-focus-indicator-thickness))*2);block-size:calc(100% + var(--mod-breadcrumbs-focus-indicator-gap,var(--spectrum-breadcrumbs-focus-indicator-gap))*2 + var(--mod-breadcrumbs-focus-indicator-thickness,var(--spectrum-breadcrumbs-focus-indicator-thickness))*2);border-width:var(--mod-breadcrumbs-focus-indicator-thickness,var(--spectrum-breadcrumbs-focus-indicator-thickness));border-radius:var(--mod-breadcrumbs-item-link-border-radius,var(--spectrum-breadcrumbs-item-link-border-radius));content:"";pointer-events:none;border-style:solid;border-color:var(--highcontrast-breadcrumbs-focus-indicator-color,var(--mod-breadcrumbs-focus-indicator-color,var(--spectrum-breadcrumbs-focus-indicator-color)));margin-block-start:calc((var(--mod-breadcrumbs-focus-indicator-gap,var(--spectrum-breadcrumbs-focus-indicator-gap)) + var(--mod-breadcrumbs-focus-indicator-thickness,var(--spectrum-breadcrumbs-focus-indicator-thickness)))*-1);margin-inline-start:calc((var(--mod-breadcrumbs-focus-indicator-gap,var(--spectrum-breadcrumbs-focus-indicator-gap)) + var(--mod-breadcrumbs-focus-indicator-thickness,var(--spectrum-breadcrumbs-focus-indicator-thickness)))*-1);display:block;position:absolute}:host([hidden]){display:none}:host([disabled]){pointer-events:none}
`,__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__decorateClass=(decorators,target,key,kind)=>{for(var decorator,result=kind>1?void 0:kind?__getOwnPropDesc(target,key):target,i=decorators.length-1;i>=0;i--)(decorator=decorators[i])&&(result=(kind?decorator(target,key,result):decorator(result))||result);return kind&&result&&__defProp(target,key,result),result};class BreadcrumbItem extends((0,like_anchor_dev.$)(focusable_dev.z)){constructor(){super(...arguments),this.value=void 0,this.isLastOfType=!1}static get styles(){return[breadcrumb_item_css,spectrum_icon_chevron_css.A]}get focusElement(){return this.shadowRoot.querySelector("#item-link")}connectedCallback(){super.connectedCallback(),this.hasAttribute("role")||this.setAttribute("role","listitem")}announceSelected(value){const selectionEvent=new CustomEvent("breadcrumb-select",{bubbles:!0,composed:!0,detail:{value:value}});this.dispatchEvent(selectionEvent)}handleClick(event){!this.href&&event&&event.preventDefault(),this.href&&!(null==event?void 0:event.defaultPrevented)||this.value&&!this.isLastOfType&&this.announceSelected(this.value)}handleKeyDown(event){"Enter"!==event.key&&13!==event.keyCode||this.handleClick(event)}renderLink(){return index_dev.qy`
            <a
                id="item-link"
                href=${(0,directives_dev.JR)(this.isLastOfType?void 0:this.href)}
                tabindex=${0}
                aria-current=${(0,directives_dev.JR)(this.isLastOfType?"page":void 0)}
                @keydown=${this.handleKeyDown}
                @click=${this.handleClick}
            >
                <slot></slot>
            </a>
        `}renderSeparator(){return index_dev.qy`
            <sp-icon-chevron100
                id="separator"
                size="xs"
                class="spectrum-UIIcon-ChevronRight100"
            ></sp-icon-chevron100>
        `}render(){return index_dev.qy`
            ${this.renderLink()}
            <slot name="menu"></slot>
            ${this.renderSeparator()}
        `}updated(changes){changes.has("disabled")&&(this.disabled?this.setAttribute("aria-disabled","true"):this.removeAttribute("aria-disabled"))}}__decorateClass([(0,decorators_dev.MZ)()],BreadcrumbItem.prototype,"value",2),__decorateClass([(0,decorators_dev.MZ)({type:Boolean})],BreadcrumbItem.prototype,"isLastOfType",2),customElements.define("sp-breadcrumb-item",BreadcrumbItem);__webpack_require__("./packages/icons-workflow/icons/sp-icon-folder-open.js"),__webpack_require__("./packages/action-menu/sp-action-menu.dev.js"),__webpack_require__("./packages/menu/sp-menu-item.dev.js");var breadcrumbs_css=index_dev.AH`
    :host{--spectrum-breadcrumbs-block-size:var(--spectrum-breadcrumbs-height);--spectrum-breadcrumbs-block-size-compact:var(--spectrum-breadcrumbs-height-compact);--spectrum-breadcrumbs-block-size-multiline:var(--spectrum-breadcrumbs-height-multiline);--spectrum-breadcrumbs-line-height:var(--spectrum-line-height-100);--spectrum-breadcrumbs-font-size:var(--spectrum-font-size-200);--spectrum-breadcrumbs-font-family:var(--spectrum-sans-font-family-stack);--spectrum-breadcrumbs-font-weight:var(--spectrum-regular-font-weight);--spectrum-breadcrumbs-font-size-current:var(--spectrum-font-size-200);--spectrum-breadcrumbs-font-family-current:var(--spectrum-sans-font-family-stack);--spectrum-breadcrumbs-font-weight-current:var(--spectrum-bold-font-weight);--spectrum-breadcrumbs-font-size-compact:var(--spectrum-font-size-100);--spectrum-breadcrumbs-font-family-compact:var(--spectrum-sans-font-family-stack);--spectrum-breadcrumbs-font-weight-compact:var(--spectrum-regular-font-weight);--spectrum-breadcrumbs-font-size-compact-current:var(--spectrum-font-size-100);--spectrum-breadcrumbs-font-family-compact-current:var(--spectrum-sans-font-family-stack);--spectrum-breadcrumbs-font-weight-compact-current:var(--spectrum-bold-font-weight);--spectrum-breadcrumbs-font-size-multiline:var(--spectrum-font-size-75);--spectrum-breadcrumbs-font-family-multiline:var(--spectrum-sans-font-family-stack);--spectrum-breadcrumbs-font-weight-multiline:var(--spectrum-regular-font-weight);--spectrum-breadcrumbs-font-size-multiline-current:var(--spectrum-font-size-300);--spectrum-breadcrumbs-font-family-multiline-current:var(--spectrum-sans-font-family-stack);--spectrum-breadcrumbs-font-weight-multiline-current:var(--spectrum-bold-font-weight);--spectrum-breadcrumbs-text-decoration-thickness:var(--spectrum-text-underline-thickness);--spectrum-breadcrumbs-text-decoration-gap:var(--spectrum-text-underline-gap);--spectrum-breadcrumbs-separator-spacing-inline:var(--spectrum-text-to-visual-100);--spectrum-breadcrumbs-text-spacing-block-start:var(--spectrum-breadcrumbs-top-to-text);--spectrum-breadcrumbs-text-spacing-block-end:var(--spectrum-breadcrumbs-bottom-to-text);--spectrum-breadcrumbs-icon-spacing-block:var(--spectrum-breadcrumbs-top-to-separator-icon);--spectrum-breadcrumbs-text-spacing-block-start-compact:var(--spectrum-breadcrumbs-top-to-text-compact);--spectrum-breadcrumbs-text-spacing-block-end-compact:var(--spectrum-breadcrumbs-bottom-to-text-compact);--spectrum-breadcrumbs-icon-spacing-block-compact:var(--spectrum-breadcrumbs-top-to-separator-icon-compact);--spectrum-breadcrumbs-text-spacing-block-start-multiline:var(--spectrum-breadcrumbs-top-to-text-multiline);--spectrum-breadcrumbs-text-spacing-block-end-multiline:var(--spectrum-breadcrumbs-bottom-to-text-multiline);--spectrum-breadcrumbs-text-spacing-block-between-multiline:var(--spectrum-breadcrumbs-top-text-to-bottom-text);--spectrum-breadcrumbs-icon-spacing-block-start-multiline:var(--spectrum-breadcrumbs-top-to-separator-icon-multiline);--spectrum-breadcrumbs-icon-spacing-block-between-multiline:var(--spectrum-breadcrumbs-separator-icon-to-bottom-text-multiline);--spectrum-breadcrumbs-inline-start:var(--spectrum-breadcrumbs-start-edge-to-text);--spectrum-breadcrumbs-inline-end:var(--spectrum-breadcrumbs-end-edge-to-text);--spectrum-breadcrumbs-action-button-spacing-inline:var(--spectrum-breadcrumbs-truncated-menu-to-separator-icon);--spectrum-breadcrumbs-action-button-spacing-block:var(--spectrum-breadcrumbs-top-to-truncated-menu);--spectrum-breadcrumbs-action-button-spacing-block-compact:var(--spectrum-breadcrumbs-top-to-truncated-menu-compact);--spectrum-breadcrumbs-action-button-spacing-inline-start:var(--spectrum-breadcrumbs-start-edge-to-truncated-menu);--spectrum-breadcrumbs-action-button-spacing-block-multiline:var(--spectrum-breadcrumbs-top-to-truncated-menu-compact);--spectrum-breadcrumbs-action-button-spacing-block-between-multiline:var(--spectrum-breadcrumbs-truncated-menu-to-bottom-text);--spectrum-breadcrumbs-focus-indicator-thickness:var(--spectrum-focus-indicator-thickness);--spectrum-breadcrumbs-focus-indicator-gap:var(--spectrum-focus-indicator-gap);--spectrum-breadcrumbs-item-link-border-radius:var(--spectrum-corner-radius-100);--spectrum-breadcrumbs-text-color:var(--spectrum-neutral-subdued-content-color-default);--spectrum-breadcrumbs-text-color-current:var(--spectrum-neutral-content-color-default);--spectrum-breadcrumbs-text-color-disabled:var(--spectrum-disabled-content-color);--spectrum-breadcrumbs-separator-color:var(--spectrum-neutral-content-color-default);--spectrum-breadcrumbs-action-button-color:var(--spectrum-neutral-subdued-content-color-default);--spectrum-breadcrumbs-action-button-color-disabled:var(--spectrum-disabled-content-color);--spectrum-breadcrumbs-focus-indicator-color:var(--spectrum-focus-indicator-color)}@media (forced-colors:active){:host{--highcontrast-breadcrumbs-text-color:LinkText;--highcontrast-breadcrumbs-text-color-current:CanvasText;--highcontrast-breadcrumbs-text-color-disabled:GrayText;--highcontrast-breadcrumbs-separator-color:CanvasText;--highcontrast-breadcrumbs-action-button-color:LinkText;--highcontrast-breadcrumbs-action-button-color-disabled:GrayText;--highcontrast-breadcrumbs-focus-indicator-color:CanvasText}}#list{block-size:var(--mod-breadcrumbs-block-size,var(--spectrum-breadcrumbs-block-size));flex-flow:row;flex:1 0;justify-content:flex-start;align-items:center;margin:0;padding-inline-start:var(--mod-breadcrumbs-inline-start,var(--spectrum-breadcrumbs-inline-start));padding-inline-end:var(--mod-breadcrumbs-inline-end,var(--spectrum-breadcrumbs-inline-end));list-style-type:none;display:flex}:host([compact]) #list{block-size:var(--mod-breadcrumbs-block-size-compact,var(--spectrum-breadcrumbs-block-size-compact))}.spectrum-Breadcrumbs--multiline{block-size:var(--mod-breadcrumbs-block-size-multiline,var(--spectrum-breadcrumbs-block-size-multiline));flex-wrap:wrap;align-content:center}:host([compact]) ::slotted(sp-breadcrumb-item){font-family:var(--mod-breadcrumbs-font-family-compact,var(--spectrum-breadcrumbs-font-family-compact));font-size:var(--mod-breadcrumbs-font-size-compact,var(--spectrum-breadcrumbs-font-size-compact));font-weight:var(--mod-breadcrumbs-font-weight-compact,var(--spectrum-breadcrumbs-font-weight-compact))}:host([compact]) ::slotted(:last-of-type){font-family:var(--mod-breadcrumbs-font-family-compact-current,var(--spectrum-breadcrumbs-font-family-compact-current));font-size:var(--mod-breadcrumbs-font-size-compact-current,var(--spectrum-breadcrumbs-font-size-compact-current));font-weight:var(--mod-breadcrumbs-font-weight-compact-current,var(--spectrum-breadcrumbs-font-weight-compact-current))}:host{display:block}:host([compact]){--mod-breadcrumbs-icon-spacing-block:var(--mod-breadcrumbs-icon-spacing-block-compact,var(--spectrum-breadcrumbs-icon-spacing-block-compact));--mod-breadcrumbs-text-spacing-block-start:var(--mod-breadcrumbs-text-spacing-block-start-compact,var(--spectrum-breadcrumbs-text-spacing-block-start-compact));--mod-breadcrumbs-text-spacing-block-end:var(--mod-breadcrumbs-text-spacing-block-end-compact,var(--spectrum-breadcrumbs-text-spacing-block-end-compact));--mod-breadcrumbs-action-button-spacing-block:var(--mod-breadcrumbs-action-button-spacing-block-compact,var(--spectrum-breadcrumbs-action-button-spacing-block-compact))}:host([dir]) slot[slot=icon]::slotted([slot=icon]),:host([dir]) slot[slot=icon] .icon{margin-inline:calc((var(--custom-actionbutton-edge-to-text,var(--spectrum-actionbutton-edge-to-text)) - var(--custom-actionbutton-edge-to-visual-only,var(--spectrum-actionbutton-edge-to-visual-only)))*-1)}
`,Breadcrumbs_dev_defProp=Object.defineProperty,Breadcrumbs_dev_getOwnPropDesc=Object.getOwnPropertyDescriptor,Breadcrumbs_dev_decorateClass=(decorators,target,key,kind)=>{for(var decorator,result=kind>1?void 0:kind?Breadcrumbs_dev_getOwnPropDesc(target,key):target,i=decorators.length-1;i>=0;i--)(decorator=decorators[i])&&(result=(kind?decorator(target,key,result):decorator(result))||result);return kind&&result&&Breadcrumbs_dev_defProp(target,key,result),result};class Breadcrumbs extends index_dev.wG{constructor(){super(...arguments),this.maxVisibleItems=4,this.label="",this.menuLabel="More items",this.compact=!1,this.items=[],this.visibleItems=0,this.firstRender=!0,this.menuRef=(0,directives_dev._3)()}static get styles(){return[breadcrumbs_css]}get hasMenu(){var _a,_b;return this.visibleItems<(null!=(_b=null==(_a=this.breadcrumbsElements)?void 0:_a.length)?_b:0)}connectedCallback(){super.connectedCallback(),this.hasAttribute("role")||this.setAttribute("role","navigation"),this.resizeObserver=new ResizeObserver(()=>{this.firstRender?this.firstRender=!1:this.adjustOverflow()}),this.resizeObserver.observe(this)}disconnectedCallback(){var _a;null==(_a=this.resizeObserver)||_a.unobserve(this),super.disconnectedCallback()}updated(changes){super.updated(changes),changes.has("label")&&this.setAttribute("aria-label",this.label||"Breadcrumbs"),(changes.has("maxVisibleItems")||changes.has("compact"))&&(this.calculateBreadcrumbItemsWidth(),this.adjustOverflow()),changes.has("visibleItems")&&this.items.forEach((item,index)=>{this.breadcrumbsElements[index].isLastOfType=index===this.breadcrumbsElements.length-1,this.breadcrumbsElements[index].toggleAttribute("hidden",!item.isVisible)})}calculateBreadcrumbItemsWidth(){this.items=this.breadcrumbsElements.map((el,index)=>{let width=el.offsetWidth;return el.hasAttribute("hidden")&&(el.removeAttribute("hidden"),width=el.offsetWidth,el.setAttribute("hidden","")),{label:el.innerText,href:el.href,value:el.value||index.toString(),offsetWidth:width,isVisible:!0}})}adjustOverflow(){let occupiedSpace=0,newVisibleItems=0;const availableSpace=this.list.clientWidth;this.hasMenu&&this.menuRef.value&&(occupiedSpace+=this.menuRef.value.offsetWidth||0),this.rootElement.length>0&&(occupiedSpace+=this.rootElement[0].offsetWidth);for(let i=this.items.length-1;i>=0;i--){if(occupiedSpace+=this.items[i].offsetWidth,!(occupiedSpace<availableSpace&&newVisibleItems<Math.max(this.maxVisibleItems,1))){for(let j=i;j>=0;j--)this.items[j].isVisible=!1;break}this.items[i].isVisible=!0,newVisibleItems++}0===newVisibleItems&&(this.items[this.items.length-1].isVisible=!0,newVisibleItems++),newVisibleItems!==this.visibleItems&&(this.visibleItems=newVisibleItems)}announceChange(value){const selectionEvent=new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:value}});this.dispatchEvent(selectionEvent)}handleSelect(event){event.stopPropagation(),this.announceChange(event.detail.value)}handleMenuChange(event){event.stopPropagation(),this.announceChange(event.target.value)}renderMenu(){return index_dev.qy`
            <sp-breadcrumb-item role="listitem" class="is-menu">
                <sp-action-menu
                    ${(0,directives_dev.KR)(this.menuRef)}
                    quiet
                    label=${this.menuLabel}
                    selects="single"
                    value=${this.items[this.items.length-1].value}
                    @change=${this.handleMenuChange}
                    slot="menu"
                >
                    <slot slot="icon" name="icon">
                        <sp-icon-folder-open class="icon"></sp-icon-folder-open>
                    </slot>

                    ${this.items.map(item=>index_dev.qy`
                            <sp-menu-item
                                href=${(0,directives_dev.JR)(item.href)}
                                value=${item.value}
                            >
                                ${item.label}
                            </sp-menu-item>
                        `)}
                </sp-action-menu>
            </sp-breadcrumb-item>
        `}async slotChangeHandler(){if(0===this.breadcrumbsElements.length)return this.items=[],void(this.visibleItems=0);await Promise.all(this.breadcrumbsElements.map(el=>el.updateComplete)),this.calculateBreadcrumbItemsWidth(),this.visibleItems=0,this.adjustOverflow()}render(){return index_dev.qy`
            <ul @breadcrumb-select=${this.handleSelect} id="list">
                <slot name="root"></slot>
                ${this.hasMenu?this.renderMenu():""}
                <slot @slotchange=${this.slotChangeHandler}></slot>
            </ul>
        `}}Breadcrumbs_dev_decorateClass([(0,decorators_dev.MZ)({type:Number,attribute:"max-visible-items"})],Breadcrumbs.prototype,"maxVisibleItems",2),Breadcrumbs_dev_decorateClass([(0,decorators_dev.MZ)({type:String})],Breadcrumbs.prototype,"label",2),Breadcrumbs_dev_decorateClass([(0,decorators_dev.MZ)({type:String,attribute:"menu-label"})],Breadcrumbs.prototype,"menuLabel",2),Breadcrumbs_dev_decorateClass([(0,decorators_dev.MZ)({type:Boolean})],Breadcrumbs.prototype,"compact",2),Breadcrumbs_dev_decorateClass([(0,decorators_dev.KN)({selector:"sp-breadcrumb-item"})],Breadcrumbs.prototype,"breadcrumbsElements",2),Breadcrumbs_dev_decorateClass([(0,decorators_dev.KN)({slot:"root",selector:"sp-breadcrumb-item"})],Breadcrumbs.prototype,"rootElement",2),Breadcrumbs_dev_decorateClass([(0,decorators_dev.P)("#list")],Breadcrumbs.prototype,"list",2),Breadcrumbs_dev_decorateClass([(0,decorators_dev.wk)()],Breadcrumbs.prototype,"items",2),Breadcrumbs_dev_decorateClass([(0,decorators_dev.wk)()],Breadcrumbs.prototype,"visibleItems",2),customElements.define("sp-breadcrumbs",Breadcrumbs);const dummyOrganizer=["Your stuff","Files","Team","In progress","Trend","Winter","Assets","18x24"],getBreadcrumbsWithLinks=count=>{const breadcrumbs=[];for(let i=0;i<count;i++)breadcrumbs.push(index_dev.qy`
            <sp-breadcrumb-item href=${window.location.href}>
                ${dummyOrganizer[i]||`Breadcrumb ${i}`}
            </sp-breadcrumb-item>
        `);return breadcrumbs},getBreadcrumbs=count=>{const breadcrumbs=[];for(let i=0;i<count;i++)breadcrumbs.push(index_dev.qy`
            <sp-breadcrumb-item value=${i}>
                ${dummyOrganizer[i]||`Breadcrumb ${i}`}
            </sp-breadcrumb-item>
        `);return breadcrumbs},Template=args=>index_dev.qy`
    <sp-breadcrumbs
        ${(0,lit_helpers.i)(args)}
        max-visible-items=${(0,directives_dev.JR)(args["max-visible-items"])}
        @change=${args.onChange}
        ?compact=${args.compact}
    >
        <sp-breadcrumb-item value="0">Your stuff</sp-breadcrumb-item>
        <sp-breadcrumb-item ?disabled=${args.disabled} value="1">
            Files
        </sp-breadcrumb-item>
        <sp-breadcrumb-item value="2">Team</sp-breadcrumb-item>
        <sp-breadcrumb-item value="3">In progress</sp-breadcrumb-item>
    </sp-breadcrumbs>
`;__webpack_require__("./packages/button/sp-button.dev.js");var _maxVisibleItems,breadcrumbs_stories_defProp=Object.defineProperty,breadcrumbs_stories_getOwnPropDesc=Object.getOwnPropertyDescriptor,__typeError=msg=>{throw TypeError(msg)},__accessCheck=(obj,member,msg)=>member.has(obj)||__typeError("Cannot "+msg),breadcrumbs_stories={title:"Breadcrumbs",component:"sp-breadcrumbs",args:{"max-visible-items":4},argTypes:{compact:{name:"compact",type:{name:"boolean",required:!1},description:"Reduces the size of the Breadcrumbs and the padding around the items.",table:{type:{summary:"boolean"},defaultValue:{summary:!1}},control:{type:"boolean"}},label:{name:"label",type:{name:"string",required:!1},table:{type:{summary:"string"},defaultValue:{summary:"Breadcrumbs"}},control:"text"},maxVisibleItems:{name:"max-visible-items",type:{name:"number",required:!1},table:{type:{summary:"number"},defaultValue:{summary:"4"}},control:"number",min:0,max:4},onChange:{action:"change"}}};const Default=args=>Template(args),Disabled=args=>Template(args);Disabled.args={disabled:!0};const Compact=args=>Template(args);Compact.args={compact:!0};const Links=args=>index_dev.qy`
        <sp-breadcrumbs
            ${(0,lit_helpers.i)(args)}
            max-visible-items=${(0,directives_dev.JR)(args["max-visible-items"])}
            @change=${args.onChange}
        >
            ${getBreadcrumbsWithLinks(4)}
        </sp-breadcrumbs>
    `;class AddItemsStoryBreadcrumbs extends index_dev.WF{constructor(){var obj,member,value;super(...arguments),this._counter=2,this._items=[],obj=this,value=4,(member=_maxVisibleItems).has(obj)?__typeError("Cannot add the same private member more than once"):member instanceof WeakSet?member.add(obj):member.set(obj,value)}get maxVisibleItems(){return __accessCheck(obj=this,member=_maxVisibleItems,"read from private field"),getter?getter.call(obj):member.get(obj);var obj,member,getter}set maxVisibleItems(_){var obj,member,value,setter;value=_,__accessCheck(obj=this,member=_maxVisibleItems,"write to private field"),setter?setter.call(obj,value):member.set(obj,value)}firstUpdated(){this._items=getBreadcrumbsWithLinks(this._counter),this.requestUpdate()}render(){return index_dev.qy`
            <sp-breadcrumbs
                max-visible-items=${this.maxVisibleItems}
                @slotchange=${()=>{var _a;const breadcrumbs=null==(_a=this.shadowRoot)?void 0:_a.querySelector("sp-breadcrumbs");breadcrumbs&&breadcrumbs.requestUpdate()}}
            >
                ${this._items}
            </sp-breadcrumbs>
            <sp-button
                @click=${()=>{this._counter++,this._items=getBreadcrumbsWithLinks(this._counter),this.requestUpdate()}}
                style="margin-top: 8px;"
                id="add-more-items"
            >
                Add more items (current: ${this._counter})
            </sp-button>
        `}}_maxVisibleItems=new WeakMap,((decorators,target,key,kind)=>{for(var decorator,result=kind>1?void 0:kind?breadcrumbs_stories_getOwnPropDesc(target,key):target,i=decorators.length-1;i>=0;i--)(decorator=decorators[i])&&(result=(kind?decorator(target,key,result):decorator(result))||result);kind&&result&&breadcrumbs_stories_defProp(target,key,result)})([(0,decorators_dev.MZ)({type:Number})],AddItemsStoryBreadcrumbs.prototype,"maxVisibleItems",1),customElements.define("add-items-story-breadcrumbs",AddItemsStoryBreadcrumbs);const AddItemsDynamic=args=>index_dev.qy`
        <add-items-story-breadcrumbs
            maxVisibleItems=${(0,directives_dev.JR)(args["max-visible-items"])}
        ></add-items-story-breadcrumbs>
    `;AddItemsDynamic.swc_vrt={skip:!0};const ShowRoot=args=>index_dev.qy`
        <sp-breadcrumbs
            ${(0,lit_helpers.i)(args)}
            max-visible-items=${(0,directives_dev.JR)(args["max-visible-items"])}
            @change=${args.onChange}
        >
            <sp-breadcrumb-item value="Home" slot="root">
                Home
            </sp-breadcrumb-item>
            ${getBreadcrumbs(6)}
        </sp-breadcrumbs>
    `,resizableBehavior=args=>index_dev.qy`
        <div class="resizable-container">
            ${index_dev.qy`
        <style>
            .resizable-container {
                border: 2px solid;
                padding: 20px;
                width: 300px;
                resize: both;
                overflow: auto;
            }
        </style>
    `}

            <sp-breadcrumbs
                ${(0,lit_helpers.i)(args)}
                max-visible-items=${(0,directives_dev.JR)(args["max-visible-items"])}
                @change=${args.onChange}
            >
                ${getBreadcrumbs(4)}
            </sp-breadcrumbs>
        </div>
    `,__namedExportsOrder=["Default","Disabled","Compact","Links","AddItemsDynamic","ShowRoot","resizableBehavior"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"args => Template(args)",...Default.parameters?.docs?.source}}},Disabled.parameters={...Disabled.parameters,docs:{...Disabled.parameters?.docs,source:{originalSource:"args => Template(args)",...Disabled.parameters?.docs?.source}}},Compact.parameters={...Compact.parameters,docs:{...Compact.parameters?.docs,source:{originalSource:"args => Template(args)",...Compact.parameters?.docs?.source}}},Links.parameters={...Links.parameters,docs:{...Links.parameters?.docs,source:{originalSource:'args => {\n  return html`\n        <sp-breadcrumbs\n            ${spreadProps(args)}\n            max-visible-items=${ifDefined(args["max-visible-items"])}\n            @change=${args.onChange}\n        >\n            ${getBreadcrumbsWithLinks(4)}\n        </sp-breadcrumbs>\n    `;\n}',...Links.parameters?.docs?.source}}},AddItemsDynamic.parameters={...AddItemsDynamic.parameters,docs:{...AddItemsDynamic.parameters?.docs,source:{originalSource:'args => {\n  return html`\n        <add-items-story-breadcrumbs\n            maxVisibleItems=${ifDefined(args["max-visible-items"])}\n        ></add-items-story-breadcrumbs>\n    `;\n}',...AddItemsDynamic.parameters?.docs?.source}}},ShowRoot.parameters={...ShowRoot.parameters,docs:{...ShowRoot.parameters?.docs,source:{originalSource:'args => {\n  return html`\n        <sp-breadcrumbs\n            ${spreadProps(args)}\n            max-visible-items=${ifDefined(args["max-visible-items"])}\n            @change=${args.onChange}\n        >\n            <sp-breadcrumb-item value="Home" slot="root">\n                Home\n            </sp-breadcrumb-item>\n            ${getBreadcrumbs(6)}\n        </sp-breadcrumbs>\n    `;\n}',...ShowRoot.parameters?.docs?.source}}},resizableBehavior.parameters={...resizableBehavior.parameters,docs:{...resizableBehavior.parameters?.docs,source:{originalSource:'args => {\n  return html`\n        <div class="resizable-container">\n            ${getResizableStyles()}\n\n            <sp-breadcrumbs\n                ${spreadProps(args)}\n                max-visible-items=${ifDefined(args["max-visible-items"])}\n                @change=${args.onChange}\n            >\n                ${getBreadcrumbs(4)}\n            </sp-breadcrumbs>\n        </div>\n    `;\n}',...resizableBehavior.parameters?.docs?.source}}}},"./packages/button/sp-button.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var _src_Button_dev_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/button/src/Button.dev.js");(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-button",_src_Button_dev_js__WEBPACK_IMPORTED_MODULE_0__.$n)},"./packages/icons-workflow/icons/sp-icon-folder-open.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");var FolderOpen=__webpack_require__("./packages/icons-workflow/src/icons/FolderOpen.js");class IconFolderOpen extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),2===this.spectrumVersion?(({width:e=24,height:l=24,hidden:t=!1,title:r="Folder Open"}={})=>custom_tag.T`<svg
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
  </svg>`)({hidden:!this.label,title:this.label}):(0,More.Z)({hidden:!this.label,title:this.label})}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon-more",IconMore)},"./packages/icons-workflow/icons/sp-icon-settings.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");var Settings=__webpack_require__("./packages/icons-workflow/src/icons/Settings.js");class IconSettings extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),2===this.spectrumVersion?(({width:l=24,height:c=24,hidden:t=!1,title:e="Settings"}={})=>custom_tag.T`<svg
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
  </svg>`)({hidden:!this.label,title:this.label}):(0,Settings.Z)({hidden:!this.label,title:this.label})}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon-settings",IconSettings)},"./packages/icons-workflow/src/icons/FolderOpen.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{u:function(){return FolderOpenIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const FolderOpenIcon=({width:e=24,height:t=24,hidden:l=!1,title:a="Folder Open"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
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
  </svg>`},"./test/lit-helpers.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{i:function(){return spreadProps}});var lit_html_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../node_modules/lit/html.js"),lit_async_directive_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../node_modules/lit/async-directive.js");class SpreadDirective extends lit_async_directive_js__WEBPACK_IMPORTED_MODULE_1__.Kq{constructor(){super(...arguments),this.prevData={}}render(_spreadData){return lit_html_js__WEBPACK_IMPORTED_MODULE_0__.s6}update(part,[spreadData]){var _a;this.element!==part.element&&(this.element=part.element),this.host=(null==(_a=part.options)?void 0:_a.host)||this.element,this.apply(spreadData),this.groom(spreadData),this.prevData=spreadData}apply(data){if(!data)return;const{prevData:prevData,element:element}=this;for(const key in data){const value=data[key];if(value===prevData[key])continue;const name=key.slice(1);switch(key[0]){case"@":prevData[key]&&element.removeEventListener(name,this,value),element.addEventListener(name,this,value);break;case".":element[name]=value;break;case"?":value?element.setAttribute(name,""):element.removeAttribute(name);break;default:null!=value?element.setAttribute(key,String(value)):element.removeAttribute(key)}}}groom(data){const{prevData:prevData,element:element}=this;if(prevData)for(const key in prevData)if(!data||!(key in data))switch(key[0]){case"@":const value=prevData[key];element.removeEventListener(key.slice(1),this,value);break;case".":element[key.slice(1)]=void 0;break;case"?":element.removeAttribute(key.slice(1));break;default:element.removeAttribute(key)}}handleEvent(event){const value=this.prevData[`@${event.type}`];"function"==typeof value?value.call(this.host,event):value.handleEvent(event)}disconnected(){const{prevData:prevData,element:element}=this;for(const key in prevData){if("@"!==key[0])continue;const value=prevData[key];element.removeEventListener(key.slice(1),this,value)}}reconnected(){const{prevData:prevData,element:element}=this;for(const key in prevData){if("@"!==key[0])continue;const value=prevData[key];element.addEventListener(key.slice(1),this,value)}}}(0,lit_async_directive_js__WEBPACK_IMPORTED_MODULE_1__.u$)(SpreadDirective);class SpreadPropsDirective extends lit_async_directive_js__WEBPACK_IMPORTED_MODULE_1__.Kq{constructor(){super(...arguments),this.prevData={}}render(_spreadData){return lit_html_js__WEBPACK_IMPORTED_MODULE_0__.s6}update(part,[spreadData]){var _a;this.element!==part.element&&(this.element=part.element),this.host=(null==(_a=part.options)?void 0:_a.host)||this.element,this.apply(spreadData),this.groom(spreadData),this.prevData=spreadData}apply(data){if(!data)return;const{prevData:prevData,element:element}=this;for(const key in data){const value=data[key];value!==prevData[key]&&(element[key]=value)}}groom(data){const{prevData:prevData,element:element}=this;if(prevData)for(const key in prevData)data&&key in data||(element[key]=void 0)}}const spreadProps=(0,lit_async_directive_js__WEBPACK_IMPORTED_MODULE_1__.u$)(SpreadPropsDirective)}}]);
//# sourceMappingURL=breadcrumbs-stories-breadcrumbs-stories.956a31af.iframe.bundle.js.map