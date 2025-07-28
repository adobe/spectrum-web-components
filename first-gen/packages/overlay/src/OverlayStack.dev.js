"use strict";
const supportsPopover = "showPopover" in document.createElement("div");
class OverlayStack {
  constructor() {
    this.root = document.body;
    this.stack = [];
    this.originalBodyOverflow = "";
    this.bodyScrollBlocked = false;
    this.handleScroll = (event) => {
      if (event.target !== document && event.target !== document.documentElement && event.target !== document.body) {
        return;
      }
      this.stack.forEach((overlay) => {
        if (overlay.open) {
          if (overlay.type === "auto" && overlay.triggerElement instanceof HTMLElement && overlay.triggerElement.closest("sp-picker, sp-action-menu")) {
            event.stopPropagation();
          }
          document.dispatchEvent(
            new CustomEvent("sp-update-overlays", {
              bubbles: true,
              composed: true,
              cancelable: true
            })
          );
        }
      });
    };
    /**
     * Cach the `pointerdownTarget` for later testing
     *
     * @param event {ClickEvent}
     */
    this.handlePointerdown = (event) => {
      this.pointerdownPath = event.composedPath();
      this.lastOverlay = this.stack[this.stack.length - 1];
    };
    /**
     * Close all overlays that are not ancestors of this click event
     *
     * @param event {ClickEvent}
     */
    this.handlePointerup = () => {
      const composedPath = this.pointerdownPath;
      this.pointerdownPath = void 0;
      if (!this.stack.length) return;
      if (!(composedPath == null ? void 0 : composedPath.length)) return;
      const lastOverlay = this.lastOverlay;
      this.lastOverlay = void 0;
      const lastIndex = this.stack.length - 1;
      const nonAncestorOverlays = this.stack.filter((overlay, i) => {
        const inStack = composedPath.find(
          (el) => (
            // The Overlay is in the stack
            el === overlay || // The Overlay trigger is in the stack and the Overlay is a "hint"
            el === (overlay == null ? void 0 : overlay.triggerElement) && "hint" === (overlay == null ? void 0 : overlay.type) || // The last Overlay in the stack is not the last Overlay at `pointerdown` time and has a
            // `triggerInteraction` of "longpress", meaning it was opened by this poitner interaction
            i === lastIndex && overlay !== lastOverlay && overlay.triggerInteraction === "longpress"
          )
        );
        return !inStack && !overlay.shouldPreventClose() && overlay.type !== "manual" && // Don't close if this overlay is modal and not on top of the overlay stack.
        !(overlay.type === "modal" && lastOverlay !== overlay);
      });
      nonAncestorOverlays.reverse();
      nonAncestorOverlays.forEach((overlay) => {
        this.closeOverlay(overlay);
        let parentToClose = overlay.parentOverlayToForceClose;
        while (parentToClose) {
          this.closeOverlay(parentToClose);
          parentToClose = parentToClose.parentOverlayToForceClose;
        }
      });
    };
    this.handleBeforetoggle = (event) => {
      const { target, newState: open } = event;
      if (open === "open") return;
      this.closeOverlay(target);
    };
    this.handleKeydown = (event) => {
      if (event.code !== "Escape") return;
      if (event.defaultPrevented) return;
      if (!this.stack.length) return;
      const last = this.stack[this.stack.length - 1];
      if ((last == null ? void 0 : last.type) === "page") {
        event.preventDefault();
        return;
      }
      if ((last == null ? void 0 : last.type) === "manual" || (last == null ? void 0 : last.type) === "modal") {
        this.closeOverlay(last);
        return;
      }
      if (supportsPopover) return;
      if (!last) return;
      this.closeOverlay(last);
    };
    this.bindEvents();
  }
  get document() {
    return this.root.ownerDocument || document;
  }
  bindEvents() {
    this.document.addEventListener("pointerdown", this.handlePointerdown);
    this.document.addEventListener("pointerup", this.handlePointerup);
    this.document.addEventListener("keydown", this.handleKeydown);
    this.document.addEventListener("scroll", this.handleScroll, {
      capture: true
    });
  }
  closeOverlay(overlay) {
    const overlayIndex = this.stack.indexOf(overlay);
    if (overlayIndex > -1) {
      this.stack.splice(overlayIndex, 1);
    }
    overlay.open = false;
    this.manageBodyScroll();
  }
  /**
   * Manage body scroll blocking based on modal/page overlays
   */
  manageBodyScroll() {
    const shouldBlock = this.stack.some(
      (overlay) => overlay.type === "modal" || overlay.type === "page"
    );
    if (shouldBlock && !this.bodyScrollBlocked) {
      this.originalBodyOverflow = document.body.style.overflow || "";
      document.body.style.overflow = "hidden";
      this.bodyScrollBlocked = true;
    } else if (!shouldBlock && this.bodyScrollBlocked) {
      document.body.style.overflow = this.originalBodyOverflow;
      this.bodyScrollBlocked = false;
    }
  }
  /**
   * Get an array of Overlays that all share the same trigger element.
   *
   * @param triggerElement {HTMLELement}
   * @returns {Overlay[]}
   */
  overlaysByTriggerElement(triggerElement) {
    return this.stack.filter(
      (overlay) => overlay.triggerElement === triggerElement
    );
  }
  /**
   * When overlays are added manage the open state of exisiting overlays appropriately:
   * - 'modal': should close other non-'modal' and non-'manual' overlays
   * - 'page': should close other non-'modal' and non-'manual' overlays
   * - 'auto': should close other 'auto' overlays and other 'hint' overlays, but not 'manual' overlays
   * - 'manual': shouldn't close other overlays
   * - 'hint': shouldn't close other overlays and give way to all other overlays on a trigger
   */
  add(overlay) {
    if (this.stack.includes(overlay)) {
      const overlayIndex = this.stack.indexOf(overlay);
      if (overlayIndex > -1) {
        this.stack.splice(overlayIndex, 1);
        this.stack.push(overlay);
      }
      return;
    }
    if (overlay.type === "auto" || overlay.type === "modal" || overlay.type === "page") {
      const queryPathEventName = "sp-overlay-query-path";
      const queryPathEvent = new Event(queryPathEventName, {
        composed: true,
        bubbles: true
      });
      overlay.addEventListener(
        queryPathEventName,
        (event) => {
          const path = event.composedPath();
          this.stack.forEach((overlayEl) => {
            const inPath = path.find((el) => el === overlayEl);
            const triggerInOverlay = overlay.triggerElement && overlay.triggerElement instanceof HTMLElement && overlayEl.contains && overlayEl.contains(overlay.triggerElement);
            console.log(
              "overlayEl.type:",
              overlayEl.type,
              "triggerInOverlay:",
              triggerInOverlay,
              "inPath:",
              !!inPath
            );
            if (!inPath && !triggerInOverlay && overlayEl.type !== "manual" && overlayEl.type !== "modal") {
              console.log("Closing overlay:", overlayEl);
              this.closeOverlay(overlayEl);
            }
          });
        },
        { once: true }
      );
      overlay.dispatchEvent(queryPathEvent);
    } else if (overlay.type === "hint") {
      const hasPrevious = this.stack.some((overlayEl) => {
        return overlayEl.type !== "manual" && overlayEl.triggerElement && overlayEl.triggerElement === overlay.triggerElement;
      });
      if (hasPrevious) {
        overlay.open = false;
        return;
      }
      this.stack.forEach((overlayEl) => {
        if (overlayEl.type === "hint") {
          this.closeOverlay(overlayEl);
        }
      });
    }
    requestAnimationFrame(() => {
      this.stack.push(overlay);
      overlay.addEventListener("beforetoggle", this.handleBeforetoggle, {
        once: true
      });
      this.manageBodyScroll();
    });
  }
  remove(overlay) {
    this.closeOverlay(overlay);
  }
}
export const overlayStack = new OverlayStack();
//# sourceMappingURL=OverlayStack.dev.js.map
