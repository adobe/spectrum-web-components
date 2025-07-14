"use strict";
import { randomID } from "@spectrum-web-components/shared/src/random-id.js";
import { expect } from "@open-wc/testing";
describe("randomID()", () => {
  it("creates unique strings of 8 hex characters", () => {
    const n = 1e3;
    const ids = Array.from({ length: n }, randomID);
    const shape = ids.filter((id) => {
      return typeof id === "string" && id.length === 8 && id.split("").every((char) => "0123456789abcdef".includes(char));
    });
    const unique = new Set(ids);
    expect(shape).to.have.length(n);
    expect(unique).to.have.length(n);
  });
  it("generates 100k IDs in less than a second", () => {
    const n = 1e5;
    const sec = 1e3;
    const start = performance.now();
    const ids = Array.from({ length: n }, randomID);
    const time = performance.now() - start;
    expect(ids).to.have.length(n);
    expect(time).to.be.lessThan(sec);
  });
});
//# sourceMappingURL=random-id.test.js.map
