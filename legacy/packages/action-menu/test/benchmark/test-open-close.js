"use strict";
import "@spectrum-web-components/action-menu/sp-action-menu.js";
import "@spectrum-web-components/menu/sp-menu-item.js";
import "@spectrum-web-components/menu/sp-menu-divider.js";
import { html } from "lit";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
class ActionMenuWorkflow extends HTMLElement {
  constructor() {
    super();
    this.count = 0;
    this.readyPromise = Promise.resolve(false);
    this.readyPromise = new Promise((res) => {
      this.ready = res;
      this.setup();
    });
  }
  async setup() {
    this.target = this.nextElementSibling;
    const childPromises = [];
    [...this.target.children].forEach((child) => {
      if ("updateComplete" in child) {
        childPromises.push(child.updateComplete);
      }
    });
    await Promise.all([this.target.updateComplete, ...childPromises]);
    this.target.addEventListener("sp-opened", () => {
      requestAnimationFrame(() => this.target.open = false);
    });
    this.target.addEventListener("sp-closed", () => {
      this.count += 1;
      if (this.count >= 5) {
        this.ready(true);
        return;
      }
      requestAnimationFrame(() => this.target.open = true);
    });
    requestAnimationFrame(() => this.target.open = true);
  }
  get updateComplete() {
    return this.readyPromise;
  }
}
customElements.define("action-menu-workflow", ActionMenuWorkflow);
measureFixtureCreation(
  html`
        <action-menu-workflow></action-menu-workflow>
        <sp-action-menu>
            <span slot="label">
                Select a Country with a very long label, too long in fact
            </span>
            <sp-menu-item>Deselect</sp-menu-item>
            <sp-menu-item>Select Inverse</sp-menu-item>
            <sp-menu-item>Feather...</sp-menu-item>
            <sp-menu-item>Select and Mask...</sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item>Save Selection</sp-menu-item>
            <sp-menu-item disabled>Make Work Path</sp-menu-item>
        </sp-action-menu>
    `,
  { numRenders: 1 }
);
//# sourceMappingURL=test-open-close.js.map
