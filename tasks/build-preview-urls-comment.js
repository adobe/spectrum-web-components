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

const createHash = (context) => {
    const md5 = crypto.createHash('md5');
    md5.update(context);
    return md5.digest('hex');
};

export const buildPreviewURLComment = (ref) => {
    // Extract the branch name from the ref and slugify it for URL usage
    const branch = ref.replace('refs/heads/', '');
    const branchSlug = slugify(branch);

    const previewLinks = [];

    const combinations = [
        {
            system: 'Spectrum',
            color: 'Light',
            scale: 'Medium',
            direction: 'LTR',
        },
        { system: 'Spectrum', color: 'Dark', scale: 'Large', direction: 'RTL' },
        {
            system: 'Express',
            color: 'Light',
            scale: 'Medium',
            direction: 'LTR',
        },
        { system: 'Express', color: 'Dark', scale: 'Large', direction: 'RTL' },
        {
            system: 'Spectrum-two',
            color: 'Light',
            scale: 'Medium',
            direction: 'LTR',
        },
        {
            system: 'Spectrum-two',
            color: 'Dark',
            scale: 'Large',
            direction: 'RTL',
        },
    ];

    combinations.forEach(({ system, color, scale, direction }) => {
        const context = `${branch}-${system.toLowerCase()}-${color.toLowerCase()}-${scale.toLowerCase()}-${direction.toLowerCase()}`;
        previewLinks.push(`
- [${system} | ${color} | ${scale} | ${direction}](https://${getHash(
            context
        )}--spectrum-web-components.netlify.app/review/)`);
    });

    previewLinks.push(
        `
        - [High Contrast Mode | Medium | LTR](https://${getHash(
            `${branch}-hcm`
        )}--spectrumwc.netlify.app/review/)`
    );

    let comment = `## Branch preview

- [Documentation Site](https://${branchSlug}--spectrumwc.netlify.app/)
- [Storybook](https://${branchSlug}--spectrumwc.netlify.app/storybook/)



<h3><strong>Review the following VRT differences</strong></h3>

When a visual regression test fails (or has previously failed while working on this branch), its results can be found in the following URLs:

${previewLinks.join('')}

If the changes are expected, update the <code>current_golden_images_cache</code> hash in the circleci config to accept the new images. Instructions are included in that file. 
If the changes are unexpected, you can investigate the cause of the differences and update the code accordingly.
`;
    return comment;
};

console.log(buildPreviewURLComment('current/branch'));
