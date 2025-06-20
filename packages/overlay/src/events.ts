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

import type { TriggerInteractions } from './overlay-types.js';

export class BeforetoggleClosedEvent extends Event {
    currentState = 'open';
    newState = 'closed';
    constructor() {
        super('beforetoggle', {
            bubbles: false,
            composed: false,
        });
    }
}

export class BeforetoggleOpenEvent extends Event {
    currentState = 'closed';
    newState = 'open';
    constructor() {
        super('beforetoggle', {
            bubbles: false,
            composed: false,
        });
    }
}

export class OverlayStateEvent extends Event {
    detail!: {
        interaction: string;
        reason?: 'external-click';
    };

    constructor(
        type: string,
        public overlay: HTMLElement,
        {
            publish,
            interaction,
            reason,
        }: {
            publish?: boolean;
            interaction: TriggerInteractions;
            reason?: 'external-click';
        }
    ) {
        super(type, {
            bubbles: publish,
            composed: publish,
        });
        this.detail = {
            interaction,
            reason,
        };
    }
}
