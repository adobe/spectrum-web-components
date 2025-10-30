#!/usr/bin/env node

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

/* eslint-disable no-console */

/**
 * Unified publishing script for both 1st-gen and 2nd-gen packages.
 * Handles the complete release workflow including build, versioning, and publishing.
 *
 * @example
 * # Regular release with git tags
 * yarn publish
 *
 * # Snapshot release with default "snapshot" tag
 * yarn publish:snapshot
 *
 * # Nightly release
 * yarn publish:nightly
 *
 * # Custom tag (e.g., beta)
 * node ./scripts/publish.js --snapshot --tag beta
 */

import { execSync } from 'child_process';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const args = yargs(hideBin(process.argv))
    .option('snapshot', {
        type: 'boolean',
        description: 'Publish a snapshot release',
        default: false,
    })
    .option('tag', {
        type: 'string',
        description:
            'NPM dist-tag to publish under (e.g., "nightly", "snapshot", "beta")',
        default: 'snapshot',
    })
    .help()
    .parse();

function run(command, description) {
    if (description) {
        console.log(`\n📦 ${description}...`);
    }
    try {
        execSync(command, { stdio: 'inherit' });
    } catch (error) {
        console.error(`❌ Failed: ${description || command}`);
        process.exit(1);
    }
}

async function publish() {
    console.log('\n🚀 Starting publish workflow...\n');

    // Step 1: Prepublish - Build everything and generate manifests
    run('yarn build:2nd-gen && yarn build:1st-gen', 'Building all packages');
    run(
        'yarn workspace @spectrum-web-components/1st-gen custom-element-json',
        'Generating custom elements manifests'
    );
    run(
        'yarn workspace @spectrum-web-components/1st-gen build:confirm',
        'Confirming build artifacts'
    );
    run(
        'yarn workspace @spectrum-web-components/1st-gen changelog:global',
        'Updating global changelog'
    );

    // Step 2: Version bump with changesets
    if (args.snapshot) {
        run(
            `yarn changeset version --snapshot ${args.tag}`,
            `Versioning packages (snapshot: ${args.tag})`
        );
    } else {
        run('yarn changeset version', 'Versioning packages');
    }

    // Step 3: Update lockfile, rebuild (versions changed), and update version file
    run('yarn install --refresh-lockfile', 'Updating lockfile');
    run('yarn build:1st-gen', 'Rebuilding 1st-gen packages after versioning');
    run(
        'genversion --source ./1st-gen/tools/base/package.json --semi --es6 --force ./2nd-gen/packages/core/shared/base/version.ts',
        'Updating 2nd-gen version.ts from 1st-gen'
    );

    // Step 4: Publish to npm
    const publishTag = args.snapshot ? args.tag : 'latest';
    run(
        `yarn changeset publish --no-git-tag --tag ${publishTag}`,
        `Publishing to npm (tag: ${publishTag})`
    );

    // Step 5: Git operations (skip for snapshots)
    if (!args.snapshot) {
        run(
            'git add . && git commit -m "chore: release new versions #publish"',
            'Committing release'
        );
        run('git push', 'Pushing to remote');
        run(
            'node --no-warnings ./1st-gen/scripts/create-git-tag.js',
            'Creating and pushing git tag'
        );
    }

    // Step 6: Postpublish - React wrappers (clean, build, and publish with same tag)
    run(
        'yarn workspace @spectrum-web-components/1st-gen build:clear-cache',
        'Clearing build cache for React wrappers'
    );
    run(
        'yarn workspace @spectrum-web-components/1st-gen build:react',
        'Building React wrappers'
    );
    run(
        `cd 1st-gen && sed -i "" "s/react/# react/g" .gitignore && git commit -am "Commit React Wrappers" --no-verify`,
        'Committing React wrappers'
    );
    run(
        `cd 1st-gen && yarn changeset publish --no-git-tag --tag ${publishTag} --no-push`,
        `Publishing React wrappers (tag: ${publishTag})`
    );
    run(
        'cd 1st-gen && git reset --hard HEAD^ && git prune && rimraf react',
        'Cleaning up React wrappers'
    );

    console.log('\n✅ Publish workflow completed successfully!\n');
}

publish().catch((error) => {
    console.error('❌ Publish workflow failed:', error);
    process.exit(1);
});
