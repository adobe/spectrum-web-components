"use strict";
import { html } from "@spectrum-web-components/base";
import "@spectrum-web-components/progress-bar/sp-progress-bar.js";
export default {
  title: "Progress Bar",
  component: "sp-progress-bar"
};
export const label = () => {
  return html`
        <sp-progress-bar label="Loading" progress="50"></sp-progress-bar>
    `;
};
export const indeterminate = () => {
  return html`
        <sp-progress-bar label="Loading" indeterminate></sp-progress-bar>
    `;
};
export const sideLabel = () => {
  return html`
        <sp-progress-bar
            side-label
            label="Loading"
            progress="50"
        ></sp-progress-bar>
    `;
};
export const sideIndeterminate = () => {
  return html`
        <sp-progress-bar
            side-label
            label="Loading"
            indeterminate
        ></sp-progress-bar>
    `;
};
const makeOverBackground = (variant) => (story) => {
  const color = variant === "black" ? "rgb(181, 209, 211)" : "var(--spectrum-seafoam-900)";
  return html`
            <div
                style="
                    --mod-actionbutton-static-content-color: ${color};
                    --mod-button-static-content-color: ${color};
                    background-color: ${color};
                    color: ${color};
                    padding: calc(var(--swc-scale-factor) * 14px) calc(var(--swc-scale-factor) * 20px);
                    display: inline-block;
                "
            >
                ${story()}
            </div>
        `;
};
export const staticWhite = () => {
  return makeOverBackground("white")(
    () => html`
            <sp-progress-bar
                progress="50"
                static-color="white"
            ></sp-progress-bar>
        `
  );
};
export const staticWhiteLabel = () => {
  return makeOverBackground("white")(
    () => html`
            <sp-progress-bar
                label="Loading"
                progress="50"
                static-color="white"
            ></sp-progress-bar>
        `
  );
};
export const staticWhiteIndeterminate = () => {
  return makeOverBackground("white")(
    () => html`
            <sp-progress-bar
                label="Loading"
                indeterminate
                static-color="white"
            ></sp-progress-bar>
        `
  );
};
export const staticWhiteSideLabel = () => {
  return makeOverBackground("white")(
    () => html`
            <sp-progress-bar
                label="Loading"
                progress="50"
                static-color="white"
                side-label
            ></sp-progress-bar>
        `
  );
};
export const staticWhiteSideLabelIndeterminate = () => {
  return makeOverBackground("white")(
    () => html`
            <sp-progress-bar
                label="Loading"
                indeterminate
                static-color="white"
                side-label
            ></sp-progress-bar>
        `
  );
};
//# sourceMappingURL=progress-bar.stories.js.map
