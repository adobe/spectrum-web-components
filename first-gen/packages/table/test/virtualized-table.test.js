"use strict";
import {
  elementUpdated,
  expect,
  fixture,
  html,
  nextFrame,
  oneEvent
} from "@open-wc/testing";
import "@spectrum-web-components/theme/sp-theme.js";
import "@spectrum-web-components/theme/src/themes.js";
import "@spectrum-web-components/table/sp-table.js";
import "@spectrum-web-components/table/sp-table-head.js";
import "@spectrum-web-components/table/sp-table-head-cell.js";
import "@spectrum-web-components/table/sp-table-body.js";
import "@spectrum-web-components/table/sp-table-row.js";
import "@spectrum-web-components/table/sp-table-cell.js";
import { virtualized } from "../stories/table-virtualized.stories.js";
import { makeItems, renderItem } from "../stories/index.js";
import { sendKeys } from "@web/test-runner-commands";
import { spy } from "sinon";
import { ignoreResizeObserverLoopError } from "../../../test/testing-helpers.js";
import { styledFixture, tableLayoutComplete } from "./helpers.js";
ignoreResizeObserverLoopError(before, after);
describe("Virtualized Table", () => {
  const virtualItems = makeItems(50);
  it("loads virtualized table accessibly", async () => {
    const el = await styledFixture(virtualized());
    await nextFrame();
    await nextFrame();
    await nextFrame();
    await nextFrame();
    await nextFrame();
    await nextFrame();
    await expect(el).to.be.accessible();
  });
  it("can be size `s`", async () => {
    const el = await fixture(html`
            <sp-table
                size="s"
                style="height: 120px"
                .items=${virtualItems}
                .renderItem=${renderItem}
                scroller?="true"
            >
                <sp-table-head>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                </sp-table-head>
            </sp-table>
        `);
    await oneEvent(el, "rangeChanged");
    await elementUpdated(el);
    expect(el.size).to.equal("s");
  });
  it("creates tab stops for `<sp-table-head-cell sortable>`", async () => {
    var _a, _b, _c;
    const input = document.createElement("input");
    const test = await fixture(virtualized());
    const el = (_a = test.shadowRoot) == null ? void 0 : _a.querySelector("sp-table");
    test.insertAdjacentElement("beforebegin", input);
    input.focus();
    expect(input === document.activeElement).to.be.true;
    const firstSortable = el.querySelector(
      "[sortable]:nth-of-type(1)"
    );
    const secondSortable = el.querySelector(
      "[sortable]:nth-of-type(2)"
    );
    await sendKeys({
      press: "Tab"
    });
    expect(firstSortable === ((_b = test.shadowRoot) == null ? void 0 : _b.activeElement)).to.be.true;
    await sendKeys({
      press: "Tab"
    });
    expect(secondSortable === ((_c = test.shadowRoot) == null ? void 0 : _c.activeElement)).to.be.true;
  });
  it("does not tab stop on non-sortable `<sp-table-head-cell>`s", async () => {
    var _a, _b, _c, _d;
    const input = document.createElement("input");
    const test = await fixture(virtualized());
    const el = (_a = test.shadowRoot) == null ? void 0 : _a.querySelector("sp-table");
    test.insertAdjacentElement("beforebegin", input);
    input.focus();
    expect(input === document.activeElement).to.be.true;
    const firstHeadCell = el.querySelector(
      "sp-table-head-cell:nth-of-type(1)"
    );
    const secondHeadCell = el.querySelector(
      "sp-table-head-cell:nth-of-type(2)"
    );
    const thirdHeadCell = el.querySelector(
      "sp-table-head-cell:nth-of-type(3)"
    );
    await sendKeys({
      press: "Tab"
    });
    expect(firstHeadCell === ((_b = test.shadowRoot) == null ? void 0 : _b.activeElement)).to.be.true;
    await sendKeys({
      press: "Tab"
    });
    expect(secondHeadCell === ((_c = test.shadowRoot) == null ? void 0 : _c.activeElement)).to.be.true;
    await sendKeys({
      press: "Tab"
    });
    expect(thirdHeadCell === ((_d = test.shadowRoot) == null ? void 0 : _d.activeElement)).to.be.false;
  });
  it("can be focus()ed from the `<sp-table>`", async () => {
    var _a, _b;
    const test = await fixture(virtualized());
    const el = (_a = test.shadowRoot) == null ? void 0 : _a.querySelector("sp-table");
    el.focus();
    const firstSortable = el.querySelector(
      "[sortable]:nth-of-type(1)"
    );
    expect(firstSortable === ((_b = test.shadowRoot) == null ? void 0 : _b.activeElement)).to.be.true;
  });
  it("dispatches `sorted` events", async () => {
    var _a;
    const test = await fixture(virtualized());
    const el = (_a = test.shadowRoot) == null ? void 0 : _a.querySelector("sp-table");
    const tableHeadCell1 = el.querySelector(
      "[sortable][sort-direction]"
    );
    const tableHeadCell2 = el.querySelector(
      "[sortable]:not([sort-direction])"
    );
    tableHeadCell2.click();
    await nextFrame();
    expect(tableHeadCell1.hasAttribute("sort-direction")).to.be.false;
    expect(tableHeadCell2.hasAttribute("sort-direction")).to.be.true;
    expect(tableHeadCell2.getAttribute("sort-direction")).to.equal("asc");
    tableHeadCell2.click();
    await nextFrame();
    expect(tableHeadCell1.hasAttribute("sort-direction")).to.be.false;
    expect(tableHeadCell2.hasAttribute("sort-direction")).to.be.true;
    expect(tableHeadCell2.getAttribute("sort-direction")).to.equal("desc");
    tableHeadCell1.click();
    await nextFrame();
    expect(tableHeadCell2.hasAttribute("sort-direction")).to.be.false;
    expect(tableHeadCell1.hasAttribute("sort-direction")).to.be.true;
    expect(tableHeadCell1.getAttribute("sort-direction")).to.equal("asc");
  });
  it("dispatches `sorted` events using the keyboard", async () => {
    var _a;
    const test = await fixture(virtualized());
    const el = (_a = test.shadowRoot) == null ? void 0 : _a.querySelector("sp-table");
    const tableHeadCell1 = el.querySelector(
      "[sortable][sort-direction]"
    );
    const tableHeadCell2 = el.querySelector(
      "[sortable]:not([sort-direction])"
    );
    tableHeadCell2.focus();
    await nextFrame();
    await sendKeys({
      press: "Enter"
    });
    await nextFrame();
    expect(tableHeadCell1.hasAttribute("sort-direction")).to.be.false;
    expect(tableHeadCell2.hasAttribute("sort-direction")).to.be.true;
    expect(tableHeadCell2.getAttribute("sort-direction")).to.equal("asc");
    tableHeadCell2.focus();
    await nextFrame();
    await sendKeys({
      press: "Space"
    });
    await nextFrame();
    expect(tableHeadCell1.hasAttribute("sort-direction")).to.be.false;
    expect(tableHeadCell2.hasAttribute("sort-direction")).to.be.true;
    expect(tableHeadCell2.getAttribute("sort-direction")).to.equal("desc");
    tableHeadCell1.focus();
    await nextFrame();
    await sendKeys({
      press: "Enter"
    });
    await nextFrame();
    expect(tableHeadCell2.hasAttribute("sort-direction")).to.be.false;
    expect(tableHeadCell1.hasAttribute("sort-direction")).to.be.true;
    expect(tableHeadCell1.getAttribute("sort-direction")).to.equal("asc");
  });
  it("dispatches `change` events", async () => {
    const changeSpy = spy();
    const el = await fixture(html`
            <sp-table
                .selected=${["0", "22"]}
                selects="multiple"
                style="height: 120px"
                .items=${virtualItems}
                .renderItem=${renderItem}
                scroller?="true"
                @change=${({ target }) => {
      changeSpy(target);
    }}
            >
                <sp-table-head>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                </sp-table-head>
            </sp-table>
        `);
    await oneEvent(el, "rangeChanged");
    await elementUpdated(el);
    expect(el.selected).to.deep.equal(["0", "22"]);
    await nextFrame;
    const rowTwo = el.querySelector('[value="3"]');
    const rowTwoCheckboxCell = rowTwo.querySelector(
      "sp-table-checkbox-cell"
    );
    rowTwoCheckboxCell.checkbox.click();
    expect(el.selected).to.deep.equal(["0", "22", "3"]);
  });
  it("accepts change events dispatched from TableHead `<sp-table-checkbox-cell>`", async () => {
    const changeSpy = spy();
    const el = await fixture(html`
            <sp-table
                .selected=${["0", "22"]}
                selects="multiple"
                style="height: 120px"
                .items=${virtualItems}
                .renderItem=${renderItem}
                scroller?="true"
                @change=${({ target }) => {
      changeSpy(target);
    }}
            >
                <sp-table-head>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                </sp-table-head>
            </sp-table>
        `);
    await oneEvent(el, "rangeChanged");
    await elementUpdated(el);
    const tableHeadCheckboxCell = el.querySelector(
      "sp-table-head sp-table-checkbox-cell"
    );
    expect(el.selected).to.deep.equal(["0", "22"]);
    tableHeadCheckboxCell.checkbox.click();
    expect(changeSpy.calledOnce).to.be.true;
    expect(changeSpy.calledWithExactly(el)).to.be.true;
    expect(el.selected.length).to.equal(50);
    expect(tableHeadCheckboxCell.checkbox.checked).to.be.true;
  });
  it("dispatches `rangeChanged` events on Virtualized Table", async () => {
    const el = await fixture(html`
            <sp-table
                selects="multiple"
                .selected=${["1", "47"]}
                style="height: 120px"
                .items=${makeItems(50)}
                .renderItem=${renderItem}
                scroller?="true"
            >
                <sp-table-head>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                </sp-table-head>
            </sp-table>
        `);
    await oneEvent(el, "rangeChanged");
    await elementUpdated(el);
    expect(el.selected).to.deep.equal(["1", "47"]);
    const rangeChanged = oneEvent(el, "rangeChanged");
    let tableRow = el.querySelector("sp-table-row");
    const initialValue = tableRow.value;
    el.scrollToIndex(47);
    await rangeChanged;
    tableRow = el.querySelector("sp-table-row");
    const newValue = tableRow.value;
    expect(newValue).to.not.equal(initialValue);
  });
  it("dispatches `visibilityChanged` events on Virtualized Table", async () => {
    const visibilityChangedSpy = spy();
    const el = await fixture(html`
            <sp-table
                selects="multiple"
                .selected=${["1", "47"]}
                style="height: 120px"
                .items=${virtualItems}
                .renderItem=${renderItem}
                scroller?="true"
                @visibilityChanged=${({
      target
    }) => {
      visibilityChangedSpy(target);
    }}
            >
                <sp-table-head>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                </sp-table-head>
            </sp-table>
        `);
    await tableLayoutComplete(el);
    expect(el.selected).to.deep.equal(["1", "47"]);
    el.scrollToIndex(47);
    await nextFrame();
    await nextFrame();
    await elementUpdated(el);
    expect(visibilityChangedSpy.called).to.be.true;
  });
});
//# sourceMappingURL=virtualized-table.test.js.map
