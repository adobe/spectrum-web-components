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

import type { Placement } from '@floating-ui/dom';
import type { VirtualTrigger } from './VirtualTrigger.js';

export type Constructor<T = Record<string, unknown>> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new (...args: any[]): T;
    prototype: T;
};

export { Placement };

export type OverlayTypes = 'auto' | 'hint' | 'manual' | 'modal' | 'page';

// Constant array for runtime use (tests, validation, etc.)
export const OVERLAY_TYPES = [
    'auto',
    'hint',
    'manual',
    'modal',
    'page',
] as const satisfies readonly OverlayTypes[];

export type TriggerInteraction = 'click' | 'longpress' | 'hover';

export type TriggerInteractions = OverlayTypes;

export type TriggerInteractionsV1 =
    | 'click'
    | 'longpress'
    | 'hover'
    | 'custom'
    | 'replace'
    | 'inline'
    | 'modal';

export type OverlayTriggerInteractions = Extract<
    TriggerInteractions,
    'inline' | 'modal' | 'replace'
>;

export interface OverlayOpenCloseDetail {
    interaction: TriggerInteractions;
    reason?: 'external-click';
}

export interface OverlayCloseReasonDetail {
    reason?: 'external-click';
}

export type OverlayOptions = {
    delayed?: boolean;
    notImmediatelyClosable?: boolean;
    offset?: number | [number, number]; // supporting multi-axis
    placement?: Placement;
    receivesFocus?: 'auto' | 'true' | 'false';
    trigger?: HTMLElement | VirtualTrigger;
    type?: 'modal' | 'page' | 'hint' | 'auto' | 'manual';
};

export type OverlayOptionsV1 = {
    root?: HTMLElement;
    delayed?: boolean;
    placement?: Placement;
    offset?: number;
    receivesFocus?: 'true' | 'false' | 'auto';
    notImmediatelyClosable?: boolean;
    abortPromise?: Promise<boolean>;
    virtualTrigger?: VirtualTrigger;
};

declare global {
    interface GlobalEventHandlersEventMap {
        'sp-opened': CustomEvent<OverlayOpenCloseDetail>;
        'sp-closed': CustomEvent<OverlayOpenCloseDetail>;
    }
}

export type OpenableElement = HTMLElement & {
    open: boolean;
    tipElement?: HTMLElement;
    updateComplete?: Promise<void>;
};

export type OverlayState = 'closed' | 'opening' | 'opened' | 'closing';
