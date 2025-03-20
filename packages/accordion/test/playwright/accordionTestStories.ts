/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

export interface TestStory {
    storyId: string;
    storyDirectory?: string;
    axeTree?: string;
}

export const accordionTestStories: TestStory[] = [
    {
        storyId: 'default',
    },
    {
        storyId: 'open',
    },
    {
        storyId: 'allow-multiple',
    },
    {
        storyId: 'disabled',
    },
    {
        storyId: 's',
        storyDirectory: 'densities-compact',
    },
    {
        storyId: 'm',
        storyDirectory: 'densities-compact',
    },
    {
        storyId: 'l',
        storyDirectory: 'densities-compact',
    },
    {
        storyId: 'xl',
        storyDirectory: 'densities-compact',
    },
    {
        storyId: 's',
        storyDirectory: 'densities-spacious',
    },
    {
        storyId: 'm',
        storyDirectory: 'densities-spacious',
    },
    {
        storyId: 'l',
        storyDirectory: 'densities-spacious',
    },
    {
        storyId: 'xl',
        storyDirectory: 'densities-spacious',
    },
    {
        storyId: 's',
        storyDirectory: 'sizes',
    },
    {
        storyId: 'm',
        storyDirectory: 'sizes',
    },
    {
        storyId: 'l',
        storyDirectory: 'sizes',
    },
    {
        storyId: 'xl',
        storyDirectory: 'sizes',
    },
];
