import './sp-icon-DY-5T7Ex.js';
import './sp-icons-large-OdHRyMi5.js';
import { x } from './lit-html-COgVUehj.js';
import './IconBase-BIYWpr2G.js';
import './lit-element-BulMEkr1.js';
import './define-element-C_3bgzm7.js';
import './if-defined-DDJGFaN4.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';

const back = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0yOTU3Ljk5NSAtNTUzMC4wMzIgNiAxMCI+PGRlZnM+PHN0eWxlPi5he2ZpbGw6bm9uZTtzdHJva2U6IzE0NzNlNjtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MTA7c3Ryb2tlLXdpZHRoOjJweDt9PC9zdHlsZT48L2RlZnM+PHBhdGggY2xhc3M9ImEiIGQ9Ik0yNTEuMywzMzNsNC00LTQtNCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI3MDEuNjk1IC01MTk2LjAzMikgcm90YXRlKDE4MCkiLz48L3N2Zz4=";

const sizes = ["xxs", "xs", "s", "m", "l", "xl", "xxl"];
var icon_stories = {
  component: "sp-icon",
  title: "Icon"
};
const Medium = () => {
  return x`
        <sp-icons-medium></sp-icons-medium>
        ${sizes.map(
    (size) => x`
                <sp-icon size=${size} name="ui:Chevron200"></sp-icon>
            `
  )}
    `;
};
const Large = () => {
  return x`
        <sp-icons-large></sp-icons-large>
        ${sizes.map(
    (size) => x`
                <sp-icon size=${size} name="ui:Chevron400"></sp-icon>
            `
  )}
    `;
};
const imageIcon = () => {
  return x`
        ${sizes.map(
    (size) => x`
                <sp-icon label="Back" size=${size} src=${back}></sp-icon>
            `
  )}
    `;
};
imageIcon.storyName = "Image Icon";
const imageIconSrcError = () => {
  const invalidImgSrc = "invalid-image-src";
  const error = () => {
    console.error("Invalid sp-icon src provided");
  };
  return x`
        ${sizes.map(
    (size) => x`
                <sp-icon
                    label="Back"
                    size=${size}
                    src=${invalidImgSrc}
                    @error=${error}
                ></sp-icon>
            `
  )}
    `;
};
imageIconSrcError.storyName = "Image Icon src invalid error";
imageIconSrcError.swc_vrt = {
  skip: true
};
const svgIcon = () => {
  return x`
        ${sizes.map(
    (size) => x`
                <sp-icon size=${size}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 22 22"
                        fill="currentColor"
                        height="18"
                        width="18"
                        aria-hidden="true"
                    >
                        <path
                            d="M19.75,10.04h-15l5.97-5.97a.483.483,0,0,0,0-.7l-.35-.36a.513.513,0,0,0-.71,0L2.24,10.44a.513.513,0,0,0,0,.71l7.39,7.84a.513.513,0,0,0,.71,0l.35-.35a.513.513,0,0,0,0-.71L4.76,11.5H19.75a.25.25,0,0,0,.25-.25v-.96A.25.25,0,0,0,19.75,10.04Z"
                        ></path>
                    </svg>
                </sp-icon>
            `
  )}
    `;
};
svgIcon.storyName = "SVG Icon";
const __namedExportsOrder = ['Medium', 'Large', 'imageIcon', 'imageIconSrcError', 'svgIcon'];

export { Large, Medium, __namedExportsOrder, icon_stories as default, imageIcon, imageIconSrcError, svgIcon };
