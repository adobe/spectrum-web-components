import './sp-action-button-lv7YPDyg.js';
import { O as ObserveSlotPresence } from './observe-slot-presence-Ceiwt-jV.js';
import { O as ObserveSlotText } from './observe-slot-text-Mz9mFVuX.js';
import './sp-icon-more-DKkQ0reB.js';
import { i } from './lit-element-BulMEkr1.js';
import { S as SlottableRequestEvent } from './slottable-request-event-DXuuyGoq.js';
import { a as PickerBase, D as DESCRIPTION_ID } from './Picker-D0BRsD1o.js';
import { x } from './lit-html-COgVUehj.js';
import { o as o$2 } from './if-defined-DDJGFaN4.js';
import { n, d as defineElement } from './define-element-2VgsDjbW.js';
import { r } from './state-ChcedIDn.js';

const o$1=i`
    :host{display:inline-flex}:host([quiet]){min-width:0}:host>sp-menu{display:none}::slotted([slot=icon]){flex-shrink:0}.icon{flex-shrink:0}#popover{max-width:none}:host([dir=ltr]) ::slotted([slot=icon]),:host([dir=ltr]) .icon{margin-left:calc(-1*(var(--spectrum-actionbutton-textonly-padding-left-adjusted) - var(--spectrum-actionbutton-padding-left-adjusted)))}:host([dir=rtl]) ::slotted([slot=icon]),:host([dir=rtl]) .icon{margin-right:calc(-1*(var(--spectrum-actionbutton-textonly-padding-left-adjusted) - var(--spectrum-actionbutton-padding-left-adjusted)))}:host([dir]) slot[icon-only]::slotted([slot=icon]),:host([dir]) slot[icon-only] .icon{margin-inline:calc(( var(--custom-actionbutton-edge-to-text,var(--spectrum-actionbutton-edge-to-text)) - var(--custom-actionbutton-edge-to-visual-only,var(--spectrum-actionbutton-edge-to-visual-only)))*-1)}sp-overlay:not(:defined){display:none}
`;

var h=Object.defineProperty;var c=Object.getOwnPropertyDescriptor;var o=(a,l,e,i)=>{for(var t=i>1?void 0:i?c(l,e):l,r=a.length-1,n;r>=0;r--)(n=a[r])&&(t=(i?n(l,e,t):n(t))||t);return i&&t&&h(l,e,t),t};class ActionMenu extends ObserveSlotPresence(ObserveSlotText(PickerBase,"label"),'[slot="label-only"]'){constructor(){super(...arguments);this.selects=void 0;this.listRole="menu";this.itemRole="menuitem";this.handleSlottableRequest=e=>{this.dispatchEvent(new SlottableRequestEvent(e.name,e.data));};}static get styles(){return [o$1]}get hasLabel(){return this.slotHasContent}get labelOnly(){return this.slotContentIsPresent}get buttonContent(){return [x`
                ${this.labelOnly?x``:x`
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
                <slot
                    name="tooltip"
                    @slotchange=${this.handleTooltipSlotchange}
                ></slot>
            `]}render(){return this.tooltipEl&&(this.tooltipEl.disabled=this.open),x`
            <sp-action-button
                aria-describedby=${DESCRIPTION_ID}
                ?quiet=${this.quiet}
                ?selected=${this.open}
                static-color=${o$2(this.staticColor)}
                aria-haspopup="true"
                aria-controls=${o$2(this.open?"menu":void 0)}
                aria-expanded=${this.open?"true":"false"}
                aria-label=${o$2(this.label||void 0)}
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
            ${this.renderMenu} ${this.renderDescriptionSlot}
        `}update(e){e.has("invalid")&&(this.invalid=!1),super.update(e);}hasAccessibleLabel(){return !!this.label||!!this.getAttribute("aria-label")||!!this.getAttribute("aria-labelledby")||!!this.appliedLabel||this.hasLabel||this.labelOnly}warnNoLabel(){window.__swc.warn(this,`<${this.localName}> needs one of the following to be accessible:`,"https://opensource.adobe.com/spectrum-web-components/components/action-menu/#accessibility",{type:"accessibility",issues:[`an <sp-field-label> element with a \`for\` attribute referencing the \`id\` of the \`<${this.localName}>\`, or`,'value supplied to the "label" attribute, which will be displayed visually as placeholder text','text content supplied in a <span> with slot="label", or, text content supplied in a <span> with slot="label-only"',"which will also be displayed visually as placeholder text."]});}}o([n({type:String})],ActionMenu.prototype,"selects",2),o([n({reflect:!0,attribute:"static-color"})],ActionMenu.prototype,"staticColor",2),o([r()],ActionMenu.prototype,"labelOnly",1);

defineElement("sp-action-menu",ActionMenu);
