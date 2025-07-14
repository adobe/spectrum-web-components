"use strict";
import { html } from "@spectrum-web-components/base";
import { elementUpdated, expect, fixture } from "@open-wc/testing";
import { sendKeys } from "@web/test-runner-commands";
import { spy } from "sinon";
import { Accordion, AccordionItem } from "@spectrum-web-components/accordion";
import "@spectrum-web-components/accordion/sp-accordion.js";
import "@spectrum-web-components/accordion/sp-accordion-item.js";
describe("Accordion - keyboard", () => {
  it("does not accept keyboard events when items are not present", async () => {
    const errorSpy = spy();
    const el = await fixture(html`
            <sp-accordion>
                <sp-accordion-item disabled label="Heading 2">
                    <div>Item 2</div>
                </sp-accordion-item>
            </sp-accordion>
        `);
    await elementUpdated(el);
    const item = el.querySelector("sp-accordion-item");
    window.addEventListener("error", () => errorSpy());
    el.focus();
    item.remove();
    await elementUpdated(el);
    el.dispatchEvent(
      new KeyboardEvent("keydown", {
        code: "ArrowDown"
      })
    );
    expect(errorSpy.callCount).to.equal(0);
  });
  it("handles focus and keyboard input and ignores disabled items", async () => {
    var _a;
    const el = await fixture(html`
            <sp-accordion allow-multiple>
                <sp-accordion-item disabled label="Heading 1">
                    <div>Item 1</div>
                </sp-accordion-item>
                <sp-accordion-item label="Heading 2">
                    <div>Item 2</div>
                </sp-accordion-item>
                <sp-accordion-item label="Heading 3">
                    <div>Item 3</div>
                </sp-accordion-item>
                <sp-accordion-item label="Heading 4">
                    <div>Item 4</div>
                </sp-accordion-item>
                <sp-accordion-item label="Heading 5">
                    <div>Item 5</div>
                </sp-accordion-item>
                <sp-accordion-item disabled label="Heading 6">
                    <div>Item 6</div>
                </sp-accordion-item>
            </sp-accordion>
        `);
    await elementUpdated(el);
    const secondItem = el.querySelector(
      "sp-accordion-item:nth-of-type(2)"
    );
    const thirdItem = el.querySelector(
      "sp-accordion-item:nth-of-type(3)"
    );
    const fourthItem = el.querySelector(
      "sp-accordion-item:nth-of-type(4)"
    );
    const isSafari = /^((?!chrome|android).)*safari/i.test(
      navigator.userAgent
    );
    const tab = isSafari ? "Alt+Tab" : "Tab";
    const shiftTab = isSafari ? "Alt+Shift+Tab" : "Shift+Tab";
    el.focus();
    await elementUpdated(el);
    expect(
      document.activeElement === secondItem,
      (_a = document.activeElement) == null ? void 0 : _a.localName
    ).to.be.true;
    await sendKeys({
      press: tab
    });
    expect(document.activeElement === thirdItem).to.be.true;
    await sendKeys({
      press: tab
    });
    expect(document.activeElement === fourthItem).to.be.true;
    await sendKeys({
      press: shiftTab
    });
    await sendKeys({
      press: shiftTab
    });
    expect(document.activeElement === secondItem).to.be.true;
    document.body.focus();
    el.focus();
    expect(document.activeElement === secondItem).to.be.true;
    await sendKeys({
      press: shiftTab
    });
    await elementUpdated(el);
    const outsideFocused = document.activeElement;
    expect(typeof outsideFocused).not.to.equal(AccordionItem);
    expect(typeof outsideFocused).not.to.equal(Accordion);
  });
});
describe("Accordion Item - keyboard", () => {
  it("dispatches toggle event on enter key", async () => {
    let open = false;
    const onAccordionToggle = () => {
      open = true;
    };
    const el = await fixture(html`
            <sp-accordion-item
                disabled
                @sp-accordion-item-toggle=${onAccordionToggle}
            >
                <div>Item 1</div>
            </sp-accordion-item>
        `);
    await elementUpdated(el);
    expect(open).to.be.false;
    el.focus();
    await sendKeys({
      press: "Enter"
    });
    await elementUpdated(el);
    expect(open).to.be.false;
    el.disabled = false;
    await elementUpdated(el);
    el.focus();
    await sendKeys({
      press: "Enter"
    });
    await elementUpdated(el);
    expect(open).to.be.true;
  });
  it("dispatches toggle event on space key", async () => {
    let open = false;
    const onAccordionToggle = () => {
      open = true;
    };
    const el = await fixture(html`
            <sp-accordion-item
                disabled
                @sp-accordion-item-toggle=${onAccordionToggle}
            >
                <div>Item 1</div>
            </sp-accordion-item>
        `);
    await elementUpdated(el);
    expect(open).to.be.false;
    el.focus();
    await sendKeys({
      press: "Space"
    });
    await elementUpdated(el);
    expect(open).to.be.false;
    el.disabled = false;
    await elementUpdated(el);
    el.focus();
    await sendKeys({
      press: "Space"
    });
    await elementUpdated(el);
    expect(open).to.be.true;
  });
  it("does not dispatch toggle events on key events in Item content", async () => {
    let closed = false;
    const onAccordionToggle = () => {
      closed = true;
    };
    const el = await fixture(html`
            <sp-accordion-item
                open
                @sp-accordion-item-toggle=${onAccordionToggle}
            >
                <div>
                    <button>Test Button</button>
                </div>
            </sp-accordion-item>
        `);
    const button = el.querySelector("button");
    await elementUpdated(el);
    expect(el.open).to.be.true;
    expect(closed).to.be.false;
    button.focus();
    await sendKeys({
      press: "Space"
    });
    await elementUpdated(el);
    expect(closed).to.be.false;
    await elementUpdated(el);
    await sendKeys({
      press: "Enter"
    });
    await elementUpdated(el);
    expect(closed).to.be.false;
    expect(el.open).to.be.true;
  });
});
//# sourceMappingURL=keyboard.test.js.map
