"use strict";
import {
  elementUpdated,
  expect,
  fixture,
  html,
  nextFrame
} from "@open-wc/testing";
import "@spectrum-web-components/dialog/sp-dialog.js";
import { Dialog } from "@spectrum-web-components/dialog";
import {
  alertError,
  dismissable,
  fullscreen,
  small
} from "../stories/dialog.stories.js";
import { spy } from "sinon";
import { testForLitDevWarnings } from "../../../test/testing-helpers.js";
describe("Dialog", () => {
  testForLitDevWarnings(async () => await fixture(small()));
  it("loads `[size=small]` dialog accessibly", async () => {
    const el = await fixture(small());
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  it("loads `[size=alert]` dialog accessibly", async () => {
    const el = await fixture(alertError());
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  it("loads `[dismissable]` dialog accessibly", async () => {
    const el = await fixture(dismissable());
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  it("loads `[mode=fullscreen]` dialog accessibly", async () => {
    const el = await fixture(fullscreen());
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  it("loads dialog without footer accessibly", async () => {
    const el = await fixture(small());
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  it("does not recycle applied content ids", async () => {
    var _a, _b, _c;
    const el = await fixture(html`
            <sp-dialog size="s">
                <h2 slot="heading">Disclaimer</h2>
            </sp-dialog>
        `);
    await elementUpdated(el);
    await expect(el).to.be.accessible();
    const paragraph = document.createElement("p");
    paragraph.textContent = "Added paragraph.";
    (_a = el.querySelector("p")) == null ? void 0 : _a.remove();
    el.insertAdjacentElement("beforeend", paragraph);
    await nextFrame();
    await elementUpdated(el);
    await expect(el).to.be.accessible();
    (_b = paragraph.querySelector("p")) == null ? void 0 : _b.remove();
    await nextFrame();
    await elementUpdated(el);
    await expect(el).to.be.accessible();
    el.insertAdjacentElement("beforeend", paragraph);
    await nextFrame();
    await elementUpdated(el);
    await expect(el).to.be.accessible();
    const heading = document.createElement("h2");
    heading.slot = "heading";
    heading.textContent = "New heading";
    (_c = el.querySelector("h2")) == null ? void 0 : _c.remove();
    el.insertAdjacentElement("afterbegin", heading);
    await nextFrame();
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  it("closes", async () => {
    const closeSpy = spy();
    const el = await fixture(dismissable());
    el.addEventListener("close", () => closeSpy());
    await elementUpdated(el);
    const closeButton = el.shadowRoot ? el.shadowRoot.querySelector(".close-button") : el.querySelector(".close-button ");
    expect(closeButton.ariaLabel).to.be.equals("Close");
    closeButton.click();
    await elementUpdated(el);
    expect(closeSpy.calledOnce).to.be.true;
  });
  it("allows hero override", async () => {
    class Override extends Dialog {
      get hasHero() {
        return true;
      }
      renderHero() {
        return html`
                    <div id="hero-container"></div>
                `;
      }
    }
    customElements.define("hero-dialog", Override);
    const el = await fixture(html`
            <hero-dialog></hero-dialog>
        `);
    const container = el.shadowRoot.querySelector("#hero-container");
    expect(container).to.not.be.null;
  });
  it("allows heading override", async () => {
    class Override extends Dialog {
      renderHeading() {
        return html`
                    <h2 id="heading-container">Test</h2>
                `;
      }
    }
    customElements.define("heading-dialog", Override);
    const el = await fixture(html`
            <heading-dialog></heading-dialog>
        `);
    const container = el.shadowRoot.querySelector("#heading-container");
    expect(container).to.not.be.null;
  });
  it("allows content override", async () => {
    class Override extends Dialog {
      renderContent() {
        return html`
                    <p id="content-container">Test</p>
                `;
      }
    }
    customElements.define("content-dialog", Override);
    const el = await fixture(html`
            <content-dialog></content-dialog>
        `);
    const container = el.shadowRoot.querySelector("#content-container");
    expect(container).to.not.be.null;
  });
  it("allows footer override", async () => {
    class Override extends Dialog {
      get hasFooter() {
        return true;
      }
      renderFooter() {
        return html`
                    <p id="footer-container">Test</p>
                `;
      }
    }
    customElements.define("footer-dialog", Override);
    const el = await fixture(html`
            <footer-dialog></footer-dialog>
        `);
    const container = el.shadowRoot.querySelector("#footer-container");
    expect(container).to.not.be.null;
  });
  it("allows button override", async () => {
    class Override extends Dialog {
      get hasButtons() {
        return true;
      }
      renderButtons() {
        return html`
                    <p id="button-container">Test</p>
                `;
      }
    }
    customElements.define("button-dialog", Override);
    const el = await fixture(html`
            <button-dialog></button-dialog>
        `);
    const container = el.shadowRoot.querySelector("#button-container");
    expect(container).to.not.be.null;
  });
  it("allows dismiss override", async () => {
    class Override extends Dialog {
      renderDismiss() {
        return html`
                    <p id="dismiss-container">Test</p>
                `;
      }
    }
    customElements.define("dismiss-dialog", Override);
    const el = await fixture(html`
            <dismiss-dialog dismissable></dismiss-dialog>
        `);
    const container = el.shadowRoot.querySelector("#dismiss-container");
    expect(container).to.not.be.null;
  });
});
//# sourceMappingURL=dialog.test.js.map
