"use strict";
import { expect } from "@open-wc/testing";
import { version } from "@spectrum-web-components/base/src/version.js";
import { coreVersion } from "@spectrum-web-components/base/src/version.js";
import { Theme } from "@spectrum-web-components/theme";
class DirElement extends Theme {
}
customElements.define("dir-element", DirElement);
describe("Theme", () => {
  it("has a static VERSION property", () => {
    expect(DirElement.VERSION).to.equal(version);
  });
  it("has a static CORE_VERSION property", () => {
    expect(DirElement.CORE_VERSION).to.equal(coreVersion);
  });
});
//# sourceMappingURL=theme.test.js.map
