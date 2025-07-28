"use strict";
import {
  elementUpdated,
  expect,
  fixture,
  html,
  waitUntil
} from "@open-wc/testing";
import "@spectrum-web-components/action-menu/sync/sp-action-menu.js";
import "@spectrum-web-components/menu/sp-menu-divider.js";
import "@spectrum-web-components/menu/sp-menu-item.js";
import { spreadProps } from "../../../test/lit-helpers.js";
import { sendMouseTo } from "../../../test/testing-helpers.js";
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
      sendMouseTo(el.button, "click");
      let tray = null;
      await waitUntil(
        () => {
          tray = el.shadowRoot.querySelector("sp-tray");
          return !!tray;
        },
        `tray appeared (el.open: ${el.open})`,
        { timeout: 300 }
      );
      const popover = el.shadowRoot.querySelector("sp-popover");
      expect(tray).to.not.be.null;
      expect(popover).to.be.null;
    });
    it("is a Popover in desktop", async () => {
      el.open = true;
      let popover = null;
      await waitUntil(
        () => {
          popover = el.shadowRoot.querySelector(
            "sp-popover"
          );
          return !!popover && popover.open;
        },
        `popover appeared (el.open: ${el.open})`,
        { timeout: 300 }
      );
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
      el.isMobile.matches = true;
      el.bindEvents();
      el.open = true;
      let popover = null;
      await waitUntil(
        () => {
          popover = el.shadowRoot.querySelector(
            "sp-popover"
          );
          return !!popover && popover.open;
        },
        `popover appeared (el.open: ${el.open})`,
        { timeout: 300 }
      );
      const tray = el.shadowRoot.querySelector("sp-tray");
      expect(tray).to.be.null;
      expect(popover).to.not.be.null;
    });
    it("is a Popover in desktop", async () => {
      el.open = true;
      let popover = null;
      await waitUntil(
        () => {
          popover = el.shadowRoot.querySelector(
            "sp-popover"
          );
          return !!popover && popover.open;
        },
        `popover appeared (el.open: ${el.open})`,
        { timeout: 300 }
      );
      const tray = el.shadowRoot.querySelector("sp-tray");
      expect(popover).to.not.be.null;
      expect(tray).to.be.null;
    });
  });
});
//# sourceMappingURL=action-menu-responsive.test.js.map
