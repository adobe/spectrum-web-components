import './sp-menu-rNqdCkwX.js';
import './sp-menu-divider-2673MXbM.js';
import './sp-menu-item-ll9spFiY.js';
import './sp-popover-ScQBhaVn.js';
import { x } from './lit-html-GmIhAbMP.js';
import { s } from './lit-element-xBOPiTek.js';
import './sizedMixin-mnNfh2gr.js';
import './define-element-2O4ZhTAw.js';
import './base-STdhtiz1.js';
import './query-JMOstM_r.js';
import './divider.css-w129hLpK.js';
import './spectrum-icon-checkmark.css-3xBPG61g.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-TDmbHQaH.js';
import './like-anchor-J4T73PxR.js';
import './if-defined-pV6JZKXB.js';
import './focusable-WZR9a5Bc.js';
import './focus-visible-68QWcOy-.js';
import './sp-icon-chevron100-vrIsKneV.js';
import './Chevron100-WZwzwvjg.js';
import './spectrum-icon-chevron.css-8l4pupPT.js';
import './mutation-controller-KeE5MDSl.js';
import './observe-slot-text-ybW1xuBS.js';
import './query-assigned-nodes-aJM_vOZ4.js';
import './observe-slot-presence-tyJ_SCNf.js';

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
            <sp-menu>
                <sp-menu-group>
                    <sp-menu-item id="i-1">Before First</sp-menu-item>
                    <slot name="before"></slot>
                </sp-menu-group>
                <sp-menu-group>
                    <sp-menu-item id="i-4">Sibling 1</sp-menu-item>
                    <slot></slot>
                    <sp-menu-item id="i-10">Sibling 2</sp-menu-item>
                </sp-menu-group>
                <sp-menu-group>
                    <sp-menu-item id="i-11">After 1</sp-menu-item>
                    <sp-menu-item id="i-12">After 2</sp-menu-item>
                </sp-menu-group>
            </sp-menu>
        `;
  }
}
customElements.define("complex-slotted-group", ComplexSlottedGroup);
class ComplexSlottedMenu extends s {
  get menu() {
    return this.renderRoot.querySelector(
      "complex-slotted-group"
    ).menu;
  }
  render() {
    return x`
            <complex-slotted-group id="group">
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
