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
import { storiesOf } from '@storybook/polymer';
import { withKnobs } from '@storybook/addon-knobs';
import { html } from 'lit-html';

import '../src/card';

storiesOf('Card', module)
    .addDecorator(withKnobs)
    .add('Default', () => {
        return html`
            <div style="color: var(--spectrum-global-color-gray-800)">
                <sp-card title="Card Title" subtitle="JPG">
                    <img
                        slot="cover-photo"
                        src="https://picsum.photos/200/300"
                        alt="Demo Image"
                    />
                    <div slot="footer">Footer</div>
                </sp-card>
            </div>
        `;
    })
    .add('Gallery', () => {
        return html`
            <div style="width: 532px; height: 224px">
                <sp-card variant="gallery" title="Card Title" subtitle="JPG">
                    <img
                        slot="preview"
                        src="https://picsum.photos/532/192"
                        style="object-fit: cover"
                        alt="Demo Image"
                    />
                    <div slot="description">10/15/18</div>
                    <div slot="footer">Footer</div>
                </sp-card>
            </div>
        `;
    })
    .add('Quiet', () => {
        return html`
            <div style="width: 208px; height: 264px">
                <sp-card variant="quiet" title="Card Title" subtitle="JPG">
                    <img
                        slot="preview"
                        src="https://picsum.photos/200/300"
                        alt="Demo Image"
                    />
                    <div slot="description">10/15/18</div>
                    <div slot="footer">Footer</div>
                </sp-card>
            </div>
        `;
    });
