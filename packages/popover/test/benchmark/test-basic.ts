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

import '@spectrum-web-components/sp-popover.js';
import { html } from '@spectrum-web-components/base';
import { measureFixtureCreation } from '../../../../test/benchmark/helpers';

measureFixtureCreation(html`
    <sp-popover variant="dialog" direction="top" open>
        <div id="title">
            Popover Title
        </div>
        <div id="content">
            Cupcake ipsum dolor sit amet jelly beans. Chocolate jelly caramels.
            Icing soufflé chupa chups donut cheesecake. Jelly-o chocolate cake
            sweet roll cake danish candy biscuit halvah
        </div>
    </sp-popover>
`);
