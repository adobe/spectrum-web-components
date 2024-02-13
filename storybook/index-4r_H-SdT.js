import './sp-popover-OhDGQO09.js';
import './sp-menu-FQVYzy9J.js';
import './sp-button-idIiKTnO.js';
import './sp-icon-chevron100-tb9aielX.js';
import './sp-icon-more-8Poneot0.js';
import { b as b$1 } from './spectrum-icon-chevron.css-nkKXiUlE.js';
import { i } from './lit-element-xBOPiTek.js';
import { S as SizedMixin } from './sizedMixin-6sBuja8e.js';
import { a as PickerBase } from './Picker-yxog523o.js';
import { x } from './lit-html-GmIhAbMP.js';
import { l } from './if-defined-pV6JZKXB.js';
import { n, d as defineElement } from './define-element-UHExAFdK.js';
import { i as i$1 } from './query-JMOstM_r.js';
import './sp-menu-item-WU5O76xQ.js';

const r$1=i`
:host{--spectrum-splitbutton-trigger-border-left:0;--spectrum-splitbutton-trigger-min-width:0;--spectrum-spltibutton-margin-left:0;--spectrum-splitbutton-icon-gap:var(--spectrum-global-dimension-size-150);--spectrum-splitbutton-border-radius-edge:var(
--spectrum-alias-border-radius-small
)}:host([dir=rtl]){--spectrum-logical-rotation:matrix(-1,0,0,1,0,0)}.trigger{--spectrum-splitbutton-trigger-round-edge-padding:var(
--spectrum-global-dimension-size-125
);--spectrum-splitbutton-trigger-flat-edge-padding:var(
--spectrum-global-dimension-size-100
);--spectrum-splitbutton-cta-trigger-flat-edge-padding:calc(var(--spectrum-splitbutton-trigger-flat-edge-padding) - var(
--spectrum-button-m-primary-outline-texticon-border-size,
var(--spectrum-alias-border-size-thick)
))}#button{--spectrum-splitbutton-flat-edge-padding:calc(var(--spectrum-button-m-primary-outline-texticon-padding-left) - var(
--spectrum-button-m-primary-outline-texticon-border-size,
var(--spectrum-alias-border-size-thick)
)*2);--spectrum-splitbutton-round-edge-padding:var(
--spectrum-button-m-primary-outline-texticon-padding-right,var(--spectrum-global-dimension-size-200)
);--spectrum-splitbutton-cta-flat-edge-padding:calc(var(--spectrum-button-m-primary-outline-texticon-padding-left) - var(
--spectrum-button-m-primary-outline-texticon-border-size,
var(--spectrum-alias-border-size-thick)
)*3)}:host{display:inline-flex;flex-direction:row;position:relative;vertical-align:top}#button{border-bottom-left-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
);border-bottom-right-radius:0;border-top-left-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
);border-top-right-radius:0;margin-left:0;padding-left:var(--spectrum-splitbutton-round-edge-padding);padding-right:var(--spectrum-splitbutton-flat-edge-padding)}#button[variant=accent]{margin-right:var(
--spectrum-button-m-primary-outline-texticon-border-size,var(--spectrum-alias-border-size-thick)
);padding-right:var(--spectrum-splitbutton-cta-flat-edge-padding)}#button:after{border-bottom-right-radius:var(--spectrum-splitbutton-border-radius-edge);border-top-right-radius:var(--spectrum-splitbutton-border-radius-edge)}.trigger{border-bottom-left-radius:0;border-bottom-right-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
);border-left-width:var(--spectrum-splitbutton-trigger-border-left);border-top-left-radius:0;border-top-right-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
);margin-left:0;min-width:var(--spectrum-splitbutton-trigger-min-width);padding-left:var(--spectrum-splitbutton-trigger-flat-edge-padding);padding-right:var(--spectrum-splitbutton-trigger-round-edge-padding)}.trigger[variant=accent]{border-left-width:var(
--spectrum-button-m-primary-outline-texticon-border-size,var(--spectrum-alias-border-size-thick)
);padding-left:var(--spectrum-splitbutton-cta-trigger-flat-edge-padding)}.trigger.focus-visible{box-shadow:none}.trigger:focus-visible{box-shadow:none}.trigger:after{border-bottom-left-radius:var(--spectrum-splitbutton-border-radius-edge);border-top-left-radius:var(--spectrum-splitbutton-border-radius-edge)}.icon{display:block;margin-top:1px}#button,.trigger{position:relative}#button.focus-visible,.trigger.focus-visible{outline:none;z-index:1}#button:focus-visible,.trigger:focus-visible{outline:none;z-index:1}#button.spectrum-Pagination-prevButton .spectrum-Icon,.trigger.spectrum-Pagination-prevButton .spectrum-Icon{transform:var(--spectrum-logical-rotation) rotate(180deg)}#button.spectrum-Pagination-nextButton .spectrum-Icon,.trigger.spectrum-Pagination-nextButton .spectrum-Icon{transform:var(--spectrum-logical-rotation)}:host([left]) #button{border-bottom-left-radius:0;border-bottom-right-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
);border-top-left-radius:0;border-top-right-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
);margin-left:var(--spectrum-spltibutton-margin-left);margin-right:0;padding-left:var(--spectrum-splitbutton-flat-edge-padding);padding-right:var(--spectrum-splitbutton-round-edge-padding)}:host([left]) #button:after{border-bottom-left-radius:var(--spectrum-splitbutton-border-radius-edge);border-bottom-right-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
);border-top-left-radius:var(--spectrum-splitbutton-border-radius-edge);border-top-right-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([left]) #button[variant=accent]{margin-left:var(
--spectrum-button-m-primary-outline-texticon-border-size,var(--spectrum-alias-border-size-thick)
);padding-left:var(--spectrum-splitbutton-cta-flat-edge-padding)}:host([left]) .trigger{border-bottom-left-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
);border-bottom-right-radius:0;border-left-width:var(
--spectrum-button-m-primary-outline-texticon-border-size,var(--spectrum-alias-border-size-thick)
);border-right-width:var(--spectrum-splitbutton-trigger-border-left);border-top-left-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
);border-top-right-radius:0;margin-right:0;padding-left:var(--spectrum-splitbutton-trigger-round-edge-padding);padding-right:var(--spectrum-splitbutton-trigger-flat-edge-padding)}:host([left]) .trigger:after{border-bottom-left-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
);border-bottom-right-radius:var(--spectrum-splitbutton-border-radius-edge);border-top-left-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
);border-top-right-radius:var(--spectrum-splitbutton-border-radius-edge)}:host([left]) .trigger[variant=accent]{border-right-width:var(
--spectrum-button-m-primary-outline-texticon-border-size,var(--spectrum-alias-border-size-thick)
);padding-right:var(--spectrum-splitbutton-cta-trigger-flat-edge-padding)}#button .label+.spectrum-Icon{margin-left:var(--spectrum-splitbutton-icon-gap)}:host>sp-menu{display:none}#button{--spectrum-splitbutton-flat-edge-padding:calc(var(--spectrum-button-edge-to-text) - var(
--spectrum-button-border-width,
var(--spectrum-alias-border-size-thick)
)*2);--spectrum-splitbutton-round-edge-padding:var(
--spectrum-button-edge-to-visual,var(--spectrum-global-dimension-size-200)
);--spectrum-splitbutton-cta-flat-edge-padding:calc(var(--spectrum-button-edge-to-text) - var(
--spectrum-button-border-width,
var(--spectrum-alias-border-size-thick)
)*3)}.trigger{--spectrum-splitbutton-trigger-flat-edge-padding:calc(var(--spectrum-button-edge-to-text) - var(
--spectrum-button-border-width,
var(--spectrum-alias-border-size-thick)
)*2);--spectrum-splitbutton-trigger-round-edge-padding:var(
--spectrum-button-edge-to-visual,var(--spectrum-global-dimension-size-200)
);--spectrum-splitbutton-cta-trigger-flat-edge-padding:calc(var(--spectrum-button-edge-to-text) - var(
--spectrum-button-border-width,
var(--spectrum-alias-border-size-thick)
)*3)}:host([dir=ltr]) #button[variant=accent]{margin-right:var(
--spectrum-button-border-width,var(--spectrum-alias-border-size-thick)
)}sp-button{--spectrum-button-m-primary-outline-texticon-border-radius:var(
--spectrum-button-border-radius
)}::slotted(sp-menu){display:none}sp-overlay:not(:defined){display:none}
`;var b = r$1;

var m=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var r=(o,n,e,i)=>{for(var t=i>1?void 0:i?p(n,e):n,l=o.length-1,a;l>=0;l--)(a=o[l])&&(t=(i?a(n,e,t):a(t))||t);return i&&t&&m(n,e,t),t};const y={s:"spectrum-UIIcon-ChevronDown75",m:"spectrum-UIIcon-ChevronDown100",l:"spectrum-UIIcon-ChevronDown200",xl:"spectrum-UIIcon-ChevronDown300"};class SplitButton extends SizedMixin(PickerBase){constructor(){super(...arguments);this.left=!1;this.variant="accent";this.type="field";this.listRole="menu";this.itemRole="menuitem";}static get styles(){return [b,b$1]}get focusElement(){return this.open?this.optionsMenu:this.left?this.trigger:this.button}passClick(){const e=this.type==="more"?this.menuItems[0]:this.selectedItem||this.menuItems[0];e&&e.click();}get buttonContent(){var e;return [x`
                <div
                    id="label"
                    role="presentation"
                    class=${l(this.value?void 0:"placeholder")}
                >
                    ${((e=this.selectedItem)==null?void 0:e.itemText)||""}
                </div>
                <slot name="tooltip"></slot>
            `]}update(e){e.has("type")&&(this.type==="more"?this.selects=void 0:this.selects="single"),super.update(e);}render(){var t;const e=["cta","accent"].includes(this.variant)?"fill":"outline",i=[x`
                <sp-button
                    aria-label=${l(this.label||((t=this.selectedItem)==null?void 0:t.itemText)||void 0)}
                    id="button"
                    class="button ${this.variant}"
                    @click=${this.passClick}
                    ?disabled=${this.disabled}
                    variant=${this.variant}
                    treatment=${e}
                    size=${this.size}
                >
                    ${this.buttonContent}
                </sp-button>
            `,x`
                <sp-button
                    aria-haspopup="true"
                    aria-expanded=${this.open?"true":"false"}
                    aria-controls=${l(this.open?"menu":void 0)}
                    class="button trigger ${this.variant}"
                    @blur=${this.handleButtonBlur}
                    @click=${this.handleActivate}
                    @pointerdown=${this.handleButtonPointerdown}
                    @focus=${this.handleButtonFocus}
                    @keydown=${{handleEvent:this.handleEnterKeydown,capture:!0}}
                    ?disabled=${this.disabled}
                    aria-labelledby="button"
                    variant=${this.variant}
                    treatment=${e}
                    size=${this.size}
                >
                    ${this.type==="field"?x`
                              <sp-icon-chevron100
                                  class="icon ${y[this.size]}"
                                  slot="icon"
                              ></sp-icon-chevron100>
                          `:x`
                              <sp-icon-more
                                  class="icon"
                                  slot="icon"
                              ></sp-icon-more>
                          `}
                </sp-button>
            `];return this.left&&i.reverse(),x`
            ${i} ${this.renderMenu}
        `}bindButtonKeydownListener(){this.trigger.addEventListener("keydown",this.handleKeydown);}async manageSelection(){await this.manageSplitButtonItems(),await super.manageSelection();}async manageSplitButtonItems(){!this.menuItems.length&&(await this.optionsMenu.updateComplete,!this.menuItems.length)||(this.type==="more"?(this.menuItems[0].hidden=!0,this.menuItems.forEach(e=>e.selected=!1),this.selectedItem=this.menuItems[0]):this.selectedItem=this.selectedItem||this.menuItems[0],this.value=this.selectedItem.value);}}r([n({type:Boolean,reflect:!0})],SplitButton.prototype,"left",2),r([n({reflect:!0})],SplitButton.prototype,"variant",2),r([n({type:String})],SplitButton.prototype,"type",2),r([i$1(".trigger")],SplitButton.prototype,"trigger",2);

defineElement("sp-split-button",SplitButton);

const menu = ({
  firstItemHandler = function() {
    return;
  },
  secondItemHandler = function() {
    return;
  },
  thirdItemHandler = function() {
    return;
  }
}) => x`
    <sp-menu-item @click=${firstItemHandler}>Option 1</sp-menu-item>
    <sp-menu-item @click=${secondItemHandler}>
        Option Really Extended
    </sp-menu-item>
    <sp-menu-item @click=${thirdItemHandler}>Short</sp-menu-item>
`;
const args = {
  disabled: false,
  invalid: false,
  left: false,
  open: false,
  type: "field",
  variant: "accent"
};
const argTypes = {
  disabled: {
    name: "disabled",
    type: { name: "boolean", required: false },
    description: "Disable this control. It will not receive focus or events.",
    table: {
      type: { summary: "boolean" },
      defaultValue: { summary: false }
    },
    control: {
      type: "boolean"
    }
  },
  invalid: {
    name: "invalid",
    type: { name: "boolean", required: false },
    table: {
      type: { summary: "boolean" },
      defaultValue: { summary: false }
    },
    control: {
      type: "boolean"
    }
  },
  left: {
    name: "left",
    type: { name: "boolean", required: false },
    description: "Whether the split begins on the left.",
    table: {
      type: { summary: "boolean" },
      defaultValue: { summary: false }
    },
    control: {
      type: "boolean"
    }
  },
  open: {
    name: "open",
    type: { name: "boolean", required: false },
    description: "Whether the picker menu is open.",
    table: {
      type: { summary: "boolean" },
      defaultValue: { summary: false }
    },
    control: {
      type: "boolean"
    }
  },
  type: {
    name: "type",
    type: { name: "string", required: false },
    description: "Whether the split button shows the chosen action from the overlay menu. The `more` type maintains its original value.",
    table: {
      type: { summary: "string" },
      defaultValue: { summary: "field" }
    },
    control: {
      type: "inline-radio",
      options: ["field", "more"]
    }
  },
  variant: {
    name: "variant",
    type: { name: "string", required: false },
    description: "The visual variant to apply to the button.",
    table: {
      type: { summary: "string" },
      defaultValue: { summary: "cta" }
    },
    control: {
      type: "inline-radio",
      options: [
        "accent",
        "primary",
        "secondary",
        "negative",
        "black",
        "white"
      ]
    }
  }
};
const splitbutton = (properties = {}) => x`
    <sp-split-button
        ?left=${!!properties.left}
        size=${properties.size || "m"}
        variant=${properties.variant || "cta"}
        type=${properties.type || "field"}
        ?open=${!!properties.open}
        ?disabled=${properties.disabled}
    >
        ${menu(properties)}
    </sp-split-button>
`;
const left = true;
const renderSplitButtonSet = (properties = {}) => x`
    ${splitbutton(properties)}
    ${splitbutton({
  ...properties,
  left
})}
`;

export { args as a, argTypes as b, renderSplitButtonSet as r, splitbutton as s };