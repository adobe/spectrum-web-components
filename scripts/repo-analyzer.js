/*
Copyright 2025 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import fs from 'fs';
import path from 'path';
import typescript from 'typescript';
import { fileURLToPath } from 'url';

// Get dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { readdirSync, readFileSync, writeFileSync } = fs;
const { join, resolve } = path;
const {
    createSourceFile,
    forEachChild,
    isClassDeclaration,
    isEnumDeclaration,
    isExportDeclaration,
    isFunctionDeclaration,
    isImportDeclaration,
    isInterfaceDeclaration,
    isNamedExports,
    isNamedImports,
    isTypeAliasDeclaration,
    ScriptTarget,
    SyntaxKind,
} = typescript;

/**
 * Repository Analyzer
 *
 * This script analyzes a repository to extract:
 * 1. Component definitions (custom elements)
 * 2. Exported classes, functions, types
 * 3. Project structure
 * 4. Dependencies between components
 */

/**
 * Helper functions for file/directory filtering
 */

/**
 * Determines if a directory should be skipped during traversal
 * @param {string} dirPath - Path to the directory
 * @returns {boolean} True if the directory should be skipped
 */
function shouldSkipDirectory(dirPath) {
    return (
        (!dirPath.includes('/packages') || !dirPath.includes('/tools')) &&
        (dirPath.includes('node_modules') ||
            dirPath.includes('/.rush') ||
            dirPath.includes('/coverage') ||
            dirPath.includes('/dist') ||
            dirPath.includes('/_site') ||
            dirPath.includes('/lib') ||
            dirPath.includes('/test-results') ||
            dirPath.includes('/test/visual') ||
            dirPath.includes('/.yarn') ||
            dirPath.includes('/documentation/api-docs') ||
            dirPath.includes('/projects') ||
            dirPath.includes('/test') ||
            dirPath.includes('/stories'))
    );
}

/**
 * Determines if a file should be skipped based on path or name
 * @param {string} filePath - Full path to the file
 * @param {string} fileName - Just the name portion of the file
 * @returns {boolean} True if the file should be skipped
 */
function shouldSkipFile(filePath, fileName) {
    return (
        fileName.endsWith('.css.js') ||
        fileName.endsWith('.css.ts') ||
        fileName.endsWith('.js.map') ||
        fileName.endsWith('.css') ||
        fileName.endsWith('.dev.js') ||
        fileName.endsWith('.dev.ts') ||
        fileName.endsWith('.d.ts') ||
        fileName.endsWith('.test-vrt.ts') ||
        fileName.startsWith('.') ||
        filePath.includes('test') ||
        filePath.includes('stories') ||
        filePath.includes('/bin/') ||
        filePath.includes('.json') ||
        filePath.includes('.config') ||
        filePath.includes('.md') ||
        filePath.includes('.json') ||
        filePath.includes('.yml') ||
        filePath.includes('.yaml') ||
        filePath.includes('.lock') ||
        filePath.includes('.tsbuildinfo') ||
        filePath.includes('.utils.js')
    );
}

/**
 * Determines if a file is a source code file that should be analyzed
 * @param {string} fileName - Name of the file
 * @returns {boolean} True if the file is a source file to be processed
 */
function isSourceFile(fileName) {
    return (
        fileName.endsWith('.ts') &&
        !fileName.endsWith('.js') &&
        !fileName.endsWith('.d.ts') &&
        !fileName.endsWith('.dev.ts') &&
        !fileName.endsWith('.dev.js') &&
        !fileName.endsWith('.test.ts') &&
        !fileName.endsWith('.test.js') &&
        !fileName.endsWith('.css.ts') &&
        !fileName.endsWith('.css.js') &&
        !fileName.endsWith('.js.map')
    );
}

/**
 * Generic directory traversal function that handles filtering and callbacks
 *
 * @param {string} dirPath - Starting directory to traverse
 * @param {Object} options - Configuration options
 * @param {Function} [options.onFile] - Callback for each file
 * @param {Function} [options.onDirectory] - Callback for each directory
 * @param {Function} [options.skipFilter] - Function to determine if directory should be skipped
 * @param {Function} [options.shouldProcessFile] - Function to determine if file should be processed
 */
function traverseDirectory(dirPath, options = {}) {
    const {
        onFile = () => {},
        onDirectory = () => {},
        skipFilter = shouldSkipDirectory,
        shouldProcessFile = () => true,
    } = options;

    if (skipFilter(dirPath)) {
        return;
    }
    // console.log('dirPath: ', dirPath);
    try {
        const entries = readdirSync(dirPath, { withFileTypes: true });
        // console.log(`${dirPath}: `, entries);
        for (const entry of entries) {
            console.log('entry: ', entry.name);
            const fullPath = join(dirPath, entry.name);

            if (shouldSkipFile(fullPath, entry.name)) {
                continue;
            }

            if (entry.isDirectory()) {
                onDirectory(fullPath, entry);
                traverseDirectory(fullPath, options);
            } else if (
                entry.isFile() &&
                shouldProcessFile(fullPath, entry.name)
            ) {
                onFile(fullPath, entry);
            }
        }
    } catch (error) {
        console.error(
            `Error processing directory ${dirPath}: ${error.message}`
        );
    }
}

/**
 * Core Analysis Functions
 */

/**
 * Finds all custom elements defined in the repository
 * Identifies components via customElements.define() calls
 *
 * @param {string} dirPath - Root directory to search for components
 * @returns {Array} Array of component objects with name, tagName, and other metadata
 */
function findCustomElements(dirPath) {
    const components = [];
    // Match customElements.define('tag-name', ClassName) pattern
    const customElementRegex =
        /(customElements\.define|defineElement)\(['"]([^'"]+)['"],\s*([^,)]+)/g;

    traverseDirectory(dirPath, {
        shouldProcessFile: (filePath, fileName) =>
            isSourceFile(fileName) &&
            !filePath.includes('/test/') &&
            !filePath.includes('/stories/') &&
            !filePath.includes('/bin/'),
        onFile: (filePath) => {
            try {
                const content = readFileSync(filePath, 'utf8');
                if (
                    // content.includes('defineElement') ||
                    // content.includes('customElements.define')
                    filePath.includes('/sp-')
                ) {
                    processComponentFile(filePath, content);
                }
            } catch (error) {
                console.error(
                    `Error reading file ${filePath}: ${error.message}`
                );
            }
        },
    });

    /**
     * Process a file containing custom element definitions
     * Extracts component metadata including imports and inheritance
     *
     * @param {string} filePath - Path to the file
     * @param {string} content - Content of the file
     */
    function processComponentFile(filePath, content) {
        const matches = [...content.matchAll(customElementRegex)];

        for (const match of matches) {
            const tagName = match[1];
            const className = match[2].trim();

            // Parse the file to get more detailed information
            const sourceFile = createSourceFile(
                filePath,
                content,
                ScriptTarget.Latest,
                true
            );

            const imports = [];
            let extendsClass = undefined;

            // Visit each node in the AST to find imports and inheritance
            const visit = (node) => {
                // Collect imports
                if (isImportDeclaration(node)) {
                    const importFrom = node.moduleSpecifier
                        .getText()
                        .replace(/['"]/g, '');
                    if (
                        node.importClause?.namedBindings &&
                        isNamedImports(node.importClause.namedBindings)
                    ) {
                        node.importClause.namedBindings.elements.forEach(
                            (element) => {
                                imports.push(
                                    `${element.name.text} from ${importFrom}`
                                );
                            }
                        );
                    }
                }

                // Find the class's parent class (what it extends)
                if (
                    isClassDeclaration(node) &&
                    node.name?.text === className &&
                    node.heritageClauses
                ) {
                    for (const heritage of node.heritageClauses) {
                        if (
                            heritage.token === SyntaxKind.ExtendsKeyword &&
                            heritage.types.length
                        ) {
                            extendsClass =
                                heritage.types[0].expression.getText();
                        }
                    }
                }

                forEachChild(node, visit);
            };

            visit(sourceFile);

            // Get all exports from the component file
            const fileExports = findExportsInFile(filePath);

            // Add the component to our results
            components.push({
                name: className,
                tagName,
                path: filePath,
                extends: extendsClass,
                imports,
                exports: fileExports,
            });
        }
    }

    return components;
}

/**
 * Finds all exports in a single file
 * @param {string} filePath - Path to the file
 * @returns {Array} Array of export names
 */
function findExportsInFile(filePath) {
    const content = readFileSync(filePath, 'utf8');
    const sourceFile = createSourceFile(
        filePath,
        content,
        ScriptTarget.Latest,
        true
    );

    const exports = [];

    function visit(node) {
        // Handle various export syntaxes

        // export class/function/interface/type/enum
        if (
            (isClassDeclaration(node) ||
                isFunctionDeclaration(node) ||
                isInterfaceDeclaration(node) ||
                isTypeAliasDeclaration(node) ||
                isEnumDeclaration(node)) &&
            node.modifiers?.some((m) => m.kind === SyntaxKind.ExportKeyword) &&
            node.name
        ) {
            exports.push(node.name.text);
        }

        // export { name }
        if (isExportDeclaration(node)) {
            if (node.exportClause && isNamedExports(node.exportClause)) {
                node.exportClause.elements.forEach((element) => {
                    exports.push(element.name.text);
                });
            }
        }

        forEachChild(node, visit);
    }

    visit(sourceFile);
    return exports;
}

/**
 * Finds all exports in a directory and its subdirectories
 * @param {string} dirPath - Directory to search
 * @returns {Object} Map of file paths to arrays of export names
 */
function findExportsInDirectory(dirPath) {
    const results = {};

    /**
     * Determines if a path is within a package directory but not in src
     * Used to filter directories to only scan src folders within packages
     * @param {string} dirPath - Path to check
     * @returns {boolean} True if this is a package directory (not src)
     */
    function isInPackageSrc(dirPath) {
        return (
            dirPath.includes('/packages/') &&
            !dirPath.includes('/src/') &&
            !dirPath.includes('/node_modules/')
        );
    }

    traverseDirectory(dirPath, {
        onDirectory: (fullPath, entry) => {
            // If in package directory, only follow src
            if (isInPackageSrc(fullPath) && entry.name !== 'src') {
                return false; // Skip this directory
            }
            return true;
        },
        shouldProcessFile: (filePath, fileName) =>
            isSourceFile(fileName) &&
            !filePath.includes('/test/') &&
            !filePath.includes('/stories/') &&
            !filePath.includes('/bin/'),
        onFile: (filePath) => {
            const exports = findExportsInFile(filePath);
            if (exports.length > 0) {
                results[filePath] = exports;
            }
        },
    });

    return results;
}

/**
 * Categorizes exports into logical groups based on naming conventions and context
 *
 * @param {Object} results - File to exports mapping
 * @param {Array} components - List of component objects (from findCustomElements)
 * @returns {Object} Categories of exports (components, icons, mixins, etc.)
 */
function categorizeExports(results, components = []) {
    const categories = {
        components: new Set(),
        icons: new Set(),
        mixins: new Set(),
        controllers: new Set(),
        utilities: new Set(),
        other: new Set(),
    };

    // Create a map of className to tagName for quick lookups
    const componentMap = new Map();
    components.forEach((comp) => {
        componentMap.set(comp.name, comp.tagName);
    });

    for (const [filePath, exports] of Object.entries(results)) {
        // Check if the file is a component definition (starts with "sp-")
        const fileName = path.basename(filePath);
        const isComponentFile = fileName.startsWith('sp-');

        for (const exportName of exports) {
            // Check if this export is a component with an sp- tag name
            const tagName = componentMap.get(exportName);

            // Categorize based on naming conventions and context
            if (exportName.includes('Icon')) {
                categories.icons.add(exportName);
            } else if (
                // Consider it a component if:
                // 1. It has an sp- tag name, OR
                // 2. It's in a file that starts with sp-
                (tagName && tagName.includes('sp-')) ||
                isComponentFile
            ) {
                categories.components.add(exportName);
            } else if (
                exportName.endsWith('Mixin') ||
                exportName.includes('Mixin')
            ) {
                categories.mixins.add(exportName);
            } else if (exportName.endsWith('Controller')) {
                categories.controllers.add(exportName);
            } else if (
                filePath.includes('/utilities/') ||
                filePath.includes('/utils/')
            ) {
                categories.utilities.add(exportName);
            } else {
                categories.other.add(exportName);
            }
        }
    }

    // Convert sets to sorted arrays for the output
    return {
        components: Array.from(categories.components).sort(),
        icons: Array.from(categories.icons).sort(),
        mixins: Array.from(categories.mixins).sort(),
        controllers: Array.from(categories.controllers).sort(),
        utilities: Array.from(categories.utilities).sort(),
        other: Array.from(categories.other).sort(),
    };
}

/**
 * Gets the overall structure of the repository
 * @param {string} dirPath - Root directory to analyze
 * @returns {Object} Structure information including packages, components, and test files
 */
function getProjectStructure(dirPath) {
    const structure = {
        packages: [],
        components: [],
        testFiles: [],
        storyFiles: [],
    };

    // Get packages (directories in the packages folder)
    try {
        const packagesDir = resolve(dirPath, 'packages');
        const packageEntries = readdirSync(packagesDir, {
            withFileTypes: true,
        });

        for (const entry of packageEntries) {
            if (entry.isDirectory()) {
                structure.packages.push(entry.name);
            }
        }
        structure.packages.sort();
    } catch (error) {
        console.error(`Error reading packages directory: ${error.message}`);
    }

    // Find files with different criteria
    traverseDirectory(dirPath, {
        onFile: (filePath, entry) => {
            const fileName = entry.name;

            // Is this in packages?
            const isInPackages = filePath.includes('/packages/');

            // Component files (in packages)
            if (
                isInPackages &&
                isSourceFile(fileName) &&
                !filePath.includes('/stories/') &&
                !filePath.includes('/test/')
            ) {
                structure.components.push(filePath);
            }

            // Test files
            if (
                (fileName.endsWith('.test.ts') ||
                    fileName.endsWith('.test.js')) &&
                !filePath.includes('/node_modules/')
            ) {
                structure.testFiles.push(filePath);
            }

            // Story files
            if (
                filePath.includes('/stories/') &&
                (fileName.endsWith('.ts') || fileName.endsWith('.js')) &&
                !filePath.includes('/node_modules/')
            ) {
                structure.storyFiles.push(filePath);
            }
        },
    });

    // Sort all the file lists
    structure.components.sort();
    structure.testFiles.sort();
    structure.storyFiles.sort();

    return structure;
}

/**
 * Main execution function - analyzes the entire repository
 * @param {string} repoPath - Path to the repository root
 * @returns {Object} Complete analysis results
 */
function analyzeRepository(repoPath) {
    const packagesDir = resolve(repoPath, 'packages');

    // Find custom elements
    const components = findCustomElements(repoPath);

    // Find exports
    const exports = findExportsInDirectory(packagesDir);
    const categorized = categorizeExports(exports, components);

    // Get project structure
    const structure = getProjectStructure(repoPath);

    return {
        components,
        exports,
        categorized,
        structure,
    };
}

// Get repo path from command line or use current directory
const repoPath = process.argv[2] || resolve(__dirname, '..');
const analysis = analyzeRepository(repoPath);

// Write results
writeFileSync(
    resolve(repoPath, 'repo-analysis.json'),
    JSON.stringify(analysis, null, 2)
);

// eslint-disable-next-line no-console
console.log('Repository analysis complete. See repo-analysis.json');
