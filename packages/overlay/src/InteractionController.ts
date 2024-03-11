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

import type { ReactiveController } from 'lit';
import { AbstractOverlay } from './AbstractOverlay.js';

export enum InteractionTypes {
    'click',
    'hover',
    'longpress',
}

export class InteractionController implements ReactiveController {
    abortController!: AbortController;

    get activelyOpening(): boolean {
        return false;
    }

    type!: InteractionTypes;

    constructor(public host: AbstractOverlay, public target: HTMLElement, private isPersistent = false) {
        this.host.addController(this);
        this.prepareDescription(this.target);
        if (this.isPersistent) {
            this.init();
        }
    }

    prepareDescription(_: HTMLElement): void {}

    releaseDescription(): void {}

    shouldCompleteOpen(): void {}

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
