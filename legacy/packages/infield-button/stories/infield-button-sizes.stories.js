"use strict";
import { html } from "@spectrum-web-components/base";
import {
  args,
  argTypes,
  chevronDown,
  chevronUp,
  Template
} from "./index.js";
export default {
  title: "Infield Button/Sizes",
  component: "sp-infield-button",
  argTypes,
  args
};
export const s = (args2) => Template(args2);
s.args = {
  size: "s"
};
export const m = (args2) => Template(args2);
m.args = {
  size: "m"
};
export const l = (args2) => Template(args2);
l.args = {
  size: "l"
};
export const XL = (args2) => Template(args2);
XL.args = {
  size: "xl"
};
export const stackedS = () => html`
    ${Template({
  block: "start",
  content: chevronUp,
  size: "s",
  label: "Increase"
})}
    ${Template({
  block: "end",
  content: chevronDown,
  size: "s",
  label: "Decrease"
})}
`;
export const stackedM = () => html`
    ${Template({
  block: "start",
  content: chevronUp,
  size: "m",
  label: "Increase"
})}
    ${Template({
  block: "end",
  content: chevronDown,
  size: "m",
  label: "Decrease"
})}
`;
export const stackedL = () => html`
    ${Template({
  block: "start",
  content: chevronUp,
  size: "l",
  label: "Increase"
})}
    ${Template({
  block: "end",
  content: chevronDown,
  size: "l",
  label: "Decrease"
})}
`;
export const stackedXL = () => html`
    ${Template({
  block: "start",
  content: chevronUp,
  size: "xl",
  label: "Increase"
})}
    ${Template({
  block: "end",
  content: chevronDown,
  size: "xl",
  label: "Decrease"
})}
`;
//# sourceMappingURL=infield-button-sizes.stories.js.map
