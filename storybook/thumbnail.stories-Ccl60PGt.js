import { t as thumbnail, p as portrait$1, l as landscape$1 } from './images-BcIqohGu.js';
import { x } from './lit-html-COgVUehj.js';
import './opacity-checkerboard.css-Cz3bIIfY.js';
import './lit-element-BulMEkr1.js';
import './define-element-C_3bgzm7.js';

var thumbnail_stories = {
  title: "Thumbnail",
  component: "sp-thumbnail"
};
const Default = () => {
  return x`
        <sp-thumbnail>
            <img src=${thumbnail} alt="Woman crouching" />
        </sp-thumbnail>
    `;
};
const focused = () => {
  return x`
        <sp-thumbnail focused>
            <img src=${thumbnail} alt="Woman crouching" />
        </sp-thumbnail>
    `;
};
const disabled = () => {
  return x`
        <sp-thumbnail disabled>
            <img src=${thumbnail} alt="Woman crouching" />
        </sp-thumbnail>
    `;
};
const portrait = () => {
  return x`
        <sp-thumbnail>
            <img src=${portrait$1} alt="Eiffel Tower at night" />
        </sp-thumbnail>
    `;
};
const landscape = () => {
  return x`
        <sp-thumbnail>
            <img
                src=${landscape$1}
                alt="Landscape with mountains and lake"
            />
        </sp-thumbnail>
    `;
};
const layerSelected = () => {
  return x`
        <sp-thumbnail layer selected>
            <img src=${thumbnail} alt="Woman crouching" />
        </sp-thumbnail>
    `;
};
const layer = () => {
  return x`
        <sp-thumbnail layer>
            <img src=${thumbnail} alt="Woman crouching" />
        </sp-thumbnail>
    `;
};
const portraitCover = () => {
  return x`
        <sp-thumbnail cover>
            <img src=${portrait$1} alt="Eiffel Tower at night" />
        </sp-thumbnail>
    `;
};
const landscapeCover = () => {
  return x`
        <sp-thumbnail cover>
            <img
                src=${landscape$1}
                alt="Landscape with mountains and lake"
            />
        </sp-thumbnail>
    `;
};
const background = () => {
  return x`
        <sp-thumbnail background="orange">
            <img src=${thumbnail} alt="Woman crouching" />
        </sp-thumbnail>
    `;
};
const __namedExportsOrder = ['Default', 'focused', 'disabled', 'portrait', 'landscape', 'layerSelected', 'layer', 'portraitCover', 'landscapeCover', 'background'];

export { Default, __namedExportsOrder, background, thumbnail_stories as default, disabled, focused, landscape, landscapeCover, layer, layerSelected, portrait, portraitCover };
