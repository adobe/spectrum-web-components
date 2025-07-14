"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
import {
  html,
  LitElement
} from "@spectrum-web-components/base";
import "@spectrum-web-components/combobox/sp-combobox.js";
import "@spectrum-web-components/field-label/sp-field-label.js";
import "@spectrum-web-components/help-text/sp-help-text.js";
import "@spectrum-web-components/tooltip/sp-tooltip.js";
import "@spectrum-web-components/menu/sp-menu-item.js";
import { defineElement } from "@spectrum-web-components/base/src/define-element.js";
import { query, state } from "@spectrum-web-components/base/src/decorators.js";
import { live } from "@spectrum-web-components/base/src/directives.js";
import { countries, fruits } from "./index.js";
import { Template } from "./template.js";
import { argTypes } from "./args.js";
export default {
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
export const Default = (args) => Template(args);
export const disabled = (args) => Template(args);
disabled.args = {
  disabled: true,
  value: "Azerbaijan"
};
export const invalid = (args) => Template(args);
invalid.args = {
  invalid: true
};
export const pending = (args) => Template(args);
pending.args = {
  pending: true
};
export const quiet = (args) => Template(args);
quiet.args = {
  quiet: true
};
export const readonly = (args) => Template(args);
readonly.args = {
  readonly: true,
  value: "Solomon Islands"
};
export const hasDisabledItems = (args) => {
  const countriesWithDisabledItems = countries.map((country) => {
    var _a;
    return {
      ...country,
      disabled: (_a = args.disabledItems) == null ? void 0 : _a.includes(country.itemText)
    };
  });
  return html`
        <sp-field-label side-aligned="start" for="combobox-disabled-items">
            Some fruits are disabled (light DOM)
        </sp-field-label>
        <sp-combobox
            id="combobox-disabled-items"
            style="min-width: 80px;--spectrum-textfield-m-min-width:0; width:160px;"
        >
            ${fruits.map(
    (fruit) => {
      var _a;
      return html`
                    <sp-menu-item
                        id=${fruit.value}
                        value=${fruit.value}
                        ?disabled=${(_a = args.disabledItems) == null ? void 0 : _a.includes(fruit.value)}
                    >
                        ${fruit.itemText}
                    </sp-menu-item>
                `;
    }
  )}
        </sp-combobox>
        <sp-field-label side-aligned="start" for="combobox-disabled-countries">
            Some countries are disabled (shadow DOM)
        </sp-field-label>
        <sp-combobox
            id="combobox-disabled-countries"
            .options=${countriesWithDisabledItems}
            .value=${args.value || ""}
        ></sp-combobox>
    `;
};
hasDisabledItems.args = {
  disabledItems: [
    "banana",
    "lemon",
    "pear",
    "Albania",
    "Azerbaijan",
    "Solomon Islands"
  ]
};
hasDisabledItems.swc_vrt = {
  skip: true
};
export const listAutocomplete = (args) => Template(args);
listAutocomplete.args = {
  autocomplete: "list"
};
export const noAutocomplete = () => {
  return html`
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
export const lightDOM = () => {
  return html`
        <sp-field-label side-aligned="start" for="combobox-5">
            Fruit
        </sp-field-label>
        <sp-combobox
            id="combobox-5"
            style="min-width: 80px;--spectrum-textfield-m-min-width:0;width:100px;"
        >
            ${fruits.map(
    (fruit) => html`
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
    (country) => html`
                    <sp-menu-item id=${country.value} value=${country.value}>
                        ${country.itemText}
                    </sp-menu-item>
                `
  )}
        </sp-combobox>
    `;
};
export const withTooltip = () => {
  return html`
        <sp-combobox
            id="combobox-6"
            label="Combobox with tooltip"
            style="min-width: 80px;--spectrum-textfield-m-min-width:0;width:100px;"
        >
            ${countries.map(
    (option) => html`
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
export const withFieldLabel = () => {
  return html`
        <sp-field-label for="combobox-7">Pick something</sp-field-label>
        <sp-combobox id="combobox-7" .options=${fruits}></sp-combobox>
    `;
};
export const withLabelAttribute = () => {
  return html`
        <sp-combobox
            id="combobox-7"
            label="Pick something"
            .options=${fruits}
        ></sp-combobox>
    `;
};
export const withHelpText = () => {
  return html`
        <sp-combobox id="combobox-7" label="Pick something" .options=${fruits}>
            <sp-help-text slot="help-text">
                These are fruits found in the game "Animal Crossing: New Leaf".
            </sp-help-text>
        </sp-combobox>
    `;
};
const _ControlledCombo = class _ControlledCombo extends LitElement {
  constructor() {
    super(...arguments);
    this.value = {
      raw: "",
      validated: `${_ControlledCombo.ages[0].itemText}`
    };
  }
  render() {
    return html`
            <sp-field-label for="age">
                Retirement age (try entering a non-number)
            </sp-field-label>
            <sp-combobox
                id="age"
                .options=${_ControlledCombo.ages}
                .value=${live(this.value.validated)}
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
  state()
], _ControlledCombo.prototype, "value", 2);
__decorateClass([
  query("#age")
], _ControlledCombo.prototype, "combobox", 2);
let ControlledCombo = _ControlledCombo;
defineElement("controlled-combo", ControlledCombo);
export const controlled = () => {
  return html`
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
//# sourceMappingURL=combobox.stories.js.map
