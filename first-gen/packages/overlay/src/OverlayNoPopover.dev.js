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
export function OverlayNoPopover(constructor) {
  class OverlayWithNoPopover extends constructor {
    async managePopoverOpen() {
      await this.managePosition();
    }
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
    async ensureOnDOM(_targetOpenState) {
      document.body.offsetHeight;
    }
    async makeTransition(targetOpenState) {
      if (this.open !== targetOpenState) {
        return null;
      }
      let focusEl = null;
      const start = (el, index) => () => {
        if (targetOpenState !== this.open) {
          return;
        }
        el.open = targetOpenState;
        if (index === 0) {
          const event = targetOpenState ? BeforetoggleOpenEvent : BeforetoggleClosedEvent;
          this.dispatchEvent(new event());
        }
        if (targetOpenState !== true) {
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
        el.dispatchEvent(
          new OverlayStateEvent(eventName, this, {
            interaction: this.type
          })
        );
        if (index > 0) {
          return;
        }
        const hasVirtualTrigger = this.triggerElement instanceof VirtualTrigger;
        this.dispatchEvent(
          new OverlayStateEvent(eventName, this, {
            interaction: this.type,
            publish: hasVirtualTrigger
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
  return OverlayWithNoPopover;
}
//# sourceMappingURL=OverlayNoPopover.dev.js.map
