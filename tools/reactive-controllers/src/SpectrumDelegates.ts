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
import { SpectrumElement } from '@spectrum-web-components/base';
import { SpectrumTwoDownStateController } from './delegate-controllers/SpectrumTwoDownStateController.js';

export class SpectrumDelegates implements ReactiveController {
    private host: SpectrumElement;

    private spectrumTwoDownStateController: SpectrumTwoDownStateController | null =
        null;

    protected theme: string | null = null;

    set theme(value: string | null) {
        if (value === 'spectrum-two') {
            this.spectrumTwoDownStateController =
                new SpectrumTwoDownStateController(this.host);
        } else {
            this.spectrumTwoDownStateController?.unmanage();
        }
    }

    constructor(host: SpectrumElement) {
        this.host = host;
        this.host.addController(this);
    }

    public hostConnected(): void {}

    public hostDisconnected(): void {}
}
