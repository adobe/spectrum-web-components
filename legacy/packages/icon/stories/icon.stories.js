"use strict";
import { html } from "@spectrum-web-components/base";
import "@spectrum-web-components/icon/sp-icon.js";
import { back } from "./images";
import "@spectrum-web-components/icons/sp-icons-medium.js";
import "@spectrum-web-components/icons/sp-icons-large.js";
const sizes = ["xxs", "xs", "s", "m", "l", "xl", "xxl"];
export default {
  component: "sp-icon",
  title: "Icon"
};
export const Medium = () => {
  return html`
        <sp-icons-medium></sp-icons-medium>
        ${sizes.map(
    (size) => html`
                <sp-icon size=${size} name="ui:Chevron200"></sp-icon>
            `
  )}
    `;
};
export const Large = () => {
  return html`
        <sp-icons-large></sp-icons-large>
        ${sizes.map(
    (size) => html`
                <sp-icon size=${size} name="ui:Chevron400"></sp-icon>
            `
  )}
    `;
};
export const imageIcon = () => {
  return html`
        ${sizes.map(
    (size) => html`
                <sp-icon label="Back" size=${size} src=${back}></sp-icon>
            `
  )}
    `;
};
imageIcon.storyName = "Image Icon";
export const imageIconSrcError = () => {
  const invalidImgSrc = "invalid-image-src";
  const error = () => {
    console.error("Invalid sp-icon src provided");
  };
  return html`
        ${sizes.map(
    (size) => html`
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
imageIconSrcError.parameters = {
  // Disables Chromatic's snapshotting on a global level
  chromatic: { disableSnapshot: true }
};
export const svgIcon = () => {
  return html`
        ${sizes.map(
    (size) => html`
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
//# sourceMappingURL=icon.stories.js.map
