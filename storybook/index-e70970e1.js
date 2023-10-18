import { x } from './lit-html-126adc72.js';

function nextFrame() {
  return new Promise((res) => requestAnimationFrame(() => res()));
}
class OverlayTriggerReady extends HTMLElement {
  constructor() {
    super(...arguments);
    this.handleTriggerOpened = async () => {
      await nextFrame();
      this.ready(true);
    };
    this.readyPromise = Promise.resolve(false);
  }
  connectedCallback() {
    this.readyPromise = new Promise((res) => {
      this.ready = res;
      this.setup();
    });
  }
  async setup() {
    await nextFrame();
    await nextFrame();
    const overlay = document.querySelector(
      `overlay-trigger[open]`
    );
    overlay.addEventListener("sp-opened", this.handleTriggerOpened);
  }
  get updateComplete() {
    return this.readyPromise;
  }
}
customElements.define("overlay-trigger-ready", OverlayTriggerReady);
const overlayTriggerDecorator = (story) => {
  return x`
        ${story()}
        <overlay-trigger-ready></overlay-trigger-ready>
    `;
};
class CountdownWatcher extends HTMLElement {
  constructor() {
    super(...arguments);
    this.readyPromise = Promise.resolve(false);
  }
  connectedCallback() {
    this.previousElementSibling.addEventListener(
      "countdown-complete",
      () => {
        this.ready(true);
      }
    );
    this.readyPromise = new Promise((res) => {
      this.ready = res;
    });
  }
  get updateComplete() {
    return this.readyPromise;
  }
}
customElements.define("countdown-complete-watcher", CountdownWatcher);
const disabledButtonDecorator = (story) => {
  return x`
        ${story()}
        <countdown-complete-watcher></countdown-complete-watcher>
    `;
};

export { disabledButtonDecorator as d, overlayTriggerDecorator as o };
