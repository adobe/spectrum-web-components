"use strict";
import { html } from "@spectrum-web-components/base";
import "@spectrum-web-components/color-wheel/sp-color-wheel.js";
export default {
  title: "Color/Wheel",
  component: "sp-color-wheel"
};
export const Default = () => {
  return html`
        <sp-color-wheel></sp-color-wheel>
    `;
};
export const sized = () => {
  return html`
        <sp-color-wheel style="width: 300px; height: 300px;"></sp-color-wheel>
    `;
};
export const wheelDisabled = () => {
  return html`
        <sp-color-wheel disabled></sp-color-wheel>
    `;
};
export const canvas = () => {
  return html`
        <sp-color-wheel>
            <canvas slot="gradient"></canvas>
        </sp-color-wheel>
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
          const width = canvas2.width;
          const height = canvas2.height;
          const centerX = width / 2;
          const centerY = height / 2;
          const ringSize = centerX - 18;
          for (let i = 0; i < 360; i += Math.PI / 8) {
            const rad = i * (2 * Math.PI) / 360;
            context.strokeStyle = `hsla(${i}, 100%, 50%, 1.0)`;
            context.beginPath();
            context.moveTo(
              centerX + ringSize * Math.cos(rad),
              centerY + ringSize * Math.sin(rad)
            );
            context.lineTo(
              centerX + centerX * Math.cos(rad),
              centerY + centerY * Math.sin(rad)
            );
            context.stroke();
          }
        }
      }
    }
  }
  get updateComplete() {
    return this.writeStatePromise;
  }
}
customElements.define("wheel-canvas-writer", CanvasWriter);
canvas.decorators = [
  (story) => {
    return html`
            ${story()}
            <wheel-canvas-writer></wheel-canvas-writer>
        `;
  }
];
//# sourceMappingURL=color-wheel.stories.js.map
