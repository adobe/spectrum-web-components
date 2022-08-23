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
import { html, TemplateResult } from '@spectrum-web-components/base';
import { render } from 'lit';
import { emulateMedia, sendKeys } from '@web/test-runner-commands';

let globalErrorHandler: undefined | OnErrorEventHandler = undefined;
before(function () {
    // Save Mocha's handler.
    (
        Mocha as unknown as { process: { removeListener(name: string): void } }
    ).process.removeListener('uncaughtException');
    globalErrorHandler = window.onerror;
    addEventListener('error', (error) => {
        if (error.message?.match?.(/ResizeObserver loop limit exceeded/)) {
            return;
        } else {
            globalErrorHandler?.(error);
        }
    });
});
after(function () {
    window.onerror = globalErrorHandler as OnErrorEventHandler;
});

const wrap = () => html`
    <sp-story-decorator
        reduce-motion
        screenshot
        tabindex="0"
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
                let test = await fixture<StoryDecorator>(wrap());
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
                        decoratedStory =
                            tests[story].decorators[decoratorCount](
                                decoratedStory
                            );
                    }
                    storyResult = decoratedStory as TemplateResult;
                }
                if (testsDefault.decorators && testsDefault.decorators.length) {
                    let decoratorCount = testsDefault.decorators.length;
                    while (decoratorCount) {
                        decoratorCount -= 1;
                        decoratedStory =
                            testsDefault.decorators[decoratorCount](
                                decoratedStory
                            );
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
                const testName = `${color} - ${scale} - ${dir} - ${name} - ${story}`;
                const allowedRetries = 4;
                let retries = allowedRetries;
                let passed = false;
                while (retries && !passed) {
                    retries -= 1;
                    try {
                        await visualDiff(test, testName);
                        passed = true;
                    } catch (error) {
                        test.remove();
                        /**
                         * _Sometimes_ the browser will fail on weird renderings of rounded edges.
                         * This retry allows it another change to render the test from scratch before
                         * actually failing on this story.
                         **/
                        test = await fixture<StoryDecorator>(wrap());
                        await elementUpdated(test);
                        render(storyResult, test);
                        await waitUntil(
                            () => test.ready,
                            'Wait for decorator to become ready...',
                            { timeout: 20000 }
                        );
                        await nextFrame();
                        if (!retries) {
                            try {
                                await visualDiff(test, testName);
                            } catch (error) {
                                // eslint-disable-next-line no-console
                                console.log(
                                    `Tried ${
                                        allowedRetries - retries
                                    } times. ${testName}`
                                );
                                throw error;
                            }
                        }
                    }
                }
                // eslint-disable-next-line no-console
                console.log(
                    `Tried ${allowedRetries - retries} times. ${testName}`
                );
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
            hcm,
        } = window.__swc_hack_knobs__;
        before(async () => {
            if (stories.default?.swc_vrt?.preload) {
                await stories.default.swc_vrt.preload();
            }
            if (hcm) {
                await emulateMedia({
                    forcedColors: 'active',
                    colorScheme: 'dark',
                });
            }
        });
        after(async () => {
            if (hcm) {
                await emulateMedia({
                    forcedColors: 'none',
                    colorScheme: 'no-preference',
                });
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
