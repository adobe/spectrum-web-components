"use strict";
import {
  elementUpdated,
  expect,
  fixture,
  html,
  nextFrame,
  oneEvent
} from "@open-wc/testing";
import "@spectrum-web-components/action-menu/sync/sp-action-menu.js";
import "@spectrum-web-components/menu/sp-menu-divider.js";
import "@spectrum-web-components/menu/sp-menu-item.js";
import { setViewport } from "@web/test-runner-commands";
import { spreadProps } from "../../../test/lit-helpers.js";
import { sendMouse } from "../../../test/plugins/browser.js";
import { isChrome } from "@spectrum-web-components/shared";
describe("ActionMenu, responsive", () => {
  let el;
  const actionMenuFixture = async (args) => {
    const test = await fixture(html`
            <div>
                <sp-action-menu id="action-menu" ${spreadProps(args || {})}>
                    <span slot="label">Action Menu</span>
                    <sp-menu-item>Deselect</sp-menu-item>
                    <sp-menu-item>Select Inverse</sp-menu-item>
                    <sp-menu-item>Feather...</sp-menu-item>
                    <sp-menu-item>Select and Mask...</sp-menu-item>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-item>Save Selection</sp-menu-item>
                    <sp-menu-item disabled>Make Work Path</sp-menu-item>
                </sp-action-menu>
            </div>
        `);
    return test.querySelector("sp-action-menu");
  };
  describe("container", () => {
    beforeEach(async () => {
      el = await actionMenuFixture();
      await elementUpdated(el);
    });
    it("is a Tray in mobile", async () => {
      el.isMobile.matches = true;
      el.bindEvents();
      await setViewport({ width: 360, height: 640 });
      await nextFrame();
      const opened = oneEvent(el, "sp-opened");
      const boundingRect = el.button.getBoundingClientRect();
      sendMouse({
        steps: [
          {
            type: "click",
            position: [
              boundingRect.x + boundingRect.width / 2,
              boundingRect.y + boundingRect.height / 2
            ]
          }
        ]
      });
      await opened;
      const tray = el.shadowRoot.querySelector("sp-tray");
      const popover = el.shadowRoot.querySelector("sp-popover");
      expect(tray).to.not.be.null;
      expect(popover).to.be.null;
    });
    it("is a Popover in desktop", async () => {
      await setViewport({ width: 701, height: 640 });
      await nextFrame();
      await nextFrame();
      const opened = oneEvent(el, "sp-opened");
      el.open = true;
      await opened;
      const popover = el.shadowRoot.querySelector("sp-popover");
      const tray = el.shadowRoot.querySelector("sp-tray");
      expect(popover).to.not.be.null;
      expect(tray).to.be.null;
    });
  });
  describe("forcePopover", () => {
    beforeEach(async () => {
      el = await actionMenuFixture({ forcePopover: true });
      await elementUpdated(el);
    });
    it("is a Popover in mobile", async () => {
      if (isChrome()) {
        return;
      }
      el.isMobile.matches = true;
      el.bindEvents();
      await setViewport({ width: 360, height: 640 });
      await nextFrame();
      const opened = oneEvent(el, "sp-opened");
      const boundingRect = el.button.getBoundingClientRect();
      sendMouse({
        steps: [
          {
            type: "click",
            position: [
              boundingRect.x + boundingRect.width / 2,
              boundingRect.y + boundingRect.height / 2
            ]
          }
        ]
      });
      await elementUpdated(el);
      await opened;
      const tray = el.shadowRoot.querySelector("sp-tray");
      const popover = el.shadowRoot.querySelector("sp-popover");
      expect(tray).to.be.null;
      expect(popover).to.not.be.null;
    });
    it("is a Popover in desktop", async () => {
      await setViewport({ width: 701, height: 640 });
      await nextFrame();
      await nextFrame();
      const opened = oneEvent(el, "sp-opened");
      el.open = true;
      await opened;
      const popover = el.shadowRoot.querySelector("sp-popover");
      const tray = el.shadowRoot.querySelector("sp-tray");
      expect(popover).to.not.be.null;
      expect(tray).to.be.null;
    });
  });
});
//# sourceMappingURL=action-menu-responsive.test.js.map
