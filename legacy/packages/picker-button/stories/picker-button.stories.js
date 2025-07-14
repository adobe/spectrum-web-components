"use strict";
import { argTypes, Template } from "./index.js";
import "@spectrum-web-components/picker-button/sp-picker-button.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-add.js";
export default {
  title: "Picker Button",
  component: "sp-picker-button",
  ...argTypes
};
export const active = (args) => Template(args);
active.args = { active: true };
export const customIcon = (args) => Template(args);
customIcon.args = {
  icon: `<sp-icon-add slot="icon" class="spectrum-PickerButton-icon spectrum-Icon"></sp-icon-add>`
};
export const invalid = (args) => Template(args);
invalid.args = { invalid: true };
export const quiet = (args) => Template(args);
quiet.args = { label: true, quiet: true };
export const label = (args) => Template(args);
label.args = { label: true };
export const labelCustom = (args) => Template(args);
labelCustom.args = { label: "Some" };
export const open = (args) => Template(args);
open.args = { open: true };
export const positionLeft = (args) => Template(args);
positionLeft.args = { position: "left" };
export const positionRight = (args) => Template(args);
positionRight.args = { position: "right" };
export const rounded = (args) => Template(args);
rounded.args = { rounded: true };
export const roundedLabel = (args) => Template(args);
roundedLabel.args = {
  label: true,
  rounded: true
};
//# sourceMappingURL=picker-button.stories.js.map
