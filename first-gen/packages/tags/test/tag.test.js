"use strict";
import { elementUpdated, expect, fixture } from "@open-wc/testing";
import { html } from "lit/static-html.js";
import { spy, stub } from "sinon";
import "@spectrum-web-components/tags/sp-tag.js";
import "@spectrum-web-components/tags/sp-tags.js";
import {
  backspaceEvent,
  deleteEvent,
  enterEvent,
  spaceEvent,
  testForLitDevWarnings
} from "../../../test/testing-helpers.js";
describe("Tag", () => {
  testForLitDevWarnings(
    async () => await fixture(
      html`
                    <sp-tags>
                        <sp-tag>Tag 1</sp-tag>
                        <sp-tag invalid>Tag 2</sp-tag>
                        <sp-tag disabled>Tag 3</sp-tag>
                        <sp-tag deletable>Tag 4</sp-tag>
                    </sp-tags>
                `
    )
  );
  it("loads default tags accessibly", async () => {
    const el = await fixture(
      html`
                <sp-tags>
                    <sp-tag>Tag 1</sp-tag>
                    <sp-tag invalid>Tag 2</sp-tag>
                    <sp-tag disabled>Tag 3</sp-tag>
                    <sp-tag deletable>Tag 4</sp-tag>
                </sp-tags>
            `
    );
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  it("[disabled] manages [aria-disabled]", async () => {
    const el = await fixture(
      html`
                <sp-tags>
                    <sp-tag>Tag 1</sp-tag>
                    <sp-tag invalid>Tag 2</sp-tag>
                    <sp-tag disabled>Tag 3</sp-tag>
                    <sp-tag deletable>Tag 4</sp-tag>
                </sp-tags>
            `
    );
    const notDisabled = el.querySelector("sp-tag");
    const disabled = el.querySelector("[disabled]");
    await elementUpdated(disabled);
    expect(notDisabled.hasAttribute("aria-disabled")).to.be.false;
    expect(disabled.hasAttribute("aria-disabled")).to.be.true;
    expect(disabled.getAttribute("aria-disabled")).to.equal("true");
  });
  it("dispatches `delete` events on click", async () => {
    const deleteSpy = spy();
    const handleDelete = () => deleteSpy();
    const el = await fixture(
      html`
                <sp-tag @delete=${handleDelete} deletable>Tag 1</sp-tag>
            `
    );
    await elementUpdated(el);
    expect(deleteSpy.called).to.be.false;
    const root = el.shadowRoot ? el.shadowRoot : el;
    const deleteButton = root.querySelector(
      "sp-clear-button"
    );
    deleteButton.click();
    await elementUpdated(el);
    expect(deleteSpy.called).to.be.true;
    expect(deleteSpy.callCount).to.equal(1);
  });
  it("does not dispatch `delete` events when [readonly]", async () => {
    const deleteSpy = spy();
    const handleDelete = () => deleteSpy();
    const el = await fixture(
      html`
                <sp-tag @delete=${handleDelete} deletable readonly>
                    Tag 1
                </sp-tag>
            `
    );
    await elementUpdated(el);
    expect(deleteSpy.called).to.be.false;
    const root = el.shadowRoot ? el.shadowRoot : el;
    const deleteButton = root.querySelector(
      "sp-clear-button"
    );
    deleteButton.click();
    await elementUpdated(el);
    expect(deleteSpy.called).to.be.false;
  });
  it("dispatches `delete` events on keyboard input", async () => {
    const deleteSpy = spy();
    const handleDelete = () => deleteSpy();
    let expectedEventCount = 0;
    const el = await fixture(
      html`
                <sp-tag @delete=${handleDelete}>Tag 1</sp-tag>
            `
    );
    const testKeyboardEvent = async (event) => {
      expectedEventCount += 1;
      el.dispatchEvent(event);
      await elementUpdated(el);
      expect(deleteSpy.called).to.be.true;
      expect(
        deleteSpy.callCount,
        `Accepts "${event.code}" key input`
      ).to.equal(expectedEventCount);
    };
    await elementUpdated(el);
    expect(deleteSpy.called).to.be.false;
    el.dispatchEvent(new FocusEvent("focusin"));
    await elementUpdated(el);
    el.dispatchEvent(deleteEvent());
    await elementUpdated(el);
    expect(deleteSpy.called).to.be.false;
    el.deletable = true;
    await elementUpdated(el);
    el.dispatchEvent(enterEvent());
    await elementUpdated(el);
    expect(deleteSpy.called).to.be.false;
    testKeyboardEvent(deleteEvent());
    testKeyboardEvent(spaceEvent());
    testKeyboardEvent(backspaceEvent());
    el.dispatchEvent(new FocusEvent("focusout"));
    await elementUpdated(el);
    el.dispatchEvent(deleteEvent());
    expect(
      deleteSpy.callCount,
      "Does not respond after `focusout`"
    ).to.equal(expectedEventCount);
  });
  it("can have delete event prevented", async () => {
    const deleteSpy = spy();
    const handleDelete = (event) => {
      event.preventDefault();
      deleteSpy();
    };
    const el = await fixture(
      html`
                <sp-tag deletable @delete=${handleDelete}>Tag</sp-tag>
            `
    );
    const removeStub = stub(el, "remove");
    await elementUpdated(el);
    expect(deleteSpy.called).to.be.false;
    const deleteButton = el.shadowRoot.querySelector(
      "sp-clear-button"
    );
    deleteButton.click();
    expect(deleteSpy.callCount).to.equal(1);
    expect(removeStub.called).to.be.false;
  });
});
//# sourceMappingURL=tag.test.js.map
