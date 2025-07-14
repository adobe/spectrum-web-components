"use strict";
import { html } from "@spectrum-web-components/base";
import "@spectrum-web-components/meter/sp-meter.js";
export default {
  title: "Meter",
  component: "sp-meter"
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
                    padding: var(--spectrum-font-size-100) var(--spectrum-font-size-400);
                    display: inline-block;
                "
            >
                ${story()}
            </div>
        `;
};
export const sideLabel = () => {
  return html`
        <sp-meter side-label progress="50">Storage Space</sp-meter>
    `;
};
export const negative = () => {
  return html`
        <sp-meter variant="negative" progress="95">Storage Space</sp-meter>
    `;
};
export const notice = () => {
  return html`
        <sp-meter variant="notice" progress="73">Storage Space</sp-meter>
    `;
};
export const positive = () => {
  return html`
        <sp-meter variant="positive" progress="50">Storage Space</sp-meter>
    `;
};
export const staticWhite = () => {
  return makeOverBackground("white")(
    () => html`
            <sp-meter static-color="white" progress="50">
                Storage Space
            </sp-meter>
        `
  );
};
//# sourceMappingURL=meter.stories.js.map
