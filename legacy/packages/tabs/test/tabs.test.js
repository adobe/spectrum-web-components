"use strict";
import "@spectrum-web-components/tabs/sp-tabs.js";
import "@spectrum-web-components/tabs/sp-tab.js";
import "@spectrum-web-components/tabs/sp-tab-panel.js";
import { Tab } from "@spectrum-web-components/tabs";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-checkmark.js";
import {
  elementUpdated,
  expect,
  fixture,
  nextFrame,
  waitUntil
} from "@open-wc/testing";
import { html } from "lit/static-html.js";
import { LitElement } from "@spectrum-web-components/base";
import {
  arrowDownEvent,
  arrowLeftEvent,
  arrowRightEvent,
  arrowUpEvent,
  enterEvent,
  spaceEvent
} from "../../../test/testing-helpers.js";
import { sendKeys } from "@web/test-runner-commands";
const createTabs = async () => {
  const tabs = await fixture(html`
        <sp-tabs selected="first">
            <sp-tab label="Tab 1" value="first"></sp-tab>
            <sp-tab label="Tab 2" value="second"></sp-tab>
            <sp-tab label="Tab 3" value="third"></sp-tab>
            <sp-tab-panel value="first">First tab content</sp-tab-panel>
            <sp-tab-panel value="second">Second tab content</sp-tab-panel>
            <sp-tab-panel value="third">Third tab content</sp-tab-panel>
        </sp-tabs>
    `);
  await elementUpdated(tabs);
  return tabs;
};
describe("Tabs", () => {
  it("loads accessibly", async () => {
    const tabs = await createTabs();
    const tabList = tabs.querySelectorAll("sp-tab");
    expect(tabList).to.exist;
    expect(tabList.length).to.equal(3);
    await expect(tabs).to.be.accessible();
  });
  it("loads accessibly w/o panels", async () => {
    const tabs = await fixture(html`
            <sp-tabs selected="first">
                <sp-tab value="first">Tab 1</sp-tab>
                <sp-tab value="second">Tab 2</sp-tab>
                <sp-tab value="third">Tab 3</sp-tab>
            </sp-tabs>
        `);
    const tabList = tabs.querySelectorAll("sp-tab");
    expect(tabList).to.exist;
    expect(tabList.length).to.equal(3);
    await expect(tabs).to.be.accessible();
  });
  it("can be disabled", async () => {
    const tabs = await createTabs();
    const tab = tabs.querySelector('[label="Tab 3"]');
    tabs.disabled = true;
    await elementUpdated(tabs);
    expect(tabs.selected).to.equal("first");
    tab.click();
    await elementUpdated(tabs);
    expect(tabs.selected).to.equal("first");
  });
  it("can have disabled state set to true and then to false", async () => {
    const tabs = await createTabs();
    tabs.disabled = true;
    await elementUpdated(tabs);
    expect(tabs.selected).to.equal("first");
    const selectedTab = tabs.querySelector("sp-tab[selected]");
    expect(selectedTab.disabled).to.be.true;
    const anotherTab = tabs.querySelector('[label="Tab 3"]');
    anotherTab.click();
    await elementUpdated(tabs);
    expect(tabs.selected).to.equal("first");
    tabs.disabled = false;
    await elementUpdated(tabs);
    expect(tabs.selected).to.equal("first");
    expect(selectedTab.disabled).to.be.false;
  });
  it("can have disabled sp-tab children", async () => {
    const tabs = await createTabs();
    const tab2 = tabs.querySelector('[label="Tab 2"]');
    const tab3 = tabs.querySelector('[label="Tab 3"]');
    tab3.disabled = true;
    await elementUpdated(tab3);
    expect(tabs.selected).to.equal("first");
    tab3.click();
    await elementUpdated(tabs);
    expect(tabs.selected).to.equal("first");
    tab2.click();
    await elementUpdated(tabs);
    expect(tabs.selected).to.equal("second");
  });
  it("reflects selected tab with selected property", async () => {
    const tabs = await createTabs();
    const firstTab = tabs.querySelector("sp-tab[value=first]");
    const secondTab = tabs.querySelector("sp-tab[value=second]");
    const thirdTab = tabs.querySelector("sp-tab[value=third]");
    const firstPanel = tabs.querySelector(
      "sp-tab-panel[value=first]"
    );
    const secondPanel = tabs.querySelector(
      "sp-tab-panel[value=second]"
    );
    const thirdPanel = tabs.querySelector(
      "sp-tab-panel[value=third]"
    );
    expect(firstTab.selected, "first: 1, selected").to.be.true;
    expect(firstPanel.selected, "first panel: 1, selected").to.be.true;
    expect(secondTab.selected, "second: 1, not selected").to.be.false;
    expect(secondPanel.selected, "second panel: 1, not selected").to.be.false;
    expect(thirdTab.selected, "third: 1, not selected").to.be.false;
    expect(thirdPanel.selected, "third panel: 1, not selected").to.be.false;
    expect(tabs.selected).to.equal(firstTab.value);
    secondTab.click();
    await elementUpdated(tabs);
    expect(firstTab.selected, "first: 2, not selected").to.be.false;
    expect(firstPanel.selected, "first panel: 2, not selected").to.be.false;
    expect(secondTab.selected, "second: 2, selected").to.be.true;
    expect(secondTab.selected, "first panel: 2, selected").to.be.true;
    expect(thirdTab.selected, "third: 2, not selected").to.be.false;
    expect(thirdTab.selected, "first panel: 2, not selected").to.be.false;
    expect(tabs.selected).to.equal(secondTab.value);
    thirdTab.click();
    await elementUpdated(tabs);
    expect(firstTab.selected, "first: 3, not selected").to.be.false;
    expect(firstPanel.selected, "first panel: 3, not selected").to.be.false;
    expect(secondTab.selected, "second: 3, not selected").to.be.false;
    expect(secondPanel.selected, "second panel: 3, not selected").to.be.false;
    expect(thirdTab.selected, "third: 3, selected").to.be.true;
    expect(thirdTab.selected, "first panel: 3, selected").to.be.true;
    expect(tabs.selected).to.equal(thirdTab.value);
  });
  it("autofocuses", async () => {
    const tabs = await fixture(html`
            <sp-tabs selected="second" autofocus>
                <sp-tab label="Tab 1" value="first"></sp-tab>
                <sp-tab label="Tab 2" value="second"></sp-tab>
                <sp-tab label="Tab 3" value="third"></sp-tab>
            </sp-tabs>
        `);
    await elementUpdated(tabs);
    const autoElement = tabs.querySelector('[label="Tab 2"]');
    await waitUntil(
      () => document.activeElement === autoElement,
      "Autofocused"
    );
  });
  it("auto", async () => {
    const el = await fixture(html`
            <sp-tabs selected="second" auto>
                <sp-tab label="Tab 1" value="first"></sp-tab>
                <sp-tab label="Tab 2" value="second"></sp-tab>
                <sp-tab label="Tab 3" value="third"></sp-tab>
            </sp-tabs>
        `);
    await elementUpdated(el);
    expect(el.selected).to.equal("second");
    el.focus();
    await sendKeys({
      press: "ArrowLeft"
    });
    expect(el.selected).to.equal("first");
    await sendKeys({
      press: "ArrowLeft"
    });
    expect(el.selected).to.equal("third");
    await sendKeys({
      press: "ArrowRight"
    });
    expect(el.selected).to.equal("first");
  });
  it("forces only one tab to be selected", async () => {
    const tabs = await createTabs();
    const selectedTabs = tabs.querySelectorAll("sp-tab[selected]");
    expect(tabs.selected).to.equal("first");
    expect(selectedTabs.length).to.equal(1);
  });
  it("de-selects all but first selected tab if multiple selected", async () => {
    const tabs = await createTabs();
    const tab1 = tabs.querySelector("sp-tab[value=first]");
    const tab2 = tabs.querySelector("sp-tab[value=second]");
    if (!(tab1 instanceof Tab)) throw new Error("tab1 not of type Tab");
    if (!(tab2 instanceof Tab)) throw new Error("tab2 not of type Tab");
    expect(tabs.selected).to.equal("first");
    expect(tab1.selected).to.be.true;
    expect(tab2.selected).to.be.false;
  });
  it("ensures setting selection updates selected tab", async () => {
    const tabs = await createTabs();
    const tab1 = tabs.querySelector("sp-tab[value=first]");
    const tab2 = tabs.querySelector("sp-tab[value=second]");
    const tab3 = tabs.querySelector("sp-tab[value=third]");
    if (!(tab1 instanceof Tab)) throw new Error("tab1 not of type Tab");
    if (!(tab2 instanceof Tab)) throw new Error("tab2 not of type Tab");
    if (!(tab3 instanceof Tab)) throw new Error("tab3 not of type Tab");
    expect(tabs.selected).to.equal("first");
    expect(tab1.selected, "first: 1, selected").to.be.true;
    expect(tab2.selected, "second: 1, not selected").to.be.false;
    expect(tab3.selected, "thurd: 1, not selected").to.be.false;
    tabs.selected = "second";
    await elementUpdated(tabs);
    expect(tabs.selected).to.equal("second");
    expect(tab1.selected, "first: 2, not selected").to.be.false;
    expect(tab2.selected, "second: 2, selected").to.be.true;
    expect(tab3.selected, "third: 2, not selected").to.be.false;
    tabs.selected = "third";
    await elementUpdated(tabs);
    expect(tabs.selected).to.equal("third");
    expect(tab1.selected, "first: 3, not selected").to.be.false;
    expect(tab2.selected, "second: 3, not selected").to.be.false;
    expect(tab3.selected, "third: 3, selected").to.be.true;
  });
  it("ensures setting selected and clicking on tab both work together", async () => {
    const tabs = await createTabs();
    const tab1 = tabs.querySelector("sp-tab[value=first]");
    const tab2 = tabs.querySelector("sp-tab[value=second]");
    const tab3 = tabs.querySelector("sp-tab[value=third]");
    if (!(tab1 instanceof Tab)) throw new Error("tab1 not of type Tab");
    if (!(tab2 instanceof Tab)) throw new Error("tab2 not of type Tab");
    if (!(tab3 instanceof Tab)) throw new Error("tab3 not of type Tab");
    tab2.click();
    await elementUpdated(tabs);
    expect(tabs.selected).to.equal("second");
    expect(tab1.selected).to.be.false;
    expect(tab2.selected).to.be.true;
    expect(tab3.selected).to.be.false;
    tabs.selected = "first";
    await elementUpdated(tabs);
    expect(tabs.selected).to.equal("first");
    expect(tab1.selected).to.be.true;
    expect(tab2.selected).to.be.false;
    expect(tab3.selected).to.be.false;
  });
  it("displays `vertical`", async () => {
    const el = await fixture(html`
            <sp-tabs selected="first" direction="vertical">
                <sp-tab label="Tab 1" value="first"></sp-tab>
                <sp-tab label="Tab 2" value="second"></sp-tab>
                <sp-tab label="Tab 3" value="third"></sp-tab>
            </sp-tabs>
        `);
    await elementUpdated(el);
    expect(el.selected).to.be.equal("first");
    el.selected = "first";
    await elementUpdated(el);
    expect(el.selected).to.be.equal("first");
  });
  it("displays with nothing `selected`", async () => {
    const el = await fixture(html`
            <sp-tabs>
                <sp-tab label="Tab 1" value="first"></sp-tab>
                <sp-tab label="Tab 2" value="second"></sp-tab>
                <sp-tab label="Tab 3" value="third"></sp-tab>
            </sp-tabs>
        `);
    await elementUpdated(el);
    expect(el.selected).to.be.equal("");
    el.selected = "first";
    await elementUpdated(el);
    expect(el.selected).to.be.equal("first");
  });
  it("ignores children with no `value`", async () => {
    const el = await fixture(html`
            <sp-tabs selected="first">
                <sp-tab label="Tab 1" value="first"></sp-tab>
                <div id="other">Other thing</div>
            </sp-tabs>
        `);
    await elementUpdated(el);
    expect(el.selected).to.be.equal("first");
    const otherThing = el.querySelector("#other");
    otherThing.click();
    await elementUpdated(el);
    expect(el.selected).to.be.equal("first");
  });
  it("allows selection to be cancellable", async () => {
    const cancelSelection = (event) => event.preventDefault();
    const el = await fixture(html`
            <sp-tabs selected="first" @change=${cancelSelection}>
                <sp-tab label="Tab 1" value="first"></sp-tab>
                <sp-tab label="Tab 2" value="second"></sp-tab>
            </sp-tabs>
        `);
    await elementUpdated(el);
    expect(el.selected).to.be.equal("first");
    const secondTab = el.querySelector('[value="second"]');
    secondTab.click();
    await elementUpdated(el);
    expect(el.selected).to.be.equal("first");
  });
  it("accepts keyboard based selection", async () => {
    const el = await fixture(html`
            <sp-tabs selected="Unknown">
                <sp-tab label="Tab 1" value="first">
                    <sp-icon-checkmark slot="icon"></sp-icon-checkmark>
                </sp-tab>
                <sp-tab label="Tab 2" value="second">
                    <sp-icon-checkmark slot="icon"></sp-icon-checkmark>
                </sp-tab>
            </sp-tabs>
        `);
    await elementUpdated(el);
    expect(el.selected).to.be.equal("");
    const firstTab = el.querySelector('[value="first"]');
    const secondTab = el.querySelector('[value="second"]');
    firstTab.dispatchEvent(new FocusEvent("focusin", { bubbles: true }));
    firstTab.focus();
    await elementUpdated(el);
    expect(document.activeElement === firstTab, "Focus first tab").to.be.true;
    firstTab.dispatchEvent(arrowLeftEvent());
    await elementUpdated(el);
    expect(document.activeElement === secondTab, "Focus second tab").to.be.true;
    secondTab.dispatchEvent(enterEvent());
    await elementUpdated(el);
    expect(el.selected).to.be.equal("second");
    secondTab.dispatchEvent(arrowRightEvent());
    await elementUpdated(el);
    expect(document.activeElement === firstTab, "Focus first tab").to.be.true;
    firstTab.dispatchEvent(spaceEvent());
    await elementUpdated(el);
    expect(el.selected).to.be.equal("first");
    firstTab.dispatchEvent(arrowUpEvent());
    await elementUpdated(el);
    expect(document.activeElement === secondTab, "Focus second tab").to.be.true;
    secondTab.dispatchEvent(arrowDownEvent());
    await elementUpdated(el);
    expect(document.activeElement === firstTab, "Focus first tab").to.be.true;
  });
  it("accepts keyboard based selection through shadow DOM", async () => {
    class TabTestEl extends LitElement {
      render() {
        return html`
                    <sp-tabs selected="Unknown">
                        <sp-tab label="Tab 1" value="first">
                            <sp-icon-checkmark slot="icon"></sp-icon-checkmark>
                        </sp-tab>
                        <sp-tab label="Tab 2" value="second">
                            <sp-icon-checkmark slot="icon"></sp-icon-checkmark>
                        </sp-tab>
                    </sp-tabs>
                `;
      }
    }
    customElements.define("tab-test-el", TabTestEl);
    const el = await fixture(html`
            <tab-test-el></tab-test-el>
        `);
    await elementUpdated(el);
    const rootNode = el.shadowRoot;
    const tabsEl = rootNode.querySelector("sp-tabs");
    await elementUpdated(tabsEl);
    expect(tabsEl.selected).to.be.equal("");
    const firstTab = tabsEl.querySelector('[value="first"]');
    const secondTab = tabsEl.querySelector('[value="second"]');
    firstTab.dispatchEvent(new FocusEvent("focusin", { bubbles: true }));
    firstTab.focus();
    await elementUpdated(el);
    let activeElement = rootNode.activeElement;
    expect(activeElement === firstTab, "Focus first tab").to.be.true;
    firstTab.dispatchEvent(arrowLeftEvent());
    await elementUpdated(el);
    activeElement = rootNode.activeElement;
    expect(activeElement === secondTab, "Focus second tab").to.be.true;
    secondTab.dispatchEvent(enterEvent());
    await elementUpdated(el);
    expect(tabsEl.selected).to.be.equal("second");
    secondTab.dispatchEvent(arrowRightEvent());
    await elementUpdated(el);
    activeElement = rootNode.activeElement;
    expect(activeElement === firstTab, "Focus first tab").to.be.true;
    firstTab.dispatchEvent(spaceEvent());
    await elementUpdated(el);
    expect(tabsEl.selected).to.be.equal("first");
  });
  it('accepts keyboard based selection - [direction="vertical"]', async () => {
    const el = await fixture(html`
            <sp-tabs selected="Unknown" direction="vertical">
                <sp-tab label="Tab 1" value="first">
                    <sp-icon-checkmark slot="icon"></sp-icon-checkmark>
                </sp-tab>
                <sp-tab label="Tab 2" value="second">
                    <sp-icon-checkmark slot="icon"></sp-icon-checkmark>
                </sp-tab>
            </sp-tabs>
        `);
    await elementUpdated(el);
    expect(el.selected).to.be.equal("");
    const firstTab = el.querySelector('[value="first"]');
    const secondTab = el.querySelector('[value="second"]');
    firstTab.dispatchEvent(new FocusEvent("focusin", { bubbles: true }));
    firstTab.focus();
    await elementUpdated(el);
    expect(document.activeElement === firstTab, "Focus first tab").to.be.true;
    firstTab.dispatchEvent(arrowLeftEvent());
    await elementUpdated(el);
    expect(document.activeElement === secondTab, "Focus second tab").to.be.true;
    secondTab.dispatchEvent(enterEvent());
    await elementUpdated(el);
    expect(el.selected).to.be.equal("second");
    secondTab.dispatchEvent(arrowDownEvent());
    await elementUpdated(el);
    expect(document.activeElement === firstTab, "Focus first tab").to.be.true;
    firstTab.dispatchEvent(spaceEvent());
    await elementUpdated(el);
    expect(el.selected).to.be.equal("first");
    firstTab.dispatchEvent(arrowRightEvent());
    await elementUpdated(el);
    expect(document.activeElement === secondTab, "Focus second tab").to.be.true;
    secondTab.dispatchEvent(arrowLeftEvent());
    expect(document.activeElement === firstTab, "Focus first tab").to.be.true;
  });
  it("selects through slotted DOM", async () => {
    const el = await fixture(html`
            <sp-tabs selected="first">
                <sp-tab value="first">Tab 1</sp-tab>
                <sp-tab value="second"><span>Tab 2</span></sp-tab>
            </sp-tabs>
        `);
    const span = el.querySelector("span");
    await elementUpdated(el);
    expect(el.selected).to.equal("first");
    span.click();
    await elementUpdated(el);
    expect(el.selected).to.equal("second");
  });
  it("updates selection indicator in response to tab updates", async () => {
    const el = await fixture(html`
            <sp-tabs selected="first">
                <sp-tab value="first">Tab 1</sp-tab>
                <sp-tab value="second">Tab 2</sp-tab>
            </sp-tabs>
        `);
    const selected = el.querySelector('[value="first"]');
    await elementUpdated(el);
    const extractScaleX = /scaleX\((.+)\)/;
    const initialExec = extractScaleX.exec(
      el.selectionIndicatorStyle
    );
    const initialWidth = parseFloat(initialExec[1]);
    selected.textContent = "WWWWWWWWWWWWWWWWWWWWWWWWW";
    await nextFrame();
    await nextFrame();
    const longerExec = extractScaleX.exec(
      el.selectionIndicatorStyle
    );
    const longerWidth = parseFloat(longerExec[1]);
    expect(initialWidth).to.be.lessThan(longerWidth);
    selected.textContent = "W";
    await nextFrame();
    const shorterExec = extractScaleX.exec(
      el.selectionIndicatorStyle
    );
    const shorterWidth = parseFloat(shorterExec[1]);
    expect(initialWidth).to.be.greaterThan(shorterWidth);
    expect(longerWidth).to.be.greaterThan(shorterWidth);
  });
  it("clicks on #list do not throw", async () => {
    const tabs = await createTabs();
    const tabList = tabs.shadowRoot.querySelector(
      "#list"
    );
    let hasError = false;
    const oldOnerror = window.onerror;
    window.onerror = () => {
      hasError = true;
    };
    tabList.dispatchEvent(new MouseEvent("click"));
    expect(hasError, "it should not error").to.be.false;
    window.onerror = oldOnerror;
  });
});
//# sourceMappingURL=tabs.test.js.map
