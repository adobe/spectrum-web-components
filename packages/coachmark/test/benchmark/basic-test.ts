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

import '@spectrum-web-components/coachmark/sp-coachmark.js';
import { html } from 'lit';
import { measureFixtureCreation } from '../../../../test/benchmark/helpers.js';

measureFixtureCreation(html`
    <sp-coachmark heading="Coachmark Heading">
        Switch to the zoom tool then click and drag in the canvas to move your
        camera forward and backward.
        <sp-action-menu slot="actions" placement="bottom-end" quiet>
            <sp-menu-item>Skip tour</sp-menu-item>
            <sp-menu-item>Restart tour</sp-menu-item>
        </sp-action-menu>
    </sp-coachmark>
`);
