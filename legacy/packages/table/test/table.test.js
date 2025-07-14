"use strict";
import {
  elementUpdated,
  expect,
  fixture,
  html,
  nextFrame
} from "@open-wc/testing";
import "@spectrum-web-components/theme/sp-theme.js";
import "@spectrum-web-components/theme/src/themes.js";
import "@spectrum-web-components/table/sp-table.js";
import "@spectrum-web-components/table/sp-table-head.js";
import "@spectrum-web-components/table/sp-table-head-cell.js";
import "@spectrum-web-components/table/sp-table-body.js";
import "@spectrum-web-components/table/sp-table-row.js";
import "@spectrum-web-components/table/sp-table-cell.js";
import { elements } from "../stories/table-elements.stories.js";
import { spy } from "sinon";
import { ignoreResizeObserverLoopError } from "../../../test/testing-helpers.js";
import { styledFixture } from "./helpers.js";
ignoreResizeObserverLoopError(before, after);
describe("Table", () => {
  it("loads default table accessibly", async () => {
    const el = await styledFixture(elements());
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
            <sp-table size="s">
                <sp-table-head>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                </sp-table-head>
                <sp-table-body style="height: 120px">
                    <sp-table-row value="row1">
                        <sp-table-cell>Row Item Alpha</sp-table-cell>
                        <sp-table-cell>Row Item Alpha</sp-table-cell>
                        <sp-table-cell>Row Item Alpha</sp-table-cell>
                    </sp-table-row>
                    <sp-table-row value="row2">
                        <sp-table-cell>Row Item Bravo</sp-table-cell>
                        <sp-table-cell>Row Item Bravo</sp-table-cell>
                        <sp-table-cell>Row Item Bravo</sp-table-cell>
                    </sp-table-row>
                    <sp-table-row value="row3">
                        <sp-table-cell>Row Item Charlie</sp-table-cell>
                        <sp-table-cell>Row Item Charlie</sp-table-cell>
                        <sp-table-cell>Row Item Charlie</sp-table-cell>
                    </sp-table-row>
                    <sp-table-row value="row4">
                        <sp-table-cell>Row Item Delta</sp-table-cell>
                        <sp-table-cell>Row Item Delta</sp-table-cell>
                        <sp-table-cell>Row Item Delta</sp-table-cell>
                    </sp-table-row>
                    <sp-table-row value="row5">
                        <sp-table-cell>Row Item Echo</sp-table-cell>
                        <sp-table-cell>Row Item Echo</sp-table-cell>
                        <sp-table-cell>Row Item Echo</sp-table-cell>
                    </sp-table-row>
                </sp-table-body>
            </sp-table>
        `);
    await elementUpdated(el);
    expect(el.size).to.equal("s");
  });
  it("dispatches `change` events", async () => {
    const changeSpy = spy();
    const el = await fixture(html`
            <sp-table
                size="m"
                selects="multiple"
                .selected=${["row1", "row2"]}
                @change=${({ target }) => {
      changeSpy(target);
    }}
            >
                <sp-table-head>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                </sp-table-head>
                <sp-table-body style="height: 120px">
                    <sp-table-row value="row1">
                        <sp-table-cell>Row Item Alpha</sp-table-cell>
                        <sp-table-cell>Row Item Alpha</sp-table-cell>
                        <sp-table-cell>Row Item Alpha</sp-table-cell>
                    </sp-table-row>
                    <sp-table-row value="row2">
                        <sp-table-cell>Row Item Bravo</sp-table-cell>
                        <sp-table-cell>Row Item Bravo</sp-table-cell>
                        <sp-table-cell>Row Item Bravo</sp-table-cell>
                    </sp-table-row>
                    <sp-table-row value="row3">
                        <sp-table-cell>Row Item Charlie</sp-table-cell>
                        <sp-table-cell>Row Item Charlie</sp-table-cell>
                        <sp-table-cell>Row Item Charlie</sp-table-cell>
                    </sp-table-row>
                    <sp-table-row value="row4">
                        <sp-table-cell>Row Item Delta</sp-table-cell>
                        <sp-table-cell>Row Item Delta</sp-table-cell>
                        <sp-table-cell>Row Item Delta</sp-table-cell>
                    </sp-table-row>
                    <sp-table-row value="row5">
                        <sp-table-cell>Row Item Echo</sp-table-cell>
                        <sp-table-cell>Row Item Echo</sp-table-cell>
                        <sp-table-cell>Row Item Echo</sp-table-cell>
                    </sp-table-row>
                </sp-table-body>
            </sp-table>
        `);
    const rowThreeCheckboxCell = el.querySelector(
      '[value="row3"] sp-table-checkbox-cell'
    );
    const tableHeadCheckboxCell = el.querySelector(
      "sp-table-head sp-table-checkbox-cell"
    );
    expect(el.selected).to.deep.equal(["row1", "row2"]);
    rowThreeCheckboxCell.checkbox.click();
    expect(el.selected).to.deep.equal(["row1", "row2", "row3"]);
    expect(changeSpy.calledOnce).to.be.true;
    expect(changeSpy.calledWithExactly(el)).to.be.true;
    changeSpy.resetHistory();
    tableHeadCheckboxCell.checkbox.click();
    expect(el.selected).to.deep.equal([
      "row1",
      "row2",
      "row3",
      "row4",
      "row5"
    ]);
    expect(changeSpy.calledOnce).to.to.true;
    expect(changeSpy.calledWithExactly(el)).to.be.true;
  });
  it("accepts change events dispatched from TableHead `<sp-table-checkbox-cell>`", async () => {
    const changeSpy = spy();
    const el = await fixture(html`
            <sp-table
                size="m"
                selects="multiple"
                .selected=${["row1", "row2"]}
                @change=${({ target }) => {
      changeSpy(target);
    }}
            >
                <sp-table-head>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                </sp-table-head>
                <sp-table-body style="height: 120px">
                    <sp-table-row value="row1">
                        <sp-table-cell>Row Item Alpha</sp-table-cell>
                        <sp-table-cell>Row Item Alpha</sp-table-cell>
                        <sp-table-cell>Row Item Alpha</sp-table-cell>
                    </sp-table-row>
                    <sp-table-row value="row2">
                        <sp-table-cell>Row Item Bravo</sp-table-cell>
                        <sp-table-cell>Row Item Bravo</sp-table-cell>
                        <sp-table-cell>Row Item Bravo</sp-table-cell>
                    </sp-table-row>
                    <sp-table-row value="row3">
                        <sp-table-cell>Row Item Charlie</sp-table-cell>
                        <sp-table-cell>Row Item Charlie</sp-table-cell>
                        <sp-table-cell>Row Item Charlie</sp-table-cell>
                    </sp-table-row>
                    <sp-table-row value="row4">
                        <sp-table-cell>Row Item Delta</sp-table-cell>
                        <sp-table-cell>Row Item Delta</sp-table-cell>
                        <sp-table-cell>Row Item Delta</sp-table-cell>
                    </sp-table-row>
                    <sp-table-row value="row5">
                        <sp-table-cell>Row Item Echo</sp-table-cell>
                        <sp-table-cell>Row Item Echo</sp-table-cell>
                        <sp-table-cell>Row Item Echo</sp-table-cell>
                    </sp-table-row>
                </sp-table-body>
            </sp-table>
        `);
    const tableHeadCheckboxCell = el.querySelector(
      "sp-table-head sp-table-checkbox-cell"
    );
    expect(el.selected).to.deep.equal(["row1", "row2"]);
    expect(tableHeadCheckboxCell.checkbox.indeterminate).to.be.true;
    expect(tableHeadCheckboxCell.checkbox.checked).to.be.false;
    tableHeadCheckboxCell.checkbox.click();
    await elementUpdated(el);
    expect(changeSpy.calledOnce).to.be.true;
    expect(changeSpy.calledWithExactly(el)).to.be.true;
    expect(tableHeadCheckboxCell.checkbox.checked).to.be.true;
    expect(tableHeadCheckboxCell.checkbox.indeterminate).to.be.false;
    expect(el.selected).to.deep.equal([
      "row1",
      "row2",
      "row3",
      "row4",
      "row5"
    ]);
    tableHeadCheckboxCell.checkbox.click();
    await elementUpdated(el);
    expect(el.selected).to.deep.equal([]);
    expect(tableHeadCheckboxCell.checkbox.checked).to.be.false;
    expect(tableHeadCheckboxCell.checkbox.indeterminate).to.be.false;
  });
  it("can be headerless", async () => {
    const el = await fixture(html`
            <sp-table>
                <sp-table-body style="height: 120px">
                    <sp-table-row value="row1">
                        <sp-table-cell>Row Item Alpha</sp-table-cell>
                        <sp-table-cell>Row Item Alpha</sp-table-cell>
                        <sp-table-cell>Row Item Alpha</sp-table-cell>
                    </sp-table-row>
                    <sp-table-row value="row2">
                        <sp-table-cell>Row Item Bravo</sp-table-cell>
                        <sp-table-cell>Row Item Bravo</sp-table-cell>
                        <sp-table-cell>Row Item Bravo</sp-table-cell>
                    </sp-table-row>
                    <sp-table-row value="row3">
                        <sp-table-cell>Row Item Charlie</sp-table-cell>
                        <sp-table-cell>Row Item Charlie</sp-table-cell>
                        <sp-table-cell>Row Item Charlie</sp-table-cell>
                    </sp-table-row>
                    <sp-table-row value="row4">
                        <sp-table-cell>Row Item Delta</sp-table-cell>
                        <sp-table-cell>Row Item Delta</sp-table-cell>
                        <sp-table-cell>Row Item Delta</sp-table-cell>
                    </sp-table-row>
                    <sp-table-row value="row5">
                        <sp-table-cell>Row Item Echo</sp-table-cell>
                        <sp-table-cell>Row Item Echo</sp-table-cell>
                        <sp-table-cell>Row Item Echo</sp-table-cell>
                    </sp-table-row>
                </sp-table-body>
            </sp-table>
        `);
    await elementUpdated(el);
    expect(el.size).to.equal("m");
    const tableHead = el.querySelector("sp-table-head");
    expect(tableHead).to.not.exist;
    const tableRows = el.querySelectorAll("sp-table-row");
    expect(tableRows.length).to.equal(5);
  });
});
//# sourceMappingURL=table.test.js.map
