"use strict";
import { Default } from "../stories/overlay.stories.js";
import { testForMemoryLeaks } from "../../../test/testing-helpers.js";
testForMemoryLeaks(
  Default({
    placement: "bottom",
    offset: 0
  })
);
//# sourceMappingURL=overlay-memory.test.js.map
