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

import { ActiveOverlay } from './ActiveOverlay.js';
import { OverlayOpenDetail } from './overlay-types';
import { OverlayTimer } from './overlay-timer';

function isLeftClick(event: MouseEvent): boolean {
    return event.button === 0;
}

function hasModifier(event: MouseEvent): boolean {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

export class OverlayStack {
    public overlays: ActiveOverlay[] = [];

    private preventMouseRootClose = false;
    private root: HTMLElement = document.body;
    private handlingResize = false;
    private overlayTimer = new OverlayTimer();

    public constructor() {
        this.addEventListeners();
        this.initTabTrapping();
    }

    private tabTrapper!: HTMLElement;
    private overlayHolder!: HTMLElement;

    private initTabTrapping(): void {
        this.document.body.attachShadow({ mode: 'open' });
        /* istanbul ignore if */
        if (!this.document.body.shadowRoot) {
            return;
        }
        const root = this.document.body.shadowRoot;
        root.innerHTML = `
            <div id="actual"><slot></slot></div>
            <style>
            #actual {
                position: relative;
                z-index: 0;
            }
            #holder {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-flow: column;
                height: 100%;
                width: 100%;
                top: 0;
                left: 0;
                position: fixed;
            }
            #holder[hidden] {
                display: none !important;
            }
            #actual[tabindex="-1"] {
                pointer-events: none;  /* just in case? */
            }
            </style>
            <div id="holder" hidden><slot name="open"></slot></div>
        `;
        this.tabTrapper = root.querySelector('#actual') as HTMLElement;
        this.overlayHolder = root.querySelector('#holder') as HTMLElement;
        this.tabTrapper.attachShadow({ mode: 'open' });
        /* istanbul ignore else */
        if (this.tabTrapper.shadowRoot) {
            this.tabTrapper.shadowRoot.innerHTML = '<slot></slot>';
        }
    }

    private startTabTrapping(): void {
        this.tabTrapper.tabIndex = -1;
        this.overlayHolder.hidden = false;
    }

    private stopTabTrapping(): void {
        this.tabTrapper.removeAttribute('tabindex');
        this.overlayHolder.hidden = true;
    }

    private get document(): Document {
        return this.root.ownerDocument /* istanbul ignore next */ || document;
    }

    private get topOverlay(): ActiveOverlay | undefined {
        return this.overlays.slice(-1)[0];
    }

    private findOverlayForContent(
        overlayContent: HTMLElement
    ): ActiveOverlay | undefined {
        for (const item of this.overlays) {
            if (overlayContent.isSameNode(item.overlayContent as HTMLElement)) {
                return item;
            }
        }
    }

    private addEventListeners(): void {
        this.document.addEventListener('click', this.handleMouseCapture, true);
        this.document.addEventListener('click', this.handleMouse);
        this.document.addEventListener('keyup', this.handleKeyUp);
        window.addEventListener('resize', this.handleResize);
    }

    private isClickOverlayActiveForTrigger(trigger: HTMLElement): boolean {
        return this.overlays.some(
            (item) =>
                trigger.isSameNode(item.trigger as HTMLElement) &&
                item.interaction === 'click'
        );
    }

    public async openOverlay(details: OverlayOpenDetail): Promise<boolean> {
        if (this.findOverlayForContent(details.content)) {
            return false;
        }
        if (details.interaction === 'modal') {
            this.startTabTrapping();
        }

        if (details.delayed) {
            const promise = this.overlayTimer.openTimer(details.content);
            const cancelled = await promise;
            if (cancelled) {
                return promise;
            }
        }

        if (details.interaction === 'click') {
            this.closeAllHoverOverlays();
        } else if (
            details.interaction === 'hover' &&
            this.isClickOverlayActiveForTrigger(details.trigger)
        ) {
            // Don't show a hover popover if the click popover is already active
            return true;
        }

        await import('../active-overlay.js');
        const activeOverlay = ActiveOverlay.create(details);
        this.overlays.push(activeOverlay);
        document.body.appendChild(activeOverlay);
        let updateComplete = await activeOverlay.updateComplete;
        while (updateComplete === false) {
            updateComplete = await activeOverlay.updateComplete;
        }

        activeOverlay.addEventListener('close', () => {
            this.hideAndCloseOverlay(activeOverlay);
        });
        if (details.interaction === 'inline') {
            this.addOverlayEventListeners(activeOverlay);
        }
        if (details.receivesFocus === 'auto') {
            activeOverlay.focus();
        }

        return false;
    }

    public addOverlayEventListeners(activeOverlay: ActiveOverlay): void {
        activeOverlay.addEventListener('keydown', (event: KeyboardEvent) => {
            const { code } = event;
            /* istanbul ignore if */
            if (code !== 'Tab') return;

            event.stopPropagation();
            this.closeOverlay(activeOverlay.overlayContent);
            activeOverlay.tabbingAway = true;
            activeOverlay.trigger.focus();
            activeOverlay.trigger.dispatchEvent(
                new KeyboardEvent('keydown', event)
            );
        });
    }

    public closeOverlay(content: HTMLElement): void {
        this.overlayTimer.close(content);
        requestAnimationFrame(() => {
            const overlay = this.findOverlayForContent(content);
            this.hideAndCloseOverlay(overlay);
        });
    }

    private handleMouseCapture = (event: MouseEvent): void => {
        const topOverlay = this.topOverlay;
        if (
            !event.target ||
            !topOverlay ||
            !topOverlay.overlayContent ||
            hasModifier(event) ||
            !isLeftClick(event)
        ) {
            this.preventMouseRootClose = true;
            return;
        }

        /* istanbul ignore else */
        if (event.target instanceof Node) {
            const path = event.composedPath();
            if (path.indexOf(topOverlay.overlayContent) >= 0) {
                this.preventMouseRootClose = true;
                return;
            }
            this.preventMouseRootClose = false;
        }
    };

    private closeAllHoverOverlays(): void {
        for (const overlay of this.overlays) {
            if (overlay.interaction === 'hover') {
                this.hideAndCloseOverlay(overlay, false);
            }
        }
    }

    private async hideAndCloseOverlay(
        overlay?: ActiveOverlay,
        animated?: boolean
    ): Promise<void> {
        if (overlay) {
            await overlay.hide(animated);
            if (overlay.state != 'dispose') return;

            overlay.remove();
            overlay.dispose();

            const index = this.overlays.indexOf(overlay);
            /* istanbul ignore else */
            if (index >= 0) {
                this.overlays.splice(index, 1);
            }
            if (this.overlays.length) {
                const topOverlay = this.overlays[this.overlays.length - 1];
                if (topOverlay.interaction === 'modal') {
                    topOverlay.focus();
                }
            } else {
                this.stopTabTrapping();
                if (
                    overlay.interaction === 'modal' ||
                    (overlay.interaction === 'inline' && !overlay.tabbingAway)
                ) {
                    overlay.tabbingAway = false;
                    overlay.trigger.focus();
                }
            }
        }
    }

    private closeTopOverlay(): Promise<void> {
        return this.hideAndCloseOverlay(this.topOverlay);
    }

    private handleMouse = (): void => {
        if (!this.preventMouseRootClose) {
            this.closeTopOverlay();
        }
    };

    private handleKeyUp = (event: KeyboardEvent): void => {
        if (event.key === 'Escape') {
            this.closeTopOverlay();
        }
    };

    private handleResize = (): void => {
        if (this.handlingResize) return;

        this.handlingResize = true;
        requestAnimationFrame(async () => {
            const promises = this.overlays.map((overlay) =>
                overlay.updateOverlayPosition()
            );
            await Promise.all(promises);
            this.handlingResize = false;
        });
    };
}
