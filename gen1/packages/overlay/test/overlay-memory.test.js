"use strict";
import { testForMemoryLeaks } from "../../../test/testing-helpers.js";
import { Default } from "../stories/overlay.stories.js";
testForMemoryLeaks(
  Default({
    placement: "bottom",
    offset: 0
  })
);
//# sourceMappingURL=overlay-memory.test.js.map
