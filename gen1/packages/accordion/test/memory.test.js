"use strict";
import { testForMemoryLeaks } from "../../../test/testing-helpers.js";
import { Default } from "../stories/accordion.stories.js";
describe("Accordion - memory usage", () => {
  testForMemoryLeaks(Default());
});
//# sourceMappingURL=memory.test.js.map
