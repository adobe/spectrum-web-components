"use strict";
import "@spectrum-web-components/checkbox/sp-checkbox.js";
import "@spectrum-web-components/field-group/sp-field-group.js";
import { html } from "@spectrum-web-components/base";
export default {
  component: "sp-checkbox",
  title: "Checkbox"
};
export const Default = () => {
  return html`
        <sp-checkbox>Checkbox</sp-checkbox>
    `;
};
export const readonly = () => {
  return html`
        <sp-checkbox checked readonly>Checkbox</sp-checkbox>
    `;
};
export const Indeterminate = () => {
  return html`
        <sp-checkbox indeterminate>
            Checkbox, indeterminate, not checked
        </sp-checkbox>
        <br />
        <sp-checkbox indeterminate checked>
            Checkbox, indeterminate, checked
        </sp-checkbox>
    `;
};
export const Checked = () => {
  return html`
        <sp-checkbox checked>Checkbox</sp-checkbox>
    `;
};
export const emphasized = () => {
  return html`
        <sp-checkbox emphasized>Checkbox</sp-checkbox>
    `;
};
export const emphasizedIndeterminate = () => {
  return html`
        <sp-checkbox emphasized indeterminate>Checkbox</sp-checkbox>
    `;
};
export const emphasizedChecked = () => {
  return html`
        <sp-checkbox emphasized checked>Checkbox</sp-checkbox>
    `;
};
export const emphasizedInvalid = () => {
  return html`
        <sp-checkbox emphasized invalid>Checkbox</sp-checkbox>
    `;
};
export const emphasizedInvalidIndeterminate = () => {
  return html`
        <sp-checkbox emphasized invalid indeterminate>Checkbox</sp-checkbox>
    `;
};
export const emphasizedInvalidChecked = () => {
  return html`
        <sp-checkbox emphasized invalid checked>Checkbox</sp-checkbox>
    `;
};
export const Invalid = () => {
  return html`
        <sp-checkbox invalid>Checkbox</sp-checkbox>
    `;
};
export const invalidIndeterminate = () => {
  return html`
        <sp-checkbox invalid indeterminate>Checkbox</sp-checkbox>
    `;
};
export const invalidChecked = () => {
  return html`
        <sp-checkbox invalid checked>Checkbox</sp-checkbox>
    `;
};
export const Autofocus = () => {
  return html`
        <sp-checkbox autofocus>Checkbox</sp-checkbox>
    `;
};
export const Disabled = () => {
  return html`
        <sp-checkbox disabled>Checkbox</sp-checkbox>
    `;
};
export const disabledChecked = () => {
  return html`
        <sp-checkbox disabled checked>Checkbox</sp-checkbox>
    `;
};
export const disabledIndeterminate = () => {
  return html`
        <sp-checkbox disabled indeterminate>Checkbox</sp-checkbox>
    `;
};
export const emphasizedDisabled = () => {
  return html`
        <sp-checkbox emphasized disabled>Checkbox</sp-checkbox>
    `;
};
export const emphasizedDisabledIndeterminate = () => {
  return html`
        <sp-checkbox emphasized disabled indeterminate>Checkbox</sp-checkbox>
    `;
};
export const emphasizedDisabledChecked = () => {
  return html`
        <sp-checkbox emphasized checked>Checkbox</sp-checkbox>
    `;
};
export const tabIndexExample = () => {
  return html`
        <sp-field-group horizontal>
            <sp-checkbox tabindex="0">Checkbox 0</sp-checkbox>
            <sp-checkbox disabled tabindex="3">Checkbox 3</sp-checkbox>
            <sp-checkbox tabindex="4">Checkbox 4</sp-checkbox>
            <sp-checkbox tabindex="2" autofocus>Checkbox 2</sp-checkbox>
            <sp-checkbox tabindex="1">Checkbox 1</sp-checkbox>
        </sp-field-group>
    `;
};
export const verticalTabIndexExample = () => {
  return html`
        <sp-field-group vertical>
            <sp-checkbox tabindex="0">Checkbox 0</sp-checkbox>
            <sp-checkbox disabled tabindex="3">Checkbox 3</sp-checkbox>
            <sp-checkbox tabindex="4">Checkbox 4</sp-checkbox>
            <sp-checkbox tabindex="2" autofocus>Checkbox 2</sp-checkbox>
            <sp-checkbox tabindex="1">Checkbox 1</sp-checkbox>
        </sp-field-group>
    `;
};
//# sourceMappingURL=checkbox.stories.js.map
