import './sp-progress-circle-XmfXeSOn.js';
import './sp-button-n-ZLKQ9l.js';
import { x } from './lit-html-GmIhAbMP.js';
import './get-label-from-slot-oGgDjBHa.js';
import './lit-element-xBOPiTek.js';
import './sizedMixin-SQxNgkJG.js';
import './define-element-b58XwwBM.js';
import './base-STdhtiz1.js';
import './if-defined-pV6JZKXB.js';
import './query-JMOstM_r.js';
import './ButtonBase-8MKa1AnW.js';
import './like-anchor-SzCf8Fo9.js';
import './focusable-XJQHb8mq.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-sowxnoY7.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-NJVGD18T.js';
import './when-kvvOyHr2.js';

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
                static="white"
                size="s"
                ?indeterminate=${indeterminate}
                label="Loading progress demo"
            ></sp-progress-circle>
            <sp-progress-circle
                progress="53"
                static="white"
                ?indeterminate=${indeterminate}
                label="Loading progress demo"
            ></sp-progress-circle>
            <sp-progress-circle
                progress="53"
                static="white"
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
    <sp-button variant="black" style="color: white">
        <sp-progress-circle
            progress="53"
            static="white"
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
