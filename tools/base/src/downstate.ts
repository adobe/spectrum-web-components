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

import type { ReactiveController } from 'lit';
import type { SpectrumElement } from '@spectrum-web-components/base';

export class DownState implements ReactiveController {
    private host: SpectrumElement;

    constructor(host: SpectrumElement) {
        this.host = host;
        this.host.addController(this);
    }

    public hostConnected(): void {
        if (this.host.spectrumConfig?.downstate?.includes('spectrum-two')) {
            this.manage();
        }
    }

    public hostDisconnected(): void {
        this.removeEventListeners();
    }

    public manage(): void {
        this.addEventListeners();
    }

    public unmanage(): void {
        this.removeEventListeners();
    }

    addEventListeners(): void {
        this.host?.addEventListener('pointerdown', this.handlePointerDown);
        this.host?.addEventListener('pointerup', this.handlePointerUp);
    }

    removeEventListeners(): void {
        this.host?.removeEventListener('pointerdown', this.handlePointerDown);
        this.host?.removeEventListener('pointerup', this.handlePointerUp);
    }

    private handlePointerDown = (): void => {
        this.updateDownStateStyles(true);
    };

    private handlePointerUp = (): void => {
        this.updateDownStateStyles(false);
    };

    private updateDownStateStyles(isPressed: boolean): void {
        if (isPressed) {
            const height = this.host.offsetHeight;
            const width = this.host.offsetWidth;
            const transform = `perspective(max(${height}px, ${
                width / 3
            }px)) translate3d(0, 0, -2px)`;
            this.host.style.setProperty('transform', transform);
        } else {
            this.host.style.removeProperty('transform');
        }
    }
}
