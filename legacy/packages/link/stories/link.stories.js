"use strict";
import { html } from "@spectrum-web-components/base";
import "@spectrum-web-components/link/sp-link.js";
export default {
  component: "sp-link",
  title: "Link"
};
export const Default = () => {
  return html`
        This is a <sp-link href="#">link</sp-link> in a sentence.
    `;
};
export const Quiet = () => {
  return html`
        This is a <sp-link quiet href="#">quiet link</sp-link> in a sentence.
    `;
};
export const Disabled = () => {
  return html`
        This is a <sp-link disabled onclick="('hi')" href="#">disabled non focusable link</sp-link> in a sentence.
    `;
};
export const secondary = () => {
  return html`
        This is a <sp-link variant="secondary" href="#">link</sp-link> in a sentence.
    `;
};
export const secondaryQuiet = () => {
  return html`
        This is a <sp-link variant="secondary" quiet href="#">quiet link</sp-link> in a sentence.
    `;
};
export const staticWhite = () => {
  return html`
        <div
            style="background-color: rgb(15, 121, 125); padding: 15px 20px; display: inline-block;"
        >
            <p style="color: rgb(240, 240, 240);">
                This
                <sp-link static-color="white" href="#">link</sp-link>
                has a background.
            </p>
        </div>
    `;
};
export const staticBlack = () => {
  return html`
        <div
            style="background-color: rgb(181, 209, 211); padding: 15px 20px; display: inline-block;"
        >
            <p style="color: rgb(15, 15, 15);">
                This
                <sp-link static-color="black" href="#">link</sp-link>
                has a background.
            </p>
        </div>
    `;
};
export const staticWhiteQuiet = () => {
  return html`
        <div
            style="background-color: rgb(15, 121, 125); padding: 15px 20px; display: inline-block;"
        >
            <p style="color: rgb(240, 240, 240);">
                This
                <sp-link static-color="white" quiet href="#">link</sp-link>
                has a background.
            </p>
        </div>
    `;
};
export const staticBlackQuiet = () => {
  return html`
        <div
            style="background-color: rgb(181, 209, 211); padding: 15px 20px; display: inline-block;"
        >
            <p style="color: rgb(15, 15, 15);">
                This
                <sp-link static-color="black" quiet href="#">link</sp-link>
                has a background.
            </p>
        </div>
    `;
};
export const Download = () => {
  const blob = new Blob(["some text for the file"], {
    type: "text/plain;charset=utf-8"
  });
  return html`
        This is a
        <sp-link download="somefile.txt" href="${URL.createObjectURL(blob)}">
            downloadable file
        </sp-link>
        for you to click on.
    `;
};
//# sourceMappingURL=link.stories.js.map
