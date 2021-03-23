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
const fs = require('fs');
const globby = require('globby');

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
        };
        allTests.push(test);
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
            existingTest.diff = diff;
        } else {
            allTests.push(test);
        }
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
        };
        const existingTest = allTests.find((test) => test.id === id);
        if (existingTest) {
            existingTest.actual = actual;
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
    fs.writeFileSync('test/visual/src/tests.json', JSON.stringify(tests));
}

main();
