"use strict";
import { expect, nextFrame } from "@open-wc/testing";
import { a11ySnapshot, findAccessibilityNode } from "@web/test-runner-commands";
import { isWebKit } from "@spectrum-web-components/shared";
export const findDescribedNode = async (name, description, debug) => {
  await nextFrame();
  const snapshot = await a11ySnapshot({});
  if (debug) {
    console.log(JSON.stringify(snapshot, void 0, "  "));
  }
  const node = findAccessibilityNode(
    snapshot,
    (node2) => node2.name === name && (node2.description === description || isWebKit())
  );
  expect(node).to.not.be.null;
  if (isWebKit()) {
    const iOSNode = findAccessibilityNode(
      snapshot,
      (node2) => node2.name === name && node2.description === description
    );
    expect(iOSNode).to.be.null;
  }
};
//# sourceMappingURL=testing-helpers-a11y.js.map
