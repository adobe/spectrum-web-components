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
import { ReactiveElement } from 'lit';
import { OverlayBase } from './OverlayBase.js';

type Constructor<T = Record<string, unknown>> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new (...args: any[]): T;
    prototype: T;
};

export function OverlayPopover<T extends Constructor<OverlayBase>>(
    constructor: T
): T & Constructor<ReactiveElement> {
    class OverlayWithPopover extends constructor {
        protected override async managePopoverOpen(): Promise<void> {
            const doClose = (
                cb = () => {
                    return;
                }
            ): void => {
                this.elements[0]?.addEventListener('transitionend', cb, {
                    once: true,
                });
                this.manageChildren(false);
            };
            if (this.open) {
                await this.managePosition();
                if (!this.dialogEl.matches(':open')) {
                    this.manageChildren(true);
                    requestAnimationFrame(() => {
                        // Ensure that child content is fully "on the DOM" before showing the modal.
                        // This allow for that content to be available to the focus algorithm of that process.
                        this.dialogEl.showPopover();
                    });
                }
            } else {
                if (this.dialogEl.matches(':open')) {
                    doClose(() => {
                        if (!this.open) {
                            this.dialogEl.hidePopover();
                        }
                    });
                } else {
                    doClose();
                }
            }
        }
    }
    return OverlayWithPopover;
}
