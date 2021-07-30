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

import {
    elementUpdated,
    fixture,
    nextFrame,
    waitUntil,
} from '@open-wc/testing';
import { visualDiff } from '@web/test-runner-visual-regression';
import '@spectrum-web-components/story-decorator/sp-story-decorator.js';
import { Color, Scale } from '@spectrum-web-components/theme';
import { StoryDecorator } from '@spectrum-web-components/story-decorator/src/StoryDecorator';
import { TemplateResult, html } from '@spectrum-web-components/base';
import { render } from 'lit';
import { sendKeys } from '@web/test-runner-commands';

const wrap = () => html`
    <sp-story-decorator
        reduce-motion
        screenshot
        tabindex="-1"
    ></sp-story-decorator>
`;

type StoriesType = {
    default: {
        title: string;
        swc_vrt?: {
            preload?: () => void;
        };
    };
    [name: string]: (() => TemplateResult) | any;
};

export const test = (
    tests: StoriesType,
    name: string,
    color: Color,
    scale: Scale,
    dir: 'ltr' | 'rtl'
) => {
    Object.keys(tests).map((story) => {
        if (story !== 'default') {
            it(story, async () => {
                const test = await fixture<StoryDecorator>(wrap());
                await elementUpdated(test);
                test.focus();
                await sendKeys({ press: 'ArrowUp' });
                await sendKeys({ press: 'ArrowDown' });
                const testsDefault = (tests as any).default;
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
                if (tests[story].decorators && tests[story].decorators.length) {
                    let decoratorCount = tests[story].decorators.length;
                    while (decoratorCount) {
                        decoratorCount -= 1;
                        decoratedStory = tests[story].decorators[
                            decoratorCount
                        ](decoratedStory);
                    }
                    storyResult = decoratedStory as TemplateResult;
                }
                if (testsDefault.decorators && testsDefault.decorators.length) {
                    let decoratorCount = testsDefault.decorators.length;
                    while (decoratorCount) {
                        decoratorCount -= 1;
                        decoratedStory = testsDefault.decorators[
                            decoratorCount
                        ](decoratedStory);
                    }
                    storyResult = decoratedStory as TemplateResult;
                }
                render(storyResult, test);
                await waitUntil(
                    () => test.ready,
                    'Wait for decorator to become ready...',
                    { timeout: 15000 }
                );
                await nextFrame();
                try {
                    await visualDiff(
                        test,
                        `${color} - ${scale} - ${dir} - ${name} - ${story}`
                    );
                } catch (error) {
                    test.remove();
                    /**
                     * _Sometimes_ the browser will fail on weird renderings of rounded edges.
                     * This retry allows it another change to render the test from scratch before
                     * actually failing on this story.
                     **/
                    const retest = await fixture<StoryDecorator>(wrap());
                    await elementUpdated(retest);
                    render(storyResult, retest);
                    await waitUntil(
                        () => retest.ready,
                        'Wait for decorator to become ready...',
                        { timeout: 15000 }
                    );
                    await visualDiff(
                        retest,
                        `${color} - ${scale} - ${dir} - ${name} - ${story}`
                    );
                }
            });
        }
    });
};

export const regressVisuals = async (name: string, stories: StoriesType) => {
    describe(`${name} Visual Regressions`, () => {
        const {
            defaultColor: color,
            defaultScale: scale,
            defaultDirection: dir,
        } = window.__swc_hack_knobs__;
        before(async () => {
            if (stories.default?.swc_vrt?.preload) {
                await stories.default.swc_vrt.preload();
            }
        });
        afterEach(() => {
            const overlays = [
                ...(document.querySelectorAll('active-overlay') || []),
            ];
            overlays.map((overlay) => overlay.remove());
        });
        if (color && scale && dir) {
            test(stories, name, color, scale, dir);
        } else {
            const colors: Color[] = ['lightest', 'light', 'dark', 'darkest'];
            const scales: Scale[] = ['medium', 'large'];
            const directions: ('ltr' | 'rtl')[] = ['ltr', 'rtl'];
            colors.forEach((color: Color) => {
                scales.forEach((scale: Scale) => {
                    directions.forEach((dir) => {
                        test(stories, name, color, scale, dir);
                    });
                });
            });
        }
    });
};
