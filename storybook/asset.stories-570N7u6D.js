import './sp-asset-rFFlFS2B.js';
import { p as portrait } from './images--h1L0gQv.js';
import { x } from './lit-html-GmIhAbMP.js';
import './lit-element-xBOPiTek.js';
import './define-element-z6bXN_P5.js';

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
