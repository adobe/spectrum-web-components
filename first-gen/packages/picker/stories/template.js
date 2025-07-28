"use strict";
import {
  html
} from "@spectrum-web-components/base";
import "@spectrum-web-components/field-label/sp-field-label.js";
import "@spectrum-web-components/picker/sp-picker.js";
import "@spectrum-web-components/menu/sp-menu-item.js";
import { spreadProps } from "../../../test/lit-helpers.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
export const handleChange = ({ onChange }) => (event) => {
  const picker = event.target;
  if (onChange) onChange(picker.value);
};
export const Template = (args) => html`
    <sp-field-label for="picker-1" size=${ifDefined(args.size)}>
        Where do you live?
    </sp-field-label>
    <sp-picker
        id="picker-1"
        @change=${handleChange(args)}
        label="Choose your neighborhood"
        ${spreadProps(args)}
    >
        <sp-menu-item value="option-1">Carol Gardens</sp-menu-item>
        <sp-menu-item value="option-2">Cobble Hill</sp-menu-item>
        <sp-menu-item value="option-3">Ft. Greene</sp-menu-item>
        <sp-menu-item value="option-4">Park Slope</sp-menu-item>
        <sp-menu-item disabled value="option-5">Prospect Park</sp-menu-item>
        <sp-menu-item value="option-6">Red Hook</sp-menu-item>
    </sp-picker>
`;
//# sourceMappingURL=template.js.map
