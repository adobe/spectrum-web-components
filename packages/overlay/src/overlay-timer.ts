/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const DEFAULT_WARMUP = 1000;
const DEFAULT_COOLDOWN = 1000;

/**
 * A timer to help with implementation of warnup/cooldown behavior as described here:
 * https://spectrum.adobe.com/page/tooltip/#Immediate-or-delayed-appearance
 */
export class OverlayTimer {
    private warmUpDelay = DEFAULT_WARMUP;
    private coolDownDelay = DEFAULT_COOLDOWN;

    private isWarm = false;
    private cooldownTimeout?: number;

    private component?: HTMLElement;
    private timeout = 0;
    private promise?: Promise<boolean>;
    private resolve?: (cancelled: boolean) => void;

    constructor(
        options: { warmUpDelay?: number; coolDownDelay?: number } = {}
    ) {
        Object.assign(this, options);
    }

    public async openTimer(component: HTMLElement): Promise<boolean> {
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
            /* c8 ignore next 4 */
        } else {
            // This should never happen
            throw new Error('Inconsistent state');
        }
    }

    public close(component: HTMLElement): void {
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

    private resetCooldownTimer(): void {
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

    private cancelCooldownTimer(): void {
        if (this.cooldownTimeout) {
            window.clearTimeout(this.cooldownTimeout);
        }
        delete this.cooldownTimeout;
    }
}
