"use strict";
import {
  detectOverflow
} from "@floating-ui/dom";
export const fullSize = (options = { padding: 0 }) => ({
  name: "fullSize",
  async fn(middlewareArguments) {
    var _a, _b, _c, _d;
    const overflow = await detectOverflow(middlewareArguments, options);
    let availableHeight = -overflow.top - overflow.bottom + middlewareArguments.rects.floating.height;
    let availableWidth = -overflow.left - overflow.right + middlewareArguments.rects.floating.width;
    if (middlewareArguments.placement.startsWith("bottom")) {
      availableHeight -= middlewareArguments.rects.reference.height;
      availableHeight -= middlewareArguments.rects.reference.y;
      availableHeight -= ((_a = middlewareArguments.middlewareData.offset) == null ? void 0 : _a.y) || 0;
      availableHeight += options.padding;
    } else if (middlewareArguments.placement.startsWith("top")) {
      availableHeight = middlewareArguments.rects.reference.y;
      availableHeight -= ((_b = middlewareArguments.middlewareData.offset) == null ? void 0 : _b.y) || 0;
      availableHeight += options.padding;
    } else if (middlewareArguments.placement.startsWith("right")) {
      availableWidth -= middlewareArguments.rects.reference.width;
      availableWidth -= middlewareArguments.rects.reference.x;
      availableWidth -= ((_c = middlewareArguments.middlewareData.offset) == null ? void 0 : _c.x) || 0;
      availableWidth += options.padding;
    } else if (middlewareArguments.placement.startsWith("left")) {
      availableWidth = middlewareArguments.rects.reference.x;
      availableWidth -= ((_d = middlewareArguments.middlewareData.offset) == null ? void 0 : _d.x) || 0;
      availableWidth += options.padding;
    }
    return {
      data: {
        availableWidth,
        availableHeight
      }
    };
  }
});
//# sourceMappingURL=fullSizePlugin.dev.js.map
