"use strict";(self.webpackChunk_spectrum_web_components_1st_gen=self.webpackChunk_spectrum_web_components_1st_gen||[]).push([[4300],{"./packages/action-menu/sp-action-menu.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var define_element_dev=__webpack_require__("./tools/base/src/define-element.dev.js"),index_dev=__webpack_require__("./tools/base/src/index.dev.js"),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js"),directives_dev=__webpack_require__("./tools/base/src/directives.dev.js"),slottable_request_event_dev=__webpack_require__("./packages/overlay/src/slottable-request-event.dev.js"),Picker_dev=__webpack_require__("./packages/picker/src/Picker.dev.js"),observe_slot_presence_dev=__webpack_require__("./tools/shared/src/observe-slot-presence.dev.js"),observe_slot_text_dev=__webpack_require__("./tools/shared/src/observe-slot-text.dev.js");__webpack_require__("./packages/action-button/sp-action-button.dev.js"),__webpack_require__("./packages/icons-workflow/icons/sp-icon-more.js");var action_menu_css=index_dev.AH`
    :host{display:inline-flex}:host([quiet]){min-width:0}:host>sp-menu{display:none}::slotted([slot=icon]),.icon{flex-shrink:0}#popover{max-width:none}::slotted([slot=icon]:dir(ltr)),.icon:dir(ltr){margin-left:calc(-1*(var(--spectrum-actionbutton-textonly-padding-left-adjusted) - var(--spectrum-actionbutton-padding-left-adjusted)))}::slotted([slot=icon]:dir(rtl)),.icon:dir(rtl){margin-right:calc(-1*(var(--spectrum-actionbutton-textonly-padding-left-adjusted) - var(--spectrum-actionbutton-padding-left-adjusted)))}slot[icon-only]::slotted([slot=icon]),slot[icon-only] .icon{margin-inline:calc((var(--custom-actionbutton-edge-to-text,var(--spectrum-actionbutton-edge-to-text)) - var(--custom-actionbutton-edge-to-visual-only,var(--spectrum-actionbutton-edge-to-visual-only)))*-1)}sp-overlay:not(:defined){display:none}
`,__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__decorateClass=(decorators,target,key,kind)=>{for(var decorator,result=kind>1?void 0:kind?__getOwnPropDesc(target,key):target,i=decorators.length-1;i>=0;i--)(decorator=decorators[i])&&(result=(kind?decorator(target,key,result):decorator(result))||result);return kind&&result&&__defProp(target,key,result),result};class ActionMenu extends((0,observe_slot_presence_dev.e)((0,observe_slot_text_dev.O)((0,index_dev.ZG)(Picker_dev.Xu,{noDefaultSize:!0}),"label"),'[slot="label-only"]')){constructor(){super(...arguments),this.selects=void 0,this.deprecatedMenu=null,this.invalid=!1,this.pendingLabel="Pending",this.quiet=!1,this.value="",this.listRole="menu",this.itemRole="menuitem",this.handleEscape=event=>{"Escape"===event.key&&this.open&&(event.stopPropagation(),event.preventDefault(),this.toggle(!1))},this.handleKeydown=event=>{this.focused=!0,["ArrowUp","ArrowDown","Enter"," ","Escape"].includes(event.key)&&("Escape"!==event.key?(event.stopPropagation(),event.preventDefault(),this.keyboardOpen()):this.handleEscape(event))},this.applyFocusElementLabel=(value,labelElement)=>{this.appliedLabel=value,this.labelAlignment=labelElement.sideAligned?"inline":void 0},this.hasRenderedOverlay=!1,this.willManageSelection=!1,this.selectionPromise=Promise.resolve(),this.recentlyConnected=!1,this.enterKeydownOn=null,this.handleEnterKeydown=event=>{if("Enter"!==event.key)return;const target=null==event?void 0:event.target;target.open||!target.hasSubmenu?this.enterKeydownOn?event.preventDefault():(this.enterKeydownOn=event.target,this.addEventListener("keyup",async keyupEvent=>{"Enter"===keyupEvent.key&&(this.enterKeydownOn=null)},{once:!0})):event.preventDefault()},this.handleSlottableRequest=event=>{this.dispatchEvent(new slottable_request_event_dev.W(event.name,event.data))}}static get styles(){return[action_menu_css]}get menuItems(){return this.optionsMenu.childItems}get selfManageFocusElement(){return!0}get selectedItem(){return this._selectedItem}forceFocusVisible(){this.disabled||(this.focused=!0)}click(){this.toggle()}handleButtonClick(){this.disabled||this.toggle()}handleButtonBlur(){this.focused=!1}handleHelperFocus(){this.focused=!0,this.button.focus()}handleFocus(){!this.disabled&&this.focusElement&&(this.focused=this.hasVisibleFocusInTree())}handleChange(event){this.strategy&&(this.strategy.preventNextToggle="no");const target=event.target,[selected]=target.selectedItems;event.stopPropagation(),event.cancelable?this.setValueFromItem(selected,event):(this.open=!1,this.strategy&&(this.strategy.open=!1))}handleButtonFocus(event){var _a;null==(_a=this.strategy)||_a.handleButtonFocus(event)}async keyboardOpen(){var _a;this.open&&this.strategy.open?null==(_a=this.optionsMenu)||_a.focusOnFirstSelectedItem():(this.addEventListener("sp-opened",()=>{var _a2;return null==(_a2=this.optionsMenu)?void 0:_a2.focusOnFirstSelectedItem()},{once:!0}),this.toggle(!0))}async setValueFromItem(item,menuChangeEvent){var _a;this.open=!1;const oldSelectedItem=this.selectedItem,oldValue=this.value;this.selectedItem=item,this.value=null!=(_a=null==item?void 0:item.value)?_a:"",await this.updateComplete;return!this.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))&&this.selects?(menuChangeEvent&&menuChangeEvent.preventDefault(),this.setMenuItemSelected(this.selectedItem,!1),oldSelectedItem&&this.setMenuItemSelected(oldSelectedItem,!0),this.selectedItem=oldSelectedItem,this.value=oldValue,this.open=!0,void(this.strategy&&(this.strategy.open=!0))):this.selects?(oldSelectedItem&&this.setMenuItemSelected(oldSelectedItem,!1),void this.setMenuItemSelected(item,!!this.selects)):(this.selectedItem=oldSelectedItem,void(this.value=oldValue))}setMenuItemSelected(item,value){null!=this.selects&&(item.selected=value)}get containerStyles(){return this.isMobile.matches?{"--swc-menu-width":"100%"}:{}}get selectedItemContent(){return this._selectedItemContent||{icon:[],content:[]}}set selectedItemContent(selectedItemContent){if(selectedItemContent===this.selectedItemContent)return;const oldContent=this.selectedItemContent;this._selectedItemContent=selectedItemContent,this.requestUpdate("selectedItemContent",oldContent)}handleTooltipSlotchange(event){var _a;this.tooltipEl=event.target.assignedElements()[0],(null==(_a=this.tooltipEl)?void 0:_a.selfManaged)&&this.updateComplete.then(()=>{var _a2;(null==(_a2=this.tooltipEl)?void 0:_a2.overlayElement)&&this.button&&(this.tooltipEl.overlayElement.triggerElement=this.button)})}renderLabelContent(content){return this.value&&this.selectedItem?content:index_dev.qy`
      <slot name="label" id="label">
        <span aria-hidden=${(0,directives_dev.JR)(this.appliedLabel?void 0:"true")}>
          ${this.label}
        </span>
      </slot>
    `}renderLoader(){return Promise.resolve().then(__webpack_require__.bind(__webpack_require__,"./packages/progress-circle/sp-progress-circle.dev.js")),index_dev.qy`
      <sp-progress-circle
        size="s"
        indeterminate
        role="presentation"
        class="progress-circle"
      ></sp-progress-circle>
    `}get buttonContent(){return[index_dev.qy`
        ${this.labelOnly?index_dev.s6:index_dev.qy`
              <slot
                name="icon"
                slot="icon"
                ?icon-only=${!this.hasLabel}
                ?hidden=${this.labelOnly}
              >
                <sp-icon-more class="icon" size=${this.size}></sp-icon-more>
              </slot>
            `}
        <slot name="label" ?hidden=${!this.hasLabel}></slot>
        <slot name="label-only"></slot>
      `]}hasAccessibleLabel(){return!!this.label||!!this.getAttribute("aria-label")||!!this.getAttribute("aria-labelledby")||!!this.appliedLabel||this.hasLabel||this.labelOnly}warnNoLabel(){window.__swc.warn(this,`<${this.localName}> needs one of the following to be accessible:`,"https://opensource.adobe.com/spectrum-web-components/components/action-menu/#accessibility",{type:"accessibility",issues:[`an <sp-field-label> element with a \`for\` attribute referencing the \`id\` of the \`<${this.localName}>\`, or`,'value supplied to the "label" attribute, which will be displayed visually as placeholder text','text content supplied in a <span> with slot="label", or, text content supplied in a <span> with slot="label-only"',"which will also be displayed visually as placeholder text."]})}renderOverlay(menu){var _a;const container=this.renderContainer(menu);return this.dependencyManager.add("sp-overlay"),Promise.all([__webpack_require__.e(2067),__webpack_require__.e(3080)]).then(__webpack_require__.bind(__webpack_require__,"./packages/overlay/sp-overlay.dev.js")),index_dev.qy`
      <sp-overlay
        @slottable-request=${this.handleSlottableRequest}
        @beforetoggle=${this.handleBeforetoggle}
        .triggerElement=${this}
        .offset=${0}
        ?open=${this.open&&this.dependencyManager.loaded}
        .placement=${this.isMobile.matches&&!this.forcePopover?void 0:this.placement}
        .type=${this.isMobile.matches&&!this.forcePopover?"modal":"auto"}
        .receivesFocus=${"false"}
        .willPreventClose=${"no"!==(null==(_a=this.strategy)?void 0:_a.preventNextToggle)&&this.open&&this.dependencyManager.loaded}
      >
        ${container}
      </sp-overlay>
    `}get renderDescriptionSlot(){return index_dev.qy`
      <div id=${Picker_dev.h5}>
        <slot name="description"></slot>
      </div>
    `}render(){return this.tooltipEl&&(this.tooltipEl.disabled=this.open),index_dev.qy`
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
      <slot name="tooltip" @slotchange=${this.handleTooltipSlotchange}></slot>
      ${this.renderMenu} ${this.renderDescriptionSlot}
    `}willUpdate(changedProperties){super.willUpdate(changedProperties),changedProperties.has("tabIndex")&&this.tabIndex&&(this.button.tabIndex=this.tabIndex,this.removeAttribute("tabindex"))}update(changedProperties){var _a,_b;if(changedProperties.has("invalid")&&(this.invalid=!1),this.selects&&(this.selects="single"),changedProperties.has("disabled")&&this.disabled&&this.close(),changedProperties.has("pending")&&this.pending&&this.close(),changedProperties.has("value")&&this.shouldScheduleManageSelection(),this.hasUpdated||(this.deprecatedMenu=this.querySelector(":scope > sp-menu"),null==(_a=this.deprecatedMenu)||_a.toggleAttribute("ignore",!0),null==(_b=this.deprecatedMenu)||_b.setAttribute("selects","inherit")),!this.hasUpdated&&this.querySelector(":scope > sp-menu")){const{localName:localName}=this;window.__swc.warn(this,`You no longer need to provide an <sp-menu> child to ${localName}. Any styling or attributes on the <sp-menu> will be ignored.`,"https://opensource.adobe.com/spectrum-web-components/components/picker/#sizes",{level:"deprecation"})}this.updateComplete.then(async()=>{await new Promise(res=>requestAnimationFrame(res)),await new Promise(res=>requestAnimationFrame(res)),this.hasAccessibleLabel()||this.warnNoLabel()}),super.update(changedProperties)}bindButtonKeydownListener(){this.button.addEventListener("keydown",this.handleKeydown)}updated(changedProperties){super.updated(changedProperties),changedProperties.has("open")&&this.overlayElement&&!this.strategy.overlay&&(this.strategy.overlay=this.overlayElement)}async firstUpdated(changedProperties){super.firstUpdated(changedProperties),this.bindButtonKeydownListener(),this.bindEvents(),await this.updateComplete,this.overlayElement&&!this.strategy.overlay&&(this.strategy.overlay=this.overlayElement)}get dismissHelper(){return index_dev.qy`
      <div class="visually-hidden">
        <button
          tabindex="-1"
          aria-label="Dismiss"
          @click=${this.close}
        ></button>
      </div>
    `}renderContainer(menu){const accessibleMenu=index_dev.qy`
      ${this.dismissHelper} ${menu} ${this.dismissHelper}
    `;return this.isMobile.matches&&!this.forcePopover?(this.dependencyManager.add("sp-tray"),__webpack_require__.e(6156).then(__webpack_require__.bind(__webpack_require__,"./packages/tray/sp-tray.dev.js")),index_dev.qy`
        <sp-tray
          id="popover"
          role="presentation"
          style=${(0,directives_dev.Wy)(this.containerStyles)}
        >
          ${accessibleMenu}
        </sp-tray>
      `):(this.dependencyManager.add("sp-popover"),__webpack_require__.e(5287).then(__webpack_require__.bind(__webpack_require__,"./packages/popover/sp-popover.dev.js")),index_dev.qy`
      <sp-popover
        id="popover"
        role="presentation"
        style=${(0,directives_dev.Wy)(this.containerStyles)}
        placement=${this.placement}
      >
        ${accessibleMenu}
      </sp-popover>
    `)}onScroll(){this.dispatchEvent(new Event("scroll",{cancelable:!0,composed:!0}))}get renderMenu(){const menu=index_dev.qy`
      <sp-menu
        aria-labelledby="applied-label"
        @change=${this.handleChange}
        id="menu"
        @keydown=${{handleEvent:this.handleEnterKeydown,capture:!0}}
        @scroll=${this.onScroll}
        role=${this.listRole}
        .selects=${this.selects}
        .selected=${this.value?[this.value]:[]}
        .shouldSupportDragAndSelect=${!this.isTouchDevice.matches}
        size=${this.size}
        @sp-menu-item-keydown=${this.handleEscape}
        @sp-menu-item-added-or-updated=${this.shouldManageSelection}
      >
        <slot @slotchange=${this.shouldScheduleManageSelection}></slot>
      </sp-menu>
    `;return this.hasRenderedOverlay=this.hasRenderedOverlay||this.focused||this.open||!!this.deprecatedMenu,this.hasRenderedOverlay?(this.dependencyManager.loaded&&this.dependencyManager.add("sp-overlay"),this.renderOverlay(menu)):menu}shouldScheduleManageSelection(event){this.willManageSelection||event&&event.target.getRootNode().host!==this||(this.willManageSelection=!0,requestAnimationFrame(()=>{requestAnimationFrame(()=>{this.manageSelection()})}))}shouldManageSelection(){this.willManageSelection||(this.willManageSelection=!0,this.manageSelection())}async manageSelection(){if(null==this.selects)return;let selectedItem;if(this.selectionPromise=new Promise(res=>this.selectionResolver=res),await this.optionsMenu.updateComplete,this.recentlyConnected&&(await new Promise(res=>requestAnimationFrame(()=>res(!0))),this.recentlyConnected=!1),this.menuItems.forEach(item=>{this.value!==item.value||item.disabled?item.selected=!1:selectedItem=item}),selectedItem)selectedItem.selected=!!this.selects,this.selectedItem=selectedItem;else{const hasItemsWithValues=this.menuItems.some(item=>{var _a;return null!=item.value||null!=(null==(_a=item.getAttribute)?void 0:_a.call(item,"value"))});this.menuItems.length>0&&hasItemsWithValues&&(this.value="",this.selectedItem=void 0)}this.open&&(await this.optionsMenu.updateComplete,this.optionsMenu.updateSelectedItemIndex()),this.selectionResolver(),this.willManageSelection=!1}async getUpdateComplete(){const complete=await super.getUpdateComplete();return await this.selectionPromise,complete}connectedCallback(){super.connectedCallback(),this.updateComplete.then(()=>{var _a;if(!(null==(_a=this.tooltipEl)?void 0:_a.selfManaged))return;const overlayElement=this.tooltipEl.overlayElement;overlayElement&&(overlayElement.triggerElement=this.button)}),this.recentlyConnected=this.hasUpdated,this.addEventListener("focus",this.handleFocus)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("focus",this.handleFocus)}set selectedItem(selectedItem){if(this.selectedItemContent=selectedItem?selectedItem.itemChildren:void 0,selectedItem===this.selectedItem)return;const oldSelectedItem=this.selectedItem;this._selectedItem=selectedItem,this.requestUpdate("selectedItem",oldSelectedItem)}get hasLabel(){return this.slotHasContent}get labelOnly(){return this.slotContentIsPresent}}__decorateClass([(0,decorators_dev.MZ)({type:String})],ActionMenu.prototype,"selects",2),__decorateClass([(0,decorators_dev.wk)()],ActionMenu.prototype,"labelAlignment",2),__decorateClass([(0,decorators_dev.wk)()],ActionMenu.prototype,"appliedLabel",2),__decorateClass([(0,decorators_dev.MZ)({type:String,reflect:!0})],ActionMenu.prototype,"icons",2),__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],ActionMenu.prototype,"invalid",2),__decorateClass([(0,decorators_dev.MZ)({type:String,attribute:"pending-label"})],ActionMenu.prototype,"pendingLabel",2),__decorateClass([(0,decorators_dev.MZ)()],ActionMenu.prototype,"label",2),__decorateClass([(0,decorators_dev.MZ)({reflect:!0,attribute:"static-color"})],ActionMenu.prototype,"staticColor",2),__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],ActionMenu.prototype,"quiet",2),__decorateClass([(0,decorators_dev.MZ)({type:String})],ActionMenu.prototype,"value",2),__decorateClass([(0,decorators_dev.MZ)({attribute:!1})],ActionMenu.prototype,"selectedItem",1),__decorateClass([(0,decorators_dev.wk)()],ActionMenu.prototype,"selectedItemContent",1),__decorateClass([(0,decorators_dev.wk)()],ActionMenu.prototype,"labelOnly",1),(0,define_element_dev.e)("sp-action-menu",ActionMenu)},"./packages/icons-workflow/icons/sp-icon-more.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");var More=__webpack_require__("./packages/icons-workflow/src/icons/More.js");class IconMore extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),2===this.spectrumVersion?(({width:r=24,height:l=24,hidden:e=!1,title:c="More"}={})=>custom_tag.T`<svg
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
  </svg>`}}]);
//# sourceMappingURL=4300.6e81b6db.iframe.bundle.js.map