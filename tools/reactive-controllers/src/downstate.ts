/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import type { LitElement, ReactiveController } from 'lit';

export class DownState implements ReactiveController {
    private host: LitElement;
    private abortController: AbortController;

    constructor(host: LitElement) {
        this.host = host;
        this.abortController = new AbortController();
        this.host.addController(this);
    }

    public hostConnected(): void {
        this.manage();
    }

    public hostDisconnected(): void {
        this.removeEventListeners();
        this.abortController.abort();
    }

    public manage(): void {
        this.addEventListeners();
    }

    public unmanage(): void {
        this.removeEventListeners();
    }

    addEventListeners(): void {
        this.host?.addEventListener('pointerdown', this.handlePointerDown, {
            signal: this.abortController.signal,
        });
        this.host?.addEventListener('pointerup', this.handlePointerUp, {
            signal: this.abortController.signal,
        });
    }

    removeEventListeners(): void {
        this.host?.removeEventListener('pointerdown', this.handlePointerDown);
        this.host?.removeEventListener('pointerup', this.handlePointerUp);
    }

    public handlePointerDown = (): void => {
        this.updateDownStateStyles(true);
    };

    public handlePointerUp = (): void => {
        this.updateDownStateStyles(false);
    };

    public updateDownStateStyles(isPressed: boolean): void {
        if (isPressed) {
            const height = this.host.offsetHeight;
            const width = this.host.offsetWidth;
            this.host.style.setProperty(
                '--spectrum-downstate-width',
                `${width}px`
            );
            this.host.style.setProperty(
                '--spectrum-downstate-height',
                `${height}px`
            );
        } else {
            this.host.style.removeProperty('--spectrum-downstate-width');
            this.host.style.removeProperty('--spectrum-downstate-height');
        }
    }
}
