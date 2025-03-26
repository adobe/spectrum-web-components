import { A as AccordionMarkup } from './index-BHt0TStk.js';
import './sp-accordion-item-C5GVaGdm.js';
import './sp-link-aJX7fz8y.js';
import './lit-html-COgVUehj.js';
import './FocusGroup-CQTGJWkN.js';
import './lit-element-BulMEkr1.js';
import './sizedMixin-BPhwmt-S.js';
import './define-element-Bun2ZgR-.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './focusable-y67P8eQI.js';
import './focus-visible-D29Av9Xb.js';
import './sp-icon-chevron100-6ixyTd8T.js';
import './custom-tag-B5IH9PTE.js';
import './Chevron100-OyV1wQMZ.js';
import './IconBase-luFyVpTn.js';
import './state-a9qXQZw8.js';
import './spectrum-icon-chevron.css-CeYia-Jd.js';
import './when-DEJm_QN9.js';
import './like-anchor-BaNwPfYf.js';
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
