"use strict";
import { html } from "@spectrum-web-components/base";
import "@spectrum-web-components/field-group/sp-field-group.js";
import "@spectrum-web-components/checkbox/sp-checkbox.js";
import "@spectrum-web-components/radio/sp-radio.js";
import "@spectrum-web-components/help-text/sp-help-text.js";
export default {
  title: "Field Group",
  component: "sp-field-group"
};
export const horizontal = () => {
  return html`
    <sp-field-group horizontal>
      <sp-checkbox>Checkbox 1</sp-checkbox>
      <sp-checkbox>Checkbox 2</sp-checkbox>
      <sp-checkbox>Checkbox 3</sp-checkbox>
      <sp-checkbox>Checkbox 4</sp-checkbox>
      <sp-checkbox>Checkbox 5</sp-checkbox>
    </sp-field-group>
  `;
};
export const vertical = () => {
  return html`
    <sp-field-group vertical>
      <sp-checkbox>Checkbox 1</sp-checkbox>
      <sp-checkbox>Checkbox 2</sp-checkbox>
      <sp-checkbox>Checkbox 3</sp-checkbox>
      <sp-checkbox>Checkbox 4</sp-checkbox>
      <sp-checkbox>Checkbox 5</sp-checkbox>
    </sp-field-group>
  `;
};
export const invalid = () => {
  return html`
    <sp-field-group vertical label="Required selections" invalid>
      <sp-checkbox invalid>Option A</sp-checkbox>
      <sp-checkbox invalid>Option B</sp-checkbox>
      <sp-checkbox invalid>Option C</sp-checkbox>
      <sp-help-text slot="negative-help-text" icon>
        Select at least one option to continue.
      </sp-help-text>
    </sp-field-group>
  `;
};
//# sourceMappingURL=field-group.stories.js.map
