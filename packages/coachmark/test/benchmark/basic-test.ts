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

import '@spectrum-web-components/coachmark/sp-coachmark-trigger.js';
import '@spectrum-web-components/coachmark/sp-coach-indicator.js';
import { html } from 'lit';
import { measureFixtureCreation } from '../../../../test/benchmark/helpers.js';
import { CoachmarkItem } from '../../src/CoachmarkItem.js';

const item: CoachmarkItem = {
    heading: 'Bare bones',
    content:
        'This is a Rich Coachmark with nothing but text in it. Kind of lonely in here.',
    currentStep: 2,
    totalSteps: 8,
    primaryCTA: 'Next',
    secondaryCTA: 'Previous',
};

measureFixtureCreation(html`
    <sp-coachmark-trigger
        open
        placement="right"
        .item=${item}
        triggerInteraction="click"
    >
        <sp-coach-indicator slot="trigger"></sp-coach-indicator>
    </sp-coachmark-trigger>
`);
