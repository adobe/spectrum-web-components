import './PendingState-Dn01Sbyv.js';
import './sp-button-DPZvBYiQ.js';
import { x } from './lit-html-COgVUehj.js';
import './lit-element-BulMEkr1.js';
import './get-label-from-slot-Cg6mfN40.js';
import './sizedMixin-DUWGHsWj.js';
import './define-element-C4UuMSqY.js';
import './if-defined-DDJGFaN4.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
import './ButtonBase-vQ52yrzS.js';
import './like-anchor-BMTFbWfx.js';
import './focusable-0UaXYqOQ.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-Bj4_fBJm.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';

var progressCircle_stories = {
  title: "Progress Circle",
  component: "sp-progress-circle",
  argTypes: {
    indeterminate: {
      name: "indeterminate",
      type: { name: "boolean", required: false },
      description: "Whether the progress is indeterminate.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false }
      },
      control: {
        type: "boolean"
      }
    }
  }
};
const Default = ({ indeterminate } = {}) => {
  return x`
        <div
            style="width: 250px; height: 150px; display: flex; align-items: center; justify-content: space-around;"
        >
            <sp-progress-circle
                progress="27"
                size="s"
                ?indeterminate=${indeterminate}
                label="Loading progress demo"
            ></sp-progress-circle>
            <sp-progress-circle
                progress="27"
                ?indeterminate=${indeterminate}
                label="Loading progress demo"
            ></sp-progress-circle>
            <sp-progress-circle
                progress="27"
                size="l"
                ?indeterminate=${indeterminate}
                label="Loading progress demo"
            ></sp-progress-circle>
        </div>
    `;
};
Default.args = {
  indeterminate: false
};
const staticWhite = ({
  indeterminate
} = {}) => {
  return x`
        <div
            style="width: 250px; height: 150px; background-color: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: space-around;"
        >
            <sp-progress-circle
                progress="53"
                static-color="white"
                size="s"
                ?indeterminate=${indeterminate}
                label="Loading progress demo"
            ></sp-progress-circle>
            <sp-progress-circle
                progress="53"
                static-color="white"
                ?indeterminate=${indeterminate}
                label="Loading progress demo"
            ></sp-progress-circle>
            <sp-progress-circle
                progress="53"
                static-color="white"
                size="l"
                ?indeterminate=${indeterminate}
                label="Loading progress demo"
            ></sp-progress-circle>
        </div>
    `;
};
staticWhite.args = {
  indeterminate: false
};
const inButton = ({
  indeterminate
} = {}) => x`
    <style>
        sp-progress-circle[slot='icon'] {
            align-self: center;
            margin-block: 0;
        }
    </style>
    <sp-button variant="black" style="color: white">
        <sp-progress-circle
            progress="53"
            static-color="white"
            size="s"
            ?indeterminate=${indeterminate}
            slot="icon"
            label="Processing"
        ></sp-progress-circle>
        Processing...
    </sp-button>
`;
const __namedExportsOrder = ['Default', 'staticWhite', 'inButton'];

export { Default, __namedExportsOrder, progressCircle_stories as default, inButton, staticWhite };
