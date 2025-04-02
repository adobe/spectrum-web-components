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

import path from 'path';
import fs from 'fs/promises';

/**
 * Determines if two file paths are part of the same package
 * @param {string} file1 - First file path
 * @param {string} file2 - Second file path
 * @returns {boolean} - True if files are in the same package
 */
function isSamePackage(file1, file2) {
    // Get the component folder paths by finding the nearest directory that contains components
    // For example: /src/components/slider/ or /packages/slider/
    const getComponentDir = (filePath) => {
        const parts = filePath.split(path.sep);
        const componentsIndex = parts.findIndex(
            (part) => part === 'components' || part === 'packages'
        );

        if (componentsIndex >= 0 && componentsIndex + 1 < parts.length) {
            // Return path up to and including the component name
            return parts.slice(0, componentsIndex + 2).join(path.sep);
        }
        // If we're in base directory
        const baseIndex = parts.findIndex((part) => part === 'base');
        if (baseIndex >= 0) {
            return parts.slice(0, baseIndex + 1).join(path.sep);
        }
        return '';
    };

    const component1 = getComponentDir(file1);
    const component2 = getComponentDir(file2);

    // Files are in the same package if they share the same component directory
    return component1 !== '' && component1 === component2;
}

/**
 * Helper function that rewrites paths based on the same package condition
 * @param {string} match - Original matched string
 * @param {string} prefix - Part before the path
 * @param {string} modulePath - The relative path to the module
 * @param {string} sourcePath - Path of the source file
 * @param {string} outExtension - Extension to use (.js or .dev.js)
 * @returns {string} - Transformed string or original match
 */
function rewritePathIfSamePackage(
    match,
    prefix,
    modulePath,
    sourcePath,
    outExtension
) {
    // Resolve the import path relative to the source file
    const sourceDir = path.dirname(sourcePath);
    const targetPath = path.resolve(sourceDir, modulePath + '.js');

    // Only rewrite if both files are in the same package
    if (isSamePackage(sourcePath, targetPath)) {
        // Replace .js with the target extension
        return `${prefix}${modulePath}${outExtension}'`;
    }

    // Otherwise keep the original import
    return match;
}

/**
 * Creates an esbuild plugin that rewrites extensions for intra-package imports
 * @param {Object} options - Plugin options
 * @param {string} options.outExtension - The extension to use for output files (.js or .dev.js)
 * @returns {Object} - The esbuild plugin
 */
export function extensionRewritePlugin(options = {}) {
    const outExtension = options.outExtension || '.js';

    return {
        name: 'extension-rewrite',
        setup(build) {
            // Step 1: Process JavaScript and TypeScript import statements during bundling
            build.onLoad({ filter: /\.(ts|js)$/ }, async (args) => {
                try {
                    // Read the source file
                    const source = await fs.readFile(args.path, 'utf8');

                    // Look for relative imports within this file
                    const processedImports = source.replace(
                        /(import\s+.*\s+from\s+['"])(\.[^'"]+)(\.js['"])/g,
                        (match, prefix, importPath) => {
                            return rewritePathIfSamePackage(
                                match,
                                prefix,
                                importPath,
                                args.path,
                                outExtension
                            );
                        }
                    );

                    // Process dynamic imports
                    const processedDynamicImports = processedImports.replace(
                        /(import\(\s*['"])(\.[^'"]+)(\.js['"])/g,
                        (match, prefix, importPath) => {
                            return rewritePathIfSamePackage(
                                match,
                                prefix,
                                importPath,
                                args.path,
                                outExtension
                            );
                        }
                    );

                    // Process export statements
                    const finalProcessed = processedDynamicImports.replace(
                        /(export\s+.*\s+from\s+['"])(\.[^'"]+)(\.js['"])/g,
                        (match, prefix, exportPath) => {
                            return rewritePathIfSamePackage(
                                match,
                                prefix,
                                exportPath,
                                args.path,
                                outExtension
                            );
                        }
                    );

                    // Only return a modified result if we actually changed something
                    if (finalProcessed !== source) {
                        // Determine the appropriate loader based on file extension
                        const ext = path.extname(args.path).slice(1);
                        const loader = ext === 'ts' ? 'ts' : 'js';

                        return {
                            contents: finalProcessed,
                            loader,
                        };
                    }

                    // If no changes were made, return null to let esbuild handle it normally
                    return null;
                } catch (error) {
                    console.error(`Error processing file ${args.path}:`, error);
                    // Return null to let esbuild handle it normally if there's an error
                    return null;
                }
            });
        },
    };
}
