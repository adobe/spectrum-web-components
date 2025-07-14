"use strict";
import "@spectrum-web-components/radio/sp-radio-group.js";
import "@spectrum-web-components/radio/sp-radio.js";
import {
  elementUpdated,
  expect,
  fixture,
  html,
  nextFrame
} from "@open-wc/testing";
import {
  arrowDownEvent,
  arrowLeftEvent,
  arrowRightEvent,
  arrowUpEvent,
  endEvent,
  enterEvent,
  homeEvent
} from "../../../test/testing-helpers.js";
import {
  a11ySnapshot,
  findAccessibilityNode,
  sendKeys
} from "@web/test-runner-commands";
import { sendMouse } from "../../../test/plugins/browser.js";
import { spy } from "sinon";
describe("Radio Group - focus control", () => {
  it("does not accept focus when empty", async () => {
    const el = await fixture(
      html`
                <sp-radio-group></sp-radio-group>
            `
    );
    await elementUpdated(el);
    expect(document.activeElement === el).to.be.false;
    el.focus();
    await elementUpdated(el);
    expect(document.activeElement === el).to.be.false;
  });
  it("focuses selected before first", async () => {
    const values = ["first", "second", "third"];
    const el = await fixture(
      html`
                <sp-radio-group selected="second">
                    <sp-radio value=${values[0]}>Option 1</sp-radio>
                    <sp-radio value=${values[1]}>Option 2</sp-radio>
                    <sp-radio value=${values[2]}>Option 3</sp-radio>
                </sp-radio-group>
            `
    );
    await elementUpdated(el);
    const selected = el.querySelector('[value="second"]');
    expect(document.activeElement === el).to.be.false;
    el.focus();
    await elementUpdated(el);
    expect(document.activeElement === selected).to.be.true;
  });
  it("focuses the child input not the root when [tabindex=-1]", async () => {
    const values = ["first", "second", "third"];
    const el = await fixture(
      html`
                <sp-radio-group selected="second">
                    <sp-radio value=${values[0]}>Option 1</sp-radio>
                    <sp-radio value=${values[1]}>Option 2</sp-radio>
                    <sp-radio value=${values[2]}>Option 3</sp-radio>
                </sp-radio-group>
            `
    );
    await elementUpdated(el);
    const first = el.querySelector('[value="first"]');
    const selected = el.querySelector('[value="second"]');
    expect(selected.tabIndex).to.equal(0);
    expect(first.tabIndex).to.equal(-1);
    const firstRect = first.getBoundingClientRect();
    await sendMouse({
      steps: [
        {
          type: "move",
          position: [firstRect.x + 2, firstRect.y + 2]
        },
        {
          type: "down"
        }
      ]
    });
    await elementUpdated(el);
    expect(
      !first.matches(":focus") || first.matches(":focus-within"),
      "root should not"
    ).to.be.true;
  });
  it("does not select on focus", async () => {
    const el = await fixture(
      html`
                <sp-radio-group>
                    <sp-radio value="1">Options 1</sp-radio>
                    <sp-radio value="2">Options 2</sp-radio>
                    <sp-radio value="3">Options 3</sp-radio>
                    <sp-radio value="4">Options 4</sp-radio>
                    <sp-radio value="5">Options 5</sp-radio>
                </sp-radio-group>
            `
    );
    await elementUpdated(el);
    const radio1 = el.querySelector("sp-radio:nth-child(1)");
    const radio2 = el.querySelector("sp-radio:nth-child(2)");
    expect(el.selected).to.equal("");
    radio1.focus();
    await elementUpdated(el);
    expect(el.selected).to.equal("");
    el.selected = "1";
    await elementUpdated(el);
    expect(el.selected).to.equal("1");
    expect(radio1.checked).to.be.true;
    radio2.focus();
    await elementUpdated(el);
    expect(el.selected).to.equal("1");
    expect(radio1.checked).to.be.true;
  });
  it("loads accepts keyboard events while focused", async () => {
    const el = await fixture(
      html`
                <sp-radio-group>
                    <sp-radio>Options 1</sp-radio>
                    <sp-radio>Options 2</sp-radio>
                    <sp-radio>Options 3</sp-radio>
                    <sp-radio>Options 4</sp-radio>
                    <sp-radio>Options 5</sp-radio>
                </sp-radio-group>
            `
    );
    await elementUpdated(el);
    const radio1 = el.querySelector("sp-radio:nth-child(1)");
    const radio2 = el.querySelector("sp-radio:nth-child(2)");
    const radio3 = el.querySelector("sp-radio:nth-child(3)");
    const radio4 = el.querySelector("sp-radio:nth-child(4)");
    const radio5 = el.querySelector("sp-radio:nth-child(5)");
    radio1.focus();
    await elementUpdated(el);
    el.dispatchEvent(arrowRightEvent());
    await elementUpdated(el);
    expect(document.activeElement === radio2).to.be.true;
    el.dispatchEvent(arrowDownEvent());
    await elementUpdated(el);
    expect(document.activeElement === radio3).to.be.true;
    el.dispatchEvent(endEvent());
    await elementUpdated(el);
    expect(document.activeElement === radio5).to.be.true;
    el.dispatchEvent(arrowLeftEvent());
    await elementUpdated(el);
    expect(document.activeElement === radio4).to.be.true;
    el.dispatchEvent(arrowUpEvent());
    await elementUpdated(el);
    expect(document.activeElement === radio3).to.be.true;
    el.dispatchEvent(homeEvent());
    await elementUpdated(el);
    expect(document.activeElement === radio1).to.be.true;
    radio1.blur();
  });
  it("accepts keyboard interactions where `checked` and `calculateFocusInIndex` might conflict", async () => {
    const el = await fixture(
      html`
                <sp-radio-group>
                    <sp-radio>Options 1</sp-radio>
                    <sp-radio>Options 2</sp-radio>
                    <sp-radio>Options 3</sp-radio>
                    <sp-radio>Options 4</sp-radio>
                    <sp-radio>Options 5</sp-radio>
                </sp-radio-group>
            `
    );
    await elementUpdated(el);
    const radio1 = el.querySelector("sp-radio:nth-child(1)");
    const radio5 = el.querySelector("sp-radio:nth-child(5)");
    radio5.focus();
    await elementUpdated(el);
    expect(document.activeElement === radio5).to.be.true;
    expect(radio5.checked).to.be.true;
    await sendKeys({
      press: "ArrowRight"
    });
    await elementUpdated(el);
    expect(document.activeElement === radio1).to.be.true;
    expect(radio1.checked).to.be.true;
  });
  it("acknowledges `disabled` and accepts keyboard events while focused", async () => {
    const el = await fixture(
      html`
                <sp-radio-group>
                    <sp-radio value="1" disabled>Option 1</sp-radio>
                    <sp-radio value="2">Option 2</sp-radio>
                    <sp-radio value="3">Option 3</sp-radio>
                    <sp-radio value="4">Option 4</sp-radio>
                    <sp-radio value="5" disabled>Option 5</sp-radio>
                </sp-radio-group>
            `
    );
    await elementUpdated(el);
    const radio2 = el.querySelector("sp-radio:nth-child(2)");
    const radio4 = el.querySelector("sp-radio:nth-child(4)");
    radio2.focus();
    await elementUpdated(el);
    expect(document.activeElement === radio2, "start 2").to.be.true;
    expect(el.selected).to.equal("");
    el.dispatchEvent(enterEvent());
    el.dispatchEvent(endEvent());
    await elementUpdated(el);
    expect(document.activeElement === radio4, "first 4").to.be.true;
    expect(el.selected).to.equal("4");
    el.dispatchEvent(homeEvent());
    await elementUpdated(el);
    expect(document.activeElement === radio2, "second 2").to.be.true;
    el.dispatchEvent(arrowUpEvent());
    await elementUpdated(el);
    expect(document.activeElement === radio4, "third 4").to.be.true;
    el.dispatchEvent(arrowDownEvent());
    await elementUpdated(el);
    expect(document.activeElement === radio2, "fourth 2").to.be.true;
  });
});
describe("Group Accessibility", () => {
  it("created the expected accessibility tree", async () => {
    await fixture(html`
            <sp-radio-group label="Testing Label" tabindex="0">
                <sp-radio value="first">Option 1</sp-radio>
                <sp-radio value="second" checked>Option 2</sp-radio>
                <sp-radio value="third">Option 3</sp-radio>
            </sp-radio-group>
        `);
    const snapshot = await a11ySnapshot(
      {}
    );
    expect(
      findAccessibilityNode(
        snapshot,
        (node) => (node.role === "radiogroup" || node.role === "group") && node.name === "Testing Label"
      ),
      'Has a "radiogroup" with the supplied name'
    ).to.not.be.null;
    expect(
      findAccessibilityNode(
        snapshot,
        (node) => node.role === "radio" && node.checked && node.name === "Option 2"
      ),
      'Has a named and checked "radio" element'
    ).to.not.be.null;
    expect(
      findAccessibilityNode(
        snapshot,
        (node) => node.name === "Option 2" && node.role.startsWith("text")
      ),
      'Does not have a text leaf named like the "radio" element'
    ).to.be.null;
  });
});
describe("Radio Group", () => {
  let testDiv;
  beforeEach(async () => {
    testDiv = await fixture(
      html`
                <div id="test-radio-group">
                    <sp-radio-group id="test-default">
                        <sp-radio value="first" checked>Option 1</sp-radio>
                        <sp-radio value="second">Option 2</sp-radio>
                        <sp-radio value="third">Option 3</sp-radio>
                    </sp-radio-group>
                    <sp-radio-group id="test-multiple-checked">
                        <sp-radio value="first" checked>Option 1</sp-radio>
                        <sp-radio value="second" checked>Option 2</sp-radio>
                        <sp-radio value="third">Option 3</sp-radio>
                    </sp-radio-group>
                    <sp-radio-group id="test-disabled">
                        <sp-radio value="first" checked>Option 1</sp-radio>
                        <sp-radio value="second" disabled>Option 2</sp-radio>
                    </sp-radio-group>
                    <sp-radio-group id="test-all-checked">
                        <sp-radio value="first" checked>Option 1</sp-radio>
                        <sp-radio value="second" checked>Option 2</sp-radio>
                    </sp-radio-group>
                    <sp-radio-group id="test-selected" selected="third">
                        <sp-radio value="first">Option 1</sp-radio>
                        <sp-radio value="second">Option 2</sp-radio>
                        <sp-radio value="third">Option 3</sp-radio>
                    </sp-radio-group>
                    <sp-radio-group id="test-selected-click" selected="third">
                        <sp-radio value="first">Option 1</sp-radio>
                        <sp-radio value="second">Option 2</sp-radio>
                        <sp-radio value="third">Option 3</sp-radio>
                    </sp-radio-group>
                    <sp-radio-group
                        id="test-checked-prioritized"
                        selected="second"
                    >
                        <sp-radio value="first" checked>Option 1</sp-radio>
                        <sp-radio value="second">Option 2</sp-radio>
                    </sp-radio-group>
                    <sp-radio-group id="test-integer-value" selected="5">
                        <sp-radio value="5" checked>Option 5</sp-radio>
                        <sp-radio value="7">Option 7</sp-radio>
                    </sp-radio-group>
                    <sp-radio-group id="test-none-selected">
                        <sp-radio value="first">Option 1</sp-radio>
                        <sp-radio value="second">Option 2</sp-radio>
                        <sp-radio value="third">Option 3</sp-radio>
                    </sp-radio-group>
                </div>
            `
    );
  });
  it("loads", () => {
    const radioGroup = testDiv.querySelector(
      "sp-radio-group#test-default"
    );
    const radioChildren = radioGroup.querySelectorAll("sp-radio");
    expect(radioGroup).to.exist;
    expect(radioChildren.length).to.equal(3);
  });
  it("loads accessibly", async () => {
    await expect(testDiv).to.be.accessible();
  });
  it("validates selection", async () => {
    const radioGroup = testDiv.querySelector(
      "sp-radio-group#test-none-selected"
    );
    expect(radioGroup.selected).to.equal("");
    radioGroup.selected = "missing";
    await elementUpdated(radioGroup);
    expect(radioGroup.selected).to.equal("");
  });
  it("can have selection prevented", async () => {
    const el = testDiv.querySelector(
      "sp-radio-group#test-default"
    );
    const secondRadio = el.querySelector("sp-radio[value=second]");
    const thirdRadio = el.querySelector("sp-radio[value=third]");
    await elementUpdated(el);
    expect(el.selected).to.equal("first");
    secondRadio.click();
    await elementUpdated(el);
    expect(el.selected).to.equal("second");
    el.addEventListener("change", (event) => event.preventDefault());
    thirdRadio.click();
    await elementUpdated(el);
    expect(el.selected).to.equal("second");
  });
  it("reflects checked radio with selected property", async () => {
    const radioGroup = testDiv.querySelector(
      "sp-radio-group#test-default"
    );
    const firstRadio = radioGroup.querySelector(
      "sp-radio[value=first]"
    );
    const secondRadio = radioGroup.querySelector(
      "sp-radio[value=second]"
    );
    const thirdRadio = radioGroup.querySelector(
      "sp-radio[value=third]"
    );
    expect(firstRadio.checked).to.be.true;
    expect(secondRadio.checked).to.be.false;
    expect(thirdRadio.checked).to.be.false;
    expect(radioGroup.selected).to.equal(firstRadio.value);
    secondRadio.click();
    await elementUpdated(radioGroup);
    expect(firstRadio.checked).to.be.false;
    expect(secondRadio.checked).to.be.true;
    expect(thirdRadio.checked).to.be.false;
    expect(radioGroup.selected).to.equal(secondRadio.value);
    thirdRadio.click();
    await elementUpdated(radioGroup);
    expect(firstRadio.checked).to.be.false;
    expect(secondRadio.checked).to.be.false;
    expect(thirdRadio.checked).to.be.true;
    expect(radioGroup.selected).to.equal(thirdRadio.value);
  });
  it("forces only one radio to be checked", () => {
    const radioGroup = testDiv.querySelector(
      "sp-radio-group#test-multiple-checked"
    );
    const checkedRadios = radioGroup.querySelectorAll("sp-radio[checked]");
    expect(radioGroup.selected).to.equal("first");
    expect(checkedRadios.length).to.equal(1);
  });
  it("respects clicking on disabled attribute causing nothing to happen", async () => {
    const radioGroup = testDiv.querySelector(
      "sp-radio-group#test-disabled"
    );
    const checkedRadio = radioGroup.querySelector(
      "sp-radio[checked]"
    );
    const disabledRadio = radioGroup.querySelector(
      "sp-radio[disabled]"
    );
    disabledRadio.click();
    await elementUpdated(radioGroup);
    expect(disabledRadio.checked).to.be.false;
    expect(checkedRadio.checked).to.be.true;
    expect(radioGroup.selected).to.equal(checkedRadio.value);
  });
  it("de-checks all but first checked radio if multiple checked", () => {
    const radioGroup = testDiv.querySelector(
      "sp-radio-group#test-multiple-checked"
    );
    const radio1 = radioGroup.querySelector(
      "sp-radio[value=first]"
    );
    const radio2 = radioGroup.querySelector(
      "sp-radio[value=second]"
    );
    expect(radioGroup.selected).to.equal("first");
    expect(radio1.checked).to.be.true;
    expect(radio2.checked).to.be.false;
  });
  it("ensures setting selection updates checked radio", async () => {
    const radioGroup = testDiv.querySelector(
      "sp-radio-group#test-selected"
    );
    const radio1 = radioGroup.querySelector(
      "sp-radio[value=first]"
    );
    const radio2 = radioGroup.querySelector(
      "sp-radio[value=second]"
    );
    const radio3 = radioGroup.querySelector(
      "sp-radio[value=third]"
    );
    expect(radioGroup.selected).to.equal("third");
    expect(radio1.checked).to.be.false;
    expect(radio2.checked).to.be.false;
    expect(radio3.checked, "initial").to.be.true;
    radioGroup.selected = "second";
    await elementUpdated(radioGroup);
    expect(radioGroup.selected).to.equal("second");
    expect(radio1.checked).to.be.false;
    expect(radio2.checked, "second").to.be.true;
    expect(radio3.checked).to.be.false;
    radioGroup.selected = "first";
    await elementUpdated(radioGroup);
    expect(radioGroup.selected).to.equal("first");
    expect(radio1.checked, "third").to.be.true;
    expect(radio2.checked).to.be.false;
    expect(radio3.checked).to.be.false;
  });
  it("ensures setting selected and clicking on radio both work together", async () => {
    const radioGroup = testDiv.querySelector(
      "sp-radio-group#test-selected-click"
    );
    const radio1 = radioGroup.querySelector(
      "sp-radio[value=first]"
    );
    const radio2 = radioGroup.querySelector(
      "sp-radio[value=second]"
    );
    const radio3 = radioGroup.querySelector(
      "sp-radio[value=third]"
    );
    expect(radioGroup.selected).to.equal("third");
    radio2.click();
    await elementUpdated(radioGroup);
    expect(radioGroup.selected).to.equal("second");
    expect(radio1.checked).to.be.false;
    expect(radio2.checked).to.be.true;
    expect(radio3.checked).to.be.false;
    radioGroup.selected = "first";
    await elementUpdated(radioGroup);
    expect(radioGroup.selected).to.equal("first");
    expect(radio1.checked, "moved to checked").to.be.true;
    expect(radio2.checked).to.be.false;
    expect(radio3.checked).to.be.false;
  });
  it("prioritizes checked over selected on initialization when conflicting", () => {
    const radioGroup = testDiv.querySelector(
      "sp-radio-group#test-checked-prioritized"
    );
    const radio1 = radioGroup.querySelector(
      "sp-radio[value=first]"
    );
    const radio2 = radioGroup.querySelector(
      "sp-radio[value=second]"
    );
    expect(radioGroup.selected).to.equal("first");
    expect(radio1.checked).to.be.true;
    expect(radio2.checked).to.be.false;
  });
  it("handles integer values for radio buttons", () => {
    const radioGroup = testDiv.querySelector(
      "sp-radio-group#test-integer-value"
    );
    expect(radioGroup.selected).to.equal("5");
  });
  it("prevents `change` events from radio buttons", async () => {
    const changeSpy = spy();
    const onChange = (event) => {
      changeSpy(event.target.selected);
    };
    const el = await fixture(html`
            <sp-radio-group @change=${onChange}>
                <sp-radio value="bulbasaur">Bulbasaur</sp-radio>
                <sp-radio value="squirtle">Squirtle</sp-radio>
                <sp-radio value="charmander">Charmander</sp-radio>
            </sp-radio-group>
        `);
    const bulbasaur = el.querySelector('[value="bulbasaur"]');
    const charmander = el.querySelector('[value="charmander"]');
    bulbasaur.click();
    bulbasaur.click();
    charmander.click();
    expect(changeSpy.calledWith(void 0)).to.be.false;
  });
});
describe("Radio Group - late children", () => {
  it("accepts frame late children", async () => {
    const test = await fixture(html`
            <div>
                <sp-radio value="first">Bulbasaur</sp-radio>
                <sp-radio value="second">Squirtle</sp-radio>
                <sp-radio value="third">Charmander</sp-radio>
                <sp-radio value="fourth">Other</sp-radio>
            </div>
        `);
    const group = document.createElement("sp-radio-group");
    const buttons = [...test.querySelectorAll("sp-radio")];
    test.append(group);
    group.selected = "first";
    Promise.resolve().then(function() {
      group.append(...buttons);
    });
    await nextFrame();
    await nextFrame();
    expect(group.buttons.length).to.equal(4);
    expect(group.selected).to.equal("first");
  });
  it("emits change events on arrow key events", async () => {
    const changeSpy = spy();
    const onChange = (event) => {
      changeSpy(event.target.selected);
    };
    const el = await fixture(html`
            <sp-radio-group @change=${onChange}>
                <sp-radio value="bulbasaur">Bulbasaur</sp-radio>
                <sp-radio value="squirtle">Squirtle</sp-radio>
                <sp-radio value="charmander">Charmander</sp-radio>
            </sp-radio-group>
        `);
    const bulbasaur = el.querySelector('[value="bulbasaur"]');
    const squirtle = el.querySelector('[value="squirtle"]');
    bulbasaur.focus();
    await elementUpdated(el);
    expect(changeSpy.callCount).to.equal(0);
    el.dispatchEvent(arrowRightEvent());
    await elementUpdated(el);
    expect(changeSpy.callCount).to.equal(1);
    expect(document.activeElement === squirtle).to.be.true;
    el.dispatchEvent(arrowLeftEvent());
    await elementUpdated(el);
    expect(changeSpy.callCount).to.equal(2);
    expect(document.activeElement === bulbasaur).to.be.true;
  });
});
//# sourceMappingURL=radio-group.test.js.map
