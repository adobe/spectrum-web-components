import './sp-switch-368481dc.js';
import { s as spreadProps } from './lit-helpers-bb820419.js';
import { x } from './lit-html-126adc72.js';
import './CheckboxBase-d69c7aeb.js';
import './focusable-df7b829e.js';
import './focus-visible-03398d98.js';
import './define-element-467f3dc4.js';
import './lit-element-9354aa77.js';
import './if-defined-ae83b405.js';
import './query-d0113d5a.js';
import './base-511c8c11.js';
import './sizedMixin-95b38e3e.js';
import './async-directive-e6357bae.js';
import './directive-helpers-aa9210f2.js';
import './directive-2bb7789e.js';

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
