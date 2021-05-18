/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { ThemeData } from '@spectrum-web-components/theme';
import { Placement as PopperPlacement } from './popper';

export type TriggerInteractions =
    | 'click'
    | 'longpress'
    | 'hover'
    | 'custom'
    | 'replace'
    | 'inline'
    | 'modal';

export interface OverlayOpenDetail {
    content: HTMLElement;
    contentTip?: HTMLElement;
    delayed: boolean;
    offset: number;
    placement?: Placement;
    receivesFocus?: 'auto';
    trigger: HTMLElement;
    interaction: TriggerInteractions;
    theme: ThemeData;
    notImmediatelyClosable?: boolean;
    abortPromise?: Promise<boolean>;
}

export interface OverlayOpenCloseDetail {
    interaction: TriggerInteractions;
}

/**
 * Used, via an event, to query details about how an element should be shown in
 * an overlay
 */
export interface OverlayDisplayQueryDetail {
    overlayRootName?: string;
    overlayRootElement?: HTMLElement;
    overlayContentTipElement?: HTMLElement;
}

export type Placement = PopperPlacement | 'none';

export type OverlayOptions = {
    delayed?: boolean;
    placement?: Placement;
    offset?: number;
    receivesFocus?: 'auto';
    notImmediatelyClosable?: boolean;
    abortPromise?: Promise<boolean>;
};

declare global {
    interface GlobalEventHandlersEventMap {
        'sp-overlay-query': CustomEvent<OverlayDisplayQueryDetail>;
        'sp-open': CustomEvent<OverlayOpenCloseDetail>;
        'sp-close': CustomEvent<OverlayOpenCloseDetail>;
    }
}
