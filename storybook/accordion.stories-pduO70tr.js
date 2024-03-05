import { A as AccordionMarkup } from './index-lArv9XZc.js';
import './sp-accordion-item-iaA6o3mD.js';
import './sp-link-oGikh5XZ.js';
import './lit-html-GmIhAbMP.js';
import './FocusGroup-TIL3fP6n.js';
import './lit-element-xBOPiTek.js';
import './sizedMixin-IBQibr2z.js';
import './define-element-z6bXN_P5.js';
import './base-STdhtiz1.js';
import './query-assigned-nodes-qh-rhz36.js';
import './focusable-M0S89eyW.js';
import './focus-visible-68QWcOy-.js';
import './sp-icon-chevron100-uB3eMtQr.js';
import './Chevron100-ok1mOHjI.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-1lzddWrP.js';
import './spectrum-icon-chevron.css-i0thkS8X.js';
import './when-kvvOyHr2.js';
import './like-anchor-iRdC2T2x.js';
import './if-defined-pV6JZKXB.js';
import './query-JMOstM_r.js';

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
