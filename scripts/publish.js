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
 * # Regular release with git tags (uses "latest" tag)
 * yarn publish
 *
 * # Snapshot release with custom tag
 * node ./scripts/publish.js --tag snapshot
 *
 * # Nightly release
 * node ./scripts/publish.js --tag nightly
 *
 * # Beta release
 * node ./scripts/publish.js --tag beta
 */

import { execSync } from 'child_process';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const args = yargs(hideBin(process.argv))
    .option('tag', {
        type: 'string',
        description:
            'NPM dist-tag to publish under. Use "latest" for regular releases, or any other tag (e.g., "nightly", "snapshot", "beta") for snapshot releases',
        default: 'latest',
    })
    .help()
    .parse();

// Infer snapshot mode from tag
const isSnapshot = args.tag !== 'latest';

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

    // Step 0: Clean slate - remove all git-ignored files and reinstall dependencies
    run('git clean -dfX', 'Cleaning all git-ignored files');
    run('yarn install', 'Installing fresh dependencies');

    // Step 1: Prepublish - Build everything and generate manifests
    run('yarn build', 'Building all packages');
    run(
        'yarn workspace @spectrum-web-components/1st-gen custom-element-json',
        'Generating custom elements manifests'
    );
    run(
        'yarn workspace @spectrum-web-components/1st-gen build:confirm',
        'Confirming build artifacts'
    );

    // Step 2: Version bump with changesets
    if (isSnapshot) {
        run(
            `yarn changeset version --snapshot ${args.tag}`,
            `Versioning packages (snapshot: ${args.tag})`
        );
    } else {
        // Update changelog before versioning and only for regular releases
        run(
            'yarn workspace @spectrum-web-components/1st-gen changelog:global',
            'Updating global changelog'
        );
        run('yarn changeset version', 'Versioning packages');
    }
    // Step 3: Update version file for 2nd-gen
    run(
        'yarn genversion --source ./1st-gen/tools/base/package.json --semi --es6 --force ./2nd-gen/packages/core/shared/base/version.ts',
        'Updating 2nd-gen version.ts from 1st-gen'
    );

    // Step 3.5: Refresh lockfile and rebuild after version changes
    run(
        'yarn install --refresh-lockfile',
        'Refreshing lockfile with new versions'
    );
    run('yarn build', 'Rebuilding packages with new versions');

    // Step 4: Publish to npm
    run(
        `yarn changeset publish --no-git-tag --tag ${args.tag}`,
        `Publishing to npm (tag: ${args.tag})`
    );

    // Step 5: Git operations (skip for snapshots)
    if (!isSnapshot) {
        run(
            'git add . && git commit -m "chore: release new versions #publish"',
            'Committing release'
        );
        run('git push', 'Pushing to remote');
        run(
            'node ./1st-gen/scripts/create-git-tag.js',
            'Creating and pushing git tag'
        );
    }

    // Step 6: Postpublish - React wrappers (build and publish directly with npm)
    run(
        'yarn workspace @spectrum-web-components/1st-gen build:react',
        'Building React wrappers'
    );

    // Publish each React package directly using npm
    const publishCmd = isSnapshot
        ? `npm publish --tag ${args.tag} --access public`
        : `npm publish --access public`;

    run(
        `cd 1st-gen/react && for dir in */; do (cd "$dir" && ${publishCmd}) || exit 1; done`,
        `Publishing React wrappers (tag: ${args.tag})`
    );

    run('rm -rf 1st-gen/react', 'Removing React wrappers');

    console.log('\n✅ Publish workflow completed successfully!\n');
}

publish().catch((error) => {
    console.error('❌ Publish workflow failed:', error);
    process.exit(1);
});
