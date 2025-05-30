/*!
 * Copyright 2024 Adobe. All rights reserved.
 *
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at <http://www.apache.org/licenses/LICENSE-2.0>
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/* eslint-disable no-console */

import {
    promises,
    existsSync,
    readdirSync,
    statSync,
    mkdirSync,
} from 'node:fs';
import { join, relative, sep, dirname } from 'path';

import fg from 'fast-glob';
import { rimrafSync } from 'rimraf';
import postcss from 'postcss';
import { parse as valuesParser } from 'postcss-values-parser';

const fsp = promises;

const __dirname = import.meta.dirname;

/**
 * A source of truth for commonly used directories
 * @type {object} dirs
 * @property {string} dirs.root
 * @property {string} dirs.packages
 * @property {string} dirs.tools
 * @property {string} dirs.tokens
 * @property {string} dirs.docs
 * @property {string} dirs.projects
 * @property {string} dirs.storybook
 */
export const dirs = {
    root: join(__dirname, '..'),
    packages: join(__dirname, '../packages'),
    tools: join(__dirname, '../tools'),
    tokens: join(__dirname, '../tools/styles'),
    docs: join(__dirname, '../projects/documentation'),
    projects: join(__dirname, '../projects'),
    storybook: join(__dirname, '../.storybook'),
};

/**
 * A simple logger utility to write messages to the console
 * @type {object} log
 * @property {(string) => void} log.error
 * @property {(string) => void} log.write
 * @property {(string, { messageOnly?: boolean, exit?: boolean }) => (void|string)} log.info
 * @property {(string, { messageOnly?: boolean, exit?: boolean }) => (void|string)} log.success
 * @property {(string, { messageOnly?: boolean, exit?: boolean }) => (void|string)} log.warning
 * @property {(string, { messageOnly?: boolean, throwError?: boolean, exit?: boolean }) => (void|string)} log.fail
 */
export const log = {
    error: (err) => process.stderr.write(`${err}\n\n`),
    write: (msg) => process.stdout.write(msg),
    info: (message, { messageOnly = false, exit = false } = {}) => {
        if (messageOnly) return `${'ℹ'.blue}  ${message}`;
        else {
            console.log(`${'ℹ'.blue}  ${message}`);
            if (exit) process.exit(0);
        }
    },
    success: (message, { messageOnly = false, exit = false } = {}) => {
        if (messageOnly) return `${'✓'.green}  ${message}`;
        else {
            console.log(`${'✓'.green}  ${message}`);
            if (exit) process.exit(0);
        }
    },
    warning: (message, { messageOnly = false, exit = false } = {}) => {
        if (messageOnly) return `${'⚠'.yellow}  ${message}`;
        else {
            console.log(`${'⚠'.yellow}  ${message}`);
            if (exit) process.exit(0);
        }
    },
    fail: (
        message,
        { messageOnly = false, throwError = false, exit = false } = {}
    ) => {
        if (messageOnly) return `${'✗'.red}  ${message}`;
        else {
            if (throwError) throw new Error(message);
            else console.log(`${'✗'.red}  ${message}`);
            if (exit) process.exit(1);
        }
    },
};

export const writeConsoleTable = (data, { min = 20, max = 30 } = {}) => {
    // This utility function is used to print a table of data to the console
    const table = (data = []) => {
        return data
            .map((row, idx) => {
                if (!row) row = ' ';
                return row.padEnd(idx === 0 ? max : min);
            })
            .join('');
    };

    return `${table(data)}\n`;
};

export const timeInMs = (seconds, nanoseconds) =>
    (seconds * 1000000000 + nanoseconds) / 1000000;

/** @type {(string) => string} */
export const relativePrint = (filename, { cwd = dirs.root } = {}) =>
    relative(cwd, filename);

/**
 * Converts a number of bytes to a human-readable string
 * @param {number} bytes
 * @returns {string} the numeric value of bytes converted to a human-readable string
 */
export function bytesToSize(bytes) {
    // If the value is not a number, attempt to cast it to a number
    if (isNaN(bytes)) {
        bytes = Number(bytes);
    }

    if (!bytes || bytes === 0) return '0';

    const sizes = ['bytes', 'KB', 'MB', 'GB', 'TB'];
    // Determine the size identifier to use (KB, MB, etc)
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    if (i === 0) return (bytes / 1000).toFixed(2) + ' ' + sizes[1];
    return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
}

/**
 * Determines the package name from a file path
 * @todo This needs to be updated to more accurately determine the package name from a file path
 * @param {string} filePath
 * @returns {string}
 */
export function getPackageFromPath(filePath = process.cwd()) {
    const parts = filePath.split(sep);

    // Capture component name from a local or node_modules syntax
    if (
        parts.includes('packages') ||
        parts.includes('@spectrum-web-components')
    ) {
        const index =
            parts.indexOf('packages') ??
            parts.indexOf('@spectrum-web-components');
        return parts[index + 1];
    }

    // This is a fallback best-guess scenario:
    // Split the path from root dir and capture the first folder as the package name
    const guessParts = relative(dirs.root, filePath).split(sep);
    return guessParts[0];
}

/**
 * Returns a list of all component names in the repository
 * @param {object} [config={}]
 * @param {string[]} [config.ignore=[]] - List of component names to ignore
 * @returns {Promise<string[]>}
 */
export async function getAllComponentNames({ ignore = [] } = {}) {
    // Get all directories in packages and tools
    const packageDirs = readdirSync(dirs.packages);
    const toolDirs = readdirSync(dirs.tools);
    const allDirs = [...packageDirs, ...toolDirs];

    // Filter to only those that exist as packages
    const componentNames = await Promise.all(
        allDirs.map(async (dir) => {
            const path = await findPackagePath(dir);
            if (!path) return null;

            // Get the package name from package.json
            const packageJson = JSON.parse(
                await fsp.readFile(join(path, 'package.json'), 'utf8')
            );
            return packageJson.name;
        })
    );

    // Remove nulls and deduplicate, and filter out any names in the ignore list
    return [...new Set(componentNames.filter(Boolean))].filter(
        (name) => !ignore.includes(name)
    );
}

/**
 * Validate if a component name exists in the workspace
 * @param {string} componentName
 * @returns {Promise<true|Error>}
 */
export async function validateComponentName(componentName) {
    const packagePath = await findPackagePath(componentName);

    if (!packagePath) {
        return new Error(
            `Component name "${componentName}" does not exist in ${relativePrint(dirs.packages)} or ${relativePrint(dirs.tools)}.`
        );
    }

    return true;
}

/**
 * This regex will find all the custom properties that start with --mod-
 * and are defined inside a var() function. The last capture group will
 * ignore any mod properties that are followed by a colon, to exclude
 * sub-component passthrough properties that should not be listed as mods.
 * @param {string} content
 * @param {{ [string]: (string)[] }} [meta={}]
 * @returns { [string]: string[] }
 */
export function extractProperties(content, meta = {}) {
    if (!content) return new Set();

    const found = {};

    // Process CSS content through the valuesParser an postcss to capture
    // all the custom properties defined and used in the CSS
    postcss.parse(content).walkDecls((decl) => {
        Object.entries(meta).forEach(([key, values]) => {
            found[key] = found[key] ?? new Set();

            values.forEach((value) => {
                if (
                    decl.prop.startsWith('--') &&
                    decl.prop.startsWith(`--${value}-`)
                ) {
                    found[key].add(decl.prop);
                }
            });

            // Parse the value of the declaration to extract custom properties
            valuesParser(decl.value).walk((node) => {
                if (node.type !== 'word' || !node.isVariable) return;

                // Extract the custom property name from the var() function
                values.forEach((value) => {
                    if (node.value.startsWith(`--${value}-`)) {
                        found[key].add(node.value);
                    }
                });
            });
        });
    });

    // Sort the custom properties alphabetically and return them as an array
    Object.keys(found).forEach((key) => {
        found[key] = [...found[key]].sort();
    });

    return found;
}

/**
 * Fetch content from glob input and optionally combine results
 * @param {(string|RegExp)[]} globs
 * @param {object} options
 * @param {string} [options.cwd=]
 * @param {string} [options.shouldCombine=false] If true, combine the assets read in into one string
 * @param {import('fast-glob').Options} [options.fastGlobOptions={}] Additional options for fast-glob
 * @returns {Promise<{ content: string, input: string }[]>}
 */
export async function fetchContent(
    globs = [],
    { cwd, shouldCombine = false, ...fastGlobOptions } = {}
) {
    const files = await fg(globs, {
        onlyFiles: true,
        ...fastGlobOptions,
        cwd,
    });

    if (!files.length) return Promise.resolve([]);

    const fileData = await Promise.all(
        files.map(async (file) => ({
            input: join(cwd, file),
            content: await fsp.readFile(join(cwd, file), 'utf8'),
        }))
    );

    // Combine the content into 1 file; @todo do this in future using CSS imports
    if (shouldCombine) {
        let content = '';
        fileData.forEach((dataset, idx) => {
            if (dataset.content) {
                if (idx > 0) content += '\n\n';
                content += `/* Sourced from ${relativePrint(dataset.input, { cwd })} */\n`;
                content += dataset.content;
            }
        });

        return Promise.resolve([
            {
                content,
                input: fileData[0].input,
            },
        ]);
    }

    return Promise.all(
        files.map(async (file) => ({
            content: await fsp.readFile(join(cwd, file), 'utf8'),
            input: file,
        }))
    );
}

/**
 * A utility to copy a file from one local to another
 * @param {string} from
 * @param {string} to
 * @param {object} [config={}]
 * @param {string} [config.cwd=] - Current working directory for the component being built
 * @returns Promise<string|void>
 */
export async function copy(from, to, { cwd, isDeprecated = true } = {}) {
    if (!existsSync(from)) return;

    if (!existsSync(dirname(to))) {
        await fsp.mkdir(dirname(to), { recursive: true }).catch((err) => {
            if (!err) return;
            return Promise.resolve(
                `${'✗'.red}  problem making the ${relativePrint(dirname(to), { cwd }).yellow} directory`
            );
        });
    }

    // Check if the input is a file or a directory
    const stats = statSync(from);
    if (stats.isDirectory()) {
        return fsp
            .cp(from, to, { recursive: true, force: true })
            .then(async () => {
                // Determine the number of files and the size of the copied files
                const stats = await fg(join(cwd, 'components') + '/**/*', {
                    onlyFiles: true,
                    stats: true,
                });
                return Promise.resolve(
                    `${'✓'.green}  ${relativePrint(from, { cwd }).yellow} -> ${relativePrint(to, { cwd }).padEnd(20, ' ').yellow} ${`copied ${stats.length >= 0 ? stats.length : '0'} files (${bytesToSize(stats.reduce((acc, details) => acc + details.stats.size, 0))})`.gray}`
                );
            })
            .catch((err) => {
                if (!err) return;
                return Promise.resolve(
                    `${'✗'.red}  ${relativePrint(from, { cwd }).yellow} could not be copied to ${relativePrint(to, { cwd }).yellow}`
                );
            });
    }

    const content = await fsp.readFile(from, { encoding: 'utf-8' });
    if (!content) return;

    /** @todo add support for injecting a deprecation notice as a comment after the copyright */
    return fsp
        .writeFile(to, content, { encoding: 'utf-8' })
        .then(() =>
            Promise.resolve(
                `${'✓'.green}  ${relativePrint(from, { cwd }).yellow} -> ${relativePrint(to, { cwd }).padEnd(20, ' ').yellow}  ${(isDeprecated ? '-- deprecated --' : `copied ${stats.size ? `(${bytesToSize(stats.size)})` : ''}`).gray}`
            )
        )
        .catch((err) => {
            if (!err) return;
            return Promise.resolve(
                `${'✗'.red}  ${relativePrint(from, { cwd }).gray} could not be copied to ${relativePrint(to, { cwd }).yellow}`
            );
        });
}

/**
 *
 * @param {string} content - The content to write to the output file
 * @param {import("fs").PathLike} output - The path to the output file
 * @param {object} [config={}]
 * @param {string} [config.cwd=] - Current working directory for the component being built
 * @returns Promise<string|void>
 */
export async function writeAndReport(
    content,
    output,
    { cwd = process.cwd(), encoding = 'utf-8', isDeprecated = false } = {}
) {
    return fsp
        .writeFile(output, content, { encoding })
        .then(() => {
            const stats = statSync(output);
            const relativePath = relative(cwd, output);
            return Promise.resolve([
                `${'✓'.green}  ${relativePath.padEnd(20, ' ').yellow}${isDeprecated ? '  -- deprecated --'.gray : `  ${bytesToSize(stats.size).gray}`}`,
            ]);
        })
        .catch((err) => {
            if (!err) return;
            const relativePath = relative(cwd, output);
            console.log(`${'✗'.red}  ${relativePath.yellow} not written`);
            return Promise.reject(err);
        });
}

/**
 * A utility to delete a directory and all its contents, then recreate the directory fresh
 * @param {string} path
 * @param {boolean} [clean=true] - If true, the directory will be deleted before being created
 * @returns void
 */
export function cleanAndMkdir(path, clean = true) {
    if (!path) return;

    let isFile = false;

    // If the output directory exists, delete it but don't throw an error if it doesn't
    if (clean && existsSync(path)) {
        isFile = statSync(path).isFile();
        rimrafSync(path, { preserveRoot: true });
    }

    // Create the output directory fresh
    mkdirSync(isFile ? path.dirname(path) : path, { recursive: true });
}

/**
 * Find the full path to a package in either the packages or tools directory
 * @param {string} packageName - Name of the package to find (can include scope/nesting with slashes)
 * @returns {Promise<string|null>} Full path to the package directory or null if not found
 */
export async function findPackagePath(packageName) {
    if (!packageName) return null;

    // First try to resolve using Node's resolution
    let resolvedPath;
    try {
        let packagePath = import.meta.resolve(
            `${packageName}/package.json`,
            import.meta.url
        );
        if (packagePath) resolvedPath = dirname(new URL(packagePath).pathname);
    } catch {
        /* error */
    }

    if (resolvedPath && existsSync(resolvedPath)) {
        return resolvedPath;
    }

    // If no scope is present, try with @spectrum-web-components scope
    if (!packageName.includes('/')) {
        try {
            let packagePath = import.meta.resolve(
                `@spectrum-web-components/${packageName}/package.json`,
                import.meta.url
            );
            if (packagePath)
                resolvedPath = dirname(new URL(packagePath).pathname);
        } catch {
            /* error */
        }

        if (resolvedPath && existsSync(resolvedPath)) {
            return resolvedPath;
        }
    }

    // Then check our workspace directories
    const paths = [
        join(dirs.packages, packageName),
        join(dirs.tools, packageName),
    ];

    // If the name has a slash, also try the base name in packages
    if (packageName.includes('/')) {
        const baseName = packageName.split('/').pop();
        paths.push(join(dirs.packages, baseName));
    }

    // Return the first path that exists
    const existingPath = paths.find((path) => existsSync(path));
    return existingPath || null;
}
