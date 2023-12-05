import { s as spreadProps } from './lit-helpers-bb820419.js';
import './sp-action-group-05e619d3.js';
import './sp-action-button-b46ec901.js';
import './overlay-trigger-a20950a0.js';
import './sp-tooltip-49fe3509.js';
import './sp-icon-view-all-tags-65c1d597.js';
import './sp-icon-info-23b409db.js';
import { x } from './lit-html-126adc72.js';
import './async-directive-e6357bae.js';
import './directive-helpers-aa9210f2.js';
import './directive-2bb7789e.js';
import './RovingTabindex-ca5f8b64.js';
import './FocusGroup-0f0b800e.js';
import './mutation-controller-81a30f7f.js';
import './lit-element-9354aa77.js';
import './sizedMixin-9a9da45c.js';
import './define-element-617dba69.js';
import './base-511c8c11.js';
import './query-d0113d5a.js';
import './sp-icon-corner-triangle300-d126a472.js';
import './CornerTriangle300-488cc3d0.js';
import './custom-tag-c228386e.js';
import './IconBase-d9572ad8.js';
import './ButtonBase-5cb3a7f7.js';
import './like-anchor-86192240.js';
import './if-defined-ae83b405.js';
import './focusable-f5539e66.js';
import './focus-visible-03398d98.js';
import './observe-slot-text-94a58958.js';
import './query-assigned-nodes-db063b1b.js';
import './state-59f591cf.js';
import './focusable-selectors-252ae36e.js';
import './ViewAllTags-0af463f4.js';
import './custom-tag-b5526d41.js';
import './Info-d70f219e.js';

var actionGroupSizes_stories = {
  title: "Action Group/Sizes",
  component: "sp-action-group",
  args: {
    compact: false,
    emphasized: false,
    justified: false,
    quiet: false,
    vertical: false,
    size: "m"
  },
  argTypes: {
    compact: {
      name: "compact",
      description: "Visually joins the buttons together to clarify their relationship to one another.",
      type: { name: "boolean", required: false },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false }
      },
      control: {
        type: "boolean"
      }
    },
    emphasized: {
      name: "emphasized",
      type: { name: "boolean", required: false },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false }
      },
      control: {
        type: "boolean"
      }
    },
    justified: {
      name: "justified",
      description: "Aligns the action group items to use all the available space on that line.",
      type: { name: "boolean", required: false },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false }
      },
      control: {
        type: "boolean"
      }
    },
    quiet: {
      name: "quiet",
      type: { name: "boolean", required: false },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false }
      },
      control: {
        type: "boolean"
      }
    },
    vertical: {
      name: "vertical",
      description: "Changes the orientation of the action group.",
      type: { name: "boolean", required: false },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false }
      },
      control: {
        type: "boolean"
      }
    },
    size: {
      name: "size",
      description: "The size at which to display the action group.",
      type: { name: "string", required: true },
      table: {
        type: { summary: '"s" | "m" | "l" | "xl"' },
        defaultValue: { summary: "m" }
      },
      control: {
        type: "select",
        options: ["s", "m", "l", "xl"]
      }
    }
  }
};
function renderButtons(args) {
  return x`
        <sp-action-group ${spreadProps(args)}>
            <sp-action-button>Button 1</sp-action-button>
            <sp-action-button>Longer Button 2</sp-action-button>
            <sp-action-button>Short 3</sp-action-button>
        </sp-action-group>
    `;
}
const XS = (args) => renderButtons(args);
XS.args = { size: "xs" };
const s = (args) => renderButtons(args);
s.args = { size: "s" };
const m = (args) => renderButtons(args);
m.args = { size: "m" };
const l = (args) => renderButtons(args);
l.args = { size: "l" };
const XL = (args) => renderButtons(args);
XL.args = { size: "xl" };
const XSVertical = (args) => renderButtons(args);
XSVertical.args = {
  vertical: true,
  size: "xs"
};
const sVertical = (args) => renderButtons(args);
sVertical.args = {
  vertical: true,
  size: "s"
};
const mVertical = (args) => renderButtons(args);
mVertical.args = {
  vertical: true,
  size: "m"
};
const lVertical = (args) => renderButtons(args);
lVertical.args = {
  vertical: true,
  size: "l"
};
const XLVertical = (args) => renderButtons(args);
XLVertical.args = {
  vertical: true,
  size: "xl"
};
const __namedExportsOrder = ['XS', 's', 'm', 'l', 'XL', 'XSVertical', 'sVertical', 'mVertical', 'lVertical', 'XLVertical'];

export { XL, XLVertical, XS, XSVertical, __namedExportsOrder, actionGroupSizes_stories as default, l, lVertical, m, mVertical, s, sVertical };
