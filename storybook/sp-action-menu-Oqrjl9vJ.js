import './sp-action-button-XdC2aqha.js';
import { O as ObserveSlotPresence } from './observe-slot-presence-tyJ_SCNf.js';
import { O as ObserveSlotText } from './observe-slot-text-mc0YsU0d.js';
import './sp-icon-more--guHacSU.js';
import { i } from './lit-element-xBOPiTek.js';
import { S as SlottableRequestEvent } from './slottable-request-event-SQgFLN7g.js';
import { a as PickerBase, D as DESCRIPTION_ID } from './Picker-5zHIcXlB.js';
import { x } from './lit-html-GmIhAbMP.js';
import { l as l$1 } from './if-defined-pV6JZKXB.js';
import { n, d as defineElement } from './define-element-2SKaLcgv.js';
import { t } from './state-q_CC9QX6.js';

const o=i`
    :host{display:inline-flex}:host([quiet]){min-width:0}:host>sp-menu{display:none}::slotted([slot=icon]),.icon{flex-shrink:0}#popover{max-width:none}:host([dir=ltr]) ::slotted([slot=icon]),:host([dir=ltr]) .icon{margin-left:calc(-1*(var(--spectrum-actionbutton-textonly-padding-left-adjusted) - var(--spectrum-actionbutton-padding-left-adjusted)))}:host([dir=rtl]) ::slotted([slot=icon]),:host([dir=rtl]) .icon{margin-right:calc(-1*(var(--spectrum-actionbutton-textonly-padding-left-adjusted) - var(--spectrum-actionbutton-padding-left-adjusted)))}:host([dir]) slot[icon-only]::slotted([slot=icon]),:host([dir]) slot[icon-only] .icon{margin-inline-start:calc(( var(--custom-actionbutton-edge-to-text,var(--spectrum-actionbutton-edge-to-text)) - var(--custom-actionbutton-edge-to-visual-only,var(--spectrum-actionbutton-edge-to-visual-only)))*-1);margin-inline-end:calc(( var(--custom-actionbutton-edge-to-text,var(--spectrum-actionbutton-edge-to-text)) - var(--custom-actionbutton-edge-to-visual-only,var(--spectrum-actionbutton-edge-to-visual-only)))*-1)}sp-overlay:not(:defined){display:none}
`;var v = o;

var u=Object.defineProperty;var h=Object.getOwnPropertyDescriptor;var l=(n,i,e,o)=>{for(var t=o>1?void 0:o?h(i,e):i,r=n.length-1,a;r>=0;r--)(a=n[r])&&(t=(o?a(i,e,t):a(t))||t);return o&&t&&u(i,e,t),t};class ActionMenu extends ObserveSlotPresence(ObserveSlotText(PickerBase,"label"),'[slot="label-only"]'){constructor(){super(...arguments);this.selects=void 0;this.static=void 0;this.listRole="menu";this.itemRole="menuitem";this.handleSlottableRequest=e=>{this.dispatchEvent(new SlottableRequestEvent(e.name,e.data));};}static get styles(){return [v]}get hasLabel(){return this.slotHasContent}get labelOnly(){return this.slotContentIsPresent}get buttonContent(){return [x`
                ${this.labelOnly?x``:x`
                          <slot
                              name="icon"
                              slot="icon"
                              ?icon-only=${!this.hasLabel}
                              ?hidden=${this.labelOnly}
                          >
                              <sp-icon-more class="icon"></sp-icon-more>
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
                static=${l$1(this.static)}
                aria-haspopup="true"
                aria-controls=${l$1(this.open?"menu":void 0)}
                aria-expanded=${this.open?"true":"false"}
                aria-label=${l$1(this.label||void 0)}
                id="button"
                class="button"
                size=${this.size}
                @blur=${this.handleButtonBlur}
                @click=${this.handleActivate}
                @pointerdown=${this.handleButtonPointerdown}
                @focus=${this.handleButtonFocus}
                @keydown=${{handleEvent:this.handleEnterKeydown,capture:!0}}
                ?disabled=${this.disabled}
            >
                ${this.buttonContent}
            </sp-action-button>
            ${this.renderMenu} ${this.renderDescriptionSlot}
        `}update(e){e.has("invalid")&&(this.invalid=!1),super.update(e);}}l([n({type:String})],ActionMenu.prototype,"selects",2),l([n({type:String,reflect:!0})],ActionMenu.prototype,"static",2),l([t()],ActionMenu.prototype,"labelOnly",1);

defineElement("sp-action-menu",ActionMenu);
