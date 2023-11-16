import './sp-popover-adc6def6.js';
import './sp-menu-a6b50bf6.js';
import './sp-button-c571335c.js';
import './sp-icon-chevron100-d31cf739.js';
import './sp-icon-more-d39e1471.js';
import { b as b$1 } from './spectrum-icon-chevron.css-d3283c08.js';
import { i } from './lit-element-9354aa77.js';
import { S as SizedMixin } from './sizedMixin-95b38e3e.js';
import { a as PickerBase } from './Picker-7a452146.js';
import { x } from './lit-html-126adc72.js';
import { l } from './if-defined-ae83b405.js';
import { n, d as defineElement } from './define-element-467f3dc4.js';
import { i as i$1 } from './query-d0113d5a.js';
import './sp-menu-item-d1901258.js';

const r$1=i`
:host{--spectrum-splitbutton-trigger-border-left:0;--spectrum-splitbutton-trigger-min-width:0;--spectrum-spltibutton-margin-left:0;--spectrum-splitbutton-icon-gap:var(--spectrum-global-dimension-size-150);--spectrum-splitbutton-border-radius-edge:var(
--spectrum-alias-border-radius-small,var(--spectrum-global-dimension-size-25)
)}.trigger{--spectrum-splitbutton-trigger-round-edge-padding:var(
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
)*3)}:host{display:inline-flex;flex-direction:row;position:relative;vertical-align:top}:host([dir=ltr]) #button{margin-left:0}:host([dir=rtl]) #button{margin-right:0}:host([dir=ltr]) #button{border-top-left-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=rtl]) #button{border-top-right-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=ltr]) #button{border-top-right-radius:0}:host([dir=rtl]) #button{border-top-left-radius:0}:host([dir=ltr]) #button{border-bottom-right-radius:0}:host([dir=rtl]) #button{border-bottom-left-radius:0}:host([dir=ltr]) #button{border-bottom-left-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=rtl]) #button{border-bottom-right-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=ltr]) #button{padding-right:var(--spectrum-splitbutton-flat-edge-padding)}:host([dir=rtl]) #button{padding-left:var(--spectrum-splitbutton-flat-edge-padding)}:host([dir=ltr]) #button{padding-left:var(--spectrum-splitbutton-round-edge-padding)}:host([dir=rtl]) #button{padding-right:var(--spectrum-splitbutton-round-edge-padding)}:host([dir=ltr]) #button[variant=accent]{padding-right:var(--spectrum-splitbutton-cta-flat-edge-padding)}:host([dir=rtl]) #button[variant=accent]{padding-left:var(--spectrum-splitbutton-cta-flat-edge-padding)}:host([dir=ltr]) #button[variant=accent]{margin-right:var(
--spectrum-button-m-primary-outline-texticon-border-size,var(--spectrum-alias-border-size-thick)
)}:host([dir=rtl]) #button[variant=accent]{margin-left:var(
--spectrum-button-m-primary-outline-texticon-border-size,var(--spectrum-alias-border-size-thick)
)}:host([dir=ltr]) #button:after{border-top-right-radius:var(--spectrum-splitbutton-border-radius-edge)}:host([dir=rtl]) #button:after{border-top-left-radius:var(--spectrum-splitbutton-border-radius-edge)}:host([dir=ltr]) #button:after{border-bottom-right-radius:var(--spectrum-splitbutton-border-radius-edge)}:host([dir=rtl]) #button:after{border-bottom-left-radius:var(--spectrum-splitbutton-border-radius-edge)}:host([dir=ltr]) .trigger{margin-left:0}:host([dir=rtl]) .trigger{margin-right:0}:host([dir=ltr]) .trigger{border-top-left-radius:0}:host([dir=rtl]) .trigger{border-top-right-radius:0}:host([dir=ltr]) .trigger{border-top-right-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=rtl]) .trigger{border-top-left-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=ltr]) .trigger{border-bottom-right-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=rtl]) .trigger{border-bottom-left-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=ltr]) .trigger{border-bottom-left-radius:0}:host([dir=rtl]) .trigger{border-bottom-right-radius:0}:host([dir=ltr]) .trigger{border-left-width:var(--spectrum-splitbutton-trigger-border-left)}:host([dir=rtl]) .trigger{border-right-width:var(--spectrum-splitbutton-trigger-border-left)}:host([dir=ltr]) .trigger{padding-left:var(--spectrum-splitbutton-trigger-flat-edge-padding)}:host([dir=rtl]) .trigger{padding-right:var(--spectrum-splitbutton-trigger-flat-edge-padding)}:host([dir=ltr]) .trigger{padding-right:var(--spectrum-splitbutton-trigger-round-edge-padding)}:host([dir=rtl]) .trigger{padding-left:var(--spectrum-splitbutton-trigger-round-edge-padding)}.trigger{min-width:var(--spectrum-splitbutton-trigger-min-width)}:host([dir=ltr]) .trigger[variant=accent]{padding-left:var(--spectrum-splitbutton-cta-trigger-flat-edge-padding)}:host([dir=rtl]) .trigger[variant=accent]{padding-right:var(--spectrum-splitbutton-cta-trigger-flat-edge-padding)}:host([dir=ltr]) .trigger[variant=accent]{border-left-width:var(
--spectrum-button-m-primary-outline-texticon-border-size,var(--spectrum-alias-border-size-thick)
)}:host([dir=rtl]) .trigger[variant=accent]{border-right-width:var(
--spectrum-button-m-primary-outline-texticon-border-size,var(--spectrum-alias-border-size-thick)
)}.trigger.focus-visible{box-shadow:none}.trigger:focus-visible{box-shadow:none}:host([dir=ltr]) .trigger:after{border-top-left-radius:var(--spectrum-splitbutton-border-radius-edge)}:host([dir=rtl]) .trigger:after{border-top-right-radius:var(--spectrum-splitbutton-border-radius-edge)}:host([dir=ltr]) .trigger:after{border-bottom-left-radius:var(--spectrum-splitbutton-border-radius-edge)}:host([dir=rtl]) .trigger:after{border-bottom-right-radius:var(--spectrum-splitbutton-border-radius-edge)}.icon{display:block;margin-top:1px}#button,.trigger{position:relative}#button.focus-visible,.trigger.focus-visible{outline:none;z-index:1}#button:focus-visible,.trigger:focus-visible{outline:none;z-index:1}:host([dir=ltr]) #button .label+.spectrum-Icon{margin-left:var(--spectrum-splitbutton-icon-gap)}:host([dir=rtl]) #button .label+.spectrum-Icon{margin-right:var(--spectrum-splitbutton-icon-gap)}:host([dir=ltr][left]) #button{border-top-left-radius:0}:host([dir=rtl][left]) #button{border-top-right-radius:0}:host([dir=ltr][left]) #button{border-top-right-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=rtl][left]) #button{border-top-left-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=ltr][left]) #button{border-bottom-right-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=rtl][left]) #button{border-bottom-left-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=ltr][left]) #button{border-bottom-left-radius:0}:host([dir=rtl][left]) #button{border-bottom-right-radius:0}:host([dir=ltr][left]) #button{margin-right:0}:host([dir=rtl][left]) #button{margin-left:0}:host([dir=ltr][left]) #button{margin-left:var(--spectrum-spltibutton-margin-left)}:host([dir=rtl][left]) #button{margin-right:var(--spectrum-spltibutton-margin-left)}:host([dir=ltr][left]) #button{padding-left:var(--spectrum-splitbutton-flat-edge-padding)}:host([dir=rtl][left]) #button{padding-right:var(--spectrum-splitbutton-flat-edge-padding)}:host([dir=ltr][left]) #button{padding-right:var(--spectrum-splitbutton-round-edge-padding)}:host([dir=rtl][left]) #button{padding-left:var(--spectrum-splitbutton-round-edge-padding)}:host([dir=ltr][left]) #button[variant=accent]{padding-left:var(--spectrum-splitbutton-cta-flat-edge-padding)}:host([dir=rtl][left]) #button[variant=accent]{padding-right:var(--spectrum-splitbutton-cta-flat-edge-padding)}:host([dir=ltr][left]) #button[variant=accent]{margin-left:var(
--spectrum-button-m-primary-outline-texticon-border-size,var(--spectrum-alias-border-size-thick)
)}:host([dir=rtl][left]) #button[variant=accent]{margin-right:var(
--spectrum-button-m-primary-outline-texticon-border-size,var(--spectrum-alias-border-size-thick)
)}:host([dir=ltr][left]) #button:after{border-top-left-radius:var(--spectrum-splitbutton-border-radius-edge)}:host([dir=rtl][left]) #button:after{border-top-right-radius:var(--spectrum-splitbutton-border-radius-edge)}:host([dir=ltr][left]) #button:after{border-top-right-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=rtl][left]) #button:after{border-top-left-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=ltr][left]) #button:after{border-bottom-right-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=rtl][left]) #button:after{border-bottom-left-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=ltr][left]) #button:after{border-bottom-left-radius:var(--spectrum-splitbutton-border-radius-edge)}:host([dir=rtl][left]) #button:after{border-bottom-right-radius:var(--spectrum-splitbutton-border-radius-edge)}:host([dir=ltr][left]) .trigger{margin-right:0}:host([dir=rtl][left]) .trigger{margin-left:0}:host([dir=ltr][left]) .trigger{border-top-left-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=rtl][left]) .trigger{border-top-right-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=ltr][left]) .trigger{border-top-right-radius:0}:host([dir=rtl][left]) .trigger{border-top-left-radius:0}:host([dir=ltr][left]) .trigger{border-bottom-right-radius:0}:host([dir=rtl][left]) .trigger{border-bottom-left-radius:0}:host([dir=ltr][left]) .trigger{border-bottom-left-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=rtl][left]) .trigger{border-bottom-right-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=ltr][left]) .trigger{border-left-width:var(
--spectrum-button-m-primary-outline-texticon-border-size,var(--spectrum-alias-border-size-thick)
)}:host([dir=rtl][left]) .trigger{border-right-width:var(
--spectrum-button-m-primary-outline-texticon-border-size,var(--spectrum-alias-border-size-thick)
)}:host([dir=ltr][left]) .trigger{border-right-width:var(--spectrum-splitbutton-trigger-border-left)}:host([dir=rtl][left]) .trigger{border-left-width:var(--spectrum-splitbutton-trigger-border-left)}:host([dir=ltr][left]) .trigger{padding-right:var(--spectrum-splitbutton-trigger-flat-edge-padding)}:host([dir=rtl][left]) .trigger{padding-left:var(--spectrum-splitbutton-trigger-flat-edge-padding)}:host([dir=ltr][left]) .trigger{padding-left:var(--spectrum-splitbutton-trigger-round-edge-padding)}:host([dir=rtl][left]) .trigger{padding-right:var(--spectrum-splitbutton-trigger-round-edge-padding)}:host([dir=ltr][left]) .trigger[variant=accent]{padding-right:var(--spectrum-splitbutton-cta-trigger-flat-edge-padding)}:host([dir=rtl][left]) .trigger[variant=accent]{padding-left:var(--spectrum-splitbutton-cta-trigger-flat-edge-padding)}:host([dir=ltr][left]) .trigger[variant=accent]{border-right-width:var(
--spectrum-button-m-primary-outline-texticon-border-size,var(--spectrum-alias-border-size-thick)
)}:host([dir=rtl][left]) .trigger[variant=accent]{border-left-width:var(
--spectrum-button-m-primary-outline-texticon-border-size,var(--spectrum-alias-border-size-thick)
)}:host([dir=ltr][left]) .trigger:after{border-top-left-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=rtl][left]) .trigger:after{border-top-right-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=ltr][left]) .trigger:after{border-top-right-radius:var(--spectrum-splitbutton-border-radius-edge)}:host([dir=rtl][left]) .trigger:after{border-top-left-radius:var(--spectrum-splitbutton-border-radius-edge)}:host([dir=ltr][left]) .trigger:after{border-bottom-right-radius:var(--spectrum-splitbutton-border-radius-edge)}:host([dir=rtl][left]) .trigger:after{border-bottom-left-radius:var(--spectrum-splitbutton-border-radius-edge)}:host([dir=ltr][left]) .trigger:after{border-bottom-left-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host([dir=rtl][left]) .trigger:after{border-bottom-right-radius:var(
--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200)
)}:host>sp-menu{display:none}#button{--spectrum-splitbutton-flat-edge-padding:calc(var(--spectrum-button-edge-to-text) - var(
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
)}::slotted(sp-menu){display:none}
`;var b = r$1;

var p=Object.defineProperty;var m=Object.getOwnPropertyDescriptor;var r=(o,n,e,t)=>{for(var i=t>1?void 0:t?m(n,e):n,l=o.length-1,a;l>=0;l--)(a=o[l])&&(i=(t?a(n,e,i):a(i))||i);return t&&i&&p(n,e,i),i};const y={s:"spectrum-UIIcon-ChevronDown75",m:"spectrum-UIIcon-ChevronDown100",l:"spectrum-UIIcon-ChevronDown200",xl:"spectrum-UIIcon-ChevronDown300"};class SplitButton extends SizedMixin(PickerBase){constructor(){super(...arguments);this.left=!1;this.variant="accent";this.type="field";this.listRole="menu";this.itemRole="menuitem";}static get styles(){return [b,b$1]}get focusElement(){return this.open?this.optionsMenu:this.left?this.trigger:this.button}passClick(){const e=this.type==="more"?this.menuItems[0]:this.selectedItem||this.menuItems[0];e&&e.click();}get buttonContent(){var e;return [x`
                <div
                    id="label"
                    role="presentation"
                    class=${l(this.value?void 0:"placeholder")}
                >
                    ${((e=this.selectedItem)==null?void 0:e.itemText)||""}
                </div>
                <slot name="tooltip"></slot>
            `]}update(e){e.has("type")&&(this.type==="more"?this.selects=void 0:this.selects="single"),super.update(e);}render(){const e=["cta","accent"].includes(this.variant)?"fill":"outline",t=[x`
                <sp-button
                    aria-label=${l(this.label||void 0)}
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
                    @pointerdown=${this.handleButtonPointerdown}
                    @focus=${this.handleButtonFocus}
                    @click=${this.handleButtonClick}
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
            `];return this.left&&t.reverse(),x`
            ${t} ${this.renderMenu}
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
