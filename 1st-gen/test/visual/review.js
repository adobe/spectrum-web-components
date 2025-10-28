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
import fs from 'fs';
import fg from 'fast-glob';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import crypto from 'crypto';
import slugify from '@sindresorhus/slugify';

const { commit, system, branch } = yargs(hideBin(process.argv)).argv;

const getHash = (context) => {
    const md5 = crypto.createHash('md5');
    md5.update(context);
    return md5.digest('hex');
};

const getAzureUrl = (combination) => {
    const baseUrl = 'https://swcpreviews.z13.web.core.windows.net';

    // For main branch beta deployment
    if (branch === 'main') {
        return `${baseUrl}/beta/docs/`;
    }

    // Extract PR number using the same logic as CircleCI
    let prNumber = null;

    // Check environment variables (same as CircleCI)
    if (process.env.CIRCLE_PULL_REQUEST) {
        const match = process.env.CIRCLE_PULL_REQUEST.match(/\/pull\/(\d+)/);
        if (match) {
            prNumber = match[1];
        }
    } else if (process.env.CIRCLE_PR_NUMBER) {
        prNumber = process.env.CIRCLE_PR_NUMBER;
    } else if (branch.match(/^pull\/(\d+)$/)) {
        // Forked PR branch pattern
        const match = branch.match(/^pull\/(\d+)$/);
        if (match) {
            prNumber = match[1];
        }
    }

    // For PR deployments
    if (prNumber) {
        return `${baseUrl}/pr-${prNumber}/${combination}/`;
    }

    // Default fallback for non-PR branches
    return `${baseUrl}/${slugify(branch)}/${combination}/`;
};

const vrts = [];
const themes = ['Spectrum', 'Express', 'Spectrum-two'];
const scales = ['Medium', 'Large'];
const colors = ['Lightest', 'Light', 'Dark', 'Darkest'];
const directions = ['LTR', 'RTL'];
vrts.push([`High Contrast Mode | Medium | LTR`, `${getAzureUrl('hcm')}`]);
themes.forEach((theme) =>
    colors.forEach((color) => {
        if (
            theme === 'Spectrum-two' &&
            (color === 'Lightest' || color === 'Darkest')
        ) {
            return;
        }
        scales.forEach((scale) =>
            directions.forEach((direction) => {
                const combination = `${theme.toLocaleLowerCase()}-${color.toLocaleLowerCase()}-${scale.toLocaleLowerCase()}-${direction.toLocaleLowerCase()}`;
                vrts.push([
                    `${theme} | ${color} | ${scale} | ${direction}`,
                    `${getAzureUrl(combination)}`,
                ]);
            })
        );
    })
);

function cleanURL(url) {
    return url.replace('test/visual/', '../');
}

function cleanID(url, type) {
    return url.replace(`test/visual/${type ? `${type}/` : ''}`, '');
}

async function main() {
    const allTests = [];
    for (const path of await fg(`test/visual/screenshots-baseline/**/*.png`)) {
        const pathParts = path.split('/');
        const name = pathParts[pathParts.length - 1];
        const baseline = cleanURL(path);
        const id = cleanID(path, 'screenshots-baseline');
        const test = {
            id,
            name,
            baseline,
            baselinePath: path,
        };
        allTests.push(test);
    }
    for (const path of await fg(
        `test/visual/screenshots-actual/updates/**/*.png`
    )) {
        const pathParts = path.split('/');
        const name = pathParts[pathParts.length - 1];
        const actual = cleanURL(path);
        const id = cleanID(path, 'screenshots-actual/updates');
        const test = {
            id,
            name,
            actual,
            actualPath: path,
        };
        const existingTest = allTests.find((test) => test.id === id);
        if (existingTest) {
            existingTest.actual = actual;
            existingTest.actualPath = path;
        } else {
            allTests.push(test);
        }
    }
    for (const path of await fg(
        `test/visual/screenshots-actual/diff/**/*.png`
    )) {
        const pathParts = path.split('/');
        const name = pathParts[pathParts.length - 1];
        const diff = cleanURL(path);
        const id = cleanID(path, 'screenshots-actual/diff');
        const test = {
            id,
            name,
            diff,
        };
        const existingTest = allTests.find((test) => test.id === id);
        if (existingTest) {
            // When a VRT passes on the second try, it will still have created a diff from the first pass.
            // Confirm if the actual and baseline images are actually different before including the diff here.
            const actual = PNG.sync.read(
                fs.readFileSync(existingTest.actualPath)
            );
            const baseline = PNG.sync.read(
                fs.readFileSync(existingTest.baselinePath)
            );
            const { width, height } = actual;
            const result = new PNG({ width, height });
            try {
                const numpixels = pixelmatch(
                    actual.data,
                    baseline.data,
                    result.data,
                    width,
                    height,
                    { threshold: 0 }
                );
                if (numpixels > 0) {
                    existingTest.diff = diff;
                }
            } catch (error) {
                // This likely means that the two images where of different sizes.
                existingTest.diff = diff;
            }
            delete existingTest.actualPath;
            delete existingTest.baselinePath;
        } else {
            allTests.push(test);
        }
    }
    const tests = {
        passed: allTests.filter(
            (test) => !!test.actual && !test.diff && !!test.baseline
        ),
        updated: allTests.filter(
            (test) => !!test.actual && !!test.diff && !!test.baseline
        ),
        new: allTests.filter(
            (test) => !!test.actual && !test.diff && !test.baseline
        ),
        removed: allTests.filter(
            (test) => !test.actual && !test.diff && !!test.baseline
        ),
    };
    const testGroupReducer = (acc, test) => {
        const idParts = test.id.split('/');
        const group = idParts.slice(4, idParts.length - 1).join('/');
        acc[group] = acc[group] || [];
        acc[group].push(test);
        return acc;
    };
    tests.passed = tests.passed.reduce(testGroupReducer, {});
    tests.updated = tests.updated.reduce(testGroupReducer, {});
    tests.new = tests.new.reduce(testGroupReducer, {});
    tests.removed = tests.removed.reduce(testGroupReducer, {});
    if (!fs.existsSync('test/visual/review')) {
        fs.mkdirSync('test/visual/review');
    }
    const data = JSON.stringify({
        meta: {
            branch,
            preview: getAzureUrl('docs'),
            commit,
            system,
            vrts,
        },
        tests,
    });
    fs.writeFileSync('test/visual/src/data.json', data);
}

main();
