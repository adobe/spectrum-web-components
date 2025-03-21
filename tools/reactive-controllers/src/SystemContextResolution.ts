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
import type { CSSResultOrNative, ReactiveController, ReactiveElement } from 'lit';
import StyleObserver from 'style-observer';
import type { StyleObserverCallback } from 'style-observer';

export type SystemThemes = 'spectrum'|'express'|'spectrum-two';
export type SystemThemeConfig = Map<SystemThemes, CSSResultOrNative | null>;

export const systemResolverUpdatedSymbol = Symbol('system resolver updated');

export type ProvideSystem = {
    callback: (system: SystemThemes, unsubscribe: () => void) => void;
};

export class SystemResolutionController implements ReactiveController {
    private host: ReactiveElement;

    public system: SystemThemes = 'spectrum';
    public get systemTheming(): SystemThemeConfig {
        return new Map([
            ['spectrum', null],
            ['express', null],
            ['spectrum-two', null],
        ]);
    }

    private unsubscribe?: () => void;

    /**
     * @todo This should have a way to add a super call to the constructor
     */
    private styleProcessing: StyleObserverCallback = (records) => {
        // Get the value of the context CSS custom property
        records.forEach((record, idx) => {
            // There should only be one record
            if (idx > 0) return;

            this.system = record.value as SystemThemes;
        });
    };

    private styleObserver: InstanceType<typeof StyleObserver> = new StyleObserver(this.styleProcessing, '--context');

    constructor(host: ReactiveElement) {
        this.host = host;
        this.host.addController(this);

        // Set up the styleObserver to watch for changes to the context CSS custom property
        this.styleObserver.observe(this.host);
    }

    public hostConnected(): void {
        this.resolveSystem();
    }

    public hostDisconnected(): void {
        this.unsubscribe?.();
    }

    private resolveSystem(system: SystemThemes|undefined = undefined): void {
        const previous = this.system;
        this.system = system ?? previous;
        this.unsubscribe = () => this.styleObserver.unobserve(this.host);
        this.host.requestUpdate(
            systemResolverUpdatedSymbol,
            previous
        );
    }
}
