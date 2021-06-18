/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import fs from 'fs';
import globby from 'globby';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const { commit, theme } = yargs(hideBin(process.argv)).argv;

function cleanURL(url) {
    return url.replace('test/visual/', '../');
}

function cleanID(url, type) {
    return url.replace(`test/visual/${type ? `${type}/` : ''}`, '');
}

async function main() {
    const allTests = [];
    for await (const path of globby.stream(
        `test/visual/screenshots-baseline/**/*.png`
    )) {
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
    for await (const path of globby.stream(
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
    for await (const path of globby.stream(
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
            commit,
            theme,
        },
        tests,
    });
    fs.writeFileSync('test/visual/src/data.json', data);
}

main();
