"use strict";
import { elementUpdated, expect, fixture } from "@open-wc/testing";
import { stub } from "sinon";
import { Default } from "../stories/accordion.stories.js";
describe("Accordion - dev mode", () => {
  describe("lit dev mode", () => {
    let consoleWarnStub;
    before(() => {
      consoleWarnStub = stub(console, "warn");
    });
    afterEach(() => {
      consoleWarnStub.resetHistory();
    });
    after(() => {
      consoleWarnStub.restore();
    });
    it("does not emit non-deprecation warnings", async () => {
      var _a;
      const el = await fixture(Default());
      await elementUpdated(el);
      const nonDeprecationCalls = consoleWarnStub.getCalls().filter(
        (call) => {
          var _a2, _b;
          return ((_b = (_a2 = call.args[call.args.length - 1]) == null ? void 0 : _a2.data) == null ? void 0 : _b.level) !== "deprecation";
        }
      );
      expect(
        nonDeprecationCalls.length > 0,
        (_a = nonDeprecationCalls[0]) == null ? void 0 : _a.args.join(", ")
      ).to.be.false;
    });
  });
});
//# sourceMappingURL=dev-mode.test.js.map
