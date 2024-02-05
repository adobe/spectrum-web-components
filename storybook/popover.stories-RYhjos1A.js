import './sp-popover-ScQBhaVn.js';
import './overlay-trigger-uRneRDvh.js';
import './sp-dialog-SsXcWaUa.js';
import './sp-button-RmYXnt4x.js';
import { i as isOverlayOpen } from './index-X5nIn6KY.js';
import { x } from './lit-html-GmIhAbMP.js';
import { l } from './if-defined-pV6JZKXB.js';
import './lit-element-xBOPiTek.js';
import './define-element-2O4ZhTAw.js';
import './query-JMOstM_r.js';
import './base-STdhtiz1.js';
import './state-fuvayDA0.js';
import './sp-divider-GAw1eG-h.js';
import './divider.css-w129hLpK.js';
import './sizedMixin-mnNfh2gr.js';
import './sp-close-button-xmnVNxRt.js';
import './spectrum-icon-cross.css-qXBF5GML.js';
import './ButtonBase-H8ie1_xx.js';
import './like-anchor-J4T73PxR.js';
import './focusable-WZR9a5Bc.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-ybW1xuBS.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-aJM_vOZ4.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-TDmbHQaH.js';
import './sp-icon-cross500-b7wJeVSY.js';
import './Cross500-CuS5PwKf.js';
import './sp-button-group-dfijI00y.js';
import './sp-icon-alert-Bolxr-zN.js';
import './custom-tag-JXLWq-Sj.js';
import './AlertDialog-4wUJEG5g.js';
import './condition-attribute-with-id-nb2zon-s.js';
import './resize-controller--ByFn5Jx.js';
import './observe-slot-presence-tyJ_SCNf.js';
import './class-map-Q7DIFm9x.js';
import './directive-C1gRZbRe.js';
import './when-kvvOyHr2.js';

var popover_stories = {
  component: "sp-popover",
  title: "Popover",
  argTypes: {
    open: {
      name: "open",
      type: { name: "boolean", required: false },
      description: "Whether the popover is open or not.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false }
      },
      control: "boolean"
    },
    placement: {
      name: "placement",
      type: { name: "string", required: false },
      description: "The placement of the popover content in relation to the tip",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "none" }
      },
      control: "text"
    },
    tip: {
      name: "tip",
      description: "Whether the popover has a tip.",
      type: { name: "boolean", required: false },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false }
      },
      control: "boolean"
    }
  },
  args: {
    open: true,
    placement: "none",
    tip: false
  }
};
const Default = ({ content }) => {
  return x`
        <div style="color: var(--spectrum-global-color-gray-800)">
            <sp-popover variant="default" open style="max-width: 320px">
                <div style="font-size: 14px; padding: 10px">${content}</div>
            </sp-popover>
        </div>
    `;
};
Default.args = {
  content: "The quick brown fox jumps over the lazy dog"
};
Default.argTypes = {
  content: {
    name: "content",
    type: { name: "string", required: false },
    table: {
      type: { summary: "string" },
      defaultValue: { summary: "" }
    },
    control: "text"
  }
};
const Template = ({ tip, placement, open }) => {
  return x`
        <div
            style="color: var(--spectrum-global-color-gray-800); position: relative; display: contents"
        >
            <sp-popover
                variant="dialog"
                placement=${placement}
                ?open=${open}
                style=" max-width: 320px"
                .tip="${tip}"
            >
                <sp-dialog size="s">
                    <h2 slot="heading">Popover Title</h2>
                    Cupcake ipsum dolor sit amet jelly beans. Chocolate jelly
                    caramels. Icing soufflé chupa chups donut cheesecake.
                    Jelly-o chocolate cake sweet roll cake danish candy biscuit
                    halvah
                </sp-dialog>
            </sp-popover>
        </div>
    `;
};
const dialogTop = (args) => Template(args);
dialogTop.args = {
  tip: true,
  placement: "top"
};
const dialogRight = (args) => Template(args);
dialogRight.args = {
  tip: true,
  placement: "right"
};
const dialogBottom = (args) => Template(args);
dialogBottom.args = {
  tip: true,
  placement: "bottom"
};
const dialogLeft = (args) => Template(args);
dialogLeft.args = {
  tip: true,
  placement: "left"
};
const overlayStyles = x`
    <style>
        html,
        body,
        #root,
        #root-inner,
        sp-story-decorator {
            height: 100%;
            margin: 0;
        }

        sp-story-decorator > div {
            display: contents;
        }

        sp-story-decorator::part(container) {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            align-items: center;
            justify-content: center;
        }

        overlay-trigger {
            flex: none;
            margin: 24px 0;
        }
    </style>
`;
const overlaid = (openPlacement) => {
  return x`
        ${overlayStyles}
        ${["bottom", "left", "right", "top"].map(
    (placement) => {
      return x`
                    <overlay-trigger
                        placement="${placement}-start"
                        open=${l(
        openPlacement === placement ? "click" : void 0
      )}
                    >
                        <sp-button
                            label="${placement}-start test"
                            slot="trigger"
                        >
                            Click for ${placement}-start popover
                        </sp-button>
                        <sp-popover tip slot="click-content">
                            <sp-dialog>
                                <h2 slot="heading">
                                    Popover ${placement}-start
                                </h2>
                                This popover is on the ${placement}-start of its
                                button.
                            </sp-dialog>
                        </sp-popover>
                    </overlay-trigger>
                `;
    }
  )}
    `;
};
const overlaidTop = () => overlaid("top");
overlaidTop.decorators = [isOverlayOpen];
const overlaidRight = () => overlaid("right");
overlaidRight.decorators = [isOverlayOpen];
const overlaidBottom = () => overlaid("bottom");
overlaidBottom.decorators = [isOverlayOpen];
const overlaidLeft = () => overlaid("left");
overlaidLeft.decorators = [isOverlayOpen];
const __namedExportsOrder = ['Default', 'dialogTop', 'dialogRight', 'dialogBottom', 'dialogLeft', 'overlaidTop', 'overlaidRight', 'overlaidBottom', 'overlaidLeft'];

export { Default, __namedExportsOrder, popover_stories as default, dialogBottom, dialogLeft, dialogRight, dialogTop, overlaidBottom, overlaidLeft, overlaidRight, overlaidTop };
