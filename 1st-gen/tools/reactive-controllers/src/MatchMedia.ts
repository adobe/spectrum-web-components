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

export const DARK_MODE = '(prefers-color-scheme: dark)';
export const IS_MOBILE =
    '(max-width: 743px) and (hover: none) and (pointer: coarse)';
export const IS_TOUCH_DEVICE = '(hover: none) and (pointer: coarse)';

export class MatchMediaController implements ReactiveController {
    key = Symbol('match-media-key');

    matches = false;

    protected host: ReactiveElement;

    protected media: MediaQueryList;

    constructor(host: ReactiveElement, query: string) {
        this.host = host;
        this.host.addController(this);
        this.media = window.matchMedia(query);
        this.matches = this.media.matches;
        this.onChange = this.onChange.bind(this);
        host.addController(this);
    }

    public hostConnected(): void {
        this.media?.addEventListener('change', this.onChange);
    }

    public hostDisconnected(): void {
        this.media?.removeEventListener('change', this.onChange);
    }

    protected onChange(event: MediaQueryListEvent): void {
        if (this.matches === event.matches) return;
        this.matches = event.matches;
        this.host.requestUpdate(this.key, !this.matches);
    }
}
