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
     * Cache the `pointerdownTarget` for later testing and prevent clicks outside page overlays
     *
     * @param event {PointerEvent}
     */
    this.handlePointerdown = (event) => {
      if (!this.stack.length) {
        return;
      }
      const pointerPath = event.composedPath();
      const pageOverlays = this.stack.filter((o) => o.open && o.type === "page");
      if (pageOverlays.length > 0 && !this.isEventInsideModal(pointerPath, pageOverlays)) {
        event.preventDefault();
        event.stopImmediatePropagation();
        return;
      }
      this.pointerdownPath = pointerPath;
      this.lastOverlay = this.stack[this.stack.length - 1];
    };
    /**
     * Prevent clicks outside modal overlays from reaching external elements.
     * This replicates the behavior of dialog.showModal() which was removed
     * in favor of showPopover() for performance reasons.
     *
     * @param event {MouseEvent}
     */
    this.handleClick = (event) => {
      if (!this.stack.length) {
        return;
      }
      const modalOverlays = this.getModalOverlays();
      if (!modalOverlays.length) {
        return;
      }
      const pageOverlays = modalOverlays.filter((o) => o.type === "page");
      if (!pageOverlays.length) {
        return;
      }
      const clickPath = event.composedPath();
      if (!this.isEventInsideModal(clickPath, pageOverlays)) {
        event.stopImmediatePropagation();
        event.preventDefault();
      }
    };
    /**
     * Close all overlays that are not ancestors of this click event
     */
    this.handlePointerup = () => {
      const composedPath = this.pointerdownPath;
      this.pointerdownPath = void 0;
      if (!this.stack.length) {
        return;
      }
      if (!(composedPath == null ? void 0 : composedPath.length)) {
        return;
      }
      const lastOverlay = this.lastOverlay;
      this.lastOverlay = void 0;
      const lastIndex = this.stack.length - 1;
      const hasModalOrPageOverlay = this.stack.some(
        (overlay) => overlay.open && (overlay.type === "modal" || overlay.type === "page")
      );
      if (hasModalOrPageOverlay) {
        const clickedBackdrop = composedPath.some(
          (el) => el instanceof HTMLDivElement && el.classList.contains("modal-backdrop")
        );
        if (clickedBackdrop) {
          const topOverlay = this.stack[this.stack.length - 1];
          if ((topOverlay == null ? void 0 : topOverlay.type) === "modal") {
            this.closeOverlay(topOverlay);
          }
          return;
        }
      }
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
      if (open === "open") {
        return;
      }
      this.closeOverlay(target);
    };
    this.handleKeydown = (event) => {
      if (event.code !== "Escape") {
        return;
      }
      if (!this.stack.length) {
        return;
      }
      const last = this.stack[this.stack.length - 1];
      if ((last == null ? void 0 : last.type) === "hint") {
        event.preventDefault();
        event.stopPropagation();
        this.closeOverlay(last);
        return;
      }
      if ((last == null ? void 0 : last.type) === "page") {
        event.preventDefault();
        return;
      }
      if ((last == null ? void 0 : last.type) === "manual") {
        this.closeOverlay(last);
        return;
      }
      if ((last == null ? void 0 : last.type) === "modal") {
        this.closeOverlay(last);
        return;
      }
      if (supportsPopover) {
        return;
      }
      if (!last) {
        return;
      }
      this.closeOverlay(last);
    };
    this.bindEvents();
  }
  get document() {
    return this.root.ownerDocument || document;
  }
  bindEvents() {
    this.document.addEventListener("pointerdown", this.handlePointerdown, {
      capture: true
    });
    this.document.addEventListener("pointerup", this.handlePointerup);
    this.document.addEventListener("click", this.handleClick, {
      capture: true
    });
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
   * Get all open modal/page overlays from the stack.
   * Cached to avoid repeated filtering.
   */
  getModalOverlays() {
    return this.stack.filter(
      (overlay) => overlay.open && (overlay.type === "modal" || overlay.type === "page")
    );
  }
  /**
   * Check if an event path intersects with any modal overlay dialog.
   * This is the core logic for determining if a click/pointer event is inside a modal.
   *
   * @param eventPath {EventTarget[]} The composed path from the event
   * @param modalOverlays {Overlay[]} The modal overlays to check against
   * @returns {boolean} True if the event is inside any modal overlay
   */
  isEventInsideModal(eventPath, modalOverlays) {
    for (const overlay of modalOverlays) {
      if (eventPath.includes(overlay)) {
        return true;
      }
      const dialogEl = overlay.dialogEl;
      if (!dialogEl) {
        continue;
      }
      if (eventPath.includes(dialogEl)) {
        return true;
      }
      for (const element of eventPath) {
        if (element instanceof Node && dialogEl.contains(element)) {
          return true;
        }
      }
    }
    return false;
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
            if (!inPath && overlayEl.type !== "manual" && overlayEl.type !== "modal") {
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
