import './sp-menu-DLS2qTtM.js';
import './sp-menu-divider-Lgd4v3Zk.js';
import './sp-menu-item-lWzihiU5.js';
import './sp-popover-r5xb8poc.js';
import { x } from './lit-html-COgVUehj.js';
import { s } from './lit-element-BulMEkr1.js';
import './RovingTabindex-Bozun0RY.js';
import './FocusGroup-VP8jhztA.js';
import './sizedMixin-DUWGHsWj.js';
import './define-element-C4UuMSqY.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
import './divider.css-B4Y_licH.js';
import './spectrum-icon-checkmark.css-CUMq8Erd.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-XNwB0O-B.js';
import './state-Cl59WR3S.js';
import './like-anchor-BMTFbWfx.js';
import './if-defined-DDJGFaN4.js';
import './focusable-0UaXYqOQ.js';
import './focus-visible-D29Av9Xb.js';
import './sp-icon-chevron100-BOrsj08X.js';
import './Chevron100-OyV1wQMZ.js';
import './spectrum-icon-chevron.css-CeYia-Jd.js';
import './DependencyManger-Dpkh1Bse.js';
import './mutation-controller-D2lT1xZk.js';
import './slottable-request-event-DXuuyGoq.js';
import './observe-slot-text-Bj4_fBJm.js';
import './query-assigned-nodes-DAYI4epk.js';
import './observe-slot-presence-Ceiwt-jV.js';
import './random-id-BST1Puzz.js';
import './Popover-wo0uA6Tm.js';

const MenuMarkup = ({
  size = "m"
} = {}) => {
  return x`
        <sp-menu size=${size}>
            <sp-menu-item>Deselect</sp-menu-item>
            <sp-menu-item>Select Inverse</sp-menu-item>
            <sp-menu-item>Feather...</sp-menu-item>
            <sp-menu-item>Select and Mask...</sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item>Save Selection</sp-menu-item>
            <sp-menu-item disabled>Make Work Path</sp-menu-item>
        </sp-menu>

        <sp-popover open>
            <sp-menu size=${size}>
                <sp-menu-item>Deselect</sp-menu-item>
                <sp-menu-item>Select Inverse</sp-menu-item>
                <sp-menu-item>Feather...</sp-menu-item>
                <sp-menu-item>Select and Mask...</sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item>Save Selection</sp-menu-item>
                <sp-menu-item disabled>Make Work Path</sp-menu-item>
            </sp-menu>
        </sp-popover>
    `;
};
class ComplexSlottedGroup extends s {
  get menu() {
    return this.renderRoot.querySelector("sp-menu");
  }
  render() {
    return x`
            <sp-menu id="sp-menu">
                <sp-menu-group id="sp-menu-group-1">
                    <sp-menu-item id="i-1">Before First</sp-menu-item>
                    <slot name="before"></slot>
                </sp-menu-group>
                <sp-menu-group id="sp-menu-group-2">
                    <sp-menu-item id="i-4">Sibling 1</sp-menu-item>
                    <slot></slot>
                    <sp-menu-item id="i-10">Sibling 2</sp-menu-item>
                </sp-menu-group>
                <sp-menu-group id="sp-menu-group-3">
                    <sp-menu-item id="i-11">After 1</sp-menu-item>
                    <sp-menu-item id="i-12">After 2</sp-menu-item>
                </sp-menu-group>
            </sp-menu>
        `;
  }
}
ComplexSlottedGroup.shadowRootOptions = {
  ...s.shadowRootOptions,
  delegatesFocus: true
};
customElements.define("complex-slotted-group", ComplexSlottedGroup);
class ComplexSlottedMenu extends s {
  get menu() {
    return this.renderRoot.querySelector(
      "complex-slotted-group"
    ).menu;
  }
  render() {
    return x`
            <complex-slotted-group id="complex-slotted-group">
                <sp-menu-item id="i-5">Middle 1</sp-menu-item>
                <sp-menu-item id="i-6">Middle 2</sp-menu-item>
                <sp-menu-item id="i-7">Middle 3</sp-menu-item>
                <slot></slot>
                <slot name="before" slot="before"></slot>
                <sp-menu-item slot="before" id="i-3">Before Last</sp-menu-item>
            </complex-slotted-group>
        `;
  }
}
ComplexSlottedMenu.shadowRootOptions = {
  ...s.shadowRootOptions,
  delegatesFocus: true
};
customElements.define("complex-slotted-menu", ComplexSlottedMenu);

var menuSizes_stories = {
  component: "sp-menu",
  title: "Menu/Sizes"
};
const S = () => MenuMarkup({ size: "s" });
const M = () => MenuMarkup({ size: "m" });
const L = () => MenuMarkup({ size: "l" });
const XL = () => MenuMarkup({ size: "xl" });
const __namedExportsOrder = ['S', 'M', 'L', 'XL'];

export { L, M, S, XL, __namedExportsOrder, menuSizes_stories as default };
