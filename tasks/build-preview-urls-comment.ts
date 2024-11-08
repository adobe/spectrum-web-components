#!/usr/bin/env node

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

import slugify from '@sindresorhus/slugify';
import crypto from 'crypto';
import { getChangedPackages } from './get-changed-packages.ts';

const createHash = (context) => {
    const md5 = crypto.createHash('md5');
    md5.update(context);
    return md5.digest('hex');
};

export const buildPreviewURLComment = (ref) => {
    const packages = getChangedPackages();

    // Extract the branch name from the ref and slugify it for URL usage
    const branch = ref.replace('refs/heads/', '');
    const branchSlug = slugify(branch);

    const previewLinks: string[] = [];

    // Define the themes, scales, colors, and directions for the previews
    const themes = ['Spectrum', 'Express', 'Spectrum-two'];
    const scales = ['Medium', 'Large'];
    const colors = ['Light', 'Dark'];
    const directions = ['LTR', 'RTL'];

    // Add a high contrast mode preview link
    previewLinks.push(
        `- [High Contrast Mode | Medium | LTR](https://${createHash(
            `${branch}-hcm`
        )}--spectrum-web-components.netlify.app/review/)`
    );

    // Generate preview links for each combination of theme, color, scale, and direction
    themes.map((theme) =>
        colors.map((color) => {
            scales.map((scale) =>
                directions.map((direction) => {
                    // Create a unique context string for each combination
                    const context = `${branch}-${theme.toLocaleLowerCase()}-${color.toLocaleLowerCase()}-${scale.toLocaleLowerCase()}-${direction.toLocaleLowerCase()}`;

                    // Add the generated preview link to the array
                    previewLinks.push(
                        `- [${theme} | ${color} | ${scale} | ${direction}](https://${createHash(
                            context
                        )}--spectrum-web-components.netlify.app/review/)`
                    );
                })
            );
        })
    );

    // Construct the main comment string with links to the documentation site and Storybook
    let comment = `## Branch preview

- [Documentation Site](https://${branchSlug}--spectrum-web-components.netlify.app/)
- [Storybook](https://${branchSlug}--spectrum-web-components.netlify.app/storybook/)`;

    // If there are changed packages, add a collapsible section with visual regression test results
    if (packages.length > 0) {
        comment += `

<details>
    <summary><strong>Visual regression test results</strong></summary>

When a visual regression test fails (or has previously failed while working on this branch), its results can be found in the following URLs:

${previewLinks.join('')}

</details>`;
    }

    return comment;
};

console.log(buildPreviewURLComment('current/branch'));