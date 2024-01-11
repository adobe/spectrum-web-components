import { A as AccordionMarkup } from './index-PwnZki3P.js';
import './sp-accordion-item-qhKOGner.js';
import './sp-link-jonBNIuU.js';
import './lit-html-GmIhAbMP.js';
import './FocusGroup-TIL3fP6n.js';
import './lit-element-xBOPiTek.js';
import './sizedMixin-qrvMoaCA.js';
import './define-element-IUrhCXKn.js';
import './base-STdhtiz1.js';
import './query-assigned-nodes-mXMsr4SG.js';
import './focusable-zbBPTVfi.js';
import './focus-visible-68QWcOy-.js';
import './sp-icon-chevron100-tD6SrTfS.js';
import './Chevron100-WZwzwvjg.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-_gvXsC2f.js';
import './spectrum-icon-chevron.css-8l4pupPT.js';
import './when-kvvOyHr2.js';
import './like-anchor-PHkAP_YZ.js';
import './if-defined-pV6JZKXB.js';
import './query-JMOstM_r.js';

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
