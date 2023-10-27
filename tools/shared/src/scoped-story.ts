/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { TemplateResult } from 'lit';
import { ScopedStory } from './scoped-story-component.js';

/**
 * This creates a new instance for scoped-story & renders the updated template. This pattern is useful
 * when we want to test different templates without registering new components each time.
 * @param storyTemplate
 * @param elementDefinations
 * @returns
 */
export const scopedStory = (
    storyTemplate: () => TemplateResult,
    elementDefinations: any
): ScopedStory => {
    ScopedStory.elementDefinitions = Object.fromEntries(elementDefinations);
    const storyElement = document.createElement('scoped-story') as ScopedStory;
    storyElement.storyTemplate = storyTemplate;
    return storyElement;
};
