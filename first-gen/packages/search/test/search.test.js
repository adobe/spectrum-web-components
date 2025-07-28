"use strict";
import "@spectrum-web-components/search/sp-search.js";
import { elementUpdated, expect, html, litFixture } from "@open-wc/testing";
import { escapeEvent, spaceEvent } from "../../../test/testing-helpers.js";
import "@spectrum-web-components/shared/src/focus-visible.js";
import { spy } from "sinon";
import { testForLitDevWarnings } from "../../../test/testing-helpers.js";
describe("Search", () => {
  testForLitDevWarnings(
    async () => await litFixture(html`
                <sp-search></sp-search>
            `)
  );
  it("loads accessibly", async () => {
    const el = await litFixture(html`
            <sp-search></sp-search>
        `);
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  it("can be cleared", async () => {
    const el = await litFixture(html`
            <sp-search value="Test"></sp-search>
        `);
    await elementUpdated(el);
    expect(el.value).to.equal("Test");
    const root = el.shadowRoot ? el.shadowRoot : el;
    const clearButton = root.querySelector("#button");
    clearButton.click();
    await elementUpdated(el);
    expect(el.value).to.equal("");
  });
  it("captures keyboard events to the clear button", async () => {
    const el = await litFixture(html`
            <sp-search value="Test"></sp-search>
        `);
    await elementUpdated(el);
    expect(el.value).to.equal("Test");
    const root = el.shadowRoot ? el.shadowRoot : el;
    const clearButton = root.querySelector("#button");
    clearButton.dispatchEvent(escapeEvent());
    await elementUpdated(el);
    expect(el.value).to.equal("Test");
  });
  it('dispatches events when using the "clear" button', async () => {
    const inputSpy = spy();
    const changeSpy = spy();
    const handleInput = (event) => {
      const target = event.target;
      inputSpy(target.value);
    };
    const handleChange = (event) => {
      const target = event.target;
      changeSpy(target.value);
    };
    const el = await litFixture(html`
            <sp-search
                value="Test"
                @change=${handleChange}
                @input=${handleInput}
            ></sp-search>
        `);
    await elementUpdated(el);
    expect(el.value).to.equal("Test");
    const root = el.shadowRoot ? el.shadowRoot : el;
    const clearButton = root.querySelector("#button");
    inputSpy.resetHistory();
    changeSpy.resetHistory();
    clearButton.click();
    await elementUpdated(el);
    expect(el.value).to.equal("");
    expect(inputSpy.calledOnce, "one input").to.be.true;
    expect(inputSpy.calledWith(""), "was blank").to.be.true;
    expect(changeSpy.calledOnce, "one change").to.be.true;
    expect(changeSpy.calledWith(""), "was blank").to.be.true;
  });
  it('can be cleared via "Escape"', async () => {
    const inputSpy = spy();
    const changeSpy = spy();
    const handleInput = (event) => {
      const target = event.target;
      inputSpy(target.value);
    };
    const handleChange = (event) => {
      const target = event.target;
      changeSpy(target.value);
    };
    const el = await litFixture(html`
            <sp-search
                value="Test"
                @change=${handleChange}
                @input=${handleInput}
            ></sp-search>
        `);
    await elementUpdated(el);
    expect(el.value).to.equal("Test");
    el.focusElement.dispatchEvent(spaceEvent());
    await elementUpdated(el);
    expect(el.value).to.equal("Test");
    inputSpy.resetHistory();
    changeSpy.resetHistory();
    el.focusElement.dispatchEvent(escapeEvent());
    await elementUpdated(el);
    expect(el.value).to.equal("");
    expect(inputSpy.calledOnce, "one input").to.be.true;
    expect(inputSpy.calledWith(""), "was blank").to.be.true;
    expect(changeSpy.calledOnce, "one change").to.be.true;
    expect(changeSpy.calledWith(""), "was blank").to.be.true;
  });
  it('cannot be cleared via "Escape" if holdValueOnEscape is true', async () => {
    const inputSpy = spy();
    const changeSpy = spy();
    const handleInput = (event) => {
      const target = event.target;
      inputSpy(target.value);
    };
    const handleChange = (event) => {
      const target = event.target;
      changeSpy(target.value);
    };
    const el = await litFixture(html`
            <sp-search
                value="Test"
                @change=${handleChange}
                @input=${handleInput}
                holdValueOnEscape
            ></sp-search>
        `);
    await elementUpdated(el);
    expect(el.value).to.equal("Test");
    el.focusElement.dispatchEvent(spaceEvent());
    await elementUpdated(el);
    expect(el.value).to.equal("Test");
    inputSpy.resetHistory();
    changeSpy.resetHistory();
    el.focusElement.dispatchEvent(escapeEvent());
    await elementUpdated(el);
    expect(el.value).to.equal("Test");
  });
  it("cannot be multiline", async () => {
    const el = await litFixture(html`
            <sp-search multiline></sp-search>
        `);
    await elementUpdated(el);
    expect(el.multiline).to.be.false;
    el.multiline = true;
    await elementUpdated(el);
    expect(el.multiline).to.be.false;
  });
  it("accepts `placeholder` and `label` properties", async () => {
    const testString = "Search for images";
    const el = await litFixture(html`
            <sp-search></sp-search>
        `);
    await elementUpdated(el);
    el.placeholder = testString;
    el.label = testString;
    await elementUpdated(el);
    expect(el.focusElement.placeholder).to.equal(testString);
    expect(el.focusElement.getAttribute("aria-label")).to.equal(testString);
  });
  it("can have default prevented", async () => {
    const el = await litFixture(html`
            <sp-search
                @submit=${(event) => {
      event.preventDefault();
    }}
            ></sp-search>
        `);
    await elementUpdated(el);
    const searchForm = el.shadowRoot ? el.shadowRoot.querySelector("form") : el.querySelector("form");
    const submitEvent = new Event("submit", {
      cancelable: true,
      bubbles: false,
      composed: false
    });
    searchForm.dispatchEvent(submitEvent);
    expect(submitEvent.defaultPrevented).to.be.true;
  });
});
//# sourceMappingURL=search.test.js.map
