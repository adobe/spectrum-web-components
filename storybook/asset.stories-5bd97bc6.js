import './sp-asset-7e3d7742.js';
import { p as portrait } from './images-aef51497.js';
import { x } from './lit-html-126adc72.js';
import './lit-element-9354aa77.js';
import './define-element-43d4edd5.js';

var asset_stories = {
  title: "Asset",
  component: "sp-asset"
};
const Default = () => {
  return x`
        <sp-asset style="height: 128px">
            <img src=${portrait} alt="Demo Graphic" />
        </sp-asset>
    `;
};
const File = () => {
  return x`
        <sp-asset variant="file"></sp-asset>
    `;
};
const Folder = () => {
  return x`
        <sp-asset variant="folder"></sp-asset>
    `;
};
const __namedExportsOrder = ['Default', 'File', 'Folder'];

export { Default, File, Folder, __namedExportsOrder, asset_stories as default };
