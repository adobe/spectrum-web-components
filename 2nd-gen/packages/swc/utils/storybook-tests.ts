/**
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
type StoryTestContext = {
    canvasElement: HTMLElement;
};
type StoryTest = (context: StoryTestContext) => Promise<void> | void;
type StoryTestsMap = Record<string, StoryTest | StoryTest[]>;

import type { StoryContext } from '@storybook/types';

type StoryExport = {
    play?: (context: StoryContext) => Promise<void> | void;
    parameters?: Record<string, unknown>;
};

const testModules = import.meta.glob('../components/**/test/*.test.ts');

const normalizeStoryPath = (storyModuleUrl: string): string => {
    const origin =
        typeof window === 'undefined'
            ? 'http://localhost'
            : window.location.origin;
    const url = new URL(storyModuleUrl, origin);
    let path = url.pathname;

    if (path.startsWith('/@fs/')) {
        path = path.slice('/@fs'.length);
    }

    return path.replace(/\?.*$/, '');
};
const storyPathToTestModuleKey = (storyPath: string): string | null => {
    const componentsIndex = storyPath.lastIndexOf('/components/');
    if (componentsIndex === -1) {
        return null;
    }

    const relativeFromComponents = storyPath.slice(
        componentsIndex + '/components/'.length
    );

    const testPathFromComponents = relativeFromComponents
        .replace('/stories/', '/test/')
        .replace('.stories.ts', '.test.ts');

    return `../components/${testPathFromComponents}`;
};

export const applyStoryTests = (
    storyModuleUrl: string,
    stories: Record<string, StoryExport>
): void => {
    const storyPath = normalizeStoryPath(storyModuleUrl);
    const testModuleKey = storyPathToTestModuleKey(storyPath);

    if (!testModuleKey) {
        return;
    }

    const loadTestModule = testModules[testModuleKey];
    if (!loadTestModule) {
        return;
    }

    let storyTestsPromise: Promise<StoryTestsMap> | null = null;

    const getStoryTests = async (): Promise<StoryTestsMap> => {
        if (!storyTestsPromise) {
            storyTestsPromise = (async () => {
                const module = (await loadTestModule()) as {
                    storyTests?: StoryTestsMap;
                };
                return module.storyTests ?? {};
            })();
        }

        return storyTestsPromise;
    };

    Object.entries(stories).forEach(([storyName, story]) => {
        if (!story || typeof story !== 'object') {
            return;
        }

        if (story.parameters?.['autoTests'] === false) {
            return;
        }

        const existingPlay = story.play;

        story.play = async (context) => {
            const storyTests = await getStoryTests();
            const testsForStory = storyTests[storyName];

            if (testsForStory) {
                const tests = Array.isArray(testsForStory)
                    ? testsForStory
                    : [testsForStory];

                for (const test of tests) {
                    await test(context);
                }
            }

            if (existingPlay) {
                await existingPlay(context);
            }
        };
    });
};
