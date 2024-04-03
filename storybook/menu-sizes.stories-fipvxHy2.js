import './sp-menu-fUm6H3kk.js';
import './sp-menu-divider-4ENnd-xz.js';
import './sp-menu-item-6ynCq98U.js';
import './sp-popover-VEiJb0fr.js';
import { x } from './lit-html-GmIhAbMP.js';
import { s } from './lit-element-xBOPiTek.js';
import './sizedMixin-i8vReDsT.js';
import './define-element-2SKaLcgv.js';
import './query-assigned-elements-1m6Cs7Ix.js';
import './base-STdhtiz1.js';
import './query-JMOstM_r.js';
import './divider.css-J1TsgOfe.js';
import './spectrum-icon-checkmark.css-1U1WWTA-.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-6HeAKn4X.js';
import './like-anchor-aNXO7yKS.js';
import './if-defined-pV6JZKXB.js';
import './focusable-n0Bfj6en.js';
import './focus-visible-68QWcOy-.js';
import './sp-icon-chevron100-nm_fX2AN.js';
import './Chevron100-ok1mOHjI.js';
import './spectrum-icon-chevron.css-hA8DP86t.js';
import './DependencyManger-0SYmL--C.js';
import './mutation-controller-KeE5MDSl.js';
import './slottable-request-event-SQgFLN7g.js';
import './observe-slot-text-mc0YsU0d.js';
import './query-assigned-nodes-jGvx5qKR.js';
import './observe-slot-presence-tyJ_SCNf.js';
import './random-id-M2k-wjyE.js';
import './Popover-JIiF3pUZ.js';

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
