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

export interface AccordionTestStory {
    component: string;
    stories: {
        name: string;
        ariaTemplate: string;
    }[];
}

export const accordionTestStories: AccordionTestStory[] = [
    {
        component: 'accordion',
        stories: [
            {
                name: 'default',
                ariaTemplate: `
                - heading "Heading 1" [level=3]:
                    - button "Heading 1"
                - heading "Heading 2" [level=3]:
                    - button "Heading 2"
                - heading "Heading 3" [level=3]:
                    - button "Heading 3"
                `,
            },
            {
                name: 'open',
                ariaTemplate: `
                - heading [level 3]
                    - button
                - heading [level 3]
                    - button
                - region
                - heading [level 3]
                    - button
                `,
            },
        ],
    },
];
