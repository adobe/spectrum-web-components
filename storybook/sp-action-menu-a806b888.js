import './sp-action-button-b46ec901.js';
import { O as ObserveSlotPresence } from './observe-slot-presence-ae37a9bc.js';
import { O as ObserveSlotText } from './observe-slot-text-94a58958.js';
import './sp-icon-more-04da5606.js';
import { i } from './lit-element-9354aa77.js';
import { a as PickerBase, D as DESCRIPTION_ID } from './Picker-8447befb.js';
import { x } from './lit-html-126adc72.js';
import { l } from './if-defined-ae83b405.js';
import { n, d as defineElement } from './define-element-617dba69.js';
import { t } from './state-59f591cf.js';

const o=i`
:host{display:inline-flex}:host([quiet]){min-width:0}:host>sp-menu{display:none}::slotted([slot=icon]){flex-shrink:0}.icon{flex-shrink:0}#popover{max-width:none}:host([dir=ltr]) .icon,:host([dir=ltr]) ::slotted([slot=icon]){margin-left:calc((var(--spectrum-actionbutton-textonly-padding-left-adjusted) - var(--spectrum-actionbutton-padding-left-adjusted))*-1)}:host([dir=rtl]) .icon,:host([dir=rtl]) ::slotted([slot=icon]){margin-right:calc((var(--spectrum-actionbutton-textonly-padding-left-adjusted) - var(--spectrum-actionbutton-padding-left-adjusted))*-1)}:host([dir]) slot[icon-only] .icon,:host([dir]) slot[icon-only]::slotted([slot=icon]){margin-inline-end:calc((var(
--custom-actionbutton-edge-to-text,
var(--spectrum-actionbutton-edge-to-text)
) - var(
--custom-actionbutton-edge-to-visual-only,
var(--spectrum-actionbutton-edge-to-visual-only)
))*-1);margin-inline-start:calc((var(
--custom-actionbutton-edge-to-text,
var(--spectrum-actionbutton-edge-to-text)
) - var(
--custom-actionbutton-edge-to-visual-only,
var(--spectrum-actionbutton-edge-to-visual-only)
))*-1)}
`;var y = o;

var p=Object.defineProperty;var h=Object.getOwnPropertyDescriptor;var r=(s,i,t,o)=>{for(var e=o>1?void 0:o?h(i,t):i,l=s.length-1,a;l>=0;l--)(a=s[l])&&(e=(o?a(i,t,e):a(e))||e);return o&&e&&p(i,t,e),e};class ActionMenu extends ObserveSlotPresence(ObserveSlotText(PickerBase,"label"),'[slot="label-only"]'){constructor(){super(...arguments);this.selects=void 0;this.static=void 0;this.listRole="menu";this.itemRole="menuitem";}static get styles(){return [y]}get hasLabel(){return this.slotHasContent}get labelOnly(){return this.slotContentIsPresent}get buttonContent(){return [x`
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
                <slot name="tooltip"></slot>
            `]}render(){return x`
            <sp-action-button
                aria-describedby=${DESCRIPTION_ID}
                ?quiet=${this.quiet}
                ?selected=${this.open}
                static=${l(this.static)}
                aria-haspopup="true"
                aria-controls=${l(this.open?"menu":void 0)}
                aria-expanded=${this.open?"true":"false"}
                aria-label=${l(this.label||void 0)}
                id="button"
                class="button"
                size=${this.size}
                @blur=${this.handleButtonBlur}
                @pointerdown=${this.handleButtonPointerdown}
                @focus=${this.handleButtonFocus}
                @click=${this.handleButtonClick}
                @keydown=${{handleEvent:this.handleEnterKeydown,capture:!0}}
                ?disabled=${this.disabled}
            >
                ${this.buttonContent}
            </sp-action-button>
            ${this.renderMenu} ${this.renderDescriptionSlot}
        `}update(t){t.has("invalid")&&(this.invalid=!1),super.update(t);}}r([n({type:String})],ActionMenu.prototype,"selects",2),r([n({type:String,reflect:!0})],ActionMenu.prototype,"static",2),r([t()],ActionMenu.prototype,"labelOnly",1);

defineElement("sp-action-menu",ActionMenu);
