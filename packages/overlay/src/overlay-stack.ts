/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { ActiveOverlay } from './active-overlay.js';
import { OverlayOpenDetail } from './overlay-types';

function isLeftClick(event: MouseEvent): boolean {
    return event.button === 0;
}

function hasModifier(event: MouseEvent): boolean {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

export class OverlayStack {
    private preventMouseRootClose = false;
    private root: HTMLElement = document.body;
    private handlingResize = false;

    public constructor() {
        this.addEventListeners();
    }

    private get document(): Document {
        return this.root.ownerDocument || document;
    }

    private get topOverlay(): ActiveOverlay | undefined {
        for (
            let index = document.body.children.length - 1;
            index >= 0;
            index--
        ) {
            const element = document.body.children[index];
            if (element instanceof ActiveOverlay) {
                return element;
            }
        }
    }

    private *overlays(): Generator<ActiveOverlay, void, undefined> {
        for (const item of document.body.children) {
            if (item instanceof ActiveOverlay) {
                yield item;
            }
        }
    }

    private findOverlayForContent(
        overlayContent: HTMLElement
    ): ActiveOverlay | undefined {
        for (const item of this.overlays()) {
            if (overlayContent.isSameNode(item.overlayContent as HTMLElement)) {
                return item;
            }
        }
    }

    private findOverlayForTrigger(
        overlayContent: HTMLElement
    ): ActiveOverlay | undefined {
        for (const item of this.overlays()) {
            if (overlayContent.isSameNode(item.trigger as HTMLElement)) {
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

    private isOverlayActive(overlayContent: HTMLElement): boolean {
        return !!this.findOverlayForContent(overlayContent);
    }

    private isClickOverlayActiveForTrigger(trigger: HTMLElement): boolean {
        const overlay = this.findOverlayForTrigger(trigger);
        return overlay != null && overlay.interaction === 'click';
    }

    public openOverlay(details: OverlayOpenDetail): void {
        /* istanbul ignore if */
        if (this.isOverlayActive(details.content)) return;

        requestAnimationFrame(() => {
            if (details.interaction === 'click') {
                this.closeAllHoverOverlays();
            } else if (
                details.interaction === 'hover' &&
                this.isClickOverlayActiveForTrigger(details.trigger)
            ) {
                // Don't show a hover popover if the click popover is already active
                return;
            }

            const activeOverlay = ActiveOverlay.create(details);
            document.body.appendChild(activeOverlay);
        });
    }

    public closeOverlay(content: HTMLElement): void {
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
        for (const overlay of this.overlays()) {
            if (overlay.interaction === 'hover') {
                this.hideAndCloseOverlay(overlay);
            }
        }
    }

    private async hideAndCloseOverlay(overlay?: ActiveOverlay): Promise<void> {
        if (overlay) {
            await overlay.hide();
            overlay.remove();
            overlay.dispose();
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
        requestAnimationFrame(() => {
            for (const overlay of this.overlays()) {
                overlay.updateOverlayPosition();
            }
            this.handlingResize = false;
        });
    };
}
