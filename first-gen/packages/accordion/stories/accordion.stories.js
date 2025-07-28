"use strict";
import { AccordionMarkup } from "./";
import { argTypes } from "./args.js";
import "@spectrum-web-components/accordion/sp-accordion.js";
import "@spectrum-web-components/accordion/sp-accordion-item.js";
import "@spectrum-web-components/link/sp-link.js";
export default {
  title: "Accordion",
  component: "sp-accordion",
  args: {
    open: false,
    size: "m",
    density: void 0
  },
  argTypes
};
export const Default = (args) => AccordionMarkup(args);
export const Open = (args) => AccordionMarkup(args);
Open.args = {
  open: true,
  allowMultiple: false,
  disabled: false
};
export const AllowMultiple = (args) => AccordionMarkup(args);
AllowMultiple.args = {
  allowMultiple: true
};
export const Disabled = (args) => AccordionMarkup(args);
Disabled.args = {
  disabled: true
};
//# sourceMappingURL=accordion.stories.js.map
