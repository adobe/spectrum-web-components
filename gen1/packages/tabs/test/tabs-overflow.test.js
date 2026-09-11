"use strict";
import { ifDefined } from "lit/directives/if-defined.js";
import { repeat } from "lit/directives/repeat.js";
import {
  elementUpdated,
  expect,
  fixture,
  nextFrame,
  oneEvent,
  waitUntil
} from "@open-wc/testing";
import { sendKeys, setViewport } from "@web/test-runner-commands";
import {
  ElementSizes,
  html,
  nothing
} from "@spectrum-web-components/base";
import {
  isFirefox,
  isWebKit
} from "@spectrum-web-components/shared/src/platform.js";
import {
  calculateScrollTargetForLeftSide,
  calculateScrollTargetForRightSide
} from "@spectrum-web-components/tabs";
import "@spectrum-web-components/tabs/sp-tab-panel.js";
import "@spectrum-web-components/tabs/sp-tab.js";
import "@spectrum-web-components/tabs/sp-tabs-overflow.js";
import "@spectrum-web-components/tabs/sp-tabs.js";
import "@spectrum-web-components/theme/scale-medium.js";
import "@spectrum-web-components/theme/sp-theme.js";
import "@spectrum-web-components/theme/theme-light.js";
const RIGHT_BUTTON_SELECTOR = ".right-scroll";
const LEFT_BUTTON_SELECTOR = ".left-scroll";
const renderTabsOverflow = async ({
  count,
  size,
  includeTabPanel,
  selected = 1,
  labelPrev,
  labelNext,
  dir = "ltr"
}) => {
  const theme = await fixture(html`
    <sp-theme dir=${dir} system="spectrum" scale="medium" color="light">
      <div class="container" style="width: 200px; height: 150px;">
        <sp-tabs-overflow
          label-previous=${ifDefined(labelPrev)}
          label-next=${ifDefined(labelNext)}
        >
          <sp-tabs .size=${size} selected=${selected}>
            ${repeat(
    new Array(count),
    (item) => item,
    (_item, index) => html`
                <sp-tab
                  label=${`Tab Item ${index + 1}`}
                  value=${index + 1}
                ></sp-tab>
              `
  )}
            ${includeTabPanel ? html`
                  ${repeat(
    new Array(count),
    (item) => item,
    (_item, index) => html`
                      <sp-tab-panel value=${index + 1}>
                        Content for Tab Item ${index + 1}
                      </sp-tab-panel>
                    `
  )}
                ` : nothing}
          </sp-tabs>
        </sp-tabs-overflow>
      </div>
    </sp-theme>
  `);
  await elementUpdated(theme);
  const tabsContainer = theme.querySelector(".container");
  const tabsOverflow = theme.querySelector("sp-tabs-overflow");
  const tabs = tabsOverflow.querySelector("sp-tabs");
  const tabsList = tabs.shadowRoot.querySelector("#list");
  const leftButton = tabsOverflow.shadowRoot.querySelector(
    ".left-scroll"
  );
  const rightButton = tabsOverflow.shadowRoot.querySelector(
    ".right-scroll"
  );
  return {
    tabsContainer,
    tabsOverflow,
    tabs,
    tabsList,
    leftButton,
    rightButton
  };
};
describe("TabsOverflow", () => {
  it("loads default tabs-overflow accessibly", async () => {
    const { tabsOverflow } = await renderTabsOverflow({
      count: 20,
      size: ElementSizes.L,
      includeTabPanel: true
    });
    await elementUpdated(tabsOverflow);
    await expect(tabsOverflow).to.be.accessible();
  });
  it("show render left and right buttons in shadowDom", async () => {
    const { leftButton, rightButton } = await renderTabsOverflow({
      count: 20,
      size: ElementSizes.L,
      includeTabPanel: true
    });
    expect(rightButton).to.exist;
    expect(leftButton).to.exist;
  });
  it("reflect proper sp-tab size", async () => {
    const { tabsOverflow } = await renderTabsOverflow({
      count: 20,
      size: ElementSizes.M,
      includeTabPanel: true
    });
    expect(tabsOverflow.getAttribute("size")).to.equal("m");
  });
  it("should scroll when the button is clicked", async () => {
    const { tabsOverflow, tabs, leftButton, rightButton } = await renderTabsOverflow({
      count: 20,
      size: ElementSizes.L,
      includeTabPanel: true
    });
    await elementUpdated(tabsOverflow);
    let click = oneEvent(leftButton, "click");
    leftButton.click();
    await click;
    const tabsEl = tabs.querySelector("sp-tab");
    const initialLeft = tabsEl.getBoundingClientRect().left;
    click = oneEvent(rightButton, "click");
    rightButton.click();
    await click;
    await elementUpdated(tabsOverflow);
    click = oneEvent(rightButton, "click");
    rightButton.click();
    await click;
    await elementUpdated(tabsOverflow);
    click = oneEvent(rightButton, "click");
    rightButton.click();
    await click;
    await elementUpdated(tabsOverflow);
    const finalLeft = tabsEl.getBoundingClientRect().left;
    expect(finalLeft).to.be.lessThanOrEqual(initialLeft);
  });
  it("should scroll up to the last item and back in LTR", async () => {
    if (isFirefox() || isWebKit()) {
      return;
    }
    const { tabsContainer, tabsOverflow } = await renderTabsOverflow({
      count: 8,
      size: ElementSizes.L,
      includeTabPanel: true,
      dir: "ltr"
    });
    await elementUpdated(tabsOverflow);
    await setViewport({ width: 360, height: 640 });
    await nextFrame();
    expect(tabsOverflow["overflowState"].canScrollLeft, "initial: scroll left").to.be.false;
    expect(
      tabsOverflow["overflowState"].canScrollRight,
      "initial: scroll right"
    ).to.be.true;
    await scrollToEnd(tabsContainer, RIGHT_BUTTON_SELECTOR, "ltr");
    expect(tabsOverflow["overflowState"].canScrollLeft, "after: scroll left").to.be.true;
    expect(tabsOverflow["overflowState"].canScrollRight, "after: scroll right").to.be.false;
    await scrollToEnd(tabsContainer, LEFT_BUTTON_SELECTOR, "ltr");
    expect(tabsOverflow["overflowState"].canScrollLeft, "end: scroll left").to.be.false;
    expect(tabsOverflow["overflowState"].canScrollRight, "end: scroll right").to.be.true;
  });
  it.skip("should scroll up to the last item and back in RTL", async () => {
    if (isFirefox()) {
      return;
    }
    const { tabsContainer, tabsOverflow } = await renderTabsOverflow({
      count: 8,
      size: ElementSizes.L,
      includeTabPanel: true,
      dir: "rtl"
    });
    await elementUpdated(tabsOverflow);
    await setViewport({ width: 360, height: 640 });
    await nextFrame();
    expect(tabsOverflow["overflowState"].canScrollLeft).to.be.true;
    expect(tabsOverflow["overflowState"].canScrollRight).to.be.false;
    await scrollToEnd(tabsContainer, LEFT_BUTTON_SELECTOR, "rtl");
    expect(tabsOverflow["overflowState"].canScrollLeft).to.be.false;
    expect(tabsOverflow["overflowState"].canScrollRight).to.be.true;
    await scrollToEnd(tabsContainer, RIGHT_BUTTON_SELECTOR, "rtl");
    expect(tabsOverflow["overflowState"].canScrollLeft).to.be.true;
    expect(tabsOverflow["overflowState"].canScrollRight).to.be.false;
  });
  it("should fail properly if slot is not sp-tabs", async () => {
    const el = await fixture(html`
      <sp-tabs-overflow>
        <div>Some div</div>
      </sp-tabs-overflow>
    `);
    await elementUpdated(el);
    const slot = el.shadowRoot.querySelector("slot");
    const slotContent = (slot == null ? void 0 : slot.assignedElements()) || "";
    expect(slotContent[0].toString()).to.not.contains("Tabs");
  });
  it("should automatically bring the selected tab into view", async () => {
    const { tabs } = await renderTabsOverflow({
      count: 20,
      size: ElementSizes.L,
      includeTabPanel: false,
      selected: 10
    });
    await elementUpdated(tabs);
    let selectedTab = tabs.querySelector(`[role="tab"][value="10"]`);
    expect(selectedTab).to.exist;
    let selectedTabPosition = selectedTab.getBoundingClientRect();
    expect(selectedTabPosition.left).to.be.greaterThan(0);
    expect(selectedTabPosition.left).to.be.lessThan(tabs.offsetWidth);
    const firstTab = tabs.querySelector(`[role="tab"][value="1"]`);
    const firstTabPosition = firstTab.getBoundingClientRect();
    expect(firstTabPosition.left).to.be.lessThan(0);
    tabs.selected = "1";
    await elementUpdated(tabs);
    selectedTab = tabs.querySelector(`[role="tab"][value="1"]`);
    expect(selectedTab).to.exist;
    selectedTabPosition = selectedTab.getBoundingClientRect();
    expect(selectedTabPosition.left).to.be.greaterThan(0);
    expect(selectedTabPosition.left).to.be.lessThan(tabs.offsetWidth);
    const previousSelection = tabs.querySelector(
      `[role="tab"][value="10"]`
    );
    const previousSelectionPosition = previousSelection.getBoundingClientRect();
    expect(previousSelectionPosition.left).to.be.greaterThan(tabs.offsetWidth);
  });
  it("prev and next buttons have default labels", async () => {
    const { tabsOverflow, leftButton, rightButton } = await renderTabsOverflow({
      count: 20,
      size: ElementSizes.M,
      includeTabPanel: true
    });
    await elementUpdated(tabsOverflow);
    expect(leftButton == null ? void 0 : leftButton.getAttribute("aria-label")).to.equal(
      "Scroll to previous tabs"
    );
    expect(rightButton == null ? void 0 : rightButton.getAttribute("aria-label")).to.equal(
      "Scroll to next tabs"
    );
  });
  it("prev and next buttons labels overwritten via attributes", async () => {
    const { tabsOverflow, leftButton, rightButton } = await renderTabsOverflow({
      count: 20,
      size: ElementSizes.M,
      includeTabPanel: true,
      labelPrev: "custom label prev",
      labelNext: "custom label next"
    });
    await elementUpdated(tabsOverflow);
    expect(leftButton == null ? void 0 : leftButton.getAttribute("aria-label")).to.equal(
      "custom label prev"
    );
    expect(rightButton == null ? void 0 : rightButton.getAttribute("aria-label")).to.equal(
      "custom label next"
    );
  });
});
describe("calculateScrollTargetForRightSide", () => {
  const container = { offsetWidth: 100, scrollLeft: 0 };
  const tabs = [
    { offsetLeft: 0, offsetWidth: 100 },
    // currently selected tab
    { offsetLeft: 100, offsetWidth: 100 },
    { offsetLeft: 200, offsetWidth: 100 }
  ];
  it("correctly aligns tab on the right side of the viewport", () => {
    expect(
      calculateScrollTargetForRightSide(2, "ltr", tabs, container)
    ).to.equal(100);
    expect(
      calculateScrollTargetForRightSide(2, "rtl", tabs, container)
    ).to.equal(0);
  });
});
describe("calculateScrollTargetForLeftSide", () => {
  const container = { offsetWidth: 100, scrollLeft: 200 };
  const tabs = [
    { offsetLeft: -200, offsetWidth: 100 },
    { offsetLeft: -100, offsetWidth: 100 },
    { offsetLeft: 0, offsetWidth: 100 }
    // currently selected tab
  ];
  it("correctly aligns tab on the left side of the viewport", () => {
    expect(
      calculateScrollTargetForLeftSide(1, "ltr", tabs, container)
    ).to.equal(-100);
    expect(
      calculateScrollTargetForLeftSide(0, "ltr", tabs, container)
    ).to.equal(0);
    expect(
      calculateScrollTargetForLeftSide(1, "rtl", tabs, container)
    ).to.equal(100);
    expect(
      calculateScrollTargetForLeftSide(0, "rtl", tabs, container)
    ).to.equal(0);
  });
});
async function repeatScroll(options, iteration = 1) {
  const {
    times,
    elementToUpdate,
    elementToScroll,
    distanceToReachInIteration
  } = options;
  if (iteration > times) {
    return;
  }
  const distanceToReach = distanceToReachInIteration(iteration);
  await sendKeys({ press: "Enter" });
  await elementUpdated(elementToUpdate);
  await waitUntil(
    () => Math.ceil(Math.abs(elementToScroll.scrollLeft)) - Math.abs(distanceToReach) === 0,
    `scroll to ${distanceToReach}`
  );
  return await repeatScroll(options, iteration + 1);
}
async function scrollToEnd(tabsContainer, buttonSelector, direction = "ltr") {
  const tabs = tabsContainer.querySelector("sp-tabs");
  const tabsList = tabs.shadowRoot.querySelector("#list");
  const tabsOverflow = tabsContainer.querySelector(
    "sp-tabs-overflow"
  );
  const button = tabsOverflow.shadowRoot.querySelector(
    buttonSelector
  );
  const { scrollWidth, clientWidth } = tabsList;
  const distPerScroll = clientWidth * tabsOverflow["scrollFactor"];
  const totalScrollDist = scrollWidth - clientWidth;
  const scrollsToEnd = Math.ceil(totalScrollDist / distPerScroll);
  let distanceToReachInIteration;
  if (direction === "ltr") {
    distanceToReachInIteration = buttonSelector === LEFT_BUTTON_SELECTOR ? (iteration) => Math.max(totalScrollDist - iteration * distPerScroll, 0) : (iteration) => Math.min(iteration * distPerScroll, totalScrollDist);
  } else {
    distanceToReachInIteration = buttonSelector === LEFT_BUTTON_SELECTOR ? (iteration) => Math.max(-1 * iteration * distPerScroll, -totalScrollDist) : (iteration) => -Math.max(totalScrollDist - iteration * distPerScroll, 0);
  }
  button.focus();
  return await repeatScroll({
    times: scrollsToEnd,
    elementToUpdate: tabsOverflow,
    elementToScroll: tabsList,
    distanceToReachInIteration
  });
}
//# sourceMappingURL=tabs-overflow.test.js.map
