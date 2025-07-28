"use strict";
import {
  elementUpdated,
  expect,
  fixture,
  html,
  nextFrame
} from "@open-wc/testing";
import "@spectrum-web-components/table/sp-table.js";
import "@spectrum-web-components/table/sp-table-head.js";
import "@spectrum-web-components/table/sp-table-head-cell.js";
import "@spectrum-web-components/table/sp-table-body.js";
import "@spectrum-web-components/table/sp-table-row.js";
import "@spectrum-web-components/table/sp-table-cell.js";
import {
  elements,
  noSelectsSpecified,
  selectsMultiple,
  selectsSingle
} from "../stories/table-elements.stories.js";
import { spy } from "sinon";
import { ignoreResizeObserverLoopError } from "../../../test/testing-helpers.js";
ignoreResizeObserverLoopError(before, after);
describe("Table Selects", () => {
  it("selects items not initially visible in the <sp-table-body>", async () => {
    const el = await fixture(elements());
    el.selects = "single";
    el.selected = ["row5"];
    await elementUpdated(el);
    const rowFive = el.querySelector(".row5");
    const rowFiveCheckbox = rowFive.querySelector(
      "sp-table-checkbox-cell"
    );
    const checkboxes = el.querySelectorAll(
      "sp-table-checkbox-cell:nth-child(n+1):nth-child(n+4)"
    );
    checkboxes.forEach((checkbox) => {
      expect(checkbox.checkbox.checked).to.be.false;
    });
    el.scrollTop = el.scrollHeight;
    await nextFrame();
    expect(rowFiveCheckbox.checkbox.checked).to.be.true;
  });
  it("can prevent selection", async () => {
    const el = await fixture(html`
            <sp-table
                size="m"
                selects="single"
                @change=${(event) => {
      event.preventDefault();
    }}
            >
                <sp-table-head>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                </sp-table-head>
                <sp-table-body style="height: 120px">
                    <sp-table-row value="row1" class="row1">
                        <sp-table-cell>Row Item Alpha</sp-table-cell>
                        <sp-table-cell>Row Item Alpha</sp-table-cell>
                        <sp-table-cell>Row Item Alpha</sp-table-cell>
                    </sp-table-row>
                    <sp-table-row value="row2" class="row2">
                        <sp-table-cell>Row Item Bravo</sp-table-cell>
                        <sp-table-cell>Row Item Bravo</sp-table-cell>
                        <sp-table-cell>Row Item Bravo</sp-table-cell>
                    </sp-table-row>
                    <sp-table-row value="row3" class="row3">
                        <sp-table-cell>Row Item Charlie</sp-table-cell>
                        <sp-table-cell>Row Item Charlie</sp-table-cell>
                        <sp-table-cell>Row Item Charlie</sp-table-cell>
                    </sp-table-row>
                    <sp-table-row value="row4" class="row4">
                        <sp-table-cell>Row Item Delta</sp-table-cell>
                        <sp-table-cell>Row Item Delta</sp-table-cell>
                        <sp-table-cell>Row Item Delta</sp-table-cell>
                    </sp-table-row>
                    <sp-table-row value="row5" class="row5">
                        <sp-table-cell>Row Item Echo</sp-table-cell>
                        <sp-table-cell>Row Item Echo</sp-table-cell>
                        <sp-table-cell>Row Item Echo</sp-table-cell>
                    </sp-table-row>
                </sp-table-body>
            </sp-table>
        `);
    const rowTwo = el.querySelector(".row2");
    const rowTwoCheckbox = rowTwo.querySelector(
      "sp-table-checkbox-cell"
    );
    rowTwoCheckbox.checkbox.click();
    await elementUpdated(el);
    expect(rowTwoCheckbox.checked).to.be.false;
    expect(rowTwo.selected).to.be.false;
    expect(rowTwo.getAttribute("aria-selected")).to.equal("false");
    expect(el.selected.length).to.equal(0);
  });
  it("ignores unexpected `change` events", async () => {
    const changeSpy = spy();
    const el = await fixture(html`
            <sp-table
                size="m"
                selects="single"
                @change=${(event) => {
      event.preventDefault();
      changeSpy();
    }}
            >
                <sp-table-head>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                </sp-table-head>
                <sp-table-body style="height: 120px">
                    <sp-table-row value="row1" class="row1">
                        <sp-table-cell>Row Item Alpha</sp-table-cell>
                        <sp-table-cell>Row Item Alpha</sp-table-cell>
                        <sp-table-cell>
                            <sp-checkbox>Test checkbox</sp-checkbox>
                        </sp-table-cell>
                    </sp-table-row>
                </sp-table-body>
            </sp-table>
        `);
    const checkbox = el.querySelector("sp-checkbox");
    try {
      checkbox == null ? void 0 : checkbox.click();
      expect(changeSpy.callCount).to.equal(1);
    } catch (error) {
      expect(true, "There was an error due to the click.").to.be.false;
    }
  });
  it('surfaces [selects="single"] selection', async () => {
    const el = await fixture(selectsSingle());
    expect(el.selected, "'Row 1 selected").to.deep.equal(["row1"]);
  });
  it('selects via `click` while [selects="single"]', async () => {
    const el = await fixture(selectsSingle());
    const rowTwo = el.querySelector(".row2");
    const rowTwoCheckbox = rowTwo.querySelector(
      "sp-table-checkbox-cell"
    );
    expect(rowTwo.getAttribute("aria-selected")).to.equal("false");
    const rowThree = el.querySelector(".row3");
    const rowThreeCheckbox = rowThree.querySelector(
      "sp-table-checkbox-cell"
    );
    rowTwoCheckbox.checkbox.click();
    await elementUpdated(el);
    expect(rowTwoCheckbox.checked).to.be.true;
    expect(el.selected).to.deep.equal(["row2"]);
    expect(rowTwo.getAttribute("aria-selected")).to.equal("true");
    rowThreeCheckbox.checkbox.click();
    await elementUpdated(el);
    await elementUpdated(rowTwoCheckbox);
    expect(rowThreeCheckbox.checkbox.checked).to.be.true;
    expect(rowTwoCheckbox.checkbox.checked).to.be.false;
    expect(el.selected.length).to.equal(1);
    rowTwo.click();
    await elementUpdated(el);
    expect(rowTwoCheckbox.checked).to.be.true;
    expect(el.selected).to.deep.equal(["row2"]);
  });
  it('surfaces [selects="multiple"] selection', async () => {
    const el = await fixture(selectsMultiple());
    expect(el.selected, "Rows 1 and 2 selected").to.deep.equal([
      "row1",
      "row2"
    ]);
  });
  it('selects via `click` while [selects="multiple"] selection', async () => {
    const el = await fixture(selectsMultiple());
    const rowFour = el.querySelector(".row4");
    const tableHeadCheckboxCell = el.querySelector(
      "sp-table-head sp-table-checkbox-cell"
    );
    const rowFourCheckbox = rowFour.querySelector(
      "sp-table-checkbox-cell"
    );
    await elementUpdated(el);
    expect(el.selected.length).to.equal(2);
    rowFourCheckbox.checkbox.click();
    await elementUpdated(el);
    expect(rowFourCheckbox.checked).to.be.true;
    expect(el.selected).to.deep.equal(["row1", "row2", "row4"]);
    tableHeadCheckboxCell.click();
    await elementUpdated(el);
    expect(el.selected).to.deep.equal([
      "row1",
      "row2",
      "row4",
      "row3",
      "row5"
    ]);
  });
  it("allows [selects] to be changed by the application", async () => {
    const el = await fixture(elements());
    expect(el.selects).to.be.undefined;
    el.selects = "single";
    await elementUpdated(el);
    expect(el.selects).to.equal("single");
    await elementUpdated(el);
    await nextFrame();
    await nextFrame();
    const rowTwoCheckboxCell = el.querySelector(
      ".row2 sp-table-checkbox-cell"
    );
    const rowOneCheckboxCell = el.querySelector(
      ".row1 sp-table-checkbox-cell"
    );
    const tableHeadCheckboxCell = el.querySelector(
      "sp-table-head sp-table-checkbox-cell"
    );
    expect(tableHeadCheckboxCell.selectsSingle).to.be.true;
    rowOneCheckboxCell.checkbox.click();
    await elementUpdated(el);
    expect(el.selected).to.deep.equal(["row1"]);
    expect(rowOneCheckboxCell.checkbox.checked).to.be.true;
    expect(rowTwoCheckboxCell.checkbox.checked).to.be.false;
    el.selects = "multiple";
    await elementUpdated(el);
    expect(el.selects).to.equal("multiple");
    expect(tableHeadCheckboxCell.indeterminate).to.be.true;
    rowTwoCheckboxCell.checkbox.click();
    await elementUpdated(el);
    await elementUpdated(rowTwoCheckboxCell);
    expect(el.selected).to.deep.equal(["row1", "row2"]);
    expect(rowOneCheckboxCell.checkbox.checked).to.be.true;
    expect(rowTwoCheckboxCell.checkbox.checked).to.be.true;
    expect(tableHeadCheckboxCell.indeterminate).to.be.true;
  });
  it("selects a user-passed value for .selected array with no [selects] specified, but does not allow interaction afterwards", async () => {
    const el = await fixture(noSelectsSpecified());
    await elementUpdated(el);
    expect(el.selected.length).to.equal(2);
    const rows = el.querySelectorAll("sp-table-row");
    rows.forEach((row) => {
      const checkbox = row.querySelector("sp-table-checkbox-cell");
      expect(checkbox).to.be.null;
    });
  });
  it('allows .selected values to be changed by the application when [selects="multiple"]', async () => {
    const el = await fixture(selectsMultiple());
    await elementUpdated(el);
    const rowThreeCheckboxCell = el.querySelector(
      ".row3 sp-table-checkbox-cell"
    );
    const rowOneCheckboxCell = el.querySelector(
      ".row1 sp-table-checkbox-cell"
    );
    expect(el.selected).to.deep.equal(["row1", "row2"]);
    expect(rowOneCheckboxCell.checkbox.checked).to.be.true;
    expect(rowThreeCheckboxCell.checkbox.checked).to.be.false;
    el.selected = ["row1", "row3"];
    await elementUpdated(el);
    await elementUpdated(rowThreeCheckboxCell);
    expect(el.selected).to.deep.equal(["row1", "row3"]);
    expect(rowOneCheckboxCell.checkbox.checked).to.be.true;
    expect(rowThreeCheckboxCell.checkbox.checked).to.be.true;
  });
});
//# sourceMappingURL=table-selects.test.js.map
