"use strict";
import { elementUpdated, expect, html, litFixture } from "@open-wc/testing";
import { sendKeys } from "@web/test-runner-commands";
import { sendMouse } from "../../../test/plugins/browser.js";
import { findDescribedNode } from "../../../test/testing-helpers-a11y.js";
import "@spectrum-web-components/help-text/sp-help-text.js";
import "@spectrum-web-components/textfield/sp-textfield.js";
import { testForLitDevWarnings } from "../../../test/testing-helpers.js";
import {
  isFirefox,
  isWebKit
} from "@spectrum-web-components/shared/src/platform.js";
import { fixture } from "../../../test/testing-helpers.js";
describe("Textfield", () => {
  testForLitDevWarnings(
    async () => await litFixture(html`
                <sp-textfield label="Enter Your Name"></sp-textfield>
            `)
  );
  it("loads default textfield accessibly", async () => {
    const el = await litFixture(html`
            <sp-textfield label="Enter Your Name"></sp-textfield>
        `);
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  it("loads multiline textfield accessibly", async () => {
    const el = await litFixture(html`
            <sp-textfield label="Enter your name" multiline></sp-textfield>
        `);
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  it("manages tabIndex while disabled", async () => {
    const el = await litFixture(html`
            <sp-textfield placeholder="Enter Your Name"></sp-textfield>
        `);
    await elementUpdated(el);
    expect(el.tabIndex).to.equal(0);
    el.disabled = true;
    await elementUpdated(el);
    expect(el.tabIndex).to.equal(-1);
    el.tabIndex = 2;
    await elementUpdated(el);
    expect(el.tabIndex).to.equal(-1);
    el.disabled = false;
    await elementUpdated(el);
    expect(el.tabIndex).to.equal(2);
  });
  it("manages tabIndex before first render", async () => {
    const el = document.createElement("sp-textfield");
    expect(el.focusElement).to.be.null;
    expect(el.tabIndex).to.equal(0);
    el.remove();
  });
  it("loads", async () => {
    const testPlaceholder = "Enter your name";
    const el = await litFixture(html`
            <sp-textfield placeholder=${testPlaceholder}></sp-textfield>
        `);
    expect(el).to.not.equal(void 0);
    const input = el.shadowRoot ? el.shadowRoot.querySelector("input") : null;
    expect(input).to.not.be.null;
    const placeholder = input ? input.placeholder : null;
    expect(placeholder).to.equal(testPlaceholder);
  });
  it("multiline", async () => {
    const el = await litFixture(html`
            <sp-textfield
                placeholder="Enter your name"
                multiline
            ></sp-textfield>
        `);
    expect(el).to.not.equal(void 0);
    const input = el.shadowRoot ? el.shadowRoot.querySelector("textarea") : null;
    expect(input).to.not.be.null;
  });
  it("multiline with rows", async () => {
    const el = await litFixture(html`
            <sp-textfield
                placeholder="Enter your name"
                multiline
                rows="5"
            ></sp-textfield>
        `);
    expect(el).to.not.equal(void 0);
    const input = el.shadowRoot ? el.shadowRoot.querySelector("textarea") : null;
    expect(input).to.not.be.null;
    expect(input == null ? void 0 : input.getAttribute("rows")).to.equal("5");
  });
  it("multiline with 1 row has smaller height than multiline without explicit rows", async () => {
    var _a;
    const oneRowEl = await litFixture(html`
            <sp-textfield
                placeholder="Enter your name"
                multiline
                rows="1"
            ></sp-textfield>
        `);
    expect(oneRowEl).to.not.equal(void 0);
    const oneRowTextarea = oneRowEl.shadowRoot ? oneRowEl.shadowRoot.querySelector("textarea") : null;
    expect(oneRowTextarea).to.not.be.null;
    expect(oneRowTextarea == null ? void 0 : oneRowTextarea.getAttribute("rows")).to.equal("1");
    const defaultEL = await litFixture(html`
            <sp-textfield
                placeholder="Enter your name"
                multiline
            ></sp-textfield>
        `);
    expect(defaultEL).to.not.equal(void 0);
    const defaultTextarea = oneRowEl.shadowRoot ? defaultEL.shadowRoot.querySelector("textarea") : null;
    expect(defaultTextarea).to.not.be.null;
    expect(defaultTextarea == null ? void 0 : defaultTextarea.getAttribute("rows")).to.be.null;
    const boundsDefaultElement = defaultTextarea == null ? void 0 : defaultTextarea.getBoundingClientRect();
    const boundsOneRowElement = oneRowTextarea == null ? void 0 : oneRowTextarea.getBoundingClientRect();
    expect(boundsDefaultElement == null ? void 0 : boundsDefaultElement.height).to.be.greaterThan(
      (_a = boundsOneRowElement == null ? void 0 : boundsOneRowElement.height) != null ? _a : 0
    );
  });
  it("multiline with rows does not resize", async () => {
    const el = await litFixture(html`
            <sp-textfield
                multiline
                rows="5"
                label="No resize control"
                placeholder="No resize control"
            ></sp-textfield>
        `);
    const sizedElement = el.focusElement;
    const startBounds = sizedElement.getBoundingClientRect();
    await sendMouse({
      steps: [
        {
          type: "move",
          position: [startBounds.right - 6, startBounds.bottom - 6]
        },
        {
          type: "down"
        },
        {
          type: "move",
          position: [startBounds.right + 50, startBounds.bottom + 50]
        },
        {
          type: "up"
        }
      ]
    });
    const endBounds = sizedElement.getBoundingClientRect();
    expect(endBounds.height).equals(startBounds.height);
    expect(endBounds.width).equals(startBounds.width);
  });
  it("resizes by default", async function() {
    if (isWebKit()) {
      this.skip();
    }
    const el = await fixture(html`
            <sp-textfield
                multiline
                label="No resize control"
                placeholder="No resize control"
            ></sp-textfield>
        `);
    const sizedElement = el.focusElement;
    const startBounds = sizedElement.getBoundingClientRect();
    await sendMouse({
      steps: [
        {
          type: "move",
          position: [startBounds.right - 6, startBounds.bottom - 6]
        },
        {
          type: "down"
        },
        {
          type: "move",
          position: [startBounds.right + 50, startBounds.bottom + 50]
        },
        {
          type: "up"
        }
      ]
    });
    const endBounds = sizedElement.getBoundingClientRect();
    expect(endBounds.height).to.be.greaterThan(startBounds.height);
    expect(endBounds.width).to.be.greaterThan(startBounds.width);
  });
  it("accepts resize styling", async () => {
    const el = await litFixture(html`
            <sp-textfield
                multiline
                style="resize: none;"
                label="No resize control"
                placeholder="No resize control"
            ></sp-textfield>
        `);
    const startBounds = el.getBoundingClientRect();
    await sendMouse({
      steps: [
        {
          type: "move",
          position: [startBounds.right - 2, startBounds.bottom - 2]
        },
        {
          type: "down"
        },
        {
          type: "move",
          position: [startBounds.right + 50, startBounds.bottom + 50]
        },
        {
          type: "up"
        }
      ]
    });
    const endBounds = el.getBoundingClientRect();
    expect(endBounds.width).equals(startBounds.width);
    expect(endBounds.height).equals(startBounds.height);
  });
  it("grows", async () => {
    const el = await litFixture(html`
            <sp-textfield
                placeholder="Enter your name"
                multiline
                grows
            ></sp-textfield>
        `);
    expect(el).to.not.equal(void 0);
    const sizer = el.shadowRoot ? el.shadowRoot.querySelector("#sizer") : null;
    expect(sizer).to.not.be.null;
  });
  it("multiline with rows and grows does not grow", async () => {
    const el = await litFixture(html`
            <sp-textfield
                placeholder="Enter your name"
                multiline
                grows
                rows="5"
            ></sp-textfield>
        `);
    expect(el).to.not.equal(void 0);
    const sizer = el.shadowRoot ? el.shadowRoot.querySelector("#sizer") : null;
    expect(sizer).to.be.null;
  });
  it("multiline with grows actually grow", async () => {
    const el = await litFixture(html`
            <sp-textfield
                placeholder="Enter your name"
                multiline
                grows
            ></sp-textfield>
        `);
    expect(el).to.not.equal(void 0);
    const textArea = el.shadowRoot.querySelector("textarea");
    expect(textArea).to.not.be.null;
    if (textArea) {
      const initialHeight = textArea.offsetHeight;
      el.focus();
      el.select();
      for (let i = 0; i < 100; i++) {
        await sendKeys({
          type: "ab"
        });
        await sendKeys({ press: "Enter" });
      }
      const finalHeight = textArea.offsetHeight;
      expect(initialHeight).to.be.lt(finalHeight);
    }
  });
  it("valid", async () => {
    const el = await litFixture(html`
            <sp-textfield
                placeholder="Enter your number"
                pattern="[\\d]+"
                value="123"
                required
            ></sp-textfield>
        `);
    await elementUpdated(el);
    expect(el).to.not.equal(void 0);
    const input = el.shadowRoot ? el.shadowRoot.querySelector("#valid") : null;
    expect(input).to.not.be.null;
  });
  it("handles `name` attribute", async () => {
    const el = await litFixture(html`
            <sp-textfield placeholder="Enter your name"></sp-textfield>
        `);
    expect(el).to.not.equal(void 0);
    expect(el.name).to.be.undefined;
    el.setAttribute("name", "test");
    expect(el.name).to.be.equal("test");
  });
  it("handles `name` attribute with multiline", async () => {
    const el = await litFixture(html`
            <sp-textfield
                name="name"
                placeholder="Enter your name"
                multiline
            ></sp-textfield>
        `);
    expect(el).to.not.equal(void 0);
    const input = el.shadowRoot ? el.shadowRoot.querySelector("textarea") : null;
    expect(input == null ? void 0 : input.name).to.equal("name");
  });
  it("valid - multiline", async () => {
    const el = await litFixture(html`
            <sp-textfield
                placeholder="Enter your number"
                pattern="[\\d]+"
                value="123"
                required
                multiline
            ></sp-textfield>
        `);
    await elementUpdated(el);
    expect(el).to.not.equal(void 0);
    const input = el.shadowRoot ? el.shadowRoot.querySelector("#valid") : null;
    expect(input).to.not.be.null;
  });
  it("valid - required", async () => {
    const el = await litFixture(html`
            <sp-textfield
                placeholder="Enter your number"
                value="123"
                required
            ></sp-textfield>
        `);
    await elementUpdated(el);
    expect(el).to.not.equal(void 0);
    const input = el.shadowRoot ? el.shadowRoot.querySelector("#valid") : null;
    expect(input).to.not.be.null;
  });
  it("valid - multiline - required", async () => {
    const el = await litFixture(html`
            <sp-textfield
                placeholder="Enter your number"
                value="123"
                required
                multiline
            ></sp-textfield>
        `);
    await elementUpdated(el);
    expect(el).to.not.equal(void 0);
    const input = el.shadowRoot ? el.shadowRoot.querySelector("#valid") : null;
    expect(input).to.not.be.null;
  });
  it("valid - boundary-type assertions", async () => {
    const el = await litFixture(html`
            <sp-textfield
                placeholder="Enter your number"
                pattern="^[\\d]+$"
                value="123"
                required
            ></sp-textfield>
        `);
    await elementUpdated(el);
    expect(el).to.not.equal(void 0);
    const input = el.shadowRoot ? el.shadowRoot.querySelector("#valid") : null;
    expect(input).to.not.be.null;
  });
  it("valid - multiline - boundary-type assertions", async () => {
    const el = await litFixture(html`
            <sp-textfield
                placeholder="Enter your number"
                pattern="^[\\d]+$"
                value="123"
                required
                multiline
            ></sp-textfield>
        `);
    await elementUpdated(el);
    expect(el).to.not.equal(void 0);
    const input = el.shadowRoot ? el.shadowRoot.querySelector("#valid") : null;
    expect(input).to.not.be.null;
  });
  it("valid - boundary-type assertions and title", async () => {
    const el = await litFixture(html`
            <sp-textfield
                placeholder="Enter your number"
                pattern="^[\\d]+$"
                value="123"
            ></sp-textfield>
        `);
    await elementUpdated(el);
    expect(el).to.not.equal(void 0);
    const input = el.shadowRoot.querySelector("#valid");
    expect(input).to.not.be.null;
    expect(el.focusElement).to.not.have.attribute("title");
  });
  it("valid - multiline - boundary-type assertions and title", async () => {
    const el = await litFixture(html`
            <sp-textfield
                multiline
                placeholder="Enter your number"
                pattern="^[\\d]+$"
                value="123"
            ></sp-textfield>
        `);
    await elementUpdated(el);
    expect(el).to.not.equal(void 0);
    const input = el.shadowRoot.querySelector("#valid");
    expect(input).to.not.be.null;
    expect(el.focusElement).to.not.have.attribute("title");
  });
  it("valid - unicode", async () => {
    const el = await litFixture(html`
            <sp-textfield
                placeholder="Enter your name"
                pattern="\\p{L}{4,8}"
                value="你的名字"
                required
            ></sp-textfield>
        `);
    await elementUpdated(el);
    expect(el).to.not.equal(void 0);
    const input = el.shadowRoot ? el.shadowRoot.querySelector("#valid") : null;
    expect(input).to.not.be.null;
  });
  it("valid - multiline - unicode", async () => {
    const el = await litFixture(html`
            <sp-textfield
                placeholder="Enter your name"
                pattern="\\p{L}{4,8}"
                value="你的名字"
                required
                multiline
            ></sp-textfield>
        `);
    await elementUpdated(el);
    expect(el).to.not.equal(void 0);
    const input = el.shadowRoot ? el.shadowRoot.querySelector("#valid") : null;
    expect(input).to.not.be.null;
  });
  it("invalid", async () => {
    const el = await litFixture(html`
            <sp-textfield
                placeholder="Enter your number"
                pattern="[\\d]+"
                value="123 not valid"
                required
            ></sp-textfield>
        `);
    await elementUpdated(el);
    expect(el).to.not.equal(void 0);
    const input = el.shadowRoot ? el.shadowRoot.querySelector("#invalid") : null;
    expect(input).to.not.be.null;
  });
  it("invalid - multiline", async () => {
    const el = await litFixture(html`
            <sp-textfield
                placeholder="Enter your number"
                pattern="[\\d]+"
                value="123 not valid"
                required
                multiline
            ></sp-textfield>
        `);
    await elementUpdated(el);
    expect(el).to.not.equal(void 0);
    const input = el.shadowRoot ? el.shadowRoot.querySelector("#invalid") : null;
    expect(input).to.not.be.null;
  });
  it("invalid - required", async () => {
    const el = await litFixture(html`
            <sp-textfield
                placeholder="Enter your number"
                value=""
                required
            ></sp-textfield>
        `);
    await elementUpdated(el);
    expect(el).to.not.equal(void 0);
    const input = el.shadowRoot ? el.shadowRoot.querySelector("#invalid") : null;
    expect(input).to.not.be.null;
  });
  it("invalid - multiline - required", async () => {
    const el = await litFixture(html`
            <sp-textfield
                placeholder="Enter your number"
                value=""
                required
                multiline
            ></sp-textfield>
        `);
    await elementUpdated(el);
    expect(el).to.not.equal(void 0);
    const input = el.shadowRoot ? el.shadowRoot.querySelector("#invalid") : null;
    expect(input).to.not.be.null;
  });
  it("invalid - unicode", async () => {
    const el = await litFixture(html`
            <sp-textfield
                placeholder="Enter your number"
                pattern="\\p{N}+"
                value="123 not valid"
                required
            ></sp-textfield>
        `);
    await elementUpdated(el);
    expect(el).to.not.equal(void 0);
    const input = el.shadowRoot ? el.shadowRoot.querySelector("#invalid") : null;
    expect(input).to.not.be.null;
  });
  it("invalid - multiline - unicode", async () => {
    const el = await litFixture(html`
            <sp-textfield
                placeholder="Enter your number"
                pattern="\\p{N}+"
                value="123 not valid"
                required
                multiline
            ></sp-textfield>
        `);
    await elementUpdated(el);
    expect(el).to.not.equal(void 0);
    const input = el.shadowRoot ? el.shadowRoot.querySelector("#invalid") : null;
    expect(input).to.not.be.null;
  });
  it("invalid - boundary-type assertions", async () => {
    const el = await litFixture(html`
            <sp-textfield
                placeholder="Enter your number"
                pattern="^\\p{N}+$"
                value="123 not valid"
                required
            ></sp-textfield>
        `);
    await elementUpdated(el);
    expect(el).to.not.equal(void 0);
    const input = el.shadowRoot ? el.shadowRoot.querySelector("#invalid") : null;
    expect(input).to.not.be.null;
  });
  it("invalid - boundary-type assertions and title", async () => {
    const el = await litFixture(html`
            <sp-textfield
                placeholder="Enter your number"
                type="url"
                value="invalid-email"
                invalid
            ></sp-textfield>
        `);
    await elementUpdated(el);
    expect(el).to.not.equal(void 0);
    const input = el.shadowRoot.querySelector("#invalid");
    expect(input).to.not.be.null;
    expect(el.focusElement).to.have.attribute("title");
  });
  it("invalid - multiline - boundary-type assertions and title", async () => {
    const el = await litFixture(html`
            <sp-textfield
                multiline
                placeholder="Enter your number"
                type="url"
                value="invalid-email"
                invalid
            ></sp-textfield>
        `);
    await elementUpdated(el);
    expect(el).to.not.equal(void 0);
    const input = el.shadowRoot.querySelector("#invalid");
    expect(input).to.not.be.null;
    expect(el.focusElement).to.have.attribute("title");
  });
  it("invalid - multiline - boundary-type assertions", async () => {
    const el = await litFixture(html`
            <sp-textfield
                placeholder="Enter your number"
                pattern="^\\p{N}+$"
                value="123 not valid"
                required
                multiline
            ></sp-textfield>
        `);
    await elementUpdated(el);
    expect(el).to.not.equal(void 0);
    const input = el.shadowRoot ? el.shadowRoot.querySelector("#invalid") : null;
    expect(input).to.not.be.null;
  });
  it("receives focus", async () => {
    let activeElement = null;
    const onFocusIn = (event) => {
      const path = event.composedPath();
      activeElement = path[0];
    };
    document.addEventListener("focusin", onFocusIn);
    const el = await litFixture(html`
            <sp-textfield placeholder="Enter your name"></sp-textfield>
        `);
    await elementUpdated(el);
    el.focus();
    await elementUpdated(el);
    expect(activeElement === el.focusElement).to.be.true;
    document.removeEventListener("focusin", onFocusIn);
  });
  it("does not receive focus when disabled", async () => {
    let activeElement = null;
    const onFocusIn = (event) => {
      const path = event.composedPath();
      activeElement = path[0];
    };
    document.addEventListener("focusin", onFocusIn);
    const el = await litFixture(html`
            <sp-textfield disabled placeholder="Enter your name"></sp-textfield>
        `);
    await elementUpdated(el);
    el.focus();
    await elementUpdated(el);
    expect(activeElement === el.focusElement).to.be.false;
    expect(document.activeElement === el).to.be.false;
    document.removeEventListener("focusin", onFocusIn);
    el.click();
    await elementUpdated(el);
    expect(activeElement === el.focusElement).to.be.false;
    expect(document.activeElement === el).to.be.false;
    document.removeEventListener("focusin", onFocusIn);
  });
  it("accepts input", async () => {
    const testValue = "Test Name";
    const el = await litFixture(html`
            <sp-textfield placeholder="Enter your name"></sp-textfield>
        `);
    await elementUpdated(el);
    el.focusElement.value = testValue;
    el.focusElement.dispatchEvent(new Event("input"));
    expect(el.value).to.equal(testValue);
  });
  it("selects", async () => {
    const testValue = "Test Name";
    const el = await litFixture(html`
            <sp-textfield value=${testValue}></sp-textfield>
        `);
    await elementUpdated(el);
    expect(el.value).to.equal(testValue);
    el.focus();
    el.select();
    await sendKeys({ press: "Backspace" });
    expect(el.value).to.equal("");
  });
  it("setSelectionRange", async () => {
    const testValue = "Test Name";
    const el = await litFixture(html`
            <sp-textfield value=${testValue}></sp-textfield>
        `);
    await elementUpdated(el);
    expect(el.value).to.equal(testValue);
    el.focus();
    el.setSelectionRange(0, "Test ".length);
    await sendKeys({ press: "Backspace" });
    expect(el.value).to.equal("Name");
  });
  it("handles minlength with required", async () => {
    const el = await litFixture(html`
            <sp-textfield required minlength="3"></sp-textfield>
        `);
    el.focus();
    await sendKeys({
      type: "ab"
    });
    await elementUpdated(el);
    expect(el.value).to.equal("ab");
    expect(el.checkValidity()).to.be.false;
    await sendKeys({
      type: "c"
    });
    await elementUpdated(el);
    expect(el.value).to.equal("abc");
    expect(el.checkValidity()).to.be.true;
  });
  it("accepts maxlength", async () => {
    const el = await litFixture(html`
            <sp-textfield
                placeholder="Enter your name"
                maxlength="3"
                minlength="2"
                required
            ></sp-textfield>
        `);
    await elementUpdated(el);
    el.focus();
    await sendKeys({
      type: "a"
    });
    await elementUpdated(el);
    expect(el.value).to.equal("a");
    expect(el.checkValidity()).to.be.false;
    await sendKeys({
      type: "b"
    });
    await elementUpdated(el);
    expect(el.value).to.equal("ab");
    expect(el.checkValidity());
    await sendKeys({
      type: "c"
    });
    await elementUpdated(el);
    expect(el.value).to.equal("abc");
    expect(el.checkValidity());
    await sendKeys({
      type: "d"
    });
    await elementUpdated(el);
    expect(el.value).to.equal("abc");
    expect(el.checkValidity());
    await sendKeys({
      press: "Backspace"
    });
    await elementUpdated(el);
    expect(el.value).to.equal("ab");
    expect(el.checkValidity());
    await sendKeys({
      press: "Backspace"
    });
    await elementUpdated(el);
    expect(el.value).to.equal("a");
    expect(el.checkValidity()).to.be.false;
  });
  it("dispatches a `change` event", async () => {
    const testValue = "Test Name";
    let eventSource = null;
    const onChange = (event) => {
      eventSource = event.composedPath()[0];
    };
    const el = await litFixture(html`
            <sp-textfield
                placeholder="Enter your name"
                @change=${onChange}
            ></sp-textfield>
        `);
    await elementUpdated(el);
    el.focusElement.value = testValue;
    el.focusElement.dispatchEvent(new Event("input"));
    el.focusElement.dispatchEvent(new Event("change"));
    expect(el.value).to.equal(testValue);
    const testSource = eventSource;
    expect(testSource).to.equal(el);
  });
  it("passes through `autocomplete` attribute", async () => {
    let el = await litFixture(html`
            <sp-textfield autocomplete="off"></sp-textfield>
        `);
    await elementUpdated(el);
    let input = el.shadowRoot ? el.shadowRoot.querySelector("input") : null;
    expect(input).to.exist;
    if (input) {
      expect(input.getAttribute("autocomplete")).to.equal("off");
    }
    el = await litFixture(html`
            <sp-textfield></sp-textfield>
        `);
    await elementUpdated(el);
    input = el.shadowRoot ? el.shadowRoot.querySelector("input") : null;
    expect(input).to.exist;
    if (input) {
      expect(input.getAttribute("autocomplete")).to.not.exist;
    }
  });
  it("tests on `required` changes", async () => {
    const el = await litFixture(html`
            <sp-textfield value=""></sp-textfield>
        `);
    await elementUpdated(el);
    expect(el.invalid).to.be.false;
    el.required = true;
    await elementUpdated(el);
    expect(el.invalid).to.be.true;
  });
  it("manages `allowed-keys`", async () => {
    const el = await litFixture(html`
            <sp-textfield allowed-keys="asdf"></sp-textfield>
        `);
    await elementUpdated(el);
    expect(el.value).to.equal("");
    const inputElement = el.focusElement;
    el.focusElement.value = "asdf";
    inputElement.dispatchEvent(new InputEvent("input"));
    await elementUpdated(el);
    expect(el.value).to.equal("asdf");
    inputElement.value = `asdff`;
    inputElement.setSelectionRange(1, 1);
    inputElement.dispatchEvent(new InputEvent("input"));
    await elementUpdated(el);
    expect(el.value).to.equal("asdff");
    expect(inputElement.selectionStart).to.equal(1);
    inputElement.value = `asdoff`;
    inputElement.setSelectionRange(4, 4);
    inputElement.dispatchEvent(new InputEvent("input"));
    await elementUpdated(el);
    expect(el.value).to.equal("asdff");
    expect(inputElement.selectionStart).to.equal(3);
  });
  describe("type attribute", () => {
    it("assigns valid attributes to the property", async () => {
      const types = [
        "text",
        "url",
        "tel",
        "email",
        "password"
      ];
      for await (const t of types) {
        const el = await litFixture(html`
                    <sp-textfield type=${t}></sp-textfield>
                `);
        expect(el.type).equals(t);
        el.setAttribute("type", "url");
        expect(el.type).equals("url");
      }
    });
    it('represents invalid and missing attributes as "text"', async () => {
      const el1 = await litFixture(html`
                <sp-textfield></sp-textfield>
            `);
      const el2 = await litFixture(html`
                <sp-textfield type="time"></sp-textfield>
            `);
      expect(el1.type).equals("text");
      expect(el2.type).equals("text");
      el1.setAttribute("type", "submit");
      expect(el1.type).equals("text");
    });
    it("reflects valid property assignments", async () => {
      const el = await litFixture(html`
                <sp-textfield type="url"></sp-textfield>
            `);
      el.type = "email";
      await elementUpdated(el);
      expect(el.getAttribute("type")).equals("email");
      expect(el.type).equals("email");
    });
    it('reflects invalid assignments but sets state to "text"', async () => {
      const el = await litFixture(html`
                <sp-textfield type="url"></sp-textfield>
            `);
      el.type = "range";
      await elementUpdated(el);
      expect(el.getAttribute("type")).equals("range");
      expect(el.type).equals("text");
    });
  });
  describe("help text", () => {
    const name = "This is a textfield";
    const description = "This text helps you fill it out";
    const descriptionNegative = "This text helps you when invalid";
    it('accepts help text in `slot="help-text"`', async () => {
      const el = await litFixture(html`
                <sp-textfield label=${name}>
                    <sp-help-text slot="help-text">${description}</sp-help-text>
                </sp-textfield>
            `);
      await elementUpdated(el);
      await findDescribedNode(name, description);
    });
    it('accepts help text in `slot="help-text"` w/ own ID', async () => {
      const el = await litFixture(html`
                <sp-textfield label=${name}>
                    <sp-help-text slot="help-text" id="help-text-id-1">
                        ${description}
                    </sp-help-text>
                </sp-textfield>
            `);
      await elementUpdated(el);
      await findDescribedNode(name, description);
    });
    it("manages neutral/negative help text pairs", async () => {
      const el = await litFixture(html`
                <sp-textfield label=${name}>
                    <sp-help-text slot="help-text">${description}</sp-help-text>
                    <sp-help-text slot="negative-help-text">
                        ${descriptionNegative}
                    </sp-help-text>
                </sp-textfield>
            `);
      const negativeHelpText = el.querySelector(
        '[slot="negative-help-text"]'
      );
      await elementUpdated(el);
      expect(negativeHelpText.variant).to.equal("neutral");
      await findDescribedNode(name, description);
      el.invalid = true;
      await elementUpdated(el);
      expect(negativeHelpText.variant).to.equal("negative");
      try {
        await findDescribedNode(name, descriptionNegative);
        if (isFirefox()) {
          throw new Error("this does not fail anymore...");
        }
      } catch (error) {
        if (!isFirefox()) {
          throw error;
        }
      }
    });
    it("manages neutral/negative help text pairs w/ own IDs", async () => {
      const el = await litFixture(html`
                <sp-textfield label=${name}>
                    <sp-help-text slot="help-text" id="help-text-id-2">
                        ${description}
                    </sp-help-text>
                    <sp-help-text slot="negative-help-text" id="help-text-id-3">
                        ${descriptionNegative}
                    </sp-help-text>
                </sp-textfield>
            `);
      const negativeHelpText = el.querySelector(
        '[slot="negative-help-text"]'
      );
      await elementUpdated(el);
      expect(negativeHelpText.variant).to.equal("neutral");
      await findDescribedNode(name, description);
      el.invalid = true;
      await elementUpdated(el);
      expect(negativeHelpText.variant).to.equal("negative");
      try {
        await findDescribedNode(name, descriptionNegative);
        if (isFirefox()) {
          throw new Error("this does not fail anymore...");
        }
      } catch (error) {
        if (!isFirefox()) {
          throw error;
        }
      }
    });
  });
});
//# sourceMappingURL=textfield.test.js.map
