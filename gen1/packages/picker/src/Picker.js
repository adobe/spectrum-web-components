"use strict";var C=Object.defineProperty;var L=Object.getOwnPropertyDescriptor;var n=(b,u,e,t)=>{for(var s=t>1?void 0:t?L(u,e):u,i=b.length-1,r;i>=0;i--)(r=b[i])&&(s=(t?r(u,e,s):r(s))||s);return t&&s&&C(u,e,s),s};import{html as l,nothing as f,SizedMixin as v,SpectrumElement as w}from"@spectrum-web-components/base";import{property as o,query as g,state as m}from"@spectrum-web-components/base/src/decorators.js";import{classMap as I,ifDefined as h,styleMap as y}from"@spectrum-web-components/base/src/directives.js";import A from"@spectrum-web-components/icon/src/spectrum-icon-chevron.css.js";import{DependencyManagerController as R}from"@spectrum-web-components/reactive-controllers/src/DependencyManger.js";import{IS_MOBILE as T,IS_TOUCH_DEVICE as D,MatchMediaController as M}from"@spectrum-web-components/reactive-controllers/src/MatchMedia.js";import"@spectrum-web-components/icons-ui/icons/sp-icon-chevron100.js";import"@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js";import"@spectrum-web-components/menu/sp-menu.js";import F from"./picker.css.js";import{strategies as S}from"./strategies.js";const $={s:"spectrum-UIIcon-ChevronDown75",m:"spectrum-UIIcon-ChevronDown100",l:"spectrum-UIIcon-ChevronDown200",xl:"spectrum-UIIcon-ChevronDown300"};export const DESCRIPTION_ID="option-picker";export class ExpandableElement extends w{constructor(){super(...arguments);this.isMobile=new M(this,T);this.isTouchDevice=new M(this,D);this.dependencyManager=new R(this);this.disabled=!1;this.focused=!1;this.readonly=!1;this.pending=!1;this.forcePopover=!1;this.open=!1;this.placement="bottom-start";this.handleSlottableRequest=e=>{};this.handleBeforetoggle=e=>{var t,s,i,r,a,d,c,p;if(e.composedPath()[0]===e.target){if(e.newState==="closed"){const E=((t=this.optionsMenu)==null?void 0:t.matches(":focus-within"))&&!((s=this.button)!=null&&s.matches(":focus"));this.open?((i=this.strategy)==null?void 0:i.preventNextToggle)==="no"?this.open=!1:(r=this.strategy)!=null&&r.pointerdownState||(a=this.overlayElement)==null||a.manuallyKeepOpen():this.strategy&&(this.strategy.open=!1),E&&!this.open&&((d=this.button)==null||d.focus())}this.open||((c=this.optionsMenu)==null||c.updateSelectedItemIndex(),(p=this.optionsMenu)==null||p.closeDescendentOverlays())}}}get focusElement(){return this.open?this.optionsMenu:this.button}focus(e){var t;(t=this.focusElement)==null||t.focus(e)}close(){this.readonly||this.strategy&&(this.open=!1,this.strategy.open=!1)}toggle(e){if(this.readonly||this.pending||this.disabled)return;const t=typeof e!="undefined"?e:!this.open;this.open=t,this.strategy&&(this.strategy.open=this.open)}bindEvents(){var e;(e=this.strategy)==null||e.abort(),this.isMobile.matches?this.strategy=new S.mobile(this.button,this):this.strategy=new S.desktop(this.button,this)}disconnectedCallback(){var e;this.close(),(e=this.strategy)==null||e.releaseDescription(),super.disconnectedCallback()}}ExpandableElement.shadowRootOptions={...w.shadowRootOptions,delegatesFocus:!0},n([g("#button")],ExpandableElement.prototype,"button",2),n([o({type:Boolean,reflect:!0})],ExpandableElement.prototype,"disabled",2),n([o({type:Boolean,reflect:!0})],ExpandableElement.prototype,"focused",2),n([o({type:Boolean,reflect:!0})],ExpandableElement.prototype,"readonly",2),n([o({type:Boolean,reflect:!0})],ExpandableElement.prototype,"pending",2),n([o({type:Boolean,reflect:!0,attribute:"force-popover"})],ExpandableElement.prototype,"forcePopover",2),n([o({type:Boolean,reflect:!0})],ExpandableElement.prototype,"open",2),n([g("sp-menu")],ExpandableElement.prototype,"optionsMenu",2),n([g("sp-overlay")],ExpandableElement.prototype,"overlayElement",2),n([o()],ExpandableElement.prototype,"placement",2);export class PickerBase extends v(ExpandableElement,{noDefaultSize:!0}){constructor(){super(...arguments);this.deprecatedMenu=null;this.invalid=!1;this.pendingLabel="Pending";this.selects="single";this.quiet=!1;this.value="";this.listRole="listbox";this.itemRole="option";this.handleEscape=e=>{e.key==="Escape"&&this.open&&(e.stopPropagation(),e.preventDefault(),this.toggle(!1))};this.handleKeydown=e=>{if(this.focused=!0,!!["ArrowUp","ArrowDown","Enter"," ","Escape"].includes(e.key)){if(e.key==="Escape"){this.handleEscape(e);return}e.stopPropagation(),e.preventDefault(),this.keyboardOpen()}};this.applyFocusElementLabel=(e,t)=>{this.appliedLabel=e,this.labelAlignment=t.sideAligned?"inline":void 0};this.hasRenderedOverlay=!1;this.willManageSelection=!1;this.selectionPromise=Promise.resolve();this.recentlyConnected=!1;this.enterKeydownOn=null;this.handleEnterKeydown=e=>{if(e.key!=="Enter")return;const t=e==null?void 0:e.target;if(!t.open&&t.hasSubmenu){e.preventDefault();return}if(this.enterKeydownOn){e.preventDefault();return}this.enterKeydownOn=e.target,this.addEventListener("keyup",async s=>{s.key==="Enter"&&(this.enterKeydownOn=null)},{once:!0})}}get menuItems(){return this.optionsMenu.childItems}get selfManageFocusElement(){return!0}get selectedItem(){return this._selectedItem}set selectedItem(e){if(this.selectedItemContent=e?e.itemChildren:void 0,e===this.selectedItem)return;const t=this.selectedItem;this._selectedItem=e,this.requestUpdate("selectedItem",t)}forceFocusVisible(){this.disabled||(this.focused=!0)}click(){this.toggle()}handleButtonClick(){this.disabled||this.toggle()}handleButtonBlur(){this.focused=!1}focus(e){var t;(t=this.focusElement)==null||t.focus(e)}handleHelperFocus(){this.focused=!0,this.button.focus()}handleFocus(){!this.disabled&&this.focusElement&&(this.focused=this.hasVisibleFocusInTree())}handleChange(e){this.strategy&&(this.strategy.preventNextToggle="no");const t=e.target,[s]=t.selectedItems;e.stopPropagation(),e.cancelable?this.setValueFromItem(s,e):(this.open=!1,this.strategy&&(this.strategy.open=!1))}handleButtonFocus(e){var t;(t=this.strategy)==null||t.handleButtonFocus(e)}async keyboardOpen(){var e;!this.open||!this.strategy.open?(this.addEventListener("sp-opened",()=>{var t;return(t=this.optionsMenu)==null?void 0:t.focusOnFirstSelectedItem()},{once:!0}),this.toggle(!0)):(e=this.optionsMenu)==null||e.focusOnFirstSelectedItem()}async setValueFromItem(e,t){var a;this.open=!1;const s=this.selectedItem,i=this.value;if(this.selectedItem=e,this.value=(a=e==null?void 0:e.value)!=null?a:"",await this.updateComplete,!this.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))&&this.selects){t&&t.preventDefault(),this.setMenuItemSelected(this.selectedItem,!1),s&&this.setMenuItemSelected(s,!0),this.selectedItem=s,this.value=i,this.open=!0,this.strategy&&(this.strategy.open=!0);return}else if(!this.selects){this.selectedItem=s,this.value=i;return}s&&this.setMenuItemSelected(s,!1),this.setMenuItemSelected(e,!!this.selects)}setMenuItemSelected(e,t){this.selects!=null&&(e.selected=t)}get containerStyles(){return this.isMobile.matches?{"--swc-menu-width":"100%"}:{}}get selectedItemContent(){return this._selectedItemContent||{icon:[],content:[]}}set selectedItemContent(e){if(e===this.selectedItemContent)return;const t=this.selectedItemContent;this._selectedItemContent=e,this.requestUpdate("selectedItemContent",t)}handleTooltipSlotchange(e){const t=e.target.assignedElements()[0];this.tooltipEl=t,t!=null&&t.selfManaged&&(this.button&&(t.triggerElement=this.button),this.updateComplete.then(()=>{t.selfManaged&&this.button&&(t.triggerElement=this.button)}))}renderLabelContent(e){return this.value&&this.selectedItem?e:l`
      <slot name="label" id="label">
        <span aria-hidden=${h(this.appliedLabel?void 0:"true")}>
          ${this.label}
        </span>
      </slot>
    `}renderLoader(){return import("@spectrum-web-components/progress-circle/sp-progress-circle.js"),l`
      <sp-progress-circle
        size="s"
        indeterminate
        role="presentation"
        class="progress-circle"
      ></sp-progress-circle>
    `}get buttonContent(){const e={"visually-hidden":this.icons==="only"&&!!this.value,placeholder:!this.value,label:!0},t=this.appliedLabel||this.label;return[l`
        <span id="icon" ?hidden=${this.icons==="none"}>
          ${this.selectedItemContent.icon}
        </span>
        <span
          id=${h(this.value&&this.selectedItem?"label":void 0)}
          class=${I(e)}
        >
          ${this.renderLabelContent(this.selectedItemContent.content)}
        </span>
        ${this.value&&this.selectedItem?l`
              <span
                aria-hidden="true"
                class="visually-hidden"
                id="applied-label"
              >
                ${t}
                <slot name="label"></slot>
              </span>
            `:l`
              <span hidden id="applied-label">${t}</span>
            `}
        ${this.invalid&&!this.pending?l`
              <sp-icon-alert class="validation-icon"></sp-icon-alert>
            `:f}
        ${this.pending?l`
              ${this.renderLoader()}
              <span
                aria-hidden="true"
                class="visually-hidden"
                id="pending-label"
              >
                ${this.pendingLabel}
              </span>
            `:f}
        <sp-icon-chevron100
          class="picker ${$[this.size]}"
        ></sp-icon-chevron100>
      `]}hasAccessibleLabel(){var s,i,r,a,d,c,p;const e=((s=this.querySelector('[slot="label"]'))==null?void 0:s.textContent)&&((r=(i=this.querySelector('[slot="label"]'))==null?void 0:i.textContent)==null?void 0:r.trim())!=="",t=((d=(a=this.querySelector('[slot="label"]'))==null?void 0:a.getAttribute("alt"))==null?void 0:d.trim())&&((p=(c=this.querySelector('[slot="label"]'))==null?void 0:c.getAttribute("alt"))==null?void 0:p.trim())!=="";return!!this.label||!!this.getAttribute("aria-label")||!!this.getAttribute("aria-labelledby")||!!this.appliedLabel||!!e||!!t}warnNoLabel(){}renderOverlay(e){var s;const t=this.renderContainer(e);return this.dependencyManager.add("sp-overlay"),import("@spectrum-web-components/overlay/sp-overlay.js"),l`
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
    `}get renderDescriptionSlot(){return l`
      <div id=${DESCRIPTION_ID}>
        <slot name="description"></slot>
      </div>
    `}render(){return this.tooltipEl&&(this.tooltipEl.disabled=this.open),l`
      <button
        aria-controls=${h(this.open?"menu":void 0)}
        aria-describedby="tooltip ${DESCRIPTION_ID}"
        aria-expanded=${this.open?"true":"false"}
        aria-haspopup="true"
        aria-labelledby="icon label applied-label pending-label"
        id="button"
        class=${h(this.labelAlignment?`label-${this.labelAlignment}`:void 0)}
        @focus=${this.handleButtonFocus}
        @blur=${this.handleButtonBlur}
        @keydown=${{handleEvent:this.handleEnterKeydown,capture:!0}}
        ?disabled=${this.disabled}
      >
        ${this.buttonContent}
      </button>
      <slot
        aria-hidden="true"
        name="tooltip"
        id="tooltip"
        @keydown=${this.handleKeydown}
        @slotchange=${this.handleTooltipSlotchange}
      ></slot>
      ${this.renderMenu} ${this.renderDescriptionSlot}
    `}willUpdate(e){super.willUpdate(e),e.has("tabIndex")&&this.tabIndex&&(this.button.tabIndex=this.tabIndex,this.removeAttribute("tabindex"))}update(e){var t,s;this.selects&&(this.selects="single"),e.has("disabled")&&this.disabled&&this.close(),e.has("pending")&&this.pending&&this.close(),e.has("value")&&this.shouldScheduleManageSelection(),this.hasUpdated||(this.deprecatedMenu=this.querySelector(":scope > sp-menu"),(t=this.deprecatedMenu)==null||t.toggleAttribute("ignore",!0),(s=this.deprecatedMenu)==null||s.setAttribute("selects","inherit")),super.update(e)}bindButtonKeydownListener(){this.button.addEventListener("keydown",this.handleKeydown)}updated(e){super.updated(e),e.has("open")&&this.overlayElement&&!this.strategy.overlay&&(this.strategy.overlay=this.overlayElement)}async firstUpdated(e){super.firstUpdated(e),this.bindButtonKeydownListener(),this.bindEvents(),await this.updateComplete,this.overlayElement&&!this.strategy.overlay&&(this.strategy.overlay=this.overlayElement)}get dismissHelper(){return l`
      <div class="visually-hidden">
        <button
          tabindex="-1"
          aria-label="Dismiss"
          @click=${this.close}
        ></button>
      </div>
    `}renderContainer(e){const t=l`
      ${this.dismissHelper} ${e} ${this.dismissHelper}
    `;return this.isMobile.matches&&!this.forcePopover?(this.dependencyManager.add("sp-tray"),import("@spectrum-web-components/tray/sp-tray.js"),l`
        <sp-tray
          id="popover"
          role="presentation"
          style=${y(this.containerStyles)}
        >
          ${t}
        </sp-tray>
      `):(this.dependencyManager.add("sp-popover"),import("@spectrum-web-components/popover/sp-popover.js"),l`
      <sp-popover
        id="popover"
        role="presentation"
        style=${y(this.containerStyles)}
        placement=${this.placement}
      >
        ${t}
      </sp-popover>
    `)}onScroll(){this.dispatchEvent(new Event("scroll"))}get renderMenu(){const e=l`
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
    `;return this.hasRenderedOverlay=this.hasRenderedOverlay||this.focused||this.open||!!this.deprecatedMenu,this.hasRenderedOverlay?(this.dependencyManager.loaded&&this.dependencyManager.add("sp-overlay"),this.renderOverlay(e)):e}shouldScheduleManageSelection(e){!this.willManageSelection&&(!e||e.target.getRootNode().host===this)&&(this.willManageSelection=!0,requestAnimationFrame(()=>{requestAnimationFrame(()=>{this.manageSelection()})}))}shouldManageSelection(){this.willManageSelection||(this.willManageSelection=!0,this.manageSelection())}async manageSelection(){if(this.selects==null)return;this.selectionPromise=new Promise(t=>this.selectionResolver=t);let e;if(await this.optionsMenu.updateComplete,this.recentlyConnected&&(await new Promise(t=>requestAnimationFrame(()=>t(!0))),this.recentlyConnected=!1),this.menuItems.forEach(t=>{this.value===t.value&&!t.disabled?e=t:t.selected=!1}),e)e.selected=!!this.selects,this.selectedItem=e;else{const t=this.menuItems.some(s=>{var i;return s.value!=null||((i=s.getAttribute)==null?void 0:i.call(s,"value"))!=null});this.menuItems.length>0&&t&&(this.value="",this.selectedItem=void 0)}this.open&&(await this.optionsMenu.updateComplete,this.optionsMenu.updateSelectedItemIndex()),this.selectionResolver(),this.willManageSelection=!1}async getUpdateComplete(){const e=await super.getUpdateComplete();return await this.selectionPromise,e}connectedCallback(){super.connectedCallback(),this.updateComplete.then(()=>{var e;(e=this.tooltipEl)!=null&&e.selfManaged&&this.button&&(this.tooltipEl.triggerElement=this.button)}),this.recentlyConnected=this.hasUpdated,this.addEventListener("focus",this.handleFocus)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("focus",this.handleFocus)}}n([m()],PickerBase.prototype,"appliedLabel",2),n([o({type:String,reflect:!0})],PickerBase.prototype,"icons",2),n([o({type:Boolean,reflect:!0})],PickerBase.prototype,"invalid",2),n([o({type:String,attribute:"pending-label"})],PickerBase.prototype,"pendingLabel",2),n([o()],PickerBase.prototype,"label",2),n([m()],PickerBase.prototype,"labelAlignment",2),n([o({type:Boolean,reflect:!0})],PickerBase.prototype,"quiet",2),n([o({type:String})],PickerBase.prototype,"value",2),n([o({attribute:!1})],PickerBase.prototype,"selectedItem",1),n([m()],PickerBase.prototype,"selectedItemContent",1);export class Picker extends v(ExpandableElement,{noDefaultSize:!0}){constructor(){super(...arguments);this.deprecatedMenu=null;this.invalid=!1;this.pendingLabel="Pending";this.selects="single";this.quiet=!1;this.value="";this.listRole="listbox";this.itemRole="option";this.handleEscape=e=>{e.key==="Escape"&&this.open&&(e.stopPropagation(),e.preventDefault(),this.toggle(!1))};this.handleKeydown=e=>{var d;const{key:t}=e,s=["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Enter"," ","Escape"].includes(t),i=["ArrowUp","ArrowDown","Enter"," "].includes(t),r=["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(t);if(this.focused=!0,t==="Escape"){this.handleEscape(e);return}if(!s||this.readonly||this.pending)return;if(i){this.keyboardOpen(),e.preventDefault(),r&&e.stopPropagation();return}e.preventDefault(),e.stopPropagation();const a=(d=this.optionsMenu)==null?void 0:d.getNeighboringFocusableElement(this.selectedItem,t==="ArrowLeft");(!this.value||a!==this.selectedItem)&&a&&this.setValueFromItem(a)};this.applyFocusElementLabel=(e,t)=>{this.appliedLabel=e,this.labelAlignment=t.sideAligned?"inline":void 0};this.hasRenderedOverlay=!1;this.willManageSelection=!1;this.selectionPromise=Promise.resolve();this.recentlyConnected=!1;this.enterKeydownOn=null;this.handleEnterKeydown=e=>{if(e.key!=="Enter")return;const t=e==null?void 0:e.target;if(!t.open&&t.hasSubmenu){e.preventDefault();return}if(this.enterKeydownOn){e.preventDefault();return}this.enterKeydownOn=e.target,this.addEventListener("keyup",async s=>{s.key==="Enter"&&(this.enterKeydownOn=null)},{once:!0})}}static get styles(){return[F,A]}get menuItems(){return this.optionsMenu.childItems}get selfManageFocusElement(){return!0}get selectedItem(){return this._selectedItem}set selectedItem(e){if(this.selectedItemContent=e?e.itemChildren:void 0,e===this.selectedItem)return;const t=this.selectedItem;this._selectedItem=e,this.requestUpdate("selectedItem",t)}forceFocusVisible(){this.disabled||(this.focused=!0)}click(){this.toggle()}handleButtonClick(){this.disabled||this.toggle()}handleButtonBlur(){this.focused=!1}handleHelperFocus(){this.focused=!0,this.button.focus()}handleFocus(){!this.disabled&&this.focusElement&&(this.focused=this.hasVisibleFocusInTree())}handleChange(e){this.strategy&&(this.strategy.preventNextToggle="no");const t=e.target,[s]=t.selectedItems;e.stopPropagation(),e.cancelable?this.setValueFromItem(s,e):(this.open=!1,this.strategy&&(this.strategy.open=!1))}handleButtonFocus(e){var t;(t=this.strategy)==null||t.handleButtonFocus(e)}async keyboardOpen(){var e;!this.open||!this.strategy.open?(this.addEventListener("sp-opened",()=>{var t;return(t=this.optionsMenu)==null?void 0:t.focusOnFirstSelectedItem()},{once:!0}),this.toggle(!0)):(e=this.optionsMenu)==null||e.focusOnFirstSelectedItem()}async setValueFromItem(e,t){var a;this.open=!1;const s=this.selectedItem,i=this.value;if(this.selectedItem=e,this.value=(a=e==null?void 0:e.value)!=null?a:"",await this.updateComplete,!this.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))&&this.selects){t&&t.preventDefault(),this.setMenuItemSelected(this.selectedItem,!1),s&&this.setMenuItemSelected(s,!0),this.selectedItem=s,this.value=i,this.open=!0,this.strategy&&(this.strategy.open=!0);return}else if(!this.selects){this.selectedItem=s,this.value=i;return}s&&this.setMenuItemSelected(s,!1),this.setMenuItemSelected(e,!!this.selects)}setMenuItemSelected(e,t){this.selects!=null&&(e.selected=t)}get containerStyles(){const e={};return this.quiet||(e["min-width"]=`${this.offsetWidth}px`),this.isMobile.matches&&(e["--swc-menu-width"]="100%"),e}get selectedItemContent(){return this._selectedItemContent||{icon:[],content:[]}}set selectedItemContent(e){if(e===this.selectedItemContent)return;const t=this.selectedItemContent;this._selectedItemContent=e,this.requestUpdate("selectedItemContent",t)}handleTooltipSlotchange(e){const t=e.target.assignedElements()[0];this.tooltipEl=t,t!=null&&t.selfManaged&&(this.button&&(t.triggerElement=this.button),this.updateComplete.then(()=>{t.selfManaged&&this.button&&(t.triggerElement=this.button)}))}renderLabelContent(e){return this.value&&this.selectedItem?e:l`
      <slot name="label" id="label">
        <span aria-hidden=${h(this.appliedLabel?void 0:"true")}>
          ${this.label}
        </span>
      </slot>
    `}renderLoader(){return import("@spectrum-web-components/progress-circle/sp-progress-circle.js"),l`
      <sp-progress-circle
        size="s"
        indeterminate
        role="presentation"
        class="progress-circle"
      ></sp-progress-circle>
    `}get buttonContent(){const e={"visually-hidden":this.icons==="only"&&!!this.value,placeholder:!this.value,label:!0},t=this.appliedLabel||this.label;return[l`
        <span id="icon" ?hidden=${this.icons==="none"}>
          ${this.selectedItemContent.icon}
        </span>
        <span
          id=${h(this.value&&this.selectedItem?"label":void 0)}
          class=${I(e)}
        >
          ${this.renderLabelContent(this.selectedItemContent.content)}
        </span>
        ${this.value&&this.selectedItem?l`
              <span
                aria-hidden="true"
                class="visually-hidden"
                id="applied-label"
              >
                ${t}
                <slot name="label"></slot>
              </span>
            `:l`
              <span hidden id="applied-label">${t}</span>
            `}
        ${this.invalid&&!this.pending?l`
              <sp-icon-alert class="validation-icon"></sp-icon-alert>
            `:f}
        ${this.pending?l`
              ${this.renderLoader()}
              <span
                aria-hidden="true"
                class="visually-hidden"
                id="pending-label"
              >
                ${this.pendingLabel}
              </span>
            `:f}
        <sp-icon-chevron100
          class="picker ${$[this.size]}"
        ></sp-icon-chevron100>
      `]}hasAccessibleLabel(){var s,i,r,a,d,c,p;const e=((s=this.querySelector('[slot="label"]'))==null?void 0:s.textContent)&&((r=(i=this.querySelector('[slot="label"]'))==null?void 0:i.textContent)==null?void 0:r.trim())!=="",t=((d=(a=this.querySelector('[slot="label"]'))==null?void 0:a.getAttribute("alt"))==null?void 0:d.trim())&&((p=(c=this.querySelector('[slot="label"]'))==null?void 0:c.getAttribute("alt"))==null?void 0:p.trim())!=="";return!!this.label||!!this.getAttribute("aria-label")||!!this.getAttribute("aria-labelledby")||!!this.appliedLabel||!!e||!!t}warnNoLabel(){}renderOverlay(e){var s;const t=this.renderContainer(e);return this.dependencyManager.add("sp-overlay"),import("@spectrum-web-components/overlay/sp-overlay.js"),l`
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
    `}get renderDescriptionSlot(){return l`
      <div id=${DESCRIPTION_ID}>
        <slot name="description"></slot>
      </div>
    `}render(){return this.tooltipEl&&(this.tooltipEl.disabled=this.open),l`
      <button
        aria-controls=${h(this.open?"menu":void 0)}
        aria-describedby="tooltip ${DESCRIPTION_ID}"
        aria-expanded=${this.open?"true":"false"}
        aria-haspopup="true"
        aria-labelledby="icon label applied-label pending-label"
        id="button"
        class=${h(this.labelAlignment?`label-${this.labelAlignment}`:void 0)}
        @focus=${this.handleButtonFocus}
        @blur=${this.handleButtonBlur}
        @keydown=${{handleEvent:this.handleEnterKeydown,capture:!0}}
        ?disabled=${this.disabled}
      >
        ${this.buttonContent}
      </button>
      <slot
        aria-hidden="true"
        name="tooltip"
        id="tooltip"
        @keydown=${this.handleKeydown}
        @slotchange=${this.handleTooltipSlotchange}
      ></slot>
      ${this.renderMenu} ${this.renderDescriptionSlot}
    `}willUpdate(e){super.willUpdate(e),e.has("tabIndex")&&this.tabIndex&&(this.button.tabIndex=this.tabIndex,this.removeAttribute("tabindex"))}update(e){var t,s;this.selects&&(this.selects="single"),e.has("disabled")&&this.disabled&&this.close(),e.has("pending")&&this.pending&&this.close(),e.has("value")&&this.shouldScheduleManageSelection(),this.hasUpdated||(this.deprecatedMenu=this.querySelector(":scope > sp-menu"),(t=this.deprecatedMenu)==null||t.toggleAttribute("ignore",!0),(s=this.deprecatedMenu)==null||s.setAttribute("selects","inherit")),super.update(e)}bindButtonKeydownListener(){this.button.addEventListener("keydown",this.handleKeydown)}updated(e){super.updated(e),e.has("open")&&this.overlayElement&&!this.strategy.overlay&&(this.strategy.overlay=this.overlayElement)}async firstUpdated(e){super.firstUpdated(e),this.bindButtonKeydownListener(),this.bindEvents(),await this.updateComplete,this.overlayElement&&!this.strategy.overlay&&(this.strategy.overlay=this.overlayElement)}get dismissHelper(){return l`
      <div class="visually-hidden">
        <button
          tabindex="-1"
          aria-label="Dismiss"
          @click=${this.close}
        ></button>
      </div>
    `}renderContainer(e){const t=l`
      ${this.dismissHelper} ${e} ${this.dismissHelper}
    `;return this.isMobile.matches&&!this.forcePopover?(this.dependencyManager.add("sp-tray"),import("@spectrum-web-components/tray/sp-tray.js"),l`
        <sp-tray
          id="popover"
          role="presentation"
          style=${y(this.containerStyles)}
        >
          ${t}
        </sp-tray>
      `):(this.dependencyManager.add("sp-popover"),import("@spectrum-web-components/popover/sp-popover.js"),l`
      <sp-popover
        id="popover"
        role="presentation"
        style=${y(this.containerStyles)}
        placement=${this.placement}
      >
        ${t}
      </sp-popover>
    `)}onScroll(){this.dispatchEvent(new Event("scroll"))}get renderMenu(){const e=l`
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
    `;return this.hasRenderedOverlay=this.hasRenderedOverlay||this.focused||this.open||!!this.deprecatedMenu,this.hasRenderedOverlay?(this.dependencyManager.loaded&&this.dependencyManager.add("sp-overlay"),this.renderOverlay(e)):e}shouldScheduleManageSelection(e){!this.willManageSelection&&(!e||e.target.getRootNode().host===this)&&(this.willManageSelection=!0,requestAnimationFrame(()=>{requestAnimationFrame(()=>{this.manageSelection()})}))}shouldManageSelection(){this.willManageSelection||(this.willManageSelection=!0,this.manageSelection())}async manageSelection(){if(this.selects==null)return;this.selectionPromise=new Promise(t=>this.selectionResolver=t);let e;if(await this.optionsMenu.updateComplete,this.recentlyConnected&&(await new Promise(t=>requestAnimationFrame(()=>t(!0))),this.recentlyConnected=!1),this.menuItems.forEach(t=>{this.value===t.value&&!t.disabled?e=t:t.selected=!1}),e)e.selected=!!this.selects,this.selectedItem=e;else{const t=this.menuItems.some(s=>{var i;return s.value!=null||((i=s.getAttribute)==null?void 0:i.call(s,"value"))!=null});this.menuItems.length>0&&t&&(this.value="",this.selectedItem=void 0)}this.open&&(await this.optionsMenu.updateComplete,this.optionsMenu.updateSelectedItemIndex()),this.selectionResolver(),this.willManageSelection=!1}async getUpdateComplete(){const e=await super.getUpdateComplete();return await this.selectionPromise,e}connectedCallback(){super.connectedCallback(),this.updateComplete.then(()=>{var e;(e=this.tooltipEl)!=null&&e.selfManaged&&this.button&&(this.tooltipEl.triggerElement=this.button)}),this.recentlyConnected=this.hasUpdated,this.addEventListener("focus",this.handleFocus)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("focus",this.handleFocus)}}n([m()],Picker.prototype,"appliedLabel",2),n([o({type:String,reflect:!0})],Picker.prototype,"icons",2),n([o({type:Boolean,reflect:!0})],Picker.prototype,"invalid",2),n([o({type:String,attribute:"pending-label"})],Picker.prototype,"pendingLabel",2),n([o()],Picker.prototype,"label",2),n([m()],Picker.prototype,"labelAlignment",2),n([o({type:Boolean,reflect:!0})],Picker.prototype,"quiet",2),n([o({type:String})],Picker.prototype,"value",2),n([o({attribute:!1})],Picker.prototype,"selectedItem",1),n([m()],Picker.prototype,"selectedItemContent",1);
//# sourceMappingURL=Picker.js.map
