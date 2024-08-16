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

import type { ReactiveController, ReactiveElement } from 'lit';
import { ProvideLang } from '@spectrum-web-components/theme';

export const languageResolverUpdatedSymbol = Symbol(
    'language resolver updated'
);

export class LanguageResolutionController implements ReactiveController {
    private host: ReactiveElement;
    language = document.documentElement.lang || navigator.language;
    private unsubscribe?: () => void;

    constructor(host: ReactiveElement) {
        this.host = host;
        this.host.addController(this);
    }

    public hostConnected(): void {
        this.resolveLanguage();
    }

    public hostUpdate(): void {
        /**
         * Needed to enable the storybook locale picker in the decorator. This is due to the fact that the
         * story function is called before the theme's event listener for the language context is set up,
         * making the initial language resolution to fail because no one catches the event.
         */
        if (!this._firstUpdated) {
            this._firstUpdated = true;
            this.resolveLanguage();
        }
    }
    private _firstUpdated: boolean = false;

    public hostDisconnected(): void {
        this.unsubscribe?.();
    }

    private resolveLanguage(): void {
        const queryThemeEvent = new CustomEvent<ProvideLang>(
            'sp-language-context',
            {
                bubbles: true,
                composed: true,
                detail: {
                    callback: (lang: string, unsubscribe: () => void) => {
                        const previous = this.language;
                        this.language = lang;
                        this.unsubscribe = unsubscribe;
                        this.host.requestUpdate(
                            languageResolverUpdatedSymbol,
                            previous
                        );
                    },
                },
                cancelable: true,
            }
        );
        this.host.dispatchEvent(queryThemeEvent);
    }
}
