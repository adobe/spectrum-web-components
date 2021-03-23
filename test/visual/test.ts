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

import { fixture, html, waitUntil } from '@open-wc/testing';
import { visualDiff } from '@web/test-runner-visual-regression';
import '@spectrum-web-components/story-decorator/sp-story-decorator.js';
import * as stories from './story-imports.js';
import { StoryDecorator } from '@spectrum-web-components/story-decorator/src/StoryDecorator';
import { TemplateResult } from '@spectrum-web-components/base';

const wrap = (story: TemplateResult) => html`
    <sp-story-decorator reduce-motion screenshot>${story}</sp-story-decorator>
`;

describe('Visual Regressions', () => {
    const {
        defaultColor: color,
        defaultScale: scale,
        defaultDirection: dir,
    } = window.__swc_hack_knobs__;
    afterEach(() => {
        const overlays = [
            ...(document.querySelectorAll('active-overlay') || []),
        ];
        overlays.map((overlay) => overlay.remove());
    });
    Object.keys(stories).map((packageStories) => {
        describe(packageStories, () => {
            const tests = (stories as any)[packageStories];
            Object.keys(tests).map((story) => {
                if (story !== 'default') {
                    it(story, async () => {
                        const testsDefault = tests.default;
                        const args = {
                            ...(testsDefault.args || {}),
                            ...(tests[story].args || {}),
                        };
                        let decoratedStory:
                            | (() => TemplateResult)
                            | TemplateResult = () =>
                            html`
                                ${tests[story](args)}
                            `;
                        let storyResult = decoratedStory();
                        if (
                            testsDefault.decorators &&
                            testsDefault.decorators.length
                        ) {
                            let decoratorCount = testsDefault.decorators.length;
                            while (decoratorCount) {
                                decoratorCount -= 1;
                                decoratedStory = testsDefault.decorators[
                                    decoratorCount
                                ](decoratedStory);
                            }
                            storyResult = decoratedStory as TemplateResult;
                        }
                        const test = await fixture<StoryDecorator>(
                            wrap(storyResult)
                        );
                        await waitUntil(
                            () => test.ready,
                            'Wait for decorator to become ready...',
                            { timeout: 10000 }
                        );
                        await visualDiff(
                            test,
                            `${color} - ${scale} - ${dir} - ${packageStories} - ${story}`
                        );
                    });
                }
            });
        });
    });
});
