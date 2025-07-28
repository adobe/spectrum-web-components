"use strict";
const DEFAULT_WARMUP = 1e3;
const DEFAULT_COOLDOWN = 1e3;
export class OverlayTimer {
  constructor(options = {}) {
    this.warmUpDelay = DEFAULT_WARMUP;
    this.coolDownDelay = DEFAULT_COOLDOWN;
    this.isWarm = false;
    this.timeout = 0;
    Object.assign(this, options);
  }
  async openTimer(component) {
    this.cancelCooldownTimer();
    if (!this.component || component !== this.component) {
      if (this.component) {
        this.close(this.component);
        this.cancelCooldownTimer();
      }
      this.component = component;
      if (this.isWarm) {
        return false;
      }
      this.promise = new Promise((resolve) => {
        this.resolve = resolve;
        this.timeout = window.setTimeout(() => {
          if (this.resolve) {
            this.resolve(false);
            this.isWarm = true;
          }
        }, this.warmUpDelay);
      });
      return this.promise;
    } else if (this.promise) {
      return this.promise;
    } else {
      throw new Error("Inconsistent state");
    }
  }
  close(component) {
    if (this.component && this.component === component) {
      this.resetCooldownTimer();
      if (this.timeout > 0) {
        clearTimeout(this.timeout);
        this.timeout = 0;
      }
      if (this.resolve) {
        this.resolve(true);
        delete this.resolve;
      }
      delete this.promise;
      delete this.component;
    }
  }
  resetCooldownTimer() {
    if (this.isWarm) {
      if (this.cooldownTimeout) {
        window.clearTimeout(this.cooldownTimeout);
      }
      this.cooldownTimeout = window.setTimeout(() => {
        this.isWarm = false;
        delete this.cooldownTimeout;
      }, this.coolDownDelay);
    }
  }
  cancelCooldownTimer() {
    if (this.cooldownTimeout) {
      window.clearTimeout(this.cooldownTimeout);
    }
    delete this.cooldownTimeout;
  }
}
//# sourceMappingURL=overlay-timer.dev.js.map
