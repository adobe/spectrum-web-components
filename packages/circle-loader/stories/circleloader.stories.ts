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
import '../sp-circle-loader.js';
import { html, number, boolean } from '@open-wc/demoing-storybook';
import { TemplateResult } from '@spectrum-web-components/base';

export default {
    component: 'sp-circle-loader',
    title: 'Circle Loader',
};

export const Default = (): TemplateResult => {
    const progress = number(
        'Progress',
        27,
        {
            range: true,
            min: 0,
            max: 100,
            step: 1,
        },
        'Component'
    );
    const indeterminate = boolean('Indeterminate', false, 'Component');
    return html`
        <div
            style="width: 250px; height: 150px; display: flex; align-items: center; justify-content: space-around;"
        >
            <sp-circle-loader
                progress=${progress}
                size="small"
                ?indeterminate=${indeterminate}
            ></sp-circle-loader>
            <sp-circle-loader
                progress=${progress}
                ?indeterminate=${indeterminate}
            ></sp-circle-loader>
            <sp-circle-loader
                progress=${progress}
                size="large"
                ?indeterminate=${indeterminate}
            ></sp-circle-loader>
        </div>
    `;
};

export const overBackground = (): TemplateResult => {
    const progress = number(
        'Progress',
        53,
        {
            range: true,
            min: 0,
            max: 100,
            step: 1,
        },
        'Component'
    );
    const indeterminate = boolean('Indeterminate', false, 'Component');
    return html`
        <div
            style="width: 250px; height: 150px; background-color: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: space-around;"
        >
            <sp-circle-loader
                progress=${progress}
                over-background
                size="small"
                ?indeterminate=${indeterminate}
            ></sp-circle-loader>
            <sp-circle-loader
                progress=${progress}
                over-background
                ?indeterminate=${indeterminate}
            ></sp-circle-loader>
            <sp-circle-loader
                progress=${progress}
                over-background
                size="large"
                ?indeterminate=${indeterminate}
            ></sp-circle-loader>
        </div>
    `;
};

overBackground.story = {
    name: 'Over background',
};
