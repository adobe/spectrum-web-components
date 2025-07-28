"use strict";
import "@spectrum-web-components/toast/sp-toast.js";
import { toastVariants } from "@spectrum-web-components/toast";
import {
  elementUpdated,
  expect,
  fixture,
  html,
  nextFrame,
  waitUntil
} from "@open-wc/testing";
import {
  testForLitDevWarnings,
  waitForPredicate
} from "../../../test/testing-helpers.js";
import { spy } from "sinon";
describe("Toast", () => {
  testForLitDevWarnings(
    async () => await fixture(html`
                <sp-toast open>Help text.</sp-toast>
            `)
  );
  it("loads", async () => {
    const el = await fixture(html`
            <sp-toast open>Help text.</sp-toast>
        `);
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  toastVariants.map((variant) => {
    it(`loads - [variant="${variant}"]`, async () => {
      const el = await fixture(html`
                <sp-toast variant=${variant} open>
                    This toast is of the \`${variant}\` variant.
                </sp-toast>
            `);
      await elementUpdated(el);
      await expect(el).to.be.accessible();
    });
  });
  it("loads - timeout", async () => {
    const el = await fixture(html`
            <sp-toast timeout="100">Help text.</sp-toast>
        `);
    await elementUpdated(el);
    expect(el.open).to.be.false;
    el._timeout = 100;
    el.open = true;
    await elementUpdated(el);
    await waitForPredicate(() => el.open === false);
    expect(el.open).to.be.false;
  });
  it("`timeout` updates `countdownStart`", async () => {
    const el = await fixture(html`
            <sp-toast timeout="100">Help text.</sp-toast>
        `);
    await elementUpdated(el);
    expect(el.open).to.be.false;
    const testableEl = el;
    testableEl._timeout = 100;
    el.open = true;
    await elementUpdated(el);
    const firstStart = testableEl.countdownStart;
    await nextFrame();
    await nextFrame();
    await nextFrame();
    el.timeout = 400;
    await elementUpdated(el);
    const secondStart = testableEl.countdownStart;
    expect(secondStart).to.not.equal(firstStart);
    await nextFrame();
    await nextFrame();
    el.timeout = 0;
    await elementUpdated(el);
    const thirdStart = testableEl.countdownStart;
    expect(thirdStart).to.equal(0);
  });
  it("stops timeout on `focusin`", async () => {
    const el = await fixture(html`
            <sp-toast timeout="100">Help text.</sp-toast>
        `);
    await elementUpdated(el);
    const testableEl = el;
    expect(el.open, "not open to start").to.be.false;
    el.open = true;
    await elementUpdated(el);
    await nextFrame();
    expect(testableEl.countdownStart, "initially not 0").to.not.equal(0);
    testableEl._timeout = 100;
    el.dispatchEvent(new FocusEvent("focusin"));
    await elementUpdated(el);
    expect(testableEl.countdownStart, "0 after focusin").to.equal(0);
    el.dispatchEvent(new FocusEvent("focusout"));
    await elementUpdated(el);
    await nextFrame();
    expect(testableEl.countdownStart, "not 0 after focusout").to.not.equal(
      0
    );
    await waitUntil(() => el.open === false, "closes");
    expect(el.open, "not open to end").to.be.false;
  });
  it("closes", async () => {
    const el = await fixture(html`
            <sp-toast open>Help text.</sp-toast>
        `);
    await elementUpdated(el);
    expect(el.open).to.be.true;
    const renderRoot = el.shadowRoot ? el.shadowRoot : el;
    const closeButton = renderRoot.querySelector(
      "sp-close-button"
    );
    closeButton.click();
    await elementUpdated(el);
    expect(el.open).to.be.false;
  });
  it("`close` can be prevented", async () => {
    const handleClose = (event) => event.preventDefault();
    const el = await fixture(html`
            <sp-toast open timeout="100" @close=${handleClose}>
                Help text.
            </sp-toast>
        `);
    await elementUpdated(el);
    expect(el.open).to.be.true;
    const renderRoot = el.shadowRoot ? el.shadowRoot : el;
    const closeButton = renderRoot.querySelector(
      "sp-close-button"
    );
    closeButton.click();
    await elementUpdated(el);
    expect(el.open).to.be.true;
  });
  it("can be a controlled element", async () => {
    const closeSpy = spy();
    const handleClose = (event) => {
      event.preventDefault();
      closeSpy();
    };
    const el = await fixture(html`
            <sp-toast open timeout="100" @close=${handleClose}>
                Help text.
            </sp-toast>
        `);
    await elementUpdated(el);
    expect(el.open).to.be.true;
    expect(closeSpy.callCount).to.equal(0);
    const renderRoot = el.shadowRoot ? el.shadowRoot : el;
    const closeButton = renderRoot.querySelector(
      "sp-close-button"
    );
    closeButton.click();
    await elementUpdated(el);
    expect(el.open).to.be.true;
    expect(closeSpy.callCount).to.equal(1);
    el.open = false;
    await elementUpdated(el);
    expect(el.open).to.be.false;
    expect(closeSpy.callCount).to.equal(1);
  });
  it("validates variants", async () => {
    const el = await fixture(html`
            <sp-toast variant="invalid" open>
                This toast validates variants.
            </sp-toast>
        `);
    await elementUpdated(el);
    expect(el.variant).to.equal("");
    el.variant = toastVariants[0];
    await elementUpdated(el);
    expect(el.variant).to.equal(toastVariants[0]);
    el.variant = toastVariants[0];
    await elementUpdated(el);
    expect(el.variant).to.equal(toastVariants[0]);
  });
  it("maintains [variant] when disconnected/connected", async () => {
    const el = await fixture(html`
            <sp-toast variant="positive" open>
                This toast maintains variants.
            </sp-toast>
        `);
    await elementUpdated(el);
    expect(el.variant).to.equal("positive");
    const parent = el.parentElement;
    el.remove();
    expect(el.variant).to.equal("positive");
    parent.append(el);
    expect(el.variant).to.equal("positive");
  });
  it("reopens", async () => {
    const closeSpy = spy();
    const el = await fixture(html`
            <sp-toast
                variant="positive"
                open
                @close=${() => {
      closeSpy();
    }}
            >
                This toast maintains variants.
            </sp-toast>
        `);
    await elementUpdated(el);
    expect(el.open).to.be.true;
    const closeButton = el.shadowRoot.querySelector(
      "sp-close-button"
    );
    closeButton.click();
    await elementUpdated(el);
    expect(el.open).to.be.false;
    el.open = true;
    await elementUpdated(el);
    expect(el.open).to.be.true;
    expect(closeSpy.callCount).to.equal(1);
  });
  it('sp close button renders with static-color="white"', async () => {
    const el = await fixture(html`
            <sp-toast open>Help text.</sp-toast>
        `);
    const renderRoot = el.shadowRoot ? el.shadowRoot : el;
    const closeButton = renderRoot.querySelector(
      "sp-close-button"
    );
    expect(closeButton).to.exist;
    expect(closeButton.getAttribute("static-color")).to.equal("white");
  });
});
//# sourceMappingURL=toast.test.js.map
