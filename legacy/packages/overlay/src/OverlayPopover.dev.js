"use strict";
import {
  firstFocusableIn,
  firstFocusableSlottedIn
} from "@spectrum-web-components/shared/src/first-focusable-in.js";
import { VirtualTrigger } from "./VirtualTrigger.dev.js";
import {
  guaranteedAllTransitionend,
  nextFrame,
  overlayTimer
} from "./AbstractOverlay.dev.js";
import {
  BeforetoggleClosedEvent,
  BeforetoggleOpenEvent,
  OverlayStateEvent
} from "./events.dev.js";
import { userFocusableSelector } from "@spectrum-web-components/shared";
const supportsOverlayAuto = CSS.supports("(overlay: auto)");
function isOpen(el) {
  let popoverOpen = false;
  try {
    popoverOpen = el.matches(":popover-open");
  } catch (error) {
  }
  let open = false;
  try {
    open = el.matches(":open");
  } catch (error) {
  }
  return popoverOpen || open;
}
export function OverlayPopover(constructor) {
  class OverlayWithPopover extends constructor {
    async manageDelay(targetOpenState) {
      if (targetOpenState === false || targetOpenState !== this.open) {
        overlayTimer.close(this);
        return;
      }
      if (this.delayed) {
        const cancelled = await overlayTimer.openTimer(this);
        if (cancelled) {
          this.open = !targetOpenState;
        }
      }
    }
    /**
     * A popover should be hidden _after_ it is no longer on top-layer because
     * the position metrics will have changed from when it was originally positioned.
     */
    async shouldHidePopover(targetOpenState) {
      if (targetOpenState && this.open !== targetOpenState) {
        return;
      }
      const update = async ({
        newState
      } = {}) => {
        if (newState === "open") {
          return;
        }
        await this.placementController.resetOverlayPosition();
      };
      if (!isOpen(this.dialogEl)) {
        update();
        return;
      }
      this.dialogEl.addEventListener("toggle", update, {
        once: true
      });
    }
    shouldShowPopover(targetOpenState) {
      let popoverOpen = false;
      try {
        popoverOpen = this.dialogEl.matches(":popover-open");
      } catch (error) {
      }
      let open = false;
      try {
        open = this.dialogEl.matches(":open");
      } catch (error) {
      }
      if (targetOpenState && this.open === targetOpenState && !popoverOpen && !open && this.isConnected) {
        this.dialogEl.showPopover();
        this.managePosition();
      }
    }
    async ensureOnDOM(targetOpenState) {
      if (!supportsOverlayAuto) {
        await this.shouldHidePopover(targetOpenState);
      }
      this.shouldShowPopover(targetOpenState);
      await nextFrame();
    }
    async makeTransition(targetOpenState) {
      if (this.open !== targetOpenState) {
        return null;
      }
      let focusEl = null;
      const start = (el, index) => () => {
        el.open = targetOpenState;
        if (index === 0) {
          const event = targetOpenState ? BeforetoggleOpenEvent : BeforetoggleClosedEvent;
          this.dispatchEvent(new event());
        }
        if (!targetOpenState) {
          return;
        }
        if (el.matches(userFocusableSelector)) {
          focusEl = el;
        }
        focusEl = focusEl || firstFocusableIn(el);
        if (focusEl) {
          return;
        }
        const childSlots = el.querySelectorAll("slot");
        childSlots.forEach((slot) => {
          if (!focusEl) {
            focusEl = firstFocusableSlottedIn(slot);
          }
        });
      };
      const finish = (el, index) => async () => {
        if (this.open !== targetOpenState) {
          return;
        }
        const eventName = targetOpenState ? "sp-opened" : "sp-closed";
        if (index > 0) {
          el.dispatchEvent(
            new OverlayStateEvent(eventName, this, {
              interaction: this.type,
              publish: false
            })
          );
          return;
        }
        const reportChange = async () => {
          if (this.open !== targetOpenState) {
            return;
          }
          await nextFrame();
          const hasVirtualTrigger = this.triggerElement instanceof VirtualTrigger;
          this.dispatchEvent(
            new OverlayStateEvent(eventName, this, {
              interaction: this.type,
              publish: hasVirtualTrigger
            })
          );
          el.dispatchEvent(
            new OverlayStateEvent(eventName, this, {
              interaction: this.type,
              publish: false
            })
          );
          if (this.triggerElement && !hasVirtualTrigger) {
            this.triggerElement.dispatchEvent(
              new OverlayStateEvent(eventName, this, {
                interaction: this.type,
                publish: true
              })
            );
          }
          this.state = targetOpenState ? "opened" : "closed";
          this.returnFocus();
          await nextFrame();
          await nextFrame();
          if (targetOpenState === this.open && targetOpenState === false) {
            this.requestSlottable();
          }
        };
        if (this.open !== targetOpenState) {
          return;
        }
        const open = isOpen(this.dialogEl);
        if (targetOpenState !== true && open && this.isConnected) {
          this.dialogEl.addEventListener(
            "beforetoggle",
            () => {
              reportChange();
            },
            { once: true }
          );
          this.dialogEl.hidePopover();
        } else {
          reportChange();
        }
      };
      this.elements.forEach((el, index) => {
        guaranteedAllTransitionend(
          el,
          start(el, index),
          finish(el, index)
        );
      });
      return focusEl;
    }
  }
  return OverlayWithPopover;
}
//# sourceMappingURL=OverlayPopover.dev.js.map
