"use strict";
import {
  elementUpdated,
  expect,
  html,
  nextFrame,
  oneEvent
} from "@open-wc/testing";
import "@spectrum-web-components/combobox/sp-combobox.js";
import { fixture } from "../../../test/testing-helpers.js";
import { findDescribedNode } from "../../../test/testing-helpers-a11y.js";
import {
  a11ySnapshot,
  findAccessibilityNode,
  sendKeys
} from "@web/test-runner-commands";
import { comboboxFixture } from "./helpers.js";
import {
  withFieldLabel,
  withHelpText,
  withTooltip
} from "../stories/combobox.stories.js";
describe("Combobox accessibility", () => {
  it("renders accessibly with `label` attribute", async () => {
    const el = await comboboxFixture();
    const opened = oneEvent(el, "sp-opened");
    el.open = true;
    await opened;
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  it("renders accessibly with <sp-field-label>", async () => {
    const test = await fixture(html`
            <div>${withFieldLabel()}</div>
        `);
    const el = test.querySelector("sp-combobox");
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  it("renders accessibly with <sp-help-text>", async () => {
    const test = await fixture(html`
            <div>${withHelpText()}</div>
        `);
    const el = test.querySelector("sp-combobox");
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  it('manages its "name" value with <sp-field-label>', async () => {
    const test = await fixture(html`
            <div>${withFieldLabel()}</div>
        `);
    const el = test.querySelector("sp-combobox");
    await elementUpdated(el);
    await nextFrame();
    await nextFrame();
    let snapshot = await a11ySnapshot(
      {}
    );
    const a11yNode = findAccessibilityNode(
      snapshot,
      (node2) => node2.name === "Pick something" && !node2.value && node2.role === "combobox"
    );
    expect(a11yNode, "`name` is the label text").to.not.be.null;
    el.value = "Banana";
    await elementUpdated(el);
    snapshot = await a11ySnapshot(
      {}
    );
    const node = findAccessibilityNode(
      snapshot,
      (node2) => node2.name === "Pick something" && node2.value === "Banana" && node2.role === "combobox"
    );
    expect(
      node,
      `node not available: ${JSON.stringify(
        snapshot,
        null,
        "  "
      )}`
    ).to.not.be.null;
  });
  it('manages its "name" value in the accessibility tree', async () => {
    const el = await comboboxFixture();
    await elementUpdated(el);
    await nextFrame();
    await nextFrame();
    let snapshot = await a11ySnapshot(
      {}
    );
    const a11yNode = findAccessibilityNode(
      snapshot,
      (node2) => node2.name === "Combobox" && !node2.value && node2.role === "combobox"
    );
    expect(a11yNode, "`name` is the label text").to.not.be.null;
    el.value = "Banana";
    await elementUpdated(el);
    snapshot = await a11ySnapshot(
      {}
    );
    const node = findAccessibilityNode(
      snapshot,
      (node2) => node2.name === "Combobox" && node2.value === "Banana" && node2.role === "combobox"
    );
    expect(
      node,
      `node not available: ${JSON.stringify(
        snapshot,
        null,
        "  "
      )}`
    ).to.not.be.null;
  });
  it('manages its "description" value with slotted <sp-tooltip>', async () => {
    const test = await fixture(html`
            <div>${withTooltip()}</div>
        `);
    const el = test.querySelector("sp-combobox");
    const tooltipText = "This combobox has a tooltip.";
    await elementUpdated(el);
    await findDescribedNode(el.label, tooltipText);
  });
  it("renders open", async () => {
    const el = await comboboxFixture();
    const opened = oneEvent(el, "sp-opened");
    el.open = true;
    await opened;
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  it("manages aria-activedescendant", async () => {
    const el = await comboboxFixture();
    await elementUpdated(el);
    expect(el.activeDescendant).to.be.undefined;
    el.focus();
    await elementUpdated(el);
    await sendKeys({
      press: "ArrowDown"
    });
    await elementUpdated(el);
    expect(el.activeDescendant).to.not.be.undefined;
    expect(el.activeDescendant.value).to.equal("apple");
    const activeDescendant = el.shadowRoot.querySelector(
      "#apple"
    );
    await elementUpdated(activeDescendant);
    await nextFrame();
    await nextFrame();
    expect(activeDescendant.focused).to.be.true;
    expect(el.focused).to.be.true;
    await expect(el).to.be.accessible();
  });
  it("manages aria-selected", async () => {
    const el = await comboboxFixture();
    await elementUpdated(el);
    let snapshot = await a11ySnapshot({});
    expect(
      findAccessibilityNode(
        snapshot,
        (node) => !!node.selected
      )
    ).to.be.null;
    const opened = oneEvent(el, "sp-opened");
    el.click();
    await opened;
    await elementUpdated(el);
    expect(el.open).to.be.true;
    el.focus();
    await elementUpdated(el);
    await sendKeys({
      press: "ArrowDown"
    });
    await elementUpdated(el);
    expect(el.activeDescendant.value).to.equal("apple");
    snapshot = await a11ySnapshot({});
    expect(
      findAccessibilityNode(
        snapshot,
        (node) => !!node.selected
      ),
      JSON.stringify(snapshot, null, "  ")
    ).to.not.be.null;
  });
  it("manages aria-expanded", async () => {
    const el = await comboboxFixture();
    await elementUpdated(el);
    let snapshot = await a11ySnapshot({});
    expect(
      findAccessibilityNode(
        snapshot,
        (node) => !!node.expanded
      )
    ).to.be.null;
    el.click();
    await elementUpdated(el);
    expect(el.open).to.be.true;
    snapshot = await a11ySnapshot({});
    expect(
      findAccessibilityNode(
        snapshot,
        (node) => !!node.expanded
      )
    ).to.not.be.null;
  });
  it("loads with list closed", async () => {
    const el = await comboboxFixture();
    await elementUpdated(el);
    expect(el.open).to.be.false;
  });
  it("renders accessibly with `pending` attribute", async () => {
    const el = await comboboxFixture();
    el.value = "Banana";
    el.pending = true;
    await elementUpdated(el);
    await nextFrame();
    const name = "Pending Combobox";
    const snapshot = await a11ySnapshot(
      {}
    );
    const a11yNode = findAccessibilityNode(
      snapshot,
      (node) => node.name === name && node.role === "combobox"
    );
    expect(a11yNode).to.not.be.null;
  });
});
//# sourceMappingURL=combobox-a11y.test.js.map
