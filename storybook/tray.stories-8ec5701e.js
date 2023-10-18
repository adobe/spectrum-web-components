import './sp-dialog-bd7cdf06.js';
import './sp-menu-6cab5582.js';
import './sp-menu-item-78994077.js';
import './sp-menu-divider-e02a5ff2.js';
import './sp-tray-f1c91a93.js';
import { x } from './lit-html-126adc72.js';
import './sp-divider-02e53dcd.js';
import './divider.css-d14b5633.js';
import './lit-element-9354aa77.js';
import './sizedMixin-43fe982f.js';
import './define-element-e64f5ea4.js';
import './base-511c8c11.js';
import './sp-close-button-77218317.js';
import './spectrum-icon-cross.css-5810d93c.js';
import './ButtonBase-997f7a09.js';
import './like-anchor-72ed571c.js';
import './if-defined-ae83b405.js';
import './focusable-6cc2c3b2.js';
import './focus-visible-03398d98.js';
import './observe-slot-text-16ab7d67.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-b8bfe193.js';
import './query-d0113d5a.js';
import './custom-tag-c228386e.js';
import './IconBase-d00b1a4e.js';
import './sp-button-group-28fd6c42.js';
import './sp-icon-alert-248f0d52.js';
import './custom-tag-b5526d41.js';
import './AlertDialog-1684188b.js';
import './sp-button-6534d7a7.js';
import './condition-attribute-with-id-62869347.js';
import './resize-controller-55608b66.js';
import './observe-slot-presence-ae37a9bc.js';
import './class-map-14530ec2.js';
import './directive-2bb7789e.js';
import './spectrum-icon-checkmark.css-359949f2.js';
import './sp-icon-chevron100-232e7a83.js';
import './Chevron100-6f55b923.js';
import './spectrum-icon-chevron.css-6d5a7762.js';
import './sp-underlay-e0018f00.js';
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
