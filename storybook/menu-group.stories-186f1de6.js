import './sp-menu-a6b50bf6.js';
import './sp-menu-divider-96e8aafa.js';
import './sp-popover-adc6def6.js';
import './sp-menu-item-d1901258.js';
import './sp-menu-group-0604b0e3.js';
import { x } from './lit-html-126adc72.js';
import './lit-element-9354aa77.js';
import './sizedMixin-95b38e3e.js';
import './define-element-467f3dc4.js';
import './base-511c8c11.js';
import './query-d0113d5a.js';
import './divider.css-d14b5633.js';
import './spectrum-icon-checkmark.css-2fc91f81.js';
import './custom-tag-c228386e.js';
import './IconBase-fdbfb1c1.js';
import './like-anchor-79c92c76.js';
import './if-defined-ae83b405.js';
import './focusable-df7b829e.js';
import './focus-visible-03398d98.js';
import './sp-icon-chevron100-d31cf739.js';
import './Chevron100-6f55b923.js';
import './spectrum-icon-chevron.css-d3283c08.js';
import './mutation-controller-81a30f7f.js';
import './observe-slot-text-2a3e6366.js';
import './query-assigned-nodes-6218f033.js';
import './observe-slot-presence-ae37a9bc.js';
import './state-879d3fe4.js';

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
