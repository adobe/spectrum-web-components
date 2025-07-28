"use strict";
import { html } from "@spectrum-web-components/base";
import "@spectrum-web-components/thumbnail/sp-thumbnail.js";
import {
  landscape as landscapeImage,
  portrait as portraitImage,
  thumbnail
} from "./images.js";
export default {
  title: "Thumbnail",
  component: "sp-thumbnail"
};
export const Default = () => {
  return html`
        <sp-thumbnail>
            <img src=${thumbnail} alt="Woman crouching" />
        </sp-thumbnail>
    `;
};
export const focused = () => {
  return html`
        <sp-thumbnail focused>
            <img src=${thumbnail} alt="Woman crouching" />
        </sp-thumbnail>
    `;
};
export const disabled = () => {
  return html`
        <sp-thumbnail disabled>
            <img src=${thumbnail} alt="Woman crouching" />
        </sp-thumbnail>
    `;
};
export const portrait = () => {
  return html`
        <sp-thumbnail>
            <img src=${portraitImage} alt="Eiffel Tower at night" />
        </sp-thumbnail>
    `;
};
export const landscape = () => {
  return html`
        <sp-thumbnail>
            <img
                src=${landscapeImage}
                alt="Landscape with mountains and lake"
            />
        </sp-thumbnail>
    `;
};
export const layerSelected = () => {
  return html`
        <sp-thumbnail layer selected>
            <img src=${thumbnail} alt="Woman crouching" />
        </sp-thumbnail>
    `;
};
export const layer = () => {
  return html`
        <sp-thumbnail layer>
            <img src=${thumbnail} alt="Woman crouching" />
        </sp-thumbnail>
    `;
};
export const portraitCover = () => {
  return html`
        <sp-thumbnail cover>
            <img src=${portraitImage} alt="Eiffel Tower at night" />
        </sp-thumbnail>
    `;
};
export const landscapeCover = () => {
  return html`
        <sp-thumbnail cover>
            <img
                src=${landscapeImage}
                alt="Landscape with mountains and lake"
            />
        </sp-thumbnail>
    `;
};
export const background = () => {
  return html`
        <sp-thumbnail background="orange">
            <img src=${thumbnail} alt="Woman crouching" />
        </sp-thumbnail>
    `;
};
//# sourceMappingURL=thumbnail.stories.js.map
