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

import * as React from 'react';
import { createComponent } from '@lit/react';
import type { EventName } from '@lit/react';
import { Accordion as SpAccordion } from '@spectrum-web-components/accordion';
import { AccordionItem as SpAccordionItem } from '@spectrum-web-components/accordion';

import '@spectrum-web-components/accordion/sp-accordion-item.js';
import '@spectrum-web-components/accordion/sp-accordion.js';

export const Accordion = createComponent({
    displayName: 'Accordion',
    elementClass: SpAccordion,
    react: React,
    tagName: 'sp-accordion',
    events: {},
});
export const AccordionItem = createComponent({
    displayName: 'AccordionItem',
    elementClass: SpAccordionItem,
    react: React,
    tagName: 'sp-accordion-item',
    events: {
        spAccordionItemToggle:
            'sp-accordion-item-toggle' as EventName<CustomEvent>, // Announce that an accordion item has been toggled while allowing the event to be cancelled.
    },
});

export type AccordionType = EventTarget & SpAccordion;
export type AccordionItemType = EventTarget & SpAccordionItem;
