"use strict";
import {
  elementUpdated,
  expect,
  fixture,
  html,
  nextFrame
} from "@open-wc/testing";
import { testForLitDevWarnings } from "../../../test/testing-helpers.js";
import "@spectrum-web-components/coachmark/sp-coachmark.js";
import "@spectrum-web-components/coachmark/sp-coach-indicator.js";
import "@spectrum-web-components/overlay/sp-overlay.js";
import { spy } from "sinon";
import {
  Default,
  InTour,
  single,
  withImage,
  withKeys,
  withShortCut
} from "../stories/coachmark.stories.js";
const defaultItem = {
  heading: "I am the heading for Coachmark",
  content: "I am the content for this Coachmark"
};
describe("Coachmark", () => {
  testForLitDevWarnings(
    async () => await fixture(
      html`
                    <sp-coachmark
                        id="coachmark"
                        .content=${{
        title: defaultItem.heading,
        description: defaultItem.content
      }}
                    ></sp-coachmark>
                `
    )
  );
  it("loads default coachmark accessibly", async () => {
    const el = await fixture(Default());
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  it("displays the slotted content as `.title`", async () => {
    const testHeading = "Coachmark with Text Only";
    const el = await fixture(Default());
    await elementUpdated(el);
    const root = el.shadowRoot ? el.shadowRoot : el;
    const headingSlot = root.querySelector(
      '[name="title"]'
    );
    expect(headingSlot, "did not find slot element").to.not.be.null;
    const nodes = headingSlot.assignedNodes();
    const divElement = nodes.find(
      (node) => node.id === "heading"
    );
    expect(divElement, "did not find div element").to.not.be.null;
    expect(divElement.textContent).to.contain(
      testHeading,
      "the slotted content renders in the element"
    );
  });
  it("if in tour coachmark loads with pagination with previous, next buttons and action menu", async () => {
    var _a, _b, _c;
    const el = await fixture(
      InTour(
        {
          open: true,
          heading: "Coachmark In Tour",
          content: "This is a Coachmark with nothing but text in it."
        },
        {}
      )
    );
    await elementUpdated(el);
    await nextFrame();
    await nextFrame();
    const stepCount = el.shadowRoot.querySelector(
      'span[aria-live="polite"]'
    );
    const stepCountSlot = el.querySelector(
      '[slot="step-count"]'
    );
    expect((_a = stepCountSlot == null ? void 0 : stepCountSlot.textContent) == null ? void 0 : _a.trim()).to.equal("2 of 8");
    expect(stepCount == null ? void 0 : stepCount.textContent);
    const nextButton = el.shadowRoot.querySelector(
      'sp-button[variant="primary"'
    );
    expect(nextButton).to.not.be.undefined;
    expect((_b = nextButton == null ? void 0 : nextButton.textContent) == null ? void 0 : _b.trim()).to.equal("Next");
    const prevButton = el.shadowRoot.querySelector(
      'sp-button[variant="secondary"'
    );
    expect(prevButton).to.not.be.undefined;
    expect((_c = prevButton == null ? void 0 : prevButton.textContent) == null ? void 0 : _c.trim()).to.equal("Previous");
  });
  it("loads pagination when total step count is greater than 1", async () => {
    var _a;
    const el = await fixture(
      InTour(
        {
          open: true,
          heading: "Coachmark In Tour",
          content: "This is a Coachmark with nothing but text in it.",
          currentStep: 2,
          totalSteps: 8
        },
        {}
      )
    );
    await elementUpdated(el);
    const stepCountSlot = el.querySelector(
      '[slot="step-count"]'
    );
    expect((_a = stepCountSlot == null ? void 0 : stepCountSlot.textContent) == null ? void 0 : _a.trim()).to.equal("2 of 8");
    await expect(el).to.be.accessible();
  });
  it('loads primary button with text "Ok" for a single coachmark', async () => {
    var _a;
    const el = await fixture(single());
    await elementUpdated(el);
    const okayButton = el.shadowRoot.querySelector(
      'sp-button[variant="primary"'
    );
    expect(okayButton).to.not.be.null;
    expect((_a = okayButton == null ? void 0 : okayButton.textContent) == null ? void 0 : _a.trim()).to.equal("Ok");
  });
  it("renders modifier keys with joiner", async () => {
    var _a, _b;
    const modifierKeys = ["\u21E7 Shift", "\u2318"];
    const el = await fixture(
      withKeys({
        modifierKeys,
        heading: "Coachmark with Keys",
        content: "This is a Coachmark with nothing but text in it."
      })
    );
    await elementUpdated(el);
    const modifier = el.shadowRoot.querySelector('span[type="modifier"]');
    expect(modifier).to.not.be.undefined;
    expect((_a = modifier == null ? void 0 : modifier.textContent) == null ? void 0 : _a.trim()).to.include("\u21E7 Shift");
    const joiner = el.shadowRoot.querySelector('span[class="plus"]');
    expect(joiner).to.not.be.undefined;
    expect((_b = joiner == null ? void 0 : joiner.textContent) == null ? void 0 : _b.trim()).to.include("+");
  });
  it("renders with shortcut", async () => {
    var _a;
    const el = await fixture(
      withShortCut({
        currentStep: 1,
        totalSteps: 8
      })
    );
    await elementUpdated(el);
    const shortcutKey = el.shadowRoot.querySelector(
      'span[type="shortcut"]'
    );
    expect(shortcutKey).to.not.be.undefined;
    expect((_a = shortcutKey == null ? void 0 : shortcutKey.textContent) == null ? void 0 : _a.trim()).to.include("Z");
  });
  it("renders content with image asset", async () => {
    const el = await fixture(
      withImage({
        currentStep: 1,
        totalSteps: 8
      })
    );
    await elementUpdated(el);
    const imageElement = el.shadowRoot.querySelector(
      'img[src="https://picsum.photos/id/237/200/300"'
    );
    expect(imageElement).not.to.be.undefined;
  });
  it("in tour dispatches `primary` and `secondary`", async () => {
    const primarySpy = spy();
    const secondarySpy = spy();
    const handlePrimary = () => primarySpy();
    const handleSecondary = () => secondarySpy();
    const el = await fixture(
      InTour(
        {
          open: true,
          heading: "Coachmark in Tour",
          content: "This is a Coachmark with nothing but text in it."
        },
        {}
      )
    );
    el.addEventListener("primary", handlePrimary);
    el.addEventListener("secondary", handleSecondary);
    await elementUpdated(el);
    expect(primarySpy.called).to.be.false;
    expect(secondarySpy.called).to.be.false;
    const primaryButton = el.shadowRoot.querySelector(
      '[variant="primary"]'
    );
    const secondaryButton = el.shadowRoot.querySelector(
      '[variant="secondary"]'
    );
    primaryButton.click();
    await elementUpdated(el);
    expect(primarySpy.called, "dispatched `primary`").to.be.true;
    expect(secondarySpy.called).to.be.false;
    secondaryButton.click();
    await elementUpdated(el);
    expect(primarySpy.callCount).to.equal(1);
    expect(secondarySpy.called, "dispatched `secondary`").to.be.true;
  });
});
//# sourceMappingURL=coachmark.test.js.map
