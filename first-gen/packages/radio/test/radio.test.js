"use strict";
import "@spectrum-web-components/radio/sp-radio.js";
import {
  elementUpdated,
  expect,
  fixture,
  html,
  triggerBlurFor,
  waitUntil
} from "@open-wc/testing";
import { sendMouse } from "../../../test/plugins/browser.js";
import { sendKeys } from "@web/test-runner-commands";
function labelNodeForRadio(radio) {
  if (!radio.shadowRoot) throw new Error("No shadowRoot");
  const slotEl = radio.shadowRoot.querySelector("slot");
  return slotEl.assignedNodes()[0];
}
describe("Radio", () => {
  let testDiv;
  beforeEach(async () => {
    testDiv = await fixture(
      html`
                <div id="test-radio">
                    <sp-radio value="first" checked>Option 1</sp-radio>
                    <sp-radio value="second">Option 2</sp-radio>
                    <sp-radio value="third" autofocus>Option 3</sp-radio>
                    <sp-radio value="fourth" disabled>Option 4</sp-radio>
                </div>
            `
    );
  });
  it("loads", async () => {
    const el = testDiv.querySelector("sp-radio[value=first]");
    const textNode = labelNodeForRadio(el);
    expect(el).to.not.equal(void 0);
    expect(el.innerText).to.equal("Option 1");
    expect(textNode.textContent).to.equal("Option 1");
  });
  it("loads accessibly", async () => {
    await expect(testDiv).to.be.accessible();
  });
  it("respects checked attribute", () => {
    const el1 = document.querySelector("[value=first]");
    const el2 = testDiv.querySelector("[value=second]");
    expect(el1.checked).to.be.true;
    expect(el2.checked).to.be.false;
  });
  it("handles click events", async () => {
    let value = "";
    let checked = false;
    const el = testDiv.querySelector("[value=third]");
    el.addEventListener("change", (event) => {
      const target = event.target;
      value = target.value;
      checked = target.checked;
    });
    expect(el.checked).to.be.false;
    expect(value).to.equal("");
    expect(checked).to.be.false;
    el.click();
    await elementUpdated(el);
    expect(el.checked).to.be.true;
    expect(value).to.equal("third");
    expect(checked).to.be.true;
  });
  it("autofocuses", async () => {
    const autoElement = testDiv.querySelector(
      "sp-radio[autofocus]"
    );
    expect(autoElement).to.exist;
    await waitUntil(
      () => document.activeElement === autoElement,
      "Autofocused"
    );
    await triggerBlurFor(autoElement);
    expect(document.activeElement).to.not.equal(autoElement);
  });
  it("ensures clicking disabled does not check them", async () => {
    const el = testDiv.querySelector("sp-radio[disabled]");
    expect(el.checked).to.be.false;
    el.click();
    await elementUpdated(el);
    expect(el.checked).to.be.false;
  });
  it("renders [invalid]", async () => {
    const el = await fixture(html`
            <sp-radio invalid>Component</sp-radio>
        `);
    expect(el.getAttribute("aria-invalid")).to.equal("true");
  });
  describe('accepts "clicks"', () => {
    let el;
    beforeEach(async () => {
      el = await fixture(html`
                <sp-radio>Component</sp-radio>
            `);
    });
    it("imperatively", async () => {
      el.click();
      await elementUpdated(el);
      expect(el.checked).to.be.true;
    });
    it("as events", async () => {
      el.dispatchEvent(new Event("click"));
      await elementUpdated(el);
      expect(el.checked).to.be.true;
    });
    it("from the keyboard", async () => {
      el.focus();
      await elementUpdated(el);
      await sendKeys({
        press: "Space"
      });
      await elementUpdated(el);
      expect(el.checked).to.be.true;
    });
    it("imperatively", async () => {
      const boundingClientRecrt = el.getBoundingClientRect();
      const radioPosition = [
        boundingClientRecrt.x + boundingClientRecrt.width / 2,
        boundingClientRecrt.y + boundingClientRecrt.height / 2
      ];
      await sendMouse({
        steps: [
          {
            type: "move",
            position: radioPosition
          },
          {
            type: "down"
          },
          {
            type: "up"
          }
        ]
      });
      await elementUpdated(el);
      expect(el.checked).to.be.true;
    });
  });
  it("maintains its value when [readonly]", async () => {
    const el = await fixture(html`
            <sp-radio checked readonly>Component</sp-radio>
        `);
    expect(el.checked).to.be.true;
    el.click();
    await elementUpdated(el);
    expect(el.checked).to.be.true;
  });
});
//# sourceMappingURL=radio.test.js.map
