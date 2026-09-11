"use strict";
import { elementUpdated, expect, fixture } from "@open-wc/testing";
import { testForLitDevWarnings } from "../../../test/testing-helpers";
import { Default, File, Folder } from "../stories/asset.stories.js";
describe("Asset", () => {
  testForLitDevWarnings(async () => await fixture(Default()));
  it("loads default asset accessibly", async () => {
    const el = await fixture(Default());
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  it('loads [variant="file"] accessibly', async () => {
    const el = await fixture(File());
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  it('loads [variant="folder"] accessibly', async () => {
    const el = await fixture(Folder());
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
});
//# sourceMappingURL=asset.test.js.map
