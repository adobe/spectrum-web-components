import { c as countries, f as fruits } from './index-DuUnlyJs.js';
import './sp-field-label-Cf_nvrkT.js';
import './sp-help-text-D0H8eePX.js';
import './sp-tooltip-B_vYfZ6z.js';
import './sp-menu-item-KlLN_ToV.js';
import { d as defineElement } from './define-element-ByMWMcVd.js';
import { x } from './lit-html-COgVUehj.js';
import { r } from './state-DGkVCdxP.js';
import { e } from './query-DQF6X5qW.js';
import { s } from './lit-element-BL-po2DW.js';
import { l } from './Textfield-wDs6AzMk.js';
import './sp-overlay-rmG6aBFp.js';
import './Overlay-Bunm4wxf.js';
import './ElementResolution-B9KteuX8.js';
import './random-id-BST1Puzz.js';
import './AbstractOverlay-BmdjRMJl.js';
import './first-focusable-in-BK_DAWOm.js';
import './focusable-selectors-CUZEb4r9.js';
import './VirtualTrigger-Cyjxfq5s.js';
import './strategies-LVmDxAdp.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './platform-DpSwcmux.js';
import './slottable-request-event-DXuuyGoq.js';
import './query-assigned-elements-C9WOp2R6.js';
import './base-u8Z1Hrsd.js';
import './if-defined-DDJGFaN4.js';
import './style-map-DtKTc8KS.js';
import './directive-Bn5c4u4M.js';
import './sp-icon-chevron100-CvWYkNtC.js';
import './Chevron100-2ZEB0c-t.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-C1z7UsT5.js';
import './sp-popover-Ico2SJk-.js';
import './Popover-D7EtKebK.js';
import './sp-menu-Bi5ZsR-Z.js';
import './sizedMixin-C1lD98vT.js';
import './sp-picker-button-BSXx5XK2.js';
import './ButtonBase-CjmqgWAT.js';
import './like-anchor-3x3vwb8N.js';
import './focusable-CUJIQEAB.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-DLXbbJr-.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './observe-slot-presence-Ceiwt-jV.js';
import './spectrum-icon-chevron.css-C5c2rYXA.js';
import './class-map-DdRvesrq.js';
import './repeat-D5JakrYV.js';
import './directive-helpers-icdnqxxc.js';
import './sp-icon-alert-ClrE4xtp.js';
import './custom-tag-Diwq7nXX.js';
import './DependencyManger-Dpkh1Bse.js';
import './spectrum-icon-checkmark.css-B6wBbQoF.js';
import './manage-help-text-83_bseGo.js';

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
  component: "sp-combobox"
};
const Default = () => {
  return x`
        <sp-field-label for="combobox-1">Where do you live?</sp-field-label>
        <sp-combobox id="combobox-1" .options=${countries}></sp-combobox>
    `;
};
const disabled = () => {
  return x`
        <sp-field-label for="combobox-disabled">
            Where do you live?
        </sp-field-label>
        <sp-combobox
            disabled
            id="combobox-disabled"
            .options=${countries}
            value="Azerbaijan"
        ></sp-combobox>
    `;
};
const invalid = () => {
  return x`
        <sp-field-label for="combobox-invalid">
            What would you like to eat for dessert?
        </sp-field-label>
        <sp-combobox id="combobox-invalid" .options=${fruits} invalid>
            <sp-help-text slot="negative-help-text">
                Choose or add at least one fruit.
            </sp-help-text>
        </sp-combobox>
    `;
};
const readonly = () => {
  return x`
        <sp-field-label for="combobox-readonly">
            Where do you live?
        </sp-field-label>
        <sp-combobox
            readonly
            id="combobox-readonly"
            .options=${countries}
            value="Solomon Islands"
        ></sp-combobox>
    `;
};
const listAutocomplete = () => {
  return x`
        <sp-field-label for="combobox-2">Where do you live?</sp-field-label>
        <sp-combobox
            id="combobox-2"
            .options=${countries}
            autocomplete="list"
        ></sp-combobox>
    `;
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
const __namedExportsOrder = ['Default', 'disabled', 'invalid', 'readonly', 'listAutocomplete', 'noAutocomplete', 'lightDOM', 'withTooltip', 'withFieldLabel', 'withLabelAttribute', 'withHelpText', 'controlled'];

export { Default, __namedExportsOrder, controlled, combobox_stories as default, disabled, invalid, lightDOM, listAutocomplete, noAutocomplete, readonly, withFieldLabel, withHelpText, withLabelAttribute, withTooltip };
