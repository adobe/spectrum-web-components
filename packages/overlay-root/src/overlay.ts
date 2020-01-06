/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

export type TriggerInteractions = 'click' | 'hover';

export type Placement = 'top' | 'right' | 'bottom' | 'left';

import { ThemeData } from '@spectrum-web-components/theme';

export interface OverlayOpenDetail {
    content: HTMLElement;
    delay: number;
    offset: number;
    placement: Placement;
    trigger: HTMLElement;
    interaction: TriggerInteractions;
    theme: ThemeData;
}

export interface OverlayCloseDetail {
    content: HTMLElement;
}
