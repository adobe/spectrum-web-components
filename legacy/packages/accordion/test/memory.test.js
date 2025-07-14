"use strict";
import { Default } from "../stories/accordion.stories.js";
import { testForMemoryLeaks } from "../../../test/testing-helpers.js";
describe("Accordion - memory usage", () => {
  testForMemoryLeaks(Default());
});
//# sourceMappingURL=memory.test.js.map
