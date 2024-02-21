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
import { execSync } from 'child_process';
import crypto from 'crypto';

// Duplicated from `tasks/test-changes.js` because GitHub Actions and CJS. 🤦
const getChangedPackages = () => {
    let command;
    try {
        command = execSync(
            'yarn --silent lerna ls --since origin/main --json --loglevel silent'
        );
    } catch (error) {
        console.log(error.message);
        console.log(error.stdout.toString());
        return [];
    }
    let packageList;
    packageList = JSON.parse(command.toString()).reduce((acc, item) => {
        const name = item.name.replace('@spectrum-web-components/', '');
        if (
            // There are no benchmarks available in this directory.
            item.location.search('projects') === -1 &&
            // The icons-* tests are particular and long, exclude in CI.
            !name.startsWith('icons-')
        ) {
            acc.push(name);
        }
        return acc;
    }, []);
    return packageList;
};

const getHash = (context) => {
    const md5 = crypto.createHash('md5');
    md5.update(context);
    return md5.digest('hex');
};

export const buildPreviewURLComment = (ref) => {
    const packages = getChangedPackages();
    const branch = ref.replace('refs/heads/', '');
    const branchSlug = slugify(branch);
    const previewLinks = [];
    const themes = ['Classic', 'Express'];
    const scales = ['Medium', 'Large'];
    const colors = ['Lightest', 'Light', 'Dark', 'Darkest'];
    const directions = ['LTR', 'RTL'];
    previewLinks.push(
        `- [High Contrast Mode | Medium | LTR](https://${getHash(
            `${branch}-hcm`
        )}--spectrum-web-components.netlify.app/review/)`
    );
    themes.map((theme) =>
        colors.map((color) =>
            scales.map((scale) =>
                directions.map((direction) => {
                    const context = `${branch}-${theme.toLocaleLowerCase()}-${color.toLocaleLowerCase()}-${scale.toLocaleLowerCase()}-${direction.toLocaleLowerCase()}`;
                    previewLinks.push(`
- [${theme} | ${color} | ${scale} | ${direction}](https://${getHash(
                        context
                    )}--spectrum-web-components.netlify.app/review/)`);
                })
            )
        )
    );
    let comment = `## Branch preview

- [Documentation Site](https://${branchSlug}--spectrum-web-components.netlify.app/)
- [Storybook](https://${branchSlug}--spectrum-web-components.netlify.app/storybook/)`;
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
