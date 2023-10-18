import { x } from './lit-html-126adc72.js';

function nextFrame() {
  return new Promise((res) => requestAnimationFrame(() => res()));
}
class OpenSplitButtonReady extends HTMLElement {
  constructor() {
    super();
    this.readyPromise = Promise.resolve(false);
    this.readyPromise = new Promise((res) => {
      this.ready = res;
      this.setup();
    });
  }
  async setup() {
    await nextFrame();
    const button = document.querySelector(`sp-split-button`);
    button.addEventListener(
      "sp-opened",
      () => {
        this.ready(true);
      },
      { once: true }
    );
  }
  get updateComplete() {
    return this.readyPromise;
  }
}
customElements.define("open-split-button-ready", OpenSplitButtonReady);
const openSplitButtonDecorator = (story) => {
  return x`
        ${story()}
        <open-split-button-ready></open-split-button-ready>
    `;
};

export { openSplitButtonDecorator as o };
