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

import { OverlayOpenDetail, OverlayCloseDetail } from './overlay.js';
import { ActiveOverlay } from './active-overlay.js';
import { OverlayStack } from './overlay-stack.js';

export class OverlayRoot {
    public constructor() {
        this.listen();
    }

    public onOverlayOpen = (event: CustomEvent<OverlayOpenDetail>): void => {
        event.stopPropagation();

        this.overlayStack.openOverlay(event);
    };

    public onOverlayClose = (event: CustomEvent<OverlayCloseDetail>): void => {
        event.stopPropagation();

        this.overlayStack.closeOverlay(event);
    };

    private onOverlayStackChange = (activeOverlays: ActiveOverlay[]): void => {
        // Remove inactive overlays
        const activeSet = new Set<ActiveOverlay>(activeOverlays);
        for (const child of document.body.children) {
            if (child instanceof ActiveOverlay && !activeSet.has(child)) {
                document.body.removeChild(child);
            }
        }

        // Append new overlays
        for (const overlay of activeOverlays) {
            if (overlay.parentElement !== document.body) {
                overlay.setAttribute('slot', 'overlays');
                document.body.append(overlay);
            }
        }
    };

    public listen(): void {
        document.body.addEventListener(
            'sp-overlay-open',
            this.onOverlayOpen as EventListener,
            true
        );
        document.body.addEventListener(
            'sp-overlay-close',
            this.onOverlayClose as EventListener,
            true
        );
    }

    private overlayStack = new OverlayStack(
        document.body,
        this.onOverlayStackChange
    );
}
