"use strict";var w=Object.defineProperty;var I=Object.getOwnPropertyDescriptor;var i=(p,d,e,t)=>{for(var s=t>1?void 0:t?I(d,e):d,n=p.length-1,o;n>=0;n--)(o=p[n])&&(s=(t?o(d,e,s):o(s))||s);return t&&s&&w(d,e,s),s};import{html as r,nothing as M,render as S,SizedMixin as E,SpectrumElement as y}from"@spectrum-web-components/base";import{classMap as C,ifDefined as u,styleMap as v}from"@spectrum-web-components/base/src/directives.js";import{property as l,query as c,state as h}from"@spectrum-web-components/base/src/decorators.js";import $ from"./picker.css.js";import R from"@spectrum-web-components/icon/src/spectrum-icon-chevron.css.js";import"@spectrum-web-components/icons-ui/icons/sp-icon-chevron100.js";import"@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js";import"@spectrum-web-components/menu/sp-menu.js";import{IS_MOBILE as A,MatchMediaController as D}from"@spectrum-web-components/reactive-controllers/src/MatchMedia.js";import{DependencyManagerController as L}from"@spectrum-web-components/reactive-controllers/src/DependencyManger.js";import{PendingStateController as F}from"@spectrum-web-components/reactive-controllers/src/PendingState.js";import{strategies as g}from"./strategies.js";const T={s:"spectrum-UIIcon-ChevronDown75",m:"spectrum-UIIcon-ChevronDown100",l:"spectrum-UIIcon-ChevronDown200",xl:"spectrum-UIIcon-ChevronDown300"};export const DESCRIPTION_ID="option-picker";export class PickerBase extends E(y,{noDefaultSize:!0}){constructor(){super();this.isMobile=new D(this,A);this.dependencyManager=new L(this);this.deprecatedMenu=null;this.disabled=!1;this.focused=!1;this.invalid=!1;this.forcePopover=!1;this.pending=!1;this.pendingLabel="Pending";this.open=!1;this.readonly=!1;this.selects="single";this.placement="bottom-start";this.quiet=!1;this.value="";this.listRole="listbox";this.itemRole="option";this.handleEscape=e=>{e.key==="Escape"&&(e.stopPropagation(),e.preventDefault(),this.toggle(!1))};this.handleKeydown=e=>{if(this.focused=!0,!!["ArrowUp","ArrowDown","Enter"," ","Escape"].includes(e.key)){if(e.key==="Escape"){this.handleEscape(e);return}e.stopPropagation(),e.preventDefault(),this.keyboardOpen()}};this.handleSlottableRequest=e=>{};this.applyFocusElementLabel=(e,t)=>{this.appliedLabel=e,this.labelAlignment=t.sideAligned?"inline":void 0};this.hasRenderedOverlay=!1;this.willManageSelection=!1;this.selectionPromise=Promise.resolve();this.recentlyConnected=!1;this.enterKeydownOn=null;this.handleEnterKeydown=e=>{if(e.key!=="Enter")return;const t=e==null?void 0:e.target;if(!t.open&&t.hasSubmenu){e.preventDefault();return}if(this.enterKeydownOn){e.preventDefault();return}this.enterKeydownOn=e.target,this.addEventListener("keyup",async s=>{s.key==="Enter"&&(this.enterKeydownOn=null)},{once:!0})};this.pendingStateController=new F(this)}get menuItems(){return this.optionsMenu.childItems}get selfManageFocusElement(){return!0}get selectedItem(){return this._selectedItem}set selectedItem(e){if(this.selectedItemContent=e?e.itemChildren:void 0,e===this.selectedItem)return;const t=this.selectedItem;this._selectedItem=e,this.requestUpdate("selectedItem",t)}get focusElement(){return this.open?this.optionsMenu:this.button}forceFocusVisible(){this.disabled||(this.focused=!0)}click(){this.toggle()}handleButtonClick(){this.disabled||this.toggle()}handleButtonBlur(){this.focused=!1}focus(e){var t;(t=this.focusElement)==null||t.focus(e)}handleHelperFocus(){this.focused=!0,this.button.focus()}handleFocus(){!this.disabled&&this.focusElement&&(this.focused=this.hasVisibleFocusInTree())}handleChange(e){this.strategy&&(this.strategy.preventNextToggle="no");const t=e.target,[s]=t.selectedItems;e.stopPropagation(),e.cancelable?this.setValueFromItem(s,e):(this.open=!1,this.strategy&&(this.strategy.open=!1))}handleButtonFocus(e){var t;(t=this.strategy)==null||t.handleButtonFocus(e)}async keyboardOpen(){var e;!this.open||!this.strategy.open?(this.addEventListener("sp-opened",()=>{var t;return(t=this.optionsMenu)==null?void 0:t.focusOnFirstSelectedItem()},{once:!0}),this.toggle(!0)):(e=this.optionsMenu)==null||e.focusOnFirstSelectedItem()}async setValueFromItem(e,t){var a;this.open=!1;const s=this.selectedItem,n=this.value;if(this.selectedItem=e,this.value=(a=e==null?void 0:e.value)!=null?a:"",await this.updateComplete,!this.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))&&this.selects){t&&t.preventDefault(),this.setMenuItemSelected(this.selectedItem,!1),s&&this.setMenuItemSelected(s,!0),this.selectedItem=s,this.value=n,this.open=!0,this.strategy&&(this.strategy.open=!0);return}else if(!this.selects){this.selectedItem=s,this.value=n;return}s&&this.setMenuItemSelected(s,!1),this.setMenuItemSelected(e,!!this.selects)}setMenuItemSelected(e,t){this.selects!=null&&(e.selected=t)}toggle(e){if(this.readonly||this.pending||this.disabled)return;const t=typeof e!="undefined"?e:!this.open;this.open=t,this.strategy&&(this.strategy.open=this.open)}close(){this.readonly||this.strategy&&(this.open=!1,this.strategy.open=!1)}get containerStyles(){return this.isMobile.matches?{"--swc-menu-width":"100%"}:{}}get selectedItemContent(){return this._selectedItemContent||{icon:[],content:[]}}set selectedItemContent(e){if(e===this.selectedItemContent)return;const t=this.selectedItemContent;this._selectedItemContent=e,this.requestUpdate("selectedItemContent",t)}handleTooltipSlotchange(e){this.tooltipEl=e.target.assignedElements()[0]}renderLabelContent(e){return this.value&&this.selectedItem?e:r`
            <slot name="label" id="label">
                <span
                    aria-hidden=${u(this.appliedLabel?void 0:"true")}
                >
                    ${this.label}
                </span>
            </slot>
        `}get buttonContent(){const e={"visually-hidden":this.icons==="only"&&!!this.value,placeholder:!this.value,label:!0},t=this.appliedLabel||this.label;return[r`
                <span id="icon" ?hidden=${this.icons==="none"}>
                    ${this.selectedItemContent.icon}
                </span>
                <span
                    id=${u(this.value&&this.selectedItem?"label":void 0)}
                    class=${C(e)}
                >
                    ${this.renderLabelContent(this.selectedItemContent.content)}
                </span>
                ${this.value&&this.selectedItem?r`
                          <span
                              aria-hidden="true"
                              class="visually-hidden"
                              id="applied-label"
                          >
                              ${t}
                              <slot name="label"></slot>
                          </span>
                      `:r`
                          <span hidden id="applied-label">${t}</span>
                      `}
                ${this.invalid&&!this.pending?r`
                          <sp-icon-alert
                              class="validation-icon"
                          ></sp-icon-alert>
                      `:M}
                ${this.pendingStateController.renderPendingState()}
                <sp-icon-chevron100
                    class="picker ${T[this.size]}"
                ></sp-icon-chevron100>
            `]}hasAccessibleLabel(){var s,n,o,a,m,b,f;const e=((s=this.querySelector('[slot="label"]'))==null?void 0:s.textContent)&&((o=(n=this.querySelector('[slot="label"]'))==null?void 0:n.textContent)==null?void 0:o.trim())!=="",t=((m=(a=this.querySelector('[slot="label"]'))==null?void 0:a.getAttribute("alt"))==null?void 0:m.trim())&&((f=(b=this.querySelector('[slot="label"]'))==null?void 0:b.getAttribute("alt"))==null?void 0:f.trim())!=="";return!!this.label||!!this.getAttribute("aria-label")||!!this.getAttribute("aria-labelledby")||!!this.appliedLabel||!!e||!!t}warnNoLabel(){window.__swc.warn(this,`<${this.localName}> needs one of the following to be accessible:`,"https://opensource.adobe.com/spectrum-web-components/components/picker/#accessibility",{type:"accessibility",issues:[`an <sp-field-label> element with a \`for\` attribute referencing the \`id\` of the \`<${this.localName}>\`, or`,'value supplied to the "label" attribute, which will be displayed visually as placeholder text, or','text content supplied in a <span> with slot="label", which will also be displayed visually as placeholder text.']})}renderOverlay(e){var s,n,o;if(((s=this.strategy)==null?void 0:s.overlay)===void 0)return e;const t=this.renderContainer(e);return S(t,(n=this.strategy)==null?void 0:n.overlay,{host:this}),(o=this.strategy)==null?void 0:o.overlay}get renderDescriptionSlot(){return r`
            <div id=${DESCRIPTION_ID}>
                <slot name="description"></slot>
            </div>
        `}render(){return this.tooltipEl&&(this.tooltipEl.disabled=this.open),r`
            <button
                aria-controls=${u(this.open?"menu":void 0)}
                aria-describedby="tooltip ${DESCRIPTION_ID}"
                aria-expanded=${this.open?"true":"false"}
                aria-haspopup="true"
                aria-labelledby="loader icon label applied-label"
                id="button"
                class=${u(this.labelAlignment?`label-${this.labelAlignment}`:void 0)}
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
        `}willUpdate(e){super.willUpdate(e),e.has("tabIndex")&&this.tabIndex&&(this.button.tabIndex=this.tabIndex,this.removeAttribute("tabindex"))}update(e){var t,s;this.selects&&(this.selects="single"),e.has("disabled")&&this.disabled&&this.close(),e.has("pending")&&this.pending&&this.close(),e.has("value")&&this.shouldScheduleManageSelection(),this.hasUpdated||(this.deprecatedMenu=this.querySelector(":scope > sp-menu"),(t=this.deprecatedMenu)==null||t.toggleAttribute("ignore",!0),(s=this.deprecatedMenu)==null||s.setAttribute("selects","inherit")),super.update(e)}bindButtonKeydownListener(){this.button.addEventListener("keydown",this.handleKeydown)}updated(e){super.updated(e),e.has("open")&&(this.strategy.open=this.open)}firstUpdated(e){super.firstUpdated(e),this.bindButtonKeydownListener(),this.bindEvents()}get dismissHelper(){return r`
            <div class="visually-hidden">
                <button
                    tabindex="-1"
                    aria-label="Dismiss"
                    @click=${this.close}
                ></button>
            </div>
        `}renderContainer(e){const t=r`
            ${this.dismissHelper} ${e} ${this.dismissHelper}
        `;return this.isMobile.matches&&!this.forcePopover?(this.dependencyManager.add("sp-tray"),import("@spectrum-web-components/tray/sp-tray.js"),r`
                <sp-tray
                    id="popover"
                    role="presentation"
                    style=${v(this.containerStyles)}
                >
                    ${t}
                </sp-tray>
            `):(this.dependencyManager.add("sp-popover"),import("@spectrum-web-components/popover/sp-popover.js"),r`
            <sp-popover
                id="popover"
                role="presentation"
                style=${v(this.containerStyles)}
                placement=${this.placement}
            >
                ${t}
            </sp-popover>
        `)}onScroll(){this.dispatchEvent(new Event("scroll",{cancelable:!0,composed:!0}))}get renderMenu(){const e=r`
            <sp-menu
                aria-labelledby="applied-label"
                @change=${this.handleChange}
                id="menu"
                @keydown=${{handleEvent:this.handleEnterKeydown,capture:!0}}
                @scroll=${this.onScroll}
                role=${this.listRole}
                .selects=${this.selects}
                .selected=${this.value?[this.value]:[]}
                size=${this.size}
                @sp-menu-item-keydown=${this.handleEscape}
                @sp-menu-item-added-or-updated=${this.shouldManageSelection}
            >
                <slot @slotchange=${this.shouldScheduleManageSelection}></slot>
            </sp-menu>
        `;return this.hasRenderedOverlay=this.hasRenderedOverlay||this.focused||this.open||!!this.deprecatedMenu,this.hasRenderedOverlay?(this.dependencyManager.loaded&&this.dependencyManager.add("sp-overlay"),this.renderOverlay(e)):e}shouldScheduleManageSelection(e){!this.willManageSelection&&(!e||e.target.getRootNode().host===this)&&(this.willManageSelection=!0,requestAnimationFrame(()=>{requestAnimationFrame(()=>{this.manageSelection()})}))}shouldManageSelection(){this.willManageSelection||(this.willManageSelection=!0,this.manageSelection())}async manageSelection(){if(this.selects==null)return;this.selectionPromise=new Promise(t=>this.selectionResolver=t);let e;await this.optionsMenu.updateComplete,this.recentlyConnected&&(await new Promise(t=>requestAnimationFrame(()=>t(!0))),this.recentlyConnected=!1),this.menuItems.forEach(t=>{this.value===t.value&&!t.disabled?e=t:t.selected=!1}),e?(e.selected=!!this.selects,this.selectedItem=e):(this.value="",this.selectedItem=void 0),this.open&&(await this.optionsMenu.updateComplete,this.optionsMenu.updateSelectedItemIndex()),this.selectionResolver(),this.willManageSelection=!1}async getUpdateComplete(){const e=await super.getUpdateComplete();return await this.selectionPromise,e}bindEvents(){var e;(e=this.strategy)==null||e.abort(),this.isMobile.matches?this.strategy=new g.mobile(this.button,this):this.strategy=new g.desktop(this.button,this)}connectedCallback(){super.connectedCallback(),this.updateComplete.then(()=>{var t;if(!((t=this.tooltipEl)!=null&&t.selfManaged))return;const e=this.tooltipEl.overlayElement;e&&(e.triggerElement=this.button)}),this.recentlyConnected=this.hasUpdated,this.addEventListener("focus",this.handleFocus)}disconnectedCallback(){var e;this.close(),(e=this.strategy)==null||e.releaseDescription(),super.disconnectedCallback()}}PickerBase.shadowRootOptions={...y.shadowRootOptions,delegatesFocus:!0},i([h()],PickerBase.prototype,"appliedLabel",2),i([c("#button")],PickerBase.prototype,"button",2),i([l({type:Boolean,reflect:!0})],PickerBase.prototype,"disabled",2),i([l({type:Boolean,reflect:!0})],PickerBase.prototype,"focused",2),i([l({type:String,reflect:!0})],PickerBase.prototype,"icons",2),i([l({type:Boolean,reflect:!0})],PickerBase.prototype,"invalid",2),i([l({type:Boolean,reflect:!0,attribute:"force-popover"})],PickerBase.prototype,"forcePopover",2),i([l({type:Boolean,reflect:!0})],PickerBase.prototype,"pending",2),i([l({type:String,attribute:"pending-label"})],PickerBase.prototype,"pendingLabel",2),i([l()],PickerBase.prototype,"label",2),i([l({type:Boolean,reflect:!0})],PickerBase.prototype,"open",2),i([l({type:Boolean,reflect:!0})],PickerBase.prototype,"readonly",2),i([h()],PickerBase.prototype,"labelAlignment",2),i([c("sp-menu")],PickerBase.prototype,"optionsMenu",2),i([c("sp-overlay")],PickerBase.prototype,"overlayElement",2),i([l()],PickerBase.prototype,"placement",2),i([l({type:Boolean,reflect:!0})],PickerBase.prototype,"quiet",2),i([l({type:String})],PickerBase.prototype,"value",2),i([l({attribute:!1})],PickerBase.prototype,"selectedItem",1),i([h()],PickerBase.prototype,"selectedItemContent",1);export class Picker extends PickerBase{constructor(){super(...arguments);this.handleKeydown=e=>{var a;const{key:t}=e,s=["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Enter"," ","Escape"].includes(t),n=["ArrowUp","ArrowDown","Enter"," "].includes(t);if(this.focused=!0,t==="Escape"){this.handleEscape(e);return}if(!s||this.readonly||this.pending)return;if(n){this.keyboardOpen(),e.preventDefault();return}e.preventDefault();const o=(a=this.optionsMenu)==null?void 0:a.getNeighboringFocusableElement(this.selectedItem,t==="ArrowLeft");(!this.value||o!==this.selectedItem)&&o&&this.setValueFromItem(o)}}static get styles(){return[$,R]}get containerStyles(){const e=super.containerStyles;return this.quiet||(e["min-width"]=`${this.offsetWidth}px`),e}}
//# sourceMappingURL=Picker.js.map
