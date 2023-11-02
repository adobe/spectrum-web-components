import './sp-dialog-012d7280.js';
import './sp-menu-9cba47df.js';
import './sp-menu-item-8cb92ce2.js';
import './sp-menu-divider-4f0cd981.js';
import './sp-tray-33d835a9.js';
import { x } from './lit-html-126adc72.js';
import './sp-divider-32772ac4.js';
import './divider.css-d14b5633.js';
import './lit-element-9354aa77.js';
import './sizedMixin-281e4c72.js';
import './define-element-43d4edd5.js';
import './base-511c8c11.js';
import './sp-close-button-35d5c555.js';
import './spectrum-icon-cross.css-a270fccc.js';
import './ButtonBase-a71d6ce3.js';
import './like-anchor-0c856f1c.js';
import './if-defined-ae83b405.js';
import './focusable-d03021f6.js';
import './focus-visible-03398d98.js';
import './observe-slot-text-dbd83f39.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-c8aaaadd.js';
import './query-d0113d5a.js';
import './custom-tag-c228386e.js';
import './IconBase-fb970ebf.js';
import './sp-button-group-16723e6a.js';
import './sp-icon-alert-d34893d7.js';
import './custom-tag-b5526d41.js';
import './AlertDialog-567c08af.js';
import './sp-button-d4cd36d2.js';
import './condition-attribute-with-id-62869347.js';
import './resize-controller-55608b66.js';
import './observe-slot-presence-ae37a9bc.js';
import './class-map-14530ec2.js';
import './directive-2bb7789e.js';
import './spectrum-icon-checkmark.css-c19acd0f.js';
import './sp-icon-chevron100-cbc6bc68.js';
import './Chevron100-6f55b923.js';
import './spectrum-icon-chevron.css-d3283c08.js';
import './sp-underlay-b7553659.js';
import './first-focusable-in-184a26e2.js';
import './focusable-selectors-252ae36e.js';
import './MatchMedia-0123f918.js';
import './modal.css-ad9e835e.js';

var tray_stories = {
  title: "Tray",
  component: "sp-tray",
  args: {
    open: true
  },
  argTypes: {
    open: {
      name: "open",
      type: { name: "boolean", required: false },
      description: "Whether the tray is open.",
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
const Default = (args) => {
  return x`
        <sp-tray ?open=${args.open}>
            <sp-dialog size="s">
                <h2 slot="heading">New Messages</h2>
                You have 5 new messages.
            </sp-dialog>
        </sp-tray>
    `;
};
const menu = (args) => {
  return x`
        <sp-tray ?open=${args.open}>
            <sp-menu style="width: 100%">
                <sp-menu-item>Deselect</sp-menu-item>
                <sp-menu-item selected>Select Inverse</sp-menu-item>
                <sp-menu-item>Feather...</sp-menu-item>
                <sp-menu-item>Select and Mask...</sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item>Save Selection</sp-menu-item>
                <sp-menu-item disabled>Make Work Path</sp-menu-item>
            </sp-menu>
        </sp-tray>
    `;
};
const __namedExportsOrder = ['Default', 'menu'];

export { Default, __namedExportsOrder, tray_stories as default, menu };
