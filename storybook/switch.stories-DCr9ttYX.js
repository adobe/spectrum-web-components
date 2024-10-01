import './sp-switch-DN6YsIH7.js';
import { s as spreadProps } from './lit-helpers-DFCD1oU3.js';
import { x } from './lit-html-COgVUehj.js';
import './focusable-w-VMKDtH.js';
import './focus-visible-D29Av9Xb.js';
import './define-element-C_3bgzm7.js';
import './lit-element-BulMEkr1.js';
import './CheckboxMixin-CMl_b79j.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
import './if-defined-DDJGFaN4.js';
import './sizedMixin-BzkTbMb8.js';
import './async-directive-DF6rMZJ5.js';
import './directive-helpers-icdnqxxc.js';
import './directive-Bn5c4u4M.js';

var switch_stories = {
  component: "sp-switch",
  title: "Switch",
  argTypes: {
    size: {
      name: "size",
      type: { name: "string", required: false },
      description: "The size at which to display the Switch element",
      table: {
        type: { summary: '"s" | "m" | "l" | "xl"' },
        defaultValue: { summary: "m" }
      },
      control: {
        type: "text"
      }
    }
  },
  args: {
    size: "m"
  }
};
function renderSwitch(args) {
  return x`
        <sp-switch ${spreadProps(args)}>Switch</sp-switch>
    `;
}
const Default = (args) => renderSwitch(args);
const Checked = () => {
  return x`
        <sp-switch checked>Switch</sp-switch>
    `;
};
const Sizes = () => {
  return x`
        <div style="display: flex; align-items: center; gap: 8px;">
            <sp-switch size="s">Small</sp-switch>
            <sp-switch size="m">Medium</sp-switch>
            <sp-switch size="l">Large</sp-switch>
            <sp-switch size="xl">Extra-Large</sp-switch>
        </div>
    `;
};
const readonly = () => {
  return x`
        <sp-switch checked readonly>Switch</sp-switch>
    `;
};
const emphasized = () => {
  return x`
        <sp-switch emphasized>Switch</sp-switch>
    `;
};
const emphasizedChecked = () => {
  return x`
        <sp-switch emphasized checked>Switch</sp-switch>
    `;
};
const Autofocus = () => {
  return x`
        <sp-switch autofocus>Switch</sp-switch>
    `;
};
const Disabled = () => {
  return x`
        <sp-switch disabled>Switch</sp-switch>
    `;
};
const disabledChecked = () => {
  return x`
        <sp-switch disabled checked>Switch</sp-switch>
    `;
};
const __namedExportsOrder = ['Default', 'Checked', 'Sizes', 'readonly', 'emphasized', 'emphasizedChecked', 'Autofocus', 'Disabled', 'disabledChecked'];

export { Autofocus, Checked, Default, Disabled, Sizes, __namedExportsOrder, switch_stories as default, disabledChecked, emphasized, emphasizedChecked, readonly };
