"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
import {
  elementUpdated,
  expect,
  html,
  nextFrame,
  oneEvent,
  waitUntil
} from "@open-wc/testing";
import { sendKeys } from "@web/test-runner-commands";
import "@spectrum-web-components/combobox/sp-combobox.js";
import "@spectrum-web-components/menu/sp-menu-item.js";
import { fixture } from "../../../test/testing-helpers.js";
import { comboboxFixture } from "./helpers.js";
import { SpectrumElement } from "@spectrum-web-components/base";
import { customElement } from "@spectrum-web-components/base/src/decorators.js";
import { fruits } from "../stories/index.js";
export let TestEl = class extends SpectrumElement {
  render() {
    return html`
            <sp-combobox>
                <slot></slot>
            </sp-combobox>
        `;
  }
};
TestEl = __decorateClass([
  customElement("combobox-slot-test-el")
], TestEl);
const options = fruits;
describe("Combobox Data", () => {
  afterEach(() => {
    const overlays = document.querySelectorAll("active-overlay");
    overlays.forEach((overlay) => overlay.remove());
  });
  it("accepts options as property", async () => {
    const el = await comboboxFixture();
    expect(el.options).to.deep.equal(options);
  });
  it("accepts options as html", async () => {
    const el = await fixture(html`
            <sp-combobox>
                Combobox Test
                <sp-menu-item value="pineapple">Pineapple</sp-menu-item>
                <sp-menu-item value="yuzu">Yuzu</sp-menu-item>
                <sp-menu-item value="kumquat">Kumquat</sp-menu-item>
                <sp-menu-item value="lychee">Lychee</sp-menu-item>
                <sp-menu-item value="durian">Durian</sp-menu-item>
            </sp-combobox>
        `);
    await elementUpdated(el);
    const processedOptions = el.availableOptions.map(
      ({ value, itemText }) => ({
        value,
        itemText
      })
    );
    expect(processedOptions).to.deep.equal([
      {
        value: "pineapple",
        itemText: "Pineapple"
      },
      {
        value: "yuzu",
        itemText: "Yuzu"
      },
      {
        value: "kumquat",
        itemText: "Kumquat"
      },
      {
        value: "lychee",
        itemText: "Lychee"
      },
      {
        value: "durian",
        itemText: "Durian"
      }
    ]);
  });
  it("accepts additional options as html", async () => {
    const el = await fixture(html`
            <sp-combobox>
                Combobox Test
                ${options.map((option) => {
      return html`
                        <sp-menu-item value=${option.value}>
                            ${option.itemText}
                        </sp-menu-item>
                    `;
    })}
            </sp-combobox>
        `);
    await elementUpdated(el);
    let processedOptions = el.availableOptions.map(
      ({ value, itemText }) => ({
        value,
        itemText
      })
    );
    expect(processedOptions).to.deep.equal(options);
    const newOption = {
      value: "another-option",
      itemText: "Another Option"
    };
    const item = document.createElement("sp-menu-item");
    item.value = newOption.value;
    item.textContent = newOption.itemText;
    el.append(item);
    await elementUpdated(el);
    processedOptions = el.availableOptions.map(({ value, itemText }) => ({
      value,
      itemText
    }));
    expect(processedOptions).to.deep.equal([...options, newOption]);
  });
  it("accepts updated value as html", async () => {
    const el = await fixture(html`
            <sp-combobox>
                Combobox Test
                ${options.map((option) => {
      return html`
                        <sp-menu-item value=${option.value}>
                            ${option.itemText}
                        </sp-menu-item>
                    `;
    })}
            </sp-combobox>
        `);
    await elementUpdated(el);
    let processedOptions = el.availableOptions.map(
      ({ value, itemText }) => ({
        value,
        itemText
      })
    );
    expect(processedOptions).to.deep.equal(options);
    const newOption = {
      value: "another-option",
      itemText: "Another Option"
    };
    const option1 = el.querySelector(
      "sp-menu-item:first-of-type"
    );
    option1.textContent = newOption.itemText;
    await elementUpdated(el);
    const newOptions = options.slice();
    newOptions[0].value = newOption.value;
    newOptions[0].itemText = newOption.itemText;
    await nextFrame();
    await nextFrame();
    processedOptions = el.availableOptions.map(({ value, itemText }) => ({
      value,
      itemText
    }));
    expect(processedOptions).to.deep.equal(newOptions);
  });
  it("accepts updated id as html", async () => {
    const el = await fixture(html`
            <sp-combobox>
                Combobox Test
                ${options.map((option) => {
      return html`
                        <sp-menu-item value=${option.value}>
                            ${option.itemText}
                        </sp-menu-item>
                    `;
    })}
            </sp-combobox>
        `);
    await elementUpdated(el);
    let processedOptions = el.availableOptions.map(
      ({ value, itemText }) => ({
        value,
        itemText
      })
    );
    expect(processedOptions).to.deep.equal(options);
    const newOption = {
      value: "another-option",
      itemText: "Another Option"
    };
    const option1 = el.querySelector(
      "sp-menu-item:first-of-type"
    );
    option1.value = newOption.value;
    await elementUpdated(el);
    const newOptions = options.slice();
    newOptions[0].value = newOption.value;
    await nextFrame();
    await nextFrame();
    processedOptions = el.availableOptions.map(({ value, itemText }) => ({
      value,
      itemText
    }));
    expect(processedOptions).to.deep.equal(newOptions);
  });
  it("accepts replacement options as html", async () => {
    const el = await fixture(html`
            <sp-combobox>
                Combobox Test
                ${options.map((option) => {
      return html`
                        <sp-menu-item value=${option.value}>
                            ${option.itemText}
                        </sp-menu-item>
                    `;
    })}
            </sp-combobox>
        `);
    await elementUpdated(el);
    let processedOptions = el.availableOptions.map(
      ({ value, itemText }) => ({
        value,
        itemText
      })
    );
    expect(processedOptions).to.deep.equal(options);
    const newOption = {
      value: "another-option",
      itemText: "Another Option"
    };
    const option1 = el.querySelector(
      "sp-menu-item:first-of-type"
    );
    option1.remove();
    const item = document.createElement("sp-menu-item");
    item.value = newOption.value;
    item.textContent = newOption.itemText;
    el.insertAdjacentElement("afterbegin", item);
    await elementUpdated(el);
    const newOptions = options.slice();
    newOptions[0].value = newOption.value;
    newOptions[0].itemText = newOption.itemText;
    await nextFrame();
    await nextFrame();
    processedOptions = el.availableOptions.map(({ value, itemText }) => ({
      value,
      itemText
    }));
    expect(processedOptions).to.deep.equal(options);
  });
  it("accepts options through slots", async () => {
    const test = await fixture(html`
            <combobox-slot-test-el>
                Combobox Test
                ${options.map((option) => {
      return html`
                        <sp-menu-item value=${option.value}>
                            ${option.itemText}
                        </sp-menu-item>
                    `;
    })}
            </combobox-slot-test-el>
        `);
    const el = test.shadowRoot.querySelector(
      "sp-combobox"
    );
    await elementUpdated(test);
    await elementUpdated(el);
    await waitUntil(() => {
      var _a;
      return !!((_a = el.optionEls) == null ? void 0 : _a.length);
    });
    const processedOptions = el.availableOptions.map(
      ({ value, itemText }) => ({
        value,
        itemText
      })
    );
    expect(processedOptions).to.deep.equal(options);
  });
  it("accepts adding through slots", async function() {
    const test = await fixture(html`
            <combobox-slot-test-el>
                Combobox Test
                ${options.map((option) => {
      return html`
                        <sp-menu-item value=${option.value}>
                            ${option.itemText}
                        </sp-menu-item>
                    `;
    })}
            </combobox-slot-test-el>
        `);
    const el = test.shadowRoot.querySelector(
      "sp-combobox"
    );
    await elementUpdated(test);
    await elementUpdated(el);
    await waitUntil(() => {
      var _a;
      return !!((_a = el.optionEls) == null ? void 0 : _a.length);
    });
    let processedOptions = el.availableOptions.map(
      ({ value, itemText }) => ({
        value,
        itemText
      })
    );
    expect(processedOptions).to.deep.equal(options);
    const newOption = {
      value: "another-option",
      itemText: "Another Option"
    };
    const item = document.createElement("sp-menu-item");
    item.value = newOption.value;
    item.textContent = newOption.itemText;
    test.append(item);
    await elementUpdated(test);
    await elementUpdated(el);
    await waitUntil(() => {
      var _a;
      return ((_a = el.availableOptions) == null ? void 0 : _a.length) === 13;
    });
    processedOptions = el.availableOptions.map(({ value, itemText }) => ({
      value,
      itemText
    }));
    expect(processedOptions).to.deep.equal([...options, newOption]);
  });
  it("accepts numeric values as html", async () => {
    const el = await fixture(html`
            <sp-combobox>
                Combobox Test
                <sp-menu-item value="1">Mambo no. 1</sp-menu-item>
                <sp-menu-item value="2">Mambo no. 2</sp-menu-item>
                <sp-menu-item value="3">Mambo no. 3</sp-menu-item>
                <sp-menu-item value="4">Mambo no. 4</sp-menu-item>
                <sp-menu-item value="5">Mambo no. 5</sp-menu-item>
            </sp-combobox>
        `);
    await elementUpdated(el);
    expect(el.activeDescendant).to.be.undefined;
    el.focus();
    await elementUpdated(el);
    await sendKeys({
      press: "ArrowDown"
    });
    await elementUpdated(el);
    expect(el.activeDescendant).to.not.be.undefined;
    expect(el.activeDescendant.value).to.equal("1");
    const activeDescendant = el.shadowRoot.getElementById("#1");
    await elementUpdated(activeDescendant);
    await nextFrame();
    await nextFrame();
    const change = oneEvent(el, "change");
    await sendKeys({
      press: "Enter"
    });
    await change;
    expect(el.open).to.be.false;
    expect(el.activeDescendant).to.be.undefined;
    expect(el.value).to.equal("Mambo no. 1");
  });
});
//# sourceMappingURL=combobox.data.test.js.map
