import './sp-menu-vKm9EXYM.js';
import './sp-menu-divider-oQzf6Djb.js';
import './sp-popover-K6nK-Hu0.js';
import './sp-menu-item-N-0TaoiF.js';
import './sp-menu-group-GaW4fLm3.js';
import { x } from './lit-html-GmIhAbMP.js';
import './lit-element-xBOPiTek.js';
import './sizedMixin-IBQibr2z.js';
import './define-element-z6bXN_P5.js';
import './base-STdhtiz1.js';
import './query-JMOstM_r.js';
import './divider.css-J1TsgOfe.js';
import './Popover-ZO_2BJ88.js';
import './spectrum-icon-checkmark.css-F44WP9wj.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-1lzddWrP.js';
import './like-anchor-iRdC2T2x.js';
import './if-defined-pV6JZKXB.js';
import './focusable-M0S89eyW.js';
import './focus-visible-68QWcOy-.js';
import './sp-icon-chevron100-uB3eMtQr.js';
import './Chevron100-ok1mOHjI.js';
import './spectrum-icon-chevron.css-i0thkS8X.js';
import './mutation-controller-KeE5MDSl.js';
import './observe-slot-text-MDYPopbw.js';
import './query-assigned-nodes-qh-rhz36.js';
import './observe-slot-presence-tyJ_SCNf.js';
import './random-id-M2k-wjyE.js';
import './state-qeP24jco.js';

var menuGroup_stories = {
  component: "sp-menu",
  title: "Menu Group"
};
const complexSlotted = () => {
  return x`
        <complex-slotted-menu>
            <sp-menu-item slot="before" id="i-2">External A</sp-menu-item>
            <sp-menu-item id="i-8">External 1</sp-menu-item>
            <sp-menu-item id="i-9">External 2</sp-menu-item>
        </complex-slotted-menu>
    `;
};
const mixed = () => {
  let style = "italic";
  let weight = "700";
  let color = "blue";
  let decoration = "overline";
  const styleRules = ({
    style: style2,
    weight: weight2,
    color: color2,
    decoration: decoration2
  }) => {
    return `
        .style-rule {
            font-weight: ${weight2};
            font-style: ${style2};
            color: ${color2};
            text-decoration: ${decoration2};
        }
        `;
  };
  const update = (event) => {
    const { value, id } = event.target;
    switch (id) {
      case "font":
        const values = value.split(",");
        style = values.indexOf("italic") > -1 ? "italic" : "normal";
        weight = values.indexOf("bold") > -1 ? "700" : "400";
        break;
      case "color":
        color = value;
        break;
      case "decoration":
        decoration = value;
        break;
    }
    document.querySelector("#output").textContent = styleRules({
      style,
      weight,
      color,
      decoration
    });
  };
  return x`
        <style>
            sp-popover {
                position: static;
                float: left;
            }
        </style>
        <sp-popover open>
            <sp-menu label="Style/Color" @change=${update}>
                <sp-menu-group label="Font Style" selects="multiple" id="font">
                    <sp-menu-item value="bold" selected>Bold</sp-menu-item>
                    <sp-menu-item value="italic" selected>Italic</sp-menu-item>
                </sp-menu-group>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-group label="Text Color" selects="single" id="color">
                    <sp-menu-item value="black">Black</sp-menu-item>
                    <sp-menu-item value="blue" selected>Blue</sp-menu-item>
                    <sp-menu-item value="red">Red</sp-menu-item>
                    <sp-menu-item value="green">Green</sp-menu-item>
                </sp-menu-group>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-group
                    label="Text Decoration"
                    selects="single"
                    id="decoration"
                >
                    <sp-menu-item value="none">None</sp-menu-item>
                    <sp-menu-item value="overline" selected>
                        Overline
                    </sp-menu-item>
                    <sp-menu-item value="line-through">
                        Line-through
                    </sp-menu-item>
                    <sp-menu-item value="underline">Underline</sp-menu-item>
                </sp-menu-group>
            </sp-menu>
        </sp-popover>
        <pre
            id="output"
            style="font-family: var(--spectrum-alias-body-text-font-family);"
        >
            ${styleRules({ style, weight, color, decoration })}
        </pre
        >
    `;
};
const inherit = () => {
  return x`
        <style>
            sp-popover {
                position: static;
                float: left;
            }
        </style>
        <sp-popover open>
            <sp-menu label="Groceries" selects="multiple">
                <sp-menu-group label="Juice" selects="inherit">
                    <sp-menu-item selected>Orange</sp-menu-item>
                    <sp-menu-item selected>Apple</sp-menu-item>
                    <sp-menu-item>Grape</sp-menu-item>
                </sp-menu-group>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-group label="Vegetables" selects="inherit">
                    <sp-menu-item>Carrots</sp-menu-item>
                    <sp-menu-item selected>Summer Squash</sp-menu-item>
                    <sp-menu-item>Zuccini</sp-menu-item>
                </sp-menu-group>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-group label="Dry Goods" selects="inherit">
                    <sp-menu-item>Ceral</sp-menu-item>
                    <sp-menu-item selected>Flour</sp-menu-item>
                    <sp-menu-item>Salt</sp-menu-item>
                    <sp-menu-item>Sugar</sp-menu-item>
                </sp-menu-group>
            </sp-menu>
        </sp-popover>
    `;
};
const __namedExportsOrder = ['complexSlotted', 'mixed', 'inherit'];

export { __namedExportsOrder, complexSlotted, menuGroup_stories as default, inherit, mixed };
