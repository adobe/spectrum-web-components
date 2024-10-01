import './sp-popover-BH6yktMg.js';
import './sp-menu-C-dIukbW.js';
import './sp-button-BTMm_ibC.js';
import './sp-icon-chevron100-BExoFMYC.js';
import './sp-icon-more-DU6G5_Dk.js';
import { r as r$1 } from './spectrum-icon-chevron.css-CeYia-Jd.js';
import { i } from './lit-element-BulMEkr1.js';
import { S as SizedMixin } from './sizedMixin-BzkTbMb8.js';
import { a as PickerBase } from './Picker-TUMgNVnC.js';
import { x } from './lit-html-COgVUehj.js';
import { o } from './if-defined-DDJGFaN4.js';
import { n, d as defineElement } from './define-element-C_3bgzm7.js';
import { e } from './query-DQF6X5qW.js';
import './sp-menu-item-DOkBCZjF.js';

const r=i`
    :host{--spectrum-splitbutton-trigger-border-left:0;--spectrum-splitbutton-trigger-min-width:0;--spectrum-spltibutton-margin-left:0;--spectrum-splitbutton-icon-gap:var(--spectrum-global-dimension-size-150);--spectrum-splitbutton-border-radius-edge:var(--spectrum-alias-border-radius-small)}:host([dir=rtl]),:host([dir=rtl]){--spectrum-logical-rotation:matrix(-1,0,0,1,0,0)}.trigger{--spectrum-splitbutton-trigger-round-edge-padding:var(--spectrum-global-dimension-size-125);--spectrum-splitbutton-trigger-flat-edge-padding:var(--spectrum-global-dimension-size-100);--spectrum-splitbutton-cta-trigger-flat-edge-padding:calc(var(--spectrum-splitbutton-trigger-flat-edge-padding) - var(--spectrum-button-m-primary-outline-texticon-border-size,var(--spectrum-alias-border-size-thick)))}#button{--spectrum-splitbutton-flat-edge-padding:calc(var(--spectrum-button-m-primary-outline-texticon-padding-left) - var(--spectrum-button-m-primary-outline-texticon-border-size,var(--spectrum-alias-border-size-thick))*2);--spectrum-splitbutton-round-edge-padding:var(--spectrum-button-m-primary-outline-texticon-padding-right,var(--spectrum-global-dimension-size-200));--spectrum-splitbutton-cta-flat-edge-padding:calc(var(--spectrum-button-m-primary-outline-texticon-padding-left) - var(--spectrum-button-m-primary-outline-texticon-border-size,var(--spectrum-alias-border-size-thick))*3)}:host{vertical-align:top;flex-direction:row;display:inline-flex;position:relative}#button{border-start-start-radius:var(--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200));border-start-end-radius:0;border-end-end-radius:0;border-end-start-radius:var(--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200));margin-inline-start:0;padding-inline-start:var(--spectrum-splitbutton-round-edge-padding);padding-inline-end:var(--spectrum-splitbutton-flat-edge-padding)}#button[variant=accent]{margin-inline-end:var(--spectrum-button-m-primary-outline-texticon-border-size,var(--spectrum-alias-border-size-thick));padding-inline-end:var(--spectrum-splitbutton-cta-flat-edge-padding)}#button:after{border-start-end-radius:var(--spectrum-splitbutton-border-radius-edge);border-end-end-radius:var(--spectrum-splitbutton-border-radius-edge)}.trigger{border-inline-start-width:var(--spectrum-splitbutton-trigger-border-left);min-inline-size:var(--spectrum-splitbutton-trigger-min-width);border-start-start-radius:0;border-start-end-radius:var(--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200));border-end-end-radius:var(--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200));border-end-start-radius:0;margin-inline-start:0;padding-inline-start:var(--spectrum-splitbutton-trigger-flat-edge-padding);padding-inline-end:var(--spectrum-splitbutton-trigger-round-edge-padding)}.trigger[variant=accent]{border-inline-start-width:var(--spectrum-button-m-primary-outline-texticon-border-size,var(--spectrum-alias-border-size-thick));padding-inline-start:var(--spectrum-splitbutton-cta-trigger-flat-edge-padding)}.trigger:focus-visible{box-shadow:none}.trigger:after{border-start-start-radius:var(--spectrum-splitbutton-border-radius-edge);border-end-start-radius:var(--spectrum-splitbutton-border-radius-edge)}.icon{margin-block-start:1px;display:block}#button,.trigger{position:relative}#button:focus-visible,.trigger:focus-visible{z-index:1;outline:none}#button.spectrum-Pagination-prevButton .spectrum-Icon,.trigger.spectrum-Pagination-prevButton .spectrum-Icon{transform:var(--spectrum-logical-rotation,)rotate(180deg)}#button.spectrum-Pagination-nextButton .spectrum-Icon,.trigger.spectrum-Pagination-nextButton .spectrum-Icon{transform:var(--spectrum-logical-rotation)}#button .label+.spectrum-Icon{margin-inline-start:var(--spectrum-splitbutton-icon-gap)}:host([left]) #button{border-start-start-radius:0;border-start-end-radius:var(--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200));border-end-end-radius:var(--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200));border-end-start-radius:0;margin-inline-start:var(--spectrum-spltibutton-margin-left);margin-inline-end:0;padding-inline-start:var(--spectrum-splitbutton-flat-edge-padding);padding-inline-end:var(--spectrum-splitbutton-round-edge-padding)}:host([left]) #button:after{border-start-start-radius:var(--spectrum-splitbutton-border-radius-edge);border-start-end-radius:var(--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200));border-end-end-radius:var(--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200));border-end-start-radius:var(--spectrum-splitbutton-border-radius-edge)}:host([left]) #button[variant=accent]{margin-inline-start:var(--spectrum-button-m-primary-outline-texticon-border-size,var(--spectrum-alias-border-size-thick));padding-inline-start:var(--spectrum-splitbutton-cta-flat-edge-padding)}:host([left]) .trigger{border-inline-start-width:var(--spectrum-button-m-primary-outline-texticon-border-size,var(--spectrum-alias-border-size-thick));border-inline-end-width:var(--spectrum-splitbutton-trigger-border-left);border-start-start-radius:var(--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200));border-start-end-radius:0;border-end-end-radius:0;border-end-start-radius:var(--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200));margin-inline-end:0;padding-inline-start:var(--spectrum-splitbutton-trigger-round-edge-padding);padding-inline-end:var(--spectrum-splitbutton-trigger-flat-edge-padding)}:host([left]) .trigger:after{border-start-start-radius:var(--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200));border-start-end-radius:var(--spectrum-splitbutton-border-radius-edge);border-end-end-radius:var(--spectrum-splitbutton-border-radius-edge);border-end-start-radius:var(--spectrum-button-m-primary-outline-texticon-border-radius,var(--spectrum-global-dimension-size-200))}:host([left]) .trigger[variant=accent]{border-inline-end-width:var(--spectrum-button-m-primary-outline-texticon-border-size,var(--spectrum-alias-border-size-thick));padding-inline-end:var(--spectrum-splitbutton-cta-trigger-flat-edge-padding)}:host>sp-menu{display:none}#button{--spectrum-splitbutton-flat-edge-padding:calc(var(--spectrum-button-edge-to-text) - var(--spectrum-button-border-width,var(--spectrum-alias-border-size-thick))*2);--spectrum-splitbutton-round-edge-padding:var(--spectrum-button-edge-to-visual,var(--spectrum-global-dimension-size-200));--spectrum-splitbutton-cta-flat-edge-padding:calc(var(--spectrum-button-edge-to-text) - var(--spectrum-button-border-width,var(--spectrum-alias-border-size-thick))*3)}.trigger{--spectrum-splitbutton-trigger-flat-edge-padding:calc(var(--spectrum-button-edge-to-text) - var(--spectrum-button-border-width,var(--spectrum-alias-border-size-thick))*2);--spectrum-splitbutton-trigger-round-edge-padding:var(--spectrum-button-edge-to-visual,var(--spectrum-global-dimension-size-200));--spectrum-splitbutton-cta-trigger-flat-edge-padding:calc(var(--spectrum-button-edge-to-text) - var(--spectrum-button-border-width,var(--spectrum-alias-border-size-thick))*3)}sp-button{--spectrum-button-m-primary-outline-texticon-border-radius:var(--spectrum-button-border-radius)}sp-overlay:not(:defined){display:none}.icon{align-self:center}
`;

var m=Object.defineProperty;var s=(o,r,e,i)=>{for(var t=void 0,a=o.length-1,l;a>=0;a--)(l=o[a])&&(t=(l(r,e,t))||t);return t&&m(r,e,t),t};const y={s:"spectrum-UIIcon-ChevronDown75",m:"spectrum-UIIcon-ChevronDown100",l:"spectrum-UIIcon-ChevronDown200",xl:"spectrum-UIIcon-ChevronDown300"};class SplitButton extends SizedMixin(PickerBase){constructor(){super(...arguments);this.left=!1;this.variant="accent";this.type="field";this.listRole="menu";this.itemRole="menuitem";}static get styles(){return [r,r$1]}get focusElement(){return this.open?this.optionsMenu:this.left?this.trigger:this.button}passClick(){const e=this.type==="more"?this.menuItems[0]:this.selectedItem||this.menuItems[0];e&&e.click();}get buttonContent(){var e;return [x`
                <div
                    id="label"
                    role="presentation"
                    class=${o(this.value?void 0:"placeholder")}
                >
                    ${((e=this.selectedItem)==null?void 0:e.itemText)||""}
                </div>
                <slot name="tooltip"></slot>
            `]}update(e){e.has("type")&&(this.type==="more"?this.selects=void 0:this.selects="single"),super.update(e);}render(){var t;const e=["cta","accent"].includes(this.variant)?"fill":"outline",i=[x`
                <sp-button
                    aria-label=${o(this.label||((t=this.selectedItem)==null?void 0:t.itemText)||void 0)}
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
                    aria-controls=${o(this.open?"menu":void 0)}
                    class="button trigger ${this.variant}"
                    @blur=${this.handleButtonBlur}
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
        `}bindButtonKeydownListener(){this.trigger.addEventListener("keydown",this.handleKeydown);}async manageSelection(){await this.manageSplitButtonItems(),await super.manageSelection();}async manageSplitButtonItems(){!this.menuItems.length&&(await this.optionsMenu.updateComplete,!this.menuItems.length)||(this.type==="more"?(this.menuItems[0].hidden=!0,this.menuItems.forEach(e=>e.selected=!1),this.selectedItem=this.menuItems[0]):this.selectedItem=this.selectedItem||this.menuItems[0],this.value=this.selectedItem.value);}}s([n({type:Boolean,reflect:!0})],SplitButton.prototype,"left"),s([n({reflect:!0})],SplitButton.prototype,"variant"),s([n({type:String})],SplitButton.prototype,"type"),s([e(".trigger")],SplitButton.prototype,"trigger"),s([e(".trigger")],SplitButton.prototype,"button");

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
const parameters = {
  badges: ["deprecated"]
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

export { args as a, argTypes as b, parameters as p, renderSplitButtonSet as r, splitbutton as s };
