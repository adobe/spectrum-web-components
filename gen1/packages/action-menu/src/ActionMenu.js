"use strict";var b=Object.defineProperty;var f=Object.getOwnPropertyDescriptor;var i=(c,a,e,t)=>{for(var s=t>1?void 0:t?f(a,e):a,l=c.length-1,r;l>=0;l--)(r=c[l])&&(s=(t?r(a,e,s):r(s))||s);return t&&s&&b(a,e,s),s};import{html as n,nothing as y,SizedMixin as v}from"@spectrum-web-components/base";import{state as d}from"@spectrum-web-components/base/src/decorators.js";import{property as o}from"@spectrum-web-components/base/src/decorators.js";import{ifDefined as h,styleMap as u}from"@spectrum-web-components/base/src/directives.js";import{SlottableRequestEvent as g}from"@spectrum-web-components/overlay/src/slottable-request-event.js";import{DESCRIPTION_ID as m,ExpandableElement as w}from"@spectrum-web-components/picker";import{ObserveSlotPresence as I}from"@spectrum-web-components/shared/src/observe-slot-presence.js";import{ObserveSlotText as E}from"@spectrum-web-components/shared/src/observe-slot-text.js";import"@spectrum-web-components/action-button/sp-action-button.js";import"@spectrum-web-components/icons-workflow/icons/sp-icon-more.js";import S from"./action-menu.css.js";export class ActionMenu extends I(E(v(w,{noDefaultSize:!0}),"label"),'[slot="label-only"]'){constructor(){super(...arguments);this.selects=void 0;this.deprecatedMenu=null;this.invalid=!1;this.pendingLabel="Pending";this.quiet=!1;this.value="";this.listRole="menu";this.itemRole="menuitem";this.handleEscape=e=>{e.key==="Escape"&&this.open&&(e.stopPropagation(),e.preventDefault(),this.toggle(!1))};this.handleKeydown=e=>{if(this.focused=!0,!!["ArrowUp","ArrowDown","Enter"," ","Escape"].includes(e.key)){if(e.key==="Escape"){this.handleEscape(e);return}e.stopPropagation(),e.preventDefault(),this.keyboardOpen()}};this.applyFocusElementLabel=(e,t)=>{this.appliedLabel=e,this.labelAlignment=t.sideAligned?"inline":void 0};this.hasRenderedOverlay=!1;this.willManageSelection=!1;this.selectionPromise=Promise.resolve();this.recentlyConnected=!1;this.enterKeydownOn=null;this.handleEnterKeydown=e=>{if(e.key!=="Enter")return;const t=e==null?void 0:e.target;if(!t.open&&t.hasSubmenu){e.preventDefault();return}if(this.enterKeydownOn){e.preventDefault();return}this.enterKeydownOn=e.target,this.addEventListener("keyup",async s=>{s.key==="Enter"&&(this.enterKeydownOn=null)},{once:!0})};this.handleSlottableRequest=e=>{this.dispatchEvent(new g(e.name,e.data))}}static get styles(){return[S]}get menuItems(){return this.optionsMenu.childItems}get selfManageFocusElement(){return!0}get selectedItem(){return this._selectedItem}forceFocusVisible(){this.disabled||(this.focused=!0)}click(){this.toggle()}handleButtonClick(){this.disabled||this.toggle()}handleButtonBlur(){this.focused=!1}handleHelperFocus(){this.focused=!0,this.button.focus()}handleFocus(){!this.disabled&&this.focusElement&&(this.focused=this.hasVisibleFocusInTree())}handleChange(e){this.strategy&&(this.strategy.preventNextToggle="no");const t=e.target,[s]=t.selectedItems;e.stopPropagation(),e.cancelable?this.setValueFromItem(s,e):(this.open=!1,this.strategy&&(this.strategy.open=!1))}handleButtonFocus(e){var t;(t=this.strategy)==null||t.handleButtonFocus(e)}async keyboardOpen(){var e;!this.open||!this.strategy.open?(this.addEventListener("sp-opened",()=>{var t;return(t=this.optionsMenu)==null?void 0:t.focusOnFirstSelectedItem()},{once:!0}),this.toggle(!0)):(e=this.optionsMenu)==null||e.focusOnFirstSelectedItem()}async setValueFromItem(e,t){var p;this.open=!1;const s=this.selectedItem,l=this.value;if(this.selectedItem=e,this.value=(p=e==null?void 0:e.value)!=null?p:"",await this.updateComplete,!this.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))&&this.selects){t&&t.preventDefault(),this.setMenuItemSelected(this.selectedItem,!1),s&&this.setMenuItemSelected(s,!0),this.selectedItem=s,this.value=l,this.open=!0,this.strategy&&(this.strategy.open=!0);return}else if(!this.selects){this.selectedItem=s,this.value=l;return}s&&this.setMenuItemSelected(s,!1),this.setMenuItemSelected(e,!!this.selects)}setMenuItemSelected(e,t){this.selects!=null&&(e.selected=t)}get containerStyles(){return this.isMobile.matches?{"--swc-menu-width":"100%"}:{}}get selectedItemContent(){return this._selectedItemContent||{icon:[],content:[]}}set selectedItemContent(e){if(e===this.selectedItemContent)return;const t=this.selectedItemContent;this._selectedItemContent=e,this.requestUpdate("selectedItemContent",t)}handleTooltipSlotchange(e){const t=e.target.assignedElements()[0];this.tooltipEl=t,t!=null&&t.selfManaged&&(this.button&&(t.triggerElement=this.button),this.updateComplete.then(()=>{t.selfManaged&&this.button&&(t.triggerElement=this.button)}))}renderLabelContent(e){return this.value&&this.selectedItem?e:n`
      <slot name="label" id="label">
        <span aria-hidden=${h(this.appliedLabel?void 0:"true")}>
          ${this.label}
        </span>
      </slot>
    `}renderLoader(){return import("@spectrum-web-components/progress-circle/sp-progress-circle.js"),n`
      <sp-progress-circle
        size="s"
        indeterminate
        role="presentation"
        class="progress-circle"
      ></sp-progress-circle>
    `}get buttonContent(){return[n`
        ${this.labelOnly?y:n`
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
      `]}hasAccessibleLabel(){return!!this.label||!!this.getAttribute("aria-label")||!!this.getAttribute("aria-labelledby")||!!this.appliedLabel||this.hasLabel||this.labelOnly}warnNoLabel(){}renderOverlay(e){var s;const t=this.renderContainer(e);return this.dependencyManager.add("sp-overlay"),import("@spectrum-web-components/overlay/sp-overlay.js"),n`
      <sp-overlay
        @slottable-request=${this.handleSlottableRequest}
        @beforetoggle=${this.handleBeforetoggle}
        .triggerElement=${this}
        .offset=${0}
        ?open=${this.open&&this.dependencyManager.loaded}
        .placement=${this.isMobile.matches&&!this.forcePopover?void 0:this.placement}
        .type=${this.isMobile.matches&&!this.forcePopover?"modal":"auto"}
        .receivesFocus=${"false"}
        .willPreventClose=${((s=this.strategy)==null?void 0:s.preventNextToggle)!=="no"&&this.open&&this.dependencyManager.loaded}
      >
        ${t}
      </sp-overlay>
    `}get renderDescriptionSlot(){return n`
      <div id=${m}>
        <slot name="description"></slot>
      </div>
    `}render(){return this.tooltipEl&&(this.tooltipEl.disabled=this.open),n`
      <sp-action-button
        aria-describedby=${m}
        ?quiet=${this.quiet}
        ?selected=${this.open}
        static-color=${h(this.staticColor)}
        aria-haspopup="true"
        aria-controls=${h(this.open?"menu":void 0)}
        aria-expanded=${this.open?"true":"false"}
        aria-label=${h(this.label||void 0)}
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
    `}willUpdate(e){super.willUpdate(e),e.has("tabIndex")&&this.tabIndex&&(this.button.tabIndex=this.tabIndex,this.removeAttribute("tabindex"))}update(e){var t,s;e.has("invalid")&&(this.invalid=!1),this.selects&&(this.selects="single"),e.has("disabled")&&this.disabled&&this.close(),e.has("pending")&&this.pending&&this.close(),e.has("value")&&this.shouldScheduleManageSelection(),this.hasUpdated||(this.deprecatedMenu=this.querySelector(":scope > sp-menu"),(t=this.deprecatedMenu)==null||t.toggleAttribute("ignore",!0),(s=this.deprecatedMenu)==null||s.setAttribute("selects","inherit")),super.update(e)}bindButtonKeydownListener(){this.button.addEventListener("keydown",this.handleKeydown)}updated(e){super.updated(e),e.has("open")&&this.overlayElement&&!this.strategy.overlay&&(this.strategy.overlay=this.overlayElement)}async firstUpdated(e){super.firstUpdated(e),this.bindButtonKeydownListener(),this.bindEvents(),await this.updateComplete,this.overlayElement&&!this.strategy.overlay&&(this.strategy.overlay=this.overlayElement)}get dismissHelper(){return n`
      <div class="visually-hidden">
        <button
          tabindex="-1"
          aria-label="Dismiss"
          @click=${this.close}
        ></button>
      </div>
    `}renderContainer(e){const t=n`
      ${this.dismissHelper} ${e} ${this.dismissHelper}
    `;return this.isMobile.matches&&!this.forcePopover?(this.dependencyManager.add("sp-tray"),import("@spectrum-web-components/tray/sp-tray.js"),n`
        <sp-tray
          id="popover"
          role="presentation"
          style=${u(this.containerStyles)}
        >
          ${t}
        </sp-tray>
      `):(this.dependencyManager.add("sp-popover"),import("@spectrum-web-components/popover/sp-popover.js"),n`
      <sp-popover
        id="popover"
        role="presentation"
        style=${u(this.containerStyles)}
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
    `;return this.hasRenderedOverlay=this.hasRenderedOverlay||this.focused||this.open||!!this.deprecatedMenu,this.hasRenderedOverlay?(this.dependencyManager.loaded&&this.dependencyManager.add("sp-overlay"),this.renderOverlay(e)):e}shouldScheduleManageSelection(e){!this.willManageSelection&&(!e||e.target.getRootNode().host===this)&&(this.willManageSelection=!0,requestAnimationFrame(()=>{requestAnimationFrame(()=>{this.manageSelection()})}))}shouldManageSelection(){this.willManageSelection||(this.willManageSelection=!0,this.manageSelection())}async manageSelection(){if(this.selects==null)return;this.selectionPromise=new Promise(t=>this.selectionResolver=t);let e;if(await this.optionsMenu.updateComplete,this.recentlyConnected&&(await new Promise(t=>requestAnimationFrame(()=>t(!0))),this.recentlyConnected=!1),this.menuItems.forEach(t=>{this.value===t.value&&!t.disabled?e=t:t.selected=!1}),e)e.selected=!!this.selects,this.selectedItem=e;else{const t=this.menuItems.some(s=>{var l;return s.value!=null||((l=s.getAttribute)==null?void 0:l.call(s,"value"))!=null});this.menuItems.length>0&&t&&(this.value="",this.selectedItem=void 0)}this.open&&(await this.optionsMenu.updateComplete,this.optionsMenu.updateSelectedItemIndex()),this.selectionResolver(),this.willManageSelection=!1}async getUpdateComplete(){const e=await super.getUpdateComplete();return await this.selectionPromise,e}connectedCallback(){super.connectedCallback(),this.updateComplete.then(()=>{var e;(e=this.tooltipEl)!=null&&e.selfManaged&&this.button&&(this.tooltipEl.triggerElement=this.button)}),this.recentlyConnected=this.hasUpdated,this.addEventListener("focus",this.handleFocus)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("focus",this.handleFocus)}set selectedItem(e){if(this.selectedItemContent=e?e.itemChildren:void 0,e===this.selectedItem)return;const t=this.selectedItem;this._selectedItem=e,this.requestUpdate("selectedItem",t)}get hasLabel(){return this.slotHasContent}get labelOnly(){return this.slotContentIsPresent}}i([o({type:String})],ActionMenu.prototype,"selects",2),i([d()],ActionMenu.prototype,"labelAlignment",2),i([d()],ActionMenu.prototype,"appliedLabel",2),i([o({type:String,reflect:!0})],ActionMenu.prototype,"icons",2),i([o({type:Boolean,reflect:!0})],ActionMenu.prototype,"invalid",2),i([o({type:String,attribute:"pending-label"})],ActionMenu.prototype,"pendingLabel",2),i([o()],ActionMenu.prototype,"label",2),i([o({reflect:!0,attribute:"static-color"})],ActionMenu.prototype,"staticColor",2),i([o({type:Boolean,reflect:!0})],ActionMenu.prototype,"quiet",2),i([o({type:String})],ActionMenu.prototype,"value",2),i([o({attribute:!1})],ActionMenu.prototype,"selectedItem",1),i([d()],ActionMenu.prototype,"selectedItemContent",1),i([d()],ActionMenu.prototype,"labelOnly",1);
//# sourceMappingURL=ActionMenu.js.map
