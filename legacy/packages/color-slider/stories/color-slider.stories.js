"use strict";
import { html } from "@spectrum-web-components/base";
import "@spectrum-web-components/color-slider/sp-color-slider.js";
import { gradient } from "./images.js";
export default {
  title: "Color/Slider",
  component: "sp-color-slider"
};
export const Default = () => {
  return html`
        <sp-color-slider></sp-color-slider>
    `;
};
export const disabled = () => {
  return html`
        <sp-color-slider disabled></sp-color-slider>
    `;
};
export const vertical = () => {
  return html`
        <sp-color-slider vertical></sp-color-slider>
    `;
};
export const canvas = () => {
  return html`
        <sp-color-slider color="rgb(255, 0, 0)">
            <canvas slot="gradient" role="presentation"></canvas>
        </sp-color-slider>
    `;
};
class CanvasWriter extends HTMLElement {
  constructor() {
    super();
    this.writeStatePromise = Promise.resolve(false);
    this.writeStatePromise = new Promise((res) => {
      requestAnimationFrame(() => {
        this.writeToCanvas();
        res(true);
      });
    });
  }
  writeToCanvas() {
    const { previousElementSibling } = this;
    if (previousElementSibling) {
      const canvas2 = previousElementSibling.querySelector(
        'canvas[slot="gradient"]'
      );
      if (canvas2) {
        canvas2.width = canvas2.offsetWidth;
        canvas2.height = canvas2.offsetHeight;
        const context = canvas2.getContext("2d");
        if (context) {
          context.rect(0, 0, canvas2.width, canvas2.height);
          const gradient2 = context.createLinearGradient(
            0,
            0,
            canvas2.width,
            canvas2.height
          );
          gradient2.addColorStop(0, "rgb(255, 0, 0)");
          gradient2.addColorStop(0.17, "rgb(255, 255, 0)");
          gradient2.addColorStop(0.33, "rgb(0, 255, 0)");
          gradient2.addColorStop(0.5, "rgb(0, 255, 255)");
          gradient2.addColorStop(0.67, "rgb(0, 0, 255)");
          gradient2.addColorStop(0.83, "rgb(255, 0, 255)");
          gradient2.addColorStop(1, "rgb(255, 0, 0)");
          context.fillStyle = gradient2;
          context.fill();
        }
      }
    }
  }
  get updateComplete() {
    return this.writeStatePromise;
  }
}
customElements.define("slider-canvas-writer", CanvasWriter);
canvas.decorators = [
  (story) => {
    return html`
            ${story()}
            <slider-canvas-writer></slider-canvas-writer>
        `;
  }
];
export const image = () => {
  return html`
        <sp-color-slider color="rgb(255, 0, 0)">
            <img slot="gradient" role="presentation" src=${gradient} />
        </sp-color-slider>
    `;
};
//# sourceMappingURL=color-slider.stories.js.map
