"use strict";
import { elementUpdated, expect, fixture } from "@open-wc/testing";
import "@spectrum-web-components/infield-button/sp-infield-button.js";
import { testForLitDevWarnings } from "../../../test/testing-helpers.js";
import { Default, stacked } from "../stories/infield-button.stories.js";
import { args } from "../stories/index.js";
describe("InfieldButton", () => {
  testForLitDevWarnings(
    async () => await fixture(Default(args))
  );
  it("loads default infield-button accessibly", async () => {
    const el = await fixture(Default(args));
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  it("loads stacked infield-button accessibly", async () => {
    const el = await fixture(stacked());
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
});
//# sourceMappingURL=infield-button.test.js.map
