"use strict";
import { fixture } from "@open-wc/testing";
import { Default } from "../stories/accordion.stories.js";
import { testForLitDevWarnings } from "../../../test/testing-helpers.js";
describe("Accordion - dev mode", () => {
  testForLitDevWarnings(async () => await fixture(Default()));
});
//# sourceMappingURL=dev-mode.test.js.map
