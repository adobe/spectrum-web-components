import { s as spreadProps } from './lit-helpers-DFCD1oU3.js';
import './sp-action-group-BLZSvjNX.js';
import './sp-action-button-DtK_29oM.js';
import './overlay-trigger-APpiGOSV.js';
import './sp-tooltip-MS59NcA-.js';
import './sp-icon-view-all-tags-Bsh65sk7.js';
import './sp-icon-info-D3rbXXQw.js';
import { x } from './lit-html-COgVUehj.js';
import './async-directive-DF6rMZJ5.js';
import './directive-helpers-icdnqxxc.js';
import './directive-Bn5c4u4M.js';
import './RovingTabindex-Bi74mHtS.js';
import './FocusGroup-DQHKf855.js';
import './mutation-controller-D2lT1xZk.js';
import './lit-element-BulMEkr1.js';
import './sizedMixin-D27dvb1g.js';
import './define-element-BacrH-dd.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
import './sp-icon-corner-triangle300-tK2gzJwJ.js';
import './custom-tag-B5IH9PTE.js';
import './CornerTriangle300-B0AKm-jy.js';
import './IconBase-lDJoNs5V.js';
import './state-DWB0FQGh.js';
import './ButtonBase-DjpCcxMx.js';
import './like-anchor-BTdhD6VU.js';
import './if-defined-DDJGFaN4.js';
import './focusable-Qk_nX99k.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-CG33WdGp.js';
import './query-assigned-nodes-DAYI4epk.js';
import './focusable-selectors-CUZEb4r9.js';
import './DependencyManger-Dpkh1Bse.js';
import './custom-tag-Diwq7nXX.js';
import './ViewAllTags-C4mr4XS8.js';
import './DefaultIcon-BpPg5UB-.js';
import './Info-Bopt2bd0.js';
import './InfoCircle-DLqulD5C.js';

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
