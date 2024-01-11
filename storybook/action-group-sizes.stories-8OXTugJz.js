import { s as spreadProps } from './lit-helpers-w3dXohpu.js';
import './sp-action-group-4NXQiBIT.js';
import './sp-action-button-dwMk9iYw.js';
import './overlay-trigger-awHEuL37.js';
import './sp-tooltip-3ehalFz0.js';
import './sp-icon-view-all-tags-RhFwSGAz.js';
import './sp-icon-info-JzZwZpRR.js';
import { x } from './lit-html-GmIhAbMP.js';
import './async-directive-cHMFxS7f.js';
import './directive-helpers-WPlpPO1F.js';
import './directive-C1gRZbRe.js';
import './RovingTabindex-LnbiEVTh.js';
import './FocusGroup-TIL3fP6n.js';
import './mutation-controller-KeE5MDSl.js';
import './lit-element-xBOPiTek.js';
import './sizedMixin-qrvMoaCA.js';
import './define-element-IUrhCXKn.js';
import './base-STdhtiz1.js';
import './query-JMOstM_r.js';
import './sp-icon-corner-triangle300-txuO9par.js';
import './CornerTriangle300-wDtTC9xD.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-_gvXsC2f.js';
import './ButtonBase-nL2qW8Lw.js';
import './like-anchor-PHkAP_YZ.js';
import './if-defined-pV6JZKXB.js';
import './focusable-zbBPTVfi.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-CVZsl2bC.js';
import './query-assigned-nodes-mXMsr4SG.js';
import './state-xjFlQaWq.js';
import './focusable-selectors-VCrFWGqo.js';
import './ViewAllTags-6po-UwZ8.js';
import './custom-tag-JXLWq-Sj.js';
import './Info-J8X0NVRu.js';

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
