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
    const tscOutDir = path.join(rootDir, 'dist/tsc-out');

    // Skip if the source directory doesn't exist
    if (!fs.existsSync(tscOutDir)) {
        return;
    }

    // Recursively process all directories
    processDirectory(tscOutDir, path.join(rootDir, 'dist'));

    // eslint-disable-next-line no-console
    console.log('✓ Declaration files copied successfully');
}

// Recursively process a directory and copy declaration files
function processDirectory(sourceDir, targetBaseDir) {
    try {
        // Get the relative path from tsc-out to create the same structure in dist
        const relativePath = path.relative(
            path.join(rootDir, 'dist/tsc-out'),
            sourceDir
        );
        const targetDir = path.join(targetBaseDir, relativePath);

        // Create target directory if it doesn't exist
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }

        // Read all items in the current directory
        const items = fs.readdirSync(sourceDir);

        for (const item of items) {
            const sourcePath = path.join(sourceDir, item);
            const targetPath = path.join(targetDir, item);

            if (fs.statSync(sourcePath).isDirectory()) {
                // Recursively process subdirectories
                processDirectory(sourcePath, targetBaseDir);
            } else if (item.endsWith('.d.ts') || item.endsWith('.d.ts.map')) {
                // Copy declaration files
                fs.copyFileSync(sourcePath, targetPath);
            }
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`Error processing directory ${sourceDir}:`, error);
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
