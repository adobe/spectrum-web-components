/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import type { ReactiveController, ReactiveElement } from 'lit';
import type { SystemVariant } from '@spectrum-web-components/theme';

export const systemResolverUpdatedSymbol = Symbol('system resolver updated');

export type ProvideSystem = {
    callback: (system: SystemVariant, unsubscribe: () => void) => void;
};

export class SystemResolutionController implements ReactiveController {
    private host: ReactiveElement;
    public system: SystemVariant = 'spectrum';
    private unsubscribe?: () => void;

    constructor(host: ReactiveElement) {
        this.host = host;
        this.host.addController(this);
    }

    public hostConnected(): void {
        this.resolveSystem();
    }

    public hostDisconnected(): void {
        this.unsubscribe?.();
    }

    private resolveSystem(): void {
        const querySystemEvent = new CustomEvent<ProvideSystem>(
            'sp-system-context',
            {
                bubbles: true,
                composed: true,
                detail: {
                    callback: (
                        system: SystemVariant,
                        unsubscribe: () => void
                    ) => {
                        const previous = this.system;
                        this.system = system;
                        this.unsubscribe = unsubscribe;
                        this.host.requestUpdate(
                            systemResolverUpdatedSymbol,
                            previous
                        );
                    },
                },
                cancelable: true,
            }
        );
        this.host.dispatchEvent(querySystemEvent);
    }
}
