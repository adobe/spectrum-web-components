/* eslint-disable @typescript-eslint/no-var-requires */
/*!
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

/** @type {import('@yarnpkg/types')} */
const { defineConfig } = require('@yarnpkg/types');
const fg = require('fast-glob');
const semver = require('semver');

/**
 * The workspace object used in the constraints function
 * @typedef {import('@yarnpkg/types').Yarn.Constraints.Workspace} Workspace
 */

module.exports = defineConfig({
    async constraints({ Yarn }) {
        /**
         * Fetch a list of all the component workspaces using a glob pattern
         * @type {string[]} components
         */
        const components = fg.sync('{packages,tools}/*', {
            cwd: __dirname,
            onlyDirectories: true,
        });

        /**
         * This function checks the workspace for any local package references
         * and ensure that the devDependencies are up-to-date with the latest version
         * currently in the project
         * @param {Workspace} workspace
         * @returns {void}
         */
        function validateLocalPackages(workspace) {
            // Return early if the workspace does not have any peerDependencies
            if (!workspace.manifest.peerDependencies) {
                return;
            }

            // Start by filtering out the local packages from the external dependencies
            const localPackages = Object.keys(
                workspace.manifest.peerDependencies
            )
                .filter((pkg) => Yarn.workspace({ ident: pkg }))
                .map((pkg) => Yarn.workspace({ ident: pkg }));

            // Iterate over the local packages and ensure that the devDependencies are up-to-date
            for (const localWorkspace of localPackages) {
                const localVersion = localWorkspace.manifest.version;
                workspace.set(
                    `devDependencies.${localWorkspace.manifest.name}`,
                    localVersion ?? 'workspace:^'
                );
            }
        }

        /**
         * A reusable function to add keywords to ensure workspaces
         * include a minimal set of keywords for discoverability
         * with additionalKeywords as an optional parameter to add more
         * specific keywords that are relevant to the workspace
         * @param {string[]} additionalKeywords
         * @returns {string[]}
         */
        function keywords(additionalKeywords = []) {
            return [
                'design-system',
                'spectrum',
                'adobe',
                'adobe-spectrum',
                'web components',
                'web-components',
                'lit-element',
                'lit-html',
                ...additionalKeywords,
            ];
        }

        const semverSort = (a, b) => {
            // Push latest & * to the bottom because we want to use the highest *specified* version
            if (['latest', '*'].includes(a)) {
                return 0;
            }
            if (['latest', '*'].includes(b)) {
                return 1;
            }
            return semver.gt(semver.coerce(a), semver.coerce(b));
        };

        /**
         * This function rolls up all the component package.json
         * requirements for all workspaces into a single function
         * to simplify into a readable set of operations
         * @param {Workspace} workspace
         * @param {string} folderName
         * @returns {void}
         */
        function validateComponentPackageJson(workspace, folderName) {
            // Only update the homepage if it does not already exist
            if (!workspace.manifest.homepage) {
                workspace.set(
                    'homepage',
                    `https://opensource.adobe.com/spectrum-web-components/components/${folderName}`
                );
            }

            workspace.set('publishConfig.access', 'public');
            workspace.set('type', 'module');
            workspace.set('keywords', keywords(['component', 'css']));

            // A subset of components have a different entry point than the default
            if (
                [
                    'clear-button',
                    'close-button',
                    'modal',
                    'opacity-checkerboard',
                ].includes(folderName)
            ) {
                workspace.set('main', `./src/${folderName}.css.js`);
                workspace.set('module', `./src/${folderName}.css.js`);
            } else {
                workspace.set('main', './src/index.js');
                workspace.set('module', './src/index.js');
            }
        }

        /**
         * This function enforces consistent dependencies within each generation separately
         */
        function enforceConsistentDependenciesWithinGenerations({ Yarn }) {
            // Enforce consistency within 1st-gen only
            enforceConsistencyForWorkspaceGroup(
                { Yarn },
                (workspace) => !workspace.cwd.startsWith('2nd-gen/')
            );

            // Enforce consistency within 2nd-gen only
            enforceConsistencyForWorkspaceGroup({ Yarn }, (workspace) =>
                workspace.cwd.startsWith('2nd-gen/')
            );
        }

        /**
         * This rule will enforce that a workspace MUST depend on the same version of
         * a dependency as the one used by the other workspaces.
         *
         * @param {import('@yarnpkg/types').Context} context
         */
        function enforceConsistencyForWorkspaceGroup({ Yarn }, filterFn) {
            const workspaceVersions = new Map();

            for (const dependency of Yarn.dependencies()) {
                if (!filterFn(dependency.workspace)) {
                    continue;
                }

                const version =
                    dependency.workspace.manifest.dependencies?.[
                        dependency.ident
                    ] ||
                    dependency.workspace.manifest.devDependencies?.[
                        dependency.ident
                    ];

                if (version) {
                    workspaceVersions.set(
                        dependency.ident,
                        workspaceVersions.has(dependency.ident)
                            ? workspaceVersions
                                  .get(dependency.ident)
                                  .add(version)
                            : new Set([version])
                    );
                }
            }

            // Apply consistency within the filtered group
            for (const [dependencyName, versions] of workspaceVersions) {
                if (versions.size <= 1) continue;

                const highestVersion = Array.from(versions)
                    .sort(semverSort)
                    .shift();

                for (const dep of Yarn.dependencies({
                    ident: dependencyName,
                })) {
                    if (filterFn(dep.workspace)) {
                        dep.update(highestVersion);
                    }
                }
            }
        }
        /**
         * This function rolls up all the package.json requirements
         * for all workspaces into a single function to simplify
         * the workspace for loop into a readable set of operations
         * @param {Workspace} workspace
         * @returns {void}
         */
        function validatePackageJson(workspace) {
            const isRoot = workspace.cwd === '.';
            const isComponent = components.includes(workspace.cwd);

            /**
             * -------------- GLOBAL --------------
             * Global configuration for all workspaces
             */
            if (
                !workspace.manifest.license ||
                workspace.manifest.license === ''
            ) {
                workspace.set('license', 'Apache-2.0');
            }

            workspace.set('author', 'Adobe');

            workspace.set('repository.type', 'git');
            workspace.set(
                'repository.url',
                'https://github.com/adobe/spectrum-web-components.git'
            );

            // We don't need to set the directory for the root workspace
            if (!isRoot) {
                workspace.set('repository.directory', workspace.cwd);
            }

            workspace.set(
                'bugs.url',
                'https://github.com/adobe/spectrum-web-components/issues'
            );

            /**
             * -------------- COMPONENTS --------------
             * Process the components workspaces with component-specific configuration
             */
            if (isComponent) {
                const folderName = workspace.cwd?.split('/')?.[1];
                validateComponentPackageJson(workspace, folderName);
                validateLocalPackages(workspace);
            } else {
                /**
                 * -------------- OTHER --------------
                 * All other workspaces should have at least the following configuration
                 */
                if (!workspace.manifest.keywords) {
                    workspace.set('keywords', keywords());
                }

                if (!workspace.manifest.homepage) {
                    workspace.set(
                        'homepage',
                        'https://opensource.adobe.com/spectrum-web-components/'
                    );
                }
            }
        }

        /**
         * This loop iterates over all the workspaces in the project
         * and updates the package.json file with the necessary
         */
        for (const workspace of Yarn.workspaces()) {
            validatePackageJson(workspace);
            enforceConsistentDependenciesWithinGenerations({ Yarn });
        }
    },
});
