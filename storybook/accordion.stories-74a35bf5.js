import { A as AccordionMarkup } from './index-beb64421.js';
import './sp-accordion-item-adda23e3.js';
import './sp-link-1dd62f51.js';
import './lit-html-126adc72.js';
import './FocusGroup-0f0b800e.js';
import './lit-element-9354aa77.js';
import './sizedMixin-29c62bc2.js';
import './define-element-617dba69.js';
import './base-511c8c11.js';
import './query-assigned-nodes-c8b87639.js';
import './focusable-c7e64029.js';
import './focus-visible-03398d98.js';
import './sp-icon-chevron100-b4103ec6.js';
import './Chevron100-6f55b923.js';
import './custom-tag-c228386e.js';
import './IconBase-d9572ad8.js';
import './spectrum-icon-chevron.css-d3283c08.js';
import './when-67eca38c.js';
import './like-anchor-86192240.js';
import './if-defined-ae83b405.js';
import './query-d0113d5a.js';

var accordion_stories = {
  title: "Accordion",
  component: "sp-accordion",
  args: {
    open: false,
    size: "m",
    density: void 0
  },
  argTypes: {
    open: {
      name: "open",
      type: { name: "boolean", required: false },
      description: "Whether the second accordion item is open.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false }
      },
      control: {
        type: "boolean"
      }
    },
    density: {
      name: "density",
      type: { name: "string", required: false },
      description: "The density at which to display accordion items.",
      table: {
        defaultValue: { summary: void 0 }
      },
      control: {
        options: ["compact", "spacious", void 0],
        type: "select"
      }
    },
    size: {
      name: "size",
      type: { name: "string", required: false },
      description: "The size at which to display accordion items.",
      table: {
        defaultValue: { summary: "m" }
      },
      control: {
        options: ["s", "m", "l", "xl"],
        type: "select"
      }
    }
  }
};
const Default = (args) => AccordionMarkup(args);
const Open = (args) => AccordionMarkup(args);
Open.args = {
  open: true,
  allowMultiple: false,
  disabled: false
};
const AllowMultiple = (args) => AccordionMarkup(args);
AllowMultiple.args = {
  allowMultiple: true
};
const Disabled = (args) => AccordionMarkup(args);
Disabled.args = {
  disabled: true
};
const __namedExportsOrder = ['Default', 'Open', 'AllowMultiple', 'Disabled'];

export { AllowMultiple, Default, Disabled, Open, __namedExportsOrder, accordion_stories as default };
