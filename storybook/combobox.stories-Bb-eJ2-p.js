import { T as Template, f as fruits, c as countries } from './template-5K3SZCym.js';
import './sp-field-label-Bg1ldYjg.js';
import './sp-help-text-43LIpJgT.js';
import './sp-tooltip-BwtH4YwM.js';
import './sp-menu-item-B4Ha1KcC.js';
import { d as defineElement } from './define-element-JsEeAjlA.js';
import { x } from './lit-html-COgVUehj.js';
import { r } from './state-CJdJtSzk.js';
import { e } from './query-DQF6X5qW.js';
import { s } from './lit-element-BulMEkr1.js';
import { l } from './Textfield-D3I-a003.js';
import './sp-overlay-DZqP4Xas.js';
import './Overlay-DzguzOPx.js';
import './ElementResolution-B9KteuX8.js';
import './random-id-BST1Puzz.js';
import './AbstractOverlay-ClYn-_-x.js';
import './first-focusable-in-BK_DAWOm.js';
import './focusable-selectors-CUZEb4r9.js';
import './VirtualTrigger-By-MnZ6p.js';
import './strategies-k5poJ-5A.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './platform-r3Lf9REX.js';
import './slottable-request-event-DXuuyGoq.js';
import './query-assigned-elements-C9WOp2R6.js';
import './base-u8Z1Hrsd.js';
import './if-defined-DDJGFaN4.js';
import './style-map-DtKTc8KS.js';
import './directive-Bn5c4u4M.js';
import './sp-icon-chevron100-BV9O-ZIc.js';
import './custom-tag-B5IH9PTE.js';
import './Chevron100-OyV1wQMZ.js';
import './IconBase-Bmj8ZYSq.js';
import './sp-popover-Cx00B4t2.js';
import './Popover-B4TKuoIS.js';
import './sp-menu-RLrO_nUh.js';
import './sizedMixin-CvxKvEie.js';
import './PendingState-DrK3DVye.js';
import './get-label-from-slot-Cg6mfN40.js';
import './sp-picker-button-BluZ2U07.js';
import './ButtonBase-EiAuB8cn.js';
import './like-anchor-C9Xos9l8.js';
import './focusable-C0Y2600m.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-DKkDovCf.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './observe-slot-presence-Ceiwt-jV.js';
import './icon-chevron-overrides.css-Bz8Nk10Z.js';
import './class-map-DdRvesrq.js';
import './repeat-D5JakrYV.js';
import './directive-helpers-icdnqxxc.js';
import './lit-helpers-DFCD1oU3.js';
import './async-directive-DF6rMZJ5.js';
import './sp-icon-alert-BIYj3aEh.js';
import './custom-tag-Diwq7nXX.js';
import './DependencyManger-Dpkh1Bse.js';
import './icon-checkmark-overrides.css-BM8JyPpN.js';
import './manage-help-text-CQxj8H8g.js';

const argTypes = {
  size: {
    name: "size",
    type: { name: "string", required: false },
    table: {
      defaultValue: { summary: "m" }
    },
    control: {
      labels: {
        s: "Small",
        m: "Medium",
        l: "Large",
        xl: "Extra large"
      },
      type: "select"
    },
    options: ["s", "m", "l", "xl"]
  },
  quiet: {
    name: "quiet",
    type: { name: "boolean", required: false },
    table: {
      type: { summary: "boolean" },
      defaultValue: { summary: false }
    },
    control: {
      type: "boolean"
    }
  },
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
  pending: {
    name: "pending",
    type: { name: "boolean", required: false },
    table: {
      type: { summary: "boolean" },
      defaultValue: { summary: false }
    },
    control: {
      type: "boolean"
    }
  },
  readonly: {
    name: "readonly",
    type: { name: "boolean", required: false },
    table: {
      type: { summary: "boolean" },
      defaultValue: { summary: false }
    },
    control: {
      type: "boolean"
    }
  }
};

var __defProp = Object.defineProperty;
var __decorateClass = (decorators, target, key, kind) => {
  var result = void 0 ;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(target, key, result) ) || result;
  if (result) __defProp(target, key, result);
  return result;
};
var combobox_stories = {
  title: "Combobox",
  component: "sp-combobox",
  args: {
    open: false,
    disabled: false,
    invalid: false,
    pending: false,
    readonly: false,
    quiet: false
  },
  argTypes
};
const Default = (args) => Template(args);
const disabled = (args) => Template(args);
disabled.args = {
  disabled: true,
  value: "Azerbaijan"
};
const invalid = (args) => Template(args);
invalid.args = {
  invalid: true
};
const pending = (args) => Template(args);
pending.args = {
  pending: true
};
const quiet = (args) => Template(args);
quiet.args = {
  quiet: true
};
const readonly = (args) => Template(args);
readonly.args = {
  readonly: true,
  value: "Solomon Islands"
};
const listAutocomplete = (args) => Template(args);
listAutocomplete.args = {
  autocomplete: "list"
};
const noAutocomplete = () => {
  return x`
        <sp-field-label side-aligned="start" for="combobox-3">
            Fruit
        </sp-field-label>
        <sp-combobox
            id="combobox-3"
            .options=${fruits}
            style="min-width: 80px;--spectrum-textfield-m-min-width:0;width:100px;"
        ></sp-combobox>
        <sp-field-label side-aligned="start" for="combobox-4">
            Countries
        </sp-field-label>
        <sp-combobox
            id="combobox-4"
            .options=${countries}
            style="min-width: 80px;--spectrum-textfield-m-min-width:0;width:100px;"
        ></sp-combobox>
    `;
};
const lightDOM = () => {
  return x`
        <sp-field-label side-aligned="start" for="combobox-5">
            Fruit
        </sp-field-label>
        <sp-combobox
            id="combobox-5"
            style="min-width: 80px;--spectrum-textfield-m-min-width:0;width:100px;"
        >
            ${fruits.map(
    (fruit) => x`
                    <sp-menu-item id=${fruit.value} value=${fruit.value}>
                        ${fruit.itemText}
                    </sp-menu-item>
                `
  )}
        </sp-combobox>
        <sp-field-label side-aligned="start" for="combobox-6">
            Countries
        </sp-field-label>
        <sp-combobox
            id="combobox-6"
            style="min-width: 80px;--spectrum-textfield-m-min-width:0;width:100px;"
        >
            ${countries.map(
    (country) => x`
                    <sp-menu-item id=${country.value} value=${country.value}>
                        ${country.itemText}
                    </sp-menu-item>
                `
  )}
        </sp-combobox>
    `;
};
const withTooltip = () => {
  return x`
        <sp-combobox
            id="combobox-6"
            label="Combobox with tooltip"
            style="min-width: 80px;--spectrum-textfield-m-min-width:0;width:100px;"
        >
            ${countries.map(
    (option) => x`
                    <sp-menu-item id=${option.value} value=${option.value}>
                        ${option.itemText}
                    </sp-menu-item>
                `
  )}
            <sp-tooltip slot="tooltip" self-managed placement="right" open>
                This combobox has a tooltip.
            </sp-tooltip>
        </sp-combobox>
    `;
};
const withFieldLabel = () => {
  return x`
        <sp-field-label for="combobox-7">Pick something</sp-field-label>
        <sp-combobox id="combobox-7" .options=${fruits}></sp-combobox>
    `;
};
const withLabelAttribute = () => {
  return x`
        <sp-combobox
            id="combobox-7"
            label="Pick something"
            .options=${fruits}
        ></sp-combobox>
    `;
};
const withHelpText = () => {
  return x`
        <sp-combobox id="combobox-7" label="Pick something" .options=${fruits}>
            <sp-help-text slot="help-text">
                These are fruits found in the game "Animal Crossing: New Leaf".
            </sp-help-text>
        </sp-combobox>
    `;
};
const _ControlledCombo = class _ControlledCombo extends s {
  constructor() {
    super(...arguments);
    this.value = {
      raw: "",
      validated: `${_ControlledCombo.ages[0].itemText}`
    };
  }
  render() {
    return x`
            <sp-field-label for="age">
                Retirement age (try entering a non-number)
            </sp-field-label>
            <sp-combobox
                id="age"
                .options=${_ControlledCombo.ages}
                .value=${l(this.value.validated)}
                @change=${this.onChange}
            ></sp-combobox>
        `;
  }
  onChange() {
    this.value = {
      raw: this.combobox.value,
      validated: this.combobox.value.replace(/\D/g, "") || "55"
    };
  }
};
_ControlledCombo.ages = Array.from({ length: 76 - 55 }, (_, n) => {
  const age = `${n + 55}`;
  return { value: age, itemText: age };
});
__decorateClass([
  r()
], _ControlledCombo.prototype, "value");
__decorateClass([
  e("#age")
], _ControlledCombo.prototype, "combobox");
let ControlledCombo = _ControlledCombo;
defineElement("controlled-combo", ControlledCombo);
const controlled = () => {
  return x`
        <controlled-combo></controlled-combo>
    `;
};
controlled.swc_vrt = {
  skip: true
};
controlled.parameters = {
  // Disables Chromatic's snapshotting on a global level
  chromatic: { disableSnapshot: true }
};
const __namedExportsOrder = ['Default', 'disabled', 'invalid', 'pending', 'quiet', 'readonly', 'listAutocomplete', 'noAutocomplete', 'lightDOM', 'withTooltip', 'withFieldLabel', 'withLabelAttribute', 'withHelpText', 'controlled'];

export { Default, __namedExportsOrder, controlled, combobox_stories as default, disabled, invalid, lightDOM, listAutocomplete, noAutocomplete, pending, quiet, readonly, withFieldLabel, withHelpText, withLabelAttribute, withTooltip };
