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
import { ignoreResizeObserverLoopError } from '../testing-helpers.js';

ignoreResizeObserverLoopError(before, after);

const wrap = () => html`
    <sp-story-decorator
        reduce-motion
        screenshot
        tabindex="0"
    ></sp-story-decorator>
`;

interface Story<T> {
    (args: T): TemplateResult;
    args?: Partial<T>;
    argTypes?: Record<string, unknown>;
    decorators?: (() => TemplateResult)[];
    swc_vrt?: {
        skip: Boolean;
    };
}

type StoriesType = {
    [name: string]: Story<{}>;
};

export type TestsType = StoriesType & {
    default: {
        title: string;
        swc_vrt?: {
            preload?: () => void;
        };
    };
};

export const test = (
    tests: TestsType,
    name: string,
    color: Color,
    scale: Scale,
    dir: 'ltr' | 'rtl'
) => {
    Object.keys(tests).map((story) => {
        if (story !== 'default' && !tests[story].swc_vrt?.skip) {
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
                const decorators = [
                    ...(tests[story].decorators || []),
                    ...(testsDefault.decorators || []),
                ];
                let decoratedStory: () => TemplateResult = () =>
                    html`
                        ${tests[story](args)}
                    `;
                const decorate = (
                    story: () => TemplateResult,
                    decorator: (story: () => TemplateResult) => TemplateResult
                ) => {
                    return () => decorator(story);
                };

                while (decorators.length) {
                    const decorator = decorators.shift();
                    decoratedStory = decorate(decoratedStory, decorator);
                }
                render(decoratedStory(), test);
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
                        if (
                            (error as { message: string }).message &&
                            (error as { message: string }).message.search(
                                'There was no baseline image to compare against.'
                            ) > -1
                        ) {
                            retries = 0;
                            // Don't retry "no baseline iamge" errors.
                            throw error;
                        } else {
                            test.remove();
                            /**
                             * _Sometimes_ the browser will fail on weird renderings of rounded edges.
                             * This retry allows it another change to render the test from scratch before
                             * actually failing on this story.
                             **/
                            test = await fixture<StoryDecorator>(wrap());
                            await elementUpdated(test);
                            render(decoratedStory(), test);
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
                }
                // eslint-disable-next-line no-console
                console.log(
                    `Tried ${allowedRetries - retries} times. ${testName}`
                );
            });
        }
    });
};

export const regressVisuals = async (name: string, stories: TestsType) => {
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
