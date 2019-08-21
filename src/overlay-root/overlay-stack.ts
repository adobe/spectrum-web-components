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

import { ActiveOverlay } from './active-overlay';
import { OverlayOpenDetail, OverlayCloseDetail } from './overlay';

function isLeftClick(event: MouseEvent): boolean {
    return event.button === 0;
}

function hasModifier(event: MouseEvent): boolean {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

export class OverlayStack {
    public overlays: ActiveOverlay[] = [];

    private preventMouseRootClose: boolean = false;
    private root: HTMLElement = document.body;
    private onChange: (overlays: ActiveOverlay[]) => void;
    private handlingResize: boolean = false;

    public constructor(
        root: HTMLElement,
        onChange: (overlays: ActiveOverlay[]) => void
    ) {
        this.root = root;
        this.onChange = onChange;
        this.addEventListeners();
    }

    private get document(): Document {
        return this.root.ownerDocument || document;
    }

    private get topOverlay(): ActiveOverlay | undefined {
        return this.overlays.slice(-1)[0];
    }

    public dispose(): void {
        this.removeEventListeners();
    }

    private addEventListeners(): void {
        if (!this.document) return;
        this.document.addEventListener('click', this.handleMouseCapture, true);
        this.document.addEventListener('click', this.handleMouse);
        this.document.addEventListener('keyup', this.handleKeyUp);
        window.addEventListener('resize', this.handleResize);
    }

    private removeEventListeners(): void {
        if (!this.document) return;
        this.document.removeEventListener(
            'click',
            this.handleMouseCapture,
            true
        );
        this.document.removeEventListener('click', this.handleMouse);
        this.document.removeEventListener('keyup', this.handleKeyUp);
        window.removeEventListener('resize', this.handleResize);
    }

    private isOverlayActive(overlayContent: HTMLElement): boolean {
        return !!this.overlays.find(
            (item) => item.overlayContent === overlayContent
        );
    }

    private isClickOverlayActiveForTrigger(trigger: HTMLElement): boolean {
        return !!this.overlays.find(
            (item) => item.trigger === trigger && item.interaction === 'click'
        );
    }

    public openOverlay(event: CustomEvent<OverlayOpenDetail>): void {
        if (this.isOverlayActive(event.detail.content)) return;

        requestAnimationFrame(() => {
            const interaction = event.detail.interaction;
            if (interaction === 'click') {
                this.closeAllHoverOverlays();
            } else if (
                interaction === 'hover' &&
                this.isClickOverlayActiveForTrigger(event.detail.trigger)
            ) {
                // Don't show a hover popover if the click popover is already active
                return;
            }

            const activeOverlay = ActiveOverlay.create(event, this.root);
            this.overlays.push(activeOverlay);

            this.onChange(this.overlays);
        });
    }

    public closeOverlay(event: CustomEvent<OverlayCloseDetail>): void {
        const overlayContent = event.detail.content;
        const overlay = this.overlays.find(
            (item) => item.overlayContent === overlayContent
        );
        this.hideAndCloseOverlay(overlay);
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
            if (event.composedPath) {
                const path = event.composedPath();
                if (path.indexOf(topOverlay.overlayContent) >= 0) {
                    this.preventMouseRootClose = true;
                    return;
                }
            } else {
                // Polyfilled browsers
                if (topOverlay.overlayContent.contains(event.target)) {
                    this.preventMouseRootClose = true;
                    return;
                }
            }
            this.preventMouseRootClose = false;
        }
    };

    private closeAllHoverOverlays(): void {
        for (const overlay of this.overlays) {
            if (overlay.interaction === 'hover') {
                this.hideAndCloseOverlay(overlay);
            }
        }
    }

    private async hideAndCloseOverlay(overlay?: ActiveOverlay): Promise<void> {
        if (overlay) {
            await overlay.hide();
            const index = this.overlays.indexOf(overlay);
            if (index >= 0) {
                this.overlays[index].dispose();
                this.overlays.splice(index, 1);
            }
            this.onChange(this.overlays);
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
            this.overlays.forEach((overlay) => {
                overlay.updateOverlayPosition();
            });
            this.handlingResize = false;
        });
    };
}
