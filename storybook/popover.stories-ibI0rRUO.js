import './sp-popover-B102U_Ct.js';
import './overlay-trigger-C5VD46th.js';
import './sp-dialog-BL8303L7.js';
import './sp-button-7UsB7th2.js';
import { i as isOverlayOpen } from './index-lhoNpeV0.js';
import { x } from './lit-html-COgVUehj.js';
import { o } from './if-defined-DDJGFaN4.js';
import './Popover-C-ExIAey.js';
import './lit-element-BulMEkr1.js';
import './define-element-Bun2ZgR-.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
import './sp-overlay-CZ8spV_x.js';
import './Overlay-JLImRQEv.js';
import './ElementResolution-B9KteuX8.js';
import './random-id-BST1Puzz.js';
import './VirtualTrigger-OIs6mMoi.js';
import './first-focusable-in-BK_DAWOm.js';
import './focusable-selectors-CUZEb4r9.js';
import './platform-r3Lf9REX.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './slottable-request-event-DXuuyGoq.js';
import './query-assigned-elements-C9WOp2R6.js';
import './state-a9qXQZw8.js';
import './style-map-DtKTc8KS.js';
import './directive-Bn5c4u4M.js';
import './sp-button-group-CE41M4aF.js';
import './sizedMixin-BPhwmt-S.js';
import './sp-close-button-lSGl90iz.js';
import './spectrum-icon-cross.css-BnEt-gNk.js';
import './ButtonBase-CsEYgJMd.js';
import './like-anchor-BaNwPfYf.js';
import './focusable-y67P8eQI.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-B-N3zGRD.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-luFyVpTn.js';
import './sp-icon-cross500-YCeW9dRQ.js';
import './Cross500-Cv8kebkP.js';
import './sp-divider-3kMtD0vw.js';
import './divider.css-CtZfV7_5.js';
import './sp-icon-alert-C9LsQVsg.js';
import './custom-tag-Diwq7nXX.js';
import './AlertDialog-HG6NuEhI.js';
import './resize-controller-BJKfu6ft.js';
import './observe-slot-presence-Ceiwt-jV.js';
import './class-map-DdRvesrq.js';
import './PendingState-E3cyhDnE.js';
import './get-label-from-slot-Cg6mfN40.js';

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
        <div style="color: var(--spectrum-gray-800)">
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
            style="color: var(--spectrum-gray-800); position: relative; display: contents"
        >
            <sp-popover
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
                        open=${o(
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
                            <sp-dialog style="--mod-dialog-min-inline-size: 0;">
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
