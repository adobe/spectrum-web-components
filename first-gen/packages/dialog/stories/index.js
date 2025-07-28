"use strict";
import { html } from "@spectrum-web-components/base";
import "@spectrum-web-components/button/sp-button.js";
import "@spectrum-web-components/overlay/sp-overlay.js";
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
export const disabledButtonDecorator = (story) => {
  return html`
        ${story()}
        <countdown-complete-watcher></countdown-complete-watcher>
    `;
};
export const withOverlayDecorator = (story) => {
  return html`
        <sp-button variant="primary" id="trigger">Toggle Dialog</sp-button>
        <sp-overlay type="modal" trigger="trigger@click" open>
            ${story()}
        </sp-overlay>
    `;
};
export const disabledButtonWithOverlayDecorator = (story) => withOverlayDecorator(() => disabledButtonDecorator(story));
//# sourceMappingURL=index.js.map
