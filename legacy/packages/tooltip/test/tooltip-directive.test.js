"use strict";
import "@spectrum-web-components/tooltip/sp-tooltip.js";
import {
  elementUpdated,
  expect,
  html,
  nextFrame,
  oneEvent
} from "@open-wc/testing";
import "@spectrum-web-components/button/sp-button.js";
import { tooltip } from "@spectrum-web-components/tooltip/src/tooltip-directive.js";
import { sendKeys } from "@web/test-runner-commands";
import { render } from "@spectrum-web-components/base";
describe("Tooltip Directive", () => {
  const renderTooltip = () => html`
            Tip me!
        `;
  function renderButton(...directiveParams) {
    return html`
            <sp-button ${tooltip(...directiveParams)}>
                I'm a button...
            </sp-button>
        `;
  }
  function opensTooltip() {
    it("opens tooltip not previously on DOM", async function() {
      await elementUpdated(this.el);
      const input = document.createElement("input");
      this.el.insertAdjacentElement("beforebegin", input);
      this.overlays = document.querySelectorAll("sp-overlay");
      expect(this.overlays.length).to.equal(0);
      const opened = oneEvent(this.el, "sp-opened");
      input.focus();
      await sendKeys({
        press: "Tab"
      });
      expect(document.activeElement === this.el).to.be.true;
      expect(this.el.matches(":focus-visible")).to.be.true;
      await opened;
      this.overlays = document.querySelectorAll("sp-overlay");
      expect(this.overlays.length).to.equal(1);
    });
  }
  function closesTooltip() {
    it("closes a tooltip and removes it from the DOM", async function() {
      const closed = oneEvent(this.overlays[0], "slottable-request");
      this.el.blur();
      await closed;
      await nextFrame();
      await nextFrame();
      this.overlays = document.querySelectorAll("sp-overlay");
      expect(this.overlays.length).to.equal(0);
    });
  }
  describe("template only", () => {
    before(async function() {
      this.testEl = document.createElement("div");
      document.body.append(this.testEl);
      render(renderButton(renderTooltip), this.testEl);
      this.el = this.testEl.querySelector("sp-button");
      this.overlays = null;
    });
    after(function() {
      this.testEl.remove();
    });
    opensTooltip();
    closesTooltip();
  });
  describe("with `options`", () => {
    before(async function() {
      this.variant = "positive";
      this.offset = 10;
      this.testEl = document.createElement("div");
      document.body.append(this.testEl);
      render(
        renderButton(renderTooltip, {
          variant: this.variant,
          overlayOptions: {
            offset: this.offset
          }
        }),
        this.testEl
      );
      this.el = this.testEl.querySelector("sp-button");
      this.overlays = null;
    });
    after(function() {
      this.testEl.remove();
    });
    opensTooltip();
    it("passes `options` to the overlay", async function() {
      expect(this.overlays[0].offset).to.equal(this.offset);
      const tooltipEl = this.overlays[0].querySelector(
        "sp-tooltip"
      );
      expect(tooltipEl.variant).to.equal(this.variant);
    });
    closesTooltip();
  });
});
//# sourceMappingURL=tooltip-directive.test.js.map
