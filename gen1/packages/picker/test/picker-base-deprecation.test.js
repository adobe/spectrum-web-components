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
import { elementUpdated, expect, fixture, html } from "@open-wc/testing";
import { stub } from "sinon";
import { customElement } from "@spectrum-web-components/base/src/decorators.js";
import { PickerBase } from "@spectrum-web-components/picker";
import "@spectrum-web-components/menu/sp-menu-item.js";
let TestPickerBaseExtension = class extends PickerBase {
};
TestPickerBaseExtension = __decorateClass([
  customElement("test-picker-base-extension")
], TestPickerBaseExtension);
describe("PickerBase deprecation warning", () => {
  let consoleWarnStub;
  before(() => {
    window.__swc.verbose = true;
    consoleWarnStub = stub(console, "warn");
  });
  afterEach(() => {
    consoleWarnStub.resetHistory();
  });
  after(() => {
    window.__swc.verbose = false;
    consoleWarnStub.restore();
  });
  it("emits deprecation warning when a component extends PickerBase", async () => {
    const el = await fixture(html`
      <test-picker-base-extension label="Test Picker">
        <sp-menu-item value="option-1">Option 1</sp-menu-item>
        <sp-menu-item value="option-2">Option 2</sp-menu-item>
      </test-picker-base-extension>
    `);
    await elementUpdated(el);
    expect(consoleWarnStub.called, "console.warn should be called").to.be.true;
    const deprecationCall = consoleWarnStub.getCalls().find(
      (call) => typeof call.args[0] === "string" && call.args[0].includes("PickerBase class is deprecated")
    );
    expect(deprecationCall, "should emit PickerBase deprecation warning").to.not.be.undefined;
    expect(
      deprecationCall == null ? void 0 : deprecationCall.args[0],
      "warning message should mention ExpandableElement"
    ).to.include("ExpandableElement");
    expect(
      deprecationCall == null ? void 0 : deprecationCall.args[deprecationCall.args.length - 1],
      "should have deprecation level in data"
    ).to.deep.equal({
      data: {
        localName: "test-picker-base-extension",
        type: "api",
        level: "deprecation"
      }
    });
  });
  it("includes documentation URL in deprecation warning", async () => {
    const el = await fixture(html`
      <test-picker-base-extension label="Test Picker">
        <sp-menu-item value="option-1">Option 1</sp-menu-item>
      </test-picker-base-extension>
    `);
    await elementUpdated(el);
    const deprecationCall = consoleWarnStub.getCalls().find(
      (call) => typeof call.args[0] === "string" && call.args[0].includes("PickerBase class is deprecated")
    );
    const deprecationURL = deprecationCall == null ? void 0 : deprecationCall.args.find(
      (arg) => typeof arg === "string" && arg.includes(
        "https://opensource.adobe.com/spectrum-web-components/components/picker/#deprecation"
      )
    );
    expect(deprecationURL, "should include documentation URL").to.not.be.undefined;
  });
});
//# sourceMappingURL=picker-base-deprecation.test.js.map
