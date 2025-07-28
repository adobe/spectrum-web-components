"use strict";var u=Object.defineProperty;var v=Object.getOwnPropertyDescriptor;var a=(p,o,e,t)=>{for(var i=t>1?void 0:t?v(o,e):o,s=p.length-1,h;s>=0;s--)(h=p[s])&&(i=(t?h(o,e,i):h(i))||i);return t&&i&&u(o,e,i),i};import{html as l,nothing as b}from"@spectrum-web-components/base";import{property as r,query as c,state as d}from"@spectrum-web-components/base/src/decorators.js";import{ifDefined as n,live as f,repeat as m}from"@spectrum-web-components/base/src/directives.js";import"@spectrum-web-components/overlay/sp-overlay.js";import"@spectrum-web-components/icons-ui/icons/sp-icon-chevron100.js";import"@spectrum-web-components/popover/sp-popover.js";import"@spectrum-web-components/menu/sp-menu.js";import"@spectrum-web-components/menu/sp-menu-item.js";import{PendingStateController as g}from"@spectrum-web-components/reactive-controllers/src/PendingState.js";import"@spectrum-web-components/picker-button/sp-picker-button.js";import{Textfield as $}from"@spectrum-web-components/textfield";import y from"./combobox.css.js";import O from"@spectrum-web-components/icon/src/spectrum-icon-chevron.css.js";export class Combobox extends ${constructor(){super();this.autocomplete="none";this.availableOptions=[];this.open=!1;this.pending=!1;this.pendingLabel="Pending";this.overlayOpen=!1;this.itemValue="";this.optionEls=[];this.fieldWidth=0;this.applyFocusElementLabel=e=>{this.appliedLabel=e};this._returnItems=()=>{};this.pendingStateController=new g(this)}static get styles(){return[...super.styles,y,O]}focus(){this.focusElement.focus()}click(){this.focus(),this.focusElement.click()}scrollToActiveDescendant(){if(!this.activeDescendant)return;const e=this.shadowRoot.getElementById(this.activeDescendant.value);e&&e.scrollIntoView({block:"nearest"})}handleComboboxKeydown(e){if(!(this.readonly||this.pending))if(e.altKey&&e.code==="ArrowDown")this.open=!0;else if(e.code==="ArrowDown")e.preventDefault(),this.open=!0,this.activateNextDescendant(),this.scrollToActiveDescendant();else if(e.code==="ArrowUp")e.preventDefault(),this.open=!0,this.activatePreviousDescendant(),this.scrollToActiveDescendant();else if(e.code==="Escape")this.open||(this.value=""),this.open=!1;else if(e.code==="Enter")this.selectDescendant(),this.open=!1;else if(e.code==="Home")this.focusElement.setSelectionRange(0,0),this.activeDescendant=void 0;else if(e.code==="End"){const{length:t}=this.value;this.focusElement.setSelectionRange(t,t),this.activeDescendant=void 0}else e.code==="ArrowLeft"?this.activeDescendant=void 0:e.code==="ArrowRight"&&(this.activeDescendant=void 0)}handleSlotchange(){this.setOptionsFromSlottedItems(),this.itemObserver.disconnect(),this.optionEls.map(e=>{this.itemObserver.observe(e,{attributes:!0,attributeFilter:["id"],childList:!0})})}handleTooltipSlotchange(e){this.tooltipEl=e.target.assignedElements()[0]}setOptionsFromSlottedItems(){const e=this.optionSlot.assignedElements({flatten:!0});this.optionEls=e}activateNextDescendant(){const e=this.activeDescendant?this.availableOptions.indexOf(this.activeDescendant):-1;let t=e;do if(t=(this.availableOptions.length+t+1)%this.availableOptions.length,t===e)break;while(this.availableOptions[t].disabled);this.availableOptions[t].disabled||(this.activeDescendant=this.availableOptions[t]),this.optionEls.forEach(i=>{var s;return i.setAttribute("aria-selected",i.value===((s=this.activeDescendant)==null?void 0:s.value)?"true":"false")})}activatePreviousDescendant(){const e=this.activeDescendant?this.availableOptions.indexOf(this.activeDescendant):0;let t=e;do if(t=(this.availableOptions.length+t-1)%this.availableOptions.length,t===e)break;while(this.availableOptions[t].disabled);this.availableOptions[t].disabled||(this.activeDescendant=this.availableOptions[t]),this.optionEls.forEach(i=>{var s;return i.setAttribute("aria-selected",i.value===((s=this.activeDescendant)==null?void 0:s.value)?"true":"false")})}selectDescendant(){if(!this.activeDescendant)return;const e=this.shadowRoot.getElementById(this.activeDescendant.value);e&&e.click()}filterAvailableOptions(){if(this.autocomplete==="none"||this.pending)return;const e=this.value.toLowerCase();this.availableOptions=(this.options||this.optionEls).filter(t=>t.itemText.toLowerCase().startsWith(e))}handleInput(e){super.handleInput(e),this.pending||(this.activeDescendant=void 0,this.open=!0)}handleMenuChange(e){const{target:t}=e,i=(this.options||this.optionEls).find(s=>s.value===(t==null?void 0:t.value));this.value=(i==null?void 0:i.itemText)||"",e.preventDefault(),this.open=!1,this._returnItems(),this.focus()}handleClosed(){this.open=!1,this.overlayOpen=!1}handleOpened(){}toggleOpen(){if(this.readonly||this.pending){this.open=!1;return}this.open=!this.open,this.inputElement.focus()}shouldUpdate(e){var t,i;return e.has("open")&&(this.open?this.overlayOpen=!0:this.activeDescendant=void 0),e.has("value")&&(this.filterAvailableOptions(),this.itemValue=(i=(t=this.availableOptions.find(s=>s.itemText===this.value))==null?void 0:t.value)!=null?i:""),super.shouldUpdate(e)}onBlur(e){e.relatedTarget&&(this.contains(e.relatedTarget)||this.shadowRoot.contains(e.relatedTarget))||super.onBlur(e)}renderAppliedLabel(){const e=this.label||this.appliedLabel;return l`
            ${this.pending?l`
                      <span
                          aria-hidden="true"
                          class="visually-hidden"
                          id="pending-label"
                      >
                          ${this.pendingLabel}
                      </span>
                  `:b}
            ${this.value?l`
                      <span
                          aria-hidden="true"
                          class="visually-hidden"
                          id="applied-label"
                      >
                          ${e}
                      </span>
                      <slot name="label" id="label">
                          <span class="visually-hidden" aria-hidden="true">
                              ${this.value}
                          </span>
                      </slot>
                  `:l`
                      <span hidden id="applied-label">${e}</span>
                  `}
        `}renderLoader(){return import("@spectrum-web-components/progress-circle/sp-progress-circle.js"),l`
            <sp-progress-circle
                size="s"
                indeterminate
                aria-hidden="true"
                class="progress-circle"
            ></sp-progress-circle>
        `}renderField(){return l`
            ${this.renderStateIcons()}
            <input
                aria-activedescendant=${n(this.activeDescendant?`${this.activeDescendant.value}`:void 0)}
                aria-autocomplete=${n(this.autocomplete)}
                aria-controls=${n(this.open?"listbox-menu":void 0)}
                aria-describedby="${this.helpTextId} tooltip"
                aria-expanded="${this.open?"true":"false"}"
                aria-label=${n(this.label||this.appliedLabel)}
                aria-labelledby="pending-label applied-label label"
                aria-invalid=${n(this.invalid||void 0)}
                autocomplete="off"
                @click=${this.toggleOpen}
                @keydown=${this.handleComboboxKeydown}
                id="input"
                class="input"
                role="combobox"
                type="text"
                .value=${f(this.displayValue)}
                tabindex="0"
                @sp-closed=${this.handleClosed}
                @sp-opened=${this.handleOpened}
                maxlength=${n(this.maxlength>-1?this.maxlength:void 0)}
                minlength=${n(this.minlength>-1?this.minlength:void 0)}
                pattern=${n(this.pattern)}
                @change=${this.handleChange}
                @input=${this.handleInput}
                @focus=${this.onFocus}
                @blur=${this.onBlur}
                ?disabled=${this.disabled}
                ?required=${this.required}
                ?readonly=${this.readonly}
            />
            ${this.pendingStateController.renderPendingState()}
        `}render(){return this.tooltipEl&&(this.tooltipEl.disabled=this.open),l`
            ${super.render()}
            <sp-picker-button
                aria-controls="listbox-menu"
                aria-describedby="${this.helpTextId} tooltip"
                aria-expanded=${this.open?"true":"false"}
                aria-label=${n(this.label||this.appliedLabel)}
                aria-labelledby="applied-label label"
                @click=${this.toggleOpen}
                tabindex="-1"
                class="button ${this.focused?"focus-visible is-keyboardFocused":""}"
                ?disabled=${this.disabled}
                ?focused=${this.focused}
                ?quiet=${this.quiet}
                size=${this.size}
            ></sp-picker-button>
            <sp-overlay
                ?open=${this.open}
                .triggerElement=${this.input}
                offset="0"
                placement="bottom-start"
                .receivesFocus=${"false"}
                role="presentation"
            >
                <sp-popover
                    id="listbox"
                    ?open=${this.open}
                    role="presentation"
                    ?hidden=${this.availableOptions.length===0}
                >
                    <sp-menu
                        @change=${this.handleMenuChange}
                        tabindex="-1"
                        aria-labelledby="label applied-label"
                        aria-label=${n(this.label||this.appliedLabel)}
                        id="listbox-menu"
                        role="listbox"
                        selects=${n(this.autocomplete==="none"?"single":void 0)}
                        .selected=${this.autocomplete==="none"&&this.itemValue?[this.itemValue]:[]}
                        style="min-width: ${this.fieldWidth}px;"
                        size=${this.size}
                    >
                        ${this.overlayOpen?m(this.availableOptions,e=>e.value,e=>{var t,i;return l`
                                          <sp-menu-item
                                              id="${e.value}"
                                              ?focused=${((t=this.activeDescendant)==null?void 0:t.value)===e.value}
                                              aria-selected=${((i=this.activeDescendant)==null?void 0:i.value)===e.value?"true":"false"}
                                              .value=${e.value}
                                              .selected=${e.value===this.itemValue}
                                              ?disabled=${e.disabled}
                                          >
                                              ${e.itemText}
                                          </sp-menu-item>
                                      `}):l``}
                        <slot
                            hidden
                            @slotchange=${this.handleSlotchange}
                        ></slot>
                    </sp-menu>
                </sp-popover>
            </sp-overlay>
            ${this.renderAppliedLabel()}
            <slot
                aria-hidden="true"
                name="tooltip"
                id="tooltip"
                @slotchange=${this.handleTooltipSlotchange}
            ></slot>
        `}firstUpdated(e){super.firstUpdated(e),this.addEventListener("focusout",t=>{const i=t.relatedTarget&&this.contains(t.relatedTarget);t.target===this&&!i&&(this.focused=!1)}),this.resizeObserver=new ResizeObserver(t=>{this.fieldWidth=t[0].borderBoxSize[0].inlineSize}),this.resizeObserver.observe(this)}async manageListOverlay(){this.open&&(this.focused=!0,this.focus())}updated(e){var t;if(e.has("open")&&!this.pending&&this.manageListOverlay(),!this.focused&&this.open&&(this.open=!1),e.has("pending")&&this.pending&&(this.open=!1),e.has("activeDescendant")){const i=e.get("activeDescendant");i&&(i.focused=!1),this.activeDescendant&&typeof this.activeDescendant.focused!="undefined"&&(this.activeDescendant.focused=!0)}(e.has("options")||e.has("optionEls"))&&((t=this.options)!=null&&t.every(i=>i.disabled)&&(this.disabled=!0),this.availableOptions=this.options||this.optionEls)}async getUpdateComplete(){const e=await super.getUpdateComplete(),t=this.shadowRoot.querySelector("#listbox");if(t){const i=[...t.children];await Promise.all(i.map(s=>s.updateComplete))}return e}connectedCallback(){super.connectedCallback(),this.itemObserver||(this.itemObserver=new MutationObserver(this.setOptionsFromSlottedItems.bind(this)))}disconnectedCallback(){var e;this.itemObserver.disconnect(),this.open=!1,(e=this.resizeObserver)==null||e.disconnect(),this.resizeObserver=void 0,super.disconnectedCallback()}}a([d()],Combobox.prototype,"activeDescendant",2),a([r({type:String})],Combobox.prototype,"autocomplete",2),a([d()],Combobox.prototype,"availableOptions",2),a([r({type:Boolean,reflect:!0})],Combobox.prototype,"open",2),a([r({type:Boolean,reflect:!0})],Combobox.prototype,"pending",2),a([r({type:String,attribute:"pending-label"})],Combobox.prototype,"pendingLabel",2),a([c("slot:not([name])")],Combobox.prototype,"optionSlot",2),a([d()],Combobox.prototype,"overlayOpen",2),a([c("#input")],Combobox.prototype,"input",2),a([r({type:Array})],Combobox.prototype,"options",2),a([d()],Combobox.prototype,"optionEls",2),a([d()],Combobox.prototype,"fieldWidth",2);
//# sourceMappingURL=Combobox.js.map
