"use strict";
import { html } from "@spectrum-web-components/base";
import "@spectrum-web-components/color-slider/sp-color-slider.js";
import "@spectrum-web-components/color-area/sp-color-area.js";
export default {
  title: "Color/Area",
  component: "sp-color-area",
  argTypes: {
    onInput: { action: "input" },
    onChange: { action: "change" },
    color: {
      name: "color",
      type: { name: "ColorTypes", required: "true" },
      description: "The color displayed by the ColorArea.",
      table: {
        type: { summary: "ColorTypes" },
        defaultValue: { summary: "" }
      },
      control: "text"
    }
  }
};
export const Default = ({ onChange, onInput }) => {
  return html`
        <sp-color-area
            color="#ff0000"
            @input=${({ target }) => {
    const next = target.nextElementSibling;
    next.textContent = target.color;
    next.style.color = target.color;
    onInput(target.value);
  }}
            @change=${({ target }) => {
    onChange(target.value);
  }}
        ></sp-color-area>
        <div style="color: #ff0000" aria-live="off">#ff0000</div>
    `;
};
export const appliedValues = () => {
  return html`
        <sp-color-area
            .color=${{ space: "hsv", coords: [250, 90, 80] }}
        ></sp-color-area>
        <sp-color-area color="hsv(250, 90%, 80%)"></sp-color-area>
        <sp-color-area hue="250" x="0.1" y="0.1"></sp-color-area>
    `;
};
export const joint = () => {
  return html`
        <div>
            <sp-color-area
                color="hsv (0 100% 100%)"
                @input=${({ target }) => {
    const next = target.nextElementSibling;
    const display = next.nextElementSibling;
    display.textContent = target.color;
    display.style.color = target.color;
    next.color = target.color;
  }}
            ></sp-color-area>
            <sp-color-slider
                color="hsv(0 100% 100%)"
                @input=${({
    target: {
      color,
      previousElementSibling,
      nextElementSibling
    }
  }) => {
    previousElementSibling.color = color;
    nextElementSibling.textContent = color;
    nextElementSibling.style.color = color;
  }}
            ></sp-color-slider>
            <div style="color: hsv(0, 100%, 100%)">hsv(0, 100%, 100%)</div>
        </div>
    `;
};
export const disabled = () => {
  return html`
        <sp-color-area disabled></sp-color-area>
    `;
};
export const sized = () => {
  return html`
        <sp-color-area style="width: 72px; height: 72px"></sp-color-area>
    `;
};
export const canvas = () => {
  return html`
        <sp-color-area>
            <canvas slot="gradient"></canvas>
        </sp-color-area>
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
          const gradB = context.createLinearGradient(
            0,
            0,
            0,
            canvas2.height
          );
          gradB.addColorStop(0, "white");
          gradB.addColorStop(1, "black");
          const gradC = context.createLinearGradient(
            0,
            0,
            canvas2.width,
            0
          );
          gradC.addColorStop(0, "hsla(0,100%,50%,0)");
          gradC.addColorStop(1, "hsla(0,100%,50%,1)");
          context.fillStyle = gradB;
          context.fillRect(0, 0, canvas2.width, canvas2.height);
          context.fillStyle = gradC;
          context.globalCompositeOperation = "multiply";
          context.fillRect(0, 0, canvas2.width, canvas2.height);
          context.globalCompositeOperation = "source-over";
        }
      }
    }
  }
  get updateComplete() {
    return this.writeStatePromise;
  }
}
customElements.define("area-canvas-writer", CanvasWriter);
canvas.decorators = [
  (story) => {
    return html`
            ${story()}
            <area-canvas-writer></area-canvas-writer>
        `;
  }
];
//# sourceMappingURL=color-area.stories.js.map
