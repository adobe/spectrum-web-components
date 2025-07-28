"use strict";
import {
  elementUpdated,
  expect,
  fixture,
  html,
  waitUntil
} from "@open-wc/testing";
import "@spectrum-web-components/field-label/sp-field-label.js";
import "@spectrum-web-components/menu/sp-menu-divider.js";
import "@spectrum-web-components/menu/sp-menu-item.js";
import "@spectrum-web-components/picker/sync/sp-picker.js";
import { spreadProps } from "../../../test/lit-helpers.js";
describe("Picker, responsive", () => {
  let el;
  const pickerFixture = async (args) => {
    const test = await fixture(html`
            <div>
                <sp-field-label for="picker">Where do you live?</sp-field-label>
                <sp-picker
                    id="picker"
                    style="width: 200px; --spectrum-alias-ui-icon-chevron-size-100: 10px;"
                    ${spreadProps(args || {})}
                >
                    <sp-menu-item>Deselect</sp-menu-item>
                    <sp-menu-item value="option-2">Select Inverse</sp-menu-item>
                    <sp-menu-item>Feather...</sp-menu-item>
                    <sp-menu-item>Select and Mask...</sp-menu-item>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-item>Save Selection</sp-menu-item>
                    <sp-menu-item disabled>Make Work Path</sp-menu-item>
                </sp-picker>
            </div>
        `);
    return test.querySelector("sp-picker");
  };
  describe("container", () => {
    beforeEach(async () => {
      el = await pickerFixture();
      await elementUpdated(el);
    });
    it("is a Tray in mobile", async () => {
      el.isMobile.matches = true;
      el.bindEvents();
      el.open = true;
      let tray = null;
      await waitUntil(
        () => {
          tray = el.shadowRoot.querySelector("sp-tray");
          return !!tray;
        },
        "tray appeared",
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
        "popover appeared",
        { timeout: 300 }
      );
      const tray = el.shadowRoot.querySelector("sp-tray");
      expect(popover, "popover").to.not.be.null;
      expect(tray, "tray").to.be.null;
    });
  });
  describe("forcePopover", () => {
    beforeEach(async () => {
      el = await pickerFixture({ forcePopover: true });
      await elementUpdated(el);
    });
    it("is a Popover in mobile", async function() {
      el.isMobile.matches = true;
      el.bindEvents();
      await elementUpdated(el);
      await waitUntil(
        () => el.offsetWidth > 0,
        "Element should be visible"
      );
      await elementUpdated(el);
      el.open = true;
      let popover = null;
      await waitUntil(
        () => {
          popover = el.shadowRoot.querySelector(
            "sp-popover"
          );
          return !!popover && popover.open;
        },
        "popover appeared",
        { timeout: 300 }
      );
      const tray = el.shadowRoot.querySelector("sp-tray");
      expect(popover, "popover").to.not.be.null;
      expect(tray, "tray").to.be.null;
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
        "popover appeared",
        { timeout: 300 }
      );
      const tray = el.shadowRoot.querySelector("sp-tray");
      expect(tray, "tray").to.be.null;
      expect(popover, "popover").to.not.be.null;
    });
  });
});
//# sourceMappingURL=picker-responsive.test.js.map
