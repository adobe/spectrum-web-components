"use strict";
import {
  arrow,
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
  size
} from "@floating-ui/dom";
function roundByDPR(num) {
  if (typeof num === "undefined") return 0;
  const dpr = window.devicePixelRatio || 1;
  return Math.round(num * dpr) / dpr;
}
const REQUIRED_DISTANCE_TO_EDGE = 8;
const MIN_OVERLAY_HEIGHT = 100;
const getFallbackPlacements = (placement) => {
  var _a;
  const fallbacks = {
    left: ["right", "bottom", "top"],
    "left-start": ["right-start", "bottom", "top"],
    "left-end": ["right-end", "bottom", "top"],
    right: ["left", "bottom", "top"],
    "right-start": ["left-start", "bottom", "top"],
    "right-end": ["left-end", "bottom", "top"],
    top: ["bottom", "left", "right"],
    "top-start": ["bottom-start", "left", "right"],
    "top-end": ["bottom-end", "left", "right"],
    bottom: ["top", "left", "right"],
    "bottom-start": ["top-start", "left", "right"],
    "bottom-end": ["top-end", "left", "right"]
  };
  return (_a = fallbacks[placement]) != null ? _a : [placement];
};
export const placementUpdatedSymbol = Symbol("placement updated");
export class PlacementController {
  /**
   * Creates an instance of the PlacementController.
   *
   * @param {ReactiveElement & { elements: OpenableElement[] }} host - The host element that uses this controller.
   */
  constructor(host) {
    /**
     * A WeakMap to store the original placements of overlay elements.
     *
     * @private
     * @type {WeakMap<HTMLElement, Placement>}
     */
    this.originalPlacements = /* @__PURE__ */ new WeakMap();
    /**
     * Flag to allow or disallow placement updates.
     *
     * @type {boolean}
     */
    this.allowPlacementUpdate = false;
    /**
     * Closes the overlay if an ancestor element is updated.
     *
     * This method checks if placement updates are allowed and if the overlay type is not 'modal'.
     * If these conditions are met and a cleanup function is defined, it dispatches a 'close' event
     * on the target element to close the overlay.
     */
    this.closeForAncestorUpdate = () => {
      if (!this.allowPlacementUpdate && this.options.type !== "modal" && this.cleanup) {
        this.target.dispatchEvent(new Event("close", { bubbles: true }));
      }
      this.allowPlacementUpdate = false;
    };
    /**
     * Updates the placement of the overlay.
     *
     * This method calls the computePlacement method to recalculate the overlay's position.
     *
     * @private
     */
    this.updatePlacement = () => {
      this.computePlacement();
    };
    /**
     * Resets the overlay's position.
     *
     * This method clears the overlay's position, forces a reflow, and recomputes the placement.
     */
    this.resetOverlayPosition = () => {
      if (!this.target || !this.options) return;
      this.clearOverlayPosition();
      this.host.offsetHeight;
      this.computePlacement();
    };
    this.host = host;
    this.host.addController(this);
  }
  /**
   * Places the overlay relative to the target element.
   *
   * This method sets up the necessary configurations and event listeners to manage the
   * positioning and constraints of the overlay element.
   *
   * @param {HTMLElement} [target=this.target] - The target element for the overlay.
   * @param {OverlayOptionsV1} [options=this.options] - The options for configuring the overlay placement.
   * @returns {Promise<void>} A promise that resolves when the overlay has been placed.
   */
  async placeOverlay(target = this.target, options = this.options) {
    this.target = target;
    this.options = options;
    if (!target || !options) return;
    const cleanupAncestorResize = autoUpdate(
      options.trigger,
      target,
      this.closeForAncestorUpdate,
      {
        ancestorResize: false,
        elementResize: false,
        layoutShift: false
      }
    );
    const cleanupElementResize = autoUpdate(
      options.trigger,
      target,
      this.updatePlacement,
      {
        ancestorScroll: false
      }
    );
    this.cleanup = () => {
      var _a;
      (_a = this.host.elements) == null ? void 0 : _a.forEach((element) => {
        element.addEventListener(
          "sp-closed",
          () => {
            const placement = this.originalPlacements.get(element);
            if (placement) {
              element.setAttribute("placement", placement);
            }
            this.originalPlacements.delete(element);
          },
          { once: true }
        );
      });
      cleanupAncestorResize();
      cleanupElementResize();
    };
  }
  /**
   * Computes the placement of the overlay relative to the target element.
   *
   * This method calculates the necessary positioning and constraints for the overlay element
   * using various middleware functions. It updates the overlay's style and attributes based
   * on the computed position.
   *
   * @returns {Promise<void>} A promise that resolves when the placement has been computed.
   */
  async computePlacement() {
    var _a, _b;
    const { options, target } = this;
    await (document.fonts ? document.fonts.ready : Promise.resolve());
    const flipMiddleware = !(options.trigger instanceof HTMLElement) ? flip({
      padding: REQUIRED_DISTANCE_TO_EDGE,
      fallbackPlacements: getFallbackPlacements(options.placement)
    }) : flip();
    const [mainAxis = 0, crossAxis = 0] = Array.isArray(options == null ? void 0 : options.offset) ? options.offset : [options.offset, 0];
    const tipElement = (_a = this.host.elements.find(
      (el) => el.tipElement
    )) == null ? void 0 : _a.tipElement;
    const middleware = [
      offset({
        mainAxis,
        crossAxis
      }),
      shift({ padding: REQUIRED_DISTANCE_TO_EDGE }),
      flipMiddleware,
      size({
        padding: REQUIRED_DISTANCE_TO_EDGE,
        apply: ({
          availableWidth,
          availableHeight,
          rects: { floating }
        }) => {
          const maxHeight = Math.max(
            MIN_OVERLAY_HEIGHT,
            Math.floor(availableHeight)
          );
          const actualHeight = floating.height;
          this.initialHeight = !this.isConstrained ? actualHeight : this.initialHeight || actualHeight;
          this.isConstrained = actualHeight < this.initialHeight || maxHeight <= actualHeight;
          const appliedHeight = this.isConstrained ? `${maxHeight}px` : "";
          Object.assign(target.style, {
            maxWidth: `${Math.floor(availableWidth)}px`,
            maxHeight: appliedHeight
          });
        }
      }),
      ...tipElement ? [
        arrow({
          element: tipElement,
          padding: options.tipPadding || REQUIRED_DISTANCE_TO_EDGE
        })
      ] : []
    ];
    const { x, y, placement, middlewareData } = await computePosition(
      options.trigger,
      target,
      {
        placement: options.placement,
        middleware,
        strategy: "fixed"
      }
    );
    Object.assign(target.style, {
      top: "0px",
      left: "0px",
      translate: `${roundByDPR(x)}px ${roundByDPR(y)}px`
    });
    target.setAttribute("actual-placement", placement);
    (_b = this.host.elements) == null ? void 0 : _b.forEach((element) => {
      if (!this.originalPlacements.has(element)) {
        this.originalPlacements.set(
          element,
          element.getAttribute("placement")
        );
      }
      element.setAttribute("placement", placement);
    });
    if (tipElement && middlewareData.arrow) {
      const { x: arrowX, y: arrowY } = middlewareData.arrow;
      Object.assign(tipElement.style, {
        top: placement.startsWith("right") || placement.startsWith("left") ? "0px" : "",
        left: placement.startsWith("bottom") || placement.startsWith("top") ? "0px" : "",
        translate: `${roundByDPR(arrowX)}px ${roundByDPR(arrowY)}px`
      });
    }
  }
  /**
   * Clears the overlay's position styles.
   *
   * This method removes the max-height and max-width styles from the target element,
   * and resets the initial height and constrained state of the overlay.
   */
  clearOverlayPosition() {
    if (!this.target) {
      return;
    }
    this.target.style.removeProperty("max-height");
    this.target.style.removeProperty("max-width");
    this.initialHeight = void 0;
    this.isConstrained = false;
  }
  /**
   * Lifecycle method called when the host element is connected to the DOM.
   *
   * This method sets up an event listener to reset the overlay's position when the 'sp-update-overlays' event is dispatched.
   */
  hostConnected() {
    document.addEventListener(
      "sp-update-overlays",
      this.resetOverlayPosition
    );
  }
  /**
   * Lifecycle method called when the host element is updated.
   *
   * This method cleans up resources if the overlay is not open.
   */
  hostUpdated() {
    var _a;
    if (!this.host.open) {
      (_a = this.cleanup) == null ? void 0 : _a.call(this);
      this.cleanup = void 0;
    }
  }
  /**
   * Lifecycle method called when the host element is disconnected from the DOM.
   *
   * This method removes the event listener and cleans up resources.
   */
  hostDisconnected() {
    var _a;
    (_a = this.cleanup) == null ? void 0 : _a.call(this);
    this.cleanup = void 0;
    document.removeEventListener(
      "sp-update-overlays",
      this.resetOverlayPosition
    );
  }
}
//# sourceMappingURL=PlacementController.dev.js.map
