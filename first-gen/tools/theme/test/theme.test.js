"use strict";
import { Theme } from "@spectrum-web-components/theme";
import { expect } from "@open-wc/testing";
import { version } from "@spectrum-web-components/base/src/version.js";
class DirElement extends Theme {
}
customElements.define("dir-element", DirElement);
describe("Theme", () => {
  it("has a static VERSION property", () => {
    expect(DirElement.VERSION).to.equal(version);
  });
});
//# sourceMappingURL=theme.test.js.map
