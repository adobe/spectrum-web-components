import { A as AccordionMarkup } from './index-UB2lLG-h.js';
import './sp-accordion-item-Bwr7TrQL.js';
import './sp-link-Cf8G-p_v.js';
import './lit-html-COgVUehj.js';
import './FocusGroup-DQHKf855.js';
import './lit-element-BL-po2DW.js';
import './sizedMixin-BKu_31Nm.js';
import './define-element-CXRu6sWi.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './focusable-BHn_FpaM.js';
import './focus-visible-D29Av9Xb.js';
import './sp-icon-chevron100-Bg4mTD65.js';
import './Chevron100-2ZEB0c-t.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-LhykbR0q.js';
import './spectrum-icon-chevron.css-C5c2rYXA.js';
import './when-DEJm_QN9.js';
import './like-anchor-BAH-foY5.js';
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
