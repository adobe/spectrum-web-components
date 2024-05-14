/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import type { ReactiveController } from '@spectrum-web-components/base';
import { AbstractOverlay } from '@spectrum-web-components/overlay/src/AbstractOverlay';
import { PickerBase } from './PickerBase.js';

export enum InteractionTypes {
    'desktop',
    'mobile',
}

export class InteractionController implements ReactiveController {
    abortController!: AbortController;

    get activelyOpening(): boolean {
        return false;
    }

    private handleOverlayReady?: (overlay: AbstractOverlay) => void;

    public get open(): boolean {
        return this.host.open;
    }

    /**
     * Set `open`
     */
    public set open(open: boolean) {
        this.host.open = open;
    }

    toggle(target?: boolean): void {
        this.host.toggle(target);
    }

    type!: InteractionTypes;

    constructor(
        public target: HTMLElement,
        public overlay: AbstractOverlay | undefined,
        public host: PickerBase
    ) {
        this.target = target;
        this.overlay = overlay;
        this.host = host;
        this.init();
    }

    releaseDescription(): void {}

    /* c8 ignore next 3 */
    init(): void {
        // Abstract init() method.
    }

    abort(): void {
        this.releaseDescription();
        this.abortController?.abort();
    }

    hostConnected(): void {
        this.init();
    }

    hostDisconnected(): void {
        if (!this.isPersistent) {
            this.abort();
        }
    }
}
