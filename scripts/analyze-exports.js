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

const { readFileSync, writeFileSync, appendFileSync, readdirSync } = fs;
const { resolve, join } = path;
const {
    createSourceFile,
    forEachChild,
    isClassDeclaration,
    isEnumDeclaration,
    isExportDeclaration,
    isFunctionDeclaration,
    isInterfaceDeclaration,
    isNamedExports,
    isTypeAliasDeclaration,
    ScriptTarget,
    SyntaxKind,
    isImportDeclaration,
    isNamedImports,
} = typescript;

function findExportsInDirectory(dirPath) {
    const results = {};
    const exportTypes = {}; // Track which exports are types
    const exportToFileMap = {}; // Track which file each export comes from
    const importMaps = {}; // Track which files import which exports

    // First pass: find all exports and their types
    function processFile(filePath) {
        const fileContent = readFileSync(filePath, 'utf8');
        const sourceFile = createSourceFile(
            filePath,
            fileContent,
            ScriptTarget.Latest,
            true
        );

        const exports = [];
        const isTypeExport = new Set(); // Track which exports are types

        function visit(node) {
            // Check for export type declarations
            if (
                (isTypeAliasDeclaration(node) ||
                    isInterfaceDeclaration(node)) &&
                node.modifiers?.some(
                    (m) => m.kind === SyntaxKind.ExportKeyword
                ) &&
                node.name
            ) {
                exports.push(node.name.text);
                isTypeExport.add(node.name.text);
            } else if (
                (isClassDeclaration(node) ||
                    isFunctionDeclaration(node) ||
                    isEnumDeclaration(node)) &&
                node.modifiers?.some(
                    (m) => m.kind === SyntaxKind.ExportKeyword
                ) &&
                node.name
            ) {
                exports.push(node.name.text);
            }

            // Handle export declarations
            if (isExportDeclaration(node)) {
                if (node.exportClause && isNamedExports(node.exportClause)) {
                    // Check if this is a type-only export
                    const isTypeOnly = node.isTypeOnly;

                    node.exportClause.elements.forEach((element) => {
                        exports.push(element.name.text);
                        if (isTypeOnly) {
                            isTypeExport.add(element.name.text);
                        }
                    });
                }
            }

            // Track imports for component determination
            if (isImportDeclaration(node)) {
                if (
                    node.importClause?.namedBindings &&
                    isNamedImports(node.importClause.namedBindings)
                ) {
                    node.importClause.namedBindings.elements.forEach(
                        (element) => {
                            const importName = element.name.text;
                            if (!importMaps[importName]) {
                                importMaps[importName] = new Set();
                            }
                            importMaps[importName].add(filePath);
                        }
                    );
                }
            }

            forEachChild(node, visit);
        }

        visit(sourceFile);

        if (exports.length > 0) {
            results[filePath] = exports;

            // Store type information for each export
            exports.forEach((exportName) => {
                exportToFileMap[exportName] = filePath;
                exportTypes[exportName] = isTypeExport.has(exportName);
            });
        }
    }

    function scanDirectory(currentPath) {
        const entries = readdirSync(currentPath, { withFileTypes: true });

        // Skip directories that are in gitignore
        if (
            currentPath.includes('node_modules') ||
            currentPath.includes('/.rush') ||
            currentPath.includes('/coverage') ||
            currentPath.includes('/dist') ||
            currentPath.includes('/_site') ||
            currentPath.includes('/lib') ||
            currentPath.includes('/test-results') ||
            currentPath.includes('/test/visual') ||
            currentPath.includes('/.yarn') ||
            currentPath.includes('/documentation/api-docs')
        ) {
            return;
        }

        // Check if this is a component directory within packages
        const isPackageDir =
            currentPath.includes('/packages/') &&
            !currentPath.includes('/src/') &&
            !currentPath.includes('/node_modules/');

        for (const entry of entries) {
            const fullPath = join(currentPath, entry.name);

            // Skip files and directories that match gitignore patterns
            if (
                entry.name === 'node_modules' ||
                entry.name === 'dist' ||
                entry.name === 'lib' ||
                entry.name === 'test-results' ||
                entry.name === '.rush' ||
                entry.name === 'coverage' ||
                entry.name === '.yarn' ||
                entry.name.endsWith('.css.js') ||
                entry.name.endsWith('.css.ts') ||
                entry.name.endsWith('.js.map') ||
                entry.name.endsWith('.d.ts') ||
                entry.name.endsWith('.test-vrt.ts') ||
                entry.name.startsWith('.') // Skip hidden files and directories
            ) {
                continue;
            }

            if (entry.isDirectory()) {
                // If we're in a package directory, only follow src directory
                if (isPackageDir) {
                    if (entry.name === 'src') {
                        scanDirectory(fullPath);
                    }
                    // Skip other directories in package folders
                } else {
                    scanDirectory(fullPath);
                }
            } else if (
                entry.isFile() &&
                (entry.name.endsWith('.ts') || entry.name.endsWith('.js')) &&
                !entry.name.endsWith('.d.ts') &&
                !entry.name.endsWith('.dev.ts') &&
                !entry.name.endsWith('.dev.js') &&
                !entry.name.endsWith('.test.ts') &&
                !entry.name.endsWith('.test.js') &&
                !entry.name.endsWith('.css.ts') &&
                !entry.name.endsWith('.css.js') &&
                !entry.name.endsWith('.js.map') &&
                !fullPath.includes('/test/') && // Skip test directories
                !fullPath.includes('/stories/') && // Skip storybook files
                !fullPath.includes('/bin/') // Skip bin directories
            ) {
                processFile(fullPath);
            }
        }
    }

    scanDirectory(dirPath);

    // Find all sp-* files in package roots to determine component exports
    const spFiles = [];
    const packageDirs = readdirSync(dirPath, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => join(dirPath, entry.name));

    for (const packageDir of packageDirs) {
        const entries = readdirSync(packageDir, { withFileTypes: true });
        for (const entry of entries) {
            if (entry.isFile() && entry.name.startsWith('sp-')) {
                spFiles.push(join(packageDir, entry.name));
            }
        }
    }

    // Process all sp-* files to identify imports
    const componentExports = new Set();
    for (const spFile of spFiles) {
        try {
            const content = readFileSync(spFile, 'utf8');
            const sourceFile = createSourceFile(
                spFile,
                content,
                ScriptTarget.Latest,
                true
            );

            const visitImports = (node) => {
                if (isImportDeclaration(node)) {
                    // We're only using the importPath indirectly through the named imports
                    if (
                        node.importClause?.namedBindings &&
                        isNamedImports(node.importClause.namedBindings)
                    ) {
                        node.importClause.namedBindings.elements.forEach(
                            (element) => {
                                const importName = element.name.text;
                                if (exportToFileMap[importName]) {
                                    componentExports.add(importName);
                                }
                            }
                        );
                    }
                }

                forEachChild(node, visitImports);
            };

            visitImports(sourceFile);
        } catch (error) {
            console.error(`Error processing ${spFile}: ${error.message}`);
        }
    }

    return {
        exports: results,
        exportTypes,
        exportToFileMap,
        componentExports,
    };
}

function categorizeExports(analysisResults) {
    const { exports, exportTypes, componentExports } = analysisResults;
    const categories = {
        components: new Set(),
        types: new Set(),
        mixins: new Set(),
        controllers: new Set(),
        other: new Set(),
        icons: new Set(),
    };

    // Process all exports for categorization
    for (const [exportList] of Object.entries(exports)) {
        for (const exportName of exportList) {
            // Categorize by priority:
            if (
                exportTypes[exportName] ||
                exportName.toLowerCase().includes('type')
            ) {
                categories.types.add(exportName);
            } else if (exportName.toLowerCase().includes('mixin')) {
                categories.mixins.add(exportName);
            } else if (exportName.toLowerCase().includes('controller')) {
                categories.controllers.add(exportName);
            } else if (exportName.toLowerCase().includes('icon')) {
                categories.icons.add(exportName);
            } else if (componentExports.has(exportName)) {
                categories.components.add(exportName);
            } else {
                categories.other.add(exportName);
            }
        }
    }

    return {
        types: Array.from(categories.types).sort(),
        mixins: Array.from(categories.mixins).sort(),
        controllers: Array.from(categories.controllers).sort(),
        icons: Array.from(categories.icons).sort(),
        components: Array.from(categories.components).sort(),
        other: Array.from(categories.other).sort(),
    };
}

// Main execution
const packagesDir = resolve(__dirname, '../packages');
const analysisResults = findExportsInDirectory(packagesDir);
const categorized = categorizeExports(analysisResults);

writeFileSync(
    resolve(__dirname, '../exports-analysis.json'),
    JSON.stringify(analysisResults.exports, null, 2)
);

writeFileSync(
    resolve(__dirname, '../exports-categorized.json'),
    JSON.stringify(categorized, null, 2)
);

// Use a different logging approach to avoid the linter error
appendFileSync(
    resolve(__dirname, '../exports-analysis.log'),
    'Export analysis complete. See exports-analysis.json\n'
);
// eslint-disable-next-line no-console
console.log('Export analysis complete. See exports-analysis.json');
