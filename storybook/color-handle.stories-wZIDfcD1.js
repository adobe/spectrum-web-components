import './sp-color-handle-2cOzuunM.js';
import { x } from './lit-html-GmIhAbMP.js';
import './sp-color-loupe-Y-Ae7DVu.js';
import './lit-element-xBOPiTek.js';
import './opacity-checkerboard.css-uDCNYB6s.js';
import './define-element-UHExAFdK.js';

var colorHandle_stories = {
  title: "Color/Handle",
  component: "sp-color-handle"
};
const Default = () => {
  return x`
        <sp-color-handle
            style="left: 50%; top: 50%; transform: translate(-50%, -50%);"
        ></sp-color-handle>
    `;
};
const disabled = () => {
  return x`
        <sp-color-handle
            disabled
            style="left: 50%; top: 50%; transform: translate(-50%, -50%);"
        ></sp-color-handle>
    `;
};
const open = () => {
  return x`
        <sp-color-handle
            open
            style="left: 50%; top: 50%; transform: translate(-50%, -50%);"
        ></sp-color-handle>
    `;
};
const __namedExportsOrder = ['Default', 'disabled', 'open'];

export { Default, __namedExportsOrder, colorHandle_stories as default, disabled, open };