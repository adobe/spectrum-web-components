import './sp-asset-BW4hm1qg.js';
import { p as portrait } from './images-BaNQTS6P.js';
import { x } from './lit-html-COgVUehj.js';
import './lit-element-BulMEkr1.js';
import './define-element-C_3bgzm7.js';

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
