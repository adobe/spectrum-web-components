/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { html, LitElement, TemplateResult, CSSResultArray } from 'lit-element';

import overlayStyles from './overlay-root.css';

import { OverlayOpenDetail, OverlayCloseDetail } from './overlay';
import { ActiveOverlay } from './active-overlay';
import { OverlayStack } from './overlay-stack';

export class OverlayRoot extends LitElement {
    public static get styles(): CSSResultArray {
        return [overlayStyles];
    }

    private overlayStack?: OverlayStack;

    public constructor() {
        super();
        this.overlayStack = new OverlayStack(this, this.onOverlayStackChange);
    }

    public onOverlayOpen(event: CustomEvent<OverlayOpenDetail>): void {
        if (!this.overlayStack) return;

        this.overlayStack.openOverlay(event);
    }

    public onOverlayClose(event: CustomEvent<OverlayCloseDetail>): void {
        if (!this.overlayStack) return;

        this.overlayStack.closeOverlay(event);
    }

    private onOverlayStackChange = (activeOverlays: ActiveOverlay[]): void => {
        // Remove inactive overlays
        const activeSet = new Set<ActiveOverlay>(activeOverlays);
        for (const child of this.children) {
            if (child instanceof ActiveOverlay && !activeSet.has(child)) {
                this.removeChild(child);
            }
        }

        // Append new overlays
        for (const overlay of activeOverlays) {
            if (overlay.parentElement !== this) {
                overlay.setAttribute('slot', 'overlays');
                this.appendChild(overlay);
            }
        }
    };

    protected render(): TemplateResult {
        return html`
            <slot></slot>
            <slot name="overlays"></slot>
        `;
    }

    public connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener('sp-overlay:open', this
            .onOverlayOpen as EventListener);
        this.addEventListener('sp-overlay:close', this
            .onOverlayClose as EventListener);
    }

    public disconnectedCallback(): void {
        this.removeEventListener('sp-overlay:open', this
            .onOverlayOpen as EventListener);
        this.removeEventListener('sp-overlay:close', this
            .onOverlayClose as EventListener);
        if (this.overlayStack) {
            this.overlayStack.dispose();
        }
        super.disconnectedCallback();
    }
}
