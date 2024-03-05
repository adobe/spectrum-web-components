import './sp-action-button-yK8oK-HS.js';
import { O as ObserveSlotPresence } from './observe-slot-presence-tyJ_SCNf.js';
import { O as ObserveSlotText } from './observe-slot-text-MDYPopbw.js';
import './sp-icon-more-VlXpxsc-.js';
import { i } from './lit-element-xBOPiTek.js';
import { a as PickerBase, D as DESCRIPTION_ID } from './Picker-dv2kmg-i.js';
import { x } from './lit-html-GmIhAbMP.js';
import { l as l$1 } from './if-defined-pV6JZKXB.js';
import { n, d as defineElement } from './define-element-z6bXN_P5.js';
import { t } from './state-qeP24jco.js';

const o=i`
    :host{display:inline-flex}:host([quiet]){min-width:0}:host>sp-menu{display:none}::slotted([slot=icon]),.icon{flex-shrink:0}#popover{max-width:none}:host([dir=ltr]) ::slotted([slot=icon]),:host([dir=ltr]) .icon{margin-left:calc(-1*(var(--spectrum-actionbutton-textonly-padding-left-adjusted) - var(--spectrum-actionbutton-padding-left-adjusted)))}:host([dir=rtl]) ::slotted([slot=icon]),:host([dir=rtl]) .icon{margin-right:calc(-1*(var(--spectrum-actionbutton-textonly-padding-left-adjusted) - var(--spectrum-actionbutton-padding-left-adjusted)))}:host([dir]) slot[icon-only]::slotted([slot=icon]),:host([dir]) slot[icon-only] .icon{margin-inline-start:calc(( var(--custom-actionbutton-edge-to-text,var(--spectrum-actionbutton-edge-to-text)) - var(--custom-actionbutton-edge-to-visual-only,var(--spectrum-actionbutton-edge-to-visual-only)))*-1);margin-inline-end:calc(( var(--custom-actionbutton-edge-to-text,var(--spectrum-actionbutton-edge-to-text)) - var(--custom-actionbutton-edge-to-visual-only,var(--spectrum-actionbutton-edge-to-visual-only)))*-1)}sp-overlay:not(:defined){display:none}
`;var y = o;

var u=Object.defineProperty;var h=Object.getOwnPropertyDescriptor;var l=(n,i,t,o)=>{for(var e=o>1?void 0:o?h(i,t):i,r=n.length-1,a;r>=0;r--)(a=n[r])&&(e=(o?a(i,t,e):a(e))||e);return o&&e&&u(i,t,e),e};class ActionMenu extends ObserveSlotPresence(ObserveSlotText(PickerBase,"label"),'[slot="label-only"]'){constructor(){super(...arguments);this.selects=void 0;this.static=void 0;this.listRole="menu";this.itemRole="menuitem";}static get styles(){return [y]}get hasLabel(){return this.slotHasContent}get labelOnly(){return this.slotContentIsPresent}get buttonContent(){return [x`
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
        `}update(t){t.has("invalid")&&(this.invalid=!1),super.update(t);}}l([n({type:String})],ActionMenu.prototype,"selects",2),l([n({type:String,reflect:!0})],ActionMenu.prototype,"static",2),l([t()],ActionMenu.prototype,"labelOnly",1);

defineElement("sp-action-menu",ActionMenu);
