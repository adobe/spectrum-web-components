import { x } from './lit-html-COgVUehj.js';

function nextFrame() {
  return new Promise((res) => requestAnimationFrame(() => res()));
}
class IsOverlayOpen extends HTMLElement {
  constructor() {
    super();
    this.sendFocus = async () => {
      var _a;
      const selectedItem = (_a = document.querySelector("[focusable]")) == null ? void 0 : _a.querySelector("[selected]");
      if (selectedItem) {
        selectedItem.focus();
        selectedItem.focused = true;
      }
    };
    this.handleOpened = async (event) => {
      const overlay = event.target;
      const actions = [nextFrame(), overlay.updateComplete, this.sendFocus()];
      await Promise.all(actions);
      await nextFrame();
      await nextFrame();
      await nextFrame();
      await nextFrame();
      this.ready(true);
    };
    this.readyPromise = Promise.resolve(false);
    this.readyPromise = new Promise((res) => {
      this.ready = res;
      this.setup();
    });
  }
  async setup() {
    await nextFrame();
    document.addEventListener("sp-opened", this.handleOpened);
  }
  get updateComplete() {
    return this.readyPromise;
  }
}
customElements.define("is-overlay-open", IsOverlayOpen);
const isOverlayOpen = (story) => {
  return x`
        ${story()}
        <is-overlay-open></is-overlay-open>
    `;
};

export { isOverlayOpen as i };
