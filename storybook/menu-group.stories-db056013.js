import './sp-menu-b9e57a20.js';
import './sp-menu-divider-ebf1aa70.js';
import './sp-popover-f437c616.js';
import './sp-menu-item-a8496cf1.js';
import './sp-menu-group-c3d02ae9.js';
import { x } from './lit-html-126adc72.js';
import './lit-element-9354aa77.js';
import './sizedMixin-3d08a58f.js';
import './define-element-7dc6a572.js';
import './base-511c8c11.js';
import './query-d0113d5a.js';
import './divider.css-df6ebec2.js';
import './spectrum-icon-checkmark.css-ebf23520.js';
import './custom-tag-c228386e.js';
import './IconBase-7772fb01.js';
import './like-anchor-8f97823d.js';
import './if-defined-ae83b405.js';
import './focusable-391b57ba.js';
import './focus-visible-03398d98.js';
import './sp-icon-chevron100-19c0ec20.js';
import './Chevron100-6f55b923.js';
import './spectrum-icon-chevron.css-d3283c08.js';
import './mutation-controller-81a30f7f.js';
import './observe-slot-text-769cbc70.js';
import './query-assigned-nodes-d63886c3.js';
import './observe-slot-presence-ae37a9bc.js';
import './state-3927c84f.js';

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
