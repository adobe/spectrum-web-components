"use strict";
import { elementUpdated, expect, fixture } from "@open-wc/testing";
import "@spectrum-web-components/button-group/sp-button-group.js";
import { buttons, buttonsVertical } from "../stories/button-group.stories.js";
import { testForLitDevWarnings } from "../../../test/testing-helpers.js";
describe("Buttongroup", () => {
  testForLitDevWarnings(
    async () => await fixture(buttons(buttons.args))
  );
  it("loads default button-group accessibly with sp-button", async () => {
    const el = await fixture(buttons(buttons.args));
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  it("loads default button-group[vertial] accessibly with sp-button", async () => {
    const el = await fixture(
      buttonsVertical(buttonsVertical.args)
    );
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  it(`manages its children's size`, async () => {
    const el = await fixture(buttons(buttons.args));
    await elementUpdated(el);
    let children = el.querySelectorAll("sp-button");
    children.forEach((button) => {
      expect(button.size).to.equal("m");
    });
    el.size = "s";
    await elementUpdated(el);
    children = el.querySelectorAll("sp-button");
    children.forEach((button) => {
      expect(button.size).to.equal("s");
    });
  });
});
//# sourceMappingURL=button-group.test.js.map
