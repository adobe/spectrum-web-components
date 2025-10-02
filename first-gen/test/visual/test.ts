/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/**
 * Visual Regression Test Framework for Spectrum Web Components
 *
 * This file provides utilities to run visual regression tests across multiple
 * themes, scales, and directions. It renders components in various states and
 * compares them against baseline screenshots.
 */

import {
    elementUpdated,
    fixture,
    nextFrame,
    waitUntil,
} from '@open-wc/testing';
import { html, TemplateResult } from '@spectrum-web-components/base';
import { StoryDecorator } from '@spectrum-web-components/story-decorator';
import '@spectrum-web-components/story-decorator/sp-story-decorator.js';
import { Color, Scale } from '@spectrum-web-components/theme';
import { emulateMedia, sendKeys } from '@web/test-runner-commands';
import { visualDiff } from '@web/test-runner-visual-regression';
import { render } from 'lit';
import { ignoreResizeObserverLoopError } from '../testing-helpers.js';

// Suppress ResizeObserver errors which can occur during testing
ignoreResizeObserverLoopError(before, after);

/**
 * Creates a story decorator element to wrap component tests
 * This provides a consistent container for all visual tests
 */
const wrap = () => html`
    <sp-story-decorator
        reduce-motion
        screenshot
        tabindex="0"
    ></sp-story-decorator>
`;

/**
 * Interface for story functions that render components with specific props
 * Similar to Storybook story format
 */
interface Story<T> {
    (args: T): TemplateResult;
    args?: Partial<T>;
    argTypes?: Record<string, unknown>;
    decorators?: (() => TemplateResult)[];
    swc_vrt?: {
        skip: boolean;
    };
}

/**
 * Type representing a collection of related stories for a component
 */
type StoriesType = {
    [name: string]: Story<object>;
};

/**
 * Extended type that includes default settings and metadata for the test suite
 */
export type TestsType = StoriesType & {
    default: {
        title: string;
        swc_vrt?: {
            preload?: () => void;
        };
    };
};

/**
 * Waits for the story decorator to be ready before taking screenshots
 *
 * @param test - The StoryDecorator instance
 * @param retry - Current retry attempt number
 */
async function testReady(test: StoryDecorator, retry = 0): Promise<void> {
    await waitUntil(
        () => test.ready,
        `Wait for decorator to become ready on try number ${retry + 1}`,
        {
            timeout: 20000,
        }
    );
}

/**
 * Ensures component rendering is stable before taking screenshots
 * Waits for layout, animations, and pending renders to complete
 *
 * @param root - The root element containing the component under test
 */
async function ensureComponentStable(root: Element): Promise<void> {
    // Force a layout computation
    root.getBoundingClientRect();

    // First frame to process attribute changes
    await nextFrame();

    // Wait for all animations to complete
    try {
        const animations = root.getAnimations({ subtree: true });
        if (animations.length > 0) {
            await Promise.all(
                animations.map((a) =>
                    a.finished.catch((error) => {
                        console.warn('Animation failed:', error);
                        return undefined;
                    })
                )
            );
        }
    } catch (error) {
        // Ignore errors in animation handling
        console.warn('Error while waiting for animations', error);
    }

    // Additional frames to ensure everything is painted
    await nextFrame();
    await nextFrame();
    await nextFrame();
}

/**
 * Core test function that runs a single story through visual regression testing
 *
 * @param tests - Collection of stories to test
 * @param name - Name of the component being tested
 * @param color - Theme color (lightest, light, dark, darkest)
 * @param scale - Component scale (medium, large)
 * @param dir - Text direction (ltr, rtl)
 */
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
                // Create and setup the test fixture
                let test = await fixture<StoryDecorator>(wrap());
                await elementUpdated(test);
                test.focus();
                await sendKeys({ press: 'ArrowUp' });
                await sendKeys({ press: 'ArrowDown' });

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const testsDefault = (tests as any).default;

                // Merge default args with story-specific args
                const args = {
                    ...(testsDefault.args || {}),
                    ...(tests[story].args || {}),
                };

                // Combine decorators from both default and story
                const decorators = [
                    ...(tests[story].decorators || []),
                    ...(testsDefault.decorators || []),
                ];

                // Create the base story render function
                let decoratedStory: () => TemplateResult = () => html`
                    ${tests[story](args)}
                `;

                // Helper to apply decorators to the story
                const decorate = (
                    story: () => TemplateResult,
                    decorator: (
                        story: () => TemplateResult,
                        { args }: { args: unknown }
                    ) => TemplateResult
                ) => {
                    return () => decorator(story, { args });
                };

                // Apply all decorators
                while (decorators.length) {
                    const decorator = decorators.shift();
                    decoratedStory = decorate(decoratedStory, decorator);
                }

                // Render the story to the test fixture
                render(decoratedStory(), test);
                await testReady(test);

                // Ensure component is fully rendered and stable before screenshot
                await ensureComponentStable(test);

                // Format the test name with all parameters for unique identification
                const testName = `${color} - ${scale} - ${dir} - ${name} - ${story}`;

                // Implementation of retry logic for flaky visual tests
                const allowedRetries = 4;
                let retries = allowedRetries;
                let passed = false;

                while (retries && !passed) {
                    retries -= 1;
                    const retry = allowedRetries - retries;
                    try {
                        // Take screenshot and compare with baseline
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
                            // Don't retry "no baseline image" errors.
                            throw error;
                        } else {
                            // For rendering differences, try again with a fresh fixture
                            test.remove();
                            /**
                             * _Sometimes_ the browser will fail on weird renderings of rounded edges.
                             * This retry allows it another change to render the test from scratch before
                             * actually failing on this story.
                             **/
                            test = await fixture<StoryDecorator>(wrap());
                            await elementUpdated(test);
                            render(decoratedStory(), test);
                            await testReady(test, retry);

                            // Ensure stability before retrying screenshot
                            await ensureComponentStable(test);

                            // On last try, let the error propagate if it still fails
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
                // Log successful test with retry count
                // eslint-disable-next-line no-console
                console.log(
                    `Tried ${allowedRetries - retries} times. ${testName}`
                );
            });
        }
    });
};

/**
 * Main function to run visual regression tests for a component across all
 * supported themes, scales, and directions.
 *
 * @param name - Component name being tested
 * @param stories - Collection of stories to test
 */
export const regressVisuals = async (name: string, stories: TestsType) => {
    describe(`${name} Visual Regressions`, () => {
        const {
            defaultColor: color,
            defaultScale: scale,
            defaultDirection: dir,
            hcm,
        } = window.__swc_hack_knobs__;

        before(async () => {
            // Run any preload functions defined in the stories
            if (stories.default?.swc_vrt?.preload) {
                await stories.default.swc_vrt.preload();
            }

            // Enable high contrast mode if specified
            if (hcm) {
                await emulateMedia({
                    forcedColors: 'active',
                    colorScheme: 'dark',
                });
            }
        });

        after(async () => {
            // Restore normal mode after tests
            if (hcm) {
                await emulateMedia({
                    forcedColors: 'none',
                    colorScheme: 'no-preference',
                });
            }
        });

        afterEach(() => {
            // Clean up any remaining overlays after each test
            const overlays = [
                ...(document.querySelectorAll('active-overlay') || []),
            ];
            overlays.map((overlay) => overlay.remove());
        });

        // If specific theme parameters provided, only test that combination
        if (color && scale && dir) {
            test(stories, name, color, scale, dir);
        } else {
            // Otherwise test all combinations
            const colors: Color[] = ['lightest', 'light', 'dark', 'darkest'];
            const scales: Scale[] = ['medium', 'large'];
            const directions: ('ltr' | 'rtl')[] = ['ltr', 'rtl'];

            // Generate tests for every combination of color, scale and direction
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
