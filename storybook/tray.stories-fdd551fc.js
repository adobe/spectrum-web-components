import './sp-dialog-3e13f94c.js';
import './sp-menu-1872a394.js';
import './sp-menu-item-5c79edad.js';
import './sp-menu-divider-6793d3d7.js';
import './sp-tray-032741f0.js';
import { x } from './lit-html-126adc72.js';
import './sp-divider-6ecc6b7f.js';
import './divider.css-d14b5633.js';
import './lit-element-9354aa77.js';
import './sizedMixin-9a9da45c.js';
import './define-element-617dba69.js';
import './base-511c8c11.js';
import './sp-close-button-eb49d9df.js';
import './spectrum-icon-cross.css-db5add4c.js';
import './ButtonBase-5cb3a7f7.js';
import './like-anchor-86192240.js';
import './if-defined-ae83b405.js';
import './focusable-f5539e66.js';
import './focus-visible-03398d98.js';
import './observe-slot-text-94a58958.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-db063b1b.js';
import './query-d0113d5a.js';
import './custom-tag-c228386e.js';
import './IconBase-d9572ad8.js';
import './sp-button-group-9d9e1d23.js';
import './sp-icon-alert-4033bfea.js';
import './custom-tag-b5526d41.js';
import './AlertDialog-54fb2e0a.js';
import './sp-button-92363486.js';
import './condition-attribute-with-id-62869347.js';
import './resize-controller-55608b66.js';
import './observe-slot-presence-ae37a9bc.js';
import './class-map-14530ec2.js';
import './directive-2bb7789e.js';
import './spectrum-icon-checkmark.css-a8f99d4c.js';
import './sp-icon-chevron100-b4103ec6.js';
import './Chevron100-6f55b923.js';
import './spectrum-icon-chevron.css-d3283c08.js';
import './sp-underlay-fcec773d.js';
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
