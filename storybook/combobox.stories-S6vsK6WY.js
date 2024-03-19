import { c as countries, f as fruits } from './index-TVP8cYcP.js';
import './sp-field-label-BRa7XgBa.js';
import './sp-help-text-NqtXXKzR.js';
import './sp-tooltip-uCLyzpRN.js';
import './sp-menu-item-dzr3-vzb.js';
import { d as defineElement } from './define-element-lju0qz2P.js';
import { x } from './lit-html-GmIhAbMP.js';
import { t } from './state-UPADzOvr.js';
import { i } from './query-JMOstM_r.js';
import { s } from './lit-element-xBOPiTek.js';
import { l } from './Textfield-qGiUbHPm.js';
import './sp-overlay-B7_vJw1R.js';
import './ElementResolution-TTOqkMM7.js';
import './random-id-M2k-wjyE.js';
import './first-focusable-in-LZ7hcu4z.js';
import './focusable-selectors-VCrFWGqo.js';
import './condition-attribute-with-id-nb2zon-s.js';
import './platform-c1C9ET3y.js';
import './slottable-request-event-SQgFLN7g.js';
import './query-assigned-elements-1m6Cs7Ix.js';
import './base-STdhtiz1.js';
import './if-defined-pV6JZKXB.js';
import './style-map-ak5mT6xX.js';
import './directive-C1gRZbRe.js';
import './sp-icon-chevron100-hP_myJxP.js';
import './Chevron100-ok1mOHjI.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-YN3-eQCN.js';
import './sp-popover-JsdyhxsS.js';
import './Popover-vSC8_z_g.js';
import './sp-menu-yyR1trsN.js';
import './sizedMixin-VwrJiqSW.js';
import './sp-picker-button-729eEBLv.js';
import './ButtonBase-HA5NNgN2.js';
import './like-anchor-a_wuYSt2.js';
import './focusable-wnRI1QCz.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-HaH5WFZ0.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-jGvx5qKR.js';
import './observe-slot-presence-tyJ_SCNf.js';
import './spectrum-icon-chevron.css-hA8DP86t.js';
import './class-map-Q7DIFm9x.js';
import './repeat-ry-ySa1b.js';
import './directive-helpers-WPlpPO1F.js';
import './sp-icon-alert-FVCBnC1q.js';
import './custom-tag-JXLWq-Sj.js';
import './spectrum-icon-checkmark.css-EqJn5hpL.js';
import './manage-help-text-kfeeNmRL.js';

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
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
  t()
], _ControlledCombo.prototype, "value", 2);
__decorateClass([
  i("#age")
], _ControlledCombo.prototype, "combobox", 2);
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
const __namedExportsOrder = ['Default', 'disabled', 'readonly', 'listAutocomplete', 'noAutocomplete', 'lightDOM', 'withTooltip', 'withFieldLabel', 'withLabelAttribute', 'withHelpText', 'controlled'];

export { Default, __namedExportsOrder, controlled, combobox_stories as default, disabled, lightDOM, listAutocomplete, noAutocomplete, readonly, withFieldLabel, withHelpText, withLabelAttribute, withTooltip };
