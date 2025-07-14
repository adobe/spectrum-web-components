"use strict";
import { elementUpdated, expect, fixture, oneEvent } from "@open-wc/testing";
import { html } from "@spectrum-web-components/base";
import { stub } from "sinon";
import { trigger } from "@spectrum-web-components/overlay/src/overlay-trigger-directive.js";
import "@spectrum-web-components/button/sp-button.js";
import "@spectrum-web-components/popover/sp-popover.js";
import "@spectrum-web-components/dialog/sp-dialog.js";
import "@spectrum-web-components/slider/sp-slider.js";
import "@spectrum-web-components/tooltip/sp-tooltip.js";
describe("Overlay trigger directive", () => {
  describe("dev mode", () => {
    let consoleWarnStub;
    before(() => {
      window.__swc.verbose = true;
      consoleWarnStub = stub(console, "warn");
    });
    afterEach(() => {
      consoleWarnStub.resetHistory();
    });
    after(() => {
      window.__swc.verbose = false;
      consoleWarnStub.restore();
    });
    it("warns that the trigger directive is experimental", async () => {
      const popover = () => html`
                <sp-popover>
                    <sp-dialog no-divider>
                        <sp-slider
                            value="5"
                            step="0.5"
                            min="0"
                            max="20"
                            label="Awesomeness"
                        ></sp-slider>
                        <div id="styled-div">
                            The background of this div should be blue
                        </div>
                        <sp-button>
                            Press Me
                            <sp-tooltip self-managed delayed>
                                Click to open another popover.
                            </sp-tooltip>
                        </sp-button>
                    </sp-dialog>
                </sp-popover>
            `;
      const el = await fixture(html`
                <sp-button ${trigger(popover, { triggerInteraction: "click" })}>
                    Trigger
                </sp-button>
            `);
      await elementUpdated(el);
      const opened = oneEvent(el, "sp-opened");
      el.click();
      await opened;
      expect(consoleWarnStub.called).to.be.true;
      const spyCall = consoleWarnStub.getCall(0);
      expect(
        spyCall.args.at(0).includes(
          "The Overlay Trigger Directive is experimental"
        ),
        "Overlay Trigger Directive-centric message"
      ).to.be.true;
      expect(spyCall.args.at(-1), "confirm `data` shape").to.deep.equal({
        data: {
          localName: "base",
          type: "api",
          level: "high"
        }
      });
    });
  });
});
//# sourceMappingURL=overlay-trigger-directive.test.js.map
