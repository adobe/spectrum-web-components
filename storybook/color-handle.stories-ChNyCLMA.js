import './sp-color-handle-CYDmgoF5.js';
import { x } from './lit-html-COgVUehj.js';
import './sp-color-loupe-Bm2rg9Tt.js';
import './lit-element-BL-po2DW.js';
import './opacity-checkerboard.css-DLP_7ZuL.js';
import './define-element-ByMWMcVd.js';

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
