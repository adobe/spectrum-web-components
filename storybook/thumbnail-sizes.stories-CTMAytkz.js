import { t as thumbnail$1 } from './images-BcIqohGu.js';
import { x } from './lit-html-COgVUehj.js';
import './opacity-checkerboard.css-Cz3bIIfY.js';
import './lit-element-BulMEkr1.js';
import './define-element-C_3bgzm7.js';

var thumbnailSizes_stories = {
  title: "Thumbnail/Sizes",
  component: "sp-thumbnail"
};
const thumbnail = ({
  size
}) => {
  return x`
        <sp-thumbnail size=${size}>
            <img src=${thumbnail$1} alt="Woman crouching" />
        </sp-thumbnail>
    `;
};
const size50 = () => thumbnail({ size: "50" });
const size75 = () => thumbnail({ size: "75" });
const size100 = () => thumbnail({ size: "100" });
const size200 = () => thumbnail({ size: "200" });
const size300 = () => thumbnail({ size: "300" });
const size400 = () => thumbnail({ size: "400" });
const size500 = () => thumbnail({ size: "500" });
const size600 = () => thumbnail({ size: "600" });
const size700 = () => thumbnail({ size: "700" });
const size800 = () => thumbnail({ size: "800" });
const size900 = () => thumbnail({ size: "900" });
const size1000 = () => thumbnail({ size: "1000" });
const __namedExportsOrder = ['size50', 'size75', 'size100', 'size200', 'size300', 'size400', 'size500', 'size600', 'size700', 'size800', 'size900', 'size1000'];

export { __namedExportsOrder, thumbnailSizes_stories as default, size100, size1000, size200, size300, size400, size50, size500, size600, size700, size75, size800, size900 };
