"use strict";
import { ResizeController } from "@lit-labs/observers/resize-controller.js";
import { RovingTabindexController } from "@spectrum-web-components/reactive-controllers/src/RovingTabindex.js";
const doCallbackAfterPaint = (cb) => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      cb();
    });
  });
};
export class GridController {
  constructor(host, {
    elements,
    itemSize,
    gap,
    padding
  }) {
    // First visible element
    this._first = 0;
    // Last visible element
    this._last = 0;
    this.handleFocusin = (event) => {
      const scrollToFirst = () => this.host.scrollToIndex(0);
      const focusIntoGrid = () => {
        this.focus();
        this.host.tabIndex = -1;
      };
      if (event.target === this.host) {
        if (this._first > 0) {
          doCallbackAfterPaint(() => {
            scrollToFirst();
            doCallbackAfterPaint(focusIntoGrid);
          });
        } else {
          doCallbackAfterPaint(focusIntoGrid);
        }
      }
    };
    this.handleFocusout = (event) => {
      if (!event.relatedTarget || !this.host.contains(event.relatedTarget)) {
        this.host.tabIndex = 0;
      }
    };
    this.handleRangeChanged = (event) => {
      this.rovingTabindexController.clearElementCache(event.first);
    };
    this.handleVisibleChanged = (event) => {
      this._first = event.first;
      this._last = event.last;
    };
    this.host = host;
    this.host.addController(this);
    this.applyLayout(itemSize, gap, padding);
    this.resizeController = new ResizeController(this.host, {
      callback: (entries) => {
        entries.forEach((entry) => {
          this.measureDirectionLength(entry.contentRect);
        });
      }
    });
    this.rovingTabindexController = new RovingTabindexController(
      this.host,
      {
        direction: "grid",
        elements,
        focusInIndex: () => {
          const activeElement = this.host.getRootNode().activeElement;
          return activeElement === this.host ? 0 : -1;
        }
      }
    );
  }
  get itemSize() {
    return this._itemSize();
  }
  /* c8 ignore next 6 */
  _itemSize() {
    return {
      width: 100,
      height: 100
    };
  }
  get gap() {
    return this._gap();
  }
  /* c8 ignore next 3 */
  _gap() {
    return void 0;
  }
  get padding() {
    return this._padding();
  }
  /* c8 ignore next 3 */
  _padding() {
    return void 0;
  }
  focus(options) {
    this.rovingTabindexController.focus(options);
  }
  applyLayout(itemSize, gap, padding) {
    if (typeof itemSize === "object") {
      this._itemSize = () => itemSize;
    } else if (typeof itemSize === "function" && typeof itemSize() !== "undefined") {
      this._itemSize = itemSize;
    }
    if (typeof gap === "string") {
      this._gap = () => gap;
    } else if (typeof gap === "function") {
      this._gap = gap;
    }
    if (typeof padding === "string") {
      this._padding = () => padding;
    } else if (typeof padding === "function") {
      this._padding = padding;
    }
  }
  update({
    elements,
    itemSize,
    gap,
    padding
  }) {
    this.rovingTabindexController.update({ elements });
    this.applyLayout(itemSize, gap, padding);
    const contentRect = this.host.getBoundingClientRect();
    this.measureDirectionLength(contentRect);
  }
  measureDirectionLength(contentRect) {
    const gap = this.gap ? parseFloat(this.gap) : 0;
    const padding = this.padding ? parseFloat(this.padding) : 0;
    const contentBoxWidth = contentRect.width - padding * 2;
    const directionLength = Math.floor(
      (contentBoxWidth - this.itemSize.width) / (gap + this.itemSize.width)
    ) + 1;
    this.rovingTabindexController.directionLength = Math.floor(directionLength);
  }
  hostConnected() {
    this.host.addEventListener("rangeChanged", this.handleRangeChanged);
    this.host.addEventListener(
      "visibilityChanged",
      this.handleVisibleChanged
    );
    this.host.addEventListener("focusin", this.handleFocusin);
    this.host.addEventListener("focusout", this.handleFocusout);
    this.host.tabIndex = 0;
    this.host.style.setProperty("outline", "none", "important");
  }
  hostDisconnected() {
    this.host.removeEventListener("rangeChanged", this.handleRangeChanged);
    this.host.removeEventListener(
      "visibilityChanged",
      this.handleVisibleChanged
    );
    this.host.removeEventListener("focusin", this.handleFocusin);
    this.host.removeEventListener("focusout", this.handleFocusout);
  }
}
//# sourceMappingURL=GridController.dev.js.map
