import { A as AccordionMarkup } from './index-Di_eTCL8.js';
import './sp-accordion-item-DayMgf2t.js';
import './sp-link-bwfpJjr8.js';
import './lit-html-COgVUehj.js';
import './FocusGroup-B9OwLCq7.js';
import './lit-element-BL-po2DW.js';
import './sizedMixin-C1lD98vT.js';
import './define-element-ByMWMcVd.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './focusable-CUJIQEAB.js';
import './focus-visible-D29Av9Xb.js';
import './sp-icon-chevron100-CvWYkNtC.js';
import './Chevron100-2ZEB0c-t.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-C1z7UsT5.js';
import './spectrum-icon-chevron.css-C5c2rYXA.js';
import './when-DEJm_QN9.js';
import './like-anchor-3x3vwb8N.js';
import './if-defined-DDJGFaN4.js';
import './query-DQF6X5qW.js';

const argTypes = {
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
  allowMultiple: {
    name: "allowMultiple",
    type: { name: "boolean", required: false },
    description: "Whether multipel Accordion Items can be open at the same time.",
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
      defaultValue: { summary: "default" }
    },
    control: {
      labels: {
        compact: "Compact",
        spacious: "Spacious",
        default: "Default"
      },
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
      labels: {
        s: "Small",
        m: "Medium",
        l: "Large",
        xl: "Extra large"
      },
      type: "select"
    }
  }
};

var accordion_stories = {
  title: "Accordion",
  component: "sp-accordion",
  args: {
    open: false,
    size: "m",
    density: void 0
  },
  argTypes
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
