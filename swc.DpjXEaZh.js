import{n as e}from"./swc.DOolm9Ny.js";import{o as t}from"./swc.Dcf0_ssu.js";import{r as s}from"./swc.ppgc24VC.js";import{a as r}from"./swc.Q_BPMaKG.js";import{L as i}from"./swc.DgldsjDZ.js";import"./swc.DsPFDySe.js";import{i as a}from"./swc.CYeyA-Sa.js";import{E as o,x as n,S as c}from"./swc.CsWhg8tQ.js";import{o as l}from"./swc.B2F7xsS4.js";import{n as u}from"./swc.BFm0WrgY.js";import"./swc.BSEVPamm.js";import{d}from"./swc.JlveB6nj.js";import{S as m}from"./swc.mUX8iMJZ.js";import{O as b}from"./swc.D29Fn1i2.js";import{O as p}from"./swc.PCAWhDoT.js";import"./swc.BWnkuvMn.js";import"./swc.qRrnJNYg.js";import{E as h,D as v}from"./swc.DMJ4UeGz.js";import{S as g}from"./swc.DU1p9e27.js";import{o as f}from"./swc.3FMYdIvr.js";import{r as y}from"./swc.CvKFboCQ.js";import"./swc.D1t_XMoX.js";import{f as k}from"./swc.CrfEFH4m.js";import{e as w}from"./swc.CjPt0-_4.js";import{o as x}from"./swc.DB8lrnSl.js";import{e as $}from"./swc.CmcGy_P4.js";class C{}const E=new WeakMap,I=w(class extends k{render(e){return o}update(e,[t]){const s=t!==this.G;return s&&void 0!==this.G&&this.rt(void 0),(s||this.lt!==this.ct)&&(this.G=t,this.ht=e.options?.host,this.rt(this.ct=e.element)),o}rt(e){if(this.isConnected||(e=void 0),"function"==typeof this.G){const t=this.ht??globalThis;let s=E.get(t);void 0===s&&(s=new WeakMap,E.set(t,s)),void 0!==s.get(this.G)&&this.G.call(this.ht,void 0),s.set(this.G,e),void 0!==e&&this.G.call(this.ht,e)}else this.G.value=e}get lt(){return"function"==typeof this.G?E.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});const S=a`
    #separator{margin-block:var(--mod-breadcrumbs-icon-spacing-block,var(--spectrum-breadcrumbs-icon-spacing-block));margin-inline:var(--mod-breadcrumbs-separator-spacing-inline,var(--spectrum-breadcrumbs-separator-spacing-inline));color:var(--highcontrast-breadcrumbs-separator-color,var(--mod-breadcrumbs-separator-color,var(--spectrum-breadcrumbs-separator-color)));opacity:1;position:relative}#separator:dir(rtl){transform:scaleX(-1)}:host{box-sizing:border-box;font-family:var(--mod-breadcrumbs-font-family,var(--spectrum-breadcrumbs-font-family));font-size:var(--mod-breadcrumbs-font-size,var(--spectrum-breadcrumbs-font-size));font-weight:var(--mod-breadcrumbs-font-weight,var(--spectrum-breadcrumbs-font-weight));line-height:var(--mod-breadcrumbs-line-height,var(--spectrum-breadcrumbs-line-height));white-space:nowrap;align-items:center;display:inline-flex;position:relative}:host(:not(.is-menu):last-of-type){font-family:var(--mod-breadcrumbs-font-family-current,var(--spectrum-breadcrumbs-font-family-current));font-size:var(--mod-breadcrumbs-font-size-current,var(--spectrum-breadcrumbs-font-size-current));font-weight:var(--mod-breadcrumbs-font-weight-current,var(--spectrum-breadcrumbs-font-weight-current))}:host(:not(.is-menu):last-of-type) #separator{display:none}::slotted(sp-action-menu){margin-block:var(--mod-breadcrumbs-action-button-spacing-block,var(--spectrum-breadcrumbs-action-button-spacing-block));margin-inline:var(--mod-breadcrumbs-action-button-spacing-inline,var(--spectrum-breadcrumbs-action-button-spacing-inline));color:var(--highcontrast-breadcrumbs-action-button-color,var(--mod-breadcrumbs-action-button-color,var(--spectrum-breadcrumbs-action-button-color)))}::slotted(sp-action-menu[disabled]){color:var(--highcontrast-breadcrumbs-action-button-color-disabled,var(--mod-breadcrumbs-action-button-color-disabled,var(--spectrum-breadcrumbs-action-button-color-disabled)))}:host(:first-of-type)>::slotted(sp-action-menu){margin-inline-start:var(--mod-breadcrumbs-action-button-spacing-inline-start,var(--spectrum-breadcrumbs-action-button-spacing-inline-start))}#item-link{box-sizing:border-box;color:var(--highcontrast-breadcrumbs-text-color,var(--mod-breadcrumbs-text-color,var(--spectrum-breadcrumbs-text-color)));border-radius:var(--mod-breadcrumbs-item-link-border-radius,var(--spectrum-breadcrumbs-item-link-border-radius));cursor:default;outline:none;margin-block-start:var(--mod-breadcrumbs-text-spacing-block-start,var(--spectrum-breadcrumbs-text-spacing-block-start));margin-block-end:var(--mod-breadcrumbs-text-spacing-block-end,var(--spectrum-breadcrumbs-text-spacing-block-end));-webkit-text-decoration:none;text-decoration:none;display:block;position:relative}#item-link.is-disabled,:host([aria-disabled=true]) #item-link{color:var(--highcontrast-breadcrumbs-text-color-disabled,var(--mod-breadcrumbs-text-color-disabled,var(--spectrum-breadcrumbs-text-color-disabled)))}:host(:not(.is-menu):last-of-type) #item-link{color:var(--highcontrast-breadcrumbs-text-color-current,var(--mod-breadcrumbs-text-color-current,var(--spectrum-breadcrumbs-text-color-current)))}#item-link[href],#item-link[tabindex]{cursor:pointer}#item-link[href]:focus-visible,#item-link[tabindex]:focus-visible{-webkit-text-decoration:underline;text-decoration:underline;text-decoration-thickness:var(--mod-breadcrumbs-text-decoration-thickness,var(--spectrum-breadcrumbs-text-decoration-thickness));text-underline-offset:var(--mod-breadcrumbs-text-decoration-gap,var(--spectrum-breadcrumbs-text-decoration-gap))}@media (hover:hover){#item-link[href]:hover,#item-link[tabindex]:hover{-webkit-text-decoration:underline;text-decoration:underline;text-decoration-thickness:var(--mod-breadcrumbs-text-decoration-thickness,var(--spectrum-breadcrumbs-text-decoration-thickness));text-underline-offset:var(--mod-breadcrumbs-text-decoration-gap,var(--spectrum-breadcrumbs-text-decoration-gap))}}:host .is-dragged #item-link:before,#item-link:focus-visible:before{box-sizing:border-box;inline-size:calc(100% + var(--mod-breadcrumbs-focus-indicator-gap,var(--spectrum-breadcrumbs-focus-indicator-gap))*2 + var(--mod-breadcrumbs-focus-indicator-thickness,var(--spectrum-breadcrumbs-focus-indicator-thickness))*2);block-size:calc(100% + var(--mod-breadcrumbs-focus-indicator-gap,var(--spectrum-breadcrumbs-focus-indicator-gap))*2 + var(--mod-breadcrumbs-focus-indicator-thickness,var(--spectrum-breadcrumbs-focus-indicator-thickness))*2);border-color:var(--highcontrast-breadcrumbs-focus-indicator-color,var(--mod-breadcrumbs-focus-indicator-color,var(--spectrum-breadcrumbs-focus-indicator-color)));border-style:solid;border-width:var(--mod-breadcrumbs-focus-indicator-thickness,var(--spectrum-breadcrumbs-focus-indicator-thickness));border-radius:var(--mod-breadcrumbs-item-link-border-radius,var(--spectrum-breadcrumbs-item-link-border-radius));pointer-events:none;content:"";margin-block-start:calc((var(--mod-breadcrumbs-focus-indicator-gap,var(--spectrum-breadcrumbs-focus-indicator-gap)) + var(--mod-breadcrumbs-focus-indicator-thickness,var(--spectrum-breadcrumbs-focus-indicator-thickness)))*-1);margin-inline-start:calc((var(--mod-breadcrumbs-focus-indicator-gap,var(--spectrum-breadcrumbs-focus-indicator-gap)) + var(--mod-breadcrumbs-focus-indicator-thickness,var(--spectrum-breadcrumbs-focus-indicator-thickness)))*-1);display:block;position:absolute}:host([hidden]){display:none}:host([disabled]){pointer-events:none}:host([dir]){direction:inherit}
`;var M=Object.defineProperty,z=(e,t,s,r)=>{for(var i,a=void 0,o=e.length-1;o>=0;o--)(i=e[o])&&(a=i(t,s,a)||a);return a&&M(t,s,a),a};class j extends(i(r)){constructor(){super(...arguments),this.value=void 0,this.isLastOfType=!1,this.ancestorDirUnsubscribes=[],this.ambientDir="ltr",this.dirNeedsResolve=!0}static get styles(){return[S,s]}get focusElement(){return this.shadowRoot.querySelector("#item-link")}static get observedAttributes(){return[...super.observedAttributes,"dir","lang"]}attributeChangedCallback(e,t,s){super.attributeChangedCallback(e,t,s),("dir"===e||"lang"===e)&&("dir"===e&&(this.dirNeedsResolve=!0),this.requestUpdate())}connectedCallback(){super.connectedCallback(),this.hasAttribute("role")||this.setAttribute("role","listitem");for(const e of function*(e){let t=e;for(;;){const e=t.assignedSlot||t.parentElement||t.getRootNode().host||null;if(!e)break;yield e,t=e}}(this))this.ancestorDirUnsubscribes.push(t(e,"dir",()=>{this.dirNeedsResolve=!0,this.requestUpdate()}))}willUpdate(){this.dirNeedsResolve&&(this.dirNeedsResolve=!1,this.ambientDir=this.dir)}disconnectedCallback(){this.ancestorDirUnsubscribes.forEach(e=>e()),this.ancestorDirUnsubscribes=[],super.disconnectedCallback()}announceSelected(e){const t=new CustomEvent("breadcrumb-select",{bubbles:!0,composed:!0,detail:{value:e}});this.dispatchEvent(t)}handleClick(e){!this.href&&e&&e.preventDefault(),(!this.href||null!=e&&e.defaultPrevented)&&this.value&&!this.isLastOfType&&this.announceSelected(this.value)}handleKeyDown(e){("Enter"===e.key||13===e.keyCode)&&this.handleClick(e)}renderLink(){var t;return this.classList.contains("is-menu")?o:n`
      <a
        id="item-link"
        href=${l(this.isLastOfType?void 0:this.href)}
        lang=${l(null!=(t=this.getAttribute("lang"))?t:void 0)}
        dir=${l(e(this.getAttribute("dir")))}
        tabindex="0"
        aria-current=${l(this.isLastOfType?"page":void 0)}
        @keydown=${this.handleKeyDown}
        @click=${this.handleClick}
      >
        <slot></slot>
      </a>
    `}renderSeparator(){return n`
      <sp-icon-chevron100
        id="separator"
        size="xs"
        class="spectrum-UIIcon-ChevronRight100"
        dir=${this.ambientDir}
      ></sp-icon-chevron100>
    `}render(){return n`
      ${this.renderLink()}
      <slot name="menu"></slot>
      ${this.renderSeparator()}
    `}updated(e){e.has("disabled")&&(this.disabled?this.setAttribute("aria-disabled","true"):this.removeAttribute("aria-disabled"))}}z([u()],j.prototype,"value"),z([u({type:Boolean})],j.prototype,"isLastOfType"),customElements.define("sp-breadcrumb-item",j);const A=a`
    :host{display:inline-flex}:host([quiet]){min-width:0}:host>sp-menu{display:none}::slotted([slot=icon]),.icon{flex-shrink:0}#popover{max-width:none}::slotted([slot=icon]:dir(ltr)),.icon:dir(ltr){margin-left:calc(-1*(var(--spectrum-actionbutton-textonly-padding-left-adjusted) - var(--spectrum-actionbutton-padding-left-adjusted)))}::slotted([slot=icon]:dir(rtl)),.icon:dir(rtl){margin-right:calc(-1*(var(--spectrum-actionbutton-textonly-padding-left-adjusted) - var(--spectrum-actionbutton-padding-left-adjusted)))}slot[icon-only]::slotted([slot=icon]),slot[icon-only] .icon{margin-inline:calc((var(--custom-actionbutton-edge-to-text,var(--spectrum-actionbutton-edge-to-text)) - var(--custom-actionbutton-edge-to-visual-only,var(--spectrum-actionbutton-edge-to-visual-only)))*-1)}sp-overlay:not(:defined){display:none}
`;var O=Object.defineProperty,L=Object.getOwnPropertyDescriptor,R=(e,t,s,r)=>{for(var i,a=r>1?void 0:r?L(t,s):t,o=e.length-1;o>=0;o--)(i=e[o])&&(a=(r?i(t,s,a):i(a))||a);return r&&a&&O(t,s,a),a};class U extends(b(p(g(h,{noDefaultSize:!0}),"label"),'[slot="label-only"]')){constructor(){super(...arguments),this.selects=void 0,this.deprecatedMenu=null,this.invalid=!1,this.pendingLabel="Pending",this.quiet=!1,this.value="",this.listRole="menu",this.itemRole="menuitem",this.handleEscape=e=>{"Escape"===e.key&&this.open&&(e.stopPropagation(),e.preventDefault(),this.toggle(!1))},this.handleKeydown=e=>{if(this.focused=!0,["ArrowUp","ArrowDown","Enter"," ","Escape"].includes(e.key)){if("Escape"===e.key)return void this.handleEscape(e);e.stopPropagation(),e.preventDefault(),this.keyboardOpen()}},this.applyFocusElementLabel=(e,t)=>{this.appliedLabel=e,this.labelAlignment=t.sideAligned?"inline":void 0},this.hasRenderedOverlay=!1,this.willManageSelection=!1,this.selectionPromise=Promise.resolve(),this.recentlyConnected=!1,this.enterKeydownOn=null,this.handleEnterKeydown=e=>{if("Enter"!==e.key)return;const t=null==e?void 0:e.target;t.open||!t.hasSubmenu?this.enterKeydownOn?e.preventDefault():(this.enterKeydownOn=e.target,this.addEventListener("keyup",async e=>{"Enter"===e.key&&(this.enterKeydownOn=null)},{once:!0})):e.preventDefault()},this.handleSlottableRequest=e=>{this.dispatchEvent(new m(e.name,e.data))}}static get styles(){return[A]}get menuItems(){return this.optionsMenu.childItems}get selfManageFocusElement(){return!0}get selectedItem(){return this._selectedItem}forceFocusVisible(){this.disabled||(this.focused=!0)}click(){this.toggle()}handleButtonClick(){this.disabled||this.toggle()}handleButtonBlur(){this.focused=!1}handleHelperFocus(){this.focused=!0,this.button.focus()}handleFocus(){!this.disabled&&this.focusElement&&(this.focused=this.hasVisibleFocusInTree())}handleChange(e){this.strategy&&(this.strategy.preventNextToggle="no");const t=e.target,[s]=t.selectedItems;e.stopPropagation(),e.cancelable?this.setValueFromItem(s,e):(this.open=!1,this.strategy&&(this.strategy.open=!1))}handleButtonFocus(e){var t;null==(t=this.strategy)||t.handleButtonFocus(e)}async keyboardOpen(){var e;this.open&&this.strategy.open?null==(e=this.optionsMenu)||e.focusOnFirstSelectedItem():(this.addEventListener("sp-opened",()=>{var e;return null==(e=this.optionsMenu)?void 0:e.focusOnFirstSelectedItem()},{once:!0}),this.toggle(!0))}async setValueFromItem(e,t){var s;this.open=!1;const r=this.selectedItem,i=this.value;return this.selectedItem=e,this.value=null!=(s=null==e?void 0:e.value)?s:"",await this.updateComplete,!this.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))&&this.selects?(t&&t.preventDefault(),this.setMenuItemSelected(this.selectedItem,!1),r&&this.setMenuItemSelected(r,!0),this.selectedItem=r,this.value=i,this.open=!0,void(this.strategy&&(this.strategy.open=!0))):this.selects?(r&&this.setMenuItemSelected(r,!1),void this.setMenuItemSelected(e,!!this.selects)):(this.selectedItem=r,void(this.value=i))}setMenuItemSelected(e,t){null!=this.selects&&(e.selected=t)}get containerStyles(){return this.isMobile.matches?{"--swc-menu-width":"100%"}:{}}get selectedItemContent(){return this._selectedItemContent||{icon:[],content:[]}}set selectedItemContent(e){if(e===this.selectedItemContent)return;const t=this.selectedItemContent;this._selectedItemContent=e,this.requestUpdate("selectedItemContent",t)}handleTooltipSlotchange(e){const t=e.target.assignedElements()[0];this.tooltipEl=t,null!=t&&t.selfManaged&&(this.button&&(t.triggerElement=this.button),this.updateComplete.then(()=>{t.selfManaged&&this.button&&(t.triggerElement=this.button)}))}renderLabelContent(e){return this.value&&this.selectedItem?e:n`
      <slot name="label" id="label">
        <span aria-hidden=${l(this.appliedLabel?void 0:"true")}>
          ${this.label}
        </span>
      </slot>
    `}renderLoader(){return import("./swc.DYWkVgq6.js").then(function(e){return e.s}),n`
      <sp-progress-circle
        size="s"
        indeterminate
        role="presentation"
        class="progress-circle"
      ></sp-progress-circle>
    `}get buttonContent(){return[n`
        ${this.labelOnly?o:n`
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
      `]}hasAccessibleLabel(){return!!this.label||!!this.getAttribute("aria-label")||!!this.getAttribute("aria-labelledby")||!!this.appliedLabel||this.hasLabel||this.labelOnly}warnNoLabel(){}renderOverlay(e){var t;const s=this.renderContainer(e);return this.dependencyManager.add("sp-overlay"),import("./swc.CEhxq_nw.js"),n`
      <sp-overlay
        @slottable-request=${this.handleSlottableRequest}
        @beforetoggle=${this.handleBeforetoggle}
        .triggerElement=${this}
        .offset=${0}
        ?open=${this.open&&this.dependencyManager.loaded}
        .placement=${this.isMobile.matches&&!this.forcePopover?void 0:this.placement}
        .type=${this.isMobile.matches&&!this.forcePopover?"modal":"auto"}
        .receivesFocus=${"false"}
        .willPreventClose=${"no"!==(null==(t=this.strategy)?void 0:t.preventNextToggle)&&this.open&&this.dependencyManager.loaded}
      >
        ${s}
      </sp-overlay>
    `}get renderDescriptionSlot(){return n`
      <div id=${v}>
        <slot name="description"></slot>
      </div>
    `}render(){return this.tooltipEl&&(this.tooltipEl.disabled=this.open),n`
      <sp-action-button
        aria-describedby=${v}
        ?quiet=${this.quiet}
        ?selected=${this.open}
        static-color=${l(this.staticColor)}
        aria-haspopup="true"
        aria-controls=${l(this.open?"menu":void 0)}
        aria-expanded=${this.open?"true":"false"}
        aria-label=${l(this.label||void 0)}
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
    `}willUpdate(e){super.willUpdate(e),e.has("tabIndex")&&this.tabIndex&&(this.button.tabIndex=this.tabIndex,this.removeAttribute("tabindex"))}update(e){var t,s;e.has("invalid")&&(this.invalid=!1),this.selects&&(this.selects="single"),e.has("disabled")&&this.disabled&&this.close(),e.has("pending")&&this.pending&&this.close(),e.has("value")&&this.shouldScheduleManageSelection(),this.hasUpdated||(this.deprecatedMenu=this.querySelector(":scope > sp-menu"),null==(t=this.deprecatedMenu)||t.toggleAttribute("ignore",!0),null==(s=this.deprecatedMenu)||s.setAttribute("selects","inherit")),super.update(e)}bindButtonKeydownListener(){this.button.addEventListener("keydown",this.handleKeydown)}updated(e){super.updated(e),e.has("open")&&this.overlayElement&&!this.strategy.overlay&&(this.strategy.overlay=this.overlayElement)}async firstUpdated(e){super.firstUpdated(e),this.bindButtonKeydownListener(),this.bindEvents(),await this.updateComplete,this.overlayElement&&!this.strategy.overlay&&(this.strategy.overlay=this.overlayElement)}get dismissHelper(){return n`
      <div class="visually-hidden">
        <button
          tabindex="-1"
          aria-label="Dismiss"
          @click=${this.close}
        ></button>
      </div>
    `}renderContainer(e){const t=n`
      ${this.dismissHelper} ${e} ${this.dismissHelper}
    `;return this.isMobile.matches&&!this.forcePopover?(this.dependencyManager.add("sp-tray"),import("./swc.B-cNWedY.js"),n`
        <sp-tray
          id="popover"
          role="presentation"
          style=${f(this.containerStyles)}
        >
          ${t}
        </sp-tray>
      `):(this.dependencyManager.add("sp-popover"),import("./swc.DhlHvMiD.js").then(function(e){return e.s}),n`
      <sp-popover
        id="popover"
        role="presentation"
        style=${f(this.containerStyles)}
        placement=${this.placement}
      >
        ${t}
      </sp-popover>
    `)}onScroll(){this.dispatchEvent(new Event("scroll"))}get renderMenu(){const e=n`
      <sp-menu
        aria-labelledby="applied-label"
        @change=${this.handleChange}
        id="menu"
        @keydown=${{handleEvent:this.handleEnterKeydown,capture:!0}}
        ?mobile-view=${this.isMobile.matches&&!this.forcePopover}
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
    `;return this.hasRenderedOverlay=this.hasRenderedOverlay||this.focused||this.open||!!this.deprecatedMenu,this.hasRenderedOverlay?(this.dependencyManager.loaded&&this.dependencyManager.add("sp-overlay"),this.renderOverlay(e)):e}shouldScheduleManageSelection(e){!this.willManageSelection&&(!e||e.target.getRootNode().host===this)&&(this.willManageSelection=!0,requestAnimationFrame(()=>{requestAnimationFrame(()=>{this.manageSelection()})}))}shouldManageSelection(){this.willManageSelection||(this.willManageSelection=!0,this.manageSelection())}async manageSelection(){if(null==this.selects)return;let e;if(this.selectionPromise=new Promise(e=>this.selectionResolver=e),await this.optionsMenu.updateComplete,this.recentlyConnected&&(await new Promise(e=>requestAnimationFrame(()=>e(!0))),this.recentlyConnected=!1),this.menuItems.forEach(t=>{this.value!==t.value||t.disabled?t.selected=!1:e=t}),e)e.selected=!!this.selects,this.selectedItem=e;else{const e=this.menuItems.some(e=>{var t;return null!=e.value||null!=(null==(t=e.getAttribute)?void 0:t.call(e,"value"))});this.menuItems.length>0&&e&&(this.value="",this.selectedItem=void 0)}this.open&&(await this.optionsMenu.updateComplete,this.optionsMenu.updateSelectedItemIndex()),this.selectionResolver(),this.willManageSelection=!1}async getUpdateComplete(){const e=await super.getUpdateComplete();return await this.selectionPromise,e}connectedCallback(){super.connectedCallback(),this.updateComplete.then(()=>{var e;null!=(e=this.tooltipEl)&&e.selfManaged&&this.button&&(this.tooltipEl.triggerElement=this.button)}),this.recentlyConnected=this.hasUpdated,this.addEventListener("focus",this.handleFocus)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("focus",this.handleFocus)}set selectedItem(e){if(this.selectedItemContent=e?e.itemChildren:void 0,e===this.selectedItem)return;const t=this.selectedItem;this._selectedItem=e,this.requestUpdate("selectedItem",t)}get hasLabel(){return this.slotHasContent}get labelOnly(){return this.slotContentIsPresent}}R([u({type:String})],U.prototype,"selects",2),R([y()],U.prototype,"labelAlignment",2),R([y()],U.prototype,"appliedLabel",2),R([u({type:String,reflect:!0})],U.prototype,"icons",2),R([u({type:Boolean,reflect:!0})],U.prototype,"invalid",2),R([u({type:String,attribute:"pending-label"})],U.prototype,"pendingLabel",2),R([u()],U.prototype,"label",2),R([u({reflect:!0,attribute:"static-color"})],U.prototype,"staticColor",2),R([u({type:Boolean,reflect:!0})],U.prototype,"quiet",2),R([u({type:String})],U.prototype,"value",2),R([u({attribute:!1})],U.prototype,"selectedItem",1),R([y()],U.prototype,"selectedItemContent",1),R([y()],U.prototype,"labelOnly",1),d("sp-action-menu",U);const D=a`
    :host{--spectrum-breadcrumbs-block-size:var(--spectrum-breadcrumbs-height);--spectrum-breadcrumbs-block-size-compact:var(--spectrum-breadcrumbs-height-compact);--spectrum-breadcrumbs-block-size-multiline:var(--spectrum-breadcrumbs-height-multiline);--spectrum-breadcrumbs-line-height:var(--spectrum-line-height-100);--spectrum-breadcrumbs-font-size:var(--spectrum-font-size-200);--spectrum-breadcrumbs-font-family:var(--spectrum-sans-font-family-stack);--spectrum-breadcrumbs-font-weight:var(--spectrum-regular-font-weight);--spectrum-breadcrumbs-font-size-current:var(--spectrum-font-size-200);--spectrum-breadcrumbs-font-family-current:var(--spectrum-sans-font-family-stack);--spectrum-breadcrumbs-font-weight-current:var(--spectrum-bold-font-weight);--spectrum-breadcrumbs-font-size-compact:var(--spectrum-font-size-100);--spectrum-breadcrumbs-font-family-compact:var(--spectrum-sans-font-family-stack);--spectrum-breadcrumbs-font-weight-compact:var(--spectrum-regular-font-weight);--spectrum-breadcrumbs-font-size-compact-current:var(--spectrum-font-size-100);--spectrum-breadcrumbs-font-family-compact-current:var(--spectrum-sans-font-family-stack);--spectrum-breadcrumbs-font-weight-compact-current:var(--spectrum-bold-font-weight);--spectrum-breadcrumbs-font-size-multiline:var(--spectrum-font-size-75);--spectrum-breadcrumbs-font-family-multiline:var(--spectrum-sans-font-family-stack);--spectrum-breadcrumbs-font-weight-multiline:var(--spectrum-regular-font-weight);--spectrum-breadcrumbs-font-size-multiline-current:var(--spectrum-font-size-300);--spectrum-breadcrumbs-font-family-multiline-current:var(--spectrum-sans-font-family-stack);--spectrum-breadcrumbs-font-weight-multiline-current:var(--spectrum-bold-font-weight);--spectrum-breadcrumbs-text-decoration-thickness:var(--spectrum-text-underline-thickness);--spectrum-breadcrumbs-text-decoration-gap:var(--spectrum-text-underline-gap);--spectrum-breadcrumbs-separator-spacing-inline:var(--spectrum-text-to-visual-100);--spectrum-breadcrumbs-text-spacing-block-start:var(--spectrum-breadcrumbs-top-to-text);--spectrum-breadcrumbs-text-spacing-block-end:var(--spectrum-breadcrumbs-bottom-to-text);--spectrum-breadcrumbs-icon-spacing-block:var(--spectrum-breadcrumbs-top-to-separator-icon);--spectrum-breadcrumbs-text-spacing-block-start-compact:var(--spectrum-breadcrumbs-top-to-text-compact);--spectrum-breadcrumbs-text-spacing-block-end-compact:var(--spectrum-breadcrumbs-bottom-to-text-compact);--spectrum-breadcrumbs-icon-spacing-block-compact:var(--spectrum-breadcrumbs-top-to-separator-icon-compact);--spectrum-breadcrumbs-text-spacing-block-start-multiline:var(--spectrum-breadcrumbs-top-to-text-multiline);--spectrum-breadcrumbs-text-spacing-block-end-multiline:var(--spectrum-breadcrumbs-bottom-to-text-multiline);--spectrum-breadcrumbs-text-spacing-block-between-multiline:var(--spectrum-breadcrumbs-top-text-to-bottom-text);--spectrum-breadcrumbs-icon-spacing-block-start-multiline:var(--spectrum-breadcrumbs-top-to-separator-icon-multiline);--spectrum-breadcrumbs-icon-spacing-block-between-multiline:var(--spectrum-breadcrumbs-separator-icon-to-bottom-text-multiline);--spectrum-breadcrumbs-inline-start:var(--spectrum-breadcrumbs-start-edge-to-text);--spectrum-breadcrumbs-inline-end:var(--spectrum-breadcrumbs-end-edge-to-text);--spectrum-breadcrumbs-action-button-spacing-inline:var(--spectrum-breadcrumbs-truncated-menu-to-separator-icon);--spectrum-breadcrumbs-action-button-spacing-block:var(--spectrum-breadcrumbs-top-to-truncated-menu);--spectrum-breadcrumbs-action-button-spacing-block-compact:var(--spectrum-breadcrumbs-top-to-truncated-menu-compact);--spectrum-breadcrumbs-action-button-spacing-inline-start:var(--spectrum-breadcrumbs-start-edge-to-truncated-menu);--spectrum-breadcrumbs-action-button-spacing-block-multiline:var(--spectrum-breadcrumbs-top-to-truncated-menu-compact);--spectrum-breadcrumbs-action-button-spacing-block-between-multiline:var(--spectrum-breadcrumbs-truncated-menu-to-bottom-text);--spectrum-breadcrumbs-focus-indicator-thickness:var(--spectrum-focus-indicator-thickness);--spectrum-breadcrumbs-focus-indicator-gap:var(--spectrum-focus-indicator-gap);--spectrum-breadcrumbs-item-link-border-radius:var(--spectrum-corner-radius-100);--spectrum-breadcrumbs-text-color:var(--spectrum-neutral-subdued-content-color-default);--spectrum-breadcrumbs-text-color-current:var(--spectrum-neutral-content-color-default);--spectrum-breadcrumbs-text-color-disabled:var(--spectrum-disabled-content-color);--spectrum-breadcrumbs-separator-color:var(--spectrum-neutral-content-color-default);--spectrum-breadcrumbs-action-button-color:var(--spectrum-neutral-subdued-content-color-default);--spectrum-breadcrumbs-action-button-color-disabled:var(--spectrum-disabled-content-color);--spectrum-breadcrumbs-focus-indicator-color:var(--spectrum-focus-indicator-color)}@media (forced-colors:active){:host{--highcontrast-breadcrumbs-text-color:LinkText;--highcontrast-breadcrumbs-text-color-current:CanvasText;--highcontrast-breadcrumbs-text-color-disabled:GrayText;--highcontrast-breadcrumbs-separator-color:CanvasText;--highcontrast-breadcrumbs-action-button-color:LinkText;--highcontrast-breadcrumbs-action-button-color-disabled:GrayText;--highcontrast-breadcrumbs-focus-indicator-color:CanvasText}}#list{block-size:var(--mod-breadcrumbs-block-size,var(--spectrum-breadcrumbs-block-size));flex-flow:row;flex:1 0;justify-content:flex-start;align-items:center;margin:0;padding-inline-start:var(--mod-breadcrumbs-inline-start,var(--spectrum-breadcrumbs-inline-start));padding-inline-end:var(--mod-breadcrumbs-inline-end,var(--spectrum-breadcrumbs-inline-end));list-style-type:none;display:flex}:host([compact]) #list{block-size:var(--mod-breadcrumbs-block-size-compact,var(--spectrum-breadcrumbs-block-size-compact))}.spectrum-Breadcrumbs--multiline{block-size:var(--mod-breadcrumbs-block-size-multiline,var(--spectrum-breadcrumbs-block-size-multiline));flex-wrap:wrap;align-content:center}:host([compact]) ::slotted(sp-breadcrumb-item){font-family:var(--mod-breadcrumbs-font-family-compact,var(--spectrum-breadcrumbs-font-family-compact));font-size:var(--mod-breadcrumbs-font-size-compact,var(--spectrum-breadcrumbs-font-size-compact));font-weight:var(--mod-breadcrumbs-font-weight-compact,var(--spectrum-breadcrumbs-font-weight-compact))}:host([compact]) ::slotted(:last-of-type){font-family:var(--mod-breadcrumbs-font-family-compact-current,var(--spectrum-breadcrumbs-font-family-compact-current));font-size:var(--mod-breadcrumbs-font-size-compact-current,var(--spectrum-breadcrumbs-font-size-compact-current));font-weight:var(--mod-breadcrumbs-font-weight-compact-current,var(--spectrum-breadcrumbs-font-weight-compact-current))}:host{display:block}:host([compact]){--mod-breadcrumbs-icon-spacing-block:var(--mod-breadcrumbs-icon-spacing-block-compact,var(--spectrum-breadcrumbs-icon-spacing-block-compact));--mod-breadcrumbs-text-spacing-block-start:var(--mod-breadcrumbs-text-spacing-block-start-compact,var(--spectrum-breadcrumbs-text-spacing-block-start-compact));--mod-breadcrumbs-text-spacing-block-end:var(--mod-breadcrumbs-text-spacing-block-end-compact,var(--spectrum-breadcrumbs-text-spacing-block-end-compact));--mod-breadcrumbs-action-button-spacing-block:var(--mod-breadcrumbs-action-button-spacing-block-compact,var(--spectrum-breadcrumbs-action-button-spacing-block-compact))}slot[slot=icon]::slotted([slot=icon]),slot[slot=icon] .icon{margin-inline:calc((var(--custom-actionbutton-edge-to-text,var(--spectrum-actionbutton-edge-to-text)) - var(--custom-actionbutton-edge-to-visual-only,var(--spectrum-actionbutton-edge-to-visual-only)))*-1)}
`;var P=Object.defineProperty,T=(e,t,s,r)=>{for(var i,a=void 0,o=e.length-1;o>=0;o--)(i=e[o])&&(a=i(t,s,a)||a);return a&&P(t,s,a),a};class B extends c{constructor(){super(...arguments),this.maxVisibleItems=4,this.label="",this.menuLabel="More items",this.compact=!1,this.items=[],this.visibleItems=0,this.firstRender=!0,this.itemAttributeUnsubscribes=[],this.menuRef=new C}static get styles(){return[D]}get hasMenu(){var e,t;return this.visibleItems<(null!=(t=null==(e=this.breadcrumbsElements)?void 0:e.length)?t:0)}connectedCallback(){super.connectedCallback(),this.hasAttribute("role")||this.setAttribute("role","navigation"),this.resizeObserver=new ResizeObserver(()=>{this.firstRender?this.firstRender=!1:this.adjustOverflow()}),this.resizeObserver.observe(this)}disconnectedCallback(){var e;null==(e=this.resizeObserver)||e.unobserve(this),this.itemAttributeUnsubscribes.forEach(e=>e()),this.itemAttributeUnsubscribes=[],super.disconnectedCallback()}updated(e){super.updated(e),e.has("label")&&this.setAttribute("aria-label",this.label||"Breadcrumbs"),(e.has("maxVisibleItems")||e.has("compact"))&&(this.calculateBreadcrumbItemsWidth(),this.adjustOverflow()),e.has("visibleItems")&&this.items.forEach((e,t)=>{this.breadcrumbsElements[t].isLastOfType=t===this.breadcrumbsElements.length-1,this.breadcrumbsElements[t].toggleAttribute("hidden",!e.isVisible)})}calculateBreadcrumbItemsWidth(){this.items=this.breadcrumbsElements.map((t,s)=>{var r;let i=t.offsetWidth;return t.hasAttribute("hidden")&&(t.removeAttribute("hidden"),i=t.offsetWidth,t.setAttribute("hidden","")),{label:t.innerText,href:t.href,value:t.value||s.toString(),offsetWidth:i,isVisible:!0,lang:null!=(r=t.getAttribute("lang"))?r:void 0,dir:e(t.getAttribute("dir"))}})}watchItemAttributes(){this.itemAttributeUnsubscribes.forEach(e=>e()),this.itemAttributeUnsubscribes=this.breadcrumbsElements.flatMap((s,r)=>["lang","dir"].map(i=>t(s,i,()=>{this.items=this.items.map((t,i)=>{var a;return i===r?{...t,lang:null!=(a=s.getAttribute("lang"))?a:void 0,dir:e(s.getAttribute("dir"))}:t})})))}adjustOverflow(){let e=0,t=0;const s=this.list.clientWidth;this.hasMenu&&this.menuRef.value&&(e+=this.menuRef.value.offsetWidth||0),this.rootElement.length>0&&(e+=this.rootElement[0].offsetWidth);for(let r=this.items.length-1;r>=0;r--){if(e+=this.items[r].offsetWidth,!(e<s&&t<Math.max(this.maxVisibleItems,1))){for(let e=r;e>=0;e--)this.items[e].isVisible=!1;break}this.items[r].isVisible=!0,t++}0===t&&(this.items[this.items.length-1].isVisible=!0,t++),t!==this.visibleItems&&(this.visibleItems=t)}announceChange(e){const t=new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:e}});this.dispatchEvent(t)}handleSelect(e){e.stopPropagation(),this.announceChange(e.detail.value)}handleMenuChange(e){e.stopPropagation(),this.announceChange(e.target.value)}renderMenu(){return n`
      <sp-breadcrumb-item role="listitem" class="is-menu">
        <sp-action-menu
          ${I(this.menuRef)}
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

          ${this.items.map(e=>n`
              <sp-menu-item
                href=${l(e.href)}
                value=${e.value}
                lang=${l(e.lang)}
                dir=${l(e.dir)}
              >
                ${e.label}
              </sp-menu-item>
            `)}
        </sp-action-menu>
      </sp-breadcrumb-item>
    `}async slotChangeHandler(){if(0===this.breadcrumbsElements.length)return this.items=[],this.visibleItems=0,this.itemAttributeUnsubscribes.forEach(e=>e()),void(this.itemAttributeUnsubscribes=[]);await Promise.all(this.breadcrumbsElements.map(e=>e.updateComplete)),this.calculateBreadcrumbItemsWidth(),this.watchItemAttributes(),this.visibleItems=0,this.adjustOverflow()}render(){return n`
      <ul @breadcrumb-select=${this.handleSelect} id="list">
        <slot name="root"></slot>
        ${this.hasMenu?this.renderMenu():""}
        <slot @slotchange=${this.slotChangeHandler}></slot>
      </ul>
    `}}T([u({type:Number,attribute:"max-visible-items"})],B.prototype,"maxVisibleItems"),T([u({type:String})],B.prototype,"label"),T([u({type:String,attribute:"menu-label"})],B.prototype,"menuLabel"),T([u({type:Boolean})],B.prototype,"compact"),T([x({selector:"sp-breadcrumb-item"})],B.prototype,"breadcrumbsElements"),T([x({slot:"root",selector:"sp-breadcrumb-item"})],B.prototype,"rootElement"),T([$("#list")],B.prototype,"list"),T([y()],B.prototype,"items"),T([y()],B.prototype,"visibleItems"),customElements.define("sp-breadcrumbs",B);
//# sourceMappingURL=swc.DLo6iRdS.js.map
