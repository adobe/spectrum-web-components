"use strict";var h=Object.defineProperty;var c=Object.getOwnPropertyDescriptor;var o=(a,l,e,i)=>{for(var t=i>1?void 0:i?c(l,e):l,r=a.length-1,n;r>=0;r--)(n=a[r])&&(t=(i?n(l,e,t):n(t))||t);return i&&t&&h(l,e,t),t};import{html as s}from"@spectrum-web-components/base";import{state as u}from"@spectrum-web-components/base/src/decorators.js";import{ifDefined as d}from"@spectrum-web-components/base/src/directives.js";import{property as p}from"@spectrum-web-components/base/src/decorators.js";import{DESCRIPTION_ID as b,PickerBase as m}from"@spectrum-web-components/picker";import"@spectrum-web-components/action-button/sp-action-button.js";import{ObserveSlotPresence as f}from"@spectrum-web-components/shared/src/observe-slot-presence.js";import{ObserveSlotText as y}from"@spectrum-web-components/shared/src/observe-slot-text.js";import"@spectrum-web-components/icons-workflow/icons/sp-icon-more.js";import v from"./action-menu.css.js";import{SlottableRequestEvent as $}from"@spectrum-web-components/overlay/src/slottable-request-event.js";export class ActionMenu extends f(y(m,"label"),'[slot="label-only"]'){constructor(){super(...arguments);this.selects=void 0;this.listRole="menu";this.itemRole="menuitem";this.handleSlottableRequest=e=>{this.dispatchEvent(new $(e.name,e.data))}}static get styles(){return[v]}get hasLabel(){return this.slotHasContent}get labelOnly(){return this.slotContentIsPresent}get buttonContent(){return[s`
                ${this.labelOnly?s``:s`
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
            `]}render(){return this.tooltipEl&&(this.tooltipEl.disabled=this.open),s`
            <sp-action-button
                aria-describedby=${b}
                ?quiet=${this.quiet}
                ?selected=${this.open}
                static-color=${d(this.staticColor)}
                aria-haspopup="true"
                aria-controls=${d(this.open?"menu":void 0)}
                aria-expanded=${this.open?"true":"false"}
                aria-label=${d(this.label||void 0)}
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
        `}update(e){e.has("invalid")&&(this.invalid=!1),super.update(e)}hasAccessibleLabel(){return!!this.label||!!this.getAttribute("aria-label")||!!this.getAttribute("aria-labelledby")||!!this.appliedLabel||this.hasLabel||this.labelOnly}warnNoLabel(){window.__swc.warn(this,`<${this.localName}> needs one of the following to be accessible:`,"https://opensource.adobe.com/spectrum-web-components/components/action-menu/#accessibility",{type:"accessibility",issues:[`an <sp-field-label> element with a \`for\` attribute referencing the \`id\` of the \`<${this.localName}>\`, or`,'value supplied to the "label" attribute, which will be displayed visually as placeholder text','text content supplied in a <span> with slot="label", or, text content supplied in a <span> with slot="label-only"',"which will also be displayed visually as placeholder text."]})}}o([p({type:String})],ActionMenu.prototype,"selects",2),o([p({reflect:!0,attribute:"static-color"})],ActionMenu.prototype,"staticColor",2),o([u()],ActionMenu.prototype,"labelOnly",1);
//# sourceMappingURL=ActionMenu.js.map
