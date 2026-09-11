"use strict";
import { cache } from "lit/directives/cache.js";
import {
  elementUpdated,
  expect,
  fixture,
  nextFrame,
  oneEvent
} from "@open-wc/testing";
import { stub } from "sinon";
import { html } from "@spectrum-web-components/base";
import { LitElement } from "@spectrum-web-components/base";
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
            <div id="styled-div">The background of this div should be blue</div>
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
        spyCall.args[0].includes(
          "The Overlay Trigger Directive is experimental"
        ),
        "Overlay Trigger Directive-centric message"
      ).to.be.true;
      expect(
        spyCall.args[spyCall.args.length - 1],
        "confirm `data` shape"
      ).to.deep.equal({
        data: {
          localName: "base",
          type: "api",
          level: "high"
        }
      });
    });
  });
  it("does not throw when directive reconnects before overlay exists", async function() {
    class CachedOverlayTriggerTest extends LitElement {
      constructor() {
        super(...arguments);
        this.show = true;
      }
      render() {
        const cachedButton = html`
          <sp-button
            ${trigger(
          () => html`
                <sp-popover>
                  <sp-dialog no-divider>Cached popover</sp-dialog>
                </sp-popover>
              `,
          { triggerInteraction: "click" }
        )}
          >
            Cached Trigger
          </sp-button>
        `;
        return html`
          <sp-button
            @click=${() => {
          this.show = !this.show;
          this.requestUpdate();
        }}
          >
            Toggle cached host
          </sp-button>
          ${cache(this.show ? cachedButton : html``)}
        `;
      }
    }
    customElements.define(
      "cached-overlay-trigger-test",
      CachedOverlayTriggerTest
    );
    const wrapper = await fixture(html`
      <cached-overlay-trigger-test></cached-overlay-trigger-test>
    `);
    await elementUpdated(wrapper);
    const shadowRoot = wrapper.shadowRoot;
    const toggleButton = shadowRoot.querySelector("sp-button");
    expect(toggleButton).to.exist;
    let cachedTrigger = shadowRoot.querySelectorAll("sp-button")[1];
    expect(cachedTrigger, "cached trigger should exist initially").to.exist;
    toggleButton.click();
    await nextFrame();
    await elementUpdated(wrapper);
    toggleButton.click();
    await nextFrame();
    await elementUpdated(wrapper);
    cachedTrigger = shadowRoot.querySelectorAll("sp-button")[1];
    expect(cachedTrigger, "cached trigger should exist after toggle").to.exist;
    const opened = oneEvent(cachedTrigger, "sp-opened");
    cachedTrigger.click();
    const openedEvent = await opened;
    expect(openedEvent, "sp-opened event should be dispatched").to.exist;
  });
});
//# sourceMappingURL=overlay-trigger-directive.test.js.map
