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

const slugify = require('@sindresorhus/slugify');
const execSync = require('child_process').execSync;

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
        const name = item.name.replace('@iliad-ui/', '');
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

const buildPreviewURLComment = (ref) => {
    const packages = getChangedPackages();
    const branch = ref.replace('refs/heads/', '');
    const branchSlug = slugify(branch);
    let comment = `# Branch Preview

- [Documentation Site](https://${branchSlug}--spectrum-web-components.netlify.app/)
- [Storybook](https://${branchSlug}--spectrum-web-components.netlify.app/storybook/)`;
    if (packages.length > 0) {
        comment += `

When a visual regression test fails (or has previously failed while working on this branch), its results can be found in the following URLs:

- [Lightest | Medium | LTR](https://${branchSlug}-lightest-medium-ltr--spectrum-web-components.netlify.app/review/)
- [Lightest | Medium | RTL](https://${branchSlug}-lightest-medium-rtl--spectrum-web-components.netlify.app/review/)
- [Lightest | Large | LTR](https://${branchSlug}-lightest-large-ltr--spectrum-web-components.netlify.app/review/)
- [Lightest | Large | RTL](https://${branchSlug}-lightest-large-rtl--spectrum-web-components.netlify.app/review/)
- [Light | Medium | LTR](https://${branchSlug}-light-medium-ltr--spectrum-web-components.netlify.app/review/)
- [Light | Medium | RTL](https://${branchSlug}-light-medium-rtl--spectrum-web-components.netlify.app/review/)
- [Light | Medium | LTR](https://${branchSlug}-light-medium-ltr--spectrum-web-components.netlify.app/review/)
- [Light | Medium | RTL](https://${branchSlug}-light-medium-rtl--spectrum-web-components.netlify.app/review/)
- [Darkest | Medium | LTR](https://${branchSlug}-darkest-medium-ltr--spectrum-web-components.netlify.app/review/)
- [Darkest | Medium | RTL](https://${branchSlug}-darkest-medium-rtl--spectrum-web-components.netlify.app/review/)
- [Darkest | Large | LTR](https://${branchSlug}-darkest-large-ltr--spectrum-web-components.netlify.app/review/)
- [Darkest | Large | RTL](https://${branchSlug}-darkest-large-rtl--spectrum-web-components.netlify.app/review/)
- [Dark | Medium | LTR](https://${branchSlug}-dark-medium-ltr--spectrum-web-components.netlify.app/review/)
- [Dark | Medium | RTL](https://${branchSlug}-dark-medium-rtl--spectrum-web-components.netlify.app/review/)
- [Dark | Large | LTR](https://${branchSlug}-dark-large-ltr--spectrum-web-components.netlify.app/review/)
- [Dark | Large | RTL](https://${branchSlug}-dark-large-rtl--spectrum-web-components.netlify.app/review/)`;
    }

    return comment;
};

console.log(buildPreviewURLComment('current/branch'));

module.exports = {
    buildPreviewURLComment,
};
