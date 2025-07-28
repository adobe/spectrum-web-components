"use strict";
import { expect } from "@open-wc/testing";
import { stub } from "sinon";
describe("Dev Mode", () => {
  let consoleWarnStub;
  before(() => {
    window.__swc = {
      ...window.__swc,
      verbose: true
    };
    consoleWarnStub = stub(console, "warn");
  });
  afterEach(() => {
    consoleWarnStub.resetHistory();
  });
  after(() => {
    consoleWarnStub.restore();
  });
  it("announces that Dev Mode is on", async function() {
    const { SpectrumElement } = await import("@spectrum-web-components/base");
    expect(SpectrumElement).to.not.be.undefined;
    expect(consoleWarnStub.called).to.be.true;
    const spyCall = consoleWarnStub.getCall(0);
    expect(
      spyCall.args.at(0),
      'confirm "dev mode"-centric message'
    ).to.include("dev mode");
    expect(spyCall.args.at(-1), "confirm `data` shape").to.deep.equal({
      data: {
        localName: "base",
        type: "default",
        level: "default"
      }
    });
  });
});
//# sourceMappingURL=base-devmode.test.js.map
