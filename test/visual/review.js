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

async function main() {
    const tests = { new: [], updated: [], passed: [], removed: [] };
    for await (const path of globby.stream(
        `test/visual/screenshots-baseline/**/*.png`
    )) {
        const pathParts = path.split('/');
        const name = pathParts.splice(pathParts.length - 2, 2).join(' - ');
        const baseline = path;
        const diff = path.replace(
            'screenshots-baseline/',
            'screenshots-actual/diff/'
        );
        const actual = path.replace(
            'screenshots-baseline/',
            'screenshots-actual/updates/'
        );
        const test = {
            name,
            baseline: cleanURL(baseline),
        };
        if (fs.existsSync(diff)) {
            test.diff = cleanURL(diff);
        }
        if (fs.existsSync(actual)) {
            test.actual = cleanURL(actual);
        }
        if (test.diff) {
            tests.updated.push(test);
        } else if (!test.diff && test.actual) {
            tests.new.push(test);
        } else if (!test.actual) {
            tests.removed.push(test);
        } else {
            tests.passed.push(test);
        }
    }
    if (!fs.existsSync('test/visual/review')) {
        fs.mkdirSync('test/visual/review');
    }
    const sort = ({ name: a, diff: diffA }, { name: b, diff: diffB }) => {
        if (diffA && !diffB) {
            return -1;
        }
        if (diffB && !diffA) {
            return 1;
        }
        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        // a must be equal to b
        return 0;
    };
    tests.passed.sort(sort);
    tests.updated.sort(sort);
    fs.writeFileSync('test/visual/src/tests.json', JSON.stringify(tests));
}

main();
