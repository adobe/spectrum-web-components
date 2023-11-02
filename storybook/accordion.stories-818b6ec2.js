import { A as AccordionMarkup } from './index-c6838b03.js';
import './sp-accordion-item-3292cfc2.js';
import './sp-link-312b9e34.js';
import './lit-html-126adc72.js';
import './FocusGroup-0f0b800e.js';
import './lit-element-9354aa77.js';
import './sizedMixin-281e4c72.js';
import './define-element-43d4edd5.js';
import './base-511c8c11.js';
import './query-assigned-nodes-c8aaaadd.js';
import './focusable-d03021f6.js';
import './focus-visible-03398d98.js';
import './sp-icon-chevron100-cbc6bc68.js';
import './Chevron100-6f55b923.js';
import './custom-tag-c228386e.js';
import './IconBase-fb970ebf.js';
import './spectrum-icon-chevron.css-d3283c08.js';
import './when-67eca38c.js';
import './like-anchor-0c856f1c.js';
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
