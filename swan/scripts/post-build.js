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

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, '..');

// Copy declaration files from tsc-out to their correct locations
function copyDeclarationFiles() {
    // Copy component declarations
    copyDirectoryDeclarations('components');

    // Copy base declarations
    copyDirectoryDeclarations('base');

    // Copy shared declarations
    copyDirectoryDeclarations('shared');

    // Copy reactive-controllers declarations
    copyDirectoryDeclarations('reactive-controllers');

    // eslint-disable-next-line no-console
    console.log('✓ Declaration files copied successfully');
}

// Copy declaration files for a specific directory
function copyDirectoryDeclarations(dirName) {
    const sourceDir = path.join(rootDir, `dist/tsc-out/${dirName}`);
    const targetDir = path.join(rootDir, `dist/${dirName}`);

    try {
        // Skip if source directory doesn't exist
        if (!fs.existsSync(sourceDir)) {
            return;
        }

        // Make sure the target directory exists
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }

        // For 'components' directory, we need to process subdirectories
        if (dirName === 'components') {
            // Walk through all subdirectories in the sourceDir
            const components = fs.readdirSync(sourceDir);
            for (const component of components) {
                const componentSourceDir = path.join(sourceDir, component);
                const componentTargetDir = path.join(targetDir, component);

                // Make sure the component target directory exists
                if (!fs.existsSync(componentTargetDir)) {
                    fs.mkdirSync(componentTargetDir, { recursive: true });
                }

                // Copy all declaration files
                const files = fs.readdirSync(componentSourceDir);
                for (const file of files) {
                    if (file.endsWith('.d.ts') || file.endsWith('.d.ts.map')) {
                        fs.copyFileSync(
                            path.join(componentSourceDir, file),
                            path.join(componentTargetDir, file)
                        );
                    }
                }
            }
        } else {
            // For non-component directories like 'base', copy directly without subdirectories
            const files = fs.readdirSync(sourceDir);
            for (const file of files) {
                if (file.endsWith('.d.ts') || file.endsWith('.d.ts.map')) {
                    fs.copyFileSync(
                        path.join(sourceDir, file),
                        path.join(targetDir, file)
                    );
                }
            }
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`Error copying declaration files for ${dirName}:`, error);
    }
}

// Clean up temporary tsc-out directory
function cleanUp() {
    const tscOutDir = path.join(rootDir, 'dist/tsc-out');
    try {
        if (fs.existsSync(tscOutDir)) {
            fs.rmSync(tscOutDir, { recursive: true, force: true });
        }
        // eslint-disable-next-line no-console
        console.log('✓ Temporary files cleaned up');
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error cleaning up temporary files:', error);
    }
}

// Run the post-build steps
copyDeclarationFiles();
cleanUp();
