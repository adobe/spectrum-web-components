"use strict";
import { AbstractOverlay } from "./AbstractOverlay.dev.js";
export class VirtualTrigger {
  constructor(x, y) {
    this.x = 0;
    this.y = 0;
    this.x = x;
    this.y = y;
  }
  updateBoundingClientRect(x, y) {
    this.x = x;
    this.y = y;
    AbstractOverlay.update();
  }
  getBoundingClientRect() {
    return {
      width: 0,
      height: 0,
      top: this.y,
      right: this.x,
      y: this.y,
      x: this.x,
      bottom: this.y,
      left: this.x,
      /* c8 ignore next 3 */
      toJSON() {
        return;
      }
    };
  }
}
//# sourceMappingURL=VirtualTrigger.dev.js.map
